import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  Briefcase,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  RotateCcw,
} from 'lucide-react';
import { BADGES_LIST, CAREER_PATHS } from '../data/mockData';
import { CareerRole, UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateCareer: (career: CareerRole) => void;
  onResetData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateCareer,
  onResetData,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerRole>(user.targetCareer);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateCareer(selectedCareer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#162033] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm sm:text-base">Student Profile & Achievements</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Identity card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-900 font-black text-xl shadow-md">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">{user.name}</h2>
              <p className="text-xs text-slate-600 font-medium">
                {user.college} • {user.branch}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-xs font-bold">
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {user.year} ({user.semester})
                </span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {user.learningStreak} Day Streak
                </span>
              </div>
            </div>
          </div>

          {/* Change Target Career Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Target Career Role
            </label>
            <p className="text-xs text-slate-500">
              Changing your target career updates your 4-year roadmap and skill gap analysis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {CAREER_PATHS.map((c) => {
                const isSelected = selectedCareer === c.name;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCareer(c.name)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{c.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className="text-[10px] text-slate-500 font-normal block mt-0.5">
                      {c.avgPackage}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gamification Badges Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" /> Badges & Milestones
              </span>
              <span className="text-xs font-bold text-amber-600">{user.xp} Total XP</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BADGES_LIST.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between text-left ${
                    badge.unlocked
                      ? 'bg-amber-50/40 border-amber-200/80 text-amber-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div>
                    <span className="text-2xl mb-1 block">{badge.icon}</span>
                    <h5 className="font-extrabold text-xs text-slate-900">{badge.name}</h5>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{badge.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold mt-2 text-slate-600">
                    {badge.unlocked ? 'Unlocked ✓' : 'Locked 🔒'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reset / Data Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onResetData}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Practice State</span>
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
