<template>
  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title fade-in">About Me</h2>
      
      <div class="about-content">
        <div class="about-text fade-in">
          <p class="about-description">
            Experienced Software Engineer with over <strong>8 years of expertise</strong> in building secure, 
            scalable, and cloud-native applications. A dedicated problem-solver and quick learner with 
            transparent and deep-dive approach to technical challenges.
          </p>
          
          <p class="about-description">
            Skilled in <strong>DevOps, CI/CD, and full-stack development</strong> across AWS, Docker, and Kubernetes. 
            Proven track record in leading automation initiatives, managing cross-platform integrations, 
            and delivering high-impact solutions.
          </p>
          
          <div class="about-highlights">
            <div class="highlight">
              <div class="highlight-icon">🚀</div>
              <div class="highlight-content">
                <h4>Innovation Leader</h4>
                <p>Pioneering CI/CD solutions and serverless architectures</p>
              </div>
            </div>
            
            <div class="highlight">
              <div class="highlight-icon">⚡</div>
              <div class="highlight-content">
                <h4>Performance Optimizer</h4>
                <p>Consistently delivering 40%+ improvements in build times and reliability</p>
              </div>
            </div>
            
            <div class="highlight">
              <div class="highlight-icon">🎯</div>
              <div class="highlight-content">
                <h4>Impact Focused</h4>
                <p>Solutions adopted by 1M+ users with measurable business outcomes</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-visual fade-in">
          <div class="experience-card">
            <div class="experience-years">
              <span class="years-number">8+</span>
              <span class="years-label">Years of Excellence</span>
            </div>
            
            <div class="experience-details">
              <div class="detail">
                <span class="detail-label">Current Role</span>
                <span class="detail-value">Principal Software Engineer</span>
              </div>
              
              <div class="detail">
                <span class="detail-label">Location</span>
                <span class="detail-value">Navi Mumbai, India</span>
              </div>
              
              <div class="detail">
                <span class="detail-label">Specialization</span>
                <span class="detail-value">Cloud & DevOps</span>
              </div>
            </div>
            
            <div class="tech-stack">
              <div class="tech-category">
                <h5>Primary Technologies</h5>
                <div class="tech-tags">
                  <span class="tech-tag">AWS</span>
                  <span class="tech-tag">Docker</span>
                  <span class="tech-tag">Kubernetes</span>
                  <span class="tech-tag">Terraform</span>
                  <span class="tech-tag">Jenkins</span>
                  <span class="tech-tag">C#/.NET</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import '../styles/aboutSection.css'

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
