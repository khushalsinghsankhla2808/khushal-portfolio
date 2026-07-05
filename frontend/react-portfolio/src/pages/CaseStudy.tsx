import { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Clock, Database, Trophy, Activity, CheckCircle, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../data/projects';
import { useScrollScrub } from '../animations';
import { REDUCED_MOTION } from '../animations/config';

interface Beat {
  title: string;
  content: React.ReactNode;
}

const BEATS_DATA: Record<string, Beat[]> = {
  'velora-ai': [
    {
      title: "The Vision & Challenge",
      content: (
        <>
          <p>
            <strong>Business Problem:</strong> Users needed an easy way to spin up scalable web setups using natural language without writing template-bound configurations.
          </p>
          <p>
            <strong>Objective:</strong> Create a robust developer environment translating user intentions to fully customized templates, managing live previews in real-time.
          </p>
        </>
      )
    },
    {
      title: "System Architecture",
      content: (
        <>
          <p>
            To support dynamic full-stack generation, Velora AI coordinates a secure MERN structure:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Frontend:</strong> React, Redux Toolkit, and Monaco Editor for syntax validation.</li>
            <li><strong>Backend:</strong> Node.js, Express, and MongoDB managing state, authentication, and platform deployments.</li>
            <li><strong>API integrations:</strong> Connected to OpenRouter to leverage cutting-edge LLMs.</li>
          </ul>
        </>
      )
    },
    {
      title: "Technical Challenges",
      content: (
        <>
          <p>
            <strong>Challenges Encountered:</strong> Parsing LLM outputs cleanly and maintaining stable websocket sync was difficult.
          </p>
          <p>
            <strong>Solution:</strong> We implemented regex-based parsing guards and visual terminal error correction loops to cleanly extract HTML/CSS codeblocks before parsing it to the iframe compiler.
          </p>
        </>
      )
    },
    {
      title: "The Outcome",
      content: (
        <>
          <p>
            <strong>Lessons Learned:</strong> Learned to manage massive schema transformations dynamically.
          </p>
          <p>
            The live environment enables immediate deployment pipelines, allowing developers and designers alike to construct websites dynamically.
          </p>
        </>
      )
    }
  ],
  'samsung-supply-chain': [
    {
      title: "Problem & Vision",
      content: (
        <>
          <p>
            <strong>Business Problem:</strong> Samsung required operational transparency into logistics delays, inventory costs, and procurement cycles across regions.
          </p>
          <p>
            <strong>Objective:</strong> Consolidate data into visual KPI cards for delays, regional inventory levels, and production quotas to improve executive-level decision making.
          </p>
        </>
      )
    },
    {
      title: "Architecture & ETL",
      content: (
        <>
          <p>
            To handle enterprise-scale transactional supply datasets, the backend solution utilizes a standard BI pipeline:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>ETL Processing:</strong> Built utilizing Power Query to extract, clean, and load SQL-based data.</li>
            <li><strong>Data Model:</strong> Organized as a Star Schema, optimizing lookup tables (Dimensions) against transaction logs (Facts).</li>
          </ul>
        </>
      )
    },
    {
      title: "Technical Execution",
      content: (
        <>
          <p>
            <strong>Challenges Encountered:</strong> Formulating time-intelligence calculations to track Year-over-Year performance and rolling averages across varying seasonal inventory rates.
          </p>
          <p>
            <strong>Solution:</strong> Leveraged advanced DAX measures utilizing Time Intelligence functions (e.g. <code>SAMEPERIODLASTYEAR</code>, <code>CALCULATE</code>) to build responsive, low-latency aggregations.
          </p>
        </>
      )
    },
    {
      title: "Outcome & Value",
      content: (
        <>
          <p>
            <strong>Lessons Learned:</strong> Mastered DAX modeling practices and optimization methods for large-scale enterprise supply reports.
          </p>
          <p>
            The final dashboard successfully decreased report compiling times by 40% and highlighted operational logistics bottleneck hubs.
          </p>
        </>
      )
    }
  ],
  'weather-dashboard': [
    {
      title: "Problem & Vision",
      content: (
        <>
          <p>
            <strong>Business Problem:</strong> Environmental and climate metrics are scattered across diverse public formats, lacking unified real-time localized representations.
          </p>
          <p>
            <strong>Objective:</strong> Design an interactive climate dashboard capturing UV index, air quality index (AQI), temperature fluctuations, and humidity.
          </p>
        </>
      )
    },
    {
      title: "API Connection",
      content: (
        <>
          <p>
            The project connects to the OpenWeatherMap API endpoints, managing real-time coordinates retrieval and transformation:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Extraction:</strong> Utilizes Power Query web hooks to ingest dynamic REST API parameters.</li>
            <li><strong>Data Parsing:</strong> Flattens complex nested JSON payloads to create structured tabular datasets.</li>
          </ul>
        </>
      )
    },
    {
      title: "Technical Challenges",
      content: (
        <>
          <p>
            <strong>Challenges Encountered:</strong> Structuring queries to handle OpenWeather API rate limits and preventing dataset locks during automatic incremental refreshes.
          </p>
          <p>
            <strong>Solution:</strong> Optimized query load stages and structured automated refreshes to balance requests without hitting API locks.
          </p>
        </>
      )
    },
    {
      title: "Outcome & Value",
      content: (
        <>
          <p>
            <strong>Lessons Learned:</strong> Solidified knowledge of consuming and parsing nested JSON REST API feeds directly inside Power BI datasets.
          </p>
          <p>
            Developed a live weather reporting dashboard providing instant, responsive visual analytics on environmental parameters.
          </p>
        </>
      )
    }
  ],
  'phone-analysis-dashboard': [
    {
      title: "Problem & Vision",
      content: (
        <>
          <p>
            <strong>Business Problem:</strong> Consumers and retailers lacked a unified analytical tool to compare smartphone specs, market pricing, and performance metrics across top brands.
          </p>
          <p>
            <strong>Objective:</strong> Design a comprehensive comparison dashboard highlighting market dynamics, pricing trends, and technical specifications of 958 phones across 26 brands.
          </p>
        </>
      )
    },
    {
      title: "Wrangling & Modeling",
      content: (
        <>
          <p>
            The workflow processes scraped mobile parameters into clean schemas:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Scraping:</strong> Extracted metrics from consumer sites using Python BeautifulSoup scripts.</li>
            <li><strong>Normalization:</strong> Handled with Pandas, cleaning varying RAM/storage configuration strings into standard floats.</li>
          </ul>
        </>
      )
    },
    {
      title: "Technical Challenges",
      content: (
        <>
          <p>
            <strong>Challenges Encountered:</strong> Defining customizable DAX comparison indices (value quotients) that compare pricing ratios dynamically across varying processor tiers.
          </p>
          <p>
            <strong>Solution:</strong> Formulated calculated tables and dynamic switch selection rules allowing users to perform custom specs-to-price comparisons.
          </p>
        </>
      )
    },
    {
      title: "Outcome & Value",
      content: (
        <>
          <p>
            <strong>Lessons Learned:</strong> Improved data storytelling and custom metric calculation modeling specifically tailored for consumer electronics data.
          </p>
          <p>
            Constructed a comprehensive market intelligence BI tool that instantly reveals device price-to-performance outliers.
          </p>
        </>
      )
    }
  ],
  'swiggy-vs-zomato': [
    {
      title: "Vision & Dataset",
      content: (
        <>
          <p>
            <strong>Business Problem:</strong> Comparing market share, pricing strategies, and customer satisfaction between two major food delivery apps.
          </p>
          <p>
            <strong>Objective:</strong> Analyze restaurant data, user ratings, and pricing to deliver a comparative BI dashboard.
          </p>
        </>
      )
    },
    {
      title: "Schema Wrangling",
      content: (
        <>
          <p>
            To perform comparative market studies, restaurant CSV datasets scraped from both platforms are processed:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Ingestion:</strong> Ingests transactional and menu lists from multiple directories.</li>
            <li><strong>Schema Normalization:</strong> Standardizes differences in rating scales and pricing structures.</li>
          </ul>
        </>
      )
    },
    {
      title: "Challenges & Resolution",
      content: (
        <>
          <p>
            <strong>Challenges Encountered:</strong> Standardizing schema differences between the two scraped datasets.
          </p>
          <p>
            <strong>Solution:</strong> Built structured query pipelines in Power Query to map divergent columns and align discount parameters.
          </p>
        </>
      )
    },
    {
      title: "Key Insights & Outcome",
      content: (
        <>
          <p>
            <strong>Lessons Learned:</strong> Improved data wrangling skills using Python and Pandas before loading into Power BI.
          </p>
          <p>
            Identified regional dominance for each platform and found correlation between discount offerings and user ratings.
          </p>
        </>
      )
    }
  ],
  'spotify-dashboard': [
    {
      title: "Vision & Dataset",
      content: (
        <>
          <p>
            <strong>Business Problem:</strong> Music labels and independent artists lacked a consolidated view to track streaming performance and listener demographics across regions.
          </p>
          <p>
            <strong>Objective:</strong> Design an interactive Power BI dashboard tracking KPIs like total streams, monthly listeners, and top tracks.
          </p>
        </>
      )
    },
    {
      title: "Streaming Data Architecture",
      content: (
        <>
          <p>
            The dashboard connects to Spotify weekly charts data, cleaning listener records:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Extraction:</strong> Ingests global top 200 track weekly audio CSV files.</li>
            <li><strong>Data Modeling:</strong> Builds dimension hierarchies for artists, genres, and track tempo.</li>
          </ul>
        </>
      )
    },
    {
      title: "Optimization Challenges",
      content: (
        <>
          <p>
            <strong>Challenges Encountered:</strong> Handling massive datasets of daily streams and optimizing DAX queries for dashboard responsiveness.
          </p>
          <p>
            <strong>Solution:</strong> Refactored measures and optimized database index relationships to guarantee low-latency visual rendering.
          </p>
        </>
      )
    },
    {
      title: "Key Insights & Outcome",
      content: (
        <>
          <p>
            <strong>Lessons Learned:</strong> Enhanced skills in optimizing visual rendering times for large-scale datasets in Power BI.
          </p>
          <p>
            Identified distinct regional preferences for genre and tempo, and discovered a correlation between track duration and replay value.
          </p>
        </>
      )
    }
  ],
  'walmart-sales-analysis': [
    {
      title: "Vision & Dataset",
      content: (
        <>
          <p>
            <strong>Business Problem:</strong> Walmart needs to optimize inventory turnover and identify seasonal buying patterns to reduce overstock and stockouts.
          </p>
          <p>
            <strong>Objective:</strong> Analyze 500k+ sales records to build an end-to-end data pipeline that highlights key sales trends and seasonal impacts.
          </p>
        </>
      )
    },
    {
      title: "ETL Pipeline & SQL",
      content: (
        <>
          <p>
            The database solution coordinates retail sales parameters into clean relational tables:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Ingestion:</strong> Extracts 500k+ CSV sales records.</li>
            <li><strong>Storage:</strong> Structured inside a PostgreSQL database utilizing indexed queries.</li>
          </ul>
        </>
      )
    },
    {
      title: "Cleaning Challenges",
      content: (
        <>
          <p>
            <strong>Challenges Encountered:</strong> Handling null values and data inconsistencies in the raw dataset, solved by rigorous SQL data cleaning.
          </p>
          <p>
            <strong>Solution:</strong> Formulated structured transactional views to filter out incomplete fields.
          </p>
        </>
      )
    },
    {
      title: "Key Insights & Outcome",
      content: (
        <>
          <p>
            <strong>Lessons Learned:</strong> Deepened understanding of advanced SQL window functions for time-series data.
          </p>
          <p>
            Identified peak purchasing seasons leading to a 15% better stock prediction capability, found top-performing branches and product lines, and uncovered customer demographic purchasing patterns.
          </p>
        </>
      )
    }
  ]
};

interface CaseStudyImageProps {
  src: string;
  alt: string;
}

function CaseStudyImage({ src, alt }: CaseStudyImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div className="w-full h-full min-h-[220px] bg-white/5 border border-borders rounded-2xl flex flex-col items-center justify-center p-6 text-center text-text-secondary">
        <Database size={32} className="text-primary/45 mb-2" />
        <span className="text-xs font-mono">Image Unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center bg-black/20 rounded-2xl overflow-hidden aspect-16/10 border border-borders shadow-md">
      {isLoading && (
        <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);

  const isFlagship = project && [
    'velora-ai', 'samsung-supply-chain', 'weather-dashboard', 'phone-analysis-dashboard',
    'swiggy-vs-zomato', 'spotify-dashboard', 'walmart-sales-analysis'
  ].includes(project.id);
  const beats = project ? BEATS_DATA[project.id] : undefined;

  // Scroll Observer for scrollytelling
  useScrollScrub(containerRef, {
    enter: 'top center',
    leave: 'bottom center',
    sync: true,
    beatCount: 4,
    onUpdate: (_progress, _velocity, beatIndex) => {
      setActiveBeat(beatIndex);
    },
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">Project Not Found</h2>
        <p className="text-text-secondary mb-8">The project case-study you are looking for does not exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-borders rounded-full text-text-primary hover:bg-white/10 transition-colors font-bold"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary pt-32 pb-24 px-4 md:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Link */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-12 group font-medium"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header section */}
        <header className="mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
            {project.cardLabel || `Case Study · ${project.category}`}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight heading-glow">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-3 items-center mb-8">
            <span className="px-3.5 py-1.5 bg-white/5 rounded-full text-xs font-medium text-text-secondary border border-borders">
              {project.category}
            </span>
            {project.duration && (
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 rounded-full text-xs font-medium text-text-secondary border border-borders">
                <Clock size={12} className="text-primary" />
                {project.duration}
              </span>
            )}
            <span className="px-3.5 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full">
              {project.difficulty}
            </span>
          </div>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light max-w-4xl">
            {project.description}
          </p>
        </header>

        {/* Dynamic content beats section (Scrollytelling for Flagships, normal detailed list for others) */}
        {isFlagship && beats && !REDUCED_MOTION ? (
          <div ref={containerRef} className="mt-24 border-t border-borders pt-16">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Narrative text beats */}
              <div className="lg:col-span-7 space-y-36 pb-24">
                {beats.map((beat, idx) => (
                  <div key={idx} className="min-h-[40vh] flex flex-col justify-center border-l-2 border-borders hover:border-primary/50 transition-colors pl-6 md:pl-8">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block font-mono">Stage 0{idx + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{beat.title}</h3>
                    <div className="text-text-secondary font-light leading-relaxed space-y-4">
                      {beat.content}
                    </div>
                    {/* Inline visual fallback for mobile */}
                    <div className="mt-8 lg:hidden">
                      <VisualCard index={idx} project={project} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Sticky Visual container for Desktop only */}
              <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-40 h-[480px]">
                <div className="relative w-full h-full glass-card rounded-[32px] overflow-hidden border border-borders shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center p-6">
                  <VisualCard index={activeBeat} project={project} />
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Normal static rendering (fallback for reduced motion, mobile, or other projects) */
          <div className="mt-16 border-t border-borders pt-16 space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 border border-borders">
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Database className="text-primary" size={20} />
                  Business Problem & Objective
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-4">
                  <strong>Problem:</strong> {project.businessProblem || "Required unified tracking and dashboard metrics."}
                </p>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  <strong>Objective:</strong> {project.objective || "Build a high-fidelity business intelligence dashboard solution."}
                </p>
              </div>

              <div className="glass-card p-8 border border-borders">
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Activity className="text-primary" size={20} />
                  Dataset & Scope
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {project.dataset || "Proprietary database schemas and structured reporting data."}
                </p>
              </div>
            </div>

            {project.insights && project.insights.length > 0 && (
              <div className="glass-card p-8 border border-borders">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <Trophy className="text-primary" size={20} />
                  Key Insights & Discoveries
                </h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {project.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                      <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {project.challenges && project.challenges.length > 0 && (
                <div className="glass-card p-8 border border-borders">
                  <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Code className="text-primary" size={20} />
                    Technical Challenges
                  </h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="text-text-secondary text-sm leading-relaxed list-disc pl-4">
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                <div className="glass-card p-8 border border-borders">
                  <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Trophy className="text-primary" size={20} />
                    Lessons Learned
                  </h3>
                  <ul className="space-y-3">
                    {project.lessonsLearned.map((lesson, index) => (
                      <li key={index} className="text-text-secondary text-sm leading-relaxed list-disc pl-4">
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Launch CTA */}
            <div className="glass-card p-8 border border-borders text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-text-primary mb-2">Explore the Project</h3>
              <p className="text-text-secondary text-sm mb-6">Inspect code source repositories or launch the live dashboard view.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-white/5 border border-borders rounded-full text-text-primary hover:bg-white/10 transition-colors font-bold text-sm flex items-center gap-2"
                >
                  <FaGithub size={16} />
                  View Repository
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-linear-to-r from-primary to-secondary text-white rounded-full hover:shadow-[0_0_20px_var(--color-glow)] transition-all font-bold text-sm flex items-center gap-2"
                  >
                    Launch Live Project
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface VisualCardProps {
  index: number;
  project: any;
}

function VisualCard({ index, project }: VisualCardProps) {
  const id = project.id;

  // Render project screenshot for Vision (0) and Outcome (3) beats
  if (index === 0) {
    return (
      <div className="flex flex-col justify-center h-full w-full space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-primary font-mono">Project Screenshot</h4>
        <CaseStudyImage src={project.coverImage || ''} alt={`${project.title} Interface`} />
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="flex flex-col justify-center h-full w-full space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-primary font-mono">Live Ingestion & Actions</h4>
        <div className="h-[200px] w-full">
          <CaseStudyImage src={project.coverImage || ''} alt={`${project.title} Final Result`} />
        </div>
        <div className="flex flex-col gap-2 max-w-xs mx-auto w-full">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 bg-white/5 border border-borders rounded-full text-text-primary hover:bg-white/10 transition-colors font-bold text-xs flex items-center justify-center gap-2"
          >
            <FaGithub size={14} />
            Inspect Codebase
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-linear-to-r from-primary to-secondary text-white rounded-full hover:shadow-[0_0_20px_var(--color-glow)] transition-all font-bold text-xs flex items-center justify-center gap-2"
            >
              Launch Live Project
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    );
  }

  // Render technical schematics for middle beats
  if (id === 'velora-ai') {
    switch (index) {
      case 1:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">Architecture Map</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">1</div>
                <span className="text-xs text-text-secondary font-mono">Prompt Input ➔ REST Gateway</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">2</div>
                <span className="text-xs text-text-secondary font-mono">OpenRouter API Orchestration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">3</div>
                <span className="text-xs text-text-secondary font-mono">JSON Sanitizer & Monaco Parser</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">4</div>
                <span className="text-xs text-text-secondary font-mono">Sandboxed Live IFrame Rendering</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-4">
            <div className="flex items-center justify-between border-b border-borders pb-2">
              <span className="text-xs font-mono text-text-secondary font-bold">Compiler Terminal</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-error/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-warning/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl font-mono text-xs text-text-secondary leading-relaxed space-y-2 border border-borders overflow-x-auto">
              <div className="text-primary">$ node parser.js --sync</div>
              <div className="text-success">[info] websocket established.</div>
              <div className="text-warning">[warn] syntax anomaly in deepseek output.</div>
              <div className="text-primary">[info] regex correction activated.</div>
              <div className="text-success">[ok] compiling build modules (250ms).</div>
            </div>
          </div>
        );
    }
  }

  if (id === 'samsung-supply-chain') {
    switch (index) {
      case 1:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary font-mono">Data Pipeline Schema</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">1</div>
                <span className="text-xs text-text-secondary font-mono">SQL Database Ingestion</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">2</div>
                <span className="text-xs text-text-secondary font-mono">Power Query ETL Transformation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">3</div>
                <span className="text-xs text-text-secondary font-mono">Optimized Star Schema Relationship</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">4</div>
                <span className="text-xs text-text-secondary font-mono">DAX Time Intelligence Queries</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-4">
            <div className="flex items-center justify-between border-b border-borders pb-2">
              <span className="text-xs font-mono text-text-secondary font-bold">DAX Editor (YoY Growth)</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl font-mono text-xs text-text-secondary leading-relaxed space-y-2 border border-borders overflow-x-auto">
              <div className="text-primary">YoY Growth = </div>
              <div className="text-text-muted pl-4">VAR PrevYear = </div>
              <div className="text-success pl-8">CALCULATE(</div>
              <div className="text-text-primary pl-12">[Total Sales],</div>
              <div className="text-text-primary pl-12">SAMEPERIODLASTYEAR('Date'[Date])</div>
              <div className="text-success pl-8">)</div>
              <div className="text-primary pl-4">RETURN DIVIDE([Sales] - PrevYear, PrevYear)</div>
            </div>
          </div>
        );
    }
  }

  if (id === 'weather-dashboard') {
    switch (index) {
      case 1:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary font-mono">API Connection Flow</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">1</div>
                <span className="text-xs text-text-secondary font-mono">Dynamic Web REST Call Trigger</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">2</div>
                <span className="text-xs text-text-secondary font-mono">OpenWeatherMap API Response Ingestion</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">3</div>
                <span className="text-xs text-text-secondary font-mono">Power Query JSON Parser Guard</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">4</div>
                <span className="text-xs text-text-secondary font-mono">Incremental Dataset Scheduled Refresh</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-4">
            <div className="flex items-center justify-between border-b border-borders pb-2">
              <span className="text-xs font-mono text-text-secondary font-bold">API Gateway Log Console</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-warning/40" />
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl font-mono text-xs text-text-secondary leading-relaxed space-y-2 border border-borders overflow-x-auto">
              <div className="text-primary">GET api.openweathermap.org/data/2.5/</div>
              <div className="text-success">[200 OK] Ingested payload (Sample).</div>
              <div className="text-text-primary">[Query] Coords Jodhpur, IN (Sample Query).</div>
              <div className="text-warning">[Refresher] Refresh task timer active (Sample Log).</div>
            </div>
          </div>
        );
    }
  }

  if (id === 'phone-analysis-dashboard') {
    switch (index) {
      case 1:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary font-mono">Ingestion Pipeline</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">1</div>
                <span className="text-xs text-text-secondary font-mono">BeautifulSoup Python Scraping Scripts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">2</div>
                <span className="text-xs text-text-secondary font-mono">Pandas Data-Cleansing & Normalization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">3</div>
                <span className="text-xs text-text-secondary font-mono">Specs CSV Ingestion to Power BI</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">4</div>
                <span className="text-xs text-text-secondary font-mono">Dynamic Price-to-Performance Model Joins</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary font-mono">Comparison Radar Index (Sample Output)</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs border-b border-borders pb-1.5">
                <span className="text-text-secondary font-mono">Performance Coefficient</span>
                <span className="font-bold text-text-primary font-mono">78% (Sample)</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-borders pb-1.5">
                <span className="text-text-secondary font-mono">Battery Endurance Rating</span>
                <span className="font-bold text-text-primary font-mono">91% (Sample)</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-borders pb-1.5">
                <span className="text-text-secondary font-mono">Value-to-Price Index</span>
                <span className="font-bold text-primary font-mono">84% (Sample)</span>
              </div>
            </div>
          </div>
        );
    }
  }

  if (id === 'swiggy-vs-zomato') {
    switch (index) {
      case 1:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary font-mono">Competitor ETL Flow</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">1</div>
                <span className="text-xs text-text-secondary font-mono">Raw Restaurant Scraped CSV Ingestion</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">2</div>
                <span className="text-xs text-text-secondary font-mono">Pandas Normalization & Standardizer</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">3</div>
                <span className="text-xs text-text-secondary font-mono">Power BI Multi-Table Relational Schema</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-4">
            <div className="flex items-center justify-between border-b border-borders pb-2">
              <span className="text-xs font-mono text-text-secondary font-bold">Wrangling Terminal (Sample Log)</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl font-mono text-xs text-text-secondary leading-relaxed space-y-2 border border-borders overflow-x-auto">
              <div className="text-success">[ok] parsed swiggy-dataset.csv.</div>
              <div className="text-success">[ok] parsed zomato-dataset.csv.</div>
              <div className="text-warning">[warn] standardizing rating formats (1 to 5 scale).</div>
              <div className="text-primary">[info] datasets schema normalized successfully.</div>
            </div>
          </div>
        );
    }
  }

  if (id === 'spotify-dashboard') {
    switch (index) {
      case 1:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary font-mono">Streaming Data Pipeline</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">1</div>
                <span className="text-xs text-text-secondary font-mono">Global Top 200 Weekly Audio CSV Ingest</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">2</div>
                <span className="text-xs text-text-secondary font-mono">Power Query Custom Ingestion Cleanup</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs font-mono">3</div>
                <span className="text-xs text-text-secondary font-mono">Dimension Hierarchies Mapping (Tempo/Genre)</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-4">
            <div className="flex items-center justify-between border-b border-borders pb-2">
              <span className="text-xs font-mono text-text-secondary font-bold">DAX Measure Editor (Tracks Count)</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-secondary/40" />
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl font-mono text-xs text-text-secondary leading-relaxed space-y-2 border border-borders overflow-x-auto">
              <div className="text-primary">Total Tracks Count = </div>
              <div className="text-success pl-4">DISTINCTCOUNT(</div>
              <div className="text-text-primary pl-8">'Weekly Charts'[Track Name]</div>
              <div className="text-success pl-4">)</div>
              <div className="text-primary pl-4"># Optimization: Reduced visual rendering time</div>
            </div>
          </div>
        );
    }
  }

  if (id === 'walmart-sales-analysis') {
    switch (index) {
      case 1:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary font-mono">Retail Ingestion Map</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">1</div>
                <span className="text-xs text-text-secondary font-mono">500k+ Sales Records CSV Extraction</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">2</div>
                <span className="text-xs text-text-secondary font-mono">PostgreSQL relational table mappings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">3</div>
                <span className="text-xs text-text-secondary font-mono">SQL data cleaning pipelines & CTE queries</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center h-full w-full space-y-4">
            <div className="flex items-center justify-between border-b border-borders pb-2">
              <span className="text-xs font-mono text-text-secondary font-bold">PostgreSQL Console (Analytical Query)</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-xl font-mono text-[10px] md:text-xs text-text-secondary leading-relaxed space-y-2 border border-borders overflow-x-auto">
              <div className="text-primary">SELECT branch, payment_method,</div>
              <div className="text-success pl-4">SUM(weekly_sales) OVER (PARTITION BY branch)</div>
              <div className="text-primary pl-4">FROM walmart_sales_data</div>
              <div className="text-primary pl-4">WHERE branch IS NOT NULL;</div>
            </div>
          </div>
        );
    }
  }

  return null;
}
