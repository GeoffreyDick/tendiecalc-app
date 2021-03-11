<template>
  <h1>{{ msg }}</h1>
  <p>{{ $store.state.quote }}</p>
  <p>{{ $store.getters.getCurrentPrice }}</p>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
      >Vetur</a
    >
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p class="text-red-500">See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"
      >Vite Docs</a
    >
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";
import { store } from "../store";
import { useStore } from "vuex";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const store = useStore();

    let socket: any;

    // Unsubscribe
    const unsubscribe = (symbol: string) => {
      socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
    };

    const symbol: string = "GME";

    onMounted(() => {
      axios
        .get(
          "https://finnhub.io/api/v1/quote?symbol=GME&token=c14eajn48v6t40fve2m0"
        )
        .then((response: any) => {
          store.commit("SET_QUOTE", response.data);
        });

      // Define WebSocket
      socket = new WebSocket("wss://ws.finnhub.io?token=c14eajn48v6t40fve2m0");

      // Connection opened -> Subscribe
      socket.addEventListener("open", function (event: any) {
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
      });

      // Listen for messages
      socket.addEventListener("message", function (event: any) {
        store.commit("SET_TRADES", event.data);
      });
    });

    onUnmounted(() => {
      unsubscribe(symbol);
    });
  },
});
</script>

<style scoped></style>
