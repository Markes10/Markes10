'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { OutputLine, ThemeName, ThemeColors } from '@/lib/terminal/types';
import { fileSystem } from '@/lib/terminal/fileSystem';
import { executeCommand, getTabCompletion, getGhostText } from '@/lib/terminal/commands';

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
██║     ██║     ██╔══██║╚════██║╚════██║██║██║╚██╗██║██║   ██║
╚██████╗███████╗██║  ██║███████║███████║██║██║ ╚████║╚██████╔╝
 ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 

          D W E E P A N   G A I N   --   P O R T F O L I O   O S
          =======================================================

          type 'help' to read the manual
`;

// Keyboard click sound using Web Audio API
let audioCtx: AudioContext | null = null;
function playKeySound() {
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

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  const colors = THEMES[theme];

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 1060);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, isBooting]);

  // Focus input on click
  useEffect(() => {
    const handler = () => inputRef.current?.focus();
    termRef.current?.addEventListener('click', handler);
    return () => termRef.current?.removeEventListener('click', handler);
  }, []);

  // Boot sequence
  useEffect(() => {
    const bootOutput: OutputLine[] = [];
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line) => {
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

      const doneT = setTimeout(() => {
        setIsBooting(false);
        setBootDone(true);
        inputRef.current?.focus();
      }, bannerLines.length * 15 + 300);
      timeouts.push(doneT);
    }, 4000);
    timeouts.push(bannerT);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Compute ghost text
  const ghostText = useMemo(() => {
    if (!bootDone) return '';
    return getGhostText(input, cwd, fileSystem);
  }, [input, cwd, bootDone]);

  const handleThemeChange = useCallback((newTheme: ThemeName) => {
    setThemeFading(true);
    setTimeout(() => {
      setTheme(newTheme);
      setThemeFading(false);
    }, 200);
  }, []);

  const handleCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Echo the input
    const promptStr = `guest@retrosh:${cwd}$ `;
    const newOutput: OutputLine[] = [
      ...output,
      { id: `echo-${Date.now()}`, content: `${promptStr}${trimmed}`, type: 'input' },
    ];

    // Execute
    const ctx = {
      args: [],
      cwd,
      fs: fileSystem,
      setCwd,
      setTheme: handleThemeChange,
      setCrt,
      setKeys,
      crtOn,
      keysOn,
    } as any;

    const result = executeCommand(trimmed, ctx);

    // Handle clear
    if (result.length > 0 && (result as unknown as string) === 'CLEAR') {
      setOutput([]);
    } else {
      newOutput.push(...result);
      setOutput(newOutput);
    }

    setHistory(prev => [trimmed, ...prev.filter(h => h !== trimmed)].slice(0, 100));
    setHistoryIdx(-1);
    setInput('');
  }, [output, cwd, handleThemeChange, crtOn, keysOn]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isBooting) return;

    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const completed = getTabCompletion(input, cwd, fileSystem);
      if (completed !== input) {
        setInput(completed);
      }
      return;
    }

    // Up arrow - history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx === -1 ? 0 : Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
      return;
    }

    // Down arrow - history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
      return;
    }

    // Ctrl+L - clear
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setOutput([]);
      return;
    }

    // Esc - cancel
    if (e.key === 'Escape') {
      setInput('');
      return;
    }

    // Enter - execute
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      return;
    }

    // Play key sound for printable keys
    if (keysOn && e.key.length === 1) {
      playKeySound();
    }
  }, [input, isBooting, history, historyIdx, cwd, handleCommand, keysOn]);

  const promptStr = `guest@retrosh:${cwd}$ `;

  return (
    <div
      ref={termRef}
      className="relative w-full h-screen overflow-hidden font-mono select-none"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        transition: 'background-color 0.2s, color 0.2s',
        opacity: themeFading ? 0 : 1,
      }}
    >
      {/* CRT Scanline Overlay */}
      {crtOn && (
        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${colors.scanline} 2px,
              ${colors.scanline} 4px
            )`,
          }}
        />
      )}

      {/* CRT Vignette */}
      {crtOn && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)`,
          }}
        />
      )}

      {/* Screen flicker glow */}
      {crtOn && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ backgroundColor: colors.crtGlow }}
        />
      )}

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="relative z-10 h-[calc(100vh-36px)] overflow-y-auto px-4 py-3 text-sm leading-relaxed"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.textDim} transparent`,
        }}
      >
        {/* Output Lines */}
        {output.map(line => (
          <div
            key={line.id}
            className="whitespace-pre-wrap break-all"
            style={{
              color: line.type === 'error'
                ? colors.accent
                : line.type === 'input'
                  ? colors.textDim
                  : line.type === 'banner'
                    ? colors.text
                    : line.type === 'boot'
                      ? colors.textDim
                      : colors.text,
              fontWeight: line.type === 'banner' ? 'bold' : 'normal',
              fontSize: line.type === 'banner' ? '11px' : undefined,
              lineHeight: line.type === 'banner' ? '1.1' : undefined,
              letterSpacing: line.type === 'banner' ? '0.5px' : undefined,
            }}
          >
            {line.content || '\u00A0'}
          </div>
        ))}

        {/* Input Line */}
        {bootDone && (
          <div className="flex items-center whitespace-pre">
            <span style={{ color: colors.prompt, fontWeight: 'bold' }}>
              {promptStr}
            </span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 w-full h-full bg-transparent border-none outline-none font-mono text-sm p-0 m-0 caret-transparent"
                style={{ color: 'transparent' }}
                autoFocus
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
              />
              <div
                className="font-mono text-sm whitespace-pre"
                aria-hidden="true"
              >
                <span>{input}</span>
                {ghostText && (
                  <span style={{ color: colors.textGhost }}>{ghostText}</span>
                )}
                <span
                  className="inline-block w-[8px] h-[16px] align-text-bottom"
                  style={{
                    backgroundColor: cursorVisible ? colors.text : 'transparent',
                    transition: 'background-color 0.1s',
                  }}
                />
              </div>
            </div>
          </div>
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

      {/* Status Bar */}
      {bootDone && (
        <div
          className="relative z-40 flex items-center justify-between px-4 h-[36px] text-xs font-mono border-t"
          style={{
            color: colors.textDim,
            backgroundColor: `${colors.bg}`,
            borderColor: `${colors.textDim}33`,
          }}
        >
          <div className="flex items-center gap-3">
            <span>theme:{theme}</span>
            <span>crt:{crtOn ? 'on' : 'off'}</span>
            <span>keys:{keysOn ? 'on' : 'silent'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>tab:complete</span>
            <span>{'↑↓'}:history</span>
            <span>ctrl-l:clear</span>
            <span>esc:cancel</span>
          </div>
        </div>
      )}
    </div>
  );
}
