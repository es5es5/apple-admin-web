<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <GoTop
      v-if="_IGNORE"
      :max-width="1"
      :boundary="150"
      :z-index="900"
      bg-color="rgba(128, 134, 149, .5)"
      :size="pxToRem(2.5)"
      :right="pxToRem(1)"
      :bottom="pxToRem(4)"
    />
  </div>
</template>

<script>
import {
  authService
} from '@/plugins/fbase'

export default {
  name: 'App',
  // beforeCreate () {
  //   if (window.innerWidth < 1024) {
  //     this.$router.push({ name: 'Preview' })
  //   }
  // },
  created () {
    const USER_AGENT = navigator.userAgent.toLowerCase()
    const IOS_LIST = ['iphone', 'ipad', 'ipod']
    if (USER_AGENT.indexOf('android') > -1) {
      console.log('USER_AGENT: android')
      location.href = `intent://${location.host}#Intent;scheme=http;package=com.android.chrome;end`
    } else if (IOS_LIST.includes(USER_AGENT)) {
      console.log('USER_AGENT: ios')
    } else {
      console.log('USER_AGENT: other')
    }

    this.initProtocalPlugins()
    this.setUser()
  },
  computed: {
    _IGNORE () { return this.$route.name !== 'Preview' },
    _width () { return window.innerWidth / 10 }
  },
  methods: {
    pxToRem (value) {
      return value * 18
    },
    setUser () {
      authService.onAuthStateChanged(user => {
        if (user) {
          this.$store.commit('setUser', user)
        } else {
          // this.$router.push({ name: 'Login' })
          this.$store.commit('setUser', null)
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
