<template>
  <v-form
    class="w-50 d-flex flex-column justify-center align-center rounded-lg"
    @keydown.enter.prevent="save"
  >
    <v-text-field
      v-model="username"
      class="w-50"
      label="Enter username"
      autofocus
      bg-color="rgba(220, 220, 220)"
    ></v-text-field>
    <v-btn @click="save" color="#405c99" class="text-white">Logi sisse</v-btn>
  </v-form>
</template>

<script setup>
const username = ref("");

const emit = defineEmits(["saveUsername"]);

const save = () => {
  console.log(username.value);
  emit("saveUsername", username.value);
};
</script>
