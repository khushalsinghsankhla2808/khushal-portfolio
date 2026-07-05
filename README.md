# Khushal Singh Sankhla | Portfolio

> **Data Analyst & MERN Stack Developer**  
> *Jodhpur, Rajasthan, India*

✨ **Motto:** *"Transforming Data into Decisions. Building Technology that Creates Impact."*

---

## 📊 Quick Overview & Stats

*   🎓 **Current Education:** Master of Computer Applications (MCA) at JECRC University (CGPA 8.65)
*   💻 **Projects Completed:** 10+ end-to-end data analytics and full-stack projects
*   🔧 **Core Technical Skills:** 20+ languages, frameworks, and analytics tools
*   🏆 **Certifications:** 5+ professional credentials in Data Analytics & Power BI
*   🤝 **Connect with me:**
    *   **LinkedIn:** [linkedin.com/in/khushal-singh-sankhla](https://linkedin.com/in/khushal-singh-sankhla)
    *   **GitHub:** [github.com/khushalsinghsankhla2808](https://github.com/khushalsinghsankhla2808)
    *   **Email:** [khushalsinghsankhla203@gmail.com](mailto:khushalsinghsankhla203@gmail.com)

---

## 🛠 Technical Skills

### Core Data Analytics & Business Intelligence
*   **Languages:** Python, SQL
*   **Databases:** PostgreSQL, MySQL
*   **BI & Visualizations:** Power BI, Power Query, DAX, Star Schema Modeling, KPI Dashboard Design, Data Storytelling, Data Visualization, Microsoft Excel
*   **Libraries:** Pandas, NumPy
*   **Methodologies:** Exploratory Data Analysis (EDA), Statistical Analysis, Data Modeling, ETL Pipelines

### Modern Web Development & AI
*   **Web Frameworks:** JavaScript, TypeScript, React.js, React Router, Redux Toolkit
*   **Backend:** Node.js, Express.js
*   **Styling & UI:** Tailwind CSS, Framer Motion, CSS3, HTML5
*   **Database Integration:** MongoDB, Firebase
*   **AI Integration:** LLM APIs, Prompt Engineering, Retrieval-Augmented Generation (RAG), Generative AI, Machine Learning Fundamentals

---

## 🚀 Featured Projects

### 1. Velora AI (Flagship Project)
*   **Category:** MERN Stack + Generative AI
*   **Status:** Live & Production Ready ([velora-builder.vercel.app](https://velora-builder.vercel.app/))
*   **Tech Stack:** React, Node.js, Express, MongoDB, Firebase, Redux Toolkit, Tailwind CSS, Framer Motion, OpenRouter API (LLM Integration), Monaco Editor, Razorpay Payment Gateway, JWT Auth
*   **Description:** An AI-powered website builder that generates complete, responsive multi-page layouts from natural language prompts. Users can edit code inline in real-time, authenticate, process payments, version projects, and resolve compile bugs with an integrated AI debugging assistant.

### 2. Samsung Supply Chain & Logistics Dashboard
*   **Category:** Business Intelligence (Power BI)
*   **Status:** Completed
*   **Tech Stack:** Power BI, DAX, Power Query, Star Schema
*   **Description:** A complete BI solution optimizing procurement, inventory management, logistics, and sales metrics. Implements time intelligence DAX calculations, inventory turn tracking, and forecasting to provide operational efficiency reports.

### 3. Weather Forecast Dashboard
*   **Category:** Real-Time Data Analytics
*   **Status:** Completed
*   **Tech Stack:** Power BI, REST APIs, Power Query, DAX
*   **Description:** A real-time dashboard integrated with the OpenWeatherMap API. Dynamically parses JSON responses to track live temperature, air quality indexes, UV index, and weather trends with auto-refreshing report visuals.

### 4. Swiggy vs Zomato Restaurant Analysis
*   **Category:** Competitive Market Analysis
*   **Status:** Completed
*   **Tech Stack:** SQL, PostgreSQL, Python, Pandas, Power BI
*   **Description:** Analyzes and compares India's food delivery platforms. Standardizes and cleans scraped CSV datasets using Python, structures queries in PostgreSQL, and creates competitive drill-downs detailing rating metrics and pricing patterns.

### 5. Walmart Sales Data Analysis
*   **Category:** Retail Analytics (ETL + SQL)
*   **Status:** Completed
*   **Tech Stack:** Python, SQL, PostgreSQL
*   **Description:** Analyzes over 500k sales records to locate inventory turnover patterns and peak seasonal purchasing behaviors using advanced SQL window functions, CTEs, and cumulative queries.

---

## 🏫 Education

*   **Master of Computer Applications (MCA)** — *JECRC University* (Aug 2025 - Aug 2027)  
    **CGPA:** 8.65 / 10
*   **Bachelor of Computer Applications (BCA)** — *Jai Narain Vyas University, Jodhpur* (Aug 2022 - Jul 2025)  
    **Aggregate Score:** 72.53%

---

## ⚡ Portfolio Codebase Optimizations

The codebase of this React + Vite portfolio application has been optimized to meet high performance, accessibility, and SEO industry standards:

### 1. Bundle Sizes & Performance (TTI / LCP)
*   **Bundle Splitting:** granular chunks for React core libraries, Framer Motion, and Icons.
*   **Deferred Imports:** Defer-loaded heavy validation libraries (`zod`, `react-hook-form`) into lazy chunks, reducing initial JavaScript load sizes by **-55%** (from 95.13kB down to **42.72kB**).
*   **Resource Preloading:** Added `<link rel="preload">` tags for Fonts, Logo, and LCP Hero Profile image. Configured `fetchPriority="high"` and `decoding="sync"` properties to accelerate above-the-fold paint times.
*   **Clean Assets:** Converted all media content to compressed, optimized WebP files.

### 2. rendering Efficiency (60+ FPS)
*   **State Decoupling:** Replaced high-frequency layout-triggering state changes with Framer Motion `useMotionValue` properties to animate hovers entirely outside the React rendering loop.
*   **GPU Acceleration:** Converted loading progress bar animations from layout-triggering `width` animations to GPU-accelerated `scaleX` transitions.
*   **Scoping:** Moved static navigation lists and parsing functions outside component scopes to prevent heap re-allocation during state changes.

### 3. Accessibility (WCAG AA Compliance)
*   **ARIA Descriptors:** Linked descriptive `aria-label` tags to icon-only links and mobile toggles.
*   **Color Contrast:** Improved text colors for light and dark themes to satisfy WCAG AA contrast ratios (>4.5:1).
*   **Keyboard Control:** Enabled full keyboard navigation (focus traps, tabIndex, Enter/Space keystroke listeners) on interactive project cards and modal close links.

### 4. SEO & Metadata
*   Injected structured JSON-LD Person schema.
*   Added meta tags for Twitter Cards and Facebook Open Graph previews.
*   Generated XML Sitemap and robots.txt configurations dynamically in production builds.

---

## 🛠 Development & Setup

### Requirements
*   Node.js (v18+)
*   npm

### Installation
1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd frontend/react-portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Scripts
*   **Development Server:** `npm run dev`
*   **Build Production:** `npm run build`
*   **Linter Analysis:** `npm run lint`
