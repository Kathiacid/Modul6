<template>
  <Teleport to="body">
    <Transition name="slide">
      <div
        v-if="isVisible"
        class="fixed bottom-8 right-8 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl border-l-4 border-arcane-mint flex items-center gap-3"
      >
        <font-awesome-icon icon="fa-solid fa-circle-check" class="text-arcane-mint" />
        <span class="font-medium">{{ message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useToast } from '../../composables/useToast';
const { isVisible, message } = useToast();
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
.slide-enter-from { transform: translateX(100%); opacity: 0; }
.slide-leave-to { transform: translateY(20px); opacity: 0; }
</style>
