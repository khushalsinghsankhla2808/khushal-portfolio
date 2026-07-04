import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  Legend,
} from "recharts";
import { projects } from "../../data/projects";

// Derived skill categories for the Radar Chart
const skillCategories = [
  {
    category: "Data Analysis",
    skills: ["Python", "SQL", "Pandas", "NumPy", "Exploratory Data Analysis (EDA)", "Statistical Analysis"]
  },
  {
    category: "BI & Visualization",
    skills: ["Power BI", "DAX", "Power Query", "Dashboard Development", "KPI Dashboard Design", "Business Intelligence", "Data Modeling", "Data Storytelling", "Data Visualization"]
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB"]
  },
  {
    category: "Frontend Dev",
    skills: ["JavaScript", "React", "Tailwind CSS", "TypeScript", "Next.js"]
  },
  {
    category: "Backend Dev",
    skills: ["Node.js", "Express.js"]
  },
  {
    category: "AI & ML",
    skills: ["AI Integration", "Prompt Engineering", "LLM APIs", "Retrieval-Augmented Generation (RAG)", "Generative AI", "Machine Learning Fundamentals"]
  }
];

// Shared chart color palette pulled from the existing design tokens
const CHART_COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent, var(--color-primary))",
  "var(--color-highlight, var(--color-secondary))",
];

