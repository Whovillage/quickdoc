<template>
  <loading
    v-model:active="props.loading"
    :is-full-page="fullPage"
    :loader="loader"
    :color="color"
    :background-color="bgColor"
    :height="height"
    :width="width"
    :opacity="opacity"
  />
</template>

<script setup>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const props = defineProps({
  loading: Boolean,
});

const fullPage = ref(false);
const loader = ref("dots");
const color = ref("#007bff");
const bgColor = "#000000";
const opacity = ref(0.7);
const height = ref(200);
const width = ref(200);
</script>
