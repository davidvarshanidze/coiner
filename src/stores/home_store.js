import axios from 'axios'
import { create } from 'zustand'
import debounce from '../helpers/debounce'

const home_store = create((set) => ({
  coins: [],
  trending: [],
  query: "",
  searching: false,
  searched: false,

  set_query: (e) => {
    set({ query: e.target.value })
    home_store.getState().search_coins()
  },

  search_coins: debounce(async () => {
    set({ searching: true });
    const { query, trending } = home_store.getState()

    if (query.length > 2) {
      const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
      const coins = res.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        }
      })
      set({ coins, searching: false, searched: true })
    } else {
      set({ coins: trending, searching: false, searched: false })
    }
  }, 500),

  fetch_coins: async () => {
    const [res, btc_res] = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/search/trending'),
      axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
    ])

    const btc_price = btc_res.data.bitcoin.usd;
    console.log(btc_price)

    const coins = res.data.coins.map(coin => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        price_btc: (coin.item.price_btc).toFixed(10),
        price_usd: (coin.item.price_btc * btc_price).toFixed(10),
      }
    })
    console.log(coins)
    set({ coins, trending: coins })
  }
}))

export default home_store
