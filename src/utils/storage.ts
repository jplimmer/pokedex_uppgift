export function getTodayKey() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}
