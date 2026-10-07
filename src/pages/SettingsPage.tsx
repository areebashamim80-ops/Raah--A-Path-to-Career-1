import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Lock,
  Shield,
  Database,
  CheckCircle2,
  Save,
  Clock,
  Sparkles,
} from 'lucide-react';
import { UserProfile, UserSettings } from '../types';

interface SettingsPageProps {
  user: UserProfile;
  onUpdateSettings: (settings: UserSettings) => void;
  showToast: (msg: string) => void;
  onOpenSupabaseModal?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  onUpdateSettings,
  showToast,
  onOpenSupabaseModal,
}) => {
  const [emailNotifications, setEmailNotifications] = useState(
    user.settings?.emailNotifications ?? true
  );
  const [dailyReminder, setDailyReminder] = useState(
    user.settings?.dailyReminder ?? true
  );
  const [reminderTime, setReminderTime] = useState(
    user.settings?.reminderTime ?? '18:00'
  );
  const [privateProfile, setPrivateProfile] = useState(
    user.settings?.privateProfile ?? false
  );
  const [marketingEmails, setMarketingEmails] = useState(
    user.settings?.marketingEmails ?? false
  );

  // Password change simulation
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      emailNotifications,
      dailyReminder,
      reminderTime,
      privateProfile,
      marketingEmails,
    });
    showToast('Settings saved successfully.');
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password changed successfully.');
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182238] tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Manage your notifications, daily study schedule, and account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* 1. Notifications & Study Reminders */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Notifications & Study Schedule
            </h3>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <label className="flex items-start justify-between gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Daily Study Reminders
                </span>
                <span className="text-[11px] text-slate-500">
                  Receive a prompt to keep your {user.learningStreak}-day streak alive.
                </span>
              </div>
              <input
                type="checkbox"
                checked={dailyReminder}
                onChange={(e) => setDailyReminder(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            {dailyReminder && (
              <div className="pl-4 flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-700">Reminder Time:</span>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                />
              </div>
            )}

            <label className="flex items-start justify-between gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Email Progress Reports
                </span>
                <span className="text-[11px] text-slate-500">
                  Weekly summary of quiz improvements, coding milestones, and readiness gains.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>Save Notification Preferences</span>
              </button>
            </div>
          </form>
        </div>

        {/* 2. Security & Password */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Lock className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Security & Credentials
            </h3>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="pt-1 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>

        {/* 3. Persistent Data Storage & Supabase Integration */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Supabase PostgreSQL Cloud Storage
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Project: zlflicqyymijvhwlpeuj
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Your roadmaps, learning chapters, quizzes, coding problems, projects, career guidance, and AI mentor conversations are connected to Supabase.
                </p>
              </div>
            </div>

            {onOpenSupabaseModal && (
              <button
                type="button"
                onClick={onOpenSupabaseModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
              >
                Manage Supabase Sync & SQL
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">Database</span>
              <strong className="text-emerald-900 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Connected
              </strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Roadmap & Courses</span>
              <strong className="text-slate-800 mt-0.5 block">{user.year} Curated</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Quizzes & Coding</span>
              <strong className="text-slate-800 mt-0.5 block">{user.solvedProblems.length} Problems Solved</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">AI Mentor Chats</span>
              <strong className="text-slate-800 mt-0.5 block">Cloud Logged</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
