import { CommandContext, FSNode, OutputLine, ThemeName } from './types';
import { createProfileArtHTML } from './profileArt';

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
    profile: cmdProfile,
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
    { id: uid(), content: createProfileArtHTML(), type: 'html' },
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: '  Building intelligent systems at the intersection of', type: 'output' },
    { id: uid(), content: '  AI and software engineering.', type: 'output' },
    { id: uid(), content: '', type: 'output' },
  ];
}

function cmdProfile(_args: string[], _ctx: CommandContext): OutputLine[] {
  return [
    { id: uid(), content: createProfileArtHTML(), type: 'html' },
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

// ── GitHub: fetch API and display in terminal ──────────────────────────
function cmdGithub(args: string[], ctx: CommandContext): OutputLine[] {
  if (typeof window === 'undefined') {
    return [{ id: uid(), content: 'github: not available in SSR', type: 'error' }];
  }

  const username = 'Markes10';

  // Show a loading spinner immediately
  const loadingLines: OutputLine[] = [
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: `  Fetching GitHub data for <span style="color:#ffb000;font-weight:bold">${username}</span>...`, type: 'html' },
  ];

  // Async fetch – append results via appendOutput
  if (args[0]) {
    // Specific repo
    const repo = args[0];
    fetchGitHubRepo(username, repo, ctx.appendOutput);
  } else {
    fetchGitHubProfile(username, ctx.appendOutput);
  }

  return loadingLines;
}

interface GitHubUser {
  login: string; name: string | null; bio: string | null;
  public_repos: number; followers: number; following: number;
  location: string | null; blog: string | null; twitter_username: string | null;
  created_at: string; avatar_url: string;
}

interface GitHubRepo {
  name: string; description: string | null; language: string | null;
  stargazers_count: number; forks_count: number;
  html_url: string; updated_at: string; topics: string[];
}

async function fetchGitHubProfile(username: string, appendOutput: (lines: OutputLine[]) => void) {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`),
    ]);
    if (!userRes.ok) throw new Error(`GitHub API returned ${userRes.status}`);
    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

    const lines: OutputLine[] = [
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: buildGitHubProfileHTML(user, repos), type: 'html' },
      { id: uid(), content: '', type: 'output' },
    ];
    appendOutput(lines);
  } catch (err: any) {
    appendOutput([
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: `  github: error - ${err.message}`, type: 'error' },
      { id: uid(), content: '', type: 'output' },
    ]);
  }
}

async function fetchGitHubRepo(username: string, repo: string, appendOutput: (lines: OutputLine[]) => void) {
  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}`);
    if (!res.ok) throw new Error(`Repository '${repo}' not found (HTTP ${res.status})`);
    const repoData: GitHubRepo = await res.json();

    const langColors: Record<string, string> = {
      Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
      'Jupyter Notebook': '#DA5B0B', HTML: '#e34c26', CSS: '#563d7c',
      Shell: '#89e051', Dockerfile: '#384d54', Go: '#00ADD8',
    };
    const langColor = langColors[repoData.language || ''] || '#8b949e';

    const html = `
<div style="margin:6px 0">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
    <img src="${repoData.html_url}/raw/master/demo.png" 
         onerror="this.style.display='none'"
         style="width:80px;height:80px;border-radius:8px;border:1px solid #ffb00044;object-fit:cover" />
    <div>
      <div style="font-size:16px;font-weight:bold;color:#ffb000">${repoData.name}</div>
      <div style="font-size:11px;color:#b37d00;margin-top:4px">${repoData.description || 'No description'}</div>
    </div>
  </div>
  <div style="display:flex;gap:20px;font-size:12px;margin-bottom:12px;flex-wrap:wrap">
    <span style="color:#ffb000">&#9733; ${repoData.stargazers_count}</span>
    <span style="color:#ffb000">&#128268; ${repoData.forks_count} forks</span>
    <span>Lang: <span style="color:${langColor};font-weight:bold">${repoData.language || 'N/A'}</span></span>
    <span>Updated: ${new Date(repoData.updated_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
  </div>
  <div style="font-size:11px;color:#b37d00">${repoData.html_url}</div>
  ${repoData.topics.length ? `<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${repoData.topics.map(t => `<span style="font-size:10px;background:#ffb00022;color:#ffb000;padding:2px 8px;border-radius:10px;border:1px solid #ffb00044">${t}</span>`).join('')}</div>` : ''}
</div>`;

    appendOutput([
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: html, type: 'html' },
      { id: uid(), content: '', type: 'output' },
    ]);
  } catch (err: any) {
    appendOutput([
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: `  github: ${err.message}`, type: 'error' },
      { id: uid(), content: '', type: 'output' },
    ]);
  }
}

