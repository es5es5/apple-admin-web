import Vue from 'vue'

import './fbase'
import './toast'
import './datepicker'
import MIXINS from './mixins'
// https://vee-validate.logaretm.com/v2
import VeeValidate from 'vee-validate'
import DisableAutocomplete from 'vue-disable-autocomplete'
// https://github.com/inotom/vue-go-top
import GoTop from '@inotom/vue-go-top'

Vue.use(MIXINS)
Vue.use(VeeValidate)
Vue.use(DisableAutocomplete)
Vue.component('GoTop', GoTop)
