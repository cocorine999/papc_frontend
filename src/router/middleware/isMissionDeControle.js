export default function isMissionDeControle ({ next, store }){
    if( store.state.auths.authenticatedUser.type === 'mission-de-controle' ){
        return next({
           name: 'missioncontrole_mo'
        })
    }
   
    return next()
}
