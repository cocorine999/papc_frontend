
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import Sinistre from './sinistre'

const state = () => ({
  errors: [],
  sinistres: {
    "currentPage" : null,
    "data" : [],
    "firstPageURL" : null,
    "from" : null,
    "lastPage" : null,
    "lastPageURL" : null,
    "links" : null,
    "nextPageURL" : null,
    "path" : null,
    "perPage" : null,
    "prevPage" : null,
    "from" : null,
    "total" : null
  },
  lists: [],
  sinistre : new Sinistre()
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
