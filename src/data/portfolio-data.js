export const portfolioData = {
  personal: {
    name: "Sunny Vijay Rout",
    tagline: "Lead Software Engineer | AWS | AI Generalist | CI/CD Automation Specialist | FullStack Developer | Technical Connector | Change Agent",
    location: "Navi Mumbai, Maharashtra",
    email: "sunnyrout06@gmail.com",
    phone: "+91-7021537069",
    linkedin: "https://www.linkedin.com/in/sunny-rout",
    github: "https://github.com/sunny-rout",
    summary: "As a seasoned Software Engineer with over 8 years of experience, I excel at driving change and bridging the gap between technical teams and business goals. My focus isn't just on code; it's on orchestrating projects, optimizing processes, and mentoring teams to deliver high-impact, scalable solutions that drive business value. I champion agile methodologies and use a transparent, collaborative approach to solve complex challenges across DevOps, CI/CD automation, and full-stack development.",
    avatar: "SVR",
    yearsExperience: 8
  },
  
  navigation: [
    { id: "hero", label: "Home", icon: "fas fa-home" },
    { id: "about", label: "About", icon: "fas fa-user" },
    { id: "skills", label: "Skills", icon: "fas fa-cogs" },
    { id: "experience", label: "Experience", icon: "fas fa-briefcase" },
    { id: "projects", label: "Projects", icon: "fas fa-folder-open" },
    { id: "certifications", label: "Certifications", icon: "fas fa-certificate" },
    { id: "contact", label: "Contact", icon: "fas fa-envelope" }
  ],

  skills: {
    categories: [
      {
        id: "tools_frameworks",
        name: "Tools & Frameworks",
        icon: "fas fa-tools",
        items: [
          { name: ".NET", years: 8, level: 95, icon: "fas fa-code", color: "#512BD4" },
          { name: "TeamCity", years: 7, level: 90, icon: "fas fa-cogs", color: "#00C7B7" },
          { name: "IntelliJ IDEA", years: 7, level: 85, icon: "fas fa-laptop-code", color: "#000000" },
          { name: "Jira", years: 7, level: 85, icon: "fas fa-tasks", color: "#0052CC" },
          { name: "Node.js", years: 5, level: 85, icon: "fab fa-node-js", color: "#339933" },
          { name: "AWS", years: 3, level: 85, icon: "fab fa-aws", color: "#FF9900" },
          { name: "Docker", years: 3, level: 85, icon: "fab fa-docker", color: "#2496ED" },
          { name: "React.js", years: 3, level: 75, icon: "fab fa-react", color: "#61DAFB" },
          { name: "Kubernetes", years: 2, level: 70, icon: "fas fa-dharmachakra", color: "#326CE5" }
        ]
      },
      {
        id: "languages",
        name: "Programming Languages",
        icon: "fas fa-code",
        items: [
          { name: "C#", years: 8, level: 95, icon: "fas fa-code", color: "#239120" },
          { name: "JavaScript", years: 7, level: 85, icon: "fab fa-js", color: "#F7DF1E" },
          { name: "Python", years: 5, level: 85, icon: "fab fa-python", color: "#3776AB" },
          { name: "TypeScript", years: 4, level: 80, icon: "fas fa-code", color: "#3178C6" },
          { name: "SQL", years: 3, level: 85, icon: "fas fa-database", color: "#336791" },
          { name: "Go/Golang", years: 2, level: 65, icon: "fas fa-code", color: "#00ADD8" }
        ]
      }
    ],
    specializations: [
      { name: "AI Generalist", icon: "fas fa-robot", color: "#FF6B6B", description: "AI-powered solutions and automation" },
      { name: "DevOps", icon: "fas fa-infinity", color: "#4ECDC4", description: "Continuous integration and deployment" },
      { name: "CI/CD Automation", icon: "fas fa-sync", color: "#45B7D1", description: "Automated build and deployment pipelines" },
      { name: "Cloud Architecture", icon: "fas fa-cloud", color: "#96CEB4", description: "Scalable cloud infrastructure design" },
      { name: "Lead Software Engineer", icon: "fas fa-users", color: "#FECA57", description: "Team leadership and process optimization" },
      { name: "FullStack Development", icon: "fas fa-layer-group", color: "#FFB400", description: "End-to-end web application development" },
      { name: "Technical Mentoring", icon: "fas fa-chalkboard-teacher", color: "#FF9FF3", description: "Knowledge sharing and team development" }
    ]
  },

  experience: [
    {
      id: 1,
      title: "Principal Software Engineer",
      company: "Norton LifeLock India Pvt. Ltd",
      period: "October 2023 - June 2025",
      duration: "1 year 8 months",
      achievements: [
        "Led architectural design and POC for robust CI/CD build configurations for VPN and Serverless Frameworks",
        "Championed Infrastructure as Code (IaC) strategy using Terraform and Terragrunt for AWS cloud resources",
        "Orchestrated VPN migration from Jenkins to TeamCity, reducing build times by 40%",
        "Integrated Go services to deploy containerized applications on ECS and EKS with gRPC APIs",
        "Developed custom Python script for automated security checks in CI/CD workflow"
      ],
      technologies: ["AWS", "Terraform", "Terragrunt", "TeamCity", "Go", "Python", "NodeJS", "TypeScript", "Docker", "Kubernetes"]
    },
    {
      id: 2,
      title: "Senior Software Engineer",
      company: "CN Techies Pvt. Ltd",
      period: "May 2018 - September 2023",
      duration: "5 years 5 months",
      achievements: [
        "Spearheaded AntiTrack desktop application development, adopted by over 1 million users",
        "Reduced third-party tracking by 60% through custom security libraries integration",
        "Created reusable Python tool for automated Windows installer creation",
        "Pioneered end-to-end CI/CD build configuration, cutting deployment time by 70%",
        "Led team mentoring on CI/CD pipeline and custom IPM tool adoption"
      ],
      technologies: ["C#", ".NET", "Python", "CI/CD", "Security Libraries", "Desktop Development"]
    },
    {
      id: 3,
      title: "Software Developer",
      company: "Alchemy Information Systems Pvt. Ltd",
      period: "June 2017 - May 2018",
      duration: "1 year",
      achievements: [
        "Led data migration from Oracle to MS SQL Server with comprehensive database schema",
        "Developed desktop-based ERP and banking systems improving reporting accuracy by 40%",
        "Engineered Treasury Management System (TMS) for banks using C# and SQL Server",
        "Enhanced core modules for Magica ERP system managing HR, sales, and finance"
      ],
      technologies: ["C#", "SQL Server", "Oracle", "ERP Systems", "Banking Systems", "Web Development"]
    }
  ],

  projects: [
    {
      id: 1,
      name: "AntiTrack Desktop Application",
      description: "Privacy protection application adopted by over 1 million users, featuring advanced tracking prevention and custom security libraries.",
      technologies: ["C#", ".NET", "Security Libraries", "Desktop Development"],
      impact: "60% reduction in third-party tracking, 1M+ user adoption",
      category: "desktop",
      status: "completed",
      year: "2018-2023",
      featured: true
    },
    {
      id: 2,
      name: "CI/CD Pipeline Modernization",
      description: "Complete migration and modernization of build systems from Jenkins to TeamCity with cross-platform automation.",
      technologies: ["TeamCity", "Jenkins", "CI/CD", "Python", "Automation"],
      impact: "40% reduction in build times, 70% faster deployment",
      category: "devops",
      status: "completed",
      year: "2023-2024",
      featured: true
    },
    {
      id: 3,
      name: "AWS Serverless Architecture",
      description: "High-performance, scalable serverless applications with comprehensive infrastructure as code implementation.",
      technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "NodeJS", "TypeScript", "Terraform"],
      impact: "Scalable serverless architecture with optimal environment segregation",
      category: "cloud",
      status: "completed",
      year: "2023-2024",
      featured: true
    }
  ],

  certifications: [
    {
      id: 1,
      name: "Generative AI Foundations Certificate Program",
      issuer: "upGrad in collaboration with Microsoft",
      date: "August 2025",
      badge: "🤖",
      skills: ["Generative AI", "Machine Learning", "Prompt Engineering", "AI Ethics"]
    },
    {
      id: 1,
      name: "Generative AI Mastermind",
      issuer: "GrowthSchool in collaboration with Outskill",
      date: "August 2025",
      badge: "🤖",
      skills: ["Generative AI", "Data Engineering", "Diffusion Models", "AI Ethics"]
    },
    {
      id: 1,
      name: "Generative AI Engineering Mastermind",
      issuer: "GrowthSchool in collaboration with Outskill",
      date: "August 2025",
      badge: "🤖",
      skills: ["Generative AI", "AI Agents", "AI Automation", "AI Ethics"]
    },
    {
      id: 2,
      name: "AWS DevOps Engineer",
      issuer: "AWS Training and Certification",
      date: "September 2024",
      badge: "☁️",
      skills: ["DevOps", "CI/CD", "AWS Services"]
    },
    {
      id: 3,
      name: "Architecting on AWS",
      issuer: "AWS Training and Certification",
      date: "August 2024",
      badge: "🏗️",
      skills: ["Cloud Architecture", "AWS Design Patterns", "Scalability"]
    },
    {
      id: 4,
      name: "AWS Technical Essentials",
      issuer: "AWS Training and Certification",
      date: "October 2023",
      badge: "⚡",
      skills: ["AWS Fundamentals", "Cloud Computing", "AWS Services"]
    }
  ],

  stats: {
    yearsExperience: 8,
    projectsCompleted: 10,
    usersImpacted: 1000000,
    genAICertifications: 3,
    awsCertifications: 4,
    technologiesUsed: 25,
    teamsLed: 5
  },

  socialMedia: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/sunnyrout", icon: "fab fa-linkedin-in", color: "#0077B5" },
    { platform: "GitHub", url: "https://github.com/sunny-rout", icon: "fab fa-github", color: "#333333" }
  ]
}
