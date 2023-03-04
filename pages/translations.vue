<template>
  <div>
    <div v-for="t in translations" :key="t.id">
      <div>============================================</div>
      <h3>Translation {{ t.id }}</h3>
      <div>--------------------------------------------</div>
      <div>{{ t.keywords }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.translation }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.englishSummary }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.finnishSummary }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.finalSummary }}</div>
      <div>============================================</div>
      <br />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Translation {
  id: string;
  keywords: string;
  translation: string;
  englishSummary: string;
  finnishSummary: string;
  finalSummary: string;
}

const translations = ref([] as Translation[]);

onMounted(async () => {
  translations.value = await getTranslations();
});

const getTranslations = async () => {
  try {
    const translations = await $fetch("/api/translations");
    return translations;
  } catch (e) {
    console.log(e);
    alert("Viga tõlgete laadimisel. Proovi uuesti.");
  }
};
</script>
