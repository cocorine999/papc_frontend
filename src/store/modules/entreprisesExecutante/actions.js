import {
    FETCH_LIST as FETCH_LIST_ENTREPRISE_EXECUTANTE,
    GET as GET_ENTREPRISE_EXECUTANTE,
    STORE as STORE_ENTREPRISE_EXECUTANTE,
    UPDATE as UPDATE_ENTREPRISE_EXECUTANTE,
    DESTROY as DESTROY_ENTREPRISE_EXECUTANTE,
} from "@/store/actions.type"

import {
    SET_LIST as SET_LIST_ENTREPRISE_EXECUTANTE,
    FIND as findEntrepriseExecutante,
    ADD as ADD_ENTREPRISE_EXECUTANTE,
    MODIFY as MODIFY_ENTREPRISE_EXECUTANTE,
    REMOVE as REMOVE_ENTREPRISE_EXECUTANTE
} from "@/store/mutations.type"

import EntrepriseExecutanteService from "@/services/modules/entreprise.executante.service";

export default {
    
    FETCH_LIST_ENTREPRISE_EXECUTANTE : async ({ commit }) => {

        const { data, status } = await EntrepriseExecutanteService.get();

        commit(SET_LIST_ENTREPRISE_EXECUTANTE, data.data);

        return { data, status };
    },

    async GET_ENTREPRISE_EXECUTANTE ({ commit, getters }, {key, value }) {

        let entrepriseExecutante = getters.findEntrepriseExecutante({key: key, value : value})

        if((entrepriseExecutante === null || entrepriseExecutante || undefined) && typeof value === "int"){

            const { data, status } = await EntrepriseExecutanteService.get(value);

            entrepriseExecutante = data.data

            return entrepriseExecutante
        }
    },

    async STORE_ENTREPRISE_EXECUTANTE ({ commit }, payload) {
        
        const { data, status } = await EntrepriseExecutanteService.create(payload);

        commit(ADD_ENTREPRISE_EXECUTANTE, data.data);

        return { data, status };

    },

    async UPDATE_ENTREPRISE_EXECUTANTE ({ commit }, {entrepriseExecutante, id}) {
        
        const { data, status } = await EntrepriseExecutanteService.update(id, entrepriseExecutante);

        commit(MODIFY_ENTREPRISE_EXECUTANTE, data.data);

        return { data, status };

    },

    async DESTROY_ENTREPRISE_EXECUTANTE ({ commit }, idEntrepriseExecutante) {
        
        const { data, status } = await EntrepriseExecutanteService.destroy(idEntrepriseExecutante);

        commit(REMOVE_ENTREPRISE_EXECUTANTE, idEntrepriseExecutante);

        return { data, status };

    }
}