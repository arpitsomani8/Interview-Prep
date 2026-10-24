export const fashionData = {
  "title": "Fashion AI Copilot | Agentic Multimodal Design Platform",
  "resumeBullet": "Architected and led development of an Agentic AI platform enabling multimodal fashion design search using image, text, and hybrid retrieval powered by Azure AI Vision, Azure OpenAI, ChromaDB, and PostgreSQL.",
  "executiveScript": "We built Fashion AI Copilot for our client, a garment manufacturer with a catalog of over 10,000 clothing designs across shirts, t-shirts, pants, and jackets.\n\nThe main problem was a slow, manual sales cycle. Whenever a retailer wanted to see designs or order in bulk, our sales team had to manually search through image folders and email PDF lookbooks back and forth. When multiple buyers were waiting, this created a huge bottleneck. So, we built this self-service platform to make search and ordering instant.\n\nWe store our data across three simple places:\n• 1. Azure Blob Storage: Stores all 10,000+ garment images, served fast to users via CDN.\n• 2. PostgreSQL: This is our main database. Its products table stores product ID (e.g. PROD_0001), image filename, category, gender, sizes (S, M, L, XL, XXL), color, fabric, price, inventory, and a rich 1–2 sentence description (like: \"Stylish pink T-shirt for men in XL size, featuring an attractive design and a trendy look, perfect for casual outings\"). It also stores our retailers table and orders table.\n• 3. ChromaDB: This is our vector database. It stores the 1024-dimensional embeddings linked to each product ID for fast search.\n\nHere is how the AI and retrieval flow works:\n• Generating Embeddings: During data ingestion, we take the rich description from PostgreSQL and convert it into a 1024-dimensional text embedding using Azure AI Vision. We also take the garment image from Blob Storage and convert it into a 1024-dimensional image embedding in the exact same vector space.\n• L2 Normalization & Fast Dot Product: We normalize every vector to a length of 1.0. When vectors have length 1.0, cosine similarity is just a fast dot product (simple multiplication and addition). This lets ChromaDB scan 10,000 designs in under 10 milliseconds.\n• Hybrid Search (Late Fusion): If a buyer uploads a reference photo and also types a modification (like \"same cut in green linen\"), we blend the vectors: 65% weight to text (for color/fabric) and 35% weight to image (for silhouette).\n• No Chunking: Each description is short and atomic (50 to 80 words), so we don't chunk text. Chunking would break apart the connection between color, fabric, and fit.\n• Top-K Search & PostgreSQL Hydration: ChromaDB finds the top matching product IDs in milliseconds. Then, PostgreSQL pulls live inventory, available sizes, fabric details, and image URLs. We don't fine-tune models because stock and prices change daily.\n• GPT-4o Insights: We send the user's prompt, the top product details, and the images to GPT-4o so it can give grounded styling advice without hallucinating.\n\nOn the Retailer Web Portal:\n• Retailers can search using text, images, or hybrid queries. We use lazy loading—showing 25 items first and loading more as they scroll—so the page stays fast and smooth at 60fps.\n• Retailers pick bulk quantities across sizes (S, M, L, XL, XXL) and checkout with email OTP. Verified orders go directly into our PostgreSQL orders table.\n\n• Production Security in Azure:\nOur entire Azure deployment adheres to a Zero-Trust defense-in-depth model:\n- Zero Hardcoded Keys: Our FastAPI backend uses Azure System-Assigned Managed Identity and Azure Key Vault to authenticate with Azure OpenAI, Azure AI Vision, and Blob Storage—meaning zero API keys or database passwords exist in our codebase or Docker containers.\n- Private Network Isolation: Azure OpenAI, PostgreSQL, Key Vault, and Blob Storage communicate over Azure Private Endpoints inside our private Virtual Network (VNet) with public internet access disabled.\n- Ingress Protection: Public traffic enters through Azure API Management fronted by an Azure Application Gateway with Web Application Firewall (WAF) to block OWASP attacks, bot traffic, and prompt injection attempts.\n- Enterprise Compliance: Customer queries and images are processed with Azure OpenAI Content Safety filters and are guaranteed by Microsoft never to be stored, retained, or used to train public foundation models.\n\nFuture & In-Progress R&D:\n• For custom garments, we are building a generative pipeline using Stable Diffusion XL, ControlNet, and SAM to turn sketches into realistic photos. In parallel, we are integrating Azure AI Vision OCR to read printed slogans and quotes on t-shirts and save them in PostgreSQL, so buyers can search by exact printed text.",
  "userExample": {
    "query": "Do you have a pink T-shirt?",
    "description": "End-to-end execution flow showing how a retailer's natural language question travels through our AI models, databases, and UI to place an order.",
    "steps": [
      {
        "step": "01",
        "stage": "Frontend → API",
        "system": "Retailer Portal & FastAPI",
        "text": "Buyer types 'Do you have a pink T-shirt?' into the search bar; the Next.js frontend sends an async POST request to the FastAPI backend endpoint (/api/v1/search/hybrid) with limit 25."
      },
      {
        "step": "02",
        "stage": "Text Vectorization",
        "system": "Azure AI Vision (vectorizeText)",
        "text": "FastAPI calls Azure AI Vision's vectorizeText API in ~15ms, producing a 1024-dimensional float vector normalized to length 1.0 to project directly into our shared image vector space."
      },
      {
        "step": "03",
        "stage": "Top-K Vector Search",
        "system": "ChromaDB (HNSW Index)",
        "text": "ChromaDB performs hardware-accelerated dot products across its in-memory HNSW graph in 4ms, retrieving the Top-25 closest product IDs (e.g. PROD_0014, PROD_0089) matching pink t-shirts."
      },
      {
        "step": "04",
        "stage": "Live Data Hydration",
        "system": "PostgreSQL Database",
        "text": "FastAPI executes a SQL lookup in PostgreSQL to fetch real-time inventory (S: 120, M: 250, L: 180, XL: 90), fabric specs (220gsm Combed Cotton), wholesale price ($12.50/unit), and CDN image URLs."
      },
      {
        "step": "05",
        "stage": "Multimodal RAG Evaluation",
        "system": "Azure OpenAI (GPT-4o)",
        "text": "The prompt combines the buyer's query, PostgreSQL data, and image URLs. GPT-4o analyzes them and returns a grounded styling recommendation with zero hallucinations."
      },
      {
        "step": "06",
        "stage": "UI Render & Order Confirmation",
        "system": "Retailer Web Portal & Orders Table",
        "text": "The portal lazy-loads the top 25 pink t-shirts at 60fps; the retailer chooses bulk quantities (50 S, 100 M, 100 L, 50 XL), verifies with OTP, and order ORD_9421 ($3,750) is inserted into PostgreSQL."
      }
    ],
    "sampleOutput": {
      "aiResponse": "Yes! We have our Blush Pink Crewneck T-Shirt (PROD_0014) in stock across sizes S, M, L, and XL. It is crafted from premium 220gsm Combed Organic Cotton at $12.50/unit wholesale with 640 total pieces available. Below are the closest matching design samples from our archive:",
      "orderRecord": {
        "order_id": "ORD_9421",
        "retailer_id": "RET_8820 (Nordic Apparel)",
        "product_id": "PROD_0014",
        "breakdown": "S: 50 | M: 100 | L: 100 | XL: 50",
        "total_units": 300,
        "total_value": "$3,750.00",
        "status": "CONFIRMED_IN_POSTGRESQL"
      }
    }
  },
  "bookmarkedConcepts": [
    {
      "id": "fashion-360-visualization",
      "title": "360° Fashion Visualization",
      "badge": "Diffusion & Vision Foundation Models",
      "summary": "360° fashion visualization using diffusion and vision foundation models allows generating photorealistic, view-consistent images of garments from all angles.",
      "details": [
        "In Simple Terms: Instead of hiring a photo studio and models to shoot 20 angles for every garment, 360° visualization uses vision-conditioned diffusion models to synthesize photorealistic, view-consistent perspectives (front, side, 45° profile, back) from a single flat product photo.",
        "Preserving Seam & Fabric Integrity: The pipeline conditions on high-resolution garment masks and depth maps (via ControlNet / Zero123) to ensure logos, pocket placement, seams, and fabric textures do not warp or hallucinate across viewpoints.",
        "Multi-View Consistency: Generates front, side, and back views for the retailer with automated visual consistency and resolution checks before publishing to the lookbook.",
        "Interview Answer: 'For 360° fashion visualization, we use multi-view conditioned diffusion models to synthesize 360-degree garment perspectives from single flat-lay images, preserving fabric textures and seam integrity without expensive physical photoshoots.'"
      ],
      "workflowSteps": [
        {
          "step": "1. Input product image",
          "desc": "A photograph of the original garment, ideally with multiple reference angles, clear fabric details, and a clean background."
        },
        {
          "step": "2. Generate or synthesize a view",
          "desc": "A model generates a new view or places the garment into a target pose. The system must preserve key details such as color, pockets, seams, logos, and shape."
        },
        {
          "step": "3. Review multiple views",
          "desc": "Present front, side, and back images to the shopper, with quality checks to detect visual inconsistencies."
        }
      ]
    },
    {
      "id": "azure-ai-vision",
      "title": "Azure AI Vision",
      "badge": "Multimodal Embeddings",
      "summary": "Turns clothing photos and text descriptions into matching 1024-number lists (vectors) so the computer can compare visual styles.",
      "details": [
        "In Simple Terms: Think of it as a fashion translator. It looks at a picture of a floral dress and creates a digital fingerprint of 1024 numbers representing its color, pattern, cut, and fabric.",
        "Why We Need It: It places both photos and text descriptions into the exact same coordinate space. If a customer types 'green summer linen shirt', the search points straight to photos of green linen shirts even if the word 'linen' isn't in the product title.",
        "Interview Answer: 'We used Azure AI Vision because it provides pre-trained fashion embeddings out-of-the-box via managed API endpoints, saving us from hosting and maintaining expensive GPU servers.'"
      ]
    },
    {
      "id": "azure-openai",
      "title": "Azure OpenAI",
      "badge": "GPT-4o Fashion Stylist",
      "summary": "Acts as an expert digital stylist that reviews search results, compares fabrics, and gives honest advice to retail buyers.",
      "details": [
        "In Simple Terms: It's like having an experienced fashion designer standing next to the shopper, answering questions like 'Will this blazer match these linen trousers?'",
        "Smart Division of Labor: GPT-4o never scans 10,000 photos itself—that would be way too slow and expensive. Instead, ChromaDB finds the top 50 matches first, and GPT-4o only reviews those top items.",
        "Interview Answer: 'We use GPT-4o for high-level styling advice, grounded directly with live inventory and fabric specs from PostgreSQL so it never invents fake prices or out-of-stock items.'"
      ]
    },
    {
      "id": "azure-production-security",
      "title": "Azure Production Security",
      "badge": "Zero-Trust Enterprise Architecture",
      "summary": "Secures our AI fashion platform using Managed Identities (zero hardcoded API keys), Private Endpoints (zero public exposure), and Azure Key Vault.",
      "details": [
        "In Simple Terms: Instead of leaving database passwords or OpenAI API keys inside our code where a hacker could find them, our Azure containers authenticate automatically using digital ID badges called Managed Identities.",
        "Private Network Fortress: Azure OpenAI, PostgreSQL, and Blob Storage are locked inside a private Virtual Network (VNet) with Private Endpoints. Public internet access is disabled, so outsiders cannot even reach the database login screen.",
        "Interview Answer: 'We implemented Zero-Trust on Azure: FastAPI runs with a System-Assigned Managed Identity, resources communicate over Private Endpoints with public access disabled, and Azure WAF + Content Safety protects against OWASP and prompt injection attacks.'"
      ]
    },
    {
      "id": "chromadb",
      "title": "ChromaDB",
      "badge": "Embedded Vector Database",
      "summary": "Our open-source vector store that runs directly inside our FastAPI backend, finding matching clothing designs in under 5 milliseconds.",
      "details": [
        "In Simple Terms: Think of it as a specialized search engine for numbers. It stores the 1024-number style vectors of our 10,000 clothing items and instantly finds the closest matches.",
        "Why Embedded Mode: It runs directly inside our Python process using HNSW in-memory indexing. This means zero network hops, sub-5ms retrieval, and zero cloud hosting fees for vector storage.",
        "Interview Answer: 'We chose ChromaDB for Project 1 because our catalog of 10,000 garments easily fits into in-memory HNSW graphs. Running ChromaDB embedded in FastAPI cut vector query latency to 4ms with zero external infrastructure overhead.'"
      ],
      codeFilename: "vector_store.py",
      code: `import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(
    name="fashion_catalog",
    metadata={"hnsw:space": "cosine"}
)

# Sub-5ms in-memory similarity retrieval
results = collection.query(
    query_embeddings=[query_vector],
    n_results=10,
    include=["documents", "metadatas", "distances"]
)`
    },
    {
      "id": "cosine-similarity",
      "title": "Cosine Similarity",
      "badge": "Style Match Score",
      "summary": "Measures the angle between two style vectors to score how closely a customer's request matches a catalog item from 0% to 100%.",
      "details": [
        "In Simple Terms: Imagine two arrows pointing in space. If they point in the exact same direction, the angle is 0° and the match is 1.0 (100% match). If they are perpendicular, the match is 0.",
        "Why Angle Beats Distance: A high-resolution photo and a low-resolution photo might have different vector lengths, but their angle points to the exact same visual style.",
        "Interview Answer: 'We use cosine similarity because it focuses purely on visual direction and style rather than image brightness or file size.'"
      ]
    },
    {
      "id": "hnsw",
      "title": "HNSW",
      "badge": "Millisecond Graph Search",
      "summary": "An express-highway graph algorithm that searches through 10,000 clothing designs in less than 5 milliseconds.",
      "details": [
        "In Simple Terms: Think of searching a phonebook or using highway express lanes. Instead of checking all 10,000 items one by one, HNSW takes a few big leaps across categories, then zooms into the exact matching style.",
        "Why It Matters: A linear scan of 10,000 items takes 150ms+. HNSW cuts that down to 4ms, keeping our web application feeling instantaneous.",
        "Interview Answer: 'HNSW gives us logarithmic search speed (O(log N)) and runs in-memory, requiring only ~40MB of RAM for our entire 10,000-item catalog.'"
      ]
    },
    {
      "id": "l2-normalization",
      "title": "L2 Normalization",
      "badge": "Speed Calculation Shortcut",
      "summary": "Rescales every vector so its mathematical length is exactly 1.0, turning slow math into lightning-fast CPU multiplications.",
      "details": [
        "In Simple Terms: Dividing every number in a vector by its total length makes all vectors equal to 1.0 in length without changing their direction.",
        "The Huge Speedup: When vectors have a length of 1.0, complex cosine similarity formulas simplify into basic multiplication and addition (dot product).",
        "Interview Answer: 'We L2-normalize all vectors on ingestion so the CPU can calculate thousands of similarity scores in milliseconds using raw hardware instructions.'"
      ]
    },
    {
      "id": "langchain-langgraph",
      "title": "LangChain / LangGraph",
      "badge": "Workflow Controller",
      "summary": "Orchestrates the multi-step search process—from user query to vector search, database verification, and stylist review.",
      "details": [
        "In Simple Terms: It acts like the project manager. It guides the user's search step-by-step: first search vectors, then verify warehouse stock, then ask GPT-4o for styling notes, and finally display results.",
        "Handling Dead Ends with Loops: If a customer searches for something completely out of stock, LangGraph loops back and suggests similar in-stock alternatives instead of failing.",
        "Interview Answer: 'LangGraph gives us stateful, cyclic workflow control with clean fallback paths if search filters return zero items.'"
      ],
      codeFilename: "workflow_graph.py",
      code: `from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class FashionSearchState(TypedDict):
    query: str
    top_matches: List[dict]
    in_stock: bool
    stylist_summary: str

workflow = StateGraph(FashionSearchState)
workflow.add_node("vector_search", search_chromadb_step)
workflow.add_node("verify_stock", verify_sql_inventory_step)
workflow.add_node("stylist_review", gpt4o_stylist_step)

# Conditional edge: loops if stock empty
workflow.add_conditional_edges("verify_stock", check_inventory_threshold)`
    },
    {
      "id": "late-vector-fusion",
      "title": "Late Vector Fusion",
      "badge": "Blending Text & Photo",
      "summary": "Combines a photo vector and a text vector using a 65% text / 35% photo formula when a user uploads an image and types an adjustment.",
      "details": [
        "In Simple Terms: If a user uploads a picture of a leather jacket and types 'make it red linen', late fusion blends 65% of the new text instruction with 35% of the original jacket's shape.",
        "Why Not Early Fusion: Early fusion feeds raw pixels and text into a giant model together, costing 10x more latency. Late fusion simply blends two existing vectors in under 1 millisecond.",
        "Interview Answer: 'Late fusion lets users refine visual searches with text adjustments instantaneously with zero extra model inference cost.'"
      ]
    },
    {
      "id": "lazy-loading",
      "title": "Lazy Loading",
      "badge": "Smooth 60fps UI",
      "summary": "Loads 25 clothing items at a time so the webpage opens in 80ms and never stutters or lags.",
      "details": [
        "In Simple Terms: Don't load 500 heavy images when the user only sees the top 6 on their screen. Load the first 25, and load the next batch only as they scroll down.",
        "The Practical Result: Cuts initial page load time from 4.2 seconds down to 85 milliseconds and saves mobile users from wasting cellular data.",
        "Interview Answer: 'We batch UI rendering into 25-item chunks with intersection observers to maintain a fluid 60fps scroll experience even on budget smartphones.'"
      ]
    },
    {
      "id": "multimodal-dual-encoder",
      "title": "Multimodal Dual-Encoder",
      "badge": "Two-Tower AI Model",
      "summary": "Uses two separate neural networks—one looking at photos and one reading words—trained to map matching concepts together.",
      "details": [
        "In Simple Terms: Imagine one expert looking at pictures and another reading text. They were trained together until they agreed on what 'casual summer floral dress' looks like.",
        "Why It's Fast: Image vectors are generated once and saved into ChromaDB. At search time, we only run the lightweight text tower, so search takes milliseconds.",
        "Interview Answer: 'A two-tower dual encoder allows asynchronous offline pre-computation of image embeddings, making real-time search fast and scalable.'"
      ]
    },
    {
      "id": "multimodal-rag",
      "title": "Multimodal RAG",
      "badge": "Live Stock Grounding",
      "summary": "Connects vector search (ChromaDB), live inventory (PostgreSQL), and AI reasoning (GPT-4o) so the copilot never invents fake products.",
      "details": [
        "In Simple Terms: Before the AI says a single word to the customer, it looks up the real database to check prices, available sizes (S to XXL), and real stock.",
        "Why Not Fine-Tune an AI: Clothing prices and inventory change every single hour. Fine-tuning an AI is slow and expensive. RAG feeds fresh data on every single search.",
        "Interview Answer: 'We use RAG rather than fine-tuning so our AI always recommends items that are actually in stock and priced accurately right now.'"
      ]
    },
    {
      "id": "ranking-reranking",
      "title": "Ranking & Re-ranking",
      "badge": "Two-Stage Search Funnel",
      "summary": "Casts a wide net first with fast vector search, then applies business rules and stylist logic to show the best 25 items.",
      "details": [
        "In Simple Terms: Think of it like job hiring. Stage 1 quickly screens 1,000 resumes down to 50 candidates in 5ms. Stage 2 interviews those top 50 in detail to pick the top 5.",
        "The Pipeline Steps: ChromaDB grabs the top 50 visually similar items. PostgreSQL filters out out-of-stock sizes. GPT-4o orders them by seasonal trend relevance.",
        "Interview Answer: 'Two-stage retrieval gives us the speed of vector search combined with the precision of business logic filters and LLM quality scoring.'"
      ]
    },
    {
      "id": "sdxl-controlnet",
      "title": "SDXL & ControlNet",
      "badge": "AI Sketch-to-Photo Studio",
      "summary": "Turns rough hand-drawn fashion sketches into photorealistic clothing catalog images without warping the garment's neckline or seams.",
      "details": [
        "In Simple Terms: ControlNet acts like a coloring book outline—it locks the seams, collar, and zipper. SDXL then fills inside the lines with realistic silk, denim, or cotton textures.",
        "Segment Anything (SAM): Automatically cuts out the clothing area so designers can test 10 different fabric patterns without changing the model's face or pose.",
        "Interview Answer: 'ControlNet prevents generative hallucination by preserving structural edge lines from the designer's original sketch.'"
      ]
    },
    {
      "id": "semantic-search",
      "title": "Semantic Search",
      "badge": "Meaning Over Exact Words",
      "summary": "Searches by conceptual meaning so customers find what they want even with typos, slang, or synonyms.",
      "details": [
        "In Simple Terms: If a customer types 'crimson winter top', old keyword search fails if the product is tagged 'red sweater'. Semantic search knows that crimson means red and winter top means sweater.",
        "Works Across Slang & Synonyms: Connects 'hoodie' to 'sweatshirt', 'pants' to 'trousers', and 'gym clothes' to 'activewear' automatically.",
        "Interview Answer: 'Semantic search maps user queries into concept space, eliminating zero-result searches caused by vocabulary mismatches.'"
      ]
    },
    {
      "id": "shared-vector-space",
      "title": "Shared Vector Space",
      "badge": "Common AI Coordinate Room",
      "summary": "The mathematical room where both pictures of clothing and written sentences share the exact same coordinates.",
      "details": [
        "In Simple Terms: Normally, photos are made of pixels and descriptions are made of words. In a shared space, both are converted into coordinates where 'similar meaning = close distance'.",
        "Direct Search Without Tags: You don't need human workers to manually tag 10,000 images with 50 keywords each. The photo itself lives near the text concepts automatically.",
        "Interview Answer: 'Shared vector space enables zero-shot cross-modal retrieval, letting users search raw photos using natural language without manual labeling.'"
      ]
    },
    {
      "id": "top-k-vector-search",
      "title": "Top-K Vector Search",
      "badge": "Instant Best Matches",
      "summary": "Grabbing the top 25 or 50 closest matching clothing items in under 10 milliseconds using ChromaDB and HNSW.",
      "details": [
        "In Simple Terms: Top-K simply means: 'Out of all 10,000 items in our catalog, give me the K (e.g. 25) designs that are closest in style to what the user wants.'",
        "Why K=50: Fetching 50 candidates gives enough variety to filter for size, color, and budget without slowing down the server.",
        "Interview Answer: 'We retrieve the Top-50 nearest neighbors via ChromaDB in 5ms, pass them through our PostgreSQL business filter, and display the final Top-25.'"
      ]
    }
  ]
};
