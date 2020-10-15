<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
@import '@/../colony-vue/src/assets/scss/reset.scss';
@import '@/../colony-vue/src/assets/scss/grid.scss';

@import '@/assets/scss/variable.scss';
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/form.scss';
@import '@/assets/scss/button.scss';
@import '@/assets/scss/toast.scss';
</style>

<style lang="scss">
.fade-enter-active,
.fade-leave-active { transition: opacity .1s }
.fade-enter,
.fade-leave-to { opacity: 0 }
</style>
