<template>
  <div>
    <NuxtLayout v-if="!shouldHideLayout">
      <NuxtPage class="w-full" />
    </NuxtLayout>
    <NuxtPage class="w-full" v-else />
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from '#app';
const route = useRoute();
const listRoute = ["/",'/confirm'];
const shouldHideLayout = computed(() => listRoute.includes(route.path));

</script>