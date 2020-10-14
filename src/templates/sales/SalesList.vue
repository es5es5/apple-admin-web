<template>
  <div>
    <div>
      <ul class="sales_wrap">
        <li class="sales-item" v-for="(item, index) in salesList" :key="index">
          <div class="row">
            <div class="grid grid-1-4 empty">
              <div class="apple_wrap" :data-appleCount="item.appleCount" :class="index === 1 ? 'active' : ''">
                <img :src="require(`@/assets/images/apple-empty${index % 3 === 0 ? '-active' : ''}.svg`)" alt="" class="apple">
              </div>
            </div>
            <div class="grid grid-3-4">
              <p class="customerName">{{ item.customerName }} <span class="customerMobile">{{ item.customerMobile }}</span></p>
            </div>
          </div>
          <!-- <h3 class="title">{{ item.appleCount }}</h3> -->
          <!-- <p class="customerBank">신한 <span class="customerAccount">110-555-9994444</span></p> -->
          <p class="customerAddress">{{ item.customerAddress }}</p>
          <p class="customerAddressDetail">{{ item.customerAddressDetail }}</p>
          <p class="createtime">{{ item.createtime }}</p>
          <p class="price">{{ item.price }}</p>
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
  @media (max-width: 900px) { width: 100%; }
  @media (min-width: 900px) {
    margin: 0 auto;
    width: 900px;

    .sales-item {
      opacity: .7;

      &:hover {
        opacity: 1;
        cursor: pointer;
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

    .apple_wrap {
      position: relative;
      display: inline-block;
      width: 3.5rem;
    }

    .apple_wrap::after {
      position: absolute;
      font-size: 1.5rem;
      left: 1.66rem;
      top: 2.1rem;
      transform: translate(-50%, -50%);
      content: attr(data-appleCount);
      pointer-events: none;
      font-weight: bolder;
    }

    .price {
      float: right;
      margin-top: -2rem;
      font-size: 1.5rem;
      font-weight: 800;
    }

    .customerName {
      margin-right: .5rem;
      line-height: 3.5rem;
      font-size: 1.3rem;
      color: $success;
      font-weight: bold;
    }

    .customerMobile {
      font-size: 1.1rem;
      color: #000;
      font-weight: bold;
    }

    .customerBank {
      margin-top: .5rem;
    }
    .customerAccount {}

    .customerAddress {
      margin-top: .5rem;
    }
    .customerAddressDetail {}

    .createtime {
      line-height: 1rem;
      font-size: .8rem;
      color: $gray;
    }
  }
}
</style>
