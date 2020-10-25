<template>
  <footer id="footer">
    <div class="footer_wrap">
      <slot name="button" v-if="height > 600"></slot>
      <!-- <button type="button" class="btn-fill" @click="goCreate(_model)">등록하기</button> -->
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  beforeMount () {
    this.windowResizingEventListen()
  },
  beforeDestroy () {
    window.removeEventListener('resize', () => {})
  },
  data () {
    return {
      height: window.innerHeight
    }
  },
  methods: {
    windowResizingEventListen () {
      window.addEventListener('resize', () => {
        this.height = window.innerHeight
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: transparent;

  &.scrolling { background-color: #fff; }
}

.footer_wrap {
  height: 3rem;
  line-height: 1;
  vertical-align: middle;
}

.btn-fill {
  border: 1px solid transparent;
  width: 100%;
  height: 3rem;
  font-size: 1.5rem;
  color: $title;
  font-family: SingleDay;
  font-weight: bold;
  letter-spacing: .25rem;
  border-radius: 1rem 1rem 0 0;

  &.primary { background-color: $primary; }
  &.orange { background-color: $orange; }
}
</style>
