import Vue from 'vue'

import './fbase'
import './toast'
import './datepicker'
import MIXINS from './mixins'
// https://vee-validate.logaretm.com/v2
import VeeValidate from 'vee-validate'

import GoTop from '@inotom/vue-go-top'

Vue.use(MIXINS)
Vue.use(VeeValidate)
Vue.component('GoTop', GoTop)
