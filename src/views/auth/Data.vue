<template>
    <div class="data">
        <h3>Osobni podaci</h3>
        <div class="col-12 img">
            <img :src="sourceimg" alt="userinfo">
        </div>
        <div class="row data-info">
            <div class="col-md-6">
            <div class="form-group py-2">
                <input type="text" placeholder="Ime"  v-model="profile.name" class="form-control">
            </div>
        </div>
            <div class="col-md-6">
            <div class="form-group py-2">
                <input type="text" placeholder="Prezime" v-model="profile.lastname" class="form-control">
            </div>
        </div>
            <div class="col-md-6">
            <div class="form-group py-2">
                <input type="text" placeholder="Naziv OPG-a" v-model="profile.opgname" class="form-control">
            </div>
        </div>
            <div class="col-md-6">
            <div class="form-group py-2">
                <input type="text" placeholder="Broj poljoprivredne kartice" v-model="profile.numberopg" class="form-control">
            </div>
        </div>
            <div class="col-md-6">
            <div class="form-group py-2">
                <input type="text" placeholder="MIBPG broj" v-model="profile.mibpg" class="form-control">
            </div>
        </div>
            <div class="col-md-6">
            <div class="form-group py-2">
                <input type="text" placeholder="Broj žiro računa OPG-a" v-model="profile.accopg" class="form-control">
            </div>
        </div>
            <div class="col-md-6">
            <div class="form-group py-2">
                <button @click="updateField" class="btn btn-primary">
                    Spremi
                </button>
            </div>
            </div>
        </div>
        
        

</div>

</template>

<script>
import { updateDoc, doc, onSnapshot } from '@firebase/firestore'
import { db} from '@/main'
import { reactive,ref} from '@vue/reactivity'
import { onMounted, } from 'vue'
import { getAuth, } from '@firebase/auth'

export default {
    name: 'Data',
    setup(){
        
        const sourceimg = ref(require('@/assets/userinfo.jpg'))
        let profile = reactive({
                name: null,
                lastname: null,
                opgname: null, 
                numberopg: null,
                mibpg: null,
                accopg: null
        })

        const user = getAuth().currentUser
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

        onMounted( ()=>{  
        //real database wait for updates, get data from db
        onSnapshot(doc(db, 'profiles', user.uid), (doc) => {
        Object.assign(profile,doc.data())
        })
    })
    //Update users data 
    const updateField = async () =>{
        const docRef = doc(db, 'profiles', user.uid)
       Toast.fire({
                icon: 'success',
                title: 'Vaša izmjena je pohranjena'
                },await updateDoc(docRef, profile))
    }
  
    return{profile, updateField, sourceimg}
    }
}
</script>

<style scoped>
.data img{
    width: 30%;
}
.data .img{
    text-align: center;
}
</style>