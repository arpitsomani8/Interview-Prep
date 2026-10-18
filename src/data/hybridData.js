export const hybridData = {
  title: "Hybrid AI Engine | Multi-Tenant Hybrid ML & RAG Solution",
  resumeBullet: "Architected a zero-to-one multi-tenant platform with dynamic I/O schemas, automated training with classical ML or fallback to RAG (LLMs + Pinecone) for cold-start scenarios or unstructured queries, and optimized agentic AI workflows integrating LLaMA with vector databases.",
  
  businessProblem: {
    title: "1. The Core Business Problem (Why We Built This)",
    subtitle: "The Real-World Enterprise SaaS Bottleneck",
    intro: "In an enterprise multi-tenant B2B SaaS platform serving hundreds of client organizations, standard ML or standard GenAI alone breaks down across three fatal bottlenecks:",
    challenges: [
      {
        title: "The Rigid Schema Bottleneck",
        problem: "Client A (Fintech) needs fraud detection with fields like account_age_days and transaction_velocity_24h. Client B (E-commerce) predicts churn with days_since_last_purchase. Client C (Healthcare) predicts ICU risk. Traditional approach forces developers to manually write code, tables, Pydantic schemas, and Docker images for every client—completely unscalable.",
        solution: "Zero-to-one Dynamic Schema Engine where clients register raw JSON field specifications, dynamically creating Pydantic v2 validation models in memory at runtime without code changes or restarts."
      },
      {
        title: "The Cold-Start Dilemma (#1 Problem in Enterprise ML)",
        problem: "When a new customer signs up on Day 1, they have < 100 historical records. Supervised ML (LightGBM, Random Forest) will severely overfit and fail validation on 20 rows. However, the client still expects intelligent decision support on Day 1 based on their compliance policies and manuals.",
        solution: "Intelligent Cold-Start Fallback: When historical data is < 100 samples, the engine serializes structured numbers into a semantic prompt, queries Pinecone vector search, and uses LLaMA to return policy-grounded recommendations."
      },
      {
        title: "The Dual Query Reality (Structured Numbers vs Natural Language)",
        problem: "Clients send structured numbers for automated scoring (e.g., {'velocity': 7200, 'failed_logins': 3}), but human analysts also type free-form natural language questions ('What is our policy for accounts with velocity over $5,000?'). Classical ML crashes on text; pure LLMs are too slow (>2s) and expensive for sub-millisecond numerical scoring.",
        solution: "Unified Intelligent Hybrid Router directing requests to sub-millisecond Classical ML (< 5ms) or LLaMA + Pinecone RAG (< 300ms)."
      }
    ]
  },

  architectureSteps: [
    {
      step: "Step 1",
      title: "Multi-Tenant Header Isolation (X-Tenant-ID)",
      desc: "Every request hits FastAPI with a mandatory header: 'X-Tenant-ID: fintech_corp'. A FastAPI dependency interceptor validates and extracts this header before any business logic is executed. If missing, it immediately throws 400 Bad Request. This tenant ID becomes the universal partitioning key across PostgreSQL queries, Pydantic models, and Pinecone vector namespaces."
    },
    {
      step: "Step 2",
      title: "Dynamic Schema Generation at Runtime",
      desc: "Tenants register field definitions once via JSON. The DynamicSchemaRegistry calls Pydantic v2's create_model('DynamicTenant_{tenant_id}', **field_defs) on the fly in memory. Schemas are stored in PostgreSQL (tenant_schemas JSONB table) and cached locally so worker processes immediately have schemas in memory upon container restarts."
    },
    {
      step: "Step 3",
      title: "Runtime Validation & Z-Score Feature Drift Detection",
      desc: "Incoming JSON is validated against the dynamic Pydantic class (negative numbers or illegal enum strings return structured 400 errors). During training, baseline mean (mu) and standard deviation (sigma) are fit. At inference, the validator computes Z = |x - mu| / sigma. If Z > 3.0 (> 3 standard deviations from training distribution), a drift_detected: true alert is attached to the API response in <1ms without blocking."
    },
    {
      step: "Step 4",
      title: "Automated Tabular ML Pipeline (LightGBM, Optuna, Joblib)",
      desc: "When rows reach >= 100, training is enabled. Missing numerical values are median-imputed; categoricals are mode-imputed and cast to pandas category dtype. Optuna's Tree-structured Parzen Estimator (TPE) runs 8–10 Bayesian optimization trials over an 80/20 train/validation split, tuning learning rate, num_leaves, and max_depth to maximize validation ROC-AUC. LightGBM trains with early stopping (15 rounds), serialized with Joblib, and metadata logged to PostgreSQL."
    },
    {
      step: "Step 5",
      title: "The Intelligent Hybrid Router (3 Routes)",
      desc: "Route 1 (Classical Tabular ML): Structured JSON + Trained model (>= 100 rows) -> Sub-5ms prediction score (0.0 to 1.0) and drift report. Route 2 (Cold-Start RAG Fallback): Structured JSON + Cold-start (< 100 rows) -> Serializes numbers to semantic query -> Queries Pinecone namespace -> LLaMA policy assessment (200-300ms). Route 3 (Unstructured RAG): Payload contains natural_language_query -> Embeds question -> Queries Pinecone -> LLaMA synthesizes answer with direct citations."
    },
    {
      step: "Step 6",
      title: "Multi-Tenant Vector RAG with LLaMA & Pinecone Serverless",
      desc: "Zero Cross-Tenant Leakage: A single Pinecone Serverless index is partitioned strictly by namespace=tenant_id. Client fintech_corp can never search ecommerce_inc documents. Generates 384-d unit-norm dense embeddings. LLaMA 3.1 synthesizes structured decision reports with institutional rule citations. If the LLM engine is offline, a deterministic template engine steps in to guarantee zero 500 errors."
    }
  ],

  databaseReality: {
    title: "4. The Database Reality: Keeping Our Existing Production PostgreSQL Server",
    text: "We did NOT migrate or transfer our database to Azure or any external cloud. The company already has a dedicated production PostgreSQL server where relational tables live. Pinecone Serverless handles only high-dimensional 384-d vectors, while PostgreSQL handles all ACID-compliant relational data across 3 core tables: tenant_schemas (JSONB dynamic schema definitions), tenant_tabular_records (historical ingested customer records), and tenant_model_registry (model file paths, Optuna validation AUC, and baseline drift statistics). The backend connects via connection pooling over an internal secure network with local SQLite fallback for offline testing."
  },

  algorithmicTradeoffs: [
    {
      component: "1. Tabular ML: LightGBM vs XGBoost, CatBoost & Neural Nets",
      whyChosen: "Histogram-based splits and leaf-wise tree growth train 5-10x faster than XGBoost and use significantly less RAM. Native categorical handling via Fisher's exact test without one-hot encoding dimension explosion. Sub-millisecond inference (< 2ms) on standard CPUs.",
      whyNotOthers: "XGBoost trains slower and requires manual one-hot encoding. CatBoost has slower CPU inference latency and a heavier memory footprint. Neural Networks (TabNet) are massive overkill for < 100,000 rows—trees consistently outperform neural nets on tabular data at 1/100th the compute and zero GPU dependencies. Logistic Regression cannot model non-linear feature interactions."
    },
    {
      component: "2. Hyperparameter Tuning: Optuna vs GridSearchCV & Ray Tune",
      whyChosen: "Employs Bayesian Optimization via Tree-structured Parzen Estimators (TPE), building a probabilistic model of the objective function to focus on high-performing parameter regions in 8-10 trials.",
      whyNotOthers: "GridSearch has exponential complexity O(k^N), wasting 80% of compute on useless combinations. Ray Tune is designed for massive distributed multi-node clusters; adding Ray introduces heavy background daemons and operational bloat to a lightweight microservice."
    },
    {
      component: "3. LLM Selection: LLaMA vs Proprietary Cloud APIs",
      whyChosen: "Enterprise compliance (GDPR, HIPAA in banking/healthcare) strictly prohibits sending customer data to third-party public APIs. Self-hosting LLaMA via vLLM provides predictable, fixed infrastructure costs rather than volatile per-token billing, achieving 80+ tokens/second.",
      whyNotOthers: "Proprietary cloud APIs incur recurring token costs and introduce third-party data residency and outage vulnerabilities."
    },
    {
      component: "4. Vector DB: Pinecone Serverless vs pgvector & Chroma",
      whyChosen: "Strict namespace isolation (namespace=tenant_id) within a single serverless index guarantees zero cross-tenant vector leakage. True serverless cost model ($0/month idle cost) that scales automatically during query surges.",
      whyNotOthers: "pgvector inside PostgreSQL causes database bloat across hundreds of tenant tables, requires frequent VACUUM tuning, and competes with transactional SQL queries for RAM. In-memory Chroma/FAISS runs inside the Python process, risking container OOM crashes under concurrent client traffic and losing state upon pod restarts."
    }
  ],

  edgeCasesTable: [
    {
      question: "Why exactly 100 samples as the threshold for training?",
      answer: "Gradient boosted trees need sufficient sample diversity. With an 80/20 train/validation split, 100 samples yields 80 train and 20 validation rows. Below 80 samples, validation AUC is noisy and early stopping cannot reliably prevent overfitting. Between 0 and 99 rows, RAG retrieval on institutional policy is far more reliable and auditable than a weakly trained ML model."
    },
    {
      question: "How do you prevent Tenant A from seeing Tenant B's data?",
      answer: "We enforce multi-tenancy at every layer: (1) HTTP header X-Tenant-ID validation on entry; (2) Separate dynamic Pydantic models per tenant; (3) Dedicated directory paths and PostgreSQL table tenant IDs; and (4) Strict Pinecone Namespaces (namespace=tenant_id) ensuring zero vector leakage."
    },
    {
      question: "What happens if a tenant sends bad data or corrupted types?",
      answer: "The dynamic Pydantic v2 engine validates inputs before reaching any ML booster. If a numeric value violates boundary rules (e.g. age < 0) or an unapproved category string is supplied, Pydantic catches it immediately, returning structured field-level errors (400 Validation Error) with zero impact on ML memory."
    },
    {
      question: "How does cold-start fallback convert tabular numbers to vector search?",
      answer: "The IntelligentRouter serializes the dictionary into a semantic representation: 'Evaluation criteria for tenant entity with attributes: velocity: 7200, risk: high'. This text is embedded into a 384-dimensional vector and queried against the tenant's Pinecone namespace to retrieve the closest matching institutional policy guidelines for LLaMA synthesis."
    },
    {
      question: "How do you know when an ML model needs re-training?",
      answer: "Through our Z-score feature drift monitoring. During training, the preprocessor fits baseline mean (mu) and standard deviation (sigma). At inference, if incoming values exceed Z > 3.0, a drift_detected alert is triggered. When drift exceeds a threshold percentage of traffic, an automated re-training pipeline is scheduled."
    }
  ],

  executiveScript: `In enterprise SaaS, building AI for multiple tenants is challenging because every client has completely different data schemas, and new clients join with zero historical data to train an ML model.

I architected the Hybrid AI Engine—a multi-tenant platform that solves this using a two-tier hybrid architecture:

First, we built a Dynamic Schema Engine using Pydantic v2. Instead of writing hardcoded models for each client, tenants register a JSON specification of their business fields, and our engine creates dynamic validation models in memory at runtime, complete with numerical bounds, categorical enums, and Z-score feature drift monitoring.

Second, we solved the cold-start problem with an Intelligent Hybrid Router:
• If a tenant has accumulated >= 100 records, our automated pipeline runs Optuna Bayesian hyperparameter optimization and trains a LightGBM model with early stopping, serving sub-millisecond predictions (< 5 ms).
• If a tenant is brand new (< 100 records), the engine serializes their tabular attributes into a semantic query, retrieves the tenant's internal compliance and operational policies from Pinecone Serverless using strictly isolated namespaces, and uses LLaMA to return a grounded decision report.
• If an analyst submits a free-form natural language query, it automatically routes to vector search and LLaMA regardless of training status.

On the storage side: We kept our existing production PostgreSQL server untouched for all relational data—dynamic schema definitions, training batches, and model audit records. We used Pinecone purely for high-dimensional vector search with strict namespace partitioning, guaranteeing zero cross-tenant data leakage at minimal operational cost.`
};
