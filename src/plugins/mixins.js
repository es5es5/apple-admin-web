export default {
  install (Vue) {
    Vue.mixin({
      computed: {
        mixinUser () { return this.$store.getters.getUser }
      },
      methods: {
        goBack () {
          this.$router.go(-1)
        }
      }
    })
  }
}