function buildGitHubProfileHTML(user: GitHubUser, repos: GitHubRepo[]): string {
  const langColors: Record<string, string> = {
    Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
    'Jupyter Notebook': '#DA5B0B', HTML: '#e34c26', CSS: '#563d7c',
    Shell: '#89e051', Dockerfile: '#384d54', Go: '#00ADD8',
  };

  const topRepos = repos.slice(0, 8);
  const reposHTML = topRepos.map(r => {
    const lc = langColors[r.language || ''] || '#8b949e';
    return `
    <div style="padding:10px 14px;border:1px solid #ffb00022;border-radius:6px;background:#ffb00008">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:#ffb000;font-weight:bold;font-size:13px">${r.name}</span>
        <span style="font-size:11px;color:${lc}">${r.language || ''}</span>
      </div>
      <div style="font-size:11px;color:#b37d00;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:500px">${r.description || ''}</div>
      <div style="display:flex;gap:14px;margin-top:6px;font-size:11px">
        <span style="color:#ffb000">&#9733; ${r.stargazers_count}</span>
        <span>&#128268; ${r.forks_count}</span>
        <span style="color:#707070">${new Date(r.updated_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</span>
      </div>
    </div>`;
  }).join('');

  return `
<div style="margin:6px 0">
  <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
    <img src="${user.avatar_url}" style="width:72px;height:72px;border-radius:50%;border:2px solid #ffb000" />
    <div>
      <div style="font-size:18px;font-weight:bold;color:#ffb000">${user.name || user.login}</div>
      <div style="font-size:11px;color:#b37d00;margin-top:3px">${user.bio || ''}</div>
      <div style="font-size:11px;color:#707070;margin-top:6px">${user.location || ''} ${user.blog ? '&middot; ' + user.blog : ''}</div>
    </div>
  </div>
  <div style="display:flex;gap:24px;margin-bottom:18px;font-size:13px">
    <div><span style="color:#ffb000;font-weight:bold;font-size:20px">${user.public_repos}</span><br/><span style="color:#707070;font-size:10px">REPOS</span></div>
    <div><span style="color:#ffb000;font-weight:bold;font-size:20px">${user.followers}</span><br/><span style="color:#707070;font-size:10px">FOLLOWERS</span></div>
    <div><span style="color:#ffb000;font-weight:bold;font-size:20px">${user.following}</span><br/><span style="color:#707070;font-size:10px">FOLLOWING</span></div>
    <div><span style="color:#ffb000;font-weight:bold;font-size:20px">${new Date(user.created_at).getFullYear()}</span><br/><span style="color:#707070;font-size:10px">JOINED</span></div>
  </div>
  <div style="color:#ffb000;font-size:12px;font-weight:bold;margin-bottom:10px;letter-spacing:1px">&#9656; TOP REPOSITORIES</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${reposHTML}</div>
</div>`;
}

// ── Contact ─────────────────────────────────────────────────────────────
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

// ── Resume (colorful HTML with photo) ────────────────────────────────────
function cmdResume(_args: string[], _ctx: CommandContext): OutputLine[] {
  if (typeof window === 'undefined') {
    return [{ id: uid(), content: 'resume: not available in SSR', type: 'error' }];
  }

  // Also trigger download
  const textContent = buildResumeText();
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Dweepan_Gain_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return [
    { id: uid(), content: buildColorfulResumeHTML(), type: 'html' },
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: '  Resume file downloaded: Dweepan_Gain_Resume.txt', type: 'output' },
    { id: uid(), content: '', type: 'output' },
  ];
}

