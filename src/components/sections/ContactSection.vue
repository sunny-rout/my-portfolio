<template>
  <section class="contact-section" id="contact">
    <div class="contact-section__container">
      <div class="contact-section__header">
        <h2 class="contact-section__heading">Get In Touch</h2>
        <p class="contact-section__subtitle">
          Ready to collaborate on your next project or discuss opportunities
        </p>
      </div>
      
      <div class="contact-section__content">
        <!-- Contact Information -->
        <div class="contact-section__info">
          <h3 class="contact-section__info-heading">Contact Information</h3>
          
          <div class="contact-section__info-list">
            <div class="contact-section__info-item">
              <div class="contact-section__info-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-section__info-details">
                <span class="contact-section__info-label">Email</span>
                <a :href="`mailto:${personalData.email}`" class="contact-section__info-value">
                  {{ personalData.email }}
                </a>
              </div>
            </div>
            
            <div class="contact-section__info-item">
              <div class="contact-section__info-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="contact-section__info-details">
                <span class="contact-section__info-label">Phone</span>
                <a :href="`tel:${personalData.phone}`" class="contact-section__info-value">
                  {{ personalData.phone }}
                </a>
              </div>
            </div>
            
            <div class="contact-section__info-item">
              <div class="contact-section__info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-section__info-details">
                <span class="contact-section__info-label">Location</span>
                <span class="contact-section__info-value">{{ personalData.location }}</span>
              </div>
            </div>
          </div>
          
          <!-- Social Links -->
          <div class="contact-section__social">
            <h4 class="contact-section__social-heading">Connect With Me</h4>
            <div class="contact-section__social-links">
              <a 
                v-for="social in socialMedia"
                :key="social.platform"
                :href="social.url"
                class="contact-section__social-link"
                :style="{ '--social-color': social.color }"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="contact-section__form-wrapper">
          <h3 class="contact-section__form-heading">Send a Message</h3>
          
          <form class="contact-section__form" @submit.prevent="handleSubmit">
            <div class="contact-section__form-row">
              <div class="contact-section__form-group">
                <label for="contact-name" class="contact-section__form-label">Name *</label>
                <input 
                  id="contact-name"
                  v-model="form.name"
                  type="text" 
                  class="contact-section__form-input" 
                  :class="{ 'contact-section__form-input--error': errors.name }"
                  required 
                >
                <div v-if="errors.name" class="contact-section__form-error">{{ errors.name }}</div>
              </div>
              
              <div class="contact-section__form-group">
                <label for="contact-email" class="contact-section__form-label">Email *</label>
                <input 
                  id="contact-email"
                  v-model="form.email"
                  type="email" 
                  class="contact-section__form-input"
                  :class="{ 'contact-section__form-input--error': errors.email }"
                  required 
                >
                <div v-if="errors.email" class="contact-section__form-error">{{ errors.email }}</div>
              </div>
            </div>
            
            <div class="contact-section__form-group">
              <label for="contact-subject" class="contact-section__form-label">Subject *</label>
              <input 
                id="contact-subject"
                v-model="form.subject"
                type="text" 
                class="contact-section__form-input"
                :class="{ 'contact-section__form-input--error': errors.subject }"
                required 
              >
              <div v-if="errors.subject" class="contact-section__form-error">{{ errors.subject }}</div>
            </div>
            
            <div class="contact-section__form-group">
              <label for="contact-message" class="contact-section__form-label">Message *</label>
              <textarea 
                id="contact-message"
                v-model="form.message"
                class="contact-section__form-textarea"
                :class="{ 'contact-section__form-textarea--error': errors.message }"
                rows="5" 
                required 
              ></textarea>
              <div v-if="errors.message" class="contact-section__form-error">{{ errors.message }}</div>
            </div>
            
            <button 
              type="submit" 
              class="contact-section__form-submit"
              :class="{ 'contact-section__form-submit--loading': isSubmitting }"
              :disabled="isSubmitting"
            >
              <i v-if="!isSubmitting" class="fas fa-paper-plane"></i>
              <i v-else class="fas fa-spinner fa-spin"></i>
              <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
            </button>
            
            <div v-if="submitStatus" class="contact-section__form-status" :class="`contact-section__form-status--${submitStatus.type}`">
              {{ submitStatus.message }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useFormValidation } from '@/composables/useFormValidation'

const props = defineProps({
  personalData: Object,
  socialMedia: Array
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

const { errors, validateForm, clearErrors } = useFormValidation()

const handleSubmit = async () => {
  clearErrors()
  
  if (!validateForm(form)) {
    return
  }
  
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    submitStatus.value = {
      type: 'success',
      message: 'Thank you for your message! I\'ll get back to you soon.'
    }
    
    // Reset form
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      message: 'Sorry, there was an error sending your message. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.contact-section {
  padding: 5rem 0;
  background: white;
  
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
  
  &__content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 4rem;
    
    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
  
  &__info {
    background: #f8fafc;
    padding: 2.5rem;
    border-radius: 16px;
    height: fit-content;
    
    &-heading {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2rem;
    }
    
    &-list {
      margin-bottom: 2rem;
    }
    
    &-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    &-icon {
      flex-shrink: 0;
      width: 45px;
      height: 45px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    
    &-details {
      flex: 1;
      padding-top: 0.25rem;
    }
    
    &-label {
      display: block;
      font-size: 0.9rem;
      color: #64748b;
      margin-bottom: 0.25rem;
      font-weight: 500;
    }
    
    &-value {
      color: #1e293b;
      font-weight: 600;
      text-decoration: none;
      
      &:hover {
        color: #3b82f6;
      }
    }
  }
  
  &__social {
    &-heading {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1rem;
    }
    
    &-links {
      display: flex;
      gap: 1rem;
    }
    
    &-link {
      display: flex;
      align-items: center;
      height: 45px;
      width: 45px;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: white;
      color: var(--social-color, #64748b);
      text-decoration: none;
      border-radius: 50%;
      border: 2px solid var(--social-color, #e2e8f0);
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--social-color, #3b82f6);
        color: white;
        transform: translateY(-2px);
      }
    }
  }
  
  &__form-wrapper {
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  &__form-heading {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 2rem;
  }
  
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  &__form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
  
  &__form-group {
    display: flex;
    flex-direction: column;
  }
  
  &__form-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  &__form-input,
  &__form-textarea {
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &--error {
      border-color: #ef4444;
    }
  }
  
  &__form-textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
  }
  
  &__form-error {
    color: #ef4444;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
  
  &__form-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    &--loading {
      opacity: 0.8;
    }
  }
  
  &__form-status {
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    
    &--success {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    
    &--error {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
  }
}
</style>
