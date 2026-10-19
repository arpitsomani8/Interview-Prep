export const hybridData = {
  title: "Hybrid AI Engine | Multi-Tenant Hybrid ML & RAG Solution",
  resumeBullet: "Architected a multi-tenant enterprise platform with dedicated per-tenant PostgreSQL databases, automated tabular ML training (LightGBM + Optuna), and cold-start fallback to RAG (LLaMA + Pinecone) accessing locally stored institutional policy files.",

  executiveScript: `We built the Hybrid AI Engine—a general multi-tenant AI decision platform designed for enterprise client organizations.

To understand what data we store: Our platform serves different enterprise client companies (our "tenants"). For example, one tenant is a digital bank (fintech_corp), another is an online retailer (ecommerce_inc), and another is a healthcare group. Inside each client's dedicated database, we store their domain-specific business data—such as bank customers' transaction logs (transaction amounts, 24-hour velocity, failed logins, fraud labels) or e-commerce customer churn records.

The core challenge was two-fold:
1. Different clients need completely different predictive models and business rules.
2. When a new enterprise client joins on Day 1, they have zero historical records (< 100 rows). Supervised machine learning cannot train reliably on 20 rows without massive overfitting, yet the client still needs immediate, automated decision support based on their official compliance rulebooks and operational manuals.

Here is how our architecture works in simple terms:

First, for data storage and tenant isolation, we use PostgreSQL as our core relational database. We give each enterprise client their own dedicated database (such as db_fintech_corp and db_ecommerce_inc). This physically separates their business transaction records, historical logs, and trained models with zero risk of cross-client data leakage. We use Pydantic v2 within FastAPI purely for fast incoming request validation (verifying types, required fields, and numerical bounds before anything touches the database or models).

Second, for Offline Policy Ingestion: When a tenant uploads their compliance manuals or operational rulebooks (e.g. anti-money laundering policies):
• 1. The original PDF/document is saved on secure local storage, and its file path (e.g. /policies/fintech_corp/aml_v1.pdf) is registered in the tenant's PostgreSQL database.
• 2. A background pipeline extracts the text and splits it into semantic chunks (250–300 words each with 50-word overlap).
• 3. Each chunk is converted into a 384-dimensional vector embedding.
• 4. These vectors are pre-loaded and stored into Pinecone Serverless under that specific client's isolated namespace (namespace=tenant_id).

Third, our Intelligent Hybrid Router directs incoming requests across three clear paths:
• 1. Classical ML Route: When a tenant accumulates 100 or more records in their PostgreSQL database, our automated pipeline runs Optuna Bayesian optimization to tune a LightGBM model. This delivers instant prediction scores in under 5 milliseconds on standard CPUs.
• 2. Cold-Start RAG Fallback: When a tenant is brand new with fewer than 100 records, the router looks up the tenant's policy file location from PostgreSQL, searches Pinecone for the closest matching pre-embedded policy clauses, and passes them to self-hosted LLaMA. LLaMA returns an audit-ready, policy-backed recommendation in ~250 milliseconds with zero hallucinations.
• 3. Unstructured Question Route: If a risk analyst types a free-form natural language question (like "What is our policy for accounts with velocity over $5,000?"), it queries Pinecone and LLaMA directly for an answer with exact document citations.

Finally, during real-time inference, our validator calculates Z-scores (|x - μ| / σ) against the baseline distribution stored in PostgreSQL. If live incoming numbers drift by more than 3 standard deviations, a drift alert is flagged in under 1 millisecond so the team knows when automated re-training is needed.

To make the platform production-ready, we containerized the entire backend using multi-stage Docker builds. This locks all system dependencies and C++ runtimes for LightGBM, keeps the final container image lightweight (< 250MB), and enables seamless zero-downtime rolling deployments and horizontal autoscaling across enterprise clusters.`,

  userExample: {
    query: 'POST /api/v1/predict with X-Tenant-ID: fintech_corp, {"velocity_24h": 7200, "failed_logins": 3, "amount": 850}',
    latency: "< 5ms (Classical ML) / < 250ms (Cold-Start RAG)",
    description: "End-to-end execution flow showing how an enterprise request routes to the tenant's dedicated PostgreSQL database, checks local policy files via Pinecone in cold-start or runs LightGBM, and logs the decision.",
    steps: [
      {
        step: "01",
        stage: "Tenant Header & Database Routing",
        system: "FastAPI Middleware",
        text: "The request arrives with header 'X-Tenant-ID: fintech_corp'; FastAPI extracts the header and opens a pooled connection to the tenant's dedicated PostgreSQL database (db_fintech_corp)."
      },
      {
        step: "02",
        stage: "Pydantic v2 Validation & Row Count",
        system: "FastAPI (Pydantic v2) & PostgreSQL",
        text: "FastAPI uses Pydantic v2 to strictly validate incoming payload types, bounds, and required fields in <1ms. It then queries db_fintech_corp to verify the tenant's total historical row count."
      },
      {
        step: "03",
        stage: "Real-Time Z-Score Drift Check",
        system: "Feature Drift Validator",
        text: "Computes Z = |x - μ| / σ against baseline statistics stored in the tenant's database; confirms transaction values are within normal limits (Z < 3.0), flagging drift_detected: false."
      },
      {
        step: "04",
        stage: "Intelligent Hybrid Router Decision",
        system: "3-Way Dynamic Router",
        text: "If historical records >= 100, routes to LightGBM (< 5ms). If < 100 (cold start), retrieves the tenant's local policy file path (/policies/fintech_corp/aml_policy.pdf) from PostgreSQL and queries Pinecone."
      },
      {
        step: "05",
        stage: "Model Scoring or Policy Reasoning",
        system: "LightGBM or Pinecone + LLaMA",
        text: "LightGBM scores the feature vector in 2ms (0.94 fraud probability). In cold-start, Pinecone fetches relevant policy clauses from the local file and LLaMA generates a policy-grounded recommendation."
      },
      {
        step: "06",
        stage: "Response & Audit Log Insertion",
        system: "FastAPI & PostgreSQL",
        text: "The API delivers the risk assessment to the caller in 4ms, while asynchronously inserting an audit record and policy reference into db_fintech_corp's tenant_audit_logs table."
      }
    ],
    sampleOutput: {
      decisionResponse: "High Fraud Risk Alert: Transaction flagged with 0.94 probability (Velocity: 7200, Failed Logins: 3). Drift Status: Normal (Z-score < 3.0). Recommended Action: Trigger secondary multi-factor authentication or manual compliance hold.",
      auditRecord: {
        audit_id: "AUD_7821",
        tenant_database: "db_fintech_corp (Dedicated PostgreSQL DB)",
        route_selected: "Route 1: Classical Tabular ML (LightGBM)",
        policy_reference: "Local file verified: /policies/fintech_corp/fraud_guidelines_2026.pdf",
        score: "0.94 (HIGH_RISK) in 3.8ms",
        status: "COMMITTED_IN_POSTGRESQL"
      }
    }
  },

  bookmarkedConcepts: [
    {
      id: "docker",
      title: "Docker",
      badge: "Container Packaging",
      summary: "Packages our Python code, ML libraries, and configuration into a clean container so it runs identically on any server with zero setup headaches.",
      details: [
        "In Simple Terms: Think of Docker like a sealed shipping container. Everything the app needs to run—Python version, LightGBM, and libraries—is packed inside so it runs smoothly everywhere.",
        "Why We Need It: LightGBM requires specific C++ compilers. Docker guarantees those compilers are pre-installed so new client environments boot up in seconds without setup errors.",
        "Interview Answer: 'We use multi-stage Docker builds to keep our production image under 250MB, ensuring fast deployments and identical runtimes across development and production.'"
      ]
    },
    {
      id: "fastapi",
      title: "FastAPI",
      badge: "High-Speed Python API",
      summary: "A modern Python framework that handles incoming customer requests in under 1 millisecond and generates automatic interactive documentation.",
      details: [
        "In Simple Terms: It's the front door of our application. It receives incoming data, checks that the numbers and fields are correct, and hands them to the AI engine instantly.",
        "Why We Chose It: It supports asynchronous requests natively, meaning it can process thousands of client requests simultaneously without waiting or freezing.",
        "Interview Answer: 'FastAPI provides asynchronous request handling, automatic Pydantic validation, and instant Swagger API documentation out-of-the-box.'"
      ]
    },
    {
      id: "lightgbm",
      title: "LightGBM",
      badge: "Fast Tabular Machine Learning",
      summary: "A gradient boosting tree model designed to analyze table data (numbers and categories) and return predictions in under 2 milliseconds on standard CPUs.",
      details: [
        "In Simple Terms: While LLMs are great for reading text, LightGBM is the champion for structured spreadsheets and tabular database records (like loan amounts, credit scores, and transaction history).",
        "Why We Chose It Over XGBoost: It groups continuous numbers into quick bins (histograms), making it train 7x faster and run predictions in under 2 milliseconds without needing an expensive GPU.",
        "Interview Answer: 'LightGBM gives us sub-2ms CPU inference and superior accuracy on tabular enterprise data, completely avoiding expensive GPU hosting bills.'"
      ]
    },
    {
      id: "llama",
      title: "LLaMA (Self-Hosted)",
      badge: "Private Enterprise LLM",
      summary: "A private open-source language model running inside our own infrastructure so confidential banking and healthcare data never leaves the client's network.",
      details: [
        "In Simple Terms: It's like having your own private ChatGPT that runs strictly on your own company computers, with zero risk of confidential data leaking to third-party public APIs.",
        "Why It's Crucial: Financial and healthcare regulations (GDPR, HIPAA) strictly forbid sending customer financial records over public APIs. Self-hosting LLaMA keeps all data 100% compliant and private.",
        "Interview Answer: 'We self-host LLaMA using vLLM to satisfy strict banking data compliance while locking in fixed hardware infrastructure costs instead of unpredictable per-token API bills.'"
      ]
    },
    {
      id: "multi-tenant",
      title: "Multi-Tenant Architecture",
      badge: "Strict Data Isolation",
      summary: "Serving multiple corporate clients on a single system while keeping each company's database completely isolated so data never mixes.",
      details: [
        "In Simple Terms: Think of an apartment building with separate locked doors. Every client has their own completely separate PostgreSQL database and Pinecone namespace—Client A can never see Client B's data.",
        "How It Works: Every incoming API request includes an X-Tenant-ID header. Our system checks this header and connects directly to that client's dedicated database in less than 1 millisecond.",
        "Interview Answer: 'We enforce physical database separation per client and isolate vector namespaces, guaranteeing zero risk of multi-tenant data cross-contamination.'"
      ]
    },
    {
      id: "optuna",
      title: "Optuna Bayesian Optimization",
      badge: "Smart Model Tuning",
      summary: "An automated tuning algorithm that finds the best machine learning settings (like tree depth and learning rate) in just 8 to 10 smart trials.",
      details: [
        "In Simple Terms: Instead of blindly guessing 100 different parameter combinations (like traditional Grid Search), Optuna learns from each trial and immediately tests the most promising settings.",
        "The Practical Benefit: Cuts model training time from 45 minutes down to 3 minutes, automatically optimizing the model whenever a tenant collects 100 new verified records.",
        "Interview Answer: 'Optuna uses Bayesian search to find optimal hyperparameters in 8 to 10 trials instead of wasting hours on brute-force grid searching.'"
      ]
    },
    {
      id: "pinecone",
      title: "Pinecone Serverless",
      badge: "Cloud Vector Database",
      summary: "A managed vector database that stores document chunks and policy manuals, isolated cleanly by tenant namespaces.",
      details: [
        "In Simple Terms: It acts like a lightning-fast library index for PDFs. It takes company policy manuals, breaks them into searchable ideas, and finds the exact relevant paragraph in 4 milliseconds.",
        "Serverless Cost Savings: When nobody is querying the system, our cost drops to $0/month. When traffic spikes, it scales up automatically without any manual server management.",
        "Interview Answer: 'Pinecone Serverless gives us instant query scalability with zero cluster maintenance, while namespace isolation keeps each enterprise client's documents strictly separate.'"
      ]
    },
    {
      id: "pydantic",
      title: "Pydantic",
      badge: "Data Guard & Type Safety",
      summary: "A blazing-fast Rust-powered library that inspects incoming API requests to catch invalid, missing, or corrupted data before it ever touches our database.",
      details: [
        "In Simple Terms: Think of it as a security guard at the door. If someone submits an order with a negative price, missing email, or malformed date, Pydantic immediately rejects it with a clear error message.",
        "Why It's Fast: Pydantic v2 was rewritten in Rust, validating hundreds of fields in less than 0.5 milliseconds with near-zero CPU usage.",
        "Interview Answer: 'Pydantic enforces strict type safety and value bounds at the API boundary, keeping corrupted records from ever reaching our database or ML models.'"
      ]
    },
    {
      id: "rag",
      title: "RAG (Retrieval-Augmented Generation)",
      badge: "Cold-Start & Policy Reasoning",
      summary: "Grounding the language model with actual company compliance rules and PDFs retrieved via vector search so it answers questions with 100% truthful citations.",
      details: [
        "In Simple Terms: When a new client joins, they haven't logged enough transactions to train a custom ML model yet. RAG reads their company policy PDF directly and explains rules immediately from Day 1.",
        "Auditable Explanations: When a risk analyst asks 'Why was this transaction flagged?', RAG doesn't just guess—it quotes the exact page and paragraph from the company's uploaded policy manual.",
        "Interview Answer: 'RAG solves the Day-1 cold-start problem: before we have enough historical data to train a LightGBM model, RAG provides instant, auditable policy guidance directly from uploaded compliance documents.'"
      ]
    }
  ]
};
