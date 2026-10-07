import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Clock,
  Code2,
  BookOpen,
  Target,
  X,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { CAREER_PATHS } from '../data/mockData';
import { AcademicYear, CareerRole, StudyTime, UserProfile } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: Partial<UserProfile>) => void;
  initialCareer?: CareerRole;
  currentUser?: UserProfile;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialCareer = 'Data Scientist',
  currentUser,
}) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [college, setCollege] = useState(currentUser?.college || '');
  const [branch, setBranch] = useState(currentUser?.branch || 'Computer Science & Engineering');
  const [year, setYear] = useState<AcademicYear>(currentUser?.year || '2nd Year');
  const [semester, setSemester] = useState(currentUser?.semester || 'Semester 3');
  const [targetCareer, setTargetCareer] = useState<CareerRole>(currentUser?.targetCareer || initialCareer);
  const [dailyStudyTime, setDailyStudyTime] = useState<StudyTime>(currentUser?.dailyStudyTime || '2 hours');
  const [currentSkills, setCurrentSkills] = useState<string[]>(
    currentUser?.currentSkills?.length ? currentUser.currentSkills : ['Python', 'DSA', 'SQL', 'DBMS']
  );
  const [interests, setInterests] = useState<string[]>(
    currentUser?.interests?.length ? currentUser.interests : ['Data Science', 'AI / ML', 'Web Development']
  );

  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setName(currentUser.name);
      if (currentUser.college) setCollege(currentUser.college);
      if (currentUser.branch) setBranch(currentUser.branch);
      if (currentUser.year) setYear(currentUser.year);
      if (currentUser.semester) setSemester(currentUser.semester);
      if (currentUser.targetCareer) setTargetCareer(currentUser.targetCareer);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    if (currentSkills.includes(skill)) {
      setCurrentSkills(currentSkills.filter((s) => s !== skill));
    } else {
      setCurrentSkills([...currentSkills, skill]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      name,
      college,
      branch,
      year,
      semester,
      targetCareer,
      currentSkills,
      interests,
      dailyStudyTime,
    });
  };

  const allSkillsList = [
    'Python',
    'C++',
    'Java',
    'DSA',
    'SQL',
    'HTML/CSS',
    'JavaScript',
    'Git',
    'React',
    'DBMS',
    'Machine Learning',
  ];

  const allInterestsList = [
    'Data Science',
    'AI / ML',
    'Web Development',
    'Cyber Security',
    'Cloud',
    'Mobile Apps',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Top Header bar with Logo and close */}
        <div className="px-6 py-4 bg-[#162033] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="horizontal" theme="dark" showTagline={false} />
            <span className="text-slate-400 text-xs hidden sm:inline">|</span>
            <span className="text-xs text-amber-400 font-semibold hidden sm:inline">
              Student Career Onboarding
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Main Form: 7 cols */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#182238] tracking-tight">
                Let's Build Your Personalized Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us about yourself so we can create the best plan for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College / University
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. NIT Delhi"
                  />
                </div>
              </div>

              {/* Branch & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option>Computer Science & Engineering</option>
                    <option>Information Technology</option>
                    <option>AI & Data Science (CSE)</option>
                    <option>Electronics & Communication</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value as AcademicYear)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>

              {/* Target Career Goal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Career Role
                </label>
                <select
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value as CareerRole)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {CAREER_PATHS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.avgPackage})
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Skills (Tags from reference image) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Current Skills (Select what you know)
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {currentSkills.length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allSkillsList.map((skill) => {
                    const isSelected = currentSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#182238] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Daily Study Time & Interests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Daily Study Time
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['30 minutes', '1 hour', '2 hours', '3+ hours'] as StudyTime[]).map(
                      (time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setDailyStudyTime(time)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                            dailyStudyTime === time
                              ? 'bg-blue-600 text-white font-bold shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Interests (Optional)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {allInterestsList.slice(0, 5).map((interest) => {
                      const isSelected = interests.includes(interest);
                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-slate-900 font-bold'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Submit Button matching reference image */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Generate My Roadmap</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Card from Reference Screenshot: 5 cols */}
          <div className="lg:col-span-4 bg-slate-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Compass Icon illustration */}
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center">
                <Compass className="w-7 h-7 animate-spin-slow" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#182238] leading-tight">
                  Your Personalized 4-Year Journey Awaits!
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Based on your inputs, RAAH constructs a tailored semester progression.
                </p>
              </div>

              {/* Checklist from reference screenshot */}
              <div className="space-y-3">
                {[
                  'Learn in the right order',
                  'Build real projects',
                  'Practice with quizzes',
                  'Get career guidance',
                  'Become job-ready',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote / Subtext */}
            <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 italic">
              “Every successful CSE career starts with a deliberate roadmap.”
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
