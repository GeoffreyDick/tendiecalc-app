<template>
  <nav
    class="container max-w-7xl pt-4 lg:pt-12 flex flex-col space-y-4 sm:flex-row justify-between sm:items-center"
  >
    <div class="flex space-x-4 items-end">
      <img
        class="h-12 lg:h-14"
        src="/favicon/android-chrome-192x192.png"
        alt="Gorilla Emoji"
      />
      <h1 class="text-3xl lg:text-5xl font-bold">TendieCalc</h1>
    </div>
    <Clipboard />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Clipboard from "./Clipboard.vue";

export default defineComponent({
  components: {
    Clipboard,
  },
});
</script>

<style
  lang="po
Clipboardstcss"
  scoped
></style>
