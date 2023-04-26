import { onUnmounted, reactive } from "vue";

export default function (fn: () => void, delay = 600) {
  let timer = reactive({ value: null });
  onUnmounted(() => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  })


  return {
    invoke: () => {
      if (timer.value) {
        clearTimeout(timer.value)
        timer.value = null
      };
      timer.value = setTimeout(() => {
        try {
          typeof fn === 'function' && fn()
        } catch (error) {
          throw error
        } finally {
          clearTimeout(timer.value)
          timer.value = null
        }
      }, delay)
    }
  }
}