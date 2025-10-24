import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dashboardService } from '@/services/api'

// Datos mock de respaldo
const mockData = {
  metrics: {
    total_users: 12487,
    new_signups: 156,
    revenue: 45230,
    conversion_rate: 3.24,
    active_users: 3241,
    bounce_rate: 42.1
  },
  sales: [
    { id: 1, month: "2024-01", revenue: 12000, orders: 240, growth: 15 },
    { id: 2, month: "2024-02", revenue: 19000, orders: 320, growth: 25 },
    { id: 3, month: "2024-03", revenue: 15000, orders: 280, growth: -5 },
    { id: 4, month: "2024-04", revenue: 25000, orders: 380, growth: 40 },
    { id: 5, month: "2024-05", revenue: 22000, orders: 340, growth: 12 },
    { id: 6, month: "2024-06", revenue: 30000, orders: 420, growth: 36 },
    { id: 7, month: "2024-07", revenue: 28000, orders: 390, growth: 8 }
  ],
  activities: [
    { id: 1, user_name: "John Doe", action: "placed an order", type: "order", details: "Order #12345", created_at: "2024-10-24T10:30:00Z" },
    { id: 2, user_name: "Sarah Smith", action: "created an account", type: "user", details: "New user registration", created_at: "2024-10-24T10:25:00Z" },
    { id: 3, user_name: "Mike Johnson", action: "completed payment", type: "payment", details: "Payment $199.99", created_at: "2024-10-24T10:20:00Z" }
  ],
  products: [
    { id: 1, name: "Premium Widget", sales: 234, revenue: 12450, stock: 45, category: "electronics" },
    { id: 2, name: "Basic Widget", sales: 189, revenue: 8920, stock: 120, category: "electronics" },
    { id: 3, name: "Enterprise Solution", sales: 67, revenue: 23100, stock: 15, category: "software" }
  ],
  user_distribution: [
    { id: 1, age_group: "18-25", count: 3120, percentage: 25 },
    { id: 2, age_group: "26-35", count: 4368, percentage: 35 },
    { id: 3, age_group: "36-45", count: 2496, percentage: 20 },
    { id: 4, age_group: "46-55", count: 1498, percentage: 12 },
    { id: 5, age_group: "55+", count: 998, percentage: 8 }
  ]
}

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const metrics = ref({})
  const sales = ref([])
  const users = ref([])
  const activities = ref([])
  const products = ref([])
  const userDistribution = ref([])
  const isLoading = ref(false)
  const theme = ref('light')
  const error = ref(null)

  // Getters computados
  const kpis = computed(() => [
    { 
      title: 'Total Users', 
      value: formatNumber(metrics.value.total_users), 
      change: '+12%', 
      icon: '👥', 
      trend: 'up' 
    },
    { 
      title: 'Revenue', 
      value: formatCurrency(metrics.value.revenue), 
      change: '+8%', 
      icon: '💰', 
      trend: 'up' 
    },
    { 
      title: 'Conversion Rate', 
      value: `${metrics.value.conversion_rate}%`, 
      change: '-2%', 
      icon: '📊', 
      trend: 'down' 
    },
    { 
      title: 'Active Users', 
      value: formatNumber(metrics.value.active_users), 
      change: '+15%', 
      icon: '🔗', 
      trend: 'up' 
    }
  ])

  const salesChartData = computed(() => ({
    labels: sales.value.map(item => {
      const month = item.month
      // Formatear mes para mostrar solo nombre corto
      return month.length > 7 ? new Date(month + '-01').toLocaleDateString('es', { month: 'short' }) : month
    }),
    datasets: [
      {
        label: 'Revenue 2024',
        data: sales.value.map(item => item.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }))

  const userDistributionData = computed(() => ({
    labels: userDistribution.value.map(item => item.age_group),
    datasets: [
      {
        data: userDistribution.value.map(item => item.count),
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)'
        ],
        borderWidth: 2,
        borderColor: 'white'
      }
    ]
  }))

  // Actions
  const fetchDashboardData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    console.log('🔄 Iniciando carga de datos desde Supabase...')
    
    const [
      metricsData,
      salesData,
      activitiesData,
      productsData,
      distributionData
    ] = await Promise.all([
      dashboardService.getMetrics(),
      dashboardService.getSales(),
      dashboardService.getActivities(),
      dashboardService.getTopProducts(),
      dashboardService.getUserDistribution()
    ])

    console.log('📥 Datos recibidos de Supabase:')
    console.log('Metrics:', metricsData)
    console.log('Sales:', salesData)
    console.log('Activities:', activitiesData)
    console.log('Products:', productsData)
    console.log('Distribution:', distributionData)

    metrics.value = metricsData
    sales.value = salesData
    activities.value = activitiesData
    products.value = productsData
    userDistribution.value = distributionData

    console.log('✅ Datos cargados exitosamente')

  } catch (err) {
    console.error('❌ Error cargando datos:', err)
    console.warn('Using mock data due to API error:', err)
    // ... resto del código de error
  } finally {
    isLoading.value = false
  }
}

  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      const usersData = await dashboardService.getUsers(page, limit)
      users.value = usersData.data
      return usersData
    } catch (err) {
      error.value = 'Failed to load users'
      throw err
    }
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  // Helper functions
  const formatNumber = (num) => {
    if (!num) return '0'
    return new Intl.NumberFormat().format(num)
  }

  const formatCurrency = (amount) => {
    if (!amount) return '$0'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Inicializar datos
  fetchDashboardData()

  return {
    // State
    metrics,
    sales,
    users,
    activities,
    products,
    userDistribution,
    isLoading,
    theme,
    error,
    
    // Getters
    kpis,
    salesChartData,
    userDistributionData,
    
    // Actions
    fetchDashboardData,
    fetchUsers,
    toggleTheme
  }
})