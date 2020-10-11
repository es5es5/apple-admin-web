<template>
  <div>
    <Header />
    <main class="main">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 2.5rem 0;
}
</style>
