<template>
  <div class="goods-list row">
    <div class="goods-item col border rounded m-1" v-for="good of filtered">
      <h3>{{ good.title }}</h3>
      <p>Цена: {{ good.price }}</p>
      <button class="btn btn-warning" @click="addToCart(good)" :data-id="good.id">
<!--        <button class="btn btn-warning" @click="this.$store.actions.addProductToCart(good)" :data-id="good.id">-->
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "showcasecomp",
  methods: {
    addToCart(product) {
      this.$store.dispatch('addProductToCart', product);
    }
  },
  computed: {
    filtered() {
      return this.$store.getters.getShowcase;
    }
  },
}
</script>

<style scoped>

</style>