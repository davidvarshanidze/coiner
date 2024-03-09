import axios from 'axios'
import { create } from 'zustand'

const show_store = create((set) => ({
    graph_data: [],

    fetch_data: async (id) => {
        const [graph_res, data_res] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=121`),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`),
        ])

        const graph_data = graph_res.data.prices.map(price => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-uk")
            return {
                Date: date,
                Price: p,
            };
        });
        console.log(data_res)
        set({graph_data})
    },
}));

export default show_store
