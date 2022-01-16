<template>
  <div class="cart-list row">
    <button class="btn btn-warning cart-button" @click="show = !show">{{ btnText }}</button>
    <div class="goods-item col border rounded m-1" v-for="good of cart" v-if="show">
      <h3>{{ good.title }}</h3>
      <p>Цена: {{ good.price }}</p>
      <p>Количество: {{ good.quantity }}</p>
      <button class="btn btn-danger" @click="deleteProductFromCart(good.id)" :data-id="good.id">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartcomp",
  data() {
    return {
      show: true,
    }
  },
  methods: {
    deleteProductFromCart(id) {
      this.$store.dispatch('deleteProductFromCart', id);
    },
  },
  computed: {
    btnText: function() {
      if(this.show) {
        return 'Закрыть корзину'
      }
      return 'Корзина'
    },
    cart() {
      return this.$store.getters.getCart;
    }
  },
}
</script>

<style scoped>

</style>