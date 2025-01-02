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
          <h5 class="text-lg font-extrabold text-slate-900"> bannièret</h5>
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
        <h5 class="text-md text-white"> bannièrets commandés (ce mois)</h5>
        <div class="flex items-center gap-x-3">
          <p class="bg-white rounded-full p-2">
            <BanknotesIcon class="text-slate-800 w-4 h-4" />
          </p>
          <span class="text-white font-bold text-3xl centraNo2"
            >40</span
          >
        </div>
      </div>
      <!--Commande table-->
      <h5 class="text-3xl font-bold text-slate-900 col-span-12 centraNo2">Commandes récents</h5>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

definePageMeta({
  middleware: "auth",
});
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
