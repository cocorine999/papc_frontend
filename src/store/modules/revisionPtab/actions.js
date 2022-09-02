
import {
    SET_LIST as SET_LIST_SCOPE_PTAB
} from "@/store/mutations.type"

import RevisionPtabService from "@/services/modules/revision.ptab.service";

export default {
    
    FETCH_LIST_PTAB_VERSION : async ({ commit }) => {

        const { data, status } = await RevisionPtabService.get();

        if(status === 200 || status === 201)
            commit(SET_LIST_SCOPE_PTAB, data.data);

        return { data, status };
    },

    async GET_OLD_PTAB ({ commit }, payload) {
        
        const { data, status } = await RevisionPtabService.getOldPtaReviser(payload);

        return { data, status };

    },

    async REVISER_PTAB ({ commit }, payload) {
        
        const { data, status } = await RevisionPtabService.reviserPtab(payload);

        return { data, status };

    },

    async GET_PTAB_REVISER ({ commit }, payload) {
        
        const { data, status } = await RevisionPtabService.getPtabReviser(payload);

        return { data, status };

    },

}