<template>
  <div id="preview">
    <div class="iframe_wrap" v-if="_ENV === 'production'">
      <iframe src="//ops-chungju-apple.netlify.app/" width="375" height="812" frameborder="0"></iframe>
    </div>
    <div class="iframe_wrap" v-else>
      <iframe src="//test-chungju-apple.netlify.app/" width="375" height="812" frameborder="0"></iframe>
    </div>
    {{ _ENV }}
  </div>
</template>

<script>
export default {
  name: 'Preview',
  computed: {
    _ENV () {
      return process.env.NODE_ENV
    }
  }
}
</script>

<style lang="scss" scoped>
#preview {
  min-height: 100vh;
  padding: 60px 0;
  background-color: #5F5F5F;
}
.iframe_wrap {
  width: 375px;
  height: 812px;
  margin: 0 auto;
}
</style>
