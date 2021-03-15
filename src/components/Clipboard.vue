<template>
  <div class="flex flex-col space-y-2">
    <span class="text-sm text-center lg:text-left opacity-75">
      Bookmark this URL to save your setup
    </span>
    <div class="ml-auto flex w-full">
      <input
        disabled
        type="text"
        class="w-full bg-darkish text-white text-opacity-50 border-none rounded-l-xl z-10"
        :value="url"
      />
      <div class="relative z-0">
        <transition
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-14"
          leave-active-class="transform transition-transform duration-500 delay-500 ease-in-out"
        >
          <div
            v-if="success"
            class="w-full h-full absolute top-0 left-0 bg-gain text-dark font-semibold px-3 py-2 rounded-r-xl text-center"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </transition>
        <button
          v-clipboard="url"
          v-clipboard:success="onSuccess"
          v-clipboard:error="onError"
          class="bg-primary hover:bg-opacity-90 focus:outline-none transition-all duration-100 text-dark font-semibold px-3 py-2 rounded-r-xl"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
            <path
              d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  Ref,
  ref,
  nextTick,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup: () => {
    const store = useStore();
    const success: Ref<boolean> = ref(false);
    async function onSuccess(): Promise<void> {
      success.value = true;
      await nextTick;
      success.value = false;
    }
    const url: ComputedRef<string> = computed(
      () =>
        `https://tendiecalc.com?targetPrice=${store.state.setup.targetPrice}&shares=${store.state.setup.shares}&averageCost=${store.state.setup.averageCost}&taxRate=${store.state.setup.taxRate}&currency=${store.state.setup.currency}`
    );
    return {
      success,
      onSuccess,
      url,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
