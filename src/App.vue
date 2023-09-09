<template>
  <main class="w-full h-screen flex-col bg-color-bg">
    <navigation-panel
      v-if="true"
      @open-sliderbar="openSliderBar"
    ></navigation-panel>
    <div class="w-full flex flex-row relative overflow-hidden">
      <Transition name="slide-fade-left">
        <block-silderbar
          v-if="sildeBars.id === 'patryk' && sildeBars.value === true"
          :site="false"
          :arrayList="arrayLinks.links_patryk"
          @close-silderBar="openSliderBar"
        ></block-silderbar>
      </Transition>
      <div class="w-full" @click="openSliderBar('', false)">
        <router-view></router-view>
      </div>

      <Transition name="slide-fade-right">
        <block-silderbar
          v-if="sildeBars.id === 'artek' && sildeBars.value === true"
          :site="true"
          :arrayList="arrayLinks.links_artek"
          @close-silderBar="openSliderBar"
        ></block-silderbar>
      </Transition>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import NavigationVue from "./components/Header/Navigation.vue";
import BlockSliderBar from "./components/Header/BlockSliderBar.vue";
import ArrayListArtek from "./components/JS/ArrayLinksArtek.js";
import ArrayListPatryk from "./components/JS/ArrayLinksPatryk.js";
import { AutomaticallyLogin } from "./components/JS/AutomaticallyLogin";
import { LoadPage } from "./components/JS/LoadPage";

export default defineComponent({
  name: "App",
  components: {
    "navigation-panel": NavigationVue,
    "block-silderbar": BlockSliderBar,
  },
  setup() {
    //values
    const router = useRouter();
    const sildeBars = reactive<{ id: string; value: boolean }>({
      id: "",
      value: false,
    });

    const arrayLinks = reactive<{
      links_artek: { title: string; name_router: string }[];
      links_patryk: { title: string; name_router: string }[];
    }>({
      links_artek: ArrayListArtek,
      links_patryk: ArrayListPatryk,
    });

    //functions
    const openSliderBar = (val: { id: string; value: boolean }) => {
      sildeBars.id = val.id;
      sildeBars.value = val.value;
    };

    LoadPage();
    AutomaticallyLogin();

    return { openSliderBar, sildeBars, arrayLinks };
  },
});
</script>

<style scoped>
.slide-fade-right-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-right-leave-active {
  transition: all 1s ease-out;
}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  transform: translateX(120%);
}

.slide-fade-left-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-left-leave-active {
  transition: all 1s ease-out;
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
  transform: translateX(-120%);
}
</style>
