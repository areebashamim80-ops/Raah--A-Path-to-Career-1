import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Code2,
  ChevronRight,
  AlertCircle,
  FolderGit2,
} from 'lucide-react';
import { ROADMAP_YEARS } from '../data/mockData';
import { RoadmapTopic, UserProfile } from '../types';
import { saveRoadmapProgressToSupabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

interface RoadmapPageProps {
  user: UserProfile;
  isLoggedIn?: boolean;
  onRequireLogin?: () => void;
  onGoToLearning: (topicId?: string) => void;
  onGoToQuiz: () => void;
  onGoToCoding: () => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  user: propUser,
  isLoggedIn = true,
  onRequireLogin,
  onGoToLearning,
  onGoToQuiz,
  onGoToCoding,
}) => {
  const { user: ctxUser, recordRoadmapTopic, addXP } = useUser();
  const user = propUser || ctxUser;

  const [selectedYearNum, setSelectedYearNum] = useState<1 | 2 | 3 | 4>(3);
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic | null>(null);

  const currentYearData = ROADMAP_YEARS.find((y) => y.yearNumber === selectedYearNum) || ROADMAP_YEARS[2];
  const activeSemester = currentYearData.semesters[0]; // Sem 5 for Year 3

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182238] tracking-tight">
            My 4-Year Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Your complete journey from 1st year to job ready
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Target Role:</span>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {user.targetCareer}
          </span>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Public Curriculum Preview:</strong> Log in to record semester completions, generate AI recommendations, and track career readiness.
            </span>
          </div>
          <button
            onClick={onRequireLogin}
            className="px-4 py-1.5 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs"
          >
            Log In to Personalize
          </button>
        </div>
      )}

      {/* 4 YEAR STATUS TABS matching top of reference image */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {ROADMAP_YEARS.map((yr) => {
          const isSelected = yr.yearNumber === selectedYearNum;
          return (
            <button
              key={yr.yearNumber}
              onClick={() => setSelectedYearNum(yr.yearNumber as 1 | 2 | 3 | 4)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-white shadow-md ring-2 ring-blue-500/10'
                  : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">Year {yr.yearNumber}</span>
                <span
                  className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                    yr.yearNumber === 1
                      ? 'bg-emerald-100 text-emerald-800'
                      : yr.yearNumber === 2
                      ? 'bg-blue-100 text-blue-800'
                      : yr.yearNumber === 3
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {yr.progressPercent}%
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">{yr.yearName}</h3>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2.5">
                <div
                  className={`h-full rounded-full ${
                    yr.yearNumber === 1
                      ? 'bg-emerald-500'
                      : yr.yearNumber === 2
                      ? 'bg-blue-600'
                      : yr.yearNumber === 3
                      ? 'bg-purple-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${yr.progressPercent}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* MAIN ROADMAP VIEW: LEFT LIST & RIGHT AI RECOMMENDATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Semester Subjects & Modules (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {currentYearData.semesters.map((sem) => (
            <div
              key={sem.semesterNumber}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h2 className="font-extrabold text-slate-900 text-base">
                    {sem.title}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {sem.topics.length} Core Modules
                </span>
              </div>

              {/* Topics list matching reference screen */}
              <div className="space-y-2.5">
                {sem.topics.map((topic) => {
                  const isDone = topic.status === 'Completed';
                  const isInProgress = topic.status === 'In Progress';
                  return (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        selectedTopic?.id === topic.id
                          ? 'border-blue-500 bg-blue-50/30'
                          : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isDone
                              ? 'bg-emerald-100 text-emerald-600'
                              : isInProgress
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isInProgress ? (
                            <Clock className="w-4 h-4 text-amber-600" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-300" />
                          )}
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                            {topic.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {topic.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            isDone
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isInProgress
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {topic.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Semester Projects preview */}
              {sem.projects && sem.projects.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <FolderGit2 className="w-3.5 h-3.5" /> Semester Projects:
                  </span>
                  {sem.projects.map((proj, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: AI Recommendation Card from reference screenshot (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Recommended Next */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recommended Next
              </span>
              <h3 className="text-lg font-extrabold text-[#182238] mt-1">
                Machine Learning
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Based on your skill-gap analysis, we recommend you focus on Machine Learning next to bridge your 55% gap for Data Scientist.
              </p>
            </div>

            <button
              onClick={() => onGoToLearning()}
              className="w-full py-3 px-4 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Learning</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Card: Topic Inspector (when student clicks any roadmap topic) */}
          {selectedTopic ? (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                  {selectedTopic.skillLevel}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {selectedTopic.estimatedHours}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{selectedTopic.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedTopic.description}</p>

              <div className="pt-2 flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => onGoToLearning(selectedTopic.id)}
                    className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center cursor-pointer shadow-xs"
                  >
                    Start Course
                  </button>
                  <button
                    onClick={onGoToQuiz}
                    className="py-2 px-3 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Quiz
                  </button>
                </div>

                <button
                  onClick={() => {
                    const nextStatus = selectedTopic.status === 'Completed' ? 'In Progress' : 'Completed';
                    recordRoadmapTopic(
                      selectedTopic.id,
                      nextStatus,
                      currentYearData.yearName,
                      activeSemester.semesterNumber
                    );
                    if (nextStatus === 'Completed') {
                      addXP(30);
                    }
                    setSelectedTopic({
                      ...selectedTopic,
                      status: nextStatus,
                    });
                  }}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedTopic.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {selectedTopic.status === 'Completed'
                      ? 'Completed (Saved in Supabase)'
                      : 'Mark Completed (Save to Supabase +30 XP)'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-center">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">Click any topic to view syllabus</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Explore hours, quizzes, practice and project connections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
