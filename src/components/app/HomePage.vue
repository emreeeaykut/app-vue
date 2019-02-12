<template>
  <div class="page-wrapper">

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

    <div class="container-fuild padding-lr-100">
      <div class="col-md-12 grid-responsive">
       
        <div v-masonry transition-duration="0.3s" item-selector=".grid-item" :percent-position="true" :origin-top="true" :horizontal-order="true" class="grid">
          <div v-masonry-tile class="grid-item" v-for="(work, index) in worksAll">

            <div @click="workDetail(work.id)">
              <div class="post-bg"></div>
              <div class="post-text">{{work.title}}</div>
              <img :src="apiAssets + work.main_img" class="img-fluid mx-auto d-block">
            </div>

          </div>
        </div> 
       
      </div>
    </div>

  </div>

</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      works: [],
      loading: false,
      apiAssets,
    }
  },
  computed: {
    worksAll() {
      return this.$store.getters.worksAll
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch('getRetrieveWorks')
      .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = false
      })
  },
  methods: {
    workDetail(detailId) 
    {
      let workId = detailId
      this.$router.push({ name: 'work', params: {id: workId} })
      
      $(document).ready(function(){
        $('.post-text').hide();
      })
    }
  }
}

</script>



<style lang="scss">
  .grid{margin: 0 auto;}
  .grid-item{float: left; width: 32.4%; margin: 0px 7px 14px 7px}
  .grid-item img{z-index: 1}
  .post-bg{position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; background: #0000006e; z-index: 0; margin-bottom: 14px; opacity: 0; transition: opacity .5s; -webkit-transition: opacity .5s;}
  .post-text{position: absolute; bottom: 7px; color: #fff; padding: 10px; font-size: 21px; z-index: 1; margin-left: 10px; opacity: 0; transition: opacity .5s; -webkit-transition: opacity .5s;}
  .post-bg:hover{opacity: 1;}
  .post-bg:hover + .post-text{opacity: 1;}

  @media screen and (min-width: 1256px) and (max-width: 1693px) {
    .grid-item{width: 32%;}
  }

  @media screen and (min-width: 1121px) and (max-width: 1255px) {
    .grid-item{width: 31.8%;}
  }

  @media screen and (min-width: 1019px) and (max-width: 1120px) {
    .grid-item{width: 31.6%;}
  }

  @media screen and (min-width: 937px) and (max-width: 1018px) {
    .grid-item{width: 31.4%;}
  }

  @media screen and (min-width: 871px) and (max-width: 936px) {
    .grid-item{width: 31.2%;}
  }

  @media screen and (min-width: 816px) and (max-width: 871px) {
    .grid-item{width: 31%;}
  }

  @media screen and (min-width: 768px) and (max-width: 817px) {
    .grid-item{width: 30.7%;}
  }

  @media screen and (min-width: 320px) and (max-width: 767px) {
    .grid-item{width: 100%; margin: 0 0 20px 0;}
  }
</style>
