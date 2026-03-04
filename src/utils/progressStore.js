import { levels } from './marketingData/levels';
import { tasksByLevel } from './marketingData/learning-content';

const STORAGE_KEY = 'digital_marketing_learning_progress_v1';
const PROGRESS_EVENT = 'learning-progress-updated';

function getDefaultProgress() {
  return {
    startedTasks: [],
    completedTasks: [],
    quizResults: {},
    unlockedLevel: 1,
    updatedAt: new Date().toISOString()
  };
}

function normalizeUniqueStringArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((item) => String(item)))];
}

function sortLevelsAscending() {
  return [...levels].sort((a, b) => a.order - b.order);
}

function isPreviousLevelCompleted(progress, levelOrder) {
  const previousOrder = levelOrder - 1;
  if (previousOrder < 1) return true;

  const previousLevelId = String(previousOrder);
  const previousTasks = tasksByLevel[previousLevelId] || [];

  const allTasksCompleted = previousTasks.every((task) =>
    progress.completedTasks.includes(String(task.id))
  );
  const previousQuizScore = Number(progress.quizResults[previousLevelId] || 0);
  const quizPassed = previousQuizScore >= 70;

  return allTasksCompleted && quizPassed;
}

export function computeUnlockedLevel(progress) {
  const orderedLevels = sortLevelsAscending();
  let unlockedLevel = 1;

  for (const level of orderedLevels) {
    if (level.order === 1) continue;

    if (isPreviousLevelCompleted(progress, level.order)) {
      unlockedLevel = level.order;
    } else {
      break;
    }
  }

  return unlockedLevel;
}

function normalizeProgress(progress) {
  const defaultProgress = getDefaultProgress();
  const merged = {
    ...defaultProgress,
    ...(progress || {})
  };

  merged.startedTasks = normalizeUniqueStringArray(merged.startedTasks);
  merged.completedTasks = normalizeUniqueStringArray(merged.completedTasks);
  merged.quizResults = typeof merged.quizResults === 'object' && merged.quizResults !== null
    ? merged.quizResults
    : {};

  merged.unlockedLevel = computeUnlockedLevel(merged);
  merged.updatedAt = new Date().toISOString();

  return merged;
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function emitProgressUpdated(progress) {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: progress }));
}

export function saveProgress(progress) {
  const normalized = normalizeProgress(progress);
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    emitProgressUpdated(normalized);
  }
  return normalized;
}

export function loadProgress() {
  if (!isBrowser()) {
    return normalizeProgress(getDefaultProgress());
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = normalizeProgress(getDefaultProgress());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    return normalizeProgress(JSON.parse(raw));
  } catch (error) {
    const fallback = normalizeProgress(getDefaultProgress());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
}

export function resetProgress() {
  return saveProgress(getDefaultProgress());
}

export function markTaskStarted(taskId) {
  const progress = loadProgress();
  const id = String(taskId);

  if (!progress.completedTasks.includes(id) && !progress.startedTasks.includes(id)) {
    progress.startedTasks.push(id);
  }

  return saveProgress(progress);
}

export function markTaskCompleted(taskId) {
  const progress = loadProgress();
  const id = String(taskId);

  if (!progress.completedTasks.includes(id)) {
    progress.completedTasks.push(id);
  }

  progress.startedTasks = progress.startedTasks.filter((item) => item !== id);

  return saveProgress(progress);
}

export function saveQuizResult(levelId, score) {
  const progress = loadProgress();
  const normalizedLevelId = String(levelId);
  const normalizedScore = Number(score || 0);

  const existingScore = Number(progress.quizResults[normalizedLevelId] || 0);
  progress.quizResults[normalizedLevelId] = Math.max(existingScore, normalizedScore);

  return saveProgress(progress);
}

export function isLevelUnlocked(levelId, progress = loadProgress()) {
  const levelNumber = Number(levelId);
  return levelNumber <= Number(progress.unlockedLevel || 1);
}

export function getTaskStatus(taskId, progress = loadProgress()) {
  const id = String(taskId);
  if (progress.completedTasks.includes(id)) return 'Tamamlandı';
  if (progress.startedTasks.includes(id)) return 'Devam Ediyor';
  return 'Henüz Başlanmadı';
}

export function subscribeProgress(listener) {
  if (!isBrowser()) {
    return () => {};
  }

  const handler = (event) => {
    if (typeof listener === 'function') {
      listener(event.detail || loadProgress());
    }
  };

  window.addEventListener(PROGRESS_EVENT, handler);

  return () => {
    window.removeEventListener(PROGRESS_EVENT, handler);
  };
}
