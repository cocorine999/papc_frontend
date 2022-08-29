export default function auth ({ next, store }){

    if( !store.getters['auths/GET_ACCESS_TOKEN'] ){
        return next({
            name: 'index'
        })
    }

    return next();
}