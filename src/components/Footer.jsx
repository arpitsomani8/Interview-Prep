import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full min-h-[60vh] md:min-h-[65vh] relative flex flex-col items-center justify-center border-t border-zinc-900 bg-gradient-to-b from-black via-[#09090d] to-black overflow-hidden select-none">
      {/* Ambient gradient top rule */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" 
        aria-hidden="true"
      />
      {/* Ambient soft glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/[0.04] blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      {/* Centered signature */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Made by{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
            Arpit Somani
          </span>
        </h2>
      </div>
    </footer>
  );
}
