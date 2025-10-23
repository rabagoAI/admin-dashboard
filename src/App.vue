<template>
  <div :class="[theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50']">
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import MainLayout from '@/components/layout/MainLayout.vue'

const dashboardStore = useDashboardStore()
const theme = computed(() => dashboardStore.theme)
</script>