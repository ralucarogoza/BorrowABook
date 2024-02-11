import {ADD_LOAN, GET_LOANS} from "../actions/loans-history.actions";

const initialState = [];

const loanReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOAN:
            return [...state, action.payload];
        case GET_LOANS:
            return action.payload;
        default:
            return state;
    }
};

export default loanReducer;
