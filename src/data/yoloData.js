export const yoloData = {
  title: "Real-Time Computer Vision Pipeline | Edge Conveyor Defect Inspection",
  resumeBullet: "Architected and deployed a real-time computer vision system for parcel defect detection on high-speed conveyor belts using YOLO, DeepSparse CPU inference, Docker, and on-premises PostgreSQL, achieving 24ms reaction times and zero edge GPU dependency.",

  executiveScript: `We built this automated Computer Vision inspection system for our client, a logistics distribution center sorting over 8,000 packages an hour across automated high-speed conveyor belts.

The main problem was package damage and conveyor jams. Parcels travel along belts at 2.0 to 2.5 meters per second (about 8 to 9 km/h). Boxes frequently get crushed, tape pops open, and shipping labels tear off. Human workers physically cannot inspect boxes moving that fast—eye fatigue caused damaged boxes to slip through, leading to belt jams, damaged merchandise, and expensive carrier damage disputes. So, we built an automated vision inspection gate that spots defective parcels and pushes them onto a side repair lane in under 25 milliseconds.

We keep our architecture simple and completely offline across three components:
• 1. High-Speed Overhead Camera: An industrial GigE camera mounted above the conveyor captures a sharp 1080p photo the moment a package enters the vision gate.
• 2. Edge Industrial PC (IPC): A rugged, fanless computer running our pruned and quantized YOLO model inside a lightweight Docker container, powered by Neural Magic's DeepSparse CPU engine.
• 3. On-Premises PostgreSQL Database: Runs locally on the warehouse LAN to store defect coordinates, timestamps, and camera image paths with sub-millisecond speed—100% offline, so sorting never stops if warehouse internet drops.

Here is how the AI and detection flow works in simple terms:
• Single-Stage YOLO Detection: We chose YOLO because it looks at the whole box once and predicts defects in a single pass. Older two-stage models (like Faster R-CNN) take 80 to 120ms—at belt speed, the box would travel 25 cm past the diverter arm before the AI even finished thinking!
• Training on 4 Core Defects: We trained our detector on 4 practical warehouse classes: 1. Intact normal box, 2. Torn or crushed carton, 3. Open or unsealed flaps, and 4. Missing shipping label.
• Why CPU Instead of GPUs (DeepSparse): Warehouses are dusty and hot. Putting delicate $8,000 GPUs on 20 sorting belts would cost over $150,000 and require constant maintenance. Instead, we pruned our model (cutting out 75% of redundant weights) and used DeepSparse. DeepSparse runs on regular computer CPUs and skips zero weights, slashing inference time from 65ms down to just 14 milliseconds!
• The 25ms Reaction Stopwatch: From the instant the camera clicks (2ms), images are resized (2ms), YOLO detects defects on CPU (14ms), and we filter bounding boxes (2ms), it takes just 20ms. In the remaining 4ms, the computer sends an electrical signal to extend a pneumatic pusher arm that safely slides the damaged carton onto a repair lane.
• Automated Insurance Claims (Vision AI): When a damaged box is diverted, our multimodal pipeline sends the defect photo to a Vision LLM (like GPT-4o or local LLaMA Vision). The model reads the shipping label, assesses the damage against company packaging rules, and instantly writes a draft insurance claim letter to recover costs from the shipping carrier.

On the Floor Operator Dashboard:
• Warehouse supervisors see a live 60fps feed of passing parcels with clear green boxes (healthy cartons) and red boxes (diverted defects).
• Sorting counts, defect percentages, and conveyor line metrics update in real time with zero lag.

Future & In-Progress R&D:
• We are training lightweight keypoint detectors to measure carton dimensional bulge in 3D, and deploying edge audio sensors to detect the distinct sound of cardboard tearing before visible rips appear.`,

  userExample: {
    query: "Conveyor Line 04: Torn & Crushed Cardboard Parcel detected at 2.0 m/s",
    latency: "22.4ms (Meets strict < 25ms Diverter Deadline)",
    description: "Step-by-step flow showing how an overhead industrial camera spots a damaged parcel traveling at 2.0 m/s, runs DeepSparse CPU inference in 14ms, and pushes the box to a repair track before logging to local PostgreSQL.",
    steps: [
      {
        step: "01",
        stage: "Sensor Trigger & Snapshot",
        system: "Basler Industrial Camera",
        text: "A light sensor detects the parcel entering the vision gate at 2.0 m/s; an overhead industrial camera instantly snaps a crisp, motion-blur-free 1080p photo in 2 milliseconds."
      },
      {
        step: "02",
        stage: "Fast Image Preparation",
        system: "Edge Python Pipeline",
        text: "The photo is resized to 640x640 with standard gray letterbox padding and converted into normalized pixel arrays in 1.8 milliseconds."
      },
      {
        step: "03",
        stage: "YOLO Detection on CPU",
        system: "DeepSparse Engine (No GPU)",
        text: "DeepSparse executes our pruned, 8-bit quantized YOLO model on the standard 8-core computer CPU in just 14.2 milliseconds, skipping zero weights without needing an expensive GPU."
      },
      {
        step: "04",
        stage: "Bounding Box & Confidence Check",
        system: "Non-Maximum Suppression (NMS)",
        text: "The algorithm removes overlapping proposals, pinpointing a severe 'Torn/Crushed Sidewall' defect with 94% confidence at coordinates [x: 184, y: 290, w: 256, h: 320]."
      },
      {
        step: "05",
        stage: "Mechanical Pusher Arm Fires",
        system: "Pneumatic Diverter Gate",
        text: "The computer sends an electrical trigger signal in 4 milliseconds; a pneumatic arm smoothly extends across the belt and pushes the damaged parcel onto the repair lane."
      },
      {
        step: "06",
        stage: "Local Database & Claim Draft",
        system: "Local PostgreSQL & Vision AI",
        text: "The scan record and defect image are saved to local PostgreSQL in under 1 millisecond. Simultaneously, Vision AI drafts an insurance claim letter for the carrier."
      }
    ],
    sampleOutput: {
      diverterAction: "DEFECT CONFIRMED: Torn & Crushed Carton Sidewall (94% confidence). Reaction Time: 22.4ms (within 25ms limit). Action: Pneumatic diverter arm pushed parcel onto Rework Lane 02 for manual repackaging.",
      inspectionRecord: {
        inspection_id: "INSP_8492_CONV04",
        conveyor_line: "Line 04 (Speed: 2.0 m/s)",
        defect_class: "Torn & Crushed Sidewall",
        inference_latency: "14.2ms on standard CPU (DeepSparse)",
        diverter_latency: "22.4ms total reaction (Under 25ms deadline)",
        carrier_claim: "Claim #CLM_9421 drafted automatically via Vision AI",
        database_status: "SAVED_IN_LOCAL_POSTGRESQL"
      }
    }
  },

  bookmarkedConcepts: [
    {
      id: "deepsparse",
      title: "DeepSparse",
      badge: "Fast CPU AI Engine",
      summary: "A high-speed software engine from Neural Magic that runs AI models on normal computer CPUs at the same speed as expensive $8,000 GPUs.",
      details: [
        "In Simple Terms: Warehouses are hot and dusty environments where fragile GPUs frequently overheat and fail. DeepSparse lets us run real-time YOLO on standard, rugged office CPUs without buying expensive graphics cards.",
        "How It Works: It takes advantage of pruned models. When 75% of a model's weights are zero, DeepSparse completely skips calculating those zeroes, running 4x faster on regular Intel or AMD CPUs.",
        "Interview Answer: 'DeepSparse cut our YOLO detection time from 65ms down to just 14 milliseconds on standard CPUs, meeting our 25ms reaction deadline while saving over $150,000 in GPU hardware.'"
      ]
    },
    {
      id: "docker",
      title: "Docker",
      badge: "Conveyor-Side Container",
      summary: "Packages the entire camera capture code, AI model, and database into a lightweight container that runs identically on every conveyor computer.",
      details: [
        "In Simple Terms: Each conveyor line has an industrial mini-PC. Docker ensures that camera drivers, Python packages, and AI runtimes start up automatically the second the conveyor is turned on.",
        "Works 100% Offline: Logistics facilities cannot stop if warehouse Wi-Fi blinks. The container runs completely locally on the industrial PC with zero cloud dependency.",
        "Interview Answer: 'Docker allows us to deploy identical, self-healing edge software across 20+ conveyor lines with automated boot-on-power and direct hardware camera access.'"
      ]
    },
    {
      id: "fastapi",
      title: "FastAPI",
      badge: "Local Edge API & Dashboard",
      summary: "A fast, lightweight Python backend that coordinates camera triggers, defect logging, and live operator screens.",
      details: [
        "In Simple Terms: It acts as the local brain on the warehouse floor. It receives the camera photo, sends it to the AI, logs results to the local database, and updates the operator's screen.",
        "Non-Blocking Background Tasks: Writing defect records and saving high-res photos happens in the background, so the critical 14ms AI detection loop is never delayed.",
        "Interview Answer: 'FastAPI handles local camera coordination and live operator dashboard streaming asynchronously, guaranteeing that background logging never delays our 25ms diversion deadline.'"
      ]
    },
    {
      id: "gpt-vision",
      title: "GPT-4o / LLaMA Vision",
      badge: "Damage Claim Writer",
      summary: "A smart Vision AI model that inspects photos of damaged parcels to automatically write insurance claims and packaging repair tickets in 1 second.",
      details: [
        "In Simple Terms: While YOLO quickly spots the physical tear in 14ms, the Vision LLM reads the shipping label text, checks the damage severity, and drafts the insurance paperwork.",
        "Eliminating Manual Paperwork: Warehouse workers used to spend 15 minutes manually filling out carrier claim forms for crushed boxes. The Vision LLM automates the entire claim letter with photo evidence in 1 second.",
        "Interview Answer: 'We use YOLO for the real-time physical divert decision, and pass flagged defect photos asynchronously to a Vision LLM for automated insurance claim drafting.'"
      ]
    },
    {
      id: "latency",
      title: "Latency (Real-Time Edge Budget)",
      badge: "Sub-25ms Reaction Deadline",
      summary: "The strict physical time limit our system must hit to spot a damaged box and push it before it travels past the diverter arm.",
      details: [
        "In Simple Terms: Parcels travel along the conveyor belt at 2.5 meters per second (that's 2.5 cm every 10 milliseconds!). If our AI takes even 100ms, the box has already zoomed past the diverter arm.",
        "The 24ms Stopwatch: Photo capture (2ms) + image resizing (2ms) + DeepSparse YOLO on CPU (14ms) + box cleanup (2ms) + diverter trigger (4ms) = 24 milliseconds total.",
        "Interview Answer: 'Conveyor belt physics dictates our latency: at 2.5 m/s, we must complete inference and trigger the pneumatic diverter in under 25ms to prevent parcel jams.'"
      ]
    },
    {
      id: "postgresql-onprem",
      title: "PostgreSQL (On-Premises)",
      badge: "Local Defect Audit Trail",
      summary: "A fast relational database running locally on the warehouse network to store defect records and photos with zero cloud dependence.",
      details: [
        "In Simple Terms: It's the local black box recorder for the warehouse. It stores the date, time, conveyor line ID, defect type, and photo link for every single parcel.",
        "Protection Against False Claims: When a delivery carrier or customer claims 'you sent me a crushed box', our warehouse pulls the exact photo taken at the sorting facility proving the package was intact when handed over.",
        "Interview Answer: 'Hosting PostgreSQL on the local LAN guarantees zero dependency on cloud internet, logging defect evidence in under 1ms to defend against shipping liability claims.'"
      ]
    },
    {
      id: "pruning",
      title: "Pruning & Sparsity",
      badge: "Model Slimming & 4x Speedup",
      summary: "Removing 75% of unnecessary neural network calculations so our AI runs 4x faster on standard CPUs without losing accuracy.",
      details: [
        "In Simple Terms: Neural networks are like students who study 1,000 pages when only 250 pages matter. Pruning removes the 750 useless pages so the AI can answer 4x faster without getting confused.",
        "Why Sparsity Matters: Normal software still multiplies by zeroes (wasting CPU cycles). DeepSparse recognizes zeroes and skips them entirely, doing 4x less computation.",
        "Interview Answer: 'By pruning 75% of weights and fine-tuning, we maintained a 94%+ defect detection rate while slashing CPU execution time from 65ms down to 14ms.'"
      ]
    },
    {
      id: "yolo",
      title: "YOLO (You Only Look Once)",
      badge: "Single-Glance Defect Detector",
      summary: "The industry-leading computer vision model that scans the entire parcel image in one single glance to locate and classify defects instantly.",
      details: [
        "In Simple Terms: Older models examine an image in two slow steps: first searching for where objects might be, then identifying them. YOLO looks at the whole photo once and draws defect boxes in a single step.",
        "Trained for 4 Specific Parcel States: Fine-tuned on industrial warehouse photos to detect: 1. Crushed boxes, 2. Torn cardboard, 3. Open flaps, and 4. Clean, intact cartons.",
        "Interview Answer: 'YOLO provides the single-stage detection speed required for conveyor belts, reliably identifying small tears and crushed corners even under motion blur and uneven lighting.'"
      ]
    }
  ]
};
