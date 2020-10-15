import Vue from 'vue'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const ToastOptions = {
  // transition: 'Vue-Toastification__bounce',
  // transition: 'Vue-Toastification__fade',
  // transition: 'my-custom-fade',
  maxToasts: 1,
  newestOnTop: true
}

const ToastSettings = {
  position: 'top-right',
  timeout: 1000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.2,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false
}

Vue.use(Toast, ToastOptions)
Vue.prototype.ToastSettings = ToastSettings
