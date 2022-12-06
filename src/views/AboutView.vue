<template>
  <div class="about">
    <NavBar/>
  <Header :title="title" :FirstParagraph="FirstParagraph"
  :SecondParagraph="SecondParagraph"
  :ThirdParagraph="ThirdParagraph"
  :source="source"/>
  <Footer/>
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { ref } from '@vue/reactivity';

export default {
  name: "AboutView",
  components: {NavBar,Header, Footer},
  setup(){
    const title = ref('PoljoApp nova aplikacija')
    const FirstParagraph = ref('PoljoApp omogućuje vođenje dnevnika radova u poljoprivredi kako bi sve obavljene poslove u tekućoj godini mogli pratiti.')
    const SecondParagraph = ref('Sve informacije nalaze se na jednom mjestu te im se može pristupiti u bilo koje vrijeme.')
    const ThirdParagraph = ref('Nema potrebe za zabrinutost u slučaju dolaska inspektorata koji provjerava dokumentaciju, već sve što je njima potrebno imate pohranjeno u PoljoApp aplikaciji.')
    const source = ref(require('@/assets/apk.png'))


    return {title, FirstParagraph, SecondParagraph, ThirdParagraph, source}

  }

}
</script>


<style scoped>

.about{
  background: #f2f4e8 url(@/assets/bground.png) no-repeat;
    background-size: cover;
    top: 0;
    max-width: 100%;
}




</style>