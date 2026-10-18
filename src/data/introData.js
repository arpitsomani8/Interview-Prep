export const candidateIntro = {
  name: "Arpit Somani",
  location: "Bhilwara, Rajasthan",
  experience: "4+ Years Experience",
  currentCompany: "Pratham Software",
  roleTitle: "Senior AI / ML & Python Backend Engineer",
  speechTitle: "Official Interview Opening Introduction Script",
  verbatimScript: `Good Afternoon,

My name is Arpit Somani, and I’m from Bhilwara, Rajasthan. I have over four years of experience in software development, primarily working with Python, backend development, and AI/ML-based solutions.

My core technical skills include Python, Flask, FastAPI, RESTful APIs, and machine learning frameworks such as Scikit-learn. I have also worked with generative AI technologies, including LLMs, RAG pipelines, embeddings, vector databases, and agentic AI workflows.

Currently, I’m working at Pratham Software, where I’m involved in AI-driven projects, focusing on building backend services and intelligent applications.

One of the key projects I’m working on is Fashion AI Copilot, a multimodal AI platform designed to help fashion teams search for designs using text and images, analyze fashion trends, and explore AI-powered garment design and editing. The solution involves technologies such as Azure AI Vision, Azure OpenAI, embeddings, vector search, and generative AI models.

Apart from that, I have worked on a Hybrid AI Engine, which combines traditional machine learning with RAG-based approaches to support different business use cases, as well as a computer vision pipeline for anomaly detection using YOLO and DeepSparse.

I started my career working on Python and Flask-based web applications, which helped me build a strong foundation in backend development, API design, and application architecture. Over time, I expanded my expertise into machine learning and generative AI.

Now, I’m looking for an opportunity where I can apply my software engineering experience and AI/ML knowledge to solve real-world business problems and continue growing as an AI/ML engineer.

That’s a brief introduction about me. Thank you.`,
  coreSkills: [
    "Python",
    "FastAPI & Flask",
    "RESTful API Architecture",
    "Scikit-learn & Tabular ML",
    "Generative AI & LLMs",
    "RAG Pipelines & Chunking",
    "Embeddings & Vector Databases",
    "Agentic AI Workflows",
    "Computer Vision (YOLO + DeepSparse)"
  ],
  pillars: [
    {
      label: "Greeting & Origins",
      detail: "Arpit Somani from Bhilwara, Rajasthan — 4+ years of hands-on software development experience."
    },
    {
      label: "Tech Stack & Tools",
      detail: "Python, Flask, FastAPI, RESTful APIs, Scikit-learn, LLMs, RAG, Embeddings, Vector DBs, Agentic AI."
    },
    {
      label: "Current Industry Role",
      detail: "Software Engineer at Pratham Software developing AI-driven backend services and intelligent architectures."
    },
    {
      label: "3 Flagship Architectures",
      detail: "Fashion AI Copilot (Azure Vision + GPT-4o), Hybrid AI Engine (ML + RAG), and Edge Anomaly CV (YOLO + DeepSparse)."
    },
    {
      label: "Evolution & Next Target",
      detail: "Solid foundation in backend API architecture evolved into GenAI & ML engineering; ready to deliver production value."
    }
  ]
};

export const introData = {
  candidateName: "Arpit Somani",
  candidateRole: "Senior AI / ML & Python Backend Engineer",
  candidateLocation: "Bhilwara, Rajasthan | Pratham Software",
  title: "Flagship Production Systems & Interview Defense Vault",
  subtitle: "End-to-End Architectures, Production Trade-Offs, and High-Throughput Edge Pipelines",
  summary: "Comprehensive technical blueprint for defending three enterprise AI systems in technical interviews: Multimodal Generative Retail Search (Fashion AI Copilot), Multi-Tenant Dynamic Schema ML & RAG (Hybrid AI Engine), and Sub-15ms Edge Anomaly Detection (YOLO + DeepSparse). Accompanied by a 30+ topic Machine Learning & MLOps reference vault.",
  projects: [
    {
      id: "fashion",
      title: "Fashion AI Copilot",
      category: "Agentic Multimodal Design Platform",
      stack: ["Azure AI Vision", "Azure OpenAI (GPT-4o)", "HNSW Vector DB", "PostgreSQL", "ControlNet", "SDXL", "Zero123", "LangGraph"],
      highlights: [
        "100,000+ garment catalog retrieval with text, image & hybrid late fusion",
        "Self-service retailer bulk ordering (S/M/L/XL) with OTP email verification",
        "25-item lazy loading & pagination + Top-5 LLM context hydration",
        "Kept existing production PostgreSQL server (no cloud DB migration)",
        "Azure OCR integration for graphic tees and typography search"
      ]
    },
    {
      id: "hybrid",
      title: "Hybrid AI Engine",
      category: "Multi-Tenant Hybrid ML & RAG Solution",
      stack: ["FastAPI", "Pydantic v2", "LightGBM", "Optuna", "Pinecone Serverless", "LLaMA 3.1", "Joblib", "PostgreSQL"],
      highlights: [
        "Zero-to-one dynamic schema generation in memory via Pydantic v2",
        "Cold-start RAG fallback when tabular history < 100 rows",
        "Intelligent hybrid routing: Sub-5ms classical ML vs Sub-300ms LLaMA RAG",
        "Strict multi-tenant isolation via HTTP headers and Pinecone namespaces",
        "Z-score statistical feature drift monitoring (Z > 3.0)"
      ]
    },
    {
      id: "yolo",
      title: "YOLO + DeepSparse Conveyor Anomaly",
      category: "Real-Time Computer Vision & Edge Systems",
      stack: ["YOLOv8", "DeepSparse (Neural Magic)", "AVX-512 VNNI", "ONNX", "PostgreSQL (On-Prem LAN)", "CLIP ViT-B/32", "High-Speed OCR"],
      highlights: [
        "12,000 packages/hr conveyor belt inspection under a 30ms diverter deadline",
        "Few-shot cold start: 40 industrial images (10 per class) with COCO transfer learning",
        "DeepSparse CPU acceleration: 14.2ms inference on commodity x86 CPUs ($0 GPU cost)",
        "Strict on-premises PostgreSQL server (<1ms LAN latency, 100% offline uptime)",
        "High-speed OCR waybill recovery for orphan cartons with damaged barcodes"
      ]
    }
  ]
};
