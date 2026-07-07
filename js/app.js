import { loadState, putRecord, deleteRecord, importState } from './storage.js';
import { allScores, readinessQuestions } from './scoring.js';
import { attachTableActions, badge, closeModal, compactItem, listCard, moduleMeta, navItems, renderModuleTable, renderNav, scoreCard, showRecordModal, toast } from './ui.js';
import { daysUntil, downloadJson, matchesQuery, nowIso, readJsonFile, uid } from './utils.js';

let state = {};
let route = 'dashboard';
let searchQuery = '';

const app = document.getElementById('app');
const pageTitle = document.getElementById('pageTitle');

const init = async () => {
  state = await loadState();
  bindChrome();
  navigate('dashboard');
};

const bindChrome = () => {
  document.getElementById('quickAddButton').addEventListener('click', () => openQuickAdd());
  document.getElementById('globalSearch').addEventListener('input', (event) => {
    searchQuery = event.target.value;
    render();
  });
  document.getElementById('exportButton').addEventListener('click', () => {
    downloadJson(`fedemr-coo-os-export-${new Date().toISOString().slice(0,10)}.json`, state);
    toast('JSON export downloaded.');
  });
  document.getElementById('importInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const imported = await readJsonFile(file);
      await importState(imported);
      state = await loadState();
      render();
      toast('JSON import complete.');
    } catch (error) {
      toast('Import failed. Use a valid COO OS JSON export.');
      console.error(error);
    }
    event.target.value = '';
  });
};

const navigate = (nextRoute) => {
  route = nextRoute;
  renderNav(route, navigate);
  render();
};

const render = () => {
  renderNav(route, navigate);
  if (route === 'dashboard') renderDashboard();
  else renderModule(route);
  app.focus({ preventScroll: true });
};

const withSearch = (records) => (records || []).filter(record => matchesQuery(record, searchQuery));

const renderDashboard = () => {
  pageTitle.textContent = 'Dashboard';
  const scores = allScores(state);
  const tasks = withSearch(state.tasks || []);
  const risks = withSearch(state.risks || []);
  const customers = withSearch(state.customers || []);
  const meetings = withSearch(state.meetings || []);
  const advisors = withSearch(state.advisorRecommendations || []);
  const funding = withSearch(state.fundingNeeds || []);
  const roadmap = withSearch(state.roadmapItems || []);

  const criticalRisks = risks.filter(r => Number(r.severity || 0) >= 15 && r.status !== 'Closed').slice(0, 5);
  const todayPriorities = tasks.filter(t => t.priority === 'High' && t.status !== 'Complete').slice(0, 5);
  const upcomingMilestones = roadmap.filter(r => daysUntil(r.targetDate) !== null && daysUntil(r.targetDate) <= 120).sort((a,b) => new Date(a.targetDate) - new Date(b.targetDate)).slice(0, 5);
  const activeCustomers = customers.filter(c => !['Lost', 'Closed'].includes(c.stage)).slice(0, 5);
  const blockedTasks = tasks.filter(t => t.blocked || t.status === 'Blocked').slice(0, 5);
  const waitingOn = [...tasks, ...(state.readinessItems || []), ...(state.governmentReadinessItems || []), ...customers].filter(i => i.waitingOn).slice(0, 5);
  const recentMeetingActions = meetings.filter(m => m.actionItems).slice(0, 4);
  const advisorRecommendations = advisors.filter(a => a.status !== 'Closed').slice(0, 4);
  const thisWeeksFocus = [...todayPriorities, ...blockedTasks].slice(0, 4);

  app.innerHTML = `
    <div class="grid score-grid">
      ${scoreCard('Commercial Readiness', scores.commercialReadiness, 'Can we sell, contract, deploy, get paid, and prove ROI?')}
      ${scoreCard('Government Readiness', scores.governmentReadiness, 'Government, AHS, university, and health-system buyer readiness.')}
      ${scoreCard('Company Health', scores.companyHealth, 'Weighted view of readiness, pipeline, funding, and risk.')}
      ${scoreCard('Risk Severity', scores.riskSeverity, 'Higher means risk is getting spicy.')}
      ${scoreCard('Funding Readiness', scores.fundingReadiness, 'How well funding needs map to commercialization blockers.')}
      ${scoreCard('Pipeline Score', scores.pipeline, 'Probability-weighted customer momentum.')}
    </div>

    <section class="card span-12" style="margin-top:18px;">
      <div class="card-header"><h2>Readiness Questions</h2><button class="secondary-button" data-add="readinessItems">Add Readiness Item</button></div>
      <div class="grid" style="grid-template-columns: repeat(5, 1fr);">
        ${readinessQuestions(state).map(item => `<div class="list-item"><strong>${item.question}</strong><div class="meta">${item.answer}</div></div>`).join('')}
      </div>
    </section>

    <div class="grid dashboard-grid" style="margin-top:18px;">
      <div class="span-4">${listCard('Critical Risks', criticalRisks, item => compactItem(item), 'No critical risks match your search.')}</div>
      <div class="span-4">${listCard("Today's Priorities", todayPriorities, item => compactItem(item), 'No urgent priorities match your search.')}</div>
      <div class="span-4">${listCard('Upcoming Milestones', upcomingMilestones, item => compactItem(item), 'No upcoming milestones match your search.')}</div>
      <div class="span-6">${listCard('Active Customers / Opportunities', activeCustomers, item => compactItem(item, 'name'), 'No active opportunities match your search.')}</div>
      <div class="span-6">${listCard('Funding Needs', funding.slice(0, 5), item => compactItem(item), 'No funding needs match your search.')}</div>
      <div class="span-6">${listCard('Blocked Tasks', blockedTasks, item => compactItem(item), 'No blocked tasks. Miracles happen.')}</div>
      <div class="span-6">${listCard('Waiting On', waitingOn, item => compactItem(item, item.name ? 'name' : 'title'), 'Nothing is waiting on anyone. Suspicious, but excellent.')}</div>
      <div class="span-6">${listCard('Recent Meeting Actions', recentMeetingActions, item => compactItem(item), 'No recent meeting actions match your search.')}</div>
      <div class="span-6">${listCard('Advisor Recommendations', advisorRecommendations, item => compactItem(item), 'No advisor recommendations match your search.')}</div>
      <div class="span-12">${listCard("This Week's Focus", thisWeeksFocus, item => compactItem(item), 'No weekly focus items yet.')}</div>
    </div>
  `;

  app.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => openEditor(button.dataset.add)));
};

