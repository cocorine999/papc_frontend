import {
  FIND as findSinistre
} from "@/store/mutations.type";

export default {

  getSinistres : state => {

      return state.lists

              ? state.lists

              : localStorage.getItem('sinistres') 
              
              ? state.lists = JSON.parse(localStorage.getItem('sinistres'))

              : []
  },

  getSinistre : state => {
      return state.sinistre;
  },

  getTotal : state => {
      return this.getSinistres(state).length;
  },

  [findSinistre] : state => ({key, value}) => {
      return this.getSinistres(state).find(item => item[key] === value);
  }
}