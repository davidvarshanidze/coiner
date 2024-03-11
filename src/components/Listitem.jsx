import React from 'react'
import { Link } from 'react-router-dom'

export default function Listitem({coin}) {
  return (
    <div className='home_crypto'>
      <Link to={`/${coin.id}`}>
        <span className="home_crypto_image">
          <img src={coin.image} alt='coinimg'/>
        </span>
        <span className="home_crypto_name">{coin.name}</span>

        {coin.price_btc && (<span className="home_crypto_prices">
          <span className='home_crypto_btc'>
            <img src='./bitcoin.webp' alt='btcimg'/>
            {coin.price_btc} BTC</span>
          <span className='home_crypto_usd'>({coin.price_usd} USD)</span>
        </span>)}
      </Link>
    </div>
  );
}
