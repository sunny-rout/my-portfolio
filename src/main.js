import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component instance:', instance)
  console.error('Error info:', info)
}

app.mount('#app')
