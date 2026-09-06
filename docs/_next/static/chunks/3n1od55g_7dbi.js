(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  6203,
  e => {
    'use strict';
    var t = e.i(43476),
      n = e.i(71645);
    let i = {
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
    var o = e.i(47167);
    let a = {};
    async function r(e = 40) {
      return (a[e] || (a[e] = await s('/Markes10/profile.jpg', e)), a[e]);
    }
    async function s(e, t = 40, n = !1) {
      return 'u' < typeof document
        ? ''
        : new Promise((i, o) => {
            let a = new Image();
            (n && (a.crossOrigin = 'anonymous'),
              (a.onload = () => {
                try {
                  let e = (function (e, t) {
                    let n = document.createElement('canvas'),
                      i = n.getContext('2d'),
                      o = e.width / t,
                      a = Math.max(1, Math.floor(e.height / o));
                    ((n.width = t),
                      (n.height = a),
                      (i.imageSmoothingEnabled = !0),
                      (i.imageSmoothingQuality = 'high'),
                      i.drawImage(e, 0, 0, t, a));
                    let { data: r } = i.getImageData(0, 0, t, a),
                      s = [];
                    for (let e = 0; e < a; e++) {
                      let n = '',
                        i = null,
                        o = '';
                      for (let a = 0; a < t; a++) {
                        var c;
                        let s = (e * t + a) * 4,
                          d = r[s],
                          u = r[s + 1],
                          m = r[s + 2];
                        if (r[s + 3] < 25) {
                          (p(), (n += ' '));
                          continue;
                        }
                        let f =
                          (c = (0.299 * d + 0.587 * u + 0.114 * m) / 255) > 0.92
                            ? ' '
                            : c > 0.72
                              ? '░'
                              : c > 0.45
                                ? '▒'
                                : c > 0.2
                                  ? '▓'
                                  : '█';
                        if (' ' === f) {
                          (p(), (n += ' '));
                          continue;
                        }
                        let g = l(d),
                          h = l(u),
                          y = l(m),
                          x = `rgb(${g},${h},${y})`;
                        x === i ? (o += f) : (p(), (i = x), (o = f));
                      }
                      function p() {
                        null !== i &&
                          o &&
                          ((n += `<span style="color:${i}">${o}</span>`),
                          (o = ''),
                          (i = null));
                      }
                      (p(), s.push(n));
                    }
                    return s.join('\n');
                  })(a, t);
                  i(e);
                } catch (e) {
                  o(e);
                }
              }),
              (a.onerror = () => o(Error(`Failed to load image: ${e}`))),
              (a.src = e));
          });
    }
    function l(e) {
      return 34 * Math.round(e / 34);
    }
    let c = {
        amber: {
          text: '#e8c489',
          textDim: '#8f7345',
          textGhost: 'rgba(154, 143, 124, 0.6)',
          bg: '#0b0805',
          prompt: '#ffd894',
          accent: '#ffd894',
          scanline: 'rgba(255, 196, 120, 0.08)',
          crtGlow: 'rgba(255, 196, 120, 0.03)',
        },
        green: {
          text: '#97d495',
          textDim: '#557c4f',
          textGhost: 'rgba(127, 143, 124, 0.6)',
          bg: '#060b06',
          prompt: '#c9f2b8',
          accent: '#c9f2b8',
          scanline: 'rgba(140, 255, 150, 0.07)',
          crtGlow: 'rgba(140, 255, 150, 0.03)',
        },
        mono: {
          text: '#cdcdcd',
          textDim: '#7d7d7d',
          textGhost: 'rgba(143, 143, 143, 0.6)',
          bg: '#0b0b0b',
          prompt: '#f4f4f4',
          accent: '#f4f4f4',
          scanline: 'rgba(255, 255, 255, 0.06)',
          crtGlow: 'rgba(255, 255, 255, 0.03)',
        },
        cyber: {
          text: '#00ffff',
          textDim: '#008888',
          textGhost: 'rgba(0, 255, 255, 0.3)',
          bg: '#000a0a',
          prompt: '#00ffff',
          accent: '#ff00ff',
          scanline: 'rgba(0, 255, 255, 0.03)',
          crtGlow: 'rgba(0, 255, 255, 0.04)',
        },
        red: {
          text: '#ff3333',
          textDim: '#991111',
          textGhost: 'rgba(255, 51, 51, 0.3)',
          bg: '#0a0000',
          prompt: '#ff3333',
          accent: '#ff6666',
          scanline: 'rgba(255, 51, 51, 0.03)',
          crtGlow: 'rgba(255, 51, 51, 0.04)',
        },
        purple: {
          text: '#bf5fff',
          textDim: '#7b3faa',
          textGhost: 'rgba(191, 95, 255, 0.3)',
          bg: '#080012',
          prompt: '#bf5fff',
          accent: '#e040fb',
          scanline: 'rgba(191, 95, 255, 0.03)',
          crtGlow: 'rgba(191, 95, 255, 0.04)',
        },
        matrix: {
          text: '#00ff41',
          textDim: '#003b00',
          textGhost: 'rgba(0, 255, 65, 0.25)',
          bg: '#000000',
          prompt: '#00ff41',
          accent: '#008f11',
          scanline: 'rgba(0, 255, 65, 0.04)',
          crtGlow: 'rgba(0, 255, 65, 0.06)',
        },
        solarized: {
          text: '#b58900',
          textDim: '#839496',
          textGhost: 'rgba(181, 137, 0, 0.3)',
          bg: '#002b36',
          prompt: '#b58900',
          accent: '#cb4b16',
          scanline: 'rgba(181, 137, 0, 0.03)',
          crtGlow: 'rgba(181, 137, 0, 0.04)',
        },
        pink: {
          text: '#ff69b4',
          textDim: '#c2185b',
          textGhost: 'rgba(255, 105, 180, 0.3)',
          bg: '#0a0008',
          prompt: '#ff69b4',
          accent: '#ff1493',
          scanline: 'rgba(255, 105, 180, 0.03)',
          crtGlow: 'rgba(255, 105, 180, 0.04)',
        },
        blue: {
          text: '#4fc3f7',
          textDim: '#1565c0',
          textGhost: 'rgba(79, 195, 247, 0.3)',
          bg: '#000a14',
          prompt: '#4fc3f7',
          accent: '#0288d1',
          scanline: 'rgba(79, 195, 247, 0.03)',
          crtGlow: 'rgba(79, 195, 247, 0.04)',
        },
      },
      p = {};
    function d() {
      return [...Object.keys(c), ...Object.keys(p)];
    }
    function u(e) {
      return e.toLowerCase() in c || e.toLowerCase() in p;
    }
    function m(e) {
      let t = e.toLowerCase();
      return c[t] ?? p[t] ?? c.amber;
    }
    function f(e) {
      let t = e.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);
      return t
        ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16),
          }
        : null;
    }
    function g(e, t) {
      let n = f(e);
      return n ? `rgba(${n.r},${n.g},${n.b},${t})` : `rgba(200,200,200,${t})`;
    }
    let h = o.default.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || 'Markes10';
    async function y(e = 'amber') {
      let t = m(e),
        n = '',
        i = null;
      try {
        let e = await fetch(
          `https://api.github.com/users/${encodeURIComponent(h)}`,
        );
        e.ok && (i = await e.json());
      } catch {}
      try {
        n = await r(26);
      } catch {
        n = '[profile photo unavailable]';
      }
      let o = i?.name || i?.login || h;
      i?.html_url;
      let a = (i?.bio || 'STILL A STUDENT').toUpperCase(),
        s = `https://github.com/${i?.login || h}`,
        l = i
          ? `${i.public_repos} repos / ${i.followers} followers`
          : '0 repos / 0 followers',
        c = `${t.bg}CC`,
        p = `${t.text}66`,
        d = t.textGhost,
        u = t.text,
        f = t.accent,
        g = t.textDim;
      return `
<div style="margin:8px 0;display:inline-block;">
  <div style="display:flex;align-items:flex-start;gap:16px;padding:14px 16px;border:1px solid ${p};border-radius:12px;background:${c};box-shadow:inset 0 0 0 1px ${d};max-width:500px;min-width:360px;">
    <div style="flex-shrink:0;display:inline-block;width:190px;overflow:hidden;text-align:left;line-height:0.84;font-size:8px;letter-spacing:0.14px;${'[profile photo unavailable]' === n ? '' : `filter:drop-shadow(0 0 8px ${d});`}">
${n}
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;min-width:0;flex:1;gap:8px;">
      <div style="font-size:22px;font-weight:700;color:${u};letter-spacing:0.7px;line-height:1.1">${x(o)}</div>
      <div style="font-size:12px;font-weight:700;color:${f};letter-spacing:1px;line-height:1.2">${x(a)}</div>
      <div style="display:flex;flex-direction:column;gap:4px;font-size:11px;color:${g};line-height:1.5;">
        <div><span style="color:${f}">•</span> ${x(s)}</div>
        <div><span style="color:${f}">•</span> ${x(l)}</div>
      </div>
    </div>
  </div>
</div>`;
    }
    function x(e) {
      return e
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }
    let b = 0,
      v = () => `line-${++b}-${Date.now()}`,
      w = o.default.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || 'Markes10';
    function $(e, t) {
      if (t.startsWith('/')) return S(t);
      if ('..' === t) {
        let t = e.split('/').filter(Boolean);
        return (t.pop(), '/' + t.join('/'));
      }
      return '.' === t ? e : S('/' === e ? `/${t}` : `${e}/${t}`);
    }
    function S(e) {
      let t = e.split('/').filter(Boolean),
        n = [];
      for (let e of t) '..' === e ? n.pop() : '.' !== e && n.push(e);
      return '/' + n.join('/');
    }
    function k(e, t) {
      if ('/' === t) return e;
      let n = t.split('/').filter(Boolean),
        i = e;
      for (let e of n) {
        if (!i.children || !i.children[e]) return null;
        i = i.children[e];
      }
      return i;
    }
    function A(e, t) {
      if (e.includes('-a') && 1 === e.length)
        return [...A([], t), K('  .plan'), K('  .secrets'), K('  .zshrc')];
      let n = e[0] ? $(t.cwd, e[0]) : t.cwd,
        i = k(t.fs, n);
      return i
        ? 'file' === i.type
          ? [{ id: v(), content: i.name, type: 'output' }]
          : i.children
            ? Object.keys(i.children)
                .sort((e, t) => {
                  let n = +('directory' !== i.children[e].type),
                    o = +('directory' !== i.children[t].type);
                  return n !== o ? n - o : e.localeCompare(t);
                })
                .map(e => {
                  let t = 'directory' === i.children[e].type ? '/' : '';
                  return { id: v(), content: `  ${e}${t}`, type: 'output' };
                })
            : [{ id: v(), content: '(empty directory)', type: 'output' }]
        : [
            {
              id: v(),
              content: `ls: cannot access '${e[0] || n}': No such file or directory`,
              type: 'error',
            },
          ];
    }
    function I(e, t) {
      let n = e[0] || '/',
        i = $(t.cwd, n),
        o = k(t.fs, i);
      return o
        ? 'file' === o.type
          ? [{ id: v(), content: `cd: not a directory: ${n}`, type: 'error' }]
          : (t.setCwd(i || '/'), [])
        : [
            {
              id: v(),
              content: `cd: no such file or directory: ${n}`,
              type: 'error',
            },
          ];
    }
    function D(e, t) {
      if (!e[0])
        return [
          { id: v(), content: 'cat: missing file operand', type: 'error' },
        ];
      if ('feed.xml' === e[0])
        return [
          K('<?xml version="1.0" encoding="UTF-8"?>'),
          K('<rss version="2.0"><channel>'),
          K('  <title>Dweepan CLI</title>'),
          K('  <description>plain text, strong opinions</description>'),
          K('</channel></rss>'),
        ];
      let n = $(t.cwd, e[0]),
        i = k(t.fs, n);
      return !i && ['.plan', '.secrets', '.zshrc'].includes(e[0])
        ? {
            '.plan': [
              "dweepan's .plan — last updated: yesterday, roughly",
              'currently: making the web smaller, one command at a time.',
              'next: ship the next tiny improvement.',
            ],
            '.secrets': [
              "# ~/.secrets — do not cat. (you cat'ed it. of course.)",
              'api_key = "not actually a secret"',
              'wifi_password = "please just use ethernet"',
            ],
            '.zshrc': [
              '# ~/.zshrc — the essentials',
              "alias please='sudo'",
              'export EDITOR=vim',
            ],
          }[e[0]].map(K)
        : i
          ? 'directory' === i.type
            ? [
                {
                  id: v(),
                  content: `cat: ${e[0]}: Is a directory`,
                  type: 'error',
                },
              ]
            : i.content
                .split('\n')
                .map(e => ({ id: v(), content: e, type: 'output' }))
          : [
              {
                id: v(),
                content: `cat: ${e[0]}: No such file or directory`,
                type: 'error',
              },
            ];
    }
    function C(e, t) {
      let n = [
        { id: v(), content: '', type: 'output' },
        { id: v(), content: '  Rendering profile portrait...', type: 'output' },
      ];
      return (
        y(t.theme).then(e => {
          t.appendOutput([
            { id: v(), content: e, type: 'html' },
            { id: v(), content: '', type: 'output' },
          ]);
        }),
        n
      );
    }
    function L(e) {
      return [{ id: v(), content: new Date().toString(), type: 'output' }];
    }
    function E(e) {
      return [{ id: v(), content: e.join(' ') || '', type: 'output' }];
    }
    function P() {
      let e = Date.now(),
        t = window.__SESSION_START ? window.__SESSION_START : e,
        n = Math.floor((e - t) / 1e3),
        i = Math.floor(n / 60),
        o = Math.floor(i / 60),
        a =
          o > 0
            ? `${o}h ${i % 60}m ${n % 60}s`
            : i > 0
              ? `${i}m ${n % 60}s`
              : `${n}s`;
      return [{ id: v(), content: `  up ${a}`, type: 'output' }];
    }
    function R() {
      return [
        '',
        '         .---.          Guest@Dweepan',
        '        /     \\         -----------------',
        '       /       \\        OS: GuestOS v2.4.1',
        '      /  .---.  \\       Host: Portfolio Terminal',
        '     /  /     \\  \\      Kernel: Next.js 16',
        '    /  /       \\  \\     Shell: retrosh',
        '   /  /         \\  \\   Uptime: see `uptime`',
        '  /  /           \\  \\  Theme: customizable',
        ' /  /             \\  \\ Terminal: Web-based',
        '/__/               \\__\\',
        '',
      ].map(e => ({ id: v(), content: e, type: 'output' }));
    }
    let T = [];
    function M() {
      return 0 === T.length
        ? [{ id: v(), content: '  No commands in history', type: 'output' }]
        : T.map((e, t) => ({
            id: v(),
            content: `  ${t + 1}  ${e}`,
            type: 'output',
          }));
    }
    function z(e, t) {
      return [{ id: v(), content: t.cwd, type: 'output' }];
    }
    function G(e) {
      let t = e[0]?.toLowerCase();
      return t
        ? (
            {
              ls: [
                'ls - list files and directories',
                'usage: ls [path]',
                'try: ls /projects',
              ],
              cat: [
                'cat - display a file',
                'usage: cat <file>',
                'try: cat /about/summary.txt',
              ],
              cd: ['cd - change directory', 'usage: cd <path>'],
              mail: [
                'mail - compose a letter',
                'usage: mail <address>',
                'opens a pre-filled mail client link',
              ],
              theme: [
                'theme - choose the terminal phosphor',
                'usage: theme amber|green|mono',
              ],
              crt: ['crt - toggle scanlines and bloom', 'usage: crt on|off'],
              sound: ['sound - toggle keypress clicks', 'usage: sound on|off'],
              cowsay: [
                'cowsay - make a cow say something',
                'usage: cowsay <message>',
              ],
              man: ['man - read a command manual', 'usage: man <command>'],
            }[t] ?? [`No manual entry for ${t}`]
          ).map(K)
        : [
            K('What manual page do you want?'),
            K('try: man ls · man cat · man man'),
          ];
    }
    function N(e) {
      var t;
      let n = e[0] || 'dweepan.gain11dec99@gmail.com';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n))
        return [
          H(`mail: '${n}' does not look like an address`),
          K('usage: mail <address>'),
        ];
      let i = `mailto:${encodeURIComponent(n)}?subject=${encodeURIComponent('hello from the cli')}`;
      return [
        K(`composing to ${n}...`),
        ((t = `<a href="${i}">open your mail client</a> — pre-filled, no typos.`),
        { id: v(), content: t, type: 'html' }),
      ];
    }
    function O(e) {
      let t = e.join(' ') || 'moo. (pass a message: cowsay <text>)',
        n = Math.min(48, Math.max(8, t.length));
      return [
        ` ${'_'.repeat(n + 2)}`,
        `< ${t.slice(0, n).padEnd(n)} >`,
        ` ${'-'.repeat(n + 2)}`,
        '        \\   ^__^',
        '         \\  (oo)\\_______',
        '            (__)\\       )\\/\\',
        '                ||----w |',
        '                ||     ||',
      ].map(K);
    }
    function j(e, t) {
      let n = e[0];
      return n
        ? n.startsWith('./')
          ? [
              K(
                `open: ${n.slice(2)} is executable only through its project command`,
              ),
              ...eg([], t),
            ]
          : D([n], t)
        : [H('open: missing file or project'), K('try: open <file>')];
    }
    function B(e) {
      return 'make me a sandwich' === e.join(' ')
        ? [K('okay.')]
        : [
            H(
              'guest is not in the sudoers file. this incident will be reported.',
            ),
            K('(reported to whom? exactly.)'),
          ];
    }
    function F() {
      return [
        K('there is no exit. there is only the scrollback.'),
        K('(close the tab if you must. the phosphor will fade.)'),
      ];
    }
    function U(e) {
      let t = e.length ? e.join(' ') : 'editor';
      return [
        K(`${t}: this is a blog, not a lifestyle.`),
        K('(try cat /about/summary.txt for the sermon)'),
      ];
    }
    function _() {
      return [H('rm: read-only filesystem. also: no.')];
    }
    function W(e, t) {
      let n = t.keysOn ?? !1,
        i = e[0]?.toLowerCase(),
        o = 'on' === i || ('off' !== i && !n);
      return (
        t.setKeys(o),
        [K(`sound: ${o ? 'on — enjoy the clacks' : 'off'}`)]
      );
    }
    function K(e) {
      return { id: v(), content: e, type: 'output' };
    }
    function H(e) {
      return { id: v(), content: e, type: 'error' };
    }
    function J(e, t) {
      let n = [
        { id: v(), content: '', type: 'output' },
        { id: v(), content: '  Loading profile...', type: 'output' },
      ];
      return (
        y().then(e => {
          t.appendOutput([
            { id: v(), content: e, type: 'html' },
            { id: v(), content: '', type: 'output' },
            {
              id: v(),
              content: '  Building intelligent systems at the intersection of',
              type: 'output',
            },
            {
              id: v(),
              content: '  AI and software engineering.',
              type: 'output',
            },
            { id: v(), content: '', type: 'output' },
          ]);
        }),
        n
      );
    }
    function V(e, t) {
      let n = [
        { id: v(), content: '', type: 'output' },
        {
          id: v(),
          content: '  Fetching repository languages from GitHub...',
          type: 'output',
        },
      ];
      return (X(t.appendOutput, t.theme), n);
    }
    async function X(e, t) {
      try {
        let n,
          i = await fetch(
            `https://api.github.com/users/${encodeURIComponent(w)}/repos?sort=updated&per_page=100`,
          );
        if (!i.ok) throw Error(`GitHub API ${i.status}`);
        let o = await i.json(),
          a = [];
        for (let e of o) {
          let t = await fetch(
            `https://api.github.com/repos/${encodeURIComponent(w)}/${encodeURIComponent(e.name)}/languages`,
          );
          t.ok && a.push(await t.json());
        }
        let r = (function (e) {
          let t = new Map();
          for (let n of e)
            for (let [e, i] of Object.entries(n)) t.set(e, (t.get(e) ?? 0) + i);
          return [...t.entries()].sort(
            (e, t) => t[1] - e[1] || e[0].localeCompare(t[0]),
          );
        })(a);
        if (0 === r.length)
          return void e([
            { id: v(), content: '', type: 'output' },
            {
              id: v(),
              content: '  No repository languages found.',
              type: 'output',
            },
            { id: v(), content: '', type: 'output' },
          ]);
        let s = m(t),
          l = r.reduce((e, [, t]) => e + t, 0),
          c = (n = el().match(
            /SKILLS\s*----------------------------------------\n([\s\S]*?)\n\s*----------------------------------------\nEDUCATION/,
          ))
            ? n[1]
                .split('\n')
                .map(e => e.trim())
                .filter(Boolean)
                .map(e => {
                  let t = e.indexOf(':');
                  if (-1 === t) return null;
                  let n = e.slice(0, t).trim(),
                    i = e.slice(t + 1).trim();
                  return n && i ? [n, i] : null;
                })
                .filter(e => null !== e)
            : [],
          p = c.length
            ? `
        <div class="skills-resume-section">
          <div class="skills-heading" style="color:${s.text};">RESUME SKILLS</div>
          <div class="skills-resume-grid">
            ${c.map(([e, t]) => `<div class="skills-resume-item" style="color:${s.text};"><span style="color:${s.accent};">${e}:</span> ${t}</div>`).join('')}
          </div>
        </div>`
            : '',
          d = `
<div class="skills-shell">
  <div class="skills-panel" style="--skills-text:${s.text};--skills-accent:${s.accent};--skills-bg:${s.bg}CC;--skills-ghost:${s.textGhost};--skills-border:${s.text}66;">
    <div class="skills-section">
      <div class="skills-heading">LANGUAGES</div>
      <div class="skills-language-list">
        ${r
          .map(([e, t]) => {
            let n = ((t / l) * 100).toFixed(1);
            return `<span class="skills-language-pill">${e} ${n}%</span>`;
          })
          .join('')}
      </div>
    </div>
    ${p}
  </div>
</div>`;
        e([
          { id: v(), content: '', type: 'output' },
          { id: v(), content: d, type: 'html' },
          { id: v(), content: '', type: 'output' },
        ]);
      } catch (t) {
        e([
          { id: v(), content: '', type: 'output' },
          { id: v(), content: `  skills: error - ${t.message}`, type: 'error' },
          { id: v(), content: '', type: 'output' },
        ]);
      }
    }
    function Q(e, t) {
      let n = k(t.fs, '/experience');
      if (!n?.children)
        return [
          { id: v(), content: 'experience: data not found', type: 'error' },
        ];
      let i = [{ id: v(), content: '', type: 'output' }];
      for (let e of [
        'labmentix.txt',
        'demerg-systems.txt',
        'jyesta.txt',
        'tentwenty-digital.txt',
      ]) {
        let t = n.children[e];
        t?.content &&
          (i.push(
            ...t.content
              .split('\n')
              .map(e => ({ id: v(), content: e, type: 'output' })),
          ),
          i.push({ id: v(), content: '', type: 'output' }));
      }
      return i;
    }
    function q(e, t) {
      let n = k(t.fs, '/education/education.txt');
      return n?.content
        ? n.content
            .split('\n')
            .map(e => ({ id: v(), content: e, type: 'output' }))
        : [{ id: v(), content: 'education: data not found', type: 'error' }];
    }
    function Y(e, t) {
      let n = [
        { id: v(), content: '', type: 'output' },
        {
          id: v(),
          content: `  Fetching GitHub data for <span style="color:#ffb000;font-weight:bold">${w}</span>...`,
          type: 'html',
        },
      ];
      return (e[0] ? et(e[0], t.appendOutput) : Z(t.appendOutput), n);
    }
    async function Z(e) {
      try {
        var t, n, i, o;
        let a,
          [r, l] = await Promise.all([
            fetch(`https://api.github.com/users/${encodeURIComponent(w)}`),
            fetch(
              `https://api.github.com/users/${encodeURIComponent(w)}/repos?sort=updated&per_page=10`,
            ),
          ]);
        if (!r.ok) throw Error(`GitHub API ${r.status}`);
        let c = await r.json(),
          p = l.ok ? await l.json() : [],
          d = '';
        try {
          d = await s(c.avatar_url, 22, !0);
        } catch {}
        let u = null;
        try {
          u = await ee(w);
        } catch {}
        let m =
          ((t = c),
          (n = p),
          (i = d),
          (o = u),
          (a = n
            .slice(0, 8)
            .map(e => {
              let t = eo(e.language);
              return `
    <div style="padding:10px 14px;border:1px solid #ffb00022;border-radius:6px;background:#ffb00008">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:#ffb000;font-weight:bold;font-size:13px">${e.name}</span>
        <span style="font-size:11px;color:${t}">${e.language || ''}</span>
      </div>
      <div style="font-size:11px;color:#b37d00;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:500px">${e.description || ''}</div>
      <div style="display:flex;gap:14px;margin-top:6px;font-size:11px">
        <span style="color:#ffb000">&#9733; ${e.stargazers_count}</span>
        <span>&#128268; ${e.forks_count}</span>
        <span style="color:#707070">${new Date(e.updated_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</span>
      </div>
    </div>`;
            })
            .join('')),
          `
<div style="margin:6px 0">
  <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px">
    ${i ? `<div style="flex-shrink:0;line-height:1.05;font-size:5px;letter-spacing:0">${i.replace(/\n/g, '<br/>')}</div>` : `<img src="${t.avatar_url}" style="width:72px;height:72px;border-radius:50%;border:2px solid #ffb000" />`}
    <div style="padding-top:4px">
      <div style="font-size:18px;font-weight:bold;color:#ffb000">${t.name || t.login}</div>
      <div style="font-size:11px;color:#b37d00;margin-top:3px">${t.bio || ''}</div>
      <div style="font-size:11px;color:#707070;margin-top:6px">${t.location || ''} ${t.blog ? '&middot; ' + t.blog : ''}</div>
    </div>
  </div>
  <div style="display:flex;gap:24px;margin-bottom:18px;font-size:13px">
    <div><span style="color:#ffb000;font-weight:bold;font-size:20px">${t.public_repos}</span><br/><span style="color:#707070;font-size:10px">REPOS</span></div>
    <div><span style="color:#ffb000;font-weight:bold;font-size:20px">${t.followers}</span><br/><span style="color:#707070;font-size:10px">FOLLOWERS</span></div>
    <div><span style="color:#ffb000;font-weight:bold;font-size:20px">${t.following}</span><br/><span style="color:#707070;font-size:10px">FOLLOWING</span></div>
    <div><span style="color:#ffb000;font-weight:bold;font-size:20px">${new Date(t.created_at).getFullYear()}</span><br/><span style="color:#707070;font-size:10px">JOINED</span></div>
  </div>
  ${o ? en(`${t.login}/README.md`, o) : ''}
  <div style="color:#ffb000;font-size:12px;font-weight:bold;margin:16px 0 10px;letter-spacing:1px">&#9656; TOP REPOSITORIES</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${a}</div>
</div>`);
        e([
          { id: v(), content: '', type: 'output' },
          { id: v(), content: m, type: 'html' },
          { id: v(), content: '', type: 'output' },
        ]);
      } catch (t) {
        e([
          { id: v(), content: '', type: 'output' },
          { id: v(), content: `  github: error - ${t.message}`, type: 'error' },
          { id: v(), content: '', type: 'output' },
        ]);
      }
    }
    async function ee(e) {
      let t = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(e)}/${encodeURIComponent(e)}/readme`,
        { headers: { Accept: 'application/vnd.github.raw+json' } },
      );
      return t.ok ? t.text() : null;
    }
    async function et(e, t) {
      try {
        let n = await fetch(
          `https://api.github.com/repos/${encodeURIComponent(w)}/${encodeURIComponent(e)}`,
        );
        if (!n.ok)
          throw Error(`Repository '${e}' not found (HTTP ${n.status})`);
        let i = await n.json(),
          o = eo(i.language),
          a = `
<div style="margin:6px 0">
  <div style="font-size:16px;font-weight:bold;color:#ffb000">${i.name}</div>
  <div style="font-size:11px;color:#b37d00;margin-top:4px">${i.description || 'No description'}</div>
  <div style="display:flex;gap:20px;font-size:12px;margin:12px 0;flex-wrap:wrap">
    <span style="color:#ffb000">&#9733; ${i.stargazers_count}</span>
    <span style="color:#ffb000">&#128268; ${i.forks_count} forks</span>
    <span>Lang: <span style="color:${o};font-weight:bold">${i.language || 'N/A'}</span></span>
    <span>Updated: ${new Date(i.updated_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
  </div>
  <div style="font-size:11px;color:#b37d00">${i.html_url}</div>
  ${i.topics.length ? `<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${i.topics.map(e => `<span style="font-size:10px;background:#ffb00022;color:#ffb000;padding:2px 8px;border-radius:10px;border:1px solid #ffb00044">${e}</span>`).join('')}</div>` : ''}
</div>`;
        t([
          { id: v(), content: '', type: 'output' },
          { id: v(), content: a, type: 'html' },
          { id: v(), content: '  Fetching README.md...', type: 'output' },
        ]);
        try {
          let n = null,
            i = '';
          for (let t of [
            'README.md',
            'Readme.md',
            'readme.md',
            'README.rst',
            'README.txt',
            'README',
          ]) {
            let o = await fetch(
              `https://api.github.com/repos/${encodeURIComponent(w)}/${encodeURIComponent(e)}/contents/${t}`,
            );
            if (o.ok) {
              let e = await o.json();
              if (e.content && 'base64' === e.encoding) {
                ((n = atob(e.content.replace(/\n/g, ''))), (i = t));
                break;
              }
            }
          }
          if (n) {
            let e = en(i, n);
            t([
              { id: v(), content: '', type: 'output' },
              { id: v(), content: e, type: 'html' },
              { id: v(), content: '', type: 'output' },
            ]);
          } else
            t([
              {
                id: v(),
                content: '  No README.md found in this repository.',
                type: 'output',
              },
              { id: v(), content: '', type: 'output' },
            ]);
        } catch (e) {
          t([
            {
              id: v(),
              content: `  README fetch failed: ${e.message}`,
              type: 'error',
            },
            { id: v(), content: '', type: 'output' },
          ]);
        }
      } catch (e) {
        t([
          { id: v(), content: '', type: 'output' },
          { id: v(), content: `  github: ${e.message}`, type: 'error' },
          { id: v(), content: '', type: 'output' },
        ]);
      }
    }
    function en(e, t) {
      let n = '#ffb000',
        i = '#b37d00',
        o = '#ffb00033',
        a = '#e0e0e0',
        r = '#ffb0000d',
        s = '#2ecc71',
        l = t.split('\n'),
        c = [],
        p = !0,
        d = !1,
        u = !1,
        m = !1;
      for (let e = 0; e < l.length; e++) {
        let t = l[e];
        if (t.trim().startsWith('```')) {
          if (d) (c.push('</div>'), (d = !1));
          else {
            let e = t.trim().slice(3).trim();
            (c.push(
              `<div style="margin:6px 0;padding:8px 12px;border-left:3px solid ${s};background:#ffb00015;border-radius:0 5px 5px 0;font-size:11px;line-height:1.5">${e ? `<div style="color:${s};font-size:9px;font-weight:bold;margin-bottom:6px;letter-spacing:1px">${e.toUpperCase()}</div>` : ''}`,
            ),
              (d = !0));
          }
          continue;
        }
        if (d) {
          let e = t
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          c.push(e + '<br/>');
          continue;
        }
        if (t.trim().startsWith('|') && t.trim().endsWith('|')) {
          if (
            (m ||
              (c.push(
                `<div style="margin:6px 0;border:1px solid ${o};border-radius:5px;overflow:hidden">`,
              ),
              (m = !0),
              (p = !0)),
            /^\|[\s\-:|]+\|$/.test(t.trim()))
          ) {
            p = !1;
            continue;
          }
          let e = t
              .trim()
              .slice(1, -1)
              .split('|')
              .map(e => e.trim()),
            i = `padding:4px 10px;font-size:10px;border-bottom:1px solid ${o};${p ? `background:${r};font-weight:bold;color:${n}` : `color:${a}`}`;
          (c.push(
            `<div style="display:flex">${e.map(e => `<div style="${i};flex:1">${ei(e)}</div>`).join('')}</div>`,
          ),
            (p = !1));
          continue;
        }
        if (
          (m && !t.trim().startsWith('|') && (c.push('</div>'), (m = !1)),
          u &&
            !t.trim().match(/^[-*+>]/) &&
            '' !== t.trim() &&
            (c.push('</div>'), (u = !1)),
          '' === t.trim())
        ) {
          c.push('<div style="height:6px"></div>');
          continue;
        }
        let f = t.match(/^#\s+(.+)/),
          g = t.match(/^##\s+(.+)/),
          h = t.match(/^###\s+(.+)/),
          y = t.match(/^####\s+(.+)/);
        if (f) {
          c.push(
            `<div style="font-size:16px;font-weight:bold;color:${n};margin:14px 0 8px;padding-bottom:6px;border-bottom:2px solid ${n}">${ei(f[1])}</div>`,
          );
          continue;
        }
        if (g) {
          c.push(
            `<div style="font-size:14px;font-weight:bold;color:${n};margin:12px 0 6px;padding-bottom:4px;border-bottom:1px solid ${o}">${ei(g[1])}</div>`,
          );
          continue;
        }
        if (h) {
          c.push(
            `<div style="font-size:12px;font-weight:bold;color:#ff6600;margin:10px 0 4px">&#9656; ${ei(h[1])}</div>`,
          );
          continue;
        }
        if (y) {
          c.push(
            `<div style="font-size:11px;font-weight:bold;color:${i};margin:8px 0 3px">  ${ei(y[1])}</div>`,
          );
          continue;
        }
        if (/^(-{3,}|\*{3,}|_{3,})$/.test(t.trim())) {
          c.push(
            `<div style="border:none;border-top:1px solid ${o};margin:10px 0"></div>`,
          );
          continue;
        }
        let x = t.trim().match(/^([-*+])\s+(.+)/);
        if (x) {
          (u ||
            (c.push('<div style="padding-left:12px;margin:2px 0">'), (u = !0)),
            c.push(
              `<div style="font-size:11px;color:${a};line-height:1.6;padding:1px 0"><span style="color:${n};font-weight:bold">&#9656;</span> ${ei(x[2])}</div>`,
            ));
          continue;
        }
        let b = t.trim().match(/^>\s*(.*)/);
        if (b) {
          c.push(
            `<div style="border-left:3px solid ${n};padding:4px 12px;margin:4px 0;font-size:11px;color:${i};font-style:italic;background:${r}">${ei(b[1])}</div>`,
          );
          continue;
        }
        let v = t.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
        if (v) {
          c.push(
            `<div style="font-size:11px;color:#3498DB;margin:4px 0">[image: ${ei(v[1])}] ${v[2]}</div>`,
          );
          continue;
        }
        c.push(
          `<div style="font-size:11px;color:${a};line-height:1.65;margin:2px 0">${ei(t)}</div>`,
        );
      }
      return (
        d && c.push('</div>'),
        u && c.push('</div>'),
        m && c.push('</div>'),
        `
<div style="margin:8px 0;padding:12px 16px;border:1px solid ${o};border-radius:8px;background:${r}">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid ${o}">
    <span style="color:${n};font-size:14px">&#128196;</span>
    <span style="color:${n};font-size:12px;font-weight:bold;letter-spacing:1px">${e.toUpperCase()}</span>
  </div>
  ${c.join('')}
</div>`
      );
    }
    function ei(e) {
      let t = e
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return (t = (t = (t = t.replace(
        /`([^`]+)`/g,
        '<code style="background:#ffb00018;color:#2ecc71;padding:1px 5px;border-radius:3px;font-size:10px">$1</code>',
      )).replace(
        /\*\*([^*]+)\*\*/g,
        '<b style="color:#ffb000">$1</b>',
      )).replace(/\*([^*]+)\*/g, '<i style="color:#e0e0e0">$1</i>')).replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a style="color:#3498DB;text-decoration:underline" href="$2" target="_blank" rel="noopener">$1</a>',
      );
    }
    function eo(e) {
      return (
        (e &&
          {
            Python: '#3572A5',
            JavaScript: '#f1e05a',
            TypeScript: '#3178c6',
            'Jupyter Notebook': '#DA5B0B',
            HTML: '#e34c26',
            CSS: '#563d7c',
            Shell: '#89e051',
            Dockerfile: '#384d54',
            Go: '#00ADD8',
          }[e]) ||
        '#8b949e'
      );
    }
    function ea(e, t) {
      let n = k(t.fs, '/contact/contact.txt'),
        i = [];
      return (
        n?.content &&
          i.push(
            ...n.content
              .split('\n')
              .map(e => ({ id: v(), content: e, type: 'output' })),
          ),
        i.push({ id: v(), content: '', type: 'output' }),
        i.push({ id: v(), content: '  Send an email:', type: 'output' }),
        i.push({
          id: v(),
          content: '  mailto:dweepangain11dec99@gmail.com',
          type: 'output',
        }),
        i.push({ id: v(), content: '', type: 'output' }),
        i
      );
    }
    function er(e, t) {
      let n, i, o;
      ((n = new Blob([el()], { type: 'text/plain' })),
        (i = URL.createObjectURL(n)),
        ((o = document.createElement('a')).href = i),
        (o.download = 'Dweepan_Gain_Resume.txt'),
        document.body.appendChild(o),
        o.click(),
        document.body.removeChild(o),
        URL.revokeObjectURL(i));
      let a = [
        { id: v(), content: '', type: 'output' },
        { id: v(), content: '  Rendering colorful resume...', type: 'output' },
      ];
      return (
        es().then(e => {
          t.appendOutput([
            { id: v(), content: e, type: 'html' },
            { id: v(), content: '', type: 'output' },
            {
              id: v(),
              content: '  Resume file downloaded: Dweepan_Gain_Resume.txt',
              type: 'output',
            },
            { id: v(), content: '', type: 'output' },
          ]);
        }),
        a
      );
    }
    async function es() {
      var e;
      let t,
        n,
        i,
        o,
        a,
        s,
        l,
        c,
        p,
        d,
        u,
        m,
        f,
        g = '';
      try {
        g = await r(28);
      } catch {}
      return (
        (e = g),
        (t = '#ffb000'),
        (n = '#b37d00'),
        (i = '#ff6600'),
        (o = '#ffb0000d'),
        (a = '#ffb00033'),
        (s = '#3498DB'),
        (l = '#2ecc71'),
        (c = '#a855f7'),
        (p = '#00bcd4'),
        (d = '#e0e0e0'),
        (u = (
          e,
          t,
          n,
        ) => `<div style="display:flex;align-items:center;gap:8px;margin:16px 0 8px;padding-bottom:5px;border-bottom:1px solid ${a}">
      <span style="color:${n};font-size:13px">${e}</span>
      <span style="color:${n};font-size:12px;font-weight:bold;letter-spacing:2px">${t}</span>
    </div>`),
        (m = (e, i, a, r, s) => `
    <div style="margin-bottom:12px;padding:8px 12px;border-left:3px solid ${r};background:${o};border-radius:0 6px 6px 0">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
        <div><span style="color:${t};font-weight:bold;font-size:12px">${e}</span> <span style="color:${n};font-size:10px">@ ${i}</span></div>
        <span style="color:${r};font-size:9px;font-weight:bold">${a}</span>
      </div>
      ${s
        .map(e =>
          ((
            e,
            i = !1,
          ) => `<div style="font-size:10px;color:${i ? n : d};line-height:1.5;padding-left:${i ? 18 : 10}px;position:relative;margin:1px 0">
      <span style="position:absolute;left:0;color:${t}">${i ? '&middot;' : '&#9656;'}</span>${e}
    </div>`)(e, !0),
        )
        .join('')}
    </div>`),
        (f = (
          e,
          t,
          i,
        ) => `<div style="padding:7px 10px;border:1px solid ${i}33;border-radius:5px;background:${i}0d">
      <div style="color:${i};font-weight:bold;font-size:10px">${e}</div>
      <div style="color:${n};font-size:9px;margin-top:2px">${t}</div>
    </div>`),
        `
<div style="max-width:660px;margin:4px auto">
  <!-- Header with ASCII photo -->
  <div style="display:flex;align-items:flex-start;gap:16px;padding:14px 18px;background:${o};border:1px solid ${a};border-radius:10px;margin-bottom:4px">
    ${e ? `<div style="flex-shrink:0;line-height:1.05;font-size:5px;letter-spacing:0;filter:drop-shadow(0 0 4px rgba(255,176,0,0.2))">${e.replace(/\n/g, '<br/>')}</div>` : ''}
    <div style="padding-top:2px">
      <div style="font-size:20px;font-weight:bold;color:${t};letter-spacing:1px">DWEEPAN GAIN</div>
      <div style="font-size:12px;color:${i};margin:3px 0 6px">AI / ML Engineer</div>
      <div style="font-size:10px;color:${n};line-height:1.7">
        <span style="color:${t}">&#9679;</span> Vasco Da Gama, Goa, India &nbsp;&nbsp;
        <span style="color:${t}">&#9679;</span> +91 8485841623<br/>
        <span style="color:${t}">&#9679;</span> dweepangain11dec99@gmail.com<br/>
        <span style="color:${t}">&#9679;</span> github.com/Markes10
      </div>
    </div>
  </div>

  <div style="font-size:10px;color:${d};line-height:1.65;padding:6px 0">
    Results-driven AI/ML Engineer specializing in production-grade intelligent systems.
    Deep expertise in LLMs, NLP, and machine learning with strong full-stack
    development foundation. Building end-to-end solutions bridging research
    and real-world business impact.
  </div>

  ${u('&#128187;', 'EXPERIENCE', s)}
  ${m('AI/ML Engineer', 'Labmentix', 'Jan 2024 - Present', s, ['Architected AI-powered CRM + PIM platform for enterprise clients with LLM-based extraction', 'Built ML pipelines reducing manual data entry by 60% across client operations', 'Led prompt engineering initiatives improving extraction accuracy to 94%', 'Designed RESTful APIs handling 10K+ daily requests with sub-200ms response times'])}
  ${m('Software Developer', 'Demerg Systems', 'Jun 2023 - Dec 2023', l, ['Developed full-stack B2B SaaS applications using React, Node.js, and PostgreSQL', 'Implemented real-time data sync via WebSockets, reducing latency by 40%', 'Optimized database queries improving API throughput by 3x under high concurrency'])}
  ${m('AI/ML Intern', 'JYESTA', 'Jan 2023 - May 2023', c, ['Built AI email assistant using OpenAI GPT APIs and Python with NLP classification', 'Achieved 89% accuracy on email classification models for domain-specific routing'])}
  ${m('Web Dev Intern', 'Tentwenty Digital', 'Aug 2022 - Dec 2022', p, ['Built responsive React websites with animated UI components using Framer Motion', 'Optimized site performance achieving Lighthouse scores above 90'])}

  ${u('&#128736;', 'PROJECTS', i)}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px">
    ${f('AI CRM + PIM', 'Python, FastAPI, React, GPT-4, LangChain', s)}
    ${f('AI Email Assistant', 'Python, GPT-4, NLP, SpaCy', l)}
    ${f('Resume Analyzer', 'Python, NLP, scikit-learn', c)}
    ${f('Fraud Detection', 'XGBoost, Random Forest, Flask', '#e74c3c')}
    ${f('Medical Report Analyzer', 'OCR, NLP, FastAPI, React', p)}
    ${f('Secure Chat App', 'React, Socket.IO, AES-256', t)}
    ${f('Social Media Monitor', 'NLP, VADER, Elasticsearch', l)}
  </div>

  ${u('&#128218;', 'SKILLS', l)}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;font-size:10px">
    ${[
      ['Languages', 'Python, JavaScript, TypeScript, SQL, Bash, C++'],
      ['AI / LLM', 'GPT-4, LangChain, Prompt Eng, Fine-Tuning, RAG'],
      ['ML', 'Scikit-learn, XGBoost, Neural Networks, Feature Eng'],
      ['Frontend', 'React, Next.js, Tailwind CSS, Framer Motion'],
      ['Backend', 'Node.js, Express, FastAPI, Flask, WebSockets'],
      ['Cloud', 'AWS, Docker, CI/CD, Git, GitHub Actions'],
      ['Databases', 'PostgreSQL, MongoDB, Redis, Elasticsearch'],
      ['Data Science', 'Pandas, NumPy, Matplotlib, EDA, A/B Testing'],
    ]
      .map(
        ([e, n]) =>
          `<div><span style="color:${t};font-weight:bold">${e}:</span> <span style="color:${d}">${n}</span></div>`,
      )
      .join('')}
  </div>

  ${u('&#127891;', 'EDUCATION', c)}
  <div style="padding:8px 12px;border-left:3px solid ${c};background:${o};border-radius:0 6px 6px 0">
    <div style="color:${t};font-weight:bold;font-size:12px">B.E. Computer Engineering</div>
    <div style="color:${n};font-size:10px;margin-top:2px">Goa College of Engineering, Farmagudi, Goa &middot; 2019 - 2023</div>
    <div style="color:${d};font-size:9px;margin-top:4px;line-height:1.5">
      Data Structures & Algorithms, Machine Learning, Deep Learning,
      Database Management, Operating Systems, Software Engineering
    </div>
  </div>
  <div style="margin-top:10px;padding:8px 12px;border-left:3px solid ${p};background:${o};border-radius:0 6px 6px 0">
    <div style="color:${t};font-weight:bold;font-size:11px">Certifications</div>
    ${['Deep Learning Specialization - Coursera (Andrew Ng)', 'AWS Cloud Practitioner', 'NLP Specialization - Coursera'].map(e => `<div style="color:${d};font-size:9px;margin-top:3px;padding-left:10px;position:relative"><span style="position:absolute;left:0;color:${p}">&#9656;</span>${e}</div>`).join('')}
    </div>

  <div style="text-align:center;margin-top:16px;padding-top:10px;border-top:1px solid ${a};font-size:9px;color:${n}">
    Generated by DWEEPAN CLI &middot; github.com/Markes10
  </div>
</div>`
      );
    }
    function el() {
      return `
========================================
        DWEEPAN GAIN -- RESUME
========================================

AI/ML Engineer | Vasco Da Gama, Goa, India
Email: dweepangain11dec99@gmail.com
Phone: +91 8485841623
GitHub: https://github.com/Markes10

----------------------------------------
PROFESSIONAL SUMMARY
----------------------------------------
Results-driven AI/ML Engineer specializing in production-grade intelligent systems.
Deep expertise in LLMs, NLP, and machine learning with strong full-stack development
foundation. Building end-to-end solutions bridging research and real-world impact.

----------------------------------------
EXPERIENCE
----------------------------------------

AI/ML Engineer -- Labmentix (Jan 2024 - Present)
- Architected AI-powered CRM + PIM platform for enterprise clients
- Built ML pipelines reducing manual data entry by 60%
- Led prompt engineering improving extraction accuracy to 94%

Software Developer -- Demerg Systems (Jun 2023 - Dec 2023)
- Developed full-stack B2B SaaS applications with React, Node.js
- Implemented real-time data sync reducing latency by 40%
- Optimized database performance improving throughput by 3x

AI/ML Intern -- JYESTA (Jan 2023 - May 2023)
- Built AI email assistant with GPT APIs and NLP
- Achieved 89% accuracy on email classification models

Web Dev Intern -- Tentwenty Digital (Aug 2022 - Dec 2022)
- Built responsive React websites improving engagement by 25%
- Achieved Lighthouse scores above 90

----------------------------------------
PROJECTS
----------------------------------------
- AI CRM + PIM Platform (Python, FastAPI, React, GPT-4, LangChain)
- AI Email Assistant (Python, GPT-4, NLP, SpaCy)
- AI-Powered Resume Analyzer (Python, NLP, scikit-learn)
- Fraud Detection System (XGBoost, Random Forest, Flask, Docker)
- Medical Report Analyzer (OCR, NLP, FastAPI, React)
- Secure Chat Application (React, Socket.IO, AES-256)
- Social Media Monitoring Tool (NLP, VADER, Elasticsearch)

----------------------------------------
SKILLS
----------------------------------------
Languages: Python, JavaScript, TypeScript, SQL, Bash, C++
AI/LLM: GPT-4, LangChain, Prompt Engineering, Fine-Tuning, RAG, Hugging Face
ML: Scikit-learn, XGBoost, Neural Networks, Feature Engineering
Data Science: Pandas, NumPy, Matplotlib, EDA, A/B Testing
Frontend: React, Next.js, Tailwind CSS, Framer Motion
Backend: Node.js, Express, FastAPI, Flask, WebSockets
Cloud: AWS, Docker, CI/CD, Git, GitHub Actions
Databases: PostgreSQL, MongoDB, Redis, Elasticsearch

----------------------------------------
EDUCATION
----------------------------------------
B.E. Computer Engineering -- Goa College of Engineering (2019-2023)

========================================
`;
    }
    function ec(e, t) {
      let n = e => ({ id: v(), content: e, type: 'output' }),
        i = e => ({ id: v(), content: e, type: 'error' }),
        o = e[0]?.toLowerCase();
      if (!o)
        return [
          n(''),
          n('  theme: manage terminal color themes'),
          n(''),
          n('  USAGE'),
          n('    theme list                Show all available themes'),
          n('    theme set <name>           Switch to a theme'),
          n(
            '    theme add <name> <hex> [bg <hex>] [prompt <hex>] [accent <hex>]',
          ),
          n('                           Create a custom theme'),
          n('    theme remove <name>        Delete a custom theme'),
          n('    theme info <name>          Show theme color values'),
          n(''),
          n('  QUICK SWITCH'),
          n('    theme <name>              Shortcut for "theme set <name>"'),
          n(''),
          n('  EXAMPLES'),
          n('    theme set cyber'),
          n('    theme set purple'),
          n('    theme add neon #ff00ff bg #0d001a prompt #ff66ff'),
          n(
            '    theme add ocean #00bcd4 bg #001a1f prompt #4dd0e1 accent #0097a7',
          ),
          n('    theme remove neon'),
          n(''),
        ];
      if ('list' === o) {
        let e = d(),
          i = Object.keys(c),
          o = Object.keys(p),
          a = [
            n(''),
            n('  AVAILABLE THEMES'),
            n('  ─────────────────────────────────────'),
            n(''),
          ];
        for (let n of e) {
          let e = i.includes(n) ? 'built-in' : 'custom',
            o = n === t.args[0] ? ' <span style="color:#ffb000">*</span>' : '';
          a.push({
            id: v(),
            content: `    <span style="color:#ffb000;font-weight:bold">${n.padEnd(14)}</span> <span style="color:#707070">[${e}]</span>${o}`,
            type: 'html',
          });
        }
        return (
          a.push(n('')),
          a.push(
            n(
              `  ${e.length} themes available (${i.length} built-in, ${o.length} custom)`,
            ),
          ),
          a.push(n('')),
          a
        );
      }
      if ('info' === o) {
        let t = e[1]?.toLowerCase();
        if (!t || !u(t)) {
          let e = t ? d().find(e => e.startsWith(t)) : null;
          return [
            i(
              `theme: "${t || ''}" not found${e ? `. Did you mean "${e}"?` : ''}`,
            ),
          ];
        }
        let n = m(t),
          o = t.toLowerCase() in c,
          a = e => ({ id: v(), content: e, type: 'html' });
        return [
          a(''),
          a(
            `  Theme: <span style="color:#ffb000;font-weight:bold">${t.toUpperCase()}</span> [${o ? 'built-in' : 'custom'}]`,
          ),
          a('  ─────────────────────────────────────'),
          a(`    <span style="color:#ffb000">text</span>      ${n.text}`),
          a(`    <span style="color:#ffb000">textDim</span>   ${n.textDim}`),
          a(`    <span style="color:#ffb000">textGhost</span> ${n.textGhost}`),
          a(`    <span style="color:#ffb000">bg</span>        ${n.bg}`),
          a(`    <span style="color:#ffb000">prompt</span>    ${n.prompt}`),
          a(`    <span style="color:#ffb000">accent</span>    ${n.accent}`),
          a(`    <span style="color:#ffb000">scanline</span>  ${n.scanline}`),
          a(`    <span style="color:#ffb000">crtGlow</span>   ${n.crtGlow}`),
          a(''),
        ];
      }
      if ('add' === o) {
        let t = e[1];
        if (!t)
          return [
            i(
              'theme add: missing theme name. Usage: theme add <name> <text_color> [bg <hex>] [prompt <hex>] [accent <hex>]',
            ),
          ];
        let o = e[2];
        if (!o)
          return [
            i(
              `theme add: missing text color. Usage: theme add ${t} <text_color_hex> [bg <hex>] ...`,
            ),
          ];
        let a = (function (e, t) {
          var n, i, o;
          let a = e.toLowerCase();
          if (a in c)
            return {
              ok: !1,
              error: `"${e}" is a built-in theme and cannot be overwritten`,
            };
          if (0 === a.length)
            return { ok: !1, error: 'theme name cannot be empty' };
          if (a.includes(' '))
            return { ok: !1, error: 'theme name cannot contain spaces' };
          if (/["<>]/.test(a))
            return { ok: !1, error: 'theme name contains invalid characters' };
          for (let e of ['text', 'bg', 'prompt']) {
            if (
              ((n = t[e]),
              !(/^#([0-9a-fA-F]{3}){1,2}$/.test(n) || /^rgba?\(/.test(n)))
            )
              return {
                ok: !1,
                error: `invalid color for "${e}": ${t[e]}. Use hex (#ff0000) or rgba()`,
              };
          }
          let r =
            ((i = t.text),
            (o = t.bg),
            {
              textDim: (function (e) {
                let t = f(e);
                if (!t) return e;
                let n = e =>
                  Math.round(0.55 * e)
                    .toString(16)
                    .padStart(2, '0');
                return `#${n(t.r)}${n(t.g)}${n(t.b)}`;
              })(i),
              textGhost: g(i, 0.3),
              accent: (function (e) {
                let t = f(e);
                if (!t) return e;
                let n = e =>
                  Math.min(255, Math.round(e + (255 - e) * 0.2))
                    .toString(16)
                    .padStart(2, '0');
                return `#${n(t.r)}${n(t.g)}${n(t.b)}`;
              })(i),
              scanline: g(i, 0.03),
              crtGlow: g(i, 0.04),
            });
          return (
            (p[a] = {
              text: t.text,
              textDim: t.textDim || r.textDim,
              textGhost: t.textGhost || r.textGhost,
              bg: t.bg,
              prompt: t.prompt,
              accent: t.accent || r.accent,
              scanline: t.scanline || r.scanline,
              crtGlow: t.crtGlow || r.crtGlow,
            }),
            { ok: !0 }
          );
        })(t, {
          text: o,
          bg: ep(e, 3, 'bg') || '#0a0a0a',
          prompt: ep(e, 3, 'prompt') || o,
          accent: ep(e, 3, 'accent') || void 0,
        });
        return a.ok
          ? [
              n(''),
              {
                id: v(),
                content: `  Theme <span style="color:#ffb000;font-weight:bold">${t.toLowerCase()}</span> created successfully!`,
                type: 'html',
              },
              n(`  Switch to it with:  theme set ${t.toLowerCase()}`),
              n(''),
            ]
          : [i(`theme add: ${a.error}`)];
      }
      if ('remove' === o || 'delete' === o || 'rm' === o) {
        let t,
          o = e[1];
        if (!o)
          return [
            i('theme remove: missing theme name. Usage: theme remove <name>'),
          ];
        let a =
          (t = o.toLowerCase()) in c
            ? {
                ok: !1,
                error: `"${o}" is a built-in theme and cannot be removed`,
              }
            : t in p
              ? (delete p[t], { ok: !0 })
              : { ok: !1, error: `theme "${o}" not found` };
        return a.ok
          ? [n(`  Theme "${o.toLowerCase()}" removed.`)]
          : [i(`theme remove: ${a.error}`)];
      }
      let a = 'set' === o ? e[1]?.toLowerCase() : o;
      if (!a)
        return [
          i(
            'theme set: missing theme name. Use "theme list" to see available themes.',
          ),
        ];
      if (!u(a)) {
        let e = d().find(e => e.startsWith(a));
        return [
          i(
            `theme: "${a}" not found.${e ? ` Did you mean "${e}"?` : ''} Use "theme list" to see available themes.`,
          ),
        ];
      }
      return (
        t.setTheme(a),
        [
          {
            id: v(),
            content: `  theme: switched to <span style="color:#ffb000;font-weight:bold">${a}</span>`,
            type: 'html',
          },
        ]
      );
    }
    function ep(e, t, n) {
      for (let i = t; i < e.length - 1; i++)
        if (e[i].toLowerCase() === n) return e[i + 1];
    }
    function ed(e, t) {
      let n = t.crtOn ?? !0,
        i = e[0]?.toLowerCase(),
        o = 'on' === i || ('off' !== i && !n);
      return (
        t.setCrt(o),
        [
          {
            id: v(),
            content: `crt: ${o ? 'enabled' : 'disabled'}`,
            type: 'output',
          },
        ]
      );
    }
    function eu(e, t) {
      let n = !t.keysOn;
      return (
        t.setKeys(n),
        [
          {
            id: v(),
            content: `keys: ${n ? 'on (mechanical click)' : 'silent'}`,
            type: 'output',
          },
        ]
      );
    }
    function em(e, t) {
      return 'CLEAR';
    }
    function ef(e, t) {
      let n = e => ({ id: v(), content: e, type: 'output' });
      return [
        n(''),
        n('  DWEEPAN CLI -- COMMAND MANUAL'),
        n('  ============================='),
        n(''),
        n('  NAVIGATION'),
        n('    ls [path]           List directory contents'),
        n('    cd <path>           Change directory'),
        n('    cat <file>          Display file contents'),
        n('    open <file>         Open a file or project'),
        n(''),
        n('  PORTFOLIO'),
        n('    whoami              Display profile with ASCII portrait'),
        n('    profile             Display ASCII portrait + info'),
        n('    experience          Show work history'),
        n('    projects            List all projects'),
        n('    skills              Show technical skills'),
        n('    education           Show education history'),
        n('    contact             Show contact information'),
        n('    resume              Show colorful resume + download'),
        n(
          '    github [repo]       Show GitHub profile / repo README in terminal',
        ),
        n('    mail <address>      Open a pre-filled letter'),
        n(''),
        n('  SYSTEM'),
        n('    theme [name]         Quick-switch theme'),
        n('    theme list           List all available themes'),
        n('    theme add <n> <hex>  Create custom theme'),
        n('    theme remove <name>  Delete a custom theme'),
        n('    theme info <name>    Show theme color values'),
        n(''),
        n('    crt                 Toggle CRT scanline effect'),
        n('    sound              Toggle keypress click sound'),
        n('    keys                Toggle mechanical key click sound'),
        n('    man <command>       Read a command manual'),
        n('    date · echo         Print the date or repeat text'),
        n('    neofetch · cowsay   Terminal classics'),
        n('    sudo · exit · vim   Small shell easter eggs'),
        n('    clear               Clear terminal screen'),
        n('    help                Show this manual'),
        n(''),
        n('  SHORTCUTS'),
        n('    Tab                 Auto-complete commands and paths'),
        n('    Up/Down             Scroll command history'),
        n('    Ctrl+L              Clear screen'),
        n('    Esc                 Cancel current input'),
        n(''),
      ];
    }
    function eg(e, t) {
      return A(['/projects'], { ...t, cwd: '/' });
    }
    let eh = [
      'ls',
      'cd',
      'cat',
      'whoami',
      'skills',
      'experience',
      'education',
      'github',
      'contact',
      'resume',
      'theme',
      'crt',
      'keys',
      'clear',
      'help',
      'projects',
      'profile',
      'open',
      'mail',
      'man',
      'sound',
      'date',
      'echo',
      'neofetch',
      'cowsay',
      'uptime',
      'sudo',
      'exit',
      'logout',
      'vim',
      'vi',
      'emacs',
      'nano',
      'rm',
    ];
    async function ey(e) {
      try {
        if ('u' > typeof navigator && navigator.clipboard?.writeText)
          return (await navigator.clipboard.writeText(e), !0);
        if ('u' > typeof document) {
          let t = document.createElement('textarea');
          ((t.value = e),
            t.setAttribute('readonly', 'true'),
            (t.style.position = 'fixed'),
            (t.style.opacity = '0'),
            document.body.appendChild(t),
            t.select());
          let n = document.execCommand('copy');
          return (document.body.removeChild(t), n);
        }
        return !1;
      } catch {
        return !1;
      }
    }
    async function ex() {
      try {
        if ('u' > typeof navigator && navigator.clipboard?.readText)
          return await navigator.clipboard.readText();
        if ('u' > typeof document) {
          let e = document.createElement('textarea');
          ((e.value = ''),
            e.setAttribute('readonly', 'true'),
            (e.style.position = 'fixed'),
            (e.style.opacity = '0'),
            document.body.appendChild(e),
            e.focus(),
            e.select());
          let t = document.execCommand('paste') ? e.value : '';
          return (document.body.removeChild(e), t);
        }
        return '';
      } catch {
        return '';
      }
    }
    let eb = [
        { text: 'PHOSPHOR BIOS v1.06 — POST', delay: 0 },
        { text: '', delay: 80 },
        { text: '', delay: 200 },
        { text: 'mem check ................. 640K ok', delay: 400 },
        {
          text: 'display ................... amber phosphor, 85 Hz',
          delay: 700,
        },
        { text: '', delay: 900 },
        { text: 'mounting /posts ........... 6 documents', delay: 1100 },
        { text: 'mounting /projects ........ 3 binaries', delay: 1400 },
        { text: 'mounting /topics .......... 10 directories', delay: 1600 },
        { text: '', delay: 1800 },
        { text: 'starting glm-sh ........... ok', delay: 2100 },
        { text: 'last login: never. welcome, stranger.', delay: 2500 },
        { text: '', delay: 3700 },
      ],
      ev = {
        P: ['████', '█  █', '████', '█   ', '█   '],
        O: ['████', '█  █', '█  █', '█  █', '████'],
        R: ['████', '█  █', '████', '█ █ ', '█  █'],
        T: ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
        F: ['████', '█   ', '███ ', '█   ', '█   '],
        L: ['█   ', '█   ', '█   ', '█   ', '████'],
        I: ['███', ' █ ', ' █ ', ' █ ', '███'],
      },
      ew = 'PORTFOLIO'
        .split('')
        .reduce(
          (e, t, n) => e.map((e, i) => `${e}${n ? ' ' : ''}${ev[t][i]}`),
          ['', '', '', '', ''],
        )
        .join('\n'),
      e$ = null;
    function eS() {
      try {
        e$ || (e$ = new AudioContext());
        let e = e$.createOscillator(),
          t = e$.createGain();
        (e.connect(t),
          t.connect(e$.destination),
          e.frequency.setValueAtTime(800 + 400 * Math.random(), e$.currentTime),
          e.frequency.exponentialRampToValueAtTime(200, e$.currentTime + 0.05),
          t.gain.setValueAtTime(0.03, e$.currentTime),
          t.gain.exponentialRampToValueAtTime(0.001, e$.currentTime + 0.06),
          e.start(e$.currentTime),
          e.stop(e$.currentTime + 0.06));
      } catch {}
    }
    e.s(
      [
        'default',
        0,
        function () {
          let [e, o] = (0, n.useState)('amber'),
            [a, r] = (0, n.useState)(!0),
            [s, l] = (0, n.useState)(!1),
            [c, p] = (0, n.useState)('/'),
            [d, u] = (0, n.useState)(''),
            [f, g] = (0, n.useState)([]),
            [h, x] = (0, n.useState)([]),
            [b, w] = (0, n.useState)(-1),
            [S, X] = (0, n.useState)(!0),
            [Z, ee] = (0, n.useState)(!1),
            [et, en] = (0, n.useState)(!0),
            [ei, eo] = (0, n.useState)(!1),
            [es, el] = (0, n.useState)('');
          ((0, n.useEffect)(() => {
            window.__SESSION_START = Date.now();
          }, []),
            (0, n.useEffect)(() => {
              T = h;
            }, [h]));
          let ep = (0, n.useRef)(null),
            ev = (0, n.useRef)(null),
            e$ = (0, n.useRef)({
              input: d,
              output: f,
              cwd: c,
              history: h,
              historyIdx: b,
              isBooting: S,
              bootDone: Z,
              keysOn: s,
              crtOn: a,
            }),
            ek = (0, n.useRef)({
              setTheme: o,
              setCrtOn: r,
              setKeysOn: l,
              setCwd: p,
            });
          (0, n.useEffect)(() => {
            ((e$.current = {
              input: d,
              output: f,
              cwd: c,
              history: h,
              historyIdx: b,
              isBooting: S,
              bootDone: Z,
              keysOn: s,
              crtOn: a,
            }),
              (ek.current = {
                setTheme: o,
                setCrtOn: r,
                setKeysOn: l,
                setCwd: p,
              }));
          });
          let eA = m(e);
          ((0, n.useCallback)(
            (t = e) => {
              if (!Z) return;
              let n = `profile-loading-${Date.now()}`,
                i = `profile-separator-${Date.now()}`;
              (g(e => [
                ...e.filter(
                  e =>
                    !e.id.startsWith('profile-loading-') &&
                    !e.id.startsWith('profile-separator-') &&
                    !e.id.startsWith('profile-art-') &&
                    !e.id.startsWith('profile-end-'),
                ),
                { id: i, content: '', type: 'output' },
                { id: n, content: '  Loading profile card...', type: 'output' },
              ]),
                y(t).then(e => {
                  (g(t => [
                    ...t.filter(
                      e =>
                        !e.id.startsWith('profile-loading-') &&
                        !e.id.startsWith('profile-separator-') &&
                        !e.id.startsWith('profile-art-') &&
                        !e.id.startsWith('profile-end-'),
                    ),
                    {
                      id: `profile-art-${Date.now()}`,
                      content: e,
                      type: 'html',
                    },
                    {
                      id: `profile-end-${Date.now()}`,
                      content: '',
                      type: 'output',
                    },
                  ]),
                    setTimeout(() => ev.current?.focus(), 50));
                }));
            },
            [Z, e],
          ),
            (0, n.useEffect)(() => {
              let e = setInterval(() => en(e => !e), 1060);
              return () => clearInterval(e);
            }, []),
            (0, n.useEffect)(() => {
              ep.current && (ep.current.scrollTop = ep.current.scrollHeight);
            }, [f, S, d]),
            (0, n.useCallback)(() => {
              ev.current?.focus();
            }, []),
            (0, n.useEffect)(() => {
              let t = t => {
                let n = e$.current;
                if (!n.bootDone || n.isBooting) return;
                if ('Tab' === t.key) {
                  t.preventDefault();
                  let e = (function (e, t, n) {
                    let i = e.split(/\s+/);
                    if (i.length <= 1)
                      return eh.find(e => e.startsWith(i[0])) || e;
                    if (!['ls', 'cd', 'cat'].includes(i[0])) return e;
                    let o = i[i.length - 1].split('/'),
                      a = o.pop() || '',
                      r = o.join('/'),
                      s = k(n, r ? $(t, r) : t);
                    if (!s || 'directory' !== s.type || !s.children) return e;
                    let l = Object.keys(s.children).filter(e =>
                      e.startsWith(a),
                    );
                    if (1 === l.length) {
                      let e = l[0],
                        t = 'directory' === s.children[e].type ? '/' : '';
                      return (
                        i.slice(0, -1).join(' ') +
                        ' ' +
                        r +
                        (r ? '/' : '') +
                        e +
                        t
                      );
                    }
                    return e;
                  })(n.input, n.cwd, i);
                  e !== n.input && u(e);
                  return;
                }
                if ('ArrowUp' === t.key) {
                  if ((t.preventDefault(), 0 === n.history.length)) return;
                  let e =
                    -1 === n.historyIdx
                      ? 0
                      : Math.min(n.historyIdx + 1, n.history.length - 1);
                  (w(e), u(n.history[e]));
                  return;
                }
                if ('ArrowDown' === t.key) {
                  if ((t.preventDefault(), -1 === n.historyIdx)) return;
                  if (0 === n.historyIdx) (w(-1), u(''));
                  else {
                    let e = n.historyIdx - 1;
                    (w(e), u(n.history[e]));
                  }
                  return;
                }
                if ('l' === t.key && t.ctrlKey) {
                  (t.preventDefault(), g([]));
                  return;
                }
                if ('c' === t.key && t.ctrlKey) {
                  (t.preventDefault(),
                    g(e => [
                      ...e,
                      {
                        id: `ctrlc-${Date.now()}`,
                        content: `Dweepan@cli: ~& ${n.input}^C`,
                        type: 'input',
                      },
                    ]),
                    u(''),
                    w(-1));
                  return;
                }
                if ('u' === t.key && t.ctrlKey) {
                  (t.preventDefault(), u(''));
                  return;
                }
                if ('Backspace' === t.key || 'Backspace' === t.code) {
                  (t.preventDefault(),
                    u(e => e.slice(0, -1)),
                    w(-1),
                    n.keysOn && eS());
                  return;
                }
                if ('Enter' === t.key) {
                  t.preventDefault();
                  let o = n.input.trim();
                  if (!o) return;
                  let a = [
                      ...n.output,
                      {
                        id: `echo-${Date.now()}`,
                        content: `Dweepan@cli: ~& ${o}`,
                        type: 'input',
                      },
                    ],
                    r = (function (e, t) {
                      var n;
                      let i,
                        o = e.trim();
                      if (!o) return [];
                      let a = o.split(/\s+/),
                        r = a[0].toLowerCase(),
                        s = a.slice(1),
                        l = {
                          ls: A,
                          cd: I,
                          cat: D,
                          whoami: J,
                          skills: V,
                          experience: Q,
                          education: q,
                          github: Y,
                          contact: ea,
                          resume: er,
                          theme: ec,
                          crt: ed,
                          keys: eu,
                          clear: em,
                          help: ef,
                          projects: eg,
                          profile: C,
                          date: L,
                          echo: E,
                          uptime: P,
                          neofetch: R,
                          history: M,
                          pwd: z,
                          man: G,
                          mail: N,
                          cowsay: O,
                          open: j,
                          sudo: B,
                          exit: F,
                          logout: F,
                          vim: U,
                          vi: U,
                          emacs: U,
                          nano: U,
                          rm: _,
                          sound: W,
                        }[r];
                      return l
                        ? l(s, t)
                        : r.startsWith('./')
                          ? ((n = r.slice(2)),
                            (i = {
                              blinkd:
                                'blinkd 1.06 — cursor timing daemon claimed the blink.',
                              'mdcat.js':
                                'mdcat.js 2.1 — markdown renderer ready, 0 dependencies.',
                              'phosphor.css':
                                'phosphor.css — CRT theme kit loaded.',
                              'tty-portfolio':
                                'tty-portfolio v1.06 — you are inside it right now. hi.',
                            })[n]
                              ? [
                                  K(i[n]),
                                  K(
                                    'done. every blink you see is billed to the daemon.',
                                  ),
                                ]
                              : [
                                  H(`open: nothing called './${n}'`),
                                  K('try: ls projects'),
                                ])
                          : [
                              {
                                id: v(),
                                content: `retrosh: command not found: ${r}. Type 'help' for available commands.`,
                                type: 'error',
                              },
                            ];
                    })(o, {
                      args: [],
                      cwd: n.cwd,
                      fs: i,
                      theme: e,
                      setCwd: e => ek.current.setCwd(e),
                      setTheme: e => {
                        (eo(!0),
                          setTimeout(() => {
                            (ek.current.setTheme(e), eo(!1));
                          }, 200));
                      },
                      setCrt: e => ek.current.setCrtOn(e),
                      setKeys: e => ek.current.setKeysOn(e),
                      appendOutput: e => g(t => [...t, ...e]),
                      crtOn: n.crtOn,
                      keysOn: n.keysOn,
                    });
                  (r.length > 0 && 'CLEAR' === r ? g([]) : (a.push(...r), g(a)),
                    x(e => [o, ...e.filter(e => e !== o)].slice(0, 100)),
                    w(-1),
                    u(''));
                  return;
                }
                if ('Escape' === t.key) {
                  (t.preventDefault(), u(''), w(-1));
                  return;
                }
                let o = '';
                if (
                  (1 === t.key.length
                    ? (o = t.key)
                    : !t.ctrlKey &&
                        !t.metaKey &&
                        !t.altKey &&
                        t.code &&
                        t.code.startsWith('Key')
                      ? (o = t.code.slice(3).toLowerCase())
                      : !t.ctrlKey &&
                          !t.metaKey &&
                          !t.altKey &&
                          t.code &&
                          t.code.startsWith('Digit')
                        ? (o = t.code.slice(5))
                        : t.ctrlKey ||
                            t.metaKey ||
                            t.altKey ||
                            'Space' !== t.code
                          ? t.ctrlKey ||
                            t.metaKey ||
                            t.altKey ||
                            'Minus' !== t.code
                            ? t.ctrlKey ||
                              t.metaKey ||
                              t.altKey ||
                              'Period' !== t.code
                              ? t.ctrlKey ||
                                t.metaKey ||
                                t.altKey ||
                                'Slash' !== t.code ||
                                (o = '/')
                              : (o = '.')
                            : (o = '-')
                          : (o = ' '),
                  o)
                ) {
                  (t.preventDefault(), u(e => e + o), n.keysOn && eS());
                  return;
                }
              };
              return (
                window.addEventListener('keydown', t),
                () => window.removeEventListener('keydown', t)
              );
            }, [e]),
            (0, n.useEffect)(() => {
              let e = [],
                t = [];
              eb.forEach(n => {
                let i = setTimeout(() => {
                  (e.push({
                    id: `boot-${Date.now()}-${Math.random()}`,
                    content: n.text,
                    type: 'boot',
                  }),
                    g([...e]));
                }, n.delay);
                t.push(i);
              });
              let n = setTimeout(() => {
                let n = ew.split('\n');
                n.forEach((n, i) => {
                  let o = setTimeout(() => {
                    (e.push({
                      id: `banner-${Date.now()}-${i}`,
                      content: n,
                      type: 'banner',
                    }),
                      g([...e]));
                  }, 15 * i);
                  t.push(o);
                });
                let i = setTimeout(
                  () => {
                    (X(!1), ee(!0));
                  },
                  15 * n.length + 300,
                );
                t.push(i);
              }, 4e3);
              return (t.push(n), () => t.forEach(clearTimeout));
            }, []),
            (0, n.useEffect)(() => {
              let e = async e => {
                if (Z) {
                  if ((e.ctrlKey || e.metaKey) && 'c' === e.key.toLowerCase()) {
                    let t = window.getSelection()?.toString();
                    t && (e.preventDefault(), await ey(t), el(t));
                  }
                  if ((e.ctrlKey || e.metaKey) && 'v' === e.key.toLowerCase()) {
                    e.preventDefault();
                    let t = await ex();
                    t && u(e => `${e}${t}`);
                  }
                }
              };
              return (
                window.addEventListener('keydown', e),
                () => window.removeEventListener('keydown', e)
              );
            }, [Z]));
          let eI = (0, n.useMemo)(
            () =>
              Z
                ? (function (e, t, n) {
                    let i = e.split(/\s+/);
                    if (i.length <= 1) {
                      let e = eh.find(e => e.startsWith(i[0]));
                      return e ? e.slice(i[0].length) : '';
                    }
                    if (!['ls', 'cd', 'cat'].includes(i[0])) return '';
                    let o = i[i.length - 1].split('/'),
                      a = o.pop() || '',
                      r = o.join('/'),
                      s = k(n, r ? $(t, r) : t);
                    if (!s || 'directory' !== s.type || !s.children) return '';
                    let l = Object.keys(s.children).filter(e =>
                      e.startsWith(a),
                    );
                    if (1 === l.length) {
                      let e = l[0];
                      return (
                        e.slice(a.length) +
                        ('directory' === s.children[e].type ? '/' : '')
                      );
                    }
                    return '';
                  })(d, c, i)
                : '',
            [d, c, Z],
          );
          return (0, t.jsxs)('div', {
            ref: ev,
            tabIndex: 0,
            className:
              'terminal-app relative flex h-screen w-full flex-col overflow-hidden select-none outline-none',
            'data-theme': e,
            style: {
              backgroundColor: eA.bg,
              color: eA.text,
              transition: 'background-color 0.2s, color 0.2s',
              opacity: +!ei,
            },
            'aria-label': 'Phosphor terminal - type help for commands',
            children: [
              a &&
                (0, t.jsx)('div', {
                  className: 'pointer-events-none absolute inset-0 z-30',
                  style: {
                    background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${eA.scanline} 2px, ${eA.scanline} 4px)`,
                  },
                }),
              a &&
                (0, t.jsx)('div', {
                  className: 'pointer-events-none absolute inset-0 z-20',
                  style: {
                    background:
                      'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
                  },
                }),
              a &&
                (0, t.jsx)('div', {
                  className: 'pointer-events-none absolute inset-0 z-10',
                  style: { backgroundColor: eA.crtGlow },
                }),
              (0, t.jsxs)('div', {
                ref: ep,
                className:
                  'terminal-scroll relative z-10 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed',
                style: {
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${eA.textDim} transparent`,
                },
                children: [
                  f.map(e =>
                    'html' === e.type
                      ? (0, t.jsx)(
                          'div',
                          {
                            className:
                              'terminal-output whitespace-pre select-text',
                            'data-type': e.type,
                            style: {
                              lineHeight: '1.15',
                              fontSize: '12px',
                              letterSpacing: '0.5px',
                            },
                            dangerouslySetInnerHTML: { __html: e.content },
                            onMouseUp: () => {
                              let e = window.getSelection()?.toString();
                              e && el(e);
                            },
                          },
                          e.id,
                        )
                      : (0, t.jsx)(
                          'div',
                          {
                            className:
                              'terminal-output whitespace-pre-wrap break-all select-text',
                            'data-type': e.type,
                            'aria-label':
                              'banner' === e.type ? 'PORTFOLIO' : void 0,
                            style: {
                              color:
                                'error' === e.type
                                  ? eA.accent
                                  : 'input' === e.type
                                    ? eA.textDim
                                    : 'banner' === e.type
                                      ? eA.text
                                      : 'boot' === e.type
                                        ? eA.textDim
                                        : eA.text,
                              fontWeight:
                                'banner' === e.type ? 'bold' : 'normal',
                              fontSize: 'banner' === e.type ? '17px' : void 0,
                              lineHeight: 'banner' === e.type ? '1.08' : void 0,
                              letterSpacing:
                                'banner' === e.type ? '0.2px' : void 0,
                            },
                            onMouseUp: () => {
                              let e = window.getSelection()?.toString();
                              e && el(e);
                            },
                            children: e.content || ' ',
                          },
                          e.id,
                        ),
                  ),
                  S &&
                    (0, t.jsx)('div', {
                      className: 'flex items-center',
                      children: (0, t.jsx)('span', {
                        className: 'inline-block w-[8px] h-[16px]',
                        style: {
                          backgroundColor: et ? eA.text : 'transparent',
                          animation: 'blink 1.06s step-end infinite',
                        },
                      }),
                    }),
                ],
              }),
              Z &&
                (0, t.jsx)('div', {
                  className: 'terminal-bottom relative z-10',
                  children: (0, t.jsxs)('div', {
                    className: 'terminal-prompt flex whitespace-pre',
                    children: [
                      (0, t.jsx)('span', {
                        style: { color: eA.prompt, fontWeight: 'bold' },
                        children: 'Dweepan@cli: ~& ',
                      }),
                      (0, t.jsx)('span', { children: d }),
                      eI &&
                        (0, t.jsx)('span', {
                          style: { color: eA.textGhost },
                          children: eI,
                        }),
                      (0, t.jsx)('span', {
                        className:
                          'inline-block w-[8px] h-[16px] align-text-bottom flex-shrink-0',
                        style: {
                          backgroundColor: et ? eA.text : 'transparent',
                          transition: 'background-color 0.1s',
                        },
                      }),
                    ],
                  }),
                }),
            ],
          });
        },
      ],
      6203,
    );
  },
]);
