<template>
  <div>
    <div class="form_wrap">
      <form class="form" action="" autocomplete="off" @submit.prevent>
        <legend>고객 정보</legend>
        <fieldset class="row-05">
          <label for="고객" class="required" :class="{'error': errors.has('고객'), 'valid': fields['고객'] ? fields['고객'].valid : false}">고객</label>
          <input type="text" id="고객" name="고객" placeholder="고객명" v-model="customerForm.customerName" v-validate="'required'">

          <label for="핸드폰">핸드폰 번호</label>
          <input type="tel" id="핸드폰" name="핸드폰" placeholder="핸드폰 번호" :value="customerForm.customerMobile" @input="customerForm.customerMobile = $getTelFormat($event.target)">

          <label for="주소">주소</label>
          <input type="text" id="주소" name="주소" placeholder="주소" class="button" v-model="customerForm.customerAddress">
          <button type="button" class="btn" @click="searchAddress">검색</button>
          <input type="text" id="상세주소" name="상세주소" placeholder="상세주소" v-model="customerForm.customerAddressDetail">
        </fieldset>
      </form>
    </div>

    <div class="sales_wrap">
      <form class="form" action="" autocomplete="off" @submit.prevent>
        <legend>판매 내역</legend>
        <ul>
          <li class="sales-item" v-for="(item, index) in salesList" :key="index" @click="goSalesUpdate(item)">
            {{ index + 1 }}. <span class="productType">{{ item.productType }}</span> <span class="createtime">{{ item.salesDate | dateFormat }}</span>
          </li>
        </ul>
        <NoDataMessage tag="ul" style="margin-top: .5rem" :list="salesList" :loading="loadData" message="판매 내역이 없습니다" />
      </form>
    </div>

    <Footer>
      <template v-slot:button>
        <button type="button" class="btn-fill orange" @click="updateSales">수정하기</button>
      </template>
    </Footer>
  </div>
</template>

<script>
import {
  authService,
  dbService
} from '@/plugins/fbase'

export default {
  name: 'CustomerUpdate',
  created () {
    this.getCustomer()
  },
  computed: {
  },
  data () {
    return {
      salesList: [],
      customerForm: {
        customerName: '',
        customerMobile: '',
        customerAddress: '',
        customerAddressDetail: '',
        createtime: Date.now()
      }
    }
  },
  methods: {
    async searchAddress () {
      const address = await this.getAddress()
      this.customerForm.customerAddress = address.address
    },
    async getCustomer () {
      await dbService.collection('customer').doc(this._id).get().then(doc => {
        Object.assign(this.customerForm, doc.data())
        this.getSalesList()
      })
    },
    async getSalesList () {
      dbService.collection('sales')
        .where('customerMobile', '==', this.customerForm.customerMobile)
        .orderBy('salesDate', 'desc')
        .get()
        .then(result => {
          result.forEach(doc => this.salesList.push({
            id: doc.id,
            ...doc.data()
          }))
          this.loadData = false
        })
    },
    async updateSales () {
      if (!await this.checkValidate()) return false

      this.customerForm.updatetime = Date.now()
      this.customerForm.updaterId = authService.currentUser.uid
      await dbService.doc(`customer/${this._id}`).update(
        this.customerForm
      ).then(() => {
        this.$toast.success(
          '고객이 수정되었습니다',
          this.ToastSettings
        )
      })
      this.goBack()
    },
    goSalesUpdate (item) {
      this.$router.push({
        name: 'SalesUpdate',
        params: {
          id: item.id
          // tag: item.customerName
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sales_wrap {
  .sales-item {
    @include clearfix;
    @include hover;
    padding: .5rem 0;
    border-bottom: 1px solid $border;

    .createtime {
      float: right;
      color: $gray;
    }
  }
}
</style>
