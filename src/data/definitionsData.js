export const categoryTags = [
  "All",
  "RAG & Vectors",
  "Computer Vision & YOLO",
  "Generative AI & LLMs",
  "Classical ML & Stats",
  "MLOps, Cloud & Architecture",
  "Interview Flashcards"
];

export const definitionsData = [
  {
    id: "def-rag",
    title: "RAG (Retrieval-Augmented Generation)",
    category: "RAG & Vectors",
    tags: ["RAG & Vectors", "Generative AI & LLMs"],
    definition: "A technique in which we retrieve relevant information from an external data source and provide it to an LLM so that it can generate an answer based on that information.",
    keyPoints: [
      "Key Rule: RAG generally does not retrain or fine-tune the LLM. It supplies relevant information at inference time.",
      "Two Distinct Phases: 1. Indexing/Ingestion (Read docs -> Chunk -> Embed -> Store in Vector DB). 2. Retrieval & Generation (Embed query -> Retrieve Top-K -> Build prompt -> Call LLM -> Return answer with sources).",
      "Why Not Fine-Tuning: Fine-tuning bakes static data into weights. When product specs or policies change tomorrow, a fine-tuned model still hallucinates. RAG decouples knowledge retrieval from reasoning.",
      "Production Safeguards: Use timeouts, bounded retries with backoff, circuit breakers, and deterministic abstention ('Insufficient evidence') when relevance scores are low."
    ],
    codeSnippet: `def ask_rag(question: str):
    # 1. Embed query
    q_vec = client.embeddings.create(model="text-embedding-3-small", input=question).data[0].embedding
    # 2. Retrieve Top-3 from Vector DB
    results = collection.query(query_embeddings=[q_vec], n_results=3)
    context = "\n\n".join(results["documents"][0])
    # 3. Grounded LLM Generation
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "Answer using ONLY provided context. If unknown, abstain."},
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"}
        ]
    )
    return response.choices[0].message.content`,
    interviewTip: "Interviewers look for the distinction between indexing time and inference time, and why RAG does NOT update model weights."
  },
  {
    id: "def-embeddings",
    title: "Embeddings & Vector Representations",
    category: "RAG & Vectors",
    tags: ["RAG & Vectors", "Classical ML & Stats"],
    definition: "A dense list of floating-point numbers (a vector) representing semantic aspects of text, images, or audio in high-dimensional space.",
    keyPoints: [
      "Semantic Geometry: Items with similar conceptual meaning have vectors that point in nearly identical directions.",
      "Types of Embeddings: Word embeddings (Word2Vec), Sentence embeddings (SentenceTransformers 'all-MiniLM-L6-v2'), Document embeddings, Image embeddings (ViT), and Multimodal embeddings (CLIP, Azure AI Vision).",
      "Embeddings vs Tokens: Tokens are discrete vocabulary fragments; embeddings are continuous vector projections.",
      "Dense vs Sparse: Dense vectors have mostly non-zero learned coordinates (semantic search). Sparse vectors (TF-IDF, BM25) have mostly zeros (exact keyword/part-number matching)."
    ],
    codeSnippet: `from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")
sentences = ["Black leather jacket", "Dark leather coat", "Banana smoothie recipe"]
embeddings = model.encode(sentences)
scores = cosine_similarity(embeddings)
# Sentences 1 & 2 yield > 0.85 similarity; Sentence 3 yields < 0.10`,
    interviewTip: "Highlight that in multimodal models (CLIP), text and images share the exact same coordinate space, allowing text-to-image dot products."
  },
  {
    id: "def-similarity",
    title: "Similarity Search: Cosine vs Dot Product vs Euclidean",
    category: "RAG & Vectors",
    tags: ["RAG & Vectors", "Classical ML & Stats"],
    definition: "Methods for calculating mathematical distance between vectors in high-dimensional vector spaces.",
    keyPoints: [
      "Cosine Similarity: Measures angle between vectors: cos(u, v) = (u · v) / (||u|| * ||v||). Range: [-1.0, 1.0].",
      "Euclidean Distance: Measures straight-line distance: d(u, v) = sqrt(sum((u_i - v_i)^2)).",
      "Dot Product: Measures both angular alignment and vector magnitude: u · v = sum(u_i * v_i).",
      "L2 Equivalence: When vectors are L2-normalized to unit length (||u|| = 1.0), Cosine Similarity is MATHEMATICALLY EQUAL to the Dot Product!",
      "Hardware Acceleration: Dot products on unit vectors map directly to GEMM matrix multiplication on CPU AVX-512 and GPU Tensor Cores, running 3-5x faster."
    ],
    codeSnippet: `import numpy as np

# L2-normalization transforms Cosine Similarity into a Dot Product
u_norm = u / np.linalg.norm(u)
v_norm = v / np.linalg.norm(v)

cosine_sim = np.dot(u_norm, v_norm) # Ultra-fast BLAS operation`,
    interviewTip: "Always recommend pre-normalizing vectors during ingestion so queries can execute as blazing-fast dot products without runtime square-root divisions."
  },
  {
    id: "def-hnsw",
    title: "HNSW (Hierarchical Navigable Small World) Indexing",
    category: "RAG & Vectors",
    tags: ["RAG & Vectors", "MLOps, Cloud & Architecture"],
    definition: "A graph-based Approximate Nearest Neighbor (ANN) algorithm that organizes vectors into a multi-layer graph hierarchy for logarithmic-time search.",
    keyPoints: [
      "Search Complexity: Bypasses brute-force O(N) linear scans across 100,000+ items, achieving O(log N) search latency (< 10ms).",
      "Hierarchical Skip-List: Top layers contain few widely spaced nodes with long-range express links. Bottom layer contains all nodes with dense local clustering.",
      "Parameter M: Maximum number of bidirectional connections per node (typically 16-64). Higher M improves recall but consumes more RAM.",
      "Parameter efConstruction: Size of candidate list during index build time (higher = better graph quality, slower build).",
      "Parameter efSearch: Size of dynamic priority queue during live query time (tuned at runtime for latency vs recall)."
    ],
    codeSnippet: `# Conceptual HNSW Graph Traversal:
# 1. Start at top layer entry point
# 2. Greedy search along long-range highway links toward query vector
# 3. Drop down to denser layer when local minimum is reached
# 4. Finalize K nearest neighbors at Layer 0 in < 5ms`,
    interviewTip: "HNSW stores graph connections in RAM. It trades memory consumption for ultra-low sub-10ms search latency."
  },
  {
    id: "def-yolo",
    title: "YOLO (You Only Look Once) Architecture",
    category: "Computer Vision & YOLO",
    tags: ["Computer Vision & YOLO"],
    definition: "A real-time single-stage object detection model that reframes detection as a single regression problem directly from raw pixels to bounding box coordinates and class probabilities.",
    keyPoints: [
      "Single-Stage vs Two-Stage: Unlike Faster R-CNN which uses a slow Region Proposal Network (RPN, 80-120ms), YOLO predicts coordinates in a single forward pass (< 15ms).",
      "Three Core Outputs: 1. Class ID (e.g. damaged_parcel), 2. Bounding Box coordinates ([x_center, y_center, width, height] normalized to [0,1]), 3. Confidence score.",
      "Decoupled Anchor-Free Head: Separates the classification branch from the bounding box regression branch, speeding up training convergence.",
      "Vectorized NMS: Non-Maximum Suppression discards redundant candidate boxes overlapping with IoU > 0.45 and confidence < 0.40."
    ],
    codeSnippet: `from ultralytics import YOLO

# Pre-trained YOLOv8 / YOLO11 for real-time edge detection
model = YOLO("yolov8n.pt")
results = model.predict(source="conveyor_frame.jpg", conf=0.5, save=False)

for result in results:
    for box in result.boxes:
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        xyxy = box.xyxy[0].tolist() # [x1, y1, x2, y2]
        print(f"Detected: {model.names[cls_id]} with confidence {conf:.2f}")`,
    interviewTip: "Emphasize why classification alone (ResNet) fails for conveyor automation: classifiers lack spatial coordinates needed to actuate pneumatic diverter arms."
  },
  {
    id: "def-deepsparse",
    title: "DeepSparse & Model Pruning / Quantization",
    category: "Computer Vision & YOLO",
    tags: ["Computer Vision & YOLO", "MLOps, Cloud & Architecture"],
    definition: "An inference runtime by Neural Magic that executes deep neural networks directly on standard commodity x86 CPUs at GPU-level speeds using weight sparsity.",
    keyPoints: [
      "The Warehouse Hardware Dilemma: Equipping 50 conveyor chutes with $8,000 GPUs costs $400,000+ and creates dust/thermal risks. DeepSparse runs on cheap Intel Xeon / AMD CPUs.",
      "Weight Pruning: Sets 70-80% of neural network weights to zero without sacrificing mAP accuracy.",
      "Vector Acceleration: DeepSparse compiles the execution graph to skip zero-weight calculations directly using CPU AVX-512 and VNNI instruction sets.",
      "Quantization: INT8 quantization compresses 32-bit floats (FP32) down to 8-bit integers, slashing memory bandwidth requirements.",
      "Latency Benchmark: PyTorch YOLO on CPU: ~65ms -> DeepSparse on 8-core CPU: ~14ms."
    ],
    codeSnippet: `from deepsparse import Pipeline

# DeepSparse compiles sparse ONNX graph for AVX-512 CPU acceleration
pipeline = Pipeline.create(
    task="yolo",
    model_path="models/yolov8_pruned_quantized.onnx"
)
predictions = pipeline(images=["conveyor_carton.jpg"])
# Executes in 14.2ms on Intel Xeon CPU with ZERO GPU cost!`,
    interviewTip: "DeepSparse is an inference execution runtime, not an object detection algorithm. You train in PyTorch, export to ONNX, and serve with DeepSparse."
  },
  {
    id: "def-transformers",
    title: "Transformers & The Self-Attention Mechanism",
    category: "Generative AI & LLMs",
    tags: ["Generative AI & LLMs", "Computer Vision & YOLO"],
    definition: "A neural network architecture that models global sequence relationships using parallel attention mechanisms rather than recurrence.",
    keyPoints: [
      "Scaled Dot-Product Attention: Computes relevance weights between Query (Q), Key (K), and Value (V) matrices.",
      "Formula: Attention(Q, K, V) = softmax((Q @ K^T) / sqrt(d_k)) @ V",
      "Self-Attention vs Cross-Attention: Self-attention processes tokens within the same sequence. Cross-attention connects queries from one sequence (e.g. text prompt) with keys/values from another (e.g. image features).",
      "Vision Transformers (ViT): Slices images into 16x16 pixel patches, adds 1D learnable position embeddings, and passes them through standard Transformer encoder blocks."
    ],
    codeSnippet: `import torch
import torch.nn.functional as F

# Minimal Scaled Dot-Product Attention
Q = torch.tensor([[[1.0, 0.0]]])
K = torch.tensor([[[1.0, 0.0], [0.0, 1.0]]])
V = torch.tensor([[[10.0, 0.0], [0.0, 20.0]]])

scores = (Q @ K.transpose(-2, -1)) / (2.0 ** 0.5)
weights = F.softmax(scores, dim=-1)
output = weights @ V
# weights reflect contextual relevance of each value vector`,
    interviewTip: "Why divide by sqrt(d_k)? For large vector dimensions, dot products grow large, pushing softmax into flat regions with tiny gradients (gradient vanishing)."
  },
  {
    id: "def-diffusion",
    title: "Diffusion Models & Generative Image Editing",
    category: "Generative AI & LLMs",
    tags: ["Generative AI & LLMs", "Computer Vision & YOLO"],
    definition: "Generative models that create high-fidelity images by learning how to reverse a gradual Markov noise-addition process.",
    keyPoints: [
      "Forward Process: Gradually adds Gaussian noise to training images until pure white noise is reached.",
      "Reverse Denoising: A neural network (U-Net or DiT) predicts and subtracts noise step-by-step, conditioned on text prompts or sketches.",
      "ControlNet Adapter: Adds spatial geometric control (e.g., Canny edges, sketch outlines) using zero-convolutions without altering pre-trained diffusion weights.",
      "Inpainting: Uses a binary alpha mask (from Segment Anything Model - SAM) to regenerate only the garment area while leaving human skin and background 100% untouched."
    ],
    codeSnippet: `from diffusers import AutoPipelineForImage2Image
from diffusers.utils import load_image

pipe = AutoPipelineForImage2Image.from_pretrained("stable-diffusion-v1-5/stable-diffusion-v1-5")
init_image = load_image("garment_sketch.png").resize((512, 512))

# image-to-image fabric replacement
result = pipe(
    prompt="A blue denim jacket with detailed stitching, studio lighting",
    image=init_image,
    strength=0.4,       # Preserves original silhouette
    guidance_scale=7.0, # Follows prompt strongly
    num_inference_steps=25
)
result.images[0].save("synthesized_garment.png")`,
    interviewTip: "Parameters to master: 'strength' controls how much original pixels change (0.4 = preserves silhouette), 'guidance_scale' steers prompt adherence."
  },
  {
    id: "def-langgraph",
    title: "LangChain vs LangGraph (StateGraph & Agentic Loops)",
    category: "Generative AI & LLMs",
    tags: ["Generative AI & LLMs", "MLOps, Cloud & Architecture"],
    definition: "LangChain provides linear building blocks for LLM chains. LangGraph is a stateful orchestration framework that models workflows as cyclic graphs with memory.",
    keyPoints: [
      "Why Linear Chains Fail: Standard LangChain chains run from Step A to B to C. They cannot loop back to correct mistakes or handle human approvals.",
      "LangGraph StateGraph: Workflows are modeled as nodes (tools/LLMs) and conditional edges (decision branches) operating on a shared TypedDict state.",
      "Cyclic Reflection (Critic Node): The agent runs a task, the Critic node evaluates output feasibility, and if quality is below threshold, it routes back to refine before returning.",
      "Human-in-the-Loop: Allows pausing execution at sensitive nodes (like placing bulk warehouse orders) until human supervisor signs off."
    ],
    codeSnippet: `from langgraph.graph import StateGraph, START, END
from typing import TypedDict

class AgentState(TypedDict):
    query: str
    retrieved_docs: list
    critique_score: float
    final_answer: str

def retrieve(state: AgentState):
    return {"retrieved_docs": search_vector_db(state["query"])}

def critique(state: AgentState):
    # Evaluates factual grounding against context
    score = evaluate_grounding(state["retrieved_docs"])
    return {"critique_score": score}

def router(state: AgentState):
    return "finalize" if state["critique_score"] > 0.8 else "retrieve"

builder = StateGraph(AgentState)
builder.add_node("retrieve", retrieve)
builder.add_node("critique", critique)
builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "critique")
builder.add_conditional_edges("critique", router, {"finalize": END, "retrieve": "retrieve"})
graph = builder.compile()`,
    interviewTip: "Position LangGraph as the multi-agent backbone that enables self-healing, cyclic reflection, and persistent state machines."
  },
  {
    id: "def-lightgbm",
    title: "LightGBM & Classical Tabular ML Optimization",
    category: "Classical ML & Stats",
    tags: ["Classical ML & Stats"],
    definition: "A fast, distributed, high-performance gradient boosting framework based on decision tree algorithms, designed for tabular data speed and efficiency.",
    keyPoints: [
      "Histogram-Based Splitting: Bins continuous numerical features into discrete bins (e.g. 256 bins), reducing split search complexity from O(N log N) to O(K).",
      "Leaf-Wise (Best-First) Tree Growth: Splits the leaf with maximum loss reduction rather than level-wise, achieving lower loss in fewer iterations.",
      "Native Categorical Splits: Employs Fisher's optimal partition to split categorical variables directly without one-hot encoding dimensional explosions.",
      "Optuna Bayesian Tuning: Uses Tree-structured Parzen Estimator (TPE) to find optimal learning_rate, num_leaves, and max_depth in 8-10 trials."
    ],
    codeSnippet: `import lightgbm as lgb
from sklearn.model_selection import train_test_split

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

train_data = lgb.Dataset(X_train, label=y_train)
val_data = lgb.Dataset(X_val, label=y_val, reference=train_data)

params = {
    "objective": "binary",
    "metric": "auc",
    "learning_rate": 0.05,
    "num_leaves": 31
}

# 15 rounds of early stopping to prevent memorization
model = lgb.train(
    params,
    train_data,
    num_boost_round=150,
    valid_sets=[val_data],
    callbacks=[lgb.early_stopping(stopping_rounds=15)]
)`,
    interviewTip: "Why not neural networks for tabular data? On <100k rows, gradient-boosted trees consistently outperform deep learning with 1/100th the compute and zero GPU dependencies."
  },
  {
    id: "def-drift",
    title: "Feature Drift & Z-Score Statistical Monitoring",
    category: "Classical ML & Stats",
    tags: ["Classical ML & Stats", "MLOps, Cloud & Architecture"],
    definition: "Detecting statistical divergence between production inference data and the model's training baseline distribution.",
    keyPoints: [
      "The Risk of Silent ML Failure: ML models do not throw 500 errors when data shifts—they quietly output incorrect predictions.",
      "Z-Score Monitoring: During training, baseline mean (mu) and standard deviation (sigma) are fit. At inference, computes Z = |x - mu| / sigma.",
      "Threshold Z > 3.0: If incoming feature values exceed 3 standard deviations from training baseline, a drift alert is triggered.",
      "Population Stability Index (PSI): Compares overall feature distributions over time (PSI < 0.1: Stable, PSI > 0.25: Significant shift requiring automated retraining)."
    ],
    codeSnippet: `def check_feature_drift(val: float, mean: float, std: float) -> bool:
    if std == 0:
        return False
    z_score = abs(val - mean) / std
    return z_score > 3.0 # Flags severe distribution anomaly`,
    interviewTip: "Z-score provides instant sub-millisecond per-request anomaly detection, while PSI provides batch-level drift analysis over time."
  },
  {
    id: "def-databases",
    title: "Production Databases: Relational vs Vector vs Blob Storage",
    category: "MLOps, Cloud & Architecture",
    tags: ["MLOps, Cloud & Architecture"],
    definition: "Enterprise separation of concerns between ACID transactional data, mathematical vector indexes, and raw binary object storage.",
    keyPoints: [
      "PostgreSQL (Relational): ACID compliance, relational integrity, foreign keys, catalog inventory, orders, customer records. Keeps transactions safe.",
      "Vector DB (Pinecone / ChromaDB / Azure AI Search): High-dimensional float vectors and HNSW indexes for sub-10ms Approximate Nearest Neighbor (ANN) search.",
      "Object Storage (Azure Blob / Amazon S3): Unstructured high-resolution media (carton photos, PDFs, model weight checkpoints) served via CDN.",
      "The Golden Rule: Object storage cannot do vector similarity; Vector DBs should not store transactional business records; PostgreSQL shouldn't be overloaded with multi-tenant HNSW indexes."
    ],
    codeSnippet: `-- Dedicated transactional table in on-prem PostgreSQL
CREATE TABLE conveyor_inspections (
    inspection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    conveyor_line_id VARCHAR(50) NOT NULL,
    detected_anomaly VARCHAR(30) NOT NULL,
    confidence_score REAL NOT NULL,
    bbox_coordinates JSONB NOT NULL,
    action_taken VARCHAR(50) NOT NULL,
    diverter_latency_ms REAL NOT NULL
);`,
    interviewTip: "Emphasize why we kept our existing production PostgreSQL server: enterprise companies NEVER disrupt operational databases for an AI feature."
  },
  {
    id: "def-onnx",
    title: "ONNX (Open Neural Network Exchange) & Runtime Acceleration",
    category: "MLOps, Cloud & Architecture",
    tags: ["MLOps, Cloud & Architecture", "Computer Vision & YOLO"],
    definition: "An open, framework-agnostic model serialization format and high-performance inference engine with hardware execution providers.",
    keyPoints: [
      "Decouples Training from Serving: Train in PyTorch or TensorFlow, export to .onnx, and serve with C++ ONNX Runtime without Python interpreter overhead.",
      "Graph Optimizations: Fuses adjacent operators (e.g. Conv + BatchNorm + ReLU into a single GPU kernel execution) and applies constant folding.",
      "Execution Providers: Automatically leverages hardware acceleration via TensorRT (NVIDIA GPUs), DirectML (Windows), or OpenVINO (Intel CPUs).",
      "Quantization: Post-training 8-bit integer quantization (INT8) slashes model size by 75% and speeds up CPU inference."
    ],
    codeSnippet: `import torch

# Exporting PyTorch model to ONNX with dynamic batch size
torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    opset_version=14,
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch_size"}, "output": {0: "batch_size"}}
)`,
    interviewTip: "ONNX Runtime eliminates Python Global Interpreter Lock (GIL) bottlenecks, providing sub-15ms inference latency in production."
  },
  {
    id: "def-ocr",
    title: "OCR (Optical Character Recognition) in AI Systems",
    category: "Computer Vision & YOLO",
    tags: ["Computer Vision & YOLO", "RAG & Vectors"],
    definition: "Computer vision algorithms that detect, segment, and recognize alphanumeric typography from images and documents.",
    keyPoints: [
      "OCR vs Computer Vision vs LLM: OCR extracts text characters. Computer Vision understands spatial objects. LLMs reason over language.",
      "The Blind Spot: Visual embeddings identify garment silhouettes or cardboard boxes, but fail to transcribe exact serial numbers, tracking barcodes, or printed t-shirt slogans ('NEW YORK 1985').",
      "OCR Enrichment: Extracted text is stored in PostgreSQL and appended to vector search metadata, allowing users to search by exact tracking IDs or graphic themes.",
      "Orphan Package Resolution: When conveyor barcodes are torn, high-speed OCR reconstructs tracking numbers from surviving fragments in under 20ms."
    ],
    codeSnippet: `# Industrial OCR pipeline flow:
# Image Frame -> Crop Defect / Label Area -> OCR Engine -> Text String -> SQL Metadata Enrichment`,
    interviewTip: "Highlight OCR as a multi-modal feature that converts unstructured physical typography into structured, searchable database tokens."
  },
  {
    id: "def-metrics",
    title: "Evaluation Metrics: Precision, Recall, F1, mAP & ROC-AUC",
    category: "Interview Flashcards",
    tags: ["Interview Flashcards", "Classical ML & Stats"],
    definition: "Quantitative metrics used to evaluate model classification, object detection, and information retrieval performance.",
    keyPoints: [
      "Precision: TP / (TP + FP). Measures false alarms. High precision ensures flagged items are truly defective.",
      "Recall: TP / (TP + FN). Measures missed defects. In conveyor anomaly detection, high recall is critical so damaged boxes do not slip downstream.",
      "F1-Score: Harmonic mean: 2 * (P * R) / (P + R). Balances precision and recall when classes are imbalanced.",
      "mAP@50 (Mean Average Precision): Area under the Precision-Recall curve at IoU threshold 0.50 across all object classes.",
      "ROC-AUC: Evaluates trade-off between True Positive Rate and False Positive Rate across all decision thresholds."
    ],
    codeSnippet: `# Formulas:
# Precision = TP / (TP + FP)
# Recall    = TP / (TP + FN)
# F1        = 2 * (P * R) / (P + R)
# IoU       = Area of Overlap / Area of Union`,
    interviewTip: "When asked about threshold selection: lowering confidence threshold increases recall (catches more defects) but decreases precision (more false alarms)."
  }
];
