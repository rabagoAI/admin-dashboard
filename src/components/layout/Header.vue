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
          {{ $route.name }}
        </h1>
      </div>

      <!-- Right Section -->
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search..."
            class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme"
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          :title="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
        >
          <span class="text-xl">{{ theme === 'light' ? '🌙' : '☀️' }}</span>
        </button>

        <!-- Notifications -->
        <button class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <span class="text-xl">🔔</span>
          <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        <!-- User Menu -->
        <div class="relative">
          <button class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-semibold">P</span>
            </div>
            <span class="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">Paco</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()
const { theme, toggleTheme } = dashboardStore

const toggleSidebar = () => {
  // Implementaremos la lógica del sidebar móvil
  console.log('Toggle sidebar')
}
</script>