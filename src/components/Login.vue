<template>
  <div id="login">
    <div class="container">
      <div class="logo_wrap">
        <img src="@/assets/images/apple-border.svg" class="apple-logo" alt="apple">
      </div>

      <div class="sign_wrap">
        <div class="social_wrap">
          <button type="button" class="btn-social google" @click="socialLogin('google')">
            <img src="@/assets/images/google.svg" alt="google" class="social-logo">
            구글 계정으로 로그인
          </button>
        </div>
        <div class="join_wrap">
          <span class="join">회원가입</span><span class="separator">|</span><span>비밀번호 찾기</span>
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

  @media (max-width: 900px) { width: 100%; }
  @media (min-width: 900px) {
    margin: 0 auto;
    width: 20rem;
  }
}

.logo_wrap {
  @media (max-width: 900px) {
    width: 100%;
    min-height: 100%;
  }
  @media (min-width: 900px) {
    margin: 0 auto;
    width: 20rem;
    min-height: 20rem;
  }

  margin: 0 auto;
  padding: 0 3rem 3rem 3rem;
}

.sign_wrap { margin: 0 auto; }

.social_wrap {
  padding: 0 1rem;

  .btn-social {
    width: 100%;
    border: 1px solid transparent;
    padding: 1rem 0;
    font-weight: bold;
    font-size: 1.25rem;
    border-radius: .5rem;
    line-height: 1.25rem;

    &.google {
      background-color: #fff;
      color: $gray;
      line-height: 1.5rem;
      border: 2px solid $border;
    }
  }

  .social-logo {
    width: 1.5rem;
    vertical-align: top;
    background-color: #fff;
    margin-right: 1.25rem;
  }
}

.join_wrap {
  padding: 0 1rem;
  font-size: .8rem;
  color: $gray;
  text-align: center;
  line-height: 1.5rem;
}
</style>
