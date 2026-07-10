function countItems(data, collection) {
  return Array.isArray(data[collection]) ? data[collection].length : 0;
}

function countCompleted(items = []) {
  return items.filter((item) => {
    const status = String(item.status || '').toLowerCase();
    return status.includes('complete') || status.includes('done');
  }).length;
}

function scoreFromCompletion(items = []) {
  if (!items.length) return 0;

  const completed = countCompleted(items);
  return Math.round((completed / items.length) * 100);
}

function cap(value, max = 100) {
  return Math.min(Math.max(value, 0), max);
}

export function calculateExecutiveScore(data = {}) {
  const taskScore = scoreFromCompletion(data.tasks || []);
  const commercialScore = scoreFromCompletion(data.readinessItems || []);
  const governmentScore = scoreFromCompletion(data.governmentReadinessItems || []);

  const customerScore = cap(countItems(data, 'customers') * 10);
  const fundingScore = cap(countItems(data, 'fundingNeeds') * 15);
  const roadmapScore = scoreFromCompletion(data.roadmapItems || []);

  const riskPenalty = cap(countItems(data, 'risks') * 5, 30);

  const rawScore =
    taskScore * 0.2 +
    commercialScore * 0.2 +
    governmentScore * 0.15 +
    customerScore * 0.15 +
    fundingScore * 0.1 +
    roadmapScore * 0.15 -
    riskPenalty;

  return cap(Math.round(rawScore));
}

export function calculateCollectionSummary(data = {}) {
  return {
    tasks: countItems(data, 'tasks'),
    readinessItems: countItems(data, 'readinessItems'),
    governmentReadinessItems: countItems(data, 'governmentReadinessItems'),
    customers: countItems(data, 'customers'),
    meetings: countItems(data, 'meetings'),
    advisorRecommendations: countItems(data, 'advisorRecommendations'),
    risks: countItems(data, 'risks'),
    fundingNeeds: countItems(data, 'fundingNeeds'),
    roadmapItems: countItems(data, 'roadmapItems'),
    documents: countItems(data, 'documents'),
  };
}