<template>
  <div class="home">
    <NavBar/>
    <Header 
    :title="title"
    :FirstParagraph="FirstParagraph" 
    :SecondParagraph="SecondParagraph"
    :ThirdParagraph="ThirdParagraph" 
    :source = "source"></Header>
  </div>
  <Footer></Footer>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/NavBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    Header,
    Footer
  },
  setup(){
    const title = ref('Aplikacija PoljoApp')
    const FirstParagraph = ref('PoljoApp predstavlja niz mogućnosti koje su potrebne poljoprivrednicima svakog dana.')
    const SecondParagraph = ref('Glavna značajka aplikacije jest vođenje evidencije radova u poljoprivredi. Aplikacija nudi korisnicima lakše praćenje zbog toga što u svakom trenutku imaju evidenciju na dlanu.')
    const ThirdParagraph = ref('Evidencija radova u poljoprivredi se odnosi na vođenje obrade zemljišta po datumima, rezidba voćaka, zaštita poljoprivrednih kultura te popis svih poljoprivrednih kultura koje ima jedno Obiteljsko poljoprivredno gospodarstvo.')
    const source = ref(require('@/assets/tractors.png'))


    return {title, FirstParagraph, SecondParagraph, ThirdParagraph, source}
  }
}
</script>

<style scoped>
.home{
    background: #f2f4e8 url(@/assets/bground.png) no-repeat;
    background-size: cover;
    top: 0;
    max-width: 100%;
    height:100%;
}

</style>
