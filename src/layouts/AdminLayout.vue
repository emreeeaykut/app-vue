<template>
  <div id="admin-layout">

    <header class="panel-header">
        <div class="container-fluid">
    
            <div class="settings-btn">
                <span v-if="!loggedIn"><b>PANELE GİRİŞ</b></span>
                <span v-if="loggedIn" class="session_username"><i class="fa fa-user"></i> Admin</span>
                <router-link :to="{ name: 'logout' }" v-if="loggedIn"><span><i class="fa fa-sign-out"></i> Çıkış</span></router-link>
            </div>

        </div>
    </header>

    <aside class="panel-sidebar" v-if="loggedIn">

        <a href="#" class="logo-top">
            PANEL
        </a>

        <div id="leftside-navigation" class="nano" v-if="loggedIn">

            <ul class="nano-content">
                <li class="menu-open">
                    <a><i class="fa fa-arrow-right"></i></a>
                </li>
                <li class="menu-close">
                    <a><i class="fa fa-arrow-left"></i></a>
                </li>
                <li>
                    <router-link :to="{ name: 'dashboard' }" id="-admin-dashboard">
                      <div><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'list-work' }" id="-list-member">
                      <div><i class="fa fa-archive"></i><span>Projeler</span></div>
                    </router-link>
                </li>
                <li>
                    <a id="-admin-page"><i class="fa fa-folder-open"></i><span>Sayfalar</span></a>
                </li>
            </ul>

        </div>
    </aside>

    <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>

export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style lang="scss">
  
  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
  @import url('cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css');
  @import url('bootstrap/dist/css/bootstrap.css');
  @import url('bootstrap-vue/dist/bootstrap-vue.css');
  @import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
  @import '../assets/admin/fonts/montserrat.css';
  @import '../assets/admin/css/panel-kit.css';
  @import '../assets/admin/css/demo.css';

  body{margin: 0; padding: 0; background: #f2f2f2;}
  *{outline: none; list-style: none;}
  a{text-decoration: none !important;}
  .page-link:focus{-webkit-box-shadow:0 0 0 0 rgba(0, 123, 255, 0.25); box-shadow:0 0 0 0 rgba(0, 123, 255, 0.25);}

  #admin-layout {font-family: 'Montserrat', sans-serif; font-weight: 300;}

  .btn-login {
    &:hover {
      background: darken(#60BD4F, 10%);
    }

    &:disabled {
      background: lighten(#60BD4F, 25%);
      cursor: not-allowed;
    }
  }

  .server-error {
    margin-bottom: 12px;
    font-size: 16px;
    padding: 10px 16px;
    color: #a94442;
    background: #F3DEDE;
    border-radius: 4px;
  }

  .success-message {
    background-color: #dff0d8;
    color: #3c763d;
    margin-bottom: 12px;
    font-size: 16px;
    padding: 10px 16px;
    border-radius: 4px;
  }

  .form-error {
    font-size: 13px;
    color: #a94442;
  }

  .input-error {
    border: 1px solid #a94442;
  }

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


</style>

