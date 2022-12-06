<template>
  <div class="forgot">

    <section class="vh-110">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">
            <form @submit.prevent="forgot">
            
              <h3 class="mb-5">Promjena lozinke</h3>
  
              <div class="form-outline mb-4">
                <label class="form-label" for="typeEmail">Unesite email</label>
                <input type="email" id="typeEmail" class="form-control form-control-lg" v-model="email" />
              </div>
  
              <button class="btn btn-primary btn-lg btn-block" type="submit">Pošalji</button>
            </form>
          </div>
          <h5>
          <router-link class="link" :to="{name:'login'}"> <i class="fa fa-arrow-left" aria-hidden="true"></i></router-link>
        </h5>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
    
  </template>
  
<script>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { getAuth, sendPasswordResetEmail } from "@firebase/auth"
import router from '@/router'

export default {
      name: "Forgot",
      setup(){
        //Toast for alert
        const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })

        const auth = getAuth()
        
        const email = ref('')
        const forgot = () =>{

          sendPasswordResetEmail(auth, email.value)
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: 'Zahtjev je poslan'
                },router.push({name:'login'}))
              
            })
            .catch((error) => {
              console.log(error)
            })
        }


        return {email, forgot}
      }      
      
      }
  </script>

<style scoped>
.forgot{
    background: #f2f4e8 url(@/assets/bground.png) no-repeat;
    background-size:cover;
    top: 0;
    height:100vh;
  }
a.link{
  text-decoration: none;
  color: #000;
}
a.link:hover{
  color:orange;
}

p{
  padding: 10px 0 0 0;
}
p a{
  text-decoration: none;
  padding: 10px;
}
  
  </style>
