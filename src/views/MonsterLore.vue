<template>
  <div class="bg-parchment p-6 rounded-2xl border border-orange-100 italic text-gray-800 leading-relaxed shadow-inner">

    <h3 class="not-italic font-bold text-xl mb-3 text-sepia-900 font-serif">
      Relatos del Antiguo Grimorio
    </h3>

    <!-- ⏳ LOADING -->
    <p v-if="loading">
      Invocando conocimientos prohibidos...
    </p>

    <!-- ❌ ERROR API -->
    <p v-else-if="error">
      El grimorio ha fallado... antiguos textos no pudieron ser invocados.
    </p>

    <!-- 📜 CONTENIDO -->
    <p v-else>
      {{ apiLore || monster.lore || 'No hay registros históricos sobre esta criatura en los archivos actuales.' }}
    </p>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  monster: {
    type: Object,
    required: true
  }
});

const apiLore = ref(null);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    // ⚠️ si no hay slug, usamos lore local
    if (!props.monster?.slug) {
      loading.value = false;
      return;
    }

    const res = await fetch(
      `https://api.open5e.com/v1/monsters/${props.monster.slug}/`
    );

    if (!res.ok) throw new Error('Error en la API');

    const data = await res.json();

    // 🔥 algunos vienen como array
    apiLore.value = Array.isArray(data.desc)
      ? data.desc.join(' ')
      : data.desc || null;

  } catch {
    error.value = true;
    apiLore.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
