<template>
  <section>
    <h2 class="text-3xl font-bold mb-4 lg:mb-8">Setup</h2>
    <div class="space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <InputNumber
          name="targetPrice"
          label="What is NOT A MEME?"
          prefix="$USD"
          v-model.number="targetPrice"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 md:gap-8">
        <InputNumber
          name="shares"
          label="Number of Shares"
          prefix="#"
          v-model.number="shares"
        />
        <InputNumber
          name="averageCost"
          label="Average Cost"
          prefix="$USD"
          v-model.number="averageCost"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 md:gap-8">
        <InputNumber
          name="taxRate"
          label="Expected Tax Rate"
          prefix="%"
          v-model.number="taxRate"
        />
        <InputSelect
          name="currency"
          label="Your currency"
          :options="Object.keys($store.state.exchange.rates)"
          v-model="currency"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, WritableComputedRef } from "vue";
import { useStore } from "vuex";
import { Currency } from "../types/currency.enum";
import InputNumber from "./inputs/InputNumber.vue";
import InputSelect from "./inputs/InputSelect.vue";

export default defineComponent({
  name: "Setup",
  components: { InputNumber, InputSelect },
  setup: () => {
    const store = useStore();

    const targetPrice: WritableComputedRef<number> = computed({
      get(): number {
        return store.state.setup.targetPrice;
      },
      set(newValue: number): void {
        store.commit("SET_SETUP_TARGET_PRICE", newValue);
      },
    });
    const shares: WritableComputedRef<number> = computed({
      get(): number {
        return store.state.setup.shares;
      },
      set(newValue: number): void {
        store.commit("SET_SETUP_SHARES", newValue);
      },
    });
    const averageCost: WritableComputedRef<number> = computed({
      get(): number {
        return store.state.setup.averageCost;
      },
      set(newValue: number): void {
        store.commit("SET_SETUP_AVERAGE_COST", newValue);
      },
    });
    const taxRate: WritableComputedRef<number> = computed({
      get(): number {
        return store.state.setup.taxRate;
      },
      set(newValue: number): void {
        store.commit("SET_SETUP_TAX_RATE", newValue);
      },
    });
    const currency: WritableComputedRef<Currency> = computed({
      get(): Currency {
        return store.state.setup.currency;
      },
      set(newValue: Currency): void {
        store.commit("SET_SETUP_CURRENCY", newValue);
      },
    });

    return {
      targetPrice,
      shares,
      averageCost,
      taxRate,
      currency,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
