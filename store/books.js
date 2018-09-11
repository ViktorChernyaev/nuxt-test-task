import { books } from "assets/data";
import { mergeFilters, mergeSort } from "assets/helpers/filter";

export const state = () => ({
  items: books,
  params: {
    filters: [],
    sort: []
  }
});

export const mutations = {
  mergeParams (state, { filters, sort }) {
    params.filters = mergeFilter(state.params.filters, filters);
    params.sort = mergeSort(state.params.sort, sort);
  }
};
