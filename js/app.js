import {
  seedDatabase,
  getAllItems,
  saveItem,
  deleteItem
} from './storage.js';

import {
  collections,
  sampleData
} from './sample-data.js';

import {
  calculateExecutiveScore
} from './scoring.js';

import {
  uid,
  nowIso
} from './utils.js';

import {
  renderDashboard,
  renderCollection,
  renderSearchResults,
  showStatus,
  bindNavigation,
  bindQuickAdd,
  bindImportExport
} from './ui.js';

const state = {
  activeView: 'dashboard',
  activeCollection: null,
  data: {},
  searchQuery: ''
};
const PRODUCT_MARKET_SEED_VERSION = 1;

const productMarketCollections = [
  'products',
  'productVersions',
  'productCapabilities',
  'audiences',
  'contentAssets',
  'presentations',
  'useCases',
  'caseStudies',
  'approvedClaims'
];

async function seedProductMarketDataOnce() {
  const settingsRecord = (
    state.data.settings || []
  ).find(
    (item) => item.id === 'settings_default'
  );

  const completedVersion = Number(
    settingsRecord?.productMarketSeedVersion || 0
  );

  if (
    completedVersion >=
    PRODUCT_MARKET_SEED_VERSION
  ) {
    return false;
  }

  for (const collection of productMarketCollections) {
    const existingItems =
      state.data[collection] || [];

    const existingIds = new Set(
      existingItems.map((item) => item.id)
    );

    const seedItems =
      sampleData[collection] || [];

    for (const item of seedItems) {
      if (!existingIds.has(item.id)) {
        await saveItem(collection, item);
      }
    }
  }

  await saveItem('settings', {
    ...(settingsRecord || {
      id: 'settings_default',
      appName: 'FedEMR COO Operating System',
      appVersion: '0.5',
      schemaVersion: '0.5',
      theme: 'light',
      createdAt: nowIso()
    }),

    productMarketSeedVersion:
      PRODUCT_MARKET_SEED_VERSION,

    updatedAt: nowIso()
  });

  return true;
}
  
async function loadData() {
  const entries = await Promise.all(
    collections.map(async (collection) => {
      const items = await getAllItems(collection);

      return [
        collection,
        items
      ];
    })
  );

  state.data = Object.fromEntries(entries);
}

function getDashboardModel() {
  return {
    data: state.data,
    executiveScore: calculateExecutiveScore(
      state.data
    )
  };
}

async function refresh() {
  await loadData();

  if (state.activeView === 'dashboard') {
    renderDashboard(
      getDashboardModel(),
      handlers
    );

    return;
  }

  if (state.activeView === 'search') {
    const results = searchAllCollections(
      state.searchQuery
    );

    renderSearchResults(
      results,
      state.searchQuery,
      handlers
    );

    return;
  }

  if (state.activeCollection) {
    renderCollection(
      state.activeCollection,
      state.data[
        state.activeCollection
      ] || [],
      handlers,
      state.data
    );
  }
}

function searchAllCollections(query) {
  const cleanQuery = query
    .trim()
    .toLowerCase();

  if (!cleanQuery) return [];

  const results = [];

  Object.entries(state.data).forEach(
    ([collection, items]) => {
      items.forEach((item) => {
        const searchableText =
          JSON.stringify(item)
            .toLowerCase();

        if (
          searchableText.includes(
            cleanQuery
          )
        ) {
          results.push({
            collection,
            item
          });
        }
      });
    }
  );

  return results;
}

async function handleSeed() {
  await seedDatabase(sampleData);

  showStatus(
    'Sample FedEMR data loaded.'
  );

  await refresh();
}

async function handleNavigate(
  viewOrCollection
) {
  if (
    viewOrCollection === 'dashboard'
  ) {
    state.activeView = 'dashboard';
    state.activeCollection = null;
  } else {
    state.activeView = 'collection';
    state.activeCollection =
      viewOrCollection;
  }

  await refresh();
}

async function handleSearch(query) {
  state.searchQuery = query;
  state.activeView = 'search';
  state.activeCollection = null;

  await refresh();
}

async function handleSave(
  collection,
  item
) {
  const existingItem =
    item.id
      ? (
          state.data[collection] || []
        ).find(
          (candidate) =>
            candidate.id === item.id
        )
      : null;

  const nextItem = {
    ...(existingItem || {}),
    ...item,

    id:
      item.id ||
      uid(collection),

    updatedAt: nowIso(),

    createdAt:
      existingItem?.createdAt ||
      item.createdAt ||
      nowIso()
  };

  await saveItem(
    collection,
    nextItem
  );

  showStatus('Saved.');

  await refresh();
}

async function handleDelete(
  collection,
  id
) {
  const confirmed =
    window.confirm(
      'Delete this item?'
    );

  if (!confirmed) return;

  await deleteItem(
    collection,
    id
  );

  showStatus('Deleted.');

  await refresh();
}

async function handleQuickAdd(
  payload
) {
  const collection =
    payload.collection ||
    'tasks';

  const item = {
    ...payload,

    id: uid(collection),

    title:
      payload.title ||
      'Untitled item',

    description:
      payload.description || '',

    status:
      payload.status || 'Open',

    priority:
      payload.priority ||
      'Medium',

    owner:
      payload.owner ||
      'Unassigned',

    dueDate:
      payload.dueDate || '',

    createdAt: nowIso(),
    updatedAt: nowIso()
  };

  delete item.collection;

  await saveItem(
    collection,
    item
  );

  showStatus(
    'Quick add saved.'
  );

  await refresh();
}

function handleExport() {
  const exportPayload = {
    exportedAt: nowIso(),

    app:
      'FedEMR COO Operating System',

    version: '0.5',

    schemaVersion: '0.5',

    data: state.data
  };

  const blob = new Blob(
    [
      JSON.stringify(
        exportPayload,
        null,
        2
      )
    ],
    {
      type: 'application/json'
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement('a');

  link.href = url;

  link.download =
    `fedemr-coo-export-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

  document.body.appendChild(link);

  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  showStatus(
    'Export created.'
  );
}

async function handleImport(file) {
  if (!file) return;

  const text = await file.text();

  const parsed =
    JSON.parse(text);

  const importedData =
    parsed.data || parsed;

  await seedDatabase(
    importedData
  );

  showStatus(
    'Import complete.'
  );

  await refresh();
}

const handlers = {
  onSeed: handleSeed,
  onNavigate: handleNavigate,
  onSearch: handleSearch,
  onSave: handleSave,
  onDelete: handleDelete,
  onQuickAdd: handleQuickAdd,
  onExport: handleExport,
  onImport: handleImport
};

async function init() {
  bindNavigation(handlers);
  bindQuickAdd(handlers);
  bindImportExport(handlers);

  await loadData();

  const hasData =
    collections.some(
      (collection) =>
        (
          state.data[collection] ||
          []
        ).length > 0
    );

  if (!hasData) {
    await seedDatabase(
      sampleData
    );

    await loadData();
  }

  const productMarketSeeded =
    await seedProductMarketDataOnce();

  if (productMarketSeeded) {
    await loadData();
  }

  renderDashboard(
    getDashboardModel(),
    handlers
  );

  showStatus(
    productMarketSeeded
      ? 'Product and Market data added.'
      : 'FedEMR COO Operating System ready.'
  );
}init().catch((error) => {
  console.error(error);

  showStatus(
    'Something broke during startup. Check the console.'
  );
});