<template>
	<div class="page-wrapper">

		<div class="form-content">

		    <div class="row margin-bottom-25 mt-3">
		        <div class="col-md-12">
		            <h2 class="modul-title">DASHBOARD</h2>
		        </div>
		    </div>

		    <div class="row">

		    	<div class="col-lg-6 col-md-6">
				    <div class="panel panel-blue">
				        <div class="panel-heading">
				            <div class="row">
				                <div class="col-md-3">
				                    <i class="fa fa-users fa-4x"></i>
				                </div>
				                <div class="col-md-9 text-right">
				                    <div class="huge" id="user-total">{{ totalWork }}</div>
				                    <div>Proje var</div>
				                </div>
				            </div>
				        </div>
				        <a href="javascript:void(0)" @click="openProjectModule">
				            <div class="panel-footer">
				                <span class="pull-left"><b>PROJELER</b></span>
				                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
				                <div class="clearfix"></div>
				            </div>
				        </a>
				    </div>
				</div>

		    </div>

		</div>

	</div>
</template>

<script>
export default {
 	name: 'dashboard',
 	data() {
 		return {
 			totalWork: 0,
 		}
 	},
  	created() {
  		this.$store.commit('SET_LAYOUT', 'admin-layout')

  		this.$store.dispatch('getToken')

  		this.$store.dispatch('getTotalWork')
  		.then(response => {
  			this.totalWork = response.data.total
  		})
  		.catch(error => {
  			console.log(error)
  		})
  	},
  	methods: {
 	 	openProjectModule()
  		{
	  		this.$router.push({ name: 'list-work' })
	  	}

  	}
}
</script>
