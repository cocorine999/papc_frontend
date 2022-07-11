import {
    FETCH_LIST as FETCH_LIST_PROJET,
    GET as GET_PROJET,
    STORE as STORE_PROJET,
    UPDATE as UPDATE_PROJET,
    DESTROY as DESTROY_PROJET,
} from "@/store/actions.type"

import {
    SET_LIST as SET_LIST_PROJET,
    FIND as findProjet,
    ADD as ADD_PROJET,
    MODIFY as MODIFY_PROJET,
    REMOVE as REMOVE_PROJET
} from "@/store/mutations.type"

import ProjetService from "@/services/modules/projet.service";

export default {
    
    FETCH_LIST_PROJET : async ({ commit }) => {

        const { data, status } = await ProjetService.get();

        commit(SET_LIST_PROJET, data.data);

        return { data, status };
    },

    async GET_PROJET ({ commit, getters }, {key, value }) {

        let projet = getters.findProjet({key: key, value : value})

        if((projet === null || projet || undefined) && typeof value === "int"){

            const { data, status } = await ProjetService.get(value);

            projet = data.data

            return projet
        }
    },

    async STORE_PROJET ({ commit }, payload) {
        
        const { data, status } = await ProjetService.create(payload);

        commit(ADD_PROJET, data.data);

        return { data, status };

    },

    async UPDATE_PROJET ({ commit }, {projet, id}) {
        
        const { data, status } = await ProjetService.update(id, projet);

        commit(MODIFY_PROJET, data.data);

        return { data, status };

    },

    async DESTROY_PROJET ({ commit }, idProjet) {
        
        const { data, status } = await ProjetService.destroy(idProjet);

        commit(REMOVE_PROJET, idProjet);

        return { data, status };

    }
}