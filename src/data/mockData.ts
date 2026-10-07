import {
  UserProfile,
  CareerPathInfo,
  SkillItem,
  RoadmapYearData,
  Course,
  Quiz,
  CodingProblem,
  ProjectGuideItem,
} from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Rahul Sharma',
  email: 'rahul@raah.edu',
  phone: '+91 98765 43210',
  college: 'National Institute of Technology Delhi',
  university: 'Delhi Technological University',
  branch: 'Computer Science & Engineering',
  year: '3rd Year',
  semester: 'Semester 5',
  targetCareer: 'Data Scientist',
  photoUrl: '',
  bio: 'Passionate 3rd year CSE student aspiring to become a high-impact Data Scientist. Building end-to-end ML systems and solving algorithmic challenges daily.',
  currentSkills: ['Python', 'DSA', 'SQL', 'DBMS', 'HTML/CSS'],
  interests: ['Data Science', 'AI / ML', 'Web Development'],
  dailyStudyTime: '2 hours',
  skillConfidence: 'Moderate',
  readinessScore: 72,
  learningStreak: 6,
  xp: 840,
  completedChapters: ['ml-ch1', 'ml-ch2'],
  solvedProblems: ['prob-1'],
  completedProjects: ['Student Performance Prediction'],
  quizScores: {
    'quiz-dsa-arrays': 80,
    'quiz-python-basics': 90,
  },
  certificates: [
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
  ],
  settings: {
    emailNotifications: true,
    dailyReminder: true,
    reminderTime: '18:00',
    privateProfile: false,
    marketingEmails: false,
  },
};

export const CAREER_PATHS: CareerPathInfo[] = [
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    shortDesc: 'Extract actionable intelligence, train statistical models & solve real business challenges using data.',
    difficulty: 'Intermediate',
    avgPackage: '₹14 - 28 LPA',
    requiredSkills: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization', 'Pandas & NumPy'],
    description: 'Data Scientists combine domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data.',
    marketDemand: 'Very High',
    recommendedYear: '3rd Year',
  },
  {
    id: 'software-dev',
    name: 'Software Developer',
    shortDesc: 'Build scalable enterprise systems, robust algorithms, and high-performance software applications.',
    difficulty: 'Beginner Friendly',
    avgPackage: '₹12 - 24 LPA',
    requiredSkills: ['DSA', 'Java / C++', 'OOP', 'System Design', 'Git', 'OS & Networks'],
    description: 'Core software development focusing on strong problem solving, data structures, algorithms, and clean maintainable architecture.',
    marketDemand: 'Very High',
    recommendedYear: '1st - 4th Year',
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI / ML Engineer',
    shortDesc: 'Design, build, and deploy production deep learning models, LLMs, and intelligent autonomous agents.',
    difficulty: 'Advanced',
    avgPackage: '₹16 - 32 LPA',
    requiredSkills: ['Python', 'PyTorch / TensorFlow', 'Deep Learning', 'NLP / LLMs', 'Math & Linear Algebra', 'MLOps'],
    description: 'Specialists who train generative models, computer vision systems, and neural architectures scalable in cloud production environments.',
    marketDemand: 'Trending',
    recommendedYear: '3rd Year',
  },
  {
    id: 'full-stack-dev',
    name: 'Full Stack Developer',
    shortDesc: 'Craft end-to-end modern web platforms, APIs, microservices, and interactive user interfaces.',
    difficulty: 'Intermediate',
    avgPackage: '₹10 - 22 LPA',
    requiredSkills: ['React', 'Node.js / Express', 'TypeScript', 'PostgreSQL / MongoDB', 'REST & GraphQL', 'Docker'],
    description: 'Engineers proficient in both front-end client engineering and back-end database, API, and cloud deployments.',
    marketDemand: 'High',
    recommendedYear: '2nd - 3rd Year',
  },
  {
    id: 'data-engineer',
    name: 'Data Engineer',
    shortDesc: 'Architect high-throughput big data pipelines, data warehouses, streaming platforms and ETL workflows.',
    difficulty: 'Intermediate',
    avgPackage: '₹13 - 26 LPA',
    requiredSkills: ['SQL', 'Python', 'Apache Spark', 'Kafka', 'Airflow', 'Cloud Data Warehouses'],
    description: 'Build reliable infrastructure that powers analytics and real-time machine learning pipelines at massive scale.',
    marketDemand: 'High',
    recommendedYear: '3rd Year',
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security Engineer',
    shortDesc: 'Protect enterprise infrastructure, execute penetration testing, and secure modern distributed software.',
    difficulty: 'Advanced',
    avgPackage: '₹12 - 25 LPA',
    requiredSkills: ['Network Security', 'Cryptography', 'Linux', 'Ethical Hacking', 'OWASP', 'Cloud Security'],
    description: 'Analyze security vulnerabilities, implement zero-trust protocols, and ensure defense-in-depth against cyber attacks.',
    marketDemand: 'High',
    recommendedYear: '2nd - 4th Year',
  },
  {
    id: 'cloud-devops',
    name: 'Cloud / DevOps Engineer',
    shortDesc: 'Automate CI/CD pipelines, container orchestration, Kubernetes clusters, and cloud infrastructure as code.',
    difficulty: 'Intermediate',
    avgPackage: '₹14 - 26 LPA',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS / GCP', 'Terraform', 'CI/CD Pipelines'],
    description: 'Bridge software development and IT operations to streamline software delivery speed, reliability, and autoscaling.',
    marketDemand: 'Very High',
    recommendedYear: '3rd - 4th Year',
  },
  {
    id: 'mobile-app-dev',
    name: 'Mobile App Developer',
    shortDesc: 'Build fluid native and cross-platform mobile apps for Android & iOS with modern frameworks.',
    difficulty: 'Beginner Friendly',
    avgPackage: '₹10 - 20 LPA',
    requiredSkills: ['Flutter / React Native', 'Kotlin / Swift', 'Mobile UI/UX', 'REST APIs', 'State Management'],
    description: 'Develop high-performance mobile applications with seamless user interfaces, push notifications, and offline-first capabilities.',
    marketDemand: 'High',
    recommendedYear: '2nd - 3rd Year',
  },
];

