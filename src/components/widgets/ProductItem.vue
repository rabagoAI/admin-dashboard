<template>
  <div class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
        <span class="text-green-600 dark:text-green-400 text-sm">📦</span>
      </div>
      <div>
        <p class="font-medium text-gray-900 dark:text-white">{{ product.name }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ product.sales }} sales • {{ product.stock }} in stock
        </p>
      </div>
    </div>
    <div class="text-right">
      <p class="font-semibold text-gray-900 dark:text-white">{{ formatCurrency(product.revenue) }}</p>
      <p class="text-sm text-green-500">Revenue</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object
})

const formatCurrency = (amount) => {
  if (!amount) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount)
}
</script>