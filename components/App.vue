import { KeywordForm } from '~~/.nuxt/components';

<template>
  <!-- <NavBar /> -->
  <v-main class="mainArea">
    <KeywordForm />
  </v-main>
</template>

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
}
</style>
