export const definitionBookmarks = [
  { id: "yolo", label: "YOLO" },
  { id: "confidence-score", label: "Confidence Score" },
  { id: "confusion-matrix-precision-recall", label: "Confusion Matrix / Precision / Recall" },
  { id: "gpt-llama", label: "GPT / LLaMA" },
  { id: "agentic-workflow", label: "Agentic Workflow" },
  { id: "genai-vs-traditional-ai", label: "GenAI vs Traditional AI" },
  { id: "agentic-ai", label: "Agentic AI" },
  { id: "ai-model", label: "AI Model" },
  { id: "connect-gpt-fastapi", label: "Connect GPT to FastAPI" },
  { id: "connect-gpt-flask", label: "Connect GPT to Flask" },
  { id: "custom-model-fastapi", label: "Custom Model with FastAPI" }
];

export const definitionsData = [
  {
    id: "yolo",
    title: "YOLO (You Only Look Once)",
    badge: "Computer Vision & Object Detection",
    summary: "Real-time single-pass object detection model used to identify, locate, and classify multiple objects in an image or video simultaneously.",
    realWorldExample: {
      domain: "Logistics Inspection Conveyor Belt",
      context: "A logistics company processes 5,000 parcels every hour. Manual inspection is too slow and causes operator fatigue, so the company installs a camera above the conveyor belt.",
      detects: [
        "Damaged parcels",
        "Open or torn packaging",
        "Missing shipping labels",
        "Normal parcels"
      ]
    },
    pipelineSteps: [
      { step: "Step 1: Input image", desc: "A high-speed industrial camera captures an image of a parcel traveling on the conveyor belt." },
      { step: "Step 2: YOLO detection", desc: "The neural network model processes the image in a single pass, predicts bounding boxes, classifies damage types, and outputs confidence scores." },
      { step: "Step 3: Business action", desc: "If parcel damage is detected above the confidence threshold, the control system triggers a pneumatic sorter arm to route the carton for manual inspection." }
    ],
    internalFlow: [
      { title: "Input Image", desc: "Parcel captured by the camera at line speed (1.5–2.5 m/s)." },
      { title: "Neural Network", desc: "Learns hierarchical visual features such as edges, contours, tape tears, carton crumples, and puncture patterns." },
      { title: "Detection Predictions", desc: "Outputs bounding box coordinates (x, y, w, h), object class, and confidence score." },
      { title: "Final Result", desc: "For example: damaged_parcel, 92% confidence score." }
    ],
    keyOutputs: [
      { name: "Class", desc: "What was detected (e.g. damaged_parcel, open_flap, torn_box, normal_carton)." },
      { name: "Bounding Box", desc: "Where the object is located, defined by rectangular coordinates [x_center, y_center, width, height]." },
      { name: "Confidence Score", desc: "How strongly the model believes the prediction is valid (0.0 to 1.0 / 0% to 100%)." }
    ]
  },
  {
    id: "confidence-score",
    title: "Confidence Score & Threshold Tuning",
    badge: "Model Certainty & Decision Boundary",
    summary: "A confidence score tells us how strongly a YOLO model believes its prediction. Setting the threshold balances precision against recall.",
    details: [
      "Definition: A scalar value between 0.0 and 1.0 indicating model certainty that a bounding box contains an object of a specific class.",
      "Lower Confidence Threshold: Generates more detections, catches more edge cases (higher recall), but risks false alarms (lower precision).",
      "Higher Confidence Threshold: Reduces false alarms by accepting only high-certainty predictions (higher precision), but risks missing subtler defects (lower recall)."
    ],
    tradeoffTable: [
      { threshold: "Lower Threshold (e.g. 0.25 - 0.40)", detections: "More detections", recall: "Higher Recall", precision: "Lower Precision (more false positives)" },
      { threshold: "Higher Threshold (e.g. 0.70 - 0.85)", detections: "Fewer detections", recall: "Lower Recall (misses subtle damage)", precision: "Higher Precision (fewer false alarms)" }
    ]
  },
  {
    id: "confusion-matrix-precision-recall",
    title: "Confusion Matrix / Precision / Recall",
    badge: "Evaluation Metrics & Business Tradeoffs",
    summary: "Fundamental diagnostic tools evaluating model classification performance, error distribution, and operational cost impact.",
    matrixComponents: [
      { term: "TP (True Positive)", desc: "Model predicted Damaged, and parcel was actually Damaged." },
      { term: "TN (True Negative)", desc: "Model predicted Normal, and parcel was actually Normal." },
      { term: "FP (False Positive)", desc: "Model predicted Damaged, but parcel was actually Normal (False Alarm)." },
      { term: "FN (False Negative)", desc: "Model predicted Normal, but parcel was actually Damaged (Missed Defect)." }
    ],
    metrics: [
      {
        name: "Precision",
        question: "Of all the parcels the model flagged as damaged, how many were actually damaged?",
        formula: "Precision = TP / (TP + FP)",
        businessImpact: "Low precision means too many false alarms. Warehouse operators waste hours manually re-inspecting perfectly normal parcels, destroying conveyor throughput."
      },
      {
        name: "Recall",
        question: "Of all the parcels that were actually damaged, how many did the model successfully detect?",
        formula: "Recall = TP / (TP + FN)",
        businessImpact: "Low recall means damaged parcels pass through undetected. This leads to broken goods reaching customers, carrier damage claims, returns, and massive reputational loss."
      }
    ]
  },
  {
    id: "gpt-llama",
    title: "GPT / LLaMA",
    badge: "Large Language Model Families",
    summary: "Foundational LLM families: GPT (OpenAI proprietary hosted models) vs LLaMA (Meta open-weights self-hosted models).",
    gptOverview: {
      name: "GPT (Generative Pre-trained Transformer)",
      developer: "OpenAI",
      desc: "A family of AI language models developed by OpenAI that can understand and generate text, answer questions, summarize documents, write code, and perform complex reasoning tasks.",
      points: [
        "Commonly accessed through hosted cloud APIs (e.g. gpt-4o, gpt-5-mini) or ChatGPT.",
        "Zero infrastructure maintenance: OpenAI handles GPU orchestration, scaling, and low-level optimizations.",
        "Model hosting, data privacy boundaries, and API rate limits depend on OpenAI's enterprise terms."
      ]
    },
    llamaOverview: {
      name: "LLaMA (Large Language Model Meta AI)",
      developer: "Meta",
      desc: "A family of open-weights foundational large language models developed by Meta designed for research, enterprise deployment, and custom fine-tuning.",
      points: [
        "Model weights can be downloaded directly from HuggingFace and hosted on private infrastructure.",
        "Complete data sovereignty: Model executes entirely inside your private VPC/on-prem GPUs with zero external API calls.",
        "Requires local GPU hardware management (e.g. vLLM, Ollama, TensorRT-LLM) and Meta Community License compliance."
      ]
    },
    ragClarification: "GPT and LLaMA are model families (the generative reasoning brains), whereas RAG (Retrieval-Augmented Generation) is a technique for supplying a model with relevant external information from your knowledge base. They are complementary and frequently used together."
  },
  {
    id: "agentic-workflow",
    title: "Agentic Workflow",
    badge: "Autonomous Execution Architecture",
    summary: "A software architecture in which the AI model can iteratively choose actions, call external tools, verify outputs, and take multi-step decisions to accomplish a goal.",
    characteristics: [
      "Autonomous Tool Invocation: Model selects which tool to execute (database query, calculator, web search, API call).",
      "Dynamic Reflection & Error Correction: Inspects tool responses; if a query fails or returns partial data, formulates alternative execution paths.",
      "Multi-Step Planning: Breaks high-level business objectives down into structured sub-tasks without requiring rigid hardcoded scripts."
    ]
  },
  {
    id: "genai-vs-traditional-ai",
    title: "GenAI vs Traditional AI",
    badge: "Architectural Comparison",
    summary: "Understanding the paradigm shift between discriminative/predictive machine learning models and generative foundation models.",
    comparison: [
      {
        aspect: "Core Function",
        traditional: "Predicts, ranks, or classifies existing input data into predefined buckets.",
        generative: "Creates completely new original content (text, code, images, audio, video) based on learned distributions."
      },
      {
        aspect: "Logistics Example",
        traditional: "Binary classification: 'Damaged' vs 'Normal' parcel.",
        generative: "Generates a detailed natural-language defect inspection report explaining why a parcel was damaged and recommending packaging remediation."
      },
      {
        aspect: "Underlying Models",
        traditional: "Logistic Regression, XGBoost, Random Forest, SVM, ResNet, YOLO.",
        generative: "Transformer LLMs (GPT-4o, LLaMA-3), Diffusion models (Stable Diffusion), multimodal generative transformers."
      }
    ]
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    badge: "Autonomous Systems",
    summary: "An autonomous system that leverages an AI model to decide and execute steps toward a goal by calling external tools and evaluating intermediate results.",
    coreDifferences: [
      "Standard Chatbot: Purely reactive. Waits for a prompt, generates a single completion response, and stops immediately.",
      "AI Agent: Proactive and goal-driven. Can select actions, run database queries, execute Python code, verify output correctness, and iterate until the objective is reached within its permissions.",
      "Relationship to GenAI: Agentic AI typically utilizes GenAI models as its reasoning engine, but not every GenAI application is an agent."
    ]
  },
  {
    id: "ai-model",
    title: "AI Model (Hosted vs Self-Hosted in API)",
    badge: "Inference Integration Architecture",
    summary: "The computational brain that makes predictions or generates responses. Two primary architectural patterns exist for production API integration.",
    patterns: [
      {
        title: "Pattern 1: Call a Hosted Model (API-based)",
        desc: "Your backend server sends HTTP requests to a managed cloud model provider. Common for OpenAI GPT, Anthropic Claude, or Google Gemini.",
        pros: "Zero GPU management, instant setup, scales automatically, always access to frontier models.",
        cons: "Per-token API pricing, latency depends on external network, strict cloud data residency requirements."
      },
      {
        title: "Pattern 2: Load or Call a Self-Hosted Model",
        desc: "Your backend directly loads a local model file (e.g. joblib, ONNX, PyTorch) or makes requests to a private inference engine (e.g. vLLM, DeepSparse, Triton). Common for LLaMA and traditional ML models.",
        pros: "Zero data leakage, sub-millisecond local latency, no per-token charges, complete operational control.",
        cons: "Requires dedicated GPU/CPU hardware, memory provisioning, driver maintenance, and auto-scaling management."
      }
    ]
  },
  {
    id: "connect-gpt-fastapi",
    title: "Connect GPT to FastAPI",
    badge: "Modern Production Integration",
    summary: "Full working implementation using modern FastAPI, Pydantic v2 data validation, and OpenAI Python SDK Responses API.",
    installCommand: 'pip install fastapi "uvicorn[standard]" openai',
    runCommand: "uvicorn main:app --reload",
    code: `from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()

# Reads OPENAI_API_KEY from environment variables
client = OpenAI()


class Question(BaseModel):
    question: str


@app.post("/ask")
def ask_ai(data: Question):
    response = client.responses.create(
        model="gpt-5-mini",
        input=data.question
    )

    return {
        "question": data.question,
        "answer": response.output_text
    }`,
    workflow: [
      "1. FastAPI receives incoming HTTP POST request at /ask.",
      "2. Pydantic validates the request body against the Question schema.",
      "3. Python invokes OpenAI client.responses.create() over TLS.",
      "4. GPT processes input and generates the text completion.",
      "5. FastAPI serializes the response dictionary into formatted JSON."
    ]
  },
  {
    id: "connect-gpt-flask",
    title: "Connect GPT to Flask",
    badge: "Lightweight WSGI Integration",
    summary: "Production Flask microservice demonstrating incoming JSON validation, OpenAI client calls, and JSON error handling.",
    installCommand: "pip install flask openai",
    runCommand: "python main.py",
    code: `from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)
client = OpenAI()


@app.route("/ask", methods=["POST"])
def ask_ai():
    data = request.get_json()
    question = data.get("question", "")

    if not question.strip():
        return jsonify({"error": "Question is required"}), 400

    response = client.responses.create(
        model="gpt-5-mini",
        input=question
    )

    return jsonify({
        "question": question,
        "answer": response.output_text
    })


if __name__ == "__main__":
    app.run(debug=True)`,
    notes: [
      "Flask handles incoming JSON parsing via request.get_json().",
      "Explicit validation ensures empty or whitespace queries return HTTP 400 Bad Request.",
      "Calls OpenAI SDK using environment credentials and returns serialized JSON via jsonify()."
    ]
  },
  {
    id: "custom-model-fastapi",
    title: "Custom Model with FastAPI",
    badge: "Self-Hosted Scikit-Learn Inference",
    summary: "Serving your own trained Machine Learning model (e.g. Scikit-Learn, XGBoost) directly inside a FastAPI endpoint using joblib.",
    context: "What if you have your own ML model instead of GPT? Suppose you have trained a parcel damage classifier using scikit-learn. You don't need an external LLM API—you load your saved model artifact with joblib and call its predict() method inside the API endpoint.",
    installCommand: "pip install fastapi uvicorn scikit-learn joblib pydantic",
    code: `import joblib
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Load your previously trained scikit-learn model once on startup
model = joblib.load("parcel_model.joblib")


class ParcelData(BaseModel):
    weight: float
    impact_score: float


@app.post("/predict")
def predict_damage(data: ParcelData):
    # Prepare feature array matching model's expected shape (1, n_features)
    features = [[data.weight, data.impact_score]]

    # Run inference directly in CPU memory with sub-millisecond latency
    prediction = model.predict(features)[0]

    return {"damage_prediction": str(prediction)}`,
    keyAdvantages: [
      "Zero Cloud Dependencies: Runs fully offline without external API latency or costs.",
      "Ultra-Fast Execution: In-memory inference executes in under 2–5 milliseconds.",
      "Schema Validation: Pydantic strictly validates numeric types (float) before inference, preventing NaN errors."
    ]
  }
];
