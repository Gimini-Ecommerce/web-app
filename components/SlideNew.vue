<script setup>
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  PlusIcon,
} from "@heroicons/vue/24/solid";
import { ref } from "vue";
</script>

<template>
  <ul class="grid grid-cols-12 h-96 gap-6">
    <li
      class="col-span-3 shadow-sm relative bg-gradient-to-tr from-20% from-[#7e0574] via-[#0e0440] to-[#0e0440] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <NuxtLink to="/spotlight-1">
        <span class="absolute text-white font-bold text-xl left-4 top-4"
          >SpotLight</span
        >
        <img
          src="https://img.freepik.com/free-photo/portrait-handsome-asian-man-posing-outdoors-city-with-headphones_23-2149086958.jpg?uid=R20458822&ga=GA1.1.1876530571.1731088066"
          class="object-cover h-full w-full"
          alt="évènement du brudge"
        />
        <p class="absolute text-white font-bold text-xl left-4 bottom-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesci
        </p>
      </NuxtLink>
    </li>
    <li
      class="col-span-3 shadow-sm relative bg-gradient-to-tr from-20% from-[#7e0574] via-[#0e0440] to-[#0e0440] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <NuxtLink to="/spotlight-1">
        <span class="absolute text-white font-bold text-xl left-4 top-4"
          >SpotLight</span
        >
        <img
          src="https://img.freepik.com/free-photo/group-female-friends-enjoying-day-out-together_23-2150150768.jpg?t=st=1732102095~exp=1732105695~hmac=c3697c9dadece9793c69d70405e7b407b2e4b62cb59f17acf3fda16ce16c10c8&w=740"
          class="object-cover h-full w-full"
          alt="évènement du brudge"
        />
        <p class="absolute text-white font-bold text-xl left-4 bottom-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesci
        </p>
      </NuxtLink>
    </li>
    <li
      class="col-span-3 shadow-sm relative bg-gradient-to-tr from-20% from-[#7e0574] via-[#0e0440] to-[#0e0440] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <NuxtLink to="/spotlight-1">
        <span class="absolute text-white font-bold text-xl left-4 top-4"
          >SpotLight</span
        >
        <img
          src="https://img.freepik.com/free-photo/portrait-grey-haired-businessman-standing_74855-10324.jpg?t=st=1732102203~exp=1732105803~hmac=4d1510d319af5b36c9f3b21b080eec023690a9db7548217dab6914e04e52e8aa&w=740"
          class="object-cover h-full w-full"
          alt="évènement du brudge"
        />
        <p class="absolute text-white font-bold text-xl left-4 bottom-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesci
        </p>
      </NuxtLink>
    </li>
    <li
      class="col-span-3 shadow-sm relative bg-violet-800 hover:bg-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <NuxtLink to="/spotlight-1">
        <PlusIcon class="text-white w-28 h-28 flex top-1/3 left-1/3 absolute" />
        <div
          class="text-violet-800 font-semibold flex items-center w-full bottom-1/4 left-1/3 absolute"
          id="moreNews"
        >
          <i class="not-italic text-xl"> On y va </i
          ><ArrowUpRightIcon class="w-6 h-6" />
        </div>
        <p class="absolute text-white font-bold text-xl left-4 bottom-4">
          Voir plus
        </p>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
li span,
#moreNews {
  font-family: CentraNo2-Bold;
}
</style>
