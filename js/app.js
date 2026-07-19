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
const ACTION_ENGINE_SEED_VERSION = 1;
const READINESS_SEED_VERSION = 3;
const AI_SERVICE_URL =
  'http://localhost:3001';

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

const actionEngineCollections = [
  'workflowTemplates',
  'workflowInstances',
  'workflowSteps',
  'actionItems',
  'aiActionProposals'
];
const readinessCollections = [
  'readinessTemplates',
  'readinessTemplateItems',
  'readinessAssessments',
  'readinessAssessmentItems'
];
const completedStatuses = new Set([
  'Complete',
  'Completed',
  'Done'
]);

const inactiveStatuses = new Set([
  'Complete',
  'Completed',
  'Done',
  'Cancelled',
  'Archived'
]);

function isComplete(item) {
  return completedStatuses.has(item?.status);
}

function isInactive(item) {
  return inactiveStatuses.has(item?.status);
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}
function getPersonNames(personIds = []) {
  return normalizeArray(personIds)
    .map((personId) =>
      (state.data.people || []).find(
        (person) => person.id === personId
      )
    )
    .filter(Boolean)
    .map(
      (person) =>
        person.displayName ||
        `${person.firstName || ''} ${person.lastName || ''}`.trim()
    )
    .filter(Boolean);
}

function getOrganizationNames(
  organizationIds = []
) {
  return normalizeArray(organizationIds)
    .map((organizationId) =>
      (state.data.organizations || []).find(
        (organization) =>
          organization.id === organizationId
      )
    )
    .filter(Boolean)
    .map((organization) => organization.name)
    .filter(Boolean);
}
function getSettingsRecord() {
  return (state.data.settings || []).find(
    (item) => item.id === 'settings_default'
  );
}

async function seedCollectionsOnce({
  collectionsToSeed,
  settingName,
  version
}) {
  const settingsRecord = getSettingsRecord();

  const completedVersion = Number(
    settingsRecord?.[settingName] || 0
  );

  if (completedVersion >= version) {
    return false;
  }

  for (const collection of collectionsToSeed) {
    const existingItems = state.data[collection] || [];

    const existingIds = new Set(
      existingItems.map((item) => item.id)
    );

    const seedItems = sampleData[collection] || [];

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
      appVersion: '0.7',
      schemaVersion: '0.7',
      theme: 'light',
      createdAt: nowIso()
    }),

    appVersion: '0.7',
    schemaVersion: '0.7',
    [settingName]: version,
    updatedAt: nowIso()
  });

  return true;
}

async function seedProductMarketDataOnce() {
  return seedCollectionsOnce({
    collectionsToSeed: productMarketCollections,
    settingName: 'productMarketSeedVersion',
    version: PRODUCT_MARKET_SEED_VERSION
  });
}

async function seedActionEngineDataOnce() {
  return seedCollectionsOnce({
    collectionsToSeed: actionEngineCollections,
    settingName: 'actionEngineSeedVersion',
    version: ACTION_ENGINE_SEED_VERSION
  });
}
async function seedReadinessDataOnce() {
  return seedCollectionsOnce({
    collectionsToSeed: readinessCollections,
    settingName: 'readinessSeedVersion',
    version: READINESS_SEED_VERSION
  });
}
async function loadData() {
  const entries = await Promise.all(
    collections.map(async (collection) => {
      const items = await getAllItems(collection);

      return [collection, items];
    })
  );

  state.data = Object.fromEntries(entries);
}

function getActionById(actionId) {
  return (state.data.actionItems || []).find(
    (item) => item.id === actionId
  );
}

function getWorkflowStepById(stepId) {
  return (state.data.workflowSteps || []).find(
    (item) => item.id === stepId
  );
}

function dependenciesAreComplete(action) {
  const dependencyIds = normalizeArray(
    action.dependencyActionIds
  );

  return dependencyIds.every((dependencyId) => {
    const dependency = getActionById(dependencyId);

    return dependency && isComplete(dependency);
  });
}

