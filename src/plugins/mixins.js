export default {
  install (Vue) {
    Vue.mixin({
      computed: {
        mixinRouteMetaTitle () { return this.$route.meta ? this.$route.meta.title : '' },
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
