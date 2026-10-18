export const yoloData = {
  title: "Real-Time Computer Vision Pipeline for Logistics Anomaly Detection",
  resumeBullet: "Delivered a real-time computer vision pipeline for anomaly detection using YOLO and DeepSparse",

  coreProblem: {
    title: "1. The Core Business Problem (Why We Built This)",
    points: [
      { label: "High-Throughput Logistics Reality", text: "Regional parcel hubs process 5,000 to 12,000 packages per hour on conveyor belts traveling at 1.5 to 2.5 meters per second." },
      { label: "Human Inspection Bottleneck", text: "Operators physically cannot inspect every carton at line speed. Visual fatigue causes missed crushed boxes, open flaps, and unlabeled cartons, leading to downstream sorter jams, product damage, and carrier claims costing millions." },
      { label: "The 4 Operational Categories", text: "1. Damaged Parcels ('torn'): Crushed cartons, punctured sidewalls, dented corners, ripped cardboard. 2. Open Packaging ('open'): Unsealed top flaps, popped or cut tape. 3. Missing Labels ('no_label'): Plain corrugated boxes missing barcodes/waybills. 4. Normal Parcels ('intact'): Structurally sealed cartons with valid labels." },
      { label: "The Engineering Objective", text: "An overhead vision inspection gate that identifies passing parcels, outputs bounding coordinates, and triggers pneumatic diverter arms in <30 milliseconds to route defective cartons to a rework siding." }
    ]
  },

  dataReality: {
    title: "2. The Data Reality & In-House Annotation (The 40-Image Constraint)",
    points: [
      { label: "Data Scarcity", text: "Public datasets (COCO/ImageNet) do not match a company's specific cardboard cartons, tape branding, or warehouse lighting. We faced a real-world cold-start constraint: exactly 10 images per category (40 images total)." },
      { label: "In-House Annotation", text: "We labeled them ourselves using industrial annotation tools (Roboflow / LabelImg / CVAT) exporting to standard YOLO normalized text format: <class_id> <x_center> <y_center> <width> <height> (0: intact, 1: open, 2: torn, 3: no_label)." },
      { label: "Transfer Learning from COCO", text: "Initialized weights from YOLOv8 pre-trained on COCO (1.5M instances). The backbone already possessed mature feature extractors for edges, corners, cardboard textures, and 3D geometry." },
      { label: "Backbone Freezing", text: "Backbone feature layers were frozen in early epochs to preserve general spatial representations while only the decoupled detection head was tuned on defect features." },
      { label: "Aggressive Domain Augmentations", text: "Mosaic 4-image stitching, affine transformations (+-10 deg rotation for conveyor jitter), HSV color shifts (+-25% for fluctuating warehouse lighting), and random scaling (0.8x to 1.2x)." }
    ]
  },

  modelSelection: {
    title: "3. Model Architecture Selection: Why YOLO (and Why Not Others)",
    points: [
      { label: "Why YOLO (You Only Look Once)", text: "Single-stage, anchor-free detector formulating detection as direct regression from pixels to bounding coordinates and class probabilities in a single forward pass. Sub-15ms latency easily meets the 30 FPS conveyor deadline." },
      { label: "Why NOT Faster R-CNN (Two-Stage)", text: "RPN + RoI pooling creates 80ms–150ms latency. At 2 m/s, the package travels 30 cm past the diverter arm before inference finishes." },
      { label: "Why NOT SSD", text: "Rigid anchor grids struggle on irregular carton defects (long ripped tape or corner crushing) and suffer lower mAP compared to YOLO's decoupled heads." },
      { label: "Why NOT Pure Classification (ResNet/ViT)", text: "Classifiers only output a whole-image tag; they cannot output spatial coordinates ([x1, y1, x2, y2]) needed to guide robotic arms, diverter gates, or zoom cameras." }
    ]
  },

  edgeOptimization: {
    title: "4. Edge Inference Optimization: Why DeepSparse (Neural Magic)",
    points: [
      { label: "The Warehouse Hardware Dilemma", text: "Equipping 20 to 50 sorting chutes with $8,000 enterprise GPUs is cost-prohibitive ($150,000+ per hub) and creates thermal/dust hazards on the warehouse floor." },
      { label: "What is DeepSparse", text: "An inference engine by Neural Magic that runs deep neural networks on commodity x86 CPUs (Intel Xeon / AMD EPYC) at GPU speeds." },
      { label: "Weight Sparsity & Pruning", text: "Prunes redundant weights (70–80% zero weights) without losing detection accuracy." },
      { label: "AVX-512 & VNNI Acceleration", text: "DeepSparse compiles the execution graph to skip operations on zero weights directly on CPU vector instruction sets." },
      { label: "Cache-Friendly Kernels", text: "Keeps working feature maps inside CPU L1/L2 cache, eliminating memory bandwidth bottlenecks." },
      { label: "Latency Benchmark", text: "Standard PyTorch YOLO on CPU: ~65ms -> DeepSparse on 8-core CPU: ~14ms." },
      { label: "Export Pipeline", text: "PyTorch -> ONNX (Opset 12/14) -> DeepSparse Engine (deepsparse.Pipeline)." }
    ]
  },

  pipelineSteps: [
    { step: "1. Camera Acquisition", text: "Industrial Basler/FLIR GigE Vision camera triggered by photoelectric through-beam sensor as carton enters portal." },
    { step: "2. Letterbox Preprocessing", text: "Resizes 1920x1080 frame to 640x640 with minimal symmetric gray padding (RGB: 114, 114, 114), normalized to [0.0, 1.0] float32 in NCHW order." },
    { step: "3. DeepSparse Forward Pass", text: "Generates output tensor [1, 8, 8400] (8400 candidate anchor boxes x 4 coordinates + 4 class probabilities) in 14.2ms." },
    { step: "4. Vectorized NMS Filtering", text: "Discards proposals with confidence < 0.40 and suppresses redundant overlapping boxes with IoU > 0.45." },
    { step: "5. PLC Diverter Trigger", text: "If an anomaly (torn, open, no_label) is detected with confidence >= 0.50, fires Modbus/TCP or GPIO signal in <25ms to activate pneumatic diverter arm." }
  ],

  databaseReality: {
    title: "6. Database Reality: Keeping Our On-Premises PostgreSQL Server (NO Cloud)",
    text: "Logistics sorting facilities must operate with 100% autonomous local reliability. A conveyor moving 8,000 packages/hour cannot halt because of an internet outage or cloud API throttle. All relational records reside on the warehouse's dedicated on-premises PostgreSQL server over a local connection pool (asyncpg / psycopg2). Every inspected carton logs an immutable record in conveyor_inspections: inspection_id (UUID), timestamp, conveyor_line_id, detected_anomaly, confidence_score, bbox_coordinates (JSONB), action_taken, and diverter_latency_ms. Local LAN latency is <1ms, guaranteeing zero cloud lag."
  },

  chunkingDecision: {
    title: "7. Warehouse SOPs & Text Chunking Decision",
    text: "Warehouses operate under formal multi-page Standard Operating Procedure (SOP) manuals (OS&D - Over, Short, and Damaged guidelines, HazMat containment, repackaging standards). Unlike short 50-word catalog records, these required chunking using RecursiveCharacterTextSplitter with chunk_size=400-500 characters and 50-character overlap. Overlap is critical because rules contain condition-action pairs: 'If the carton is torn AND hazardous contents are suspected, DO NOT open. Immediately notify HazMat lead.' Without overlap, splitting could sever the condition from the safety action. Chunks are tagged with category, severity (CRITICAL/WARNING), and action_type."
  },

  multimodalTriage: {
    title: "8. Multimodal Embeddings & LLM Copilot (GPT / Llama)",
    text: "Diverting a box is only step one. Operators on the siding must decide: Can this box be re-taped? Does it require an insurance claim? Defect crop images and SOP text chunks are embedded into a shared 512-dimensional metric space using CLIP ViT-B/32 with strict L2-normalization. The pipeline extracts the defect crop, vector search retrieves the Top-3 closest SOP rules, and a Vision LLM (GPT-4o or local Llama 3.2 Vision) produces a structured JSON incident report in <1.2 seconds: root-cause assessment, operator repackaging steps, and an automated carrier claim draft."
  },

  ocrKillerFeature: {
    title: "9. Future Aspect & Killer Feature: High-Speed OCR Waybill & Barcode Extraction",
    text: "When a box is marked no_label or has a torn barcode, sorters halt and the carton sits in dead-letter limbo. We integrated high-speed OCR (PaddleOCR / Tesseract / Industrial Barcode Reader) to scan 1D barcodes (Code 128), 2D DataMatrix, carrier names (FedEx, UPS, DHL), and postal codes. If a label is partially torn, OCR reconstructs the tracking number from surviving text fragments. Extracted tracking IDs and destination hubs are appended to PostgreSQL logs and vector metadata, allowing supervisors to search incidents by carrier, supplier, or tracking number."
  },

  tradeoffsTable: [
    { dimension: "Inference Latency", yolo: "14ms – 18ms (Real-Time)", alt1: "70ms – 120ms (Too Slow)", alt2: "200ms – 400ms (Network Lag)" },
    { dimension: "Edge Hardware Cost", yolo: "$0 GPU Cost (Standard x86 CPU)", alt1: "$5,000 – $10,000 GPU per line", alt2: "High recurring cloud API bills" },
    { dimension: "Spatial Coordinates", yolo: "Pixel-accurate bounding boxes", alt1: "Accurate bounding boxes", alt2: "NONE (Whole-image tag only)" },
    { dimension: "Conveyor Speed Support", yolo: "Up to 2.5 m/s (70 FPS)", alt1: "Struggles above 1.0 m/s", alt2: "Fails real-time diverter deadline" },
    { dimension: "Network Reliability", yolo: "100% Offline Local LAN", alt1: "Local hardware dependent", alt2: "Line crashes if internet drops" }
  ],

  metrics: [
    { metric: "Inference Latency", value: "14.2 ms", detail: "Per frame on standard 8-core Intel Xeon CPU using DeepSparse" },
    { metric: "Detection Accuracy", value: "92.4% mAP@50", detail: "Across all 4 packaging states despite 40-image few-shot cold start" },
    { metric: "End-to-End Reaction", value: "22.8 ms", detail: "Frame acquisition -> Letterbox -> DeepSparse -> NMS -> Modbus PLC trigger (<30ms deadline)" },
    { metric: "Infrastructure Savings", value: ">$150,000", detail: "Eliminated dedicated edge GPUs across a 20-line sorting facility" }
  ],

  executiveScript: `In this project, our distribution center was processing over 8,000 packages an hour across automated high-speed conveyor belts. Manual visual inspection was failing because operator eye fatigue led to undetected crushed cartons, unsealed boxes, and missing shipping labels slipping downstream—causing conveyor jams, damaged contents, and costly carrier disputes.

I delivered an end-to-end real-time computer vision pipeline to inspect cartons at conveyor speed and trigger pneumatic diverter gates in under 25 milliseconds.

We started with a clean, few-shot industrial dataset of 40 real parcel images—exactly 10 per category: intact normal cartons, torn/damaged boxes, open flap packaging, and cartons with missing labels. We annotated every image in-house in standard YOLO normalized coordinate format. To train a robust detector on 40 samples without overfitting, we leveraged transfer learning from COCO pre-trained weights, initially froze the backbone, and applied aggressive domain-specific mosaic and affine augmentations to simulate conveyor vibration and warehouse lighting variations.

For model selection, we chose YOLO over Faster R-CNN because two-stage detectors take 80 to 120ms, which is far too slow for conveyor belts moving at 2 meters per second. To deploy this without burning budget on expensive $8,000 enterprise GPUs at every sorting chute, we converted the trained model to ONNX and deployed it using DeepSparse by Neural Magic. DeepSparse utilizes 8-bit quantization and weight pruning to execute sparse neural networks directly on standard x86 CPUs with AVX-512 acceleration, slashing CPU latency down to 14 milliseconds.

All inspection telemetry, anomaly bounding coordinates, and diverter actions are written directly to our on-premises PostgreSQL server over a local connection pool—we kept our relational database on-prem to guarantee zero cloud latency and 100% offline uptime.

When an anomaly is diverted, our multimodal copilot retrieves warehouse SOP rules chunked with character overlap and passes the defect crop to a Vision LLM (GPT / Llama) to produce immediate root-cause incident tickets and repackaging guidelines. As an additional killer feature, we integrated high-speed OCR to scan shipping waybills, so if a label is damaged or unreadable, we reconstruct the tracking number and destination hub in real time.`
};
