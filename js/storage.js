import { collections } from './sample-data.js';

const DB_NAME = 'fedemr-coo-os';
const DB_VERSION = 1;

let dbPromise = null;

function openDatabase() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      collections.forEach((collection) => {
        if (!db.objectStoreNames.contains(collection)) {
          db.createObjectStore(collection, { keyPath: 'id' });
        }
      });
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

  return dbPromise;
}

function getStore(db, collection, mode = 'readonly') {
  if (!collections.includes(collection)) {
    throw new Error(`Unknown collection: ${collection}`);
  }

  const transaction = db.transaction(collection, mode);
  return transaction.objectStore(collection);
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllItems(collection) {
  const db = await openDatabase();
  const store = getStore(db, collection, 'readonly');
  const request = store.getAll();

  return requestToPromise(request);
}

export async function saveItem(collection, item) {
  const db = await openDatabase();
  const store = getStore(db, collection, 'readwrite');
  const request = store.put(item);

  await requestToPromise(request);

  return item;
}

export async function deleteItem(collection, id) {
  const db = await openDatabase();
  const store = getStore(db, collection, 'readwrite');
  const request = store.delete(id);

  return requestToPromise(request);
}

export async function clearCollection(collection) {
  const db = await openDatabase();
  const store = getStore(db, collection, 'readwrite');
  const request = store.clear();

  return requestToPromise(request);
}

export async function seedDatabase(seedData) {
  const db = await openDatabase();

  await Promise.all(
    collections.map(
      (collection) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction(collection, 'readwrite');
          const store = transaction.objectStore(collection);
          const items = seedData[collection] || [];

          store.clear();

          items.forEach((item) => {
            store.put(item);
          });

          transaction.oncomplete = () => resolve();
          transaction.onerror = () => reject(transaction.error);
          transaction.onabort = () => reject(transaction.error);
        })
    )
  );
}