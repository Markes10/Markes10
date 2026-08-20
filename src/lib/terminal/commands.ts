import { CommandContext, FSNode, OutputLine } from './types';
import { createProfileCardHTML } from './profileArt';
import { getProfileAscii, convertImageToAscii } from './imageToAscii';
import {
  getAllThemeNames, hasTheme, isBuiltin,
  getBuiltinNames, getCustomNames,
  addTheme, removeTheme, getThemeColors,
} from './themeRegistry';

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
  return entries.map(name => {
    const child = node.children![name];
    const suffix = child.type === 'directory' ? '/' : '';
    return { id: uid(), content: `  ${name}${suffix}`, type: 'output' as const };
  });
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

// ── Profile & Whoami (async – ASCII photo) ───────────────────────────
function cmdProfile(_args: string[], ctx: CommandContext): OutputLine[] {
  if (typeof window === 'undefined') {
    return [{ id: uid(), content: 'profile: not available in SSR', type: 'error' }];
  }
  const loading: OutputLine[] = [
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: '  Rendering profile portrait...', type: 'output' },
  ];
  createProfileCardHTML().then(html => {
    ctx.appendOutput([
      { id: uid(), content: html, type: 'html' },
      { id: uid(), content: '', type: 'output' },
    ]);
  });
  return loading;
}

function cmdWhoami(_args: string[], ctx: CommandContext): OutputLine[] {
  if (typeof window === 'undefined') {
    return [{ id: uid(), content: 'whoami: not available in SSR', type: 'error' }];
  }
  const loading: OutputLine[] = [
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: '  Loading profile...', type: 'output' },
  ];
  createProfileCardHTML().then(html => {
    ctx.appendOutput([
      { id: uid(), content: html, type: 'html' },
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: '  Building intelligent systems at the intersection of', type: 'output' },
      { id: uid(), content: '  AI and software engineering.', type: 'output' },
      { id: uid(), content: '', type: 'output' },
    ]);
  });
  return loading;
}

function cmdSkills(_args: string[], ctx: CommandContext): OutputLine[] {
  const node = getNode(ctx.fs, '/skills/skills.txt');
  if (node?.content) {
    return node.content.split('\n').map(line => ({ id: uid(), content: line, type: 'output' as const }));
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
  const node = getNode(ctx.fs, '/education/education.txt');
  if (node?.content) {
    return node.content.split('\n').map(line => ({ id: uid(), content: line, type: 'output' as const }));
  }
  return [{ id: uid(), content: 'education: data not found', type: 'error' }];
}

// ── GitHub (async – ASCII avatar + in-terminal display) ────────────────
function cmdGithub(args: string[], ctx: CommandContext): OutputLine[] {
  if (typeof window === 'undefined') {
    return [{ id: uid(), content: 'github: not available in SSR', type: 'error' }];
  }
  const loading: OutputLine[] = [
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: `  Fetching GitHub data for <span style="color:#ffb000;font-weight:bold">Markes10</span>...`, type: 'html' },
  ];
  if (args[0]) {
    fetchGitHubRepo(args[0], ctx.appendOutput);
  } else {
    fetchGitHubProfile(ctx.appendOutput);
  }
  return loading;
}

interface GHUser {
  login: string; name: string | null; bio: string | null;
  public_repos: number; followers: number; following: number;
  location: string | null; blog: string | null;
  created_at: string; avatar_url: string;
}
interface GHRepo {
  name: string; description: string | null; language: string | null;
  stargazers_count: number; forks_count: number;
  html_url: string; updated_at: string; topics: string[];
}

async function fetchGitHubProfile(appendOutput: (l: OutputLine[]) => void) {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/Markes10'),
      fetch('https://api.github.com/users/Markes10/repos?sort=updated&per_page=10'),
    ]);
    if (!userRes.ok) throw new Error(`GitHub API ${userRes.status}`);
    const user: GHUser = await userRes.json();
    const repos: GHRepo[] = reposRes.ok ? await reposRes.json() : [];

    // Convert avatar to colourful ASCII
    let avatarAscii = '';
    try {
      avatarAscii = await convertImageToAscii(user.avatar_url, 22, true);
    } catch { /* avatar may fail due to CORS – fallback to text */ }

    const html = buildGitHubProfileHTML(user, repos, avatarAscii);
    appendOutput([
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: html, type: 'html' },
      { id: uid(), content: '', type: 'output' },
    ]);
  } catch (err: any) {
    appendOutput([
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: `  github: error - ${err.message}`, type: 'error' },
      { id: uid(), content: '', type: 'output' },
    ]);
  }
}

