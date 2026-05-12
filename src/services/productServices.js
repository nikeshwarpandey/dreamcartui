import Axios from '../utils/api_client';

export function getSuggestionsAPI(search) {
    return Axios.get(`/products/suggestions?search=${search}`)
}