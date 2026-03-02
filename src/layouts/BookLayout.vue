<template>
  <div class="flex h-screen overflow-hidden bg-arcane-bg">
    <aside class="w-20 bg-arcane-sidebar shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col items-center py-8 gap-8 z-10">
      <div class="text-arcane-text mb-4">
        <font-awesome-icon icon="fa-solid fa-shield-halved" class="text-xl" />
      </div>

      <nav class="flex flex-col gap-6 w-full items-center">
        <router-link to="/" class="p-3 rounded-full hover:bg-gray-100 text-gray-400 transition-colors" active-class="bg-pink-100 text-arcane-pink">
          <font-awesome-icon icon="fa-solid fa-user" class="text-lg" />
        </router-link>

        <router-link to="/bestiary" class="p-3 rounded-full hover:bg-gray-100 text-gray-400 transition-colors" active-class="bg-pink-100 text-arcane-pink">
          <font-awesome-icon icon="fa-solid fa-book" class="text-lg" />
        </router-link>
      </nav>
    </aside>

    <main class="flex-1 overflow-y-auto p-8">
      <router-view />
    </main>

    <ToastMessage />
  </div>
</template>

<script setup>
import { provide } from 'vue';
import ToastMessage from '../components/ui/ToastMessage.vue';

// Requerimiento Parte 7: Provide/Inject
provide('campaignContext', {
  name: 'Las Crónicas de Astrum',
  level: 'Nivel 5',
  dungeonMaster: 'El Archivero'
});
</script>
