export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["Python", "SQL", "JavaScript", "Java", "C++", "HTML", "CSS"]
  },
  {
    title: "Business Intelligence",
    skills: ["Power BI", "DAX", "Power Query", "Microsoft Fabric", "KPI Dashboard Design", "Data Modeling", "Star Schema", "Business Intelligence", "Dashboard Development", "Data Storytelling"]
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLAlchemy"]
  },
  {
    title: "Data Analytics",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Cleaning", "EDA", "Data Transformation", "Statistical Analysis", "Business Analytics", "Data Visualization"]
  },
  {
    title: "MERN Stack",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Tailwind CSS", "Bootstrap", "Responsive Design", "Authentication", "CRUD Applications"]
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "pgAdmin", "SQL Workbench", "Postman", "Microsoft Excel"]
  }
];
