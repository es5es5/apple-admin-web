<template>
  <div>
    <div>
      <ul class="sales_wrap">
        <transition name="fade" mode="out-in" v-for="(item, index) in salesList" :key="index">
          <li class="sales-item" @click="goUpdate(item.id)">
            <div class="row">
              <div class="grid grid-3-5">
                <p class="customerName">{{ item.customerName }}</p>
                <a :href="`tel:${item.customerMobile}`" class="customerMobile" @click.stop>{{ item.customerMobile }}</a>
              </div>
              <div class="grid grid-1-5">
                <div class="apple_wrap" :data-appleCount="item.appleCount" :class="index === 1 ? 'active' : ''">
                  <img :src="require(`@/assets/images/apple-empty${index % 3 === 0 ? '-active' : ''}.svg`)" alt="" class="apple">
                </div>
              </div>
              <div class="grid grid-1-5 empty"></div>
            </div>

            <div class="row row-05">
              <div class="grid grid-1-5">
                  <span class="info">주소</span>
              </div>
              <div class="grid grid-4-5">
                  {{ item.customerAddress }}
              </div>
            </div>

            <div class="row">
              <div class="grid grid-1-5">
                <span class="info">상세주소</span>
              </div>
              <div class="grid grid-4-5">
                  {{ item.customerAddressDetail }}
              </div>
            </div>

            <div class="createtime_wrap">
              <!-- <span class="info">판매일</span> -->
              <span class="createtime">{{ item.salesDate | dateFormat('yyyy-MM-dd (EEE)') }}</span>
            </div>

            <p class="price">{{ item.price | numberWithComma }}<span class="won">원</span></p>

            <span class="delete" @click="deleteSales(item.id)" @click.stop>❌</span>
          </li>
        </transition>
      </ul>

      <Footer>
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
    async deleteSales (id) {
      const ok = window.confirm('정말 삭제하시겠습니까?')
      if (ok) {
        await dbService.doc(`sales/${id}`).delete().then(() => {
          this.$toast.success(
            '판매가 삭제되었습니다',
            this.ToastSettings
          )
        })
      }
    },
    async getSalesList () {
      dbService.collection('sales')
        .orderBy('createtime', 'desc')
        .onSnapshot(snapshot => {
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
    },
    goUpdate (id) {
      this.$router.push({
        name: 'SalesUpdate',
        params: { id }
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
    position: relative;
    margin: .5rem 0;
    padding: 1rem 1rem 3rem 1rem;
    border-bottom: 2px solid $border;
    &:last-child { border-bottom: transparent; }
    cursor: pointer;

    .delete {
      position: absolute;
      text-align: center;
      top: .5rem;
      right: .5rem;
      padding: .5rem;
      font-size: 1rem;
      color: $error;
    }

    .apple_wrap {
      position: relative;
      margin-bottom: .5rem;
      display: inline-block;
      width: 3rem;
      height: 3rem;
    }

    .apple_wrap::after {
      position: absolute;
      font-size: 1.25rem;
      left: 1.43rem;
      top: 1.9rem;
      transform: translate(-50%, -50%);
      content: attr(data-appleCount);
      pointer-events: none;
      font-weight: bolder;
    }

    .apple {
      display: inline-block;
    }

    .price {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      font-size: 1.2rem;
      font-weight: 800;

      .won {
        margin-left: .1rem;
        font-size: .5rem;
        font-weight: 400;
        color: $gray;
      }
    }

    .customerName {
      margin-bottom: .25rem;
      line-height: 2rem;
      font-size: 1.3rem;
      font-weight: bold;
    }

    .customerMobile {
      display: inline-block;
      margin-bottom: .5rem;
      background-color: $success;
      padding: .25rem .5rem;
      border-radius: .25rem;
      font-size: .9rem;
      color: #fff;
    }

    // .customerAddress { margin-top: 1rem; }
    // .customerAddressDetail { font-size: .9rem; }

    .createtime_wrap {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      line-height: 1rem;

      .createtime {
        font-size: .8rem;
      }
    }

    .info {
      display: inline-block;
      width: 2.5rem;
      font-size: .5rem;
      color: $gray;
    }
  }
}
</style>
