<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import {
  authService
  // dbService
} from '@/plugins/fbase'

export default {
  name: 'App',
  created () {
    this.initProtocalPlugins()
    this.setUser()
  },
  methods: {
    setUser () {
      authService.onAuthStateChanged(user => {
        if (user) {
          this.$store.commit('setUser', user)
        } else {
          this.$router.push({ name: 'Login' })
          // this.$store.commit('setUser', null)
        }
      })
    },
    loadScripts (plugins) {
      return new Promise((resolve, reject) => {
        if (window[plugins.name] && window[plugins.name]) {
          return resolve()
        }

        const script = document.createElement('script')
        script.async = true
        script.charset = 'utf-8'
        if (location.protocol === 'https:') {
          script.src = plugins.https
        } else {
          script.src = plugins.http
        }

        const dom = document.head ||
          document.getElementsByTagName('head')[0] ||
          document.body ||
          document.getElementsByTagName('body')[0]

        dom.appendChild(script)

        return resolve()
      })
    },
    initProtocalPlugins () {
      const protocolPluginList = [{
        name: 'daum',
        https: 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false',
        http: 'http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false'
      }]
      protocolPluginList.forEach(item => this.loadScripts(item))
    }
  }
}
</script>

<style lang="scss">
@import '@/../colony-vue/src/assets/scss/reset.scss';
@import '@/../colony-vue/src/assets/scss/grid.scss';

@import '@/assets/scss/variable.scss';
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/form.scss';
@import '@/assets/scss/button.scss';
@import '@/assets/scss/toast.scss';
@import '@/assets/scss/slider.scss';

.fade-enter-active,
.fade-leave-active { transition: opacity .1s }
.fade-enter,
.fade-leave-to { opacity: 0 }
</style>
