<template>
  <div class="w-full pt-10">
    <div class="grid grid-cols-12 gap-4">
      <div
        class="col-span-3 divide-y-[1px] py-4 space-y-4 shadow-md bg-[#f4f6f8]/70 rounded-xl"
      >
        <div class="flex items-center gap-x-3 px-6">
          <span class="bg-slate-500/10 py-1 px-3 rounded-md">
            <ShoppingCartIcon class="text-slate-800 w-6 h-6" />
          </span>
          <h5 class="text-lg font-extrabold text-slate-900">Commande</h5>
        </div>
        <div class="flex justify-center w-full gap-2 p-2 divide-x-[1px]">
          <div class="flex flex-col gap-x-3">
            <span class="font-bold text-xl centraNo2 text-center">250</span>
            <span
              class="font-semibold text-sm Quicksand text-slate-500 text-center"
              >En cours</span
            >
          </div>
          <div class="flex flex-col gap-x-3">
            <span class="font-bold text-xl centraNo2 text-center">250</span>
            <span
              class="pl-3 font-semibold text-sm Quicksand text-slate-500 text-center"
              >En expédition</span
            >
          </div>
        </div>
      </div>
      <div
        class="col-span-3 divide-y-[1px] py-4 space-y-4 shadow-md bg-[#f4f6f8]/70 rounded-xl"
      >
        <div class="flex items-center gap-x-3 px-6">
          <span class="bg-slate-500/10 py-1 px-3 rounded-md">
            <SwatchIcon class="text-slate-800 w-6 h-6" />
          </span>
          <h5 class="text-lg font-extrabold text-slate-900">Produits</h5>
        </div>
        <div class="flex justify-center w-full gap-2 p-2 divide-x-[1px]">
          <div class="flex flex-col gap-x-3">
            <span class="font-bold text-xl centraNo2 text-center">250</span>
            <span
              class="font-semibold text-sm Quicksand text-slate-500 text-center"
              >Disponible</span
            >
          </div>
          <div class="flex flex-col gap-x-3">
            <span class="font-bold text-xl centraNo2 text-center">250</span>
            <span
              class="pl-3 font-semibold text-sm Quicksand text-slate-500 text-center"
              >En favoris 💚</span
            >
          </div>
        </div>
      </div>
      <div
        class="col-span-3 divide-y-[1px] py-4 space-y-4 shadow-md bg-[#f4f6f8]/70 rounded-xl"
      >
        <div class="flex items-center gap-x-3 px-6">
          <span class="bg-slate-500/10 py-1 px-3 rounded-md">
            <BuildingStorefrontIcon class="text-slate-800 w-6 h-6" />
          </span>
          <h5 class="text-lg font-extrabold text-slate-900">Boutique</h5>
        </div>
        <div class="flex justify-center w-full gap-2 p-2 divide-x-[1px]">
          <div class="flex flex-col gap-x-3">
            <span class="font-bold text-xl centraNo2 text-center">250</span>
            <span
              class="font-semibold text-sm Quicksand text-slate-500 text-center"
              >Actifs</span
            >
          </div>
        </div>
      </div>
      <div
        class="col-span-3 divide-y-[1px] py-4 space-y-4 shadow-md bg-[#f4f6f8]/70 rounded-xl"
      >
        <div class="flex items-center gap-x-3 px-6">
          <span class="bg-slate-500/10 py-1 px-3 rounded-md">
            <UserIcon class="text-slate-800 w-6 h-6" />
          </span>
          <h5 class="text-lg font-extrabold text-slate-900">Utilisateurs</h5>
        </div>
        <div class="flex justify-center w-full gap-2 p-2 divide-x-[1px]">
          <div class="flex flex-col gap-x-3">
            <span class="font-bold text-xl centraNo2 text-center">250</span>
            <span
              class="pl-3 font-semibold text-sm Quicksand text-slate-500 text-center"
              >Actifs</span
            >
          </div>
        </div>
      </div>
      <div
        class="col-span-6 px-6 py-4 space-y-4 shadow-md bg-violet-600 rounded-xl"
      >
        <h5 class="text-md text-white">Chiffre d'affaire (ce mois)</h5>
        <div class="flex items-center gap-x-3">
          <p class="bg-white rounded-full p-2">
            <BanknotesIcon class="text-slate-800 w-4 h-4" />
          </p>
          <span class="text-white font-bold text-3xl centraNo2"
            >500.000.000 F</span
          >
        </div>
      </div>
      <div
        class="col-span-6 px-6 py-4 space-y-4 shadow-md bg-orange-600 rounded-xl"
      >
        <h5 class="text-md text-white">produits commandés (ce mois)</h5>
        <div class="flex items-center gap-x-3">
          <p class="bg-white rounded-full p-2">
            <BanknotesIcon class="text-slate-800 w-4 h-4" />
          </p>
          <span class="text-white font-bold text-3xl centraNo2">40</span>
        </div>
      </div>
      <!--Commande table-->

      <UCard
        class="w-full col-span-full"
        :ui="{
          base: '',
          ring: '',
          divide: 'divide-y divide-gray-200 dark:divide-gray-700',
          header: { padding: 'px-4 py-5' },
          body: {
            padding: '',
            base: 'divide-y divide-gray-200 dark:divide-gray-700',
          },
          footer: { padding: 'p-4' },
        }"
      >
        <template #header>
          <h2
            class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
          >
            Commandes récents
          </h2>
        </template>

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
          <UInput
            v-model="search"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Recherche..."
          />

          <USelectMenu
            v-model="selectedStatus"
            :options="todoStatus"
            multiple
            placeholder="Status"
            class="w-40"
          />
        </div>

        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
          <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5">Ligne par page:</span>

            <USelect
              v-model="pageCount"
              :options="[3, 5, 10, 20, 30, 40]"
              class="me-2 w-20"
              size="xs"
            />
          </div>

          <div class="flex gap-1.5 items-center">
     

            <USelectMenu
              v-model="selectedColumns"
              :options="excludeSelectColumn"
              multiple
            >
              <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
                Colonnes
              </UButton>
            </USelectMenu>

            <UButton
              icon="i-heroicons-funnel"
              color="gray"
              size="xs"
              :disabled="search === '' && selectedStatus.length === 0"
              @click="resetFilters"
            >
              Réinitialisé
            </UButton>
          </div>
        </div>

        <!-- Table -->
        <UTable
          :rows="todos"
          :columns="columnsTable"
          :loading="status === 'pending'"
          sort-asc-icon="i-heroicons-arrow-up"
          sort-desc-icon="i-heroicons-arrow-down"
          sort-mode="manual"
          class="w-full"
          :ui="{
            td: { base: 'max-w-[0] truncate' },
            default: { checkbox: { color: 'gray' } },
          }"
          @select="select"
        >
          <template #completed-data="{ row }">
            <UBadge
              size="xs"
              :label="row.completed ? 'Completed' : 'In Progress'"
              :color="row.completed ? 'emerald' : 'orange'"
              variant="subtle"
            />
          </template>

          <template #actions-data="{ row }">
            <UDropdown :items="row"  :ui="{ width: 'w-36' }">
              <UButton
                color="gray"
                variant="ghost"
                trailing
                icon="i-heroicons-ellipsis-horizontal-20-solid"
              />
            </UDropdown>
          </template>
        </UTable>

        <!-- Number of rows & Pagination -->
        <template #footer>
          <div class="flex flex-wrap justify-between items-center">
            <div>
              <span class="text-sm leading-5">
                Affichage
                <span class="font-medium">{{ pageFrom }}</span>
                de
                <span class="font-medium">{{ pageTo }}</span>
                à
                <span class="font-medium">{{ pageTotal }}</span>
                résultats
              </span>
            </div>

            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="pageTotal"
              :ui="{
                wrapper: 'flex items-center gap-1',
                rounded: '!rounded-full min-w-[32px] justify-center',
                default: {
                  activeButton: {
                    variant: 'outline',
                  },
                },
              }"
            />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  UserGroupIcon,
  BuildingLibraryIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  UserIcon,
  SwatchIcon,
  BuildingStorefrontIcon,
} from "@heroicons/vue/24/solid";
const supabase = useSupabaseClient();

