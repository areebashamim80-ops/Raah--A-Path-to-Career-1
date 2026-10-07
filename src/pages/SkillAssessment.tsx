import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Brain,
  Award,
} from 'lucide-react';
import { CareerReadinessGauge } from '../components/CareerReadinessGauge';
import { Logo } from '../components/Logo';
import { USER_SKILLS } from '../data/mockData';
import { CareerRole, SkillItem, UserProfile } from '../types';

interface SkillAssessmentProps {
  user: UserProfile;
  onFinishAnalysis: (updatedSkills: SkillItem[], readinessScore: number) => void;
  onGoToLearning: () => void;
}

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    category: 'Programming & Python',
    question: 'In Python, what is the time complexity of looking up a key in a built-in dictionary with N items on average?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correct: 0,
    skill: 'python',
  },
  {
    id: 2,
    category: 'Database & SQL',
    question: 'Which SQL clause is executed FIRST in the logical query processing order?',
    options: ['SELECT', 'WHERE', 'FROM', 'GROUP BY'],
    correct: 2,
    skill: 'sql',
  },
  {
    id: 3,
    category: 'Statistics & Math',
    question: 'In statistical hypothesis testing, what does a p-value less than 0.05 typically signify?',
    options: [
      'Reject the null hypothesis (statistically significant)',
      'Accept the null hypothesis with 95% certainty',
      'The sample variance is exactly zero',
      'The model is 95% accurate',
    ],
    correct: 0,
    skill: 'stats',
  },
  {
    id: 4,
    category: 'Machine Learning',
    question: 'Which regularization technique adds the absolute sum of weights (L1 penalty) to the loss function, inducing feature sparsity?',
    options: ['Lasso Regression', 'Ridge Regression', 'Elastic Net', 'Dropout'],
    correct: 0,
    skill: 'ml',
  },
  {
    id: 5,
    category: 'Data Structures & Algorithms',
    question: 'What data structure is optimal for implementing Breadth-First Search (BFS) graph traversal?',
    options: ['Stack', 'Queue', 'Max-Heap', 'Binary Search Tree'],
    correct: 1,
    skill: 'dsa',
  },
  {
    id: 6,
    category: 'DBMS Core Concepts',
    question: 'Which property of ACID transactions guarantees that committed transactions survive subsequent system crashes?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correct: 3,
    skill: 'dbms',
  },
];

export const SkillAssessment: React.FC<SkillAssessmentProps> = ({
  user,
  onFinishAnalysis,
  onGoToLearning,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAnalysis, setShowAnalysis] = useState(false);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIdx,
    });
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowAnalysis(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const readinessScore = 72; // Calibrated readiness score matching reference screen

  if (showAnalysis) {
    // PERSONALIZED ANALYSIS SCREEN
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
        {/* Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                AI Assessment Complete
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182238] mt-2">
                Your Career Profile & Skill Gaps
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Target Role: <strong className="text-slate-800">{user.targetCareer}</strong> • Academic Year: <strong className="text-slate-800">{user.year}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <CareerReadinessGauge score={readinessScore} career={user.targetCareer} size={110} />
            </div>
          </div>

          {/* Skill Breakdown Grid */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>Skill Benchmark Analysis</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {USER_SKILLS.slice(0, 6).map((skill) => {
                const isStrong = skill.score >= 60;
                return (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                      <span
                        className={`text-xs font-extrabold ${
                          isStrong ? 'text-blue-600' : 'text-amber-600'
                        }`}
                      >
                        {skill.score}%
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isStrong ? 'bg-blue-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                      <span>Category: {skill.category}</span>
                      <span>Target: {skill.targetScore}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths vs Skill Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Strengths */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>YOUR STRENGTHS</span>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-emerald-900">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Python Programming (80%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  DBMS Core Concepts (70%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Problem Solving Fundamentals (60%)
                </li>
              </ul>
            </div>

            {/* Skill Gaps */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>SKILL GAPS TO BRIDGE</span>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-amber-900">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Machine Learning Fundamentals (30%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  SQL Analytical Queries & Joins (40%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Statistics & Probability (52%)
                </li>
              </ul>
            </div>
          </div>

          {/* AI Recommended Next Step */}
          <div className="p-6 rounded-2xl bg-[#182238] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Recommended Next Step
              </span>
              <h4 className="text-lg font-bold text-white">
                Machine Learning — Chapter 3: Regression
              </h4>
              <p className="text-xs text-slate-300">
                Why? Based on your skill gap analysis, your target role requires high ML competency.
              </p>
            </div>

            <button
              onClick={() => {
                onFinishAnalysis(USER_SKILLS, readinessScore);
                onGoToLearning();
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Start Recommended Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // QUESTIONS SCREEN
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Diagnostic Assessment
            </span>
            <h3 className="text-lg font-extrabold text-[#182238]">
              Question {currentIdx + 1} of {totalQuestions}
            </h3>
          </div>
          <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {currentQ.category}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Statement */}
        <div className="py-2">
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = selectedAnswers[currentIdx] === oIdx;
            const optionLetters = ['A', 'B', 'C', 'D'];
            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-600'
                  }`}
                >
                  {optionLetters[oIdx]}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-[#182238] hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>{currentIdx === totalQuestions - 1 ? 'Analyze My Skills' : 'Next Question'}</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
