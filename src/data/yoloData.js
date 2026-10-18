export const yoloData = {
  title: "Real-Time Computer Vision Pipeline | Edge Conveyor Defect Inspection",
  resumeBullet: "Delivered a real-time computer vision pipeline for conveyor parcel defect detection using YOLO, DeepSparse CPU inference, and on-premises PostgreSQL, achieving sub-25ms end-to-end latency and zero edge GPU dependency.",

  executiveScript: `In this project, our distribution center was sorting over 8,000 packages an hour across automated high-speed conveyor belts traveling at up to 2.5 meters per second. Manual human inspection was completely unviable at this line speed—operator eye fatigue caused unsealed flaps, crushed cartons, and missing shipping labels to slip downstream, causing conveyor jams, damaged goods, and millions in carrier damage disputes.

I delivered an end-to-end computer vision inspection gate that detects carton anomalies and triggers pneumatic diverter arms in under 25 milliseconds to push defective boxes to a rework siding.

Here is how our system works in simple terms:

First, on data and annotation: Public datasets like COCO don't have our warehouse's cardboard textures, tape branding, or lighting. We created an in-house few-shot dataset of 40 real parcel images—10 per class: intact normal cartons, torn/crushed boxes, open flap packaging, and cartons with missing labels. We annotated them in-house in standard YOLO format. To train a high-accuracy detector without overfitting on 40 samples, we used transfer learning from COCO, froze the backbone feature extractors in early epochs, and applied domain augmentations like mosaic stitching and lighting jitter.

Second, for model selection and edge optimization: We chose single-stage YOLO over Faster R-CNN because two-stage detectors take 80 to 120ms—at 2 m/s, the box would travel 25 cm past the diverter arm before inference even finished! To avoid spending $150,000 putting expensive $8,000 GPUs on dusty warehouse floors, we converted our model to ONNX and deployed with DeepSparse by Neural Magic. DeepSparse uses weight pruning (zeroing out 75% of redundant weights) and 8-bit quantization with AVX-512 CPU acceleration, cutting inference time on standard x86 CPUs from 65ms down to just 14 milliseconds.

Third, for 100% offline reliability: The sorting facility cannot stop if the internet lags. We kept our dedicated PostgreSQL database entirely on-premises over the local LAN. When a parcel passes, bounding boxes and defect classifications are logged in under 1 millisecond. Simultaneously, the system fires a Modbus PLC signal in 4 milliseconds to extend the pneumatic arm and divert the defective carton.

Fourth, for our Docker deployment flow: We containerized the vision pipeline using multi-stage Docker builds. Each conveyor line's ruggedized Industrial PC (IPC) runs a lightweight Docker container (< 280MB) that locks all C++ runtimes and AVX-512 drivers. Using Docker host networking and device passthrough, the container communicates directly with the Basler GigE camera and the serial Modbus PLC diverter with sub-millisecond local latency, enabling zero-downtime rolling container updates across 20+ sorting lines.

Finally, for automated claims and SOP triage: Once a damaged carton is diverted to the rework siding, our multimodal pipeline extracts the defect image crop, matches it against chunked warehouse Standard Operating Procedures (SOPs), and passes it to a Vision LLM (GPT-4o or local LLaMA Vision) to produce an instant damage incident ticket and automated carrier claim draft.`,

  userExample: {
    query: "Overhead Camera Frame #8492 on Conveyor Line 04 (Carton traveling at 2.0 m/s)",
    latency: "< 25ms (End-to-End Camera-to-Pneumatic Diverter)",
    description: "End-to-end execution flow showing how an overhead industrial camera captures a high-speed carton, runs DeepSparse CPU inference in 14ms, and fires a PLC pneumatic diverter before logging to local PostgreSQL.",
    steps: [
      {
        step: "01",
        stage: "Photoelectric Trigger & Capture",
        system: "GigE Vision Camera (Basler)",
        text: "A through-beam photoelectric sensor detects the package entering the vision gate at 2.0 m/s; an industrial Basler GigE camera captures a 1920x1080 frame in 2ms."
      },
      {
        step: "02",
        stage: "Letterbox Preprocessing",
        system: "Edge Python Pipeline",
        text: "The frame is resized to 640x640 with minimal symmetric gray padding (RGB 114, 114, 114) and normalized to float32 [0.0, 1.0] in 1.8ms."
      },
      {
        step: "03",
        stage: "DeepSparse Sparse CPU Inference",
        system: "Dockerized DeepSparse (8-core CPU)",
        text: "Running inside an optimized Docker edge container, DeepSparse executes the pruned, quantized YOLO model via AVX-512 vector instructions on commodity CPU in 14.2ms with zero GPU."
      },
      {
        step: "04",
        stage: "Vectorized NMS Post-Processing",
        system: "NumPy / C++ NMS Kernel",
        text: "Applies Non-Maximum Suppression with IoU threshold 0.45, discarding background proposals and confirming a 'torn' crushed sidewall defect with 0.94 confidence."
      },
      {
        step: "05",
        stage: "Modbus PLC Diverter Activation",
        system: "Industrial PLC & Pneumatic Arm",
        text: "The edge gateway sends a low-latency Modbus/TCP pulse in 4ms; the pneumatic diverter arm extends and safely routes the defective carton onto the rework siding."
      },
      {
        step: "06",
        stage: "Local SQL Log & Multimodal Triage",
        system: "PostgreSQL & Vision LLM (GPT-4o)",
        text: "Logs an immutable record to on-premises PostgreSQL in < 1ms, while the defect crop is sent to GPT-4o with warehouse SOPs to draft an instant carrier claim."
      }
    ],
    sampleOutput: {
      diverterAction: "DEFECT DETECTED: Torn/Crushed Sidewall (Confidence: 0.94). Bounding Box: [x1: 184, y1: 290, x2: 440, y2: 610]. PLC Modbus Signal: Sent in 22.4ms. Pneumatic Diverter Gate: ACTIVATED (Carton routed to Rework Siding 02).",
      inspectionRecord: {
        inspection_id: "INSP_9421_CONV04",
        conveyor_line: "Line 04 (Speed: 2.0 m/s)",
        defect_class: "torn (Damaged Sidewall)",
        inference_latency: "14.2ms on CPU (DeepSparse)",
        diverter_latency: "22.4ms total (Met < 30ms limit)",
        carrier_claim: "Drafted via GPT-4o (Claim #CLM_8820: Packaging crushed by carrier)",
        database_status: "LOGGED_IN_LOCAL_POSTGRESQL"
      }
    }
  },

  bookmarkedConcepts: [
    {
      id: "deepsparse",
      title: "DeepSparse",
      badge: "Sparse CPU Inference Engine",
      summary: "Inference runtime from Neural Magic that executes pruned and quantized neural networks on standard x86 CPUs at GPU speeds.",
      details: [
        "AVX-512 Acceleration: Compiles execution graphs to skip zero-valued weights entirely, executing directly on Intel Xeon / AMD EPYC vector instruction sets.",
        "Zero GPU Requirement: Slashes edge hardware costs by over $150,000 across a 20-line sorting facility by eliminating dedicated $8,000 edge GPUs.",
        "Latency Drop: Reduces PyTorch YOLO CPU inference time from 65ms down to 14.2ms, easily meeting the 30 FPS conveyor inspection deadline."
      ]
    },
    {
      id: "docker",
      title: "Docker",
      badge: "Edge Containerization",
      summary: "Lightweight container packaging for the complete vision pipeline, ensuring identical execution on ruggedized industrial warehouse IPCs.",
      details: [
        "Edge Deployment Flow: Docker Compose orchestrates the GigE camera capture daemon, the DeepSparse YOLO inference server, and the on-premises PostgreSQL container on each conveyor line's Industrial PC (IPC).",
        "Hardware Device Passthrough: Uses --net=host and --device mappings to give the container direct low-latency access to the Basler GigE Vision camera network card and serial Modbus PLC controllers.",
        "Multi-Stage Builds: Multi-stage Dockerfile strips build tools, OpenCV compilation caches, and tests, keeping the final edge container image lean (< 280MB) for rapid updates across 20+ sorting lines.",
        "Offline Resiliency & Auto-Restart: Containers use restart: always to boot automatically with conveyor startup, running 100% offline without requiring external internet access."
      ]
    },
    {
      id: "fastapi",
      title: "FastAPI",
      badge: "Local Edge API & Telemetry",
      summary: "High-performance asynchronous local gateway coordinating camera capture, telemetry streaming, and database logging.",
      details: [
        "Asynchronous Event Loop: Handles high-throughput inspection telemetry and async database insertion without blocking the real-time inference thread.",
        "Pydantic Input Validation: Validates PLC sensor triggers and conveyor speed telemetry in < 1ms to ensure clean operational logs.",
        "Local WebSocket Streaming: Streams live 60fps bounding-box video feeds to warehouse floor operator dashboards with sub-10ms display latency."
      ]
    },
    {
      id: "gpt-vision",
      title: "GPT-4o / LLaMA Vision",
      badge: "Multimodal SOP Reasoning",
      summary: "Vision-language model evaluating defect crops against warehouse Standard Operating Procedures to generate automated damage claims.",
      details: [
        "Automated Incident Tickets: Inspects the high-resolution crop of the damaged carton, assesses structural severity, and generates an operator repackaging checklist.",
        "Carrier Claim Generation: Drafts an insurance damage claim letter in 1.2 seconds, citing the carrier waybill and the specific package damage type.",
        "Offline Fallback: In high-security or offline environments, a local quantized LLaMA 3.2 Vision model runs locally on the edge workstation."
      ]
    },
    {
      id: "latency",
      title: "Latency (Real-Time Edge Budget)",
      badge: "Sub-30ms Reaction Deadline",
      summary: "The strict end-to-end timing budget required to inspect parcels moving at 2.0 to 2.5 meters per second.",
      details: [
        "The Physics Constraint: At 2.0 m/s, a package travels 2 centimeters every 10ms. A 100ms detector (like Faster R-CNN) means the box travels 20 cm past the diverter arm before detecting!",
        "End-to-End Breakdown: Camera trigger (2ms) + Letterboxing (2ms) + DeepSparse (14.2ms) + NMS (2ms) + Modbus PLC signal (4ms) = 24.2ms total.",
        "Guaranteed Safety Margin: Finishing in 24.2ms leaves an 8ms safety cushion before the 30ms physical diverter deadline, guaranteeing zero missed diverts."
      ]
    },
    {
      id: "postgresql-onprem",
      title: "PostgreSQL (On-Premises)",
      badge: "Autonomous Local Database",
      summary: "Dedicated on-premises relational database logging all inspection telemetry and defect coordinates with zero cloud dependency.",
      details: [
        "Zero Cloud Dependency: Warehouses cannot halt if an internet connection drops. All relational records reside on a local industrial server over LAN.",
        "Sub-Millisecond Insertion: Fast local connection pools (asyncpg) record bounding boxes, conveyor line IDs, and confidence scores in < 1ms.",
        "Immutable Audit Trail: Provides forensic proof of carton condition at departure, defending against false shipping carrier damage claims."
      ]
    },
    {
      id: "pruning",
      title: "Pruning & Sparsity",
      badge: "Model Compression",
      summary: "Technique of removing redundant weights from a neural network to accelerate execution on CPU vector registers.",
      details: [
        "70%–80% Weight Sparsity: Eliminates near-zero weights from convolutional layers, converting dense matrix math into sparse calculations.",
        "Zero Accuracy Drop: Fine-tuning the pruned network with knowledge distillation preserves over 92% mAP across all 4 carton anomaly classes.",
        "DeepSparse Synergy: Standard runtimes treat zeros as regular numbers; DeepSparse compiles the graph to physically skip multiplying zero weights."
      ]
    },
    {
      id: "yolo",
      title: "YOLO (You Only Look Once)",
      badge: "Single-Stage Object Detector",
      summary: "State-of-the-art anchor-free object detection architecture predicting bounding boxes and class probabilities in a single forward pass.",
      details: [
        "Single-Stage Speed: Directly regresses from pixels to bounding box coordinates ([x1, y1, x2, y2]) in one forward pass, avoiding slow two-stage Region Proposal Networks.",
        "Few-Shot Adaptation: Pre-trained on COCO (1.5M images) and fine-tuned on 40 warehouse carton images using backbone freezing to prevent overfitting.",
        "Decoupled Detection Heads: Separates classification and bounding regression into distinct heads, significantly boosting mAP on torn flaps and tape tears."
      ]
    }
  ]
};
