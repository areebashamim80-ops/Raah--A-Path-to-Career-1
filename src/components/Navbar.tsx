import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  LayoutDashboard,
  Compass,
  Settings,
  LogOut,
  Flame,
  Award,
  Sparkles,
  Database,
  ArrowRight,
} from 'lucide-react';
import { Logo } from './Logo';
import { NOTIFICATIONS_LIST } from '../data/mockData';
import { UserProfile } from '../types';

export type NavPage =
  | 'home'
  | 'roadmap'
  | 'careers'
  | 'how-it-works'
  | 'features'
  | 'dashboard'
  | 'learning'
  | 'quizzes'
  | 'coding'
  | 'projects'
  | 'career';

interface NavbarProps {
  currentPage: string;
  isLoggedIn: boolean;
  user: UserProfile;
  onNavigate: (page: string) => void;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onOpenProfile: () => void;
  onOpenLogoutModal: () => void;
  onOpenSupabaseModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  isLoggedIn,
  user,
  onNavigate,
  onOpenLogin,
  onOpenSignUp,
  onOpenProfile,
  onOpenLogoutModal,
  onOpenSupabaseModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'roadmap', label: '4-Year Roadmap' },
    { id: 'careers', label: 'Careers' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'features', label: 'Features' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'R';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer shrink-0 transition-transform hover:opacity-95"
        >
          <Logo size="md" variant="horizontal" theme="light" showTagline={true} />
        </div>

        {/* Center: Desktop Navigation BUTTONS (Section 31 & 34) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/70">
          {navLinks.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'roadmap' && currentPage === 'roadmap') ||
              (item.id === 'home' && currentPage === 'home');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#182238] text-white shadow-sm shadow-slate-900/20 transform scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Logged-in vs Logged-out) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Supabase Cloud DB Status Button (Always accessible) */}
          {onOpenSupabaseModal && (
            <button
              onClick={onOpenSupabaseModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-bold transition-all cursor-pointer shadow-2xs group"
              title="Supabase Cloud Database Status (zlflicqyymijvhwlpeuj)"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline text-[11px]">Supabase DB</span>
            </button>
          )}

          {!isLoggedIn ? (
            /* Logged-out state: [ Login ] [ Get Started ] */
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenLogin}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 hover:border-slate-400 shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                Login
              </button>
              <button
                onClick={onOpenSignUp}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#182238] hover:bg-[#253556] shadow-md shadow-slate-900/15 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>Get Started</span>
                <span className="text-amber-400">→</span>
              </button>
            </div>
          ) : (
            /* Logged-in state: Dashboard shortcut, Streaks, Notifications, Profile Dropdown */
            <div className="flex items-center gap-2.5">
              {/* Quick Jump to Dashboard if not currently there */}
              {currentPage !== 'dashboard' && (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>My Dashboard</span>
                </button>
              )}

              {/* Learning Streak Pill */}
              <div className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span>{user.learningStreak}d</span>
              </div>

              {/* Notification Bell Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsUserDropdownOpen(false);
                    if (!isNotificationsOpen) setUnreadCount(0);
                  }}
                  className="relative p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  aria-label="View notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-800">Notifications</h4>
                        <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                          {NOTIFICATIONS_LIST.length}
                        </span>
                      </div>
                      <button
                        onClick={() => setUnreadCount(0)}
                        className="text-xs text-blue-600 hover:underline cursor-pointer"
                      >
                        Mark read
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                      {NOTIFICATIONS_LIST.map((n) => (
                        <div key={n.id} className="py-2.5 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                          <p className="text-xs font-bold text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Button with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-900 font-extrabold text-xs flex items-center justify-center shadow-2xs overflow-hidden">
                    {user.photoUrl ? (
                      <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      userInitial
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate hidden md:inline">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-2 animate-in fade-in duration-150">
                    <div className="p-3 border-b border-slate-100 mb-1">
                      <p className="text-xs font-extrabold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {user.targetCareer}
                      </span>
                    </div>

                    <div className="space-y-0.5 text-xs font-medium text-slate-700">
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onNavigate('profile');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2.5 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onNavigate('dashboard');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-blue-600" />
                        <span>Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          if (onOpenSupabaseModal) onOpenSupabaseModal();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-emerald-800"
                      >
                        <Database className="w-4 h-4 text-emerald-600" />
                        <span>Supabase Database (Live)</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onNavigate('settings');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-500" />
                        <span>Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onNavigate('profile');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Certificates</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onNavigate('projects');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-purple-600" />
                        <span>My Projects</span>
                      </button>

                      <div className="pt-1 mt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            onOpenLogoutModal();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-bold flex items-center gap-2.5 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-600" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button (Section 33) */}
        <div className="lg:hidden flex items-center gap-2">
          {isLoggedIn && (
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 font-bold text-xs flex items-center justify-center">
              {userInitial}
            </div>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER (Section 33) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#182238] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {onOpenSupabaseModal && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSupabaseModal();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-emerald-900 text-xs font-bold cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Supabase Cloud Database</span>
                </div>
                <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-mono">
                  Connected
                </span>
              </button>
            )}

            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSignUp();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#182238] text-white font-bold text-xs hover:bg-blue-700 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Profile & Achievements</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenLogoutModal();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