// Shared tooltip shell so every chart's tooltip looks identical
function ChartTooltip({
  active,
  payload,
  labelKey = "name",
  valueSuffix = "",
}: any) {
  if (active && payload && payload.length) {
    const label = payload[0]?.payload?.[labelKey] ?? payload[0]?.name;
    return (
      <div className="bg-cards/90 backdrop-blur-xl border border-borders p-3 rounded-lg shadow-xl shadow-black/50">
        <p className="text-text-primary font-bold text-sm mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p
            key={i}
            className="text-xs font-medium"
            style={{ color: p.color || p.fill }}
          >
            {p.name}: {p.value}
            {valueSuffix}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// Shared card wrapper so every chart section has identical motion/hover treatment
function ChartCard({
  title,
  description,
  hoverColorVar,
  delay = 0,
  children,
}: {
  title: string;
  description: string;
  hoverColorVar: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-3xl p-6 md:p-8 border border-borders flex flex-col transition-all duration-500"
      style={{ ["--hover-shadow" as any]: `0 0 20px ${hoverColorVar}` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${hoverColorVar}`;
        e.currentTarget.style.borderColor = hoverColorVar;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "";
      }}
    >
      <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm mb-8 font-light">
        {description}
      </p>
      <div className="h-[300px] w-full mt-auto">{children}</div>
    </motion.div>
  );
}

export default function AnalyticsDashboard() {
  // 1. Skill Distribution — Radar Chart (kept, already effective for this data shape)
  const skillData = useMemo(
    () =>
      skillCategories.map((cat) => ({
        subject: cat.category,
        count: cat.skills.length,
        fullMark: 10,
      })),
    [],
  );

  // 2. Projects by Category — Donut Chart (replaces flat bar chart for composition-style data)
  const projectCategoryData = useMemo(() => {
    const counts = projects.reduce(
      (acc, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // 3. Projects by Difficulty over "build order" — animated Line Chart
  // Uses each project's index as a proxy timeline since real dates aren't tracked yet;
  // plots a cumulative count of Advanced-difficulty projects to show a growth trend.
  const difficultyTrendData = useMemo(() => {
    let cumulativeAdvanced = 0;
    return projects.map((project, index) => {
      if (project.difficulty === "Advanced") cumulativeAdvanced += 1;
      return {
        name: `#${index + 1}`,
        project: project.title,
        advanced: cumulativeAdvanced,
      };
    });
  }, []);

  // 4. Tech Tags vs. Domain Tags per project — Stacked Bar Chart
  // Shows, per category, how many tech tags vs domain tags each project type typically carries —
  // a rough proxy for "technical depth" vs "business-context breadth" per category.
  const stackedTagData = useMemo(() => {
    const byCategory = projects.reduce(
      (acc, project) => {
        if (!acc[project.category]) {
          acc[project.category] = {
            name: project.category,
            techTags: 0,
            domainTags: 0,
          };
        }
        acc[project.category].techTags += project.techTags.length;
        acc[project.category].domainTags += project.domainTags.length;
        return acc;
      },
      {} as Record<
        string,
        { name: string; techTags: number; domainTags: number }
      >,
    );

    return Object.values(byCategory).sort(
      (a, b) => b.techTags + b.domainTags - (a.techTags + a.domainTags),
    );
  }, []);

  // 5. Project Complexity Scatter — tech tag count vs skill count per project
  // Each dot is one project; reveals whether "more technologies used" correlates with
  // "more distinct skills demonstrated," and which projects are outliers in either direction.
  const scatterData = useMemo(
    () =>
      projects.map((project) => ({
        name: project.title,
        techCount: project.techTags.length,
        skillCount: project.skills.length,
        difficulty: project.difficulty,
      })),
    [],
  );

  const scatterByDifficulty = useMemo(() => {
    const groups: Record<string, typeof scatterData> = {};
    scatterData.forEach((d) => {
      if (!groups[d.difficulty]) groups[d.difficulty] = [];
      groups[d.difficulty].push(d);
    });
    return groups;
  }, [scatterData]);

  const difficultyColor: Record<string, string> = {
    Advanced: "var(--color-primary)",
    Intermediate: "var(--color-secondary)",
    Beginner: "var(--color-accent, var(--color-primary))",
  };

  return (
    <section
      id="analytics"
      className="py-32 px-4 max-w-7xl mx-auto relative z-10 border-t border-borders"
    >
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="font-handwriting text-3xl text-accent transform -rotate-2 inline-block">
            By the Numbers
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter text-text-primary heading-glow">
          Analytics <span className="text-primary">Dashboard</span>
        </h2>
        <p className="text-text-secondary text-lg font-light max-w-2xl mx-auto">
          A real-time visualization of my technical stack and project portfolio,
          generated directly from the site's data files.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chart 1: Skill Distribution — Radar */}
        <ChartCard
          title="Skill Distribution"
          description="Technologies tracked across different technical domains."
          hoverColorVar="var(--color-primary)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
              <PolarGrid stroke="var(--color-borders)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "var(--color-text-secondary)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              />
              <Tooltip
                content={<ChartTooltip labelKey="subject" />}
                cursor={{ fill: "var(--color-borders)" }}
              />
              <Radar
                name="Skills"
                dataKey="count"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="var(--color-primary)"
                fillOpacity={0.3}
                isAnimationActive
                animationDuration={900}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: Project Portfolio — Donut */}
        <ChartCard
          title="Project Portfolio"
          description="Share of hands-on projects by primary technology."
          hoverColorVar="var(--color-secondary)"
          delay={0.1}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<ChartTooltip />} />
              <Pie
                data={projectCategoryData}
                dataKey="count"
                nameKey="name"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={3}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              >
                {projectCategoryData.map((_, index) => (
                  <Cell
                    key={`donut-cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    stroke="var(--color-background, #0a0a0f)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-text-secondary text-xs">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 3: Advanced-Project Growth — Animated Line Chart */}
        <ChartCard
          title="Advanced Project Growth"
          description="Cumulative count of advanced-difficulty projects across the build order."
          hoverColorVar="var(--color-primary)"
          delay={0.15}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={difficultyTrendData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid stroke="var(--color-borders)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "var(--color-text-secondary)", fontSize: 10 }}
                axisLine={{ stroke: "var(--color-borders)" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<ChartTooltip labelKey="project" />}
                cursor={{ stroke: "var(--color-borders)" }}
              />
              <Line
                type="monotone"
                dataKey="advanced"
                name="Advanced Projects"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
                isAnimationActive
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 4: Tech vs. Domain Tags per Category — Stacked Bar */}
        <ChartCard
          title="Technical vs. Domain Breadth"
          description="Tech tags vs. domain/industry tags accumulated per project category."
          hoverColorVar="var(--color-secondary)"
          delay={0.2}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stackedTagData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid stroke="var(--color-borders)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{
                  fill: "var(--color-text-secondary)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
                axisLine={{ stroke: "var(--color-borders)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "var(--color-borders)" }}
              />
              <Legend
                verticalAlign="top"
                height={30}
                formatter={(value) => (
                  <span className="text-text-secondary text-xs">{value}</span>
                )}
              />
              <Bar
                dataKey="techTags"
                name="Tech Tags"
                stackId="tags"
                fill="var(--color-primary)"
                radius={[0, 0, 0, 0]}
                isAnimationActive
                animationDuration={900}
              />
              <Bar
                dataKey="domainTags"
                name="Domain Tags"
                stackId="tags"
                fill="var(--color-secondary)"
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationDuration={900}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 5: Project Complexity — Scatter (full width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="glass-card rounded-3xl p-6 md:p-8 border border-borders flex flex-col lg:col-span-2 transition-all duration-500 hover:shadow-[0_0_20px_var(--color-primary)] hover:border-primary/50"
        >
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Project Complexity Map
          </h3>
          <p className="text-text-secondary text-sm mb-8 font-light">
            Each dot is one project — technologies used vs. distinct skills
            demonstrated, grouped by difficulty.
          </p>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-borders)" />
                <XAxis
                  type="number"
                  dataKey="techCount"
                  name="Tech Tags Used"
                  tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }}
                  axisLine={{ stroke: "var(--color-text-secondary)" }}
                  tickLine={false}
                  label={{
                    value: "Technologies Used",
                    position: "insideBottom",
                    offset: -5,
                    fill: "var(--color-text-secondary)",
                    fontSize: 11,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="skillCount"
                  name="Skills Demonstrated"
                  tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }}
                  axisLine={{ stroke: "var(--color-text-secondary)" }}
                  tickLine={false}
                  label={{
                    value: "Skills Demonstrated",
                    angle: -90,
                    position: "insideLeft",
                    fill: "var(--color-text-secondary)",
                    fontSize: 11,
                  }}
                />
                <Tooltip
                  cursor={{
                    strokeDasharray: "3 3",
                    stroke: "var(--color-text-secondary)",
                  }}
                  content={<ChartTooltip labelKey="name" />}
                />
                <Legend
                  verticalAlign="top"
                  height={30}
                  formatter={(value) => (
                    <span className="text-text-secondary text-xs">{value}</span>
                  )}
                />
                {Object.entries(scatterByDifficulty).map(
                  ([difficulty, points]) => (
                    <Scatter
                      key={difficulty}
                      name={difficulty}
                      data={points}
                      fill={
                        difficultyColor[difficulty] || "var(--color-primary)"
                      }
                      isAnimationActive
                      animationDuration={900}
                    />
                  ),
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
