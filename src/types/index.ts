export type CareerRole = 
  | 'Software Developer'
  | 'Data Scientist'
  | 'AI / ML Engineer'
  | 'Full Stack Developer'
  | 'Data Engineer'
  | 'Cyber Security Engineer'
  | 'Cloud / DevOps Engineer'
  | 'Mobile App Developer';

export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

export type StudyTime = '30 minutes' | '1 hour' | '2 hours' | '3+ hours';

export interface CertificateItem {
  id: string;
  title: string;
  issueDate: string;
  issuer: string;
  credentialId: string;
  grade?: string;
  skills: string[];
}

export interface UserSettings {
  emailNotifications: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  privateProfile: boolean;
  marketingEmails: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  college: string;
  university?: string;
  branch: string;
  year: AcademicYear;
  semester: string;
  targetCareer: CareerRole;
  photoUrl?: string;
  bio?: string;
  currentSkills: string[];
  interests: string[];
  dailyStudyTime: StudyTime;
  skillConfidence: string;
  readinessScore: number;
  learningStreak: number;
  xp: number;
  completedChapters: string[];
  solvedProblems: string[];
  completedProjects: string[];
  quizScores: Record<string, number>;
  certificates?: CertificateItem[];
  settings?: UserSettings;
}

export interface CareerPathInfo {
  id: string;
  name: CareerRole;
  shortDesc: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced';
  avgPackage: string;
  requiredSkills: string[];
  description: string;
  marketDemand: 'High' | 'Very High' | 'Trending';
  recommendedYear: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'DSA' | 'Database' | 'Web' | 'AI/ML' | 'Cloud' | 'Core CS' | 'Data Science';
  score: number; // 0 - 100
  targetScore: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastered';
  gap: number;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  estimatedHours: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  category: string;
  courseId?: string;
  quizId?: string;
}

export interface RoadmapSemester {
  semesterNumber: number;
  title: string;
  topics: RoadmapTopic[];
  projects: string[];
}

export interface RoadmapYearData {
  yearNumber: 1 | 2 | 3 | 4;
  yearName: string;
  tagline: string;
  progressPercent: number;
  badgeColor: string;
  semesters: RoadmapSemester[];
}

export interface CourseChapter {
  id: string;
  chapterNumber: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  conceptSummary: string;
  keyPoints: string[];
  codeSnippet: string;
  exercise: {
    prompt: string;
    starterCode: string;
    expectedOutput: string;
    solution: string;
  };
}

export interface Course {
  id: string;
  title: string;
  careerRole: CareerRole;
  category: string;
  progress: number;
  totalChapters: number;
  instructor: string;
  chapters: CourseChapter[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  xpReward: number;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface CodingProblem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptance: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCodes: {
    python: string;
    cpp: string;
    java: string;
    javascript: string;
  };
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  hints: string[];
}

export interface ProjectStep {
  stepNumber: number;
  title: string;
  description: string;
  checklist: string[];
  resources: { name: string; url: string; type: 'doc' | 'code' | 'video' }[];
  starterCode?: string;
}

export interface ProjectGuideItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  duration: string;
  description: string;
  objectives: string[];
  steps: ProjectStep[];
}
