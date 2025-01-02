<script setup>
import { ref, watch } from "vue";
import { useRoute } from '#app';

let route = useRoute();
let routeName = ref(route.path.substring(1));  // Initialiser avec la valeur actuelle de la route

// Utilisation de watch pour suivre les changements de `route.path`
watch(() => route.path, (newPath) => {
  routeName.value = newPath.substring(1); // Mettre à jour `routeName` chaque fois que `route.path` change
});
</script>

<template>
  <div class="grid grid-cols-12 relative">
    <Nav class="col-span-1 h-screen sticky bg-[#eeeff0]/50 flex justify-center" />
    <main class="col-span-11">
      <Header class="pt-6" :name="routeName" />  <!-- Utilisation de routeName au lieu de route.name -->
      <NuxtPage class="w-full px-6" />
    </main>
  </div>
</template>

<style scoped></style>
