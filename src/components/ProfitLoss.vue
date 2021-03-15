<template>
  <div
    class="flex flex-row space-x-2 font-medium tracking-wider"
    :class="color"
  >
    <span v-if="performance === Performance.GAIN">&blacktriangle;</span>
    <span v-else-if="performance === Performance.LOSS"
      >&blacktriangledown;</span
    >
    <span v-else>&blacktriangle;</span>
    <span>
      {{
        currency(profitLoss, { symbol: `${symbol} `, precision: 2 }).format()
      }}
      ({{ percentChange.toFixed(2) }}%)
    </span>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import currency from "currency.js";

enum Performance {
  GAIN = "gain",
  LOSS = "loss",
  EVEN = "even",
}

export default defineComponent({
  name: "ProfitLoss",
  props: {
    profitLoss: {
      type: Number,
      default: 0,
    },
    referencePrice: {
      type: Number,
      default: 0,
    },
    symbol: {
      type: String,
      default: "USD",
    },
  },
  setup: (props) => {
    const symbols: Ref<{ gain: string; loss: string; even: string }> = ref({
      gain: "&blacktriangle;",
      loss: "&blacktriangledown;",
      even: "&#8210;",
    });
    const performance: ComputedRef<Performance> = computed(
      (): Performance => {
        if (props.profitLoss > 0) {
          return Performance.GAIN;
        } else if (props.profitLoss < 0) {
          return Performance.LOSS;
        } else {
          return Performance.EVEN;
        }
      }
    );
    const percentChange: ComputedRef<number> = computed((): number => {
      return (props.profitLoss / props.referencePrice) * 100;
    });
    const color: ComputedRef<string> = computed((): string => {
      if (performance.value === Performance.GAIN) {
        return "text-gain";
      }
      if (performance.value === Performance.LOSS) {
        return "text-loss";
      }
      if (performance.value === Performance.EVEN) {
        return "text-even";
      }
    });

    return {
      symbols,
      performance,
      percentChange,
      currency,
      Performance,
      color,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
