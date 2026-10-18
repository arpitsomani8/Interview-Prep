export const fashionData = {
  title: "Fashion AI Copilot | Agentic Multimodal Design Platform",
  resumeBullet: "Architected and led development of an Agentic AI platform enabling multimodal fashion design search using image, text, and hybrid retrieval powered by Azure AI Vision, Azure OpenAI, embeddings, and vector databases.",
  
  overviewSteps: [
    {
      id: "problem",
      title: "1. The Core Business Problem (Why We Built This)",
      points: [
        { label: "100,000+ Garment Catalog", text: "The company owned a massive collection of 100,000+ garment design images (shirts, t-shirts, jeans, trousers, jackets) across men's, women's, and unisex lines." },
        { label: "Reason 1 (Internal Search Inefficiency)", text: "Designers and merchandising teams couldn't quickly tell if a design already existed. People manually browsed folders or guessed filenames, leading to style duplication and lost time." },
        { label: "Reason 2 (The Retailer Ordering Bottleneck)", text: "Our sales team spent weeks manually emailing PDF lookbooks back and forth with retailers to take wholesale orders. We built this platform so retailers can self-serve: browse designs, select bulk quantities across S, M, L, and XL sizes, and place orders directly into our database." }
      ]
    },
    {
      id: "portal",
      title: "2. Portal Access & Retailer Onboarding Flow",
      points: [
        { label: "Public Browsing", text: "The website is publicly accessible—no upfront login barrier so retailers can immediately explore designs." },
        { label: "Instant Checkout (Pre-Registered)", text: "The retailer enters their email and receives an OTP. If their email is found in our PostgreSQL database retailers table, the order is confirmed immediately and written to the orders table." },
        { label: "New / Unregistered Retailers", text: "If the email is new, instant checkout is held to prevent fake orders. The portal logs their company name, contact person, mobile number, and delivery address. Our onboarding operations team calls them, verifies their business credentials, and activates their account so their order moves forward." },
        { label: "Custom Design Request Flow", text: "If no existing design fits, the retailer can submit their own reference photo/sketch or write a text description (e.g., 'Oversized lilac hoodie in 350gsm fleece'), which routes into our generative pipeline." }
      ]
    },
    {
      id: "ui_ranking",
      title: "3. UI Performance: Full Re-Ranking + 25-Item Lazy Loading",
      points: [
        { label: "Full Catalog Ranking", text: "When a retailer searches, the vector similarity engine scores and sorts all 100,000 designs from highest relevance to lowest relevance." },
        { label: "First 25 + Lazy Loading", text: "We do not dump 10,000 images into the DOM at once (that would cause massive network lag and crash browser memory). The API delivers results in pages of 25 (limit=25, offset=0). As the user scrolls, lazy loading / pagination fetches subsequent batches (offset=25, 50...) with HTML5 loading='lazy'." },
        { label: "Top-K for Azure OpenAI (GPT-4o)", text: "Only the Top-3 to 5 closest matches are passed into Multimodal RAG with Azure OpenAI (GPT-4o) for conversational styling critique and fabric comparisons, keeping token costs low and latency under 1 second." }
      ]
    },
    {
      id: "database_reality",
      title: "4. The Database Reality (No Migration to Azure)",
      points: [
        { label: "Existing PostgreSQL Server", text: "We did not migrate our relational data to Azure. Our existing production PostgreSQL server remained on its dedicated infrastructure holding catalog attributes, inventory, retailers, and orders. The Python backend on Azure connects securely over a VPN / IP whitelist." },
        { label: "Azure Blob Storage", text: "Holds the 100,000+ raw high-resolution garment images served via Azure CDN." },
        { label: "Vector DB", text: "Holds 512-dimensional float vectors linked by product_id for fast cosine similarity search." }
      ]
    },
    {
      id: "chunking",
      title: "5. The Chunking Decision",
      points: [
        { label: "Product Descriptions (NO CHUNKING)", text: "Each catalog description is an atomic 50–80 word summary. Chunking it would cut attributes in half (separating color from size and fabric). The entire description is embedded as one atomic document vector." },
        { label: "Where Chunking WAS Used", text: "Only for the trend intelligence agent, where 15-page fashion trend PDFs and catwalk reviews were chunked using recursive token splitters (chunk_size=500, overlap=50)." }
      ]
    },
    {
      id: "embeddings",
      title: "6. Multimodal Embeddings: Azure AI Vision (Not Raw CLIP)",
      points: [
        { label: "Enterprise Azure AI Vision", text: "In production on Azure, we used Azure AI Vision (Image Analysis 4.0 / Multimodal Embeddings API), not raw self-hosted CLIP. It provides serverless managed endpoints (vectorizeImage and vectorizeText) in a shared 512-dimensional metric space." },
        { label: "L2-Normalization", text: "All vectors are L2-normalized, making Cosine Similarity equal to an ultra-fast Dot Product." },
        { label: "Late Vector Fusion", text: "For hybrid queries (image + text prompt), vectors are fused: e_hybrid = 0.65 * e_text + 0.35 * e_image." }
      ]
    },
    {
      id: "ocr_feature",
      title: "7. Future Aspect & Killer Feature: Azure AI Vision OCR",
      points: [
        { label: "Graphic Garment Problem", text: "Graphic t-shirts and hoodies have printed slogans, typography, or city names (e.g., 'NEW YORK 1985' or 'VINTAGE ATHLETIC'). Visual embeddings alone often miss the exact words." },
        { label: "Azure OCR Integration", text: "Garment images pass through Azure AI Vision OCR (Read API) to extract printed text, storing it in PostgreSQL (printed_graphic_text) and appending it to the product description before embedding. Retailers can search for exact phrases or graphic themes." }
      ]
    },
    {
      id: "rag_gpt4o",
      title: "8. In-Context Multimodal RAG with Azure OpenAI (GPT-4o)",
      points: [
        { label: "Why No Fine-Tuning", text: "Fine-tuning an LLM on 100,000 products causes stale weights and hallucinations when inventory changes. Multimodal RAG provides real-time ground truth." },
        { label: "Execution Flow", text: "The Vector DB retrieves Top-K IDs, PostgreSQL hydrates fresh fabric and size data, and Azure OpenAI GPT-4o generates accurate, grounded design assessments." }
      ]
    },
    {
      id: "generative",
      title: "9. Custom Requests & Generative Pipeline",
      points: [
        { label: "Sketch-to-Garment", text: "SDXL + ControlNet (Canny edge) turns hand sketches into photorealistic garments." },
        { label: "Fabric Inpainting", text: "Segment Anything (SAM) isolates the garment mask, and SDXL inpainting swaps the fabric texture while keeping the model and background intact." },
        { label: "360° Turntable Visualization", text: "Zero123 multi-view diffusion synthesizes 360-degree rotating views from a single front-facing photo." }
      ]
    },
    {
      id: "deployment",
      title: "10. Deployment Separation",
      points: [
        { label: "Model Deployment", text: "Azure AI Vision (serverless API), Azure OpenAI (managed gpt-4o deployment in Azure OpenAI Studio), and SDXL (Azure Machine Learning Online Endpoint with an NVIDIA A10G GPU)." },
        { label: "Application Deployment", text: "Dockerized FastAPI backend & web UI deployed on Azure App Service, connecting to the existing PostgreSQL server over VPN and reading images from Azure Blob Storage." }
      ]
    }
  ],

  executiveScript: `At our company, we managed over 100,000 garment designs across shirts, pants, and outerwear.

We built the Fashion AI Copilot for two critical business reasons: first, our design team couldn't quickly verify if matching designs already existed in our 100,000-image archive; second, our sales team was trapped in a slow, manual cycle of emailing PDF lookbooks back and forth with retailers to take wholesale orders.

We solved this by creating a self-service web portal where retailers can search our entire archive using natural text, reference images, or hybrid queries (image + text modifiers). When they find a style they want, they select bulk quantities across S, M, L, and XL sizes and checkout with email OTP verification. If they are an existing verified client in our PostgreSQL database, the order is confirmed immediately into our 'orders' table. If they are new, their lead is recorded for our operations team to verify credentials and onboard them. If no existing design fits, they can submit a custom design request.

On the technical side:
• We kept our existing PostgreSQL production database untouched on its server; our Python backend connects securely over VPN.
• Raw images are stored in Azure Blob Storage with Azure CDN.
• We used Azure AI Vision (not raw CLIP) to generate 512-dimensional multimodal embeddings in a shared metric space.
• We did not chunk product descriptions because splitting 50-word summaries breaks entity relationships like color, size, and fabric.
• The search engine scores all 100,000 items and re-ranks the full catalog. To preserve UI performance, the page loads the first 25 items and lazily loads the rest as the user scrolls, while passing only the Top-3 to 5 items to Azure OpenAI (GPT-4o) for conversational design insights.
• We integrated Azure AI Vision OCR to read printed quotes and typography on graphic t-shirts and hoodies, indexing the text for exact graphic queries.
• For custom requests, our generative pipeline uses Stable Diffusion XL with ControlNet for sketch-to-garment rendering, fabric inpainting, and Zero123 for 360-degree turntable mockups.`,

  deepDives: [
    {
      id: "deep-rag",
      term: "Multimodal RAG Architecture",
      summary: "In-Context Multimodal Retrieval-Augmented Generation connecting PostgreSQL, Vector DB, and Azure OpenAI GPT-4o.",
      details: [
        "Why No Fine-Tuning: Modifying weights for 100,000 products causes stale data when stock or prices change. RAG decouples knowledge retrieval from reasoning, guaranteeing zero hallucinations.",
        "Ingestion: Pre-computes 512-d embeddings via Azure AI Vision vectorizeImage for all 100,000 images and stores them in Azure AI Search / ChromaDB.",
        "Retrieval: At query time, retrieves Top-5 candidate product IDs based on cosine similarity.",
        "Hydration: Executes SQL query against existing on-prem PostgreSQL server to pull live inventory, available sizes, fabric gsm, and CDN image URLs.",
        "Prompt Payload: Passes JSON specs and image CDN URLs directly into GPT-4o chat completion endpoint."
      ]
    },
    {
      id: "deep-embeddings",
      term: "Dual-Encoder Embeddings & Shared Metric Space",
      summary: "Mapping text and visual pixels into an identical 512-dimensional unit hypersphere.",
      details: [
        "Dual-Encoder Architecture: Two separate neural towers—a Vision Transformer (ViT) for images and a Transformer for text—projecting into a common 512-d vector space.",
        "Contrastive Training: Trained contrastively using InfoNCE loss to pull matching image-text pairs together and push non-matching pairs apart.",
        "L2-Normalization: Every vector is strictly normalized (v / ||v||_2 = 1.0). When magnitude is 1.0, Cosine Similarity is mathematically identical to a hardware-accelerated Dot Product.",
        "Late Vector Fusion: e_hybrid = alpha * e_text + (1 - alpha) * e_image (with alpha=0.65 to let text steer color/fabric while keeping the visual silhouette intact)."
      ]
    },
    {
      id: "deep-ocr",
      term: "Azure AI Vision OCR (Read API)",
      summary: "High-accuracy optical text recognition for slogan, quote, and typography extraction on apparel.",
      details: [
        "The Graphic Garment Blind Spot: Standard visual embeddings recognize a 'black cotton t-shirt', but miss printed alphanumeric text like 'NEW YORK 1985' or 'VINTAGE ATHLETIC CLUB'.",
        "Pipeline Integration: Every garment image passes through the Azure OCR Read API during ingestion.",
        "Database Storage: Extracted text is stored in PostgreSQL as printed_graphic_text and appended to the searchable description string before vectorization.",
        "Query Matching: Enables exact keyword and typography searches combined with visual silhouette matching."
      ]
    },
    {
      id: "deep-generative",
      term: "Generative AI: ControlNet, SDXL, SAM & Zero123",
      summary: "Full generative pipeline for sketch-to-garment synthesis, fabric replacement, and 360-degree turntable mockups.",
      details: [
        "ControlNet Sketch-to-Garment: Uses Canny edge detection to lock garment outlines and necklines from rough hand drawings, while SDXL paints realistic fabric textures and drape.",
        "SAM Fabric Inpainting: Segment Anything Model (SAM) produces a zero-shot binary mask over the garment. SDXL Inpainting resynthesizes target fabric without altering the human model's face, skin, or background.",
        "Zero123 Multi-View Turntable: Novel-view diffusion conditioned on relative camera azimuth angles (15-degree increments) creates a smooth 360-degree rotating turntable preview for bulk wholesale buyers."
      ]
    }
  ]
};
