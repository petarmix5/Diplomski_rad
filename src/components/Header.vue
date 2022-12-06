<template>
<div class="container pt-5 pb-5">
<!-- Content -->
<div class="row">
    <div class="col-xl-7 sideimg">
        <img :src="source" alt="tractorimg" >
    </div>
    <div class="col-xl-5 ">
        <h1>{{title}}</h1>
        <p> <i class="fa fa-house"></i> {{FirstParagraph}} </p>
        <p> <i class="fa-solid fa-hand-holding"></i> {{SecondParagraph}}</p>
        <p> <i class="fa-solid fa-calendar-days"></i> {{ThirdParagraph}}</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Header',
  props: ['title', 'FirstParagraph', 'SecondParagraph', 'ThirdParagraph', 'source'],

}
</script>

<style scoped>
h1, p{
  color:#fff;
  text-align: justify;
}
h1{
  font-family: CooperLtBT-Regular, Helvetica, sans-serif;
}
p{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.sideimg{
  text-align: center;
}
.sideimg img{
  width: min-content;
}

@media(max-width:1199px) {
  h1, p{
    color: #444;
    font-weight: bold;
  }
  .sideimg img{
    padding-bottom: 10px;
  }
  .sideimg img{
    width: 40%;
  }
}
</style>
