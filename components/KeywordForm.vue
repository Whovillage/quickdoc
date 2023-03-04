<template>
  <LoadingOverlay :loading="isLoading" />
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
        v-model="currentPhrase"
        @keydown.enter.prevent="addPhrase"
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
        v-for="(phrase, index) in phrases"
        :key="index"
        label
        outlined
        class="rounded-pill mr-2 mb-2"
        color="white"
        >{{ phrase }}</v-chip
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
      @click="generateSummary"
      >Loo Kokkuvõte
    </v-btn>
  </v-form>
</template>

<script setup>
const emit = defineEmits(["summary"]);

const currentPhrase = ref("");
const isLoading = ref(false);

const inputLanguage = ref("Eesti");
const outputLanguage = ref("Eesti");
const disclaimer = ref(true);
const phrases = ref([
  "Mees",
  "70-aastane",
  "Kõhulahtisus",
  "kõhuvalu",
  "2 nädalat",
  "vasaklu alakõhus",
  "hommikul hullem",
  "võtnud paratsetamooli",
  "ei ole oksendanud",
  "pimesool op 10 aastat tagasi",
  "varem sellist valu pole olnud",
  "alkoholi ei tarbi",
  "suitsetaja",
  "võtnud ibuprofeeni",
]);

const generateSummary = async () => {
  isLoading.value = true;
  try {
    const summary = await $fetch("/api/generateSummary", {
      method: "POST",
      body: JSON.stringify({
        keywords: phrases.value,
        useDisclaimers: disclaimer.value,
        inputLanguage: inputLanguage.value,
        outputLanguage: outputLanguage.value,
      }),
    });
    emit("summary", summary.trim());
    isLoading.value = false;
  } catch (e) {
    console.log(e);
    isLoading.value = false;
    alert("Viga kokkuvõtte loomisel. Proovi uuesti.");
  }
};

const addPhrase = () => {
  if (currentPhrase.value === "") return;
  phrases.value.push(currentPhrase.value);
  currentPhrase.value = "";
};
</script>

<style scoped>
.languageSelect {
  margin: 4px;
  color: white;
  width: 48%;
}
</style>