function deriveActionState(action) {
  if (isComplete(action)) {
    return 'Complete';
  }

  if (action.blocked || action.status === 'Blocked') {
    return 'Blocked';
  }

  if (
    action.status === 'Waiting' ||
    Boolean(action.waitingOn)
  ) {
    return 'Waiting';
  }

  if (action.status === 'In Progress') {
    return 'In Progress';
  }

  if (dependenciesAreComplete(action)) {
    return 'Ready';
  }

  return 'Not Started';
}

function getActionEngineModel() {
  const actionItems = state.data.actionItems || [];

  const derivedActions = actionItems.map((action) => ({
    ...action,
    derivedStatus: deriveActionState(action)
  }));

  const nextActions = derivedActions.filter(
    (action) =>
      action.derivedStatus === 'Ready' ||
      action.derivedStatus === 'In Progress'
  );

  const blockedActions = derivedActions.filter(
    (action) => action.derivedStatus === 'Blocked'
  );

  const waitingActions = derivedActions.filter(
    (action) => action.derivedStatus === 'Waiting'
  );

  const notStartedActions = derivedActions.filter(
    (action) => action.derivedStatus === 'Not Started'
  );

  const completedActions = derivedActions.filter(
    (action) => action.derivedStatus === 'Complete'
  );

  const overdueActions = derivedActions.filter((action) => {
    if (
      !action.dueDate ||
      isInactive(action) ||
      action.derivedStatus === 'Waiting'
    ) {
      return false;
    }

    const dueDate = new Date(`${action.dueDate}T23:59:59`);

    return dueDate.getTime() < Date.now();
  });

  const decisionsNeeded = (
    state.data.decisions || []
  ).filter((item) => !isInactive(item));

  const pendingAiProposals = (
    state.data.aiActionProposals || []
  ).filter(
    (item) =>
      !item.status ||
      item.status === 'Pending Review'
  );

  return {
    actions: derivedActions,
    nextActions,
    blockedActions,
    waitingActions,
    notStartedActions,
    completedActions,
    overdueActions,
    decisionsNeeded,
    pendingAiProposals
  };
}

function getDashboardModel() {
  return {
    data: state.data,

    executiveScore: calculateExecutiveScore(
      state.data
    ),

    actionEngine: getActionEngineModel()
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
      state.data[state.activeCollection] || [],
      handlers,
      state.data
    );
  }
}

