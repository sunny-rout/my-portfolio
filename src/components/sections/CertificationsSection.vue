<template>
  <section class="certifications-section" id="certifications">
    <div class="certifications-section__container">
      <div class="certifications-section__header">
        <h2 class="certifications-section__heading">Certifications & Achievements</h2>
        <p class="certifications-section__subtitle">
          Professional certifications demonstrating expertise and continuous learning
        </p>
      </div>
      
      <div class="certifications-section__grid">
        <div 
          v-for="cert in certifications"
          :key="cert.id"
          class="certifications-section__card"
        >
          <div class="certifications-section__badge">
            <span class="certifications-section__emoji">{{ cert.badge }}</span>
          </div>
          
          <div class="certifications-section__content">
            <h3 class="certifications-section__name">{{ cert.name }}</h3>
            <div class="certifications-section__issuer">
              <i class="fas fa-certificate"></i>
              {{ cert.issuer }}
            </div>
            <div class="certifications-section__date">
              <i class="fas fa-calendar"></i>
              {{ cert.date }}
            </div>
            
            <div v-if="cert.skills" class="certifications-section__skills">
              <h4 class="certifications-section__skills-title">Skills Covered:</h4>
              <div class="certifications-section__skills-tags">
                <span 
                  v-for="skill in cert.skills"
                  :key="skill"
                  class="certifications-section__skill-tag"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
            
            <div class="certifications-section__actions">
              <a
                class="certifications-section__btn"
                :href="cert.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fas fa-external-link-alt"></i>
                View Credential
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  certifications: Array
})
</script>

<style lang="scss" scoped>
.certifications-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  scroll-margin-top: 80px;
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  &__heading {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 2px;
    }
  }
  
  &__subtitle {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  &__card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
    }
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
  }
  
  &__badge {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 2.5rem;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &__emoji {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  &__content {
    text-align: center;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
  
  &__name {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
    line-height: 1.3;
  }
  
  &__issuer,
  &__date {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 0.75rem;
    
    i {
      color: #94a3b8;
    }
  }
  
  &__skills {
    margin: 1.5rem 0;
    text-align: left;
    
    &-title {
      font-size: 1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.75rem;
      text-align: center;
    }
    
    &-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }
  }
  
  &__skill-tag {
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #e0f2fe, #b3e5fc);
    color: #0369a1;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  &__actions {
    margin-top: auto;
  }
  
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      transform: translateY(-1px);
    }
  }
}
</style>
