export default {
  install (Vue) {
    Vue.mixin({
      computed: {
        _id () { return this.$route.params.id },
        mixinRouteMetaTitle () { return this.$route.meta ? this.$route.meta.title || '충주 사과' : '충주 사과' },
        mixinUser () { return this.$store.getters.getUser }
      },
      methods: {
        isEmpty (value) {
          if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
            return true
          } else {
            return false
          }
        },
        goBack () { this.$router.go(-1) },
        async checkValidate () {
          if (!await this.$validator.validate()) {
            this.$toast.error(
              '필수 입력사항을 확인해주세요',
              this.ToastSettings
            )
            return false
          } else {
            return true
          }
        },
        /**
         * 사업자번호 포맷
         */
        $getBusinessNumberFormat (businessNumberObject) {
          let value = businessNumberObject.value.replace(/-/g, '')
          value = value.replace(/\D/gi, '')
          var result = value
          if (!result || isNaN(result)) {
            businessNumberObject.value = ''
            return ''
          }

          if (value.length > 3) {
            result = value.substring(0, 3) + '-' + value.substring(3, 5) + '-' + value.substring(5, 10)
          }

          if (value.length > 11) {
            result = value.substring(0, 10)
          }

          return result
        },
        /**
         * 생년월일 포맷
         */
        $getBirthdayFormat (birthdayObject) {
          let value = birthdayObject.value.replace(/-/g, '')
          value = value.replace(/\D/gi, '')
          var result = value
          if (!result || isNaN(result)) {
            birthdayObject.value = ''
            return ''
          }

          if (value.length > 4) {
            result = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8)
          }

          if (value.length > 9) {
            result = value.substring(0, 8)
          }

          return result
        },
        /**
         * 전화번호 포맷
         */
        $getTelFormat (telObject) {
          let value = telObject.value.replace(/-/g, '')
          value = value.replace(/\D/gi, '')
          var result = value
          if (!result || isNaN(result)) {
            telObject.value = ''
            return ''
          }

          if (value.length > 2) {
            if (value.substring(0, 2) === '02') {
              if (value.length > 5) {
                if (value.length > 9) {
                  result = value.substring(0, 2) + '-' + value.substring(2, 6) + '-' + value.substring(6, 10)
                } else {
                  result = value.substring(0, 2) + '-' + value.substring(2, 5) + '-' + value.substring(5, value.length)
                }
              } else if (value.length > 2) {
                result = value.substring(0, 2) + '-' + value.substring(2, value.length)
              }
            } else {
              if (value.length > 6) {
                if (value.length > 10) {
                  result = value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7, 11)
                } else {
                  result = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, value.length)
                }
              } else if (value.length > 3) {
                result = value.substring(0, 3) + '-' + value.substring(3, value.length)
              }
            }
          }

          return result
        },
        /**
         * 콤마 포맷
         */
        $getComma (CommaObject) {
          let value = CommaObject.value

          if (!value) { return '' }

          const pattern = /[^\d,-]/g

          if (pattern.test(value)) {
            value = value.replace(pattern, '')
            CommaObject.value = value
            return value
          }

          if (value.substr(0, 1) === '-') {
            value = '-' + Number(value.replace(/[,-]/g, ''))
          } else {
            value = Number(value.replace(/[,-]/g, ''))
          }

          const result = value.toLocaleString('en').split('.')[0]
          return result.toString()
        },
        /**
         * 일 형식 하이픈포멧 (ex 19990101 -> 1999-01-01 )
         */
        $addHyphenDate (DateOjbect) {
          let value = DateOjbect.value.replace(/-/g, '')
          value = value.replace(/\D/gi, '')
          var result = value
          if (!result || isNaN(result)) {
            DateOjbect.value = ''
            return ''
          }

          if (result.length > 6) {
            result = result.substring(0, 4) + '-' + result.substring(4, 6) + '-' + result.substring(6, result.length)
          } else if (result.length > 4) {
            result = result.substring(0, 4) + '-' + result.substring(4, result.length)
          }
          return result
        }
      }
    })
  }
}
