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
  ]
};

