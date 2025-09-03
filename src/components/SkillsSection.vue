<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="section-title fade-in">Technical Skills</h2>
      
      <div class="skills-grid">
        <div class="skill-category fade-in" v-for="category in skillCategories" :key="category.title">
          <div class="category-header">
            <div class="category-icon" v-html="category.icon"></div>
            <h3 class="category-title">{{ category.title }}</h3>
          </div>
          
          <div class="skills-list">
            <div class="skill-item" v-for="skill in category.skills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-experience">{{ skill.experience }}</span>
              </div>
              <div class="skill-bar">
                <div 
                  class="skill-progress" 
                  :style="{ width: skill.level + '%' }"
                  :data-level="skill.level"
                ></div>
              </div>
              <span class="skill-percentage">{{ skill.level }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../styles/skillsSection.css'

const skillCategories = ref([
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { name: 'AWS Services', experience: '5 years', level: 85 },
      { name: 'Terraform/Terragrunt', experience: '4 years', level: 90 },
      { name: 'Docker/Kubernetes', experience: '5 years', level: 85 },
      { name: 'Jenkins/TeamCity', experience: '6 years', level: 95 }
    ]
  },
  {
    title: 'Programming Languages',
    icon: '💻',
    skills: [
      { name: 'C# (.NET)', experience: '8 years', level: 95 },
      { name: 'JavaScript/TypeScript', experience: '7 years', level: 90 },
      { name: 'Python', experience: '5 years', level: 80 },
      { name: 'Go/Golang', experience: '2 years', level: 70 }
    ]
  },
  {
    title: 'Frameworks & Tools',
    icon: '🛠️',
    skills: [
      { name: 'Node.js/React.js', experience: '5 years', level: 85 },
      { name: 'GitHub Actions', experience: '4 years', level: 90 },
      { name: 'Svelte', experience: '4 years', level: 80 },
      { name: 'GitCopilot', experience: '2 years', level: 85 }
    ]
  },
  {
    title: 'Specializations',
    icon: '🎯',
    skills: [
      { name: 'CI/CD Automation', experience: '6 years', level: 95 },
      { name: 'Microservices Architecture', experience: '5 years', level: 90 },
      { name: 'Security Integration', experience: '4 years', level: 85 },
      { name: 'Generative AI', experience: '1 year', level: 75 }
    ]
  }
])

onMounted(() => {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        
        // Animate skill bars
        const skillBars = entry.target.querySelectorAll('.skill-progress')
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.level + '%'
          }, index * 200)
        })
      }
    })
  }, observerOptions)
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el)
  })
})
</script>
