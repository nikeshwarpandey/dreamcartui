import Axios from '../utils/api_client'

export function addToCartAPI(id, quantity) {
    console.log('addToCartAPI...id, quantity....', id, quantity)
    return Axios.post(`/cart/${id}`, { quantity: quantity })
}

export function getCartAPI() {
    return Axios.get('/cart')
}

export function removeFromCartAPI(id) {
    return Axios.patch(`/cart/remove/${id}`)
}

export function increaseProductAPI(id) {
    return Axios.patch(`/cart/increase/${id}`)
}

export function decreaseProductAPI(id) {
    return Axios.patch(`/cart/decrease/${id}`)
}