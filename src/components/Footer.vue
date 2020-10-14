<template>
  <footer id="footer">
    <div class="footer_wrap">
      <slot name="button"></slot>
      <!-- <button type="button" class="btn-fill" @click="goCreate(_model)">등록하기</button> -->
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5000;
  background-color: $background;
  border-top: 1px solid $border;

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
  background-color: $primary;
  font-size: 1.5rem;
  color: $title;
  font-family: SingleDay;
  font-weight: bold;
  letter-spacing: .25rem;
  border-radius: .5rem .5rem 0 0;
}
</style>
