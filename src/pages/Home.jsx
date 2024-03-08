import React from 'react'
import home_store from '../stores/home_store'
import { Link } from 'react-router-dom'

export default function Home() {
  const store = home_store()
  
  React.useEffect(() => {
    store.fetch_coins()
  }, [])
  
  return (
    <div>
      <input type="text" value={store.query} onChange={store.set_query}/>
      {store.coins.map(coin => {
        return (
          <div key={coin.id}>
            <Link to={`/${coin.id}`}>
              {coin.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
