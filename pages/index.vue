<template>
  <div class="w-full">
    <div class="grid grid-cols-12 gap-4">
      <div
        class="col-span-6 flex flex-col items-center justify-center h-screen relative"
      >
        <h4 class="text-slate-900 text-4xl pb-2">Bienvue sur E-com</h4>
        <p class="text-slate-900/50 text-2xl Quicksand font-semibold">
          Connectez-vous pour commençer !
        </p>
        <form class="pt-10 w-2/3 space-y-4" @submit.prevent="login">
          <input
            autofocus
            type="text"
            class="p-4 bg-white outline-none border-2 border-solid rounded-lg text-slate-800/80 w-full focus:border-violet-700"
            placeholder="E-mail"
            v-model="DataForms.email"
          />
          <input
            type="password"
            class="p-4 bg-white outline-none border-2 border-solid rounded-lg text-slate-800/80 w-full focus:border-violet-700"
            placeholder="Mot de passe"
            v-model="DataForms.password"
          />

          <div class="flex justify-center">
            <button
              type="submit"
              class="w-1/2 flex justify-center gap-3 text-white bg-violet-700 hover:bg-violet-800 rounded-md shadow-md text-md p-3 transition-all duration-300 ease-in-out"
            >
              <span v-if="!isRequestInProgress"> Connexion</span>
              <span v-else class="opacity-80">Chargement...</span>
            </button>
          </div>
        </form>
        <div
          v-show="errorMessage != null"
          class="bg-red-500/40 rounded-lg border-[1px] border-red-500 text-white px-4 py-2 mt-4 w-5/6 flex justify-between items-center"
        >
          <span class="text-red-500 font-normal Quicksand text-md">
            {{ errorMessage }}
          </span>
          <XCircleIcon
            class="w-5 h-5 text-red-500/80 hover:text-red-500/70 cursor-pointer"
            @click="errorMessage = null"
          />
        </div>
      </div>
      <div
        class="bg-gradient-to-r to-violet-400 from-violet-700 col-span-6 h-screen"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
definePageMeta({
  middleware: "redirect-auth",
});
const supabase = useSupabaseClient();
let DataForms = ref({
  email: "",
  password: "",
});
let errorMessage = ref(null);
let isRequestInProgress = ref(false);
let login = async () => {
  isRequestInProgress.value = true;
  const { data, error } = await supabase.auth
    .signInWithPassword({
      email: DataForms.value.email,
      password: DataForms.value.password,
      options: {
        emailRedirectTo: "http://localhost:3000/confirm",
      },
    })
    .finally(() => {
      isRequestInProgress.value = false;
    });
  if (error?.code === "invalid_credentials") {
    errorMessage.value = "Identifiants de connexion invalides";
  }
  if (data) {
    return navigateTo("/confirm");
  }
};
</script>

<style scoped>
@import url("~/assets/css/font.css");
.centraNo2,
ul li,
h4 {
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
