import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Timer,
  ChevronRight,
  ChevronLeft,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { DSA_ARRAYS_QUIZ } from '../data/mockData';
import { UserProfile } from '../types';

interface QuizPageProps {
  user: UserProfile;
  onUpdateScore: (quizId: string, score: number) => void;
  onGoToRoadmap: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  user,
  onUpdateScore,
  onGoToRoadmap,
}) => {
  const [currentIdx, setCurrentIdx] = useState(3); // Start on Question 4 to match reference image screenshot!
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({
    0: 0, // Q1 correct
    1: 1, // Q2 correct
    2: 0, // Q3 correct
    3: 0, // Q4 correct (O(1))
    4: 1, // Q5 incorrect
    5: 0, // Q6 correct
    6: 1, // Q7 incorrect
    7: 0, // Q8 correct
  });
  const [showExplanation, setShowExplanation] = useState(true);

  const quiz = DSA_ARRAYS_QUIZ;
  const currentQ = quiz.questions[currentIdx];
  const totalQuestions = quiz.questions.length;

  // Calculate live score
  const answeredCount = Object.keys(userAnswers).length;
  let correctCount = 0;
  Object.entries(userAnswers).forEach(([qIdx, ans]) => {
    if (quiz.questions[Number(qIdx)].correctIndex === ans) {
      correctCount++;
    }
  });
  const incorrectCount = answeredCount - correctCount;
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 80;

  const handleSelect = (optionIdx: number) => {
    setUserAnswers({
      ...userAnswers,
      [currentIdx]: optionIdx,
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onUpdateScore(quiz.id, scorePercent);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <span>Home</span>
        <span>›</span>
        <span>Quizzes</span>
        <span>›</span>
        <span className="text-slate-800 font-bold">{quiz.title}</span>
      </div>

      {/* Main Grid: Question Card (8 cols) | Quiz Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#182238]">
                {quiz.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Test your knowledge and earn XP
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                <Timer className="w-3.5 h-3.5 text-slate-500" />
                <span>08:42</span>
              </div>
              <div className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold">
                Score: {scorePercent}%
              </div>
            </div>
          </div>

          {/* Question Counter & Difficulty */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              Question {currentIdx + 1} of {totalQuestions}
            </span>
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
              Difficulty: <strong className="text-slate-800">{currentQ.difficulty}</strong>
            </span>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              Q{currentIdx + 1}. {currentQ.question}
            </p>
          </div>

          {/* Multiple Choice Radio Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, oIdx) => {
              const optionLetter = ['A', 'B', 'C', 'D'][oIdx];
              const isSelected = userAnswers[currentIdx] === oIdx;
              const isCorrectAnswer = currentQ.correctIndex === oIdx;
              const hasAnswered = userAnswers[currentIdx] !== undefined;

              let borderBgClass = 'border-slate-200 hover:border-slate-300 bg-slate-50/50';
              if (hasAnswered) {
                if (isCorrectAnswer) {
                  borderBgClass = 'border-emerald-500 bg-emerald-50/60 text-emerald-950';
                } else if (isSelected && !isCorrectAnswer) {
                  borderBgClass = 'border-rose-400 bg-rose-50/60 text-rose-950';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelect(oIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${borderBgClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                        hasAnswered && isCorrectAnswer
                          ? 'bg-emerald-600 text-white'
                          : hasAnswered && isSelected && !isCorrectAnswer
                          ? 'bg-rose-500 text-white'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      {optionLetter}
                    </span>
                    <span className="font-semibold">{opt}</span>
                  </div>

                  {hasAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation */}
          {userAnswers[currentIdx] !== undefined && showExplanation && (
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 leading-relaxed space-y-1 animate-in fade-in">
              <span className="font-bold flex items-center gap-1.5 text-blue-950">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Explanation:
              </span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation Controls */}
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
              <span>{currentIdx === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Right: Quiz Summary matching reference screenshot (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <h3 className="font-extrabold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Quiz Summary
            </h3>

            {/* Circular Gauge / Big Score */}
            <div className="flex items-center justify-center py-2">
              <div className="relative w-28 h-28 rounded-full border-8 border-emerald-500 flex flex-col items-center justify-center text-center shadow-xs">
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {scorePercent}%
                </span>
                <span className="text-[10px] font-bold text-emerald-600 mt-1">
                  +20 XP
                </span>
              </div>
            </div>

            {/* Breakdown numbers */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-xl font-black text-emerald-700">{correctCount}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">Correct</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <p className="text-xl font-black text-rose-700">{incorrectCount}</p>
                <p className="text-[10px] font-bold text-rose-600 uppercase">Incorrect</p>
              </div>
            </div>

            {/* Performance by Difficulty */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Performance by Difficulty:
              </span>
              {[
                { label: 'Easy', score: '100%', color: 'bg-emerald-500' },
                { label: 'Medium', score: '75%', color: 'bg-amber-500' },
                { label: 'Hard', score: '66%', color: 'bg-blue-600' },
              ].map((perf) => (
                <div key={perf.label} className="flex items-center gap-2 text-xs">
                  <span className="w-14 text-slate-600 font-medium">{perf.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${perf.color}`}
                      style={{ width: perf.score }}
                    />
                  </div>
                  <span className="text-slate-700 font-bold w-9 text-right">
                    {perf.score}
                  </span>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <p className="font-bold">Topics to revise:</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Two Pointers and Row-Major index calculations.
              </p>
            </div>

            <button
              onClick={onGoToRoadmap}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Back to Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
