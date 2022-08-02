export default function isUniteeDeGestion ({ next, store }){
    if( store.state.auths.authenticatedUser.type === 'unitee-de-gestion' ){
        return next({
           name: 'projets'
        })
    }
   
    return next()
}