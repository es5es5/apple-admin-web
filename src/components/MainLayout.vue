<template>
  <div>
    <Header />
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './Header'

export default {
  name: 'MainLayout',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 3rem 0;
}
</style>
