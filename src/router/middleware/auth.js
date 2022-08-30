export default function auth ({ next, store }){

    if( !store.getters['auths/GET_ACCESS_TOKEN'] ){
        return next('/401-non-autorise');
    }

   // return next('/401-non-autorise');
   return next();
   
}