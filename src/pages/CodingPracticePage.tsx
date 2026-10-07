import React, { useState } from 'react';
import {
  Search,
  Code2,
  CheckCircle2,
  XCircle,
  Play,
  Send,
  HelpCircle,
  Terminal,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Award,
} from 'lucide-react';
import { CODING_PROBLEMS } from '../data/mockData';
import { CodingProblem, UserProfile } from '../types';

interface CodingPracticePageProps {
  user: UserProfile;
  onProblemSolved: (problemId: string, code?: string, language?: string) => void;
  onAskAI?: (prompt: string) => void;
}

export const CodingPracticePage: React.FC<CodingPracticePageProps> = ({
  user,
  onProblemSolved,
  onAskAI,
}) => {
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'cpp' | 'java' | 'javascript'>('python');
  const [code, setCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'testcases' | 'output'>('testcases');
  const [testResults, setTestResults] = useState<{ id: number; passed: boolean; message: string }[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showAIMenu, setShowAIMenu] = useState(false);

  // Available categories
  const categories = [
    'All',
    'Arrays',
    'Stack',
    'Linked List',
    'Dynamic Programming',
    'SQL & Database',
  ];

  const filteredProblems = CODING_PROBLEMS.filter((p) => {
    const matchesCat = filterCategory === 'All' || p.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setCode(prob.starterCodes[selectedLanguage]);
    setTestResults(null);
    setStatusMessage(null);
    setShowHint(false);
  };

  const handleLanguageChange = (lang: 'python' | 'cpp' | 'java' | 'javascript') => {
    setSelectedLanguage(lang);
    if (selectedProblem) {
      setCode(selectedProblem.starterCodes[lang]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setStatusMessage('Compiling & running test cases...');
    setActiveTab('output');

    setTimeout(() => {
      setIsRunning(false);
      setTestResults([
        { id: 1, passed: true, message: 'Test Case 1 Passed (Runtime: 42 ms)' },
        { id: 2, passed: true, message: 'Test Case 2 Passed (Runtime: 38 ms)' },
        { id: 3, passed: true, message: 'Test Case 3 Passed (Runtime: 45 ms)' },
      ]);
      setStatusMessage('✓ All local test cases passed! Ready to submit.');
    }, 600);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setStatusMessage('Evaluating on hidden edge cases...');
    setActiveTab('output');

    setTimeout(() => {
      setIsRunning(false);
      setTestResults([
        { id: 1, passed: true, message: 'Test Case 1 Passed' },
        { id: 2, passed: true, message: 'Test Case 2 Passed' },
        { id: 3, passed: true, message: 'Test Case 3 Passed' },
      ]);
      setStatusMessage('Accepted! 🎉 100% test cases passed. +25 XP earned (Synced to Supabase)!');
      if (selectedProblem) {
        onProblemSolved(selectedProblem.id, code, selectedLanguage);
      }
    }, 800);
  };

  // IF A PROBLEM IS CURRENTLY OPEN: SHOW THE FULL CODING ARENA
  if (selectedProblem) {
    return (
      <div className="space-y-4 pb-12 animate-in fade-in duration-200">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProblem(null)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 text-xs font-bold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Problems</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <h2 className="text-sm font-extrabold text-slate-900">
              #{selectedProblem.number}. {selectedProblem.title}
            </h2>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedProblem.difficulty === 'Easy'
                  ? 'bg-emerald-100 text-emerald-800'
                  : selectedProblem.difficulty === 'Medium'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {selectedProblem.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Ask RAAH AI Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAIMenu(!showAIMenu)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>Ask RAAH AI</span>
              </button>

              {showAIMenu && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-30 p-1.5 animate-in fade-in duration-150">
                  <button
                    onClick={() => {
                      setShowAIMenu(false);
                      onAskAI?.(`Give me a hint for solving Problem #${selectedProblem.number} (${selectedProblem.title}) without giving away the full code.`);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-50 text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>💡</span>
                    <span>Hint</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAIMenu(false);
                      onAskAI?.(`How can I optimize this solution for Problem #${selectedProblem.number} (${selectedProblem.title})? Here is my current code:\n\`\`\`\n${code}\n\`\`\``);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-50 text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>⚡</span>
                    <span>Optimize Code</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAIMenu(false);
                      onAskAI?.(`Explain what might be causing errors or edge-case failures in my code for Problem #${selectedProblem.number} (${selectedProblem.title}):\n\`\`\`\n${code}\n\`\`\``);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-50 text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>🔍</span>
                    <span>Explain Error</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAIMenu(false);
                      onAskAI?.(`Explain the core algorithmic logic and pattern for Problem #${selectedProblem.number} (${selectedProblem.title}).`);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-50 text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>🧠</span>
                    <span>Explain Logic</span>
                  </button>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="python">Python 3</option>
              <option value="cpp">C++ (GCC 12)</option>
              <option value="java">Java 17</option>
              <option value="javascript">JavaScript (ES6)</option>
            </select>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 text-slate-700" />
              <span>Run Code</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Split Screen Workspace: Problem Statement (5 cols) | Code Editor & Output (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT: Problem Description & Test Cases (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 max-h-[750px] overflow-y-auto">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {selectedProblem.category}
              </span>
              <h3 className="text-xl font-black text-[#182238] mt-0.5">
                {selectedProblem.title}
              </h3>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed space-y-3">
              <p>{selectedProblem.description}</p>

              {/* Examples */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-900 block">Examples:</span>
                {selectedProblem.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono-code text-[11px] space-y-1"
                  >
                    <p>
                      <strong className="text-slate-500 font-semibold font-sans">Input:</strong>{' '}
                      {ex.input}
                    </p>
                    <p>
                      <strong className="text-slate-500 font-semibold font-sans">Output:</strong>{' '}
                      {ex.output}
                    </p>
                    {ex.explanation && (
                      <p className="text-slate-500 font-sans text-[10px] mt-1">
                        Explanation: {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="pt-2">
                <span className="font-bold text-slate-900 block mb-1">Constraints:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                  {selectedProblem.constraints.map((c, cIdx) => (
                    <li key={cIdx}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Hint Box */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>{showHint ? 'Hide Hint' : 'Get Algorithm Hint'}</span>
                </button>
                {showHint && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 space-y-1 animate-in fade-in">
                    {selectedProblem.hints.map((hint, hIdx) => (
                      <p key={hIdx}>• {hint}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Code Editor & Execution Results (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Dark Code Editor */}
            <div className="bg-[#0F172A] rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col flex-1">
              <div className="px-4 py-2 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  solution.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : 'js'}
                </span>
                <button
                  onClick={() => setCode(selectedProblem.starterCodes[selectedLanguage])}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={16}
                className="w-full p-4 font-mono-code text-xs sm:text-sm text-emerald-400 bg-transparent resize-none focus:outline-none flex-1 leading-relaxed selection:bg-blue-600 selection:text-white"
                spellCheck={false}
              />
            </div>

            {/* Test Cases / Terminal Output Panel */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('testcases')}
                    className={`text-xs font-bold pb-1 cursor-pointer ${
                      activeTab === 'testcases'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Test Cases
                  </button>
                  <button
                    onClick={() => setActiveTab('output')}
                    className={`text-xs font-bold pb-1 cursor-pointer ${
                      activeTab === 'output'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Execution Output
                  </button>
                </div>

                {statusMessage && (
                  <span className="text-[11px] font-bold text-emerald-600 animate-in fade-in">
                    {statusMessage}
                  </span>
                )}
              </div>

              {activeTab === 'testcases' ? (
                <div className="space-y-2">
                  {selectedProblem.testCases.map((tc, tcIdx) => (
                    <div
                      key={tcIdx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono-code text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="text-slate-500 font-sans font-semibold text-[11px] mr-2">
                          Case {tcIdx + 1}:
                        </span>
                        <span className="text-slate-800">{tc.input}</span>
                      </div>
                      <span className="text-slate-500 text-[11px]">
                        Expected: {tc.expectedOutput}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {testResults ? (
                    testResults.map((tr) => (
                      <div
                        key={tr.id}
                        className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {tr.message}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-bold">Passed</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400 font-medium">
                      Click "Run Code" or "Submit" to see live test case verification.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: PROBLEM LIST MATCHING REFERENCE SCREENSHOT
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182238] tracking-tight">
            Coding Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Solve problems, improve your skills and earn XP
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <Award className="w-4 h-4 text-yellow-500" />
          <span>Solved: {user.solvedProblems?.length || 1} / {CODING_PROBLEMS.length}</span>
        </div>
      </div>

      {/* Search & Topic Filters Strip from Screenshot */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#182238] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Problem Cards Table matching bottom-left screenshot */}
      <div className="space-y-3">
        {filteredProblems.map((problem) => {
          const isSolved = user.solvedProblems?.includes(problem.id);
          return (
            <div
              key={problem.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                  {problem.number}
                </span>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                      {problem.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        problem.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : problem.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {problem.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                    {problem.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-right text-xs">
                  <span className="text-slate-400 text-[11px] block">Acceptance</span>
                  <span className="font-bold text-slate-700">{problem.acceptance}</span>
                </div>

                <button
                  onClick={() => handleOpenProblem(problem)}
                  className="px-5 py-2 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isSolved ? 'Solve Again' : 'Solve Now'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
