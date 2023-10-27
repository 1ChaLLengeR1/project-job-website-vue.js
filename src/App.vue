<template>
  <main class="w-full h-full relative flex-col bg-color-bg">
    <image-dots v-if="show_dots"></image-dots>
    <navigation-panel
      v-if="navigation_authentification"
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
      <div class="w-full">
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
import { defineComponent, reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { AutomaticallyLogin } from "./components/JS/AutomaticallyLogin";
import { LoadPage } from "./components/JS/LoadPage";
// componets
import NavigationVue from "./components/Header/Navigation.vue";
import BlockSliderBar from "./components/Header/BlockSliderBar.vue";
import ArrayListArtek from "./components/JS/ArrayLinksArtek.js";
import ArrayListPatryk from "./components/JS/ArrayLinksPatryk.js";
import ImageDotsVue from "./components/App/ImageDots.vue";

export default defineComponent({
  name: "App",
  components: {
    "navigation-panel": NavigationVue,
    "block-silderbar": BlockSliderBar,
    "image-dots": ImageDotsVue,
  },
  setup() {
    //values
    const store = useStore();
    const sildeBars = reactive<{ id: string; value: boolean }>({
      id: "",
      value: false,
    });

    const show_dots = ref<boolean>(false);

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

    const check_screen = () => {
      if (window.innerWidth <= 640) {
        show_dots.value = false;
      } else {
        show_dots.value = true;
      }
    };
    window.addEventListener("resize", check_screen);
    check_screen();

    LoadPage();
    AutomaticallyLogin();

    //computed
    const navigation_authentification = computed(() => {
      return store.getters["auth/getUser"].isAuth;
    });

    return {
      openSliderBar,
      sildeBars,
      arrayLinks,
      navigation_authentification,
      show_dots,
    };
  },
});
</script>

<style scoped>
.slide-fade-right-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-right-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  transform: translateX(120%);
}

.slide-fade-left-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-left-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
  transform: translateX(-120%);
}
</style>
./components/JS/Authentication
