import {
    FETCH_LIST as FETCH_LIST_AGENCE_DE_COMMUNICATION,
    GET as GET_AGENCE_DE_COMMUNICATION,
    STORE as STORE_AGENCE_DE_COMMUNICATION,
    UPDATE as UPDATE_AGENCE_DE_COMMUNICATION,
    DESTROY as DESTROY_AGENCE_DE_COMMUNICATION,
} from "@/store/actions.type"

import {
    SET_LIST as SET_LIST_AGENCE_DE_COMMUNICATION,
    FIND as findAgenceDeCommunication,
    ADD as ADD_AGENCE_DE_COMMUNICATION,
    MODIFY as MODIFY_AGENCE_DE_COMMUNICATION,
    REMOVE as REMOVE_AGENCE_DE_COMMUNICATION
} from "@/store/mutations.type"

import AgenceDeCommunicationService from "@/services/modules/agence.communication.service";

export default {
    
    FETCH_LIST_AGENCE_DE_COMMUNICATION : async ({ commit }) => {

        const { data, status } = await AgenceDeCommunicationService.get();

        commit(SET_LIST_AGENCE_DE_COMMUNICATION, data.data);

        return { data, status };
    },

    async GET_AGENCE_DE_COMMUNICATION ({ commit, getters }, {key, value }) {

        let agenceDeCommunication = getters.findAgenceDeCommunication({key: key, value : value})

        if((agenceDeCommunication === null || agenceDeCommunication || undefined) && typeof value === "int"){

            const { data, status } = await AgenceDeCommunicationService.get(value);

            agenceDeCommunication = data.data

            return agenceDeCommunication
        }
    },

    async STORE_AGENCE_DE_COMMUNICATION ({ commit }, payload) {
        
        console.log(payload)
        
        const { data, status } = await AgenceDeCommunicationService.create(payload);

        commit(ADD_AGENCE_DE_COMMUNICATION, data.data);

        return { data, status };

    },

    async UPDATE_AGENCE_DE_COMMUNICATION ({ commit }, {agenceDeCommunication, id}) {
        
        const { data, status } = await AgenceDeCommunicationService.update(id, agenceDeCommunication);

        commit(AGENCE_DE_COMMUNICATIONIFY_AGENCE_DE_COMMUNICATION, data.data);

        return { data, status };

    },

    async DESTROY_AGENCE_DE_COMMUNICATION ({ commit }, idAgenceDeCommunication) {
        
        const { data, status } = await AgenceDeCommunicationService.destroy(idAgenceDeCommunication);

        commit(REMOVE_AGENCE_DE_COMMUNICATION, idAgenceDeCommunication);

        return { data, status };

    }
}