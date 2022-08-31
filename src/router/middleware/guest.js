import router from "../../router";

export default function guest ({ next, store,from }){
    
    if(store.getters['auths/GET_ACCESS_TOKEN']){
        return router.back()
    }
    return next()
}
