import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  addDoc,
  writeBatch
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import tasksLevel5 from './marketingData/tasks-level5';

// Firebase configuration from main.js
const firebaseConfig = {
  apiKey: "AIzaSyCkXn_qoiFB2BFWrEstSUBt9stEvC20xwI",
  authDomain: "markett-d5909.firebaseapp.com",
  projectId: "markett-d5909",
  storageBucket: "markett-d5909.firebasestorage.app",
  messagingSenderId: "1069191593749",
  appId: "1:1069191593749:web:a4e924856cf7de3948f31c",
  measurementId: "G-165TDBWJCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const shouldUseFirebaseAnonymousAuth = String(import.meta.env.VITE_ENABLE_FIREBASE_AUTH || '')
  .trim()
  .toLowerCase() === 'true';

const LOCAL_FALLBACK_USER_KEY = 'fallbackUserId';

function getLocalFallbackUserId() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return `local-${Date.now()}`;
  }

  const existing = window.localStorage.getItem(LOCAL_FALLBACK_USER_KEY);
  if (existing) return existing;

  const generated = `local-${Math.random().toString(36).slice(2, 11)}`;
  window.localStorage.setItem(LOCAL_FALLBACK_USER_KEY, generated);
  return generated;
}

// Create or get user session
const initUserSession = async () => {
  if (!shouldUseFirebaseAnonymousAuth) {
    return getLocalFallbackUserId();
  }

  try {
    // Use anonymous auth to track a user session
    const { user } = await signInAnonymously(auth);
    
    // Check if user document exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // Create a new user profile
      await setDoc(userDocRef, {
        userId: user.uid,
        createdAt: serverTimestamp(),
        progress: {
          completedTasks: [],
          completedQuizzes: [],
          earnedAchievements: [],
          currentLevel: 1,
          totalPoints: 0
        },
        settings: {
          notifications: true,
          language: 'tr'
        }
      });
    }
    
    return user.uid;
  } catch (error) {
    const errorCode = String(error?.code || '');
    if (errorCode.includes('admin-restricted-operation') || errorCode.includes('operation-not-allowed')) {
      return getLocalFallbackUserId();
    }

    console.warn('Firebase session failed, local fallback enabled:', errorCode);
    return getLocalFallbackUserId();
  }
};

// Get all categories
const getCategories = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    return categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

// Get all tasks
const getTasks = async () => {
  try {
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    return tasksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

// Get tasks by level
const getTasksByLevel = async (levelId) => {
  try {
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('levelId', '==', levelId),
      orderBy('order', 'asc')
    );
    
    const tasksSnapshot = await getDocs(tasksQuery);
    return tasksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting tasks by level:', error);
    return [];
  }
};

// Get single task by ID
const getTaskById = async (taskId) => {
  try {
    const taskDoc = await getDoc(doc(db, 'tasks', taskId));
    if (taskDoc.exists()) {
      return {
        id: taskDoc.id,
        ...taskDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting task by ID:', error);
    return null;
  }
};

// Get all quizzes
const getQuizzes = async () => {
  try {
    const quizzesSnapshot = await getDocs(collection(db, 'quizzes'));
    return quizzesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting quizzes:', error);
    return [];
  }
};

// Get quiz by level ID
const getQuizByLevelId = async (levelId) => {
  try {
    const quizzesQuery = query(
      collection(db, 'quizzes'),
      where('levelId', '==', levelId),
      limit(1)
    );
    
    const quizzesSnapshot = await getDocs(quizzesQuery);
    if (!quizzesSnapshot.empty) {
      const quizDoc = quizzesSnapshot.docs[0];
      return {
        id: quizDoc.id,
        ...quizDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting quiz by level ID:', error);
    return null;
  }
};

// Get all levels
const getLevels = async () => {
  try {
    const levelsQuery = query(
      collection(db, 'levels'),
      orderBy('order', 'asc')
    );
    
    const levelsSnapshot = await getDocs(levelsQuery);
    return levelsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting levels:', error);
    return [];
  }
};

// Get level by ID
const getLevelById = async (levelId) => {
  try {
    const levelDoc = await getDoc(doc(db, 'levels', levelId));
    if (levelDoc.exists()) {
      return {
        id: levelDoc.id,
        ...levelDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting level by ID:', error);
    return null;
  }
};

// Get user progress
const getUserProgress = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().progress;
    }
    return null;
  } catch (error) {
    console.error('Error getting user progress:', error);
    return null;
  }
};

// Update user progress when a task is completed
const completeTask = async (userId, taskId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    
    // Get task details to add points
    const taskDoc = await getDoc(doc(db, 'tasks', taskId));
    const taskPoints = taskDoc.exists() ? (taskDoc.data().points || 0) : 0;
    
    await updateDoc(userDocRef, {
      'progress.completedTasks': arrayUnion(taskId),
      'progress.totalPoints': getFirestore.FieldValue.increment(taskPoints)
    });
    
    return true;
  } catch (error) {
    console.error('Error completing task:', error);
    return false;
  }
};

// Update user progress when a quiz is completed
const completeQuiz = async (userId, quizId, score) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    
    // Get quiz details to add points
    const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
    const pointsPerQuestion = quizDoc.exists() ? (quizDoc.data().pointsPerQuestion || 10) : 10;
    const totalPoints = score * pointsPerQuestion;
    
    await updateDoc(userDocRef, {
      'progress.completedQuizzes': arrayUnion({
        quizId,
        score,
        completedAt: serverTimestamp()
      }),
      'progress.totalPoints': getFirestore.FieldValue.increment(totalPoints)
    });
    
    return true;
  } catch (error) {
    console.error('Error completing quiz:', error);
    return false;
  }
};

// Reset user progress (for admin/debug purposes)
const resetUserProgress = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    
    await updateDoc(userDocRef, {
      'progress.completedTasks': [],
      'progress.completedQuizzes': [],
      'progress.earnedAchievements': [],
      'progress.currentLevel': 1,
      'progress.totalPoints': 0
    });
    
    return true;
  } catch (error) {
    console.error('Error resetting user progress:', error);
    return false;
  }
};

// Import Level 5 tasks to Firebase
const importLevel5Tasks = async () => {
  try {
    const batch = writeBatch(db);
    
    // Check if tasks already exist to avoid duplicates
    const existingTasksQuery = query(
      collection(db, 'tasks'),
      where('levelId', '==', '5')
    );
    
    const existingTasksSnapshot = await getDocs(existingTasksQuery);
    
    // If tasks already exist, don't import again
    if (!existingTasksSnapshot.empty) {
      console.log('Level 5 tasks already exist in Firebase');
      return false;
    }
    
    // Add each task to the batch
    for (const task of tasksLevel5) {
      const taskRef = doc(collection(db, 'tasks'));
      batch.set(taskRef, {
        ...task,
        levelId: '5',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    // Commit the batch
    await batch.commit();
    console.log('Successfully imported Level 5 tasks to Firebase');
    return true;
  } catch (error) {
    console.error('Error importing Level 5 tasks:', error);
    return false;
  }
};

// Export all the Firebase service functions
export {
  initUserSession,
  getCategories,
  getTasks,
  getTasksByLevel,
  getTaskById,
  getQuizzes,
  getQuizByLevelId,
  getLevels,
  getLevelById,
  getUserProgress,
  completeTask,
  completeQuiz,
  resetUserProgress,
  importLevel5Tasks
}; 
