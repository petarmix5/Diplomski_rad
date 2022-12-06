<template>
   <div class="chooseculture">
        <h3>Dodaj nove kulture</h3>    
        <div class="container-fluid">             
            <div class="row">
                <div class="col-6">
                    <div class="card">
                    <div class="card-header">
                        Dostupne kulture 
                       
                    </div>
                    <div class="row p-3">

                    <div class="col-md my-2" v-for="cult in chooseCulture" :key="cult.id">
                        <div class="card choosecult" @click="chooseCult(cult)">
                            <img :src="cult.img" class="card-img-top mt-auto" :alt="cult.name">
                            <h6 class="card-title mt-auto">{{cult.name}}</h6>
                            </div>
                    </div>
                    </div>

                    </div>
                </div>

                <div class="col-6">
                    <div class="card">
                    <div class="card-header">
                        Moje kulture
                    </div>
                    <div class="row p-3">

                    <div class="col-md my-2" v-for="choosencult in cultures" :key="choosencult.id">
                        <div class="card choosecult" @click="removeCult(choosencult)">
                            <img :src="choosencult.img" class="card-img-top mt-auto" :alt="choosencult.name">
                            <h6 class="card-title mt-auto">{{choosencult.name}}</h6>
                            
                            </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { addDoc, collection, getDocs,query, where, doc, deleteDoc, onSnapshot} from '@firebase/firestore';
import { db} from '@/main';
import { getAuth } from '@firebase/auth';

export default {
    name: 'chooseculture',
    setup(){


        const user = getAuth().currentUser

        const chooseCulture = ref([])
      
        const cultures = ref([])

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
       
                //add cult to cultures list
            const chooseCult= (cult) => {
                if(cultures.value.find(e => e['name'] === cult.name)){
                    Toast.fire({
                    icon: 'warning',
                    title: 'Kultura već postoji'
                    })  

                }else{
                    const docRef = addDoc(collection(db, 'chooseCulture'), {
                        id: cult.id,
                        userID: user.uid,
                        name: cult.name,
                        img: cult.img
                }, Toast.fire({
                icon: 'success',
                title: 'Kultura je dodana na listu'
                },cultures.value.push(cult)))                    
                }
        }

        //remove culture from collection
        const removeCult = (choosencult) => {
            Swal.fire({
                    title: 'Jeste li sigurni da želite obrisati kulturu s popisa?',
                    text: "Ako izbrišete kulturu, više nećete imati mogućnost vratiti izbrisani zapis!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonText: 'Odustani',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Da, obriši!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                    Toast.fire({
                    icon: 'info',
                    title: 'Vaša kultura je uklonjena'
                    },deleteDoc(doc(db, 'chooseCulture', choosencult.id)))
                    
                }
            })
            
        }


        onMounted(async()=>{

            //get all documents in a collection allcultures
            //allcultures - contains all data of each culture
            const getAllCulture = await getDocs(collection(db, 'allcultures'))
            getAllCulture.forEach((doc) => {
                const cultObj = {
                        id: doc.id, 
                        userID: user.uid,
                        name: doc.data().name,
                        img: doc.data().img
                    }
                chooseCulture.value.push(cultObj)
            })

            //Get all documents from a collection for this user
            //data for current user and his cultures
            const q = query(collection(db, "chooseCulture"), where("userID", "==",user.uid))
            onSnapshot(q, (querySnapshot) => {
            const fbcults = [];
            querySnapshot.forEach((doc) => {
                const cul = {
                    id: doc.id,
                    userID: user.uid,
                    name: doc.data().name,
                    img:doc.data().img
                }
                fbcults.push(cul)
                })
                cultures.value = fbcults
            })
           

    })

        return{cultures, chooseCult, chooseCulture, removeCult,}
    }

}

</script>

<style scoped>
img{
    width: 80px;
}
.card.choosecult{
    height: 100px;
}
.card img{
    align-self: center;
}
.card-title{
    text-align: center;
}

.card.choosecult:hover{
    transform: scale(1.05);
    cursor:pointer;
    background: lightgray;
    transition: 0.3s ease-out;
}
</style>