<template>
  <BaseModal :show="!!monster" @close="$emit('close')">
    <template #header>
      <h2 class="font-serif font-bold text-amber-900">{{ monster?.name }}</h2>
    </template>

    <template #body>
      </template>

    <template #footer-actions>
      <button
        @click="addToEncounter"
        class="px-4 py-2 bg-arcane-mint text-white rounded-lg font-bold hover:bg-opacity-90 transition-all text-sm shadow-sm"
      >
        Añadir a encuentros
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import { useToast } from '../../composables/useToast';

const props = defineProps({
  monster: Object
});

const { showToast } = useToast();

const addToEncounter = () => {
  // Requerimiento: "¡[Nombre del Monstruo] añadido al rastreador de combate!"
  showToast(`¡${props.monster.name} añadido al rastreador de combate!`);
};

defineEmits(['close']);
</script>
