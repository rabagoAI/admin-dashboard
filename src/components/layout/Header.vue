<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Left Section -->
      <div class="flex items-center space-x-4">
        <button 
          @click="toggleSidebar"
          class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
        >
          <span class="text-xl">☰</span>
        </button>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white capitalize">
          {{ currentRouteName }}
        </h1>
      </div>

      <!-- Resto del código igual -->
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'

const route = useRoute()
const dashboardStore = useDashboardStore()
const { theme, toggleTheme } = dashboardStore

const currentRouteName = computed(() => route.name)

const toggleSidebar = () => {
  console.log('Toggle sidebar')
}
</script>