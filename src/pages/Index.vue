<template>
  <main>
    <div class="container max-w-7xl lg:py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 lg:py-24">
        <MarketPrice />
        <Setup />
      </div>
      <div class="py-8 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Results
          title="Tendies for 💎🙌"
          :pricePerShare="$store.state.setup.targetPrice"
          spendOnText="Lambos, questionable tattoos, and charity."
        />
        <Results
          title="Tendies for 🧻🙌"
          :pricePerShare="$store.getters.getCurrentPrice"
          spendOnText="student loans, credit card minimum payments, and presents for your wife's boyfriend."
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarketPrice from "../components/MarketPrice.vue";
import Setup from "../components/Setup.vue";
import Results from "../components/Results.vue";

export default defineComponent({
  components: {
    MarketPrice,
    Setup,
    Results,
  },
});
</script>

<style lang="postcss" scoped></style>
