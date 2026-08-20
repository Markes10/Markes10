import { CommandContext, FSNode, OutputLine, ThemeName } from './types';

let idCounter = 0;
const uid = () => `line-${++idCounter}-${Date.now()}`;

function resolvePath(cwd: string, target: string): string {
  if (target.startsWith('/')) return normalizePath(target);
  if (target === '..') {
    const parts = cwd.split('/').filter(Boolean);
    parts.pop();
    return '/' + parts.join('/');
  }
  if (target === '.') return cwd;
  return normalizePath(cwd === '/' ? `/${target}` : `${cwd}/${target}`);
}

function normalizePath(p: string): string {
  const parts = p.split('/').filter(Boolean);
  const resolved: string[] = [];
  for (const part of parts) {
    if (part === '..') resolved.pop();
    else if (part !== '.') resolved.push(part);
  }
  return '/' + resolved.join('/');
}

function getNode(fs: FSNode, path: string): FSNode | null {
  if (path === '/') return fs;
  const parts = path.split('/').filter(Boolean);
  let current = fs;
  for (const part of parts) {
    if (!current.children || !current.children[part]) return null;
    current = current.children[part];
  }
  return current;
}

export function executeCommand(
  rawInput: string,
  ctx: CommandContext
): OutputLine[] {
  const trimmed = rawInput.trim();
  if (!trimmed) return [];

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const commands: Record<string, (args: string[], ctx: CommandContext) => OutputLine[]> = {
    ls: cmdLs,
    cd: cmdCd,
    cat: cmdCat,
    whoami: cmdWhoami,
    skills: cmdSkills,
    experience: cmdExperience,
    education: cmdEducation,
    github: cmdGithub,
    contact: cmdContact,
    resume: cmdResume,
    theme: cmdTheme,
    crt: cmdCrt,
    keys: cmdKeys,
    clear: cmdClear,
    help: cmdHelp,
    projects: cmdProjects,
  };

  const handler = commands[cmd];
  if (handler) return handler(args, ctx);

  return [{ id: uid(), content: `retrosh: command not found: ${cmd}. Type 'help' for available commands.`, type: 'error' }];
}

function cmdLs(args: string[], ctx: CommandContext): OutputLine[] {
  const target = args[0] ? resolvePath(ctx.cwd, args[0]) : ctx.cwd;
  const node = getNode(ctx.fs, target);
  if (!node) return [{ id: uid(), content: `ls: cannot access '${args[0] || target}': No such file or directory`, type: 'error' }];
  if (node.type === 'file') return [{ id: uid(), content: node.name, type: 'output' }];
  if (!node.children) return [{ id: uid(), content: '(empty directory)', type: 'output' }];
  const entries = Object.keys(node.children).sort((a, b) => {
    const aDir = node.children![a].type === 'directory' ? 0 : 1;
    const bDir = node.children![b].type === 'directory' ? 0 : 1;
    if (aDir !== bDir) return aDir - bDir;
    return a.localeCompare(b);
  });
  const lines = entries.map(name => {
    const child = node.children![name];
    const suffix = child.type === 'directory' ? '/' : '';
    return { id: uid(), content: `  ${name}${suffix}`, type: 'output' as const };
  });
  return lines;
}

function cmdCd(args: string[], ctx: CommandContext): OutputLine[] {
  const target = args[0] || '/';
  const resolved = resolvePath(ctx.cwd, target);
  const node = getNode(ctx.fs, resolved);
  if (!node) return [{ id: uid(), content: `cd: no such file or directory: ${target}`, type: 'error' }];
  if (node.type === 'file') return [{ id: uid(), content: `cd: not a directory: ${target}`, type: 'error' }];
  ctx.setCwd(resolved || '/');
  return [];
}

function cmdCat(args: string[], ctx: CommandContext): OutputLine[] {
  if (!args[0]) return [{ id: uid(), content: 'cat: missing file operand', type: 'error' }];
  const resolved = resolvePath(ctx.cwd, args[0]);
  const node = getNode(ctx.fs, resolved);
  if (!node) return [{ id: uid(), content: `cat: ${args[0]}: No such file or directory`, type: 'error' }];
  if (node.type === 'directory') return [{ id: uid(), content: `cat: ${args[0]}: Is a directory`, type: 'error' }];
  return node.content!.split('\n').map(line => ({ id: uid(), content: line, type: 'output' as const }));
}

function cmdWhoami(_args: string[], _ctx: CommandContext): OutputLine[] {
  return [
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: '  Name:     Dweepan Gain', type: 'output' },
    { id: uid(), content: '  Title:    AI/ML Engineer', type: 'output' },
    { id: uid(), content: '  Location: Vasco Da Gama, Goa, India', type: 'output' },
    { id: uid(), content: '  Pitch:    Building intelligent systems at the intersection of AI and software engineering.', type: 'output' },
    { id: uid(), content: '', type: 'output' },
  ];
}

