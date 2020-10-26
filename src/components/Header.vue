<template>
  <div id="header" :class="scrolling ? 'scrolling' : ''">
    <div class="header_wrap">
      <div class="row">
        <div class="grid grid-1-6">
          <div class="logo_wrap">
            <img src="@/assets/images/back.svg" v-if="mixinRouteMetaGoBack" class="header_logo" alt="home" @click="goBack">
            <img src="@/assets/images/apple-home.svg" v-else class="header_logo" alt="home" @click="goHome">
          </div>
        </div>
        <div class="grid grid-2-3">
          <h1 class="header-title" v-if="!mixinRouteMetaTag">{{ mixinRouteMetaTitle }}</h1>
          <h1 class="header-title" v-else>{{ mixinRouteParamTag || mixinRouteMetaTitle }}</h1>
        </div>
        <div class="grid grid-1-6">
          <Slider />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from './Slider'

export default {
  name: 'Header',
  components: {
    Slider
  },
  data () {
    return {
      scrolling: false
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    goHome () {
      this.$router.push({
        name: 'Home'
      })
    },
    handleScroll () {
      if (window.scrollY > 50) {
        this.scrolling = true
      } else {
        this.scrolling = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transition: all .5s;
  background-color: rgba($success, .8);
  border-bottom: 2px solid rgba($success, .3);

  &.scrolling {
    color: $primary;
    background-color: rgba($background, .8);
    -webkit-box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, .5);
    -moz-box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, .5);
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, .5);
  }
}

.header_wrap {
  padding: .5rem;
  height: 3rem;
  line-height: 1;
  vertical-align: middle;
}

.header-title {
  @include ellipsis;
  font-family: SingleDay;
  color: inherit;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: .5rem;
}

.logo_wrap { text-align: center; }
.header_logo {
  line-height: 1;
  height: 2rem;

  &:hover { cursor: pointer; }
}
</style>
