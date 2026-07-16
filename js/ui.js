const appRoot = document.querySelector('#app');
const pageTitle = document.querySelector('#pageTitle');
const navEl = document.querySelector('#sidebarNav');
const modalRoot = document.querySelector('#modalRoot');
const toastRoot = document.querySelector('#toastRoot');
const quickAddButton = document.querySelector('#quickAddButton');
const searchInput = document.querySelector('#globalSearch');
const importInput = document.querySelector('#importInput');
const exportButton = document.querySelector('#exportButton');

const appFrame = document.querySelector('.app-frame');
const sidebar = document.querySelector('#sidebar');
const sectionPanelTitle = document.querySelector(
  '#sectionPanelTitle'
);

const primaryRailButtons = document.querySelectorAll(
  '[data-primary-section]'
);

const sidebarSearchInput = document.querySelector(
  '#sidebarSearch'
);

const sidebarCollapseButton = document.querySelector(
  '#sidebarCollapseButton'
);
const desktopPanelToggle = document.querySelector(
  '#desktopPanelToggle'
);

const mobileMenuButton = document.querySelector(
  '#mobileMenuButton'
);

const mobileSidebarBackdrop = document.querySelector(
  '#mobileSidebarBackdrop'
);

const commandButton = document.querySelector('#commandButton');
const settingsButton = document.querySelector('#settingsButton');

const brandLogoElements = document.querySelectorAll(
  '#appBrandLogo, #sectionBrandLogo'
);

const brandFallback = document.querySelector(
  '#appBrandFallback'
);

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

actionItems: 'Action Center',
workflowTemplates: 'Workflow Templates',
workflowInstances: 'Active Workflows',
workflowSteps: 'Workflow Steps',
aiActionProposals: 'AI Action Proposals',

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
const navigationSections = {
  home: {
    title: 'Operating System',
    defaultView: 'dashboard',
    pages: [
      ['dashboard', 'Dashboard'],
      ['readinessItems', 'Commercial Readiness'],
      [
        'governmentReadinessItems',
        'Government Readiness'
      ],
      ['customers', 'Customers'],
      ['risks', 'Risks']
    ]
  },

  execution: {
    title: 'Execution',
    defaultView: 'tasks',
    pages: [
  ['actionItems', 'Action Center'],
  ['workflowInstances', 'Active Workflows'],
  ['tasks', 'Tasks'],
  ['roadmapItems', 'Roadmap'],
  ['workPackages', 'Work Packages'],
  ['resourceRequirements', 'Resources'],
  ['decisions', 'Decisions']
]
  },

  relationships: {
    title: 'Relationships',
    defaultView: 'people',
    pages: [
      ['people', 'People'],
      ['organizations', 'Organizations'],
      ['interactions', 'Interactions'],
      ['followUps', 'Follow-Ups']
    ]
  },

  product: {
    title: 'Product & Market',
    defaultView: 'products',
    pages: [
      ['products', 'Product Overview'],
      ['productVersions', 'Product Versions'],
      ['productCapabilities', 'Capabilities'],
      ['audiences', 'Audiences'],
      ['contentAssets', 'Content Assets'],
      ['presentations', 'Presentations'],
      ['useCases', 'Use Cases'],
      ['caseStudies', 'Case Studies'],
      ['approvedClaims', 'Approved Claims']
    ]
  },

  funding: {
    title: 'Funding',
    defaultView: 'fundingNeeds',
    pages: [
      ['fundingNeeds', 'Funding Needs'],
      ['fundingOpportunities', 'Funding Opportunities'],
      ['fundingApplications', 'Funding Applications']
    ]
  },

  institutional: {
    title: 'Institutional Pathways',
    defaultView: 'institutionalPathways',
    pages: [
      ['institutionalPathways', 'Institutional Pathways'],
      ['pathwayCases', 'Pathway Cases']
    ]
  },

  knowledge: {
    title: 'Knowledge',
    defaultView: 'meetings',
    pages: [
      ['meetings', 'Meetings'],
      ['advisorRecommendations', 'Advisors'],
      ['documents', 'Documents'],
      ['evidence', 'Evidence']
    ]
  }
};

let activeNavigationSection = 'home';
let activeNavigationView = 'dashboard';

function findSectionForView(view) {
  return Object.entries(navigationSections).find(
    ([, section]) =>
      section.pages.some(([pageView]) => pageView === view)
  )?.[0];
}

function closeMobileNavigation() {
  if (!sidebar || !mobileSidebarBackdrop) return;

  sidebar.classList.remove('mobile-open');
  mobileSidebarBackdrop.hidden = true;

  if (mobileMenuButton) {
    mobileMenuButton.setAttribute(
      'aria-expanded',
      'false'
    );
  }
}

function updatePrimaryRail(sectionName) {
  primaryRailButtons.forEach((button) => {
    const isActive =
      button.dataset.primarySection === sectionName;

    button.classList.toggle('active', isActive);

    if (isActive) {
      button.setAttribute('aria-current', 'page');
    } else {
      button.removeAttribute('aria-current');
    }
  });
}

function renderSectionNavigation(sectionName) {
  const section =
    navigationSections[sectionName] ||
    navigationSections.home;

  activeNavigationSection = sectionName;

  if (sectionPanelTitle) {
    sectionPanelTitle.textContent = section.title;
  }

  navEl.innerHTML = section.pages
    .map(
      ([view, label]) => `
        <button
          type="button"
          data-view="${escapeHtml(view)}"
          ${
            view === activeNavigationView
              ? 'class="active" aria-current="page"'
              : ''
          }
        >
          ${escapeHtml(label)}
        </button>
      `
    )
    .join('');

  updatePrimaryRail(sectionName);
}

function updateActiveNavigation(view) {
  activeNavigationView = view;

  const sectionName = findSectionForView(view);

  if (
    sectionName &&
    sectionName !== activeNavigationSection
  ) {
    renderSectionNavigation(sectionName);
  }

  navEl
    .querySelectorAll('[data-view]')
    .forEach((button) => {
      const isActive = button.dataset.view === view;

      button.classList.toggle('active', isActive);

      if (isActive) {
        button.setAttribute('aria-current', 'page');
      } else {
        button.removeAttribute('aria-current');
      }
    });
}

