export const fashionData = {
  title: "Fashion AI Copilot | Agentic Multimodal Design Platform",
  resumeBullet: "Architected and led development of an Agentic AI platform enabling multimodal fashion design search using image, text, and hybrid retrieval powered by Azure AI Vision, Azure OpenAI, ChromaDB, and PostgreSQL.",

  executiveScript: `This was an enterprise AI solution we developed for our client, a regional garment manufacturer managing a catalog of over 10,000+ garment design samples across shirts, t-shirts, pants, and outerwear.

The core business challenge was that whenever a retailer or buyer requested specific styles, our client's sales team had to manually hunt through thousands of image folders for matching designs and exchange back-and-forth emails with PDF lookbooks to see if they fit the buyer's needs. When multiple retailers were in line requesting dozens of different styles, this manual cycle was extremely slow, labor-intensive, and bottlenecked wholesale order closures. To streamline this, we engineered Fashion AI Copilot.

Our underlying master data is structured across three synchronized storage tiers:
• First, Azure Blob Storage houses 10,000+ raw high-resolution garment images, referenced by image filename and served via time-limited SAS URLs over Azure CDN for sub-second image loading.
• Second, PostgreSQL serves as our relational OLTP source of truth. Its core products table stores product_id (e.g. PROD_0001), image_filename, category, gender, sizes_available (S, M, L, XL, XXL), color, color_hex, fabric GSM, wholesale price, live inventory, and a rich 1–2 sentence description (e.g., "Stylish pink T-shirt for men in XL size, featuring an attractive design and a trendy look, perfect for casual outings"). PostgreSQL also manages our retailers table for verified buyer credentials and our wholesale orders table to capture order items, size breakdowns across S through XXL, and order status.
• Third, ChromaDB serves as our vector database, holding 1024-dimensional float embeddings linked directly to the PostgreSQL product_id.

On the AI/ML and retrieval architecture:
• Multimodal Embedding Generation: During data ingestion, we feed the rich description from PostgreSQL directly into Azure AI Vision's text vectorizer to generate 1024-dimensional text embeddings, while the corresponding garment photo from Azure Blob Storage produces 1024-dimensional visual embeddings in the same shared metric space.
• L2 Normalization & Fast Dot Product: We strictly normalize every 1024-dimensional vector to unit Euclidean length (length = 1.0). When vectors have a length of 1.0, calculating Cosine Similarity is mathematically identical to a fast, hardware-accelerated Dot Product without square-root divisions, allowing ChromaDB with an HNSW graph to scan through 10,000+ vectors in under 10 milliseconds.
• Late Vector Fusion: To support hybrid queries (a reference photo with text modifiers like "same cut in forest green linen"), we fuse vectors at runtime: e_hybrid = 0.65 * e_text + 0.35 * e_image.
• Zero Chunking Strategy: Catalog descriptions are atomic 50–80 word summaries, so chunking was intentionally avoided to prevent decoupling critical entity relationships between silhouette, fabric, and color.
• PostgreSQL Hydration & Context Injection: Why no fine-tuning? Fine-tuning an LLM on 10,000 dynamic products causes stale weights and hallucinations as inventory changes. Instead, ChromaDB retrieves Top-K candidate product_ids, which immediately execute an SQL query in PostgreSQL to hydrate live stock, available sizes, fabric GSM, wholesale price, and SAS image URLs. These hydrated specs and image URLs are injected into Azure OpenAI GPT-4o alongside the user prompt, delivering grounded, hallucination-free styling critiques and design comparisons.

On the Self-Service Retailer Portal & Ordering Flow:
• The web portal allows retailers to search the 10,000+ archive using text, reference images, or hybrid queries. To ensure 60fps UI performance, search results are paginated with 25-item lazy loading on scroll.
• Retailers select bulk quantities across S, M, L, XL, and XXL sizes and checkout with email OTP verification. If verified in PostgreSQL, the order is confirmed immediately into the orders table; new retailers are logged as qualified leads for onboarding verification.

Future & In-Progress R&D Pipeline:
• For buyers needing custom garments, we designed a pipeline using Stable Diffusion XL with ControlNet (Canny edge) for sketch-to-garment photorealistic rendering and SAM for fabric inpainting. In parallel, we are actively integrating Azure AI Vision OCR (Read API) to read printed slogans and typography on graphic t-shirts and hoodies into PostgreSQL, enabling retailers to search for exact phrases alongside visual styles.`,

  storageArchitecture: [
    {
      tier: "1. Azure Blob Storage (CDN)",
      badge: "Object Storage & Media Delivery",
      points: [
        "Raw Garment JPGs (10,000+ high-resolution master design samples)",
        "Referenced in PostgreSQL via image_filename column",
        "Time-limited SAS URLs for secure, authenticated media delivery",
        "Edge-cached over Azure CDN for global sub-second preview loading"
      ]
    },
    {
      tier: "2. PostgreSQL (OLTP Database)",
      badge: "Relational Master Data & Ground Truth",
      points: [
        "products table: product_id (PK), image_filename, category, gender, sizes_available (S, M, L, XL, XXL), color, color_hex, fabric GSM, live inventory",
        "description column: Rich 1-2 sentence text (e.g., 'Stylish pink T-shirt for men in XL size...') used directly to compute 1024-d text embeddings",
        "retailers table: Retail buyer accounts, verified credentials, and onboarding lead records",
        "orders table: Wholesale orders capturing size breakdown (S/M/L/XL), bulk quantities, and order status"
      ]
    },
    {
      tier: "3. ChromaDB (Vector Database)",
      badge: "Semantic Vector Store",
      points: [
        "1024-dimensional float embeddings generated via Azure AI Vision",
        "Strict L2 Normalization (||v||₂ = 1.0): turns Cosine Similarity into a fast, hardware-accelerated Dot Product",
        "Stores both visual embeddings (from Blob images) and text embeddings (from PostgreSQL descriptions)",
        "HNSW indexing graph for sub-10ms Approximate Nearest Neighbor (ANN) search across 10,000+ designs",
        "Cosine similarity matching linked directly to PostgreSQL product_id for instant SQL hydration"
      ]
    }
  ],

  pipelineFlow: [
    {
      step: "01",
      title: "1024-d Multimodal Embedding & L2 Normalization",
      tag: "Azure AI Vision + PostgreSQL",
      desc: "During ingestion, the rich 'description' column from PostgreSQL is converted into a 1024-d text embedding, while the garment photo from Azure Blob Storage is vectorized into a 1024-d image embedding. Every vector is strictly L2-normalized (length = 1.0), meaning Cosine Similarity becomes a pure, ultra-fast Dot Product."
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
      desc: "Each PostgreSQL description is an atomic 50–80 word summary. Chunking is deliberately avoided to prevent splitting vital entity relationships (fabric, color, neckline, and fit)."
    },
    {
      step: "04",
      title: "ChromaDB Top-K Vector Search",
      tag: "ChromaDB + HNSW",
      desc: "The query vector performs cosine similarity search across 10,000+ garment embeddings in ChromaDB, retrieving the Top-K candidate product_ids in under 10ms."
    },
    {
      step: "05",
      title: "PostgreSQL Live Inventory & Catalog Hydration",
      tag: "SQL Hydration",
      desc: "Top-K product_ids trigger a fast SQL lookup in PostgreSQL to fetch live stock counts, S/M/L/XL/XXL sizing, wholesale pricing, fabric GSM, and the image_filename to generate Azure Blob SAS image URLs."
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
      desc: "The web portal delivers search results paginated in batches of 25. As the buyer scrolls, lazy loading fetches subsequent items. Retailers choose S/M/L/XL/XXL quantities and checkout via email OTP into PostgreSQL."
    },
    {
      step: "08",
      title: "Future / In-Progress R&D Pipeline",
      tag: "Generative AI + OCR",
      desc: "Custom design requests route to Stable Diffusion XL + ControlNet (Canny edge) & SAM for sketch-to-garment rendering. Ongoing integration with Azure AI Vision OCR extracts typography and slogans from graphic garments into PostgreSQL."
    }
  ],

  bookmarkedConcepts: [
    {
      id: "late-vector-fusion",
      title: "Late Vector Fusion",
      badge: "Mathematical Vector Algebra",
      summary: "Runtime weighted combination of normalized multimodal vectors: e_hybrid = 0.65 * e_text + 0.35 * e_image.",
      details: [
        "Late vs. Early Fusion: Early fusion fuses raw pixels and text tokens inside a heavy cross-attention transformer, requiring massive compute per query. Late fusion operates directly on pre-computed 1024-d unit vectors, computing combinations in sub-millisecond runtime.",
        "Weighting Ratio (0.65 / 0.35): When a retailer uploads a garment photo with text like 'same silhouette in maroon corduroy', 0.65 gives text the steering power over color, fabric GSM, and texture, while 0.35 locks the garment neckline, cut, and sleeve silhouette.",
        "Re-Normalization: After weighted linear combination, the resulting vector is strictly L2-normalized (v / ||v||_2 = 1.0) so it projects back onto the unit hypersphere for instant dot-product similarity search in ChromaDB."
      ]
    },
    {
      id: "lazy-loading",
      title: "Lazy Loading",
      badge: "Frontend DOM & Network Optimization",
      summary: "Paginated 25-item batch rendering with IntersectionObserver to maintain 60fps UI performance.",
      details: [
        "The DOM Bottleneck: Injecting hundreds of high-resolution garment preview images into the DOM simultaneously creates huge memory bloat, high layout thrashing, and freezes the browser main thread.",
        "25-Item Initial Payload: ChromaDB retrieves Top-K candidates, and PostgreSQL hydrates the first 25 items immediately for an ultra-fast First Contentful Paint (<100ms).",
        "IntersectionObserver Sentinel: As the retailer scrolls within 200px of the page bottom, an invisible sentinel element triggers lazy loading of the next batch of 25 items without jarring layout shifts or frame drops."
      ]
    },
    {
      id: "top-k-vector-search",
      title: "Top-K Vector Search",
      badge: "ChromaDB + HNSW Graph",
      summary: "Sub-10ms Approximate Nearest Neighbor (ANN) search across 10,000+ 1024-dimensional vectors.",
      details: [
        "HNSW Indexing: Hierarchical Navigable Small World graphs provide logarithmic O(log N) search complexity instead of an exhaustive linear O(N) scan across 10,000 items.",
        "L2 Dot-Product Acceleration: Because all vectors are pre-normalized to length 1.0, Cosine Similarity simplifies to a pure hardware-accelerated Dot Product (AVX-512 SIMD instructions), completely avoiding square roots.",
        "In-Memory Footprint: For 10,000 vectors with 1024 dimensions, the entire HNSW index fits in ~40MB of RAM, executing Top-K retrieval in 3 to 7 milliseconds."
      ]
    },
    {
      id: "multimodal-rag",
      title: "Multimodal RAG",
      badge: "PostgreSQL + ChromaDB + GPT-4o",
      summary: "Retrieval-Augmented Generation connecting real-time relational stock with multimodal vector embeddings.",
      details: [
        "Why No Fine-Tuning: Garment stock, pricing, and available sizes fluctuate continuously. Fine-tuning model weights causes stale data, hallucinated prices, and high retraining GPU costs. RAG decouples knowledge retrieval from reasoning, guaranteeing zero hallucinations.",
        "PostgreSQL Hydration: ChromaDB Top-K candidate product_ids query PostgreSQL to pull live sizes (S/M/L/XL/XXL), fabric GSM, wholesale price, and SAS image URLs.",
        "Prompt Context Injection: Structured JSON specs and authenticated image URLs are injected directly into the GPT-4o context window for grounded styling evaluations and buyer advice."
      ]
    },
    {
      id: "azure-ai-vision",
      title: "Azure AI Vision",
      badge: "Dual-Encoder Shared Hypersphere",
      summary: "Multi-tenant dual-encoder neural architecture projecting image pixels and text descriptions into an identical 1024-d unit vector space.",
      details: [
        "Dual-Encoder Architecture: Uses two separate neural towers—a Vision Transformer (ViT) for garment images and a Transformer for text descriptions—projecting into a common 1024-d vector coordinate space.",
        "Contrastive Alignment: Contrastively trained on massive fashion datasets so that visual concepts (e.g. puff sleeves, ribbed knit, camp collar) align directly with natural text descriptors.",
        "Dual API Endpoints: Out-of-the-box support for vectorizeImage (using garment photos) and vectorizeText (using PostgreSQL rich descriptions) with zero GPU maintenance overhead."
      ]
    },
    {
      id: "azure-openai",
      title: "Azure OpenAI",
      badge: "GPT-4o Multimodal Reasoning Engine",
      summary: "Enterprise multimodal LLM providing grounded design critiques, trend comparisons, and wholesale order advisory.",
      details: [
        "Architectural Decoupling: GPT-4o is never used to scan or search the 10,000 images—that would be cost-prohibitive ($$$) and slow (10+ seconds). ChromaDB filters the catalog to the Top-K candidates first.",
        "Grounded Reasoning: GPT-4o receives the retailer's query, the Top-K hydrated PostgreSQL specs (fabric GSM, sizes, price), and SAS image URLs to compare silhouettes, explain fabric qualities, and recommend complementary styles.",
        "Zero Stale Knowledge: Relies strictly on the injected PostgreSQL ground-truth payload, eliminating hallucinated stock numbers or inaccurate wholesale prices."
      ]
    }
  ]
};


