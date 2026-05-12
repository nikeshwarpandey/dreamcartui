
import Axios from '../utils/api_client'
import { useQuery } from '@tanstack/react-query'


const useData = (endpoint, customConfig = {}, queryKey, staleTime = 1 * 60 * 1000) => {
    const fetchFunction = async () => {
        try {
            const res = await Axios.get(endpoint, customConfig)
            return res.data
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error.message)
            throw new Error(error.response?.data?.message || error.message || 'Failed to fetch data')
        }
    }

    return useQuery({
        queryKey: queryKey,
        queryFn: fetchFunction,
        staleTime: staleTime,
        retry: 1,
    })
}

export default useData