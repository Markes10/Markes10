'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { OutputLine, ThemeName, ThemeColors } from '@/lib/terminal/types';
import { fileSystem } from '@/lib/terminal/fileSystem';
import { executeCommand, getTabCompletion, getGhostText } from '@/lib/terminal/commands';
import { createProfileArtHTML } from '@/lib/terminal/profileArt';

const THEMES: Record<ThemeName, ThemeColors> = {
  amber: {
    text: '#ffb000',
    textDim: '#b37d00',
    textGhost: 'rgba(255, 176, 0, 0.35)',
    bg: '#0a0a00',
    prompt: '#ffb000',
    accent: '#ff6600',
    scanline: 'rgba(255, 176, 0, 0.03)',
    crtGlow: 'rgba(255, 176, 0, 0.04)',
  },
  green: {
    text: '#33ff00',
    textDim: '#1a8c00',
    textGhost: 'rgba(51, 255, 0, 0.3)',
    bg: '#000a00',
    prompt: '#33ff00',
    accent: '#00cc66',
    scanline: 'rgba(51, 255, 0, 0.03)',
    crtGlow: 'rgba(51, 255, 0, 0.04)',
  },
  white: {
    text: '#c0c0c0',
    textDim: '#707070',
    textGhost: 'rgba(192, 192, 192, 0.3)',
    bg: '#0a0a0a',
    prompt: '#e0e0e0',
    accent: '#ffffff',
    scanline: 'rgba(192, 192, 192, 0.03)',
    crtGlow: 'rgba(192, 192, 192, 0.04)',
  },
};

const BOOT_LINES = [
  { text: 'RETRO BIOS v2.4.1', delay: 0 },
  { text: 'Copyright (C) 2024 RetroSystems Inc.', delay: 80 },
  { text: '', delay: 200 },
  { text: 'Memory Test: 640K OK', delay: 400 },
  { text: 'Memory Test: 524288K OK', delay: 700 },
  { text: '', delay: 900 },
  { text: 'Detecting IDE drives...', delay: 1100 },
  { text: '  Primary Master  : RETRO-HDD 256MB', delay: 1400 },
  { text: '  Secondary Master: RETRO-CDROM', delay: 1600 },
  { text: '', delay: 1800 },
  { text: 'mounting resume.dat...', delay: 2100 },
  { text: 'loading portfolio modules...', delay: 2500 },
  { text: '  [OK] /about', delay: 2700 },
  { text: '  [OK] /experience', delay: 2850 },
  { text: '  [OK] /projects', delay: 3000 },
  { text: '  [OK] /skills', delay: 3150 },
  { text: '  [OK] /education', delay: 3300 },
  { text: '  [OK] /contact', delay: 3450 },
  { text: '', delay: 3700 },
];

const BANNER = `
 ██████╗██╗      █████╗ ███████╗███████╗██╗███╗   ██╗ ██████╗ 
██╔════╝██║     ██╔══██╗██╔════╝██╔════╝██║████╗  ██║██╔═══██╗
██║     ██║     ███████║███████╗███████╗██║██╔██╗ ██║██║   ██║
██║     ██║     ██╔══██╗╚════██║╚════██║██║██║╚██╗██║██║   ██║
╚██████╗███████╗██║  ██║███████║███████║██║██║ ╚████║╚██████╔╝
 ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 

          D W E E P A N   G A I N   --   P O R T F O L I O   O S
          =======================================================

          type 'help' to read the manual
`;

