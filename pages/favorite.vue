<template>
  <div class="w-full pt-4">
    <div class="flex justify-between items-center gap-2">
      <h3 class="text-3xl centraNo2 font-semibold text-slate-600">
        Les produits qui intérressent vos clients
      </h3>
    </div>
    <div class="grid grid-cols-12 gap-4 pt-2">
      <div
        class="col-span-12 flex px-3 pt-3.5 pb-1 border-gray-200 dark:border-gray-700"
      >
        <UInput
          v-model="q"
          placeholder="Trouver un produit ..."
          color="violet"
        />
      </div>

      <div class="col-span-12 p-4 rounded-lg bg-slate-50">
        <UTable
          v-model="selected"
          :rows="filteredRows"
          :columns="columns"
          :empty-state="{
            icon: 'i-heroicons-folder-open-solid',
            label: 'Pas de favoris trouvée.',
          }"
        >
        </UTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const supabase = useSupabaseClient();
definePageMeta({
  middleware: "auth",
  alias: "/favoris",
});

const favorites = ref([]);
const q = ref("");

const filteredRows = computed(() => {
  return favorites.value.filter((favorite) =>
    favorite.product?.name.toLowerCase().includes(q.value.toLowerCase())
  );
});

const columns = [
  { label: "Nom ", key: "user.nom" },
  { label: "Email", key: "user.email" },
  { label: "Produit", key: "product.name" },
  { label: "date d'intérêt", key: "formatted_created_at" },
];
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Format 24h
  };
  return new Date(date).toLocaleString("fr-FR", options); // Format français
};
const fetchfavorites = async () => {
  // Récupérer les favoris avec user_id et product
  const { data: favoriteData, error } = await supabase.from("favoris").select(`
    id, created_at, user_id, product (name)
  `);

  if (error) {
    console.error("Erreur lors du chargement des favoris:", error);
  } else {
    // Pour chaque favori, récupérer les informations utilisateur avec user_id
    for (let favorite of favoriteData) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("nom, email")
        .eq("uui_user", favorite.user_id)
        .single(); // Assurez-vous de récupérer un seul utilisateur

      if (userError) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur:",
          userError
        );
      } else {
        favorite.user = userData; // Ajouter les données utilisateur au favori
      }
      // Formater la date
      favorite.formatted_created_at = formatDate(favorite.created_at); // Ajouter la date formatée
    }
    favorites.value = favoriteData; // Mettre à jour la liste des favoris
  }
};

onMounted(async () => {
  await fetchfavorites();
});
</script>
