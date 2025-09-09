<template>
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title fade-in">Featured Projects</h2>
      
      <div class="projects-grid">
        <div class="project-card fade-in" v-for="project in projects" :key="project.id">
          <div class="project-image">
            <div class="project-icon" v-html="project.icon"></div>
            <div class="project-overlay">
              <div class="project-links">
                <button class="project-link" @click="openProjectDetails(project)">
                  View Details
                </button>
              </div>
            </div>
          </div>
          
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-impact">
              <div class="impact-item" v-for="impact in project.impacts" :key="impact.label">
                <span class="impact-value">{{ impact.value }}</span>
                <span class="impact-label">{{ impact.label }}</span>
              </div>
            </div>
            
            <div class="project-tech">
              <span class="tech-tag" v-for="tech in project.technologies" :key="tech">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Project Details Modal -->
    <div class="modal-overlay" v-if="selectedProject" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="modal-header">
          <div class="modal-icon" v-html="selectedProject.icon"></div>
          <h3>{{ selectedProject.title }}</h3>
        </div>
        <div class="modal-body">
          <p class="modal-description">{{ selectedProject.fullDescription }}</p>
          <div class="modal-details">
            <div class="detail-section">
              <h4>Key Achievements</h4>
              <ul>
                <li v-for="achievement in selectedProject.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
            <div class="detail-section">
              <h4>Technologies Used</h4>
              <div class="tech-list">
                <span class="tech-tag" v-for="tech in selectedProject.technologies" :key="tech">
                  {{ tech }}
                </span>
              </div>
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
import '../styles/projectSection.css'

const selectedProject = ref(null)

const projects = ref([
  {
    id: 1,
    title: 'Enterprise VPN CI/CD Migration',
    description: 'Led successful VPN migration from Jenkins to TeamCity, reducing build times by 40% and boosting deployment reliability through cross-platform automation.',
    fullDescription: 'Spearheaded a comprehensive migration of enterprise VPN infrastructure from Jenkins to TeamCity, implementing advanced CI/CD pipelines with cross-platform automation. This project involved redesigning build configurations, implementing Infrastructure as Code practices, and establishing robust testing frameworks.',
    icon: '🔧',
    impacts: [
      { value: '40%', label: 'Build Time Reduction' },
      { value: '99.9%', label: 'Deployment Reliability' }
    ],
    technologies: ['TeamCity', 'Docker', 'Kubernetes', 'AWS', 'Terraform'],
    achievements: [
      'Reduced build times from 45 minutes to 27 minutes average',
      'Implemented automated rollback mechanisms',
      'Established comprehensive monitoring and alerting',
      'Created detailed documentation and training materials'
    ]
  },
  {
    id: 2,
    title: 'AntiTrack Desktop Application',
    description: 'Privacy-focused desktop app with microservice architecture and SSO, adopted by 1M+ users, reducing third-party tracking by 60%.',
    fullDescription: 'Developed a comprehensive privacy protection desktop application using microservices architecture. The application features advanced tracking protection, secure authentication, and real-time privacy monitoring capabilities.',
    icon: '🛡️',
    impacts: [
      { value: '1M+', label: 'Active Users' },
      { value: '60%', label: 'Tracking Reduction' }
    ],
    technologies: ['Node.js', 'React.js', '.NET/C#', 'Microservices', 'SSO'],
    achievements: [
      'Architected scalable microservices infrastructure',
      'Implemented secure single sign-on authentication',
      'Developed real-time privacy monitoring dashboard',
      'Achieved 1M+ user adoption within first year'
    ]
  },
  {
    id: 3,
    title: 'AWS Serverless Platform',
    description: 'Serverless applications using Infrastructure as Code with Terraform/Terragrunt for environment management and optimal performance.',
    fullDescription: 'Built a comprehensive serverless platform on AWS using Infrastructure as Code principles. The platform features automated provisioning, environment management, and performance optimization for serverless applications.',
    icon: '⚡',
    impacts: [
      { value: '100%', label: 'Infrastructure Automation' },
      { value: '50%', label: 'Cost Reduction' }
    ],
    technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Terraform', 'TypeScript'],
    achievements: [
      'Implemented fully automated infrastructure provisioning',
      'Created reusable Terraform modules for rapid deployment',
      'Established comprehensive monitoring and logging',
      'Achieved 50% cost reduction through optimization'
    ]
  }
])

const openProjectDetails = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}

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
