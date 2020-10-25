<template>
  <div>
    <div class="search_wrap">
      <div class="row">
        <div class="grid grid-1-2">
          <input type="search" placeholder="고객명" v-model="searchForm.customerName">
        </div>
        <div class="grid grid-1-2">
          <input type="search" placeholder="핸드폰 번호" :value="searchForm.customerMobile" @input="searchForm.customerMobile = $getTelFormat($event.target)">
        </div>
      </div>
    </div>
    <ul class="customer_wrap">
      <li class="customer-item" v-for="(item, index) in _customerList" :key="index" @click="goUpdate(item)">
        <p class="customerName">{{ item.customerName }}</p>
        <a :href="`tel:${item.customerMobile}`" class="customerMobile" @click.stop>{{ item.customerMobile }}</a>

        <span class="delete" @click="deleteCustomer(item.id)" @click.stop>❌</span>
      </li>
    </ul>
    <NoDataMessage tag="ul" :list="_customerList" :loading="loadData" />

    <Footer model="Customer">
      <template v-slot:button>
        <button type="button" class="btn-fill primary" @click="goCreate">등록하기</button>
      </template>
    </Footer>
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
  computed: {
    _customerList () {
      return this.customerList
        .filter(item => item.customerName.indexOf(this.searchForm.customerName) > -1)
        .filter(item => item.customerMobile.indexOf(this.searchForm.customerMobile) > -1)
    }
  },
  data () {
    return {
      searchForm: {
        customerName: '',
        customerMobile: ''
      },
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
        .orderBy('customerName', 'asc')
        .onSnapshot(snapshot => {
          this.customerList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          this.loadData = false
        })
    },
    goCreate () {
      this.$router.push({
        name: 'CustomerCreate'
      })
    },
    goUpdate (item) {
      this.$router.push({
        name: 'CustomerUpdate',
        params: {
          id: item.id,
          tag: item.customerName
        }
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
      font-size: 1.2rem;
      line-height: 2rem;
      color: $title;
      font-weight: bold;
    }

    .customerMobile {
      display: inline-block;
      background-color: $success;
      padding: .25rem .5rem;
      border-radius: .25rem;
      font-size: .9rem;
      color: #fff;
    }

    .customerBank { margin-top: .5rem; }

    .customerAddress { margin-top: .5rem; }

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