function buildColorfulResumeHTML(): string {
  const C = {
    amber: '#ffb000', dim: '#b37d00', accent: '#ff6600',
    bg: '#0d0d00', card: '#ffb0000d', border: '#ffb00033',
    blue: '#3498DB', green: '#2ecc71', purple: '#a855f7',
    red: '#e74c3c', cyan: '#00bcd4', white: '#e0e0e0',
  };

  const section = (icon: string, title: string, color: string) =>
    `<div style="display:flex;align-items:center;gap:8px;margin:18px 0 10px;padding-bottom:6px;border-bottom:1px solid ${C.border}">
      <span style="color:${color};font-size:14px">${icon}</span>
      <span style="color:${color};font-size:13px;font-weight:bold;letter-spacing:2px">${title}</span>
    </div>`;

  const bullet = (text: string, sub = false) =>
    `<div style="font-size:11px;color:${sub ? C.dim : C.white};line-height:1.55;padding-left:${sub ? 20 : 12}px;position:relative;margin:2px 0">
      <span style="position:absolute;left:0;color:${C.amber}">${sub ? '&middot;' : '&#9656;'}</span>${text}
    </div>`;

  const expBlock = (title: string, company: string, period: string, color: string, points: string[]) => `
    <div style="margin-bottom:14px;padding:10px 14px;border-left:3px solid ${color};background:${C.card};border-radius:0 6px 6px 0">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
        <div>
          <span style="color:${C.amber};font-weight:bold;font-size:13px">${title}</span>
          <span style="color:${C.dim};font-size:11px"> @ ${company}</span>
        </div>
        <span style="color:${color};font-size:10px;font-weight:bold">${period}</span>
      </div>
      ${points.map(p => bullet(p, true)).join('')}
    </div>`;

  return `
<div style="max-width:680px;margin:6px auto">
  <!-- Header -->
  <div style="display:flex;align-items:center;gap:18px;padding:16px 20px;background:${C.card};border:1px solid ${C.border};border-radius:10px;margin-bottom:4px">
    <img src="/profile.jpg" style="width:90px;height:90px;border-radius:10px;border:2px solid ${C.amber};object-fit:cover" />
    <div>
      <div style="font-size:22px;font-weight:bold;color:${C.amber};letter-spacing:1px">DWEEPAN GAIN</div>
      <div style="font-size:13px;color:${C.accent};margin:4px 0 8px">AI / ML Engineer</div>
      <div style="font-size:11px;color:${C.dim};line-height:1.7">
        <span style="color:${C.amber}">&#9679;</span> Vasco Da Gama, Goa, India &nbsp;&nbsp;
        <span style="color:${C.amber}">&#9679;</span> +91 8485841623<br/>
        <span style="color:${C.amber}">&#9679;</span> dweepangain11dec99@gmail.com &nbsp;&nbsp;
        <span style="color:${C.amber}">&#9679;</span> github.com/Markes10
      </div>
    </div>
  </div>

  <!-- Summary -->
  <div style="font-size:11px;color:${C.white};line-height:1.7;padding:8px 0">
    Results-driven AI/ML Engineer specializing in production-grade intelligent systems.
    Deep expertise in LLMs, NLP, and machine learning with strong full-stack
    development foundation. Building end-to-end solutions bridging research
    and real-world business impact.
  </div>

  ${section('&#128187;', 'EXPERIENCE', C.blue)}

  ${expBlock('AI/ML Engineer', 'Labmentix', 'Jan 2024 - Present', C.blue, [
    'Architected AI-powered CRM + PIM platform for enterprise clients with LLM-based extraction',
    'Built ML pipelines reducing manual data entry by 60% across client operations',
    'Led prompt engineering initiatives improving extraction accuracy to 94%',
    'Designed RESTful APIs handling 10K+ daily requests with sub-200ms response times',
  ])}

  ${expBlock('Software Developer', 'Demerg Systems', 'Jun 2023 - Dec 2023', C.green, [
    'Developed full-stack B2B SaaS applications using React, Node.js, and PostgreSQL',
    'Implemented real-time data sync via WebSockets, reducing latency by 40%',
    'Optimized database queries improving API throughput by 3x under high concurrency',
  ])}

  ${expBlock('AI/ML Intern', 'JYESTA', 'Jan 2023 - May 2023', C.purple, [
    'Built AI email assistant using OpenAI GPT APIs and Python with NLP classification',
    'Achieved 89% accuracy on email classification models for domain-specific routing',
    'Created FastAPI REST endpoints for model serving with seamless product integration',
  ])}

  ${expBlock('Web Dev Intern', 'Tentwenty Digital', 'Aug 2022 - Dec 2022', C.cyan, [
    'Built responsive React websites with animated UI components using Framer Motion',
    'Optimized site performance achieving Lighthouse scores above 90 across all projects',
  ])}

  ${section('&#128736;', 'PROJECTS', C.accent)}

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    ${[
      ['AI CRM + PIM', 'Python, FastAPI, React, GPT-4, LangChain', C.blue],
      ['AI Email Assistant', 'Python, GPT-4, NLP, SpaCy', C.green],
      ['Resume Analyzer', 'Python, NLP, scikit-learn', C.purple],
      ['Fraud Detection', 'XGBoost, Random Forest, Flask', C.red],
      ['Medical Report Analyzer', 'OCR, NLP, FastAPI, React', C.cyan],
      ['Secure Chat App', 'React, Socket.IO, AES-256', C.amber],
      ['Social Media Monitor', 'NLP, VADER, Elasticsearch', C.green],
    ].map(([name, stack, color]) => `
      <div style="padding:8px 12px;border:1px solid ${color}33;border-radius:6px;background:${color}0d">
        <div style="color:${color};font-weight:bold;font-size:11px">${name}</div>
        <div style="color:${C.dim};font-size:10px;margin-top:3px">${stack}</div>
      </div>`).join('')}
  </div>

  ${section('&#128218;', 'SKILLS', C.green)}

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;font-size:11px">
    ${[
      ['Languages', 'Python, JavaScript, TypeScript, SQL, Bash, C++'],
      ['AI / LLM', 'GPT-4, LangChain, Prompt Engineering, Fine-Tuning, RAG'],
      ['Machine Learning', 'Scikit-learn, XGBoost, Neural Networks, Feature Engineering'],
      ['Frontend', 'React, Next.js, Tailwind CSS, Framer Motion, GSAP'],
      ['Backend', 'Node.js, Express, FastAPI, Flask, WebSockets'],
      ['Cloud & DevOps', 'AWS, Docker, CI/CD, Git, GitHub Actions, Nginx'],
      ['Databases', 'PostgreSQL, MongoDB, Redis, Elasticsearch'],
      ['Data Science', 'Pandas, NumPy, Matplotlib, EDA, A/B Testing'],
    ].map(([cat, skills]) => `
      <div style="margin:3px 0">
        <span style="color:${C.amber};font-weight:bold">${cat}:</span>
        <span style="color:${C.white}">${skills}</span>
      </div>`).join('')}
  </div>

  ${section('&#127891;', 'EDUCATION', C.purple)}

  <div style="padding:10px 14px;border-left:3px solid ${C.purple};background:${C.card};border-radius:0 6px 6px 0">
    <div style="color:${C.amber};font-weight:bold;font-size:13px">B.E. Computer Engineering</div>
    <div style="color:${C.dim};font-size:11px;margin-top:3px">Goa College of Engineering, Farmagudi, Goa &middot; 2019 - 2023</div>
    <div style="color:${C.white};font-size:10px;margin-top:6px;line-height:1.6">
      Relevant: Data Structures & Algorithms, Machine Learning, Deep Learning,
      Database Management, Operating Systems, Computer Networks, Software Engineering
    </div>
  </div>

  <div style="margin-top:14px;padding:10px 14px;border-left:3px solid ${C.cyan};background:${C.card};border-radius:0 6px 6px 0">
    <div style="color:${C.amber};font-weight:bold;font-size:12px">Certifications</div>
    ${['Deep Learning Specialization - Coursera (Andrew Ng)', 'AWS Cloud Practitioner - Amazon Web Services', 'NLP Specialization - Coursera'].map(c =>
      `<div style="color:${C.white};font-size:10px;margin-top:4px;padding-left:12px;position:relative"><span style="position:absolute;left:0;color:${C.cyan}">&#9656;</span>${c}</div>`
    ).join('')}
    </div>

  <!-- Footer -->
  <div style="text-align:center;margin-top:20px;padding-top:12px;border-top:1px solid ${C.border};font-size:10px;color:${C.dim}">
    Generated by RETROSHELL &middot; github.com/Markes10
  </div>
