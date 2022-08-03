import Sinistre from './sinistre';

import {
    SET_LIST as SET_LIST_SINISTRE,
    ADD as ADD_NEW_SINISTRE,
    FILL,
    MODIFY as MODIFY_SINISTRE,
    REMOVE as REMOVE_SINISTRE,
} from "@/store/mutations.type";

export default {

    [SET_LIST_SINISTRE](state, lists) {
        state.lists = lists
        localStorage.setItem('sinistres', JSON.stringify(lists))
    },

    [FILL](state, sinistre) {
        state.sinistre = new Role(sinistre)
    },

    [ADD_NEW_SINISTRE](state, sinistre) {
        state.lists.unshift(sinistre)
    },

    [MODIFY_SINISTRE](state, sinistre) {

        let sinistres = state.lists.map(item => {
            if(item.id === sinistre?.id){
                item = sinistre
            }
            return item
        })

        state.lists = [...sinistres]

        localStorage.setItem('sinistres', JSON.stringify(state.lists))
    },

    [REMOVE_SINISTRE](state, idSinistre) {
        let sinistres = state.lists.filter(item => {
            return item.id !== idSinistre
        });
        state.lists = [...sinistres]
        localStorage.setItem('sinistres', JSON.stringify(state.lists))
    },
};
