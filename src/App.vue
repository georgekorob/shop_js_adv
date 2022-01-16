<template>
<!--  <div id="nav">-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </div>-->
  <router-view/>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('loadShowcase');
      this.$store.dispatch('loadCart');
    }
  }
</script>
