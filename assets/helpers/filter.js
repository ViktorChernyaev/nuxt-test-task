export const SORT_TYPE_AZ = 0
export const SORT_TYPE_ZA = 1;

export function parametrizeItems(items, { filters, sort }) {
  if (filters.length || sort.length) {
    const filtered = items.filter(item => {
      const currentFilter = filters.find(filter => filter.name === item[filter.name]);
      console.log(filters, item)
      if (currentFilter) {
        // console.log(currentFilter, item)
        const val = item[currentFilter.name];
        if (typeof val === "string") {
          const lowerVal = val.toLowerCase();
          const lowerCurrent = currentFilter.value.toLowerCase();
          return lowerVal === lowerCurrent || lowerVal.includes(lowerCurrent);
        }
        return val === currentFilter.value;
      }
      return true;
    });
    const sortname = sort.length ? sort[0].name : null
    return !sortname ? filtered : filtered.sort((a, b) => {
      if(a[sortname] < b[sortname]) return sort[0].value === SORT_TYPE_AZ ? -1 : 1;
      if(a[sortname] > b[sortname]) return sort[0].value === SORT_TYPE_ZA ? -1 : 1;
      return 0;
    });
  }
  return items;
}

export function mergeFilter(prevFilters, nextFilter) {
  if (nextFilter) {
    const filterPresents = prevFilters.find(filter => filter.name === nextFilter.name);
    if (filterPresents && (nextFilter.value === 0 || nextFilter.value)) {
      return prevFilters.map(filter => filter.name === nextFilter.name ? nextFilter : filter);
    } else if (filterPresents) {
      return prevFilters.filter(filter => filter.name !== nextFilter.name);
    }
    prevFilters.push(nextFilter);
  }
  return prevFilters;
}

export function mergeSort([current], name) {
  if (name) {
    const azSort = { name, value: SORT_TYPE_AZ };
    const zaSort = { name, value: SORT_TYPE_ZA };
    if (current.name === name) {
      return current.value === SORT_TYPE_AZ ? [zaSort] : [azSort];
    }
    return [azSort];
  }
  return [current];
}
