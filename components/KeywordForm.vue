<template>
  <v-form
    class="w-50 d-flex flex-column justify-center align-center rounded-lg"
    style="background-color: rgba(0, 0, 0, 0.2)"
  >
    <h2 class="mt-2 ml-4 align-self-start text-h4 text-grey">QuickDoc</h2>
    <v-container class="d-flex justify-start pb-0">
      <v-select
        label="Sisendkeel"
        :items="['Eesti', 'Soome']"
        class="languageSelect"
        bg-color="rgba(255, 255, 255, 0.2)"
        v-model="inputLanguage"
      ></v-select>
      <v-select
        label="Väljundkeel"
        :items="['Eesti', 'Soome']"
        class="languageSelect"
        bg-color="rgba(255, 255, 255, 0.2)"
        v-model="outputLanguage"
      ></v-select>
    </v-container>
    <v-container class="w-100 px-4">
      <v-textarea
        v-model="wordList"
        @keydown.enter.prevent="addChip"
        auto-grow
        rows="1"
        bg-color="rgba(220, 220, 220)"
        label="Sisesta märksõna või fraas ja valjuta enter"
        variant="solo"
        class="h-25"
      ></v-textarea>
    </v-container>
    <v-container class="w-100 px-4 py-0">
      <v-chip
        closable
        v-for="(chip, index) in chips"
        :key="index"
        label
        outlined
        class="rounded-pill mr-2 mb-2"
        color="white"
        >{{ chip }}</v-chip
      >
    </v-container>
    <v-checkbox
      label="Lisa taaspöördumise meeldetuletus"
      class="text-white align-self-start px-1 py-0"
      v-model="disclaimer"
    ></v-checkbox>
    <v-btn
      color="#405c99"
      class="align-self-end text-white mb-4 mr-4"
      @click="printer"
      >Genereeri Kokkuvõte
    </v-btn>
  </v-form>
</template>

<script setup>
const wordList = ref("");

const inputLanguage = ref("Eesti");
const outputLanguage = ref("Eesti");
const disclaimer = ref(false);
const chips = ref([]);

const printer = async () => {
  const summary = await $fetch("/api/generateSummary", {
    method: "POST",
    body: JSON.stringify(wordList.value),
  });
  wordList.value = summary.trim();
};

const addChip = () => {
  if (wordList.value === "") return;
  chips.value.push(wordList.value);
  wordList.value = "";
};
</script>

<style scoped>
.languageSelect {
  margin: 4px;
  color: white;
  width: 48%;
}
</style>
