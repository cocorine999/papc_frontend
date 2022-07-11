import {
    FIND as findMod
} from "@/store/mutations.type";

export default {

    getMods : state => {

        return state.lists

                ? state.lists

                : localStorage.getItem('mods') 
                
                ? state.lists = JSON.parse(localStorage.getItem('mods'))

                : []
    },

    getMod : state => {
        return state.mod;
    },

    getTotal : state => {
        return this.getMods(state).length;
    },

    [findMod] : state => ({key, value}) => {
        return this.getMods(state).find(item => item[key] === value);
    }
}