async function fetchGitHubRepo(repo: string, appendOutput: (l: OutputLine[]) => void) {
  try {
    const res = await fetch(`https://api.github.com/repos/Markes10/${repo}`);
    if (!res.ok) throw new Error(`Repository '${repo}' not found (HTTP ${res.status})`);
    const r: GHRepo = await res.json();
    const lc = langColor(r.language);

    // Build repo info header
    const headerHTML = `
<div style="margin:6px 0">
  <div style="font-size:16px;font-weight:bold;color:#ffb000">${r.name}</div>
  <div style="font-size:11px;color:#b37d00;margin-top:4px">${r.description || 'No description'}</div>
  <div style="display:flex;gap:20px;font-size:12px;margin:12px 0;flex-wrap:wrap">
    <span style="color:#ffb000">&#9733; ${r.stargazers_count}</span>
    <span style="color:#ffb000">&#128268; ${r.forks_count} forks</span>
    <span>Lang: <span style="color:${lc};font-weight:bold">${r.language || 'N/A'}</span></span>
    <span>Updated: ${new Date(r.updated_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
  </div>
  <div style="font-size:11px;color:#b37d00">${r.html_url}</div>
  ${r.topics.length ? `<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${r.topics.map(t => `<span style="font-size:10px;background:#ffb00022;color:#ffb000;padding:2px 8px;border-radius:10px;border:1px solid #ffb00044">${t}</span>`).join('')}</div>` : ''}
</div>`;

    appendOutput([
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: headerHTML, type: 'html' },
      { id: uid(), content: '  Fetching README.md...', type: 'output' },
    ]);

    // Fetch README.md content
    try {
      // Try README.md first, then common variants
      const readmeVariants = ['README.md', 'Readme.md', 'readme.md', 'README.rst', 'README.txt', 'README'];
      let readmeContent: string | null = null;
      let readmeName = '';

      for (const name of readmeVariants) {
        const readMeRes = await fetch(`https://api.github.com/repos/Markes10/${repo}/contents/${name}`);
        if (readMeRes.ok) {
          const fileData = await readMeRes.json();
          if (fileData.content && fileData.encoding === 'base64') {
            readmeContent = atob(fileData.content.replace(/\n/g, ''));
            readmeName = name;
            break;
          }
        }
      }

      if (readmeContent) {
        // Render README in terminal-friendly format
        const readmeHTML = buildReadmeHTML(readmeName, readmeContent);
        appendOutput([
          { id: uid(), content: '', type: 'output' },
          { id: uid(), content: readmeHTML, type: 'html' },
          { id: uid(), content: '', type: 'output' },
        ]);
      } else {
        appendOutput([
          { id: uid(), content: '  No README.md found in this repository.', type: 'output' },
          { id: uid(), content: '', type: 'output' },
        ]);
      }
    } catch (readmeErr: any) {
      appendOutput([
        { id: uid(), content: `  README fetch failed: ${readmeErr.message}`, type: 'error' },
        { id: uid(), content: '', type: 'output' },
      ]);
    }
  } catch (err: any) {
    appendOutput([
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: `  github: ${err.message}`, type: 'error' },
      { id: uid(), content: '', type: 'output' },
    ]);
  }
}

