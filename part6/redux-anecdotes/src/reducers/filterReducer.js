const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            const filter_term = action.payload
            state = filter_term
            return state
        default:
            state = 'ALL'
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}

export default filterReducer