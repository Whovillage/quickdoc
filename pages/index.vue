<template>
  <v-main class="mainArea">
    <LoginForm v-if="!username" @saveUsername="setUsername" />
    <KeywordForm
      v-else-if="!summary.text"
      :username="username"
      @summary="setSummary"
    />
    <ResultModal
      v-else
      :summary="summary"
      :username="username"
      @resetSummary="resetSummary"
    />
  </v-main>
</template>

<script setup>
const username = ref("");
const summary = ref({});
const resetSummary = () => (summary.value = {});
const setSummary = (newSummary) => (summary.value = newSummary);
const setUsername = (newUsername) => {
  username.value = newUsername;
  console.log(username.value);
};
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
