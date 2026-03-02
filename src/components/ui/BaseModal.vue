<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">

        <Transition name="pop">
          <div v-if="show" class="bg-parchment w-full max-w-lg rounded-2xl shadow-2xl border-8 border-double border-amber-900/20 overflow-hidden flex flex-col max-h-[90vh]">

            <header class="p-6 border-b border-amber-900/10 flex justify-between items-center bg-white/50">
              <div class="text-2xl font-serif">
                <slot name="header"></slot>
              </div>
              <button @click="$emit('close')" class="text-gray-400 hover:text-arcane-pink transition-colors">
                <font-awesome-icon icon="fa-solid fa-xmark" size="lg" />
              </button>
            </header>

            <section class="p-8 overflow-y-auto">
              <slot name="body"></slot>
            </section>

            <footer class="p-4 bg-white/30 text-right">
              <button @click="$emit('close')" class="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors font-bold">
                Cerrar Registro
              </button>
            </footer>
          </div>
        </Transition>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean
});
defineEmits(['close']);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.pop-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.pop-leave-active { transition: all 0.2s ease-in; }
.pop-enter-from { transform: scale(0.9); opacity: 0; }
.pop-leave-to { transform: scale(0.95); opacity: 0; }
</style>
