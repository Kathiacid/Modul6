<template>
  <div class="mt-6 bg-white p-4 rounded-xl border border-gray-100 shadow-inner">
    <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Análisis de Poder (D3)</h4>
    <svg ref="svgRef" width="300" height="150"></svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const svgRef = ref(null);

// Datos estáticos requeridos
const stats = [
  { stat: 'Fuerza', value: 18 },
  { stat: 'Destreza', value: 14 },
  { stat: 'Inteligencia', value: 8 }
];

onMounted(() => {
  const svg = d3.select(svgRef.value);
  const width = 300;
  const height = 150;

  // Escalas
  const x = d3.scaleBand()
    .domain(stats.map(d => d.stat))
    .range([0, width])
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, 20]) // Rango máximo de stats en D&D
    .range([height, 0]);

  // Renderizado de barras
  svg.selectAll("rect")
    .data(stats)
    .enter()
    .append("rect")
    .attr("x", d => x(d.stat))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", "#ec4899") // Color arcane-pink
    .attr("rx", 4);

  // Etiquetas de texto
  svg.selectAll("text")
    .data(stats)
    .enter()
    .append("text")
    .text(d => d.value)
    .attr("x", d => x(d.stat) + x.bandwidth()/2)
    .attr("y", d => y(d.id) - 5)
    .attr("text-anchor", "middle")
    .attr("class", "text-[10px] font-bold fill-gray-600");
});
</script>