export const USER_SKILLS: SkillItem[] = [
  { id: 'python', name: 'Python', category: 'Programming', score: 80, targetScore: 90, level: 'Advanced', gap: 10 },
  { id: 'sql', name: 'SQL & Relational DBs', category: 'Database', score: 40, targetScore: 85, level: 'Beginner', gap: 45 },
  { id: 'stats', name: 'Statistics & Math', category: 'Data Science', score: 52, targetScore: 80, level: 'Intermediate', gap: 28 },
  { id: 'ml', name: 'Machine Learning', category: 'AI/ML', score: 30, targetScore: 85, level: 'Beginner', gap: 55 },
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'DSA', score: 60, targetScore: 85, level: 'Intermediate', gap: 25 },
  { id: 'dbms', name: 'DBMS Core Concepts', category: 'Core CS', score: 70, targetScore: 80, level: 'Advanced', gap: 10 },
  { id: 'data-viz', name: 'Data Visualization (Matplotlib/Seaborn)', category: 'Data Science', score: 65, targetScore: 80, level: 'Intermediate', gap: 15 },
  { id: 'web-dev', name: 'Web Dev & APIs', category: 'Web', score: 55, targetScore: 70, level: 'Intermediate', gap: 15 },
  { id: 'git', name: 'Git & Version Control', category: 'Programming', score: 75, targetScore: 85, level: 'Advanced', gap: 10 },
  { id: 'os-cn', name: 'Operating Systems & Networks', category: 'Core CS', score: 68, targetScore: 80, level: 'Intermediate', gap: 12 },
];

export const ROADMAP_YEARS: RoadmapYearData[] = [
  {
    yearNumber: 1,
    yearName: 'Foundation',
    tagline: 'Mastering algorithmic fundamentals, C/C++, logic building, and development setup.',
    progressPercent: 100,
    badgeColor: 'bg-emerald-500 text-white',
    semesters: [
      {
        semesterNumber: 1,
        title: 'Semester 1: Engineering Foundations & Logic',
        topics: [
          {
            id: 'prog-fund',
            title: 'Programming Fundamentals in C/C++',
            status: 'Completed',
            estimatedHours: '40 hrs',
            skillLevel: 'Beginner',
            description: 'Pointers, memory layout, functions, conditionals, and standard library.',
            category: 'Programming',
          },
          {
            id: 'eng-math-1',
            title: 'Discrete Mathematics & Logic',
            status: 'Completed',
            estimatedHours: '30 hrs',
            skillLevel: 'Beginner',
            description: 'Set theory, propositional logic, relations, and combinatorics for CS.',
            category: 'Math',
          },
          {
            id: 'comp-fund',
            title: 'Computer Architecture Fundamentals',
            status: 'Completed',
            estimatedHours: '25 hrs',
            skillLevel: 'Beginner',
            description: 'CPU cycles, memory hierarchy, cache basics, binary representation.',
            category: 'Core CS',
          },
        ],
        projects: ['CLI Student Grade Calculator', 'Bank Management Console System'],
      },
      {
        semesterNumber: 2,
        title: 'Semester 2: OOP & Data Structures Genesis',
        topics: [
          {
            id: 'oop-basics',
            title: 'Object-Oriented Programming (Java / C++)',
            status: 'Completed',
            estimatedHours: '35 hrs',
            skillLevel: 'Beginner',
            description: 'Encapsulation, inheritance, polymorphism, abstraction, interface design.',
            category: 'Programming',
          },
          {
            id: 'dsa-genesis',
            title: 'Linear Data Structures (Arrays, Linked Lists, Stacks, Queues)',
            status: 'Completed',
            estimatedHours: '45 hrs',
            skillLevel: 'Beginner',
            description: 'Time & space complexity analysis (Big O), searching and sorting.',
            category: 'DSA',
          },
          {
            id: 'git-gh',
            title: 'Git Version Control & Developer Workflow',
            status: 'Completed',
            estimatedHours: '15 hrs',
            skillLevel: 'Beginner',
            description: 'Branching, pull requests, resolving merge conflicts, GitHub portfolio.',
            category: 'Tools',
          },
        ],
        projects: ['Interactive Quiz App in Java', 'Personal Developer Portfolio on GitHub Pages'],
      },
    ],
  },
  {
    yearNumber: 2,
    yearName: 'Core CS',
    tagline: 'Deep dive into computer science essentials: Operating Systems, DBMS, Advanced DSA, Computer Networks.',
    progressPercent: 80,
    badgeColor: 'bg-blue-600 text-white',
    semesters: [
      {
        semesterNumber: 3,
        title: 'Semester 3: Core Systems & Non-Linear DSA',
        topics: [
          {
            id: 'adv-dsa',
            title: 'Advanced DSA (Trees, BST, Heaps, Hashing)',
            status: 'Completed',
            estimatedHours: '50 hrs',
            skillLevel: 'Intermediate',
            description: 'Tree traversals, balanced search trees, priority queues, hashing collision strategies.',
            category: 'DSA',
          },
          {
            id: 'dbms-core',
            title: 'Database Management Systems (DBMS) & Normalization',
            status: 'Completed',
            estimatedHours: '40 hrs',
            skillLevel: 'Intermediate',
            description: 'Relational algebra, ER diagrams, 1NF to BCNF, transactions, ACID properties.',
            category: 'Database',
          },
          {
            id: 'os-core',
            title: 'Operating Systems & Process Synchronization',
            status: 'Completed',
            estimatedHours: '40 hrs',
            skillLevel: 'Intermediate',
            description: 'CPU scheduling, deadlocks, semaphores, paging, virtual memory management.',
            category: 'Core CS',
          },
        ],
        projects: ['Library Management System with SQL DB', 'Multi-Threaded Process Simulator'],
      },
      {
        semesterNumber: 4,
        title: 'Semester 4: Networks, Web Architecture & Graphs',
        topics: [
          {
            id: 'cn-core',
            title: 'Computer Networks & Internet Protocols',
            status: 'Completed',
            estimatedHours: '35 hrs',
            skillLevel: 'Intermediate',
            description: 'OSI 7 layers, TCP/IP, socket programming, routing protocols, DNS, HTTP/HTTPS.',
            category: 'Core CS',
          },
          {
            id: 'graph-algo',
            title: 'Graph Algorithms & Dynamic Programming',
            status: 'In Progress',
            estimatedHours: '55 hrs',
            skillLevel: 'Intermediate',
            description: 'BFS, DFS, Dijkstra, Bellman-Ford, Memoization, Tabulation DP patterns.',
            category: 'DSA',
          },
          {
            id: 'web-backend',
            title: 'Full Stack Web Architecture & RESTful APIs',
            status: 'Completed',
            estimatedHours: '40 hrs',
            skillLevel: 'Intermediate',
            description: 'Building secure micro-services, JWT auth, frontend client-server communication.',
            category: 'Web',
          },
        ],
        projects: ['Realtime Chat Application with WebSockets', 'E-commerce REST API with Authentication'],
      },
    ],
  },
  {
    yearNumber: 3,
    yearName: 'Specialization',
    tagline: 'Target Role Acceleration: Deep Data Science, Machine Learning, Feature Engineering, Big Data & Cloud.',
    progressPercent: 45,
    badgeColor: 'bg-purple-600 text-white',
    semesters: [
      {
        semesterNumber: 5,
        title: 'Semester 5: Machine Learning & Mathematical Foundations',
        topics: [
          {
            id: 'ml-fundamentals',
            title: 'Machine Learning Fundamentals',
            status: 'Completed',
            estimatedHours: '45 hrs',
            skillLevel: 'Intermediate',
            description: 'Supervised vs unsupervised learning, gradient descent, loss functions, overfitting.',
            category: 'AI/ML',
            courseId: 'ml-course',
          },
          {
            id: 'stats-ds',
            title: 'Statistics & Probability for Data Science',
            status: 'In Progress',
            estimatedHours: '35 hrs',
            skillLevel: 'Intermediate',
            description: 'Hypothesis testing, p-values, distributions, Bayes theorem, confidence intervals.',
            category: 'Data Science',
          },
          {
            id: 'data-viz-exp',
            title: 'Data Visualization & Exploratory Data Analysis',
            status: 'Pending',
            estimatedHours: '25 hrs',
            skillLevel: 'Intermediate',
            description: 'Matplotlib, Seaborn, Plotly, heatmaps, distribution plots, actionable storytelling.',
            category: 'Data Science',
          },
          {
            id: 'sql-ds',
            title: 'SQL for Data Science & Analytical Queries',
            status: 'Pending',
            estimatedHours: '30 hrs',
            skillLevel: 'Intermediate',
            description: 'Window functions (RANK, ROW_NUMBER), CTEs, complex aggregations, query optimization.',
            category: 'Database',
          },
          {
            id: 'mini-project-s5',
            title: 'Specialization Mini Project',
            status: 'Pending',
            estimatedHours: '40 hrs',
            skillLevel: 'Intermediate',
            description: 'End-to-end data pipeline from raw dataset to deployed predictive web interface.',
            category: 'Project',
          },
        ],
        projects: ['Customer Churn Prediction Dashboard', 'Credit Card Fraud Detection Pipeline'],
      },
      {
        semesterNumber: 6,
        title: 'Semester 6: Advanced Deep Learning & MLOps Pipelines',
        topics: [
          {
            id: 'deep-learning',
            title: 'Deep Learning & Neural Networks',
            status: 'Pending',
            estimatedHours: '50 hrs',
            skillLevel: 'Advanced',
            description: 'CNNs for vision, RNNs/Transformers, backpropagation calculus, PyTorch mastery.',
            category: 'AI/ML',
          },
          {
            id: 'mlops-cloud',
            title: 'MLOps, Model Deployment & Cloud Serving',
            status: 'Pending',
            estimatedHours: '35 hrs',
            skillLevel: 'Advanced',
            description: 'Docker containerization, FastAPI serving, MLflow tracking, AWS EC2 / SageMaker.',
            category: 'Cloud',
          },
          {
            id: 'sys-design-ml',
            title: 'Data System Design & Scalability',
            status: 'Pending',
            estimatedHours: '30 hrs',
            skillLevel: 'Advanced',
            description: 'Designing recommendation feeds, rate limiters, caching layers, low-latency scoring.',
            category: 'Core CS',
          },
        ],
        projects: ['Production Image Classifier with FastAPI & Docker', 'Real-Time Stock Trend Prediction Engine'],
      },
    ],
  },
  {
    yearNumber: 4,
    yearName: 'Placement',
    tagline: 'High-Impact Placements: Technical interviews, System Design, DSA blitz, Mock HR & Live Company Prep.',
    progressPercent: 10,
    badgeColor: 'bg-amber-500 text-white',
    semesters: [
      {
        semesterNumber: 7,
        title: 'Semester 7: Placement Blitz & Capstone Engineering',
        topics: [
          {
            id: 'dsa-revision',
            title: 'DSA Blitz: Top 150 Blind LeetCode Problems',
            status: 'Pending',
            estimatedHours: '60 hrs',
            skillLevel: 'Advanced',
            description: 'Intensive practice of frequently asked interview patterns across FAANG & top tier product firms.',
            category: 'DSA',
          },
          {
            id: 'resume-portfolio',
            title: 'ATS Resume Engineering & GitHub Auditing',
            status: 'In Progress',
            estimatedHours: '15 hrs',
            skillLevel: 'Intermediate',
            description: 'Quantified impact metrics (X-Y-Z formula), clean LaTeX templates, project demos.',
            category: 'Career',
          },
          {
            id: 'tech-interviews',
            title: 'Technical Mock Interviews & Live Coding Drills',
            status: 'Pending',
            estimatedHours: '25 hrs',
            skillLevel: 'Advanced',
            description: 'Live whiteboard sessions, explaining algorithmic complexity clearly to interviewers.',
            category: 'Career',
          },
        ],
        projects: ['Industry Capstone Project with Real-world Client', 'Open Source Contribution to Popular Repo'],
      },
      {
        semesterNumber: 8,
        title: 'Semester 8: Job Offers, Negotiation & Corporate Transition',
        topics: [
          {
            id: 'hr-behavioral',
            title: 'Behavioral Interviews (STAR Method) & HR Rounds',
            status: 'Pending',
            estimatedHours: '20 hrs',
            skillLevel: 'Intermediate',
            description: 'Conflict resolution, leadership scenarios, culture fit, question framing.',
            category: 'Career',
          },
          {
            id: 'offer-eval',
            title: 'Offer Evaluation, Compensation Breakdown & Transition',
            status: 'Pending',
            estimatedHours: '10 hrs',
            skillLevel: 'Beginner',
            description: 'Base salary vs ESOPs, benefits, team evaluation, and onboarding readiness.',
            category: 'Career',
          },
        ],
        projects: ['Final Year Thesis / Production Release', 'Corporate Readiness Certification'],
      },
    ],
  },
];

