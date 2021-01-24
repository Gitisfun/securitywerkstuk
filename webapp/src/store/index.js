import Vuex from "vuex";
import Vue from "vue";
import authModule from "./modules/auth.js";
// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    authModule,
  },
});