<template>
  <div class="w-full pt-4">
    <div class="flex justify-between items-center gap-2">
      <h3 class="text-3xl centraNo2 font-semibold text-slate-600">
        Gérer vos produits
      </h3>
      <button
        @click="isAdd = true"
        class="text-white bg-violet-700 hover:bg-violet-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
      >
        Créer un produit
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4 pt-2">
      <div
        class="col-span-12 flex items-center gap-4 px-3 pt-3.5 pb-1 border-gray-200 dark:border-gray-700"
      >
        <UInput
          v-model="q"
          placeholder="Trouver un produit..."
          color="violet"
        />
        <div class="flex justify-center items-center gap-2">
          <button
            class=" hover:bg-emerald-600  flex items-center rounded-full cursor-pointer"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            <UIcon name="i-heroicons-arrow-left-circle" class="w-6 h-6 hover:bg-white bg-emerald-600 transition duration-300 ease-in-out" />
          </button>

          <span class="text-sm">
            Page {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            class=" hover:bg-emerald-600  flex items-center rounded-full cursor-pointer"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            <UIcon name="i-heroicons-arrow-right-circle " class="w-6 h-6 hover:bg-white bg-emerald-600 transition duration-300 ease-in-out" />
          </button>
          
        </div>
      </div>

      <div class="col-span-12 p-4 rounded-lg bg-slate-50 h-1/2 overflow-y-scroll">
        <UTable
          v-model="selected"
          :rows="filteredRows"
          :columns="columns"
          :empty-state="{
            icon: 'i-heroicons-folder-open-solid',
            label: 'Pas de produit trouvé.',
          }"
        >
          <template #image-data="{ row }">
            <img
              :src="row.image"
              alt="image"
              class="h-16 w-16 object-contain rounded-lg"
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
        title="Création de nouveau produit"
        description="Ce produit sera visible par tous vos utilisateurs."
        class="pb-4"
      />
      <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="addProduct">
        <input
          autofocus
          type="text"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Nom du produit"
          v-model="DataForm.name"
        />
        <input
          type="text"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Slug ( ex : chaussette-shein-1)"
          v-model="DataForm.slug"
        />
        <input
          type="number"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Prix en FCFA"
          v-model="DataForm.price"
        />
        <input
          type="number"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Poids en Kg"
          v-model="DataForm.weight"
        />
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm"
            >Choisir la boutique</label
          >
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
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm"
            >Choisir la catégorie</label
          >
          <select
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            v-model="DataForm.category_id"
            required
          >
            <option
              v-for="category in filteredCategories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm">Image principale </label>
          <input
            type="file"
            required
            class="p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            @change="handleImageChange"
          />
        </div>
        <textarea
          required
          class="col-span-full p-2 h-32 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Description"
          v-model="DataForm.description"
        ></textarea>
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
        title="Mettre à jour le  produit"
        description="Ce produit sera visible par tous vos utilisateurs."
        class="pb-4"
      />
      <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="updateProduct">
        <input
          autofocus
          type="text"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Nom du produit"
          v-model="DataForm.name"
        />
        <input
          type="text"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Slug ( ex : chaussette-shein-1)"
          v-model="DataForm.slug"
        />
        <input
          type="number"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Prix en FCFA"
          v-model="DataForm.price"
        />
        <input
          type="number"
          required
          class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Poids en Kg"
          v-model="DataForm.weight"
        />
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm"
            >Choisir la boutique</label
          >
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
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm"
            >Choisir la catégorie</label
          >
          <select
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            v-model="DataForm.category_id"
            required
          >
            <option
              v-for="category in filteredCategories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="col-span-full flex flex-col gap-y-2">
          <label for="" class="text-slate-600 text-sm">Image principale </label>
          <input
            type="file"
            required
            class="p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
            @change="handleImageChange"
          />
        </div>
        <textarea
          required
          class="col-span-full p-2 h-32 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out"
          placeholder="Description"
          v-model="DataForm.description"
        ></textarea>
        <button
          type="submit"
          class="col-start-4 col-end-9 text-white bg-green-700 hover:bg-green-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
        >
          <span v-if="isEdit">Mettre à jour</span>
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
    <UModal v-model="isAddImagesModalOpen">
      <UAlert
        icon="i-heroicons-command-line"
        color="orange"
        variant="soft"
        title="Mettre à jour le  produit"
        description="Ce produit sera visible par tous vos utilisateurs."
        class="pb-4"
      />
      <h3 class="text-lg font-semibold mb-4">Images du produit</h3>

      <!-- Section pour afficher les images existantes -->
      <div v-if="productImages.length > 0" class="grid grid-cols-12 gap-4 mb-6">
        <div
          v-for="image in productImages"
          :key="image.id"
          class="col-span-4 relative"
        >
          <img
            :src="image.path"
            alt="Product Image"
            class="w-full h-32 object-cover rounded-lg border"
          />
          <button
            @click="deleteImage(image.id)"
            class="absolute flex justify-center items-center top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-4 h-4 rounded-full"
          >
            <UIcon name="i-heroicons-x-mark" class="w-2 h-2" />
          </button>
        </div>
      </div>
      <div v-else class="text-gray-500">
        Aucune image disponible pour ce produit.
      </div>

      <form class="p-4 grid grid-cols-12 gap-4" @submit.prevent="uploadImages">
        <div
          v-for="(field, index) in imagesForm"
          :key="index"
          class="flex flex-col col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg focus:rounded-none transition-all duration-300 ease-in-out image-field"
        >
          <label class="basis-full text-slate-600 text-sm"
            >Image {{ index + 1 }}</label
          >
          <div class="flex flex-row items-center gap-4">
            <input
              class="basis-1/2"
              type="file"
              @change="(e) => (field.image = e.target.files[0])"
              accept="image/*"
            />
            <button
              class="basis-1/2 bg-red-500 rounded-md text-white p-2"
              type="button"
              @click="removeImageField(index)"
            >
              Supprimer
            </button>
          </div>
        </div>

        <div class="col-span-12 grid grid-cols-12 gap-2">
          <button
            type="button"
            @click="addImageField"
            class="col-span-4 bg-orange-500 rounded-md text-white p-2"
          >
            Ajouter une image
          </button>
          <button
            type="submit"
            class="col-span-4 bg-green-500 rounded-md text-white p-2"
          >
            Envoyer les images
          </button>
          <button
            type="button"
            @click="isAddImagesModalOpen = false"
            class="col-span-4 bg-slate-500 rounded-md text-white p-2"
          >
            Annuler
          </button>
        </div>
      </form>
    </UModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const supabase = useSupabaseClient();
