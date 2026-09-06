'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { OutputLine, ThemeName } from '@/lib/terminal/types';
import { fileSystem } from '@/lib/terminal/fileSystem';
import {
  executeCommand,
  getTabCompletion,
  getGhostText,
  setCommandHistory,
} from '@/lib/terminal/commands';
import { createProfileCardHTML } from '@/lib/terminal/profileArt';
import { getThemeColors } from '@/lib/terminal/themeRegistry';
import {
  copyTextToClipboard,
  pasteTextFromClipboard,
} from '@/lib/terminal/clipboard';
const BOOT_LINES = [
  { text: 'PHOSPHOR BIOS v1.06 — POST', delay: 0 },
  { text: '', delay: 80 },
  { text: '', delay: 200 },
  { text: 'mem check ................. 640K ok', delay: 400 },
  { text: 'display ................... amber phosphor, 85 Hz', delay: 700 },
  { text: '', delay: 900 },
  { text: 'mounting /posts ........... 6 documents', delay: 1100 },
  { text: 'mounting /projects ........ 3 binaries', delay: 1400 },
  { text: 'mounting /topics .......... 10 directories', delay: 1600 },
  { text: '', delay: 1800 },
  { text: 'starting glm-sh ........... ok', delay: 2100 },
  { text: 'last login: never. welcome, stranger.', delay: 2500 },
  { text: '', delay: 3700 },
];

const PORTFOLIO_GLYPHS: Record<string, string[]> = {
  P: ['████', '█  █', '████', '█   ', '█   '],
  O: ['████', '█  █', '█  █', '█  █', '████'],
  R: ['████', '█  █', '████', '█ █ ', '█  █'],
  T: ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
  F: ['████', '█   ', '███ ', '█   ', '█   '],
  L: ['█   ', '█   ', '█   ', '█   ', '████'],
  I: ['███', ' █ ', ' █ ', ' █ ', '███'],
};

const BANNER = 'PORTFOLIO'
  .split('')
  .reduce(
    (rows, letter, index) =>
      rows.map(
        (row, rowIndex) =>
          `${row}${index ? ' ' : ''}${PORTFOLIO_GLYPHS[letter][rowIndex]}`,
      ),
    ['', '', '', '', ''],
  )
  .join('\n');

// Mechanical key click via Web Audio
let audioCtx: AudioContext | null = null;
function playKeySound() {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(
      800 + Math.random() * 400,
      audioCtx.currentTime,
    );
    osc.frequency.exponentialRampToValueAtTime(
      200,
      audioCtx.currentTime + 0.05,
    );
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.06);
  } catch {
    /* */
  }
}