function openCommandSearch(handlers) {
  if (!modalRoot) return;

  modalRoot.innerHTML = `
    <div class="modal-backdrop" data-command-backdrop>
      <section
        class="modal command-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="commandSearchTitle"
      >
        <div class="modal-header">
          <div>
            <p class="eyebrow">Command Centre</p>
            <h2 id="commandSearchTitle">
              Search the operating system
            </h2>
          </div>

          <button
            class="ghost-button"
            type="button"
            data-close-command
          >
            Close
          </button>
        </div>

        <label>
          Search
          <input
            id="commandSearchInput"
            type="search"
            placeholder="Search tasks, people, funding, risks..."
            autocomplete="off"
          />
        </label>

        <p class="command-help">
          Results will appear in the main workspace as you type.
        </p>
      </section>
    </div>
  `;

  const commandSearchInput = modalRoot.querySelector(
    '#commandSearchInput'
  );

  const closeCommand = () => {
    modalRoot.innerHTML = '';
  };

  modalRoot
    .querySelector('[data-close-command]')
    .addEventListener('click', closeCommand);

  modalRoot
    .querySelector('[data-command-backdrop]')
    .addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        closeCommand();
      }
    });

  commandSearchInput.addEventListener(
    'input',
    (event) => {
      const value = event.target.value;

      if (searchInput) {
        searchInput.value = value;
      }

      handlers.onSearch(value);
    }
  );

  commandSearchInput.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') {
        closeCommand();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        closeCommand();
      }
    }
  );

  window.setTimeout(() => {
    commandSearchInput.focus();
  }, 0);
}
export function bindNavigation(handlers) {
  if (!navEl) return;

  renderSectionNavigation(activeNavigationSection);

  navEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-view]');

    if (!button) return;

    const view = button.dataset.view;

    updateActiveNavigation(view);
    closeMobileNavigation();
    handlers.onNavigate(view);
  });

  primaryRailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const sectionName =
        button.dataset.primarySection;

      const section =
        navigationSections[sectionName];

      if (!section) return;

      activeNavigationSection = sectionName;
      activeNavigationView = section.defaultView;

      renderSectionNavigation(sectionName);
      handlers.onNavigate(section.defaultView);
    });
  });

  if (sidebarSearchInput) {
    sidebarSearchInput.addEventListener(
      'input',
      (event) => {
        const query = event.target.value
          .trim()
          .toLowerCase();

        navEl
          .querySelectorAll('[data-view]')
          .forEach((button) => {
            const matches =
              !query ||
              button.textContent
                .trim()
                .toLowerCase()
                .includes(query);

            button.hidden = !matches;
          });
      }
    );
  }

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      handlers.onSearch(event.target.value);
    });
  }

    const setSectionPanelCollapsed = (collapsed) => {
    if (!appFrame) return;

    appFrame.classList.toggle(
      'section-panel-collapsed',
      collapsed
    );

    if (sidebarCollapseButton) {
      sidebarCollapseButton.setAttribute(
        'aria-expanded',
        String(!collapsed)
      );
    }

    if (desktopPanelToggle) {
      desktopPanelToggle.setAttribute(
        'aria-expanded',
        String(!collapsed)
      );

      desktopPanelToggle.setAttribute(
        'aria-label',
        collapsed
          ? 'Expand navigation'
          : 'Collapse navigation'
      );

      desktopPanelToggle.setAttribute(
        'title',
        collapsed
          ? 'Expand navigation'
          : 'Collapse navigation'
      );

      desktopPanelToggle.innerHTML = `
        <span aria-hidden="true">
          ${collapsed ? '›' : '‹'}
        </span>
      `;
    }
  };

  if (sidebarCollapseButton && appFrame) {
    sidebarCollapseButton.addEventListener(
      'click',
      () => {
        setSectionPanelCollapsed(true);
      }
    );
  }

  if (desktopPanelToggle && appFrame) {
    desktopPanelToggle.addEventListener(
      'click',
      () => {
        const collapsed =
          appFrame.classList.contains(
            'section-panel-collapsed'
          );

        setSectionPanelCollapsed(!collapsed);
      }
    );
  }

  if (
    mobileMenuButton &&
    sidebar &&
    mobileSidebarBackdrop
  ) {
    mobileMenuButton.addEventListener('click', () => {
      const isOpen =
        sidebar.classList.toggle('mobile-open');

      mobileSidebarBackdrop.hidden = !isOpen;

      mobileMenuButton.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    });

    mobileSidebarBackdrop.addEventListener(
      'click',
      closeMobileNavigation
    );
  }

  if (commandButton) {
    commandButton.addEventListener('click', () => {
      openCommandSearch(handlers);
    });
  }

  document.addEventListener('keydown', (event) => {
    const commandKey =
      navigator.platform.toLowerCase().includes('mac')
        ? event.metaKey
        : event.ctrlKey;

    if (
      commandKey &&
      event.key.toLowerCase() === 'k'
    ) {
      event.preventDefault();
      openCommandSearch(handlers);
    }

    if (event.key === 'Escape') {
      closeMobileNavigation();
    }
  });

  if (settingsButton) {
    settingsButton.addEventListener('click', () => {
      activeNavigationView = 'settings';
      closeMobileNavigation();
      handlers.onNavigate('settings');
    });
  }

  brandLogoElements.forEach((logo) => {
    logo.addEventListener('error', () => {
      logo.hidden = true;

      if (brandFallback) {
        brandFallback.style.display = 'grid';
      }
    });
  });
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
function renderAudiences(items) {
  const activeAudiences = items.filter(
    (item) => item.active !== false
  );

  const renderAudienceCard = (audience) => `
    <article class="item-card">
      <div>
        <p class="eyebrow">
          ${escapeHtml(audience.audienceType || 'Audience')}
        </p>

        <h3>
          ${escapeHtml(audience.name || 'Unnamed Audience')}
        </h3>

        <p>
          ${escapeHtml(audience.description || '')}
        </p>
      </div>

      <div class="item-meta">
        ${
          audience.knowledgeLevel
            ? `
              <span>
                Knowledge:
                ${escapeHtml(audience.knowledgeLevel)}
              </span>
            `
            : ''
        }

        ${
          audience.desiredTechnicalDepth
            ? `
              <span>
                Technical Depth:
                ${escapeHtml(audience.desiredTechnicalDepth)}
              </span>
            `
            : ''
        }

        <span>
          ${audience.active === false ? 'Inactive' : 'Active'}
        </span>

        ${
          audience.confidentiality
            ? `
              <span>
                ${escapeHtml(audience.confidentiality)}
              </span>
            `
            : ''
        }
      </div>

      ${
        audience.primaryGoals?.length
          ? `
            <h3>Primary Goals</h3>

            <div class="tag-list">
              ${audience.primaryGoals
                .map(
                  (goal) => `
                    <span>${escapeHtml(goal)}</span>
                  `
                )
                .join('')}
            </div>
          `
          : ''
      }

      ${
        audience.primaryConcerns?.length
          ? `
            <h3>Primary Concerns</h3>

            <ul>
              ${audience.primaryConcerns
                .map(
                  (concern) => `
                    <li>${escapeHtml(concern)}</li>
                  `
                )
                .join('')}
            </ul>
          `
          : ''
      }

      ${
        audience.commonQuestions?.length
          ? `
            <h3>Common Questions</h3>

            <ul>
              ${audience.commonQuestions
                .map(
                  (question) => `
                    <li>${escapeHtml(question)}</li>
                  `
                )
                .join('')}
            </ul>
          `
          : ''
      }

      ${
        audience.preferredTerminology?.length
          ? `
            <h3>Preferred Terminology</h3>

            <div class="tag-list">
              ${audience.preferredTerminology
                .map(
                  (term) => `
                    <span>${escapeHtml(term)}</span>
                  `
                )
                .join('')}
            </div>
          `
          : ''
      }

      ${
        audience.termsToAvoid?.length
          ? `
            <h3>Terms to Avoid</h3>

            <ul>
              ${audience.termsToAvoid
                .map(
                  (term) => `
                    <li>${escapeHtml(term)}</li>
                  `
                )
                .join('')}
            </ul>
          `
          : ''
      }

      ${
        audience.typicalCallToAction
          ? `
            <div class="linked-records">
              <strong>Typical Call to Action</strong>

              <span>
                ${escapeHtml(audience.typicalCallToAction)}
              </span>
            </div>
          `
          : ''
      }

      ${
        audience.preferredEvidenceTypes?.length
          ? `
            <h3>Preferred Evidence</h3>

            <div class="tag-list">
              ${audience.preferredEvidenceTypes
                .map(
                  (evidenceType) => `
                    <span>${escapeHtml(evidenceType)}</span>
                  `
                )
                .join('')}
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

        <h2>Audience Intelligence</h2>

        <p>
          Track what each audience needs to hear, what they worry
          about, what evidence they expect, and how FedEMR should be
          explained without changing the underlying facts.
        </p>
      </div>

      <div class="score-card">
        <span>Active Audiences</span>
        <strong>${escapeHtml(activeAudiences.length)}</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Total Audiences', items.length)}

      ${renderMetricCard(
        'Clinical and Executive',
        items.filter((item) =>
          ['Clinical', 'Executive'].includes(item.audienceType)
        ).length
      )}

      ${renderMetricCard(
        'Research and Technical',
        items.filter((item) =>
          ['Research', 'Technical'].includes(item.audienceType)
        ).length
      )}

      ${renderMetricCard(
        'Government and Funding',
        items.filter((item) =>
          ['Government', 'Funding'].includes(item.audienceType)
        ).length
      )}
    </section>

    <section class="directory-grid">
      ${
        items.length
          ? items.map(renderAudienceCard).join('')
          : '<p>No audiences recorded.</p>'
      }
    </section>
  `;
}
function renderContentAssets(items, data) {
  const approved = items.filter(
    (item) => item.approvalStatus === 'Approved'
  );

  const underReview = items.filter(
    (item) => item.approvalStatus === 'Under Review'
  );

  const notReviewed = items.filter(
    (item) =>
      !item.approvalStatus ||
      item.approvalStatus === 'Not Reviewed'
  );

  const getAudienceNames = (audienceIds = []) =>
    audienceIds
      .map((id) =>
        (data.audiences || []).find(
          (audience) => audience.id === id
        )
      )
      .filter(Boolean)
      .map((audience) => audience.name);

  const getVersionName = (versionId) => {
    const version = (data.productVersions || []).find(
      (item) => item.id === versionId
    );

    return (
      version?.versionName ||
      version?.versionNumber ||
      ''
    );
  };

  const renderContentAssetCard = (asset) => {
    const audienceNames = getAudienceNames(
      asset.audienceIds || []
    );

    const versionName = getVersionName(
      asset.productVersionId
    );

    return `
      <article class="item-card">
        <div>
          <p class="eyebrow">
            ${escapeHtml(asset.contentType || 'Content Asset')}
          </p>

          <h3>
            ${escapeHtml(asset.title || 'Untitled Content Asset')}
          </h3>

          <p>
            ${escapeHtml(asset.purpose || '')}
          </p>
        </div>

        <div class="item-meta">
          ${
            asset.approvalStatus
              ? `
                <span>
                  Approval:
                  ${escapeHtml(asset.approvalStatus)}
                </span>
              `
              : ''
          }

          ${
            asset.draftStatus
              ? `
                <span>
                  Draft:
                  ${escapeHtml(asset.draftStatus)}
                </span>
              `
              : ''
          }

          ${
            asset.technicalDepth
              ? `
                <span>
                  Depth:
                  ${escapeHtml(asset.technicalDepth)}
                </span>
              `
              : ''
          }

          ${
            asset.confidentiality
              ? `
                <span>
                  ${escapeHtml(asset.confidentiality)}
                </span>
              `
              : ''
          }
        </div>

        ${
          versionName
            ? `
              <p>
                <strong>Product Version:</strong>
                ${escapeHtml(versionName)}
              </p>
            `
            : ''
        }

        ${
          audienceNames.length
            ? `
              <h3>Audiences</h3>

              <div class="tag-list">
                ${audienceNames
                  .map(
                    (name) => `
                      <span>${escapeHtml(name)}</span>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }

        ${
          asset.coreMessage
            ? `
              <div class="linked-records">
                <strong>Core Message</strong>

                <span>
                  ${escapeHtml(asset.coreMessage)}
                </span>
              </div>
            `
            : ''
        }

        ${
          asset.shortVersion
            ? `
              <div class="linked-records">
                <strong>Short Version</strong>

                <span>
                  ${escapeHtml(asset.shortVersion)}
                </span>
              </div>
            `
            : ''
        }

        ${
          asset.privacyWording
            ? `
              <div class="linked-records">
                <strong>Privacy Wording</strong>

                <span>
                  ${escapeHtml(asset.privacyWording)}
                </span>
              </div>
            `
            : ''
        }

        ${
          asset.benefits?.length
            ? `
              <h3>Benefits</h3>

              <ul>
                ${asset.benefits
                  .map(
                    (benefit) => `
                      <li>${escapeHtml(benefit)}</li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          asset.callToAction
            ? `
              <div class="linked-records">
                <strong>Call to Action</strong>

                <span>
                  ${escapeHtml(asset.callToAction)}
                </span>
              </div>
            `
            : ''
        }

        ${
          asset.reviewCadence
            ? `
              <p>
                <strong>Review Cadence:</strong>
                ${escapeHtml(asset.reviewCadence)}
              </p>
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

        <h2>Content Assets</h2>

        <p>
          Maintain reusable, audience-specific FedEMR language while
          controlling approval status, product-version alignment,
          evidence, privacy wording, and review cadence.
        </p>
      </div>

      <div class="score-card">
        <span>Total Assets</span>
        <strong>${escapeHtml(items.length)}</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Approved', approved.length)}
      ${renderMetricCard('Under Review', underReview.length)}
      ${renderMetricCard('Not Reviewed', notReviewed.length)}
      ${renderMetricCard(
        'Audience Coverage',
        new Set(
          items.flatMap((item) => item.audienceIds || [])
        ).size
      )}
    </section>

    <section class="directory-grid">
      ${
        items.length
          ? items.map(renderContentAssetCard).join('')
          : '<p>No content assets recorded.</p>'
      }
    </section>
  `;
}
function renderPresentations(items, data) {
  const approved = items.filter(
    (item) => item.approvalStatus === 'Approved'
  );

  const draft = items.filter(
    (item) =>
      item.status === 'Draft' ||
      item.approvalStatus === 'Not Reviewed' ||
      item.approvalStatus === 'Under Review'
  );

  const getAudienceNames = (audienceIds = []) =>
    audienceIds
      .map((id) =>
        (data.audiences || []).find(
          (audience) => audience.id === id
        )
      )
      .filter(Boolean)
      .map((audience) => audience.name);

  const getVersionName = (versionId) => {
    const version = (data.productVersions || []).find(
      (item) => item.id === versionId
    );

    return (
      version?.versionName ||
      version?.versionNumber ||
      ''
    );
  };

  const renderPresentationCard = (presentation) => {
    const audienceNames = getAudienceNames(
      presentation.audienceIds || []
    );

    const versionName = getVersionName(
      presentation.productVersionId
    );

    return `
      <article class="item-card">
        <div>
          <p class="eyebrow">
            ${escapeHtml(
              presentation.presentationType || 'Presentation'
            )}
          </p>

          <h3>
            ${escapeHtml(
              presentation.title || 'Untitled Presentation'
            )}
          </h3>

          <p>
            ${escapeHtml(presentation.purpose || '')}
          </p>
        </div>

        <div class="item-meta">
          ${
            presentation.status
              ? `
                <span>
                  Status:
                  ${escapeHtml(presentation.status)}
                </span>
              `
              : ''
          }

          ${
            presentation.approvalStatus
              ? `
                <span>
                  Approval:
                  ${escapeHtml(presentation.approvalStatus)}
                </span>
              `
              : ''
          }

          ${
            presentation.durationMinutes
              ? `
                <span>
                  ${escapeHtml(presentation.durationMinutes)}
                  minutes
                </span>
              `
              : ''
          }

          ${
            presentation.confidentiality
              ? `
                <span>
                  ${escapeHtml(presentation.confidentiality)}
                </span>
              `
              : ''
          }
        </div>

        ${
          versionName
            ? `
              <p>
                <strong>Product Version:</strong>
                ${escapeHtml(versionName)}
              </p>
            `
            : ''
        }

        ${
          audienceNames.length
            ? `
              <h3>Audiences</h3>

              <div class="tag-list">
                ${audienceNames
                  .map(
                    (name) => `
                      <span>${escapeHtml(name)}</span>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }

        ${
          presentation.outline?.length
            ? `
              <h3>Outline</h3>

              <ol>
                ${presentation.outline
                  .map(
                    (item) => `
                      <li>${escapeHtml(item)}</li>
                    `
                  )
                  .join('')}
              </ol>
            `
            : ''
        }

        ${
          presentation.coreMessages?.length
            ? `
              <h3>Core Messages</h3>

              <ul>
                ${presentation.coreMessages
                  .map(
                    (message) => `
                      <li>${escapeHtml(message)}</li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          presentation.callToAction
            ? `
              <div class="linked-records">
                <strong>Call to Action</strong>

                <span>
                  ${escapeHtml(presentation.callToAction)}
                </span>
              </div>
            `
            : ''
        }

        ${
          presentation.requiredRevisions?.length
            ? `
              <h3>Required Revisions</h3>

              <ul>
                ${presentation.requiredRevisions
                  .map(
                    (revision) => `
                      <li>${escapeHtml(revision)}</li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          presentation.fileName ||
          presentation.fileUrl ||
          presentation.storageLocation
            ? `
              <div class="linked-records">
                <strong>Presentation File</strong>

                ${
                  presentation.fileName
                    ? `
                      <span>
                        ${escapeHtml(presentation.fileName)}
                      </span>
                    `
                    : ''
                }

                ${
                  presentation.storageLocation
                    ? `
                      <span>
                        ${escapeHtml(
                          presentation.storageLocation
                        )}
                      </span>
                    `
                    : ''
                }

                ${
                  presentation.fileUrl
                    ? `
                      <span>
                        ${escapeHtml(presentation.fileUrl)}
                      </span>
                    `
                    : ''
                }
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

        <h2>Presentations</h2>

        <p>
          Track presentation purpose, audience, product version,
          core messages, claims, evidence, files, review status,
          feedback, and required revisions.
        </p>
      </div>

      <div class="score-card">
        <span>Total Presentations</span>
        <strong>${escapeHtml(items.length)}</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Approved', approved.length)}
      ${renderMetricCard('Draft or Review', draft.length)}
      ${renderMetricCard(
        'Audience Coverage',
        new Set(
          items.flatMap((item) => item.audienceIds || [])
        ).size
      )}
      ${renderMetricCard(
        'With Files',
        items.filter(
          (item) =>
            item.fileName ||
            item.fileUrl ||
            item.storageLocation
        ).length
      )}
    </section>

    <section class="directory-grid">
      ${
        items.length
          ? items.map(renderPresentationCard).join('')
          : '<p>No presentations recorded.</p>'
      }
    </section>
  `;
}
function renderUseCases(items, data) {
  const demonstrated = items.filter(
    (item) => item.status === 'Demonstrated'
  );

  const designed = items.filter(
    (item) => item.status === 'Designed'
  );

  const hypothetical = items.filter(
    (item) => item.status === 'Hypothetical'
  );

  const getAudienceNames = (audienceIds = []) =>
    audienceIds
      .map((id) =>
        (data.audiences || []).find(
          (audience) => audience.id === id
        )
      )
      .filter(Boolean)
      .map((audience) => audience.name);

  const getCapabilityNames = (capabilityIds = []) =>
    capabilityIds
      .map((id) =>
        (data.productCapabilities || []).find(
          (capability) => capability.id === id
        )
      )
      .filter(Boolean)
      .map((capability) => capability.name);

  const renderUseCaseCard = (useCase) => {
    const audienceNames = getAudienceNames(
      useCase.audienceIds ||
      useCase.linkedAudienceIds ||
      []
    );

    const capabilityNames = getCapabilityNames(
      useCase.requiredProductCapabilityIds ||
      useCase.linkedProductCapabilityIds ||
      []
    );

    return `
      <article class="item-card">
        <div>
          <p class="eyebrow">
            ${escapeHtml(useCase.category || 'Use Case')}
          </p>

          <h3>
            ${escapeHtml(useCase.title || 'Untitled Use Case')}
          </h3>

          <p>
            ${escapeHtml(useCase.problem || '')}
          </p>
        </div>

        <div class="item-meta">
          ${
            useCase.status
              ? `
                <span>
                  Status: ${escapeHtml(useCase.status)}
                </span>
              `
              : ''
          }

          ${
            useCase.readinessLevel
              ? `
                <span>
                  Readiness:
                  ${escapeHtml(useCase.readinessLevel)}
                </span>
              `
              : ''
          }

          ${
            useCase.confidentiality
              ? `
                <span>
                  ${escapeHtml(useCase.confidentiality)}
                </span>
              `
              : ''
          }
        </div>

        ${
          useCase.environment
            ? `
              <p>
                <strong>Environment:</strong>
                ${escapeHtml(useCase.environment)}
              </p>
            `
            : ''
        }

        ${
          useCase.primaryUser
            ? `
              <p>
                <strong>Primary User:</strong>
                ${escapeHtml(useCase.primaryUser)}
              </p>
            `
            : ''
        }

        ${
          useCase.fedemrWorkflow
            ? `
              <div class="linked-records">
                <strong>FedEMR Workflow</strong>

                <span>
                  ${escapeHtml(useCase.fedemrWorkflow)}
                </span>
              </div>
            `
            : ''
        }

        ${
          useCase.expectedOutcome
            ? `
              <div class="linked-records">
                <strong>Expected Outcome</strong>

                <span>
                  ${escapeHtml(useCase.expectedOutcome)}
                </span>
              </div>
            `
            : ''
        }

        ${
          audienceNames.length
            ? `
              <h3>Audiences</h3>

              <div class="tag-list">
                ${audienceNames
                  .map(
                    (name) => `
                      <span>${escapeHtml(name)}</span>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }

        ${
          capabilityNames.length
            ? `
              <h3>Required Capabilities</h3>

              <div class="tag-list">
                ${capabilityNames
                  .map(
                    (name) => `
                      <span>${escapeHtml(name)}</span>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }

        ${
          useCase.dependencies?.length
            ? `
              <h3>Dependencies</h3>

              <ul>
                ${useCase.dependencies
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
          useCase.knownLimitations?.length
            ? `
              <h3>Known Limitations</h3>

              <ul>
                ${useCase.knownLimitations
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
          useCase.evidenceStatus
            ? `
              <div class="linked-records">
                <strong>Evidence Status</strong>

                <span>
                  ${escapeHtml(useCase.evidenceStatus)}
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

        <h2>Use Cases</h2>

        <p>
          Track the problem, participating environment, FedEMR
          workflow, required capabilities, evidence status,
          limitations, dependencies, and readiness level for each
          potential application.
        </p>
      </div>

      <div class="score-card">
        <span>Total Use Cases</span>
        <strong>${escapeHtml(items.length)}</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Demonstrated', demonstrated.length)}
      ${renderMetricCard('Designed', designed.length)}
      ${renderMetricCard('Hypothetical', hypothetical.length)}
      ${renderMetricCard(
        'Audience Coverage',
        new Set(
          items.flatMap(
            (item) =>
              item.audienceIds ||
              item.linkedAudienceIds ||
              []
          )
        ).size
      )}
    </section>

    <section class="directory-grid">
      ${
        items.length
          ? items.map(renderUseCaseCard).join('')
          : '<p>No use cases recorded.</p>'
      }
    </section>
  `;
}
function renderCaseStudies(items, data) {
  const hypothetical = items.filter(
    (item) => item.classification === 'Hypothetical Example'
  );

  const composite = items.filter(
    (item) => item.classification === 'Composite Example'
  );

  const externalUsePermitted = items.filter(
    (item) => item.externalUsePermitted
  );

  const getCapabilityNames = (capabilityIds = []) =>
    capabilityIds
      .map((id) =>
        (data.productCapabilities || []).find(
          (capability) => capability.id === id
        )
      )
      .filter(Boolean)
      .map((capability) => capability.name);

  const renderCaseStudyCard = (caseStudy) => {
    const capabilityNames = getCapabilityNames(
      caseStudy.productCapabilityIds ||
      caseStudy.linkedProductCapabilityIds ||
      []
    );

    return `
      <article class="item-card">
        <div>
          <p class="eyebrow">
            ${escapeHtml(caseStudy.classification || 'Case Study')}
          </p>

          <h3>
            ${escapeHtml(caseStudy.title || 'Untitled Case Study')}
          </h3>

          <p>
            ${escapeHtml(caseStudy.situation || '')}
          </p>
        </div>

        <div class="item-meta">
          ${
            caseStudy.publicationStatus
              ? `
                <span>
                  Publication:
                  ${escapeHtml(caseStudy.publicationStatus)}
                </span>
              `
              : ''
          }

          <span>
            ${
              caseStudy.externalUsePermitted
                ? 'External Use Permitted'
                : 'Internal Use Only'
            }
          </span>

          ${
            caseStudy.confidentiality
              ? `
                <span>
                  ${escapeHtml(caseStudy.confidentiality)}
                </span>
              `
              : ''
          }
        </div>

        ${
          caseStudy.challenge
            ? `
              <div class="linked-records">
                <strong>Challenge</strong>

                <span>
                  ${escapeHtml(caseStudy.challenge)}
                </span>
              </div>
            `
            : ''
        }

        ${
          caseStudy.fedemrApproach
            ? `
              <div class="linked-records">
                <strong>FedEMR Approach</strong>

                <span>
                  ${escapeHtml(caseStudy.fedemrApproach)}
                </span>
              </div>
            `
            : ''
        }

        ${
          capabilityNames.length
            ? `
              <h3>Capabilities</h3>

              <div class="tag-list">
                ${capabilityNames
                  .map(
                    (name) => `
                      <span>${escapeHtml(name)}</span>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }

        ${
          caseStudy.implementationSteps?.length
            ? `
              <h3>Implementation Steps</h3>

              <ol>
                ${caseStudy.implementationSteps
                  .map(
                    (step) => `
                      <li>${escapeHtml(step)}</li>
                    `
                  )
                  .join('')}
              </ol>
            `
            : ''
        }

        ${
          caseStudy.researchBenefit
            ? `
              <div class="linked-records">
                <strong>Research Benefit</strong>

                <span>
                  ${escapeHtml(caseStudy.researchBenefit)}
                </span>
              </div>
            `
            : ''
        }

        ${
          caseStudy.privacyOutcome
            ? `
              <div class="linked-records">
                <strong>Privacy Outcome</strong>

                <span>
                  ${escapeHtml(caseStudy.privacyOutcome)}
                </span>
              </div>
            `
            : ''
        }

        ${
          caseStudy.lessonsLearned?.length
            ? `
              <h3>Lessons Learned</h3>

              <ul>
                ${caseStudy.lessonsLearned
                  .map(
                    (lesson) => `
                      <li>${escapeHtml(lesson)}</li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          caseStudy.confidentialityRestrictions?.length
            ? `
              <h3>Use Restrictions</h3>

              <ul>
                ${caseStudy.confidentialityRestrictions
                  .map(
                    (restriction) => `
                      <li>${escapeHtml(restriction)}</li>
                    `
                  )
                  .join('')}
              </ul>
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

        <h2>Case Studies</h2>

        <p>
          Separate real evidence from illustrative, hypothetical,
          and composite examples. Track permissions, restrictions,
          outcomes, lessons, and supporting evidence.
        </p>
      </div>

      <div class="score-card">
        <span>Total Case Studies</span>
        <strong>${escapeHtml(items.length)}</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Hypothetical', hypothetical.length)}
      ${renderMetricCard('Composite', composite.length)}
      ${renderMetricCard(
        'External Use Permitted',
        externalUsePermitted.length
      )}
      ${renderMetricCard(
        'With Evidence',
        items.filter(
          (item) =>
            (item.evidenceIds || []).length > 0 ||
            (item.evidenceDocumentIds || []).length > 0
        ).length
      )}
    </section>

    <section class="directory-grid">
      ${
        items.length
          ? items.map(renderCaseStudyCard).join('')
          : '<p>No case studies recorded.</p>'
      }
    </section>
  `;
}
function renderApprovedClaims(items, data) {
  const approved = items.filter(
    (item) => item.approvalStatus === 'Approved'
  );

  const underReview = items.filter(
    (item) => item.approvalStatus === 'Under Review'
  );

  const publicUse = items.filter(
    (item) => item.publicUsePermitted
  );

  const getAudienceNames = (audienceIds = []) =>
    audienceIds
      .map((id) =>
        (data.audiences || []).find(
          (audience) => audience.id === id
        )
      )
      .filter(Boolean)
      .map((audience) => audience.name);

  const getCapabilityNames = (capabilityIds = []) =>
    capabilityIds
      .map((id) =>
        (data.productCapabilities || []).find(
          (capability) => capability.id === id
        )
      )
      .filter(Boolean)
      .map((capability) => capability.name);

  const renderClaimCard = (claim) => {
    const audienceNames = getAudienceNames(
      claim.audienceIds || []
    );

    const capabilityNames = getCapabilityNames(
      claim.productCapabilityIds || []
    );

    return `
      <article class="item-card">
        <div>
          <p class="eyebrow">
            ${escapeHtml(claim.claimCategory || 'Claim')}
          </p>

          <h3>
            ${escapeHtml(
              claim.shortClaim ||
              claim.claimText ||
              'Untitled Claim'
            )}
          </h3>

          ${
            claim.claimText &&
            claim.claimText !== claim.shortClaim
              ? `
                <p>
                  ${escapeHtml(claim.claimText)}
                </p>
              `
              : ''
          }
        </div>

        <div class="item-meta">
          ${
            claim.approvalStatus
              ? `
                <span>
                  Approval:
                  ${escapeHtml(claim.approvalStatus)}
                </span>
              `
              : ''
          }

          ${
            claim.evidenceStrength
              ? `
                <span>
                  Evidence:
                  ${escapeHtml(claim.evidenceStrength)}
                </span>
              `
              : ''
          }

          <span>
            ${
              claim.publicUsePermitted
                ? 'Public Use Permitted'
                : 'Public Use Not Permitted'
            }
          </span>

          ${
            claim.confidentiality
              ? `
                <span>
                  ${escapeHtml(claim.confidentiality)}
                </span>
              `
              : ''
          }
        </div>

        ${
          audienceNames.length
            ? `
              <h3>Audiences</h3>

              <div class="tag-list">
                ${audienceNames
                  .map(
                    (name) => `
                      <span>${escapeHtml(name)}</span>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }

        ${
          capabilityNames.length
            ? `
              <h3>Capabilities</h3>

              <div class="tag-list">
                ${capabilityNames
                  .map(
                    (name) => `
                      <span>${escapeHtml(name)}</span>
                    `
                  )
                  .join('')}
              </div>
            `
            : ''
        }

        ${
          claim.evidenceSummary
            ? `
              <div class="linked-records">
                <strong>Evidence Summary</strong>

                <span>
                  ${escapeHtml(claim.evidenceSummary)}
                </span>
              </div>
            `
            : ''
        }

        ${
          claim.requiredQualifier
            ? `
              <div class="linked-records">
                <strong>Required Qualifier</strong>

                <span>
                  ${escapeHtml(claim.requiredQualifier)}
                </span>
              </div>
            `
            : ''
        }

        ${
          claim.permittedContexts?.length
            ? `
              <h3>Permitted Contexts</h3>

              <ul>
                ${claim.permittedContexts
                  .map(
                    (context) => `
                      <li>${escapeHtml(context)}</li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          claim.prohibitedContexts?.length
            ? `
              <h3>Prohibited Contexts</h3>

              <ul>
                ${claim.prohibitedContexts
                  .map(
                    (context) => `
                      <li>${escapeHtml(context)}</li>
                    `
                  )
                  .join('')}
              </ul>
            `
            : ''
        }

        ${
          claim.usageNotes
            ? `
              <div class="linked-records">
                <strong>Usage Notes</strong>

                <span>
                  ${escapeHtml(claim.usageNotes)}
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

        <h2>Approved Claims</h2>

        <p>
          Control what FedEMR is permitted to say, where it may be
          used, what evidence supports it, which qualifiers are
          required, and when public use is allowed.
        </p>
      </div>

      <div class="score-card">
        <span>Total Claims</span>
        <strong>${escapeHtml(items.length)}</strong>
      </div>
    </section>

    <section class="metric-grid">
      ${renderMetricCard('Approved', approved.length)}
      ${renderMetricCard('Under Review', underReview.length)}
      ${renderMetricCard('Public Use Permitted', publicUse.length)}
      ${renderMetricCard(
        'With Evidence Linked',
        items.filter(
          (item) => (item.evidenceIds || []).length > 0
        ).length
      )}
    </section>

    <section class="directory-grid">
      ${
        items.length
          ? items.map(renderClaimCard).join('')
          : '<p>No approved claims recorded.</p>'
      }
    </section>
  `;
}
function getActionDisplayStatus(action) {
  return (
    action.derivedStatus ||
    action.status ||
    'Not Started'
  );
}

function getActionStatusClass(status) {
  return String(status)
    .toLowerCase()
    .replaceAll(' ', '-');
}

function renderActionControls(action) {
  const status = getActionDisplayStatus(action);

  if (status === 'Complete') {
    return `
      <div class="action-complete-message">
        <span aria-hidden="true">✓</span>
        Completed
      </div>
    `;
  }

  if (status === 'Blocked' || status === 'Waiting') {
    return `
      <div class="action-control-row">
        <button
          class="primary-button"
          type="button"
          data-action-resume="${escapeHtml(action.id)}"
        >
          Resume
        </button>
      </div>
    `;
  }

  if (status === 'In Progress') {
    return `
      <div class="action-control-row">
        <button
          class="primary-button"
          type="button"
          data-action-complete="${escapeHtml(action.id)}"
        >
          Complete
        </button>

        <button
          class="ghost-button"
          type="button"
          data-action-wait="${escapeHtml(action.id)}"
        >
          Waiting
        </button>

        <button
          class="danger-button"
          type="button"
          data-action-block="${escapeHtml(action.id)}"
        >
          Block
        </button>
      </div>
    `;
  }

  if (status === 'Ready') {
    return `
      <div class="action-control-row">
        <button
          class="primary-button"
          type="button"
          data-action-start="${escapeHtml(action.id)}"
        >
          Start Action
        </button>

        <button
          class="ghost-button"
          type="button"
          data-action-wait="${escapeHtml(action.id)}"
        >
          Waiting
        </button>

        <button
          class="danger-button"
          type="button"
          data-action-block="${escapeHtml(action.id)}"
        >
          Block
        </button>
      </div>
    `;
  }

  return `
    <div class="action-locked-message">
      Complete dependent actions to unlock this work.
    </div>
  `;
}

function renderActionCard(action, data = {}) {
  const status = getActionDisplayStatus(action);

  const workflow = (
    data.workflowInstances || []
  ).find(
    (item) =>
      item.id === action.workflowInstanceId
  );

  const workflowStep = (
    data.workflowSteps || []
  ).find(
    (item) =>
      item.id === action.workflowStepId
  );

  const dependencyActions = (
    action.dependencyActionIds || []
  )
    .map((dependencyId) =>
      (data.actionItems || []).find(
        (item) => item.id === dependencyId
      )
    )
    .filter(Boolean);

  return `
    <article class="action-card">
      <div class="action-card-header">
        <div class="action-card-title">
          <div class="action-card-topline">
            <span
              class="action-status action-status-${escapeHtml(
                getActionStatusClass(status)
              )}"
            >
              ${escapeHtml(status)}
            </span>

            ${
              action.priority
                ? `
                  <span class="action-priority">
                    ${escapeHtml(action.priority)}
                  </span>
                `
                : ''
            }
          </div>

          <h3>${escapeHtml(action.title || 'Untitled Action')}</h3>

          ${
            action.description
              ? `
                <p>
                  ${escapeHtml(action.description)}
                </p>
              `
              : ''
          }
        </div>

        ${
          action.dueDate
            ? `
              <div class="action-due-date">
                <span>Due</span>
                <strong>${escapeHtml(action.dueDate)}</strong>
              </div>
            `
            : ''
        }
      </div>

      <div class="action-meta-grid">
        <div>
          <span>Owner</span>
          <strong>${escapeHtml(action.owner || 'Unassigned')}</strong>
        </div>

        <div>
          <span>Type</span>
          <strong>${escapeHtml(action.actionType || 'Action')}</strong>
        </div>

        <div>
          <span>Estimated effort</span>
          <strong>
            ${escapeHtml(action.estimatedHours || 0)} hours
          </strong>
        </div>

        <div>
          <span>Source</span>
          <strong>${escapeHtml(action.sourceType || 'Manual')}</strong>
        </div>
      </div>

      ${
        workflow
          ? `
            <div class="action-workflow-link">
              <span>Workflow</span>

              <strong>
                ${escapeHtml(workflow.title)}
              </strong>

              ${
                workflowStep
                  ? `
                    <small>
                      Step ${escapeHtml(
                        workflowStep.sequence || ''
                      )}:
                      ${escapeHtml(workflowStep.title)}
                    </small>
                  `
                  : ''
              }
            </div>
          `
          : ''
      }

      ${
        action.waitingOn
          ? `
            <div class="action-callout action-callout-waiting">
              <strong>Waiting on</strong>
              <span>${escapeHtml(action.waitingOn)}</span>
            </div>
          `
          : ''
      }

      ${
        action.blockedReason
          ? `
            <div class="action-callout action-callout-blocked">
              <strong>Blocked by</strong>
              <span>${escapeHtml(action.blockedReason)}</span>
            </div>
          `
          : ''
      }

      ${
        dependencyActions.length
          ? `
            <div class="action-dependencies">
              <strong>Dependencies</strong>

              ${dependencyActions
                .map(
                  (dependency) => `
                    <div>
                      <span>
                        ${
                          ['Complete', 'Completed', 'Done'].includes(
                            dependency.status
                          )
                            ? '✓'
                            : '○'
                        }
                      </span>

                      <span>
                        ${escapeHtml(dependency.title)}
                      </span>
                    </div>
                  `
                )
                .join('')}
            </div>
          `
          : ''
      }

      ${
        action.completionCriteria?.length
          ? `
            <details class="action-completion-criteria">
              <summary>
                Completion criteria
              </summary>

              <ul>
                ${action.completionCriteria
                  .map(
                    (criterion) => `
                      <li>${escapeHtml(criterion)}</li>
                    `
                  )
                  .join('')}
              </ul>
            </details>
          `
          : ''
      }

      ${
        action.suggestedNextAction
          ? `
            <div class="action-next-step">
              <span>After completion</span>

              <strong>
                ${escapeHtml(action.suggestedNextAction)}
              </strong>
            </div>
          `
          : ''
      }

      ${renderActionControls(action)}
    </article>
  `;
}

function renderActionGroup({
  title,
  description,
  actions,
  data,
  emptyMessage
}) {
  return `
    <section class="action-group">
      <div class="action-group-header">
        <div>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)}</p>
        </div>

        <span>${escapeHtml(actions.length)}</span>
      </div>

      <div class="action-card-grid">
        ${
          actions.length
            ? actions
                .map((action) =>
                  renderActionCard(action, data)
                )
                .join('')
            : `
              <div class="action-empty-state">
                ${escapeHtml(emptyMessage)}
              </div>
            `
        }
      </div>
    </section>
  `;
}

function renderAiProposalCard(proposal) {
  return `
    <article class="ai-proposal-card">
      <div class="ai-proposal-header">
        <div>
          <p class="eyebrow">AI Suggested Action</p>

          <h3>
            ${escapeHtml(
              proposal.title || 'Untitled Proposal'
            )}
          </h3>
        </div>

        <span>
          ${escapeHtml(proposal.confidence || 'Unknown')}
          confidence
        </span>
      </div>

      <p>
        ${escapeHtml(proposal.description || '')}
      </p>

      ${
        proposal.rationale
          ? `
            <div class="ai-rationale">
              <strong>Why this was suggested</strong>
              <span>${escapeHtml(proposal.rationale)}</span>
            </div>
          `
          : ''
      }

      <div class="action-meta-grid">
        <div>
          <span>Owner</span>
          <strong>
            ${escapeHtml(
              proposal.proposedOwner || 'Unassigned'
            )}
          </strong>
        </div>

        <div>
          <span>Priority</span>
          <strong>
            ${escapeHtml(
              proposal.proposedPriority || 'Medium'
            )}
          </strong>
        </div>

        <div>
          <span>Due</span>
          <strong>
            ${escapeHtml(
              proposal.proposedDueDate || 'Not set'
            )}
          </strong>
        </div>
      </div>

      <div class="action-control-row">
        <button
          class="primary-button"
          type="button"
          data-ai-approve="${escapeHtml(proposal.id)}"
        >
          Approve and Create Action
        </button>

        <button
          class="ghost-button"
          type="button"
          data-ai-reject="${escapeHtml(proposal.id)}"
        >
          Reject
        </button>
      </div>
    </article>
  `;
}

function bindActionEngineActions(handlers) {
  if (!appRoot) return;

  appRoot
    .querySelectorAll('[data-action-start]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        handlers.onStartAction(
          button.dataset.actionStart
        );
      });
    });

  appRoot
    .querySelectorAll('[data-action-block]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        handlers.onBlockAction(
          button.dataset.actionBlock
        );
      });
    });

  appRoot
    .querySelectorAll('[data-action-wait]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        handlers.onWaitAction(
          button.dataset.actionWait
        );
      });
    });

  appRoot
    .querySelectorAll('[data-action-resume]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        handlers.onResumeAction(
          button.dataset.actionResume
        );
      });
    });

  appRoot
    .querySelectorAll('[data-action-complete]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        handlers.onCompleteAction(
          button.dataset.actionComplete
        );
      });
    });

  appRoot
    .querySelectorAll('[data-ai-approve]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        handlers.onApproveAiAction(
          button.dataset.aiApprove
        );
      });
    });

  appRoot
    .querySelectorAll('[data-ai-reject]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        handlers.onRejectAiAction(
          button.dataset.aiReject
        );
      });
    });
}

