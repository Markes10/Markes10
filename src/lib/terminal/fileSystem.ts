import { FSNode } from './types';

export const fileSystem: FSNode = {
  name: '/',
  type: 'directory',
  children: {
    about: {
      name: 'about',
      type: 'directory',
      children: {
        'summary.txt': {
          name: 'summary.txt',
          type: 'file',
          content: `Dweepan Gain is a Computer Science engineer with hands-on experience across
full-stack development, machine learning, and data-driven AI systems.
He specializes in LLM integration, agentic AI, prompt engineering, and NLP-powered
applications, with practical experience in SQL-based analysis, data visualization,
and exploratory data analysis.

With a track record of building end-to-end web applications, predictive models,
and automation workflows using React, FastAPI, Python, and LangChain, Dweepan
combines technical depth with product-minded execution. Backed by four internships
and seven self-driven projects, he thrives on translating research concepts into
real-world, production-ready solutions.`,
        },
      },
    },
    experience: {
      name: 'experience',
      type: 'directory',
      children: {
        'labmentix.txt': {
          name: 'labmentix.txt',
          type: 'file',
          content: `[Labmentix Pvt. Ltd.] -- AI/ML Intern
October 2025 - April 2026  |  Remote

- Worked on AI/ML research and development projects covering model training,
  evaluation, and deployment.
- Applied supervised and unsupervised learning techniques to real-world datasets
  and contributed to production-grade AI pipelines.
- Collaborated with cross-functional teams to integrate ML models into scalable
  software systems.`,
        },
        'demerg-systems.txt': {
          name: 'demerg-systems.txt',
          type: 'file',
          content: `[Demerg Systems India] -- Full Stack Developer
July 2025 - September 2025  |  Remote

- Completed an 8-week in-plant training in full-stack development focused on
  professional software standards.
- Followed industry-standard development practices and delivered all assigned
  tasks on schedule.`,
        },
        'jyesta.txt': {
          name: 'jyesta.txt',
          type: 'file',
          content: `[JYESTA Corporate Entity] -- Machine Learning Intern
July 2025 - September 2025  |  Remote

- Completed certified training in supervised and unsupervised learning, data
  preprocessing, regression, and classification.
- Applied machine learning algorithms in Python to real-world datasets, building
  and evaluating predictive models against standard metrics.`,
        },
        'tentwenty-digital.txt': {
          name: 'tentwenty-digital.txt',
          type: 'file',
          content: `[Tentwenty Digital LLP] -- Frontend Developer Intern
August 2022 - October 2022  |  Goa

- Built responsive web interfaces using HTML, CSS, and JavaScript in a
  professional development environment.
- Recognized by management for initiative and creative problem-solving in
  frontend development.`,
        },
      },
    },
    projects: {
      name: 'projects',
      type: 'directory',
      children: {
        'ai-crm-pim-platform.txt': {
          name: 'ai-crm-pim-platform.txt',
          type: 'file',
          content: `[AI CRM + PIM Platform]

2025 - 2026 | FastAPI, React, Vite, Python, NLP, AI Agents, WooCommerce

- Built a full-stack CRM and PIM system with customer management, order tracking,
  and AI-driven insights for sales decisions.
- Built the PIM module for product creation and update, semantic search, and an
  AI onboarding agent.
- Added a chat assistant with optional WooCommerce sync.
- GitHub: github.com/Markes10/Revenue-Operations-AI-CRM-PIM`,
        },
        'ai-email-assistant.txt': {
          name: 'ai-email-assistant.txt',
          type: 'file',
          content: `[AI Email Assistant]

January 2025 - March 2025 | Python, FastAPI, React, LangChain, NLP

- Built an AI-powered email assistant that drafts, analyzes, and manages
  professional email using LLM-based NLP.
- Implemented context-aware response generation and tone adjustment to match
  professional communication standards.
- GitHub: github.com/Markes10/AI-EMAIL-ASSISTANT`,
        },
        'ai-resume-analyzer.txt': {
          name: 'ai-resume-analyzer.txt',
          type: 'file',
          content: `[AI-Powered Resume Analyzer]

July 2025 - September 2025 | FastAPI, React, TypeScript, Python, Scikit-learn, NLP, JWT

- Built a full-stack web app that scores resumes against job descriptions using
  NLP-based keyword extraction and skill-gap analysis.
- Added JWT authentication, PDF export, a monitoring dashboard, and a CI/CD
  pipeline for deployment.
- GitHub: github.com/Markes10/AI-POWERED-RESUME-ANALYZER`,
        },
        'fraud-detection-system.txt': {
          name: 'fraud-detection-system.txt',
          type: 'file',
          content: `[Fraud Detection System]

April 2025 - June 2025 | Python, Machine Learning, Deep Learning (CNN, RNN, Transformers)

- Researched and implemented rule-based, anomaly-detection, and supervised/
  unsupervised ML approaches to transaction fraud detection.
- Explored explainable AI (XAI) for model transparency and analyzed common attack
  vectors including phishing, malware, and domain spoofing.`,
        },
        'medical-report-analyzer.txt': {
          name: 'medical-report-analyzer.txt',
          type: 'file',
          content: `[Medical Report Analyzer]

January 2025 - March 2025 | Python, Machine Learning, NLP, OCR (Tesseract), FastAPI, JWT

- Built a system that extracts structured data from medical PDFs, scanned images,
  and DOCX files via OCR and automated parsing.
- Predicted likely conditions with confidence scores and ICD-10 mapping.
- Secured the pipeline with JWT authentication, AES encryption, and audit logging.
- GitHub: github.com/Markes10/MEDICAL-REPORT-ANAL`,
        },
        'secure-chat-application.txt': {
          name: 'secure-chat-application.txt',
          type: 'file',
          content: `[Secure Chat Application]

January 2025 - March 2025 | JavaScript, Socket.io, JWT, AES + RSA, Docker

- Built a real-time, end-to-end encrypted messaging platform with voice messaging
  and cloud storage.
- Implemented hybrid AES + RSA encryption with digital signatures and an admin
  dashboard.
- Deployed via Docker Compose.
- GitHub: github.com/Markes10/SECURE-CHAT-APP`,
        },
        'social-media-monitoring.txt': {
          name: 'social-media-monitoring.txt',
          type: 'file',
          content: `[Social Media Monitoring Tool]

October 2024 - December 2024 | Python, NLP, Data Visualization, APIs

- Built a pipeline to scrape social media content, run sentiment analysis, and
  surface brand-insight dashboards.
- Automated keyword-tracking reports and engagement-metric visualizations.
- GitHub: github.com/Markes10/Social-media-monitoring-smm-tool`,
        },
        'smart-tire-analyzer.txt': {
          name: 'smart-tire-analyzer.txt',
          type: 'file',
          content: `[Smart Tire Analyzer]

2024 | Python, Computer Vision (OpenCV)

- Built an image-based tool to classify tire condition using a limited
  single-category dataset as an early-stage proof of concept.
- GitHub: github.com/Markes10/smart-tire-analyzer`,
        },
        'ai-council.txt': {
          name: 'ai-council.txt',
          type: 'file',
          content: `[AI Council - Multi-Agent Orchestration System]

2025 | Python, FastAPI, React, Streamlit, ChromaDB, Ollama, RAG

- Built a full-stack multi-agent AI orchestration platform where a chief agent
  decomposes tasks and delegates to specialized agents.
- Implemented a router, task manager, workflow engine, and response merger with
  RAG pipeline using ChromaDB for retrieval.
- GitHub: github.com/Markes10/AI-PROJECT-COUNCIL`,
        },
      },
    },
    skills: {
      name: 'skills',
      type: 'directory',
      children: {
        'skills.txt': {
          name: 'skills.txt',
          type: 'file',
          content: `[Technical Skills]

Programming Languages
  Python, JavaScript, TypeScript, Java, C, C++, PHP, R, Rust, Kotlin

AI / LLM
  LangChain, Prompt Engineering, Agentic AI, LLM Integration,
  Hugging Face, Natural Language Processing (NLP)

Machine Learning
  Scikit-learn, TensorFlow, PyTorch, Deep Learning (RNN, LSTM, CNN, Transformers),
  Classification, Regression, Clustering, Recommendation Systems

Data and Analytics
  SQL, Exploratory Data Analysis, Data Cleaning and Preprocessing,
  Feature Engineering, Data Visualization, NumPy, Pandas, OpenCV

Web Development
  React, FastAPI, Node.js, Socket.io, Laravel, Streamlit,
  HTML5, CSS3, Tailwind CSS, Bootstrap, Vite, REST APIs

Databases, Cloud and DevOps
  MySQL, Snowflake, Git, Docker, CI/CD, Microsoft Azure, Firebase,
  Prometheus, JWT, bcrypt

Systems / Compilers
  Rust, Go, Haskell, Assembly, LLVM IR, MLIR, ANTLR, C, C++, CUDA

Formal Methods / Verification
  Coq, Lean, F*, Dafny, TLA+, GAP

Logic / Symbolic / Query Languages
  Prolog, Lisp, Cypher, XQuery, Wolfram Language

Hardware / Graphics / CAD
  Verilog, SystemVerilog, GLSL, OpenSCAD

Scientific / Data
  Julia, Cython, WDL

Enterprise / Platform-Specific
  ABAP, AL, Apex (Salesforce), ASP.NET

Security / Specialized
  YARA, OPA (Rego), CodeQL, CIRCOM, Q#`,
        },
      },
    },
    education: {
      name: 'education',
      type: 'directory',
      children: {
        'education.txt': {
          name: 'education.txt',
          type: 'file',
          content: `[Education]

Bachelor of Engineering -- Computer Science
  Agnel Institute of Technology and Design
  2023 - 2026

Diploma -- Computer Science and Engineering
  Government Polytechnic, Panaji
  2021 - 2024
  Result: 67.75%

Secondary (Class X) -- CBSE
  Kendriya Vidyalaya No. 1, Vasco Da Gama, Goa
  2017
  Result: 76.00%`,
        },
      },
    },
    contact: {
      name: 'contact',
      type: 'directory',
      children: {
        'contact.txt': {
          name: 'contact.txt',
          type: 'file',
          content: `[Contact]

Email:   dweepangain11dec99@gmail.com
Phone:   +91 8485841623
LinkedIn: linkedin.com/in/dweepan-gain-b32594175
GitHub:  https://github.com/Markes10
Location: Vasco Da Gama, Goa, India`,
        },
      },
    },
  },
};
