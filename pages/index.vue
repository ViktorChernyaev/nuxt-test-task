<template>
  <section class="p-panel">
    <h1 class="p-panel__title">Список Книг</h1>
    <div class="books-filters">
      <div v-for="filter in filters" class="books-filters__item" :key="filter.name">
        <v-select
          v-if="filter.type === 'select'"
          multiple
          :options="genres"
          :value="filter.value"
          @input="(value) => changeFilter(value, filter)"
        ></v-select>
        <input
          v-else
          :type="filter.type"
          :placeholder="filter.label"
          :name="filter.name"
          :value="filter.value"
          @keyup="(e) => changeFilter(e, filter)"
        />
      </div>
    </div>
    <table class="books-table">
      <thead>
        <tr class="books-table__row">
          <th
            v-for="td in columns"
            :key="td.name"
            class="books-table__td books-table__th"
          >
            {{td.label}}
            <div
              class="books-table__sort-icon"
              :class="td.cname"
              @click="changeSort(td)"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id" class="books-table__tr">
          <td class="books-table__td">{{book.id}}</td>
          <td class="books-table__td">{{book.title}}</td>
          <td class="books-table__td">{{book.author}}</td>
          <td class="books-table__td">{{book.genres.join(", ")}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { parametrizeItems, mergeSort, SORT_TYPE_AZ, SORT_TYPE_ZA } from "assets/helpers/filter";
import { genres, columns } from "assets/data";

export default {
  computed: {
    books () {
      return parametrizeItems(this.$store.state.books.items, this.$store.state.books.params)
    },
    genres () { return genres },
    columns () {
      return columns.map((item, i) => {
        const { name, value } = this.$store.state.books.params.sort[0];
        const cname = {
          "books-table__sort-icon--def": name !== item.name,
          "books-table__sort-icon--az": name === item.name && value === SORT_TYPE_AZ,
          "books-table__sort-icon--za": name === item.name && value === SORT_TYPE_ZA
        };
        return { ...item, cname };
      });
    },
    filters () {
      return columns.map(item => {
        const { filters } = this.$store.state.books.params;
        const filter = filters.find(filter => filter.name === item.name);
        item.value = (filter && (filter.value || filter.value === 0)) ? filter.value : "";
        return item;
      })
    }
  },
  methods: {
    changeSort(item) {
      this.$store.commit("books/mergeParams", { sort: item.name });
    },
    changeFilter(e, item) {
      console.log(e)
      let { value, type } = e && e.target ? e.target : { value: e, type: "select" };
      const prevFilter = this.$store.state.books.params.filters.find(filter => filter.name === item.name);
      const isDelete = prevFilter && prevFilter.value.length && value === "";
      if (type === "number") {
        value = parseInt(value);
      }
      console.log({ name: item.name, value })
      if (isDelete || value.length || (typeof value === "number")) {
        this.$store.commit("books/mergeParams", { filters: { name: item.name, value }});
      }
    }
  }
}
</script>