function cmdSkills(_args: string[], ctx: CommandContext): OutputLine[] {
  const skillsNode = getNode(ctx.fs, '/skills/skills.txt');
  if (skillsNode?.content) {
    return skillsNode.content.split('\n').map(line => ({ id: uid(), content: line, type: 'output' as const }));
  }
  return [{ id: uid(), content: 'skills: data not found', type: 'error' }];
}

function cmdExperience(_args: string[], ctx: CommandContext): OutputLine[] {
  const expNode = getNode(ctx.fs, '/experience');
  if (!expNode?.children) return [{ id: uid(), content: 'experience: data not found', type: 'error' }];
  const lines: OutputLine[] = [{ id: uid(), content: '', type: 'output' }];
  const order = ['labmentix.txt', 'demerg-systems.txt', 'jyesta.txt', 'tentwenty-digital.txt'];
  for (const name of order) {
    const file = expNode.children[name];
    if (file?.content) {
      lines.push(...file.content.split('\n').map(line => ({ id: uid(), content: line, type: 'output' as const })));
      lines.push({ id: uid(), content: '', type: 'output' });
    }
  }
  return lines;
}

function cmdEducation(_args: string[], ctx: CommandContext): OutputLine[] {
  const eduNode = getNode(ctx.fs, '/education/education.txt');
  if (eduNode?.content) {
    return eduNode.content.split('\n').map(line => ({ id: uid(), content: line, type: 'output' as const }));
  }
  return [{ id: uid(), content: 'education: data not found', type: 'error' }];
}

function cmdGithub(args: string[], _ctx: CommandContext): OutputLine[] {
  const baseUrl = 'https://github.com/Markes10';
  if (args[0]) {
    const url = `${baseUrl}/${args[0]}`;
    if (typeof window !== 'undefined') window.open(url, '_blank');
    return [{ id: uid(), content: `Opening ${url} ...`, type: 'output' }];
  }
  if (typeof window !== 'undefined') window.open(baseUrl, '_blank');
  return [
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: `  GitHub: ${baseUrl}`, type: 'output' },
    { id: uid(), content: '  Opening in new tab...', type: 'output' },
    { id: uid(), content: '', type: 'output' },
  ];
}

function cmdContact(_args: string[], ctx: CommandContext): OutputLine[] {
  const contactNode = getNode(ctx.fs, '/contact/contact.txt');
  const lines: OutputLine[] = [];
  if (contactNode?.content) {
    lines.push(...contactNode.content.split('\n').map(line => ({ id: uid(), content: line, type: 'output' as const })));
  }
  lines.push({ id: uid(), content: '', type: 'output' });
  lines.push({ id: uid(), content: '  Send an email:', type: 'output' });
  lines.push({
    id: uid(),
    content: '  mailto:dweepangain11dec99@gmail.com',
    type: 'output',
  });
  lines.push({ id: uid(), content: '', type: 'output' });
  return lines;
}

function cmdResume(_args: string[], _ctx: CommandContext): OutputLine[] {
  // Generate a simple text resume and download it
  if (typeof window === 'undefined') return [{ id: uid(), content: 'resume: not available in SSR', type: 'error' }];

  // Build resume content
  const content = buildResumeText();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Dweepan_Gain_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return [
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: '  Downloading resume...', type: 'output' },
    { id: uid(), content: '  File: Dweepan_Gain_Resume.txt', type: 'output' },
    { id: uid(), content: '', type: 'output' },
  ];
}

