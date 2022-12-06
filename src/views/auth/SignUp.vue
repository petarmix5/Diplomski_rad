<template>
  <div class="signup">
    <NavBar/>

    <section class="vh-110">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Registracija</h3>

            <div class="form-outline mb-4">
              <label class="form-label" for="typeName">Ime</label>
              <input type="name" id="typeName" class="form-control form-control-lg" v-model="name" />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="typeEmail">Email</label>
              <input type="email" id="typeEmail" class="form-control form-control-lg" v-model="email" />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="typePassword">Lozinka</label>
              <input type="password" id="typePassword" class="form-control form-control-lg" @keyup.enter="login" v-model="password"/>
            </div>

            <button class="btn btn-primary btn-lg btn-block" type="submit" @click="register">Registracija</button>

            <p>Već imate korisnički račun? <router-link :to="{name:'login'}">Prijavi se</router-link></p>
            
            <hr class="my-4">

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
  </template>
  
  <script>
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import NavBar from '@/components/NavBar.vue'
import { ref } from '@vue/reactivity'
import { doc, setDoc } from "@firebase/firestore"
import { db } from '@/main'
import router from '@/router'

  export default {
      name: "SignUp",
      components: {NavBar},
      setup(){
        let name = ref(null)
        let email = ref(null)
        let password = ref(null)

        const register = () => {
          const auth = getAuth() 
            createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((user) => {
              setDoc(doc(db, "profiles", user.user.uid), {
              name: name.value
            })
                router.replace({name:'login'})
            },
            (err) => {
              alert(err)  
            })
        }

        return {name, email, password, register}
      }
  }
  </script>
  
  <style scoped>

.signup{
    background: #f2f4e8 url(@/assets/bground.png) no-repeat;
    background-size: cover;
    top: 0;
    max-width: 100%;
}
.form-check-label {
  padding: 0 10px;
}

p{
  padding: 10px 0 0 0;
}
p a{
  text-decoration: none;
  padding: 10px;
}
  
  </style>