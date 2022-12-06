<template>
  <div class="login">
  <NavBar/>
    <section class="vh-110">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Prijava</h3>

           
            <div class="form-outline mb-4">
              <label class="form-label" for="typeEmail">Email</label>
              <input type="email" id="typeEmail" class="form-control form-control-lg" v-model="email" />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="typePassword">Lozinka</label>
              <input type="password" @keyup.enter="login" id="typePassword" class="form-control form-control-lg" v-model="password"/>
            </div>

            <div v-if="errMsg" class="alert alert-danger">{{errMsg}}</div>

           

            <button class="btn btn-primary btn-lg btn-block" type="submit" @click="login">Prijava</button>
            
            <hr class="my-4">
            <p>Nemate korisnički račun? <router-link :to="{name:'signUp'}">Registriraj se</router-link></p>
            <p> <router-link :to="{name:'forgot'}">Zaboravili ste lozinku?</router-link></p>
            

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
    
  </template>
  
  <script>
import {firebase} from "firebase/app"
import {browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword} from "firebase/auth"
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'
import router from '@/router'

  export default {
      name: "Login",
      components: {NavBar},
      setup(){
        const name = ref('')
        const email = ref('')
        const password = ref('')

        const errMsg = ref()

        const login = () => {
          const auth = getAuth()
          setPersistence(auth, browserSessionPersistence)
          .then(() => {
            signInWithEmailAndPassword(auth, email.value, password.value)
            router.replace({name:'data'})
          })
            .catch(error => {
              switch(error.code) {
                case 'auth/invalid-email':
                  errMsg.value = 'Neispravan email'
                  break
                case 'auth/user-not-found':
                  errMsg.value = 'Email adresa ne postoji u bazi'
                  break
                case 'auth/wrong-password':
                  errMsg.value = 'Neispravna lozinka'
                  break
                default:
                  errMsg.value = 'Email ili lozinka su neispravni'
                  break
                
              }
            })
        }


        return {name, email, password, errMsg, login}
      }      
      
      }
  </script>

  <style scoped>
  .login{
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