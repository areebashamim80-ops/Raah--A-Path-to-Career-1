/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { OnboardingModal } from './pages/OnboardingModal';
import { SkillAssessment } from './pages/SkillAssessment';
import { Dashboard } from './pages/Dashboard';
import { RoadmapPage } from './pages/RoadmapPage';
import { CourseLearningPage } from './pages/CourseLearningPage';
import { QuizPage } from './pages/QuizPage';
import { CodingPracticePage } from './pages/CodingPracticePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CareerGuidancePage } from './pages/CareerGuidancePage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { RaahAI } from './components/RaahAI';
import { SupabaseSyncModal } from './components/SupabaseSyncModal';
import {
  LoginPage,
  SignUpPage,
  ForgotPasswordPage,
  LogoutModal,
  LoginRequiredModal,
} from './pages/AuthPages';
import { USER_SKILLS } from './data/mockData';
import { UserProfile, CareerRole, SkillItem } from './types';
import { CheckCircle2 } from 'lucide-react';
import { UserProvider, useUser } from './context/UserContext';

function AppContent() {
  // Global user state management from UserContext
  const {
    user,
    isAuthenticated,
    login,
    signUp,
    logout,
    updateProfile,
    updateSettings,
    addXP,
    recordQuizScore,
    solveProblem,
  } = useUser();

  const [skills, setSkills] = useState<SkillItem[]>(USER_SKILLS);

  // Active Navigation Page
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Modals & UI State
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [initialCareerChoice, setInitialCareerChoice] = useState<CareerRole>('Data Scientist');
  const [externalAIPrompt, setExternalAIPrompt] = useState<string | null>(null);

  // Floating Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Protected pages list
  const protectedPages = [
    'dashboard',
    'learning',
    'quizzes',
    'coding',
    'projects',
    'career',
    'assessment',
    'profile',
    'settings',
  ];

  // Safe navigation handler
  const handleNavigate = (page: string) => {
    // If navigating to a protected page while logged out
    if (!isAuthenticated && protectedPages.includes(page)) {
      setIsLoginRequiredOpen(true);
      return;
    }

    // Scroll to landing page sections if on public landing
    if (page === 'home' || page === 'careers' || page === 'how-it-works' || page === 'features') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const sectionMap: Record<string, string> = {
            home: 'hero',
            careers: 'careers',
            'how-it-works': 'how-it-works',
            features: 'features',
          };
          const elementId = sectionMap[page];
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        const sectionMap: Record<string, string> = {
          home: 'hero',
          careers: 'careers',
          'how-it-works': 'how-it-works',
          features: 'features',
        };
        const elementId = sectionMap[page];
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handlers: Login
  const handleLoginSuccess = (userData: Partial<UserProfile>) => {
    const loggedInUser = login(userData);
    setCurrentPage('dashboard');
    showToast(`Welcome back, ${loggedInUser.name}!`);
  };

  // Auth Handlers: Registration
  const handleSignUpSuccess = (newUserData: Partial<UserProfile>) => {
    const freshUser = signUp(newUserData);
    setCurrentPage('dashboard');
    showToast(`Welcome to RAAH, ${freshUser.name}! Your career journey has begun.`);
  };

  // Auth Handlers: Logout
  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
    setCurrentPage('home');
    showToast('You have been logged out successfully.');
  };

  // Onboarding completion
  const handleOnboardingComplete = (updatedData: Partial<UserProfile>) => {
    updateProfile(updatedData);
    setIsOnboardingOpen(false);
    setCurrentPage('assessment');
  };

  // Assessment completion
  const handleFinishAssessment = (updatedSkills: SkillItem[], score: number) => {
    setSkills(updatedSkills);
    updateProfile({ readinessScore: score });
    addXP(50);
  };

  // Determine if we should show the sidebar for dashboard tools
  const isDashboardView =
    isAuthenticated &&
    ['dashboard', 'learning', 'quizzes', 'coding', 'projects', 'career', 'profile', 'settings'].includes(
      currentPage
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-amber-100 selection:text-amber-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. TOP NAVBAR */}
      <Navbar
        currentPage={currentPage}
        isLoggedIn={isAuthenticated}
        user={user}
        onNavigate={handleNavigate}
        onOpenLogin={() => setCurrentPage('login')}
        onOpenSignUp={() => setCurrentPage('signup')}
        onOpenProfile={() => handleNavigate('profile')}
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* 2. FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#182238] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex min-w-0">
        {/* Workspace Sidebar - Live synchronized with user profile */}
        {isDashboardView && (
          <Sidebar
            currentTab={
              currentPage === 'profile'
                ? 'profile'
                : currentPage === 'settings'
                ? 'settings'
                : (currentPage as NavTab)
            }
            onSelectTab={(tab) => {
              if (tab === 'settings') {
                handleNavigate('settings');
              } else if (tab === 'profile') {
                handleNavigate('profile');
              } else {
                handleNavigate(tab);
              }
            }}
            onGoHome={() => handleNavigate('home')}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            user={user}
            onOpenProfile={() => handleNavigate('profile')}
            onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
            onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          />
        )}

        {/* Page Viewport */}
        <div className={`flex-1 flex flex-col min-w-0 ${isDashboardView ? 'lg:pl-64' : ''}`}>
          {/* A. AUTH PAGES */}
          {currentPage === 'login' && (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onGoToSignUp={() => setCurrentPage('signup')}
              onGoToForgotPassword={() => setCurrentPage('forgot-password')}
              onGoHome={() => setCurrentPage('home')}
            />
          )}

          {currentPage === 'signup' && (
            <SignUpPage
              onSignUpSuccess={handleSignUpSuccess}
              onGoToLogin={() => setCurrentPage('login')}
              onGoHome={() => setCurrentPage('home')}
            />
          )}

          {currentPage === 'forgot-password' && (
            <ForgotPasswordPage onGoToLogin={() => setCurrentPage('login')} />
          )}

          {/* B. LANDING PAGE */}
          {currentPage === 'home' && (
            <LandingPage
              onStartOnboarding={() => {
                if (!isAuthenticated) {
                  setCurrentPage('signup');
                } else {
                  setIsOnboardingOpen(true);
                }
              }}
              onExploreCareers={() => handleNavigate('careers')}
              onExploreRoadmap={() => handleNavigate('roadmap')}
              onSelectCareer={(career) => {
                setInitialCareerChoice(career);
                if (!isAuthenticated) {
                  setCurrentPage('signup');
                } else {
                  updateProfile({ targetCareer: career });
                  setIsOnboardingOpen(true);
                }
              }}
            />
          )}

          {/* C. 4-YEAR ROADMAP */}
          {currentPage === 'roadmap' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <RoadmapPage
                user={user}
                isLoggedIn={isAuthenticated}
                onRequireLogin={() => setIsLoginRequiredOpen(true)}
                onGoToLearning={() => handleNavigate('learning')}
                onGoToQuiz={() => handleNavigate('quizzes')}
                onGoToCoding={() => handleNavigate('coding')}
              />
            </div>
          )}

          {/* D. SKILL ASSESSMENT */}
          {currentPage === 'assessment' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <SkillAssessment
                user={user}
                onFinishAnalysis={handleFinishAssessment}
                onGoToLearning={() => handleNavigate('learning')}
              />
            </div>
          )}

          {/* E. DASHBOARD & LEARNING WORKSPACE */}
          {currentPage === 'dashboard' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <Dashboard
                user={user}
                skills={skills}
                onNavigateTab={handleNavigate}
                onOpenProfile={() => handleNavigate('profile')}
              />
            </div>
          )}

          {currentPage === 'learning' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <CourseLearningPage
                user={user}
                onGoToQuiz={() => handleNavigate('quizzes')}
                onGoToCoding={() => handleNavigate('coding')}
                onChapterCompleted={(chapterTitle) => {
                  showToast(`Completed ${chapterTitle}! +15 XP saved to Supabase ⚡`);
                }}
              />
            </div>
          )}

          {currentPage === 'quizzes' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <QuizPage
                user={user}
                onUpdateScore={(qId, score) => {
                  recordQuizScore(qId, score);
                  showToast(`Quiz completed (${score}%)! +20 XP saved to Supabase 🏆`);
                }}
                onGoToRoadmap={() => handleNavigate('roadmap')}
              />
            </div>
          )}

          {currentPage === 'coding' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <CodingPracticePage
                user={user}
                onProblemSolved={(probId, submittedCode, lang) => {
                  solveProblem(probId, submittedCode, lang);
                  showToast('Problem accepted! +25 XP earned & saved to Supabase 🔥');
                }}
                onAskAI={(prompt) => setExternalAIPrompt(prompt)}
              />
            </div>
          )}

          {currentPage === 'projects' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <ProjectsPage user={user} />
            </div>
          )}

          {currentPage === 'career' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <CareerGuidancePage
                user={user}
                onGoToLearning={() => handleNavigate('learning')}
                onGoToProjects={() => handleNavigate('projects')}
              />
            </div>
          )}

          {/* F. DEDICATED USER PROFILE PAGE */}
          {currentPage === 'profile' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <ProfilePage
                user={user}
                onUpdateProfile={(updatedData) => updateProfile(updatedData)}
                onNavigate={handleNavigate}
                showToast={showToast}
              />
            </div>
          )}

          {/* G. DEDICATED SETTINGS PAGE */}
          {currentPage === 'settings' && (
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <SettingsPage
                user={user}
                onUpdateSettings={(settings) => updateSettings(settings)}
                showToast={showToast}
                onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. RAAH AI - FLOATING ASSISTANT ON EVERY PAGE */}
      <RaahAI
        user={user}
        skills={skills}
        onNavigate={handleNavigate}
        externalPrompt={externalAIPrompt}
        onClearExternalPrompt={() => setExternalAIPrompt(null)}
      />

      {/* 5. MODALS & DIALOGS */}
      {/* Supabase Cloud Database Status & SQL Setup Modal */}
      <SupabaseSyncModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        showToast={showToast}
      />

      {/* Student Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
        initialCareer={initialCareerChoice}
        currentUser={user}
      />

      {/* Logout Confirmation Dialog */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Login Required Modal for Protected Pages */}
      <LoginRequiredModal
        isOpen={isLoginRequiredOpen}
        onClose={() => setIsLoginRequiredOpen(false)}
        onGoToLogin={() => {
          setIsLoginRequiredOpen(false);
          setCurrentPage('login');
        }}
        onGoToSignUp={() => {
          setIsLoginRequiredOpen(false);
          setCurrentPage('signup');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
