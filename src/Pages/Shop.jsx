import React from 'react'
import Popular from '../Components/Popular/Popular';
import NewCollection from '../Components/NewCollection/NewCollection';

import SaleBanner from '../Components/SaleBanner/SaleBanner'

const Shop = () => {
  return (
    <div>
      <SaleBanner/>
      <Popular/>
      <NewCollection/>
    </div>
  )
}

export default Shop
