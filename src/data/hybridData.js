export const hybridData = {
  title: "Hybrid AI Engine | Multi-Tenant Hybrid ML & RAG Solution",
  resumeBullet: "Architected a zero-to-one multi-tenant enterprise platform with dynamic I/O schemas, automated training with classical ML or fallback to RAG (LLMs + Pinecone) for cold-start scenarios or unstructured queries, and optimized agentic AI workflows integrating LLaMA with vector databases.",

  executiveScript: `We built the Hybrid AI Engine—a multi-tenant dynamic ML and RAG platform designed for enterprise applications.

The core business problem was that different enterprise clients have completely different data needs. For example, a fintech client needs fraud detection with transaction velocities, an e-commerce client needs customer churn prediction, and a healthcare client needs ICU risk scoring. In traditional systems, developers had to manually write new code, database tables, and validation models for every single client, which is completely unscalable. On top of that, when a new enterprise client joins on Day 1, they have zero or very few historical records (under 100 rows). Classical ML models fail and overfit on so little data, yet the client still expects intelligent decision support on Day 1 based on their compliance guidelines and standard operating procedures.

Here is how our architecture works:

First, we built a Dynamic Schema Engine using Pydantic v2. When an enterprise client registers their business fields via a JSON configuration, our engine dynamically builds validation models in memory at runtime without requiring code deployments or server restarts. Every incoming API request passes an X-Tenant-ID header, which isolates data at every layer.

Second, we store our data across two dedicated tiers:
• We kept our company's existing production PostgreSQL database for all relational data—storing dynamic schema definitions, incoming records, and trained model metadata.
• We used Pinecone Serverless for high-dimensional vectors, strictly isolating each client using namespaces (namespace=tenant_id) so client data can never mix.

Third, our Intelligent Hybrid Router handles three distinct query paths:
• 1. Classical ML Route: If a client has accumulated 100 or more records, our automated pipeline runs Optuna Bayesian optimization to tune a LightGBM model. It serves ultra-fast predictions in under 5 milliseconds on standard CPUs.
• 2. Cold-Start RAG Fallback: If a client is brand new with fewer than 100 records, the engine translates their numerical attributes into a semantic prompt, queries Pinecone for their internal compliance policies, and uses self-hosted LLaMA to return an audit-ready, policy-backed recommendation in ~250 milliseconds.
• 3. Unstructured Question Route: If a risk analyst types a natural language question (like "What is our policy for accounts with velocity over $5,000?"), it automatically routes directly to Pinecone and LLaMA for an answer with direct policy citations.

Finally, during real-time inference, our validator computes Z-scores (|x - μ| / σ). If incoming live data drifts by more than 3 standard deviations from the training distribution, it flags a drift alert in under 1 millisecond so the team knows when automated re-training is required.`,

  userExample: {
    query: 'POST /api/v1/predict with {"velocity_24h": 7200, "failed_logins": 3, "amount": 850}',
    latency: "< 5ms (Classical ML) / < 250ms (Cold-Start RAG)",
    description: "End-to-end execution flow showing how an enterprise tenant's request passes through header isolation, runtime schema validation, drift detection, and the intelligent hybrid router to deliver a risk decision and audit record.",
    steps: [
      {
        step: "01",
        stage: "Header & Tenant Isolation",
        system: "FastAPI Middleware",
        text: "The request arrives with header 'X-Tenant-ID: fintech_corp'; FastAPI extracts and verifies the tenant ID before processing, isolating all subsequent operations to this client."
      },
      {
        step: "02",
        stage: "Dynamic Schema Validation",
        system: "Pydantic v2 In-Memory",
        text: "The payload is validated against the tenant's runtime dynamic class (DynamicTenant_fintech_corp) in memory, catching boundary violations (e.g. negative values or invalid types) in <1ms."
      },
      {
        step: "03",
        stage: "Real-Time Drift Check",
        system: "Z-Score Drift Validator",
        text: "Computes Z = |x - μ| / σ against baseline training statistics; verifies that incoming transaction metrics are within normal distribution (Z < 3.0), flagging drift_detected: false."
      },
      {
        step: "04",
        stage: "Intelligent Hybrid Router",
        system: "3-Way Dynamic Router",
        text: "The router checks the tenant's historical record count: since fintech_corp has accumulated >= 100 records, it instantly selects Route 1 (LightGBM Tabular ML) for sub-5ms execution."
      },
      {
        step: "05",
        stage: "Model Scoring & Evaluation",
        system: "LightGBM Booster (< 2ms)",
        text: "LightGBM evaluates the numerical feature vector via fast histogram tree splits, outputting a fraud risk probability of 0.94 without requiring GPU infrastructure."
      },
      {
        step: "06",
        stage: "Response & Audit Logging",
        system: "FastAPI & PostgreSQL",
        text: "The API returns the high-risk score, decision tag, and drift metrics to the caller in 4ms, while asynchronously recording the decision in PostgreSQL's tenant_audit_logs table."
      }
    ],
    sampleOutput: {
      decisionResponse: "High Fraud Risk Alert: Transaction flagged with 0.94 probability (Velocity: 7200, Failed Logins: 3). Drift Status: Normal (Z-score < 3.0). Recommended Action: Trigger secondary multi-factor authentication or manual compliance hold.",
      auditRecord: {
        audit_id: "AUD_7821",
        tenant_id: "fintech_corp",
        route_selected: "Route 1: Classical Tabular ML (LightGBM)",
        features: "velocity: 7200 | failed_logins: 3 | amount: $850",
        score: "0.94 (HIGH_RISK)",
        latency: "3.8ms",
        status: "COMMITTED_IN_POSTGRESQL"
      }
    }
  },

  bookmarkedConcepts: [
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
        "Grounded Policy Citations: Synthesizes structured decision reports with institutional rule citations for Day 1 cold-start guidance without hallucinations."
      ]
    },
    {
      id: "multi-tenant",
      title: "Multi-Tenant Architecture",
      badge: "Enterprise Data Isolation",
      summary: "Serving hundreds of enterprise clients securely from a single unified codebase with absolute data segregation.",
      details: [
        "Header-Based Interception: Every request requires an X-Tenant-ID header, strictly verified by FastAPI before any application logic runs.",
        "In-Memory Dynamic Schemas: Dynamically builds separate Pydantic validation classes in memory for each client's custom business fields.",
        "Partitioned Storage: Relational tables use tenant foreign keys in PostgreSQL, and vector data is strictly partitioned by namespace=tenant_id in Pinecone."
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
        "Lightweight Microservice: Runs cleanly inside the microservice container without heavy external distributed daemons like Ray."
      ]
    },
    {
      id: "pinecone",
      title: "Pinecone Serverless",
      badge: "Isolated Vector Storage",
      summary: "Serverless vector database storing high-dimensional embeddings partitioned strictly by tenant namespaces.",
      details: [
        "Zero Cross-Tenant Leakage: A single index is strictly segregated by namespace=tenant_id, ensuring client A can never retrieve client B's vector data.",
        "True Serverless Economics: Scales down to $0/month when idle and instantly scales up to handle query bursts without manual cluster management.",
        "Protects PostgreSQL: Relational PostgreSQL handles ACID transactions, while Pinecone offloads memory-heavy vector math, preventing database bloat."
      ]
    },
    {
      id: "rag",
      title: "RAG (Retrieval-Augmented Generation)",
      badge: "Cold-Start & Policy Reasoning",
      summary: "Grounding LLaMA with internal compliance policies and operational manuals retrieved via vector search.",
      details: [
        "Solving the Day 1 Cold-Start: When a client has < 100 records, supervised ML would overfit; RAG retrieves policy rules to give reliable guidance from Day 1.",
        "Unstructured Natural Language: Allows risk analysts to ask free-form policy questions ('What is the rule for wire transfers over $5k?') and get cited answers.",
        "Deterministic Fallback: If the LLM engine is ever offline, a deterministic template engine steps in to guarantee zero 500 errors."
      ]
    }
  ]
};
