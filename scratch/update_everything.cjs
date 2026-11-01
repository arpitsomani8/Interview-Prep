const fs = require('fs');

// --- 1. UPDATE src/data/allDefinitionsData.js ---
const dataFile = 'src/data/allDefinitionsData.js';
let dataContent = fs.readFileSync(dataFile, 'utf8');

const prefix = 'export const definitionsData = ';
const defsStart = dataContent.indexOf(prefix);
if (defsStart === -1) throw new Error('definitionsData not found in allDefinitionsData.js');

const defsJsonStr = dataContent.slice(defsStart + prefix.length).replace(/;\s*$/, '');
const defs = JSON.parse(defsJsonStr);

const lcDef = defs.find(d => d.id === 'langchain-langgraph');
if (!lcDef) throw new Error('langchain-langgraph not found in definitionsData');

lcDef.title = "LangChain / LangGraph";
lcDef.badge = "Framework & Stateful Orchestration";
lcDef.summary = "LangChain connects language models to prompts, retrievers, structured outputs, and tools. LangGraph manages stateful, multi-step workflows using nodes, transitions, branching, and checkpoints.";
lcDef.simpleDifference = "Simple difference: LangChain connects LLMs to tools and retrieval; LangGraph controls how the workflow moves from one step to another.";
lcDef.ecosystemComparison = "Diffusion models generate images; vision foundation models understand visual content; LangChain connects LLMs to tools and retrieval; LangGraph controls the steps of a workflow.";

lcDef.frameworkRoles = [
  {
    name: "LangChain",
    badge: "Integrations & Chains",
    desc: "Provides reusable components and integrations for document loading, retrieval, prompts, and model calls.",
    scope: "Prompt engineering, document loaders, vector store retrieval, and external model integrations."
  },
  {
    name: "LlamaIndex",
    badge: "Ingestion & Indexing",
    desc: "Focuses on document ingestion, indexing, retrieval, and data-connected LLM applications.",
    scope: "Connecting external structured and unstructured private data to LLM query engines."
  },
  {
    name: "LangGraph",
    badge: "Stateful Workflows & Agents",
    desc: "Provides stateful orchestration for multi-step and agentic workflows.",
    scope: "Cyclic state graphs, persistent checkpoints, human-in-the-loop approvals, and multi-agent systems."
  }
];

lcDef.architectureDetails = {
  langchain: {
    title: "LangChain Architecture Details",
    desc: "LangChain is a framework for building applications around language models. It provides reusable building blocks that connect an LLM to prompts, retrievers, structured outputs, and tools."
  },
  langgraph: {
    title: "LangGraph Architecture Details",
    desc: "LangGraph is a framework for managing stateful, multi-step workflows and agents. It represents a workflow as nodes and transitions:",
    components: [
      { name: "Nodes", role: "Perform individual operations." },
      { name: "Transitions (edges)", role: "Decide which step should run next." },
      { name: "State", role: "Stores information shared between workflow steps." },
      { name: "Checkpoints", role: "Save the workflow state so execution can resume later." }
    ],
    useCase: "LangGraph is useful when a workflow needs branching, persistent state, retries, checkpoints, human approval, or the ability to resume after an interruption."
  }
};

lcDef.shoppingAssistantExecution = [
  "Retrieve similar products using image or text embeddings.",
  "Query the product database to get prices and inventory.",
  "Ask an LLM to organize the retrieved results into recommendations.",
  "Return a structured response to the frontend."
];

lcDef.productionComponents = [
  { name: "FastAPI", role: "Exposes the /fashion-assistant endpoint to the frontend and receives user requests." },
  { name: "LangChain", role: "Connects the language model to retrievers and approved tools." },
  { name: "Vector Database", role: "Retrieves similar products and fashion descriptions using embeddings." },
  { name: "PostgreSQL", role: "Stores product details, prices, and inventory." },
  { name: "LangGraph", role: "Manages the multi-step workflow and its shared state." },
  { name: "Azure OpenAI / Supported Provider", role: "Understands the user's request and generates recommendations using the provided product information." }
];

