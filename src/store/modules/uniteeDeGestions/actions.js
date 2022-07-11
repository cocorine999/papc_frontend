import {
    FETCH_LIST as FETCH_LIST_UNITEE_DE_GESTION,
    GET as GET_UNITEE_DE_GESTION,
    STORE as STORE_UNITEE_DE_GESTION,
    UPDATE as UPDATE_UNITEE_DE_GESTION,
    DESTROY as DESTROY_UNITEE_DE_GESTION,
} from "@/store/actions.type"

import {
    SET_LIST as SET_LIST_UNITEE_DE_GESTION,
    FIND as findUniteeDeGestion,
    ADD as ADD_UNITEE_DE_GESTION,
    MODIFY as MODIFY_UNITEE_DE_GESTION,
    REMOVE as REMOVE_UNITEE_DE_GESTION
} from "@/store/mutations.type"

import UniteeDeGestionService from "@/services/modules/unitee.gestion.service";

export default {
    
    FETCH_LIST_UNITEE_DE_GESTION : async ({ commit }) => {

        const { data, status } = await UniteeDeGestionService.get();

        commit(SET_LIST_UNITEE_DE_GESTION, data.data);

        return { data, status };
    },

    async GET_UNITEE_DE_GESTION ({ commit, getters }, {key, value }) {

        let uniteeDeGestion = getters.findUniteeDeGestion({key: key, value : value})

        if((uniteeDeGestion === null || uniteeDeGestion || undefined) && typeof value === "int"){

            const { data, status } = await UniteeDeGestionService.get(value);

            uniteeDeGestion = data.data

            return uniteeDeGestion
        }
    },

    async STORE_UNITEE_DE_GESTION ({ commit }, payload) {
        
        const { data, status } = await UniteeDeGestionService.create(payload);

        commit(ADD_UNITEE_DE_GESTION, data.data);

        return { data, status };

    },

    async UPDATE_UNITEE_DE_GESTION ({ commit }, {uniteeDeGestion, id}) {
        
        const { data, status } = await UniteeDeGestionService.update(id, uniteeDeGestion);

        commit(MODIFY_UNITEE_DE_GESTION, data.data);

        return { data, status };

    },

    async DESTROY_UNITEE_DE_GESTION ({ commit }, idUniteeDeGestion) {
        
        const { data, status } = await UniteeDeGestionService.destroy(idUniteeDeGestion);

        commit(REMOVE_UNITEE_DE_GESTION, idUniteeDeGestion);

        return { data, status };

    }
}