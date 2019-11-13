// SET_TEXT_FILTER
export const setTextFilter = (name = '') => ({
    type: 'SET_TEXT_FILTER',
    name,
});

// SET_FILTER_BY
export const chooseColumnToFilter = filterBy => ({
    type: 'FILTER_BY',
    filterBy,
});
