import React from 'react';

export default function IntroPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8">
      {/* Minimal Speech Card */}
      <div className="rounded-3xl bg-[#0a0a0c] border border-zinc-800/90 p-8 sm:p-12 space-y-5 text-zinc-200 text-base sm:text-lg leading-relaxed shadow-2xl">
        <p className="text-zinc-300 font-medium">
          Good Morning / Good Afternoon,
        </p>

        <p>
          My name is <strong className="text-white font-semibold">Arpit Somani</strong>, and I’m from <strong className="text-cyan-300 font-medium">Bhilwara, Rajasthan</strong>. I have over <strong className="text-cyan-300 font-medium">four years of experience</strong> in software development, primarily working with Python, backend development, and AI/ML-based solutions.
        </p>

        <p>
          My core technical skills include <span className="text-zinc-100 font-medium">Python, Flask, FastAPI, RESTful APIs</span>, and machine learning frameworks such as <span className="text-zinc-100 font-medium">Scikit-learn</span>. I have also worked with generative AI technologies, including <span className="text-cyan-300 font-medium">LLMs, RAG pipelines, embeddings, vector databases, and agentic AI workflows</span>.
        </p>

        <p>
          Currently, I’m working at <strong className="text-white font-semibold">Pratham Software</strong>, where I’m involved in AI-driven projects, focusing on building backend services and intelligent applications.
        </p>

        <p>
          One of the key projects I’m working on is <a href="#/fashion" className="text-cyan-400 font-semibold cursor-pointer hover:underline">Fashion AI Copilot</a>, a multimodal AI platform designed to help fashion teams search for designs using text and images, analyze fashion trends, and explore AI-powered garment design and editing. The solution involves technologies such as <span className="text-indigo-300 font-medium">Azure AI Vision, Azure OpenAI, embeddings, vector search, and generative AI models</span>.
        </p>

        <p>
          Apart from that, I have worked on a <a href="#/hybrid" className="text-cyan-400 font-semibold cursor-pointer hover:underline">Hybrid AI Engine</a>, which combines traditional machine learning with RAG-based approaches to support different business use cases, as well as a computer vision pipeline for anomaly detection using <a href="#/yolo" className="text-cyan-400 font-semibold cursor-pointer hover:underline">YOLO and DeepSparse</a>.
        </p>

        <p>
          I started my career working on Python and Flask-based web applications, which helped me build a strong foundation in backend development, API design, and application architecture. Over time, I expanded my expertise into machine learning and generative AI.
        </p>

        <p>
          Now, I’m looking for an opportunity where I can apply my software engineering experience and AI/ML knowledge to solve real-world business problems and continue growing as an AI/ML engineer.
        </p>

        <p className="pt-2 text-zinc-400 italic">
          That’s a brief introduction about me. Thank you.
        </p>
      </div>
    </div>
  );
}
