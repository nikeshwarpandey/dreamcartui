import Axios from './api_client';

const setAuthToken = (token) => {
    console.log('token...', token)
    if (token) {
        Axios.defaults.headers.common["x-auth-token"] = token
    } else {
        delete Axios.defaults.headers.common["x-auth-token"]
    }
}

export default setAuthToken;