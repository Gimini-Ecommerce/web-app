<template>
    <div class="w-full pt-4">
      <div class="flex justify-between items-center gap-2">
        <h3 class="text-3xl centraNo2 font-semibold text-slate-600">
          Gérer vos catégories
        </h3>
        <button
          @click="isAdd = true"
          class="text-white bg-violet-700 hover:bg-violet-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
        >
          Créer une catégorie
        </button>
      </div>
      <div class="grid grid-cols-12 gap-4 pt-2">
        <div
          class="col-span-12 flex px-3 pt-3.5 pb-1 border-gray-200 dark:border-gray-700"
        >
          <UInput
            v-model="q"
            placeholder="Trouver une catégorie..."
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
              label: 'Pas de catégorie trouvée.',
            }"
          >
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
          title="Création de nouvelle catégorie"
          description="Cette catégorie sera visible par tous vos utilisateurs."
          class="pb-4"
        />
        <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="addCategory">
          <input
            autofocus
            type="text"
            required
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            placeholder="Nom de la catégorie"
            v-model="DataForm.name"
          />
          <div class="col-span-full flex flex-col gap-y-2">
            <label for="" class="text-slate-600 text-sm">Choisir la boutique</label>
            <select
              class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
              v-model="DataForm.shop_id"
              required
            >
              <option v-for="shop in shops" :key="shop.id" :value="shop.id">
                {{ shop.name }}
              </option>
            </select>
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
          icon="i-heroicons-command-line"
          color="orange"
          variant="soft"
          title="Mettre à jour la catégorie"
          description="Cette catégorie sera visible par tous vos utilisateurs."
          class="pb-4"
        />
        <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="updateCategory">
          <input
            autofocus
            type="text"
            required
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            placeholder="Nom de la catégorie"
            v-model="DataForm.name"
          />
          <div class="col-span-full flex flex-col gap-y-2">
            <label for="" class="text-slate-600 text-sm">Choisir la boutique</label>
            <select
              class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
              v-model="DataForm.shop_id"
              required
            >
              <option v-for="shop in shops" :key="shop.id" :value="shop.id">
                {{ shop.name }}
              </option>
            </select>
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
  alias: "/categorie",
});

const isAdd = ref(false);
const isEdit = ref(false);
let currentCategory = ref(null);
let DataForm = ref({
  name: "",
  shop_id: null,
});

const shops = ref([]);

const fetchShops = async () => {
  const { data: shopData, error } = await supabase.from("shop").select("*");
  if (error) {
    console.error("Erreur lors du chargement des boutiques:", error);
  } else {
    shops.value = shopData;
  }
};

onMounted(async () => {
  await fetchShops();
  await fetchCategories();
});

const categories = ref([]);
const q = ref("");

const filteredRows = computed(() => {
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(q.value.toLowerCase())
  );
});

const columns = [
  { label: "Nom de la catégorie", key: "name" },
  { label: "Boutique", key: "shop.name" },
  { key: "actions" },

];

const fetchCategories = async () => {
  const { data: categoryData, error } = await supabase
    .from("category")
    .select(`
    id,name,
    shop (
      name
    )
  `);

  if (error) {
    console.error("Erreur lors du chargement des catégories:", error);
  } else {
    categories.value = categoryData;
  }
};

const addCategory = async () => {
  const { name, shop_id } = DataForm.value;

  const { data, error } = await supabase
    .from("category")
    .insert([{ name, shop_id }]);

  if (error) {
    console.error("Erreur lors de l'ajout de la catégorie:", error);
  } else {
    isAdd.value = false;
    DataForm.value = { name: "", shop_id:null };
    fetchCategories()
  }
};

const updateCategory = async () => {
  const { id, name, shop_id } = DataForm.value;
  const { data, error } = await supabase
    .from("category")
    .update({ name, shop_id })
    .eq("id", id);

  if (error) {
    console.error("Erreur lors de la mise à jour de la catégorie:", error);
  } else {
    const updatedCategory = categories.value.find((category) => category.id === id);
    updatedCategory.name = name;
    updatedCategory.shop_id = shop_id;
    isEdit.value = false;
  }
};

const editCategory = (id) => {
  currentCategory.value = categories.value.find((category) => category.id === id);
  DataForm.value = { ...currentCategory.value };
  isEdit.value = true;
};

const deleteCategory = async (id) => {
  const { error } = await supabase.from("category").delete().eq("id", id);
  if (error) {
    console.error("Erreur lors de la suppression de la catégorie:", error);
  } else {
    categories.value = categories.value.filter((category) => category.id !== id);
  }
};

const items = (row) => [
  [
    {
      label: "Mettre à jour",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => editCategory(row.id)
    },
    {
      label: "Supprimer",
      labelClass: "text-red-700",
      icon: "i-heroicons-trash-20-solid",
      iconClass: "text-red-700",
      click: () => deleteCategory(row.id),
    },
  ],
];

</script>