<template>
  <div class="flex flex-col space-y-1 lg:space-y-2">
    <label :for="name" class="text-sm lg:text-md opacity-75">{{ label }}</label>
    <div
      class="flex h-10 rounded-xl focus-within:ring-4 focus-within:ring-primary focus-within:ring-opacity-25"
    >
      <div
        v-if="prefix"
        class="h-full px-2 lg:px-4 rounded-l-xl bg-primary text-dark text-sm font-semibold flex flex-col justify-around"
      >
        {{ prefix }}
      </div>
      <select
        @input="handleInput"
        :name="name"
        :value="modelValue"
        :class="prefix ? 'rounded-r-xl' : 'rounded-xl'"
        class="w-full h-full border-none bg-darkish text-primary focus:ring-transparent"
      >
        <option v-for="(option, i) in options" :key="i" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Currency } from "../../types/currency.enum";

export default defineComponent({
  name: "InputNumber",
  props: {
    modelValue: {
      type: String as () => Currency,
      default: undefined,
    },
    name: {
      type: String,
      default: "noName",
    },
    label: {
      type: String,
      default: "No Label",
    },
    prefix: {
      type: String,
      default: undefined,
    },
    options: {
      type: Array,
      default: ["No Options"],
    },
  },
  emits: ["update:modelValue"],
  setup: (_, { emit }) => {
    function handleInput(e: any) {
      emit("update:modelValue", e.currentTarget.value);
    }
    return {
      handleInput,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
