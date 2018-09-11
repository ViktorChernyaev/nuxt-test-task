<template>
  <section class="p-panel">
    <div v-for="book in books" v-bind:key="book.id">
      <div>{{book.title}}: {{book.author}}</div>
    </div>
  </section>
</template>

<script>
import { parametrizeItems } from "assets/helpers/filter";
export default {
  computed: {
    books () {
      return parametrizeItems(this.$store.state.books.items, this.$store.state.books.params)
    }
  },
}
</script>
