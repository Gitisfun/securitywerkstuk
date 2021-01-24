import httpClient from "../../api/httpClient";

const state = {
  user: {
    id: null,
    username: null,
    email: null,
    role: null,
    verified: null,
  },
  token: null,
};

const getters = {
  getUser: (state) => {
    if (JSON.parse(localStorage.getItem("userws"))) {
      return JSON.parse(localStorage.getItem("userws"));
    }
    return state.user;
  },
  getToken: (state) => {
    if (JSON.parse(localStorage.getItem("authtokenws"))) {
      return JSON.parse(localStorage.getItem("authtokenws"));
    }
    return state.token;
  },
};

const actions = {
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  setUser({ commit }, user) {
    commit("setUser", user);
  },
};

const mutations = {
  setUser: (state, user) => {
    localStorage.setItem("userws", JSON.stringify(user));

    state.user = user;
  },
  setToken: (state, token) => {
    localStorage.setItem("authtokenws", JSON.stringify(token));
    httpClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
    state.token = token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};