<template>
  <div id="slider">
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
        <img src="@/assets/images/apple-normal.svg" alt="home" class="sliderIcon">
        HOME
      </li>
      <li @click="goSlideRouter('Sales')">
        <img src="@/assets/images/sales.svg" alt="sales" class="sliderIcon">
        판매 관리
      </li>
      <li @click="goSlideRouter('Customer')">
        <img src="@/assets/images/customer.svg" alt="customer" class="sliderIcon">
        고객 관리
      </li>
      <li class="logout" @click="logout">
        <img src="@/assets/images/logout.svg" alt="logout" class="sliderIcon">
        로그아웃
      </li>
      <div class="honeybee_wrap">
        <span class="made">Designed By.</span>
        <img src="@/assets/images/honeybee.svg" alt="honeybee" class="honeybee">
      </div>
    </Slide>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import { authService } from '@/plugins/fbase'

export default {
  name: 'Slider',
  components: {
    Slide
  },
  computed: {
    _width () { return (window.innerWidth + 1).toString() }
  },
  watch: {
    '$route.path' () { this.closeMenu() }
  },
  data () {
    return {
      slideIsOpen: false
    }
  },
  methods: {
    openMenu () { this.slideIsOpen = true },
    closeMenu () { this.slideIsOpen = false },
    logout () {
      authService.signOut()
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'Login' })
    },
    goSlideRouter (name) {
      this.slideIsOpen = false
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
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

li.logout {
  margin-top: 3rem;
}

.honeybee_wrap {
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  .made {
    font-size: 1rem;
    line-height: 4rem;
    margin-right: 1rem;
  }

  .honeybee {
    line-height: 1rem;
    width: 4rem;
  }
}
</style>
