# Innovaeste Orchestrator 🏨🤖
**An AI-driven operational platform bridging software intelligence with physical task delegation.**

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![LangGraph](https://img.shields.io/badge/AI_Agent-LangGraph-blue?style=flat)](https://www.langchain.com/langgraph)
[![Automation](https://img.shields.io/badge/Workflow-n8n%20%7C%20Zapier-orange?style=flat)](#)
[![Database](https://img.shields.io/badge/Database-Supabase-1CB854?style=flat&logo=supabase)](https://supabase.com/)

## 📖 Overview
Traditional hospitality management relies heavily on manual ticket routing, which slows down response times and creates bottlenecks in daily operations. Innovaeste Orchestrator solves this by deploying an autonomous AI agent to handle guest requests in real-time. 

Drawing on principles from network administration, IT support workflows, and robotics, this platform intercepts natural language requests, categorizes the intent, and intelligently routes the task to either human staff or simulated robotic units. 

## 🏗️ System Architecture
This project separates the operational intelligence from the visual interface, resulting in a scalable, enterprise-ready system:

1. **The Brain (AI Decision Engine):** A LangGraph-powered agent that processes natural language, clarifies ambiguous requests, and determines the optimal execution path (e.g., routing a "spilled drink" request to cleaning staff, or a "towel delivery" to a service robot).
2. **The Nervous System (Automation):** Webhook-driven workflows (via n8n/Zapier) that trigger instant notifications to staff endpoints (Slack/Discord) the moment a database entry is created.
3. **The Face (Client Dashboard):** A high-performance, dark-mode Next.js frontend built with Shadcn UI to visualize live data density, robotic fleet status, and active task queues.

## ✨ Key Features
* **Semantic Intent Classification:** AI accurately interprets guest requests without relying on rigid dropdown menus.
* **Automated Task Routing:** Zero-touch dispatch to specific departments (Housekeeping, IT, Maintenance, or Robotics).
* **Live Fleet Tracking:** Visual tracking of simulated autonomous units assigned to delivery tasks.
* **Real-time Data Synchronization:** Live updates on the dashboard powered by Supabase real-time subscriptions.

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* Python 3.10+ (for the LangGraph Agent)
* Supabase Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/KadsSar/innovaeste-orchestrator.git](https://github.com/KadsSar/innovaeste-orchestrator.git)
   cd innovaeste-orchestrator
