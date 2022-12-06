<template>
  <nav class="navbar navbar-expand-lg  fixed-top">
  <div class="container-fluid">
    <!--Offcanvas trigger-->
    <button class="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
      <span class="navbar-toggler-icon"></span>
    </button>
  <!--Offcanvas trigger-->


    <a class="navbar-brand me-auto" href="#">
      <img :src="source" alt="logo" style="width:50%"/>
    </a>

    <div class="logout">
      <li><router-link @click="logout" :to="{name:'login'}"><i class="fa fa-user" ></i> Odjava</router-link></li>
    </div>

  </div>
</nav>

<div class="offcanvas offcanvas-start bg-dark text-white sidebar-nav" tabindex="-1" id="sidebar" aria-labelledby="offcanvasExampleLabel">

  <div class="offcanvas-body p-0">
    <nav class="navbar-dark">
      <ul class="navbar-nav">
        <li>
          <div class="text-muted small fw-bold text-uppercase px-3">
            ADMIN
          </div>
        </li>
        <li>
          <router-link :to="{name:'data'}" class="nav-link px-3">
            <span class="me-2">
              <i class="fas fa-pen-to-square text-success"></i>
            </span>
            Podaci
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'tasks'}" class="nav-link px-3" >
            <span class="me-2">
              <i class="fas fa-tasks text-success"></i>
            </span>
            Zadaci
          </router-link>
        </li>
        <li class="my-4"></li>
        <hr class="dropdown-divider"/>
        <li>
          <div class="text-muted small fw-bold text-uppercase px-3 py-1">
            MOJE KULTURE
          </div>
        </li>

        <li>
          <router-link :to="{name:'chooseculture'}" class="nav-link px-3" >
            <span class="me-2">
              <i class="fas fa-list text-success"></i>
            </span>
            Dodavanje novih kultura
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'cultures'}" class="nav-link px-3" >
            <span class="me-2">
              <i class="fas fa-list text-success"></i>
            </span>
            Kulture
          </router-link>
        </li>
        <li class="my-2"></li>

        <li>
          <div class="text-muted small fw-bold text-uppercase px-3 py-1">
            PRSKANJE I ZAŠTITA KULTURA
          </div>
        </li>
        <li>
          <router-link :to="{name:'spraying'}" class="nav-link px-3">
            <span class="me-2">
              <i class="fas fa-droplet text-success"></i>
            </span>
            Prskanje
          </router-link>
        </li>
        <li class="my-2"></li>


        <li>
          <div class="text-muted small fw-bold text-uppercase px-3 py-1">
            PRAĆENJE NAPRETKA
          </div>
        </li>
        <li>
          <a class="nav-link px-3 sidebar-link" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            <span class="me-2">
              <i class="fa-solid fa-chart-bar text-success"></i>
            </span>
            <span>Statistika</span>
            <i class="fas fa-chevron-down ms-auto right-icon"></i>
          </a>
      </li>
        <div class="collapse" id="collapseExample">
        <div>
        <ul class="navbar-nav ps-3">
          <router-link :to="{name:'statistics'}" class="nav-link px-3">
            <span class="me-2">
              <i class="fa-solid fa-chart-bar text-success"></i>
            </span>
            <span>Prinosi kultura</span>
          </router-link>
        </ul>
        </div>
      </div>
      </ul>
    </nav>
  </div>
</div>


</template> 

<script>
import {getAuth, signOut} from 'firebase/auth'
import { ref } from '@vue/reactivity'
import router from '@/router'

export default {
  name: 'NavBarAuth',
  components: {},
  setup(){
    


    const source = ref(require('@/assets/PoljoAppLogo.png'))

    const logout = () => {
      const auth = getAuth()
            signOut(auth)
            .then(() => {
                router.replace('/login')
            },
            (err) => {
              alert(err)  
            })
    }

    return{source, logout}
  }
  }


</script>

<style scoped>
.offcanvas.sidebar-nav{
    top: 0;
    left: 0;
    width: 270px;
}
.navbar.fixed-top{
  background: linear-gradient(148deg, rgba(250,151,0,1) 0%, rgba(247,227,189,1) 100%);
}
.sidebar-link{
  display: flex;
  align-items: center;
}
.sidebar-nav .nav-link{
  border-left: 1px solid transparent;
}
.sidebar-nav .nav-link:hover{
  background: rgba(247,227,189,0.1);
  border-left: 1px solid rgb(233, 154, 8);
}
.sidebar-link[aria-expanded="true"] .right-icon{
  transform: rotate(180deg);
}
.logout li{
  list-style-type: none;
}
.logout li a{
  text-decoration: none;
  color: brown;
  font-weight:500;
}
.logout a:hover{
  color: orangered;
  transition: ease-in-out 0.3s;
}


@media(min-width: 992px){
  .navbar{
    overflow: hidden;
  }
.offcanvas.sidebar-nav{
    transform: none;
    visibility: visible !important;
    top:58.5px;
    height: calc(100%-58.5px);
  }

}

</style>