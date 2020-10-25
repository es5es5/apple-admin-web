import Vue from 'vue'

// https://github.com/mariomka/vue-datetime
import { Settings } from 'luxon'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Settings.defaultZoneName = 'Asia/Seoul'
Settings.defaultLocale = 'ko'
Vue.component('datetime', Datetime)
