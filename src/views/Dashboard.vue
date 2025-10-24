<template>
  <div class="space-y-6">
    <!-- DEBUG INFO - Temporal -->
    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-green-800">✅ ¡Supabase Conectado!</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
        <div>
          <span class="font-medium">API Mode:</span> 
          <span class="text-green-600">{{ apiMode }}</span>
        </div>
        <div>
          <span class="font-medium">Loading:</span> 
          <span :class="dashboardStore.isLoading ? 'text-orange-600' : 'text-green-600'">
            {{ dashboardStore.isLoading ? 'Yes' : 'No' }}
          </span>
        </div>
        <div>
          <span class="font-medium">Metrics:</span> 
          <span class="text-gray-600">{{ Object.keys(dashboardStore.metrics).length }} keys</span>
        </div>
        <div>
          <span class="font-medium">Sales:</span> 
          <span class="text-gray-600">{{ dashboardStore.sales.length }} items</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="dashboardStore.isLoading" class="flex justify-center items-center h-64">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back, Paco! 
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="apiMode === 'supabase' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'">
              {{ apiMode === 'supabase' ? '🚀 Supabase' : '🛠️ JSON Server' }}
            </span>
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <select 
            v-model="apiMode" 
            @change="changeApiMode"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="json-server">🛠️ JSON Server</option>
            <option value="supabase">🚀 Supabase</option>
          </select>
          
          <button 
            @click="refreshData"
            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
            :disabled="dashboardStore.isLoading"
          >
            <span>🔄</span>
            <span>{{ dashboardStore.isLoading ? 'Refreshing...' : 'Refresh Data' }}</span>
          </button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          v-for="kpi in dashboardStore.kpis"
          :key="kpi.title"
          :title="kpi.title"
          :value="kpi.value"
          :change="kpi.change"
          :icon="kpi.icon"
          :trend="kpi.trend"
        />
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Sales Chart -->
        <div class="chart-container">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h3>
            <select class="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <div class="h-80">
            <LineChart 
              :data="dashboardStore.salesChartData" 
              :options="lineChartOptions" 
            />
          </div>
        </div>

        <!-- User Distribution -->
        <div class="chart-container">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">User Distribution</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Total: {{ formatNumber(dashboardStore.metrics.total_users) }} users
            </span>
          </div>
          <div class="h-80">
            <PieChart 
              :data="dashboardStore.userDistributionData" 
              :options="pieChartOptions" 
            />
          </div>
        </div>
      </div>

      <!-- Performance & Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Activity -->
        <div class="chart-container">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <button class="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
          <div class="space-y-4">
            <ActivityItem 
              v-for="activity in dashboardStore.activities"
              :key="activity.id"
              :activity="activity"
            />
          </div>
        </div>

        <!-- Top Products -->
        <div class="chart-container">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h3>
            <button class="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
          <div class="space-y-4">
            <ProductItem 
              v-for="product in dashboardStore.products"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { setApiMode, getApiMode } from '@/services/api'
import KpiCard from '@/components/widgets/KpiCard.vue'
import ActivityItem from '@/components/widgets/ActivityItem.vue'
import ProductItem from '@/components/widgets/ProductItem.vue'
import LineChart from '@/components/charts/LineChart.vue'
import PieChart from '@/components/charts/PieChart.vue'

const dashboardStore = useDashboardStore()
const apiMode = ref(getApiMode())

// Quitar la destructuración reactiva - usar el store directamente
console.log('📊 Dashboard mounted - Debug:')
console.log('API Mode:', apiMode.value)
console.log('Loading:', dashboardStore.isLoading)
console.log('Metrics:', dashboardStore.metrics)
console.log('Sales:', dashboardStore.sales)
console.log('Activities:', dashboardStore.activities)
console.log('Products:', dashboardStore.products)

const changeApiMode = async () => {
  const newMode = await setApiMode(apiMode.value)
  apiMode.value = newMode
  await refreshData()
}

const refreshData = () => {
  dashboardStore.fetchDashboardData()
}

const formatNumber = (num) => {
  if (!num) return '0'
  return new Intl.NumberFormat().format(num)
}

// Opciones de gráficos (las mismas que antes)
const lineChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#6B7280'
      }
    }
  },
  scales: {
    y: {
      ticks: {
        color: '#6B7280',
        callback: function(value) {
          return '$' + value.toLocaleString()
        }
      },
      grid: {
        color: 'rgba(107, 114, 128, 0.2)'
      }
    },
    x: {
      ticks: {
        color: '#6B7280'
      },
      grid: {
        color: 'rgba(107, 114, 128, 0.2)'
      }
    }
  }
}

const pieChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#6B7280'
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || ''
          const value = context.parsed
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${value.toLocaleString()} users (${percentage}%)`
        }
      }
    }
  }
}

onMounted(() => {
  // Los datos ya se cargan automáticamente en el store
})
</script>