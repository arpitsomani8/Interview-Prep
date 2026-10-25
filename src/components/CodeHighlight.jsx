// src/components/CodeHighlight.jsx
// Reusable VS Code Dark+ / Dark Modern Syntax Highlighter Component
import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

// Custom Python Logo SVG matching VS Code file icon
function PythonIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 256 255" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chPyBlue" x1="12.96%" y1="12.04%" x2="79.97%" y2="78.2%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="chPyYellow" x1="19.13%" y1="19.06%" x2="90.8%" y2="87.75%">
          <stop offset="0%" stopColor="#FFE873" />
          <stop offset="100%" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
      <path
        d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.57 34.475-33.319V28.187S194.887.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
        fill="url(#chPyBlue)"
      />
      <path
        d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.71c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.57-34.475 33.32v60.884s-5.457 29.024 62.52 29.024zm34.114-19.588a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13-11.13z"
        fill="url(#chPyYellow)"
      />
    </svg>
  );
}

// Tokenize a line of code with authentic VS Code Dark+ color palette
function tokenizeLine(line, activeLineIndex, lineNumber) {
  if (!line || line.trim() === '') {
    return <span>&nbsp;</span>;
  }

  // 1. Comments take full line precedence
  const trimmed = line.trim();
  if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
    return <span className="text-[#6A9955] italic">{line}</span>;
  }

  // 2. Decorators (@app.post, @router.get, @field_validator, etc.)
  if (trimmed.startsWith('@')) {
    const atIdx = line.indexOf('@');
    const leadingSpaces = line.slice(0, atIdx);
    const rest = line.slice(atIdx);
    return (
      <span>
        {leadingSpaces}
        <span className="text-[#FFD700] font-medium">{rest}</span>
      </span>
    );
  }

  // 3. Separate inline comment if present
  let codePart = line;
  let commentPart = '';
  const commentIdx = line.indexOf('#');
  if (commentIdx > 0) {
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

  // Regular expression to match Python / Web framework tokens
  // 1: Strings (f"...", "...", '...', """...""")
  // 2: Function definition name (def my_func)
  // 3: Keywords
  // 4: Framework Classes & Types (FastAPI, BaseModel, Field, HTTPException, OpenAI, etc.)
  // 5: Built-in functions & types (print, len, range, int, str, sorted, etc.)
  // 6: Numbers
  // 7: Operators & Punctuation
  // 8: Identifiers / Variables
  // 9: Whitespaces
  const tokenRegex = /(f?r?["'](?:\\.|[^"'\\])*["'])|(\bdef\s+)([a-zA-Z_]\w*)|(\b(?:def|class|if|elif|else|while|for|in|return|yield|and|or|not|is|as|import|from|try|except|finally|pass|break|continue|with|raise|lambda|async|await|const|let|function|None|True|False|null|undefined)\b)|(\b(?:FastAPI|BaseModel|Field|HTTPException|OpenAI|StreamingResponse|Request|Response|BackgroundTasks|Query|Header|Flask|CORS|Pipeline|StandardScaler|MinMaxScaler|PCA|KMeans|XGBClassifier|RandomForestClassifier|LogisticRegression|TfidfVectorizer|CountVectorizer|Tensor|DataLoader|Dataset|Module|Linear|Conv2d|AdamW|SamplingParams|AsyncLLMEngine|AsyncEngineArgs|Redis|PersistentClient|ChromaClient|Optional|List|Dict|Any|Union|Tuple|Set|Callable|AsyncGenerator)\b)|(\b(?:print|len|range|input|int|float|str|bool|list|dict|set|sorted|tuple|enumerate|reversed|zip|min|max|sum|abs|super|type|isinstance|open|round|any|all|append|extend|pop|get|post|put|delete|patch|json|dumps|loads|predict|fit|transform|create|parse|get_or_create_collection|query|step|backward|zero_grad)\b)|(\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b)|([()\[\]{}:,;=+\-*\/<>!%&|^~.]+)|([a-zA-Z_]\w*)|(\s+)/g;

  const elements = [];
  let match;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    const [
      full,
      strToken,
      defKeyword,
      funcName,
      ctrlKeyword,
      classTypeToken,
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
      const isDefOrClass = ctrlKeyword === 'def' || ctrlKeyword === 'class' || ctrlKeyword === 'import' || ctrlKeyword === 'from' || ctrlKeyword === 'as' || ctrlKeyword === 'async' || ctrlKeyword === 'await' || ctrlKeyword === 'const' || ctrlKeyword === 'let';
      const isConstant = ctrlKeyword === 'True' || ctrlKeyword === 'False' || ctrlKeyword === 'None' || ctrlKeyword === 'null' || ctrlKeyword === 'undefined';
      const color = isDefOrClass ? 'text-[#569CD6]' : isConstant ? 'text-[#569CD6]' : 'text-[#C586C0]';
      elements.push(
        <span key={elements.length} className={`${color} font-medium`}>
          {ctrlKeyword}
        </span>
      );
    } else if (classTypeToken) {
      elements.push(
        <span key={elements.length} className="text-[#4EC9B0] font-medium">
          {classTypeToken}
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

export default function CodeHighlight({
  code = '',
  filename = '',
  showLineNumbers = true,
  maxHeight = 'max-h-[500px]',
  className = '',
  showHeader = false,
}) {
  const [copied, setCopied] = useState(false);
  const [cursorLine, setCursorLine] = useState(null);

  if (!code && code !== '') {
    return null;
  }

  const rawCode = typeof code === 'string' ? code : String(code || '');
  const lines = rawCode.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`w-full rounded-xl overflow-hidden border border-[#2d2d2d] bg-[#1e1e1e] font-mono text-[12px] sm:text-[12.5px] leading-relaxed shadow-xl my-2.5 transition-all select-text ${className}`}
    >
      {/* Optional Top Header Bar */}
      {showHeader && (
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#181818] border-b border-[#2b2b2b] select-none text-xs">
          <div className="flex items-center gap-2 text-zinc-300 font-mono text-[11.5px]">
            <PythonIcon className="w-3.5 h-3.5" />
            <span className="text-zinc-200">{filename || 'main.py'}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer text-[11px]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code Lines with Line Numbers & Token Highlighting */}
      <div
        className={`relative overflow-x-auto py-2.5 ${maxHeight} scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent`}
      >
        <div className="min-w-full inline-block">
          {lines.map((lineText, idx) => {
            const lineNum = idx + 1;
            const isCursorActive = cursorLine === lineNum;
            return (
              <div
                key={lineNum}
                onClick={() => setCursorLine(lineNum)}
                className={`group flex items-center font-mono text-[12px] sm:text-[12.5px] leading-5 sm:leading-6 px-1 transition-colors cursor-text ${
                  isCursorActive ? 'bg-[#282828]/70 border-l-2 border-l-[#007acc]' : 'hover:bg-[#252525]/40 border-l-2 border-l-transparent'
                }`}
              >
                {/* Line Number Gutter */}
                {showLineNumbers && (
                  <div
                    className={`w-9 sm:w-11 text-right pr-2.5 select-none flex-shrink-0 text-[11px] ${
                      isCursorActive ? 'text-[#c6c6c6] font-semibold' : 'text-[#858585] group-hover:text-zinc-400'
                    }`}
                  >
                    {lineNum}
                  </div>
                )}

                {/* Indent Guide Line Marker & Code Content */}
                <div className="flex-1 pl-2 pr-3 whitespace-pre font-mono">
                  {tokenizeLine(lineText, cursorLine, lineNum)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