export default function Terminal() {
  const [theme, setTheme] = useState<ThemeName>('amber');
  const [crtOn, setCrtOn] = useState(true);
  const [keysOn, setKeysOn] = useState(false);
  const [cwd, setCwd] = useState('/');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [bootDone, setBootDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [themeFading, setThemeFading] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  // Track session start for uptime command
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__SESSION_START = Date.now();
    }
  }, []);

  // Sync command history for the `history` command
  useEffect(() => {
    setCommandHistory(history);
  }, [history]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  // We keep refs to the latest state so the global listener always sees current values
  const stateRef = useRef({
    input,
    output,
    cwd,
    history,
    historyIdx,
    isBooting,
    bootDone,
    keysOn,
    crtOn,
  });

  // Stable dispatchers for use inside the global keydown listener
  const stableDispatch = useRef({ setTheme, setCrtOn, setKeysOn, setCwd });

  // Sync refs on every render (safe because this doesn't cause side effects)
  useEffect(() => {
    stateRef.current = {
      input,
      output,
      cwd,
      history,
      historyIdx,
      isBooting,
      bootDone,
      keysOn,
      crtOn,
    };
    stableDispatch.current = { setTheme, setCrtOn, setKeysOn, setCwd };
  });

  const colors = getThemeColors(theme);

  const renderProfileCard = useCallback(
    (nextTheme = theme) => {
      if (!bootDone) return;

      const loadingId = `profile-loading-${Date.now()}`;
      const separatorId = `profile-separator-${Date.now()}`;

      setOutput(prev => {
        const filtered = prev.filter(
          line =>
            !line.id.startsWith('profile-loading-') &&
            !line.id.startsWith('profile-separator-') &&
            !line.id.startsWith('profile-art-') &&
            !line.id.startsWith('profile-end-'),
        );

        return [
          ...filtered,
          { id: separatorId, content: '', type: 'output' },
          {
            id: loadingId,
            content: '  Loading profile card...',
            type: 'output',
          },
        ];
      });

      createProfileCardHTML(nextTheme).then(html => {
        setOutput(prev => {
          const filtered = prev.filter(
            line =>
              !line.id.startsWith('profile-loading-') &&
              !line.id.startsWith('profile-separator-') &&
              !line.id.startsWith('profile-art-') &&
              !line.id.startsWith('profile-end-'),
          );

          return [
            ...filtered,
            {
              id: `profile-art-${Date.now()}`,
              content: html,
              type: 'html',
            },
            { id: `profile-end-${Date.now()}`, content: '', type: 'output' },
          ];
        });
        setTimeout(() => termRef.current?.focus(), 50);
      });
    },
    [bootDone, theme],
  );

  // Blink cursor at 1.06s
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 1060);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, isBooting, input]);

  // Focus terminal on click
  const focusTerminal = useCallback(() => {
    termRef.current?.focus();
  }, []);

  // GLOBAL keydown listener - bypasses React's event system entirely
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (!s.bootDone || s.isBooting) return;

      // Tab
      if (e.key === 'Tab') {
        e.preventDefault();
        const completed = getTabCompletion(s.input, s.cwd, fileSystem);
        if (completed !== s.input) setInput(completed);
        return;
      }

      // ArrowUp
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (s.history.length === 0) return;
        const newIdx =
          s.historyIdx === -1
            ? 0
            : Math.min(s.historyIdx + 1, s.history.length - 1);
        setHistoryIdx(newIdx);
        setInput(s.history[newIdx]);
        return;
      }

      // ArrowDown
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (s.historyIdx === -1) return;
        if (s.historyIdx === 0) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          const newIdx = s.historyIdx - 1;
          setHistoryIdx(newIdx);
          setInput(s.history[newIdx]);
        }
        return;
      }

      // Ctrl+L
      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        setOutput([]);
        return;
      }

      // Ctrl+C
      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        const promptStr = 'Dweepan@cli: ~& ';
        setOutput(prev => [
          ...prev,
          {
            id: `ctrlc-${Date.now()}`,
            content: `${promptStr}${s.input}^C`,
            type: 'input',
          },
        ]);
        setInput('');
        setHistoryIdx(-1);
        return;
      }

      // Ctrl+U
      if (e.key === 'u' && e.ctrlKey) {
        e.preventDefault();
        setInput('');
        return;
      }

      // Backspace
      if (e.key === 'Backspace' || e.code === 'Backspace') {
        e.preventDefault();
        setInput(prev => prev.slice(0, -1));
        setHistoryIdx(-1);
        if (s.keysOn) playKeySound();
        return;
      }

      // Enter
      if (e.key === 'Enter') {
        e.preventDefault();
        const trimmed = s.input.trim();
        if (!trimmed) return;

        const promptStr = 'Dweepan@cli: ~& ';
        const newOutput: OutputLine[] = [
          ...s.output,
          {
            id: `echo-${Date.now()}`,
            content: `${promptStr}${trimmed}`,
            type: 'input',
          },
        ];

        const handleTheme = (t: string) => {
          setThemeFading(true);
          setTimeout(() => {
            stableDispatch.current.setTheme(t);
            setThemeFading(false);
          }, 200);
        };

        const ctx = {
          args: [],
          cwd: s.cwd,
          fs: fileSystem,
          theme,
          setCwd: (p: string) => stableDispatch.current.setCwd(p),
          setTheme: handleTheme,
          setCrt: (v: boolean) => stableDispatch.current.setCrtOn(v),
          setKeys: (v: boolean) => stableDispatch.current.setKeysOn(v),
          appendOutput: (lines: OutputLine[]) =>
            setOutput(prev => [...prev, ...lines]),
          crtOn: s.crtOn,
          keysOn: s.keysOn,
        } as any;

        const result = executeCommand(trimmed, ctx);

        if (result.length > 0 && (result as unknown as string) === 'CLEAR') {
          setOutput([]);
        } else {
          newOutput.push(...result);
          setOutput(newOutput);
        }

        setHistory(prev =>
          [trimmed, ...prev.filter(h => h !== trimmed)].slice(0, 100),
        );
        setHistoryIdx(-1);
        setInput('');
        return;
      }

      // Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        setInput('');
        setHistoryIdx(-1);
        return;
      }

      // Printable characters - only when no modifier keys
      // Use e.key first; fall back to e.code for automation tools that don't set e.key
      let char = '';
      if (e.key.length === 1) {
        char = e.key;
      } else if (
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        e.code &&
        e.code.startsWith('Key')
      ) {
        char = e.code.slice(3).toLowerCase();
      } else if (
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        e.code &&
        e.code.startsWith('Digit')
      ) {
        char = e.code.slice(5);
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.code === 'Space') {
        char = ' ';
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.code === 'Minus') {
        char = '-';
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.code === 'Period') {
        char = '.';
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.code === 'Slash') {
        char = '/';
      }

      if (char) {
        e.preventDefault();
        setInput(prev => prev + char);
        if (s.keysOn) playKeySound();
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [theme]);

  // Boot sequence
  useEffect(() => {
    const bootOutput: OutputLine[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach(line => {
      const t = setTimeout(() => {
        bootOutput.push({
          id: `boot-${Date.now()}-${Math.random()}`,
          content: line.text,
          type: 'boot',
        });
        setOutput([...bootOutput]);
      }, line.delay);
      timeouts.push(t);
    });

    const bannerT = setTimeout(() => {
      const bannerLines = BANNER.split('\n');
      bannerLines.forEach((line, i) => {
        const bt = setTimeout(() => {
          bootOutput.push({
            id: `banner-${Date.now()}-${i}`,
            content: line,
            type: 'banner',
          });
          setOutput([...bootOutput]);
        }, i * 15);
        timeouts.push(bt);
      });

      const doneT = setTimeout(
        () => {
          setIsBooting(false);
          setBootDone(true);
        },
        bannerLines.length * 15 + 300,
      );
      timeouts.push(doneT);
    }, 4000);
    timeouts.push(bannerT);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handleCopyPaste = async (event: KeyboardEvent) => {
      if (!bootDone) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
        const selection = window.getSelection()?.toString();
        if (selection) {
          event.preventDefault();
          await copyTextToClipboard(selection);
          setSelectedText(selection);
        }
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
        event.preventDefault();
        const pasted = await pasteTextFromClipboard();
        if (pasted) {
          setInput(prev => `${prev}${pasted}`);
        }
      }
    };

    window.addEventListener('keydown', handleCopyPaste);
    return () => window.removeEventListener('keydown', handleCopyPaste);
  }, [bootDone]);

  // Ghost text
  const ghostText = useMemo(() => {
    if (!bootDone) return '';
    return getGhostText(input, cwd, fileSystem);
  }, [input, cwd, bootDone]);

  const promptStr = 'Dweepan@cli: ~& ';

  return (
    <div
      ref={termRef}
      tabIndex={0}
      className="terminal-app relative flex h-screen w-full flex-col overflow-hidden select-none outline-none"
      data-theme={theme}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        transition: 'background-color 0.2s, color 0.2s',
        opacity: themeFading ? 0 : 1,
      }}
      aria-label="Phosphor terminal - type help for commands"
    >
      {/* CRT Scanlines */}
      {crtOn && (
        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${colors.scanline} 2px, ${colors.scanline} 4px)`,
          }}
        />
      )}

      {/* CRT Vignette */}
      {crtOn && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      )}

      {/* Screen glow */}
      {crtOn && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ backgroundColor: colors.crtGlow }}
        />
      )}

      {crtOn && (
        <div className="terminal-crt-roll pointer-events-none absolute inset-x-0 top-0 z-30" />
      )}

      {/* Terminal scrollable area */}
      <div
        ref={scrollRef}
        className="terminal-scroll relative z-10 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.textDim} transparent`,
        }}
      >
        {/* Output */}
        {output.map(line =>
          line.type === 'html' ? (
            <div
              key={line.id}
              className="terminal-output whitespace-pre select-text"
              data-type={line.type}
              style={{
                lineHeight: '1.15',
                fontSize: '12px',
                letterSpacing: '0.5px',
              }}
              dangerouslySetInnerHTML={{ __html: line.content }}
              onMouseUp={() => {
                const selection = window.getSelection()?.toString();
                if (selection) setSelectedText(selection);
              }}
            />
          ) : (
            <div
              key={line.id}
              className="terminal-output whitespace-pre-wrap break-all select-text"
              data-type={line.type}
              aria-label={line.type === 'banner' ? 'PORTFOLIO' : undefined}
              style={{
                color:
                  line.type === 'error'
                    ? colors.accent
                    : line.type === 'input'
                      ? colors.textDim
                      : line.type === 'banner'
                        ? colors.text
                        : line.type === 'boot'
                          ? colors.textDim
                          : colors.text,
                fontWeight: line.type === 'banner' ? 'bold' : 'normal',
                fontSize: line.type === 'banner' ? '17px' : undefined,
                lineHeight: line.type === 'banner' ? '1.08' : undefined,
                letterSpacing: line.type === 'banner' ? '0.2px' : undefined,
              }}
              onMouseUp={() => {
                const selection = window.getSelection()?.toString();
                if (selection) setSelectedText(selection);
              }}
            >
              {line.content || '\u00A0'}
            </div>
          ),
        )}

        {/* Boot cursor */}
        {isBooting && (
          <div className="flex items-center">
            <span
              className="inline-block w-[8px] h-[16px]"
              style={{
                backgroundColor: cursorVisible ? colors.text : 'transparent',
                animation: 'blink 1.06s step-end infinite',
              }}
            />
          </div>
        )}
      </div>

      {bootDone && (
        <div className="terminal-bottom relative z-10">
          <div className="terminal-prompt flex whitespace-pre">
            <span style={{ color: colors.prompt, fontWeight: 'bold' }}>
              {promptStr}
            </span>
            <span>{input}</span>
            {ghostText && (
              <span
                key={ghostText}
                className="terminal-ghost"
                style={{ color: colors.textGhost }}
              >
                {ghostText}
              </span>
            )}
            <span
              className="terminal-cursor inline-block w-[8px] h-[16px] align-text-bottom flex-shrink-0"
              style={{
                backgroundColor: cursorVisible ? colors.text : 'transparent',
                transition: 'background-color 0.1s',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
