# AI & ML Interview Defense & Master Engineering Hub

A production-grade, responsive React web application built with React 19, Vite, Tailwind CSS, and Lucide Icons designed for technical interview defense across 3 flagship enterprise architectures and a comprehensive 30+ concept machine learning vault.

## Navigation & Core Structure
1. Introduction
2. Fashion AI Copilot (Azure AI Vision, GPT-4o, 100k catalog, 25-item lazy load, PostgreSQL orders, OCR)
3. Hybrid AI Engine (Dynamic Pydantic schemas, LightGBM <5ms, LLaMA 3.1 + Pinecone Serverless RAG, Z-score drift)
4. YOLO + DeepSparse (Conveyor anomaly detection, 40-image few-shot COCO transfer learning, 14ms DeepSparse CPU, on-prem PostgreSQL, SOP copilot, OCR)
5. Other Definitions (3,000+ line vault with fast category tags, live search, and interview flashcards)

## Local Development
npm install
npm run dev

## Deployment
Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages.
In the repo settings, Pages → Source must be set to **GitHub Actions**.