export const MACHINE_LEARNING_COURSE: Course = {
  id: 'ml-course',
  title: 'Machine Learning',
  careerRole: 'Data Scientist',
  category: 'AI / ML',
  progress: 40,
  totalChapters: 7,
  instructor: 'Dr. Priya Varma (ex-Google AI Researcher)',
  chapters: [
    {
      id: 'ml-ch1',
      chapterNumber: 1,
      title: 'Introduction to ML & Mathematical Intuition',
      duration: '14:20',
      isCompleted: true,
      conceptSummary: 'Understand the difference between traditional rule-based programming and machine learning where models infer rules from data.',
      keyPoints: [
        'Supervised learning requires labeled features and ground truth targets.',
        'Unsupervised learning discovers hidden clusters or latent representations.',
        'Reinforcement learning optimizes an agent acting within an environment.',
      ],
      codeSnippet: `import numpy as np\n# Traditional function vs ML inference\nx = np.array([1, 2, 3, 4])\ny = 2 * x + 1\nprint("Target labels:", y)`,
      exercise: {
        prompt: 'Calculate the mean squared error given true values [3, -0.5, 2, 7] and predictions [2.5, 0.0, 2, 8].',
        starterCode: `import numpy as np\ny_true = np.array([3, -0.5, 2, 7])\ny_pred = np.array([2.5, 0.0, 2, 8])\n# Compute MSE\nmse = np.mean((y_true - y_pred)**2)\nprint("MSE:", round(mse, 4))`,
        expectedOutput: 'MSE: 0.375',
        solution: '0.375',
      },
    },
    {
      id: 'ml-ch2',
      chapterNumber: 2,
      title: 'Supervised Learning & Data Preprocessing',
      duration: '18:45',
      isCompleted: true,
      conceptSummary: 'Handling missing values, one-hot encoding categorical variables, train/test splitting, and feature scaling with StandardScaler.',
      keyPoints: [
        'Data leakage occurs when test set statistics contaminate training preprocessing.',
        'Standardization transforms features to zero mean and unit variance.',
        'Imputation replaces missing values using median or iterative models.',
      ],
      codeSnippet: `from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_train)`,
      exercise: {
        prompt: 'Normalize an array using min-max scaling to bring all values into the [0, 1] range.',
        starterCode: `import numpy as np\ndata = np.array([10, 20, 30, 40, 50])\nscaled = (data - data.min()) / (data.max() - data.min())\nprint(scaled)`,
        expectedOutput: '[0.   0.25 0.5  0.75 1.  ]',
        solution: '[0.   0.25 0.5  0.75 1.  ]',
      },
    },
    {
      id: 'ml-ch3',
      chapterNumber: 3,
      title: 'Regression: Linear, Ridge & Lasso',
      duration: '12:45',
      isCompleted: false,
      conceptSummary: 'Learn about simple and multiple linear regression, cost function minimization via Gradient Descent, Ridge (L2) and Lasso (L1) regularization.',
      keyPoints: [
        'Hypothesis function: y_hat = w * x + b where w is weights and b is bias.',
        'Cost function: Mean Squared Error J(w, b) = 1/(2m) * sum((y_hat - y)^2).',
        'Lasso regression induces sparsity by setting redundant feature weights to exact zero.',
        'R-squared metric evaluates proportion of variance explained by the model.',
      ],
      codeSnippet: `import numpy as np\n\ndef predict_price(size_sqft, bedrooms):\n    # Trained linear weights\n    w_size = 0.45\n    w_beds = 12.0\n    bias = 25.0\n    price = (w_size * size_sqft) + (w_beds * bedrooms) + bias\n    return round(price, 2)\n\nprint("Estimated price:", predict_price(1200, 3))`,
      exercise: {
        prompt: 'Complete the predict_price function to output estimated home prices based on size and bedroom parameters.',
        starterCode: `import numpy as np\n\ndef predict_price(size_sqft, bedrooms):\n    # Compute price = 0.45 * size + 12.0 * bedrooms + 25.0\n    price = (0.45 * size_sqft) + (12.0 * bedrooms) + 25.0\n    return round(price, 2)\n\n# Test with 1500 sqft, 3 bedrooms\nprint(predict_price(1500, 3))`,
        expectedOutput: '736.0',
        solution: '736.0',
      },
    },
    {
      id: 'ml-ch4',
      chapterNumber: 4,
      title: 'Classification & Logistic Regression',
      duration: '21:10',
      isCompleted: false,
      conceptSummary: 'Binary and multi-class classification, Sigmoid activation function, cross-entropy loss, precision, recall, and ROC-AUC curve interpretation.',
      keyPoints: [
        'Sigmoid function maps real-valued outputs to probabilities between 0 and 1.',
        'Confusion matrix identifies True Positives, False Positives, and False Negatives.',
        'ROC-AUC evaluates discriminative threshold power independent of classification cutoff.',
      ],
      codeSnippet: `import numpy as np\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))`,
      exercise: {
        prompt: 'Calculate classification accuracy given 10 predictions where 8 match ground truth.',
        starterCode: `accuracy = 8 / 10\nprint(f"Accuracy: {accuracy * 100}%")`,
        expectedOutput: 'Accuracy: 80.0%',
        solution: 'Accuracy: 80.0%',
      },
    },
    {
      id: 'ml-ch5',
      chapterNumber: 5,
      title: 'Model Evaluation & Cross-Validation',
      duration: '16:30',
      isCompleted: false,
      conceptSummary: 'K-fold cross validation, bias-variance tradeoff diagnostics, learning curves, and stratified sampling for imbalanced datasets.',
      keyPoints: [
        'High bias indicates underfitting; high variance indicates overfitting.',
        'K-Fold Cross Validation averages validation scores across K non-overlapping folds.',
      ],
      codeSnippet: `from sklearn.model_selection import cross_val_score`,
      exercise: {
        prompt: 'Compute average cross-validation score from folds [0.85, 0.88, 0.82, 0.86, 0.84].',
        starterCode: `import numpy as np\nfolds = [0.85, 0.88, 0.82, 0.86, 0.84]\nprint("Mean CV:", round(np.mean(folds), 4))`,
        expectedOutput: 'Mean CV: 0.85',
        solution: '0.85',
      },
    },
    {
      id: 'ml-ch6',
      chapterNumber: 6,
      title: 'Hyperparameter Tuning & Grid Search',
      duration: '19:00',
      isCompleted: false,
      conceptSummary: 'GridSearchCV vs RandomizedSearchCV, Bayesian optimization, learning rates, regularizers, and tree depth optimization.',
      keyPoints: [
        'Hyperparameters are configured prior to model training, unlike learned weights.',
        'Randomized search is computationally superior over exhaustive grids in high dimensions.',
      ],
      codeSnippet: `from sklearn.model_selection import RandomizedSearchCV`,
      exercise: {
        prompt: 'Print total combinations in a grid with 3 learning rates and 4 tree depths.',
        starterCode: `combinations = 3 * 4\nprint("Total combinations:", combinations)`,
        expectedOutput: 'Total combinations: 12',
        solution: '12',
      },
    },
    {
      id: 'ml-ch7',
      chapterNumber: 7,
      title: 'End-to-End Machine Learning Projects',
      duration: '32:15',
      isCompleted: false,
      conceptSummary: 'Packaging models with Joblib, writing unit tests for pipelines, building Streamlit / FastAPI interfaces, and Dockerizing for production.',
      keyPoints: [
        'Persist trained model artifacts using Joblib or ONNX for fast inference.',
        'Validate incoming input schemas using Pydantic models before calling model.predict().',
      ],
      codeSnippet: `import joblib\njoblib.dump(model, "pipeline.joblib")`,
      exercise: {
        prompt: 'Simulate saving model metadata dictionary.',
        starterCode: `meta = {"model": "LinearRegression", "version": "1.0.0"}\nprint(meta["model"])`,
        expectedOutput: 'LinearRegression',
        solution: 'LinearRegression',
      },
    },
  ],
};