function renderActionCenter(
  actionItems,
  handlers,
  data = {}
) {
  const actions = actionItems.map((action) => ({
    ...action,
    derivedStatus:
      action.derivedStatus ||
      getActionDisplayStatus(action)
  }));

  const ready = actions.filter(
    (action) =>
      getActionDisplayStatus(action) === 'Ready'
  );

  const inProgress = actions.filter(
    (action) =>
      getActionDisplayStatus(action) === 'In Progress'
  );

  const waiting = actions.filter(
    (action) =>
      getActionDisplayStatus(action) === 'Waiting' ||
      Boolean(action.waitingOn)
  );

  const blocked = actions.filter(
    (action) =>
      getActionDisplayStatus(action) === 'Blocked' ||
      action.blocked
  );

  const complete = actions.filter(
    (action) =>
      getActionDisplayStatus(action) === 'Complete'
  );

  const pendingAiProposals = (
    data.aiActionProposals || []
  ).filter(
    (proposal) =>
      !proposal.status ||
      proposal.status === 'Pending Review'
  );

  appRoot.innerHTML = `
    <section class="action-centre-hero">
      <div>
        <p class="eyebrow">Execution Engine</p>

        <h2>What needs to happen next?</h2>

        <p>
          Start ready work, resolve blockers, track external
          dependencies, complete actions, and automatically unlock
          the next step in each workflow.
        </p>
      </div>

      <div class="action-centre-summary">
        <div>
          <strong>${escapeHtml(ready.length)}</strong>
          <span>Ready</span>
        </div>

        <div>
          <strong>${escapeHtml(inProgress.length)}</strong>
          <span>In progress</span>
        </div>

        <div>
          <strong>${escapeHtml(waiting.length)}</strong>
          <span>Waiting</span>
        </div>

        <div>
          <strong>${escapeHtml(blocked.length)}</strong>
          <span>Blocked</span>
        </div>
      </div>
    </section>

    ${
      pendingAiProposals.length
        ? `
          <section class="ai-proposal-section">
            <div class="action-group-header">
              <div>
                <p class="eyebrow">Human Approval Required</p>
                <h2>AI action proposals</h2>

                <p>
                  Review each suggestion before it becomes part of
                  the operating workflow.
                </p>
              </div>

              <span>${escapeHtml(pendingAiProposals.length)}</span>
            </div>

            <div class="action-card-grid">
              ${pendingAiProposals
                .map(renderAiProposalCard)
                .join('')}
            </div>
          </section>
        `
        : ''
    }

    ${renderActionGroup({
      title: 'Ready to Start',
      description:
        'These actions have no incomplete dependencies.',
      actions: ready,
      data,
      emptyMessage:
        'No actions are currently ready to start.'
    })}

    ${renderActionGroup({
      title: 'In Progress',
      description:
        'Work that is actively moving forward.',
      actions: inProgress,
      data,
      emptyMessage:
        'No actions are currently in progress.'
    })}

    ${renderActionGroup({
      title: 'Waiting On',
      description:
        'Work paused while another person, organization, or event responds.',
      actions: waiting,
      data,
      emptyMessage:
        'Nothing is currently waiting on an external response.'
    })}

    ${renderActionGroup({
      title: 'Blocked',
      description:
        'Work that cannot proceed until a blocker is resolved.',
      actions: blocked,
      data,
      emptyMessage:
        'No blocked actions.'
    })}

    <details class="completed-action-section">
      <summary>
        Completed Actions (${escapeHtml(complete.length)})
      </summary>

      <div class="action-card-grid">
        ${
          complete.length
            ? complete
                .map((action) =>
                  renderActionCard(action, data)
                )
                .join('')
            : `
              <div class="action-empty-state">
                No actions have been completed yet.
              </div>
            `
        }
      </div>
    </details>
  `;

  bindActionEngineActions(handlers);
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
  const {
  data,
  executiveScore,
  actionEngine = {}
} = model;

  const tasks = data.tasks || [];
  const risks = data.risks || [];
  const people = data.people || [];
  const organizations = data.organizations || [];
  const followUps = data.followUps || [];
  const fundingOpportunities =
    data.fundingOpportunities || [];
  const decisions = data.decisions || [];
  const productVersions = data.productVersions || [];
  const readinessItems = data.readinessItems || [];

  const openTasks = tasks.filter(
    (item) =>
      !['Complete', 'Completed', 'Done'].includes(
        item.status
      )
  );

  const criticalTasks = openTasks.filter(
    (item) =>
      item.priority === 'Critical' ||
      item.priority === 'High'
  );

  const activeRisks = risks.filter(
    (item) =>
      !['Closed', 'Resolved', 'Accepted'].includes(
        item.status
      )
  );

  const urgentRisks = activeRisks.filter(
    (item) =>
      item.priority === 'Critical' ||
      item.priority === 'High' ||
      item.severity === 'Critical' ||
      item.severity === 'High'
  );

  const pendingFollowUps = followUps.filter(
    (item) =>
      !['Complete', 'Completed', 'Done'].includes(
        item.status
      )
  );

  const upcomingFunding = fundingOpportunities.filter(
    (item) =>
      !['Closed', 'Declined', 'Ineligible'].includes(
        item.status
      )
  );

  const openDecisions = decisions.filter(
    (item) =>
      !['Decided', 'Closed', 'Complete'].includes(
        item.status
      )
  );

  const nextVersion = productVersions.find(
    (item) => item.id === 'product_version_v2'
  );

  const readinessComplete = readinessItems.filter(
    (item) =>
      ['Complete', 'Completed', 'Ready'].includes(
        item.status
      )
  ).length;

  const readinessPercent = readinessItems.length
    ? Math.round(
        (readinessComplete / readinessItems.length) * 100
      )
    : 0;

  const renderDashboardListItem = (
    item,
    collection,
    emptyLabel
  ) => {
    if (!item) {
      return `
        <div class="dashboard-empty">
          ${escapeHtml(emptyLabel)}
        </div>
      `;
    }

    return `
      <button
        class="dashboard-list-item"
        type="button"
        data-dashboard-view="${escapeHtml(collection)}"
      >
        <div>
          <strong>${escapeHtml(getItemTitle(item))}</strong>

          <span>
            ${escapeHtml(getItemSubtitle(item))}
          </span>
        </div>

        <span class="dashboard-list-arrow">›</span>
      </button>
    `;
  };

  setPageTitle('Dashboard');

  appRoot.innerHTML = `
    <section class="executive-welcome">
      <div class="executive-welcome-copy">
        <p class="eyebrow">FedEMR Technologies</p>

        <h2>Everything that needs your attention, in one place.</h2>

        <p>
          Track execution, commercialization, funding, product,
          institutional pathways, relationships, and risk from one
          operating workspace.
        </p>

        <div class="executive-welcome-actions">
          <button
            class="create-button"
            type="button"
            data-dashboard-create
          >
            <span aria-hidden="true">+</span>
            <span>Create item</span>
          </button>

          <button
            class="dashboard-secondary-action"
            type="button"
            data-dashboard-view="tasks"
          >
            Review priorities
          </button>
        </div>
      </div>

      <div class="executive-score">
        <div
          class="executive-score-ring"
          style="--score: ${escapeHtml(executiveScore)}"
        >
          <div>
            <strong>${escapeHtml(executiveScore)}%</strong>
            <span>Executive health</span>
          </div>
        </div>

        <p>
          Based on execution, readiness, funding, relationships,
          and active risk.
        </p>
      </div>
    </section>

    <section class="dashboard-kpi-strip">
      <button
        class="dashboard-kpi"
        type="button"
        data-dashboard-view="tasks"
      >
        <span>Open priorities</span>
        <strong>${escapeHtml(openTasks.length)}</strong>
        <small>${escapeHtml(criticalTasks.length)} high priority</small>
      </button>

      <button
        class="dashboard-kpi"
        type="button"
        data-dashboard-view="risks"
      >
        <span>Active risks</span>
        <strong>${escapeHtml(activeRisks.length)}</strong>
        <small>${escapeHtml(urgentRisks.length)} need attention</small>
      </button>

      <button
        class="dashboard-kpi"
        type="button"
        data-dashboard-view="followUps"
      >
        <span>Follow-ups</span>
        <strong>${escapeHtml(pendingFollowUps.length)}</strong>
        <small>${escapeHtml(people.length)} people tracked</small>
      </button>

      <button
        class="dashboard-kpi"
        type="button"
        data-dashboard-view="fundingOpportunities"
      >
        <span>Funding pipeline</span>
        <strong>${escapeHtml(upcomingFunding.length)}</strong>
        <small>active opportunities</small>
      </button>
    </section>

    <section class="dashboard-bento">
      <article class="dashboard-card dashboard-card-priorities">
        <div class="dashboard-card-header">
          <div>
            <p class="eyebrow">Execution</p>
            <h3>Top priorities</h3>
          </div>

          <button
            class="dashboard-card-link"
            type="button"
            data-dashboard-view="tasks"
          >
            View all
          </button>
        </div>

        <div class="dashboard-list">
          ${
            openTasks
              .slice(0, 4)
              .map((item) =>
                renderDashboardListItem(
                  item,
                  'tasks',
                  'No open priorities'
                )
              )
              .join('') ||
            renderDashboardListItem(
              null,
              'tasks',
              'No open priorities'
            )
          }
        </div>
      </article>

      <article class="dashboard-card dashboard-card-readiness">
        <div class="dashboard-card-header">
          <div>
            <p class="eyebrow">Commercialization</p>
            <h3>Readiness</h3>
          </div>

          <span class="dashboard-status-pill">
            ${escapeHtml(readinessPercent)}%
          </span>
        </div>

        <div class="readiness-progress">
          <span
            style="width: ${escapeHtml(readinessPercent)}%"
          ></span>
        </div>

        <div class="readiness-stat">
          <strong>${escapeHtml(readinessComplete)}</strong>
          <span>
            of ${escapeHtml(readinessItems.length)}
            readiness items complete
          </span>
        </div>

        <button
          class="dashboard-card-action"
          type="button"
          data-dashboard-view="readinessItems"
        >
          Open readiness workspace
        </button>
      </article>

      <article class="dashboard-card dashboard-card-risks">
        <div class="dashboard-card-header">
          <div>
            <p class="eyebrow">Attention</p>
            <h3>Risk watch</h3>
          </div>

          <span class="dashboard-alert-count">
            ${escapeHtml(urgentRisks.length)}
          </span>
        </div>

        <div class="dashboard-list">
          ${
            activeRisks
              .slice(0, 3)
              .map((item) =>
                renderDashboardListItem(
                  item,
                  'risks',
                  'No active risks'
                )
              )
              .join('') ||
            renderDashboardListItem(
              null,
              'risks',
              'No active risks'
            )
          }
        </div>
      </article>

      <article class="dashboard-card dashboard-card-product">
        <div>
          <p class="eyebrow">Product</p>
          <h3>Next release</h3>

          <p class="dashboard-product-version">
            ${escapeHtml(
              nextVersion?.versionName ||
                nextVersion?.versionNumber ||
                'V2 Zero-Code'
            )}
          </p>

          <p>
            ${
              escapeHtml(
                nextVersion?.summary ||
                  nextVersion?.releaseObjective ||
                  'Track product readiness, blockers, capabilities, and release planning.'
              )
            }
          </p>
        </div>

        <div class="dashboard-product-footer">
          <span>
            ${
              nextVersion?.productReadinessScore !== undefined
                ? `${escapeHtml(
                    nextVersion.productReadinessScore
                  )}% ready`
                : 'Readiness not set'
            }
          </span>

          <button
            type="button"
            data-dashboard-view="productVersions"
          >
            Open product
          </button>
        </div>
      </article>

      <article class="dashboard-card dashboard-card-decisions">
        <div class="dashboard-card-header">
          <div>
            <p class="eyebrow">Leadership</p>
            <h3>Open decisions</h3>
          </div>

          <span class="dashboard-status-pill">
            ${escapeHtml(openDecisions.length)}
          </span>
        </div>

        <div class="dashboard-list">
          ${
            openDecisions
              .slice(0, 3)
              .map((item) =>
                renderDashboardListItem(
                  item,
                  'decisions',
                  'No open decisions'
                )
              )
              .join('') ||
            renderDashboardListItem(
              null,
              'decisions',
              'No open decisions'
            )
          }
        </div>
      </article>

      <article class="dashboard-card dashboard-card-network">
        <p class="eyebrow">Relationships</p>
        <h3>Network intelligence</h3>

        <div class="network-metrics">
          <div>
            <strong>${escapeHtml(people.length)}</strong>
            <span>People</span>
          </div>

          <div>
            <strong>${escapeHtml(organizations.length)}</strong>
            <span>Organizations</span>
          </div>

          <div>
            <strong>${escapeHtml(pendingFollowUps.length)}</strong>
            <span>Follow-ups</span>
          </div>
        </div>

        <button
          class="dashboard-card-action"
          type="button"
          data-dashboard-view="people"
        >
          Open relationships
        </button>
            </article>
    </section>

    <section class="dashboard-action-engine">
      <div class="dashboard-action-engine-header">
        <div>
          <p class="eyebrow">Execution Engine</p>
          <h2>Your next actions</h2>

          <p>
            Work that is ready now, waiting on others, blocked,
            overdue, or proposed by AI.
          </p>
        </div>

        <button
          class="primary-button"
          type="button"
          data-dashboard-view="actionItems"
        >
          Open Action Center
        </button>
      </div>

      <div class="dashboard-action-summary">
        <div>
          <strong>
            ${escapeHtml(
              actionEngine.nextActions?.length || 0
            )}
          </strong>
          <span>Ready or active</span>
        </div>

        <div>
          <strong>
            ${escapeHtml(
              actionEngine.waitingActions?.length || 0
            )}
          </strong>
          <span>Waiting</span>
        </div>

        <div>
          <strong>
            ${escapeHtml(
              actionEngine.blockedActions?.length || 0
            )}
          </strong>
          <span>Blocked</span>
        </div>

        <div>
          <strong>
            ${escapeHtml(
              actionEngine.overdueActions?.length || 0
            )}
          </strong>
          <span>Overdue</span>
        </div>

        <div>
          <strong>
            ${escapeHtml(
              actionEngine.pendingAiProposals?.length || 0
            )}
          </strong>
          <span>AI proposals</span>
        </div>
      </div>

      <div class="dashboard-action-preview">
        ${
          actionEngine.nextActions?.length
            ? actionEngine.nextActions
                .slice(0, 3)
                .map((action) =>
                  renderActionCard(action, data)
                )
                .join('')
            : `
              <div class="action-empty-state">
                No ready actions.
              </div>
            `
        }
      </div>
    </section>
  `;

  appRoot
    .querySelectorAll('[data-dashboard-view]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const view = button.dataset.dashboardView;

        updateActiveNavigation(view);
        handlers.onNavigate(view);
      });
    });

  const dashboardCreateButton = appRoot.querySelector(
    '[data-dashboard-create]'
  );

  if (dashboardCreateButton && quickAddButton) {
    dashboardCreateButton.addEventListener('click', () => {
      quickAddButton.click();
    });
  }

  bindActionEngineActions(handlers);
}

export function renderCollection(
  collection,
  items,
  handlers,
  data = {}
) {
    setPageTitle(formatCollectionName(collection));
  if (collection === 'actionItems') {
    renderActionCenter(
      items,
      handlers,
      data
    );

    return;
  }
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

  if (collection === 'audiences') {
    appRoot.innerHTML = renderAudiences(items);

    return;
  }

  if (collection === 'contentAssets') {
    appRoot.innerHTML = renderContentAssets(items, data);

    return;
  }

  if (collection === 'presentations') {
    appRoot.innerHTML = renderPresentations(items, data);

    return;
  }

  if (collection === 'useCases') {
    appRoot.innerHTML = renderUseCases(items, data);

    return;
  }

  if (collection === 'caseStudies') {
    appRoot.innerHTML = renderCaseStudies(items, data);

    return;
  }

  if (collection === 'approvedClaims') {
    appRoot.innerHTML = renderApprovedClaims(items, data);

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