function searchAllCollections(query) {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) return [];

  const results = [];

  Object.entries(state.data).forEach(
    ([collection, items]) => {
      items.forEach((item) => {
        const searchableText = JSON.stringify(
          item
        ).toLowerCase();

        if (searchableText.includes(cleanQuery)) {
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

  showStatus('Sample FedEMR data loaded.');

  await refresh();
}

async function handleNavigate(viewOrCollection) {
  if (viewOrCollection === 'dashboard') {
    state.activeView = 'dashboard';
    state.activeCollection = null;
  } else {
    state.activeView = 'collection';
    state.activeCollection = viewOrCollection;
  }

  await refresh();
}

async function handleSearch(query) {
  state.searchQuery = query;

  if (!query.trim()) {
    state.activeView = 'dashboard';
    state.activeCollection = null;

    await refresh();

    return;
  }

  state.activeView = 'search';
  state.activeCollection = null;

  await refresh();
}

async function handleSave(collection, item) {
  const existingItem = item.id
    ? (state.data[collection] || []).find(
        (candidate) => candidate.id === item.id
      )
    : null;

  const nextItem = {
    ...(existingItem || {}),
    ...item,

    id: item.id || uid(collection),

    updatedAt: nowIso(),

    createdAt:
      existingItem?.createdAt ||
      item.createdAt ||
      nowIso()
  };

  await saveItem(collection, nextItem);

  showStatus('Saved.');

  await refresh();
}
async function handleSaveLinkedRecord(
  collection,
  item
) {
  const existingItem = item.id
    ? (state.data[collection] || []).find(
        (candidate) => candidate.id === item.id
      )
    : null;

  const nextItem = {
    ...(existingItem || {}),
    ...item,

    id:
      item.id ||
      uid(collection),

    createdAt:
      existingItem?.createdAt ||
      item.createdAt ||
      nowIso(),

    updatedAt: nowIso()
  };

  await saveItem(
    collection,
    nextItem
  );

  if (!state.data[collection]) {
    state.data[collection] = [];
  }

  const existingIndex =
    state.data[collection].findIndex(
      (candidate) =>
        candidate.id === nextItem.id
    );

  if (existingIndex >= 0) {
    state.data[collection][existingIndex] =
      nextItem;
  } else {
    state.data[collection].push(nextItem);
  }

  showStatus(
    collection === 'people'
      ? 'Person added to the conversation.'
      : 'Organization added to the conversation.'
  );

  return nextItem;
}
async function handleDelete(collection, id) {
  const confirmed = window.confirm(
    'Delete this item?'
  );

  if (!confirmed) return;

  await deleteItem(collection, id);

  showStatus('Deleted.');

  await refresh();
}

async function handleQuickAdd(payload) {
  const collection =
    payload.collection || 'tasks';

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
      payload.priority || 'Medium',

    owner:
      payload.owner || 'Unassigned',

    dueDate:
      payload.dueDate || '',

    createdAt: nowIso(),
    updatedAt: nowIso()
  };

  delete item.collection;

  await saveItem(collection, item);

  showStatus('Quick add saved.');

  await refresh();
}

async function updateWorkflowStepFromActions(
  workflowStepId
) {
  if (!workflowStepId) return;

  const step = getWorkflowStepById(workflowStepId);

  if (!step) return;

  const stepActions = (
    state.data.actionItems || []
  ).filter(
    (action) =>
      action.workflowStepId === workflowStepId
  );

  if (stepActions.length === 0) return;

  const allComplete = stepActions.every(isComplete);

  const anyInProgress = stepActions.some(
    (action) =>
      action.status === 'In Progress'
  );

  const anyBlocked = stepActions.some(
    (action) =>
      action.blocked ||
      action.status === 'Blocked'
  );

  let nextStatus = step.status;

  if (allComplete) {
    nextStatus = 'Complete';
  } else if (anyBlocked) {
    nextStatus = 'Blocked';
  } else if (anyInProgress) {
    nextStatus = 'In Progress';
  } else if (
    stepActions.some(dependenciesAreComplete)
  ) {
    nextStatus = 'Ready';
  }

  await saveItem('workflowSteps', {
    ...step,
    status: nextStatus,
    completedAt:
      allComplete
        ? step.completedAt || nowIso()
        : '',
    updatedAt: nowIso()
  });
}

async function unlockDependentActions(
  completedActionId
) {
  const dependentActions = (
    state.data.actionItems || []
  ).filter((action) =>
    normalizeArray(
      action.dependencyActionIds
    ).includes(completedActionId)
  );

  for (const dependentAction of dependentActions) {
    const dependenciesComplete =
      normalizeArray(
        dependentAction.dependencyActionIds
      ).every((dependencyId) => {
        if (dependencyId === completedActionId) {
          return true;
        }

        const dependency =
          getActionById(dependencyId);

        return dependency && isComplete(dependency);
      });

    if (
      dependenciesComplete &&
      !isComplete(dependentAction) &&
      !dependentAction.blocked &&
      !dependentAction.waitingOn
    ) {
      await saveItem('actionItems', {
        ...dependentAction,
        status: 'Ready',
        updatedAt: nowIso()
      });
    }
  }
}

async function handleStartAction(actionId) {
  const action = getActionById(actionId);

  if (!action) {
    showStatus('Action not found.');
    return;
  }

  if (!dependenciesAreComplete(action)) {
    showStatus(
      'Complete the dependent actions first.'
    );

    return;
  }

  await saveItem('actionItems', {
    ...action,
    status: 'In Progress',
    blocked: false,
    blockedReason: '',
    startedAt:
      action.startedAt || nowIso(),
    updatedAt: nowIso()
  });

  await updateWorkflowStepFromActions(
    action.workflowStepId
  );

  showStatus('Action started.');

  await refresh();
}

async function handleBlockAction(
  actionId,
  blockedReason = ''
) {
  const action = getActionById(actionId);

  if (!action) {
    showStatus('Action not found.');
    return;
  }

  const reason =
    blockedReason.trim() ||
    window.prompt(
      'What is blocking this action?'
    ) ||
    '';

  if (!reason.trim()) {
    return;
  }

  await saveItem('actionItems', {
    ...action,
    status: 'Blocked',
    blocked: true,
    blockedReason: reason.trim(),
    updatedAt: nowIso()
  });

  await updateWorkflowStepFromActions(
    action.workflowStepId
  );

  showStatus('Action marked as blocked.');

  await refresh();
}

async function handleResumeAction(actionId) {
  const action = getActionById(actionId);

  if (!action) {
    showStatus('Action not found.');
    return;
  }

  const nextStatus = dependenciesAreComplete(action)
    ? 'Ready'
    : 'Not Started';

  await saveItem('actionItems', {
    ...action,
    status: nextStatus,
    blocked: false,
    blockedReason: '',
    waitingOn: '',
    updatedAt: nowIso()
  });

  await updateWorkflowStepFromActions(
    action.workflowStepId
  );

  showStatus('Action resumed.');

  await refresh();
}

async function handleWaitAction(
  actionId,
  waitingOn = ''
) {
  const action = getActionById(actionId);

  if (!action) {
    showStatus('Action not found.');
    return;
  }

  const waitingReason =
    waitingOn.trim() ||
    window.prompt(
      'Who or what are you waiting on?'
    ) ||
    '';

  if (!waitingReason.trim()) {
    return;
  }

  await saveItem('actionItems', {
    ...action,
    status: 'Waiting',
    blocked: false,
    blockedReason: '',
    waitingOn: waitingReason.trim(),
    updatedAt: nowIso()
  });

  showStatus('Action moved to Waiting.');

  await refresh();
}

async function handleCompleteAction(actionId) {
  const action = getActionById(actionId);

  if (!action) {
    showStatus('Action not found.');
    return;
  }

  const confirmed = window.confirm(
    `Mark "${action.title}" complete?`
  );

  if (!confirmed) return;

  await saveItem('actionItems', {
    ...action,
    status: 'Complete',
    blocked: false,
    blockedReason: '',
    waitingOn: '',
    completedAt: nowIso(),
    updatedAt: nowIso()
  });

  await loadData();

  await unlockDependentActions(actionId);

  await loadData();

  await updateWorkflowStepFromActions(
    action.workflowStepId
  );

  showStatus(
    'Action completed. Dependent work was checked and unlocked.'
  );

  await refresh();
}
function buildConversationProposal({
  conversation,
  category,
  title,
  description,
  rationale,
  priority = 'Medium',
  actionType = 'Follow-Up',
  sequence
}) {
  return {
    id: uid('ai_proposal'),

    title,
    description,
    rationale,

    status: 'Pending Review',
    confidence: 'Structured',

    sourceType: 'Conversation',
    sourceRecordId: conversation.id,
    sourceTitle: conversation.title || '',

    category,
    proposedActionType: actionType,
    proposedPriority: priority,
    proposedOwner: conversation.owner || 'Robb',
    proposedDueDate: '',

    proposedCompletionCriteria: [
      'The required work has been completed.',
      'The outcome has been recorded in the COO Operating System.',
      'Relevant stakeholders have been updated where necessary.'
    ],

    linkedPersonIds: Array.isArray(
      conversation.personIds
    )
      ? conversation.personIds
      : [],

    linkedOrganizationIds: Array.isArray(
      conversation.organizationIds
    )
      ? conversation.organizationIds
      : [],

    linkedConversationIds: [
      conversation.id
    ],

    confidentiality:
      conversation.confidentiality || 'Internal',

    createdAt: nowIso(),
    updatedAt: nowIso()
  };
}

function createConversationProposals(conversation) {
  const proposals = [];

  const addProposal = ({
    category,
    title,
    description,
    rationale,
    priority,
    actionType
  }) => {
    proposals.push(
      buildConversationProposal({
        conversation,
        category,
        title,
        description,
        rationale,
        priority,
        actionType,
        sequence: proposals.length + 1
      })
    );
  };

  (
    conversation.fedemrCommitments || []
  ).forEach((commitment) => {
    addProposal({
      category: 'Commitment',
      title: commitment,
      description:
        `Complete the FedEMR commitment identified during "${conversation.title}".`,
      rationale:
        'FedEMR made or discussed this commitment during the conversation.',
      priority: 'High',
      actionType: 'Commitment'
    });
  });

  (
    conversation.suggestedFollowUps || []
  ).forEach((followUp) => {
    addProposal({
      category: 'Follow-Up',
      title: followUp,
      description:
        `Complete the follow-up identified during "${conversation.title}".`,
      rationale:
        'The conversation identified this as a necessary follow-up.',
      priority: 'High',
      actionType: 'Relationship Follow-Up'
    });
  });

  (
    conversation.openQuestions || []
  ).forEach((question) => {
    addProposal({
      category: 'Open Question',
      title: `Answer: ${question}`,
      description:
        `Research, confirm, or obtain an answer to the question raised during "${conversation.title}".`,
      rationale:
        'An unresolved question may prevent a decision or delay progress.',
      priority: 'Medium',
      actionType: 'Research'
    });
  });

  (
    conversation.risksRaised || []
  ).forEach((risk) => {
    addProposal({
      category: 'Risk',
      title: `Assess and respond to risk: ${risk}`,
      description:
        `Assess the risk raised during "${conversation.title}" and determine the appropriate mitigation or escalation.`,
      rationale:
        'The conversation identified a risk that requires an explicit response.',
      priority: 'High',
      actionType: 'Risk Mitigation'
    });
  });

  (
    conversation.opportunities || []
  ).forEach((opportunity) => {
    addProposal({
      category: 'Opportunity',
      title: `Qualify opportunity: ${opportunity}`,
      description:
        `Evaluate the opportunity identified during "${conversation.title}" and determine the recommended next step.`,
      rationale:
        'The opportunity should be qualified before resources are committed.',
      priority: 'Medium',
      actionType: 'Opportunity Qualification'
    });
  });

  (
    conversation.productRequests || []
  ).forEach((request) => {
    addProposal({
      category: 'Product Request',
      title: `Review product request: ${request}`,
      description:
        `Review the product request raised during "${conversation.title}", assess its fit with the roadmap, and document a response.`,
      rationale:
        'A product request was raised and requires assessment before any commitment is made.',
      priority: 'Medium',
      actionType: 'Product Review'
    });
  });

  return proposals;
}

async function handlePrepareConversationAnalysis(
  conversationId
) {
  const conversation = (
    state.data.conversations || []
  ).find(
    (item) => item.id === conversationId
  );

  if (!conversation) {
    showStatus('Conversation not found.');
    return;
  }

  const sourceText = String(
    conversation.sourceText ||
    conversation.transcript ||
    conversation.notes ||
    ''
  ).trim();

  if (!sourceText) {
    showStatus(
      'Add transcript, meeting notes, or email content before running analysis.'
    );

    return;
  }

  const confirmed = window.confirm(
    `Send the source text from "${conversation.title}" to the secure local AI service for analysis?`
  );

  if (!confirmed) return;

  showStatus(
    'Analyzing conversation. This may take several seconds.'
  );

  try {
    const response = await fetch(
      `${AI_SERVICE_URL}/api/analyze-conversation`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          title:
            conversation.title ||
            'Untitled Conversation',

          conversationType:
            conversation.conversationType ||
            'Conversation',

          date:
            conversation.date || '',

          participantNames:
            getPersonNames(
              conversation.personIds
            ),

          organizationNames:
            getOrganizationNames(
              conversation.organizationIds
            ),

          sourceText
        })
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(
        result.error ||
        'Conversation analysis failed.'
      );
    }

    const analysis = result.analysis || {};

    const analyzedConversation = {
      ...conversation,

      summary:
        analysis.summary || '',

      decisions:
        normalizeArray(
          analysis.decisions
        ),

      openQuestions:
        normalizeArray(
          analysis.openQuestions
        ),

      fedemrCommitments:
        normalizeArray(
          analysis.fedemrCommitments
        ),

      externalCommitments:
        normalizeArray(
          analysis.externalCommitments
        ),

      risksRaised:
        normalizeArray(
          analysis.risksRaised
        ),

      opportunities:
        normalizeArray(
          analysis.opportunities
        ),

      productRequests:
        normalizeArray(
          analysis.productRequests
        ),

      suggestedFollowUps:
        normalizeArray(
          analysis.suggestedFollowUps
        ),

      sentiment:
        analysis.sentiment || 'Neutral',

      urgency:
        analysis.urgency || 'Medium',

      confidenceNotes:
        normalizeArray(
          analysis.confidenceNotes
        ),

      analysisStatus: 'Analyzed',

      analysisMethod: 'OpenAI',

      analysisModel:
        result.model || '',

      analyzedAt: nowIso(),
      updatedAt: nowIso()
    };

    const proposals =
      createConversationProposals(
        analyzedConversation
      );

    const existingProposals = (
      state.data.aiActionProposals || []
    ).filter(
      (proposal) =>
        proposal.sourceType === 'Conversation' &&
        proposal.sourceRecordId === conversationId &&
        proposal.status === 'Pending Review'
    );

    if (existingProposals.length > 0) {
      const replaceExisting =
        window.confirm(
          `This conversation already has ${existingProposals.length} pending proposal${
            existingProposals.length === 1
              ? ''
              : 's'
          }. Replace them with the new AI analysis?`
        );

      if (!replaceExisting) {
        showStatus(
          'Analysis completed, but existing proposals were kept.'
        );

        await saveItem(
          'conversations',
          analyzedConversation
        );

        await refresh();

        return;
      }

      for (const proposal of existingProposals) {
        await deleteItem(
          'aiActionProposals',
          proposal.id
        );
      }
    }

    for (const proposal of proposals) {
      await saveItem(
        'aiActionProposals',
        {
          ...proposal,
          confidence: 'AI Extracted',
          analysisModel:
            result.model || '',
          updatedAt: nowIso()
        }
      );
    }

    await saveItem(
      'conversations',
      {
        ...analyzedConversation,

        generatedProposalCount:
          proposals.length
      }
    );

    showStatus(
      `Analysis complete. ${proposals.length} proposed action${
        proposals.length === 1
          ? ''
          : 's'
      } created for review.`
    );

    await refresh();
  } catch (error) {
    console.error(
      'Conversation analysis failed:',
      error
    );

    const serverUnavailable =
      error instanceof TypeError &&
      error.message.includes('fetch');

    showStatus(
      serverUnavailable
        ? 'The local AI server is not running. Start it with npm run server.'
        : error.message ||
          'Conversation analysis failed.'
    );
  }
}


async function handleApproveAiAction(
  proposalId
) {
  const proposal = (
    state.data.aiActionProposals || []
  ).find((item) => item.id === proposalId);

  if (!proposal) {
    showStatus('AI proposal not found.');
    return;
  }

  const actionId = uid('action');

  const action = {
    id: actionId,

    title:
      proposal.title ||
      'AI-proposed action',

    description:
      proposal.description || '',

    actionType:
      proposal.proposedActionType ||
      'Follow-Up',

    category:
      proposal.category ||
      proposal.sourceType ||
      'General',

    status: 'Ready',

    priority:
      proposal.proposedPriority ||
      'Medium',

    owner:
      proposal.proposedOwner ||
      'Robb',

    dueDate:
      proposal.proposedDueDate || '',

    completionCriteria:
      normalizeArray(
        proposal.proposedCompletionCriteria
      ),

    sourceType: 'AI Proposal',
    sourceRecordId: proposal.id,

    linkedRecordType:
      proposal.sourceType || '',

          linkedRecordId:
      proposal.sourceRecordId || '',

    linkedConversationIds:
      normalizeArray(
        proposal.linkedConversationIds
      ),

    dependencyActionIds: [],
    unlocksActionIds: [],

    blocked: false,
    blockedReason: '',
    waitingOn: '',

    estimatedHours:
      proposal.estimatedHours || 0,

    estimatedCost:
      proposal.estimatedCost || 0,

    confidentiality:
      proposal.confidentiality ||
      'Internal',

    createdAt: nowIso(),
    updatedAt: nowIso(),

    linkedFundingOpportunityIds:
      normalizeArray(
        proposal.linkedFundingOpportunityIds
      ),

    linkedPersonIds:
      normalizeArray(
        proposal.linkedPersonIds
      ),

    linkedOrganizationIds:
      normalizeArray(
        proposal.linkedOrganizationIds
      )
  };

  await saveItem('actionItems', action);

  await saveItem('aiActionProposals', {
    ...proposal,
    status: 'Approved',
    approvedAt: nowIso(),
    approvedBy: 'Robb',
    createdActionItemId: actionId,
    updatedAt: nowIso()
  });

  showStatus(
    'AI proposal approved and converted into an action.'
  );

  await refresh();
}

async function handleRejectAiAction(
  proposalId
) {
  const proposal = (
    state.data.aiActionProposals || []
  ).find((item) => item.id === proposalId);

  if (!proposal) {
    showStatus('AI proposal not found.');
    return;
  }

  const rejectionReason =
    window.prompt(
      'Why are you rejecting this proposal?'
    ) || '';

  await saveItem('aiActionProposals', {
    ...proposal,
    status: 'Rejected',
    rejectedAt: nowIso(),
    rejectionReason:
      rejectionReason.trim(),
    updatedAt: nowIso()
  });

  showStatus('AI proposal rejected.');

  await refresh();
}

function handleExport() {
  const exportPayload = {
    exportedAt: nowIso(),

    app: 'FedEMR COO Operating System',

    version: '0.7',

    schemaVersion: '0.7',

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

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;

  link.download =
    `fedemr-coo-export-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

  document.body.appendChild(link);

  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  showStatus('Export created.');
}

async function handleImport(file) {
  if (!file) return;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const importedData = parsed.data || parsed;

    await seedDatabase(importedData);

    showStatus('Import complete.');

    await refresh();
  } catch (error) {
    console.error(error);

    showStatus(
      'Import failed. Confirm this is a valid COO OS JSON export.'
    );
  }
}

const handlers = {
  onSeed: handleSeed,
  onNavigate: handleNavigate,
  onSearch: handleSearch,
  onSave: handleSave,
    onSaveLinkedRecord:
    handleSaveLinkedRecord,
  onDelete: handleDelete,
  onQuickAdd: handleQuickAdd,
  onExport: handleExport,
  onImport: handleImport,

  onStartAction: handleStartAction,
  onBlockAction: handleBlockAction,
  onResumeAction: handleResumeAction,
  onWaitAction: handleWaitAction,
  onCompleteAction: handleCompleteAction,

    onPrepareConversationAnalysis:
    handlePrepareConversationAnalysis,

  onApproveAiAction:
    handleApproveAiAction,

  onRejectAiAction:
    handleRejectAiAction
};

async function init() {
  bindNavigation(handlers);
  bindQuickAdd(handlers);
  bindImportExport(handlers);

  await loadData();

  const hasData = collections.some(
    (collection) =>
      (state.data[collection] || []).length > 0
  );

  if (!hasData) {
    await seedDatabase(sampleData);
    await loadData();
  }

  const productMarketSeeded =
    await seedProductMarketDataOnce();

  if (productMarketSeeded) {
    await loadData();
  }

    const actionEngineSeeded =
    await seedActionEngineDataOnce();

  if (actionEngineSeeded) {
    await loadData();
  }

  const readinessSeeded =
    await seedReadinessDataOnce();

  if (readinessSeeded) {
    await loadData();
  }

  renderDashboard(
    getDashboardModel(),
    handlers
  );

    if (readinessSeeded) {
    showStatus(
      'Readiness templates and research checklist added.'
    );
  }   if (readinessSeeded) {
    showStatus(
      'Readiness templates and research checklist added.'
    );
  } else if (actionEngineSeeded) {
    showStatus(
      'Action Engine workflow and next actions added.'
    );
  } else if (productMarketSeeded) {
    showStatus(
      'Product and Market data added.'
    );
  } else {
    showStatus(
      'FedEMR COO Operating System ready.'
    );
  }
}

init().catch((error) => {
  console.error(error);

  showStatus(
    'Something broke during startup. Check the console.'
  );
});