export const DSA_ARRAYS_QUIZ: Quiz = {
  id: 'quiz-dsa-arrays',
  title: 'DSA Quiz - Arrays',
  category: 'Data Structures & Algorithms',
  xpReward: 20,
  timeLimitMinutes: 10,
  questions: [
    {
      id: 'q1',
      question: 'What is the worst-case time complexity of accessing an arbitrary element in an array by its index?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      correctIndex: 0,
      explanation: 'Arrays provide direct memory offset address calculation via base address + index * element_size, which executes in constant time O(1).',
      difficulty: 'Easy',
    },
    {
      id: 'q2',
      question: 'What is the time complexity to insert an element at the beginning of an unsorted dynamic array of size n?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      correctIndex: 1,
      explanation: 'Inserting at the beginning requires shifting all n existing elements one position to the right, which takes O(n) time.',
      difficulty: 'Easy',
    },
    {
      id: 'q3',
      question: 'Which algorithmic technique is commonly applied to find a pair of numbers in a sorted array that sums to a target in O(n) time?',
      options: ['Two Pointers approach', 'Depth First Search', 'Greedy algorithm', 'Bit manipulation'],
      correctIndex: 0,
      explanation: 'The Two Pointers technique begins with one pointer at index 0 and another at index n-1, incrementing or decrementing based on comparison with target.',
      difficulty: 'Medium',
    },
    {
      id: 'q4',
      question: 'What is the space complexity of Kadane’s Algorithm for finding the maximum subarray sum?',
      options: ['O(1) auxiliary space', 'O(n) auxiliary space', 'O(log n) space', 'O(n^2) space'],
      correctIndex: 0,
      explanation: 'Kadane’s Algorithm maintains two running scalar variables: max_current and max_global, requiring only O(1) constant auxiliary memory.',
      difficulty: 'Medium',
    },
    {
      id: 'q5',
      question: 'In a 2D array matrix[M][N] stored in Row-Major order in C/C++, how is the memory address of element [i][j] computed?',
      options: [
        'base + (i * N + j) * size',
        'base + (j * M + i) * size',
        'base + (i + j) * size',
        'base + (i * M + j) * size',
      ],
      correctIndex: 0,
      explanation: 'Row-major storage lays consecutive rows in memory; so row i has i * N elements preceding it, plus j columns into the current row.',
      difficulty: 'Hard',
    },
    {
      id: 'q6',
      question: 'What is the amortized time complexity of appending an element to the end of a dynamic array (like std::vector or Python list)?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      correctIndex: 0,
      explanation: 'While resizing requires copying O(n) elements, geometric doubling (typically 1.5x or 2x) guarantees an amortized constant time O(1) per push.',
      difficulty: 'Easy',
    },
    {
      id: 'q7',
      question: 'Given an array of size n containing numbers from 1 to n with exactly one duplicate and one missing number, which approach achieves O(n) time and O(1) extra space?',
      options: [
        'Mathematical sum & sum-of-squares formula or XOR matching',
        'Hash set lookup',
        'Sorting the array using MergeSort',
        'Nested linear scans',
      ],
      correctIndex: 0,
      explanation: 'Using the algebraic sum n(n+1)/2 and sum of squares n(n+1)(2n+1)/6 or index negation allows solving in O(n) time with zero extra space.',
      difficulty: 'Hard',
    },
    {
      id: 'q8',
      question: 'In Dutch National Flag algorithm for sorting an array of 0s, 1s, and 2s, what are the three pointers typically named?',
      options: ['low, mid, high', 'left, center, right', 'start, pivot, end', 'first, second, third'],
      correctIndex: 0,
      explanation: 'The three pointers low, mid, and high partition the array into four regions: 0s before low, 1s between low and mid, unexamined between mid and high, and 2s above high.',
      difficulty: 'Medium',
    },
    {
      id: 'q9',
      question: 'Which of the following operations cannot be performed in O(1) on a circular buffer (ring buffer) array implementation?',
      options: [
        'Searching for an arbitrary element value',
        'Enqueuing an element at tail',
        'Dequeuing an element from head',
        'Checking if the buffer is empty',
      ],
      correctIndex: 0,
      explanation: 'Searching for a value still requires iterating through all active elements, taking O(n) time, whereas head/tail pointer operations are O(1).',
      difficulty: 'Easy',
    },
    {
      id: 'q10',
      question: 'What is the optimal time complexity to find the median of two sorted arrays of sizes m and n?',
      options: ['O(log(min(m, n)))', 'O(m + n)', 'O(log(m + n))', 'O(m * n)'],
      correctIndex: 0,
      explanation: 'Using binary search on the partition cut of the smaller array allows finding the median in O(log(min(m, n))) logarithmic time.',
      difficulty: 'Hard',
    },
  ],
};

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob-1',
    number: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptance: '48%',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    inputFormat: 'nums = [2,7,11,15], target = 9',
    outputFormat: '[0,1]',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6, return [1, 2].',
      },
    ],
    starterCodes: {
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []

# Run test
sol = Solution()
print(sol.twoSum([2, 7, 11, 15], 9))`,
      cpp: `#include <vector>
#include <unordered_map>
#include <iostream>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); ++i) {
        int comp = target - nums[i];
        if (map.count(comp)) return {map[comp], i};
        map[nums[i]] = i;
    }
    return {};
}`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                return new int[]{map.get(comp), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));`,
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', expectedOutput: '[0, 1]' },
    ],
    hints: [
      'Can you use a Hash Map to check if target - current number has been seen already?',
      'Iterate through the array once and store each value along with its index in the hash table.',
    ],
  },
  {
    id: 'prob-2',
    number: 2,
    title: 'Valid Parentheses',
    difficulty: 'Medium',
    category: 'Stack',
    acceptance: '67%',
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets must be closed by the same type of brackets and open brackets must be closed in the correct order.",
    inputFormat: "s = '()[]{}'",
    outputFormat: 'true',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.',
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    starterCodes: {
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack

sol = Solution()
print(sol.isValid("()[]{}"))`,
      cpp: `#include <stack>
#include <string>

bool isValid(std::string s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`,
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      javascript: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (!pairs[char]) {
            stack.push(char);
        } else if (stack.pop() !== pairs[char]) {
            return false;
        }
    }
    return stack.length === 0;
}

console.log(isValid("()[]{}"));`,
    },
    testCases: [
      { input: 's = "()"', expectedOutput: 'True' },
      { input: 's = "()[]{}"', expectedOutput: 'True' },
      { input: 's = "(]"', expectedOutput: 'False' },
    ],
    hints: [
      'Use a Last-In-First-Out (LIFO) Stack data structure.',
      'When an opening bracket arrives, push it. When a closing bracket arrives, verify it matches the popped element.',
    ],
  },
  {
    id: 'prob-3',
    number: 3,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Medium',
    category: 'Linked List',
    acceptance: '62%',
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    inputFormat: 'list1 = [1,2,4], list2 = [1,3,4]',
    outputFormat: '[1,1,2,3,4,4]',
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.',
    ],
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
      },
    ],
    starterCodes: {
      python: `# Definition for singly-linked list node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, l1, l2):
        dummy = ListNode(0)
        curr = dummy
        while l1 and l2:
            if l1.val <= l2.val:
                curr.next = l1
                l1 = l1.next
            else:
                curr.next = l2
                l2 = l2.next
            curr = curr.next
        curr.next = l1 if l1 else l2
        return dummy.next

print("Merged successfully: [1, 1, 2, 3, 4, 4]")`,
      cpp: `struct ListNode { int val; ListNode *next; };`,
      java: `class ListNode { int val; ListNode next; }`,
      javascript: `function mergeTwoLists(l1, l2) { /* implementation */ }`,
    },
    testCases: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', expectedOutput: '[1, 1, 2, 3, 4, 4]' },
      { input: 'list1 = [], list2 = []', expectedOutput: '[]' },
      { input: 'list1 = [], list2 = [0]', expectedOutput: '[0]' },
    ],
    hints: [
      'Create a dummy node that acts as the anchor for the new head.',
      'Compare current values and advance the pointer on whichever node was smaller.',
    ],
  },
  {
    id: 'prob-4',
    number: 4,
    title: 'Maximum Subarray (Kadane’s)',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptance: '51%',
    description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    inputFormat: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
    outputFormat: '6',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
    ],
    starterCodes: {
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        cur_sum = max_sum = nums[0]
        for num in nums[1:]:
            cur_sum = max(num, cur_sum + num)
            max_sum = max(max_sum, cur_sum)
        return max_sum

sol = Solution()
print(sol.maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`,
      cpp: `int maxSubArray(vector<int>& nums) { /* Kadane's */ }`,
      java: `public int maxSubArray(int[] nums) { /* Kadane's */ }`,
      javascript: `function maxSubArray(nums) { /* Kadane's */ }`,
    },
    testCases: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: 'nums = [1]', expectedOutput: '1' },
      { input: 'nums = [5,4,-1,7,8]', expectedOutput: '23' },
    ],
    hints: [
      'If current running sum drops below 0, does extending it help future elements?',
    ],
  },
  {
    id: 'prob-5',
    number: 5,
    title: 'SQL: Second Highest Salary',
    difficulty: 'Medium',
    category: 'SQL & Database',
    acceptance: '39%',
    description: 'Write an SQL query to report the second highest distinct salary from the Employee table. If there is no second highest salary, the query should report null.',
    inputFormat: 'Employee: id, salary',
    outputFormat: 'SecondHighestSalary',
    constraints: ['Employee table contains id (PK) and salary (INT).'],
    examples: [
      { input: 'Salaries: [100, 200, 300]', output: '200' },
    ],
    starterCodes: {
      python: `-- SQL Solution
SELECT (
    SELECT DISTINCT salary 
    FROM Employee 
    ORDER BY salary DESC 
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
      cpp: `-- SQL Query`,
      java: `-- SQL Query`,
      javascript: `-- SQL Query`,
    },
    testCases: [
      { input: 'Employee: [100, 200, 300]', expectedOutput: '200' },
      { input: 'Employee: [100]', expectedOutput: 'null' },
    ],
    hints: [
      'Can you use LIMIT 1 OFFSET 1 with a subquery wrapper to handle the NULL fallback gracefully?',
    ],
  },
];

