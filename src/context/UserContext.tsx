import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserSettings, SkillItem, CareerRole, AcademicYear } from '../types';
import { INITIAL_USER } from '../data/mockData';
import {
  checkSupabaseConnection,
  saveUserProfileToSupabase,
  loadUserProfileFromSupabase,
  saveRoadmapProgressToSupabase,
  saveLearningProgressToSupabase,
  saveQuizResultToSupabase,
  saveCodingSubmissionToSupabase,
  saveProjectProgressToSupabase,
  saveCareerGuidanceToSupabase,
  syncFullStudentAccountToSupabase,
  SupabaseHealth,
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
} from '../lib/supabase';

const USERS_STORE_KEY = 'raah_users_store';
const AUTH_KEY = 'raah_auth_active';
const ACTIVE_EMAIL_KEY = 'raah_active_email';
const ACTIVE_PROFILE_KEY = 'raah_user_profile';

// Pre-seeded demo user profiles for realistic testing
export const DEMO_PROFILES: Record<string, UserProfile> = {
  'areeba@raah.edu': {
    name: 'Areeba Khan',
    email: 'areeba@raah.edu',
    phone: '+91 98765 12345',
    college: 'Delhi Technological University',
    university: 'Delhi Technological University',
    branch: 'Computer Science & Engineering',
    year: '2nd Year',
    semester: 'Semester 4',
    targetCareer: 'Data Scientist',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Passionate 2nd year B.Tech CSE student preparing for Data Science & AI careers.',
    currentSkills: ['Python', 'DSA', 'SQL', 'DBMS', 'Pandas', 'NumPy'],
    interests: ['Data Science', 'Machine Learning', 'AI'],
    dailyStudyTime: '2 hours',
    skillConfidence: 'Moderate',
    readinessScore: 74,
    learningStreak: 8,
    xp: 920,
    completedChapters: ['ml-ch1', 'ml-ch2'],
    solvedProblems: ['prob-1'],
    completedProjects: ['Student Performance Prediction'],
    quizScores: {
      'quiz-dsa-arrays': 85,
      'quiz-python-basics': 95,
    },
    certificates: [
      {
        id: 'cert-areeba-1',
        title: 'Year 1 Foundation: Algorithmic Logic in C/C++',
        issueDate: 'June 2025',
        issuer: 'RAAH Engineering Academy',
        credentialId: 'RAAH-2025-AK-9102',
        grade: 'Distinction (96%)',
        skills: ['C/C++', 'DSA', 'OOP'],
      },
    ],
    settings: {
      emailNotifications: true,
      dailyReminder: true,
      reminderTime: '19:00',
      privateProfile: false,
      marketingEmails: false,
    },
  },
  'rahul@raah.edu': INITIAL_USER,
};

