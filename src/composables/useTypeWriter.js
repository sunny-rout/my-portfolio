import { ref, onUnmounted } from 'vue'

export function useTypewriter(texts = [], options = {}) {
  const {
    speed = 100,
    deleteSpeed = 50,
    pauseTime = 2000,
    startDelay = 500
  } = options

  const typedText = ref('')
  const currentIndex = ref(0)
  const isDeleting = ref(false)
  const isTyping = ref(false)
  const isPaused = ref(false)

  let timeout = null

  const typeCharacter = () => {
    if (!texts.length || isPaused.value) return

    const fullText = texts[currentIndex.value]
    
    if (!isDeleting.value) {
      if (typedText.value.length < fullText.length) {
        typedText.value = fullText.slice(0, typedText.value.length + 1)
        timeout = setTimeout(typeCharacter, speed + Math.random() * 50)
      } else {
        timeout = setTimeout(() => {
          isDeleting.value = true
          typeCharacter()
        }, pauseTime)
      }
    } else {
      if (typedText.value.length > 0) {
        typedText.value = fullText.slice(0, typedText.value.length - 1)
        timeout = setTimeout(typeCharacter, deleteSpeed)
      } else {
        isDeleting.value = false
        currentIndex.value = (currentIndex.value + 1) % texts.length
        timeout = setTimeout(typeCharacter, 500)
      }
    }
  }

  const startTyping = () => {
    if (isTyping.value) return
    
    isTyping.value = true
    timeout = setTimeout(typeCharacter, startDelay)
  }

  const stopTyping = () => {
    isTyping.value = false
    isPaused.value = false
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  onUnmounted(() => {
    stopTyping()
  })

  return {
    typedText,
    isTyping,
    isPaused,
    startTyping,
    stopTyping
  }
}