/** Convert raw README markdown to terminal-friendly HTML */
function buildReadmeHTML(filename: string, raw: string): string {
  const C = {
    amber: '#ffb000', dim: '#b37d00', accent: '#ff6600',
    border: '#ffb00033', white: '#e0e0e0', bg: '#ffb0000d',
    link: '#3498DB', code: '#2ecc71', codeBg: '#ffb00015',
  };

  // Strip HTML tags from raw content (GitHub API may return rendered HTML in some cases)
  let text = raw;

  // Process line by line
  const lines = text.split('\n');
  const htmlParts: string[] = [];
  let tableIsFirstRow = true;
  let inCodeBlock = false;
  let inList = false;
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        htmlParts.push('</div>');
        inCodeBlock = false;
      } else {
        const lang = line.trim().slice(3).trim();
        htmlParts.push(`<div style="margin:6px 0;padding:8px 12px;border-left:3px solid ${C.code};background:${C.codeBg};border-radius:0 5px 5px 0;font-size:11px;line-height:1.5">${lang ? `<div style="color:${C.code};font-size:9px;font-weight:bold;margin-bottom:6px;letter-spacing:1px">${lang.toUpperCase()}</div>` : ''}`);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      // Escape HTML entities in code blocks
      const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      htmlParts.push(escaped + '<br/>');
      continue;
    }

    // Table detection
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        htmlParts.push(`<div style="margin:6px 0;border:1px solid ${C.border};border-radius:5px;overflow:hidden">`);
        inTable = true;
        tableIsFirstRow = true;
      }
      // Skip separator rows (|---|---|)
      if (/^\|[\s\-:|]+\|$/.test(line.trim())) {
        tableIsFirstRow = false;
        continue;
      }

      const cells = line.trim().slice(1, -1).split('|').map(c => c.trim());
      const cellStyle = `padding:4px 10px;font-size:10px;border-bottom:1px solid ${C.border};${tableIsFirstRow ? `background:${C.bg};font-weight:bold;color:${C.amber}` : `color:${C.white}`}`;
      htmlParts.push(`<div style="display:flex">${cells.map(c => `<div style="${cellStyle};flex:1">${inlineFormat(c)}</div>`).join('')}</div>`);
      tableIsFirstRow = false;
      continue;
    }

    if (inTable && !line.trim().startsWith('|')) {
      htmlParts.push('</div>');
      inTable = false;
    }

    // Close list if non-list line
    if (inList && !line.trim().match(/^[-*+>]/) && line.trim() !== '') {
      htmlParts.push('</div>');
      inList = false;
    }

    // Empty line
    if (line.trim() === '') {
      htmlParts.push('<div style="height:6px"></div>');
      continue;
    }

    // Headings
    const h1Match = line.match(/^#\s+(.+)/);
    const h2Match = line.match(/^##\s+(.+)/);
    const h3Match = line.match(/^###\s+(.+)/);
    const h4Match = line.match(/^####\s+(.+)/);

    if (h1Match) {
      htmlParts.push(`<div style="font-size:16px;font-weight:bold;color:${C.amber};margin:14px 0 8px;padding-bottom:6px;border-bottom:2px solid ${C.amber}">${inlineFormat(h1Match[1])}</div>`);
      continue;
    }
    if (h2Match) {
      htmlParts.push(`<div style="font-size:14px;font-weight:bold;color:${C.amber};margin:12px 0 6px;padding-bottom:4px;border-bottom:1px solid ${C.border}">${inlineFormat(h2Match[1])}</div>`);
      continue;
    }
    if (h3Match) {
      htmlParts.push(`<div style="font-size:12px;font-weight:bold;color:${C.accent};margin:10px 0 4px">&#9656; ${inlineFormat(h3Match[1])}</div>`);
      continue;
    }
    if (h4Match) {
      htmlParts.push(`<div style="font-size:11px;font-weight:bold;color:${C.dim};margin:8px 0 3px">  ${inlineFormat(h4Match[1])}</div>`);
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      htmlParts.push(`<div style="border:none;border-top:1px solid ${C.border};margin:10px 0"></div>`);
      continue;
    }

    // List items
    const listMatch = line.trim().match(/^([-*+])\s+(.+)/);
    if (listMatch) {
      if (!inList) {
        htmlParts.push(`<div style="padding-left:12px;margin:2px 0">`);
        inList = true;
      }
      htmlParts.push(`<div style="font-size:11px;color:${C.white};line-height:1.6;padding:1px 0"><span style="color:${C.amber};font-weight:bold">&#9656;</span> ${inlineFormat(listMatch[2])}</div>`);
      continue;
    }

    // Blockquote
    const quoteMatch = line.trim().match(/^>\s*(.*)/);
    if (quoteMatch) {
      htmlParts.push(`<div style="border-left:3px solid ${C.amber};padding:4px 12px;margin:4px 0;font-size:11px;color:${C.dim};font-style:italic;background:${C.bg}">${inlineFormat(quoteMatch[1])}</div>`);
      continue;
    }

    // Image (show alt text as link since we can't render images)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      htmlParts.push(`<div style="font-size:11px;color:${C.link};margin:4px 0">[image: ${inlineFormat(imgMatch[1])}] ${imgMatch[2]}</div>`);
      continue;
    }

    // Regular paragraph line
    htmlParts.push(`<div style="font-size:11px;color:${C.white};line-height:1.65;margin:2px 0">${inlineFormat(line)}</div>`);
  }

  // Close any open containers
  if (inCodeBlock) htmlParts.push('</div>');
  if (inList) htmlParts.push('</div>');
  if (inTable) htmlParts.push('</div>');

  return `
<div style="margin:8px 0;padding:12px 16px;border:1px solid ${C.border};border-radius:8px;background:${C.bg}">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid ${C.border}">
    <span style="color:${C.amber};font-size:14px">&#128196;</span>
    <span style="color:${C.amber};font-size:12px;font-weight:bold;letter-spacing:1px">${filename.toUpperCase()}</span>
  </div>
  ${htmlParts.join('')}
</div>`;
}

/** Inline markdown formatting: bold, italic, code, links */
function inlineFormat(text: string): string {
  // Escape HTML
  let s = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Inline code
  s = s.replace(/`([^`]+)`/g, '<code style="background:#ffb00018;color:#2ecc71;padding:1px 5px;border-radius:3px;font-size:10px">$1</code>');
  // Bold
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b style="color:#ffb000">$1</b>');
  // Italic
  s = s.replace(/\*([^*]+)\*/g, '<i style="color:#e0e0e0">$1</i>');
  // Links
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a style="color:#3498DB;text-decoration:underline" href="$2" target="_blank" rel="noopener">$1</a>');
  return s;
}

function langColor(lang: string | null): string {
 const m: Record<string, string> = {
    Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
    'Jupyter Notebook': '#DA5B0B', HTML: '#e34c26', CSS: '#563d7c',
    Shell: '#89e051', Dockerfile: '#384d54', Go: '#00ADD8',
  };
  return lang ? (m[lang] || '#8b949e') : '#8b949e';
}

function buildGitHubProfileHTML(user: GHUser, repos: GHRepo[], avatarAscii: string): string {
  const top = repos.slice(0, 8);
  const reposHTML = top.map(r => {
    const lc = langColor(r.language);
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
  <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px">
    ${avatarAscii
      ? `<div style="flex-shrink:0;line-height:1.05;font-size:5px;letter-spacing:0">${avatarAscii.replace(/\n/g, '<br/>')}</div>`
      : `<img src="${user.avatar_url}" style="width:72px;height:72px;border-radius:50%;border:2px solid #ffb000" />`}
    <div style="padding-top:4px">
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
  const node = getNode(ctx.fs, '/contact/contact.txt');
  const lines: OutputLine[] = [];
  if (node?.content) {
    lines.push(...node.content.split('\n').map(line => ({ id: uid(), content: line, type: 'output' as const })));
  }
  lines.push({ id: uid(), content: '', type: 'output' });
  lines.push({ id: uid(), content: '  Send an email:', type: 'output' });
  lines.push({ id: uid(), content: '  mailto:dweepangain11dec99@gmail.com', type: 'output' });
  lines.push({ id: uid(), content: '', type: 'output' });
  return lines;
}

// ── Resume (async – colorful HTML + ASCII photo + download) ───────────
function cmdResume(_args: string[], ctx: CommandContext): OutputLine[] {
  if (typeof window === 'undefined') {
    return [{ id: uid(), content: 'resume: not available in SSR', type: 'error' }];
  }
  // Trigger text-file download immediately
  downloadResumeFile();
  // Render colorful HTML resume asynchronously (needs ASCII photo)
  const loading: OutputLine[] = [
    { id: uid(), content: '', type: 'output' },
    { id: uid(), content: '  Rendering colorful resume...', type: 'output' },
  ];
  buildAsyncResumeHTML().then(html => {
    ctx.appendOutput([
      { id: uid(), content: html, type: 'html' },
      { id: uid(), content: '', type: 'output' },
      { id: uid(), content: '  Resume file downloaded: Dweepan_Gain_Resume.txt', type: 'output' },
      { id: uid(), content: '', type: 'output' },
    ]);
  });
  return loading;
}

function downloadResumeFile() {
  const content = buildResumeText();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Dweepan_Gain_Resume.txt';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

async function buildAsyncResumeHTML(): Promise<string> {
  let asciiPhoto = '';
  try {
    asciiPhoto = await getProfileAscii(28);
  } catch { /* fallback to empty */ }
  return buildColorfulResumeHTML(asciiPhoto);
}

function buildColorfulResumeHTML(asciiPhoto: string): string {
  const C = {
    amber: '#ffb000', dim: '#b37d00', accent: '#ff6600',
    card: '#ffb0000d', border: '#ffb00033',
    blue: '#3498DB', green: '#2ecc71', purple: '#a855f7',
    red: '#e74c3c', cyan: '#00bcd4', white: '#e0e0e0',
  };

  const sec = (icon: string, title: string, color: string) =>
    `<div style="display:flex;align-items:center;gap:8px;margin:16px 0 8px;padding-bottom:5px;border-bottom:1px solid ${C.border}">
      <span style="color:${color};font-size:13px">${icon}</span>
      <span style="color:${color};font-size:12px;font-weight:bold;letter-spacing:2px">${title}</span>
    </div>`;

  const bullet = (text: string, sub = false) =>
    `<div style="font-size:10px;color:${sub ? C.dim : C.white};line-height:1.5;padding-left:${sub ? 18 : 10}px;position:relative;margin:1px 0">
      <span style="position:absolute;left:0;color:${C.amber}">${sub ? '&middot;' : '&#9656;'}</span>${text}
    </div>`;

  const expBlock = (title: string, company: string, period: string, color: string, pts: string[]) => `
    <div style="margin-bottom:12px;padding:8px 12px;border-left:3px solid ${color};background:${C.card};border-radius:0 6px 6px 0">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
        <div><span style="color:${C.amber};font-weight:bold;font-size:12px">${title}</span> <span style="color:${C.dim};font-size:10px">@ ${company}</span></div>
        <span style="color:${color};font-size:9px;font-weight:bold">${period}</span>
      </div>
      ${pts.map(p => bullet(p, true)).join('')}
    </div>`;

  const projCard = (n: string, s: string, c: string) =>
    `<div style="padding:7px 10px;border:1px solid ${c}33;border-radius:5px;background:${c}0d">
      <div style="color:${c};font-weight:bold;font-size:10px">${n}</div>
      <div style="color:${C.dim};font-size:9px;margin-top:2px">${s}</div>
    </div>`;

  return `
<div style="max-width:660px;margin:4px auto">
  <!-- Header with ASCII photo -->
  <div style="display:flex;align-items:flex-start;gap:16px;padding:14px 18px;background:${C.card};border:1px solid ${C.border};border-radius:10px;margin-bottom:4px">
    ${asciiPhoto
      ? `<div style="flex-shrink:0;line-height:1.05;font-size:5px;letter-spacing:0;filter:drop-shadow(0 0 4px rgba(255,176,0,0.2))">${asciiPhoto.replace(/\n/g, '<br/>')}</div>`
      : ''}
    <div style="padding-top:2px">
      <div style="font-size:20px;font-weight:bold;color:${C.amber};letter-spacing:1px">DWEEPAN GAIN</div>
      <div style="font-size:12px;color:${C.accent};margin:3px 0 6px">AI / ML Engineer</div>
      <div style="font-size:10px;color:${C.dim};line-height:1.7">
        <span style="color:${C.amber}">&#9679;</span> Vasco Da Gama, Goa, India &nbsp;&nbsp;
        <span style="color:${C.amber}">&#9679;</span> +91 8485841623<br/>
        <span style="color:${C.amber}">&#9679;</span> dweepangain11dec99@gmail.com<br/>
        <span style="color:${C.amber}">&#9679;</span> github.com/Markes10
      </div>
    </div>
  </div>

  <div style="font-size:10px;color:${C.white};line-height:1.65;padding:6px 0">
    Results-driven AI/ML Engineer specializing in production-grade intelligent systems.
    Deep expertise in LLMs, NLP, and machine learning with strong full-stack
    development foundation. Building end-to-end solutions bridging research
    and real-world business impact.
  </div>

  ${sec('&#128187;', 'EXPERIENCE', C.blue)}
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
  ])}
  ${expBlock('Web Dev Intern', 'Tentwenty Digital', 'Aug 2022 - Dec 2022', C.cyan, [
    'Built responsive React websites with animated UI components using Framer Motion',
    'Optimized site performance achieving Lighthouse scores above 90',
  ])}

  ${sec('&#128736;', 'PROJECTS', C.accent)}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px">
    ${projCard('AI CRM + PIM', 'Python, FastAPI, React, GPT-4, LangChain', C.blue)}
    ${projCard('AI Email Assistant', 'Python, GPT-4, NLP, SpaCy', C.green)}
    ${projCard('Resume Analyzer', 'Python, NLP, scikit-learn', C.purple)}
    ${projCard('Fraud Detection', 'XGBoost, Random Forest, Flask', C.red)}
    ${projCard('Medical Report Analyzer', 'OCR, NLP, FastAPI, React', C.cyan)}
    ${projCard('Secure Chat App', 'React, Socket.IO, AES-256', C.amber)}
    ${projCard('Social Media Monitor', 'NLP, VADER, Elasticsearch', C.green)}
  </div>

  ${sec('&#128218;', 'SKILLS', C.green)}
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
    ].map(([cat, sk]) => `<div><span style="color:${C.amber};font-weight:bold">${cat}:</span> <span style="color:${C.white}">${sk}</span></div>`).join('')}
  </div>

  ${sec('&#127891;', 'EDUCATION', C.purple)}
  <div style="padding:8px 12px;border-left:3px solid ${C.purple};background:${C.card};border-radius:0 6px 6px 0">
    <div style="color:${C.amber};font-weight:bold;font-size:12px">B.E. Computer Engineering</div>
    <div style="color:${C.dim};font-size:10px;margin-top:2px">Goa College of Engineering, Farmagudi, Goa &middot; 2019 - 2023</div>
    <div style="color:${C.white};font-size:9px;margin-top:4px;line-height:1.5">
      Data Structures & Algorithms, Machine Learning, Deep Learning,
      Database Management, Operating Systems, Software Engineering
    </div>
  </div>
  <div style="margin-top:10px;padding:8px 12px;border-left:3px solid ${C.cyan};background:${C.card};border-radius:0 6px 6px 0">
    <div style="color:${C.amber};font-weight:bold;font-size:11px">Certifications</div>
    ${['Deep Learning Specialization - Coursera (Andrew Ng)', 'AWS Cloud Practitioner', 'NLP Specialization - Coursera'].map(c => `<div style="color:${C.white};font-size:9px;margin-top:3px;padding-left:10px;position:relative"><span style="position:absolute;left:0;color:${C.cyan}">&#9656;</span>${c}</div>`).join('')}
    </div>

  <div style="text-align:center;margin-top:16px;padding-top:10px;border-top:1px solid ${C.border};font-size:9px;color:${C.dim}">
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
  const L = (t: string) => ({ id: uid(), content: t, type: 'output' as const });
  const E = (t: string) => ({ id: uid(), content: t, type: 'error' as const });

  const sub = args[0]?.toLowerCase();

  // No args → quick-switch shortcut (backward compatible)
  if (!sub) {
    return [L(''), L('  theme: manage terminal color themes'), L(''),
      L('  USAGE'), L('    theme list                Show all available themes'),
      L('    theme set <name>           Switch to a theme'),
      L('    theme add <name> <hex> [bg <hex>] [prompt <hex>] [accent <hex>]'),
      L('                           Create a custom theme'),
      L('    theme remove <name>        Delete a custom theme'),
      L('    theme info <name>          Show theme color values'),
      L(''),
      L('  QUICK SWITCH'),
      L('    theme <name>              Shortcut for "theme set <name>"'),
      L(''),
      L('  EXAMPLES'),
      L('    theme set cyber'),
      L('    theme set purple'),
      L('    theme add neon #ff00ff bg #0d001a prompt #ff66ff'),
      L('    theme add ocean #00bcd4 bg #001a1f prompt #4dd0e1 accent #0097a7'),
      L('    theme remove neon'), L(''),
    ];
  }

  // ── list ──────────────────────────────────────────────────────────
  if (sub === 'list') {
    const all = getAllThemeNames();
    const builtins = getBuiltinNames();
    const customs = getCustomNames();
    const lines: OutputLine[] = [
      L(''), L('  AVAILABLE THEMES'), L('  ─────────────────────────────────────'), L(''),
    ];
    for (const name of all) {
      const builtin = builtins.includes(name);
      const tag = builtin ? 'built-in' : 'custom';
      const marker = name === ctx.args[0] ? ' <span style="color:#ffb000">*</span>' : '';
      lines.push({ id: uid(), content: `    <span style="color:#ffb000;font-weight:bold">${name.padEnd(14)}</span> <span style="color:#707070">[${tag}]</span>${marker}`, type: 'html' });
    }
    lines.push(L(''));
    lines.push(L(`  ${all.length} themes available (${builtins.length} built-in, ${customs.length} custom)`));
    lines.push(L(''));
    return lines;
  }

  // ── info ──────────────────────────────────────────────────────────
  if (sub === 'info') {
    const name = args[1]?.toLowerCase();
    if (!name || !hasTheme(name)) {
      const suggestion = name ? getAllThemeNames().find(n => n.startsWith(name)) : null;
      return [E(`theme: "${name || ''}" not found${suggestion ? `. Did you mean "${suggestion}"?` : ''}`)];
    }
    const c = getThemeColors(name);
    const builtin = isBuiltin(name);
    const H = (t: string) => ({ id: uid(), content: t, type: 'html' as const });
    return [
      H(''), H(`  Theme: <span style="color:#ffb000;font-weight:bold">${name.toUpperCase()}</span> [${builtin ? 'built-in' : 'custom'}]`),
      H('  ─────────────────────────────────────'),
      H(`    <span style="color:#ffb000">text</span>      ${c.text}`),
      H(`    <span style="color:#ffb000">textDim</span>   ${c.textDim}`),
      H(`    <span style="color:#ffb000">textGhost</span> ${c.textGhost}`),
      H(`    <span style="color:#ffb000">bg</span>        ${c.bg}`),
      H(`    <span style="color:#ffb000">prompt</span>    ${c.prompt}`),
      H(`    <span style="color:#ffb000">accent</span>    ${c.accent}`),
      H(`    <span style="color:#ffb000">scanline</span>  ${c.scanline}`),
      H(`    <span style="color:#ffb000">crtGlow</span>   ${c.crtGlow}`),
      H(''),
    ];
  }

  // ── add ──────────────────────────────────────────────────────────
  if (sub === 'add') {
    const name = args[1];
    if (!name) return [E('theme add: missing theme name. Usage: theme add <name> <text_color> [bg <hex>] [prompt <hex>] [accent <hex>]')];

    const textHex = args[2];
    if (!textHex) return [E(`theme add: missing text color. Usage: theme add ${name} <text_color_hex> [bg <hex>] ...` )];

    // Parse optional key=value pairs from remaining args
    const bgHex = parseOptional(args, 3, 'bg');
    const promptHex = parseOptional(args, 3, 'prompt');
    const accentHex = parseOptional(args, 3, 'accent');

    const result = addTheme(name, {
      text: textHex,
      bg: bgHex || '#0a0a0a',
      prompt: promptHex || textHex,
      accent: accentHex || undefined,
    });

    if (!result.ok) return [E(`theme add: ${result.error}`)];

    return [
      L(''),
      { id: uid(), content: `  Theme <span style="color:#ffb000;font-weight:bold">${name.toLowerCase()}</span> created successfully!`, type: 'html' },
      L(`  Switch to it with:  theme set ${name.toLowerCase()}`),
      L(''),
    ];
  }

  // ── remove ───────────────────────────────────────────────────────
  if (sub === 'remove' || sub === 'delete' || sub === 'rm') {
    const name = args[1];
    if (!name) return [E('theme remove: missing theme name. Usage: theme remove <name>')];
    const result = removeTheme(name);
    if (!result.ok) return [E(`theme remove: ${result.error}`)];
    return [L(`  Theme "${name.toLowerCase()}" removed.`)];
  }

  // ── set (or quick-switch shortcut) ───────────────────────────────
  const targetName = sub === 'set' ? args[1]?.toLowerCase() : sub;
  if (!targetName) return [E('theme set: missing theme name. Use "theme list" to see available themes.')];

  if (!hasTheme(targetName)) {
    const suggestion = getAllThemeNames().find(n => n.startsWith(targetName));
    return [E(`theme: "${targetName}" not found.${suggestion ? ` Did you mean "${suggestion}"?` : ''} Use "theme list" to see available themes.`)];
  }

  ctx.setTheme(targetName);
  return [
    { id: uid(), content: `  theme: switched to <span style="color:#ffb000;font-weight:bold">${targetName}</span>`, type: 'html' },
  ];
}