// Retrieve all stored users from localStorage
export function loadAllUsers(): Record<string, UserProfile> {
  try {
    const raw = localStorage.getItem(USERS_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEMO_PROFILES,
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Failed to parse users store', e);
  }
  return { ...DEMO_PROFILES };
}

// Save all users to localStorage
export function saveAllUsers(store: Record<string, UserProfile>) {
  try {
    localStorage.setItem(USERS_STORE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save users store', e);
  }
}

interface UserContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  usersStore: Record<string, UserProfile>;
  login: (userData: Partial<UserProfile>) => UserProfile;
  signUp: (newUserData: Partial<UserProfile>) => UserProfile;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  updateSettings: (settings: UserSettings) => void;
  addXP: (amount: number) => void;
  recordQuizScore: (quizId: string, score: number) => void;
  solveProblem: (problemId: string, code?: string, language?: string) => void;
  recordRoadmapTopic: (topicId: string, status: 'Completed' | 'In Progress' | 'Pending', year?: string, semester?: number) => void;
  completeChapter: (chapterId: string, courseId?: string, chapterTitle?: string) => void;
  recordProjectProgress: (projectId: string, completedSteps: number[], projectTitle?: string) => void;
  recordCareerGuidance: (targetCareer: string, readinessScore: number) => void;
  switchAccount: (email: string) => void;
  // Supabase Database Integration
  supabaseHealth: SupabaseHealth;
  isSyncingWithSupabase: boolean;
  syncWithSupabase: () => Promise<boolean>;
  refreshSupabaseConnection: () => Promise<SupabaseHealth>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. All users in database
  const [usersStore, setUsersStore] = useState<Record<string, UserProfile>>(() => {
    return loadAllUsers();
  });

  // 2. Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const authStored = localStorage.getItem(AUTH_KEY);
    return authStored !== null ? authStored === 'true' : true;
  });

  // 3. Active user profile state
  const [user, setUser] = useState<UserProfile>(() => {
    const store = loadAllUsers();
    const activeEmail = localStorage.getItem(ACTIVE_EMAIL_KEY);

    if (activeEmail && store[activeEmail.toLowerCase()]) {
      return store[activeEmail.toLowerCase()];
    }

    try {
      const rawProfile = localStorage.getItem(ACTIVE_PROFILE_KEY);
      if (rawProfile) {
        const parsed = JSON.parse(rawProfile);
        if (parsed?.email && parsed?.name) {
          return parsed;
        }
      }
    } catch (e) {}

    return store['areeba@raah.edu'] || store['rahul@raah.edu'] || INITIAL_USER;
  });

  // 4. Supabase Live State
  const [supabaseHealth, setSupabaseHealth] = useState<SupabaseHealth>({
    connected: true,
    tableReady: false,
    message: 'Connecting to Supabase project zlflicqyymijvhwlpeuj...',
    projectId: SUPABASE_PROJECT_ID,
    url: SUPABASE_URL,
  });

  const [isSyncingWithSupabase, setIsSyncingWithSupabase] = useState<boolean>(false);

  // Check Supabase connection on startup
  const refreshSupabaseConnection = async (): Promise<SupabaseHealth> => {
    const health = await checkSupabaseConnection();
    setSupabaseHealth(health);
    return health;
  };

  useEffect(() => {
    refreshSupabaseConnection();
  }, []);

  // Try to load latest cloud profile from Supabase on start or active email change
  useEffect(() => {
    if (user?.email) {
      loadUserProfileFromSupabase(user.email).then((cloudProfile) => {
        if (cloudProfile && cloudProfile.name) {
          setUser((prev) => ({
            ...prev,
            ...cloudProfile,
          }));
        }
      });
    }
  }, [user?.email]);

  // Persist auth status
  useEffect(() => {
    localStorage.setItem(AUTH_KEY, isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  // Persist active user profile locally and push to Supabase
  useEffect(() => {
    if (user?.email) {
      const emailKey = user.email.toLowerCase();
      localStorage.setItem(ACTIVE_EMAIL_KEY, emailKey);
      localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(user));

      setUsersStore((prev) => {
        const updated = { ...prev, [emailKey]: user };
        saveAllUsers(updated);
        return updated;
      });

      // Background cloud sync to Supabase
      saveUserProfileToSupabase(user);
    }
  }, [user]);

  // One-click Manual Full Sync to Supabase
  const syncWithSupabase = async (): Promise<boolean> => {
    setIsSyncingWithSupabase(true);
    try {
      const res = await syncFullStudentAccountToSupabase(user);
      const health = await checkSupabaseConnection();
      setSupabaseHealth(health);
      setIsSyncingWithSupabase(false);
      return res.success;
    } catch (e) {
      setIsSyncingWithSupabase(false);
      return false;
    }
  };

  // Login handler: restores saved profile if exists, or builds one
  const login = (userData: Partial<UserProfile>): UserProfile => {
    const rawEmail = (userData.email || user.email || 'student@raah.edu').trim();
    const emailKey = rawEmail.toLowerCase();
    const currentStore = loadAllUsers();

    let targetProfile = currentStore[emailKey];

    if (!targetProfile) {
      const derivedName = userData.name || rawEmail.split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      targetProfile = {
        ...INITIAL_USER,
        ...userData,
        email: rawEmail,
        name: derivedName || 'Engineering Student',
      };
    } else {
      targetProfile = {
        ...targetProfile,
        ...userData,
      };
    }

    const updatedStore = { ...currentStore, [emailKey]: targetProfile };
    saveAllUsers(updatedStore);
    setUsersStore(updatedStore);

    setUser(targetProfile);
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(ACTIVE_EMAIL_KEY, emailKey);
    localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(targetProfile));

    // Sync login to Supabase
    saveUserProfileToSupabase(targetProfile);

    return targetProfile;
  };

  // Sign up handler: saves completely new user profile permanently and syncs to Supabase
  const signUp = (newUserData: Partial<UserProfile>): UserProfile => {
    const email = (newUserData.email || 'student@raah.edu').trim();
    const emailKey = email.toLowerCase();

    const freshUser: UserProfile = {
      ...INITIAL_USER,
      ...newUserData,
      email,
      name: newUserData.name || 'New Student',
      branch: newUserData.branch || 'Computer Science & Engineering',
      year: newUserData.year || '1st Year',
      semester: newUserData.semester || 'Semester 1',
      targetCareer: newUserData.targetCareer || 'Software Developer',
      learningStreak: 1,
      xp: 100,
      readinessScore: 50,
      completedChapters: [],
      solvedProblems: [],
      completedProjects: [],
      quizScores: {},
      certificates: [],
      settings: {
        emailNotifications: true,
        dailyReminder: true,
        reminderTime: '18:00',
        privateProfile: false,
        marketingEmails: false,
      },
    };

    const currentStore = loadAllUsers();
    const updatedStore = { ...currentStore, [emailKey]: freshUser };
    saveAllUsers(updatedStore);
    setUsersStore(updatedStore);

    setUser(freshUser);
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(ACTIVE_EMAIL_KEY, emailKey);
    localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(freshUser));

    // Sync to Supabase
    saveUserProfileToSupabase(freshUser);

    return freshUser;
  };

  // Logout handler: preserves user data in permanent database and Supabase, clears active session
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(AUTH_KEY, 'false');
  };

  // Update profile: immediately updates global state & persists to localStorage & Supabase
  const updateProfile = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => {
      const merged: UserProfile = {
        ...prev,
        ...updatedData,
      };

      const emailKey = merged.email.toLowerCase();
      const currentStore = loadAllUsers();
      currentStore[emailKey] = merged;
      saveAllUsers(currentStore);
      localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(merged));

      // Asynchronously push to Supabase
      saveUserProfileToSupabase(merged);

      return merged;
    });
  };

  // Update settings
  const updateSettings = (settings: UserSettings) => {
    setUser((prev) => {
      const merged = { ...prev, settings };
      const emailKey = merged.email.toLowerCase();
      const currentStore = loadAllUsers();
      currentStore[emailKey] = merged;
      saveAllUsers(currentStore);
      localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(merged));
      saveUserProfileToSupabase(merged);
      return merged;
    });
  };

  // Add XP
  const addXP = (amount: number) => {
    setUser((prev) => {
      const merged = { ...prev, xp: prev.xp + amount };
      saveUserProfileToSupabase(merged);
      return merged;
    });
  };

  // Record quiz score: saves locally & syncs to Supabase
  const recordQuizScore = (quizId: string, score: number) => {
    setUser((prev) => {
      const updatedScores = { ...prev.quizScores, [quizId]: score };
      const merged = {
        ...prev,
        xp: prev.xp + 20,
        quizScores: updatedScores,
      };
      // Sync to Supabase tables
      saveUserProfileToSupabase(merged);
      saveQuizResultToSupabase(prev.email, quizId, `Quiz: ${quizId}`, score, 10, 20);
      return merged;
    });
  };

  // Solve problem: saves locally & syncs to Supabase
  const solveProblem = (problemId: string, code?: string, language?: string) => {
    setUser((prev) => {
      const alreadySolved = prev.solvedProblems.includes(problemId);
      const merged = {
        ...prev,
        solvedProblems: alreadySolved ? prev.solvedProblems : [...prev.solvedProblems, problemId],
        xp: alreadySolved ? prev.xp : prev.xp + 25,
      };
      saveUserProfileToSupabase(merged);
      saveCodingSubmissionToSupabase(
        prev.email,
        problemId,
        `Problem: ${problemId}`,
        language || 'python',
        code || '',
        'Accepted'
      );
      return merged;
    });
  };

  // Record 4-Year roadmap topic progress: syncs to Supabase
  const recordRoadmapTopic = (
    topicId: string,
    status: 'Completed' | 'In Progress' | 'Pending',
    year?: string,
    semester?: number
  ) => {
    saveRoadmapProgressToSupabase(user.email, topicId, status, year, semester);
  };

  // Complete course learning chapter: updates user, awards XP & syncs to Supabase
  const completeChapter = (chapterId: string, courseId?: string, chapterTitle?: string) => {
    setUser((prev) => {
      const alreadyCompleted = prev.completedChapters?.includes(chapterId);
      const merged = {
        ...prev,
        completedChapters: alreadyCompleted
          ? prev.completedChapters
          : [...(prev.completedChapters || []), chapterId],
        xp: alreadyCompleted ? prev.xp : prev.xp + 15,
      };
      saveUserProfileToSupabase(merged);
      saveLearningProgressToSupabase(
        prev.email,
        chapterId,
        courseId || 'ml-foundations',
        chapterTitle
      );
      return merged;
    });
  };

  // Record project steps progress: syncs to Supabase
  const recordProjectProgress = (
    projectId: string,
    completedSteps: number[],
    projectTitle?: string
  ) => {
    setUser((prev) => {
      const isFullyCompleted = completedSteps.length >= 8;
      const alreadyDone = prev.completedProjects?.includes(projectTitle || projectId);
      const updatedProjects = isFullyCompleted && !alreadyDone
        ? [...(prev.completedProjects || []), projectTitle || projectId]
        : prev.completedProjects || [];
      const merged = {
        ...prev,
        completedProjects: updatedProjects,
        xp: isFullyCompleted && !alreadyDone ? prev.xp + 50 : prev.xp,
      };
      saveUserProfileToSupabase(merged);
      saveProjectProgressToSupabase(prev.email, projectId, projectTitle || projectId, completedSteps);
      return merged;
    });
  };

  // Record career guidance benchmarks: syncs to Supabase
  const recordCareerGuidance = (targetCareer: string, readinessScore: number) => {
    setUser((prev) => {
      const merged = {
        ...prev,
        targetCareer: targetCareer as any,
        readinessScore,
      };
      saveUserProfileToSupabase(merged);
      saveCareerGuidanceToSupabase(prev.email, targetCareer, readinessScore);
      return merged;
    });
  };

  // Quick switch account between registered profiles
  const switchAccount = (email: string) => {
    const emailKey = email.toLowerCase();
    const currentStore = loadAllUsers();
    if (currentStore[emailKey]) {
      const target = currentStore[emailKey];
      setUser(target);
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(ACTIVE_EMAIL_KEY, emailKey);
      localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(target));
      saveUserProfileToSupabase(target);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        usersStore,
        login,
        signUp,
        logout,
        updateProfile,
        updateSettings,
        addXP,
        recordQuizScore,
        solveProblem,
        recordRoadmapTopic,
        completeChapter,
        recordProjectProgress,
        recordCareerGuidance,
        switchAccount,
        supabaseHealth,
        isSyncingWithSupabase,
        syncWithSupabase,
        refreshSupabaseConnection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
