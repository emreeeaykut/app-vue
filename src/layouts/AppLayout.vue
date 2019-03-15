<template>
  <div id="app-layout">

    <div class="menu-area">
      <div class="container-fuild padding-lr-100">
        <div class="row">

          <div class="col-md-12">
            
            <ul class="nav">
              <li><router-link :to="{ name: 'home' }">Works</router-link></li>
              <li><router-link :to="{ name: 'contact' }">Contact</router-link></li>
              <li><a href="javascript:void(0)" class="author-text">EMRE ÖZDEMİR</a></li>
            </ul>

          </div>

        </div>
      </div>
    </div>

    <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
export default {
  computed: {
    
  }
}
</script>

<style lang="scss">
  
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
  @import url('cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css');
  @import url('bootstrap/dist/css/bootstrap.css');
  @import url('bootstrap-vue/dist/bootstrap-vue.css');
  @import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');

  body{margin: 0; padding: 0; background: #000;}
  *{outline: none; list-style: none;}
  a{text-decoration: none !important;}
  .padding-lr-100{padding-left: 100px !important; padding-right: 100px !important;}
  .padding-lr-125{padding-left: 125px !important; padding-right: 125px !important;}

  #app-layout {
    font-family: 'Roboto', sans-serif;
    color: #d0d0d0;
    font-size: 24px;
    background: #000;
    height: 100vh;
    position: fixed;
    width: 100%;
    overflow-y: scroll;
  }

  .flex-center {
    display: flex;
    justify-content: center;
  }

  .menu-area{
    width: 100%;
    border-bottom: 1px solid #fff;
    margin-bottom: 24px;
    background: #000;
  }

  .nav {
    display: flex;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    background: #000;
  }

  .nav a {
    color: #d0d0d0;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
  }

  .nav a:hover{color: #d0d0d0;}

  .author-text{position: absolute; right: 17px; margin-top: 12px;}

  .page-wrapper {
    animation-duration: 0.2s;
  }

  /* preloader start */
  #preloader {position: fixed;z-index: 9999999;top: 0;bottom: 0;right: 0;left: 0;background: #000000;}
  .inner {position: absolute;top: 0; bottom: 0;right: 0; left: 0;width: 54px;height: 54px;margin: auto;}
  .page-loader{display:block;width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: #fefefe;z-index: 100000;}
  .spinner {width: 50px;height: 40px;text-align: center;font-size: 10px;}
  .spinner > div {background-color: #fff;height: 100%;width: 6px;display: inline-block;-webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;animation: sk-stretchdelay 1.2s infinite ease-in-out;}
  .spinner .rect2 {-webkit-animation-delay: -1.1s;animation-delay: -1.1s;}
  .spinner .rect3 {-webkit-animation-delay: -1.0s;animation-delay: -1.0s;}
  .spinner .rect4 {-webkit-animation-delay: -0.9s;animation-delay: -0.9s;}
  .spinner .rect5 {-webkit-animation-delay: -0.8s;animation-delay: -0.8s;}
  @-webkit-keyframes sk-stretchdelay {0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  20% { -webkit-transform: scaleY(1.0) }}
  @keyframes sk-stretchdelay {0%, 40%, 100% { transform: scaleY(0.4);-webkit-transform: scaleY(0.4);}  20% { transform: scaleY(1.0);-webkit-transform: scaleY(1.0);}}
  /* preloader end */

  /* CSS Transitions start */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  /* CSS Transitions end */

  @media screen and (min-width: 320px) and (max-width: 767px) {
    .padding-lr-100{padding-left: 15px !important; padding-right: 15px !important;}
    .padding-lr-125{padding-left: 25px !important; padding-right: 25px !important;}
    .nav{margin-left: 5px;}
    .nav a{padding: 0 11px !important; font-size: 12px;}
  }

</style>

