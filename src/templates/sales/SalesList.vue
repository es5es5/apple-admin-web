<template>
  <div>
    <div>
      <ul class="sales_wrap">
        <li class="sales-item" v-for="(item, index) in salesList" :key="index">
          <div class="row">
            <div class="grid grid-1">
              <h3 class="title">{{ item.appleCount }}</h3>
              <span class="customerName">{{ item.customerName }}</span><span class="customerMobile">{{ item.customerMobile }}</span>
              <!-- <p class="customerBank">신한 <span class="customerAccount">110-555-9994444</span></p> -->
              <p class="customerAddress">{{ item.customerAddress }}</p>
              <p class="customerAddressDetail">{{ item.customerAddressDetail }}</p>
              <p class="createtime">{{ item.createtime }}</p>
              <p class="price">{{ item.price }}</p>
            </div>
          </div>
        </li>
      </ul>
      <Footer>
        <template v-slot:button>
          <button type="button" class="btn-fill" @click="goCreate">등록하기</button>
        </template>
      </Footer>
    </div>
  </div>
</template>

<script>
import {
  // authService,
  dbService
} from '@/plugins/fbase'

export default {
  name: 'SalesList',
  created () {
    this.getSalesList()
  },
  data () {
    return {
      salesList: []
    }
  },
  methods: {
    async getSalesList () {
      dbService.collection('sales').onSnapshot(snapshot => {
        this.salesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    },
    goCreate () {
      this.$router.push({
        name: 'SalesCreate'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sales_wrap {
  @media (max-width: 1200px) { width: 100%; }
  @media (min-width: 1200px) {
    width: 1200px;
    .sales-item {
      opacity: .7;
      &:hover {
        opacity: 1;
      }
    }
  }

  .sales-item {
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
