<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Welcome back, Paco! Here's what's happening today.</p>
      </div>
      <div class="flex items-center space-x-4">
        <button class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
          📅 Today
        </button>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
          <span>📥</span>
          <span>Export Report</span>
        </button>
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard 
        v-for="kpi in kpis"
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
          <select v-model="selectedPeriod" class="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
        <div class="h-80">
          <LineChart :data="salesChartData" :options="lineChartOptions" />
        </div>
      </div>

      <!-- User Distribution -->
      <div class="chart-container">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">User Distribution</h3>
          <select class="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>By Region</option>
            <option>By Age</option>
            <option>By Device</option>
          </select>
        </div>
        <div class="h-80">
          <PieChart :data="userDistributionData" :options="pieChartOptions" />
        </div>
      </div>
    </div>

    <!-- Performance & Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Performance Metrics -->
      <div class="chart-container">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Performance Metrics</h3>
        <div class="h-80">
          <BarChart :data="performanceData" :options="barChartOptions" />
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="chart-container">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div class="space-y-4">
          <ActivityItem 
            v-for="activity in recentActivities"
            :key="activity.id"
            :activity="activity"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import KpiCard from '@/components/widgets/KpiCard.vue'
import ActivityItem from '@/components/widgets/ActivityItem.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'

const selectedPeriod = ref('7')

// Datos para los KPI
const kpis = ref([
  { title: 'Total Users', value: '12.5K', change: '+12%', icon: '👥', trend: 'up' },
  { title: 'Revenue', value: '$45.2K', change: '+8%', icon: '💰', trend: 'up' },
  { title: 'Conversion Rate', value: '3.24%', change: '-2%', icon: '📊', trend: 'down' },
  { title: 'Active Sessions', value: '1.2K', change: '+15%', icon: '🔗', trend: 'up' }
])

// Datos para el gráfico de ventas
const salesChartData = computed(() => ({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Ventas 2024',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Ventas 2023',
      data: [8000, 12000, 10000, 18000, 15000, 22000, 20000],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}))

// Datos para distribución de usuarios
const userDistributionData = computed(() => ({
  labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
  datasets: [
    {
      data: [25, 35, 20, 12, 8],
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

// Datos para métricas de performance
const performanceData = computed(() => ({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Páginas/Vista',
      data: [3.2, 2.8, 3.5, 4.1, 3.8, 4.2],
      backgroundColor: 'rgb(59, 130, 246)',
    },
    {
      label: 'Tiempo (min)',
      data: [2.5, 3.1, 2.8, 3.5, 3.2, 3.8],
      backgroundColor: 'rgb(16, 185, 129)',
    },
    {
      label: 'Rebote (%)',
      data: [45, 38, 42, 35, 40, 32],
      backgroundColor: 'rgb(245, 158, 11)',
    }
  ]
}))

// Opciones para los gráficos
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
        color: '#6B7280'
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

const barChartOptions = {
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
        color: '#6B7280'
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
    }
  }
}

const recentActivities = ref([
  { id: 1, user: 'John Doe', action: 'placed an order', time: '2 min ago', type: 'order' },
  { id: 2, user: 'Sarah Smith', action: 'created an account', time: '5 min ago', type: 'user' },
  { id: 3, user: 'Mike Johnson', action: 'completed payment', time: '10 min ago', type: 'payment' },
  { id: 4, user: 'Emily Davis', action: 'subscribed to newsletter', time: '15 min ago', type: 'subscription' }
])
</script>