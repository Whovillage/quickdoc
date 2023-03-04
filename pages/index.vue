<template>
  <v-main class="mainArea">
    <KeywordForm v-if="!summary.text" @summary="setSummary" />
    <ResultModal v-else :summary="summary" @resetSummary="resetSummary" />
  </v-main>
</template>

<script setup>
const summary = ref({});
const resetSummary = () => (summary.value = {});
const setSummary = (newSummary) => (summary.value = newSummary);
</script>

<style scoped>
.mainArea {
  background: rgb(33, 55, 105);
  background: linear-gradient(
    130deg,
    rgba(33, 55, 105, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
</style>
