<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- DEBUG: Comentar uno a la vez -->
    
    <!-- Opción A: Comentar Sidebar -->
    <!-- <Sidebar /> -->
    
    <!-- Opción B: Comentar Header -->
    <Sidebar />
    
    <div class="flex-1 flex flex-col lg:ml-64">
      <!-- <Header /> --> <!-- Header comentado -->
      <Header /> <!-- Header activo -->
      
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>