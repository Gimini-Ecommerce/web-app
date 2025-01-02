<template>
  <div class="w-full pt-4">
    <div class="flex justify-between items-center gap-2">
      <h3 class="text-3xl centraNo2 font-semibold text-slate-600">
        Gérer vos bannières
      </h3>
      <button
        @click="isAdd = true"
        class="text-white bg-violet-700 hover:bg-violet-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
      >
        Créer une bannière
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="row in rows"
        :key="row.id"
        class="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4"
      >
        <img
          :src="row.path"
          alt="Bannière"
          class="h-48 w-full object-cover rounded-md"
        />
        <div class="flex flex-col space-y-2">
          <p class="text-gray-800 font-semibold text-lg">
            Bannière ID: {{ row.id }}
          </p>
          <p class="text-gray-600 text-sm">
            Créé le : {{ new Date(row.created_at).toLocaleString() }}
          </p>
        </div>
        <div class="mt-auto">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            >
              Actions
            </UButton>
          </UDropdown>
        </div>
      </div>
    </div>
    <UModal v-model="isAdd">
      <UAlert
        icon="i-heroicons-command-line"
        color="orange"
        variant="soft"
        title="Création de nouvelle bannière"
        description="Cette nouvelle bannière sera visible par tous vos utilisateurs."
        class="pb-4"
      />
      <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="addBanner">
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm">
            Image de la bannière
          </label>
          <input
            type="file"
            required
            class="p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            @change="handleImageChange"
          />
        </div>
        <button
          type="submit"
          class="col-start-5 col-end-8 text-white bg-green-700 hover:bg-green-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
        >
          <span v-if="isAdd">Créer</span>
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
        icon="i-heroicons-pencil-alt"
        color="blue"
        variant="soft"
        title="Modification de la bannière"
        description="Modifiez les informations de cette bannière."
        class="pb-4"
      />
      <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="updateBanner">
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="image" class="text-slate-600 text-sm">Image de la bannière</label>
          <input
            type="file"
            class="p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            @change="handleImageChange"
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
  alias: "/banniere",
});

const isAdd = ref(false);
const isEdit = ref(false);
let currentBanner = ref(null);
let DataForm = ref({
  path: null,
});

const handleImageChange = (event) => {
  // Obtenir le fichier image
  const file = event.target.files[0];
  if (file) {
    DataForm.value.path = file;
  }
};

let addBanner = async () => {
  try {
    // 1. Téléchargement de l'image dans le stockage de Supabase
    const filePath = `${Date.now()}_${DataForm.value.path.name}`;

    const { data, error: uploadError } = await supabase.storage
      .from("banner")
      .upload(filePath, DataForm.value.path);

    if (uploadError) {
      console.error("Erreur lors du téléchargement de l'image:", uploadError);
      return;
    }

    // 2. Récupérer l'URL de l'image après téléchargement
    const bannerUrl = supabase.storage.from("banner").getPublicUrl(filePath);

    // 3. Insérer la bannière dans la table "banner"
    const { data: bannerData, error: insertError } = await supabase
      .from("banner")
      .insert([{ path: bannerUrl?.data?.publicUrl }]);

    if (insertError) {
      console.error("Erreur lors de l'insertion de la bannière:", insertError);
    } else {
      // Réinitialiser le formulaire après ajout
      DataForm.value = { path: null };
      isAdd.value = false; // Fermer le modal
      fetchBanners(); // Recharger la liste des bannières
    }
  } catch (error) {
    console.error("Erreur lors de la création de la bannière:", error);
  }
};

let updateBanner = async () => {
  try {
    let bannerUrl = currentBanner.value.path;

    // Si une nouvelle image a été sélectionnée, téléchargez-la
    if (DataForm.value.path) {
      const filePath = `${Date.now()}_${DataForm.value.path.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("banner")
        .upload(filePath, DataForm.value.path);

      if (uploadError) {
        console.error("Erreur lors du téléchargement de l'image:", uploadError);
        return;
      }

      bannerUrl = supabase.storage.from("banner").getPublicUrl(filePath)
        ?.data?.publicUrl;
    }

    // Mise à jour de la bannière
    const { data: bannerData, error: updateError } = await supabase
      .from("banner")
      .update({ path: bannerUrl })
      .eq("id", currentBanner.value.id);

    if (updateError) {
      console.error(
        "Erreur lors de la mise à jour de la bannière:",
        updateError
      );
    } else {
      DataForm.value = { path: null };
      isEdit.value = false;
      fetchBanners();
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la bannière:", error);
  }
};

// Fonction pour récupérer toutes les bannières
const fetchBanners = async () => {
  const { data: banners, error } = await supabase.from("banner").select("*");
  if (error) {
    console.error("Erreur lors de la récupération des bannières:", error);
  } else {
    rows.value = banners;
  }
};

// Appel de la fonction pour récupérer les bannières au chargement
onMounted(async () => {
  await fetchBanners();
});

const q = ref("");
const rows = ref([]);

const items = (row) => [
  [
    {
      label: "Modifier",
      icon: "i-heroicons-pencil",
      click: () => {
        currentBanner.value = row;
        DataForm.value = { path: row.path };
        isEdit.value = true;
      },
    },
  ],
  [
    {
      label: "Supprimer",
      icon: "i-heroicons-trash",
      click: async () => {
        const { error } = await supabase
          .from("banner")
          .delete()
          .eq("id", row.id);
        if (error) {
          console.error("Erreur lors de la suppression de la bannière:", error);
        } else {
          fetchBanners(); // Recharger les bannières après la suppression
        }
      },
    },
  ],
];
</script>