/** Parse optional key=value pairs from args array starting at index `from` */
function parseOptional(args: string[], from: number, key: string): string | undefined {
  for (let i = from; i < args.length - 1; i++) {
    if (args[i].toLowerCase() === key) return args[i + 1];
  }
  return undefined;
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
  const L = (t: string) => ({ id: uid(), content: t, type: 'output' as const });
  return [
    L(''), L('  RETROSHELL -- COMMAND MANUAL'), L('  ============================'), L(''),
    L('  NAVIGATION'),
    L('    ls [path]           List directory contents'),
    L('    cd <path>           Change directory'),
    L('    cat <file>          Display file contents'), L(''),
    L('  PORTFOLIO'),
    L('    whoami              Display profile with ASCII portrait'),
    L('    profile             Display ASCII portrait + info'),
    L('    experience          Show work history'),
    L('    projects            List all projects'),
    L('    skills              Show technical skills'),
    L('    education           Show education history'),
    L('    contact             Show contact information'),
    L('    resume              Show colorful resume + download'),
    L('    github [repo]       Show GitHub profile / repo README in terminal'), L(''),
    L('  SYSTEM'),
    L('    theme [name]         Quick-switch theme'),
    L('    theme list           List all available themes'),
    L('    theme add <n> <hex>  Create custom theme'),
    L('    theme remove <name>  Delete a custom theme'),
    L('    theme info <name>    Show theme color values'), L(''),
    L('    crt                 Toggle CRT scanline effect'),
    L('    keys                Toggle mechanical key click sound'),
    L('    clear               Clear terminal screen'),
    L('    help                Show this manual'), L(''),
    L('  SHORTCUTS'),
    L('    Tab                 Auto-complete commands and paths'),
    L('    Up/Down             Scroll command history'),
    L('    Ctrl+L              Clear screen'),
    L('    Esc                 Cancel current input'), L(''),
  ];
}

