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

  people: 'People',
  organizations: 'Organizations',
  relationships: 'Relationships',
  interactions: 'Interactions',
  followUps: 'Follow-Ups',

  products: 'Product Overview',
  productVersions: 'Product Versions',
  productCapabilities: 'Capabilities',
  audiences: 'Audiences',
  contentAssets: 'Content Assets',
  presentations: 'Presentations',
  useCases: 'Use Cases',
  caseStudies: 'Case Studies',
  approvedClaims: 'Approved Claims',

  fundingOpportunities: 'Funding Opportunities',
  fundingApplications: 'Funding Applications',

  institutionalPathways: 'Institutional Pathways',
  pathwayCases: 'Pathway Cases',

  workPackages: 'Work Packages',
  resourceRequirements: 'Resource Requirements',

  documents: 'Documents',
  decisions: 'Decisions',
  evidence: 'Evidence',
  settings: 'Settings'
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
  return (
    item.displayName ||
    item.title ||
    item.name ||
    item.company ||
    item.topic ||
    'Untitled'
  );
}

function getItemSubtitle(item) {
  return (
    item.description ||
    item.notes ||
    item.title ||
    item.status ||
    item.owner ||
    ''
  );
}

function setPageTitle(title) {
  if (pageTitle) {
    pageTitle.textContent = title;
  }
}

