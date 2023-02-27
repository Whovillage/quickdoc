<template>
  <v-container
    class="w-50 d-flex flex-column justify-center align-center rounded-lg"
    style="background-color: rgba(0, 0, 0, 0.2)"
  >
    <h2 class="mt-2 ml-4 align-self-start text-h4 text-grey">QuickDoc</h2>
    <v-container class="pb-0 d-flex justify-space-between">
      <v-btn color="#405c99" class="text-white" @click="emit('resetSummary')"
        ><v-icon icon="mdi-arrow-left" class="mr-2"></v-icon> Tagasi
      </v-btn>
      <v-btn :color="copyBtnColor" class="text-white" @click="copy"
        >{{ copyBtnText }} <v-icon :icon="copyBtnIcon" class="ml-2"></v-icon>
      </v-btn>
    </v-container>
    <v-container class="w-100 px-4 pb-0">
      <v-textarea
        v-model="editedSummary"
        auto-grow
        rows="15"
        bg-color="rgba(220, 220, 220)"
        label="Tee vajalikud muudatused ja kopeeri kokkuvõte"
        variant="solo"
        class="h-25"
      ></v-textarea>
    </v-container>
  </v-container>
</template>

<script setup>
const props = defineProps({
  summary: String,
});

const editedSummary = ref(props.summary);
const copyBtnColor = ref("#405c99");
const copyBtnText = ref("Kopeeri");
const copyBtnIcon = ref("mdi-content-copy");

const emit = defineEmits(["resetSummary"]);

const copy = async () => {
  try {
    await navigator.clipboard.writeText(editedSummary.value);
    copyBtnColor.value = "#033b06";
    copyBtnText.value = "Nice";
    copyBtnIcon.value = "mdi-check";
    setTimeout(() => {
      copyBtnColor.value = "#405c99";
      copyBtnText.value = "Kopeeri";
      copyBtnIcon.value = "mdi-content-copy";
    }, 2000);
  } catch ($e) {
    alert("Cannot copy: ", $e);
  }
};
</script>
