<template>
  <div>
    <div>
      <ul class="customer_wrap">
        <li class="customer-item" v-for="(item, index) in customerList" :key="index" @click="goUpdate(item.id)">
          <p class="customerName">{{ item.customerName }}</p>
          <p class="customerMobile">{{ item.customerMobile }}</p>

          <span class="delete" @click="deleteCustomer(item.id)" @click.stop>❌</span>
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
import {
  // authService,
  dbService
} from '@/plugins/fbase'

export default {
  name: 'CustomerList',
  created () {
    this.getCustomerList()
  },
  data () {
    return {
      customerList: []
    }
  },
  methods: {
    async deleteCustomer (id) {
      const ok = window.confirm('정말 삭제하시겠습니까?')
      if (ok) {
        await dbService.doc(`customer/${id}`).delete().then(() => {
          this.$toast.success(
            '고객이 삭제되었습니다',
            this.ToastSettings
          )
        })
      }
    },
    async getCustomerList () {
      dbService.collection('customer')
        .orderBy('createtime', 'desc')
        .onSnapshot(snapshot => {
          this.customerList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        })
    },
    goCreate () {
      this.$router.push({
        name: 'CustomerCreate'
      })
    },
    goUpdate (id) {
      this.$router.push({
        name: 'CustomerUpdate',
        params: { id }
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
    position: relative;
    margin: .5rem 0;
    padding: 1rem;
    border-right: 3px solid $border;
    border-bottom: 3px solid $border;
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

    .delete {
      position: absolute;
      text-align: center;
      top: .5rem;
      right: .5rem;
      padding: .5rem;
      font-size: 1rem;
      color: $error;
    }
  }
}
</style>
