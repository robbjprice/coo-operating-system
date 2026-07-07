import { currency, formatDate, titleCase } from './utils.js';

export const navItems = [
  ['dashboard', 'Dashboard'],
  ['tasks', 'Tasks'],
  ['readinessItems', 'Commercial Readiness'],
  ['governmentReadinessItems', 'Government Readiness'],
  ['customers', 'Customers & Opportunities'],
  ['risks', 'Risks'],
  ['meetings', 'Meetings'],
  ['advisorRecommendations', 'Advisor Recommendations'],
  ['fundingNeeds', 'Funding Needs'],
  ['roadmapItems', 'Roadmap']
];

export const moduleMeta = {
  tasks: { label: 'Tasks', singular: 'Task', titleField: 'title', description: 'Immediate execution items, blockers, owners, and waiting-on details.' },
  readinessItems: { label: 'Commercial Readiness', singular: 'Readiness Item', titleField: 'title', description: 'The gaps that decide whether FedEMR can sell, contract, deploy, get paid, and prove ROI.' },
  governmentReadinessItems: { label: 'Government Readiness', singular: 'Government Readiness Item', titleField: 'title', description: 'Buyer-specific requirements for governments, health systems, universities, and research institutions.' },
  customers: { label: 'Customers & Opportunities', singular: 'Customer / Opportunity', titleField: 'name', description: 'Active opportunities, procurement paths, next steps, probability, value, and risk.' },
  risks: { label: 'Risks', singular: 'Risk', titleField: 'title', description: 'Serious risks with probability, impact, severity, mitigation, owner, and review date.' },
  meetings: { label: 'Meetings', singular: 'Meeting', titleField: 'title', description: 'Meeting notes, decisions, action items, risks, recommendations, and follow-ups.' },
  advisorRecommendations: { label: 'Advisor Recommendations', singular: 'Advisor Recommendation', titleField: 'title', description: 'Advisor input converted into accountable operating records.' },
  fundingNeeds: { label: 'Funding Needs', singular: 'Funding Need', titleField: 'title', description: 'Funding tied to specific commercialization blockers, not random grant chasing.' },
  roadmapItems: { label: 'Roadmap', singular: 'Roadmap Item', titleField: 'title', description: 'Milestones, dependencies, target dates, and completion progress.' }
};

const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

export const badgeClass = (value) => {
  const v = String(value || '').toLowerCase();
  if (['complete', 'done', 'funded', 'closed'].includes(v)) return 'success';
  if (['high', 'at risk', 'blocked', 'open'].includes(v)) return 'danger';
  if (['medium', 'in progress', 'accepted', 'discovery'].includes(v)) return 'warning';
  if (['low', 'active'].includes(v)) return 'accent';
  return 'neutral';
};

export const badge = (value) => `<span class="badge ${badgeClass(value)}">${esc(value || 'Not set')}</span>`;

export const scoreCard = (label, value, hint) => `
  <section class="card score-card">
    <div class="score-label">${esc(label)}</div>
    <div class="score-value">${Number(value || 0)}%</div>
    <div class="meta">${esc(hint || '')}</div>
    <div class="progress"><span style="width:${Number(value || 0)}%"></span></div>
  </section>
`;

export const listCard = (title, items, renderItem, empty = 'Nothing here yet.') => `
  <section class="card">
    <div class="card-header"><h3>${esc(title)}</h3></div>
    <div class="list">
      ${items.length ? items.map(renderItem).join('') : `<div class="empty-state">${esc(empty)}</div>`}
    </div>
  </section>
`;

export const compactItem = (record, titleField = 'title') => `
  <div class="list-item">
    <div class="list-item-top">
      <div>
        <strong>${esc(record[titleField] || record.title || record.name)}</strong>
        <div class="meta">Owner: ${esc(record.owner || 'Not set')} • Due: ${esc(formatDate(record.dueDate || record.targetDate || record.reviewDate || record.followUpDate))}</div>
      </div>
      ${badge(record.priority || record.status)}
    </div>
    ${record.waitingOn ? `<p class="meta">Waiting on: ${esc(record.waitingOn)}</p>` : ''}
  </div>
`;

