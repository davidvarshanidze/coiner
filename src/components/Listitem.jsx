import React from 'react'
import { Link } from 'react-router-dom'

export default function Listitem({coin}) {
  return (
    <div>
        <Link to={`/${coin.id}`}>{coin.name}</Link>
    </div>
  )
}
