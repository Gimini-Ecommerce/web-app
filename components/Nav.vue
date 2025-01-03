<template>
  <nav class="py-4">
    <div class="flex flex-col space-y-2 pt-10">
      <ul class="flex flex-col gap-2">
        <NuxtLink to="dashboard">
          <li>
            <Squares2X2Icon
              :class="
                route.path === '/dashboard'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <NuxtLink to="boutique">
          <li>
            <BuildingStorefrontIcon
              :class="
                route.path === '/boutique'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <NuxtLink to="categorie">
          <li>
            <TagIcon
              :class="
                route.path === '/categorie'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <NuxtLink to="produit">
          <li>
            <SwatchIcon
              :class="
                route.path === '/produit'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <NuxtLink to="favoris">
          <li>
            <HeartIcon
              :class="
                route.path === '/favoris'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <NuxtLink to="banniere">
          <li>
            <GiftIcon
              :class="
                route.path === '/banniere'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <NuxtLink to="commande">
          <li>
            <BanknotesIcon
              :class="
                route.path === '/commande'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <NuxtLink to="log">
          <li>
            <FireIcon
              :class="
                route.path === '/log'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <NuxtLink to="utilisateur">
          <li>
            <UserIcon
              :class="
                route.path === '/utilisateur'
                  ? 'text-slate-600 bg-slate-200 rounded-full p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
                  : 'text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out'
              "
            />
          </li>
        </NuxtLink>
        <li @click="logout" class="cursor-pointer ">
          <PowerIcon
            class="cursor-pointer text-slate-600/70 rounded-full hover:bg-violet-500 hover:text-white p-3 w-12 h-12 hover:scale-110 transition-all duration-200 ease-in-out"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "#app";
let route = useRoute();
import {
  Squares2X2Icon,
  ChevronRightIcon,
  BuildingStorefrontIcon,
  SwatchIcon,
  UserIcon,
  TagIcon,
  BanknotesIcon,
  HeartIcon,
  GiftIcon,
  FireIcon,
  PowerIcon
} from "@heroicons/vue/24/outline";

const supabase = useSupabaseClient();
let logout = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
  } else {
    return navigateTo("/");
  }
};

</script>

<style scoped>
@import url("~/assets/css/font.css");
.centraNo2,
ul li {
  font-family: CentraNo2-Bold;
}
.Quicksand {
  font-family: Quicksand-simple;
}
.vertrio {
  font-family: vertrio-simple;
}

/* Animation déroulante */
.has-children ol {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.3s ease;
}

/* Quand l'utilisateur survole */
.has-children:hover ol {
  max-height: 500px; /* Ajustez selon vos besoins */
  opacity: 1;
}

/* Rotation de l'icône Chevron */
.chevron {
  transition: transform 0.3s ease;
}

.has-children:hover .chevron {
  transform: rotate(90deg);
}
</style>
