<template>
  <div class="flex w-full justify-center">
    <add-rent-user></add-rent-user>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

//componets
import AddRentUserVue from "./RentUser/AddRentUser.vue";

export default defineComponent({
  components: {
    "add-rent-user": AddRentUserVue,
  },
  setup() {
    //values
    const store = useStore();

    //computed
    const load_rent_user = computed(() => {
      return store.getters["response/get_renting_users"];
    });
    return { load_rent_user };
  },
});
</script>

<style scoped></style>
