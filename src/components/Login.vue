<template>
  <div id="login">
    <div class="container">
      <div class="logo_wrap">
        <img src="@/assets/images/apple-border.svg" class="apple-logo" alt="apple">
      </div>

      <div class="sign_wrap">
        <div class="social_wrap">
          <button type="button" class="btn-social google" @click="socialLogin('google')">Google</button>
        </div>
      </div>
    </div>
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
      this.$store.commit('setUser', user.user)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss" scoped>

#login {
  height: 100vh;
  background-color: $background;
  position: relative;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}

.logo_wrap {
  padding: 3rem;
  margin: 0 auto;
}

.sign_wrap {
  margin: 0 auto;
  // width: 80%;
  background-color: #fff;
}

.social_wrap {
  // padding: .5rem 0;

  .btn-social {
    width: 100%;
    border: 1px solid transparent;
    padding: 1rem 0;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .google {
    background-color: #4384F4;
    color: #fff;
  }
}

</style>
