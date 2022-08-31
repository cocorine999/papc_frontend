export default function isBailleur ({ next, store }){
    if( store.state.auths.authenticatedUser.type === 'bailleur' ){
        return next({
           name: 'dashboard_bailleur'
        })
    }
   
    return next()
}



