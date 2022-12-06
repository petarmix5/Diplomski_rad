<template>
      <div class="col-6">
      <div class="card mb-3 crd">
      <div class="card-header"><slot name="header"></slot></div>
      <div class="card-body">
        <h5 class="card-title"><slot name="card-title"></slot></h5>
        <p class="card-text"><slot name="card-text"></slot></p>
      </div>
    </div>

    </div>
</template>

<script>
export default {
  name: 'Cards',

}
</script>

<style scoped>
.card.crd{
  border-left: 4px solid sandybrown;
  background: lightgoldenrodyellow;
}
</style>