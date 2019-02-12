<template>

	<div class="page-wrapper">

		<!-- 
		<div class="container" v-if="loading">
			<div class="row">
				<div class="col-md-12">
					<ContentLoader :speed="1" primaryColor="#333" secondaryColor="#999" :height="320">
						<rect x="8" y="0" rx="3" ry="3" width="384" height="6.4" />
						<rect x="8" y="20" rx="3" ry="3" width="384" height="6.4" />
						<rect x="8" y="40" rx="3" ry="3" width="384" height="6.4" />
						<rect x="8" y="60" rx="3" ry="3" width="384" height="6.4" />
						<rect x="8" y="80" rx="3" ry="3" width="384" height="6.4" />
					</ContentLoader>
				</div>
			</div>
	    </div> 
		-->

	    <div id="preloader" v-if="loading">
	      	<div class="inner">
		        <div class="spinner">
					<div class="rect1"></div>
					<div class="rect2"></div>
					<div class="rect3"></div>
					<div class="rect4"></div>
					<div class="rect5"></div>
		        </div>
	      	</div>
	    </div>

		<div class="container-fuild padding-lr-125">
			<div class="row">

		     	<div class="col-lg-3 col-md-12">
		     		<div class="detail-position">

			        	<div class="detail-title">
			        		{{ workDetail.title }}
			        	</div>

			        	<div class="description" v-html="workDetail.detail"></div>

		        	</div>
		      	</div>

		      	<div class="col-lg-9 col-mm-12">

		      		<div class="iframe-box" v-if="workDetail.iframe1">
			    		<iframe :src="workDetail.iframe1" width="100%" frameborder="0" class="iframe-area" ref="frame"></iframe>
			    	</div>

			    	<div class="iframe-box" v-if="workDetail.iframe2">
			    		<iframe :src="workDetail.iframe2" width="100%" frameborder="0" class="iframe-area" ref="frame"></iframe>
			    	</div>

			    	<div v-if="workDetail.images">
			    		<div v-for="image in workDetail.images">
			    			<div class="image-area" v-bind:style="{'background-image': 'url(' + apiAssets + image.image + ')'}">
							</div>
			    		</div>
		    		</div>

		      	</div>

			</div>
		</div>

	</div>

</template>

<script>

export default {
	name: 'work-detail',
	data() {
		return {
			detailId: this.$route.params.id,
			loading: false,
			apiAssets,
		}
	},
	computed: {
	    workDetail() {
      		return this.$store.getters.workDetail
	    }
  	},
  	created() {
    	window.scrollTo(0,0);

    	let workId = this.$route.params.id 

    	this.loading = true
    	this.$store.dispatch('getWork', workId)
        .then(response => {
          	this.loading = false
        })
        .catch(error => {
			this.loading = false
        })
  	},
}

</script>

<style lang="scss">
	.detail-position{position: fixed; max-width: 18%;}
	.detail-title{font-size: 35px; font-weight: 500; line-height: 1; margin-bottom: 15px; font-family: 'Roboto-Bold'}
	.description{font-size: 16px;}
	.description p{margin-bottom: 0; font-size: 16px;}
	.image-area{margin-bottom: 30px; width: 100%; height: 450px; background-size: cover; background-position: center; background-repeat: no-repeat; border: 1px solid #191919;}
	.iframe-box{padding:56.25% 0 0 0; position:relative; margin-bottom: 30px;}
	.iframe-area{position:absolute; top:0; left:0; width:100%; height:100%;}
	@media screen and (min-width: 320px) and (max-width: 992px) {
		.detail-position{position: relative; max-width: 100%; margin-bottom: 20px}
	}
	@media screen and (min-width: 320px) and (max-width: 767px) {
		.image-area{height: 250px}
	}
</style>