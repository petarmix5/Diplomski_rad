<template>
  <div class="container-fluid" v-if="cultureinfo.length === 0">
        <div class="alert alert-info">
            <h3>Potrebno je odabrati kulture kako bi mogli vidjeti ovu stranicu</h3>
        </div>
    </div>

    <div class="sprayingdata" v-else>
        <h3>Podaci o zaštiti kultura </h3>
        <div class="container-fluid" >

        <div class="row rowImg" v-for="cult in cultureinfo" :key="cult.id">
            <img :src="cult.img" :alt="cult.name">
        </div>

        <div class="col-md-12">
                <div class="card">
                <div class="card-header">
                    <button type="button" class="btn btn-primary d-flex ms-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Novi unos</button>
                
                <!-- Modal for new Data -->
                <div class="modal fade" v-for="cult in cultureinfo" :key="cult.id" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Unos novih podataka - {{cult.name}} </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="row">
                            <div class="col-md-6 colimg">
                                <img :src="cult.img" :alt="cult.name">
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                <label for="purpose" class="form-label">Unesite namjenu</label>
                                <input type="text" class="form-control" id="purpose" v-model="newSprayData.purpose" placeholder="Insekticid">
                                </div>
                                <div class="mb-3">
                                <label for="pesticides" class="form-label">Unesite sredstvo</label>
                                <input type="text" class="form-control" id="pesticides" v-model="newSprayData.pesticides" placeholder="Decis">
                                </div>
                                <div class="mb-3">
                                <label for="quentity" class="form-label">Unesite utrošak u l</label>
                                <input type="number" class="form-control" v-model="newSprayData.quantity" id="quantity" placeholder="550l">
                                </div>
                                <div class="mb-3">
                                <label for="date" class="form-label">Unesite datum</label>
                                <input type="date" class="form-control" v-model="newSprayData.date" id="date" placeholder="550l">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Odustani</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addNewData">Spremi</button>
                    </div>
                    </div>
                </div>
                </div>
                <!--End Modal-->

                </div>
                <div class="card-body">
                    <div class="table table-responsive text-center">
                    <table id="table" class="table table-responsive table-striped table-light" >

                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Namjena</th>
                    <th>Sredstvo</th>
                    <th>Utrošak u l</th>
                    <th>Datum</th>
                    <th>Akcije</th>

                    </tr>
                    </thead>
                    <tbody v-for="(dataSpray, index) in allDataForSpraying" :key="dataSpray.id">
                <tr>
                    <td>{{index+1}}</td>
                    <td>{{dataSpray.purpose}}</td>
                    <td>{{dataSpray.pesticides}}</td>
                    <td>{{dataSpray.quantity}}</td>
                    <td>{{dataSpray.date}}</td>
                    <td class="text-end">
                        <a role="button" :data-bs-target="'#editModal'+index" data-bs-toggle="modal" class="btn btn-success" ><i class="fa fa-edit"></i> </a>
                        <a role="button" class="btn btn-danger ms-3" @click="deleteData(dataSpray.id)"><i class="fa fa-trash"></i> </a>  

                    <!-- Modal for editing data-->
                <div class="modal fade" v-for="cult in cultureinfo" :key="cult.id" :id="'editModal' +index"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Izmjena podataka - {{cult.name}} </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="row">
                            <div class="col-md-6 colimg">
                                <img :src="cult.img" :alt="cult.name">
                            </div>
                            <div class="col-md-6 align-left">
                                <div class="mb-3">
                                <label for="purpose" class="form-label">Unesite namjenu</label>
                                <input type="text" class="form-control" id="purpose" v-model="dataSpray.purpose" placeholder="Insekticid">
                                </div>
                                <div class="mb-3">
                                <label for="pesticides" class="form-label">Unesite sredstvo</label>
                                <input type="text" class="form-control" id="pesticides" v-model="dataSpray.pesticides" placeholder="Decis">
                                </div>
                                <div class="mb-3">
                                <label for="quantity" class="form-label">Unesite utrošak u l</label>
                                <input type="number" class="form-control" v-model="dataSpray.quantity" id="quantity" placeholder="550l">
                                </div>
                                <div class="mb-3">
                                <label for="date" class="form-label">Unesite datum</label>
                                <input type="date" class="form-control" v-model="dataSpray.date" id="date" placeholder="550l">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Odustani</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="editData(dataSpray.id, index)" >Spremi promjene</button>
                    </div>
                    </div>
                </div>
                </div>
                <!--End Modal for editing-->

                    </td>
                </tr>
                    </tbody>
                    </table>
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
import { addDoc, collection, deleteDoc, doc,onSnapshot, query, updateDoc, where } from '@firebase/firestore';
import { db } from '@/main';
import { getAuth } from '@firebase/auth';
import router from '@/router';

export default {
    name: 'sprayingdata',
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

        const user = getAuth().currentUser

        const newSprayData = ref({
            purpose: '',
            pesticides: '',
            quantity: '',
            date: '',
        })

        const cultureinfo = ref([])
        const allDataForSpraying = ref([])

        onMounted(async () => {

            //get current culture with img
            const q = query(collection(db, "chooseCulture"), where("name", "==", router.currentRoute.value.params.name), where( "userID",'==', user.uid));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const getData={
                    id: doc.id,
                    userID: user.uid,
                    name: doc.data().name,
                    img: doc.data().img
                }
                cultureinfo.value.push(getData)

                })

                //get all data for current culture / listen
                const qu = query(collection(db, `chooseCulture/${cultureinfo.value[0].id}/spraying/`));
                onSnapshot(qu, (querySnapshot) => {
                    const allnewsprayingdata = []
                    querySnapshot.forEach((doc) => {
                        const newData = {
                            id:doc.id,
                            purpose: doc.data().purpose,
                            pesticides: doc.data().pesticides,
                            quantity: doc.data().quantity,
                            date: doc.data().date
                        }
                            allnewsprayingdata.push(newData)
                        })
                        allDataForSpraying.value = allnewsprayingdata
                        })
                    })
                    

        }) 

        //delete data from db
        const deleteData = (id) => {
            Swal.fire({
                    title: 'Jeste li sigurni da želite obrisati podatke s popisa?',
                    text: "Ako izbrišete podatke, više ih nećete moći vratiti!",
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
                    title: 'Vaši podaci su uklonjeni'
                    },deleteDoc(doc(collection(db,`chooseCulture/${cultureinfo.value[0].id}/spraying/`),id)))
                    
                }
            })
            
        }

        //edit data from db
        const editData = (id, index) =>{
        Toast.fire({
                icon: 'info',
                title: 'Vaša izmjena je pohranjena'
                }, updateDoc(doc(db,  `chooseCulture/${cultureinfo.value[0].id}/spraying/`,id),
     allDataForSpraying.value[index]))   

     console.log(id) 
    }

        //add new collection into document
        const addNewData = () =>{
        
        Toast.fire({
            icon: 'success',
            title: 'Novi podaci su pohranjeni'
            },addDoc(collection(db,`chooseCulture/${cultureinfo.value[0].id}/spraying/`), {
                purpose: newSprayData.value.purpose,
                pesticides: newSprayData.value.pesticides,
                quantity: newSprayData.value.quantity,
                date: newSprayData.value.date,
            })
        ) 
        

        }


        return{cultureinfo, addNewData, allDataForSpraying, newSprayData, deleteData, editData}
    }

}
</script>

<style scoped>
img{
    width: 30%;
}
.rowImg{
    justify-content: center;
}
.colimg img{
    width:100%;
}
.card-body{
    vertical-align: baseline;
}
.modal{
    display:none;
}
</style>