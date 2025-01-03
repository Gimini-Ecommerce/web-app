<template>
  <div class="w-full pt-4">
    <div class="flex justify-between items-center gap-2">
      <h3 class="text-3xl centraNo2 font-semibold text-slate-600">
        Gérer vos utilisateurs
      </h3>
      <button
        @click="isAdd = true"
        class="text-white bg-violet-700 hover:bg-violet-900 rounded-md shadow-md text-md p-2 transition-all duration-300 ease-in-out"
      >
        Nouveau utilisateur
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4 pt-2">
      <div
        class="col-span-12 flex px-3 pt-3.5 pb-1 border-gray-200 dark:border-gray-700"
      >
        <UInput
          v-model="q"
          placeholder="Trouver un utilisateur..."
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
              label: 'Pas d\'utilisateur trouvé.',
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
          title="Création de nouvel utilisateur"
          description="Cet utilisateur aura accès selon son rôle."
          class="pb-4"
        />
        <form
          class="p-4 grid grid-cols-12 gap-4"
          @submit.prevent="addUser"
        >
          <input
            autofocus
            type="text"
            required
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg"
            placeholder="Nom"
            v-model="DataForm.nom"
          />
          <input
            type="text"
            required
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg"
            placeholder="Prénom"
            v-model="DataForm.prenom"
          />
          <input
            type="email"
            required
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg"
            placeholder="Email"
            v-model="DataForm.email"
          />
          <input
            type="password"
            required
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg"
            placeholder="Mot de passe"
            v-model="DataForm.password"
          />
          <input
            type="password"
            required
            class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg"
            placeholder="Confirmer le mot de passe"
            v-model="confirmPassword"
          />
          <div class="col-span-full flex flex-col gap-y-2">
            <label class="text-slate-600 text-sm">Rôle</label>
            <select
              class="col-span-full p-2 border-[1px] border-slate-800/20 outline-none rounded-lg"
              v-model="DataForm.role"
              required
            >
              <option value="editeur">Editeur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <button
            type="submit"
            class="col-start-5 col-end-8 text-white bg-green-700 hover:bg-green-900 rounded-md shadow-md"
          >
            Créer
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
  alias: "/utilisateur",
});
const isAdd = ref(false);
const confirmPassword = ref("");
let DataForm = ref({
  nom: "",
  prenom: "",
  email: "",
  role: "",
  uuid: null,
  password: "",
});

const shops = ref([]);

onMounted(async () => {
  await fetchUsers();
});

const users = ref([]);
const q = ref("");

const filteredRows = computed(() => {
  return users.value.filter((user) =>
    user.nom.toLowerCase().includes(q.value.toLowerCase())
  );
});

const columns = [
  { label: "Nom d'utilisateur", key: "nom" },
  { label: "Rôle", key: "role" },
  { label: "Email", key: "email" },
  { label: "Membre depuis", key: "created_at" },
  { key: "actions" },
];

const fetchUsers = async () => {
  const { data: userData, error } = await supabase
    .from("users")
    .select(
      `
    id,nom,email,role,created_at
  `
    )
    .in("role", ["admin", "editeur"]);

  if (error) {
    console.error("Erreur lors du chargement des utilisateurs:", error);
  } else {
    users.value = userData;
  }
};

const items = (row) => [
  [
    {
      label: "Bannir",
      labelClass: "text-red-700",
      icon: "i-heroicons-trash-20-solid",
      iconClass: "text-red-700",
    },
  ],
];

const addUser = async () => {
    if (DataForm.value.password !== confirmPassword.value) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
  
    try {
      // Étape 1 : Enregistrer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: DataForm.value.email,
        password: DataForm.value.password,
      });
  
      if (authError) {
        console.error("Erreur d'authentification:", authError);
        return;
      }
  
      // Étape 2 : Utiliser l'UUID généré pour enregistrer dans la table `users`
      console.log(authData.user.id)
      const uui_user = authData.user.id;
      const { nom, prenom, email, role } = DataForm.value;
  
      const { data, error } = await supabase.from("users").insert([
        { nom, prenom, email, role, uui_user },
      ]);
  
      if (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      } else {
        alert("Utilisateur ajouté avec succès !");
        isAdd.value = false;
        DataForm.value = {
          nom: "",
          prenom: "",
          email: "",
          role: "",
          password: "",
        };
        confirmPassword.value = "";
        fetchUsers();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
  };
</script>
