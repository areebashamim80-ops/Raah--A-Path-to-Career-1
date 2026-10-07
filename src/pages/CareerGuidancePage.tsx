import React, { useEffect } from 'react';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building2,
  Brain,
  Sparkles,
  Target,
  ExternalLink,
} from 'lucide-react';
import { CareerReadinessGauge } from '../components/CareerReadinessGauge';
import { USER_SKILLS } from '../data/mockData';
import { UserProfile } from '../types';
import { saveCareerGuidanceToSupabase } from '../lib/supabase';

interface CareerGuidancePageProps {
  user: UserProfile;
  onGoToLearning: () => void;
  onGoToProjects: () => void;
}

export const CareerGuidancePage: React.FC<CareerGuidancePageProps> = ({
  user,
  onGoToLearning,
  onGoToProjects,
}) => {
  useEffect(() => {
    if (user?.email && user?.targetCareer) {
      saveCareerGuidanceToSupabase(user.email, user.targetCareer, user.readinessScore || 72);
    }
  }, [user?.email, user?.targetCareer, user?.readinessScore]);
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182238] tracking-tight">
            Career Guidance Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            AI-driven readiness diagnostic and placement preparation for {user.targetCareer}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Status:</span>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Placement Track Active
          </span>
        </div>
      </div>

      {/* TOP ROW: Readiness Gauge & Skill Gap Analysis matching reference image 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Readiness Overview Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Overall Career Readiness
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                {user.targetCareer}
              </span>
            </div>

            <div className="py-5 flex flex-col items-center text-center">
              <CareerReadinessGauge
                score={user.readinessScore || 72}
                career={user.targetCareer}
                size={140}
                strokeWidth={12}
                showDetails={false}
              />

              <div className="mt-4">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                  Good Progress
                </span>
                <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                  You are on the right track! Focus on SQL and building intermediate machine learning projects to hit 85%+ readiness.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-50 p-2 rounded-xl">
              <span className="text-slate-400 block text-[10px]">Avg Placement Time</span>
              <strong className="text-slate-800 font-bold">Month 7 of Year 4</strong>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl">
              <span className="text-slate-400 block text-[10px]">Expected Package</span>
              <strong className="text-emerald-700 font-bold">₹14 - 28 LPA</strong>
            </div>
          </div>
        </div>

        {/* Skill Gap Analysis (7 cols) matching reference image */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Skill Gap Analysis
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Benchmark vs Top Product Companies
              </span>
            </div>

            <div className="space-y-3.5">
              {[
                { name: 'SQL & Database Queries', current: 40, target: 85, gap: '45% Gap', color: 'bg-amber-500' },
                { name: 'Statistics & Probability', current: 52, target: 80, gap: '28% Gap', color: 'bg-purple-600' },
                { name: 'Machine Learning', current: 30, target: 85, gap: '55% Gap', color: 'bg-rose-500' },
                { name: 'DSA & Algorithms', current: 60, target: 85, gap: '25% Gap', color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.name}</span>
                    <span className="font-extrabold text-amber-600 text-[11px] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {item.gap}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.current}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Current: {item.current}%</span>
                    <span>Target: {item.target}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 pt-2 border-t border-slate-100">
            *Gaps calculated against placement hiring benchmarks from FAANG, Tier 1 Unicorns, and Top MNCs.
          </p>
        </div>
      </div>

      {/* MIDDLE ROW: Strengths | Recommended Next | Suggested Projects matching image 10 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Your Strengths */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Your Strengths
          </span>
          <div className="space-y-2">
            {[
              'Python Programming (80%)',
              'Data Visualization (65%)',
              'Problem Solving & Logic',
              'DBMS Normalization (70%)',
            ].map((st, sIdx) => (
              <div
                key={sIdx}
                className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Action */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Recommended Next
            </span>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="text-sm font-extrabold text-blue-950">
                SQL Joins & Window Functions
              </h4>
              <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                Focus on SQL to strengthen your data querying skills and bridge your largest technical gap.
              </p>
            </div>
          </div>

          <button
            onClick={onGoToLearning}
            className="w-full py-2.5 px-3 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Go to Learning</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Suggested Projects */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Suggested Projects
            </span>
            <div className="space-y-1.5">
              {[
                'Customer Churn Prediction',
                'Movie Recommendation System',
                'Stock Price Prediction',
              ].map((projName, pIdx) => (
                <div
                  key={pIdx}
                  onClick={onGoToProjects}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-xs font-bold text-slate-800 cursor-pointer transition-colors"
                >
                  <span>{projName}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onGoToProjects}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Explore All Projects</span>
          </button>
        </div>
      </div>

      {/* PLACEMENT & RECRUITER TRACK */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Campus Placement Preparation Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Track hiring criteria for Tier-1 technology companies visiting your campus.
            </p>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Semester 7/8 Readiness
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'ATS Resume Score', status: '82 / 100', note: 'Action verbs & metrics verified', done: true },
            { title: 'Blind 75 LeetCode', status: '38 / 75 Solved', note: 'Focus on Graphs & DP', done: false },
            { title: 'Deployed Capstones', status: '2 / 3 Live', note: 'Public URL with README', done: true },
            { title: 'Mock Interviews', status: '3 Sessions', note: 'Behavioral STAR rounds', done: false },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-700">{item.title}</span>
              <p className="text-base font-black text-slate-900">{item.status}</p>
              <p className="text-[11px] text-slate-500">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
