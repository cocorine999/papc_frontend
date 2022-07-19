import Activite from './activite';

import {
    SET_LIST as SET_LIST_PROJET,
    ADD as ADD_NEW_PROJET,
    FILL,
    MODIFY as MODIFY_PROJET,
    REMOVE as REMOVE_PROJET
} from "@/store/mutations.type";

export default {

    [SET_LIST_PROJET](state, lists) {
        state.lists = lists
        localStorage.setItem('activites', JSON.stringify(lists))
    },

    [FILL](state, activite) {
        state.activite = new Activite(activite)
    },

    [ADD_NEW_PROJET](state, activite) {
        state.lists.unshift(activite)
    },

    [MODIFY_PROJET](state, activite) {

        let activites = state.lists.map(item => {
            if(item.id === activite?.id){
                item = activite
            }
            return item
        })

        state.lists = [...activites]

        localStorage.setItem('activites', JSON.stringify(state.lists))
    },

    [REMOVE_PROJET](state, idActivite) {
        let activites = state.lists.filter(item => {
            return item.id !== idActivite
        });
    
        state.lists = [...activites]
        localStorage.setItem('activites', JSON.stringify(state.lists))
    },
};
