import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { Currency } from './types/currency.enum'
import { Quote } from './types/quote.type'
import { Setup } from './types/setup.type'
import { Trades } from './types/trades.type'

// Define typings
export interface State {
  setup: Setup,
  quote: Quote,
  trades: Trades
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

// Create a new store instance.
export const store = createStore<State>({
  state: {
    setup: {
      targetPrice: 500000,
      shares: 1,
      averageCost: 150,
      taxRate: 30,
      currency: Currency.USD
    },
    quote: {},
    trades: {},
  },
  getters: {
    getCurrentPrice: (state: State): number | null => {
      // Return latest trade price, or quote price if none (when market is closed)
      if (state.trades.data?.[0].p) {
        return state.trades.data?.[0].p;
      } else if (state.quote.c) {
        return state.quote.c
      } else {
        return null
      }
    }
  },
  mutations: {
    SET_QUOTE(state: State, payload: Quote) {
      state.quote = payload
    },
    SET_TRADES(state, payload: Trades) {
      state.trades = payload;
    }
  }
})