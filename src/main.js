
import { createApp} from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, onAuthStateChanged} from "firebase/auth"
import 'firebase/storage'

import jQuery from 'jquery'

import Swal from 'sweetalert2'

require('sweetalert2')
window.$ = window.jQuery = jQuery

window.Swal = Swal

const firebaseConfig = {
  apiKey: "AIzaSyCXtnfJY9az-aBRQ_SUQ0wd0VOspb8GDmk",
  authDomain: "vueapp-aa698.firebaseapp.com",
  projectId: "vueapp-aa698",
  storageBucket: "vueapp-aa698.appspot.com",
  messagingSenderId: "672862170748",
  appId: "1:672862170748:web:c1c51e6ec514ad5d7663f9"
};

const fb = initializeApp(firebaseConfig)
const db = getFirestore(fb)

let app

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  router.replace('data')
  if(user){
    const uid = user.uid
  }
  if(!app){
    app = createApp(App)
    .use(router).mount('#app')
  }

})

export {fb, db, }


