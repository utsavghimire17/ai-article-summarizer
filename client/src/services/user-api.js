
import axios from 'axios';
import { SERVICE_URLS } from '../constants/config.js';

const API_URL = 'http://localhost:8000'
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'content-type' : 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
)


axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response)
    },
    function(error){
        return Promise.reject(processError(error))
    }
)

const processResponse = (response) => {
    if (response?.status === 200){
        return {isSuccess: true, data: response.data}
    }else{
        return{
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    const errorCode = error.response.data.code
    if (error.response){
        // Request made and server responded with a status other than what falls out of the range 200
        console.log('ERROR IN RESPONSE: ', error.toJSON)
        return{
            isError: true,
            code: errorCode,
            message: error.response.data.message
           
        }
    }else if (error.request){
        // Request made and no response was received
        console.log('ERROR IN REQUEST: ', error.toJSON)
        return{
            isError: true
        }
    }else{
         // No response or request in error
         console.log('ERROR IN NETWORK: ', error.toJSON)
        return{
            isError: true
        }
    }
}
console.log(axiosInstance)
const API = {}

//Creating a function which is making the call and assigning the function as value to each key in the SERVICE_URLS object. In this case signup key has a function AxiosInstance which in turn is a instance of axios.create() that is making the request. To trigger the request we just call API.key(parameter for the function)

for (const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body,params) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            params: params,
            responseType: value.responseType
        })
    }

export { API };