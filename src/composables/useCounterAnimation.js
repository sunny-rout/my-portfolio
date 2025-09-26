import { ref, watch } from 'vue'

/**
 * A composable for animating a number from 0 to a target value.
 * @param {import('vue').Ref<number>} target - The target number to animate to.
 * @param {import('vue').Ref<boolean>} start - A ref to trigger the animation.
 * @param {object} options - Animation options.
 * @param {number} [options.duration=1500] - The duration of the animation in ms.
 * @returns {{ animatedValue: import('vue').Ref<number> }}
 */
export function useCounterAnimation(target, start, options = {}) {
  const { duration = 1500 } = options
  const animatedValue = ref(0)

  const animate = (targetValue) => {
    const startTime = performance.now()

    const step = (currentTime) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      animatedValue.value = Math.floor(progress * targetValue)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        animatedValue.value = targetValue
      }
    }

    requestAnimationFrame(step)
  }

  watch(start, (newValue) => {
    if (newValue) {
      animate(target.value)
    }
  })

  return { animatedValue }
}
