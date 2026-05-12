
import Axios from '../utils/api_client'
import { useQuery } from '@tanstack/react-query'


const useData = (endpoint, customConfig = {}, queryKey, staleTime = 1 * 60 * 1000) => {
    const fetchFunction = () => Axios.get(endpoint, customConfig).then(res => res.data)

    return useQuery({
        queryKey: queryKey,
        queryFn: fetchFunction,
        staleTime: staleTime
    })
}

export default useData