<template>
  <section id="experience" class="section">
    <div class="container">
      <h2 class="section-title fade-in">Professional Experience</h2>
      
      <div class="timeline">
        <div class="timeline-item fade-in" v-for="(job, index) in experience" :key="index">
          <div class="timeline-marker">
            <div class="timeline-dot"></div>
            <div class="timeline-line" v-if="index < experience.length - 1"></div>
          </div>
          
          <div class="timeline-content">
            <div class="job-header">
              <div class="job-title-section">
                <h3 class="job-title">{{ job.title }}</h3>
                <h4 class="company-name">{{ job.company }}</h4>
              </div>
              <div class="job-duration">
                <span class="duration-badge">{{ job.duration }}</span>
                <span class="location">{{ job.location }}</span>
              </div>
            </div>
            
            <p class="job-description">{{ job.description }}</p>
            
            <div class="achievements">
              <h5>Key Achievements</h5>
              <ul class="achievements-list">
                <li v-for="achievement in job.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
            
            <div class="job-technologies">
              <span class="tech-tag" v-for="tech in job.technologies" :key="tech">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../styles/common.css'
import '../styles/experienceSection.css'

const experience = ref([
  {
    title: 'Principal Software Engineer',
    company: 'Norton LifeLock India Pvt. Ltd',
    duration: 'October 2023 - June 2025',
    location: 'Navi Mumbai, India',
    description: 'Leading cloud infrastructure and DevOps initiatives, pioneering CI/CD solutions and serverless architectures while mentoring development teams.',
    achievements: [
      'Pioneered CI/CD build configurations for VPN and Serverless Frameworks',
      'Implemented Infrastructure as Code strategy using Terraform/Terragrunt',
      'Led VPN migration reducing build times by 40%',
      'Developed serverless applications on AWS with automated security checks',
      'Mentored team members and served as Scrum Master'
    ],
    technologies: ['AWS', 'Terraform', 'TeamCity', 'Docker', 'Kubernetes', 'Serverless', 'CI/CD']
  },
  {
    title: 'Senior Software Engineer',
    company: 'CN Techies Pvt. Ltd',
    duration: 'May 2018 - September 2023',
    location: 'Mumbai, India',
    description: 'Developed enterprise-scale applications with microservice architecture, focusing on privacy and security solutions with significant user adoption.',
    achievements: [
      'Developed AntiTrack app adopted by 1M+ users',
      'Built microservice architecture with Node.js/React.js and .NET/C#',
      'Reduced deployment time by 70% and post-deployment bugs by 40%',
      'Created custom security libraries and signing tools',
      'Implemented SSO and advanced privacy protection features'
    ],
    technologies: ['Node.js', 'React.js', '.NET/C#', 'Microservices', 'SSO', 'Docker', 'JavaScript']
  },
  {
    title: 'Software Developer',
    company: 'Alchemy Information Systems Pvt. Ltd',
    duration: 'June 2017 - May 2018',
    location: 'Mumbai, India',
    description: 'Architected and developed ERP and banking systems, focusing on data migration and system optimization for financial institutions.',
    achievements: [
      'Architected ERP and banking systems improving reporting accuracy by 40%',
      'Engineered Treasury Management System using C# and SQL Server',
      'Managed Oracle to MS SQL Server migration',
      'Optimized database performance and system reliability',
      'Developed comprehensive reporting and analytics modules'
    ],
    technologies: ['C#', 'SQL Server', 'Oracle', 'ASP.NET', 'ERP Systems', 'Banking Solutions']
  }
])

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el)
  })
})
</script>
