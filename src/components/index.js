export default {
  install (Vue) {
    Vue.component('Footer', () => import('./Footer'))
    Vue.component('NoDataMessage', () => import('./NoDataMessage'))
  }
}
