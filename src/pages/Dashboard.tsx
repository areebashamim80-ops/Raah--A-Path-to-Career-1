import React from 'react';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Code2,
  FolderGit2,
  User,
  ArrowRight,
  TrendingUp,
  Flame,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { CareerReadinessGauge } from '../components/CareerReadinessGauge';
import { UserProfile, SkillItem } from '../types';
import { USER_SKILLS, ROADMAP_YEARS } from '../data/mockData';

interface DashboardProps {
  user: UserProfile;
  skills?: SkillItem[];
  onNavigateTab: (tab: any) => void;
  onOpenProfile: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  skills = USER_SKILLS,
  onNavigateTab,
  onOpenProfile,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182238] tracking-tight">
            Hello {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Here's your complete journey, keep going
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('roadmap')}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Full Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>
      </div>

      {/* TOP ROW: Career Readiness Score | Skill Overview | Learning Streak */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* 1. Career Readiness Card (4 cols) */}
        <div className="md:col-span-5 lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Career Readiness Score
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Target
              </span>
            </div>

            <div className="py-2">
              <CareerReadinessGauge
                score={user.readinessScore || 72}
                career={user.targetCareer}
                size={120}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Target Role:</span>
            <span className="font-bold text-slate-800">{user.targetCareer}</span>
          </div>
        </div>

        {/* 2. Skill Overview Card (5 cols) */}
        <div className="md:col-span-7 lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Skill Overview
              </span>
              <button
                onClick={() => onNavigateTab('career')}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                View all skills
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Python', score: 80, color: 'bg-blue-600' },
                { name: 'SQL', score: 40, color: 'bg-amber-500' },
                { name: 'Statistics', score: 52, color: 'bg-purple-600' },
                { name: 'Machine Learning', score: 30, color: 'bg-rose-500' },
                { name: 'DSA', score: 60, color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700 w-32 truncate">
                    {item.name}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600 w-9 text-right">
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
            Next recommended priority: <strong className="text-amber-600 font-bold">SQL Queries & Machine Learning</strong>
          </p>
        </div>

        {/* 3. Learning Streak Card (3 cols) */}
        <div className="md:col-span-12 lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Learning Streak
            </span>

            <div className="py-4 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-2 shadow-xs">
                <Flame className="w-8 h-8 text-amber-500 fill-amber-500 animate-pulse" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {user.learningStreak || 6} Days
              </h3>
              <p className="text-xs font-bold text-amber-600 mt-0.5">Keep it up!</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center text-[11px] text-slate-500 mb-1.5 font-medium">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span className="font-bold text-slate-800">S</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[true, true, true, true, true, true, false].map((active, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-sm ${
                    active ? 'bg-amber-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE ROW: 4-Year Journey Progress Ribbon from Screenshot */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            4-Year Academic Progression
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Currently in: <strong className="text-blue-600">{user.year} ({user.semester})</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {ROADMAP_YEARS.map((yr) => {
            const isCompleted = yr.progressPercent === 100;
            const isCurrent = yr.yearNumber === 3;
            return (
              <div
                key={yr.yearNumber}
                onClick={() => onNavigateTab('roadmap')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isCurrent
                          ? 'bg-purple-600 animate-ping'
                          : 'bg-slate-300'
                      }`}
                    />
                    <span className="text-xs font-bold text-slate-800">Year {yr.yearNumber}</span>
                  </div>
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

                <p className="text-xs font-bold text-slate-900">{yr.yearName}</p>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
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
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM ROW: Current Focus | Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Current Focus (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Current Focus
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                Semester 5
              </span>
            </div>

            <div className="flex items-start gap-4 py-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-slate-900 text-base">
                  Machine Learning
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Chapter 3: Regression
                </p>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">Course Progress</span>
                    <span className="font-bold text-slate-800">40%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Estimated 12 min remaining today
            </span>
            <button
              onClick={() => onNavigateTab('learning')}
              className="px-4 py-2 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Right: Quick Actions (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Quick Actions
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigateTab('quizzes')}
                className="p-3 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Take Quiz</h4>
                <p className="text-[10px] text-slate-500">DSA & Arrays</p>
              </button>

              <button
                onClick={() => onNavigateTab('coding')}
                className="p-3 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Code2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Coding Practice</h4>
                <p className="text-[10px] text-slate-500">Two Sum & Stack</p>
              </button>

              <button
                onClick={() => onNavigateTab('projects')}
                className="p-3 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">View Projects</h4>
                <p className="text-[10px] text-slate-500">Churn Prediction</p>
              </button>

              <button
                onClick={onOpenProfile}
                className="p-3 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 text-left transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Update Profile</h4>
                <p className="text-[10px] text-slate-500">Target Role & XP</p>
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 text-right">
            <span className="text-[11px] text-slate-400">
              Daily goal: 2 hours • 45 min completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
