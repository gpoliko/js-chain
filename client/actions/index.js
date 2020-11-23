import { fetchAllBeers } from '../api/api'

export const NAVIGATE = 'NAVIGATE'
export const ADD_TO_CART = 'ADD_TO_CART'

export const navigate = target => {
  return {
    type: NAVIGATE,
    target: target
  }
}

export const addToCart = (id, name) => {
  return {
    type: ADD_TO_CART,
    id: id,
    name: name
  }
}