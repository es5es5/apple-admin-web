<template>
  <div>
    <div class="form_wrap">
      <form class="form" action="" @submit.prevent>
        <fieldset class="row-05">
          <!-- <legend>사과 등록</legend> -->
          <label for="사과">사과</label>
          <input type="number" id="사과" min="0" placeholder="사과 개수" v-model="salesForm.appleCount" required>

          <label for="고객">고객</label>
          <input type="text" id="고객" placeholder="고객명" v-model="salesForm.customerName">

          <label for="핸드폰">핸드폰 번호</label>
          <input type="text" id="핸드폰" placeholder="핸드폰 번호" v-model="salesForm.customerMobile">

          <label for="주소">주소</label>
          <input type="text" id="주소" placeholder="주소" v-model="salesForm.customerAddress">
          <input type="text" id="상세주소" placeholder="상세주소" v-model="salesForm.customerAddressDetail">

          <label for="가격">가격</label>
          <input type="text" id="가격" placeholder="가격" :value="salesForm.price | numberWithComma" @input="salesForm.price = $getComma($event.target)">
        </fieldset>
      </form>
    </div>
    <Footer>
      <template v-slot:button>
        <button type="button" class="btn-fill" @click="createSales">등록하기</button>
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
  name: 'SalesCreate',
  data () {
    return {
      salesForm: {
        appleCount: '',
        customerName: '',
        customerMobile: '',
        customerAddress: '',
        customerAddressDetail: '',
        createtime: Date.now(),
        price: ''
      }
      // salesForm: {
      //   appleCount: '16',
      //   customerName: '김고객',
      //   customerMobile: '010-2222-3333',
      //   customerAddress: '서울 강남구 내맘대로 486길',
      //   customerAddressDetail: '123-456',
      //   createtime: Date.now(),
      //   price: '50000'
      // }
    }
  },
  methods: {
    async createSales () {
      this.salesForm.price = parseFloat(this.salesForm.price.replace(/,/g, ''))
      await dbService.collection('sales').add(
        this.salesForm
      )
    }
  }
}
</script>

<style>

</style>
