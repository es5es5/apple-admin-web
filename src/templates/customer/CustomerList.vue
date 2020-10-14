<template>
  <div>
    <div>
      <ul class="customer_wrap">
        <li class="customer-item" v-for="index in 20" :key="index">
          <p class="customerName">김고객</p>
          <p class="customerMobile">010-2222-3333</p>
        </li>
      </ul>
      <Footer model="Customer">
        <template v-slot:button>
          <button type="button" class="btn-fill primary" @click="goCreate">등록하기</button>
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
.customer_wrap {
  @media (max-width: 900px) { width: 100%; }
  @media (min-width: 900px) {
    margin: 0 auto;
    width: 900px;

    .customer-item {
      opacity: .7;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }

  .customer-item {
    margin: .5rem 0;
    padding: 1rem;
    border-bottom: 1px solid $border;
    &:last-child { border-bottom: transparent; }
    background-color: $background;
    border-radius: .5rem;
    cursor: pointer;

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
