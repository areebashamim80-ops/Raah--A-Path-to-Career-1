import { createClient } from '@supabase/supabase-js';
import { UserProfile, AcademicYear, CareerRole, StudyTime } from '../types';

export const SUPABASE_PROJECT_ID = 'zlflicqyymijvhwlpeuj';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://zlflicqyymijvhwlpeuj.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zt0YgGHPU2uYPX9bzwFuwA_xXr7562X';

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseHealth {
  connected: boolean;
  tableReady: boolean;
  message: string;
  projectId: string;
  url: string;
}

/**
 * Checks connection to the Supabase instance and checks if tables are provisioned.
 */
export async function checkSupabaseConnection(): Promise<SupabaseHealth> {
  try {
    const startTime = Date.now();
    const { data, error } = await supabase
      .from('student_profiles')
      .select('email')
      .limit(1);

    if (error) {
      // If table doesn't exist yet in the user's schema (PostgREST code PGRST205 or Postgres 42P01)
      if (
        error.message?.includes('relation') ||
        error.message?.includes('schema cache') ||
        error.message?.includes('Could not find the table') ||
        error.code === '42P01' ||
        error.code === 'PGRST205'
      ) {
        return {
          connected: true,
          tableReady: false,
          message: 'Connected to Supabase project! Schema tables ready to be provisioned via SQL Editor.',
          projectId: SUPABASE_PROJECT_ID,
          url: SUPABASE_URL,
        };
      }
      return {
        connected: false,
        tableReady: false,
        message: error.message,
        projectId: SUPABASE_PROJECT_ID,
        url: SUPABASE_URL,
      };
    }

    const latency = Date.now() - startTime;
    return {
      connected: true,
      tableReady: true,
      message: `Connected & Synced with Supabase tables (${latency}ms)`,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
    };
  } catch (err: any) {
    return {
      connected: false,
      tableReady: false,
      message: err?.message || 'Failed to connect to Supabase endpoint',
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
    };
  }
}

/**
 * Saves or updates student profile in Supabase table `student_profiles`
 */
export async function saveUserProfileToSupabase(user: UserProfile): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      id: user.email.toLowerCase(),
      email: user.email.toLowerCase(),
      name: user.name,
      phone: user.phone || '',
      college: user.college,
      university: user.university || '',
      branch: user.branch,
      year: user.year,
      semester: user.semester,
      target_career: user.targetCareer,
      photo_url: user.photoUrl || '',
      bio: user.bio || '',
      current_skills: user.currentSkills || [],
      interests: user.interests || [],
      daily_study_time: user.dailyStudyTime,
      skill_confidence: user.skillConfidence,
      readiness_score: user.readinessScore,
      learning_streak: user.learningStreak,
      xp: user.xp,
      completed_chapters: user.completedChapters || [],
      solved_problems: user.solvedProblems || [],
      completed_projects: user.completedProjects || [],
      quiz_scores: user.quizScores || {},
      certificates: user.certificates || [],
      settings: user.settings || {},
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('student_profiles')
      .upsert(payload, { onConflict: 'email' });

    if (error) {
      console.warn('Supabase profile save notice:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Supabase profile sync error:', err?.message);
    return { success: false, error: err?.message };
  }
}

/**
 * Loads student profile from Supabase by email
 */
