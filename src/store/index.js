import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    bol: false,
    id_input:null
  },
  getters: {
    getList: (state) => state.lists,
    getBol: (state) => state.bol,
    getIdInput:(state)=>state.id_input

  },
  mutations: {
    ADD_TO_LIST(state, list) {
      state.lists.push({ message: list.message, id: state.lists.length , disabled: list.disabled,selected:false,changeMessage:false});
    },
    CHANGE_BOL(state, payload) {
      state.bol = !payload.bol
      state.id_input=payload.id
      state.lists.map((item) => {
        if (item.id == payload.id) {
          item.changeMessage = false;
          item.message = payload.message;
        }
      });
    },
  },
  actions: {
    async addToList({ commit }, list) {
      try {
        commit("ADD_TO_LIST", list);
      } catch (error) {
        console.log(error);
      }
    },
    async changeBol({ commit }, bol) {
      try {

        commit("CHANGE_BOL", bol);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
