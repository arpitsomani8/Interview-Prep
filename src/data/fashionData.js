export const fashionData = {
  title: "Fashion AI Copilot | Agentic Multimodal Design Platform",
  resumeBullet: "Architected and led development of an Agentic AI platform enabling multimodal fashion design search using image, text, and hybrid retrieval powered by Azure AI Vision, Azure OpenAI, ChromaDB, and PostgreSQL.",

  executiveScript: `This was an enterprise AI solution we developed for our client, a regional garment manufacturer managing a catalog of over 10,000+ garment design samples across shirts, t-shirts, pants, and outerwear.

The core business challenge was that whenever a retailer or buyer requested specific styles, our client's sales team had to manually hunt through thousands of image folders for matching designs and exchange back-and-forth emails with PDF lookbooks to see if they fit the buyer's needs. When multiple retailers were in line requesting dozens of different styles, this manual cycle was extremely slow, labor-intensive, and bottlenecked wholesale order closures. To streamline this, we engineered Fashion AI Copilot.

On the AI/ML and retrieval architecture:
• Multimodal Embedding Generation: We used Azure AI Vision to generate 1024-dimensional multimodal embeddings in a shared metric space for both text descriptions and visual images.
• Late Vector Fusion: To support hybrid queries (a reference photo with text modifications like 'same cut in forest green linen'), we fuse vectors at runtime: e_hybrid = 0.65 * e_text + 0.35 * e_image.
• Zero Chunking Strategy: Catalog descriptions are atomic 50–80 word summaries. Chunking was deliberately avoided because splitting would decouple critical entity relationships like color, fabric, and silhouette.
• Top-K Vector Search: Pre-computed 1024-dimensional L2-normalized vectors are indexed in ChromaDB using an HNSW graph. At query time, our similarity engine performs Top-K vector retrieval across the 10,000+ catalog to fetch the closest candidates in under 10ms.
• PostgreSQL Hydration: Why no fine-tuning? Fine-tuning an LLM on 10,000 dynamic products causes stale weights and hallucinations as inventory changes. Instead, Top-K product IDs from ChromaDB trigger SQL queries in PostgreSQL to hydrate live attributes—inventory, available sizes, fabric GSM, wholesale price, and Azure Blob SAS image URLs.
• Context Injection: Azure OpenAI (GPT-4o) receives the user prompt + the Top-K hydrated product specs + image SAS URLs to generate grounded, hallucination-free styling critiques and fabric comparisons.

On the 3-Tier Production Storage:
• 1. Azure Blob Storage (CDN): Houses 10,000+ raw high-resolution garment images served via time-limited SAS URLs over Azure CDN for sub-second image delivery.
• 2. PostgreSQL (OLTP): Stores relational catalog data (product_id PK, category, sizes S/M/L/XL, color, fabric GSM, wholesale price), verified retailer accounts, and the wholesale orders table.
• 3. ChromaDB (Vector DB): Holds 1024-dimensional L2-normalized float vectors with an HNSW index for ultra-fast cosine similarity matching.

On the Portal & Wholesale Ordering Flow:
• The web portal allows retailers to search the entire 10,000+ archive using text, images, or hybrid queries. To ensure 60fps UI performance, the page paginates the Top-K search results, rendering the first 25 items and lazily loading additional batches on scroll.
• Retailers select bulk quantities across S, M, L, and XL sizes and checkout with email OTP verification. If verified in PostgreSQL, the order is confirmed immediately into the 'orders' table; new retailers are logged as qualified leads for onboarding verification.

Future & In-Progress R&D Pipeline:
• Custom Design Generation: For buyers needing custom garments, we designed a pipeline using Stable Diffusion XL with ControlNet (Canny edge) for sketch-to-garment photorealistic rendering and SAM for fabric inpainting.
• Azure AI Vision OCR: As an ongoing enhancement we are actively integrating, we use Azure OCR (Read API) to read printed slogans and typography on graphic t-shirts and hoodies, indexing the text in PostgreSQL so retailers can search for exact phrases alongside visual styles.`,

  storageArchitecture: [
    {
      tier: "1. Azure Blob Storage (CDN)",
      badge: "Object Storage & Media Delivery",
      points: [
        "Raw Garment JPGs (10,000+ high-resolution images)",
        "Time-limited SAS URLs for secure, authenticated media delivery",
        "Edge-cached over Azure CDN for global sub-second preview loading"
      ]
    },
    {
      tier: "2. PostgreSQL (OLTP Database)",
      badge: "Relational Master Data",
      points: [
        "product_id (Primary Key), category, garment type, sizes (S/M/L/XL)",
        "color, hex code, fabric GSM, wholesale price, live inventory count",
        "Verified retailer profiles, wholesale orders table, and onboarding leads"
      ]
    },
    {
      tier: "3. ChromaDB (Vector Database)",
      badge: "Semantic Vector Store",
      points: [
        "1024-dimensional L2-normalized float embeddings",
        "HNSW indexing graph for sub-10ms Approximate Nearest Neighbor (ANN) search",
        "Cosine similarity matching linked directly to PostgreSQL product_id"
      ]
    }
  ],

  pipelineFlow: [
    {
      step: "01",
      title: "1024-d Multimodal Embedding Generation",
      tag: "Azure AI Vision",
      desc: "Projects garment images and natural text descriptions into an identical 1024-dimensional shared metric space. L2-normalization ensures vector dot product is mathematically equivalent to cosine similarity."
    },
    {
      step: "02",
      title: "Late Vector Fusion for Hybrid Queries",
      tag: "Mathematical Fusion",
      desc: "When a retailer uploads a reference photo with text modifiers (e.g. 'same silhouette in maroon velvet'), vectors are weighted at runtime: e_hybrid = 0.65 * e_text + 0.35 * e_image."
    },
    {
      step: "03",
      title: "Zero Chunking Decision for Catalog Specs",
      tag: "Token Strategy",
      desc: "Each catalog summary is an atomic 50–80 word description. Chunking is deliberately avoided to prevent splitting vital entity relationships (fabric, color, neckline, and fit)."
    },
    {
      step: "04",
      title: "ChromaDB Top-K Vector Search",
      tag: "ChromaDB + HNSW",
      desc: "The query vector performs cosine similarity search across 10,000+ garment embeddings in ChromaDB, retrieving the Top-K candidate product IDs in under 10ms."
    },
    {
      step: "05",
      title: "PostgreSQL Live Inventory Hydration",
      tag: "SQL Hydration",
      desc: "Top-K product IDs trigger a fast relational lookup in PostgreSQL to fetch live stock counts, S/M/L/XL sizing, wholesale pricing, fabric GSM, and Azure Blob SAS image URLs."
    },
    {
      step: "06",
      title: "Context Injection into GPT-4o (Multimodal RAG)",
      tag: "Azure OpenAI",
      desc: "Azure OpenAI GPT-4o receives the system prompt + Top-K hydrated specs + image SAS URLs. Generates hallucination-free styling critiques, fabric comparisons, and design insights without stale model fine-tuning."
    },
    {
      step: "07",
      title: "Retailer Portal Delivery & 25-Item Lazy Loading",
      tag: "UI Engineering",
      desc: "The web portal delivers search results paginated in batches of 25. As the buyer scrolls, lazy loading fetches subsequent items. Retailers choose S/M/L/XL quantities and checkout via email OTP."
    },
    {
      step: "08",
      title: "Future / In-Progress R&D Pipeline",
      tag: "Generative AI + OCR",
      desc: "Custom design requests route to Stable Diffusion XL + ControlNet (Canny edge) & SAM for sketch-to-garment rendering. Ongoing integration with Azure AI Vision OCR extracts typography and slogans from graphic garments into PostgreSQL."
    }
  ],

  deepDives: [
    {
      id: "deep-rag",
      term: "Multimodal RAG Architecture & Context Injection",
      summary: "In-Context Multimodal Retrieval-Augmented Generation connecting PostgreSQL, ChromaDB, and Azure OpenAI GPT-4o.",
      details: [
        "Why No Fine-Tuning: Modifying model weights for 10,000+ dynamic products causes stale data when stock or prices change. RAG decouples knowledge retrieval from reasoning, guaranteeing zero hallucinations.",
        "Ingestion: Pre-computes 1024-d embeddings via Azure AI Vision vectorizeImage for all 10,000+ images and stores them in ChromaDB with HNSW indexing.",
        "Top-K Retrieval: At query time, evaluates query vectors and retrieves Top-K candidate product IDs based on cosine similarity.",
        "PostgreSQL Hydration: Executes SQL query against PostgreSQL to pull live inventory, available sizes, fabric GSM, price, and CDN SAS image URLs.",
        "Context Injection: Passes JSON specs and image CDN URLs directly into GPT-4o chat completion endpoint for grounded design assessments."
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