</div>`;
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

// ── System commands ──────────────────────────────────────────────────────
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
    { id: uid(), content: '    whoami              Display profile with photo', type: 'output' as const },
    { id: uid(), content: '    profile             Display profile photo card', type: 'output' as const },
    { id: uid(), content: '    experience          Show work history', type: 'output' as const },
    { id: uid(), content: '    projects            List all projects', type: 'output' as const },
    { id: uid(), content: '    skills              Show technical skills', type: 'output' as const },
    { id: uid(), content: '    education           Show education history', type: 'output' as const },
    { id: uid(), content: '    contact             Show contact information', type: 'output' as const },
    { id: uid(), content: '    resume              Show colorful resume + download file', type: 'output' as const },
    { id: uid(), content: '    github [repo]       Show GitHub profile/repos in terminal', type: 'output' as const },
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

// ── Tab completion ───────────────────────────────────────────────────────
const ALL_COMMANDS = ['ls', 'cd', 'cat', 'whoami', 'skills', 'experience', 'education', 'github', 'contact', 'resume', 'theme', 'crt', 'keys', 'clear', 'help', 'projects', 'profile'];

export function getTabCompletion(input: string, cwd: string, fs: FSNode): string {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    const prefix = parts[0];
    const match = ALL_COMMANDS.find(c => c.startsWith(prefix));
    return match ? match : input;
  }

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
    const match = ALL_COMMANDS.find(c => c.startsWith(prefix));
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