export const RECOMMENDED_PROJECTS: ProjectGuideItem[] = [
  {
    id: 'proj-student-perf',
    title: 'Student Performance Prediction',
    category: 'Data Science',
    difficulty: 'Beginner',
    techStack: ['Python', 'Pandas', 'Matplotlib', 'Scikit-Learn'],
    duration: '2 Weeks (15 hrs)',
    description: 'Predict student final exam grades using demographic, study habits, and past attendance data with multi-variable linear regression.',
    objectives: [
      'Clean tabular real-world CSV dataset with missing fields',
      'Perform exploratory correlation analysis and heatmaps',
      'Train and evaluate regression model using R-squared & MAE',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Understand the Problem & Business Value',
        description: 'Define the objective: assist academic counselors by identifying at-risk students 8 weeks before final semester exams.',
        checklist: ['Formulate problem statement', 'Define primary KPI: Mean Absolute Error under 2.5 marks', 'Review ethical considerations around student privacy'],
        resources: [
          { name: 'Kaggle Student Performance Dataset', url: '#', type: 'doc' },
          { name: 'Problem Formulation Whitepaper', url: '#', type: 'doc' },
        ],
      },
      {
        stepNumber: 2,
        title: 'Collect & Inspect the Dataset',
        description: 'Download the 1,000-row student demographic and academic performance records dataset from Kaggle.',
        checklist: ['Verify schema columns (G1, G2, G3, studytime, failures, absences)', 'Inspect shape and data types with df.info()'],
        resources: [{ name: 'Pandas Data Loading Guide', url: '#', type: 'video' }],
      },
      {
        stepNumber: 3,
        title: 'Data Cleaning & Preprocessing',
        description: 'Handle missing values, encode ordinal categorical features (e.g. study time buckets), and eliminate duplicate rows.',
        checklist: ['Fill null values with median for numeric columns', 'Use pd.get_dummies() for nominal categories', 'Check for outlier student absences'],
        resources: [{ name: 'Scikit-Learn Preprocessing Docs', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 4,
        title: 'Exploratory Data Analysis (EDA)',
        description: 'Plot distribution of grades, correlation matrix heatmap, and scatter plots between study time vs target score.',
        checklist: ['Generate Seaborn pairplot', 'Identify top 3 positive correlation features', 'Document insights in Jupyter Notebook'],
        resources: [{ name: 'Seaborn Heatmap Cheatsheet', url: '#', type: 'code' }],
      },
      {
        stepNumber: 5,
        title: 'Feature Engineering',
        description: 'Create interaction terms such as study_time_to_absence_ratio and previous_grade_trend = (G2 - G1).',
        checklist: ['Normalize continuous columns with StandardScaler', 'Separate features X and target vector y'],
        resources: [{ name: 'Feature Engineering Best Practices', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 6,
        title: 'Train ML Model (Linear & Ridge Regression)',
        description: 'Split data 80/20 train/test, fit Scikit-Learn LinearRegression, and compare with Ridge Regularization.',
        checklist: ['Compute train vs test loss to check for overfitting', 'Tune regularization alpha parameter'],
        resources: [{ name: 'Linear Models User Guide', url: '#', type: 'code' }],
      },
      {
        stepNumber: 7,
        title: 'Evaluate Model Performance',
        description: 'Compute Mean Squared Error (MSE), RMSE, and R2 Score on the unseen test set.',
        checklist: ['Verify R2 > 0.82', 'Plot residuals histogram to ensure normal distribution'],
        resources: [{ name: 'Model Evaluation Metrics Guide', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 8,
        title: 'Build Web Application with Streamlit',
        description: 'Create an interactive web interface where counselors can input student hours and receive real-time grade predictions.',
        checklist: ['Build sliders and dropdowns in Streamlit', 'Hook predictions to loaded pipeline.pkl'],
        resources: [{ name: 'Streamlit in 15 Minutes', url: '#', type: 'video' }],
      },
      {
        stepNumber: 9,
        title: 'Deploy to Cloud & Document GitHub Readme',
        description: 'Host the web app on Streamlit Cloud or Hugging Face Spaces and write a recruiters-ready README with architecture diagram.',
        checklist: ['Add requirements.txt', 'Deploy publicly accessible live URL', 'Record 60-second video demo for LinkedIn'],
        resources: [{ name: 'GitHub Markdown Template', url: '#', type: 'code' }],
      },
    ],
  },
  {
    id: 'proj-churn-prediction',
    title: 'Customer Churn Prediction',
    category: 'Data Science',
    difficulty: 'Intermediate',
    techStack: ['Python', 'SQL', 'XGBoost', 'FastAPI', 'Docker'],
    duration: '3 Weeks (25 hrs)',
    description: 'Predict customer churn in a telecom company using historical usage, billing details, and contract patterns to boost retention.',
    objectives: [
      'Extract data using complex analytical SQL queries with Window Functions',
      'Train gradient boosted trees (XGBoost / Random Forest)',
      'Deploy REST inference endpoint with FastAPI and Docker container',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Understand the Problem & Telecom Metrics',
        description: 'Customer churn costs 5x more than acquisition. Build an early warning classification model with high Recall.',
        checklist: ['Define churn: no renewal within 30 days', 'Set target metric: Recall >= 0.78 on minority churn class'],
        resources: [{ name: 'Telecom Retention Playbook', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 2,
        title: 'Collect Dataset & Execute SQL Extraction',
        description: 'Query relational tables (customers, subscriptions, support tickets) with JOINs and aggregations.',
        checklist: ['Extract features: tenure, monthly charges, contract type', 'Store extracted dataset as parquet for speed'],
        resources: [{ name: 'Advanced SQL Query Patterns', url: '#', type: 'code' }],
      },
      {
        stepNumber: 3,
        title: 'Data Cleaning & Imbalance Handling (SMOTE)',
        description: 'Only 26% of customers churn, creating class imbalance. Apply SMOTE or class weights.',
        checklist: ['Check value_counts of target variable', 'Apply SMOTE only on training fold'],
        resources: [{ name: 'Imbalanced-Learn Docs', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 4,
        title: 'Exploratory Data Analysis (EDA)',
        description: 'Identify that month-to-month contracts and fiber optic users without tech support show 4x higher churn.',
        checklist: ['Analyze churn rate across tenure quartiles', 'Generate publication-quality charts'],
        resources: [{ name: 'EDA Notebook Template', url: '#', type: 'code' }],
      },
      {
        stepNumber: 5,
        title: 'Feature Engineering & SHAP Values',
        description: 'Extract total spend per tenure month and calculate SHAP feature importance for explainable AI.',
        checklist: ['Compute SHAP summary plots', 'Remove high multicollinearity features using VIF'],
        resources: [{ name: 'SHAP Explainability Docs', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 6,
        title: 'Train XGBoost & Random Forest Models',
        description: 'Fit tree ensemble classifiers and optimize log loss and ROC-AUC curve.',
        checklist: ['Tune max_depth, learning_rate, n_estimators', 'Benchmark against Logistic Regression baseline'],
        resources: [{ name: 'XGBoost Python API Guide', url: '#', type: 'video' }],
      },
      {
        stepNumber: 7,
        title: 'Evaluate Model & Cost-Benefit Matrix',
        description: 'Calculate dollar savings from proactive retention discounts based on model confusion matrix.',
        checklist: ['Evaluate Precision-Recall Curve', 'Select optimal probability decision threshold'],
        resources: [{ name: 'Business Value of ML Models', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 8,
        title: 'Build Web API with FastAPI & Pydantic',
        description: 'Expose a POST /predict endpoint that accepts customer JSON payload and returns churn probability.',
        checklist: ['Write Pydantic schema validation', 'Add automated test with Pytest'],
        resources: [{ name: 'FastAPI Tutorial', url: '#', type: 'code' }],
      },
      {
        stepNumber: 9,
        title: 'Containerize with Docker & Deploy',
        description: 'Write a multi-stage Dockerfile and deploy the container on cloud hosting.',
        checklist: ['Build Docker image under 300MB', 'Verify curl request on public endpoint', 'Publish to GitHub with demo GIF'],
        resources: [{ name: 'Docker Best Practices', url: '#', type: 'doc' }],
      },
    ],
  },
  {
    id: 'proj-fraud-detection',
    title: 'Financial Fraud Detection System',
    category: 'AI / ML',
    difficulty: 'Advanced',
    techStack: ['Python', 'PyTorch', 'Kafka', 'GCP', 'PostgreSQL'],
    duration: '4 Weeks (35 hrs)',
    description: 'Detect fraudulent credit card transactions in under 50ms using anomaly detection, graph features, and streaming data.',
    objectives: [
      'Handle extreme class imbalance (0.17% fraud rate)',
      'Engineer geospatial velocity & historical spending deviation features',
      'Design low latency inference microservice with Redis caching',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Understand the Problem & Real-Time Constraints',
        description: 'Every payment must be scored under 50ms. False alarms frustrate cardholders while missed fraud incurs direct liability.',
        checklist: ['Establish SLA: p99 latency < 50ms', 'Set target: AUPRC > 0.85'],
        resources: [{ name: 'Financial Fraud Engineering Patterns', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 2,
        title: 'Collect Dataset & Anonymized PCA Features',
        description: 'Load Kaggle European Credit Card transactions dataset with 284,807 transactions.',
        checklist: ['Review Time, Amount, and V1-V28 PCA features', 'Examine extreme 492 fraud cases'],
        resources: [{ name: 'Credit Card Dataset Details', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 3,
        title: 'Data Cleaning & Robust Scaling',
        description: 'Amount feature has massive outliers. Apply RobustScaler based on interquartile range.',
        checklist: ['Scale Amount and Time features', 'Verify zero data leakage in stratified split'],
        resources: [{ name: 'RobustScaler Guide', url: '#', type: 'code' }],
      },
      {
        stepNumber: 4,
        title: 'Exploratory Anomaly Analysis',
        description: 'Analyze distribution differences between genuine and fraudulent transaction vectors.',
        checklist: ['Plot t-SNE 2D manifold projection', 'Analyze transaction frequency spikes'],
        resources: [{ name: 't-SNE Visualization Notebook', url: '#', type: 'code' }],
      },
      {
        stepNumber: 5,
        title: 'Feature Engineering: Velocity & Geo-distance',
        description: 'Compute speed between consecutive transactions to catch impossible travel violations.',
        checklist: ['Create rolling 1-hour and 24-hour spending sum', 'Flag midnight transaction anomalies'],
        resources: [{ name: 'Streaming Feature Store Design', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 6,
        title: 'Train Autoencoder & Isolation Forest',
        description: 'Train unsupervised Autoencoder on normal transactions to flag reconstruction errors as anomalies.',
        checklist: ['Build 4-layer PyTorch Autoencoder', 'Combine with LightGBM supervised ensemble'],
        resources: [{ name: 'PyTorch Autoencoder Architecture', url: '#', type: 'code' }],
      },
      {
        stepNumber: 7,
        title: 'Evaluate Model with Precision-Recall AUC',
        description: 'ROC-AUC is misleading on 0.1% fraud; use Area Under Precision-Recall Curve (AUPRC).',
        checklist: ['Document AUPRC score', 'Establish fallback manual review queue rules'],
        resources: [{ name: 'Precision-Recall Metrics Whitepaper', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 8,
        title: 'Build Streaming Scoring Pipeline',
        description: 'Simulate high-velocity payment stream through Redis queue and score with worker daemon.',
        checklist: ['Measure roundtrip latency under 45ms', 'Implement Redis sliding window rate counters'],
        resources: [{ name: 'Redis Low-Latency Caching Guide', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 9,
        title: 'Deploy to Cloud & Architecture Diagram',
        description: 'Deploy on GCP / AWS with CI/CD pipeline, logging, and comprehensive system diagram.',
        checklist: ['Create system architecture graphic', 'Publish repository with MIT license', 'Add benchmark stress test script'],
        resources: [{ name: 'Production DevOps Architecture', url: '#', type: 'doc' }],
      },
    ],
  },
  {
    id: 'proj-fullstack-ecommerce',
    title: 'Full Stack E-Commerce Engine',
    category: 'Web Dev',
    difficulty: 'Intermediate',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'TailwindCSS'],
    duration: '3 Weeks (25 hrs)',
    description: 'Production-ready online store with product filtering, cart state management, checkout, order fulfillment and admin metrics.',
    objectives: [
      'Relational database design with Prisma and PostgreSQL',
      'Secure Stripe payment intents & webhook reconciliation',
      'Optimized client performance with responsive UI',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Understand Requirements & Entity Relationship Diagram',
        description: 'Define models for Users, Products, Categories, Orders, OrderItems, and PaymentIntents.',
        checklist: ['Design relational schema in dbdiagram.io', 'Ensure foreign key cascade rules'],
        resources: [{ name: 'E-commerce Schema Best Practices', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 2,
        title: 'Setup Database & Prisma ORM',
        description: 'Provision PostgreSQL database, write Prisma models, and execute initial migration.',
        checklist: ['Write schema.prisma file', 'Seed 20 test products with mock images and pricing'],
        resources: [{ name: 'Prisma Setup Guide', url: '#', type: 'code' }],
      },
      {
        stepNumber: 3,
        title: 'Build Authentication & User Roles (JWT)',
        description: 'Implement JWT authentication with access/refresh tokens and role-based permissions (Customer vs Admin).',
        checklist: ['Hash passwords with bcrypt', 'Protect /api/admin routes with middleware'],
        resources: [{ name: 'Secure JWT Flow', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 4,
        title: 'Implement Product Catalog & Filters',
        description: 'Build fast full-text search, category tags, price sliders, and pagination on server side.',
        checklist: ['Write SQL indexed search query', 'Implement debounced client search bar'],
        resources: [{ name: 'Pagination & Filtering Patterns', url: '#', type: 'code' }],
      },
      {
        stepNumber: 5,
        title: 'Develop Shopping Cart & Persistent State',
        description: 'Manage cart items with React Context or Zustand, persisting state in localStorage.',
        checklist: ['Handle quantity increments and stock limits', 'Calculate tax and shipping dynamically'],
        resources: [{ name: 'Zustand State Management Guide', url: '#', type: 'video' }],
      },
      {
        stepNumber: 6,
        title: 'Integrate Stripe Checkout & Webhooks',
        description: 'Create secure Stripe PaymentIntents on the backend and listen to charge.succeeded webhooks.',
        checklist: ['Verify webhook signing secret', 'Update order status to Paid in database'],
        resources: [{ name: 'Stripe API Docs', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 7,
        title: 'Build Admin Dashboard & Analytics',
        description: 'Provide store owners with sales trends charts, top selling products, and inventory restock alerts.',
        checklist: ['Aggregate daily revenue with SQL GROUP BY', 'Render sales charts with Recharts'],
        resources: [{ name: 'Admin Dashboard Blueprint', url: '#', type: 'code' }],
      },
      {
        stepNumber: 8,
        title: 'Security Auditing & Performance Optimization',
        description: 'Add Helmet HTTP headers, CORS whitelisting, rate limiting with express-rate-limit, and image optimization.',
        checklist: ['Audit with Lighthouse (>90 score)', 'Sanitize user inputs against XSS and SQL injection'],
        resources: [{ name: 'OWASP Top 10 Web Security', url: '#', type: 'doc' }],
      },
      {
        stepNumber: 9,
        title: 'Deploy to Cloud & Live Demo',
        description: 'Deploy frontend on Vercel and backend on Render / Fly.io, configuring environment variables.',
        checklist: ['Configure production DATABASE_URL', 'Test live end-to-end checkout with Stripe test card'],
        resources: [{ name: 'Vercel & Render Deployment Guide', url: '#', type: 'doc' }],
      },
    ],
  },
];

export const NOTIFICATIONS_LIST = [
  {
    id: 'notif-1',
    title: 'SQL Assessment Updated',
    message: 'Your SQL quiz score improved by 12% after completing Chapter 2 drills!',
    time: '2 hours ago',
    type: 'success',
  },
  {
    id: 'notif-2',
    title: 'Weekly Coding Milestone',
    message: 'You completed 3 coding problems this week. Keep your 6-day streak alive!',
    time: 'Yesterday',
    type: 'streak',
  },
  {
    id: 'notif-3',
    title: 'AI Recommendation',
    message: 'Your next recommended topic is Statistics for Data Science to bridge your 28% skill gap.',
    time: '2 days ago',
    type: 'recommendation',
  },
  {
    id: 'notif-4',
    title: 'Career Readiness Score',
    message: 'You are now 72% ready for your target role: Data Scientist (+4% this month).',
    time: '3 days ago',
    type: 'career',
  },
];

export const BADGES_LIST = [
  { id: 'b1', name: 'Python Pioneer', desc: 'Completed Python Fundamentals & 10 exercises', icon: '🐍', unlocked: true },
  { id: 'b2', name: 'DSA Starter', desc: 'Solved 15 Data Structure problems', icon: '⚡', unlocked: true },
  { id: 'b3', name: 'SQL Explorer', desc: 'Scored 80%+ on SQL joins quiz', icon: '🗄️', unlocked: true },
  { id: 'b4', name: 'Project Builder', desc: 'Initialized your first major capstone project', icon: '🛠️', unlocked: true },
  { id: 'b5', name: 'Streak Warrior', desc: 'Maintained a 6-day uninterrupted study streak', icon: '🔥', unlocked: true },
  { id: 'b6', name: 'Career Ready', desc: 'Reach 80%+ Career Readiness Score in target role', icon: '🎓', unlocked: false },
];
