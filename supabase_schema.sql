-- ==========================================================
-- RAAH - "A Path to Career" | Supabase Database Schema
-- Project ID: zlflicqyymijvhwlpeuj
-- Run this script in your Supabase SQL Editor:
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
    settings JSONB DEFAULT '{"emailNotifications": true}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon select student_profiles" ON public.student_profiles FOR SELECT USING (true);
CREATE POLICY "Allow anon insert student_profiles" ON public.student_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update student_profiles" ON public.student_profiles FOR UPDATE USING (true);

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
CREATE POLICY "Allow anon roadmap_progress" ON public.roadmap_progress FOR ALL USING (true);

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
CREATE POLICY "Allow anon learning_progress" ON public.learning_progress FOR ALL USING (true);

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
CREATE POLICY "Allow anon quiz_results" ON public.quiz_results FOR ALL USING (true);

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
CREATE POLICY "Allow anon coding_submissions" ON public.coding_submissions FOR ALL USING (true);

-- 6. Recommended Projects Progress Table
CREATE TABLE IF NOT EXISTS public.projects_progress (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    project_id TEXT NOT NULL,
    project_title TEXT,
    completed_steps JSONB DEFAULT '[]'::jsonb,
    github_url TEXT,
    status TEXT DEFAULT 'In Progress',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.projects_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon projects_progress" ON public.projects_progress FOR ALL USING (true);

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
CREATE POLICY "Allow anon career_guidance" ON public.career_guidance FOR ALL USING (true);

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
CREATE POLICY "Allow anon ai_conversations" ON public.ai_conversations FOR ALL USING (true);
