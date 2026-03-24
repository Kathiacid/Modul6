<template>
  <BaseModal :show="!!monster" @close="$emit('close')">

    <!-- HEADER -->
    <template #header>
      <h2 class="font-serif font-bold text-amber-900">
        {{ monster?.name }}
      </h2>
    </template>

    <!-- BODY -->
    <template #body>

      <!-- LOADING -->
      <p v-if="loading" class="italic text-gray-500">
        Invocando conocimientos prohibidos...
      </p>

      <!-- CONTENIDO -->
      <p v-else class="text-gray-700 leading-relaxed">
        {{ apiLore || monster?.lore || 'No hay registros en el grimorio.' }}
      </p>

    </template>

    <!-- FOOTER -->
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
import { ref, watch } from 'vue';
import BaseModal from './BaseModal.vue';
import { useToast } from '../../composables/useToast';

const props = defineProps({
  monster: Object
});

defineEmits(['close']);

const { showToast } = useToast();

const apiLore = ref(null);
const loading = ref(false);

// 🔥 CLAVE: usar watch (NO onMounted)
watch(() => props.monster, async (newMonster) => {
  if (!newMonster) return;

  loading.value = true;
  apiLore.value = null;

  try {
    // ⚠️ necesitas slug (ej: "adult-red-dragon")
    if (!newMonster.slug) {
      return;
    }

    const res = await fetch(
      `https://api.open5e.com/v1/monsters/${newMonster.slug}/`
    );

    const data = await res.json();

    apiLore.value = Array.isArray(data.desc)
      ? data.desc.join(' ')
      : data.desc;

  } catch (error) {
    console.error(error); // 👈 evita warning de "no usado"
    apiLore.value = null;
  } finally {
    loading.value = false;
  }
});

const addToEncounter = () => {
  showToast(`¡${props.monster.name} añadido al rastreador de combate!`);
};
</script>
