import Axios from '../utils/api_client';

export function checkoutAPI() {
    return Axios.post("/order/checkout")
}