definePageMeta({
  middleware: "auth",
});

const columns = [
  {
    key: "select",
    class: "w-2",
  },
  {
    key: "id",
    label: "#",
    sortable: true,
  },
  {
    key: "title",
    label: "Date ",
    sortable: true,
  },
  {
    key: "title",
    label: "Prix ",
    sortable: true,
  },
  {
    key: "title",
    label: "Client ",
    sortable: true,
  },
  {
    key: "completed",
    label: "Status",
    sortable: true,
  },
  {
    key: "actions",
  
  },
];

const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);
const excludeSelectColumn = computed(() =>
  columns.filter((v) => v.key !== "select")
);



// Actions
const actions = (row) => [
  [
    {
      key: "completed",
      label: "Détails",
      label: "Status",
      icon: "i-heroicons-check",
    },
    {
      label: "Supprimer",
      labelClass: "text-red-700",
      icon: "i-heroicons-trash-20-solid",
      iconClass: "text-red-700",
      click: () => alert("hhj"),
    },
  ],
];

// Filters
const todoStatus = [
  {
    key: "uncompleted",
    label: "In Progress",
    value: false,
  },
  {
    key: "completed",
    label: "Completed",
    value: true,
  },
];

const search = ref("");
const selectedStatus = ref([]);
const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return "";
  }

  if (selectedStatus?.value?.length > 1) {
    return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`;
  }

  return `?completed=${selectedStatus.value[0].value}`;
});

const resetFilters = () => {
  search.value = "";
  selectedStatus.value = [];
};

// Pagination
const sort = ref({ column: "id", direction: "asc" });
const page = ref(1);
const pageCount = ref(10);
const pageTotal = ref(200); // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

// Data
const { data: todos, status } = await useLazyAsyncData(
  "todos",
  () =>
    $fetch(`https://jsonplaceholder.typicode.com/todos${searchStatus.value}`, {
      query: {
        q: search.value,
        _page: page.value,
        _limit: pageCount.value,
        _sort: sort.value.column,
        _order: sort.value.direction,
      },
    }),
  {
    default: () => [],
    watch: [page, search, searchStatus, pageCount, sort],
  }
);
</script>

<style scoped>
@import url("~/assets/css/font.css");
.centraNo2,
ul li {
  font-family: CentraNo2-Bold;
}
.Quicksand,
h5 {
  font-family: Quicksand-simple;
}
.vertrio {
  font-family: vertrio-simple;
}
</style>
