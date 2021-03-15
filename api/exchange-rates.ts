import { VercelRequest, VercelResponse } from '@vercel/node'
const axios = require('axios');

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const response = await axios.get('https://api.exchangeratesapi.io/latest?base=USD').then(({data}) => data)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}
