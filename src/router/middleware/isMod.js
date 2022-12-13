export default function isMod ({ next, store }){
    if( store.state.auths.authenticatedUser.type === 'mod' ){
        return next({
           name: 'collecteur_mod'
        })
    }
   
    return next()
}
