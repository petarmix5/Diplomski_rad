<template>
    <div class="container-fluid" v-if="cultures.length === 0">
            <div class="alert alert-info">
                <h3>Potrebno je odabrati kulture kako bi mogli vidjeti ovu stranicu</h3>
            </div>
        </div>
     <div class="cultures" v-else>
        <h3>Kulture</h3>
    
        <div class="container-fluid">

            <div class="row" v-if="chooseCult">
                <div class="col-md-2 my-2" v-for="cult in cultures" :key="cult.id">
                    <div class="card" @click="chooseCult(cult.name)">
                        <img :src="cult.img" class="card-img-top mt-auto" :alt="cult.name">
                        <h6 class="card-title mt-auto">{{cult.name}}</h6>
                        </div>


                </div>
            </div>

 

        </div>

    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '@/main';
import { getAuth } from '@firebase/auth';
import router from '@/router';


export default {
    name: 'Cultures',
    setup(){
        

        const user = getAuth().currentUser

        const cultures = ref([])

        onMounted(async () => {
            //getAllculture from db
                const q = query(collection(db, "chooseCulture"), where("userID", "==",user.uid));
                const getMyCultures = await getDocs(q)
                getMyCultures.forEach((doc) =>{
                    const cultData = {
                        id: doc.id, 
                        userID: user.uid,
                        name: doc.data().name,
                        img: doc.data().img
                    }
                    cultures.value.push(cultData)
            })


        })
        
        //choose culture and redirect to culturedata
        const chooseCult = (name) =>{
           router.push({name: 'culturedata', params:{name}})
        }
        return{cultures, chooseCult,}
    }

}
</script>

<style scoped>
img{
    width: 100px;
}
.card{
    width: auto;
    height: 150px;
}
.card img{
    align-self: center;
}
.card-title{
    text-align: center;
}

.card:hover{
    transform: scale(1.05);
    cursor:pointer;
    background: lightgray;
    transition: 0.3s ease-out;
}

.modal{
    display:none;
}
</style>