// Mechanical key click via Web Audio
let audioCtx: AudioContext | null = null;
function playKeySound() {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(800 + Math.random() * 400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.06);
  } catch { /* */ }
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  // We keep refs to the latest state so the global listener always sees current values
  const stateRef = useRef({ input, output, cwd, history, historyIdx, isBooting, bootDone, keysOn, crtOn });

  // Stable dispatchers for use inside the global keydown listener
  const stableDispatch = useRef({ setTheme, setCrtOn, setKeysOn, setCwd });

  // Sync refs on every render (safe because this doesn't cause side effects)
  useEffect(() => {
    stateRef.current = { input, output, cwd, history, historyIdx, isBooting, bootDone, keysOn, crtOn };
    stableDispatch.current = { setTheme, setCrtOn, setKeysOn, setCwd };
  });

  const colors = THEMES[theme];

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
        const newIdx = s.historyIdx === -1 ? 0 : Math.min(s.historyIdx + 1, s.history.length - 1);
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
        const promptStr = `guest@retrosh:${s.cwd}$ `;
        setOutput(prev => [...prev, { id: `ctrlc-${Date.now()}`, content: `${promptStr}${s.input}^C`, type: 'input' }]);
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

      // Enter
      if (e.key === 'Enter') {
        e.preventDefault();
        const trimmed = s.input.trim();
        if (!trimmed) return;

        const promptStr = `guest@retrosh:${s.cwd}$ `;
        const newOutput: OutputLine[] = [
          ...s.output,
          { id: `echo-${Date.now()}`, content: `${promptStr}${trimmed}`, type: 'input' },
        ];

        const handleTheme = (t: ThemeName) => {
          setThemeFading(true);
          setTimeout(() => { stableDispatch.current.setTheme(t); setThemeFading(false); }, 200);
        };

        const ctx = {
          args: [], cwd: s.cwd, fs: fileSystem,
          setCwd: (p: string) => stableDispatch.current.setCwd(p),
          setTheme: handleTheme,
          setCrt: (v: boolean) => stableDispatch.current.setCrtOn(v),
          setKeys: (v: boolean) => stableDispatch.current.setKeysOn(v),
          appendOutput: (lines: OutputLine[]) => setOutput(prev => [...prev, ...lines]),
          crtOn: s.crtOn, keysOn: s.keysOn,
        } as any;

        const result = executeCommand(trimmed, ctx);

        if (result.length > 0 && (result as unknown as string) === 'CLEAR') {
          setOutput([]);
        } else {
          newOutput.push(...result);
          setOutput(newOutput);
        }

        setHistory(prev => [trimmed, ...prev.filter(h => h !== trimmed)].slice(0, 100));
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
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.code && e.code.startsWith('Key')) {
        char = e.code.slice(3).toLowerCase();
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.code && e.code.startsWith('Digit')) {
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
  }, []);

  // Boot sequence
  useEffect(() => {
    const bootOutput: OutputLine[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line) => {
      const t = setTimeout(() => {
        bootOutput.push({ id: `boot-${Date.now()}-${Math.random()}`, content: line.text, type: 'boot' });
        setOutput([...bootOutput]);
      }, line.delay);
      timeouts.push(t);
    });

    const bannerT = setTimeout(() => {
      const bannerLines = BANNER.split('\n');
      bannerLines.forEach((line, i) => {
        const bt = setTimeout(() => {
          bootOutput.push({ id: `banner-${Date.now()}-${i}`, content: line, type: 'banner' });
          setOutput([...bootOutput]);
        }, i * 15);
        timeouts.push(bt);
      });

      const doneT = setTimeout(() => {
        setIsBooting(false);
        setBootDone(true);
        // Show colorful profile art after boot
        setTimeout(() => {
          setOutput(prev => [
            ...prev,
            { id: `profile-${Date.now()}`, content: '', type: 'output' },
            { id: `profile-art-${Date.now()}`, content: createProfileArtHTML(), type: 'html' },
            { id: `profile-end-${Date.now()}`, content: '', type: 'output' },
          ]);
          setTimeout(() => termRef.current?.focus(), 50);
        }, 200);
      }, bannerLines.length * 15 + 300);
      timeouts.push(doneT);
    }, 4000);
    timeouts.push(bannerT);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Ghost text
  const ghostText = useMemo(() => {
    if (!bootDone) return '';
    return getGhostText(input, cwd, fileSystem);
  }, [input, cwd, bootDone]);

  const promptStr = `guest@retrosh:${cwd}$ `;

  return (
    <div
      ref={termRef}
      tabIndex={0}
      className="relative w-full h-screen overflow-hidden font-mono select-none outline-none"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        transition: 'background-color 0.2s, color 0.2s',
        opacity: themeFading ? 0 : 1,
      }}
      aria-label="RETROSHELL Terminal - type help for commands"
    >
      {/* CRT Scanlines */}
      {crtOn && (
        <div className="pointer-events-none absolute inset-0 z-30" style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${colors.scanline} 2px, ${colors.scanline} 4px)`,
        }} />
      )}

      {/* CRT Vignette */}
      {crtOn && (
        <div className="pointer-events-none absolute inset-0 z-20" style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
        }} />
      )}

      {/* Screen glow */}
      {crtOn && (
        <div className="pointer-events-none absolute inset-0 z-10" style={{ backgroundColor: colors.crtGlow }} />
      )}

      {/* Terminal scrollable area */}
      <div ref={scrollRef} className="relative z-10 h-[calc(100vh-36px)] overflow-y-auto px-4 py-3 text-sm leading-relaxed" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: `${colors.textDim} transparent`,
      }}>
        {/* Output */}
        {output.map(line => (
          line.type === 'html' ? (
            <div
              key={line.id}
              className="whitespace-pre"
              style={{ lineHeight: '1.15', fontSize: '12px', letterSpacing: '0.5px' }}
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          ) : (
            <div key={line.id} className="whitespace-pre-wrap break-all" style={{
              color: line.type === 'error' ? colors.accent
                : line.type === 'input' ? colors.textDim
                : line.type === 'banner' ? colors.text
                : line.type === 'boot' ? colors.textDim
                : colors.text,
              fontWeight: line.type === 'banner' ? 'bold' : 'normal',
              fontSize: line.type === 'banner' ? '11px' : undefined,
              lineHeight: line.type === 'banner' ? '1.1' : undefined,
              letterSpacing: line.type === 'banner' ? '0.5px' : undefined,
            }}>{line.content || '\u00A0'}</div>
          )
        ))}

        {/* Input line */}
        {bootDone && (
          <div className="flex whitespace-pre">
            <span style={{ color: colors.prompt, fontWeight: 'bold' }}>{promptStr}</span>
            <span>{input}</span>
            {ghostText && <span style={{ color: colors.textGhost }}>{ghostText}</span>}
            <span className="inline-block w-[8px] h-[16px] align-text-bottom flex-shrink-0" style={{
              backgroundColor: cursorVisible ? colors.text : 'transparent',
              transition: 'background-color 0.1s',
            }} />
          </div>
        )}

        {/* Boot cursor */}
        {isBooting && (
          <div className="flex items-center">
            <span className="inline-block w-[8px] h-[16px]" style={{
              backgroundColor: cursorVisible ? colors.text : 'transparent',
              animation: 'blink 1.06s step-end infinite',
            }} />
          </div>
        )}
      </div>

      {/* Status bar */}
      {bootDone && (
        <div className="relative z-40 flex items-center justify-between px-4 h-[36px] text-xs font-mono border-t" style={{
          color: colors.textDim,
          backgroundColor: colors.bg,
          borderColor: `${colors.textDim}33`,
        }}>
          <div className="flex items-center gap-3">
            <span>theme:{theme}</span>
            <span>crt:{crtOn ? 'on' : 'off'}</span>
            <span>keys:{keysOn ? 'on' : 'silent'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>tab:complete</span>
            <span>{'\u2191\u2193'}:history</span>
            <span>ctrl-l:clear</span>
            <span>esc:cancel</span>
          </div>
        </div>
      )}
    </div>
  );
}
