<template>
  <div class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
      <span class="text-sm">{{ getActivityIcon(activity.type) }}</span>
    </div>
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-900 dark:text-white">
        <span class="font-semibold">{{ activity.user }}</span> {{ activity.action }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatTime(activity.time) }}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ activity.details }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activity: Object
})

const getActivityIcon = (type) => {
  const icons = {
    order: '🛒',
    user: '👤',
    payment: '💳',
    subscription: '📧',
    support: '🛟'
  }
  return icons[type] || '📝'
}

const formatTime = (timeString) => {
  const time = new Date(timeString)
  const now = new Date()
  const diffMs = now - time
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  return time.toLocaleDateString()
}
</script>