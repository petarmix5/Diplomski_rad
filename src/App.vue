<template>
  <div class="main">
  <router-view/>
</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import router from './router'



export default{
  name:'App',
  setup(){

    const currentRoute = router.currentRoute
    
    const user = getAuth().currentUser
    onMounted(() => {

      
      const auth = getAuth()
          onAuthStateChanged(auth, (user) => {
              if(user){
                  const email = user.email
                  if(!currentRoute.value.meta.requiresAuth){
                    router.push({name: 'data'})
                  }
              }else{
                const email = ''
                if(currentRoute.value.meta.requiresAuth){
                  router.push({name: 'login'})
                }
              }
          })
    })
  }
}
</script>


<style scoped>
#app{
  font-family: Helvetica,Verdana,sans-serif;
  text-align: center;
  color: #2c3e50;
}

.main{
    display: block;
    width: 100%;
    height: 100vh;
    
}
</style>
