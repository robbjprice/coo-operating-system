import { clamp } from './utils.js';

const statusWeights = {
  'Complete': 100,
  'Done': 100,
  'Active': 70,
  'In Progress': 60,
  'Accepted': 60,
  'Discovery': 35,
  'At Risk': 30,
  'Open': 25,
  'Not Started': 10,
  'Hypothesis': 10,
  'Blocked': 5
};

const average = (values) => values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

const itemScore = (item) => {
  const completion = Number(item.completionPercentage);
  const base = Number.isFinite(completion) && completion > 0 ? completion : statusWeights[item.status] ?? 30;
  const priorityPenalty = item.priority === 'High' && item.status !== 'Complete' ? 5 : 0;
  const blockedPenalty = item.blocked || item.blockingIssue ? 18 : 0;
  return clamp(base - priorityPenalty - blockedPenalty);
};

export const commercialReadinessScore = (state) => average((state.readinessItems || []).map(itemScore));
export const governmentReadinessScore = (state) => average((state.governmentReadinessItems || []).map(itemScore));

export const riskSeverityScore = (state) => {
  const risks = state.risks || [];
  if (!risks.length) return 0;
  const maxSeverity = 25;
  return clamp(average(risks.filter(r => r.status !== 'Closed').map(r => Number(r.severity || (r.probability * r.impact)) / maxSeverity * 100)));
};

export const fundingReadinessScore = (state) => {
  const needs = state.fundingNeeds || [];
  if (!needs.length) return 100;
  const resolved = needs.filter(n => ['Funded', 'Closed', 'Complete'].includes(n.status)).length;
  const highOpen = needs.filter(n => n.priority === 'High' && !['Funded', 'Closed', 'Complete'].includes(n.status)).length;
  return clamp((resolved / needs.length) * 100 - highOpen * 8 + 45);
};

export const customerPipelineScore = (state) => {
  const customers = state.customers || [];
  if (!customers.length) return 0;
  return clamp(average(customers.map(c => Number(c.probability || 0))));
};

export const companyHealthScore = (state) => {
  const commercial = commercialReadinessScore(state);
  const government = governmentReadinessScore(state);
  const funding = fundingReadinessScore(state);
  const pipeline = customerPipelineScore(state);
  const riskPenalty = riskSeverityScore(state) * 0.35;
  return clamp((commercial * 0.3) + (government * 0.25) + (funding * 0.15) + (pipeline * 0.2) + 10 - riskPenalty);
};

export const allScores = (state) => ({
  commercialReadiness: Math.round(commercialReadinessScore(state)),
  governmentReadiness: Math.round(governmentReadinessScore(state)),
  companyHealth: Math.round(companyHealthScore(state)),
  riskSeverity: Math.round(riskSeverityScore(state)),
  fundingReadiness: Math.round(fundingReadinessScore(state)),
  pipeline: Math.round(customerPipelineScore(state))
});

export const readinessQuestions = (state) => {
  const readiness = [...(state.readinessItems || []), ...(state.governmentReadinessItems || [])];
  const has = (term) => readiness.some(item => `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(term));
  return [
    { question: 'Can we sell?', answer: has('sales') || has('pricing') ? 'Partially' : 'Needs work' },
    { question: 'Can we contract?', answer: has('legal') || has('contract') ? 'Partially' : 'Needs work' },
    { question: 'Can we deploy?', answer: has('deploy') || has('infrastructure') ? 'Partially' : 'Needs work' },
    { question: 'Can we get paid?', answer: has('payment') || has('procurement') || has('vendor') ? 'Partially' : 'Needs work' },
    { question: 'Can we prove ROI?', answer: has('roi') || has('evidence') ? 'Partially' : 'Needs work' }
  ];
};
