export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function getCurrentTime(): string {
  return new Date().toISOString();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}
