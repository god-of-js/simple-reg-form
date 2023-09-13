export default function useDelay() {
  const loading = ref(false)
  const delay = (timeInSeconds: number) => {
    loading.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        loading.value = false
        return resolve('Successful')
      }, timeInSeconds * 1000)
    })
  }
  return {
    loading,
    delay,
  }
}