export const renderNav = (activeRoute, onNavigate) => {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = navItems.map(([route, label]) => `<button class="${route === activeRoute ? 'active' : ''}" data-route="${route}">${label}</button>`).join('');
  nav.querySelectorAll('button').forEach(button => button.addEventListener('click', () => onNavigate(button.dataset.route)));
};

const columnFor = (collection) => {
  const common = ['status', 'priority', 'owner', 'blocked', 'waitingOn'];
  const map = {
    tasks: ['title', 'category', ...common, 'dueDate'],
    readinessItems: ['title', 'category', 'status', 'priority', 'completionPercentage', 'blockingIssue'],
    governmentReadinessItems: ['title', 'organization', 'category', 'status', 'priority', 'completionPercentage'],
    customers: ['name', 'sector', 'stage', 'probability', 'estimatedValue', 'nextStep'],
    risks: ['title', 'category', 'probability', 'impact', 'severity', 'status', 'reviewDate'],
    meetings: ['title', 'date', 'organization', 'attendees', 'followUpDate'],
    advisorRecommendations: ['title', 'advisorName', 'category', 'priority', 'status', 'relatedModule'],
    fundingNeeds: ['title', 'category', 'amount', 'priority', 'timing', 'status'],
    roadmapItems: ['title', 'quarter', 'targetDate', 'status', 'owner', 'completionPercentage']
  };
  return map[collection] || ['title', ...common];
};

const valueFor = (field, record) => {
  if (field === 'blocked') return record.blocked ? badge('Blocked') : badge('Clear');
  if (['status', 'priority', 'stage'].includes(field)) return badge(record[field]);
  if (field === 'estimatedValue' || field === 'amount' || field === 'estimatedCost') return esc(currency(record[field]));
  if (field.toLowerCase().includes('date')) return esc(formatDate(record[field]));
  if (field === 'probability' || field === 'completionPercentage') return `${esc(record[field] ?? 0)}%`;
  if (field === 'title' || field === 'name') return `<div class="row-title">${esc(record[field])}</div><div class="row-subtitle">${esc(record.notes || record.description || '')}</div>`;
  return esc(record[field] || '');
};

