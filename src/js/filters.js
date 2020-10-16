import { DateTime } from 'luxon'

export default {
  install (Vue) {
    /**
     * 숫자, 천 단위마다 콤마 필터
     */
    Vue.filter('numberWithComma', value => {
      if (value !== 0 && !value) return ''
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    })
    /**
     * 날짜 포맷 필터
     */
    Vue.filter('dateFormat', (value, format = 'yyyy-MM-dd') => {
      if (!value || isNaN(value)) return '-'
      return DateTime.fromMillis(value).setLocale('ko').toFormat(format)
    })
  }
}
