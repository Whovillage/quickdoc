<template>
  <div>
    <div v-for="t in translations" :key="t.id">
      <div>============================================</div>
      <h3>Translation {{ t.string_id }}</h3>
      <div>--------------------------------------------</div>
      <div>{{ t.keywords }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.translation }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.english_summary }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.finnish_summary }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.estonian_summary }}</div>
      <div>--------------------------------------------</div>
      <div>{{ t.corrected_summary }}</div>
      <div>============================================</div>
      <br />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Translation {
  id: string;
  string_id: string;
  keywords: string;
  translation: string;
  english_summary: string;
  finnish_summary?: string;
  estonian_summary?: string;
  corrected_summary?: string;
}

const translations = ref([] as Translation[]);

onMounted(async () => {
  const data = await getTranslations();
  translations.value = data as Translation[];
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
