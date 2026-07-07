import { uid, nowIso } from './utils.js';

const base = (prefix, extra) => ({
  id: uid(prefix),
  createdAt: nowIso(),
  updatedAt: nowIso(),
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
  ...extra
});

export const collections = [
  'tasks',
  'readinessItems',
  'governmentReadinessItems',
  'customers',
  'meetings',
  'advisorRecommendations',
  'risks',
  'fundingNeeds',
  'roadmapItems',
  'settings',
  'activityLog'
];

export const sampleData = {
  settings: [{ id: 'settings_default', appName: 'FedEMR COO Operating System', theme: 'light', createdAt: nowIso(), updatedAt: nowIso() }],
  tasks: [
    base('task', { title: 'Confirm minimum insurance requirements for first health system buyer', status: 'In Progress', priority: 'High', dueDate: '2026-07-15', category: 'Insurance', blocked: true, waitingOn: 'Broker quote and cyber coverage requirements', notes: 'Needed before any serious government or AHS procurement conversation.' }),
    base('task', { title: 'Draft SaaS licensing agreement issue list', status: 'Not Started', priority: 'High', dueDate: '2026-07-18', category: 'Legal', waitingOn: 'CSM Legal direction', notes: 'Include data ownership, model ownership, deployment scope, support, liability, and termination language.' }),
    base('task', { title: 'Create first-customer deployment checklist', status: 'In Progress', priority: 'High', dueDate: '2026-07-22', category: 'Deployment', notes: 'Must include pre-deployment, go-live, support, measurement, and 90-day ROI tracking.' }),
    base('task', { title: 'Define ROI metrics for 90 days after deployment', status: 'Not Started', priority: 'High', dueDate: '2026-07-25', category: 'ROI', notes: 'Time-to-value, analyst hours saved, sites onboarded, model performance, procurement cycle, and evidence package.' }),
    base('task', { title: 'Build advisor recommendation review rhythm', status: 'Not Started', priority: 'Medium', dueDate: '2026-07-19', category: 'Operations', notes: 'Recommendations need owners and outcomes, not inspirational confetti.' })
  ],
  readinessItems: [
    base('ready', { title: 'Commercial SaaS contracting path', category: 'Legal', description: 'Clear contracting path for paid non-research customers.', status: 'At Risk', priority: 'High', completionPercentage: 25, estimatedCost: 15000, blockingIssue: 'Need legal agreement template and company/university boundary clarity.' }),
    base('ready', { title: 'Cybersecurity package', category: 'Cybersecurity', description: 'Security posture, controls summary, incident response, data handling, and audit readiness.', status: 'Not Started', priority: 'High', completionPercentage: 10, estimatedCost: 30000, blockingIssue: 'No formal security package assembled yet.' }),
    base('ready', { title: 'Procurement documentation binder', category: 'Procurement', description: 'Vendor docs, insurance, privacy, security, references, contracting, and pricing package.', status: 'In Progress', priority: 'High', completionPercentage: 35, estimatedCost: 5000 }),
    base('ready', { title: 'Pricing and packaging', category: 'Sales', description: 'License, deployment, support, research collaboration, and enterprise pricing logic.', status: 'In Progress', priority: 'High', completionPercentage: 40, estimatedCost: 0 }),
    base('ready', { title: 'ROI evidence framework', category: 'Finance', description: 'Measures that prove economic and operational value after first deployment.', status: 'Not Started', priority: 'High', completionPercentage: 15, estimatedCost: 7500 })
  ],
  governmentReadinessItems: [
    base('gov', { title: 'Government of Alberta vendor registration', organization: 'Government of Alberta', category: 'Vendor Registration', description: 'Identify registration, procurement portal, and documentation requirements.', status: 'Not Started', priority: 'High', completionPercentage: 15, requiredDocumentation: 'Corporate profile, insurance, banking, tax, security documentation.' }),
    base('gov', { title: 'AHS procurement pathway', organization: 'Alberta Health Services', category: 'Procurement', description: 'Clarify if FedEMR enters through pilot, innovation pathway, research agreement, or paid procurement.', status: 'At Risk', priority: 'High', completionPercentage: 20, blockingIssue: 'Procurement pathway not yet confirmed.' }),
    base('gov', { title: 'University of Calgary commercial boundary', organization: 'University of Calgary', category: 'Legal Agreements', description: 'Clarify relationship between university research activities and commercial FedEMR sales.', status: 'In Progress', priority: 'High', completionPercentage: 35, waitingOn: 'University legal and COI guidance.' }),
    base('gov', { title: 'Government of Canada vendor pathway', organization: 'Government of Canada', category: 'Vendor Registration', description: 'Determine if federal supplier registration is needed before federal health or research opportunities.', status: 'Not Started', priority: 'Medium', completionPercentage: 10 })
  ],
  customers: [
    base('cust', { name: 'Government health system buyer', organizationName: 'Government health system buyer', contactNames: 'TBD', sector: 'Government / Health System', opportunityType: 'First deployment', stage: 'Discovery', probability: 35, estimatedValue: 250000, expectedCloseDate: '2026-10-15', nextStep: 'Confirm procurement path and minimum security requirements.', decisionMaker: 'TBD', procurementPath: 'Unknown' }),
    base('cust', { name: 'University research alliance deployment', organizationName: 'University research alliance deployment', contactNames: 'Na Li, Pietro, research collaborators', sector: 'University / Research', opportunityType: 'Research-to-commercial pathway', stage: 'Active', probability: 60, estimatedValue: 150000, expectedCloseDate: '2026-09-30', nextStep: 'Separate research collaboration from paid platform services.', decisionMaker: 'PI / institutional lead', procurementPath: 'Research agreement plus commercial service contract' }),
    base('cust', { name: 'Pharma federated cohort use case', organizationName: 'Pharma federated cohort use case', contactNames: 'TBD', sector: 'Enterprise / Pharma', opportunityType: 'Commercial license', stage: 'Hypothesis', probability: 20, estimatedValue: 500000, expectedCloseDate: '2027-01-31', nextStep: 'Validate demand and data access model.', procurementPath: 'Enterprise SaaS / services' })
  ],
  meetings: [
    base('meet', { title: 'Commercial readiness planning call', date: '2026-07-07', attendees: 'Robb, advisors', organization: 'FedEMR', notes: 'Need an operating system that turns advice, gaps, risks, and opportunities into daily execution.', decisions: 'Build local-first COO OS in GitHub.', actionItems: 'Prioritize government readiness, legal, procurement, security, first deployment, and ROI proof.', followUpDate: '2026-07-14' }),
    base('meet', { title: 'Advisor commercialization discussion', date: '2026-07-03', attendees: 'Robb, Colin', organization: 'FedEMR', notes: 'Avoid random grant chasing. Funding should map to specific commercialization blockers.', decisions: 'Track advisor recommendations as accountable records.', actionItems: 'Create funding needs tied to readiness gaps.', followUpDate: '2026-07-17' })
  ],
  advisorRecommendations: [
    base('adv', { title: 'Tie funding asks to specific commercialization blockers', advisorName: 'Colin', date: '2026-07-03', recommendation: 'Do not chase grants randomly. Map every funding need to a concrete blocker, milestone, or customer requirement.', category: 'Funding', priority: 'High', status: 'Accepted', relatedModule: 'Funding Needs', outcome: 'Added as core principle in COO OS.' }),
    base('adv', { title: 'Clarify commercial versus research pathway', advisorName: 'Legal / commercialization advisors', date: '2026-07-01', recommendation: 'Separate research collaborations from commercial SaaS licensing and paid deployment services.', category: 'Legal', priority: 'High', status: 'In Progress', relatedModule: 'Commercial Readiness' })
  ],
  risks: [
    base('risk', { title: 'First customer delayed by procurement uncertainty', description: 'Potential buyers may like the platform but stall if vendor, legal, security, or procurement path is unclear.', category: 'Procurement', probability: 4, impact: 5, severity: 20, owner: 'Robb', mitigationPlan: 'Build government readiness checklist and confirm buyer-specific requirements.', status: 'Open', reviewDate: '2026-07-14' }),
    base('risk', { title: 'University/company boundary confusion', description: 'Unclear boundaries between university research and company commercialization could slow contracting or create COI issues.', category: 'Legal / Governance', probability: 3, impact: 5, severity: 15, owner: 'Robb / Na', mitigationPlan: 'Get written legal guidance and standard language.', status: 'Open', reviewDate: '2026-07-12' }),
    base('risk', { title: 'Pilot does not convert to paid customer', description: 'A pilot without procurement path, ROI measures, or paid conversion terms becomes free consulting wearing a fake moustache.', category: 'Sales', probability: 4, impact: 4, severity: 16, owner: 'Robb', mitigationPlan: 'Require conversion criteria and 90-day ROI plan before pilot launch.', status: 'Open', reviewDate: '2026-07-20' })
  ],
  fundingNeeds: [
    base('fund', { title: 'Security and procurement readiness package', fundingNeed: 'Security and procurement readiness package', category: 'Commercial Readiness', amount: 50000, purpose: 'Security documentation, audit support, procurement binder, insurance review, and legal templates.', priority: 'High', timing: 'Next 60 days', potentialFundingSource: 'Non-dilutive commercialization funding', grantMatch: 'Digital health implementation / commercialization readiness', status: 'Open' }),
    base('fund', { title: 'First deployment implementation capacity', fundingNeed: 'First deployment implementation capacity', category: 'Deployment', amount: 125000, purpose: 'Technical implementation, customer support, onboarding, ROI tracking, and customer success during first deployment.', priority: 'High', timing: 'Before first customer', potentialFundingSource: 'Customer contract, grant, founder bridge, strategic partner', status: 'Open' })
  ],
  roadmapItems: [
    base('road', { title: 'Commercial readiness package complete', milestone: 'Commercial readiness package complete', quarter: 'Q3 2026', month: 'August', targetDate: '2026-08-30', status: 'In Progress', priority: 'High', owner: 'Robb', dependencies: 'Legal, insurance, procurement, security, pricing', completionPercentage: 30 }),
    base('road', { title: 'First customer deployment ready', milestone: 'First customer deployment ready', quarter: 'Q4 2026', month: 'October', targetDate: '2026-10-01', status: 'At Risk', priority: 'High', owner: 'FedEMR Team', dependencies: 'Procurement path, security docs, deployment checklist, support model', completionPercentage: 20 }),
    base('road', { title: '90-day ROI evidence package', milestone: '90-day ROI evidence package', quarter: 'Q1 2027', month: 'January', targetDate: '2027-01-15', status: 'Not Started', priority: 'High', owner: 'Robb', dependencies: 'First deployment and measurement plan', completionPercentage: 10 })
  ],
  activityLog: []
};
