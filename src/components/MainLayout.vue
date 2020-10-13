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
  padding: 3.5rem .5rem;
}
</style>
