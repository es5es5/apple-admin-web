<template>
  <div>
    <div>
      <ul class="apple_wrap">
        <li class="apple-item" v-for="index in 5" :key="index">
          <div class="row">
            <div class="grid grid-11-12">
              <h3 class="title">충주사과 15</h3>
              <span class="customerName">김고객</span><span class="customerMobile">010-5555-4444</span>
              <p class="customerBank">신한 <span class="customerAccount">110-555-9994444</span></p>
              <p class="customerAddress">서울시 강남구 마음대로 486길</p>
              <p class="customerAddressDetail">301동 1024호</p>
              <p class="createtime">2020-10-12 15:44</p>
              <p class="price">255,000</p>
            </div>
            <div class="grid grid-1-12"></div>
          </div>
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
    &:last-child { border-bottom: transparent; }

    .title {
      margin-bottom: .5rem;
      vertical-align: middle;
      font-size: 2rem;
      font-weight: bold;
      color: $primary;
    }

    .price {
      float: right;
      margin-top: -2rem;
      font-size: 1.5rem;
      font-weight: 800;
    }

    .customerName {
      margin-right: .5rem;
      font-size: 1.1rem;
      color: $success;
      font-weight: bold;
      vertical-align: middle;
    }
    .customerMobile {
      font-size: 1.1rem;
      color: $success;
      font-weight: bold;
      vertical-align: middle;
    }
    .customerBank {
      margin-top: .5rem;
    }
    .customerAccount {}

    .customerAddress {
      margin-top: .5rem;
    }
    .customerAddressDetail {}
  }
}
</style>
