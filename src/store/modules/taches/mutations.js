import Tache from './tache';

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
        localStorage.setItem('taches', JSON.stringify(lists))
    },

    [FILL](state, tache) {
        state.tache = new Tache(tache)
    },

    [ADD_NEW_PROJET](state, tache) {
        state.lists.unshift(tache)
    },

    [MODIFY_PROJET](state, tache) {

        let taches = state.lists.map(item => {
            if(item.id === tache?.id){
                item = tache
            }
            return item
        })

        state.lists = [...taches]

        localStorage.setItem('taches', JSON.stringify(state.lists))
    },

    [REMOVE_PROJET](state, idTache) {
        let taches = state.lists.filter(item => {
            return item.id !== idTache
        });
    
        state.lists = [...taches]
        localStorage.setItem('taches', JSON.stringify(state.lists))
    },
};
