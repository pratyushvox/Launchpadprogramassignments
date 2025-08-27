import type { LogEntry } from '../types/index';
import { readLogs, saveLogs } from '../utils/fileUtils';
import { getCurrentTime } from '../utils/helpers';

export function createLog(action: string, taskId: string | null, details: string): void {
  const logs = readLogs();
  const newLog: LogEntry = {
    id: 'log' + (logs.length + 1),
    action: action,
    taskId: taskId,
    timestamp: getCurrentTime(),
    details: details
  };
  logs.push(newLog);
  saveLogs(logs);
}

export function getAllLogs(): LogEntry[] {
  return readLogs();
}