lcDef.toolsCode = {
  filename: "tools.py (LangChain Tool Binding)",
  code: `from langchain_core.tools import tool
from langchain_openai import ChatOpenAI


@tool
def search_fashion_products(query: str) -> str:
    """Search the product catalog for relevant fashion items."""
    return str(search_products(query))


llm = ChatOpenAI(model="YOUR_SUPPORTED_MODEL")

llm_with_tools = llm.bind_tools([
    search_fashion_products
])`,
  howItWorks: [
    "@tool makes the Python function available as an LLM tool.",
    "bind_tools() provides the tool definition to the model.",
    "The model can decide when to request the tool.",
    "The application must execute the requested tool and return its result to the model."
  ],
  important: "Important: Binding a tool does not automatically execute it. The application or agent must handle the tool call."
};

lcDef.workflowCode = {
  filename: "workflow.py (LangGraph StateGraph & State Transitions)",
  code: `from typing import TypedDict
from langgraph.graph import StateGraph, START, END


class FashionState(TypedDict):
    question: str
    products: list
    answer: str


def retrieve_products(state: FashionState):
    products = search_products(state["question"])
    return {"products": products}


def generate_answer(state: FashionState):
    # A real implementation calls the configured LLM
    # with the question and retrieved product evidence.
    answer = create_recommendation(
        state["question"],
        state["products"]
    )
    return {"answer": answer}


graph_builder = StateGraph(FashionState)

graph_builder.add_node("retrieve", retrieve_products)
graph_builder.add_node("recommend", generate_answer)

graph_builder.add_edge(START, "retrieve")
graph_builder.add_edge("retrieve", "recommend")
graph_builder.add_edge("recommend", END)

fashion_graph = graph_builder.compile()`,
  howItWorks: [
    "FashionState defines the information shared between nodes.",
    "retrieve_products() searches the product catalog.",
    "generate_answer() uses the question and retrieved products to create a recommendation.",
    "START defines the first step.",
    "END marks the end of the workflow.",
    "compile() builds the graph so it can be executed."
  ],
  important: "Important: This example is a simple linear graph. LangGraph can also support conditional transitions, loops, and checkpointing when required."
};

lcDef.qa = [
  {
    question: "How do you prevent hallucinated product details?",
    answer: "Retrieve actual catalog records, get prices and stock information from authoritative systems, validate the model's output, and avoid allowing the LLM to invent business facts.\n\nFor important details such as price and availability, use the database as the source of truth instead of relying on the model's generated response."
  },
  {
    question: "How would you improve performance?",
    answer: "Measure retrieval latency and model latency separately, reduce unnecessary LLM calls, parallelize independent database reads where safe, cache suitable results, and evaluate smaller models for simpler tasks.\n\nAlso monitor retrieval quality and response accuracy so that performance improvements do not reduce recommendation quality."
  }
];

// Keep legacy backward compatibility fields so generic fallbacks never break
lcDef.takeaway = lcDef.simpleDifference;
lcDef.ecosystemContext = lcDef.ecosystemComparison;
lcDef.frameworksComparison = lcDef.frameworkRoles.map(f => ({
  name: f.name,
  badge: f.badge,
  role: f.desc,
  focus: f.scope
}));
lcDef.frameworks = [
  { name: "LangChain", role: lcDef.architectureDetails.langchain.desc },
  { name: "LangGraph", role: lcDef.architectureDetails.langgraph.desc + " " + lcDef.architectureDetails.langgraph.useCase }
];
lcDef.shoppingAssistantSteps = lcDef.shoppingAssistantExecution;
lcDef.productionArchitecture = lcDef.productionComponents.map(c => ({ comp: c.name, role: c.role }));
lcDef.toolCode = lcDef.toolsCode.code;
lcDef.graphCode = lcDef.workflowCode.code;
lcDef.qaItems = lcDef.qa;

const newDataContent = dataContent.slice(0, defsStart + prefix.length) + JSON.stringify(defs, null, 2) + ';\n';
fs.writeFileSync(dataFile, newDataContent, 'utf8');
console.log('src/data/allDefinitionsData.js updated successfully!');


