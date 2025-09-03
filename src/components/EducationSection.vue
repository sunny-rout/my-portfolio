<template>
  <section id="education" class="section">
    <div class="container">
      <h2 class="section-title fade-in">Education & Certifications</h2>
      
      <div class="education-content">
        <!-- Education -->
        <div class="education-section fade-in">
          <h3 class="subsection-title">Education</h3>
          <div class="education-card">
            <div class="education-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div class="education-details">
              <h4>Bachelor of Engineering - Computer Science</h4>
              <p class="institution">Vishwaniketan's iMEET, Mumbai</p>
              <p class="duration">2013 - 2017</p>
              <p class="description">
                Comprehensive computer science education covering software engineering principles, 
                data structures, algorithms, and system design fundamentals.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Certifications -->
        <div class="certifications-section fade-in">
          <h3 class="subsection-title">Professional Certifications</h3>
          <div class="certifications-grid">
            <div class="certification-card" v-for="cert in certifications" :key="cert.id">
              <div class="cert-header">
                <div class="cert-icon" v-html="cert.icon"></div>
                <div class="cert-provider">{{ cert.provider }}</div>
              </div>
              <h4 class="cert-title">{{ cert.title }}</h4>
              <p class="cert-date">{{ cert.date }}</p>
              <p class="cert-description">{{ cert.description }}</p>
              <div class="cert-skills">
                <span class="skill-tag" v-for="skill in cert.skills" :key="skill">
                  {{ skill }}
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
import '../styles/educationSection.css'

const certifications = ref([
  {
    id: 1,
    title: 'Generative AI Foundations Certificate',
    provider: 'upGrad/Microsoft',
    date: 'August 2025',
    icon: '🤖',
    description: 'Comprehensive training in generative AI technologies, machine learning models, and AI application development.',
    skills: ['Generative AI', 'Machine Learning', 'AI Ethics', 'Model Training']
  },
  {
    id: 2,
    title: 'AWS DevOps Engineer',
    provider: 'AWS Training',
    date: 'September 2024',
    icon: '⚙️',
    description: 'Advanced DevOps practices on AWS, including CI/CD pipelines, infrastructure automation, and monitoring.',
    skills: ['AWS DevOps', 'CI/CD', 'Infrastructure as Code', 'Monitoring']
  },
  {
    id: 3,
    title: 'Architecting on AWS',
    provider: 'AWS Training',
    date: 'August 2024',
    icon: '🏗️',
    description: 'Designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
    skills: ['AWS Architecture', 'Scalability', 'High Availability', 'System Design']
  },
  {
    id: 4,
    title: 'AWS Technical Essentials',
    provider: 'AWS Training',
    date: 'October 2023',
    icon: '☁️',
    description: 'Foundational knowledge of AWS services, security, architecture, and pricing.',
    skills: ['AWS Fundamentals', 'Cloud Computing', 'AWS Services', 'Security']
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
