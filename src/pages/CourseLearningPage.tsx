import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  FileText,
  HelpCircle,
  Code2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Download,
  Terminal,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { MACHINE_LEARNING_COURSE } from '../data/mockData';
import { CourseChapter, UserProfile } from '../types';
import { saveLearningProgressToSupabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

interface CourseLearningPageProps {
  user?: UserProfile;
  onGoToQuiz: () => void;
  onGoToCoding: () => void;
  onChapterCompleted?: (chapterTitle: string) => void;
}

export const CourseLearningPage: React.FC<CourseLearningPageProps> = ({
  user: propUser,
  onGoToQuiz,
  onGoToCoding,
  onChapterCompleted,
}) => {
  const { user: ctxUser, completeChapter } = useUser();
  const user = propUser || ctxUser;

  const [selectedChapterIdx, setSelectedChapterIdx] = useState(2); // Chapter 3: Regression matching reference image
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'quiz' | 'notes'>('practice');
  const [userCode, setUserCode] = useState(
    MACHINE_LEARNING_COURSE.chapters[2].exercise.starterCode
  );
  const [testResults, setTestResults] = useState<{ id: number; passed: boolean; label: string }[]>([
    { id: 1, passed: true, label: 'Test Case 1 (1500 sqft, 3 beds)' },
    { id: 2, passed: true, label: 'Test Case 2 (2000 sqft, 4 beds)' },
    { id: 3, passed: true, label: 'Test Case 3 (800 sqft, 1 bed)' },
  ]);
  const [executionOutput, setExecutionOutput] = useState<string>('736.0\nOutput matches ground truth!');
  const [isRunning, setIsRunning] = useState(false);

  const chapter = MACHINE_LEARNING_COURSE.chapters[selectedChapterIdx];
  const isCompleted = user?.completedChapters?.includes(chapter.id) || false;

  const handleMarkComplete = () => {
    completeChapter(chapter.id, 'ml-foundations', chapter.title);
    if (onChapterCompleted) {
      onChapterCompleted(chapter.title);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionOutput(`Estimated Price Output: 736.0\nEvaluating against test cases...\nAll 3 assertions passed successfully!`);
    }, 400);
  };

  const handleNextChapter = () => {
    if (selectedChapterIdx < MACHINE_LEARNING_COURSE.chapters.length - 1) {
      setSelectedChapterIdx(selectedChapterIdx + 1);
      setUserCode(MACHINE_LEARNING_COURSE.chapters[selectedChapterIdx + 1].exercise.starterCode);
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapterIdx > 0) {
      setSelectedChapterIdx(selectedChapterIdx - 1);
      setUserCode(MACHINE_LEARNING_COURSE.chapters[selectedChapterIdx - 1].exercise.starterCode);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Breadcrumb matching reference screenshot */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <span>Home</span>
        <span>›</span>
        <span>Learning</span>
        <span>›</span>
        <span className="text-slate-800 font-bold">{MACHINE_LEARNING_COURSE.title}</span>
      </div>

      {/* Main Container: Chapter Sidebar | Central Player & Lab | Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Course Chapters List (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Course Chapters</h3>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {MACHINE_LEARNING_COURSE.chapters.length} Total
            </span>
          </div>

          <div className="space-y-1">
            {MACHINE_LEARNING_COURSE.chapters.map((ch, idx) => {
              const isActive = selectedChapterIdx === idx;
              const isDone = ch.isCompleted || (isActive && isCompleted);
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapterIdx(idx);
                    setUserCode(ch.exercise.starterCode);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 text-slate-400 font-bold">{idx + 1}</span>
                    <span className="truncate">{ch.title}</span>
                  </div>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER: Video player + Tabs + Embedded Coding Editor (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Chapter Title & Intro */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#182238]">
              {chapter.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {chapter.conceptSummary}
            </p>
          </div>

          {/* Interactive Player / Video Card from reference image */}
          <div className="relative rounded-2xl bg-[#0F172A] text-white overflow-hidden aspect-video flex flex-col justify-between p-4 shadow-lg group">
            {/* Background subtle mesh */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-950 opacity-90" />

            <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold px-2 py-0.5 rounded bg-white/10 backdrop-blur-xs">
                Interactive Concept Lecture
              </span>
              <span className="font-mono-code font-bold text-amber-400">
                {chapter.duration}
              </span>
            </div>

            {/* Center Play Button */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <button
                className="w-14 h-14 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110 cursor-pointer"
                aria-label="Play video lecture"
              >
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </button>
              <h4 className="text-sm font-bold text-white mt-3">
                {chapter.title} Explained
              </h4>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2">
              <span>Instructor: {MACHINE_LEARNING_COURSE.instructor}</span>
              <span className="text-emerald-400 font-semibold">HD 1080p</span>
            </div>
          </div>

          {/* Tabs: Learn | Practice | Quiz | Notes */}
          <div className="flex items-center gap-1 border-b border-slate-200">
            {[
              { id: 'learn', label: 'Learn' },
              { id: 'practice', label: 'Practice' },
              { id: 'quiz', label: 'Quiz' },
              { id: 'notes', label: 'Notes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'quiz') onGoToQuiz();
                  else setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Embedded Coding Arena from Reference Screenshot */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Practice Coding
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">Python 3</span>
                <button
                  onClick={() => setUserCode(chapter.exercise.starterCode)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  title="Reset code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Prompt instruction */}
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <strong>Exercise:</strong> {chapter.exercise.prompt}
            </p>

            {/* Code Editor Box */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0F172A]">
              <div className="px-3 py-1.5 bg-[#1E293B] text-[11px] font-mono-code text-slate-400 flex items-center justify-between">
                <span>solution.py</span>
                <span>UTF-8</span>
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={7}
                className="w-full p-3 font-mono-code text-xs text-emerald-400 bg-transparent resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>
                <button
                  onClick={() => {
                    handleRunCode();
                    handleMarkComplete();
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Submit Solution</span>
                </button>
              </div>

              <span className="text-[11px] text-emerald-600 font-bold">
                +15 XP on completion
              </span>
            </div>

            {/* Test Cases Output matching screenshot */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Test Cases:
                </span>
                <span className="text-[11px] font-bold text-emerald-600">3/3 Passed</span>
              </div>

              <div className="space-y-1.5">
                {testResults.map((tc) => (
                  <div
                    key={tc.id}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  >
                    <span className="text-slate-700 font-medium">{tc.label}</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Resources & Actions Card (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Resources
            </h3>

            <div className="space-y-2">
              {[
                { title: 'Video Lecture', type: '12:45 min', icon: Play },
                { title: 'PDF Notes', type: 'Formula Sheet', icon: FileText },
                { title: 'Practice Questions', type: '10 Problems', icon: Code2 },
                { title: 'Quick Summary', type: 'Cheatsheet', icon: BookOpen },
              ].map((res, rIdx) => {
                const Icon = res.icon;
                return (
                  <div
                    key={rIdx}
                    className="p-2.5 rounded-xl border border-slate-200/70 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{res.title}</p>
                        <p className="text-[10px] text-slate-400">{res.type}</p>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={handleMarkComplete}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-[#182238] hover:bg-blue-700 text-white'
                }`}
              >
                {isCompleted ? '✓ Completed (Synced)' : 'Mark as Complete (+15 XP)'}
              </button>

              <button
                onClick={handleNextChapter}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
