<template>
  <div class="w-full pt-4">
    <div class="flex justify-between items-center gap-2">
      <h3 class="text-3xl centraNo2 font-semibold text-slate-600">
        Gérer vos boutiques
      </h3>
      <button
        @click="isAdd = true"
        class="text-white bg-violet-700 hover:bg-violet-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
      >
        Créer une boutique
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4 pt-2">
      <div
        class="col-span-12 flex px-3 pt-3.5 pb-1 border-gray-200 dark:border-gray-700"
      >
        <UInput
          v-model="q"
          placeholder="Trouver une boutique..."
          color="violet"
        />
      </div>

      <div class="col-span-12 p-4 rounded-lg bg-slate-50">
        <UTable
          v-model="selected"
          :rows="filteredRows"
          :columns="columns"
          :empty-state="{
            icon: 'i-heroicons-building-storefront-solid',
            label: 'Pas de boutique trouvée.',
          }"
        >
          <template #logo-data="{ row }">
            <img
              :src="row.logo"
              alt="Logo"
              class="h-12 w-12 object-cover rounded-full"
            />
          </template>
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-ellipsis-horizontal-20-solid"
              />
            </UDropdown>
          </template>
        </UTable>
      </div>
    </div>
    <UModal v-model="isAdd">
      <UAlert
        icon="i-heroicons-command-line"
        color="orange"
        variant="soft"
        title="Création de nouvelle boutique"
        description="Cette nouvelle boutique sera visible par tous vos utilisateurs ."
        class="pb-4"
      />
      <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="addShop">
        <input
          autofocus
          type="text"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Nom de la boutique"
          v-model="DataForm.name"
        />
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm"
            >Logo de la boutique</label
          >
          <input
            type="file"
            required
            class="p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            @change="handleLogoChange"
          />
        </div>
        <button
          type="submit"
          class="col-start-5 col-end-8 text-white bg-green-700 hover:bg-green-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
        >
          <span v-if="isAdd"> Créer</span>

          <div role="status" v-else>
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">...</span>
          </div>
        </button>
      </form>
    </UModal>
    <UModal v-model="isEdit">
      <UAlert
        icon="i-heroicons-command-line"
        color="orange"
        variant="soft"
        title="Mettre à jour la boutique"
        description="Cette nouvelle boutique sera visible par tous vos utilisateurs ."
        class="pb-4"
      />
      <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="updateShop">
        <input
          autofocus
          type="text"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Nom de la boutique"
          v-model="DataForm.name"
        />
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm"
            >Logo de la boutique</label
          >
          <input
            type="file"
            class="p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            @change="handleLogoChange"
          />
        </div>
        <button
          type="submit"
          class="col-start-4 col-end-9 text-white bg-green-700 hover:bg-green-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
        >
          <span>Mettre à jour</span>
        </button>
      </form>
    </UModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const supabase = useSupabaseClient();
definePageMeta({
  middleware: "auth",
  alias: "/boutique",
});

const isAdd = ref(false);
const isEdit = ref(false);
let currentShop = ref(null);
let DataForm = ref({
  name: "",
  logo: null,
});

const handleLogoChange = (event) => {
  // Obtenir le fichier image
  const file = event.target.files[0];
  if (file) {
    DataForm.value.logo = file;
  }
};

let addShop = async () => {
  try {
    // 1. Téléchargement du logo dans le stockage de Supabase
    const filePath = `${Date.now()}_${DataForm.value.logo.name}`;

    const { data, error: uploadError } = await supabase.storage
      .from("logo")
      .upload(filePath, DataForm.value.logo);

    if (uploadError) {
      console.error("Erreur lors du téléchargement du logo:", uploadError);
      return;
    }

    // 2. Récupérer l'URL de l'image après téléchargement
    const logoUrl = supabase.storage.from("logo").getPublicUrl(filePath);

    // 3. Insérer la boutique dans la table "shop" avec l'URL du logo
    const { data: shopData, error: insertError } = await supabase
      .from("shop")
      .insert([{ name: DataForm.value.name, logo: logoUrl?.data?.publicUrl }]);

    if (insertError) {
      console.error("Erreur lors de l'insertion de la boutique:", insertError);
    } else {
      // Réinitialiser le formulaire après ajout
      DataForm.value = { name: "", logo: null };
      isAdd.value = false; // Fermer le modal
      fetchShops(); // Recharger la liste des boutiques
    }
  } catch (error) {
    console.error("Erreur lors de la création de la boutique:", error);
  }
};
let updateShop = async () => {
  try {
    let logoUrl = currentShop.value.logo;

    // Si un nouveau logo a été sélectionné, téléchargez-le
    if (DataForm.value.logo) {
      const filePath = `${Date.now()}_${DataForm.value.logo.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("logo")
        .upload(filePath, DataForm.value.logo);

      if (uploadError) {
        console.error("Erreur lors du téléchargement du logo:", uploadError);
        return;
      }

      logoUrl = supabase.storage.from("logo").getPublicUrl(filePath)?.data?.publicUrl;
    }

    // Mise à jour de la boutique
    const { data: shopData, error: updateError } = await supabase
      .from("shop")
      .update({ name: DataForm.value.name, logo: logoUrl })
      .eq("id", currentShop.value.id);

    if (updateError) {
      console.error("Erreur lors de la mise à jour de la boutique:", updateError);
    } else {
      // Réinitialiser le formulaire après la mise à jour
      DataForm.value = { name: "", logo: null };
      isEdit.value = false; // Fermer le modal
      fetchShops(); // Recharger la liste des boutiques
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la boutique:", error);
  }
};

let deleteShop = async (id) => {
  const { data, error } = await supabase.from("shop").delete().eq("id", id);
  if (error) {
    console.error("Erreur de suppression:", error.message);
  } else {
    fetchShops(); // Recharger la liste des boutiques
    // Vous pouvez également appeler une fonction pour mettre à jour l'interface utilisateur si nécessaire
  }
};

// Charger les boutiques au démarrage
let shops = ref([]);
onMounted(async () => {
  await fetchShops();
});

const fetchShops = async () => {
  let { data: shopData, error } = await supabase.from("shop").select("*");
  if (error) {
    console.error("Erreur lors du chargement des boutiques:", error);
  } else {
    shops.value = shopData;
  }
};

const columns = [
  { key: "id", label: "ID" },
  { key: "logo", label: "Logo" },
  { key: "name", label: "Boutique" },
  { key: "actions" },
];

const items = (row) => [
  [
    {
      label: "Mettre à jour",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        isEdit.value = true;
        currentShop.value = { ...row }; // Charge les données de la boutique dans currentShop
        DataForm.value.name = row.name;
        DataForm.value.logo = null; // Reset le logo pour permettre de le changer si besoin
      },
    },
    {
      label: "Supprimer",
      labelClass: "text-red-700",
      icon: "i-heroicons-trash-20-solid",
      iconClass: "text-red-700",
      click: () => {
        console.log(row.id);
        deleteShop(row.id);
      },
    },
  ],
];

const q = ref("");
const filteredRows = computed(() => {
  if (!q.value) {
    return shops.value;
  }
  return shops.value.filter((shop) =>
    Object.values(shop).some((value) =>
      String(value).toLowerCase().includes(q.value.toLowerCase())
    )
  );
});
</script>

<style scoped>
@import url("~/assets/css/font.css");
.centraNo2,
ul li,
h4 {
  font-family: CentraNo2-Bold;
}
.Quicksand,
h5,
input,
label {
  font-family: Quicksand-simple;
}
.vertrio {
  font-family: vertrio-simple;
}
</style>