definePageMeta({
  middleware: "auth",
  alias: "/produit",
});

const isAdd = ref(false);
const isEdit = ref(false);
let currentProduct = ref(null);
let DataForm = ref({
  name: "",
  description: "",
  slug: "",
  price: "",
  image: null,
  weight: "",
  category_id: null,
  shop_id: null,
});
const handleImageChange = (event) => {
  // Obtenir le fichier image
  const file = event.target.files[0];
  if (file) {
    DataForm.value.image = file;
  }
};

let addProduct = async () => {
  try {
    // 1. Téléchargement de l'image dans le stockage de Supabase
    const filePath = `${Date.now()}_${DataForm.value.image.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product")
      .upload(filePath, DataForm.value.image);

    if (uploadError) {
      console.error("Erreur lors du téléchargement de l'image:", uploadError);
      return;
    }

    // 2. Récupérer l'URL de l'image après téléchargement
    const imageUrl = supabase.storage.from("product").getPublicUrl(filePath);

    // 3. Insérer le produit dans la table "product" avec l'URL de l'image
    const { data: productData, error: insertError } = await supabase
      .from("product")
      .insert([
        {
          name: DataForm.value.name,
          description: DataForm.value.description,
          slug: DataForm.value.slug,
          price: parseFloat(DataForm.value.price),
          image: imageUrl?.data?.publicUrl,
          weight: DataForm.value.weight,
          category_id: DataForm.value.category_id,
          shop_id: DataForm.value.shop_id,
        },
      ]);

    if (insertError) {
      console.error("Erreur lors de l'insertion du produit:", insertError);
    } else {
      // Réinitialiser le formulaire après ajout
      DataForm.value = {
        name: "",
        description: "",
        slug: "",
        price: "",
        image: null,
        weight: "",
        category_id: null,
        shop_id: null,
      };
      isAdd.value = false; // Fermer le modal
      fetchProducts(); // Recharger la liste des produits
    }
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
  }
};

const shops = ref([]);
const categories = ref([]);

let updateProduct = async () => {
  try {
    let imageUrl = currentProduct.value.image;
    // Si une nouvelle image a été sélectionnée, téléchargez-la
    if (DataForm.value.image) {
      const filePath = `${Date.now()}_${DataForm.value.image.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("product")
        .upload(filePath, DataForm.value.image);

      if (uploadError) {
        console.error("Erreur lors du téléchargement de l'image:", uploadError);
        return;
      }

      imageUrl = supabase.storage.from("product").getPublicUrl(filePath)
        ?.data?.publicUrl;
    }

    const { data: productData, error: updateError } = await supabase
      .from("product")
      .update({
        name: DataForm.value.name,
        slug: DataForm.value.slug,
        description: DataForm.value.description,
        weight: DataForm.value.weight,
        price: DataForm.value.price,
        image: imageUrl,
        shop_id: DataForm.value.shop_id,
        category_id: DataForm.value.category_id,
      })
      .eq("id", currentProduct.value.id);

    if (updateError) {
      console.error("Erreur lors de la mise à jour du produit:", updateError);
      return; // Arrêter l'exécution si une erreur est survenue
    }

    // Réinitialiser le formulaire après la mise à jour
    DataForm.value = {
      name: "",
      slug: "",
      description: "",
      weight: "",
      price: null,
      image: null,
      shop_id: null,
      category_id: null,
    };
    isEdit.value = false;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
  }
};

