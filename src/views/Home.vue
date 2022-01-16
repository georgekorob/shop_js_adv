<template>
  <div class="home">
    <header class="bg-dark">
      <searchcomp ref="search"></searchcomp>
    </header>
    <main class="main container">
      <showcasecomp ref="showcase"></showcasecomp>
    </main>
    <div class="container cart">
      <cartcomp ref="cart"></cartcomp>
    </div>
  </div>
</template>

<script>
import cartcomp from '@/components/Cart.vue'
import showcasecomp from '@/components/Showcase.vue'
import searchcomp from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    cartcomp,
    showcasecomp,
    searchcomp,
  },
  mounted() {
    console.log('root', this);
  }
}
</script>

<style>
body {
  background-color: #a8b1b1;
}

header {
  display: flex;
  position: relative;
  justify-content: space-between;
  color: #fafafa;
  padding: 10px;
  margin-bottom: 20px;
}

.goods-item {
  padding: 10px;
  border-color: #2c2649 !important;
}

.btn-search {
  background-color: transparent;
  border: none;
  color: #fafafa;
}
.search-field:focus{
  outline: none;
}
</style>
