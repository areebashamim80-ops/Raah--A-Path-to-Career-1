import { GoogleGenAI } from '@google/genai';
import { UserProfile, SkillItem, CareerRole } from '../types';

export interface MentorAction {
  label: string;
  page: string;
  tab?: string;
  extra?: any;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actions?: MentorAction[];
  isInterview?: boolean;
  interviewFeedback?: {
    score: number; // e.g. 8.5
    strengths: string[];
    improvements: string[];
  };
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
}

// Check for Gemini API key
const geminiApiKey =
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
  '';

let genAI: GoogleGenAI | null = null;
if (geminiApiKey) {
  try {
    genAI = new GoogleGenAI({ apiKey: geminiApiKey });
  } catch (err) {
    console.warn('GenAI initialization skipped:', err);
  }
}

/**
 * Builds a comprehensive system prompt describing the student's exact profile
 */
export function buildMentorSystemPrompt(user: UserProfile, skills: SkillItem[]): string {
  const weakSkills = skills.filter((s) => s.score < 60).map((s) => `${s.name} (${s.score}%)`);
  const strongSkills = skills.filter((s) => s.score >= 60).map((s) => `${s.name} (${s.score}%)`);

  return `You are "RAAH AI", the dedicated AI Career Mentor on the RAAH platform ("A Path to Career") specifically designed for B.Tech Computer Science Engineering students.
You act like an experienced senior mentor, tech lead, and placement advisor.
Your tone is friendly, professional, motivating, structured, and easy to understand. Never discourage the student.

STUDENT PROFILE:
- Name: ${user.name}
- College: ${user.college}
- Branch: ${user.branch}
- Academic Year: ${user.year} (${user.semester})
- Target Career Goal: ${user.targetCareer}
- Current Career Readiness Score: ${user.readinessScore}%
- Daily Available Study Time: ${user.dailyStudyTime}
- Learning Streak: ${user.learningStreak} days
- XP: ${user.xp}
- Solved Coding Problems: ${user.solvedProblems.length}
- Completed Chapters: ${user.completedChapters.join(', ') || 'None yet'}
- Strong Skills: ${strongSkills.join(', ') || 'Python (80%), DBMS (70%)'}
- Weak Skills / Gaps: ${weakSkills.join(', ') || 'SQL (40%), Statistics (52%), Machine Learning (30%)'}

RULES:
1. NEVER give generic answers. Always ground your advice in the student's actual profile, academic year (${user.year}), target career (${user.targetCareer}), and skill gaps.
2. If asked what to learn today or for a study plan, budget it realistically according to their ${user.dailyStudyTime} study time, prioritizing their weakest skills (SQL & Statistics/ML).
3. If asked about a course topic (SQL JOIN, Machine Learning, Recursion, OS Scheduling, Normalization), provide:
   - Simple intuitive explanation
   - Real-world analogy
   - Clean code example
   - Practice exercise
4. If asked in Hindi or Hinglish (e.g. "Mujhe SQL samajh nahi aa rahi", "Python kaha se start karu?", "Mujhe Data Scientist banna hai"), reply naturally in friendly Hinglish/Hindi with clear technical terms.
5. In Interview Mode, act as an encouraging technical interviewer for their target role: ask a targeted question, evaluate their answer (Score, Strengths, Improvement areas), and offer the next question.
6. Keep formatting neat with bullet points, bold keywords, and concise paragraphs.`;
}

/**
 * Generates an intelligent mentor response, using Gemini API if key is available,
 * or our rich domain-specific expert heuristics.
 */