const fetchShops = async () => {
  const { data: shopData, error } = await supabase.from("shop").select("*");
  if (error) {
    console.error("Erreur lors du chargement des boutiques:", error);
  } else {
    shops.value = shopData;
  }
};

const fetchCategories = async () => {
  const { data: categoryData, error } = await supabase
    .from("category")
    .select("id, name, shop_id");

  if (error) {
    console.error("Erreur lors du chargement des catégories:", error);
  } else {
    categories.value = categoryData;
  }
};
const currentPage = ref(1); // Page actuelle
const itemsPerPage = 10; // Nombre de produits par page
const totalProducts = ref(0); // Total des produits
const totalPages = ref(1); // Total des pages
const fetchProducts = async () => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;
  let {
    data: product,
    error,
    count,
  } = await supabase
    .from("product")
    .select(
      `
    id,name,description,slug,price,image,weight,
    shop (
      id,name
    ),category (
      id,name
    )
  `,
      { count: "exact" }
    )
    .range(start, end);
  if (error) {
    console.error("Erreur lors du chargement des produits:", error);
  } else {
    products.value = product;
    totalProducts.value = count || 0; // Total des produits
    totalPages.value = Math.ceil(totalProducts.value / itemsPerPage);
  }
  console.log(product);
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchProducts();
  }
};

// Naviguer vers la page suivante
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchProducts();
  }
};
const filteredCategories = computed(() => {
  if (!DataForm.value.shop_id) return [];
  return categories.value.filter(
    (category) => category.shop_id === DataForm.value.shop_id
  );
});
onMounted(async () => {
  await fetchShops();
  await fetchCategories();
  await fetchProducts();
});

const products = ref([]);
const q = ref("");

const filteredRows = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(q.value.toLowerCase())
  );
});

