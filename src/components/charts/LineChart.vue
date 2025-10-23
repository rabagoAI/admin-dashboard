<template>
  <div class="w-full h-full">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const chartRef = ref(null)
let chartInstance = null

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

onMounted(() => {
  renderChart()
})

watch(() => props.data, () => {
  if (chartInstance) {
    chartInstance.destroy()
  }
  renderChart()
}, { deep: true })

const renderChart = () => {
  if (!chartRef.value) return

  const ctx = chartRef.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: props.data,
    options: { ...defaultOptions, ...props.options }
  })
}
</script>