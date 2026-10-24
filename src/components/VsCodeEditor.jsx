// src/components/VsCodeEditor.jsx
// Authentic VS Code Dark+ / Dark Modern Editor Component
import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, Split, MoreHorizontal, ChevronRight, Search, ShieldCheck } from 'lucide-react';

// Custom Python Logo SVG matching VS Code file icon
function PythonIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 256 255" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pyBlue" x1="12.96%" y1="12.04%" x2="79.97%" y2="78.2%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="pyYellow" x1="19.13%" y1="19.06%" x2="90.8%" y2="87.75%">
          <stop offset="0%" stopColor="#FFE873" />
          <stop offset="100%" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
      <path
        d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.57 34.475-33.319V28.187S194.887.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
        fill="url(#pyBlue)"
      />
      <path
        d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.71c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.57-34.475 33.32v60.884s-5.457 29.024 62.52 29.024zm34.114-19.588a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
        fill="url(#pyYellow)"
      />
    </svg>
  );
}

// Tokenize a line of Python code with authentic VS Code Dark+ color palette
function renderPythonLine(line, activeLineIndex, lineNumber) {
  if (!line || line.trim() === '') {
    return <span>&nbsp;</span>;
  }

  // Comments take full line precedence
  const commentIdx = line.indexOf('#');
  if (commentIdx === 0) {
    return <span className="text-[#6A9955] italic">{line}</span>;
  }

  // If there's an inline comment, split code and comment
  let codePart = line;
  let commentPart = '';
  if (commentIdx > 0) {
    // Make sure '#' is not inside a string
    let inQuotes = false;
    let quoteChar = '';
    let realCommentIdx = -1;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if ((c === '"' || c === "'") && (i === 0 || line[i - 1] !== '\\')) {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = c;
        } else if (c === quoteChar) {
          inQuotes = false;
        }
      } else if (c === '#' && !inQuotes) {
        realCommentIdx = i;
        break;
      }
    }
    if (realCommentIdx !== -1) {
      codePart = line.slice(0, realCommentIdx);
      commentPart = line.slice(realCommentIdx);
    }
  }

  // Regular expression to match Python tokens
  // 1: Strings (f"...", "...", '...')
  // 2: Function definition name (after def)
  // 3: Keywords
  // 4: Built-in functions / types
  // 5: Numbers
  // 6: Operators / Punctuation
  // 7: Words / Identifiers
  const tokenRegex = /(f?["'](?:\\.|[^"'\\])*["'])|(\bdef\s+)([a-zA-Z_]\w*)|(\b(?:def|class|if|elif|else|while|for|in|return|and|or|not|is|as|import|from|try|except|finally|pass|break|continue|with|raise|yield|lambda|None|True|False)\b)|(\b(?:print|len|range|input|int|float|str|list|set|sorted|enumerate|reversed|append|heapq|heappush|heapreplace|max|min|sum|abs)\b)|(\b\d+(?:\.\d+)?\b)|([()\[\]{}:,;=+\-*\/<>!%&|^~]+)|([a-zA-Z_]\w*)|(\s+)/g;

  const elements = [];
  let match;
  let lastIndex = 0;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    const [
      full,
      strToken,
      defKeyword,
      funcName,
      ctrlKeyword,
      builtinToken,
      numberToken,
      operatorToken,
      identToken,
      spaceToken,
    ] = match;

    if (strToken) {
      elements.push(
        <span key={elements.length} className="text-[#CE9178]">
          {strToken}
        </span>
      );
    } else if (defKeyword) {
      elements.push(
        <span key={elements.length} className="text-[#569CD6]">
          {defKeyword}
        </span>
      );
      elements.push(
        <span key={elements.length} className="text-[#DCDCAA] font-semibold">
          {funcName}
        </span>
      );
    } else if (ctrlKeyword) {
      // def/class are blue #569CD6, while control flow (if/else/for/return) is purple #C586C0
      const isDefOrClass = ctrlKeyword === 'def' || ctrlKeyword === 'class';
      const isConstant = ctrlKeyword === 'True' || ctrlKeyword === 'False' || ctrlKeyword === 'None';
      const color = isDefOrClass ? 'text-[#569CD6]' : isConstant ? 'text-[#569CD6]' : 'text-[#C586C0]';
      elements.push(
        <span key={elements.length} className={`${color} font-medium`}>
          {ctrlKeyword}
        </span>
      );
    } else if (builtinToken) {
      elements.push(
        <span key={elements.length} className="text-[#DCDCAA]">
          {builtinToken}
        </span>
      );
    } else if (numberToken) {
      elements.push(
        <span key={elements.length} className="text-[#B5CEA8]">
          {numberToken}
        </span>
      );
    } else if (operatorToken) {
      elements.push(
        <span key={elements.length} className="text-[#D4D4D4]">
          {operatorToken}
        </span>
      );
    } else if (identToken) {
      elements.push(
        <span key={elements.length} className="text-[#9CDCFE]">
          {identToken}
        </span>
      );
    } else if (spaceToken) {
      elements.push(<span key={elements.length}>{spaceToken}</span>);
    }
  }

  return (
    <span>
      {elements}
      {commentPart && <span className="text-[#6A9955] italic">{commentPart}</span>}
    </span>
  );
}

