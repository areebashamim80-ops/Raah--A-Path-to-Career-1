import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download,
  Code2,
  FileText,
  Video,
  Layers,
} from 'lucide-react';
import { RECOMMENDED_PROJECTS } from '../data/mockData';
import { ProjectGuideItem, UserProfile } from '../types';
import { saveProjectProgressToSupabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

interface ProjectsPageProps {
  user: UserProfile;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ user: propUser }) => {
  const { user: ctxUser, recordProjectProgress } = useUser();
  const user = propUser || ctxUser;

  const [selectedProject, setSelectedProject] = useState<ProjectGuideItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStepIdx, setActiveStepIdx] = useState<number>(2); // Step 3: Data Cleaning (in progress)
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1]); // Steps 1 and 2 done

  const categories = ['All', 'Data Science', 'Web Dev', 'AI / ML', 'Cyber Security', 'Cloud'];

  const filteredProjects = RECOMMENDED_PROJECTS.filter((proj) => {
    if (selectedCategory === 'All') return true;
    return proj.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const toggleStepCompleted = (stepIdx: number) => {
    let nextSteps: number[];
    if (completedSteps.includes(stepIdx)) {
      nextSteps = completedSteps.filter((s) => s !== stepIdx);
    } else {
      nextSteps = [...completedSteps, stepIdx];
    }
    setCompletedSteps(nextSteps);

    if (selectedProject) {
      recordProjectProgress(selectedProject.id, nextSteps, selectedProject.title);
    }
  };

  // IF A PROJECT GUIDE IS OPENED: SHOW STEP-BY-STEP PROJECT ROADMAP
  if (selectedProject) {
    const totalSteps = selectedProject.steps.length;
    const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);
    const currentStep = selectedProject.steps[activeStepIdx] || selectedProject.steps[0];

    return (
      <div className="space-y-6 pb-12 animate-in fade-in duration-200">
        {/* Back navigation & Project Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <button
              onClick={() => setSelectedProject(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-[#182238]">
                {selectedProject.title}
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {selectedProject.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{selectedProject.description}</p>
          </div>

          <div className="flex flex-col items-end sm:items-center justify-center bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              Project Progress
            </span>
            <span className="text-2xl font-black text-blue-600 leading-tight">
              {progressPercent}%
            </span>
            <span className="text-[10px] text-slate-400">
              {completedSteps.length} of {totalSteps} Steps Complete
            </span>
          </div>
        </div>

        {/* 9-Step Roadmap Layout: Left Step Navigation (4 cols) | Right Step Details & Checklist (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: 9 STEPS LIST */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs h-fit space-y-1.5">
            <h3 className="font-extrabold text-slate-900 text-sm px-2 pb-2 border-b border-slate-100">
              Implementation Steps
            </h3>

            {selectedProject.steps.map((st, idx) => {
              const isDone = completedSteps.includes(idx);
              const isActive = activeStepIdx === idx;
              return (
                <button
                  key={st.stepNumber}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {st.stepNumber}
                    </span>
                    <span className="truncate">{st.title}</span>
                  </div>

                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* RIGHT: ACTIVE STEP GUIDE & CHECKLIST */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">
                  Step {currentStep.stepNumber} of {totalSteps}
                </span>
                <h3 className="text-xl font-black text-[#182238] mt-1">
                  {currentStep.title}
                </h3>
              </div>

              <button
                onClick={() => toggleStepCompleted(activeStepIdx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  completedSteps.includes(activeStepIdx)
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#182238] hover:bg-blue-700 text-white shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedSteps.includes(activeStepIdx) ? 'Marked Completed' : 'Mark as Complete'}
                </span>
              </button>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Objective:
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Step Checklist:
              </h4>
              <div className="space-y-2">
                {currentStep.checklist.map((item, cIdx) => (
                  <label
                    key={cIdx}
                    className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={completedSteps.includes(activeStepIdx)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs font-medium text-slate-700 leading-snug">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resources */}
            {currentStep.resources && currentStep.resources.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Recommended Documentation & Datasets:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.resources.map((res, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700 hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {res.type === 'video' ? (
                          <Video className="w-4 h-4 text-rose-500" />
                        ) : res.type === 'code' ? (
                          <Code2 className="w-4 h-4 text-blue-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-emerald-600" />
                        )}
                        <span>{res.name}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation between steps */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={activeStepIdx === 0}
                onClick={() => setActiveStepIdx(activeStepIdx - 1)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                disabled={activeStepIdx === totalSteps - 1}
                onClick={() => setActiveStepIdx(activeStepIdx + 1)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: RECOMMENDED PROJECTS GRID MATCHING SCREENSHOT 9
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182238] tracking-tight">
            Recommended Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Build real-world projects and strengthen your portfolio
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Based on target:</span>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {user.targetCareer}
          </span>
        </div>
      </div>

      {/* Filter Chips matching screenshot */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#182238] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid: Beginner, Intermediate, Advanced */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          const isBeginner = proj.difficulty === 'Beginner';
          const isIntermediate = proj.difficulty === 'Intermediate';
          return (
            <div
              key={proj.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      isBeginner
                        ? 'bg-emerald-100 text-emerald-800'
                        : isIntermediate
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    ● {proj.difficulty}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {proj.duration}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {proj.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Tech Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <span>{proj.steps.length} Steps</span>
                    <span>•</span>
                    <span>Guided Checklist</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProject(proj);
                  setActiveStepIdx(0);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Project</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
