<template>
  <div id="login">
    <form action="" @submit.prevent>
      <button type="button" @click="socialLogin('google')">GOOGLE</button>
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
      await authService.signInWithPopup(provider)
    }
  }
}
</script>

<style>

</style>
