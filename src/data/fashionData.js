export const fashionData = {
  title: "Fashion AI Copilot | Agentic Multimodal Design Platform",
  resumeBullet: "Architected and led development of an Agentic AI platform enabling multimodal fashion design search using image, text, and hybrid retrieval powered by Azure AI Vision, Azure OpenAI, ChromaDB, and PostgreSQL.",

  executiveScript: `We built Fashion AI Copilot for our client, a garment manufacturer with a catalog of over 10,000 clothing designs across shirts, t-shirts, pants, and jackets.

The main problem was a slow, manual sales cycle. Whenever a retailer wanted to see designs or order in bulk, our sales team had to manually search through image folders and email PDF lookbooks back and forth. When multiple buyers were waiting, this created a huge bottleneck. So, we built this self-service platform to make search and ordering instant.

We store our data across three simple places:
• 1. Azure Blob Storage: Stores all 10,000+ garment images, served fast to users via CDN.
• 2. PostgreSQL: This is our main database. Its products table stores product ID (e.g. PROD_0001), image filename, category, gender, sizes (S, M, L, XL, XXL), color, fabric, price, inventory, and a rich 1–2 sentence description (like: "Stylish pink T-shirt for men in XL size, featuring an attractive design and a trendy look, perfect for casual outings"). It also stores our retailers table and orders table.
• 3. ChromaDB: This is our vector database. It stores the 1024-dimensional embeddings linked to each product ID for fast search.

Here is how the AI and retrieval flow works:
• Generating Embeddings: During data ingestion, we take the rich description from PostgreSQL and convert it into a 1024-dimensional text embedding using Azure AI Vision. We also take the garment image from Blob Storage and convert it into a 1024-dimensional image embedding in the exact same vector space.
• L2 Normalization & Fast Dot Product: We normalize every vector to a length of 1.0. When vectors have length 1.0, cosine similarity is just a fast dot product (simple multiplication and addition). This lets ChromaDB scan 10,000 designs in under 10 milliseconds.
• Hybrid Search (Late Fusion): If a buyer uploads a reference photo and also types a modification (like "same cut in green linen"), we blend the vectors: 65% weight to text (for color/fabric) and 35% weight to image (for silhouette).
• No Chunking: Each description is short and atomic (50 to 80 words), so we don't chunk text. Chunking would break apart the connection between color, fabric, and fit.
• Top-K Search & PostgreSQL Hydration: ChromaDB finds the top matching product IDs in milliseconds. Then, PostgreSQL pulls live inventory, available sizes, fabric details, and image URLs. We don't fine-tune models because stock and prices change daily.
• GPT-4o Insights: We send the user's prompt, the top product details, and the images to GPT-4o so it can give grounded styling advice without hallucinating.

On the Retailer Web Portal:
• Retailers can search using text, images, or hybrid queries. We use lazy loading—showing 25 items first and loading more as they scroll—so the page stays fast and smooth at 60fps.
• Retailers pick bulk quantities across sizes (S, M, L, XL, XXL) and checkout with email OTP. Verified orders go directly into our PostgreSQL orders table.

Future & In-Progress R&D:
• For custom garments, we are building a generative pipeline using Stable Diffusion XL, ControlNet, and SAM to turn sketches into realistic photos. In parallel, we are integrating Azure AI Vision OCR to read printed slogans and quotes on t-shirts and save them in PostgreSQL, so buyers can search by exact printed text.`,

  storageArchitecture: [
    {
      tier: "1. Azure Blob Storage",
      badge: "Images & Media",
      points: [
        "Stores 10,000+ raw garment photos",
        "Referenced in PostgreSQL via image_filename",
        "Fast image loading delivered through Azure CDN"
      ]
    },
    {
      tier: "2. PostgreSQL Database",
      badge: "Master Business Data",
      points: [
        "products table: product_id, image_filename, category, gender, sizes (S, M, L, XL, XXL), color, fabric, price, inventory",
        "description column: Rich 1-2 sentence description used to create 1024-d text embeddings",
        "retailers table: Buyer profiles and verified accounts",
        "orders table: Bulk wholesale orders and size breakdowns"
      ]
    },
    {
      tier: "3. ChromaDB",
      badge: "Vector Search",
      points: [
        "Stores 1024-dimensional embeddings from Azure AI Vision",
        "L2-normalized vectors (length = 1.0) for fast dot-product math",
        "HNSW index scans 10,000+ designs in under 10 milliseconds",
        "Maps matching product IDs directly to PostgreSQL"
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
      badge: "Vector Math",
      summary: "Blending text and image vectors: e_hybrid = 0.65 * text + 0.35 * image.",
      details: [
        "Why 65% Text / 35% Image: If a retailer uploads a photo and types 'same cut in green linen', 65% weight lets text steer the color and fabric, while 35% locks the original garment shape and neckline.",
        "Late Fusion vs Early Fusion: Late fusion blends already-calculated vectors in less than 1 millisecond. Early fusion re-processes pixels and text together every time, which is too slow and expensive.",
        "Re-Normalizing: After blending, we normalize the vector back to length 1.0 so ChromaDB can quickly search it using dot products."
      ]
    },
    {
      id: "lazy-loading",
      title: "Lazy Loading",
      badge: "Fast UI (60fps)",
      summary: "Loading 25 items at a time so the website stays smooth and loads instantly.",
      details: [
        "The Problem: If you render hundreds of high-resolution clothing images all at once, the webpage freezes and uses too much memory.",
        "25-Item Batches: We load the first 25 designs immediately so the page opens in under 100 milliseconds.",
        "Smooth Scrolling: As the user scrolls near the bottom, the next 25 designs load automatically in the background without any lag."
      ]
    },
    {
      id: "top-k-vector-search",
      title: "Top-K Vector Search",
      badge: "ChromaDB + HNSW",
      summary: "Finding the top matching designs in under 10 milliseconds using ChromaDB and HNSW.",
      details: [
        "HNSW Index: Instead of checking all 10,000 designs one-by-one, HNSW uses a smart graph shortcut to jump directly to the closest matches in milliseconds.",
        "Fast Dot Product: Because all our vectors have a length of 1.0, cosine similarity is just simple multiplication and addition (dot product). This makes search super fast on regular CPUs.",
        "Low Memory: For 10,000 products, the entire ChromaDB index needs only about 40MB of RAM."
      ]
    },
    {
      id: "multimodal-rag",
      title: "Multimodal RAG",
      badge: "PostgreSQL + ChromaDB + GPT-4o",
      summary: "Connecting ChromaDB vector search, live PostgreSQL data, and GPT-4o.",
      details: [
        "Why We Don't Fine-Tune: Stock levels, prices, and sizes change every day. If you fine-tune an AI model, its data becomes outdated immediately. RAG lets us pull fresh data every second.",
        "Live Data Pull: ChromaDB finds the top product IDs, and PostgreSQL instantly pulls live sizes (S to XXL), fabric details, price, and image links.",
        "Zero Hallucination: GPT-4o reads this exact database data before answering, so it never invents fake prices or out-of-stock items."
      ]
    },
    {
      id: "azure-ai-vision",
      title: "Azure AI Vision",
      badge: "Multimodal Embeddings",
      summary: "Converting both clothing photos and text descriptions into 1024-dimensional vectors.",
      details: [
        "Shared Vector Space: It uses two separate neural towers (one for images, one for text) that place visual styles and written descriptions into the exact same coordinate space.",
        "Fashion Understanding: It understands fashion details like collars, sleeve cuts, fabrics, and drape much better than generic text models.",
        "Ready-to-Use APIs: Gives us simple endpoints (vectorizeImage and vectorizeText) without needing to manage our own GPU servers."
      ]
    },
    {
      id: "azure-openai",
      title: "Azure OpenAI",
      badge: "GPT-4o Reasoning",
      summary: "Using GPT-4o as a smart fashion copilot to advise retailers.",
      details: [
        "Smart Division of Labor: GPT-4o does not search through 10,000 images itself. ChromaDB does the fast search first, and GPT-4o only looks at the top few matching items.",
        "Grounded Advice: It looks at the customer's query, the product images, and the fabric specs to explain styling options and compare materials.",
        "Truthful Answers: Because it gets real product data injected from PostgreSQL, all its suggestions are accurate and practical."
      ]
    }
  ]
};



