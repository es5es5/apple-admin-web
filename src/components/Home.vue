<template>
  <div>
    <Header />
    <main class="main">
      <h3 class="greeting">안녕하세요! <span class="userName">관리자님</span></h3>
      <ul class="nav_wrap">
        <li class="nav-item">
          <span class="nav-title">
            <img src="" alt="">사과 관리</span>
        </li>
        <li class="nav-item">
          <span class="nav-title">고객 관리</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import Header from './Header'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 3rem 0;
  padding: .5rem;
}

.greeting {
  font-size: 1.1rem;

  .userName {
    font-weight: bold;
  }
}

.nav_wrap {}

.nav-item {
  margin: 1rem 0;
  padding: 20% 0;

  text-align: center;
  background-color: #CFD1D3;
  border-radius: .5rem;
}

.nav-title {
  color: $title;
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
