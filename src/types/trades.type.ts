export type TradesDatum = {
  s?: string, // Symbol
  p?: number, // Last price
  t?: number, // UNIX timestamp
  v?: number, // Volume
  c?: any    // Trade conditions. See https://docs.google.com/spreadsheets/d/1PUxiSWPHSODbaTaoL2Vef6DgU-yFtlRGZf19oBb9Hp0/edit#gid=0
}

export type Trades = {
  type?: string,
  data?: [TradesDatum]
}