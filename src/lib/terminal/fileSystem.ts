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
          content: `Dweepan Gain is a results-driven AI/ML Engineer based in Vasco Da Gama, Goa, India,
specializing in the design and deployment of production-grade intelligent systems.
With a strong foundation in full-stack development and deep expertise in large language
models, natural language processing, and machine learning, Dweepan builds end-to-end
solutions that bridge the gap between cutting-edge research and real-world business
impact.

His portfolio spans AI-powered CRM platforms, email assistants, resume analyzers,
fraud detection pipelines, medical report processing systems, and secure communication
tools -- each reflecting a commitment to clean architecture, scalable design, and
user-centric engineering. Dweepan thrives at the intersection of software engineering
and artificial intelligence, turning complex problems into elegant, deployable products.`,
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
          content: `[Labmentix] -- AI/ML Engineer
Jan 2024 - Present  |  Remote

- Architected and deployed an AI-powered CRM + PIM platform serving enterprise clients,
  integrating LLM-based data extraction, NLP pipelines, and intelligent automation.
- Built end-to-end ML pipelines for product information management, reducing manual
  data entry effort by 60% across client operations.
- Designed RESTful APIs and microservices architecture handling 10K+ daily requests
  with sub-200ms response times.
- Led prompt engineering initiatives for GPT-4 and custom fine-tuned models, improving
  extraction accuracy from 72% to 94% on domain-specific documents.
- Collaborated with cross-functional teams to define product requirements and translate
  business logic into scalable AI solutions.`,
        },
        'demerg-systems.txt': {
          name: 'demerg-systems.txt',
          type: 'file',
          content: `[Demerg Systems] -- Software Developer
Jun 2023 - Dec 2023  |  Bangalore, India

- Developed and maintained full-stack web applications using React, Node.js, and
  PostgreSQL, serving B2B SaaS clients across logistics and supply-chain domains.
- Implemented real-time data synchronization features using WebSockets, reducing
  data latency by 40% for dashboard analytics.
- Optimized database queries and implemented caching strategies (Redis), improving
  API throughput by 3x under high-concurrency loads.
- Integrated third-party APIs (Stripe, SendGrid, Google Maps) for payments,
  notifications, and geospatial features.`,
        },
        'jyesta.txt': {
          name: 'jyesta.txt',
          type: 'file',
          content: `[JYESTA] -- AI/ML Intern
Jan 2023 - May 2023  |  Remote

- Developed an AI-powered email assistant using OpenAI GPT APIs and Python,
  automating email categorization, drafting, and priority scoring.
- Built NLP-based text classification models achieving 89% accuracy on custom
  datasets for domain-specific email routing.
- Created REST APIs with FastAPI for model serving, enabling seamless integration
  with the existing product ecosystem.
- Conducted A/B testing on prompt strategies, identifying optimal configurations
  that reduced average response generation time by 35%.`,
        },
        'tentwenty-digital.txt': {
          name: 'tentwenty-digital.txt',
          type: 'file',
          content: `[Tentwenty Digital] -- Web Development Intern
Aug 2022 - Dec 2022  |  Remote

- Built responsive, pixel-perfect websites and landing pages using HTML, CSS,
  JavaScript, and React for diverse client portfolios.
- Implemented animated UI components and interactive features using Framer Motion
  and GSAP, improving user engagement metrics by 25%.
- Optimized site performance (Core Web Vitals), achieving Lighthouse scores above
  90 across all client projects.
- Collaborated with UI/UX designers to translate Figma prototypes into production-
  ready code with cross-browser compatibility.`,
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

Stack: Python, FastAPI, React, PostgreSQL, OpenAI GPT-4, LangChain, Docker, AWS

- Enterprise-grade CRM with AI-powered product information management, serving
  50+ business clients with automated data extraction and enrichment.
- Integrated LLM pipelines for intelligent product categorization, attribute
  extraction, and duplicate detection across multi-vendor catalogs.
- Built a rule-engine + AI hybrid scoring system for lead prioritization,
  increasing sales team conversion rates by 28%.
- Designed multi-tenant architecture with role-based access control, audit
  logging, and real-time analytics dashboards.
- Deployed on AWS with CI/CD pipelines, achieving 99.7% uptime over 12 months.`,
        },
        'ai-email-assistant.txt': {
          name: 'ai-email-assistant.txt',
          type: 'file',
          content: `[AI Email Assistant]

Stack: Python, OpenAI GPT-4, FastAPI, React, TypeScript, NLP, SpaCy

- Intelligent email management system that auto-categorizes, prioritizes, and
  drafts responses using fine-tuned LLMs and NLP classification.
- Processes 5,000+ emails/day with 92% classification accuracy across 12
  custom categories.
- Features include smart threading, sentiment analysis, spam detection,
  and context-aware reply suggestions.
- Reduced average email handling time by 45% for beta users in a 3-month pilot.`,
        },
        'ai-resume-analyzer.txt': {
          name: 'ai-resume-analyzer.txt',
          type: 'file',
          content: `[AI-Powered Resume Analyzer]

Stack: Python, NLP, SpaCy, scikit-learn, Streamlit, PDFPlumber

- Automated resume screening tool that extracts, parses, and ranks candidate
  profiles against job descriptions using NLP and similarity scoring.
- Achieved 87% match accuracy on a custom dataset of 2,000+ resume-JD pairs.
- Features keyword extraction, skill gap analysis, and ATS compatibility scoring.
- Built an interactive Streamlit dashboard for HR teams with batch upload
  and export capabilities.`,
        },
        'fraud-detection-system.txt': {
          name: 'fraud-detection-system.txt',
          type: 'file',
          content: `[Fraud Detection System]

Stack: Python, XGBoost, Random Forest, Pandas, Flask, PostgreSQL, Docker

- Real-time fraud detection pipeline for financial transactions using ensemble
  ML models (XGBoost, Random Forest) with feature engineering on transaction
  metadata.
- Processed 100K+ transactions/day with 95% precision and 91% recall,
  reducing false positives by 40% compared to the rule-based predecessor.
- Implemented model monitoring with drift detection, automated retraining
  triggers, and A/B testing for model versioning.
- Built a Flask API with rate limiting and authentication for secure model serving.`,
        },
        'medical-report-analyzer.txt': {
          name: 'medical-report-analyzer.txt',
          type: 'file',
          content: `[Medical Report Analyzer]

Stack: Python, OCR (Tesseract), NLP, Regex, FastAPI, React, MongoDB

- Automated medical report processing system that extracts structured data from
  unstructured PDF/image reports using OCR and NLP pipelines.
- Supports blood reports, X-rays, and pathology lab results with 90%+ field
  extraction accuracy across 15 report formats.
- Features anomaly flagging, trend analysis across historical reports, and
  patient summary generation.
- HIPAA-compliant architecture with encrypted storage and audit trails.`,
        },
        'secure-chat-application.txt': {
          name: 'secure-chat-application.txt',
          type: 'file',
          content: `[Secure Chat Application]

Stack: React, Node.js, Socket.IO, AES-256 Encryption, MongoDB, JWT

- End-to-end encrypted real-time chat application with support for private
  messaging, group channels, and file sharing.
- Implemented AES-256 encryption for messages and files, with key exchange
  via Diffie-Hellman protocol ensuring zero-knowledge architecture.
- Features include message search, read receipts, typing indicators, and
  online status -- all transmitted over WebSocket for low latency.
- Deployed with horizontal scaling support via Redis pub/sub for multi-
  instance message broadcasting.`,
        },
        'social-media-monitoring.txt': {
          name: 'social-media-monitoring.txt',
          type: 'file',
          content: `[Social Media Monitoring Tool]

Stack: Python, Twitter API, Reddit API, NLP, VADER Sentiment, Elasticsearch, Kibana

- Real-time social media monitoring and sentiment analysis platform that tracks
  brand mentions, hashtags, and trending topics across Twitter and Reddit.
- Processed 50K+ posts/day with sentiment classification using VADER and
  custom fine-tuned BERT models.
- Built Elasticsearch-powered search with Kibana dashboards for interactive
  data exploration and automated alert generation.
- Features include influence scoring, trend prediction, and automated report
  generation for marketing teams.`,
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

Languages
  Python, JavaScript, TypeScript, SQL, Bash, C++

AI & LLM
  OpenAI GPT-4, LangChain, Prompt Engineering, Fine-Tuning, RAG,
  Hugging Face Transformers, spaCy, NLTK

Machine Learning
  Scikit-learn, XGBoost, Random Forest, SVM, Neural Networks,
  Model Evaluation, Feature Engineering, Ensemble Methods

Data Science
  Pandas, NumPy, Matplotlib, Seaborn, Jupyter, EDA,
  Statistical Analysis, A/B Testing

Frontend
  React, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion, GSAP

Backend
  Node.js, Express, FastAPI, Flask, REST APIs, WebSockets, Socket.IO

Cloud & DevOps
  AWS (EC2, S3, Lambda), Docker, CI/CD, Git, GitHub Actions,
  Nginx, Vercel

Databases
  PostgreSQL, MongoDB, Redis, Elasticsearch, SQLite

Domain Knowledge
  NLP, Computer Vision, OCR, Fraud Detection, HIPAA Compliance,
  Agile/Scrum, System Design`,
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

Bachelor of Engineering -- Computer Engineering
  Goa College of Engineering, Farmagudi, Goa
  2019 - 2023

  Relevant Coursework: Data Structures & Algorithms, Machine Learning,
  Deep Learning, Database Management Systems, Operating Systems,
  Computer Networks, Software Engineering

Senior Secondary (XII) -- Science (PCM + Computer Science)
  2019

Secondary (X)  
  2017

Certifications
  - Deep Learning Specialization -- Coursera (Andrew Ng)
  - AWS Cloud Practitioner -- Amazon Web Services
  - Natural Language Processing Specialization -- Coursera`,
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
GitHub:  https://github.com/Markes10
Location: Vasco Da Gama, Goa, India`,
        },
      },
    },
  },
};
