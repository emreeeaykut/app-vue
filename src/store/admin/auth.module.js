	import axios from 'axios'

	const state = {
		token: localStorage.getItem('access_token') || null,
	}

	const getters = {
		loggedIn(state) {
	      return state.token !== null
	    },
	}

  	const mutations = {
		retrieveToken(state, token) {
	      	state.token = token
	    },
	    destroyToken(state) {
	      	state.token = null
	    },
  	}

	const actions = {
		register(context, data) {
	      	return new Promise((resolve, reject) => {
		        axios.post('/register', {
		          	name: data.name,
		          	email: data.email,
		          	password: data.password,
		        })
	          		.then(response => {
		            	resolve(response)
		          	})
		          	.catch(error => {
	           	 		reject(error)
		          	})
	      	})
	    },
	    destroyToken(context) {
      		axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

	      	if (context.getters.loggedIn) {
	        	return new Promise((resolve, reject) => {
	          		axios.post('/logout')
		            	.then(response => {
		              		localStorage.removeItem('access_token')
		              		context.commit('destroyToken')
		              		resolve(response)
	            		})
	            		.catch(error => {
			              	localStorage.removeItem('access_token')
			              	context.commit('destroyToken')
			              	reject(error)
	            	})
	        	})
	      	}
	    },
	    retrieveToken(context, credentials) {

	      	return new Promise((resolve, reject) => {
	        	axios.post('/login', {
	          		email: credentials.email,
	          		password: credentials.password,
	        	})
	          		.then(response => {
	            		const token = response.data.access_token
			            localStorage.setItem('access_token', token)
			            context.commit('retrieveToken', token)
			            resolve(response)
	          		})
	          		.catch(error => {
	            		reject(error)
	          		})
    		})
    	},
	}

	export default {
	  state,
	  getters,
	  mutations,
	  actions,
	};
