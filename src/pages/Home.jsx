import React from 'react'
import home_store from '../stores/home_store'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function Home() {
  const store = home_store()
  
  React.useEffect(() => {
    store.fetch_coins()
  }, [])
  
  return (
    <div>
      <Header />
      <input type="text" value={store.query} onChange={store.set}/>
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
