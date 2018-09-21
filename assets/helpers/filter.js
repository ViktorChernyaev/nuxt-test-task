export const SORT_TYPE_AZ = 0
export const SORT_TYPE_ZA = 1;

export function parametrizeItems(items, { filters, sort }) {
  if (filters.length || sort.length) {
    const filtered = items.filter(item => {
      return filters.reduce((acc, filter) => {
        const val = item[filter.name];
        if (typeof val === "string") {
          return val.toLowerCase().includes(filter.value.toLowerCase()) ? acc : false
        } else if (typeof val === "number") {
          return (val === filter.value) ? acc : false;
        } else if (Array.isArray(val)) {
          const inputTags = filter.value;
          if (inputTags.length > 1) {
            return val.filter(valItem => {
              return inputTags.find(inputTag => inputTag.toLowerCase() === valItem.toLowerCase());
            }).length === inputTags.length;
          } else if (inputTags.length === 1) {
            return val.find(valItem => valItem.toLowerCase() === filter.value[0].toLowerCase()) ? acc : false;
          }
          return acc;
        }
        return false;
      }, true);
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
