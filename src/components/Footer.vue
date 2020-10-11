<template>
  <div id="footer">
    <div class="footer_wrap">
      <div class="row">
        <div class="grid-1-1">
          <button type="button" class="btn btn-fill">등록하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  },
  methods: {
  }
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
  font-weight: 700;
}
</style>
