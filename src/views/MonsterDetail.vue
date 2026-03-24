<template>
  <div v-if="monster" class="max-w-3xl mx-auto">
    <button
      @click="handleBack"
      class="inline-flex items-center text-gray-500 hover:text-arcane-pink mb-6 transition-colors font-medium cursor-pointer"
    >
      <font-awesome-icon icon="fa-solid fa-book" class="mr-2" />
      Volver al Bestiario
    </button>

    <div
  :class="[
    'card-flame bg-white p-8 rounded-3xl shadow-lg border-4 transition-all duration-300 hover:scale-[1.01]',
    borderClass
  ]"
>
      <div class="flex flex-col items-center text-center mb-8">
        <img :src="monster.image" :alt="monster.name" class="w-32 h-32 rounded-full object-cover mb-4 shadow-md" />
        <h1 class="text-4xl font-bold text-arcane-text mb-2">{{ monster.name }}</h1>
        <span class="text-gray-500 uppercase tracking-widest font-semibold">{{ monster.type }}</span>
      </div>

      <div class="flex justify-center gap-4 mb-8">
        <router-link
          :to="{ name: 'monster-detail', params: { id: props.id } }"
          class="px-4 py-2 rounded-lg font-bold transition-colors"
          active-class="bg-arcane-pink text-white"
        >
          Atributos
        </router-link>
        <router-link
          :to="{ name: 'monster-lore', params: { id: props.id } }"
          class="px-4 py-2 rounded-lg font-bold transition-colors"
          active-class="bg-arcane-pink text-white"
        >
          Historia
        </router-link>
      </div>

      <router-view :monster="monster" />
    </div>
  </div>

  <div v-else class="text-center py-20">
    <font-awesome-icon icon="fa-solid fa-skull-crossbones" class="text-6xl text-gray-200 mb-4" />
    <h2 class="text-2xl font-bold text-gray-400">Criatura no invocada</h2>
    <p class="text-gray-500 mb-6">Debes seleccionarla desde el Bestiario para cargar su esencia.</p>
    <button @click="handleBack" class="text-arcane-pink font-bold hover:underline cursor-pointer">
      Volver al Bestiario
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMonsters } from '../composables/useMonsters';

const props = defineProps({
  id: { type: String, required: true }
});

const router = useRouter();
const { getMonsterById, resetToFullList } = useMonsters();

const handleBack = () => {
  resetToFullList();
  router.push('/bestiary');
};

const monster = computed(() => {
  const rawMonster = getMonsterById(props.id);
  if (!rawMonster) return null;

  return {
    ...rawMonster,
    hp: rawMonster.hit_points || rawMonster.hp,
    ac: rawMonster.armor_class || rawMonster.ac,
    image: rawMonster.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${rawMonster.name}`,
    stats: rawMonster.stats || {
      fue: rawMonster.strength,
      des: rawMonster.dexterity,
      con: rawMonster.constitution,
      int: rawMonster.intelligence,
      sab: rawMonster.wisdom,
      car: rawMonster.charisma
    },
    lore: rawMonster.flavor || rawMonster.description || "Sin registros en el grimorio."
  };
});

const borderClass = computed(() => {
  if (!monster.value) return '';

  const type = monster.value.type.toLowerCase();

  if (type.includes('beast')) {
    return 'border-green-500 flame-green';
  }

  if (type.includes('undead')) {
    return 'border-purple-500 flame-purple';
  }

  if (type.includes('dragon')) {
    return 'border-red-500 flame-red';
  }

  return 'border-gray-200';
});
</script>

<style scoped>
@keyframes flame-red {
  0% { box-shadow: 0 0 10px rgba(239,68,68,0.5); }
  50% { box-shadow: 0 0 25px rgba(239,68,68,0.9); }
  100% { box-shadow: 0 0 10px rgba(239,68,68,0.5); }
}

@keyframes flame-green {
  0% { box-shadow: 0 0 10px rgba(34,197,94,0.5); }
  50% { box-shadow: 0 0 25px rgba(34,197,94,0.9); }
  100% { box-shadow: 0 0 10px rgba(34,197,94,0.5); }
}

@keyframes flame-purple {
  0% { box-shadow: 0 0 10px rgba(168,85,247,0.5); }
  50% { box-shadow: 0 0 25px rgba(168,85,247,0.9); }
  100% { box-shadow: 0 0 10px rgba(168,85,247,0.5); }
}

.flame-red {
  animation: flame-red 1.5s infinite;
}

.flame-green {
  animation: flame-green 1.5s infinite;
}

.flame-purple {
  animation: flame-purple 1.5s infinite;
}
.card-flame {
  position: relative;
  overflow: hidden;
}

.card-flame::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  z-index: 0;
  filter: blur(8px);
  opacity: 0.8;
  animation: flameMove 2s infinite linear;
}

.card-flame > * {
  position: relative;
  z-index: 1;
}

/* 🔥 ANIMACIÓN */
@keyframes flameMove {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-3px) scale(1.05); }
  100% { transform: translateY(0) scale(1); }
}

/* 🔴 DRAGON (fuego) */
.flame-red::before {
  background: radial-gradient(circle, rgba(255,80,0,0.8) 0%, rgba(255,0,0,0.4) 60%, transparent 100%);
}

/* 🟢 BESTIA (energía natural) */
.flame-green::before {
  background: radial-gradient(circle, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0.3) 60%, transparent 100%);
}

/* 🟣 NO-MUERTO (aura oscura) */
.flame-purple::before {
  background: radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0.3) 60%, transparent 100%);
}

</style>
