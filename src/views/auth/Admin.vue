<template>
  <NavBarAuth/>
  <div class="admin mt-5 pt-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          
          <router-view/>
          
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import NavBarAuth from '@/components/NavBarAuth.vue';
export default {
  name: 'Admin',
  components:{NavBarAuth}

}
</script>

<style>
@media(min-width: 992px){
  
.admin{
  margin-left: 270px;
}
}

</style>