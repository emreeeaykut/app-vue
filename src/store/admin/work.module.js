	import axios from 'axios'

	const state = {
		token: localStorage.getItem('access_token') || null,
		work_images: [],
	}

	const getters = {
		workImages(state)
		{
     		return state.work_images
	    }
	}

  	const mutations = {
  		setToken(state, token) {
	      	state.token = token
	    },
		addWorkImage(state, workImage)
		{
			state.work_images.push({
				id: workImage.data.id,
		        image: workImage.data.image,
		        work_id: workImage.data.work_id,
			})
		},
  		deleteWorkImage(state, id)
  		{
	      const index = state.work_images.findIndex(item => item.id == id)
	      state.work_images.splice(index, 1)
	    },
	    setWorkImages(state, work_images)
	    {
	      state.work_images = work_images
	    },
	    resetWorkImages(state)
	    {
	    	state.work_images = ''
	    },
  	}

	const actions = {
		getToken(context){
            context.commit('setToken', localStorage.getItem('access_token'))
	    },
		getWorks(context, page)
		{
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

			return new Promise((resolve, reject) => {
				axios.get('/admin/works?page=' + page)
				.then(response => {
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
			})
		},
		addWork(context, data)
		{
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

	      	return new Promise((resolve, reject) => {
		        axios.post('/admin/works', {
		          	title: data.title,
		          	main_img: data.main_img,
		          	detail: data.detail,
		          	iframe1: data.iframe1,
		          	iframe2: data.iframe2,
		        })
          		.then(response => {
	            	resolve(response)
	          	})
	          	.catch(error => {
           	 		reject(error)
	          	})
	      	})
	    },
	    updateWork(context, data)
	    {
	    	axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

	      	return new Promise((resolve, reject) => {
		        axios.put('/admin/works/' + data.id, {
		          	title: data.title,
		          	main_img: data.main_img,
		          	existing_main_img: data.existing_main_img,
		          	detail: data.detail,
		          	iframe1: data.iframe1,
		          	iframe2: data.iframe2,
		        })
          		.then(response => {
	            	resolve(response)
	          	})
	          	.catch(error => {
           	 		reject(error)
	          	})
	      	})
	    },
	    deleteWork(context, id)
	    {
	    	axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
	    	
	    	return new Promise((resolve, reject) => {
	    		axios.delete('/admin/works/' + id)
				.then(response => {
	            	resolve(response)
	          	})
	          	.catch(error => {
           	 		reject(error)
	          	})
    		})
	    },
	    retrieveWorkImages(context, id) {
	      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

	      axios.get('/admin/workImages/' + id)
	        .then(response => {
	         	context.commit('setWorkImages', response.data)
	        })
	        .catch(error => {
	          console.log(error)
	        })
	    },
	    deleteImageWork(context, id)
	    {
	    	axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

	    	return new Promise((resolve, reject) => {
	    		axios.delete('/admin/workImages/' + id)
	    		.then(response => {
	    			context.commit('deleteWorkImage', id)
	    			resolve(response)
	    		})
	    		.catch(error => {
	    			reject(error)
	    		})
	    	})
	    },
	    uploadWorkImage(context, data)
	    {
	    	axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

	      	return new Promise((resolve, reject) => {
		        axios.post('/admin/workImages', {
		          	image: data.image,
		          	work_id: data.work_id,
		        })
          		.then(response => {
          			context.commit('addWorkImage', response.data)
	            	resolve(response)
	          	})
	          	.catch(error => {
           	 		reject(error)
	          	})
	      	})
	    },
	    resetWorkImages(context)
	    {
	    	context.commit('resetWorkImages')
	    },
	    getTotalWork(context)
		{
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
			
			return new Promise((resolve, reject) => {
				axios.get('/admin/works/total')
				.then(response => {
					resolve(response.data)
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
