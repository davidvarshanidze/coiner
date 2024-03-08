import axios from 'axios'
import { create } from 'zustand'

const show_store = create((set) => ({
    graph_data: [],
    fetch_data: async (id) => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
        const graph_data = res.data.prices.map(price => {
            return {
                name: 'Page F',
                uv: 2390,
                pv: 3800,
                amt: 2500,
            };
        })
        console.log(res.data);
    },
}));

export default show_store
