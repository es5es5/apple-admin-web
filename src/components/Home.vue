<template>
  <div>
    <Header />
    <main class="main">
      <h3 class="greeting">안녕하세요! <span class="userName">{{ mixinUser.displayName }}</span>님</h3>
      <ul class="nav_wrap">
        <router-link tag="li" class="nav-item apple" :to="{ name: 'Sales' }">
          <img src="@/assets/images/sales.svg" class="nav-image" alt="apple">
          <p class="nav-title">판매 관리</p>
        </router-link>
        <router-link tag="li" class="nav-item customer" :to="{ name: 'Customer' }">
          <img src="@/assets/images/customer.svg" class="nav-image" alt="apple">
          <p class="nav-title">고객 관리</p>
        </router-link>
      </ul>
    </main>
  </div>
</template>

<script>
import Header from './Header'
import {
  // authService,
  dbService
} from '@/plugins/fbase'

export default {
  name: 'Home',
  created () {
    dbService.collection('inflow-log').add({
      userAgent: window.navigator.userAgent,
      routeName: this.$route.name,
      fullPath: this.$route.fullPath,
      userInfo: this.mixinUser,
      createtime: this.getToDate(Date.now(), 'yyyy-MM-dd HH:mm:ss')
    })
  },
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 3rem 0;
  padding: 1rem;
}

.greeting {
  font-size: 1.1rem;

  .userName {
    font-weight: bold;
  }
}

.nav_wrap {}

.nav-item {
  @include hover;

  margin: 1rem 0;
  padding: 3rem 0;

  text-align: center;
  border-radius: .5rem;
  background-color: $background;

  &.apple {
    background-color: rgba($primary, .5);
  }

  &.customer {
    background-color: rgba($success, .5);
  }
}

.nav-title {
  color: $title;
  font-weight: bold;
  font-size: 1.5rem;
}

.nav-image {
  width: 5rem;
  height: 5rem;
}
</style>
