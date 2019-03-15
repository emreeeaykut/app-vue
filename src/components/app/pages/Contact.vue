<template>
  <div class="page-wrapper">

  	<div class="container padding-lr-125">
		<div class="row">

	     	<!-- <div class="col-md-12">
	     		E-Mail: <a href="mailto:mail@emreozdemir.site" style="color: #fff;">mail@emreozdemir.site</a>
     		</div> -->

     		<div class="col-md-6">
     			<div class="contact-area">
	     			<p>
	     				<i class="fa fa-map-marker-alt"></i> <span>İstanbul Kadıköy Göztepe</span>
	 				</p>

	 				<p>
	     				<i class="fab fa-linkedin"></i> <span><a href="https://www.linkedin.com/in/emre-%C3%B6zdemir-6006/" target="_blank" style="color: #d0d0d0;">/emre-özdemir-6006</a></span>
	 				</p>

	 				<p>
	     				<i class="fas fa-envelope"></i> <span><a href="mailto:mail@emreozdemir.site" style="color: #d0d0d0;">mail@emreozdemir.site</a></span>
	 				</p>
 				</div>
     		</div>

     		<div class="col-md-6">
     			<div class="c-image-area">
     				<img :src="apiAssets + 'erme_2.png'" class="img-fluid mx-auto d-block">
     			</div>
     		</div>

		</div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'contact',
  data() {
    return {
      apiAssets,
    }
  },
}

</script>

<style lang="scss">
  .contact-area{margin-top: 140px;}
  .c-image-area img{padding: 40px;}
  .contact-area p{font-size: 24px;}
  .contact-area p span{font-size: 24px;}
   @media screen and (min-width: 320px) and (max-width: 767px) {
   		.contact-area{margin-top: 30px;}
   		.contact-area p{font-size: 21px;}
   		.contact-area p span{font-size: 21px;}
  		.c-image-area img{padding: 40px;}
  }
</style>