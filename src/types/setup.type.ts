import { Currency } from "./currency.enum";

export type Setup = {
  targetPrice: number,
  shares: number,
  averageCost: number,
  taxRate: number, // As a percentage
  currency: Currency
}

export interface SetupKeys {
  [key: string]: Setup
};