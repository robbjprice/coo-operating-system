const appRoot = document.querySelector('#app');
const pageTitle = document.querySelector('#pageTitle');
const navEl = document.querySelector('#sidebarNav');
const modalRoot = document.querySelector('#modalRoot');
const toastRoot = document.querySelector('#toastRoot');
const quickAddButton = document.querySelector('#quickAddButton');
const searchInput = document.querySelector('#globalSearch');
const importInput = document.querySelector('#importInput');
const exportButton = document.querySelector('#exportButton');

const collectionLabels = {
  tasks: 'Tasks',
  readinessItems: 'Commercial Readiness',
  governmentReadinessItems: 'Government Readiness',
  customers: 'Customers',
  meetings: 'Meetings',
  advisorRecommendations: 'Advisor Recommendations',
  risks: 'Risks',
  fundingNeeds: 'Funding Needs',
  roadmapItems: 'Roadmap',
  documents: 'Documents',
  settings: 'Settings',
};

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatCollectionName(collection) {
  return collectionLabels[collection] || collection;
}

function getItemTitle(item) {
  return item.title || item.name || item.company || item.topic || 'Untitled';
}

function getItemSubtitle(item) {
  return item.description || item.notes || item.status || item.owner || '';
}

function setPageTitle(title) {
  if (pageTitle) pageTitle.textContent = title;
}

export function showStatus(message) {
  if (!toastRoot) return;

  toastRoot.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`;

  window.clearTimeout(showStatus.timeout);
  showStatus.timeout = window.setTimeout(() => {
    toastRoot.innerHTML = '';
  }, 3000);
}

export function bindNavigation(handlers) {
  if (!navEl) return;

  navEl.innerHTML = `
    <button data-view="dashboard">Dashboard</button>
    <button data-view="tasks">Tasks</button>
    <button data-view="readinessItems">Commercial Readiness</button>
    <button data-view="governmentReadinessItems">Government Readiness</button>
    <button data-view="customers">Customers</button>
    <button data-view="fundingNeeds">Funding Needs</button>
    <button data-view="risks">Risks</button>
    <button data-view="meetings">Meetings</button>
    <button data-view="roadmapItems">Roadmap</button>
    <button data-view="documents">Documents</button>
    <button data-view="advisorRecommendations">Advisors</button>
  `;

  navEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-view]');
    if (!button) return;

    handlers.onNavigate(button.dataset.view);
  });

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      handlers.onSearch(event.target.value);
    });
  }
}

export function bindQuickAdd(handlers) {
  if (!quickAddButton || !modalRoot) return;

  quickAddButton.addEventListener('click', () => {
    modalRoot.innerHTML = `
      <div class="modal-backdrop">
        <section class="modal">
          <div class="modal-header">
            <h2>Quick Add</h2>
            <button class="ghost-button" data-close-modal>Close</button>
          </div>

          <form id="quickAddForm" class="form-grid">
            <label>
              Collection
              <select name="collection">
                <option value="tasks">Task</option>
                <option value="risks">Risk</option>
                <option value="customers">Customer</option>
                <option value="fundingNeeds">Funding Need</option>
                <option value="meetings">Meeting</option>
                <option value="roadmapItems">Roadmap Item</option>
                <option value="documents">Document</option>
                <option value="advisorRecommendations">Advisor Recommendation</option>
              </select>
            </label>

            <label>
              Title
              <input name="title" required />
            </label>

            <label>
              Description
              <textarea name="description"></textarea>
            </label>

            <label>
              Owner
              <input name="owner" />
            </label>

            <label>
              Priority
              <select name="priority">
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </label>

            <label>
              Status
              <input name="status" value="Open" />
            </label>

            <label>
              Due Date
              <input type="date" name="dueDate" />
            </label>

            <button class="primary-button" type="submit">Save</button>
          </form>
        </section>
      </div>
    `;

    modalRoot.querySelector('[data-close-modal]').addEventListener('click', () => {
      modalRoot.innerHTML = '';
    });

    modalRoot.querySelector('#quickAddForm').addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      await handlers.onQuickAdd({
        collection: formData.get('collection'),
        title: formData.get('title'),
        description: formData.get('description'),
        owner: formData.get('owner'),
        priority: formData.get('priority'),
        status: formData.get('status'),
        dueDate: formData.get('dueDate'),
      });

      modalRoot.innerHTML = '';
    });
  });
}

export function bindImportExport(handlers) {
  if (exportButton) {
    exportButton.addEventListener('click', () => {
      handlers.onExport();
    });
  }

  if (importInput) {
    importInput.addEventListener('change', async (event) => {
      const [file] = event.target.files;
      await handlers.onImport(file);
      importInput.value = '';
    });
  }
}

function renderMetricCard(label, value) {
  return `
    <article class="metric-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function renderItemForm(collection, item = {}) {
  const title = getItemTitle(item) === 'Untitled' ? '' : getItemTitle(item);

  return `
    <form class="item-form" data-collection="${escapeHtml(collection)}" data-id="${escapeHtml(item.id || '')}">
      <label>
        Title
        <input name="title" value="${escapeHtml(title)}" />
      </label>

      <label>
        Description
        <textarea name="description">${escapeHtml(item.description || item.notes || '')}</textarea>
      </label>

      <label>
        Owner
        <input name="owner" value="${escapeHtml(item.owner || '')}" />
      </label>

      <label>
        Status
        <input name="status" value="${escapeHtml(item.status || '')}" />
      </label>

      <label>
        Priority
        <select name="priority">
          <option value="">None</option>
          <option value="Low" ${item.priority === 'Low' ? 'selected' : ''}>Low</option>
          <option value="Medium" ${item.priority === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="High" ${item.priority === 'High' ? 'selected' : ''}>High</option>
          <option value="Critical" ${item.priority === 'Critical' ? 'selected' : ''}>Critical</option>
        </select>
      </label>

      <label>
        Due Date
        <input type="date" name="dueDate" value="${escapeHtml(item.dueDate || '')}" />
      </label>

      <button class="primary-button" type="submit">Save</button>
    </form>
  `;
}

