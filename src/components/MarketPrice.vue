<template>
  <section>
    <h2 class="text-3xl font-bold mb-4 lg:mb-8">Market Price</h2>
    <div
      class="bg-darkish rounded-xl p-8 lg:p-16 flex flex-col space-y-4 justify-center"
    >
      <div class="flex flex-col space-y-4">
        <h3 class="text-primary font-medium tracking-wider">
          Gamestop Corporation (GME)
        </h3>
        <span class="text-primary text-3xl lg:text-4xl font-bold">
          {{
            currency($store.getters.getCurrentPrice, {
              symbol: "USD ",
              precision: 2,
            }).format()
          }}</span
        >
        <ProfitLoss
          :profitLoss="$store.getters.getCurrentPrice - $store.state.quote.pc"
          :referencePrice="$store.state.quote.pc"
          symbol="USD"
        />
      </div>
      <!-- <footer
        class="pt-4 border-t-4 border-white border-opacity-10 text-white opacity-50 text-xs"
      >
        Last update from
        {dayjs($intraday.date).tz(exchange.timezone.timezone).format("LT")}
        market time.
      </footer> -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfitLoss from "./ProfitLoss.vue";
import currency from "currency.js";

export default defineComponent({
  components: { ProfitLoss },
  setup: () => {
    return {
      currency,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
