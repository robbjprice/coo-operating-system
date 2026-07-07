import { collections, sampleData } from './sample-data.js';
import { nowIso, uid } from './utils.js';

const DB_NAME = 'fedemr-coo-os';
const DB_VERSION = 1;
let dbPromise;

const openDb = () => {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      collections.forEach((name) => {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: 'id' });
        }
      });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
};

const txStore = async (collection, mode = 'readonly') => {
  const db = await openDb();
  const tx = db.transaction(collection, mode);
  return { store: tx.objectStore(collection), tx };
};

const requestToPromise = (request) => new Promise((resolve, reject) => {
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export const getAll = async (collection) => {
  const { store } = await txStore(collection);
  return requestToPromise(store.getAll());
};

export const putRecord = async (collection, record) => {
  const { store, tx } = await txStore(collection, 'readwrite');
  const saved = { ...record, updatedAt: nowIso(), id: record.id || uid(collection) };
  store.put(saved);
  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  return saved;
};

export const deleteRecord = async (collection, id) => {
  const { store, tx } = await txStore(collection, 'readwrite');
  store.delete(id);
  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
};

export const clearCollection = async (collection) => {
  const { store, tx } = await txStore(collection, 'readwrite');
  store.clear();
  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
};

export const loadState = async () => {
  await seedIfEmpty();
  const entries = await Promise.all(collections.map(async (collection) => [collection, await getAll(collection)]));
  return Object.fromEntries(entries);
};

export const seedIfEmpty = async () => {
  const settings = await getAll('settings');
  if (settings.length) return;
  await importState(sampleData, false);
};

export const importState = async (state, logImport = true) => {
  for (const collection of collections) {
    await clearCollection(collection);
    const records = Array.isArray(state[collection]) ? state[collection] : [];
    for (const record of records) {
      await putRecord(collection, record);
    }
  }
  if (logImport) {
    await putRecord('activityLog', {
      id: uid('log'),
      createdAt: nowIso(),
      updatedAt: nowIso(),
      title: 'Imported JSON data',
      type: 'import',
      notes: 'Application data was replaced from an imported JSON file.'
    });
  }
};

export const resetToSampleData = async () => importState(sampleData);
