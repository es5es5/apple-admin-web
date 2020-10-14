<template>
  <div>
    <div class="form_wrap">
      <form class="form" action="" @submit.prevent>
        <fieldset class="row-05">
          <!-- <legend>사과 등록</legend> -->
          <label for="사과">사과</label>
          <input type="number" id="사과" min="0" placeholder="사과 개수">

          <label for="고객">고객</label>
          <input type="text" id="고객" placeholder="고객명">

          <label for="핸드폰">핸드폰 번호</label>
          <input type="text" id="핸드폰" placeholder="핸드폰 번호">

          <label for="주소">주소</label>
          <input type="text" id="주소" placeholder="주소">
          <input type="text" id="상세주소" placeholder="상세주소">
        </fieldset>
      </form>
    </div>
    <Footer>
      <template v-slot:button>
        <button type="button" class="btn-fill">등록하기</button>
      </template>
    </Footer>
  </div>
</template>

<script>
export default {
  name: 'SalesCreate'
}
</script>

<style>

</style>
