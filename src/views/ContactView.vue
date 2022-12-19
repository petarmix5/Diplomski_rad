<template>
  <div class="contact">
      <NavBar/>
        <!-- Content -->
        <div class="row py-5 px-5">
            <div class="col-sm-12 col-lg-6 col-xl-7">
                <h1>{{title}}</h1>
                    <img :src="emailImg" alt="emailImg">
                  </div>

                <div class="col-sm-12 col-lg-6 col-xl-5 info">
                  <h4> {{paragraphOne}} </h4><br>
                  <div class="col">
                    <h5><i class="fas fa-phone"> </i> +385 99-864-2839</h5>
                    <hr>
                    <h5><i class="fas fa-envelope"></i> petarmix5@gmail.com</h5>
                    <hr>
                    <h5><i class="fas fa-envelope"></i> petarmix5@hotmail.com</h5>
                  </div>
                </div>
            </div>
        </div>
        <Footer/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { ref } from '@vue/reactivity'
export default {
    components:{NavBar,Footer},
    setup(){
        const title = ref('Kontakt')
        const paragraphOne = ref('Kontakt informacije PoljoApp aplikacije:')
        const paragraphTwo = ref('')
        const emailImg = ref(require('@/assets/email.jpg'))

        return {title, paragraphOne, paragraphTwo, emailImg}
    }

}
</script>

<style scoped>
.contact{
    background: #f2f4e8 url(@/assets/bground.png) no-repeat;
    background-size: cover;
    top: 0;
    overflow: hidden;
    max-width: 100%;
    height:100%;
}
.contact h1, p{
  color:#fff;
}

.contact h1{
  font-family: CooperLtBT-Regular, Helvetica, sans-serif;
}
.contact p{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.info{
    color: #fff;
}
img{
  max-width:90%;
  border-radius: 10px;
  margin-bottom: 10px;
}
@media (max-width: 992px){
  .col-lg-6 {
      width: 100%;
  }
  img{
    width: 50%;
  }
  .row{
    text-align: center;
  }
}

</style>