import React from 'react';
import {
  Compass,
  Sparkles,
  Code2,
  FolderGit2,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { CAREER_PATHS, ROADMAP_YEARS } from '../data/mockData';
import { CareerRole } from '../types';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExploreCareers: () => void;
  onExploreRoadmap: () => void;
  onSelectCareer: (career: CareerRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onExploreCareers,
  onExploreRoadmap,
  onSelectCareer,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Soft atmospheric gradient background */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 -ml-40 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Copy & Actions */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>Designed Exclusively for B.Tech CSE Students</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#182238] tracking-tight leading-[1.12]">
                Your 4-Year <br className="hidden sm:inline" />
                <span className="text-blue-600">CSE Journey,</span> <br />
                Planned for Success
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Personalized roadmap, skill development, quizzes, coding practice, projects and career guidance — all in one place.
              </p>

              {/* Feature Pills from reference image */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                {[
                  { label: '4-Year Roadmap', icon: Compass },
                  { label: 'AI Recommendations', icon: Sparkles },
                  { label: 'Coding Practice', icon: Code2 },
                  { label: 'Project Guidance', icon: FolderGit2 },
                  { label: 'Career Guidance', icon: Briefcase },
                ].map((pill, idx) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      <span>{pill.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onStartOnboarding}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#182238] hover:bg-[#233355] text-white font-bold text-sm shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onExploreCareers}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Careers</span>
                </button>
              </div>

              {/* Quick stats counter */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-center lg:justify-start gap-8 text-left">
                <div>
                  <p className="text-xl font-extrabold text-[#182238]">4 Years</p>
                  <p className="text-xs text-slate-500 font-medium">Semester-by-Semester</p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <p className="text-xl font-extrabold text-[#182238]">8 Roles</p>
                  <p className="text-xs text-slate-500 font-medium">Industry Specializations</p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <p className="text-xl font-extrabold text-emerald-600">100% Free</p>
                  <p className="text-xs text-slate-500 font-medium">For Indian CSE Students</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual from Reference Screenshot */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Outer decorative card frame */}
              <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/80">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-slate-600 ml-2">RAAH Journey Engine</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    B.Tech CSE
                  </span>
                </div>

                {/* Illustrated Journey Visual */}
                <div className="py-6 flex flex-col items-center text-center relative">
                  {/* Floating Hand-Drawn Style Badges */}
                  <div className="absolute top-2 left-2 bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-1 text-[11px] font-extrabold text-amber-800 shadow-xs rotate-[-6deg]">
                    ✨ Learn • Build • Grow
                  </div>

                  {/* Stylized Student Avatar Graphic */}
                  <div className="relative w-36 h-36 my-2 flex items-center justify-center">
                    {/* Glowing background ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 via-amber-500/20 to-indigo-500/20 animate-pulse" />
                    {/* Big RAAH Icon Emblem */}
                    <div className="relative p-3 bg-white rounded-full shadow-lg border border-slate-100">
                      <Logo size="lg" variant="icon-only" />
                    </div>
                  </div>

                  {/* 4-Year Milestone Path Strip */}
                  <div className="w-full mt-4 bg-slate-50 rounded-2xl p-3 border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Your 4-Year Path
                    </p>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-1.5">
                        <span className="text-[10px] font-bold text-emerald-700 block">Yr 1</span>
                        <span className="text-[9px] text-emerald-600">Foundation</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5">
                        <span className="text-[10px] font-bold text-blue-700 block">Yr 2</span>
                        <span className="text-[9px] text-blue-600">Core CS</span>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-1.5">
                        <span className="text-[10px] font-bold text-purple-700 block">Yr 3</span>
                        <span className="text-[9px] text-purple-600">Specialized</span>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-1.5">
                        <span className="text-[10px] font-bold text-amber-700 block">Yr 4</span>
                        <span className="text-[9px] text-amber-600">Placement</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action preview pills */}
                  <div className="w-full mt-4 flex items-center justify-between text-xs font-semibold px-2">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Code2 className="w-3.5 h-3.5 text-blue-500" /> 100+ Problems
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <FolderGit2 className="w-3.5 h-3.5 text-purple-500" /> Real Projects
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Briefcase className="w-3.5 h-3.5 text-amber-500" /> Job Ready
                    </span>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={onStartOnboarding}
                  className="w-full mt-2 py-3 bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build My Personalized Plan</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (5 Steps from Prompt) */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Clear 5-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182238] mt-3">
              How RAAH Guides You
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              From your first day in college to receiving your dream placement offer letter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Know Yourself',
                icon: GraduationCap,
                desc: 'Input your college year, branch, current programming skills and daily available time.',
              },
              {
                step: '02',
                title: 'Choose Career',
                icon: Briefcase,
                desc: 'Select from 8 high-growth tech roles like Data Scientist, Software Developer, or AI/ML Engineer.',
              },
              {
                step: '03',
                title: 'Build Your Skills',
                icon: BookOpen,
                desc: 'Follow an interactive semester-by-semester syllabus curated specifically for your goal.',
              },
              {
                step: '04',
                title: 'Practice & Projects',
                icon: Code2,
                desc: 'Solve curated coding problems and build 9-step guided capstone industry projects.',
              },
              {
                step: '05',
                title: 'Become Career Ready',
                icon: TrendingUp,
                desc: 'Track your real-time Career Readiness score, revise DSA blitz, and ace placement interviews.',
              },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-slate-300 group-hover:text-amber-500 transition-colors">
                        {s.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Explore step</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-YEAR ROADMAP HIGHLIGHT SECTION */}
      <section id="roadmap" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Core Feature
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182238] mt-3">
                The 4-Year B.Tech Roadmap
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
                No more confusion about what to study in which semester. Clear milestones from first year C programming to final year placement.
              </p>
            </div>
            <button
              onClick={onExploreRoadmap}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <span>View Full Interactive Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Years Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROADMAP_YEARS.map((yr) => (
              <div
                key={yr.yearNumber}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
                      YEAR {yr.yearNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Sem {yr.yearNumber * 2 - 1} & {yr.yearNumber * 2}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{yr.yearName}</h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{yr.tagline}</p>

                  <div className="space-y-2 mb-4">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Key Subjects:
                    </p>
                    {yr.semesters[0].topics.slice(0, 3).map((topic) => (
                      <div key={topic.id} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{topic.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-500">Completion</span>
                    <span className="font-bold text-slate-800">{yr.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 CAREER PATHS SECTION */}
      <section id="careers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Industry Ready Roles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182238] mt-3">
              Explore 8 Core Career Paths
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Each path features curated skills, real job packages, semester roadmaps, and interview preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_PATHS.map((career) => (
              <div
                key={career.id}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {career.difficulty}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700">
                      {career.avgPackage}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                    {career.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {career.shortDesc}
                  </p>

                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Must-have skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectCareer(career.name);
                    onStartOnboarding();
                  }}
                  className="w-full mt-2 py-2.5 px-3 bg-white group-hover:bg-[#182238] group-hover:text-white text-slate-800 text-xs font-bold rounded-xl border border-slate-300 group-hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Select Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES GRID */}
      <section id="features" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Complete EdTech Toolkit
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182238] mt-3">
              Everything You Need to Succeed
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              RAAH replaces chaotic YouTube playlists and random advice with a guided, verified path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Embedded Coding Arena</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practice LeetCode-style algorithms with Python, C++, Java, and JavaScript right inside your browser with automated test cases.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">9-Step Project Guides</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step guidance from problem definition to dataset preprocessing, modeling, API creation, and public deployment on GitHub.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Career Readiness Score</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Know where you stand at any given semester. Our recommendation engine identifies skill gaps and gives you the exact next priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 bg-[#182238] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Logo size="lg" variant="horizontal" theme="dark" showTagline={true} className="justify-center mb-6" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Start Your Path to a High-Paying Tech Career
          </h2>
          <p className="text-slate-300 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Join thousands of B.Tech CSE students who are turning random studying into a structured 4-year success roadmap.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-all transform active:scale-95 cursor-pointer"
            >
              Get Started Now — It's Free
            </button>
            <button
              onClick={onExploreRoadmap}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all cursor-pointer"
            >
              View 4-Year Curriculum
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER matching reference image */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="horizontal" theme="light" showTagline={false} />
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-medium">Your Path to Career</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
            <span>Learn</span>
            <span className="text-slate-300">•</span>
            <span>Practice</span>
            <span className="text-slate-300">•</span>
            <span>Build</span>
            <span className="text-slate-300">•</span>
            <span>Grow</span>
          </div>

          <div className="text-xs text-slate-500 font-medium italic">
            “Because Your Future Deserves a Plan”
          </div>
        </div>
      </footer>
    </div>
  );
};
