<template>
  <section class="flex flex-col space-y-4">
    <h2 class="text-3xl font-bold">{{ title }}</h2>
    <div
      class="rounded-xl p-8 lg:p-16 bg-darkish flex flex-col space-y-2 lg:space-y-4 overflow-hidden"
    >
      <h3 class="text-primary font-medium tracking-wider">Pre-Tax Value</h3>
      <span class="text-primary text-3xl lg:text-4xl font-bold">{{
        currency(preTaxValue, $store.getters.getCurrencyOptions)
          .multiply($store.getters.getExchangeRate)
          .format()
      }}</span>
      <ProfitLoss
        :profitLoss="profitLoss.value"
        :referencePrice="$store.getters.getTotalCost"
      />
    </div>
    <span class="leading-relaxed"
      >At a {{ $store.state.setup.taxRate }}% tax rate, you will need to set
      aside
      <span class="text-white font-medium tracking-wide opacity-75">{{
        currency(taxes, $store.getters.getCurrencyOptions).format()
      }}</span>
      of your {{ profitLoss <= 0 ? "nonexistent" : null }} tendies for taxes,
      leaving you with
      <span class="text-white font-medium tracking-wide opacity-75">
        {{
          currency(preTaxValue, $store.getters.getCurrencyOptions)
            .subtract(taxes)
            .multiply($store.getters.getExchangeRate)
            .format()
        }}
      </span>
      to spend on {{ spendOnText }}</span
    >
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ProfitLoss from "./ProfitLoss.vue";
import currency from "currency.js";
import { useStore } from "vuex";

export default defineComponent({
  name: "Results",
  components: {
    ProfitLoss,
  },
  props: {
    title: {
      type: String,
      default: "No title",
    },
    pricePerShare: {
      type: Number,
      default: 0,
    },
    spendOnText: {
      type: String,
      default: "something?",
    },
  },
  setup: (props) => {
    const store = useStore();

    // These computed properties remain in the Base Currency until displayed
    const preTaxValue: any = computed(() =>
      currency(props.pricePerShare).multiply(store.state.setup.shares)
    );
    const postTaxValue: any = computed(() =>
      currency(preTaxValue.value).multiply(1 - store.state.setup.taxRate / 100)
    );
    const profitLoss: any = computed(() =>
      currency(preTaxValue.value).subtract(store.getters.getTotalCost)
    );
    const taxes: any = computed(() => {
      if (profitLoss.value > 0) {
        return currency(profitLoss.value, store.getters.getCurrencyOptions)
          .multiply(store.state.setup.taxRate / 100)
          .multiply(store.getters.getExchangeRate);
      } else {
        return currency(0, store.getters.getCurrencyOptions);
      }
    });
    return {
      preTaxValue,
      postTaxValue,
      profitLoss,
      currency,
      taxes,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
