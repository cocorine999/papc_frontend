import {
    FETCH_LIST as FETCH_LIST_PROGRAMME,
    GET as GET_PROGRAMME,
    STORE as STORE_PROGRAMME,
    UPDATE as UPDATE_PROGRAMME,
    DESTROY as DESTROY_PROGRAMME,
} from "@/store/actions.type"

import {
    SET_LIST as SET_LIST_PROGRAMME,
    FIND as findProgramme,
    ADD as ADD_PROGRAMME,
    MODIFY as MODIFY_PROGRAMME,
    REMOVE as REMOVE_PROGRAMME
} from "@/store/mutations.type"

import ProgrammeService from "@/services/modules/programme.service";

export default {
    
    FETCH_LIST_PROGRAMME : async ({ commit }) => {

        const { data, status } = await ProgrammeService.get();

        commit(SET_LIST_PROGRAMME, data.data);

        return { data, status };
    },

    async GET_PROGRAMME ({ commit, getters }, {key, value }) {

        let programme = getters.findProgramme({key: key, value : value})

        if((programme === null || programme || undefined) && typeof value === "int"){

            const { data, status } = await ProgrammeService.get(value);

            programme = data.data

            return programme
        }
    },

    async STORE_PROGRAMME ({ commit }, payload) {
        
        const { data, status } = await ProgrammeService.create(payload);

        commit(ADD_PROGRAMME, data.data);

        return { data, status };

    },

    async UPDATE_PROGRAMME ({ commit }, {programme, id}) {
        
        const { data, status } = await ProgrammeService.update(id, programme);

        commit(MODIFY_PROGRAMME, data.data);

        return { data, status };

    },

    async DESTROY_PROGRAMME ({ commit }, idProgramme) {
        
        const { data, status } = await ProgrammeService.destroy(idProgramme);

        commit(REMOVE_PROGRAMME, idProgramme);

        return { data, status };

    }
}