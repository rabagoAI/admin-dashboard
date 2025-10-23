<template>
  <div class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
      <span class="text-sm">👤</span>
    </div>
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-900 dark:text-white">
        <span class="font-semibold">{{ activity.user }}</span> {{ activity.action }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activity: Object
})
</script>