const columns = [
  { label: "Nom ", key: "name" },
  { label: "Image", key: "image" },
  { label: "Boutique", key: "shop.name" },
  { label: "Catégorie", key: "category.name" },
  { label: "Prix (F)", key: "price" },
  { label: "Poids (Kg)", key: "weight" },
  { key: "actions" },
];

const items = (row) => [
  [
    {
      label: "Ajouter des images ",
      icon: "i-heroicons-photo-20-solid",
      click: () => openAddImagesModal(row.id),
    },
    {
      label: "Mettre à jour",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => editProduct(row.id),
    },
    {
      label: "Supprimer",
      labelClass: "text-red-700",
      icon: "i-heroicons-trash-20-solid",
      iconClass: "text-red-700",
      click: () => deleteProducts(row.id),
    },
  ],
];

const openAddImagesModal = (productId) => {
  currentProductId.value = productId;
  imagesForm.value = [{ image: null }];
  fetchProductImages(currentProductId.value);
  console.log(productImages.value);
  isAddImagesModalOpen.value = true;
};

const imagesForm = ref([{ image: null }]);

const addImageField = () => {
  imagesForm.value.push({ image: null });
};

const removeImageField = (index) => {
  if (imagesForm.value.length > 1) {
    imagesForm.value.splice(index, 1);
  }
};

const uploadImages = async () => {
  try {
    for (const field of imagesForm.value) {
      if (field.image) {
        const filePath = `${Date.now()}_${field.image.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from("product-image")
          .upload(filePath, field.image);

        if (uploadError) {
          console.error(
            "Erreur lors du téléchargement de l'image:",
            uploadError
          );
          continue; // Passer à l'image suivante en cas d'erreur
        }

        // Récupérer l'URL publique de l'image
        const imageUrl = supabase.storage
          .from("product-image")
          .getPublicUrl(filePath)?.data?.publicUrl;

        // Enregistrer l'image dans la base de données
        const { error: insertError } = await supabase
          .from("productImage")
          .insert({
            product_id: currentProductId.value,
            path: imageUrl,
          });

        if (insertError) {
          console.error(
            "Erreur lors de l'enregistrement de l'image dans la base de données:",
            insertError
          );
        }
      }
    }

    console.log("Toutes les images ont été ajoutées avec succès !");
    isAddImagesModalOpen.value = false; // Fermer le modal
    fetchProductImages(currentProductId.value); // Recharger les images du produit
  } catch (error) {
    console.error("Erreur lors de l'ajout des images:", error);
  }
};
const productImages = ref([]); // Stocker les images du produit sélectionné

const fetchProductImages = async (productId) => {
  try {
    const { data, error } = await supabase
      .from("productImage")
      .select("id, path")
      .eq("product_id", productId);

    if (error) {
      console.error("Erreur lors du chargement des images du produit:", error);
    } else {
      productImages.value = data; // Mettre à jour la liste des images
    }
  } catch (error) {
    console.error("Erreur inattendue lors du chargement des images:", error);
  }
};
const deleteImage = async (imageId) => {
  try {
    const { error } = await supabase
      .from("productImage")
      .delete()
      .eq("id", imageId);

    if (error) {
      console.error("Erreur lors de la suppression de l'image:", error);
    } else {
      fetchProductImages(currentProductId.value); // Recharger les images
    }
  } catch (error) {
    console.error("Erreur inattendue:", error);
  }
};
// Gestion de l'état pour le modal
const isAddImagesModalOpen = ref(false);
const currentProductId = ref(null);

const editProduct = (id) => {
  currentProduct.value = products.value.find((product) => product.id === id);
  DataForm.value = { ...currentProduct.value };
  DataForm.value.shop_id = currentProduct.value?.shop.id;
  DataForm.value.category_id = currentProduct.value?.category.id;
  isEdit.value = true;
};
const deleteProducts = async (id) => {
  const { error } = await supabase.from("product").delete().eq("id", id);
  if (error) {
    console.error("Erreur lors de la suppression du produit:", error);
  } else {
    products.value = products.value.filter((product) => product.id !== id);
  }
};
</script>
