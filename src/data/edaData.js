export const userBookmarks = [
  { id: "eda", label: "EDA" },
  { id: "cardinality", label: "Cardinality" },
  { id: "skewed-data", label: "Skewed Data" },
  { id: "histogram", label: "Histogram" },
  { id: "kde", label: "KDE" },
  { id: "anova", label: "ANOVA" },
  { id: "univariate", label: "Univariate" },
  { id: "bivariate", label: "Bivariate" },
  { id: "multivariate", label: "Multivariate" },
  { id: "outlier-detection", label: "Outlier Detection" },
  { id: "iqr", label: "IQR" },
  { id: "z-score", label: "Z-Score" },
  { id: "trimming", label: "Trimming (Capping)" },
  { id: "flagging", label: "Flagging" },
  { id: "modified-z-score", label: "Modified Z-Score" },
  { id: "class-imbalance", label: "Class Imbalance" },
  { id: "data-cleaning", label: "Data Cleaning" },
  { id: "log-transformation", label: "Log Transformation" },
  { id: "binning", label: "Binning" },
  { id: "box-cox", label: "Box-Cox" },
  { id: "yeo-johnson", label: "Yeo-Johnson" },
  { id: "feature-engineering", label: "Feature Engineering" },
  { id: "f1-score", label: "F1-Score" },
  { id: "overfitting", label: "Overfitting" },
  { id: "underfitting", label: "Underfitting" }
];

