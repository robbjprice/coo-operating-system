import { collections, sampleData } from './sample-data.js';

const DB_NAME = 'fedemr-coo-os';
const DB_VERSION = 2;

let dbPromise = null;

function openDatabase() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      collections.forEach((collection) => {
        if (!db.objectStoreNames.contains(collection)) {
          const store = db.createObjectStore(collection, {
            keyPath: 'id'
          });

          const seedItems = Array.isArray(sampleData[collection])
            ? sampleData[collection]
            : [];

          seedItems.forEach((item) => {
            store.put(item);
          });
        }
      });
    };

    request.onsuccess = () => {
      resolve(request.result);
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

function getStore(db, collection, mode = 'readonly') {
  if (!collections.includes(collection)) {
    throw new Error(`Unknown collection: ${collection}`);
  }

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
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export async function getAllItems(collection) {
  const db = await openDatabase();
  const { store } = getStore(db, collection, 'readonly');

  return requestToPromise(store.getAll());
}

export async function saveItem(collection, item) {
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

export async function deleteItem(collection, id) {
  const db = await openDatabase();
  const { store, transaction } = getStore(
    db,
    collection,
    'readwrite'
  );

  store.delete(id);

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
  const {
    clearExisting = true
  } = options;

  const db = await openDatabase();

  for (const collection of collections) {
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