<template>
  <div>
    <div>
      <ul class="apple_wrap">
        <li class="apple-item">
          <h3 class="title">충주사과 15</h3>
          <span class="customerName">김고객</span><span class="customerMobile">010-5555-4444</span>
          <span class="customerBank">신한</span>
          <span class="customerAccount">110-555-9994444</span>
          <p class="customerAddress">서울시 강남구 마음대로 486길</p>
          <p class="customerAddressDetail">301동 1024호</p>
        </li>
        <li class="apple-item">
          <h3 class="title">충주사과 15</h3><span class="customerName">김고객</span><span class="customerMobile">010-5555-4444</span>
        </li>
        <li class="apple-item">
          <h3 class="title">OO사과 20</h3>
        </li>
        <li class="apple-item">
          <h3 class="title">15</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppleList'
}
</script>

<style lang="scss" scoped>
.apple_wrap {
  padding: 1rem;
  margin: 0 auto;

  @media (max-width: 1200px) { width: 100%; }
  @media (min-width: 1200px) {
    width: 1200px;
    .apple-item {
      opacity: .7;
      &:hover {
        opacity: 1;
      }
    }
  }

  .apple-item {
    padding: 1rem .5rem;
    border-bottom: 1px solid $border;

    .title {
      padding: .5rem;
      line-height: 2rem;
      vertical-align: middle;
      font-size: 2rem;
      font-weight: bold;
      color: $primary;
    }

    .customerName {
      margin-right: .5rem;
      line-height: 1;
      font-weight: bold;
      vertical-align: middle;
    }
    .customerMobile {
      line-height: 1;
      font-weight: bold;
      vertical-align: middle;
    }
    .customerBank {}
    .customerAccount {}
  }
}
</style>
