import React from 'react'
import home_store from '../stores/home_store'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Listitem from '../components/Listitem'

export default function Home() {
  const store = home_store()
  
  React.useEffect(() => {
    store.fetch_coins()
  }, [])
  
  return (
    <div>
      <Header />
      <header className='home_search'>
        <div className="width">
          <h2>Search for a coin</h2>
          <input type="text" value={store.query} onChange={store.set}/>
        </div>
      </header>
      <div>
      {store.coins.map(coin => {
        return (
          <Listitem key={coin.id} coin={coin} />
        );
      })}
      </div>
    </div>
  );
}
