import axios from 'axios'
import { create } from 'zustand'
import debounce from '../helpers/debounce'

const home_store = create((set) => ({
    coins: [],
    trending: [],
    query: '',

    set_query: (e) => {
        set({query: e.target.value})
        home_store.getState().search_coins()
    },
    
    search_coins: debounce(async () => {
        const {query, trending} = home_store.getState()
        if (query.length > 2) {
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        const coins = res.data.coins.map(coin => {
            return {
                name: coin.name,
                image: coin.large,
                id: coin.id,
            }
        })
        set({coins})
    } else {
        set({coins: trending})
    }
    }, 500),

    fetch_coins: async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
        const coins = res.data.coins.map(coin => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                price_btc: coin.item.price_btc,
            }
        })
        set({coins, trending: coins})
    }
}))

export default home_store
