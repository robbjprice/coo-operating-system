import { collections, sampleData } from './sample-data.js';

const DB_NAME = 'fedemr-coo-os';
const DB_VERSION = 5;

let dbPromise = null;

const collectionIndexes = {
  actionItems: [
    {
      name: 'status',
      keyPath: 'status'
    },
    {
      name: 'owner',
      keyPath: 'owner'
    },
    {
      name: 'dueDate',
      keyPath: 'dueDate'
    },
    {
      name: 'priority',
      keyPath: 'priority'
    },
    {
      name: 'workflowInstanceId',
      keyPath: 'workflowInstanceId'
    },
    {
      name: 'linkedRecordId',
      keyPath: 'linkedRecordId'
    }
  ],

  workflowTemplates: [
    {
      name: 'category',
      keyPath: 'category'
    },
    {
      name: 'active',
      keyPath: 'active'
    }
  ],

  workflowInstances: [
    {
      name: 'templateId',
      keyPath: 'templateId'
    },
    {
      name: 'status',
      keyPath: 'status'
    },
    {
      name: 'owner',
      keyPath: 'owner'
    },
    {
      name: 'linkedRecordId',
      keyPath: 'linkedRecordId'
    }
  ],

  workflowSteps: [
    {
      name: 'workflowInstanceId',
      keyPath: 'workflowInstanceId'
    },
    {
      name: 'status',
      keyPath: 'status'
    },
    {
      name: 'owner',
      keyPath: 'owner'
    },
    {
      name: 'sequence',
      keyPath: 'sequence'
    }
  ],

  aiActionProposals: [
    {
      name: 'status',
      keyPath: 'status'
    },
    {
      name: 'sourceType',
      keyPath: 'sourceType'
    },
    {
      name: 'sourceRecordId',
      keyPath: 'sourceRecordId'
    }
  ]
};

function createIndexes(store, collection) {
  const indexes = collectionIndexes[collection] || [];

  indexes.forEach(({ name, keyPath, options = {} }) => {
    if (!store.indexNames.contains(name)) {
      store.createIndex(name, keyPath, options);
    }
  });
}

function seedNewStore(store, collection) {
  const seedItems = Array.isArray(sampleData[collection])
    ? sampleData[collection]
    : [];

  seedItems.forEach((item) => {
    store.put(item);
  });
}

function openDatabase() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      const transaction = request.transaction;

      collections.forEach((collection) => {
        let store;

        if (!db.objectStoreNames.contains(collection)) {
          store = db.createObjectStore(collection, {
            keyPath: 'id'
          });

          createIndexes(store, collection);
          seedNewStore(store, collection);

          return;
        }

        store = transaction.objectStore(collection);
        createIndexes(store, collection);
      });
    };

    request.onsuccess = () => {
      const db = request.result;

      db.onversionchange = () => {
        db.close();
        dbPromise = null;

        console.warn(
          'A newer COO OS database version is available. Refresh this tab to continue.'
        );
      };

      resolve(db);
    };

    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };

    request.onblocked = () => {
      console.warn(
        'IndexedDB upgrade is blocked. Close other tabs running the COO OS and refresh.'
      );
    };
  });

  return dbPromise;
}

function validateCollection(collection) {
  if (!collections.includes(collection)) {
    throw new Error(`Unknown collection: ${collection}`);
  }
}

function getStore(db, collection, mode = 'readonly') {
  validateCollection(collection);

  if (!db.objectStoreNames.contains(collection)) {
    throw new Error(
      `Missing IndexedDB object store: ${collection}. Refresh the application to complete the database upgrade.`
    );
  }

  const transaction = db.transaction(collection, mode);

  return {
    transaction,
    store: transaction.objectStore(collection)
  };
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionToPromise(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();

    transaction.onerror = () => {
      reject(
        transaction.error ||
          new Error('IndexedDB transaction failed.')
      );
    };

    transaction.onabort = () => {
      reject(
        transaction.error ||
          new Error('IndexedDB transaction was aborted.')
      );
    };
  });
}

export async function getAllItems(collection) {
  const db = await openDatabase();
  const { store } = getStore(db, collection, 'readonly');

  return requestToPromise(store.getAll());
}

