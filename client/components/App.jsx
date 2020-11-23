import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Header from './Header'
import BeerList from './BeerList'
import Cart from './Cart'

const mapStateToProps = state => {
  console.log(state)
  return {
      
  }
}

// This might need to be turned into a stateful (class-based) component
const App = props => (
  <div className='app'>
    <Header />
    {props.currentDir === 'listing'
      ? <Route exact path='/' component={BeerList} />
      : <Route path='/' component={Cart} />}
  </div>
)

export default connect(mapStateToProps)(App)