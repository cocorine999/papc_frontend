export default {

    SET_AUTH_DATA(state, user) {
        localStorage.setItem('authenticateUser', JSON.stringify(user))
        state.authenticateUser = user
    },

    SET_ACCESS_TOKEN (state, access_token) {
        localStorage.setItem('access_token', JSON.stringify(access_token))
        state.access_token = access_token
    },

    RESET_AUTH_DATA(state) {    
        
        if( localStorage.key("authenticateUser") )
            localStorage.removeItem('authenticateUser')

        if( localStorage.key("access_token") )
            localStorage.removeItem('access_token')

        state.access_token = null

        state.authenticateUser = null
        
    },
};
