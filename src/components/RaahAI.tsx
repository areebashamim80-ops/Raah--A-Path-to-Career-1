import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Paperclip,
  Clock,
  RotateCcw,
  ChevronDown,
  ArrowRight,
  Brain,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Minimize2,
  Maximize2,
  Volume2,
} from 'lucide-react';
import { Logo } from './Logo';
import {
  ChatMessage,
  ChatSession,
  MentorAction,
  getMentorResponse,
} from '../services/mentorService';
import { UserProfile, SkillItem } from '../types';
import { saveAIMessageToSupabase } from '../lib/supabase';

interface RaahAIProps {
  user: UserProfile;
  skills: SkillItem[];
  onNavigate: (page: string) => void;
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
}

export const RaahAI: React.FC<RaahAIProps> = ({
  user,
  skills,
  onNavigate,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showRecentChats, setShowRecentChats] = useState(false);
  const [isInterviewMode, setIsInterviewMode] = useState(false);

  // Chat Sessions
  const initialSession: ChatSession = {
    id: 'session-1',
    title: 'Career & Study Plan',
    createdAt: 'Just now',
    messages: [
      {
        id: 'msg-welcome',
        sender: 'ai',
        text: `Hi ${user.name.split(' ')[0]}! I'm **RAAH AI**, your Personal Career Mentor.

I know you are currently in **${user.year} (${user.semester})** targeting **${user.targetCareer}** (Readiness: **${user.readinessScore}%**).

I can help you with your 4-year roadmap, break down complex concepts, give coding hints, recommend projects, or run mock technical interviews. How can I assist your engineering journey today?`,
        timestamp: '10:00 AM',
        actions: [
          { label: "Today's Study Plan", page: 'learning' },
          { label: 'Mock Interview', page: 'career' },
          { label: 'Check Skill Gaps', page: 'career' },
        ],
      },
    ],
  };

  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('raah_ai_sessions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [initialSession];
      }
    }
    return [initialSession];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(sessions[0]?.id || 'session-1');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0] || initialSession;

  // Persist sessions
  useEffect(() => {
    localStorage.setItem('raah_ai_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Handle external prompt (e.g. from "✨ Ask RAAH AI" in coding page)
  useEffect(() => {
    if (externalPrompt) {
      setIsOpen(true);
      setIsMinimized(false);
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSession?.messages, isTyping, isOpen]);

  // Quick Action Chips
  const suggestionChips = [
    { label: '🎯 What should I learn next?', prompt: 'What should I learn next based on my profile?' },
    { label: '📚 Explain a topic', prompt: 'Explain SQL JOIN with a simple real-world analogy and code.' },
    { label: '💻 Help me with code', prompt: 'Give me hints and optimal complexity patterns for coding practice.' },
    { label: '🚀 Recommend a project', prompt: 'Recommend a high-impact capstone project for my target role.' },
    { label: "📅 Create today's study plan", prompt: "Create today's study plan for my available study time." },
    { label: '🎤 Mock Interview', prompt: 'Start a technical mock interview for my target role.' },
    { label: '📊 Analyze my skills', prompt: 'Analyze my weak areas and skill gaps compared to recruiter benchmarks.' },
    { label: '💼 Placement Guidance', prompt: 'What should my placement preparation strategy look like in my current year?' },
  ];

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // If query mentions mock interview
    if (query.toLowerCase().includes('interview') || query.toLowerCase().includes('mock')) {
      setIsInterviewMode(true);
    }

    // Append user message
    const updatedMessages = [...activeSession.messages, userMessage];
    updateCurrentSessionMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    // Save user message to Supabase
    saveAIMessageToSupabase(user.email, 'user', query);

    try {
      const mentorRes = await getMentorResponse(
        query,
        user,
        skills,
        updatedMessages,
        isInterviewMode
      );

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: mentorRes.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: mentorRes.actions,
        isInterview: mentorRes.isInterview,
        interviewFeedback: mentorRes.interviewFeedback,
      };

      setIsTyping(false);
      updateCurrentSessionMessages([...updatedMessages, aiMessage]);

      // Save AI response to Supabase
      saveAIMessageToSupabase(user.email, 'assistant', mentorRes.text);
    } catch (err) {
      setIsTyping(false);
      const fallbackAiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `I'm analyzing your current progress. Based on your ${user.year} milestones, focusing on bridging your SQL and Machine Learning gaps is your highest leverage activity!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [{ label: 'Open Roadmap', page: 'roadmap' }],
      };
      updateCurrentSessionMessages([...updatedMessages, fallbackAiMessage]);
      saveAIMessageToSupabase(user.email, 'assistant', fallbackAiMessage.text);
    }
  };

  const updateCurrentSessionMessages = (msgs: ChatMessage[]) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === activeSessionId ? { ...s, messages: msgs } : s))
    );
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: `Mentorship ${sessions.length + 1}`,
      createdAt: 'Just now',
      messages: [
        {
          id: `welcome-${Date.now()}`,
          sender: 'ai',
          text: `New mentorship session started! How can I help you today, ${user.name.split(' ')[0]}?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: [
            { label: "Today's Study Plan", page: 'learning' },
            { label: 'Recommend Project', page: 'projects' },
          ],
        },
      ],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setShowRecentChats(false);
    setIsInterviewMode(false);
  };

  const handleClearHistory = () => {
    setSessions([initialSession]);
    setActiveSessionId(initialSession.id);
    setShowRecentChats(false);
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulated voice recognition speech-to-text
      setTimeout(() => {
        setIsListening(false);
        setInputText('What should I learn next based on my profile?');
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* 1. FLOATING AI ASSISTANT BUTTON (Bottom Right Corner) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group animate-in fade-in duration-300">
          {/* Tooltip Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#162033] text-white text-xs font-bold shadow-xl border border-slate-700 pointer-events-none group-hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>RAAH AI Mentor</span>
          </div>

          {/* Circular Button */}
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#162033] to-[#253556] text-white flex items-center justify-center shadow-2xl shadow-blue-950/40 border-2 border-amber-400/90 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Open RAAH AI Career Mentor"
          >
            {/* Subtle pulse aura */}
            <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />

            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-amber-400" />
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </button>
        </div>
      )}

      {/* 2. CHAT PANEL WINDOW */}
      {isOpen && (
        <div
          className={`fixed right-3 sm:right-6 bottom-3 sm:bottom-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized
              ? 'w-80 h-16'
              : 'w-[calc(100vw-24px)] sm:w-[460px] md:w-[490px] h-[620px] max-h-[calc(100vh-32px)]'
          }`}
        >
          {/* A. HEADER */}
          <div className="px-5 py-3.5 bg-[#162033] text-white flex items-center justify-between border-b border-slate-800 select-none shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-900 shadow-md">
                <Bot className="w-5 h-5 text-slate-950" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#162033]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white tracking-wide">
                    RAAH AI
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Mentor
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-medium truncate max-w-[200px]">
                  Your Personal Career Mentor
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                onClick={() => setShowRecentChats(!showRecentChats)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Recent Chats"
              >
                <Clock className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* If minimized, hide the body */}
          {!isMinimized && (
            <>
              {/* B. RECENT CHATS DRAWER */}
              {showRecentChats && (
                <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 animate-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Recent Mentorship Chats</span>
                    <button
                      onClick={handleNewChat}
                      className="text-blue-600 hover:underline cursor-pointer font-bold"
                    >
                      + New Chat
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {sessions.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveSessionId(s.id);
                          setShowRecentChats(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          s.id === activeSessionId
                            ? 'bg-blue-100/70 font-bold text-blue-900'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <span className="truncate">{s.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                          {s.createdAt}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleClearHistory}
                    className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear History
                  </button>
                </div>
              )}

              {/* C. STUDENT CONTEXT BANNER */}
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>Target: <strong className="text-slate-900">{user.targetCareer}</strong></span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                    {user.readinessScore}% Ready
                  </span>
                  <span>{user.year}</span>
                </div>
              </div>

              {/* D. MESSAGES THREAD */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                {activeSession.messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-[#162033] text-amber-400 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-[#182238] text-white rounded-tr-xs'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                        }`}
                      >
                        {/* Text formatting with basic Markdown support */}
                        <div className="whitespace-pre-line space-y-1.5">
                          {msg.text}
                        </div>

                        {/* Interview Feedback Card if present */}
                        {msg.interviewFeedback && (
                          <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1.5">
                            <span className="font-bold flex items-center gap-1">
                              <Brain className="w-3.5 h-3.5 text-blue-600" />
                              Mentor Score: {msg.interviewFeedback.score}/10
                            </span>
                            <div className="text-[11px] space-y-0.5">
                              <p className="font-bold text-emerald-700">
                                Strengths: {msg.interviewFeedback.strengths.join(', ')}
                              </p>
                              <p className="font-bold text-amber-700">
                                Focus on: {msg.interviewFeedback.improvements.join(', ')}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons in AI response */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {msg.actions.map((act, aIdx) => (
                              <button
                                key={aIdx}
                                onClick={() => {
                                  onNavigate(act.page);
                                  setIsMinimized(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#182238] hover:text-white text-slate-800 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                              >
                                <span>{act.label}</span>
                                <ExternalLink className="w-3 h-3 text-amber-500" />
                              </button>
                            ))}
                          </div>
                        )}

                        <span
                          className={`text-[9px] block text-right mt-1.5 ${
                            isUser ? 'text-slate-400' : 'text-slate-400'
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-900 font-bold text-xs flex items-center justify-center shrink-0 mt-1 shadow-xs">
                          {user.name.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                    <div className="w-7 h-7 rounded-lg bg-[#162033] text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-2.5 bg-white rounded-2xl border border-slate-200 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] font-semibold text-slate-400 ml-1">
                        RAAH AI is formulating guidance...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* E. QUICK ACTION SUGGESTION CHIPS */}
              <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 scrollbar-none">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.prompt)}
                    className="px-2.5 py-1 rounded-full bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200/80 text-slate-700 text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* F. VOICE LISTENING OVERLAY */}
              {isListening && (
                <div className="p-3 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="font-bold">Listening... speak your question</span>
                  </div>
                  <button
                    onClick={() => setIsListening(false)}
                    className="text-xs font-bold text-amber-700 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* G. BOTTOM INPUT AREA */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                {/* Voice button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isListening
                      ? 'bg-rose-100 text-rose-600'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Voice Input"
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Attach Image / Code */}
                <button
                  type="button"
                  onClick={() =>
                    handleSendMessage('I have attached my snippet. Can you review it for optimal space and time complexity?')
                  }
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Attach Image or Code"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask anything about your career..."
                  className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-[#182238] hover:bg-blue-700 text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
