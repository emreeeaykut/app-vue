// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App'
import { store } from './store'
import tr from 'vee-validate/dist/locale/tr';
import VeeValidate, { Validator } from 'vee-validate'
import CxltToastr from 'cxlt-vue2-toastr'
import jQuery from 'jquery'
import BootstrapVue from 'bootstrap-vue'
import {VueMasonryPlugin} from 'vue-masonry'
import VueSwal from 'vue-swal'
import VueEditor from 'vue2-editor'

global.jQuery = global.$ = jQuery
global.apiAssets = 'http://app.emreozdemir.site/api/storage/'

const toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true,
}

const faviconsContext = require.context('!!file-loader?name=assets/favicons/[name].[ext]!.', true, /\.(svg|png|ico|xml|json)$/);
faviconsContext.keys().forEach(faviconsContext)

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(CxltToastr, toastrConfigs)
Vue.use(VueMasonryPlugin)
Vue.use(VueSwal)
Vue.use(VeeValidate, {fieldsBagName: 'veeFields'})
Vue.use(VueEditor)

Validator.localize('tr', tr)

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router: router,
  store,
  components: { App },
  template: '<App/>'
})
