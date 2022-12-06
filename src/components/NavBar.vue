<template>
 <div id="nav">
  <nav class="container-liquid navbar navbar-expand-lg">
    <div class="navbar-brand ms-3">
        <img src="@/assets/PoljoAppLogo.png" alt="logo">
    </div>
    <button class="navbar-toggler me-3" type="button" data-toggle="collapse" data-target="#navbarCollapse"
        aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse mx-2" id="navbarCollapse">
        <div class="navbar-nav">
            <router-link to="/home" class="nav-item nav-link">Početna</router-link>
            <router-link to="/about" class="nav-item nav-link ">O nama</router-link>
            <router-link to="/contact" class="nav-item nav-link">Kontakt</router-link>
            <hr/>
            <router-link to="/login" class="nav-item nav-link login">Prijava <i class="fa fa-user"></i></router-link>    
        </div> 
    </div>
</nav>
 </div>
</template>

<script>
export default {
}
</script>

<style scoped>
#nav .navbar-brand img{
    width:50%;
}
#nav a {
  font-weight: bold;
  color: white;
}
#nav a.router-link-exact-active {
  color: green;
  border-bottom: 1px solid lightgreen;
}
#nav a:hover{
    color:green;
}
#nav .login{
  position:absolute;
  right: 2px;
}
@media (max-width:992px){
  #nav .login{
  position:relative;
}
}
</style>