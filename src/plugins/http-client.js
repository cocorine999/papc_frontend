import axios from "axios"

import { API_BASE_URL } from "@/services/configs/environment";

import {
  SET_LOADER,
  SET_ERRORS_MESSAGE
} from '@/store/mutations.type';

import store from  "@/store/index"

/**
 * Axios basic configuration
 * Some general configuration can be added like timeout, headers, params etc. More details can be found on https://github.com/axios/axios
 * */
const config = {
  baseURL: API_BASE_URL.DEVELOPMENT + "/api/" || API_BASE_URL.STAGGING + "/api/" || API_BASE_URL.DEPLOYMENT + "/api/" || "",
  timeout: 60 * 1000, // Timeout
  //withCredentials: true, // Check cross-site Access-Control,
  headers: {
    common: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, X-Token-Auth, Authorization'
    }
  }
};

/**
 * Creating the instance of Axios
 * It is because, in large scale application we may need to consume APIs from more than single server,
 * So, may need to create multiple http client with different config
 * Only this client will be used rather than axios in the application
 **/
const httpClient = axios.create(config);

/**
 * Auth interceptors
 * @description Configuration related to AUTH token can be done in interceptors.
 * Currenlty it is just doing nothing but idea to to show the capability of axios and its interceptors
 * In future, interceptors can be created into separate files and consumed into multiple http clients
 * @param {*} config
 */
const authInterceptor = config => {
  /** add auth token */
  return config;
};

const loggerInterceptor = config => {
  /** Add logging here */ 
  return config;
};

/** Adding the request interceptors */
/* 
  httpClient.interceptors.request.use(authInterceptor);
  httpClient.interceptors.request.use(loggerInterceptor); 
*/

/** Adding the request interceptors */
httpClient.interceptors.request.use(config =>{

  store.commit(SET_LOADER, true)

    let token = store.getters['auths/GET_ACCESS_TOKEN'] // modules.auths?.getters?.GET_ACCESS_TOKEN(modules.auths.state)

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // ici les anciennes erreures sont écrasées
    store.commit(SET_ERRORS_MESSAGE, {message : null, errors: []})

    return config;
  }
);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  
  response => {

    console.log(response.data.data)

    store.commit(SET_LOADER, false)
    
    return response;
  },
  error => {

    store.commit(SET_LOADER, false)

    /** Do something with response error */
            
    console.log(error.response?.data)

    const statutCode = parseInt(error.response && error.response?.status)

    store.commit(SET_ERRORS_MESSAGE, {message : error.response?.data?.message, errors: error.response?.data?.errors})

    switch (statutCode ?? 500) {

      case 400:
        //redirect('/400')
        break;

      case 401:
        /* 
          modules.auths.mutations.RESET_AUTH_DATA(modules.auths.state)

          window.location.href ='/' 
        */
        
        store.commit("RESET_AUTH_DATA")
       
        break;

      case 404:
        alert(error.response?.data?.message)
        break;

      case 422:
        store.commit(SET_ERRORS_MESSAGE, {message : error.response?.data?.message, errors: error.response?.data?.errors})
        break;
    
      default:
        alert(error.response?.data?.message)
        break;
    }

    /** Do something with response error */
    return Promise.reject(error);
  }
);

export { httpClient };
