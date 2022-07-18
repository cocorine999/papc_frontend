import Composante from './composante';

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
        localStorage.setItem('composantes', JSON.stringify(lists))
    },

    [FILL](state, composante) {
        state.composante = new Composante(composante)
    },

    [ADD_NEW_PROJET](state, composante) {
        state.lists.unshift(composante)
    },

    [MODIFY_PROJET](state, composante) {

        let composantes = state.lists.map(item => {
            if(item.id === composante?.id){
                item = composante
            }
            return item
        })

        state.lists = [...composantes]

        localStorage.setItem('composantes', JSON.stringify(state.lists))
    },

    [REMOVE_PROJET](state, idComposante) {
        let composantes = state.lists.filter(item => {
            return item.id !== idComposante
        });
    
        state.lists = [...composantes]
        localStorage.setItem('composantes', JSON.stringify(state.lists))
    },
};
