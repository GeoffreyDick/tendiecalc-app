<template>
  <AppNav />
  <router-view class="flex-grow" />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import AppNav from "./components/AppNav.vue";
import AppFooter from "./components/AppFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    AppNav,
    AppFooter,
  },
  setup: () => {
    const store = useStore();
    const route = useRoute();

    let socket: any;

    // Unsubscribe
    const unsubscribe = (symbol: string) => {
      socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
    };

    const symbol: string = "GME";

    watch(
      () => route.query,
      (newValue) => {
        const {
          targetPrice,
          shares,
          averageCost,
          taxRate,
          currency,
        } = newValue;

        if (targetPrice) {
          store.commit("SET_SETUP_TARGET_PRICE", targetPrice);
        }
        if (shares) {
          store.commit("SET_SETUP_SHARES", shares);
        }
        if (averageCost) {
          store.commit("SET_SETUP_AVERAGE_COST", averageCost);
        }
        if (taxRate) {
          store.commit("SET_SETUP_TAX_RATE", taxRate);
        }
        if (currency) {
          store.commit("SET_SETUP_CURRENCY", currency);
        }
      }
    );

    onMounted(() => {
      // Get exchange rates
      axios
        .get("https://api.exchangeratesapi.io/latest?base=USD")
        .then((response: any) => {
          store.commit("SET_EXCHANGE", response.data);
        });

      // Get initial quote before WebSocket is connected
      axios.get("/api/quote").then((response: any) => {
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
