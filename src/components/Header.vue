<template>
  <div id="header" :class="scrolling ? 'scrolling' : ''">
    <div class="header_wrap">
      <div class="row">
        <div class="grid-1-6">
          <div class="logo_wrap" :class="scrolling ? 'scrolling' : ''">
            <img src="@/assets/images/apple-home.png" class="apple_logo" alt="home">
          </div>
        </div>
        <div class="grid grid-2-3 empty"></div>
        <div class="grid grid-1-6">
          <div class="hamburger_wrap">
            <img src="@/assets/images/hamburger.png" class="hamburger" alt="hamburger">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
  z-index: 5000;
  transition: background-color .5s;
  background-color: rgba($success, .8);
  border-bottom: 1px solid rgba($success, .3);

  &.scrolling { background-color: $background; }
}

.header_wrap {
  padding: .5rem;
  height: 3rem;
  line-height: 1;
  vertical-align: middle;
}

.logo_wrap {
}

.hamburger_wrap {
  padding: 0 .5rem;
  text-align: right;
}

.apple_logo {
  line-height: 1;
  padding: 0 1rem 0 .5rem;
  height: 2rem;
  border-right: 1px solid rgba($border, .5);

  &.scrolling { border-right: 1px solid rgba($border, 1); }
  &:hover {
    cursor: pointer;
  }
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