function buildResumeText(): string {
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

function cmdTheme(args: string[], ctx: CommandContext): OutputLine[] {
  const validThemes: ThemeName[] = ['amber', 'green', 'white'];
  if (!args[0]) {
    return [{ id: uid(), content: `theme: usage: theme <amber|green|white>`, type: 'output' }];
  }
  const t = args[0].toLowerCase() as ThemeName;
  if (!validThemes.includes(t)) {
    return [{ id: uid(), content: `theme: invalid theme '${args[0]}'. Available: amber, green, white`, type: 'error' }];
  }
  ctx.setTheme(t);
  return [{ id: uid(), content: `theme: switched to ${t}`, type: 'output' }];
}

function cmdCrt(_args: string[], ctx: CommandContext): OutputLine[] {
  const current = (ctx as unknown as { crtOn: boolean }).crtOn ?? true;
  const newVal = !current;
  ctx.setCrt(newVal);
  return [{ id: uid(), content: `crt: ${newVal ? 'enabled' : 'disabled'}`, type: 'output' }];
}

function cmdKeys(_args: string[], ctx: CommandContext): OutputLine[] {
  const current = (ctx as unknown as { keysOn: boolean }).keysOn ?? false;
  const newVal = !current;
  ctx.setKeys(newVal);
  return [{ id: uid(), content: `keys: ${newVal ? 'on (mechanical click)' : 'silent'}`, type: 'output' }];
}

function cmdClear(_args: string[], _ctx: CommandContext): OutputLine[] {
  return 'CLEAR' as any;
}

function cmdHelp(_args: string[], _ctx: CommandContext): OutputLine[] {
  const lines = [
    { id: uid(), content: '', type: 'output' as const },
    { id: uid(), content: '  RETROSHELL -- COMMAND MANUAL', type: 'output' as const },
    { id: uid(), content: '  ============================', type: 'output' as const },
    { id: uid(), content: '', type: 'output' as const },
    { id: uid(), content: '  NAVIGATION', type: 'output' as const },
    { id: uid(), content: '    ls [path]           List directory contents', type: 'output' as const },
    { id: uid(), content: '    cd <path>           Change directory', type: 'output' as const },
    { id: uid(), content: '    cat <file>          Display file contents', type: 'output' as const },
    { id: uid(), content: '', type: 'output' as const },
    { id: uid(), content: '  PORTFOLIO', type: 'output' as const },
    { id: uid(), content: '    whoami              Display profile summary', type: 'output' as const },
    { id: uid(), content: '    experience          Show work history', type: 'output' as const },
    { id: uid(), content: '    projects            List all projects', type: 'output' as const },
    { id: uid(), content: '    skills              Show technical skills', type: 'output' as const },
    { id: uid(), content: '    education           Show education history', type: 'output' as const },
    { id: uid(), content: '    contact             Show contact information', type: 'output' as const },
    { id: uid(), content: '    resume              Download resume file', type: 'output' as const },
    { id: uid(), content: '    github [repo]       Open GitHub (or specific repo)', type: 'output' as const },
    { id: uid(), content: '', type: 'output' as const },
    { id: uid(), content: '  SYSTEM', type: 'output' as const },
    { id: uid(), content: '    theme <amber|green|white>  Switch terminal color theme', type: 'output' as const },
    { id: uid(), content: '    crt                 Toggle CRT scanline effect', type: 'output' as const },
    { id: uid(), content: '    keys                Toggle mechanical key click sound', type: 'output' as const },
    { id: uid(), content: '    clear               Clear terminal screen', type: 'output' as const },
    { id: uid(), content: '    help                Show this manual', type: 'output' as const },
    { id: uid(), content: '', type: 'output' as const },
    { id: uid(), content: '  SHORTCUTS', type: 'output' as const },
    { id: uid(), content: '    Tab                 Auto-complete commands and paths', type: 'output' as const },
    { id: uid(), content: '    Up/Down             Scroll command history', type: 'output' as const },
    { id: uid(), content: '    Ctrl+L              Clear screen', type: 'output' as const },
    { id: uid(), content: '    Esc                 Cancel current input', type: 'output' as const },
    { id: uid(), content: '', type: 'output' as const },
  ];
  return lines;
}

function cmdProjects(_args: string[], ctx: CommandContext): OutputLine[] {
  return cmdLs(['/projects'], { ...ctx, cwd: '/' });
}

// Tab completion logic
export function getTabCompletion(input: string, cwd: string, fs: FSNode): string {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    // Complete command name
    const prefix = parts[0];
    const commands = ['ls', 'cd', 'cat', 'whoami', 'skills', 'experience', 'education', 'github', 'contact', 'resume', 'theme', 'crt', 'keys', 'clear', 'help', 'projects'];
    const match = commands.find(c => c.startsWith(prefix));
    return match ? match : input;
  }

  // Complete file/folder path
  const cmd = parts[0];
  if (!['ls', 'cd', 'cat'].includes(cmd)) return input;

  const pathPartial = parts[parts.length - 1];
  const dirParts = pathPartial.split('/');
  const prefix = dirParts.pop() || '';
  const dirPath = dirParts.join('/');
  const targetDir = dirPath ? resolvePath(cwd, dirPath) : cwd;
  const node = getNode(fs, targetDir);

  if (!node || node.type !== 'directory' || !node.children) return input;

  const matches = Object.keys(node.children).filter(name => name.startsWith(prefix));
  if (matches.length === 1) {
    const completed = matches[0];
    const suffix = node.children[completed].type === 'directory' ? '/' : '';
    return parts.slice(0, -1).join(' ') + ' ' + dirPath + (dirPath ? '/' : '') + completed + suffix;
  }
  return input;
}

export function getGhostText(input: string, cwd: string, fs: FSNode): string {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    const prefix = parts[0];
    const commands = ['ls', 'cd', 'cat', 'whoami', 'skills', 'experience', 'education', 'github', 'contact', 'resume', 'theme', 'clear', 'help', 'projects'];
    const match = commands.find(c => c.startsWith(prefix));
    return match ? match.slice(prefix.length) : '';
  }
  const cmd = parts[0];
  if (!['ls', 'cd', 'cat'].includes(cmd)) return '';
  const pathPartial = parts[parts.length - 1];
  const dirParts = pathPartial.split('/');
  const prefix = dirParts.pop() || '';
  const dirPath = dirParts.join('/');
  const targetDir = dirPath ? resolvePath(cwd, dirPath) : cwd;
  const node = getNode(fs, targetDir);
  if (!node || node.type !== 'directory' || !node.children) return '';
  const matches = Object.keys(node.children).filter(name => name.startsWith(prefix));
  if (matches.length === 1) {
    const completed = matches[0];
    return completed.slice(prefix.length) + (node.children[completed].type === 'directory' ? '/' : '');
  }
  return '';
}
