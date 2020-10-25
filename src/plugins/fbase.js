/* eslint-disable no-console */

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var ENV = process.env.NODE_ENV
console.log(ENV)

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_OPS_API_KEY,
//   authDomain: process.env.VUE_APP_OPS_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_OPS_DATABASE_URL,
//   projectId: process.env.VUE_APP_OPS_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_OPS_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_OPS_MESSAGINGSENDER_ID,
//   appId: process.env.VUE_APP_OPS_APP_ID,
//   measurementId: process.env.VUE_APP_OPS_MEASUREMENT_ID
// }

firebase.initializeApp(firebaseConfig)

export const authService = firebase.auth()
export const firebaseInstance = firebase
export const dbService = firebase.firestore()
export const storageService = firebase.storage()