const renderModule = (collection) => {
  const meta = moduleMeta[collection];
  pageTitle.textContent = meta.label;
  const records = withSearch(state[collection] || []);
  app.innerHTML = `
    <section class="module-header">
      <div>
        <h2>${meta.label}</h2>
        <p>${meta.description}</p>
      </div>
      <button class="primary-button" id="addRecordButton">Add ${meta.singular}</button>
    </section>
    <section class="card">
      <div class="card-header">
        <h3>${records.length} record${records.length === 1 ? '' : 's'}</h3>
        ${searchQuery ? badge(`Search: ${searchQuery}`) : ''}
      </div>
      ${renderModuleTable(collection, records)}
    </section>
  `;
  document.getElementById('addRecordButton').addEventListener('click', () => openEditor(collection));
  attachTableActions(app, {
    edit: (id) => openEditor(collection, state[collection].find(r => r.id === id)),
    delete: async (id) => {
      if (!confirm('Delete this record?')) return;
      await deleteRecord(collection, id);
      await logActivity(`Deleted ${meta.singular}`, `Deleted record from ${meta.label}.`);
      state = await loadState();
      render();
      toast('Record deleted.');
    }
  });
};

const openQuickAdd = () => {
  const root = document.getElementById('modalRoot');
  root.classList.add('active');
  root.innerHTML = `
    <div class="modal-backdrop" data-close="true"></div>
    <section class="modal" role="dialog" aria-modal="true" aria-label="Quick Add">
      <div class="modal-header">
        <h2>Quick Add</h2>
        <button class="icon-button" data-close="true">Close</button>
      </div>
      <div class="grid">
        ${navItems.filter(([key]) => key !== 'dashboard').map(([key, label]) => `<button class="secondary-button" data-quick="${key}">Add ${label}</button>`).join('')}
      </div>
    </section>
  `;
  root.querySelectorAll('[data-close="true"]').forEach(el => el.addEventListener('click', closeModal));
  root.querySelectorAll('[data-quick]').forEach(button => button.addEventListener('click', () => openEditor(button.dataset.quick)));
};

const openEditor = (collection, record = null) => {
  showRecordModal({
    collection,
    record: record || defaultRecord(collection),
    onClose: closeModal,
    onSave: async (data) => {
      const existing = Boolean(data.id);
      const saved = await putRecord(collection, {
        ...defaultRecord(collection),
        ...data,
        createdAt: data.createdAt || nowIso(),
        updatedAt: nowIso()
      });
      await logActivity(`${existing ? 'Updated' : 'Created'} ${moduleMeta[collection].singular}`, saved.title || saved.name || 'Untitled record');
      state = await loadState();
      closeModal();
      render();
      toast(existing ? 'Record updated.' : 'Record created.');
    }
  });
};

const defaultRecord = (collection) => ({
  id: '',
  createdAt: nowIso(),
  updatedAt: nowIso(),
  title: '',
  status: 'Not Started',
  priority: 'Medium',
  owner: 'Robb',
  notes: '',
  blocked: false,
  waitingOn: '',
  evidenceLink: '',
  reviewCadence: 'Weekly',
  linkedTasks: [],
  linkedRisks: [],
  linkedCustomers: [],
  linkedMeetings: [],
  linkedReadinessItems: [],
  linkedRoadmapItems: [],
  ...(collection === 'customers' ? { name: '', stage: 'Discovery', probability: 0 } : {}),
  ...(collection === 'risks' ? { probability: 1, impact: 1, severity: 1, status: 'Open' } : {}),
  ...(collection === 'roadmapItems' ? { completionPercentage: 0 } : {}),
  ...(collection === 'readinessItems' || collection === 'governmentReadinessItems' ? { completionPercentage: 0 } : {})
});

const logActivity = async (title, notes = '') => {
  await putRecord('activityLog', {
    id: uid('log'),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    title,
    type: 'activity',
    notes
  });
};

init().catch(error => {
  console.error(error);
  app.innerHTML = '<div class="card"><h2>Something broke</h2><p>IndexedDB may be blocked in this browser context. Try running through a local server.</p></div>';
});
