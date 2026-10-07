-- ==========================================================
-- RAAH - "A Path to Career" | Supabase Database Schema
-- Project ID: zlflicqyymijvhwlpeuj
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zlflicqyymijvhwlpeuj/sql
-- ==========================================================

-- 1. Student Profiles Table
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    college TEXT,
    university TEXT,
    branch TEXT,
    year TEXT,
    semester TEXT,
    target_career TEXT,
    photo_url TEXT,
    bio TEXT,
    current_skills JSONB DEFAULT '[]'::jsonb,
    interests JSONB DEFAULT '[]'::jsonb,
    daily_study_time TEXT DEFAULT '2 hours',
    skill_confidence TEXT DEFAULT 'Moderate',
    readiness_score NUMERIC DEFAULT 50,
    learning_streak INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 100,
    completed_chapters JSONB DEFAULT '[]'::jsonb,
    solved_problems JSONB DEFAULT '[]'::jsonb,
    completed_projects JSONB DEFAULT '[]'::jsonb,
    quiz_scores JSONB DEFAULT '{}'::jsonb,
    certificates JSONB DEFAULT '[]'::jsonb,
    settings JSONB DEFAULT '{"emailNotifications": true, "dailyReminder": true, "reminderTime": "18:00", "privateProfile": false, "marketingEmails": false}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and add public anon policies for student_profiles
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on student_profiles" ON public.student_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert on student_profiles" ON public.student_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on student_profiles" ON public.student_profiles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on student_profiles" ON public.student_profiles FOR DELETE USING (true);

-- 2. 4-Year Roadmap Progress Table
CREATE TABLE IF NOT EXISTS public.roadmap_progress (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'In Progress',
    year TEXT,
    semester INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on roadmap_progress" ON public.roadmap_progress FOR SELECT USING (true);
CREATE POLICY "Allow public insert on roadmap_progress" ON public.roadmap_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on roadmap_progress" ON public.roadmap_progress FOR UPDATE USING (true);

-- 3. Course Learning Progress Table
CREATE TABLE IF NOT EXISTS public.learning_progress (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    course_id TEXT,
    chapter_id TEXT NOT NULL,
    chapter_title TEXT,
    status TEXT DEFAULT 'Completed',
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on learning_progress" ON public.learning_progress FOR SELECT USING (true);
CREATE POLICY "Allow public insert on learning_progress" ON public.learning_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on learning_progress" ON public.learning_progress FOR UPDATE USING (true);

-- 4. Quizzes & Tests History Table
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    quiz_id TEXT NOT NULL,
    quiz_title TEXT,
    score INTEGER NOT NULL,
    total_questions INTEGER DEFAULT 10,
    xp_earned INTEGER DEFAULT 20,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on quiz_results" ON public.quiz_results FOR SELECT USING (true);
CREATE POLICY "Allow public insert on quiz_results" ON public.quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on quiz_results" ON public.quiz_results FOR UPDATE USING (true);

-- 5. Coding Practice Submissions Table
CREATE TABLE IF NOT EXISTS public.coding_submissions (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    problem_id TEXT NOT NULL,
    problem_title TEXT,
    language TEXT DEFAULT 'python',
    code TEXT,
    status TEXT DEFAULT 'Accepted',
    xp_earned INTEGER DEFAULT 25,
    solved_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.coding_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on coding_submissions" ON public.coding_submissions FOR SELECT USING (true);
CREATE POLICY "Allow public insert on coding_submissions" ON public.coding_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on coding_submissions" ON public.coding_submissions FOR UPDATE USING (true);

-- 6. Recommended Projects Progress Table
CREATE TABLE IF NOT EXISTS public.projects_progress (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    project_id TEXT NOT NULL,
    project_title TEXT,
    completed_steps JSONB DEFAULT '[]'::jsonb,
    github_url TEXT,
    demo_url TEXT,
    status TEXT DEFAULT 'In Progress',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.projects_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on projects_progress" ON public.projects_progress FOR SELECT USING (true);
CREATE POLICY "Allow public insert on projects_progress" ON public.projects_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on projects_progress" ON public.projects_progress FOR UPDATE USING (true);

-- 7. Career Guidance & Readiness Table
CREATE TABLE IF NOT EXISTS public.career_guidance (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    target_career TEXT NOT NULL,
    readiness_score NUMERIC DEFAULT 50,
    skill_benchmarks JSONB DEFAULT '[]'::jsonb,
    placement_checklist JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.career_guidance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on career_guidance" ON public.career_guidance FOR SELECT USING (true);
CREATE POLICY "Allow public insert on career_guidance" ON public.career_guidance FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on career_guidance" ON public.career_guidance FOR UPDATE USING (true);

-- 8. RAAH AI Conversations Table
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    topic TEXT DEFAULT 'General Career Guidance',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on ai_conversations" ON public.ai_conversations FOR SELECT USING (true);
CREATE POLICY "Allow public insert on ai_conversations" ON public.ai_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on ai_conversations" ON public.ai_conversations FOR UPDATE USING (true);

-- Create helpful indexes
CREATE INDEX IF NOT EXISTS idx_roadmap_user ON public.roadmap_progress (user_email);
CREATE INDEX IF NOT EXISTS idx_learning_user ON public.learning_progress (user_email);
CREATE INDEX IF NOT EXISTS idx_quizzes_user ON public.quiz_results (user_email);
CREATE INDEX IF NOT EXISTS idx_coding_user ON public.coding_submissions (user_email);
CREATE INDEX IF NOT EXISTS idx_projects_user ON public.projects_progress (user_email);
CREATE INDEX IF NOT EXISTS idx_ai_user ON public.ai_conversations (user_email);
