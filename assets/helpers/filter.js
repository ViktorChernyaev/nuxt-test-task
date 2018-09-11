export const SORT_TYPE_AZ = 1;
export const SORT_TYPE_ZA = -1;

export function parametrizeItems(items, { filters, sort }) {
  if (filters.length || sort.length) {
    const filtered = items.filter(item => {
      const currentFilter = filters.find(filter => item[filter.name] || item[filter.name] === 0);
      if (currentFilter) {
        const val = item[currentFilter.name]
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
      if(a[sortname] < b[sortname]) return sort[0].value;
      if(a[sortname] > b[sortname]) return sort[0].value;
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
      return prevFilter.filter(filter => filter.name !== nextFilter.name);
    }
    prevFilters.push(nextFilter);
  }
  return prevFilters;
}

export function mergeSort(prevSorts, nextSort) {
  const azSort = { name: nextSort, value: SORT_TYPE_AZ };
  if (nextSort) {
    if (prevSorts.length) {
      const current = prevSorts[0];
      if (current.name === nextSort) {
        return current.value === SORT_TYPE_ZA ? [] : [azSort];
      }
      return [azSort];
    }
    prevSorts.push(azSort);
  }
  return prevSorts;
}
