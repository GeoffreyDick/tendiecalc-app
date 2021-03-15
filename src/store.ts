import currency from 'currency.js'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { Currency } from './types/currency.enum'
import { Exchange } from './types/exchange.type'
import { Quote } from './types/quote.type'
import { Setup, SetupKeys } from './types/setup.type'
import { Trades } from './types/trades.type'

// Define typings
export interface State {
  setup: Setup,
  quote: Quote,
  trades: Trades
  exchange: Exchange
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
    exchange: {
      base: Currency.USD,
      date: '',
      rates: {
        AUD: 0,
        BGN: 0,
        BRL: 0,
        CAD: 0,
        CHF: 0,
        CNY: 0,
        CZK: 0,
        DKK: 0,
        GBP: 0,
        HKD: 0,
        HRK: 0,
        HUF: 0,
        IDR: 0,
        ILS: 0,
        INR: 0,
        ISK: 0,
        JPY: 0,
        KRW: 0,
        MXN: 0,
        MYR: 0,
        NOK: 0,
        NZD: 0,
        PHP: 0,
        PLN: 0,
        RON: 0,
        RUB: 0,
        SEK: 0,
        SGD: 0,
        THB: 0,
        TRY: 0,
        USD: 0,
        ZAR: 0
      }
    }
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
    },
    getExchangeRate: (state: State): number => {
      return state.exchange.rates[state.setup.currency]
    },
    getTotalCost: (state: State): any => {
      return currency(state.setup.averageCost).multiply(state.setup.shares).value
    },
    getCurrencyOptions: (state: State): any => {
      return {
        symbol: `${state.setup.currency} `,
        precision: 2
      }
    }
  },
  mutations: {
    SET_QUOTE(state: State, payload: Quote) {
      state.quote = payload
    },
    SET_TRADES(state: State, payload: Trades) {
      state.trades = payload;
    },
    SET_EXCHANGE(state: State, payload: Exchange) {
      state.exchange = payload
    },
    // TODO: Learn Typescript index signatures and get this to work
    // SET_SETUP(state: State, payload: { key: string, value: string | number }) {
    //   state.setup[payload.key] = payload.data
    // }
    SET_SETUP_TARGET_PRICE(state: State, payload: number) {
      state.setup.targetPrice = payload
    },
    SET_SETUP_SHARES(state: State, payload: number) {
      state.setup.shares = payload
    },
    SET_SETUP_AVERAGE_COST(state: State, payload: number) {
      state.setup.averageCost = payload
    },
    SET_SETUP_TAX_RATE(state: State, payload: number) {
      state.setup.taxRate = payload
    },
    SET_SETUP_CURRENCY(state: State, payload: Currency) {
      state.setup.currency = payload
    },

  }
})