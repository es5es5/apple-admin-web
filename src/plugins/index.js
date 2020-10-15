import Vue from 'vue'

import './fbase'
import './toast'
import MIXINS from './mixins'
// https://vee-validate.logaretm.com/v2
import VeeValidate from 'vee-validate'

Vue.use(MIXINS)
Vue.use(VeeValidate)