export const renderModuleTable = (collection, records, handlers) => {
  const columns = columnFor(collection);
  if (!records.length) return `<div class="empty-state">No records yet. Use Add ${moduleMeta[collection].singular} to create one.</div>`;
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${columns.map(c => `<th>${esc(titleCase(c))}</th>`).join('')}<th></th></tr></thead>
        <tbody>
          ${records.map(record => `
            <tr>
              ${columns.map(field => `<td>${valueFor(field, record)}</td>`).join('')}
              <td class="actions">
                <button class="icon-button" data-action="edit" data-id="${record.id}">Edit</button>
                <button class="danger-button" data-action="delete" data-id="${record.id}">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};

export const attachTableActions = (root, handlers) => {
  root.querySelectorAll('[data-action="edit"]').forEach(button => button.addEventListener('click', () => handlers.edit(button.dataset.id)));
  root.querySelectorAll('[data-action="delete"]').forEach(button => button.addEventListener('click', () => handlers.delete(button.dataset.id)));
};

export const toast = (message) => {
  const root = document.getElementById('toastRoot');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3200);
};

export const fieldDefinitions = {
  common: [
    ['status', 'select', ['Not Started', 'In Progress', 'Active', 'At Risk', 'Blocked', 'Complete', 'Open', 'Closed', 'Funded']],
    ['priority', 'select', ['Low', 'Medium', 'High']],
    ['owner', 'text'],
    ['blocked', 'checkbox'],
    ['waitingOn', 'text'],
    ['evidenceLink', 'url'],
    ['reviewCadence', 'select', ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly']],
    ['notes', 'textarea']
  ],
  tasks: [['title', 'text'], ['category', 'text'], ['dueDate', 'date']],
  readinessItems: [['title', 'text'], ['category', 'text'], ['description', 'textarea'], ['completionPercentage', 'number'], ['estimatedCost', 'number'], ['dependency', 'text'], ['blockingIssue', 'text']],
  governmentReadinessItems: [['title', 'text'], ['organization', 'text'], ['category', 'text'], ['description', 'textarea'], ['completionPercentage', 'number'], ['requiredDocumentation', 'textarea'], ['blockingIssue', 'text']],
  customers: [['name', 'text'], ['organizationName', 'text'], ['contactNames', 'text'], ['sector', 'text'], ['opportunityType', 'text'], ['stage', 'select', ['Hypothesis', 'Discovery', 'Active', 'Proposal', 'Contracting', 'Won', 'Lost']], ['probability', 'number'], ['estimatedValue', 'number'], ['expectedCloseDate', 'date'], ['nextStep', 'text'], ['decisionMaker', 'text'], ['procurementPath', 'text']],
  risks: [['title', 'text'], ['description', 'textarea'], ['category', 'text'], ['probability', 'number'], ['impact', 'number'], ['severity', 'number'], ['mitigationPlan', 'textarea'], ['reviewDate', 'date']],
  meetings: [['title', 'text'], ['date', 'date'], ['attendees', 'text'], ['organization', 'text'], ['decisions', 'textarea'], ['actionItems', 'textarea'], ['followUpDate', 'date']],
  advisorRecommendations: [['title', 'text'], ['advisorName', 'text'], ['date', 'date'], ['recommendation', 'textarea'], ['category', 'text'], ['relatedModule', 'text'], ['outcome', 'textarea']],
  fundingNeeds: [['title', 'text'], ['fundingNeed', 'text'], ['category', 'text'], ['amount', 'number'], ['purpose', 'textarea'], ['timing', 'text'], ['potentialFundingSource', 'text'], ['grantMatch', 'text']],
  roadmapItems: [['title', 'text'], ['milestone', 'text'], ['quarter', 'text'], ['month', 'text'], ['targetDate', 'date'], ['dependencies', 'textarea'], ['completionPercentage', 'number']]
};

export const showRecordModal = ({ collection, record = {}, onSave, onClose }) => {
  const meta = moduleMeta[collection];
  const root = document.getElementById('modalRoot');
  const fields = [...(fieldDefinitions[collection] || []), ...fieldDefinitions.common];
  root.classList.add('active');
  root.innerHTML = `
    <div class="modal-backdrop" data-close="true"></div>
    <section class="modal" role="dialog" aria-modal="true" aria-label="${esc(meta.singular)} form">
      <div class="modal-header">
        <h2>${record.id ? 'Edit' : 'Add'} ${esc(meta.singular)}</h2>
        <button class="icon-button" data-close="true">Close</button>
      </div>
      <form id="recordForm" class="form-grid">
        ${fields.map(([name, type, options]) => renderField(name, type, options, record[name])).join('')}
        <div class="form-actions full">
          <button type="button" class="secondary-button" data-close="true">Cancel</button>
          <button type="submit" class="primary-button">Save</button>
        </div>
      </form>
    </section>
  `;
  root.querySelectorAll('[data-close="true"]').forEach(el => el.addEventListener('click', onClose));
  root.querySelector('#recordForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = { ...record };
    fields.forEach(([name, type]) => {
      if (type === 'checkbox') data[name] = formData.get(name) === 'on';
      else if (type === 'number') data[name] = Number(formData.get(name) || 0);
      else data[name] = formData.get(name) || '';
    });
    onSave(data);
  });
};

const renderField = (name, type, options = [], value = '') => {
  const label = titleCase(name);
  const full = type === 'textarea' || ['notes', 'description', 'recommendation', 'purpose', 'decisions', 'actionItems', 'mitigationPlan'].includes(name) ? 'full' : '';
  if (type === 'select') {
    return `<div class="form-field ${full}"><label>${esc(label)}</label><select name="${esc(name)}">${options.map(opt => `<option value="${esc(opt)}" ${opt === value ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select></div>`;
  }
  if (type === 'textarea') {
    return `<div class="form-field ${full}"><label>${esc(label)}</label><textarea name="${esc(name)}">${esc(value)}</textarea></div>`;
  }
  if (type === 'checkbox') {
    return `<div class="form-field"><label>${esc(label)}</label><select name="${esc(name)}"><option value="">No</option><option value="on" ${value ? 'selected' : ''}>Yes</option></select></div>`;
  }
  return `<div class="form-field ${full}"><label>${esc(label)}</label><input name="${esc(name)}" type="${esc(type)}" value="${esc(value)}" /></div>`;
};

export const closeModal = () => {
  const root = document.getElementById('modalRoot');
  root.classList.remove('active');
  root.innerHTML = '';
};
