<template>
  <div>
    <div>
      <div class="search_wrap">
        <div class="row">
          <div class="grid grid-1-3">
            <select name="상품_구분" id="상품_구분" v-model="searchForm.productType">
              <option value="">상품 전체</option>
              <option value="사과">사과</option>
              <option value="들기름">들기름</option>
            </select>
          </div>
          <div class="grid grid-1-3">
            <input type="search" placeholder="고객명" v-model="searchForm.customerName">
          </div>
          <div class="grid grid-1-3">
            <datetime
              id="판매일"
              name="판매일"
              placeholder="판매일"
              class="size-half"
              :phrases="{ok:'확인', cancel:'초기화'}"
              v-model="searchForm.salesDate"
              @close="getSalesList"
              format="yyyy.MM.dd"
            >
            <template slot="button-cancel">
              <span @click="resetDate">초기화</span>
            </template>
            </datetime>
          </div>
        </div>
      </div>
      <ul class="sales_wrap">
        <transition name="fade" mode="out-in" v-for="(item, index) in _salesList" :key="index">
          <li class="sales-item" @click="goUpdate(item)">
            <div class="row">
              <div class="grid grid-3-5">
                <p class="customerName">{{ item.customerName }}</p>
                <a :href="`tel:${item.customerMobile}`" class="customerMobile" @click.stop>{{ item.customerMobile }}</a>
              </div>
              <div class="grid grid-1-5">
                <div class="apple_wrap" v-if="item.productType === '사과'" :data-appleCount="item.appleCount">
                  <img :src="require(`@/assets/images/apple-empty.svg`)" alt="" class="apple">
                </div>
                <div class="bottle_wrap" v-if="item.productType === '들기름'" :data-appleCount="`${item.oilAmount}`">
                  <img :src="require(`@/assets/images/bottle.svg`)" alt="" class="bottle">
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
              <span class="createtime">{{ item.salesDate | dateFormat('yyyy-MM-dd (EEE)') }}</span>
            </div>

            <p class="price">{{ item.price | numberWithComma }}<span class="won">원</span></p>

            <span class="delete" @click="deleteSales(item)" @click.stop>❌</span>
          </li>
        </transition>
      </ul>
      <NoDataMessage tag="ul" :list="_salesList" :loading="loading" message="검색 결과가 없습니다." loadingMessage=""></NoDataMessage>

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
  computed: {
    _salesList () {
      return this.salesList
        .filter(item => item.productType.indexOf(this.searchForm.productType) > -1)
        .filter(item => item.customerName.indexOf(this.searchForm.customerName) > -1)
        .filter(item => this.getToDate(item.salesDate).indexOf(this.getToDate(this.searchForm.salesDate)) > -1)
    }
  },
  data () {
    return {
      searchForm: {
        productType: '',
        customerName: '',
        salesDate: null
      },
      salesList: []
    }
  },
  methods: {
    resetDate () { this.searchForm.salesDate = null },
    async deleteSales (item) {
      const ok = window.confirm(`[${item.customerName}] 정말 삭제하시겠습니까?`)
      if (ok) {
        await dbService.doc(`sales/${item.id}`).delete().then(() => {
          this.$toast.success(
            '판매가 삭제되었습니다',
            this.ToastSettings
          )
        })
      }
    },
    async getSalesList () {
      console.log(this.getToDate())
      dbService.collection('sales')
        .orderBy('salesDate', 'desc')
        .onSnapshot(snapshot => {
          this.salesList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          this.loading = false
        })
    },
    goCreate () {
      this.$router.push({
        name: 'SalesCreate'
      })
    },
    goUpdate (item) {
      this.$router.push({
        name: 'SalesUpdate',
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

    .apple_wrap, .bottle_wrap {
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

    .bottle_wrap::after {
      position: absolute;
      font-size: .75rem;
      left: 1.52rem;
      top: 1.9rem;
      transform: translate(-50%, -50%);
      content: attr(data-appleCount);
      pointer-events: none;
      font-weight: bolder;
    }

    .bottle {
      width: 3rem;
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
