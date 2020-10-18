<template>
  <div id="login">
    <form action="" @submit.prevent>
      <button type="button" @click="socialLogin('google')">GOOGLE</button>
      <router-link tag="button" :to="{ name: 'Sales' }">SALES</router-link>
    </form>
  </div>
</template>

<script>
import { authService, firebaseInstance } from '@/plugins/fbase'

export default {
  name: 'Login',
  data () {
    return {
      id: '',
      password: ''
    }
  },
  methods: {
    async socialLogin (social) {
      let provider = null
      switch (social) {
        case 'google':
          provider = new firebaseInstance.auth.GoogleAuthProvider()
          break
        default:
          break
      }
      const user = await authService.signInWithPopup(provider)
      console.log(user)
      this.$store.commit('setUser', user.user)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
