<template>
  <div>
    <div>
      <ul class="apple_wrap">
        <li class="apple-item" v-for="index in 20" :key="index">
          <p class="customerName">김고객</p>
          <p class="customerMobile">010-2222-3333</p>
        </li>
      </ul>
      <Footer model="Customer">
        <template v-slot:button>
          <button type="button" class="btn-fill" @click="goCreate">등록하기</button>
        </template>
      </Footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerList',
  components: {
  },
  methods: {
    goCreate () {
      this.$router.push({
        name: 'CustomerCreate'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.apple_wrap {
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
    margin: .5rem 0;
    padding: 1rem;
    border-bottom: 1px solid $border;
    &:last-child { border-bottom: transparent; }
    background-color: $background;
    border-radius: .5rem;

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
      font-size: 1.2rem;
      color: $title;
      font-weight: bold;
    }
    .customerMobile {
      font-size: .9rem;
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