export default function VsCodeEditor({
  filename = 'main.py',
  code = '',
  terminalData = null,
  activeApproachName = '',
  onRun = null,
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'terminal'
  const [activeTerminalTab, setActiveTerminalTab] = useState('terminal'); // 'terminal', 'output', 'problems'
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);
  const [cursorLine, setCursorLine] = useState(1);

  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunExecution = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      setActiveTab('code'); // keep editor visible with terminal underneath
    }, 400);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] shadow-2xl shadow-black/80 font-mono text-[13px] leading-relaxed select-text transition-all">
      {/* 1. VS Code Window Top Title Bar */}
      <div className="bg-[#181818] border-b border-[#2b2b2b] px-3 sm:px-4 py-2 flex items-center justify-between text-zinc-400 select-none text-xs">
        {/* Left: Window Dots + Workspace Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition cursor-pointer" />
          </div>
          <span className="hidden sm:inline-block text-[11px] text-zinc-500 font-sans tracking-tight">
            interview_prep — Visual Studio Code
          </span>
        </div>

        {/* Center: Command Palette / File Quick Search */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#252526] rounded-md border border-[#3c3c3c] text-zinc-300 text-[11px] shadow-inner max-w-xs sm:max-w-sm w-full justify-center">
          <Search className="w-3 h-3 text-zinc-400" />
          <span className="truncate">{filename}</span>
        </div>

        {/* Right: Window Controls / Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunExecution}
            title="Run Python File in Integrated Terminal (▷)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0e639c] hover:bg-[#1177bb] text-white text-[11px] font-sans font-medium transition cursor-pointer shadow-sm shadow-cyan-900/40"
          >
            <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-pulse' : ''}`} />
            <span className="hidden md:inline">Run Code</span>
          </button>
          <button
            onClick={handleCopy}
            title="Copy Code"
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#333333] text-zinc-300 hover:text-white transition cursor-pointer text-[11px]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. File Tabs Bar */}
      <div className="bg-[#181818] flex items-center justify-between border-b border-[#252526] select-none overflow-x-auto scrollbar-none">
        <div className="flex items-center">
          {/* Active File Tab */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1e1e] border-t-2 border-t-[#007acc] text-zinc-200 text-xs font-sans font-medium border-r border-r-[#252526]">
            <PythonIcon className="w-4 h-4 flex-shrink-0" />
            <span className="text-[#e1e1e1] font-mono text-[12px]">{filename}</span>
            <span className="text-zinc-500 hover:text-white transition cursor-pointer ml-1 text-xs">✕</span>
          </div>

          {/* Secondary Tab: Terminal Quick Toggle */}
          <button
            onClick={() => setActiveTerminalTab('terminal')}
            className="flex items-center gap-1.5 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:bg-[#1f1f1f] text-xs font-sans transition border-r border-r-[#252526]"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-[11px]">Integrated Terminal</span>
          </button>
        </div>

        {/* Tab Right Icons */}
        <div className="flex items-center gap-1 px-3 text-zinc-500">
          <Split className="w-3.5 h-3.5 hover:text-zinc-300 transition cursor-pointer" title="Split Editor" />
          <MoreHorizontal className="w-3.5 h-3.5 hover:text-zinc-300 transition cursor-pointer ml-1" title="More Actions" />
        </div>
      </div>

      {/* 3. VS Code Breadcrumbs Bar */}
      <div className="bg-[#1e1e1e] border-b border-[#282828] px-4 py-1 flex items-center gap-1 text-[11px] text-zinc-400 font-sans select-none overflow-x-auto scrollbar-none">
        <span className="text-zinc-500">src</span>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <span className="text-zinc-500">interview_prep</span>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <div className="flex items-center gap-1 text-zinc-300">
          <PythonIcon className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px]">{filename}</span>
        </div>
        <ChevronRight className="w-3 h-3 text-zinc-600" />
        <span className="text-[#DCDCAA] font-mono text-[11px] truncate">
          {activeApproachName || 'solution'}
        </span>
      </div>

      {/* 4. Code Editor Canvas with Line Numbers & Syntax Highlighting */}
      <div className="relative bg-[#1e1e1e] overflow-x-auto py-3 max-h-[580px] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        <div className="min-w-full inline-block">
          {lines.map((lineText, idx) => {
            const lineNum = idx + 1;
            const isCursorActive = cursorLine === lineNum;
            return (
              <div
                key={lineNum}
                onClick={() => setCursorLine(lineNum)}
                className={`group flex items-center font-mono text-[12.5px] sm:text-[13px] leading-6 px-1 transition-colors cursor-text ${
                  isCursorActive ? 'bg-[#282828]/60 border-l-2 border-l-[#007acc]' : 'hover:bg-[#252525]/40 border-l-2 border-l-transparent'
                }`}
              >
                {/* Line Number Gutter */}
                <div
                  className={`w-10 sm:w-12 text-right pr-3 select-none flex-shrink-0 text-xs ${
                    isCursorActive ? 'text-[#c6c6c6] font-semibold' : 'text-[#858585] group-hover:text-zinc-400'
                  }`}
                >
                  {lineNum}
                </div>

                {/* Indent Guide Line Marker & Code Content */}
                <div className="flex-1 pl-2 pr-4 whitespace-pre font-mono">
                  {renderPythonLine(lineText, cursorLine, lineNum)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Integrated VS Code Terminal (Interactive Output Showcase) */}
      {terminalData && (
        <div className="border-t border-[#2b2b2b] bg-[#181818]">
          {/* Terminal Tabs Header */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#1f1f1f] border-b border-[#2b2b2b] text-[11px] font-sans select-none">
            <div className="flex items-center gap-4">
              <span className="text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">Problems 0</span>
              <span className="text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">Output</span>
              <span className="text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">Debug Console</span>
              <div className="flex items-center gap-1.5 text-zinc-100 font-semibold border-b border-cyan-400 pb-0.5">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span className="uppercase tracking-wider text-[10px] text-cyan-300">Terminal (pwsh)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-[10px] text-zinc-500 font-mono">Python 3.11.8 (64-bit)</span>
              <button
                onClick={handleRunExecution}
                className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              >
                Re-Run
              </button>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="p-3.5 bg-[#141414] font-mono text-xs sm:text-[12.5px] space-y-1.5 max-h-56 overflow-y-auto">
            {/* Command execution line */}
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-emerald-400 font-bold">PS C:\Users\arpit\python-interviews&gt;</span>
              <span className="text-amber-300">{terminalData.command || `python ${filename}`}</span>
            </div>

            {/* Inputs prompt simulation */}
            {terminalData.inputs && terminalData.inputs.length > 0 && (
              <div className="space-y-0.5 text-zinc-400 pl-2 border-l border-zinc-800 my-1">
                {terminalData.inputs.map((inp, idx) => (
                  <div key={idx} className="text-zinc-300">
                    <span className="text-cyan-400">&gt;&gt;</span> {inp}
                  </div>
                ))}
              </div>
            )}

            {/* Output lines */}
            {terminalData.output && (
              <div className="space-y-1 pt-1">
                {terminalData.output.map((out, idx) => (
                  <div
                    key={idx}
                    className={`font-semibold ${
                      out.includes('Error')
                        ? 'text-rose-400'
                        : out.includes('Top Two') || out.includes('reverse order') || out.includes('After')
                        ? 'text-emerald-400'
                        : 'text-zinc-300'
                    }`}
                  >
                    {out}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. VS Code Status Bar (Blue Footer) */}
      <div className="bg-[#007acc] text-white px-3 py-1 flex items-center justify-between text-[11px] font-sans select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-mono text-[10px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            main*
          </span>
          <span className="hidden sm:inline text-white/90 text-[10px]">0 errors, 0 warnings</span>
        </div>
        <div className="flex items-center gap-3 text-white/90 text-[10px] font-mono">
          <span>Ln {cursorLine}, Col 1</span>
          <span>Spaces: 4</span>
          <span>UTF-8</span>
          <span className="hidden sm:inline">Python 3.11.8</span>
          <span className="flex items-center gap-0.5 text-emerald-200">
            <Check className="w-3 h-3" /> Prettier
          </span>
        </div>
      </div>
    </div>
  );
}
