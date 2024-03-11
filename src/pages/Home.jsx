import React from 'react'
import home_store from '../stores/home_store'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Listitem from '../components/Listitem'
import classNames from 'classnames'

export default function Home() {
  const store = home_store()
  
  React.useEffect(() => {
    if (store.trending.length === 0) store.fetch_coins()
  }, [])
  
  return (
    <div>
      <Header />
      <header className='home_search'>
        <div className="width">
          <h2>Search for a coin</h2>
          <div className={classNames("home_search_input", {searching: store.searching})}>
            <input type="text" value={store.query} onChange={store.set_query}/>
            <img width="20px" src='./spinner.svg'/>
          </div>
        </div>
      </header>
      <div className='home_cryptos'>
        <div className='width'>
          <h2>{store.searched ? 'Search results' : 'Trending Coins'}</h2>
          <div className="home_cryptos_list">
          {store.coins.map((coin) => {
            return <Listitem key={coin.id} coin={coin} />
          })} 
          </div>
        </div>
      </div>
    </div>
  );
}