export const edaData = {
  title: "Exploratory Data Analysis (EDA) Master Blueprint",
  subtitle: "End-to-End Practical Guide: From Raw Data Ingestion to Statistical Testing, Outlier Treatment, Transformations & Feature Engineering",

  pipelineOverview: [
    { step: "01", name: "Ingestion & Overview", desc: "df.head(), df.shape, df.info(), df.dtypes" },
    { step: "02", name: "Data Quality Check", desc: "Missing values (df.isna().sum()), duplicate rows, data entry errors" },
    { step: "03", name: "Univariate Analysis", desc: "Histograms, KDE plots, boxplots, central tendency & skewness" },
    { step: "04", name: "Bivariate / Multivariate", desc: "Correlation matrix, grouped boxplots, ANOVA, Chi-Square, pairplots" },
    { step: "05", name: "Cleaning & Feature Eng", desc: "Imputation, IQR/Z-score capping, log/Yeo-Johnson transforms, encoding" }
  ],

  bookmarkedConcepts: [
    {
      id: "anova",
      title: "ANOVA & Kruskal-Wallis",
      badge: "Statistical Hypothesis Testing",
      summary: "Parametric and non-parametric tests to determine if numerical feature means differ significantly across categories.",
      details: [
        "One-Way ANOVA: Tests if the mean of a continuous numerical variable differs significantly across 3 or more categorical groups (e.g. Salary differences across Engineering, Sales, and HR).",
        "Assumptions of ANOVA: Requires normal distribution within each group and homogeneity of variance (homoscedasticity).",
        "Kruskal-Wallis Test: Non-parametric alternative to ANOVA used when data is skewed or sample sizes are small; compares group medians and ranks instead of means."
      ],
      code: "# One-Way ANOVA in Python\nfrom scipy import stats\nf_stat, p_val = stats.f_oneway(group_tech, group_sales, group_hr)\n# If p_val < 0.05, statistically significant mean difference exists."
    },
    {
      id: "binning",
      title: "Binning (Discretization)",
      badge: "Feature Transformation",
      summary: "Converting continuous numerical variables into discrete categorical intervals (bins).",
      details: [
        "Why Use It: When exact numerical values don't matter (e.g. Age groups: 0-18, 19-35, 36-60, 60+), and to prevent tree-based models from overfitting on small spikes in continuous numbers.",
        "Approach A (pd.cut): Creates custom, user-defined fixed-width bins based on domain logic.",
        "Approach B (pd.qcut): Quantile-based equal-frequency binning where each bin contains an equal number of records.",
        "Trade-Off: Introduces loss of fine-grained numerical precision in exchange for noise reduction."
      ],
      code: "# Custom-defined bins\ndf['age_group'] = pd.cut(df['age'], bins=[0, 18, 35, 60, 100], labels=['Youth', 'Young Adult', 'Adult', 'Senior'])\n# Equal-frequency quantile binning\ndf['income_decile'] = pd.qcut(df['income'], q=4, labels=['Q1', 'Q2', 'Q3', 'Q4'])"
    },
    {
      id: "bivariate",
      title: "Bivariate Analysis",
      badge: "Relationship Discovery",
      summary: "Analyzing the empirical relationship, association, or correlation between two features.",
      details: [
        "Numerical vs Numerical: Analyzed via Scatter plots and Line plots. Quantified using Pearson correlation (r) for linear relations and Spearman rank correlation (rho) for monotonic non-linear relations.",
        "Categorical vs Numerical: Analyzed using Grouped Boxplots and Violin plots. Statistically tested using Two-Sample t-test (for 2 categories) or One-Way ANOVA / Kruskal-Wallis (for > 2 categories).",
        "Categorical vs Categorical: Analyzed via Cross-tabulation (contingency tables) and Stacked Bar charts. Statistically tested using Chi-Square test (chi^2) and Cramer's V for association strength."
      ],
      code: "# Numerical vs Numerical correlation\ndf[['income', 'credit_score']].corr(method='spearman')\n# Categorical vs Numerical groupby\ndf.groupby('department')['salary'].agg(['mean', 'median', 'std'])\n# Categorical vs Categorical cross-tab\npd.crosstab(df['gender'], df['churn'], normalize='index')"
    },
    {
      id: "box-cox",
      title: "Box-Cox Transformation",
      badge: "Power Transformation",
      summary: "Parametric power transformation converting non-normal positive data into an approximately normal distribution.",
      details: [
        "The Formula: Applies y^(lambda) based on parameter lambda, automatically optimized using Maximum Likelihood Estimation (MLE).",
        "Critical Flaw: Strictly requires all values to be positive (x > 0). It immediately crashes if any values are 0 or negative.",
        "Modern Replacement: If your feature contains zeros or negative values (e.g. net profit, temperature, account balances), use Yeo-Johnson instead."
      ],
      code: "from scipy import stats\n# Only works if x > 0\ntransformed_data, fitted_lambda = stats.boxcox(df[df['positive_col'] > 0]['positive_col'])"
    },
    {
      id: "cardinality",
      title: "Cardinality (df.nunique())",
      badge: "Feature Diagnostics",
      summary: "Measuring the count of unique values in each column to detect uninformative or problematic features.",
      details: [
        "Zero Variance (nunique == 1): Columns where every row has the identical constant value (e.g. country = 'India' in domestic dataset). These carry zero predictive signal and should be dropped immediately.",
        "High Cardinality Identifiers (nunique == len(df)): Primary keys, user IDs, or transaction UUIDs. These cause catastrophic overfitting in tree models and must be removed from modeling.",
        "Categorical Downcasting: Features with low cardinality (nunique < 20) should be converted from string object to pandas 'category' dtype to reduce memory usage by 70–80%."
      ],
      code: "# Check unique values across all columns\nunique_counts = df.nunique()\n# Drop constant columns with zero variance\nconstant_cols = [c for c in df.columns if df[c].nunique() <= 1]\ndf.drop(columns=constant_cols, inplace=True)"
    },
    {
      id: "class-imbalance",
      title: "Class Imbalance",
      badge: "Target Distribution",
      summary: "When target classes in a classification problem are heavily unequal (e.g. 99% legitimate transactions vs 1% fraud).",
      details: [
        "The Accuracy Trap: Plain accuracy is dangerously misleading. A dummy model predicting 'legit' 100% of the time achieves 99% accuracy but catches zero fraud.",
        "Imbalance Ratio (IR): Ratio of majority to minority count. Mild (1:1 to 3:1), Moderate (4:1 to 10:1), Extreme (10:1 to 1000:1).",
        "Evaluation Metrics: Must switch to Precision, Recall, F1-Score, and PR-AUC (Precision-Recall Curve). PR-AUC is far superior to ROC-AUC on imbalanced targets.",
        "Stratified Splitting: Always use StratifiedKFold to guarantee that training and testing splits maintain identical minority class proportions."
      ],
      code: "# Check class distribution and ratio\ncounts = df['target'].value_counts()\nprops = df['target'].value_counts(normalize=True) * 100\nimbalance_ratio = counts.iloc[0] / counts.iloc[1]\nprint(f'Imbalance Ratio: {imbalance_ratio:.2f} : 1')"
    },
    {
      id: "data-cleaning",
      title: "Data Cleaning & Missing Data",
      badge: "Data Preprocessing",
      summary: "Systematic remediation of missing values, duplicate records, inconsistent categories, and type mismatches.",
      details: [
        "Missing Data Rules: < 5% missing is safe to median/mode impute or drop; 5%–30% requires careful imputation (KNN / Iterative Imputer); > 50% should be dropped or turned into a binary missing indicator.",
        "Handling Duplicates: Duplicate rows artificially inflate training metrics, cause data leakage across train/test splits, and bias models toward repeated rows. Drop with df.drop_duplicates().",
        "Inconsistent Categories: Standardize string casing (e.g. 'NY' vs 'New York', 'apple' vs 'Apple'), strip whitespace, and group rare long-tail classes into 'Other'.",
        "Pandas Gotcha: In pandas, missing integer columns are automatically cast to float64 because NaN is natively a float."
      ],
      code: "# Missing value percentage\nmissing_pct = (df.isna().mean() * 100).sort_values(ascending=False)\n# Median imputation for skewed numeric columns\ndf['income'] = df['income'].fillna(df['income'].median())\n# Drop duplicates\ndf.drop_duplicates(inplace=True)"
    },
    {
      id: "eda",
      title: "EDA (13-Step Core Pipeline)",
      badge: "Foundational Process",
      summary: "The critical initial process of analyzing, visualizing, and understanding data characteristics before any modeling begins.",
      details: [
        "Step 01 to 04: Load data (df.head(), df.shape, df.info()), inspect dtypes, calculate missing values %, and check for duplicate rows.",
        "Step 05 to 07: Check cardinality (df.nunique()), categorical value counts, and summary statistics (df.describe(include='all')).",
        "Step 08 to 10: Inspect distributions (Histogram & KDE), identify outliers (Boxplot & IQR), and compute correlation matrices.",
        "Step 11 to 13: Analyze features vs target, remediate missing/corrupted values, and engineer useful features for machine learning."
      ],
      code: "# 13-step fast inspection snippet\nprint('Shape:', df.shape)\nprint('Data types:\\n', df.dtypes.value_counts())\nprint('Missing:\\n', df.isna().sum()[df.isna().sum() > 0])\nprint('Summary Statistics:\\n', df.describe(include='all'))"
    },
    {
      id: "f1-score",
      title: "F1-Score (Precision & Recall)",
      badge: "Evaluation Metric",
      summary: "Harmonic mean of Precision and Recall, providing a balanced metric on imbalanced datasets.",
      details: [
        "Precision: 'When the model predicts positive, how often is it right?' Precision = TP / (TP + FP). Critical when false positives are costly (e.g. spam filters).",
        "Recall (Sensitivity): 'Out of all actual positive cases, how many did the model catch?' Recall = TP / (TP + FN). Critical when false negatives are dangerous (e.g. disease screening, fraud detection).",
        "F1-Score Formula: 2 * (Precision * Recall) / (Precision + Recall). Uses harmonic mean because it heavily penalizes extreme imbalances between precision and recall."
      ],
      code: "from sklearn.metrics import classification_report, f1_score\nf1 = f1_score(y_true, y_pred, average='weighted')\nprint(classification_report(y_true, y_pred))"
    },
    {
      id: "feature-engineering",
      title: "Feature Engineering (6 Pillars)",
      badge: "Pattern Amplification",
      summary: "The art and science of extracting, transforming, combining, and creating new predictive signals from raw data.",
      details: [
        "Pillar 1 (Numerical Operations): Ratios, differences, and log/power scaling (e.g. debt_to_income = debt / income).",
        "Pillar 2 (Categorical Encodings): One-Hot Encoding for nominal variables, Ordinal Encoding for ranked variables, and Target Encoding for high-cardinality features.",
        "Pillar 3 (Datetime Extraction): Extracting year, month, day of week, hour, is_weekend, and elapsed days since last activity.",
        "Pillar 4 (Domain Ratios): Industry-specific metrics (e.g. price_per_sqft, loan_to_value_ratio, click_through_rate).",
        "Pillar 5 (Interaction & Aggregation): Grouping historical records (e.g. customer average spend, rolling 7-day transaction velocity).",
        "Pillar 6 (Text & String Extraction): Extracting word counts, text length, regex matches, and uppercase character ratios."
      ],
      code: "# Feature Engineering examples\ndf['debt_to_income'] = df['total_debt'] / (df['income'] + 1)\ndf['transaction_hour'] = pd.to_datetime(df['timestamp']).dt.hour\ndf['is_weekend'] = pd.to_datetime(df['timestamp']).dt.dayofweek.isin([5, 6]).astype(int)"
    },
    {
      id: "flagging",
      title: "Flagging (Indicator Features)",
      badge: "Feature Engineering",
      summary: "Creating a binary indicator feature (0 or 1) that explicitly flags special conditions, outliers, or missingness.",
      details: [
        "Why Flag Outliers: In fraud detection or risk analysis, extreme transaction amounts are not errors—they are valuable predictive signals. Creating 'is_high_outlier = 1' alerts tree models explicitly.",
        "Missingness Flags: Creating 'income_is_missing = 1' before imputing median ensures the model doesn't lose the information that the customer chose not to report income.",
        "Model Transparency: Allows tree-based and linear models to learn separate coefficients or split branches specifically for anomalous edge cases."
      ],
      code: "# Outlier indicator feature\ndf['is_high_spend_outlier'] = (df['amount'] > upper_bound).astype(int)\n# Missingness indicator feature\ndf['age_was_missing'] = df['age'].isna().astype(int)"
    },
    {
      id: "histogram",
      title: "Histogram (Frequency Distribution)",
      badge: "Distribution Visualization",
      summary: "Visualizing the frequency distribution of numerical features across discrete bins to spot shape, modality, and isolated clusters.",
      details: [
        "Bin Partitioning: Divides continuous numerical data into discrete bins and counts frequencies, revealing modality (unimodal, bimodal), central mass, spread, and gaps.",
        "Cluster Inspection: Identifies where the primary mass of data is clustered (e.g. 5k to 20k), followed by empty stretches and isolated outlier bars above 50k+.",
        "Model Prerequisite: Used in initial EDA to inspect if numerical features are approximately symmetric and bell-shaped, as required by Linear Regression, PCA, and Neural Networks."
      ],
      code: "import matplotlib.pyplot as plt\n# Pure histogram with discrete frequency bins\nplt.hist(df['salary'], bins=30, color='#06b6d4', edgecolor='black')\nplt.xlabel('Salary Range')\nplt.ylabel('Count')\nplt.title('Salary Histogram (Frequency Clusters)')"
    },
    {
      id: "iqr",
      title: "IQR Method (Tukey's Fences)",
      badge: "Robust Outlier Detection",
      summary: "Percentile-based outlier boundary calculation that is completely immune to extreme edge distortions.",
      details: [
        "Percentiles: Q1 (25th percentile, First Quartile), Q2 (50th percentile, Median), Q3 (75th percentile, Third Quartile).",
        "The Formula: IQR = Q3 - Q1 (represents the spread of the middle 50% of data).",
        "Lower Bound: Q1 - 1.5 * IQR | Upper Bound: Q3 + 1.5 * IQR. Any data point x < LB or x > UB is flagged as an outlier.",
        "Why 1.5? Under a normal Gaussian distribution, 1.5 * IQR encompasses 99.3% of all observations. For extreme outliers, 3.0 * IQR is used.",
        "Robustness: Unlike mean and standard deviation which are distorted by extreme numbers, Q1, Q3, and Median are robust and resilient."
      ],
      code: "q1 = df['amount'].quantile(0.25)\nq3 = df['amount'].quantile(0.75)\niqr = q3 - q1\nlower_bound = q1 - 1.5 * iqr\nupper_bound = q3 + 1.5 * iqr\noutliers = df[(df['amount'] < lower_bound) | (df['amount'] > upper_bound)]"
    },
    {
      id: "kde",
      title: "KDE (Kernel Density Estimation)",
      badge: "Continuous Density Smoothing",
      summary: "Non-parametric smoothing technique estimating the continuous Probability Density Function (PDF) of a random variable.",
      details: [
        "Gaussian Smoothing: Smooths discrete histogram bars by placing a continuous Gaussian kernel over each data point and summing them up into a continuous curve.",
        "Bandwidth Parameter (h): Controls smoothness. A small bandwidth causes excessive noise and jagged curves (undersmoothing); a large bandwidth washes out important bimodal peaks (oversmoothing).",
        "Why Overlay KDE: Unveils true underlying multi-modal distribution patterns that discrete histogram bin boundaries can conceal or distort."
      ],
      code: "import seaborn as sns\n# KDE plot showing smooth probability density curve\nsns.kdeplot(df['salary'], color='#22d3ee', fill=True, bw_adjust=0.8)\nplt.title('Salary Continuous Probability Density (KDE)')"
    },
    {
      id: "log-transformation",
      title: "Log Transformation (np.log1p)",
      badge: "Skewness Remediation",
      summary: "Applying natural logarithms to compress extreme positive values and transform right-skewed data into a normal distribution.",
      details: [
        "When to Use: Continuous numerical features with heavy right skew (e.g. salaries, house prices, transaction volumes).",
        "The np.log1p Advantage: log(0) is mathematically undefined (-infinity). np.log1p(x) calculates log(1 + x), safely handling zero values.",
        "Restriction: Only works on non-negative numbers (x >= 0). If your feature contains negative numbers, use Yeo-Johnson transformation instead."
      ],
      code: "import numpy as np\n# Safe log transformation handling zeros\ndf['log_salary'] = np.log1p(df['salary'])\n# Verify skewness before and after\nprint('Original Skew:', df['salary'].skew())\nprint('Log Transformed Skew:', df['log_salary'].skew())"
    },
    {
      id: "modified-z-score",
      title: "Modified Z-Score",
      badge: "Robust Standardization",
      summary: "Outlier detection method utilizing Median and Median Absolute Deviation (MAD), designed specifically for skewed data.",
      details: [
        "The Problem with Standard Z-Score: Extreme outliers massively inflate standard deviation (sigma) and pull the mean (mu), causing masking where real outliers appear normal.",
        "The Formula: Modified Z = 0.6745 * (X - Median) / MAD, where MAD = Median(|X - Median|).",
        "Threshold: Any observation with |Modified Z| > 3.5 is flagged as an outlier.",
        "Why 0.6745: This constant ensures MAD estimates standard deviation under a normal Gaussian distribution."
      ],
      code: "import numpy as np\nmedian = df['revenue'].median()\nmad = np.median(np.abs(df['revenue'] - median))\nmodified_z = 0.6745 * (df['revenue'] - median) / (mad + 1e-8)\noutliers = df[np.abs(modified_z) > 3.5]"
    },
    {
      id: "multivariate",
      title: "Multivariate Analysis",
      badge: "Complex Patterns & Confounders",
      summary: "Analyzing relationships across 3 or more variables simultaneously to detect confounders, interactions, and multicollinearity.",
      details: [
        "Techniques: Pairplots, Scatter plots with Hue/Size/Style encodings, and full correlation heatmaps.",
        "VIF (Variance Inflation Factor): Diagnoses multicollinearity between independent predictors. VIF > 5-10 indicates severe redundancy.",
        "Dimensionality Reduction: Unsupervised techniques like PCA (Principal Component Analysis) and t-SNE / UMAP for visualizing high-dimensional manifolds.",
        "Simpson's Paradox: A statistical phenomenon where a trend observed in combined data completely reverses when data is segmented into subgroups."
      ],
      code: "from statsmodels.stats.outliers_influence import variance_inflation_factor\n# Calculate VIF for multicollinearity\nvif_data = pd.DataFrame()\nvif_data['Feature'] = X.columns\nvif_data['VIF'] = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]"
    },
    {
      id: "outlier-detection",
      title: "Outlier Detection Overview",
      badge: "Data Integrity",
      summary: "Systematic identification of anomalous data points that deviate drastically from the remaining distribution.",
      details: [
        "Causes: Data entry errors, sensor glitches, fraudulent activity, or genuine extreme natural phenomena.",
        "Three Remediation Strategies: (1) Trimming: Dropping the rows (only if confirmed data entry errors). (2) Capping / Winsorization: Clamping values to upper and lower bounds. (3) Flagging: Creating a binary indicator feature (is_outlier = 1) to inform ML models.",
        "Method Selection: Use IQR or Modified Z-Score for skewed distributions; use standard Z-Score ONLY for strictly normal Gaussian distributions."
      ],
      code: "# Outlier capping (Winsorization) using IQR bounds\ndf['capped_amount'] = df['amount'].clip(lower=lower_bound, upper=upper_bound)"
    },
    {
      id: "overfitting",
      title: "Overfitting (High Variance / Low Bias)",
      badge: "Generalization Failure",
      summary: "When a model memorizes training noise and random fluctuations instead of the true underlying population distribution.",
      details: [
        "Symptom: Near-zero training error accompanied by high test/validation loss; extreme divergence between train and validation learning curves.",
        "Root Causes: High model capacity (excessive tree depth, too many neural weights, high polynomial degrees) relative to small dataset size; presence of noisy unhandled outliers.",
        "Remedies: L1/L2 regularization, early stopping, tree pruning (max_depth, min_samples_split), dropout, k-fold cross-validation, and feature selection to reduce noise dimensions."
      ],
      code: "# Diagnose overfitting via cross-validation scores\nfrom sklearn.model_selection import validation_curve\ntrain_scores, val_scores = validation_curve(model, X, y, param_name='max_depth', param_range=range(1, 15), cv=5)\n# If train_score keeps rising to 1.0 while val_score degrades, overfitting is occurring."
    },
    {
      id: "underfitting",
      title: "Underfitting (High Bias / Low Variance)",
      badge: "Model Incapacity",
      summary: "When a model is too simplistic to capture the fundamental mathematical patterns and relationships present in the data.",
      details: [
        "Symptom: High error on both training set and test/validation sets; flat learning curves failing to converge to an acceptable loss threshold.",
        "Root Causes: Inadequate model complexity (e.g. attempting to fit a linear regression on non-linear or polynomial patterns); over-regularization; insufficient features.",
        "Remedies: Increase model complexity (e.g. switch from linear model to gradient boosted trees), engineer interaction terms and polynomial features, and decrease regularization penalties (e.g. lower L1/L2 alpha)."
      ],
      code: "# Diagnose underfitting: both train and validation metrics are unacceptably poor\ntrain_loss = evaluate(model, X_train, y_train)\nval_loss = evaluate(model, X_val, y_val)\nif train_loss > unacceptable_threshold:\n    print('Model lacks capacity to learn patterns: Underfitting.')"
    },
    {
      id: "skewed-data",
      title: "Skewed Data (Left, Normal, Right)",
      badge: "Distribution Shape",
      summary: "Asymmetrical distribution of numerical data where values trail off toward one of the tails.",
      details: [
        "Left Skew (Negative Skew): Mean < Median < Mode. Tail extends toward the left. Example: University graduation exam scores (most score 80–100%, very few get 0–10%).",
        "Symmetric / Normal: Mean = Median = Mode. Bell-shaped distribution centered evenly. Example: Adult human heights.",
        "Right Skew (Positive Skew): Mode < Median < Mean. Tail extends toward the right. Example: Household incomes (most earn $5k–$20k, but a few earn $1M+ which pulls the mean upward).",
        "Why It Matters: Skewness invalidates standard Z-scores and reduces the predictive performance of linear models, distance metrics (KNN), and PCA."
      ],
      code: "# Check skewness metric (0 = symmetric, > 1 = heavy right skew, < -1 = heavy left skew)\nskew_val = df['income'].skew()\nprint(f'Skewness: {skew_val:.2f}')"
    },
    {
      id: "trimming",
      title: "Trimming vs Capping (Winsorization)",
      badge: "Outlier Remediation",
      summary: "The two primary mathematical techniques for handling numerical outliers in dataset features.",
      details: [
        "Trimming (Dropping): Removing outlier rows completely. Safe only when outliers represent verified data entry corruption (e.g. Age = 999). In small datasets, trimming causes harmful loss of sample diversity.",
        "Capping (Winsorization / Clipping): Replaces extreme values outside bounds with the upper and lower thresholds (e.g. Q3 + 1.5*IQR or mu + 3*sigma). Protects models without losing a single row.",
        "Recommendation: For tabular machine learning, capping is almost always preferred over trimming because it preserves sample size."
      ],
      code: "# Capping using pandas clip\nlower_limit = df['price'].quantile(0.01)\nupper_limit = df['price'].quantile(0.99)\ndf['winsorized_price'] = df['price'].clip(lower=lower_limit, upper=upper_limit)"
    },
    {
      id: "univariate",
      title: "Univariate Analysis",
      badge: "Single-Feature Inspection",
      summary: "Analyzing one single variable at a time to examine its central tendency, dispersion, and distribution anomalies.",
      details: [
        "Continuous Numerical Features: Measures of central tendency (Mean, Median, Mode), measures of dispersion (Variance, Standard Deviation, IQR, Range), shape (Skewness, Kurtosis), visualized via Histograms, KDE, and Boxplots.",
        "Categorical Features: Frequency and relative proportions (df.value_counts(normalize=True)), mode (most frequent class), visualized via Countplots and Bar charts.",
        "Objective: Establishes a clean baseline profile for every individual column before exploring inter-feature interactions."
      ],
      code: "# Summary for numerical column\nprint('Mean:', df['age'].mean(), '| Median:', df['age'].median())\nprint('IQR:', df['age'].quantile(0.75) - df['age'].quantile(0.25))\n# Frequency for categorical column\nprint(df['department'].value_counts())"
    },
    {
      id: "yeo-johnson",
      title: "Yeo-Johnson Transformation",
      badge: "Universal Power Transform",
      summary: "Advanced power transformation that stabilizes variance and normalizes skewed data containing zero or negative numbers.",
      details: [
        "Overcoming Box-Cox: Box-Cox only supports positive values (x > 0). Yeo-Johnson supports all real numbers (positive, zero, and negative values).",
        "Automated Parameter Optimization: Automatically searches for the optimal lambda using Maximum Likelihood Estimation (MLE) to maximize normality.",
        "Algorithm Protection: Prevents large-scale numerical features with zeros or negatives from dominating distance-based algorithms like KNN, K-Means, and gradient descent."
      ],
      code: "from sklearn.preprocessing import PowerTransformer\n# Automatically selects Yeo-Johnson by default\npt = PowerTransformer(method='yeo-johnson')\ndf['transformed_profit'] = pt.fit_transform(df[['net_profit']])"
    },
    {
      id: "z-score",
      title: "Z-Score Method (Standard Score)",
      badge: "Parametric Outlier Detection",
      summary: "Measures the exact number of standard deviations a data point lies away from the distribution mean.",
      details: [
        "The Formula: Z = (X - mu) / sigma, where mu is the sample mean and sigma is standard deviation.",
        "The Empirical Rule (68-95-99.7): 68% of data falls within |Z| <= 1; 95% falls within |Z| <= 2; 99.7% falls within |Z| <= 3.",
        "Threshold: Points with |Z| > 3.0 are considered high or low outliers under normal Gaussian distributions.",
        "Strict Precondition: The feature must be approximately normally distributed. If the feature is skewed, standard Z-score fails due to the masking effect—use IQR or Modified Z-Score instead."
      ],
      code: "# Calculate standard Z-Score\nfrom scipy import stats\ndf['z_score'] = stats.zscore(df['transaction_amount'])\noutliers = df[np.abs(df['z_score']) > 3.0]"
    }
  ]
};
