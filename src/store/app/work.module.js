	import axios from 'axios'

	const state = {
		works: [],
		work: '',
	}

	const getters = {
		worksAll(state) {
		  	return state.works
		},
		workDetail(state) {
			return state.work
		}
	}

  	const mutations = {
		setRetrieveWorks(state, works) {
		  	state.works = works
		},
		setWork(state, work){
			state.work = work
		},
  	}

	const actions = {
		getRetrieveWorks(context) {
			return new Promise((resolve, reject) => {
		  		axios.get('/works')
		    	.then(response => {
		      		context.commit('setRetrieveWorks', response.data.data)
		      		resolve(response)
		    	})
		    	.catch(error => {
		      		reject(error)
		    	})
	    	})
		},
		getWork(context, id) {
			return new Promise((resolve, reject) => {
				axios.get('/works/' + id)
				.then(response => {
					context.commit('setWork', response.data.data)
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
