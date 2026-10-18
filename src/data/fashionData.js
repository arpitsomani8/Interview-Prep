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

  userExample: {
    query: "Do you have a pink T-shirt?",
    description: "End-to-end execution flow showing how a retailer's natural language question travels through our AI models, databases, and UI to place an order.",
    steps: [
      {
        step: "01",
        title: "User Search Input",
        system: "Retailer Web Portal",
        badge: "Frontend -> API",
        action: "Buyer types: 'Do you have a pink T-shirt?' into the search bar and presses enter.",
        technicalDetail: "The Next.js/React frontend captures the string and fires an async POST request to our FastAPI backend endpoint: /api/v1/search/hybrid with payload { query: 'Do you have a pink T-shirt?', limit: 25 }."
      },
      {
        step: "02",
        title: "Text Vectorization via Azure AI Vision",
        system: "Azure AI Vision (vectorizeText)",
        badge: "1024-d Embedding",
        action: "The text query is converted into a 1024-dimensional float vector.",
        technicalDetail: "FastAPI calls Azure AI Vision vectorizeText API in ~15ms. The output is a 1024-d float vector. We strictly L2-normalize it (length = 1.0) so it projects into the exact same coordinate space as our pre-computed clothing images."
      },
      {
        step: "03",
        title: "ChromaDB Fast Vector Search",
        system: "ChromaDB (HNSW Graph)",
        badge: "Top-K Candidates",
        action: "Scans 10,000+ catalog designs in 4ms to find the closest matching product IDs.",
        technicalDetail: "Because the vector has length 1.0, ChromaDB computes Cosine Similarity using hardware-accelerated dot products across its HNSW index in RAM. It retrieves the Top-25 closest product_ids (e.g., PROD_0014, PROD_0089, PROD_0142) that represent pink t-shirts."
      },
      {
        step: "04",
        title: "PostgreSQL Master Data Hydration",
        system: "PostgreSQL Database",
        badge: "Live SQL Lookup",
        action: "Pulls live inventory, available sizes, fabric specs, and image filenames.",
        technicalDetail: "FastAPI runs: SELECT product_id, image_filename, sizes_available, color, fabric, wholesale_price, stock_count FROM products WHERE product_id IN ('PROD_0014', ...). It pulls live stock (S: 120, M: 250, L: 180, XL: 90), fabric (220gsm Combed Cotton), price ($12.50/unit), and CDN image URLs."
      },
      {
        step: "05",
        title: "Context Injection & GPT-4o Evaluation",
        system: "Azure OpenAI (GPT-4o)",
        badge: "Multimodal RAG",
        action: "GPT-4o analyzes the prompt + database specs + garment images to form a grounded answer.",
        technicalDetail: "Prompt payload with user query + hydrated PostgreSQL JSON + image CDN URLs is sent to GPT-4o. GPT-4o responds: 'Yes! We have our Blush Pink Crewneck T-Shirt (PROD_0014) in stock across sizes S, M, L, and XL, crafted from 220gsm Combed Organic Cotton at $12.50/unit wholesale.' Zero hallucination because data comes directly from PostgreSQL."
      },
      {
        step: "06",
        title: "UI Rendering & Bulk Wholesale Order Confirmation",
        system: "Retailer Portal & Orders Table",
        badge: "60fps Lazy Load & Order Insert",
        action: "Retailer views the pink t-shirts, selects bulk sizes (S, M, L, XL), and checks out.",
        technicalDetail: "Frontend renders the first 25 matching pink t-shirts with lazy loading. The buyer enters wholesale quantities (e.g. 50 S, 100 M, 100 L), verifies their email OTP, and an order record is instantly inserted into PostgreSQL's 'orders' table while updating live stock."
      }
    ],
    sampleOutput: {
      aiResponse: "Yes! We have our Blush Pink Crewneck T-Shirt (PROD_0014) in stock across sizes S, M, L, and XL. It is crafted from premium 220gsm Combed Organic Cotton at $12.50/unit wholesale with 640 total pieces available. Below are the closest matching design samples from our archive:",
      orderRecord: {
        order_id: "ORD_9421",
        retailer_id: "RET_8820 (Nordic Apparel)",
        product_id: "PROD_0014",
        breakdown: "S: 50 | M: 100 | L: 100 | XL: 50",
        total_units: 300,
        total_value: "$3,750.00",
        status: "CONFIRMED_IN_POSTGRESQL"
      }
    }
  },

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
    },
    {
      id: "shared-vector-space",
      title: "Shared Vector Space",
      badge: "Coordinate Mapping",
      summary: "Placing both image pixels and written words onto the exact same 1024-dimensional coordinate space.",
      details: [
        "How It Works: Normally, text and images speak different computer languages. A shared vector space maps the photo of a pink dress and the words 'pink floral maxi dress' to nearly identical coordinates.",
        "Direct Search: Because they share the same space, you don't need text tags to find an image—a text query vector directly finds image vectors.",
        "Why 1024 Dimensions: 1024 numbers provide enough detail to distinguish subtle fashion traits like collar types, fabric textures, and garment drape."
      ]
    },
    {
      id: "multimodal-dual-encoder",
      title: "Multimodal Dual-Encoder",
      badge: "Two-Tower AI Model",
      summary: "Two separate neural networks (one for images, one for text) working together in parallel.",
      details: [
        "Two Separate Towers: One Vision Transformer (ViT) processes the garment photo, while another Transformer processes the text description.",
        "Contrastive Training: During training, matching pairs (photo + description) are pulled close together, while non-matching pairs are pushed far apart.",
        "Fast Querying: At query time, we only run the text tower on the user's search text, and compare it instantly against pre-saved image vectors."
      ]
    },
    {
      id: "l2-normalization",
      title: "L2 Normalization",
      badge: "Vector Math Shortcut",
      summary: "Rescaling every vector so its mathematical length is exactly 1.0.",
      details: [
        "Why We Do It: It scales every vector by dividing each number by the total vector length: v / ||v||_2 = 1.0.",
        "Turns Math Into Dot Product: When both vectors have a length of 1.0, complex Cosine Similarity turns into simple multiplication and addition (dot product).",
        "CPU Speed: Eliminates heavy square root and division calculations, letting the CPU scan thousands of vectors in milliseconds."
      ]
    },
    {
      id: "cosine-similarity",
      title: "Cosine Similarity",
      badge: "Similarity Metric",
      summary: "Measuring the angle between two vectors instead of their size.",
      details: [
        "Angle Over Magnitude: A score of 1.0 means identical angle/direction (perfect match), 0 means completely unrelated, and -1 means opposite.",
        "Image Size Doesn't Matter: Whether an image is high resolution or low resolution, its direction in vector space captures the core style.",
        "Fast Hardware Execution: With L2 normalization, calculating cosine similarity between query and catalog items uses fast AVX CPU instructions."
      ]
    },
    {
      id: "hnsw",
      title: "HNSW",
      badge: "Graph-Based Search",
      summary: "A multi-layered graph that jumps directly to the closest matching designs in milliseconds.",
      details: [
        "Skip-List for Vectors: Think of it like an express highway with local exits. The top layer takes huge leaps across categories, and bottom layers zoom in on the exact style.",
        "Logarithmic Speed: Replaces slow O(N) scanning of all 10,000 items with O(log N) graph traversal, finding matches in under 5 milliseconds.",
        "Runs in Memory: For 10,000 fashion designs, the entire HNSW graph takes just ~40MB of RAM, so it runs right inside our backend container."
      ]
    },
    {
      id: "sdxl-controlnet",
      title: "SDXL & ControlNet",
      badge: "Generative AI",
      summary: "Turning rough designer sketches into photorealistic clothing photos.",
      details: [
        "ControlNet (Canny Edge): Locks the outline, neckline, and seams from a hand-drawn sketch so the AI doesn't warp the shape of the clothing.",
        "Stable Diffusion XL (SDXL): Paints realistic fabric textures, folds, lighting, and colors inside that locked outline.",
        "SAM (Segment Anything): Automatically creates a precise mask around the clothing, so we can swap fabrics without altering the model's face, skin, or pose."
      ]
    },
    {
      id: "ranking-reranking",
      title: "Ranking & Re-ranking",
      badge: "Two-Stage Search",
      summary: "ChromaDB finds the top 50 candidates fast, then business rules and GPT-4o re-rank the best items.",
      details: [
        "Stage 1 (Fast Retrieval): ChromaDB scans 10,000+ vectors in 5ms to grab the Top-50 candidate designs based on cosine similarity.",
        "Stage 2 (PostgreSQL Business Filter): Filters out out-of-stock items, matches requested sizes (S to XXL), and checks wholesale pricing.",
        "Stage 3 (GPT-4o Re-ranking): Evaluates fabric GSM and style match to pick and order the top 25 most relevant designs for the buyer."
      ]
    },
    {
      id: "langchain-langgraph",
      title: "LangChain / LangGraph",
      badge: "Agentic AI Workflow",
      summary: "State machine orchestrating the step-by-step agentic search and ordering workflow.",
      details: [
        "Stateful Flow: Manages the transition between search -> hydration -> GPT-4o critique -> bulk cart selection -> order placement.",
        "Cyclic Control with LangGraph: If a buyer's query is vague or no stock matches, the graph loops back with clarifying questions or suggests alternative fabrics.",
        "Clean Tool Execution: Keeps vector search, PostgreSQL queries, and OpenAI completions modular and easy to debug."
      ]
    }
  ]
};




