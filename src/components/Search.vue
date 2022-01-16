<template>
  <div class="col-md-11 text-end">
    <form action="#">
      <input type="text" class="search-field" v-model="searchString">
      <button class="btn-search" type="submit">
        <i class="fas fa-search"></i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "searchcomp",
  computed: {
    searchString: {
      get() {return this.$store.getters.getSearchString},
      set(value) {this.$store.commit('setSearchString', value)},
    }
  },
}
</script>

<style scoped>

</style>