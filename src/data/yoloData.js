export const yoloData = {
  "title": "Real-Time Computer Vision Pipeline | Edge Conveyor Defect Inspection",
  "resumeBullet": "Architected and deployed a real-time computer vision system for parcel defect detection on high-speed conveyor belts using YOLO, DeepSparse CPU inference, Docker, and on-premises PostgreSQL, achieving 24ms reaction times and zero edge GPU dependency.",
  "executiveScript": "# Real-Time Logistics Defect Detection — Computer Vision Pipeline\n\n## Project Overview\n\nWe developed a Computer Vision inspection pipeline for a logistics distribution center handling a high volume of packages across automated sorting lines.\n\nThe main challenge was identifying damaged parcels, open cartons, and missing shipping labels quickly and consistently. Manual inspection can be difficult at high throughput, and defects that go undetected may lead to damaged merchandise, sorting issues, and carrier disputes.\n\nOur goal was to build a software pipeline that processes package images or video frames, detects defects using a YOLO-based object detection model, and generates structured defect events for downstream processing.\n\n**Our work focused on the AI and data pipeline, model inference, and pipeline evaluation. We did not implement a live physical conveyor deployment.**\n\n## 1. Computer Vision Pipeline\n\nThe pipeline processes each input frame through a sequence of stages:\n\n**Frame ingestion → preprocessing → model inference → post-processing → defect event generation → asynchronous data logging**\n\n### Frame Ingestion and Preprocessing\n\nWe use OpenCV and NumPy to ingest image frames or video samples and prepare them for model inference.\n\nThe preprocessing stage includes:\n\n- Resizing images to the model’s expected input dimensions.\n- Preserving the image aspect ratio using letterbox resizing and padding.\n- Converting image data into the required tensor format.\n- Normalizing pixel values before passing the input to the model.\n\nThis ensures that incoming frames follow a consistent format and can be processed by the detection model.\n\n### YOLO-Based Defect Detection\n\nWe use a YOLO-based object detection model because it performs object localization and classification in a single forward pass.\n\nThe model identifies four package conditions:\n\n1. **Intact:** Normal package condition.\n2. **Torn or damaged:** Crushed cartons, punctures, or visible tears.\n3. **Open:** Unsealed flaps or open packaging.\n4. **Missing label:** Package without a visible shipping label.\n\nFor each detection, the model produces a predicted class, confidence score, and bounding-box coordinates.\n\nThe bounding boxes help identify where the detected condition appears within the package image.\n\n### CPU Inference Optimization\n\nThe pipeline is designed to support CPU-based inference without requiring a dedicated GPU for every processing environment.\n\nThe model can be exported to ONNX and executed using a compatible CPU inference runtime such as DeepSparse. This provides an optimized inference path for CPU-based environments.\n\nThe optimization approach focuses on efficient model execution and reducing inference overhead. Specific improvements—such as quantization, pruning, or sparse execution—should be described according to the techniques actually applied and measured in the project.\n\n## 2. Detection Post-Processing\n\nThe raw model output may contain multiple overlapping detections for the same defect.\n\nWe apply post-processing to:\n\n- Filter detections using confidence thresholds.\n- Remove overlapping duplicate bounding boxes using Non-Maximum Suppression (NMS).\n- Retain the final defect class, confidence score, and bounding-box coordinates.\n\nThe resulting detections are converted into structured defect events that can be consumed by downstream components.\n\n## 3. Asynchronous Data Logging\n\nThe pipeline records defect information in PostgreSQL for analysis and traceability.\n\nA defect event can include:\n\n- Defect class\n- Confidence score\n- Bounding-box coordinates\n- Frame or event timestamp\n- Image or frame reference\n- Processing latency\n\nDatabase logging is handled asynchronously so that the data persistence step does not unnecessarily block image processing.\n\nThis separates the inference workflow from event storage and makes the pipeline easier to monitor and evaluate.\n\n## 4. Multimodal Defect Triage Pipeline\n\nIn addition to detecting defects, we designed a downstream workflow to support the interpretation and handling of flagged packages.\n\nThe objective is to connect the visual defect information with relevant warehouse procedures and handling policies.\n\n### Policy Ingestion and Retrieval\n\nWarehouse Standard Operating Procedures (SOPs) and handling policies can be processed through a document ingestion pipeline:\n\n1. Extract text from the policy documents.\n2. Split the extracted text into smaller chunks.\n3. Generate embeddings for the chunks.\n4. Store the embeddings and metadata in a vector database.\n5. Retrieve relevant policy passages when a defect event requires further analysis.\n\nThe retrieved policy content provides contextual information for the downstream triage workflow.\n\n### Vision-Language Model Integration\n\nFor a flagged package, the detected defect region can be used as an image crop.\n\nThe defect crop and relevant retrieved policy passages can then be passed to a Vision-Language Model for further interpretation.\n\nThe workflow is intended to support tasks such as:\n\n- Summarizing the visible package damage.\n- Identifying relevant handling instructions.\n- Providing suggested next steps based on retrieved procedures.\n- Preparing a draft incident or carrier-claim summary for human review.\n\nThe model output is treated as decision support rather than an automatically verified insurance claim. The final action can be reviewed by an operator or downstream system.\n\n## 5. Pipeline Evaluation and Testbench\n\nSince the project focused on pipeline development rather than live conveyor deployment, we evaluated the software using image and video inputs.\n\nThe testbench supports:\n\n- Processing sample or simulated conveyor video frames.\n- Running preprocessing and model inference.\n- Displaying predicted bounding boxes and defect labels.\n- Recording detection outputs and processing metrics.\n- Reviewing defect events and pipeline behavior.\n\nThis allowed us to test the end-to-end software workflow and investigate model predictions without claiming that the system controlled physical sorting equipment in a live warehouse.\n\n## Summary\n\nThe project combines **Computer Vision, object detection, CPU inference optimization, post-processing, asynchronous data logging, and a downstream multimodal triage workflow**.\n\nThe YOLO-based detector identifies package conditions from image frames. The pipeline converts the detections into structured events, records them for analysis, and can connect flagged defects with relevant handling policies through retrieval and a Vision-Language Model.\n\nThe key engineering work was developing and evaluating the software pipeline from image ingestion through detection and downstream defect processing, rather than implementing physical camera hardware or live conveyor control.",
  "userExample": {
    "query": "Conveyor Line 04: Torn & Crushed Cardboard Parcel detected at 2.0 m/s",
    "latency": "22.4ms (Meets strict < 25ms Diverter Deadline)",
    "description": "Step-by-step flow showing how an overhead industrial camera spots a damaged parcel traveling at 2.0 m/s, runs DeepSparse CPU inference in 14ms, and pushes the box to a repair track before logging to local PostgreSQL.",
    "steps": [
      {
        "step": "01",
        "stage": "Sensor Trigger & Snapshot",
        "system": "Basler Industrial Camera",
        "text": "A light sensor detects the parcel entering the vision gate at 2.0 m/s; an overhead industrial camera instantly snaps a crisp, motion-blur-free 1080p photo in 2 milliseconds."
      },
      {
        "step": "02",
        "stage": "Fast Image Preparation",
        "system": "Edge Python Pipeline",
        "text": "The photo is resized to 640x640 with standard gray letterbox padding and converted into normalized pixel arrays in 1.8 milliseconds."
      },
      {
        "step": "03",
        "stage": "YOLO Detection on CPU",
        "system": "DeepSparse Engine (No GPU)",
        "text": "DeepSparse executes our pruned, 8-bit quantized YOLO model on the standard 8-core computer CPU in just 14.2 milliseconds, skipping zero weights without needing an expensive GPU."
      },
      {
        "step": "04",
        "stage": "Bounding Box & Confidence Check",
        "system": "Non-Maximum Suppression (NMS)",
        "text": "The algorithm removes overlapping proposals, pinpointing a severe 'Torn/Crushed Sidewall' defect with 94% confidence at coordinates [x: 184, y: 290, w: 256, h: 320]."
      },
      {
        "step": "05",
        "stage": "Mechanical Pusher Arm Fires",
        "system": "Pneumatic Diverter Gate",
        "text": "The computer sends an electrical trigger signal in 4 milliseconds; a pneumatic arm smoothly extends across the belt and pushes the damaged parcel onto the repair lane."
      },
      {
        "step": "06",
        "stage": "Local Database & Claim Draft",
        "system": "Local PostgreSQL & Vision AI",
        "text": "The scan record and defect image are saved to local PostgreSQL in under 1 millisecond. Simultaneously, Vision AI drafts an insurance claim letter for the carrier."
      }
    ],
    "sampleOutput": {
      "diverterAction": "DEFECT CONFIRMED: Torn & Crushed Carton Sidewall (94% confidence). Reaction Time: 22.4ms (within 25ms limit). Action: Pneumatic diverter arm pushed parcel onto Rework Lane 02 for manual repackaging.",
      "inspectionRecord": {
        "inspection_id": "INSP_8492_CONV04",
        "conveyor_line": "Line 04 (Speed: 2.0 m/s)",
        "defect_class": "Torn & Crushed Sidewall",
        "inference_latency": "14.2ms on standard CPU (DeepSparse)",
        "diverter_latency": "22.4ms total reaction (Under 25ms deadline)",
        "carrier_claim": "Claim #CLM_9421 drafted automatically via Vision AI",
        "database_status": "SAVED_IN_LOCAL_POSTGRESQL"
      }
    }
  },
  "bookmarkedConcepts": [
    {
      "id": "deepsparse",
      "title": "DeepSparse",
      "badge": "Fast CPU AI Engine",
      "summary": "A high-speed software engine from Neural Magic that runs AI models on normal computer CPUs at the same speed as expensive $8,000 GPUs.",
      "details": [
        "In Simple Terms: Warehouses are hot and dusty environments where fragile GPUs frequently overheat and fail. DeepSparse lets us run real-time YOLO on standard, rugged office CPUs without buying expensive graphics cards.",
        "How It Works: It takes advantage of pruned models. When 75% of a model's weights are zero, DeepSparse completely skips calculating those zeroes, running 4x faster on regular Intel or AMD CPUs.",
        "Interview Answer: 'DeepSparse cut our YOLO detection time from 65ms down to just 14 milliseconds on standard CPUs, meeting our 25ms reaction deadline while saving over $150,000 in GPU hardware.'"
      ],
      "codeFilename": "run_deepsparse.py",
      "code": "from deepsparse import Pipeline\n\n# Load pruned & quantized YOLOv8 running on standard commodity CPU\nyolo_pipeline = Pipeline.create(\n    task=\"yolo\",\n    model_path=\"zoo:cv/detection/yolov8-s/pytorch/ultralytics/coco/pruned65_quant-none\"\n)\n\n# High-speed 14ms inference on 8-core Intel CPU\noutputs = yolo_pipeline(images=[\"parcel_frame_01.jpg\"])\nboxes = outputs.boxes[0]  # [x1, y1, x2, y2, score, class_id]"
    },
    {
      "id": "docker",
      "title": "Docker",
      "badge": "Conveyor-Side Container",
      "summary": "Packages the entire camera capture code, AI model, and database into a lightweight container that runs identically on every conveyor computer.",
      "details": [
        "In Simple Terms: Each conveyor line has an industrial mini-PC. Docker ensures that camera drivers, Python packages, and AI runtimes start up automatically the second the conveyor is turned on.",
        "Works 100% Offline: Logistics facilities cannot stop if warehouse Wi-Fi blinks. The container runs completely locally on the industrial PC with zero cloud dependency.",
        "Interview Answer: 'Docker allows us to deploy identical, self-healing edge software across 20+ conveyor lines with automated boot-on-power and direct hardware camera access.'"
      ]
    },
    {
      "id": "fastapi",
      "title": "FastAPI",
      "badge": "Local Edge API & Dashboard",
      "summary": "A fast, lightweight Python backend that coordinates camera triggers, defect logging, and live operator screens.",
      "details": [
        "In Simple Terms: It acts as the local brain on the warehouse floor. It receives the camera photo, sends it to the AI, logs results to the local database, and updates the operator's screen.",
        "Non-Blocking Background Tasks: Writing defect records and saving high-res photos happens in the background, so the critical 14ms AI detection loop is never delayed.",
        "Interview Answer: 'FastAPI handles local camera coordination and live operator dashboard streaming asynchronously, guaranteeing that background logging never delays our 25ms diversion deadline.'"
      ],
      "codeFilename": "edge_api.py",
      "code": "from fastapi import FastAPI, BackgroundTasks\nimport time\n\napp = FastAPI(title=\"Edge Inspection Controller\")\n\ndef log_defect_async(image_path: str, coords: list):\n    # Non-blocking disk write & SQLite logging\n    time.sleep(0.05)\n\n@app.post(\"/trigger/camera\")\nasync def on_camera_trigger(bg_tasks: BackgroundTasks):\n    # 14ms synchronous inference step\n    defect_found, box = check_yolo_inference()\n    if defect_found:\n        fire_pneumatic_solenoid_valve()  # 4ms reaction\n        bg_tasks.add_task(log_defect_async, \"frame.jpg\", box)\n    return {\"status\": \"ok\", \"diverted\": defect_found}"
    },
    {
      "id": "gpt-vision",
      "title": "GPT-4o / LLaMA Vision",
      "badge": "Damage Claim Writer",
      "summary": "A smart Vision AI model that inspects photos of damaged parcels to automatically write insurance claims and packaging repair tickets in 1 second.",
      "details": [
        "In Simple Terms: While YOLO quickly spots the physical tear in 14ms, the Vision LLM reads the shipping label text, checks the damage severity, and drafts the insurance paperwork.",
        "Eliminating Manual Paperwork: Warehouse workers used to spend 15 minutes manually filling out carrier claim forms for crushed boxes. The Vision LLM automates the entire claim letter with photo evidence in 1 second.",
        "Interview Answer: 'We use YOLO for the real-time physical divert decision, and pass flagged defect photos asynchronously to a Vision LLM for automated insurance claim drafting.'"
      ]
    },
    {
      "id": "latency",
      "title": "Latency (Real-Time Edge Budget)",
      "badge": "Sub-25ms Reaction Deadline",
      "summary": "The strict physical time limit our system must hit to spot a damaged box and push it before it travels past the diverter arm.",
      "details": [
        "In Simple Terms: Parcels travel along the conveyor belt at 2.5 meters per second (that's 2.5 cm every 10 milliseconds!). If our AI takes even 100ms, the box has already zoomed past the diverter arm.",
        "The 24ms Stopwatch: Photo capture (2ms) + image resizing (2ms) + DeepSparse YOLO on CPU (14ms) + box cleanup (2ms) + diverter trigger (4ms) = 24 milliseconds total.",
        "Interview Answer: 'Conveyor belt physics dictates our latency: at 2.5 m/s, we must complete inference and trigger the pneumatic diverter in under 25ms to prevent parcel jams.'"
      ]
    },
    {
      "id": "postgresql-onprem",
      "title": "PostgreSQL (On-Premises)",
      "badge": "Local Defect Audit Trail",
      "summary": "A fast relational database running locally on the warehouse network to store defect records and photos with zero cloud dependence.",
      "details": [
        "In Simple Terms: It's the local black box recorder for the warehouse. It stores the date, time, conveyor line ID, defect type, and photo link for every single parcel.",
        "Protection Against False Claims: When a delivery carrier or customer claims 'you sent me a crushed box', our warehouse pulls the exact photo taken at the sorting facility proving the package was intact when handed over.",
        "Interview Answer: 'Hosting PostgreSQL on the local LAN guarantees zero dependency on cloud internet, logging defect evidence in under 1ms to defend against shipping liability claims.'"
      ]
    },
    {
      "id": "pruning",
      "title": "Pruning & Sparsity",
      "badge": "Model Slimming & 4x Speedup",
      "summary": "Removing 75% of unnecessary neural network calculations so our AI runs 4x faster on standard CPUs without losing accuracy.",
      "details": [
        "In Simple Terms: Neural networks are like students who study 1,000 pages when only 250 pages matter. Pruning removes the 750 useless pages so the AI can answer 4x faster without getting confused.",
        "Why Sparsity Matters: Normal software still multiplies by zeroes (wasting CPU cycles). DeepSparse recognizes zeroes and skips them entirely, doing 4x less computation.",
        "Interview Answer: 'By pruning 75% of weights and fine-tuning, we maintained a 94%+ defect detection rate while slashing CPU execution time from 65ms down to 14ms.'"
      ]
    },
    {
      "id": "yolo",
      "title": "YOLO (You Only Look Once)",
      "badge": "Single-Glance Defect Detector",
      "summary": "The industry-leading computer vision model that scans the entire parcel image in one single glance to locate and classify defects instantly.",
      "details": [
        "In Simple Terms: Older models examine an image in two slow steps: first searching for where objects might be, then identifying them. YOLO looks at the whole photo once and draws defect boxes in a single step.",
        "Trained for 4 Specific Parcel States: Fine-tuned on industrial warehouse photos to detect: 1. Crushed boxes, 2. Torn cardboard, 3. Open flaps, and 4. Clean, intact cartons.",
        "Interview Answer: 'YOLO provides the single-stage detection speed required for conveyor belts, reliably identifying small tears and crushed corners even under motion blur and uneven lighting.'"
      ]
    }
  ],
  "executiveSections": [
    {
      "id": "overview",
      "title": "Project Overview",
      "badge": "Logistics Defect Detection • Computer Vision Pipeline",
      "accentColor": "text-amber-400",
      "bgBadge": "bg-amber-950/70 text-amber-300 border-amber-800/60",
      "paragraphs": [
        "We developed a Computer Vision inspection pipeline for a logistics distribution center handling a high volume of packages across automated sorting lines.",
        "The main challenge was identifying damaged parcels, open cartons, and missing shipping labels quickly and consistently. Manual inspection can be difficult at high throughput, and defects that go undetected may lead to damaged merchandise, sorting issues, and carrier disputes.",
        "Our goal was to build a software pipeline that processes package images or video frames, detects defects using a YOLO-based object detection model, and generates structured defect events for downstream processing.",
        "**Our work focused on the AI and data pipeline, model inference, and pipeline evaluation. We did not implement a live physical conveyor deployment.**"
      ]
    },
    {
      "id": "cv-pipeline",
      "title": "1. Computer Vision Pipeline",
      "badge": "OpenCV • Letterbox Padding • YOLO Detection • ONNX & DeepSparse CPU",
      "accentColor": "text-cyan-400",
      "bgBadge": "bg-cyan-950/70 text-cyan-300 border-cyan-800/60",
      "paragraphs": [
        "The pipeline processes each input frame through a sequence of stages:\n\n**Frame ingestion → preprocessing → model inference → post-processing → defect event generation → asynchronous data logging**",
        "### Frame Ingestion and Preprocessing\n\nWe use OpenCV and NumPy to ingest image frames or video samples and prepare them for model inference.\n\nThe preprocessing stage includes:\n- Resizing images to the model’s expected input dimensions.\n- Preserving the image aspect ratio using letterbox resizing and padding.\n- Converting image data into the required tensor format.\n- Normalizing pixel values before passing the input to the model.\n\nThis ensures that incoming frames follow a consistent format and can be processed by the detection model.",
        "### YOLO-Based Defect Detection\n\nWe use a YOLO-based object detection model because it performs object localization and classification in a single forward pass.\n\nThe model identifies four package conditions:\n1. **Intact:** Normal package condition.\n2. **Torn or damaged:** Crushed cartons, punctures, or visible tears.\n3. **Open:** Unsealed flaps or open packaging.\n4. **Missing label:** Package without a visible shipping label.\n\nFor each detection, the model produces a predicted class, confidence score, and bounding-box coordinates.\n\nThe bounding boxes help identify where the detected condition appears within the package image.",
        "### CPU Inference Optimization\n\nThe pipeline is designed to support CPU-based inference without requiring a dedicated GPU for every processing environment.\n\nThe model can be exported to ONNX and executed using a compatible CPU inference runtime such as DeepSparse. This provides an optimized inference path for CPU-based environments.\n\nThe optimization approach focuses on efficient model execution and reducing inference overhead. Specific improvements—such as quantization, pruning, or sparse execution—should be described according to the techniques actually applied and measured in the project."
      ]
    },
    {
      "id": "post-processing",
      "title": "2. Detection Post-Processing",
      "badge": "Confidence Thresholding • Non-Maximum Suppression (NMS)",
      "accentColor": "text-emerald-400",
      "bgBadge": "bg-emerald-950/70 text-emerald-300 border-emerald-800/60",
      "paragraphs": [
        "The raw model output may contain multiple overlapping detections for the same defect.",
        "We apply post-processing to:\n- Filter detections using confidence thresholds.\n- Remove overlapping duplicate bounding boxes using Non-Maximum Suppression (NMS).\n- Retain the final defect class, confidence score, and bounding-box coordinates.",
        "The resulting detections are converted into structured defect events that can be consumed by downstream components."
      ]
    },
    {
      "id": "async-logging",
      "title": "3. Asynchronous Data Logging",
      "badge": "Non-Blocking PostgreSQL Persistence • Event Traceability",
      "accentColor": "text-blue-400",
      "bgBadge": "bg-blue-950/70 text-blue-300 border-blue-800/60",
      "paragraphs": [
        "The pipeline records defect information in PostgreSQL for analysis and traceability.",
        "A defect event can include:\n- Defect class\n- Confidence score\n- Bounding-box coordinates\n- Frame or event timestamp\n- Image or frame reference\n- Processing latency",
        "Database logging is handled asynchronously so that the data persistence step does not unnecessarily block image processing.",
        "This separates the inference workflow from event storage and makes the pipeline easier to monitor and evaluate."
      ]
    },
    {
      "id": "multimodal-triage",
      "title": "4. Multimodal Defect Triage Pipeline",
      "badge": "SOP Ingestion • Vector DB Retrieval • Vision-Language Model",
      "accentColor": "text-purple-400",
      "bgBadge": "bg-purple-950/70 text-purple-300 border-purple-800/60",
      "paragraphs": [
        "In addition to detecting defects, we designed a downstream workflow to support the interpretation and handling of flagged packages.",
        "The objective is to connect the visual defect information with relevant warehouse procedures and handling policies.",
        "### Policy Ingestion and Retrieval\n\nWarehouse Standard Operating Procedures (SOPs) and handling policies can be processed through a document ingestion pipeline:\n1. Extract text from the policy documents.\n2. Split the extracted text into smaller chunks.\n3. Generate embeddings for the chunks.\n4. Store the embeddings and metadata in a vector database.\n5. Retrieve relevant policy passages when a defect event requires further analysis.\n\nThe retrieved policy content provides contextual information for the downstream triage workflow.",
        "### Vision-Language Model Integration\n\nFor a flagged package, the detected defect region can be used as an image crop.\n\nThe defect crop and relevant retrieved policy passages can then be passed to a Vision-Language Model for further interpretation.\n\nThe workflow is intended to support tasks such as:\n- Summarizing the visible package damage.\n- Identifying relevant handling instructions.\n- Providing suggested next steps based on retrieved procedures.\n- Preparing a draft incident or carrier-claim summary for human review.\n\nThe model output is treated as decision support rather than an automatically verified insurance claim. The final action can be reviewed by an operator or downstream system."
      ]
    },
    {
      "id": "evaluation-testbench",
      "title": "5. Pipeline Evaluation and Testbench",
      "badge": "Simulated Conveyor Frames • Metric Tracking • Software Verification",
      "accentColor": "text-teal-400",
      "bgBadge": "bg-teal-950/70 text-teal-300 border-teal-800/60",
      "paragraphs": [
        "Since the project focused on pipeline development rather than live conveyor deployment, we evaluated the software using image and video inputs.",
        "The testbench supports:\n- Processing sample or simulated conveyor video frames.\n- Running preprocessing and model inference.\n- Displaying predicted bounding boxes and defect labels.\n- Recording detection outputs and processing metrics.\n- Reviewing defect events and pipeline behavior.",
        "This allowed us to test the end-to-end software workflow and investigate model predictions without claiming that the system controlled physical sorting equipment in a live warehouse."
      ]
    },
    {
      "id": "summary",
      "title": "Summary",
      "badge": "Computer Vision • CPU Optimization • Multimodal Triage",
      "accentColor": "text-indigo-400",
      "bgBadge": "bg-indigo-950/70 text-indigo-300 border-indigo-800/60",
      "paragraphs": [
        "The project combines **Computer Vision, object detection, CPU inference optimization, post-processing, asynchronous data logging, and a downstream multimodal triage workflow**.",
        "The YOLO-based detector identifies package conditions from image frames. The pipeline converts the detections into structured events, records them for analysis, and can connect flagged defects with relevant handling policies through retrieval and a Vision-Language Model.",
        "The key engineering work was developing and evaluating the software pipeline from image ingestion through detection and downstream defect processing, rather than implementing physical camera hardware or live conveyor control."
      ]
    }
  ]
};
