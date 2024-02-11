const initialState = {
    count: 0
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT':
        return {
            ...state,
            count: action.payload
        };
        default:
        return state;
    }
};
  
export default counterReducer;
  