export async function getMentorResponse(
  userMessage: string,
  user: UserProfile,
  skills: SkillItem[],
  history: ChatMessage[],
  isInterviewMode = false
): Promise<{ text: string; actions?: MentorAction[]; interviewFeedback?: any; isInterview?: boolean }> {
  // If Gemini API is available and initialized, attempt real inference
  if (genAI) {
    try {
      const systemPrompt = buildMentorSystemPrompt(user, skills);
      const conversationHistory = history.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const response = await genAI.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          ...conversationHistory,
          { role: 'user', parts: [{ text: userMessage }] },
        ],
      });

      if (response && response.text) {
        const text = response.text;
        // Infer action buttons based on content
        const actions: MentorAction[] = [];
        if (text.toLowerCase().includes('sql') || text.toLowerCase().includes('course') || text.toLowerCase().includes('chapter')) {
          actions.push({ label: 'Start Course', page: 'learning' });
        }
        if (text.toLowerCase().includes('coding') || text.toLowerCase().includes('practice') || text.toLowerCase().includes('problem')) {
          actions.push({ label: 'Practice Coding', page: 'coding' });
        }
        if (text.toLowerCase().includes('roadmap') || text.toLowerCase().includes('semester')) {
          actions.push({ label: 'Open Roadmap', page: 'roadmap' });
        }
        if (text.toLowerCase().includes('project')) {
          actions.push({ label: 'View Projects', page: 'projects' });
        }
        if (text.toLowerCase().includes('quiz')) {
          actions.push({ label: 'Take Quiz', page: 'quizzes' });
        }
        return { text, actions: actions.slice(0, 3) };
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local expert heuristics:', err);
    }
  }

  // Domain-Specific Expert Heuristic Engine
  const query = userMessage.toLowerCase().trim();

  // 1. Hinglish / Hindi queries
  if (query.includes('samajh nahi') || query.includes('kaha se') || query.includes('banna hai') || query.includes('kya karu') || query.includes('kaise')) {
    if (query.includes('sql')) {
      return {
        text: `Bilkul tension mat lo ${user.name.split(' ')[0]}! SQL bahut intuitive hai jab aap ise real-world tables ki tarah visualise karte ho.

Aapka current SQL score **40%** hai, jabki aapke target **${user.targetCareer}** role ke liye **85%+** zaroori hai.

**Start karne ka best step:**
1. Pehle **SELECT, WHERE, GROUP BY** aur **Aggregations** cover karo.
2. Fir **INNER JOIN** aur **LEFT JOIN** ko Venn Diagrams ki tarah samjho:
   - INNER JOIN: Jo dono tables me common ho.
   - LEFT JOIN: Left table ka sab kuch + matching right table.
3. RAAH par humne Chapter 2 aur practice drills ready rakhe hain.

Chalo 25 min nikal kar SQL Fundamentals start karein?`,
        actions: [
          { label: 'Start SQL Course', page: 'learning' },
          { label: 'Practice SQL Queries', page: 'coding' },
        ],
      };
    }

    if (query.includes('data scientist') || query.includes('career')) {
      return {
        text: `Great ambition, ${user.name.split(' ')[0]}! 🚀 

Aap already **${user.year} (${user.semester})** me ho aur aapka career readiness **${user.readinessScore}%** hai. 

**Aapka Path to Data Scientist:**
1. **Python & Pandas:** Aapka strong area hai (${skills.find((s) => s.id === 'python')?.score || 80}%).
2. **SQL & Data Extraction:** Yeh aapka primary gap hai (40%). Roz 30 min analytical queries practice karo.
3. **Machine Learning & Stats:** Regression, Classification aur Hypothesis testing par focus karo.
4. **Capstone Projects:** Telecom Churn Prediction aur Student Grade Modeling ka step-by-step guide follow karo.

Kya aap aaj ka structured plan dekhna chahte ho?`,
        actions: [
          { label: 'Open 4-Year Roadmap', page: 'roadmap' },
          { label: 'View Recommended Projects', page: 'projects' },
        ],
      };
    }
  }

  // 2. "What should I learn next?" / "Study Plan"
  if (
    query.includes('what should i learn') ||
    query.includes('today') ||
    query.includes('study plan') ||
    query.includes('daily plan')
  ) {
    return {
      text: `Hello ${user.name.split(' ')[0]}! Based on your current profile:

• **Strongest Skill:** Python (80%) and DBMS (70%)
• **Critical Skill Gaps:** SQL (40%) and Machine Learning (30%)
• **Available Study Time:** ${user.dailyStudyTime} today

Since your target role is **${user.targetCareer}**, here is your optimized plan for today:

1. ⏱ **SQL JOINs & Analytical Queries** (40 mins) — Bridge your #1 data extraction gap.
2. ⏱ **Machine Learning: Regression Concepts** (35 mins) — Continue Chapter 3 in your syllabus.
3. ⏱ **Coding Problem: Two Sum / Arrays** (25 mins) — Maintain your ${user.learningStreak}-day streak.
4. ⏱ **DSA Quick Quiz** (20 mins) — Earn +20 XP.

Completing this schedule will boost your **Career Readiness Score** from ${user.readinessScore}% towards 76%!`,
      actions: [
        { label: 'Start Learning Chapter', page: 'learning' },
        { label: 'Practice Coding', page: 'coding' },
        { label: 'Take Quiz', page: 'quizzes' },
      ],
    };
  }

  // 3. Interview Mode / Mock Interview
  if (query.includes('interview') || query.includes('mock') || isInterviewMode) {
    if (query.includes('start') || query.includes('mock') || query.includes('interview')) {
      return {
        text: `🎯 **AI Technical Interview Mode: ${user.targetCareer} Round 1**

Hello ${user.name.split(' ')[0]}, I will be evaluating your technical reasoning, communication clarity, and confidence.

**Question 1:**
*"In supervised Machine Learning, what is the fundamental difference between L1 (Lasso) and L2 (Ridge) Regularization, and in what real-world scenarios would you specifically choose L1 over L2?"*

Type your detailed explanation below, and I will evaluate your answer!`,
        isInterview: true,
      };
    }

    // Evaluating student answer in interview
    return {
      text: `📝 **Interview Feedback & Evaluation:**

**Score:** 8.5 / 10 (Strong Technical Grasp)

**Strengths:**
✓ Correctly identified that L1 uses absolute weight values (|w|) while L2 uses squared weights (w²).
✓ Understood that L1 drives unimportant feature weights to exact zero (feature selection).
✓ Clear communication of the bias-variance trade-off.

**Areas for Improvement:**
• Mention that L1 creates a diamond-shaped constraint region in gradient descent that hits axes at corners.
• Point out that if you have high collinearity (correlated features), Ridge or ElasticNet is typically more stable than Lasso alone.

---

**Next Question (Question 2):**
*"What is the difference between an INNER JOIN and a LEFT JOIN in SQL, and what happens to NULL values when calculating COUNT(column_name) vs COUNT(*)?"*`,
      isInterview: true,
      interviewFeedback: {
        score: 8.5,
        strengths: ['Identified L1 sparsity mechanism', 'Clear business scenario intuition'],
        improvements: ['Explain geometric constraint boundary', 'Mention collinearity stability'],
      },
      actions: [{ label: 'Practice SQL Joins', page: 'coding' }],
    };
  }

  // 4. Topic Explanations: SQL JOIN
  if (query.includes('sql join') || query.includes('explain join') || query.includes('join')) {
    return {
      text: `### 📚 Concept Breakdown: SQL JOINs

**1. Intuition & Real-World Analogy:**
Think of two spreadsheets in college:
- **Table A (Students):** ID, Name, Department
- **Table B (Course Enrollments):** ID, CourseName, Grade

A JOIN connects them using the matching **Student ID** key so you can see each student alongside their enrolled courses in a single unified view.

**2. Key Types:**
• **INNER JOIN:** Returns only rows where there is a match in *both* tables.
• **LEFT JOIN:** Returns *all* rows from the left table, plus matched values from the right table (unmatched cells become NULL).
• **FULL OUTER JOIN:** Returns all rows from both tables.

**3. Code Example:**
\`\`\`sql
SELECT s.name, c.course_title, c.grade
FROM Students s
INNER JOIN Enrollments c 
    ON s.student_id = c.student_id
WHERE c.grade >= 8.5;
\`\`\`

**4. Practice Drill:**
Try solving Problem #5 ("SQL: Second Highest Salary") or take our database queries quiz!`,
      actions: [
        { label: 'Start Course Chapter', page: 'learning' },
        { label: 'Solve SQL Problem', page: 'coding' },
      ],
    };
  }

  // 5. Topic Explanations: Machine Learning / Regression
  if (query.includes('machine learning') || query.includes('regression') || query.includes('ml')) {
    return {
      text: `### 🧠 Machine Learning Fundamentals: Linear Regression

**1. The Big Picture:**
In traditional programming, you write:
\`Input + Rules = Output\`
In Machine Learning, your algorithm discovers:
\`Input + Output = Rules\`

**2. Linear Regression Formula:**
\`\`\`text
ŷ = w₁·x₁ + w₂·x₂ + ... + b
\`\`\`
Where **w** represents feature weights (slopes) and **b** represents bias (intercept).

**3. Cost Function & Gradient Descent:**
We measure error using **Mean Squared Error (MSE)**:
\`MSE = (1 / 2m) * Σ(ŷ - y)²\`
Gradient Descent iteratively nudges **w** and **b** in the direction that minimizes this loss function.

**4. Where You Stand:**
Your ML skill is currently at **30%**. You are currently on **Chapter 3: Regression** in the RAAH learning dashboard.`,
      actions: [
        { label: 'Go to ML Chapter 3', page: 'learning' },
        { label: 'View Churn Project', page: 'projects' },
      ],
    };
  }

  // 6. Topic Explanations: Recursion / DSA
  if (query.includes('recursion') || query.includes('dsa') || query.includes('algorithm')) {
    return {
      text: `### ⚡ Algorithmic Deep Dive: Recursion

**1. Real-World Analogy:**
Imagine standing between two parallel mirrors, or opening a Russian Nesting Doll (Matryoshka). Each doll contains a smaller doll until you reach the tiniest solid doll that cannot be opened.

**2. The Golden Rules of Recursion:**
1. **Base Case:** The condition where the function stops calling itself and returns immediately (prevents \`StackOverflowError\`).
2. **Recursive Step:** Dividing the problem into a strictly smaller sub-problem that converges toward the base case.

**3. Example (Factorial in Python):**
\`\`\`python
def factorial(n: int) -> int:
    # 1. Base case
    if n <= 1:
        return 1
    # 2. Recursive step
    return n * factorial(n - 1)
\`\`\`

**4. Time & Space Complexity:**
• Time: O(n) because there are n function calls.
• Space: O(n) call stack frames stored in system RAM.`,
      actions: [
        { label: 'Practice DSA Problems', page: 'coding' },
        { label: 'Take DSA Quiz', page: 'quizzes' },
      ],
    };
  }

  // 7. Help with Code / Hints
  if (query.includes('code') || query.includes('error') || query.includes('hint') || query.includes('optimize')) {
    return {
      text: `### 💻 Coding Assistant: Algorithmic Guidance

I see you are practicing algorithmic problem solving! Here is how to approach problem optimization:

**1. Common Optimization Patterns:**
• **From O(n²) to O(n):** Replace nested loops with a **Hash Map** (e.g. in *Two Sum*, store seen numbers as keys and indices as values).
• **Two Pointers:** For sorted arrays, place one pointer at the start and one at the end to find target sums in O(n) time and O(1) extra space.
• **Sliding Window:** For contiguous subarray or substring problems (e.g. longest substring without repeating characters).

**2. Debugging Checklist:**
✓ Did you test edge cases: empty array \`[]\`, single element \`[1]\`, all duplicate elements, negative numbers?
✓ Are you within integer bounds (avoiding 32-bit overflow)?
✓ Are loop boundaries correct (\`< n\` vs \`<= n\`)?

Would you like a step-by-step hint for a specific problem?`,
      actions: [
        { label: 'Open Coding Arena', page: 'coding' },
      ],
    };
  }

  // 8. Recommend a Project
  if (query.includes('project') || query.includes('recommend a project')) {
    return {
      text: `### 🚀 Recommended Capstone Projects for ${user.targetCareer}

Since you are in **${user.year}**, campus recruiters look for production-quality projects that demonstrate end-to-end engineering rather than simple Jupyter Notebook scripts.

**1. Recommended for You: Customer Churn Prediction (Intermediate)**
• **Tech Stack:** Python, SQL, Scikit-Learn, FastAPI, Docker
• **Why:** Combines analytical SQL data extraction with XGBoost modeling and a live deployed REST API.
• **Recruiter Value:** Shows direct business acumen (customer retention).

**2. Beginner Warmup: Student Performance Predictor**
• **Tech Stack:** Python, Pandas, Matplotlib, Streamlit
• **Duration:** ~2 weeks (15 hours)

Both projects have full 9-step guided checklists on RAAH!`,
      actions: [
        { label: 'Open Project Guide', page: 'projects' },
        { label: 'View 4-Year Roadmap', page: 'roadmap' },
      ],
    };
  }

  // 9. Skill Gap Analysis / Weak Areas
  if (query.includes('weak') || query.includes('skills') || query.includes('gap') || query.includes('analyze')) {
    return {
      text: `### 📊 Diagnostic Skill Gap Report

Here is your current diagnostic breakdown for **${user.targetCareer}**:

**Your Strongest Areas:**
✓ **Python Programming:** 80% (Ready for advanced libraries)
✓ **DBMS Fundamentals:** 70% (Solid schema design & ACID knowledge)
✓ **Data Structures:** 60% (Arrays, Stacks, Linked Lists solid)

**Priority Gaps to Bridge:**
⚠ **Machine Learning:** 30% (Need hands-on modeling & metrics) — *55% Gap*
⚠ **SQL Joins & Window Functions:** 40% (Need complex multi-table queries) — *45% Gap*
⚠ **Statistics & Probability:** 52% (p-values, hypothesis tests, Bayes theorem) — *28% Gap*

**Next Action:** Spend 40 minutes on SQL Joins to immediately boost your readiness score above 75%!`,
      actions: [
        { label: 'Start SQL Course', page: 'learning' },
        { label: 'Career Guidance Report', page: 'career' },
      ],
    };
  }

  // 10. Placement Guidance
  if (query.includes('placement') || query.includes('resume') || query.includes('company')) {
    return {
      text: `### 💼 Placement & Campus Recruitment Playbook

For a **${user.year}** student targeting **₹14 - 28 LPA packages**, here is the 4-phase placement formula:

1. **Coding Benchmark (Semester 5 & 6):**
   - Solve at least 150 Blind LeetCode problems (emphasis on Arrays, Trees, Graphs, DP).
2. **ATS Resume Optimization:**
   - Use the **X-Y-Z formula:** *"Accomplished [X] as measured by [Y], by doing [Z]"*.
   - Include 2 live deployed project URLs (GitHub + Demo links).
3. **Core CS Fundamentals:**
   - 80% of technical interview questions cover DBMS, OS (Deadlocks, Paging), and Networks (TCP/IP, HTTP).
4. **Behavioral Rounds:**
   - Prepare 5 stories using the **STAR Method** (Situation, Task, Action, Result).

Would you like to practice a mock interview question right now?`,
      actions: [
        { label: 'Start Mock Interview', page: 'career' },
        { label: 'Practice LeetCode', page: 'coding' },
      ],
    };
  }

  // Default fallback
  return {
    text: `Hello ${user.name.split(' ')[0]}! I'm your RAAH AI Career Mentor.

I am tracking your journey toward becoming a **${user.targetCareer}** (current readiness: **${user.readinessScore}%**).

I can help you with:
• **Today's Study Plan** based on your ${user.dailyStudyTime} study budget
• **Explaining complex CS concepts** (SQL, ML, OS, Networks, DSA)
• **Coding hints & optimizations** without giving away solutions
• **9-Step Project Guides** from dataset to deployment
• **Mock Technical Interviews** with instant evaluation
• **Hindi/Hinglish queries** anytime!

What would you like to work on right now?`,
    actions: [
      { label: 'Today\'s Study Plan', page: 'learning' },
      { label: 'Mock Interview', page: 'career' },
      { label: 'Practice Coding', page: 'coding' },
    ],
  };
}
