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
    <v-textarea
      v-model="wordList"
      autogrow="true"
      bg-color="rgba(220, 220, 220)"
      label="Sisesta märksõna või fraas ja valjuta enter"
      variant="solo"
      class="w-100 px-4 h-50"
    ></v-textarea>
    <v-checkbox
      label="Lisa taaspöördumise meeldetuletus"
      class="text-white align-self-start px-1 py-0"
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
const wordList = ref(`Mees
68-aastane
kõhuvalu
2 nädalat
vasakul alakõhus
pimesool opereeritud 10 aastat tagasi
võtnud paratsetamooli
hommikul hullem
ei ole oksendanud
on kõhulahtisus
varem sellist kõhuvalu pole olnud
palpatsioonil valu alakõhus
alkoholi ei tarbi
suitsetaja
võtnud ibuprofeeni`);

const inputLanguage = ref("Eesti");
const outputLanguage = ref("Eesti");
const disclaimer = ref(false);

const printer = async () => {
  const summary = await $fetch("/api/generateSummary", {
    method: "POST",
    body: JSON.stringify(wordList.value),
  });
  wordList.value = summary.trim();
};
</script>

<style scoped>
.languageSelect {
  margin: 4px;
  color: white;
  width: 48%;
}
</style>
