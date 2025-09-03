<template>
  <section id="contact" class="section">
    <div class="container">
      <h2 class="section-title fade-in">Get In Touch</h2>
      
      <div class="contact-content">
        <div class="contact-info fade-in">
          <div class="contact-intro">
            <h3>Let's Connect</h3>
            <p>
              Ready to discuss your next project or explore collaboration opportunities? 
              I'm always interested in challenging projects and innovative solutions.
            </p>
          </div>
          
          <div class="contact-cards">
            <div class="contact-card">
              <div class="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="contact-details">
                <h4>Email</h4>
                <a href="mailto:sunnyrout06@gmail.com">sunnyrout06@gmail.com</a>
              </div>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="contact-details">
                <h4>Phone</h4>
                <a href="tel:+917021537069">+91-7021537069</a>
              </div>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div class="contact-details">
                <h4>LinkedIn</h4>
                <a href="https://www.linkedin.com/in/sunny-rout-261965a8" target="_blank" rel="noopener noreferrer">
                  Connect with me
                </a>
              </div>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div class="contact-details">
                <h4>Location</h4>
                <span>Navi Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form fade-in">
          <form @submit.prevent="submitForm" class="form">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required 
                placeholder="Your full name"
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required 
                placeholder="your.email@example.com"
              >
            </div>
            
            <div class="form-group">
              <label for="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject" 
                required 
                placeholder="Project discussion, collaboration, etc."
              >
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                required 
                rows="5"
                placeholder="Tell me about your project or how we can work together..."
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '../styles/contactSection.css'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  setTimeout(() => {
    alert('Thank you for your message! I\'ll get back to you soon.')
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    isSubmitting.value = false
  }, 1000)
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
