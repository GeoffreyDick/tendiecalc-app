<template></template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  setup: () => {
    const store = useStore();

    let socket: any;

    // Unsubscribe
    const unsubscribe = (symbol: string) => {
      socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
    };

    const symbol: string = "GME";

    onMounted(() => {
      // Get exchange rates
      axios
        .get("https://api.exchangeratesapi.io/latest?base=USD")
        .then((response: any) => {
          store.commit("SET_EXCHANGE", response.data);
        });

      // Get initial quote before WebSocket is connected
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
        store.commit("SET_TRADES", JSON.parse(event.data));
      });
    });

    onUnmounted(() => {
      unsubscribe(symbol);
    });
  },
});
</script>

<style></style>
