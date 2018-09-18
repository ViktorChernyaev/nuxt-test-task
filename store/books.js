import { books } from "assets/data";
import { mergeFilter, mergeSort, SORT_TYPE_AZ } from "assets/helpers/filter";

export const state = () => ({
  items: books,
  params: {
    filters: [],
    sort: [{ name: "id", value: SORT_TYPE_AZ }]
  }
});

export const mutations = {
  mergeParams (state, { filters, sort }) {
    state.params.filters = mergeFilter(state.params.filters, filters);
    state.params.sort = mergeSort(state.params.sort, sort);
  }
};