function renderItemCard(collection, item) {
  return `
    <article class="item-card">
      <div>
        <h3>${escapeHtml(getItemTitle(item))}</h3>
        <p>${escapeHtml(getItemSubtitle(item))}</p>
      </div>

      <div class="item-meta">
        ${item.owner ? `<span>Owner: ${escapeHtml(item.owner)}</span>` : ''}
        ${item.status ? `<span>Status: ${escapeHtml(item.status)}</span>` : ''}
        ${item.priority ? `<span>Priority: ${escapeHtml(item.priority)}</span>` : ''}
        ${item.dueDate ? `<span>Due: ${escapeHtml(item.dueDate)}</span>` : ''}
      </div>

      <details>
        <summary>Edit</summary>
        ${renderItemForm(collection, item)}
      </details>

      <button class="danger-button" data-delete="${escapeHtml(item.id)}" data-collection="${escapeHtml(collection)}">
        Delete
      </button>
    </article>
  `;
}

function bindCollectionActions(handlers) {
  appRoot.querySelectorAll('.item-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      await handlers.onSave(form.dataset.collection, {
        id: form.dataset.id || undefined,
        title: formData.get('title'),
        description: formData.get('description'),
        owner: formData.get('owner'),
        status: formData.get('status'),
        priority: formData.get('priority'),
        dueDate: formData.get('dueDate'),
      });
    });
  });

  appRoot.querySelectorAll('[data-delete]').forEach((button) => {
    button.addEventListener('click', async () => {
      await handlers.onDelete(button.dataset.collection, button.dataset.delete);
    });
  });
}

export function renderDashboard(model, handlers) {
  const { data, executiveScore } = model;

  const tasks = data.tasks || [];
  const risks = data.risks || [];
  const customers = data.customers || [];
  const fundingNeeds = data.fundingNeeds || [];
  const meetings = data.meetings || [];

  setPageTitle('Dashboard');

  appRoot.innerHTML = `
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">FedEMR Technologies</p>
        <h2>Executive Operating Dashboard</h2>
        <p>Commercialization, government readiness, customer development, funding, risk, meetings, documents, and roadmap execution in one local-first command centre.</p>
      </div>
      <div class="score-card">
        <span>Executive Score</span>
        <strong>${escapeHtml(executiveScore)}%</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Open Tasks', tasks.length)}
      ${renderMetricCard('Customers', customers.length)}
      ${renderMetricCard('Funding Needs', fundingNeeds.length)}
      ${renderMetricCard('Risks', risks.length)}
      ${renderMetricCard('Meetings', meetings.length)}
    </section>

    <section class="content-grid">
      <article class="panel">
        <h2>Top Priorities</h2>
        ${tasks.slice(0, 5).map((item) => renderItemCard('tasks', item)).join('') || '<p>No tasks yet.</p>'}
      </article>

      <article class="panel">
        <h2>Active Risks</h2>
        ${risks.slice(0, 5).map((item) => renderItemCard('risks', item)).join('') || '<p>No risks yet.</p>'}
      </article>
    </section>
  `;

  bindCollectionActions(handlers);
}

export function renderCollection(collection, items, handlers) {
  setPageTitle(formatCollectionName(collection));

  appRoot.innerHTML = `
    <section class="panel">
      <h2>Add New ${escapeHtml(formatCollectionName(collection))}</h2>
      ${renderItemForm(collection)}
    </section>

    <section class="item-list">
      ${items.map((item) => renderItemCard(collection, item)).join('') || '<p>No items yet.</p>'}
    </section>
  `;

  bindCollectionActions(handlers);
}

export function renderSearchResults(results, query, handlers) {
  setPageTitle('Search');

  appRoot.innerHTML = `
    <section class="panel">
      <h2>Search Results</h2>
      <p>${results.length} result${results.length === 1 ? '' : 's'} for "${escapeHtml(query)}"</p>
    </section>

    <section class="item-list">
      ${
        results
          .map(
            (result) => `
              <div class="collection-label">${escapeHtml(formatCollectionName(result.collection))}</div>
              ${renderItemCard(result.collection, result.item)}
            `
          )
          .join('') || '<p>No matching items found.</p>'
      }
    </section>
  `;

  bindCollectionActions(handlers);
}