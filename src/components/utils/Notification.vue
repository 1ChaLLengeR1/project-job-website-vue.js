<template>
  <div class="absolute top-0 right-0 z-50">
    <ul class="flex flex-col gap-1 p-1">
      <li
        v-for="(item, index) in array_notifications"
        :key="index"
        class="flex flex-row h-28 bg-green-300"
        :class="{ 'bg-red-300': item.type === 'error' }"
      >
        <div class="w-20 h-full flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            fill="rgb(21 128 61)"
            viewBox="0 0 512 512"
            v-if="item.type === 'success'"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            fill="rgb(220 38 38)"
            viewBox="0 0 512 512"
            v-else
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
            />
          </svg>
        </div>
        <div
          class="w-full sm:w-80 flex flex-col items-start justify-center border-r border-gray-600"
        >
          <h1 class="font-bold" v-if="item.type === 'success'">
            Success Title Goes Here
          </h1>
          <h1 class="font-bold" v-else>Error Title Goes Here</h1>
          <h2>{{ item.description }}</h2>
        </div>
        <div
          class="w-12 sm:w-20 h-full flex justify-center items-center hover:bg-green-400"
          :class="{ 'hover:bg-red-400': item.type === 'error' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            viewBox="0 0 384 512"
            fill="rgb(21 128 61)"
            class="cursor-pointer"
            v-if="item.type === 'success'"
            @click="removeItem(item.id)"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            viewBox="0 0 384 512"
            fill="rgb(220 38 38)"
            class="cursor-pointer"
            v-else
            @click="removeItem(item.id)"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Notification",
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    //values
    const array_notifications = ref<
      { id: number; type: string; description: string }[]
    >([]);

    //functions

    const removeItem = (number_id: number) => {
      const findId = array_notifications.value.findIndex((obj) => {
        obj.id === number_id;
      });
      array_notifications.value.splice(findId, 1);
    };

    // watchers
    watch(props, (newVal) => {
      array_notifications.value.push({
        id: newVal.id,
        type: newVal.type,
        description: newVal.description,
      });
      setTimeout(() => {
        removeItem(newVal.id);
      },4000);
    });

    return { array_notifications, removeItem };
  },
});
</script>

<style scoped></style>
