<template>
  <div>
    <Header />
    <main class="main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
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
  margin: 0 auto;
}
</style>
