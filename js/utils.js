export const uid = (prefix = 'id') => `${prefix}_${crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)}`;

export const nowIso = () => new Date().toISOString();

export const formatDate = (value) => {
  if (!value) return 'Not set';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

export const daysUntil = (value) => {
  if (!value) return null;
  const target = new Date(value);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / 86400000);
};

export const clamp = (num, min = 0, max = 100) => Math.max(min, Math.min(max, Number(num) || 0));

export const normalizeText = (value) => String(value || '').toLowerCase().trim();

export const matchesQuery = (record, query) => {
  const q = normalizeText(query);
  if (!q) return true;
  return normalizeText(JSON.stringify(record)).includes(q);
};

export const downloadJson = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const readJsonFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    try { resolve(JSON.parse(reader.result)); }
    catch (error) { reject(error); }
  };
  reader.onerror = () => reject(reader.error);
  reader.readAsText(file);
});

export const currency = (value) => {
  const amount = Number(value || 0);
  if (!amount) return 'Not set';
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
};

export const titleCase = (value) => String(value || '').replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
