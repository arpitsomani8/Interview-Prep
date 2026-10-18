export const fashionData = {
  title: "Fashion AI Copilot | Agentic Multimodal Design Platform",
  resumeBullet: "Architected and led development of an Agentic AI platform enabling multimodal fashion design search using image, text, and hybrid retrieval powered by Azure AI Vision, Azure OpenAI, embeddings, and vector databases.",
  
  overviewSteps: [
    {
      id: "portal",
      title: "1. Portal Access & Retailer Onboarding Flow",
      points: [
        { label: "Public Browsing", text: "The web portal is publicly accessible with no upfront login barrier so retailers can immediately explore the 10,000+ garment catalog." },
        { label: "Instant Checkout (Pre-Registered)", text: "The retailer enters their business email and receives an OTP. If their email is found in our PostgreSQL retailers table, the wholesale order is confirmed immediately into the orders table." },
        { label: "New / Unregistered Retailers", text: "If the email is new, instant checkout is held to prevent unverified orders. The portal captures company name, contact person, mobile number, and delivery address. Our onboarding operations team calls them, verifies their business credentials, and activates their account so their order moves forward." },
        { label: "Custom Design Request Flow", text: "If no existing design fits, the retailer can submit their own reference photo/sketch or write a text description (e.g., 'Oversized lilac hoodie in 350gsm fleece'), which routes into our generative design pipeline." }
      ]
    },
    {
      id: "ui_ranking",
      title: "2. UI Performance: Top-K Vector Retrieval & 25-Item Lazy Loading",
      points: [
        { label: "Top-K Vector Retrieval", text: "When a retailer searches using text, image, or hybrid query, the vector similarity engine evaluates the 10,000+ item catalog and retrieves the Top-K most relevant candidate garment matches based on cosine similarity." },
        { label: "25-Item Lazy Loading", text: "We do not dump thousands of images into the DOM at once (which would cause massive network lag and crash browser memory). The API delivers results in pages of 25 (limit=25, offset=0). As the user scrolls, lazy loading / pagination fetches subsequent batches with HTML5 loading='lazy'." }
      ]
    },
    {
      id: "database_reality",
      title: "3. Relational Storage & Azure Blob Architecture",
      points: [
        { label: "PostgreSQL Production Database", text: "PostgreSQL stores catalog attributes, live inventory, retailer profiles, and confirmed orders." },
        { label: "Azure Blob Storage & CDN", text: "Stores 10,000+ raw high-resolution garment images served globally via Azure CDN for sub-second image delivery." },
        { label: "Vector Database", text: "Stores 1024-dimensional multimodal float vectors indexed with HNSW for sub-10ms nearest-neighbor similarity search." }
      ]
    },
    {
      id: "chunking",
      title: "4. The Chunking Decision (Zero Chunking for Garment Summaries)",
      points: [
        { label: "Product Descriptions (NO CHUNKING)", text: "Each catalog description is an atomic 50–80 word summary. Chunking it would cut attributes in half (separating color from size and fabric). The entire description is embedded as one atomic document vector." },
        { label: "Trend Intelligence Reports", text: "Chunking was only applied for the trend intelligence agent, where 15-page fashion trend PDFs and catwalk reviews were split using recursive token splitters (chunk_size=500, overlap=50)." }
      ]
    },
    {
      id: "embeddings",
      title: "5. Multimodal Embeddings: Azure AI Vision (1024-Dimensional)",
      points: [
        { label: "Azure AI Vision Multimodal API", text: "Generates 1024-dimensional multimodal embeddings in a shared metric space for both text and visual images." },
        { label: "L2-Normalization", text: "All vectors are L2-normalized (unit magnitude). When magnitude is 1.0, Cosine Similarity simplifies mathematically to a fast Dot Product." },
        { label: "Late Vector Fusion", text: "For hybrid queries (reference image + descriptive text modification), vectors are fused: e_hybrid = 0.65 * e_text + 0.35 * e_image." }
      ]
    },
    {
      id: "rag_gpt4o",
      title: "6. In-Context Multimodal RAG with Azure OpenAI (GPT-4o)",
      points: [
        { label: "Why No Fine-Tuning", text: "Fine-tuning an LLM on 10,000 dynamic products causes stale weights and hallucinations when inventory changes. Multimodal RAG provides real-time ground truth." },
        { label: "Execution Flow", text: "The Vector DB retrieves Top-K IDs, PostgreSQL hydrates live fabric, GSM, and size specs, and Azure OpenAI GPT-4o provides grounded design recommendations." }
      ]
    },
    {
      id: "generative",
      title: "7. Custom Requests & Generative Pipeline (SDXL + ControlNet)",
      points: [
        { label: "Sketch-to-Garment", text: "Stable Diffusion XL combined with ControlNet (Canny edge detection) transforms rough designer hand sketches into photorealistic garments." },
        { label: "Fabric Inpainting", text: "Segment Anything (SAM) isolates the garment mask, and SDXL inpainting swaps fabric textures and patterns while keeping the model pose and background intact." }
      ]
    },
    {
      id: "deployment",
      title: "8. Production Deployment & API Architecture",
      points: [
        { label: "Model Services", text: "Azure AI Vision (serverless API for 1024-d embeddings), Azure OpenAI (managed gpt-4o deployment), and SDXL (Azure Machine Learning Online Endpoint with an NVIDIA GPU)." },
        { label: "Application Backend", text: "Dockerized FastAPI backend & web UI deployed on Azure App Service, connecting to PostgreSQL and reading media from Azure Blob Storage." }
      ]
    },
    {
      id: "ocr_feature",
      title: "9. In-Progress Feature: Azure AI Vision OCR (Graphic Text Recognition)",
      points: [
        { label: "The Graphic Garment Challenge", text: "Graphic t-shirts and hoodies have printed slogans, typography, or city names (e.g., 'NEW YORK 1985' or 'VINTAGE ATHLETIC'). Visual embeddings alone often miss the exact printed words." },
        { label: "Current Working Implementation", text: "We are actively integrating Azure AI Vision OCR (Read API) as an ongoing enhancement to read printed typography on garments, storing extracted text in PostgreSQL (printed_graphic_text) and indexing it so buyers can search for exact phrases alongside visual styles." }
      ]
    }
  ],

  executiveScript: `This was an enterprise AI solution we developed for our client, a regional garment manufacturer managing a catalog of over 10,000+ garment design samples across shirts, t-shirts, pants, and outerwear.

The core business challenge was that whenever a retailer or buyer requested specific styles, our client's sales team had to manually hunt through thousands of image folders for matching designs and exchange back-and-forth emails with PDF lookbooks to see if they fit the buyer's needs. When multiple retailers were in line requesting dozens of different styles, this manual cycle was extremely slow, labor-intensive, and bottlenecked wholesale order closures.

To streamline this, we engineered Fashion AI Copilot—an agentic multimodal design and retrieval platform that allows retailers to self-serve and instantly search the entire 10,000+ sample archive using natural language descriptions, reference photos, or hybrid queries (image + text modifiers). When buyers find their target styles, they select bulk quantities across S, M, L, and XL sizes and checkout with email OTP verification. If they are a verified retailer in PostgreSQL, their wholesale order is confirmed directly into the orders table. For new buyers, their lead is logged for the onboarding team to verify credentials before order fulfillment. If no off-the-shelf design matches their vision, they can submit a custom design request.

On the technical architecture:
• Relational data—including catalog specs, retailer credentials, and orders—is managed in PostgreSQL, while raw garment images are served via Azure Blob Storage and Azure CDN.
• We used Azure AI Vision to generate 1024-dimensional multimodal embeddings in a shared metric space for both text and images.
• We deliberately avoided chunking garment descriptions because splitting 50-word summaries breaks entity relationships like color, silhouette, and fabric.
• For search execution, our vector similarity engine performs Top-K vector retrieval across the entire catalog. To preserve front-end performance, the UI paginates the Top-K results by loading the first 25 items and lazily rendering the rest as the user scrolls.
• For custom design inquiries, our generative pipeline utilizes Stable Diffusion XL with ControlNet for sketch-to-garment rendering and fabric inpainting.
• As an ongoing enhancement we are actively working on: we are integrating Azure AI Vision OCR to read printed slogans and typography on graphic t-shirts and hoodies, indexing the extracted text so retailers can search for exact phrases alongside visual styles.`,

  deepDives: [
    {
      id: "deep-rag",
      term: "Multimodal RAG Architecture",
      summary: "In-Context Multimodal Retrieval-Augmented Generation connecting PostgreSQL, Vector DB, and Azure OpenAI GPT-4o.",
      details: [
        "Why No Fine-Tuning: Modifying model weights for 10,000+ dynamic products causes stale data when stock or prices change. RAG decouples knowledge retrieval from reasoning, guaranteeing zero hallucinations.",
        "Ingestion: Pre-computes 1024-d embeddings via Azure AI Vision vectorizeImage for all 10,000+ images and stores them in HNSW Vector DB.",
        "Top-K Retrieval: At query time, evaluates query vectors and retrieves Top-K candidate product IDs based on cosine similarity.",
        "Hydration: Executes SQL query against PostgreSQL to pull live inventory, available sizes, fabric GSM, and CDN image URLs.",
        "Prompt Payload: Passes JSON specs and image CDN URLs directly into GPT-4o chat completion endpoint for grounded design assessments."
      ]
    },
    {
      id: "deep-embeddings",
      term: "Dual-Encoder Embeddings & Shared Metric Space",
      summary: "Mapping text and visual pixels into an identical 1024-dimensional unit hypersphere.",
      details: [
        "Dual-Encoder Architecture: Two separate neural towers—a Vision Transformer (ViT) for images and a Transformer for text—projecting into a common 1024-d vector space.",
        "Contrastive Alignment: Trained contrastively to align visual concepts and semantic text descriptions into the same coordinate space.",
        "L2-Normalization: Every vector is strictly normalized (v / ||v||_2 = 1.0). When magnitude is 1.0, Cosine Similarity is mathematically identical to a hardware-accelerated Dot Product.",
        "Late Vector Fusion: e_hybrid = alpha * e_text + (1 - alpha) * e_image (with alpha=0.65 to let text steer color/fabric while keeping the visual silhouette intact)."
      ]
    },
    {
      id: "deep-generative",
      term: "Generative AI: ControlNet, SDXL & SAM",
      summary: "Generative pipeline for sketch-to-garment synthesis and fabric replacement.",
      details: [
        "ControlNet Sketch-to-Garment: Uses Canny edge detection to lock garment outlines and necklines from rough hand drawings, while SDXL paints realistic fabric textures and drape.",
        "SAM Fabric Inpainting: Segment Anything Model (SAM) produces a zero-shot binary mask over the garment. SDXL Inpainting resynthesizes target fabric without altering the human model's pose, face, skin, or background."
      ]
    },
    {
      id: "deep-ocr",
      term: "In-Progress Feature: Azure AI Vision OCR (Read API)",
      summary: "Active R&D implementation for optical text recognition for slogan, quote, and typography extraction on apparel.",
      details: [
        "The Graphic Garment Blind Spot: Standard visual embeddings recognize a 'black cotton t-shirt', but miss printed alphanumeric text like 'NEW YORK 1985' or 'VINTAGE ATHLETIC CLUB'.",
        "Pipeline Integration: Active engineering phase where garment images pass through Azure AI Vision OCR to extract printed text.",
        "Database Storage: Extracted text is stored in PostgreSQL as printed_graphic_text and appended to the searchable description string before vectorization.",
        "Query Matching: Enables exact keyword and typography searches combined with visual silhouette matching."
      ]
    }
  ]
};
