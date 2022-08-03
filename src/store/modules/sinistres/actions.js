import {
  FETCH_LIST as FETCH_LIST_SINISTRE,
  GET as GET_SINITRE,
  STORE as STORE_SINISTRE,
  UPDATE as UPDATE_SINISTRE,
  DESTROY as DESTROY_SINISTRE,
} from "@/store/actions.type"

import {
  SET_LIST as SET_LIST_SINISTRE,
  FIND as findSinistre,
  ADD as ADD_SINISTRE,
  MODIFY as MODIFY_SINISTRE,
  REMOVE as REMOVE_SINISTRE
} from "@/store/mutations.type"

import SinistreService from "@/services/modules/sinistre.service";

export default {
  
  FETCH_LIST_SINISTRE : async ({ commit }) => {

      const { data, status } = await SinistreService.get();

      if(status === 200 || status === 201) 
          commit(SET_LIST_SINISTRE, data.data);

      return { data, status };
  },

  async GET_SINITRE ({ commit, getters }, {key, value }) {

      let sinistre = null
      
      sinistre = getters.findSinistre({key: key, value : value})

      if((sinistre === null || sinistre || undefined) && typeof value === "int"){

          const { data, status } = await SinistreService.get(value);

          if(status === 200 || status === 201)
            sinistre = data.data
      }

      return sinistre;
  },

  async STORE_SINISTRE ({ commit }, payload) {
      
      const { data, status } = await SinistreService.create(payload);

      if(status === 200 || status === 201)
          commit(ADD_SINISTRE, data.data);
      return { data, status };

  },

  async UPDATE_SINISTRE ({ commit }, {sinistre, id}) {
      
      const { data, status } = await SinistreService.update(id, sinistre);

      if(status === 200 || status === 201)
        commit(MODIFY_SINISTRE, data.data);

      return { data, status };

  },

  async DESTROY_SINISTRE ({ commit }, idSinistre) {
      
      const { data, status } = await SinistreService.destroy(idSinistre);

      if(status === 200 || status === 201 || status === 204)
          commit(REMOVE_SINISTRE, idSinistre);

      return { data, status };

  }
}