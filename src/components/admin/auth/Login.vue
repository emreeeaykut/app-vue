<template>
  <div class="page-wrapper auth-form">


    <div class="login-page">

        <div class="login-content">

            <form action="#" @submit.prevent="login" class="login-form">

                <h2 class="navyblue-txt">Giriş Sayfası</h2>

                <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
                <div v-if="serverError" class="server-error">{{ serverError }}</div>

                <div class="form-group">
                    <label for="email" class="navyblue-txt" >Kullanıcı Adı</label>
                    <input type="email" name="email" id="email" class="form-control focused" v-model="email">
                </div>

                <div class="form-group">
                    <label for="password" class="navyblue-txt" >Password</label>
                    <input type="password" name="password" id="password" class="form-control focused" v-model="password">
                </div>

                <div>
                    <button type="submit" class="adminpanel-btn btn-login" :disabled="loading">
                        Login
                        <i class="fa fa-spinner fa-spin fa-fw" v-if="loading"></i>
                    </button>
                </div>

            </form>

        </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  props: {
    dataSuccessMessage: {
      type: String,
    }
  },
  data() {
    return {
      email: '',
      password: '',
      serverError: '',
      successMessage: this.dataSuccessMessage,
      loading: false,
    }
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'admin-layout')
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        this.loading = false
        this.$router.push({ name: 'dashboard' })
      })
      .catch(error => {
        this.loading = false
        this.serverError = error.response.data
        this.password = ''
        this.successMessage = ''
      })
    }
  }
}
</script>