function parseList(value = '') {
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(value) {
  return Array.isArray(value) ? value.join(', ') : value || '';
}

function getOrganizationName(organizationId, data) {
  const organization = (data.organizations || []).find(
    (item) => item.id === organizationId
  );

  return organization?.name || '';
}

export function showStatus(message) {
  if (!toastRoot) return;

  toastRoot.innerHTML = `
    <div class="toast">
      ${escapeHtml(message)}
    </div>
  `;

  window.clearTimeout(showStatus.timeout);

  showStatus.timeout = window.setTimeout(() => {
    toastRoot.innerHTML = '';
  }, 3000);
}

export function bindNavigation(handlers) {
  if (!navEl) return;

  navEl.innerHTML = `
    <button data-view="dashboard">Dashboard</button>

    <div class="nav-section-label">Execution</div>
    <button data-view="tasks">Tasks</button>
    <button data-view="roadmapItems">Roadmap</button>
    <button data-view="workPackages">Work Packages</button>
    <button data-view="resourceRequirements">Resources</button>
    <button data-view="decisions">Decisions</button>

    <div class="nav-section-label">Relationships</div>
    <button data-view="people">People</button>
    <button data-view="organizations">Organizations</button>
    <button data-view="interactions">Interactions</button>
    <button data-view="followUps">Follow-Ups</button>

    <div class="nav-section-label">Product & Market</div>
    <button data-view="products">Product Overview</button>
    <button data-view="productVersions">Product Versions</button>
    <button data-view="productCapabilities">Capabilities</button>
    <button data-view="audiences">Audiences</button>
    <button data-view="contentAssets">Content Assets</button>
    <button data-view="presentations">Presentations</button>
    <button data-view="useCases">Use Cases</button>
    <button data-view="caseStudies">Case Studies</button>
    <button data-view="approvedClaims">Approved Claims</button>

    <div class="nav-section-label">Commercialization</div>
    <button data-view="readinessItems">Commercial Readiness</button>
    <button data-view="governmentReadinessItems">Government Readiness</button>
    <button data-view="customers">Customers</button>
    <button data-view="risks">Risks</button>

    <div class="nav-section-label">Funding</div>
    <button data-view="fundingNeeds">Funding Needs</button>
    <button data-view="fundingOpportunities">Funding Opportunities</button>
    <button data-view="fundingApplications">Funding Applications</button>

    <div class="nav-section-label">Institutional</div>
    <button data-view="institutionalPathways">Institutional Pathways</button>
    <button data-view="pathwayCases">Pathway Cases</button>

    <div class="nav-section-label">Knowledge</div>
    <button data-view="meetings">Meetings</button>
    <button data-view="advisorRecommendations">Advisors</button>
    <button data-view="documents">Documents</button>
    <button data-view="evidence">Evidence</button>
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

            <button
              class="ghost-button"
              type="button"
              data-close-modal
            >
              Close
            </button>
          </div>

          <form id="quickAddForm" class="form-grid">
            <label>
              Collection
              <select name="collection">
                <option value="tasks">Task</option>
                <option value="people">Person</option>
                <option value="organizations">Organization</option>
                <option value="followUps">Follow-Up</option>
                <option value="risks">Risk</option>
                <option value="customers">Customer</option>
                <option value="fundingNeeds">Funding Need</option>
                <option value="fundingOpportunities">Funding Opportunity</option>
                <option value="meetings">Meeting</option>
                <option value="roadmapItems">Roadmap Item</option>
                <option value="workPackages">Work Package</option>
                <option value="decisions">Decision</option>
                <option value="documents">Document</option>
                <option value="advisorRecommendations">Advisor Recommendation</option>
              </select>
            </label>

            <label>
              Title or Name
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

            <button class="primary-button" type="submit">
              Save
            </button>
          </form>
        </section>
      </div>
    `;

    modalRoot
      .querySelector('[data-close-modal]')
      .addEventListener('click', () => {
        modalRoot.innerHTML = '';
      });

    modalRoot
      .querySelector('#quickAddForm')
      .addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        await handlers.onQuickAdd({
          collection: formData.get('collection'),
          title: formData.get('title'),
          description: formData.get('description'),
          owner: formData.get('owner'),
          priority: formData.get('priority'),
          status: formData.get('status'),
          dueDate: formData.get('dueDate')
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

function renderGenericItemForm(collection, item = {}) {
  const title =
    getItemTitle(item) === 'Untitled'
      ? ''
      : getItemTitle(item);

  return `
    <form
      class="item-form"
      data-form-type="generic"
      data-collection="${escapeHtml(collection)}"
      data-id="${escapeHtml(item.id || '')}"
    >
      <div class="form-grid-two">
        <label>
          Title
          <input
            name="title"
            value="${escapeHtml(title)}"
          />
        </label>

        <label>
          Owner
          <input
            name="owner"
            value="${escapeHtml(item.owner || '')}"
          />
        </label>

        <label>
          Status
          <input
            name="status"
            value="${escapeHtml(item.status || '')}"
          />
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
          <input
            type="date"
            name="dueDate"
            value="${escapeHtml(item.dueDate || '')}"
          />
        </label>

        <label>
          Confidentiality
          <select name="confidentiality">
            <option value="Public" ${item.confidentiality === 'Public' ? 'selected' : ''}>Public</option>
            <option value="Internal" ${item.confidentiality === 'Internal' ? 'selected' : ''}>Internal</option>
            <option value="Confidential" ${item.confidentiality === 'Confidential' ? 'selected' : ''}>Confidential</option>
            <option value="Restricted" ${item.confidentiality === 'Restricted' ? 'selected' : ''}>Restricted</option>
          </select>
        </label>
      </div>

      <label>
        Description
        <textarea name="description">${escapeHtml(
          item.description || item.notes || ''
        )}</textarea>
      </label>

      <button class="primary-button" type="submit">
        Save
      </button>
    </form>
  `;
}

function renderPersonForm(item = {}, data = {}) {
  return `
    <form
      class="item-form person-form"
      data-form-type="person"
      data-collection="people"
      data-id="${escapeHtml(item.id || '')}"
    >
      <div class="form-grid-two">
        <label>
          First Name
          <input
            name="firstName"
            value="${escapeHtml(item.firstName || '')}"
          />
        </label>

        <label>
          Last Name
          <input
            name="lastName"
            value="${escapeHtml(item.lastName || '')}"
          />
        </label>

        <label>
          Display Name
          <input
            name="displayName"
            value="${escapeHtml(item.displayName || '')}"
          />
        </label>

        <label>
          Job Title
          <input
            name="title"
            value="${escapeHtml(item.title || '')}"
          />
        </label>

        <label>
          Department
          <input
            name="department"
            value="${escapeHtml(item.department || '')}"
          />
        </label>

        <label>
          Primary Organization
          <select name="primaryOrganizationId">
            <option value="">None</option>

            ${(data.organizations || [])
              .map(
                (organization) => `
                  <option
                    value="${escapeHtml(organization.id)}"
                    ${
                      organization.id === item.primaryOrganizationId
                        ? 'selected'
                        : ''
                    }
                  >
                    ${escapeHtml(organization.name)}
                  </option>
                `
              )
              .join('')}
          </select>
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value="${escapeHtml(item.email || '')}"
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            value="${escapeHtml(item.phone || '')}"
          />
        </label>

        <label>
          Relationship Strength
          <select name="relationshipStrength">
            <option value="">Not Set</option>
            <option value="New" ${item.relationshipStrength === 'New' ? 'selected' : ''}>New</option>
            <option value="Developing" ${item.relationshipStrength === 'Developing' ? 'selected' : ''}>Developing</option>
            <option value="Strong" ${item.relationshipStrength === 'Strong' ? 'selected' : ''}>Strong</option>
            <option value="Dormant" ${item.relationshipStrength === 'Dormant' ? 'selected' : ''}>Dormant</option>
          </select>
        </label>

        <label>
          Influence Level
          <select name="influenceLevel">
            <option value="">Not Set</option>
            <option value="Low" ${item.influenceLevel === 'Low' ? 'selected' : ''}>Low</option>
            <option value="Medium" ${item.influenceLevel === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${item.influenceLevel === 'High' ? 'selected' : ''}>High</option>
          </select>
        </label>

        <label>
          Decision Authority
          <input
            name="decisionAuthority"
            value="${escapeHtml(item.decisionAuthority || '')}"
          />
        </label>

        <label>
          Next Follow-Up
          <input
            type="date"
            name="nextFollowUpDate"
            value="${escapeHtml(item.nextFollowUpDate || '')}"
          />
        </label>

        <label>
          Internal Relationship Owner
          <input
            name="internalRelationshipOwner"
            value="${escapeHtml(
              item.internalRelationshipOwner || ''
            )}"
          />
        </label>

        <label>
          Confidentiality
          <select name="confidentiality">
            <option value="Public" ${item.confidentiality === 'Public' ? 'selected' : ''}>Public</option>
            <option value="Internal" ${item.confidentiality === 'Internal' ? 'selected' : ''}>Internal</option>
            <option value="Confidential" ${item.confidentiality === 'Confidential' ? 'selected' : ''}>Confidential</option>
            <option value="Restricted" ${item.confidentiality === 'Restricted' ? 'selected' : ''}>Restricted</option>
          </select>
        </label>
      </div>

      <label>
        Relationship Types
        <input
          name="relationshipTypes"
          placeholder="Advisor, Funder Contact, Customer"
          value="${escapeHtml(joinList(item.relationshipTypes))}"
        />
      </label>

      <label>
        Focus Areas
        <input
          name="focusAreas"
          placeholder="Funding, Procurement, Health AI"
          value="${escapeHtml(joinList(item.focusAreas))}"
        />
      </label>

      <label>
        Expertise Areas
        <input
          name="expertiseAreas"
          placeholder="Commercialization, Legal, Security"
          value="${escapeHtml(joinList(item.expertiseAreas))}"
        />
      </label>

      <label>
        Notes
        <textarea name="notes">${escapeHtml(item.notes || '')}</textarea>
      </label>

      <button class="primary-button" type="submit">
        Save Person
      </button>
    </form>
  `;
}

function renderOrganizationForm(item = {}) {
  return `
    <form
      class="item-form organization-form"
      data-form-type="organization"
      data-collection="organizations"
      data-id="${escapeHtml(item.id || '')}"
    >
      <div class="form-grid-two">
        <label>
          Organization Name
          <input
            name="name"
            value="${escapeHtml(item.name || '')}"
          />
        </label>

        <label>
          Legal Name
          <input
            name="legalName"
            value="${escapeHtml(item.legalName || '')}"
          />
        </label>

        <label>
          Short Name
          <input
            name="shortName"
            value="${escapeHtml(item.shortName || '')}"
          />
        </label>

        <label>
          Organization Type
          <select name="organizationType">
            <option value="">Select Type</option>
            <option value="Company" ${item.organizationType === 'Company' ? 'selected' : ''}>Company</option>
            <option value="University" ${item.organizationType === 'University' ? 'selected' : ''}>University</option>
            <option value="Health System" ${item.organizationType === 'Health System' ? 'selected' : ''}>Health System</option>
            <option value="Government" ${item.organizationType === 'Government' ? 'selected' : ''}>Government</option>
            <option value="Funder" ${item.organizationType === 'Funder' ? 'selected' : ''}>Funder</option>
            <option value="Research Network" ${item.organizationType === 'Research Network' ? 'selected' : ''}>Research Network</option>
            <option value="Vendor" ${item.organizationType === 'Vendor' ? 'selected' : ''}>Vendor</option>
            <option value="Partner" ${item.organizationType === 'Partner' ? 'selected' : ''}>Partner</option>
            <option value="Other" ${item.organizationType === 'Other' ? 'selected' : ''}>Other</option>
          </select>
        </label>

        <label>
          Sector
          <input
            name="sector"
            value="${escapeHtml(item.sector || '')}"
          />
        </label>

        <label>
          Country
          <input
            name="country"
            value="${escapeHtml(item.country || '')}"
          />
        </label>

        <label>
          Website
          <input
            name="website"
            value="${escapeHtml(item.website || '')}"
          />
        </label>

        <label>
          Status
          <select name="active">
            <option value="true" ${item.active !== false ? 'selected' : ''}>Active</option>
            <option value="false" ${item.active === false ? 'selected' : ''}>Inactive</option>
          </select>
        </label>

        <label>
          Confidentiality
          <select name="confidentiality">
            <option value="Public" ${item.confidentiality === 'Public' ? 'selected' : ''}>Public</option>
            <option value="Internal" ${item.confidentiality === 'Internal' ? 'selected' : ''}>Internal</option>
            <option value="Confidential" ${item.confidentiality === 'Confidential' ? 'selected' : ''}>Confidential</option>
            <option value="Restricted" ${item.confidentiality === 'Restricted' ? 'selected' : ''}>Restricted</option>
          </select>
        </label>
      </div>

      <label>
        Notes
        <textarea name="notes">${escapeHtml(item.notes || '')}</textarea>
      </label>

      <button class="primary-button" type="submit">
        Save Organization
      </button>
    </form>
  `;
}

function renderGenericItemCard(collection, item) {
  return `
    <article class="item-card">
      <div>
        <h3>${escapeHtml(getItemTitle(item))}</h3>
        <p>${escapeHtml(getItemSubtitle(item))}</p>
      </div>

      <div class="item-meta">
        ${
          item.owner
            ? `<span>Owner: ${escapeHtml(item.owner)}</span>`
            : ''
        }

        ${
          item.status
            ? `<span>Status: ${escapeHtml(item.status)}</span>`
            : ''
        }

        ${
          item.priority
            ? `<span>Priority: ${escapeHtml(item.priority)}</span>`
            : ''
        }

        ${
          item.dueDate
            ? `<span>Due: ${escapeHtml(item.dueDate)}</span>`
            : ''
        }

        ${
          item.confidentiality
            ? `<span>${escapeHtml(item.confidentiality)}</span>`
            : ''
        }
      </div>

      <details>
        <summary>Edit</summary>
        ${renderGenericItemForm(collection, item)}
      </details>

      <button
        class="danger-button"
        data-delete="${escapeHtml(item.id)}"
        data-collection="${escapeHtml(collection)}"
      >
        Delete
      </button>
    </article>
  `;
}

function renderPersonCard(item, data) {
  const organizationName = getOrganizationName(
    item.primaryOrganizationId,
    data
  );

  const initials =
    `${item.firstName?.[0] || ''}${item.lastName?.[0] || ''}` ||
    'P';

  return `
    <article class="item-card person-card">
      <div class="directory-card-header">
        <div class="directory-avatar">
          ${escapeHtml(initials)}
        </div>

        <div>
          <h3>${escapeHtml(item.displayName || 'Unnamed Person')}</h3>

          <p>
            ${escapeHtml(item.title || '')}
            ${
              organizationName
                ? ` at ${escapeHtml(organizationName)}`
                : ''
            }
          </p>
        </div>
      </div>

      <div class="item-meta">
        ${
          item.relationshipStrength
            ? `<span>Relationship: ${escapeHtml(
                item.relationshipStrength
              )}</span>`
            : ''
        }

        ${
          item.influenceLevel
            ? `<span>Influence: ${escapeHtml(item.influenceLevel)}</span>`
            : ''
        }

        ${
          item.decisionAuthority
            ? `<span>Authority: ${escapeHtml(
                item.decisionAuthority
              )}</span>`
            : ''
        }

        ${
          item.nextFollowUpDate
            ? `<span>Follow-Up: ${escapeHtml(
                item.nextFollowUpDate
              )}</span>`
            : ''
        }

        ${
          item.confidentiality
            ? `<span>${escapeHtml(item.confidentiality)}</span>`
            : ''
        }
      </div>

      ${
        item.email
          ? `<p class="directory-contact">${escapeHtml(item.email)}</p>`
          : ''
      }

      ${
        item.relationshipTypes?.length
          ? `
            <div class="tag-list">
              ${item.relationshipTypes
                .map(
                  (type) => `
                    <span>${escapeHtml(type)}</span>
                  `
                )
                .join('')}
            </div>
          `
          : ''
      }

      ${
        item.focusAreas?.length
          ? `
            <p class="directory-detail">
              <strong>Focus:</strong>
              ${escapeHtml(item.focusAreas.join(', '))}
            </p>
          `
          : ''
      }

      ${
        item.notes
          ? `
            <p class="directory-detail">
              ${escapeHtml(item.notes)}
            </p>
          `
          : ''
      }

      <details>
        <summary>Edit Person</summary>
        ${renderPersonForm(item, data)}
      </details>

      <button
        class="danger-button"
        data-delete="${escapeHtml(item.id)}"
        data-collection="people"
      >
        Delete
      </button>
    </article>
  `;
}

function renderOrganizationCard(item, data) {
  const linkedPeople = (data.people || []).filter(
    (person) => person.primaryOrganizationId === item.id
  );

  return `
    <article class="item-card organization-card">
      <div>
        <p class="eyebrow">
          ${escapeHtml(item.organizationType || 'Organization')}
        </p>

        <h3>${escapeHtml(item.name || 'Unnamed Organization')}</h3>

        <p>
          ${escapeHtml(
            [item.sector, item.country].filter(Boolean).join(' · ')
          )}
        </p>
      </div>

      <div class="item-meta">
        <span>
          ${item.active === false ? 'Inactive' : 'Active'}
        </span>

        <span>
          ${linkedPeople.length}
          linked
          ${linkedPeople.length === 1 ? 'person' : 'people'}
        </span>

        ${
          item.confidentiality
            ? `<span>${escapeHtml(item.confidentiality)}</span>`
            : ''
        }
      </div>

      ${
        linkedPeople.length
          ? `
            <div class="linked-records">
              <strong>People</strong>

              ${linkedPeople
                .map(
                  (person) => `
                    <span>
                      ${escapeHtml(person.displayName)}
                      ${
                        person.title
                          ? `, ${escapeHtml(person.title)}`
                          : ''
                      }
                    </span>
                  `
                )
                .join('')}
            </div>
          `
          : ''
      }

      ${
        item.website
          ? `
            <p class="directory-contact">
              ${escapeHtml(item.website)}
            </p>
          `
          : ''
      }

      ${
        item.notes
          ? `
            <p class="directory-detail">
              ${escapeHtml(item.notes)}
            </p>
          `
          : ''
      }

      <details>
        <summary>Edit Organization</summary>
        ${renderOrganizationForm(item)}
      </details>

      <button
        class="danger-button"
        data-delete="${escapeHtml(item.id)}"
        data-collection="organizations"
      >
        Delete
      </button>
    </article>
  `;
}
function renderProductOverview(items, data) {
  const product = items[0];

  if (!product) {
    return `
      <section class="panel">
        <p class="eyebrow">Product & Market</p>
        <h2>Product Overview</h2>

        <p>
          No product record is currently stored in the database.
          The Product and Market sample data still needs to be seeded.
        </p>
      </section>
    `;
  }

  const currentVersion = (data.productVersions || []).find(
    (item) => item.id === product.currentProductVersionId
  );

  const nextVersion = (data.productVersions || []).find(
    (item) => item.id === product.nextProductVersionId
  );

  const capabilities = (data.productCapabilities || []).filter(
    (item) =>
      item.productId === product.id ||
      product.linkedProductCapabilityIds?.includes(item.id)
  );

  const audiences = data.audiences || [];
  const contentAssets = data.contentAssets || [];
  const presentations = data.presentations || [];
  const useCases = data.useCases || [];
  const caseStudies = data.caseStudies || [];
  const approvedClaims = data.approvedClaims || [];

  const currentCapabilities = capabilities.filter(
    (item) => item.availabilityStatus === 'Available'
  );

  const plannedCapabilities = capabilities.filter(
    (item) => item.availabilityStatus !== 'Available'
  );

  return `
    <section class="dashboard-hero product-hero">
      <div>
        <p class="eyebrow">Product & Market</p>

        <h2>${escapeHtml(product.name || 'FedEMR')}</h2>

        <p>
          ${escapeHtml(product.summary || product.description || '')}
        </p>
      </div>

      <div class="score-card">
        <span>Current TRL</span>
        <strong>${escapeHtml(product.currentTrl || 'Not Set')}</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard(
        'Current Capabilities',
        currentCapabilities.length
      )}

      ${renderMetricCard(
        'Planned Capabilities',
        plannedCapabilities.length
      )}

      ${renderMetricCard('Audiences', audiences.length)}
      ${renderMetricCard('Use Cases', useCases.length)}
      ${renderMetricCard('Content Assets', contentAssets.length)}
      ${renderMetricCard('Approved Claims', approvedClaims.length)}
    </section>

    <section class="content-grid">
      <article class="panel">
        <p class="eyebrow">Product Positioning</p>
        <h2>Value Proposition</h2>

        <p>
          ${escapeHtml(product.currentValueProposition || '')}
        </p>

        <h3>Research Positioning</h3>
        <p>
          ${escapeHtml(product.researchPositioning || '')}
        </p>

        <h3>Commercial Positioning</h3>
        <p>
          ${escapeHtml(product.commercialPositioning || '')}
        </p>
      </article>

      <article class="panel">
        <p class="eyebrow">Product Versions</p>
        <h2>Current and Next</h2>

        <div class="linked-records">
          <strong>Current Version</strong>

          <span>
            ${escapeHtml(
              currentVersion?.versionName || 'Not defined'
            )}
          </span>

          ${
            currentVersion?.status
              ? `
                <span>
                  Status: ${escapeHtml(currentVersion.status)}
                </span>
              `
              : ''
          }

          ${
            currentVersion?.productReadinessScore !== undefined
              ? `
                <span>
                  Product Readiness:
                  ${escapeHtml(currentVersion.productReadinessScore)}%
                </span>
              `
              : ''
          }
        </div>

        <div class="linked-records">
          <strong>Next Version</strong>

          <span>
            ${escapeHtml(
              nextVersion?.versionName || 'Not defined'
            )}
          </span>

          ${
            nextVersion?.status
              ? `
                <span>
                  Status: ${escapeHtml(nextVersion.status)}
                </span>
              `
              : ''
          }

          ${
            nextVersion?.plannedReleaseDate
              ? `
                <span>
                  Planned Release:
                  ${escapeHtml(nextVersion.plannedReleaseDate)}
                </span>
              `
              : ''
          }

          ${
            nextVersion?.productReadinessScore !== undefined
              ? `
                <span>
                  Product Readiness:
                  ${escapeHtml(nextVersion.productReadinessScore)}%
                </span>
              `
              : ''
          }
        </div>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <p class="eyebrow">Capabilities</p>
        <h2>Available Now</h2>

        ${
          currentCapabilities.length
            ? currentCapabilities
                .map(
                  (capability) => `
                    <div class="linked-records">
                      <strong>
                        ${escapeHtml(capability.name)}
                      </strong>

                      <span>
                        ${escapeHtml(
                          capability.userDescription ||
                            capability.description ||
                            ''
                        )}
                      </span>

                      <span>
                        Support:
                        ${escapeHtml(
                          capability.supportStatus || 'Not Set'
                        )}
                      </span>
                    </div>
                  `
                )
                .join('')
            : '<p>No current capabilities stored yet.</p>'
        }
      </article>

      <article class="panel">
        <p class="eyebrow">Roadmap</p>
        <h2>Planned Capabilities</h2>

        ${
          plannedCapabilities.length
            ? plannedCapabilities
                .map(
                  (capability) => `
                    <div class="linked-records">
                      <strong>
                        ${escapeHtml(capability.name)}
                      </strong>

                      <span>
                        ${escapeHtml(
                          capability.userDescription ||
                            capability.description ||
                            ''
                        )}
                      </span>

                      <span>
                        Status:
                        ${escapeHtml(
                          capability.availabilityStatus ||
                            'Not Set'
                        )}
                      </span>
                    </div>
                  `
                )
                .join('')
            : '<p>No planned capabilities stored yet.</p>'
        }
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <p class="eyebrow">Market Intelligence</p>
        <h2>Audience and Content Coverage</h2>

        <div class="item-meta">
          <span>${audiences.length} audiences</span>
          <span>${contentAssets.length} content assets</span>
          <span>${presentations.length} presentations</span>
        </div>

        ${
          audiences.length
            ? `
              <div class="tag-list">
                ${audiences
                  .map(
                    (audience) => `
                      <span>${escapeHtml(audience.name)}</span>
                    `
                  )
                  .join('')}
              </div>
            `
            : '<p>No audiences stored yet.</p>'
        }
      </article>

      <article class="panel">
        <p class="eyebrow">Evidence and Claims</p>
        <h2>Trust Controls</h2>

        <div class="item-meta">
          <span>${approvedClaims.length} claims</span>
          <span>${caseStudies.length} case studies</span>
          <span>${useCases.length} use cases</span>
        </div>

        <p>
          Claims remain controlled by approval status, evidence
          strength, permitted contexts, qualifiers, and review dates.
        </p>
      </article>
    </section>

    <section class="panel">
      <p class="eyebrow">Product Governance</p>
      <h2>Known Limitations</h2>

      ${
        product.knownLimitations?.length
          ? `
            <ul>
              ${product.knownLimitations
                .map(
                  (limitation) => `
                    <li>${escapeHtml(limitation)}</li>
                  `
                )
                .join('')}
            </ul>
          `
          : '<p>No known limitations recorded.</p>'
      }
    </section>
  `;
}
function renderProductVersions(items) {
  const currentVersion = items.find(
    (item) => item.id === 'product_version_current'
  );

  const nextVersion = items.find(
    (item) => item.id === 'product_version_v2'
  );

  const otherVersions = items.filter(
    (item) =>
      item.id !== 'product_version_current' &&
      item.id !== 'product_version_v2'
  );

  const renderVersionCard = (version, label) => {
    if (!version) {
      return `
        <article class="panel">
          <p class="eyebrow">${escapeHtml(label)}</p>
          <h2>Not Defined</h2>
          <p>No product-version record is stored.</p>
        </article>
      `;
    }

    return `
      <article class="panel">
        <p class="eyebrow">${escapeHtml(label)}</p>

        <h2>
          ${escapeHtml(
            version.versionName ||
              version.versionNumber ||
              'Unnamed Version'
          )}
        </h2>

        <div class="item-meta">
          ${
            version.status
              ? `
                <span>
                  Status: ${escapeHtml(version.status)}
                </span>
              `
              : ''
          }

          ${
            version.releaseType
              ? `
                <span>
                  Type: ${escapeHtml(version.releaseType)}
                </span>
              `
              : ''
          }

          ${
            version.productReadinessScore !== undefined
              ? `
                <span>
                  Readiness:
                  ${escapeHtml(version.productReadinessScore)}%
                </span>
              `
              : ''
          }

          ${
            version.confidentiality
              ? `
                <span>
                  ${escapeHtml(version.confidentiality)}
                </span>
              `
              : ''
          }
        </div>

        ${
          version.summary
            ? `
              <p>
                ${escapeHtml(version.summary)}
              </p>
            `
            : ''
        }

        ${
          version.releaseObjective
            ? `
              <h3>Release Objective</h3>
              <p>
                ${escapeHtml(version.releaseObjective)}
              </p>
            `
            : ''
        }

        ${
          version.plannedReleaseDate
            ? `
              <p>
                <strong>Planned Release:</strong>
                ${escapeHtml(version.plannedReleaseDate)}
              </p>
            `
            : ''
        }

        ${
          version.deploymentStage
            ? `
              <p>
                <strong>Deployment Stage:</strong>
                ${escapeHtml(version.deploymentStage)}
              </p>
            `
            : ''
        }

        ${
          version.capabilitiesIncluded?.length
            ? `
              <h3>Capabilities Included</h3>

              <div class="tag-list">
                ${version.capabilitiesIncluded
                  .map(
                    (capability) => `
                      <span>
                        ${escapeHtml(capability)}
                      </span>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }

        ${
          version.improvementsOverPreviousVersion?.length
            ? `
              <h3>Key Improvements</h3>

              <ul>
                ${version.improvementsOverPreviousVersion
                  .map(
                    (improvement) => `
                      <li>
                        ${escapeHtml(improvement)}
                      </li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          version.releaseBlockers?.length
            ? `
              <h3>Release Blockers</h3>

              <ul>
                ${version.releaseBlockers
                  .map(
                    (blocker) => `
                      <li>
                        ${escapeHtml(blocker)}
                      </li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          version.knownLimitations?.length
            ? `
              <h3>Known Limitations</h3>

              <ul>
                ${version.knownLimitations
                  .map(
                    (limitation) => `
                      <li>
                        ${escapeHtml(limitation)}
                      </li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          version.productReadinessExplanation
            ? `
              <div class="linked-records">
                <strong>Readiness Explanation</strong>

                <span>
                  ${escapeHtml(
                    version.productReadinessExplanation
                  )}
                </span>
              </div>
            `
            : ''
        }
      </article>
    `;
  };

  return `
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">Product & Market</p>

        <h2>Product Versions</h2>

        <p>
          Track what FedEMR supports today, what is planned next,
          and what must be completed before release.
        </p>
      </div>

      <div class="score-card">
        <span>Total Versions</span>
        <strong>${escapeHtml(items.length)}</strong>
      </div>
    </section>

    <section class="content-grid">
      ${renderVersionCard(currentVersion, 'Current Product')}
      ${renderVersionCard(nextVersion, 'Next Product')}
    </section>

    ${
      otherVersions.length
        ? `
          <section class="item-list">
            ${otherVersions
              .map((version) =>
                renderVersionCard(version, 'Additional Version')
              )
              .join('')}
          </section>
        `
        : ''
    }
  `;
}
function renderProductCapabilities(items) {
  const available = items.filter(
    (item) => item.availabilityStatus === 'Available'
  );

  const planned = items.filter(
    (item) => item.availabilityStatus !== 'Available'
  );

  const commerciallySupported = items.filter(
    (item) => item.commerciallySupported
  );

  const renderCapabilityCard = (capability) => `
    <article class="item-card">
      <div>
        <p class="eyebrow">
          ${escapeHtml(capability.category || 'Capability')}
        </p>

        <h3>
          ${escapeHtml(capability.name || 'Unnamed Capability')}
        </h3>

        <p>
          ${escapeHtml(
            capability.userDescription ||
              capability.description ||
              ''
          )}
        </p>
      </div>

      <div class="item-meta">
        ${
          capability.availabilityStatus
            ? `
              <span>
                Status:
                ${escapeHtml(capability.availabilityStatus)}
              </span>
            `
            : ''
        }

        ${
          capability.supportStatus
            ? `
              <span>
                Support:
                ${escapeHtml(capability.supportStatus)}
              </span>
            `
            : ''
        }

        <span>
          ${
            capability.commerciallySupported
              ? 'Commercially Supported'
              : 'Not Commercially Supported'
          }
        </span>

        ${
          capability.confidentiality
            ? `
              <span>
                ${escapeHtml(capability.confidentiality)}
              </span>
            `
            : ''
        }
      </div>

      ${
        capability.customerValue
          ? `
            <div class="linked-records">
              <strong>Customer Value</strong>
              <span>${escapeHtml(capability.customerValue)}</span>
            </div>
          `
          : ''
      }

      ${
        capability.researchValue
          ? `
            <div class="linked-records">
              <strong>Research Value</strong>
              <span>${escapeHtml(capability.researchValue)}</span>
            </div>
          `
          : ''
      }

      ${
        capability.dependencies?.length
          ? `
            <h3>Dependencies</h3>

            <ul>
              ${capability.dependencies
                .map(
                  (dependency) => `
                    <li>${escapeHtml(dependency)}</li>
                  `
                )
                .join('')}
            </ul>
          `
          : ''
      }

      ${
        capability.knownLimitations?.length
          ? `
            <h3>Known Limitations</h3>

            <ul>
              ${capability.knownLimitations
                .map(
                  (limitation) => `
                    <li>${escapeHtml(limitation)}</li>
                  `
                )
                .join('')}
            </ul>
          `
          : ''
      }

      ${
        capability.securityConsiderations?.length
          ? `
            <h3>Security Considerations</h3>

            <ul>
              ${capability.securityConsiderations
                .map(
                  (consideration) => `
                    <li>${escapeHtml(consideration)}</li>
                  `
                )
                .join('')}
            </ul>
          `
          : ''
      }

      ${
        capability.privacyConsiderations?.length
          ? `
            <h3>Privacy Considerations</h3>

            <ul>
              ${capability.privacyConsiderations
                .map(
                  (consideration) => `
                    <li>${escapeHtml(consideration)}</li>
                  `
                )
                .join('')}
            </ul>
          `
          : ''
      }

      ${
        capability.evidenceStatus
          ? `
            <div class="linked-records">
              <strong>Evidence Status</strong>
              <span>${escapeHtml(capability.evidenceStatus)}</span>
            </div>
          `
          : ''
      }
    </article>
  `;

  return `
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">Product & Market</p>

        <h2>Product Capabilities</h2>

        <p>
          Separate what is available now, what is planned, and what
          is commercially supported.
        </p>
      </div>

      <div class="score-card">
        <span>Total Capabilities</span>
        <strong>${escapeHtml(items.length)}</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Available', available.length)}
      ${renderMetricCard('Planned', planned.length)}
      ${renderMetricCard(
        'Commercially Supported',
        commerciallySupported.length
      )}
    </section>

    <section class="panel">
      <p class="eyebrow">Current Product</p>
      <h2>Available Capabilities</h2>
    </section>

    <section class="directory-grid">
      ${
        available.length
          ? available.map(renderCapabilityCard).join('')
          : '<p>No available capabilities recorded.</p>'
      }
    </section>

    <section class="panel">
      <p class="eyebrow">Roadmap</p>
      <h2>Planned or In-Development Capabilities</h2>
    </section>

    <section class="directory-grid">
      ${
        planned.length
          ? planned.map(renderCapabilityCard).join('')
          : '<p>No planned capabilities recorded.</p>'
      }
    </section>
  `;
}
function bindCollectionActions(handlers) {
  if (!appRoot) return;

  appRoot.querySelectorAll('.item-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const formType = form.dataset.formType;

      if (formType === 'person') {
        const firstName = formData.get('firstName') || '';
        const lastName = formData.get('lastName') || '';
        const enteredDisplayName = formData.get('displayName') || '';

        await handlers.onSave('people', {
          id: form.dataset.id || undefined,
          firstName,
          lastName,
          displayName:
            enteredDisplayName ||
            `${firstName} ${lastName}`.trim() ||
            'Unnamed Person',
          title: formData.get('title'),
          department: formData.get('department'),
          primaryOrganizationId: formData.get(
            'primaryOrganizationId'
          ),
          email: formData.get('email'),
          phone: formData.get('phone'),
          relationshipStrength: formData.get(
            'relationshipStrength'
          ),
          influenceLevel: formData.get('influenceLevel'),
          decisionAuthority: formData.get('decisionAuthority'),
          nextFollowUpDate: formData.get('nextFollowUpDate'),
          internalRelationshipOwner: formData.get(
            'internalRelationshipOwner'
          ),
          relationshipTypes: parseList(
            formData.get('relationshipTypes')
          ),
          focusAreas: parseList(formData.get('focusAreas')),
          expertiseAreas: parseList(
            formData.get('expertiseAreas')
          ),
          notes: formData.get('notes'),
          confidentiality: formData.get('confidentiality'),
          active: true
        });

        return;
      }

      if (formType === 'organization') {
        await handlers.onSave('organizations', {
          id: form.dataset.id || undefined,
          name: formData.get('name') || 'Unnamed Organization',
          legalName: formData.get('legalName'),
          shortName: formData.get('shortName'),
          organizationType: formData.get('organizationType'),
          sector: formData.get('sector'),
          country: formData.get('country'),
          website: formData.get('website'),
          active: formData.get('active') === 'true',
          notes: formData.get('notes'),
          confidentiality: formData.get('confidentiality')
        });

        return;
      }

      await handlers.onSave(form.dataset.collection, {
        id: form.dataset.id || undefined,
        title: formData.get('title'),
        description: formData.get('description'),
        owner: formData.get('owner'),
        status: formData.get('status'),
        priority: formData.get('priority'),
        dueDate: formData.get('dueDate'),
        confidentiality: formData.get('confidentiality')
      });
    });
  });

  appRoot.querySelectorAll('[data-delete]').forEach((button) => {
    button.addEventListener('click', async () => {
      await handlers.onDelete(
        button.dataset.collection,
        button.dataset.delete
      );
    });
  });
}

export function renderDashboard(model, handlers) {
  const { data, executiveScore } = model;

  const tasks = data.tasks || [];
  const risks = data.risks || [];
  const people = data.people || [];
  const organizations = data.organizations || [];
  const followUps = data.followUps || [];

  setPageTitle('Dashboard');

  appRoot.innerHTML = `
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">FedEMR Technologies</p>

        <h2>Executive Operating Dashboard</h2>

        <p>
          Commercialization, funding, institutional pathways,
          relationships, resources, risks, and execution in one
          local-first command centre.
        </p>
      </div>

      <div class="score-card">
        <span>Executive Score</span>
        <strong>${escapeHtml(executiveScore)}%</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Open Tasks', tasks.length)}
      ${renderMetricCard('People', people.length)}
      ${renderMetricCard('Organizations', organizations.length)}
      ${renderMetricCard('Follow-Ups', followUps.length)}
      ${renderMetricCard('Risks', risks.length)}
    </section>

    <section class="content-grid">
      <article class="panel">
        <h2>Top Priorities</h2>

        ${
          tasks
            .slice(0, 5)
            .map((item) => renderGenericItemCard('tasks', item))
            .join('') || '<p>No tasks yet.</p>'
        }
      </article>

      <article class="panel">
        <h2>Active Risks</h2>

        ${
          risks
            .slice(0, 5)
            .map((item) => renderGenericItemCard('risks', item))
            .join('') || '<p>No risks yet.</p>'
        }
      </article>
    </section>
  `;

  bindCollectionActions(handlers);
}

export function renderCollection(
  collection,
  items,
  handlers,
  data = {}
) {
    setPageTitle(formatCollectionName(collection));

   if (collection === 'products') {
    appRoot.innerHTML = renderProductOverview(items, data);

    return;
  }

   if (collection === 'productVersions') {
    appRoot.innerHTML = renderProductVersions(items);

    return;
  }

  if (collection === 'productCapabilities') {
    appRoot.innerHTML = renderProductCapabilities(items);

    return;
  }

  if (collection === 'people') {
    appRoot.innerHTML = `
      <section class="panel">
        <p class="eyebrow">Relationship Intelligence</p>

        <h2>Add Person</h2>

        <p>
          Maintain a central directory of advisors, funders,
          collaborators, customers, legal contacts, government
          contacts, and institutional decision-makers.
        </p>

        ${renderPersonForm({}, data)}
      </section>

      <section class="directory-grid">
        ${
          items
            .map((item) => renderPersonCard(item, data))
            .join('') || '<p>No people yet.</p>'
        }
      </section>
    `;

    bindCollectionActions(handlers);

    return;
  }

  if (collection === 'organizations') {
    appRoot.innerHTML = `
      <section class="panel">
        <p class="eyebrow">Relationship Intelligence</p>

        <h2>Add Organization</h2>

        <p>
          Track companies, universities, funders, health systems,
          government bodies, vendors, research networks, and
          delivery partners.
        </p>

        ${renderOrganizationForm()}
      </section>

      <section class="directory-grid">
        ${
          items
            .map((item) => renderOrganizationCard(item, data))
            .join('') || '<p>No organizations yet.</p>'
        }
      </section>
    `;

    bindCollectionActions(handlers);

    return;
  }

  appRoot.innerHTML = `
    <section class="panel">
      <h2>Add New ${escapeHtml(formatCollectionName(collection))}</h2>

      ${renderGenericItemForm(collection)}
    </section>

    <section class="item-list">
      ${
        items
          .map((item) => renderGenericItemCard(collection, item))
          .join('') || '<p>No items yet.</p>'
      }
    </section>
  `;

  bindCollectionActions(handlers);
}

export function renderSearchResults(results, query, handlers) {
  setPageTitle('Search');

  appRoot.innerHTML = `
    <section class="panel">
      <h2>Search Results</h2>

      <p>
        ${results.length}
        result${results.length === 1 ? '' : 's'}
        for "${escapeHtml(query)}"
      </p>
    </section>

    <section class="item-list">
      ${
        results
          .map(
            (result) => `
              <div class="collection-label">
                ${escapeHtml(formatCollectionName(result.collection))}
              </div>

              ${renderGenericItemCard(
                result.collection,
                result.item
              )}
            `
          )
          .join('') || '<p>No matching items found.</p>'
      }
    </section>
  `;

  bindCollectionActions(handlers);
}