function cmdProjects(_args: string[], ctx: CommandContext): OutputLine[] {
  return cmdLs(['/projects'], { ...ctx, cwd: '/' });
}

// ── Tab / ghost-text completion ─────────────────────────────────────────
const ALL_CMDS = ['ls','cd','cat','whoami','skills','experience','education','github','contact','resume','theme','crt','keys','clear','help','projects','profile'];

export function getTabCompletion(input: string, cwd: string, fs: FSNode): string {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    const m = ALL_CMDS.find(c => c.startsWith(parts[0]));
    return m ? m : input;
  }
  const cmd = parts[0];
  if (!['ls','cd','cat'].includes(cmd)) return input;
  const pathPartial = parts[parts.length - 1];
  const dirParts = pathPartial.split('/');
  const prefix = dirParts.pop() || '';
  const dirPath = dirParts.join('/');
  const targetDir = dirPath ? resolvePath(cwd, dirPath) : cwd;
  const node = getNode(fs, targetDir);
  if (!node || node.type !== 'directory' || !node.children) return input;
  const matches = Object.keys(node.children).filter(n => n.startsWith(prefix));
  if (matches.length === 1) {
    const c = matches[0];
    const sfx = node.children[c].type === 'directory' ? '/' : '';
    return parts.slice(0, -1).join(' ') + ' ' + dirPath + (dirPath ? '/' : '') + c + sfx;
  }
  return input;
}

export function getGhostText(input: string, cwd: string, fs: FSNode): string {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    const m = ALL_CMDS.find(c => c.startsWith(parts[0]));
    return m ? m.slice(parts[0].length) : '';
  }
  const cmd = parts[0];
  if (!['ls','cd','cat'].includes(cmd)) return '';
  const pathPartial = parts[parts.length - 1];
  const dirParts = pathPartial.split('/');
  const prefix = dirParts.pop() || '';
  const dirPath = dirParts.join('/');
  const targetDir = dirPath ? resolvePath(cwd, dirPath) : cwd;
  const node = getNode(fs, targetDir);
  if (!node || node.type !== 'directory' || !node.children) return '';
  const matches = Object.keys(node.children).filter(n => n.startsWith(prefix));
  if (matches.length === 1) {
    const c = matches[0];
    return c.slice(prefix.length) + (node.children[c].type === 'directory' ? '/' : '');
  }
  return '';
}
