import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Building2,
  Calendar,
  Award,
  Flame,
  CheckCircle2,
  Edit3,
  Download,
  ExternalLink,
  BookOpen,
  Code2,
  FolderGit2,
  HelpCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  X,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { CareerReadinessGauge } from '../components/CareerReadinessGauge';
import { UserProfile, CareerRole, StudyTime, CertificateItem, AcademicYear } from '../types';
import { CAREER_PATHS, BADGES_LIST } from '../data/mockData';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateProfile: (updatedData: Partial<UserProfile>) => void;
  onNavigate: (page: string) => void;
  showToast: (msg: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateProfile,
  onNavigate,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'certificates' | 'projects' | 'quizzes' | 'badges'>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone || '+91 98765 43210');
  const [editCollege, setEditCollege] = useState(user.college);
  const [editUniversity, setEditUniversity] = useState(user.university || 'Delhi Technological University');
  const [editBranch, setEditBranch] = useState(user.branch || 'Computer Science & Engineering');
  const [editYear, setEditYear] = useState<AcademicYear>(user.year || '2nd Year');
  const [editSemester, setEditSemester] = useState(user.semester || 'Semester 4');
  const [editTargetCareer, setEditTargetCareer] = useState<CareerRole>(user.targetCareer);
  const [editStudyTime, setEditStudyTime] = useState<StudyTime>(user.dailyStudyTime);
  const [editBio, setEditBio] = useState(user.bio || 'Passionate CSE student building software and preparing for placements.');
  const [editPhotoUrl, setEditPhotoUrl] = useState(user.photoUrl || '');

  // Keep form synchronized when user profile or modal state updates
  React.useEffect(() => {
    setEditName(user.name);
    setEditPhone(user.phone || '+91 98765 43210');
    setEditCollege(user.college);
    setEditUniversity(user.university || 'Delhi Technological University');
    setEditBranch(user.branch || 'Computer Science & Engineering');
    setEditYear(user.year || '2nd Year');
    setEditSemester(user.semester || 'Semester 4');
    setEditTargetCareer(user.targetCareer);
    setEditStudyTime(user.dailyStudyTime);
    setEditBio(user.bio || '');
    setEditPhotoUrl(user.photoUrl || '');
  }, [user, isEditModalOpen]);

  // Avatar presets
  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      phone: editPhone,
      college: editCollege,
      university: editUniversity,
      branch: editBranch,
      year: editYear,
      semester: editSemester,
      targetCareer: editTargetCareer,
      dailyStudyTime: editStudyTime,
      bio: editBio,
      photoUrl: editPhotoUrl,
    });
    setIsEditModalOpen(false);
    showToast('Profile Updated Successfully.');
  };

  const certificates: CertificateItem[] = user.certificates || [
    {
      id: 'cert-1',
      title: 'Year 1 Foundation Honors: Algorithmic Logic in C/C++',
      issueDate: 'May 2025',
      issuer: 'RAAH Engineering Academy',
      credentialId: 'RAAH-2025-CS-8921',
      grade: 'Distinction (94%)',
      skills: ['C/C++', 'Discrete Mathematics', 'Computer Architecture'],
    },
    {
      id: 'cert-2',
      title: 'Python for Data Science & Numerical Computing',
      issueDate: 'August 2025',
      issuer: 'RAAH Technical Council',
      credentialId: 'RAAH-2025-PY-4402',
      grade: 'A+ Grade (91%)',
      skills: ['Python 3', 'NumPy', 'Pandas', 'OOP'],
    },
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* 1. HERO IDENTITY CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        {/* Soft atmospheric gradient banner */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-[#182238] via-[#1f2e4d] to-[#2b3e66]" />

        <div className="relative pt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            {/* Profile Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-3xl sm:text-4xl flex items-center justify-center shadow-xl ring-4 ring-white overflow-hidden">
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{user.name.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute -bottom-1 -right-1 p-2 bg-[#182238] hover:bg-blue-600 text-white rounded-xl shadow-md transition-colors cursor-pointer"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Name & Academic Meta */}
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182238] tracking-tight">
                  {user.name}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {user.year} • {user.semester}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {user.college} {user.university ? `(${user.university})` : ''}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {user.branch} • Target: <strong className="text-blue-700 font-bold">{user.targetCareer}</strong>
              </p>
            </div>
          </div>

          {/* Quick Edit Profile Button */}
          <div className="flex items-center justify-center sm:justify-end gap-2.5">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#182238] hover:text-white text-slate-800 text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Bio paragraph */}
        {user.bio && (
          <p className="mt-5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl pt-4 border-t border-slate-100">
            {user.bio}
          </p>
        )}

        {/* Stat badges row */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Readiness Score
            </span>
            <span className="text-xl font-black text-blue-600">{user.readinessScore}%</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Learning Streak
            </span>
            <span className="text-xl font-black text-amber-600 flex items-center justify-center sm:justify-start gap-1">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              {user.learningStreak} Days
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total XP Earned
            </span>
            <span className="text-xl font-black text-yellow-600 flex items-center justify-center sm:justify-start gap-1">
              <Award className="w-5 h-5 text-yellow-500" />
              {user.xp} XP
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Problems Solved
            </span>
            <span className="text-xl font-black text-emerald-600">
              {user.solvedProblems?.length || 1} Solved
            </span>
          </div>
        </div>
      </div>

      {/* 2. TABBED NAVIGATION */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview & Details', icon: User },
          { id: 'certificates', label: `Certificates (${certificates.length})`, icon: ShieldCheck },
          { id: 'projects', label: `Projects (${user.completedProjects?.length || 1})`, icon: FolderGit2 },
          { id: 'quizzes', label: 'Quiz Performance', icon: HelpCircle },
          { id: 'badges', label: 'Badges & Milestones', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#182238] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB VIEWPORT CONTENT */}
      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Left Column: Personal & Academic Details (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
              Personal & Academic Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {user.email}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Contact Mobile
                </span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {user.phone || '+91 98765 43210'}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  College & Campus
                </span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  {user.college}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Affiliated University
                </span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {user.university || 'Delhi Technological University'}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Academic Progression
                </span>
                <span className="font-bold text-slate-800">
                  {user.year} • {user.semester} ({user.branch})
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Daily Study Commitment
                </span>
                <span className="font-bold text-blue-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {user.dailyStudyTime} / day
                </span>
              </div>
            </div>

            {/* Current Skills list */}
            <div>
              <span className="text-xs font-extrabold text-slate-900 block mb-2">
                Verified Skill Tags:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.currentSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Career Gauge & Quick Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
                Target Role Readiness
              </h3>

              <div className="py-2 flex justify-center">
                <CareerReadinessGauge
                  score={user.readinessScore}
                  career={user.targetCareer}
                  size={140}
                  strokeWidth={12}
                />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed text-center">
                Your progress is synced in real-time. Completing your next SQL and Machine Learning chapters will boost your readiness score.
              </p>

              <button
                onClick={() => onNavigate('roadmap')}
                className="w-full py-3 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue Roadmap Progression</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#182238]">
                  Verified Academic & Industry Certificates
                </h3>
                <p className="text-xs text-slate-500">
                  Earned through semester milestones, course mastery, and verified project evaluations.
                </p>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {certificates.length} Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                        🎓
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {cert.grade || 'Verified Distinction'}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Issued by {cert.issuer} • {cert.issueDate}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono-code text-slate-400">
                      ID: {cert.credentialId}
                    </span>
                    <button
                      onClick={() => showToast(`Certificate ${cert.credentialId} verified on RAAH blockchain ledger.`)}
                      className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base">Completed & Active Projects</h3>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Explore New Projects →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Completed ✓
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Semester 4 Capstone</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Student Performance Prediction</h4>
              <p className="text-xs text-slate-600">
                End-to-end regression model with Pandas, Scikit-Learn, and Streamlit deployment.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-100 cursor-pointer"
                >
                  View Code & Guide
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  In Progress (Step 3/9)
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Semester 5 Specialization</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Customer Churn Prediction</h4>
              <p className="text-xs text-slate-600">
                Telecom churn classification using SQL extraction, XGBoost, and FastAPI backend.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-3 py-1.5 rounded-lg bg-[#182238] text-white font-bold text-xs hover:bg-blue-700 cursor-pointer"
                >
                  Continue Steps
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base">Recorded Quiz Scores</h3>
            <button
              onClick={() => onNavigate('quizzes')}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Take Another Quiz →
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { title: 'DSA Quiz - Arrays', score: 80, date: 'Yesterday', xp: '+20 XP', status: 'Passed' },
              { title: 'Python Fundamentals & Data Structures', score: 90, date: '3 days ago', xp: '+20 XP', status: 'Distinction' },
              { title: 'DBMS Relational Algebra & Normalization', score: 75, date: 'Last week', xp: '+15 XP', status: 'Passed' },
            ].map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900">{q.title}</h4>
                  <span className="text-[10px] text-slate-400">{q.date} • {q.xp}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-800 block">{q.score}%</span>
                  <span className="text-[10px] font-bold text-emerald-600">{q.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: BADGES */}
      {activeTab === 'badges' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 animate-in fade-in">
          <h3 className="font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
            Unlocked Milestones & Badges
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BADGES_LIST.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between text-left ${
                  b.unlocked
                    ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div>
                  <span className="text-3xl mb-1 block">{b.icon}</span>
                  <h5 className="font-extrabold text-xs text-slate-900">{b.name}</h5>
                  <p className="text-[11px] text-slate-500 mt-1">{b.desc}</p>
                </div>
                <span className="text-[10px] font-bold mt-3 text-slate-600">
                  {b.unlocked ? 'Unlocked ✓' : 'Locked 🔒'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#162033] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm sm:text-base">Edit User Profile</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Photo Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    {editPhotoUrl ? (
                      <img src={editPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">
                        Default
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="url"
                      value={editPhotoUrl}
                      onChange={(e) => setEditPhotoUrl(e.target.value)}
                      placeholder="Paste Image URL or pick preset below"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                    />
                    <div className="flex items-center gap-2 pt-1">
                      {avatarPresets.map((url, uIdx) => (
                        <img
                          key={uIdx}
                          src={url}
                          alt="Preset"
                          onClick={() => setEditPhotoUrl(url)}
                          className="w-7 h-7 rounded-lg object-cover cursor-pointer ring-1 ring-slate-200 hover:ring-2 hover:ring-blue-600 transition-all"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* College & University */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    College / Campus
                  </label>
                  <input
                    type="text"
                    required
                    value={editCollege}
                    onChange={(e) => setEditCollege(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Affiliated University
                  </label>
                  <input
                    type="text"
                    value={editUniversity}
                    onChange={(e) => setEditUniversity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Branch, Current Year & Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Branch / Dept
                  </label>
                  <input
                    type="text"
                    required
                    value={editBranch}
                    onChange={(e) => setEditBranch(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Year
                  </label>
                  <select
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value as AcademicYear)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Semester
                  </label>
                  <select
                    value={editSemester}
                    onChange={(e) => setEditSemester(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={`Semester ${sem}`}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Career & Daily Study Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Career Goal
                  </label>
                  <select
                    value={editTargetCareer}
                    onChange={(e) => setEditTargetCareer(e.target.value as CareerRole)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-700"
                  >
                    {CAREER_PATHS.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Daily Study Time
                  </label>
                  <select
                    value={editStudyTime}
                    onChange={(e) => setEditStudyTime(e.target.value as StudyTime)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                    <option value="3+ hours">3+ hours</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bio / Statement
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 resize-none"
                  placeholder="Share a short bio about your engineering focus..."
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
