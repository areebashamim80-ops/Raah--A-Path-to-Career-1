import React from 'react';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  HelpCircle,
  Code2,
  FolderGit2,
  Briefcase,
  Settings,
  LogOut,
  ChevronRight,
  Flame,
  Award,
  User as UserIcon,
  Database,
} from 'lucide-react';
import { Logo } from './Logo';
import { UserProfile } from '../types';
import { useUser } from '../context/UserContext';

export type NavTab = 
  | 'dashboard'
  | 'roadmap'
  | 'learning'
  | 'quizzes'
  | 'coding'
  | 'projects'
  | 'career'
  | 'profile'
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onGoHome: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  user?: UserProfile;
  onOpenProfile?: () => void;
  onOpenLogoutModal?: () => void;
  onOpenSupabaseModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onGoHome,
  isOpenMobile,
  onCloseMobile,
  user: propUser,
  onOpenProfile,
  onOpenLogoutModal,
  onOpenSupabaseModal,
}) => {
  // Use user from global UserContext, fallback to propUser if provided
  const { user: contextUser } = useUser();
  const activeUser = propUser || contextUser;

  // Extract initials dynamically from any user name (never hardcoded)
  const getInitials = (fullName: string): string => {
    if (!fullName || !fullName.trim()) return 'U';
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  // Format academic year string (e.g. "B.Tech CSE - 2nd Year")
  const formatBranchYear = (branchName?: string, yearName?: string): string => {
    const b = branchName || 'Computer Science & Engineering';
    const isCSE =
      b.toLowerCase().includes('computer science') ||
      b.toLowerCase().includes('cse') ||
      b.toLowerCase().includes('cs');
    const branchCode = isCSE
      ? 'CSE'
      : b.length > 12
      ? b
          .split(' ')
          .map((w) => w[0])
          .join('')
      : b;
    const y = yearName || '2nd Year';
    return `B.Tech ${branchCode} - ${y}`;
  };

  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'roadmap',
      label: 'My Roadmap',
      icon: Compass,
      badge: activeUser.year || '2nd Year',
    },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'coding', label: 'Coding Practice', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'career', label: 'Career Guidance', icon: Briefcase },
    { id: 'profile', label: 'My Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#162033] text-slate-200 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div onClick={onGoHome} className="cursor-pointer">
            <Logo size="sm" variant="horizontal" theme="dark" showTagline={true} />
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/90 text-white shadow-md shadow-blue-900/40 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge ? (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight className="w-4 h-4 text-white/70" />
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Supabase Database Connection Pill */}
        {onOpenSupabaseModal && (
          <div className="px-3 pt-2">
            <button
              onClick={() => {
                onOpenSupabaseModal();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-emerald-950/40 border border-slate-700/70 hover:border-emerald-500/50 text-xs font-semibold text-slate-300 hover:text-emerald-300 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px]">Supabase DB</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </button>
          </div>
        )}

        {/* Live Synchronized User Profile in Sidebar */}
        <div
          onClick={() => {
            if (onOpenProfile) {
              onOpenProfile();
            } else {
              onSelectTab('profile');
            }
            onCloseMobile();
          }}
          className="p-3 m-3 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer group"
          title="Click to view or edit profile"
        >
          <div className="flex items-center gap-3">
            {/* Profile Picture */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-900 font-extrabold text-xs shadow-md overflow-hidden ring-2 ring-amber-400/30 group-hover:ring-amber-400 transition-all">
                {activeUser.photoUrl ? (
                  <img
                    src={activeUser.photoUrl}
                    alt={activeUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{getInitials(activeUser.name)}</span>
                )}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#162033] rounded-full" />
            </div>

            {/* User Information */}
            <div className="flex-1 min-w-0">
              {/* Full Name */}
              <h5 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                {activeUser.name}
              </h5>
              {/* Target Career */}
              <p className="text-[11px] font-semibold text-amber-400 truncate mt-0.5">
                {activeUser.targetCareer}
              </p>
              {/* Current Year */}
              <p className="text-[10px] text-slate-400 truncate">
                {formatBranchYear(activeUser.branch, activeUser.year)}
              </p>
            </div>
          </div>

          {/* Gamification Streak & XP */}
          <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{activeUser.learningStreak} Days</span>
            </span>
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>{activeUser.xp} XP</span>
            </span>
          </div>
        </div>

        {/* Exit & Logout actions */}
        <div className="px-3 pb-4 space-y-1">
          {onOpenLogoutModal && (
            <button
              onClick={onOpenLogoutModal}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-rose-300 hover:text-white rounded-lg hover:bg-rose-900/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Log Out</span>
            </button>
          )}

          <button
            onClick={onGoHome}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            <span>Return to Landing</span>
          </button>
        </div>
      </aside>
    </>
  );
};
