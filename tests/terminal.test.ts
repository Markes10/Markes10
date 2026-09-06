import {
  collectLanguageBreakdown,
  executeCommand,
  getResumeSkillCategories,
} from '@/lib/terminal/commands';
import {
  copyTextToClipboard,
  pasteTextFromClipboard,
} from '@/lib/terminal/clipboard';
import { fileSystem } from '@/lib/terminal/fileSystem';
import type { CommandContext } from '@/lib/terminal/types';

function createContext(): CommandContext {
  return {
    args: [],
    cwd: '/',
    fs: fileSystem,
    theme: 'amber',
    setCwd: () => undefined,
    setTheme: () => undefined,
    setCrt: () => undefined,
    setKeys: () => undefined,
    appendOutput: () => undefined,
  };
}

describe('terminal commands', () => {
  it('lists the root portfolio modules', () => {
    const output = executeCommand('ls', createContext());
    const text = output.map(line => line.content).join('\n');
    expect(text).toContain('about');
    expect(text).toContain('projects');
    expect(text).toContain('experience');
    expect(text).toContain('skills');
    expect(text).toContain('education');
  });

  it('returns a useful error for unknown commands', () => {
    const output = executeCommand('does-not-exist', createContext());
    expect(output[0]?.type).toBe('error');
    expect(output[0]?.content).toContain('command not found');
  });

  it('changes directory with cd', () => {
    const ctx = createContext();
    const output = executeCommand('cd about', ctx);
    expect(output).toHaveLength(0);
  });

  it('shows error for invalid cd target', () => {
    const output = executeCommand('cd /nonexistent', createContext());
    expect(output[0]?.type).toBe('error');
    expect(output[0]?.content).toContain('cd:');
  });

  it('displays file content with cat', () => {
    const output = executeCommand('cat /about/summary.txt', createContext());
    expect(output.length).toBeGreaterThan(0);
    expect(output[0]?.content).toContain('Dweepan Gain');
  });

  it('shows error for missing cat target', () => {
    const output = executeCommand('cat', createContext());
    expect(output[0]?.type).toBe('error');
  });

  it('aggregates repository language totals from each repo language map', () => {
    const languages = collectLanguageBreakdown([
      { TypeScript: 200, JavaScript: 100 },
      { TypeScript: 300, Python: 75 },
      { Python: 25 },
      {},
    ]);

    expect(languages).toEqual([
      ['TypeScript', 500],
      ['JavaScript', 100],
      ['Python', 100],
    ]);
  });

  it('reads skills from the resume text', () => {
    const skills = getResumeSkillCategories();
    expect(skills.length).toBeGreaterThan(0);
    expect(skills.some(([category]) => category === 'Languages')).toBe(true);
  });

  it('copies and pastes terminal text through the clipboard API', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    const readText = jest.fn().mockResolvedValue('hello from clipboard');

    Object.assign(navigator, {
      clipboard: {
        writeText,
        readText,
      },
    });

    await expect(copyTextToClipboard('hello')).resolves.toBe(true);
    await expect(pasteTextFromClipboard()).resolves.toBe(
      'hello from clipboard',
    );
  });

  it('lists skills', () => {
    const output = executeCommand('skills', createContext());
    expect(output.length).toBeGreaterThan(0);
  });

  it('lists experience entries', () => {
    const output = executeCommand('experience', createContext());
    const text = output.map(l => l.content).join('\n');
    expect(text).toContain('Labmentix');
    expect(text).toContain('Demerg Systems');
  });

  it('lists education', () => {
    const output = executeCommand('education', createContext());
    expect(output.length).toBeGreaterThan(0);
  });

  it('shows help text', () => {
    const output = executeCommand('help', createContext());
    const text = output.map(l => l.content).join('\n');
    expect(text).toContain('COMMAND MANUAL');
  });

  it('shows clear command', () => {
    const output = executeCommand('clear', createContext());
    expect(output).toBeDefined();
  });

  it('shows theme help', () => {
    const output = executeCommand('theme', createContext());
    const text = output.map(l => l.content).join('\n');
    expect(text).toContain('theme');
  });

  it('shows contact info', () => {
    const output = executeCommand('contact', createContext());
    const text = output.map(l => l.content).join('\n');
    expect(text).toContain('@');
  });

  it('shows github info', () => {
    const output = executeCommand('github', createContext());
    const text = output.map(l => l.content).join('\n');
    expect(text).toContain('GitHub');
  });

  it('shows projects', () => {
    const output = executeCommand('projects', createContext());
    const text = output.map(l => l.content).join('\n');
    expect(text).toContain('ai-crm-pim-platform');
  });

  it('shows resume info', () => {
    const output = executeCommand('resume', createContext());
    const text = output.map(l => l.content).join('\n');
    expect(text).toContain('resume');
  });

  it('toggles crt effect', () => {
    const ctx = createContext();
    const output = executeCommand('crt', ctx);
    expect(output.length).toBeGreaterThan(0);
    expect(output[0]?.content).toContain('always on');
  });

  it('toggles key sounds', () => {
    const ctx = createContext();
    const output = executeCommand('keys', ctx);
    expect(output.length).toBeGreaterThan(0);
  });

  it('supports the reference shell commands', () => {
    const commands = [
      'man ls',
      'cowsay hello',
      'cat .plan',
      './blinkd',
      'sudo make me a sandwich',
    ];
    for (const command of commands) {
      const output = executeCommand(command, createContext());
      expect(output.length).toBeGreaterThan(0);
      expect(output.some(line => line.type === 'error')).toBe(false);
    }
  });

  it('supports the mail command with a pre-filled client link', () => {
    const output = executeCommand('mail hello@example.com', createContext());
    expect(output.some(line => line.content.includes('mailto:'))).toBe(true);
  });
});
