<template>
  <div>
    <div class="form_wrap">
      <form class="form" action="" @submit.prevent>
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
    <Footer>
      <template v-slot:button>
        <button type="button" class="btn-fill primary" @click="createCustomer">등록하기</button>
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
  name: 'CustomerCreate',
  data () {
    return {
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
    async createCustomer () {
      if (!await this.checkValidate()) return false

      this.customerForm.writerId = authService.currentUser.uid
      await dbService.collection('customer').add({
        createtime: Date.now(),
        ...this.customerForm
      }).then(() => {
        this.$toast.success(
          '고객이 등록되었습니다',
          this.ToastSettings
        )
      })
      this.goBack()
    }
  }
}
</script>

<style>

</style>
