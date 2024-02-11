import {ADD_BOOK, GET_BOOKS, DELETE_BOOK, UPDATE_BOOK} from "../actions/book.actions";

const initialState = [];

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            return [...state, action.payload];
        case GET_BOOKS:
            return action.payload;
        case DELETE_BOOK:
            return state.filter((book) => book.id !== action.payload);
        case UPDATE_BOOK:
            const data = action.payload;
            return state.map((book) => {
                if (book.id === data.id) {
                    return{
                        ...book,
                        title: data.title,
                        author: data.author,
                        genre: data.genre,
                        number_of_pages: data.number_of_pages,
                        publisher: data.publisher,
                        imageUrl: data.imageUrl,
                    };
                    
                } 
                else{
                    return book;
                }
            });

        default:
            return state;
    }
};

export default bookReducer;
