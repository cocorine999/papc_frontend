import {
    FETCH_LIST as FETCH_LIST_ACTIVITE,
    GET as GET_ACTIVITE,
    STORE as STORE_ACTIVITE,
    UPDATE as UPDATE_ACTIVITE,
    DESTROY as DESTROY_ACTIVITE,
} from "@/store/actions.type"

import {
    SET_LIST as SET_LIST_ACTIVITE,
    FIND as findActivite,
    ADD as ADD_ACTIVITE,
    MODIFY as MODIFY_ACTIVITE,
    REMOVE as REMOVE_ACTIVITE
} from "@/store/mutations.type"

import ActiviteService from "@/services/modules/activite.service";

export default {
    
    FETCH_LIST_ACTIVITE : async ({ commit }, {id}) => {

        const { data, status } = await ActiviteService.programme(id);

        commit(SET_LIST_ACTIVITE, data.data);

        return { data, status };
    },
    

    async GET_ACTIVITE ({ commit, getters }, {key, value }) {

        let activite = getters.findActivite({key: key, value : value})

        if((activite === null || activite || undefined) && typeof value === "int"){

            const { data, status } = await ActiviteService.get(value);

            activite = data.data

            return activite
        }
    },

    async STORE_ACTIVITE ({ commit }, payload) {
        
        const { data, status } = await ActiviteService.create(payload);

        commit(ADD_ACTIVITE, data.data);

        return { data, status };

    },

    async UPDATE_ACTIVITE ({ commit }, {activite, id}) {
        
        const { data, status } = await ActiviteService.update(id, activite);

        commit(MODIFY_ACTIVITE, data.data);

        return { data, status };

    },

    async DESTROY_ACTIVITE ({ commit }, idActivite) {
        
        const { data, status } = await ActiviteService.destroy(idActivite);

        commit(REMOVE_ACTIVITE, idActivite);

        return { data, status };

    }
}