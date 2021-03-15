import { VercelRequest, VercelResponse } from '@vercel/node'
const axios = require('axios');

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=GME&token=${process.env.FINNHUB_API_KEY}`).then(({data}: {data: any}) => data)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}
