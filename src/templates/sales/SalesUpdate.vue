<template>
  <div id="salesUpdate">
    <div class="form_wrap">
      <form class="form" action="" @submit.prevent>
        <fieldset class="row-05">
          <legend>상품 정보</legend>
          <label for="상품" class="required" :class="{'error': errors.has('상품'), 'valid': fields['상품'] ? fields['상품'].valid : false}">상품</label>
          <select name="상품" id="상품" v-model="salesForm.productType">
            <option value="">선택</option>
            <option value="사과">사과</option>
            <option value="들기름">들기름</option>
          </select>

          <template v-if="salesForm.productType === '사과'">
            <label for="사과" class="required" :class="{'error': errors.has('사과'), 'valid': fields['사과'] ? fields['사과'].valid : false}">사과 개수</label>
            <input type="number" id="사과" name="사과" min="0" placeholder="사과 개수" v-model="salesForm.appleCount" v-validate="'required'">
          </template>

          <template v-else-if="salesForm.productType === '들기름'">
            <label for="들기름" class="required" :class="{'error': errors.has('들기름'), 'valid': fields['들기름'] ? fields['들기름'].valid : false}">들기름 용량</label>
            <input type="number" id="들기름" name="들기름" min="0" placeholder="들기름 용량" v-model="salesForm.appleCount" v-validate="'required'">
          </template>
        </fieldset>
      </form>

      <form class="form" action="" @submit.prevent>
        <fieldset class="row-05">
          <legend>판매 정보</legend>
          <label for="판매일" class="required" :class="{'error': errors.has('판매일'), 'valid': fields['판매일'] ? fields['판매일'].valid : false}">판매일</label>
          <datetime id="판매일" name="판매일" v-model="salesForm.salesDate" v-validate="'required'"></datetime>

          <label for="가격" class="required" :class="{'error': errors.has('가격'), 'valid': fields['가격'] ? fields['가격'].valid : false}">가격</label>
          <input type="text" id="가격" name="가격" placeholder="가격" :value="salesForm.price | numberWithComma" @input="salesForm.price = $getComma($event.target)" v-validate="'required'">
        </fieldset>
      </form>

      <form class="form" action="" @submit.prevent>
        <fieldset class="row-05">
          <legend>고객 정보</legend>
          <label for="고객" class="required" :class="{'error': errors.has('고객'), 'valid': fields['고객'] ? fields['고객'].valid : false}">고객</label>
          <input type="text" id="고객" name="고객" placeholder="고객명" v-model="salesForm.customerName" v-validate="'required'">

          <label for="핸드폰">핸드폰 번호</label>
          <input type="text" id="핸드폰" name="핸드폰" placeholder="핸드폰 번호" :value="salesForm.customerMobile" @input="salesForm.customerMobile = $getTelFormat($event.target)">

          <label for="주소">주소</label>
          <input type="text" id="주소" name="주소" placeholder="주소" class="button" v-model="salesForm.customerAddress">
          <button type="button" class="btn" @click="searchAddress">검색</button>
          <input type="text" id="상세주소" name="상세주소" placeholder="상세주소" v-model="salesForm.customerAddressDetail">
        </fieldset>
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
  // authService,
  dbService
} from '@/plugins/fbase'

export default {
  name: 'SalesUpdate',
  created () {
    this.getSales()
  },
  computed: {
  },
  data () {
    return {
      salesForm: {
        productType: '사과',
        appleCount: '',
        customerName: '',
        customerMobile: '',
        customerAddress: '',
        customerAddressDetail: '',
        salesDate: '',
        price: ''
      }
    }
  },
  methods: {
    async searchAddress () {
      const address = await this.getAddress(this.salesForm.customerAddress, 'HI')
      this.salesForm.customerAddress = address.address
    },
    async getSales () {
      await dbService.collection('sales').doc(this._id).get().then(doc => {
        this.salesForm = doc.data()
      })
    },
    async updateSales () {
      if (!await this.checkValidate()) return false

      this.salesForm.updatetime = Date.now()
      this.salesForm.price = this.salesForm.price ? this.salesForm.price.toString().replace(/,/g, '') : ''
      await dbService.doc(`sales/${this._id}`).update(
        this.salesForm
      ).then(() => {
        this.$toast.success(
          '판매가 수정되었습니다',
          this.ToastSettings
        )
      })
      this.goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
#salesUpdate {
  background-color: $background;
  height: 100vh;
}
</style>
