<template>
  <div class="kpi-card group hover:shadow-lg transition-shadow duration-300">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ value }}</p>
        <p class="text-sm mt-1" :class="trend === 'up' ? 'text-green-500' : 'text-red-500'">
          {{ change }} from last month
        </p>
      </div>
      <div class="text-3xl opacity-80 group-hover:scale-110 transition-transform duration-300">
        {{ icon }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  change: String,
  icon: String,
  trend: String
})
</script>