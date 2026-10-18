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

Finally, during real-time inference, our validator calculates Z-scores (|x - μ| / σ) against the baseline distribution stored in PostgreSQL. If live incoming numbers drift by more than 3 standard deviations, a drift alert is flagged in under 1 millisecond so the team knows when automated re-training is needed.`,

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
      id: "fastapi",
      title: "FastAPI",
      badge: "Async Web Framework",
      summary: "Modern, high-performance asynchronous Python web framework providing sub-millisecond request routing and native schema documentation.",
      details: [
        "Asynchronous Concurrency: Built on Starlette and uvloop, enabling high-throughput non-blocking I/O when routing between PostgreSQL, Pinecone, and ML models.",
        "Header Interception: Dependency injection intercepts every request to validate mandatory X-Tenant-ID headers before downstream database logic executes.",
        "Automatic OpenAPI Docs: Automatically produces interactive Swagger documentation from Python type signatures, streamlining enterprise client onboarding."
      ]
    },
    {
      id: "lightgbm",
      title: "LightGBM",
      badge: "Tabular Machine Learning",
      summary: "High-performance gradient boosting framework optimized for fast tabular training and sub-millisecond CPU inference.",
      details: [
        "Histogram-Based Speed: Uses histogram binning and leaf-wise tree growth, training 5x to 10x faster than traditional XGBoost while consuming less memory.",
        "Native Categoricals: Handles categorical features directly via Fisher's exact test without one-hot encoding dimension explosion.",
        "Sub-2ms CPU Latency: Delivers blazing-fast inference (< 2 milliseconds) on standard server CPUs without any expensive GPU requirements."
      ]
    },
    {
      id: "llama",
      title: "LLaMA",
      badge: "Self-Hosted Enterprise LLM",
      summary: "Self-hosted open-weights large language model providing private, compliant policy reasoning and citation generation.",
      details: [
        "Strict Enterprise Privacy: Banking and healthcare compliance (GDPR, HIPAA) strictly forbid sending sensitive enterprise data to third-party public APIs.",
        "Predictable Infrastructure Cost: Self-hosting LLaMA via vLLM gives fixed infrastructure expenses instead of volatile per-token API bills, delivering 80+ tokens/second.",
        "Grounded Policy Citations: Reads policy sections retrieved from local files via Pinecone, producing audit-ready decision reports for Day 1 cold-start guidance without hallucinations."
      ]
    },
    {
      id: "multi-tenant",
      title: "Multi-Tenant Architecture",
      badge: "Dedicated PostgreSQL DBs",
      summary: "Serving multiple enterprise clients with complete physical data separation using dedicated per-tenant PostgreSQL databases.",
      details: [
        "Dedicated Database Per Tenant: Each enterprise client operates on their own PostgreSQL database (e.g. db_fintech_corp), eliminating any possibility of data cross-contamination.",
        "Header-Based Routing: Every API request requires an X-Tenant-ID header, which automatically directs connection pools to that client's dedicated database.",
        "Pydantic v2 Request Validation: FastAPI uses standard Pydantic models to strictly validate field types, bounds, and required keys in under 1ms before queries hit the database.",
        "Local Policy Registration: Policy documents are saved on secure local disks, with file paths and metadata tracked in the tenant's PostgreSQL database."
      ]
    },
    {
      id: "optuna",
      title: "Optuna Bayesian Hyperparameter Optimization",
      badge: "Automated ML Tuning",
      summary: "Intelligent Bayesian hyperparameter tuning that finds optimal tree parameters in 8 to 10 trials.",
      details: [
        "Bayesian TPE: Employs Tree-structured Parzen Estimators to build a probabilistic model of validation ROC-AUC, focusing trials on high-performing parameter zones.",
        "Outperforms Grid Search: Traditional Grid Search has exponential O(k^N) complexity and wastes 80% of compute; Optuna converges in just 8–10 trials.",
        "Automated Retraining: Once a tenant accumulates 100 records in PostgreSQL, Optuna triggers automatically to train and serialize the best LightGBM model."
      ]
    },
    {
      id: "pinecone",
      title: "Pinecone Serverless",
      badge: "Isolated Vector Storage",
      summary: "Serverless vector database storing high-dimensional document embeddings partitioned strictly by tenant namespaces.",
      details: [
        "Strict Namespace Partitioning: A single index is strictly segregated by namespace=tenant_id, ensuring client A can never retrieve client B's vector data.",
        "Offline Chunking & Embeddings: A background ingestion pipeline extracts uploaded PDFs, chunks them into 250–300 words with 50-word overlap, generates 384-d vectors, and pre-saves them into Pinecone.",
        "Links to Local Files: Vector search matches semantic queries against pre-embedded chunks, linking back directly to the local policy file referenced in PostgreSQL.",
        "True Serverless Economics: Scales down to $0/month when idle and instantly scales up to handle query surges without manual cluster management."
      ]
    },
    {
      id: "pydantic",
      title: "Pydantic",
      badge: "Request Validation & Type Safety",
      summary: "Fast, Rust-powered data validation library enforcing strict input types, value ranges, and schema integrity.",
      details: [
        "Rust-Powered Speed: Pydantic v2 core is written in Rust, validating incoming payloads in under 1 millisecond with minimal CPU overhead.",
        "Strict Boundary Checks: Automatically checks value bounds (e.g. amount > 0, non-negative numbers) and rejects malformed fields before reaching databases or ML boosters.",
        "Structured 400 Errors: Returns clear, actionable validation error responses on invalid inputs, keeping backend services robust and predictable."
      ]
    },
    {
      id: "rag",
      title: "RAG (Retrieval-Augmented Generation)",
      badge: "Cold-Start & Policy Reasoning",
      summary: "Grounding LLaMA with internal compliance policies and operational manuals retrieved via vector search.",
      details: [
        "Solving the Day 1 Cold-Start: When a client has < 100 records, supervised ML would overfit; RAG retrieves policy rules from local files via Pinecone to give reliable guidance from Day 1.",
        "Unstructured Natural Language: Allows risk analysts to ask free-form policy questions ('What is the rule for wire transfers over $5k?') and get cited answers.",
        "Deterministic Fallback: If the LLM engine is ever offline, a deterministic template engine steps in to guarantee zero 500 errors."
      ]
    }
  ]
};
