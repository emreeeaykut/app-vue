<template>
  <div id="app">

    <component v-bind:is="layout"></component>

  </div>
</template>

<script>
import AppLayout from './layouts/AppLayout'
import AdminLayout from './layouts/AdminLayout'

export default {
  computed: {
    layout () {
      return this.$store.getters.layout
    }
  },
  components: {
    'app-layout': AppLayout,
    'admin-layout': AdminLayout
  }
}
</script>