// --- 2. UPDATE src/pages/AllDefinitionsPage.jsx ---
const pageFile = 'src/pages/AllDefinitionsPage.jsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Insert kvCache, inferenceMicroservice, and llm-as-a-judge if missing
if (!pageContent.includes('item.kvCacheAndPagedAttention &&')) {
  console.log('Restoring kvCache, inferenceMicroservice, and llm-as-a-judge into AllDefinitionsPage.jsx...');
  const transMarker = '{/* Item 33: Transformer */}';
  const transIdx = pageContent.indexOf(transMarker);
  if (transIdx === -1) throw new Error('Transformer marker not found');
  const llmEndDivIdx = pageContent.lastIndexOf('</div>', transIdx);

  const extraLLMAndJudgeJSX = `
                {/* KV Cache & PagedAttention (LLM Inference Memory) */}
                {item.kvCacheAndPagedAttention && (
                  <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/90 border border-cyan-800/40 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight font-mono">
                          {item.kvCacheAndPagedAttention.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {item.kvCacheAndPagedAttention.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-sans bg-cyan-950/20 p-3 rounded-xl border border-cyan-800/30">
                      {item.kvCacheAndPagedAttention.summary}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold font-mono text-amber-400 uppercase flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>In Simple Terms (Token Generation)</span>
                          </span>
                          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                            {item.kvCacheAndPagedAttention.inSimpleTerms}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold font-mono text-purple-400 uppercase flex items-center gap-2">
                            <Workflow className="w-3.5 h-3.5 text-purple-400" />
                            <span>Internal Attention Mechanism</span>
                          </span>
                          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                            {item.kvCacheAndPagedAttention.howItWorksInternally}
                          </p>
                        </div>
                      </div>
                    </div>

                    {item.kvCacheAndPagedAttention.memoryExplosionAndPagedAttention && (
                      <div className="p-4 rounded-xl bg-black border border-rose-900/40 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                          <span className="text-xs font-bold font-mono text-rose-400 uppercase flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            <span>{item.kvCacheAndPagedAttention.memoryExplosionAndPagedAttention.title}</span>
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                            VRAM Sizing
                          </span>
                        </div>

                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {item.kvCacheAndPagedAttention.memoryExplosionAndPagedAttention.desc}
                        </p>

                        <div className="p-3 rounded-lg bg-zinc-950 border border-rose-900/50 font-mono text-xs text-rose-200 text-center font-bold">
                          {item.kvCacheAndPagedAttention.memoryExplosionAndPagedAttention.formula}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                          {(item.kvCacheAndPagedAttention.memoryExplosionAndPagedAttention.breakdown || item.kvCacheAndPagedAttention.memoryExplosionAndPagedAttention.factors || []).map((f, fIdx) => (
                            <div key={fIdx} className="p-2 rounded bg-zinc-950 border border-zinc-800 text-xs">
                              <span className="font-mono text-cyan-300 font-bold block mb-0.5">{f.factor}</span>
                              <span className="text-[11px] text-zinc-400 font-sans">{f.role}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-xs text-emerald-200/90 font-sans leading-relaxed">
                          <strong className="text-emerald-400 font-mono uppercase block mb-0.5">PagedAttention Solution (vLLM):</strong>
                          {item.kvCacheAndPagedAttention.memoryExplosionAndPagedAttention.pagedAttentionSolution}
                        </div>
                      </div>
                    )}

                    {item.kvCacheAndPagedAttention.codeExample && (
                      <div className="space-y-2">
                        <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                          {item.kvCacheAndPagedAttention.codeExample.title}
                        </span>
                        <div className="rounded-xl overflow-hidden border border-zinc-800">
                          <div className="bg-zinc-900/80 px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                            <span>PyTorch KV-Cache Self-Attention Simulation</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(item.kvCacheAndPagedAttention.codeExample.code);
                                setCopiedId('kv-cache-code');
                                setTimeout(() => setCopiedId(null), 2000);
                              }}
                              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition cursor-pointer"
                            >
                              {copiedId === 'kv-cache-code' ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Code</span>
                                </>
                              )}
                            </button>
                          </div>
                          <CodeHighlight code={item.kvCacheAndPagedAttention.codeExample.code} />
                        </div>
                      </div>
                    )}

                    {item.kvCacheAndPagedAttention.interviewAnswer && (
                      <div className="p-3.5 rounded-xl bg-black border border-cyan-800/40 space-y-1.5">
                        <span className="text-xs font-bold uppercase font-mono text-cyan-400 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Interview Answer (KV Cache & PagedAttention)</span>
                        </span>
                        <blockquote className="p-2.5 rounded-lg bg-zinc-950 border-l-2 border-cyan-400 text-xs text-zinc-300 font-sans leading-relaxed italic">
                          "{item.kvCacheAndPagedAttention.interviewAnswer}"
                        </blockquote>
                      </div>
                    )}

                    <div className="p-3.5 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                      <strong className="text-emerald-400 uppercase">KV Cache Takeaway: </strong>
                      {item.kvCacheAndPagedAttention.takeaway}
                    </div>
                  </div>
                )}

                {/* Section 9: LLM Inference Microservice & Serving Parameters */}
                {item.inferenceMicroservice && (
                  <div className="space-y-6 p-5 rounded-2xl bg-zinc-950/90 border border-blue-800/40 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-blue-400" />
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight font-mono">
                          {item.inferenceMicroservice.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                        {item.inferenceMicroservice.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-blue-200/90 leading-relaxed font-sans bg-blue-950/20 p-3.5 rounded-xl border border-blue-800/30">
                      {item.inferenceMicroservice.summary}
                    </p>

                    {item.inferenceMicroservice.architecture && (
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                        <div className="flex items-center gap-2">
                          <Workflow className="w-3.5 h-3.5 text-blue-400" />
                          <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            {item.inferenceMicroservice.architecture.title}
                          </h5>
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 overflow-x-auto py-2">
                            {item.inferenceMicroservice.architecture.flow.map((step, sIdx) => (
                              <React.Fragment key={sIdx}>
                                <div className="px-3 py-2 rounded-lg bg-zinc-900 border border-blue-900/40 text-center min-w-[120px]">
                                  <span className="text-[10px] font-mono text-zinc-500 block">Step {sIdx + 1}</span>
                                  <span className="text-xs font-mono font-bold text-zinc-200">{step}</span>
                                </div>
                                {sIdx < item.inferenceMicroservice.architecture.flow.length - 1 && (
                                  <span className="text-blue-400 font-mono text-xs hidden sm:inline">➔</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400 font-sans italic">
                          {item.inferenceMicroservice.architecture.enginesNote}
                        </p>
                      </div>
                    )}

                    {item.inferenceMicroservice.continuousBatching && (
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            {item.inferenceMicroservice.continuousBatching.title}
                          </h5>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                            <h6 className="text-xs font-bold font-mono text-amber-400 uppercase">Static Batching</h6>
                            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                              {item.inferenceMicroservice.continuousBatching.staticDesc}
                            </p>
                            <pre className="p-3 rounded-lg bg-black border border-zinc-800 text-[11px] font-mono text-zinc-400 overflow-x-auto whitespace-pre">
                              {item.inferenceMicroservice.continuousBatching.staticDiagram}
                            </pre>
                          </div>
                          <div className="p-3.5 rounded-xl bg-zinc-950 border border-cyan-900/40 space-y-2">
                            <h6 className="text-xs font-bold font-mono text-cyan-400 uppercase">Continuous Batching (Dynamic)</h6>
                            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                              {item.inferenceMicroservice.continuousBatching.continuousDesc}
                            </p>
                            <pre className="p-3 rounded-lg bg-black border border-cyan-900/50 text-[11px] font-mono text-cyan-300 overflow-x-auto whitespace-pre">
                              {item.inferenceMicroservice.continuousBatching.continuousDiagram}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.inferenceMicroservice.servingParameters && (
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                            <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                              {item.inferenceMicroservice.servingParameters.title}
                            </h5>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">Tuning & Concurrency</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                                <th className="py-2 px-3">Parameter</th>
                                <th className="py-2 px-3">Meaning</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900 font-sans">
                              {item.inferenceMicroservice.servingParameters.params.map((p, pIdx) => (
                                <tr key={pIdx} className="hover:bg-zinc-900/40 transition">
                                  <td className="py-2.5 px-3 font-mono text-emerald-300 font-bold whitespace-nowrap">
                                    {p.param}
                                  </td>
                                  <td className="py-2.5 px-3 text-zinc-300">
                                    {p.meaning}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-zinc-400 font-mono border-t border-zinc-800/80 pt-2">
                          💡 {item.inferenceMicroservice.servingParameters.desc}
                        </p>
                      </div>
                    )}

                    {item.inferenceMicroservice.latencyAndThroughput && (
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-purple-400" />
                          <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            {item.inferenceMicroservice.latencyAndThroughput.title}
                          </h5>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {item.inferenceMicroservice.latencyAndThroughput.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                              <span className="text-xs font-mono font-bold text-purple-300 block">{m.name}</span>
                              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{m.desc}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-sans leading-relaxed">
                          <strong className="text-purple-400 font-mono">Performance Trade-off: </strong>
                          {item.inferenceMicroservice.latencyAndThroughput.note}
                        </div>
                      </div>
                    )}

                    {item.inferenceMicroservice.streamingResponses && (
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                              {item.inferenceMicroservice.streamingResponses.title}
                            </h5>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-amber-800/40">
                            Server-Sent Events (SSE)
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {item.inferenceMicroservice.streamingResponses.desc}
                        </p>
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">Benefits:</span>
                          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {item.inferenceMicroservice.streamingResponses.benefits.map((b, bIdx) => (
                              <li key={bIdx} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs text-zinc-400 font-sans">
                          {item.inferenceMicroservice.streamingResponses.implementation}
                        </p>
                        {item.inferenceMicroservice.streamingResponses.code && (
                          <div className="rounded-xl overflow-hidden border border-zinc-800">
                            <div className="bg-zinc-900/80 px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                              <span>FastAPI + vLLM AsyncLLMEngine SSE Streaming Endpoint</span>
                            </div>
                            <CodeHighlight code={item.inferenceMicroservice.streamingResponses.code} language="python" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
`;

  const judgeJSX = `

            {/* Item: LLM-as-a-Judge */}
            {item.id === 'llm-as-a-judge' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                <div className="p-5 rounded-2xl bg-zinc-950/90 border border-purple-800/40 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-sans bg-purple-950/20 p-3.5 rounded-xl border border-purple-800/30">
                    {item.intro?.coreDefinition || item.summary}
                  </p>

                  {item.intro?.example && (
                    <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.intro.example.title}</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                          RAG Pipeline
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">A RAG application answers:</span>
                        <div className="text-xs sm:text-sm font-mono text-emerald-300 font-semibold">
                          "{item.intro.example.ragAnswer}"
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">A judge model evaluates whether the answer is:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                          {item.intro.example.evaluates.map((ev, eIdx) => (
                            <div key={eIdx} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="font-sans font-medium">{ev}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 font-sans italic border-t border-zinc-900 pt-2">
                        💡 {item.intro.example.outputNote}
                      </p>
                    </div>
                  )}
                </div>

                {item.whyNeedIt && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-3.5">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                        {item.whyNeedIt.title}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {item.whyNeedIt.desc}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Answer Formulation 1</span>
                        <div className="text-xs font-mono text-zinc-200">{item.whyNeedIt.exampleA}</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Answer Formulation 2</span>
                        <div className="text-xs font-mono text-zinc-200">{item.whyNeedIt.exampleB}</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200 font-sans leading-relaxed">
                      <strong className="text-cyan-400 font-mono">Semantic Evaluation: </strong>
                      {item.whyNeedIt.distinction}
                    </div>
                  </div>
                )}

                {item.commonCriteria && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                          3. Common Evaluation Criteria
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">Evaluation Rubric</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                            <th className="py-2.5 px-3">Criterion</th>
                            <th className="py-2.5 px-3">What it checks</th>
                            <th className="py-2.5 px-3 text-right">Dimension</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900 font-sans">
                          {item.commonCriteria.map((c, cIdx) => (
                            <tr key={cIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                                {c.criterion}
                              </td>
                              <td className="py-3 px-3 text-zinc-300">
                                {c.checks}
                              </td>
                              <td className="py-3 px-3 text-right">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                                  {c.badge}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-zinc-500 font-sans italic border-t border-zinc-900 pt-2">
                      The criteria depend on the application.
                    </p>
                  </div>
                )}

                {item.howItWorks && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4">
                    <div className="flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-blue-400" />
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                        {item.howItWorks.title}
                      </h4>
                    </div>

                    <div className="p-4 rounded-xl bg-black border border-zinc-800">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 overflow-x-auto py-2">
                        {item.howItWorks.flow.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <div className="px-3 py-2 rounded-lg bg-zinc-900 border border-blue-900/40 text-center min-w-[140px]">
                              <span className="text-[10px] font-mono text-zinc-500 block">Step {sIdx + 1}</span>
                              <span className="text-xs font-mono font-bold text-blue-300">{step}</span>
                            </div>
                            {sIdx < item.howItWorks.flow.length - 1 && (
                              <span className="text-blue-400 font-mono text-xs hidden sm:inline">➔</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-zinc-300 uppercase">The judge receives:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.howItWorks.inputs.map((inp, iIdx) => (
                          <div key={iIdx} className="p-2.5 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
                            <span className="font-mono text-blue-400 font-bold">{iIdx + 1}.</span>
                            <span className="font-sans">{inp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 font-sans italic">
                      💡 {item.howItWorks.resultNote}
                    </p>
                  </div>
                )}

                {item.evalPromptExample && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-amber-400" />
                        <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                          {item.evalPromptExample.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-amber-800/40">
                        Prompt & Scoring
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2">
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase block">
                          Evaluation Prompt:
                        </span>
                        <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                          {item.evalPromptExample.promptText}
                        </pre>
                      </div>

                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase block">
                            Expected Result:
                          </span>
                          <div className="p-3 rounded-lg bg-zinc-950 border border-emerald-900/40 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-zinc-400">Score:</span>
                              <span className="text-sm font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                                {item.evalPromptExample.expectedResult.score} / 3 (Correct)
                              </span>
                            </div>
                            <div className="text-xs font-sans text-zinc-300 leading-relaxed">
                              <span className="font-mono text-zinc-500 block mb-0.5">Explanation:</span>
                              {item.evalPromptExample.expectedResult.explanation}
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 font-sans italic">
                          💡 {item.evalPromptExample.takeaway}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {item.pairwiseEvaluation && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                          {item.pairwiseEvaluation.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">A/B Model Comparison</span>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {item.pairwiseEvaluation.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-black border border-cyan-900/40 space-y-1">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Answer A</span>
                        <div className="text-xs font-mono text-zinc-200">{item.pairwiseEvaluation.answerA}</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-black border border-purple-900/40 space-y-1">
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Answer B</span>
                        <div className="text-xs font-mono text-zinc-200">{item.pairwiseEvaluation.answerB}</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">Possible Results:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {item.pairwiseEvaluation.possibleResults.map((res, rIdx) => (
                          <div key={rIdx} className="p-2.5 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
                            <span className="font-mono text-cyan-400 font-bold">•</span>
                            <span className="font-sans">{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 font-sans italic border-t border-zinc-900 pt-2">
                      💡 {item.pairwiseEvaluation.useCase}
                    </p>
                  </div>
                )}

                {item.ragEvaluation && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-emerald-800/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                          {item.ragEvaluation.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        RAG Triad
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {item.ragEvaluation.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {item.ragEvaluation.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5">
                          <span className="text-xs font-mono font-bold text-emerald-300 block">{m.name}</span>
                          <p className="text-xs text-zinc-400 font-sans leading-relaxed">{m.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 font-sans leading-relaxed">
                      <strong className="text-amber-400 font-mono uppercase block mb-0.5">⚠️ Critical Distinction:</strong>
                      {item.ragEvaluation.criticalDistinction}
                    </div>
                  </div>
                )}

                {item.limitationsAndBiases && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-rose-900/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                          {item.limitationsAndBiases.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        Mitigation & Watchouts
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {item.limitationsAndBiases.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.limitationsAndBiases.biases.map((b, bIdx) => (
                        <div key={bIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1 hover:border-rose-900/50 transition">
                          <span className="text-xs font-mono font-bold text-rose-400 block">• {b.name}</span>
                          <p className="text-xs text-zinc-400 font-sans leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.improveReliability && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                        {item.improveReliability.title}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {item.improveReliability.points.map((pt, pIdx) => (
                        <div key={pIdx} className="p-3 rounded-xl bg-black border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="font-sans leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.interviewQuestions && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                        10. Interview Questions & Model Answers
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {item.interviewQuestions.map((qa, qIdx) => (
                        <div key={qIdx} className="p-4 rounded-xl bg-black border border-zinc-800/80 space-y-2">
                          <h6 className="text-xs font-bold text-purple-300 font-mono">
                            {qa.q}
                          </h6>
                          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                            {qa.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.keyTakeaways && (
                  <div className="p-5 rounded-2xl bg-zinc-950/90 border border-cyan-800/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wide">
                        Key Takeaways
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.keyTakeaways.map((tk, tIdx) => (
                        <div key={tIdx} className="p-2.5 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span className="font-sans leading-relaxed">{tk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.code && (
                  <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="bg-zinc-900/80 px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span>Python LLM-as-a-Judge RAG Evaluator (JSON Structured Output)</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.code);
                          setCopiedId('llm-judge-code');
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition cursor-pointer"
                      >
                        {copiedId === 'llm-judge-code' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <CodeHighlight code={item.code} language="python" />
                  </div>
                )}
              </div>
            )}`;

  // Insert extraLLMAndJudgeJSX:
  // Before `llmEndDivIdx`: put `extraLLMAndJudgeJSX`
  // Right before `transIdx`: put `judgeJSX`
  pageContent = pageContent.slice(0, llmEndDivIdx) + extraLLMAndJudgeJSX + pageContent.slice(llmEndDivIdx, transIdx) + judgeJSX + "\n\n            " + pageContent.slice(transIdx);
  console.log('Restored LLM extras and LLM-as-a-Judge!');
}


