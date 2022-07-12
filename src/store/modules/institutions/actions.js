import {
    FETCH_LIST as FETCH_LIST_INSTITUTION,
    GET as GET_INSTITUTION,
    STORE as STORE_INSTITUTION,
    UPDATE as UPDATE_INSTITUTION,
    DESTROY as DESTROY_INSTITUTION,
} from "@/store/actions.type"

import {
    SET_LIST as SET_LIST_INSTITUTION,
    FIND as findInstitution,
    ADD as ADD_INSTITUTION,
    MODIFY as MODIFY_INSTITUTION,
    REMOVE as REMOVE_INSTITUTION
} from "@/store/mutations.type"

import InstitutionService from "@/services/modules/institution.service";

export default {
    
    FETCH_LIST_INSTITUTION : async ({ commit }) => {

        const { data, status } = await InstitutionService.get();

        commit(SET_LIST_INSTITUTION, data.data);

        return { data, status };
    },

    async GET_INSTITUTION ({ commit, getters }, {key, value }) {

        let institution = getters.findInstitution({key: key, value : value})

        if((institution === null || institution || undefined) && typeof value === "int"){

            const { data, status } = await InstitutionService.get(value);

            institution = data.data

            return institution
        }
    },

    async STORE_INSTITUTION ({ commit }, payload) {
        
        const { data, status } = await InstitutionService.create(payload);

        commit(ADD_INSTITUTION, data.data);

        return { data, status };

    },

    async UPDATE_INSTITUTION ({ commit }, {institution, id}) {
        
        const { data, status } = await InstitutionService.update(id, institution);

        commit(MODIFY_INSTITUTION, data.data);

        return { data, status };

    },

    async DESTROY_INSTITUTION ({ commit }, idInstitution) {
        
        const { data, status } = await InstitutionService.destroy(idInstitution);

        commit(REMOVE_INSTITUTION, idInstitution);

        return { data, status };

    }
}