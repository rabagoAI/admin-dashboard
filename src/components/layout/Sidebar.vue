<template>
  <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform lg:translate-x-0 transition-transform duration-300 ease-in-out"
       :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'">
    
    <!-- Logo -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">AD</span>
        </div>
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-2">
      <router-link 
        v-for="item in navigation"
        :key="item.name"
        :to="item.path"
        class="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-700"
        :class="[currentRoute === item.path ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : '']"
      >
        <span class="text-lg">{{ item.icon }}</span>
        <span class="font-medium">{{ item.name }}</span>
      </router-link>
    </nav>

    <!-- User Info -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <span class="text-sm font-semibold text-gray-600 dark:text-gray-300">P</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-white truncate">Paco</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(true)

const currentRoute = computed(() => route.path)

const navigation = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Analytics', path: '/analytics', icon: '📈' },
  { name: 'Users', path: '/users', icon: '👥' },
  { name: 'Settings', path: '/settings', icon: '⚙️' }
]
</script>