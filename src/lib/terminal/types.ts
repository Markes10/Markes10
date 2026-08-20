export interface FSNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FSNode>;
}

export type ThemeName = 'amber' | 'green' | 'white';

export interface ThemeColors {
  text: string;
  textDim: string;
  textGhost: string;
  bg: string;
  prompt: string;
  accent: string;
  scanline: string;
  crtGlow: string;
}

export interface TerminalState {
  cwd: string;
  commandHistory: string[];
  historyIndex: number;
  input: string;
  output: OutputLine[];
  theme: ThemeName;
  crtOn: boolean;
  keysOn: boolean;
  isBooting: boolean;
  ghostText: string;
}

export interface OutputLine {
  id: string;
  content: string;
  type: 'system' | 'output' | 'error' | 'input' | 'banner' | 'boot' | 'html';
}

export interface CommandContext {
  args: string[];
  cwd: string;
  fs: FSNode;
  setCwd: (path: string) => void;
  setTheme: (theme: ThemeName) => void;
  setCrt: (on: boolean) => void;
  setKeys: (on: boolean) => void;
  appendOutput: (lines: OutputLine[]) => void;
}
