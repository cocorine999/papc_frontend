export default function guest ({ next, store }){
    
    if(store.getters['auths/GET_ACCESS_TOKEN']){
        return next({
            name: 'projets'
        })
    }

    return next()
}