export async function getItem(collection, id) {
  if (!id) return undefined;

  const db = await openDatabase();
  const { store } = getStore(db, collection, 'readonly');

  return requestToPromise(store.get(id));
}

export async function getItemsByIndex(
  collection,
  indexName,
  value
) {
  const db = await openDatabase();
  const { store } = getStore(db, collection, 'readonly');

  if (!store.indexNames.contains(indexName)) {
    throw new Error(
      `Missing index "${indexName}" on collection "${collection}".`
    );
  }

  const index = store.index(indexName);

  return requestToPromise(index.getAll(value));
}

export async function saveItem(collection, item) {
  if (!item?.id) {
    throw new Error(
      `Cannot save an item to "${collection}" without an id.`
    );
  }

  const db = await openDatabase();
  const { store, transaction } = getStore(
    db,
    collection,
    'readwrite'
  );

  store.put(item);

  await transactionToPromise(transaction);

  return item;
}

export async function saveItems(collection, items = []) {
  if (!Array.isArray(items)) {
    throw new Error('saveItems expects an array.');
  }

  if (items.length === 0) return [];

  const invalidItem = items.find((item) => !item?.id);

  if (invalidItem) {
    throw new Error(
      `Cannot save items to "${collection}" when an item is missing its id.`
    );
  }

  const db = await openDatabase();
  const { store, transaction } = getStore(
    db,
    collection,
    'readwrite'
  );

  items.forEach((item) => {
    store.put(item);
  });

  await transactionToPromise(transaction);

  return items;
}

export async function deleteItem(collection, id) {
  if (!id) return;

  const db = await openDatabase();
  const { store, transaction } = getStore(
    db,
    collection,
    'readwrite'
  );

  store.delete(id);

  await transactionToPromise(transaction);
}

export async function deleteItems(collection, ids = []) {
  if (!Array.isArray(ids) || ids.length === 0) return;

  const db = await openDatabase();
  const { store, transaction } = getStore(
    db,
    collection,
    'readwrite'
  );

  ids.forEach((id) => {
    if (id) {
      store.delete(id);
    }
  });

  await transactionToPromise(transaction);
}

export async function clearCollection(collection) {
  const db = await openDatabase();
  const { store, transaction } = getStore(
    db,
    collection,
    'readwrite'
  );

  store.clear();

  await transactionToPromise(transaction);
}

export async function seedDatabase(
  seedData,
  options = {}
) {
  const { clearExisting = true } = options;

  const db = await openDatabase();

  for (const collection of collections) {
    if (!db.objectStoreNames.contains(collection)) {
      continue;
    }

    const transaction = db.transaction(
      collection,
      'readwrite'
    );

    const store = transaction.objectStore(collection);

    const items = Array.isArray(seedData[collection])
      ? seedData[collection]
      : [];

    if (clearExisting) {
      store.clear();
    }

    items.forEach((item) => {
      store.put(item);
    });

    await transactionToPromise(transaction);
  }
}

export async function seedEmptyCollections(seedData) {
  const db = await openDatabase();

  for (const collection of collections) {
    if (!db.objectStoreNames.contains(collection)) {
      continue;
    }

    const readTransaction = db.transaction(
      collection,
      'readonly'
    );

    const readStore =
      readTransaction.objectStore(collection);

    const count = await requestToPromise(
      readStore.count()
    );

    if (count > 0) continue;

    const items = Array.isArray(seedData[collection])
      ? seedData[collection]
      : [];

    if (items.length === 0) continue;

    const writeTransaction = db.transaction(
      collection,
      'readwrite'
    );

    const writeStore =
      writeTransaction.objectStore(collection);

    items.forEach((item) => {
      writeStore.put(item);
    });

    await transactionToPromise(writeTransaction);
  }
}

export async function getDatabaseInfo() {
  const db = await openDatabase();

  return {
    name: db.name,
    version: db.version,
    objectStores: Array.from(db.objectStoreNames)
  };
}

export async function closeDatabase() {
  if (!dbPromise) return;

  const db = await dbPromise;

  db.close();
  dbPromise = null;
}