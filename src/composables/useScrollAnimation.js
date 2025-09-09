import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  const elements = ref(new Map())
  let observer = null

  const observeElement = (element, callback, customOptions = {}) => {
    if (!element || !callback) return

    const elementOptions = { ...options, ...customOptions }
    const elementId = Symbol()

    elements.value.set(elementId, {
      element,
      callback,
      options: elementOptions,
      hasTriggered: false
    })

    if (observer) {
      observer.observe(element)
    }

    return elementId
  }

  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      for (const [elementId, elementData] of elements.value.entries()) {
        if (elementData.element === entry.target && entry.isIntersecting) {
          elementData.callback(entry, elementData.element)
          
          if (triggerOnce && !elementData.hasTriggered) {
            elementData.hasTriggered = true
            observer.unobserve(entry.target)
            elements.value.delete(elementId)
          }
          break
        }
      }
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    })

    elements.value.forEach(elementData => {
      observer.observe(elementData.element)
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    elements.value.clear()
  })

  return {
    observeElement
  }
}