export async function loadUserProfileFromSupabase(email: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const loadedProfile: UserProfile = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      college: data.college,
      university: data.university,
      branch: data.branch,
      year: data.year as AcademicYear,
      semester: data.semester,
      targetCareer: data.target_career as CareerRole,
      photoUrl: data.photo_url,
      bio: data.bio,
      currentSkills: Array.isArray(data.current_skills) ? data.current_skills : [],
      interests: Array.isArray(data.interests) ? data.interests : [],
      dailyStudyTime: data.daily_study_time as StudyTime,
      skillConfidence: data.skill_confidence || 'Moderate',
      readinessScore: Number(data.readiness_score) || 50,
      learningStreak: Number(data.learning_streak) || 1,
      xp: Number(data.xp) || 100,
      completedChapters: Array.isArray(data.completed_chapters) ? data.completed_chapters : [],
      solvedProblems: Array.isArray(data.solved_problems) ? data.solved_problems : [],
      completedProjects: Array.isArray(data.completed_projects) ? data.completed_projects : [],
      quizScores: typeof data.quiz_scores === 'object' && data.quiz_scores !== null ? data.quiz_scores : {},
      certificates: Array.isArray(data.certificates) ? data.certificates : [],
      settings: data.settings || {},
    };

    return loadedProfile;
  } catch (err) {
    console.warn('Supabase profile load notice:', err);
    return null;
  }
}

/**
 * Sync 4-Year Roadmap topic progress to Supabase
 */