// --- 3. UPDATE item.id === 'langchain-langgraph' IN AllDefinitionsPage.jsx ---
console.log('Updating langchain-langgraph JSX in AllDefinitionsPage.jsx...');
const lcStartMarker = "item.id === 'langchain-langgraph' && (";
const lcStartIdx = pageContent.indexOf(lcStartMarker);
if (lcStartIdx === -1) throw new Error('langchain-langgraph start marker not found');

// Find the next item after langchain-langgraph
const lcEndMarker = "item.id === 'normalization-scaling'";
let lcEndIdx = pageContent.indexOf(lcEndMarker, lcStartIdx);
if (lcEndIdx === -1) {
  // Try finding '{/* Item'
  lcEndIdx = pageContent.indexOf('{/* Item', lcStartIdx);
}
// Find the last `</div>\r?\n\s*\)}` before lcEndIdx
const lcClosingIdx = pageContent.lastIndexOf('</div>', lcEndIdx);
const lcClosingFull = pageContent.indexOf(')}', lcClosingIdx) + 2;

const newLangChainJSX = `item.id === 'langchain-langgraph' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* 1. Header & Core Definition */}
                <div className="p-5 rounded-2xl bg-zinc-950/90 border border-cyan-800/40 shadow-xl space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-sans bg-cyan-950/20 p-3.5 rounded-xl border border-cyan-800/30">
                    {item.summary}
                  </p>

                  <div className="p-3 rounded-lg bg-black border border-cyan-900/40 text-xs text-zinc-200 font-mono leading-relaxed">
                    <strong className="text-cyan-400 uppercase">Core Distinction: </strong>
                    {item.simpleDifference || item.takeaway}
                  </div>

                  <p className="text-xs text-zinc-400 font-mono italic">
                    💡 {item.ecosystemComparison || item.ecosystemContext}
                  </p>
                </div>

                {/* 2. Framework Roles & Comparison */}
                <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                        Framework Roles & Comparison
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
                      Ecosystem Overview
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {(item.frameworkRoles || item.frameworksComparison || []).map((fw, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-4 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                              {fw.name}
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">
                              {fw.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                            {fw.desc || fw.role}
                          </p>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                          <span className="text-zinc-500 uppercase text-[10px] block font-sans">Primary Scope</span>
                          <span className="text-zinc-300">{fw.scope || fw.focus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Architecture Details (LangChain & LangGraph) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LangChain Details */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-cyan-400 font-mono uppercase">
                        {item.architectureDetails?.langchain?.title || "LangChain Architecture Details"}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {item.architectureDetails?.langchain?.desc || (item.frameworks && item.frameworks[0]?.role)}
                      </p>
                    </div>
                  </div>

                  {/* LangGraph Details */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-purple-400 font-mono uppercase">
                        {item.architectureDetails?.langgraph?.title || "LangGraph Architecture Details"}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {item.architectureDetails?.langgraph?.desc}
                      </p>
                      {item.architectureDetails?.langgraph?.components && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {item.architectureDetails.langgraph.components.map((c, cIdx) => (
                            <div key={cIdx} className="p-2 rounded bg-black/60 border border-zinc-800 text-[11px] text-zinc-300">
                              <span className="font-mono text-purple-300 font-bold block mb-0.5">• {c.name}:</span>
                              <span className="text-zinc-400 font-sans">{c.role}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {item.architectureDetails?.langgraph?.useCase && (
                      <p className="text-xs text-zinc-400 font-sans italic border-t border-zinc-900 pt-2">
                        💡 {item.architectureDetails.langgraph.useCase}
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. How the Shopping Assistant Executes a Request */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono flex items-center gap-2">
                    <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How the Shopping Assistant Executes a Request</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(item.shoppingAssistantExecution || item.shoppingAssistantSteps || []).map((st, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="font-mono text-cyan-400 font-bold shrink-0">{sIdx + 1}.</span>
                        <span>{typeof st === 'string' ? st.replace(/^\\d+\\.\\s*/, '') : st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Production Architecture Components */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Production Architecture Components</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(item.productionComponents || item.productionArchitecture || []).map((arch, aIdx) => (
                      <div key={aIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold font-mono text-cyan-300">{arch.name || arch.comp}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed font-sans">{arch.role}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. tools.py (LangChain Tool Binding) */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black space-y-3 p-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-bold">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.toolsCode?.filename || "tools.py (LangChain Tool Binding)"}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-lc-tool', item.toolsCode?.code || item.toolCode)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-lc-tool' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <CodeHighlight code={item.toolsCode?.code || item.toolCode} />
                  
                  {/* How it works for tools.py */}
                  {item.toolsCode?.howItWorks && (
                    <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">How it works:</span>
                      <ul className="space-y-1 text-xs text-zinc-300">
                        {item.toolsCode.howItWorks.map((hw, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-1.5 text-zinc-400">
                            <span className="text-cyan-400">•</span>
                            <span>{hw}</span>
                          </li>
                        ))}
                      </ul>
                      {item.toolsCode.important && (
                        <p className="text-xs text-amber-300/90 font-mono pt-1">
                          ⚠️ {item.toolsCode.important}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* 7. workflow.py (LangGraph StateGraph & State Transitions) */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black space-y-3 p-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-bold">
                      <Code2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{item.workflowCode?.filename || "workflow.py (LangGraph StateGraph & State Transitions)"}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-lg-graph', item.workflowCode?.code || item.graphCode)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-lg-graph' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <CodeHighlight code={item.workflowCode?.code || item.graphCode} />

                  {/* How it works for workflow.py */}
                  {item.workflowCode?.howItWorks && (
                    <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">How it works:</span>
                      <ul className="space-y-1 text-xs text-zinc-300">
                        {item.workflowCode.howItWorks.map((hw, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-1.5 text-zinc-400">
                            <span className="text-purple-400">•</span>
                            <span>{hw}</span>
                          </li>
                        ))}
                      </ul>
                      {item.workflowCode.important && (
                        <p className="text-xs text-cyan-300/90 font-mono pt-1">
                          💡 {item.workflowCode.important}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* 8. Q&A */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(item.qa || item.qaItems || []).map((qa, qIdx) => (
                    <div key={qIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h5 className="text-xs font-bold text-amber-300 font-mono">{qa.question}</h5>
                      <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line font-sans">{qa.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )`;

pageContent = pageContent.slice(0, lcStartIdx) + newLangChainJSX + pageContent.slice(lcClosingFull);
fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log('Successfully updated AllDefinitionsPage.jsx!');
