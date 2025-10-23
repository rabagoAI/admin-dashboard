import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const metrics = ref({})
  const charts = ref({})
  const users = ref([])
  const isLoading = ref(false)
  const theme = ref('light')

  const fetchMetrics = async () => {
    isLoading.value = true
    // Datos mock por ahora
    metrics.value = {
      totalUsers: 1250,
      newSignups: 45,
      revenue: 12500,
      conversionRate: 3.2
    }
    isLoading.value = false
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    metrics,
    charts,
    users,
    isLoading,
    theme,
    fetchMetrics,
    toggleTheme
  }
})