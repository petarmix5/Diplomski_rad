<template>
  <div class="tasks">
    <h3>Zadaci</h3>
    <div class="row">
    <div class="col-md-6">
        <form class="d-flex" @submit.prevent="addTask">
        <input class="form-control me-3" type="text" v-model="newTask" placeholder="Unesi zadatak" aria-label="Task">
        <button class="btn btn-success" type="submit" :disabled="!newTask" @click="addTask">Dodaj</button>
      </form>

      <div class="img-task mt-5">
          <img :src="sourceimg" alt="tasks">
      </div>
    </div>


    <div class="col-md-6 justify-content-center">
      <div class="card mb-3" v-for="task in tasks" :key="task.id" :class="{'border-success' : task.done}">
        <div class="card-body">
            <div class="row">
                <div class="col-6 task align-self-center" :class="{'text-success text-decoration-line-through' : task.done}">
                    {{task.content}}
                </div>
                <div class="col-6 btns ">
                    <button class="btn btn-secondary" :class="task.done ? 'bg-success' : 'bg-secondary'"
                     @click="toggleDone(task.id)">
                    &check;
                    </button>
                    <button class="btn btn-danger ms-2" @click="deleteTask(task.id)">
                    &cross;
                    </button>
                </div>
            </div>
    </div>
    </div>
    </div>
    </div>
  </div>

</template>

<script>
import {ref, onMounted} from 'vue'
import { db } from '@/main'
import { collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc, query, where} from '@firebase/firestore'
import { getAuth } from '@firebase/auth'
import Swal from 'sweetalert2'


export default {
    setup(){
    const sourceimg = ref(require('@/assets/tasks.jpg'))

    const user = getAuth().currentUser

    const tasks = ref([])
    const q = query(collection(db,'tasks'), where('userID','==',user.uid))
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

                
        //get Tasks in realtime database
        onMounted(() => {
           
            //listen for updates
            onSnapshot(q, (allTasks) => {
                const fbTasks = []
                allTasks.forEach((doc) => {
                    const task = {
                        id: doc.id, 
                        content: doc.data().content,
                        done: doc.data().done
                    }
                    fbTasks.push(task)
                })
                tasks.value = fbTasks
            })               
        })


        //create new task for each user 

        const newTask = ref('')

        const addTask = () => {
            addDoc(collection(db, 'tasks'),{
                userID: user.uid,
                content: newTask.value,
                done: false
           })
            newTask.value = ''
        }

        //delete Task
        const deleteTask = (id) =>{
                Swal.fire({
                    title: 'Jeste li sigurni da želite obrisati zadatak?',
                    text: "Nećete imati mogućnosti vratiti izbrisani zapis!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Da, obriši!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        Toast.fire({
                        icon: 'success',
                        title: 'Vaš zadatak je obrisan'
                        },deleteDoc(doc(db, 'tasks',id)))                    
                }
            })
        }

        //tasks done
        const toggleDone = (id) => {
            const index = tasks.value.findIndex(task => task.id === id)
            updateDoc(doc(db, 'tasks', id),{
                done: !tasks.value[index].done
            })
        }
        return {sourceimg, tasks, addTask, newTask, deleteTask, toggleDone}
    }
}
</script>

<style scoped>
form{
    max-width: 400px;
    padding: 20px;
}
.card{
    max-width: 360px;
    padding:10px;
    margin-top: 20px;
}
.card .btns{
    text-align: end;
}
.col-md-6{
    text-align: -webkit-center;
}
.tasks .img-task img{
    width:100%;
}
</style>