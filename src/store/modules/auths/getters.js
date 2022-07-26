
export default {

    GET_AUTHENTICATE_USER : state => {

        return state.authenticateUser

                ? state.authenticateUser

                : localStorage.getItem('authenticateUser')

                ? JSON.parse(localStorage.getItem('authenticateUser'))

                : null
    },


    GET_ACCESS_TOKEN : state => {

        return state.access_token 

                ? state.access_token

                : localStorage.getItem('access_token')

                ? state.access_token = JSON.parse(localStorage.getItem('access_token'))

                : null
    },

    IS_AUTHENTICATED : state => {
        return this.GET_ACCESS_TOKEN(state) ? true : null;
    },

}