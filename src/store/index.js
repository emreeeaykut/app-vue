import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

import appWork from "./app/work.module";
import adminAuth from "./admin/auth.module";
import adminWork from "./admin/work.module";

Vue.use(Vuex);

axios.defaults.baseURL = 'http://app.emreozdemir.site/api'

// export default new Vuex.Store({
export const store = new Vuex.Store({
	modules: {
    	appWork,
    	adminAuth,
      adminWork,
	},

	state: {
		  layout: 'app-layout'
	},

	mutations: {
    	SET_LAYOUT(state, payload)
      {
      		state.layout = payload
    	}
	},
  
	getters: {
    	layout(state)
      {
      		return state.layout
    	}
	}

});