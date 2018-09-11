<template>
  <section class="p-panel">
    <h1 class="p-panel__title">Список Книг</h1>
    <table class="books-table">
      <tr class="books-table__row">
        <th
          v-for="td in columns"
          v-bind:key="td.name"
          class="books-table__td books-table__th"
        >
          {{td.label}}
        </th>
      </tr>
      <tr v-for="book in books" v-bind:key="book.id" class="books-table__tr">
        <td class="books-table__td">{{book.id}}</td>
        <td class="books-table__td">{{book.title}}</td>
        <td class="books-table__td">{{book.author}}</td>
        <td class="books-table__td">{{book.genres.join(",")}}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import { parametrizeItems } from "assets/helpers/filter";
import { genres, columns } from "assets/data";

export default {
  computed: {
    books () {
      return parametrizeItems(this.$store.state.books.items, this.$store.state.books.params)
    },
    genres () { return genres },
    columns () { return columns }
  }
}
</script>
