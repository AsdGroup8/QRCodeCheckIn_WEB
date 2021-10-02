import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    snackbar:{
      visible: false,
      timeout: 3000,
      message: "Snackbar",
      type: "info",
    }
  },
  mutations: {
    SET_SNACKBAR(state, {timeout, message, type}) {
      state.snackbar.visible = true;
      state.snackbar.timeout = timeout;
      state.snackbar.message = message;
      state.snackbar.type = type;
    },
    CLOSE_MESSAGE(state) {
      state.snackbar.visible = false;
    }
  },
  actions: {
    message(context, {timeout, message, type}) {
      context.commit('SET_SNACKBAR', {timeout, message, type});
    }
  },
  modules: {
    userModule
  }
})
