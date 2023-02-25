<template>
  <v-form>
    <v-container class="pb-0">
      <v-textarea
        v-model="wordList"
        label="Sisesta märksõna või fraas ja valjuta enter"
        variant="solo"
      ></v-textarea>
    </v-container>
    <v-btn color="#f2dea7" class="ml-4" @click="printer">Generate </v-btn>
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
kõhulahtisus
varem sellist valu pole olnud
palpatsioonil valu alakõhus
alkoholi ei tarbi
suitsetaja
võtnud ibuprofeeni`);

async function printer() {
  const summary = await $fetch("/api/generateSummary", {
    method: "POST",
    body: JSON.stringify(wordList.value),
  });

  wordList.value = summary.trim();
}
</script>
