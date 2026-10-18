export const introData = {
  candidateName: "Senior AI / ML & Computer Vision Engineer",
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
