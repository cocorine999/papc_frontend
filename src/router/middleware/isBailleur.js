export default function isBailleur ({ next, store }){
    console.log('le role du bailleur',store.state.auths.authenticateUser)
    const auth = store.state.auths
    if( auth.type === 'bailleur' ){
        return next({
           name: 'dashboard_bailleur'
        })
    }
   
    return next()
}