export async function saveRoadmapProgressToSupabase(
  userEmail: string,
  topicId: string,
  status: 'Completed' | 'In Progress' | 'Pending',
  year?: string,
  semester?: number
): Promise<boolean> {
  try {
    const recordId = `${userEmail.toLowerCase()}_${topicId}`;
    const { error } = await supabase
      .from('roadmap_progress')
      .upsert({
        id: recordId,
        user_email: userEmail.toLowerCase(),
        topic_id: topicId,
        status,
        year: year || '',
        semester: semester || 1,
        updated_at: new Date().toISOString(),
      });

    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Sync Course Learning chapter completion to Supabase
 */
export async function saveLearningProgressToSupabase(
  userEmail: string,
  chapterId: string,
  courseId?: string,
  chapterTitle?: string
): Promise<boolean> {
  try {
    const recordId = `${userEmail.toLowerCase()}_${chapterId}`;
    const { error } = await supabase
      .from('learning_progress')
      .upsert({
        id: recordId,
        user_email: userEmail.toLowerCase(),
        course_id: courseId || 'ml-foundations',
        chapter_id: chapterId,
        chapter_title: chapterTitle || `Chapter ${chapterId}`,
        status: 'Completed',
        completed_at: new Date().toISOString(),
      });

    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Sync Quiz test scores to Supabase
 */
export async function saveQuizResultToSupabase(
  userEmail: string,
  quizId: string,
  quizTitle: string,
  score: number,
  totalQuestions: number = 10,
  xpEarned: number = 20
): Promise<boolean> {
  try {
    const recordId = `${userEmail.toLowerCase()}_${quizId}_${Date.now()}`;
    const { error } = await supabase
      .from('quiz_results')
      .insert({
        id: recordId,
        user_email: userEmail.toLowerCase(),
        quiz_id: quizId,
        quiz_title: quizTitle,
        score,
        total_questions: totalQuestions,
        xp_earned: xpEarned,
        completed_at: new Date().toISOString(),
      });

    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Sync Solved Coding Problems to Supabase
 */
export async function saveCodingSubmissionToSupabase(
  userEmail: string,
  problemId: string,
  problemTitle: string,
  language: string = 'python',
  code?: string,
  status: string = 'Accepted'
): Promise<boolean> {
  try {
    const recordId = `${userEmail.toLowerCase()}_${problemId}`;
    const { error } = await supabase
      .from('coding_submissions')
      .upsert({
        id: recordId,
        user_email: userEmail.toLowerCase(),
        problem_id: problemId,
        problem_title: problemTitle,
        language,
        code: code || '',
        status,
        xp_earned: 25,
        solved_at: new Date().toISOString(),
      });

    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Sync Recommended Projects step progress to Supabase
 */
export async function saveProjectProgressToSupabase(
  userEmail: string,
  projectId: string,
  projectTitle: string,
  completedSteps: number[],
  githubUrl?: string
): Promise<boolean> {
  try {
    const recordId = `${userEmail.toLowerCase()}_${projectId}`;
    const { error } = await supabase
      .from('projects_progress')
      .upsert({
        id: recordId,
        user_email: userEmail.toLowerCase(),
        project_id: projectId,
        project_title: projectTitle,
        completed_steps: completedSteps,
        github_url: githubUrl || '',
        status: completedSteps.length >= 9 ? 'Completed' : 'In Progress',
        updated_at: new Date().toISOString(),
      });

    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Sync Career Guidance benchmark to Supabase
 */
export async function saveCareerGuidanceToSupabase(
  userEmail: string,
  targetCareer: string,
  readinessScore: number,
  skillBenchmarks: any = [],
  placementChecklist: any = []
): Promise<boolean> {
  try {
    const recordId = `${userEmail.toLowerCase()}_career`;
    const { error } = await supabase
      .from('career_guidance')
      .upsert({
        id: recordId,
        user_email: userEmail.toLowerCase(),
        target_career: targetCareer,
        readiness_score: readinessScore,
        skill_benchmarks: skillBenchmarks,
        placement_checklist: placementChecklist,
        updated_at: new Date().toISOString(),
      });

    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Sync RAAH AI Mentor messages to Supabase
 */
export async function saveAIMessageToSupabase(
  userEmail: string,
  role: 'user' | 'assistant',
  content: string,
  topic: string = 'General Career Guidance'
): Promise<boolean> {
  try {
    const recordId = `ai_${userEmail.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const { error } = await supabase
      .from('ai_conversations')
      .insert({
        id: recordId,
        user_email: userEmail.toLowerCase(),
        role,
        content,
        topic,
        created_at: new Date().toISOString(),
      });

    return !error;
  } catch (e) {
    return false;
  }
}

/**
 * Fetch AI conversations for a student from Supabase
 */
export async function loadAIMessagesFromSupabase(userEmail: string): Promise<Array<{ role: 'user' | 'assistant'; content: string; timestamp?: string }> | null> {
  try {
    const { data, error } = await supabase
      .from('ai_conversations')
      .select('role, content, created_at')
      .eq('user_email', userEmail.toLowerCase())
      .order('created_at', { ascending: true })
      .limit(50);

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map((d) => ({
      role: d.role as 'user' | 'assistant',
      content: d.content,
      timestamp: new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  } catch (e) {
    return null;
  }
}

/**
 * Synchronize all student learning, quizzes, coding, and roadmap state to Supabase in one batch
 */
export async function syncFullStudentAccountToSupabase(user: UserProfile): Promise<{
  success: boolean;
  syncedTables: string[];
  message: string;
}> {
  const syncedTables: string[] = [];

  // 1. Profile
  const profileRes = await saveUserProfileToSupabase(user);
  if (profileRes.success) syncedTables.push('student_profiles');

  // 2. Completed Chapters
  if (user.completedChapters?.length) {
    for (const chId of user.completedChapters) {
      await saveLearningProgressToSupabase(user.email, chId);
    }
    syncedTables.push('learning_progress');
  }

  // 3. Quiz Scores
  if (user.quizScores && Object.keys(user.quizScores).length > 0) {
    for (const [qId, score] of Object.entries(user.quizScores)) {
      await saveQuizResultToSupabase(user.email, qId, `Quiz - ${qId}`, score);
    }
    syncedTables.push('quiz_results');
  }

  // 4. Solved Problems
  if (user.solvedProblems?.length) {
    for (const pId of user.solvedProblems) {
      await saveCodingSubmissionToSupabase(user.email, pId, `Problem - ${pId}`);
    }
    syncedTables.push('coding_submissions');
  }

  // 5. Career Guidance
  await saveCareerGuidanceToSupabase(user.email, user.targetCareer, user.readinessScore);
  syncedTables.push('career_guidance');

  return {
    success: syncedTables.length > 0,
    syncedTables,
    message: `Synchronized ${syncedTables.length} categories to Supabase (${SUPABASE_PROJECT_ID})`,
  };
}
