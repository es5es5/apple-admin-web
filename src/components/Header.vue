<template>
  <div id="header" :class="scrolling ? 'scrolling' : ''">
    <div class="header_wrap">
      <div class="row">
        <div class="grid grid-1-6">
          <div class="logo_wrap">
            <img src="@/assets/images/back.svg" v-if="mixinRouteMetaGoBack" class="apple_logo" alt="home" @click="goBack">
            <img src="@/assets/images/apple-home.svg" v-else class="apple_logo" alt="home" @click="goHome">
          </div>
        </div>
        <div class="grid grid-2-3">
          <h1 class="header-title">{{ mixinRouteMetaTitle }}</h1>
        </div>
        <div class="grid grid-1-6">
          <Slide
            :isOpen="slideIsOpen"
            @openMenu="openMenu"
            @closeMenu="closeMenu"
            right
            :width="_width"
            noOverlay
            class="slider"
          >
            <li @click="goSlideRouter('Home')">
              <img src="@/assets/images/apple-normal.svg" alt="" class="sliderIcon">
              HOME
            </li>
            <li @click="goSlideRouter('Sales')">
              <img src="@/assets/images/sales.svg" alt="" class="sliderIcon">
              판매 관리
            </li>
            <li @click="goSlideRouter('Customer')">
              <img src="@/assets/images/customer.svg" alt="" class="sliderIcon">
              고객 관리
            </li>
          </Slide>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'

export default {
  name: 'Header',
  components: {
    Slide
  },
  computed: {
    _width () {
      return window.innerWidth.toString()
    }
  },
  data () {
    return {
      scrolling: false,
      slideIsOpen: false
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (window.scrollY > 50) {
        this.scrolling = true
      } else {
        this.scrolling = false
      }
    },
    goHome () {
      this.$router.push({
        name: 'Home'
      })
    },
    openMenu () { this.slideIsOpen = true },
    closeMenu () { this.slideIsOpen = false },
    goSlideRouter (name) {
      this.slideIsOpen = false
      this.$router.push({ name })
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
    background-color: rgba($background, .9);
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
  font-family: SingleDay;
  color: inherit;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: .5rem;
}

.logo_wrap { text-align: center; }

.hamburger_wrap { text-align: center; }

.apple_logo {
  line-height: 1;
  height: 2rem;

  &:hover { cursor: pointer; }
}

.hamburger {
  height: 2rem;
  opacity: .8;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}
</style>
