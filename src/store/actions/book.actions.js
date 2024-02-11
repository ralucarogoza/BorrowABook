import {db} from "../../lib/firebase";
import {doc, addDoc, getDoc, setDoc, getDocs, collection, query, updateDoc, deleteDoc} from "firebase/firestore";


export const ADD_BOOK = "ADD_BOOK";
export const GET_BOOKS = "GET_BOOKS";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";

export const postBook = (newbook) => async (dispatch) => {
    const bookRef = doc(db, "books", newbook.id+"");
    await setDoc(bookRef, {
        id: newbook.id,
        title: newbook.title,
        author: newbook.author,
        owner: newbook.owner,
        genre: newbook.genre,
        number_of_pages: newbook.number_of_pages,
        publisher: newbook.publisher,
        publication_date: newbook.publication_date,
        imageUrl: newbook.imageUrl,
        status: newbook.status
    })
    dispatch({
        type: ADD_BOOK,
        payload: newbook
    })
}

export const getBooks = () => async (dispatch) => {
    const q = query (collection(db, "books"));
    const books = await getDocs(q);
    if(books.docs.length > 0){
        const booksArray = [];
        books.docs.forEach((doc) => {
            booksArray.push(doc.data());
        })
        dispatch({
            type: GET_BOOKS,
            payload: booksArray
        })
    }
}

export const deleteBook = (id) => async (dispatch) => {  
    await deleteDoc(doc(db, "books", id+""));
    dispatch({
        type: DELETE_BOOK,
        payload: id
    })
}


export const updateBook = (editedBook) => async(dispatch) => {
    const bookRef = doc(db, "books", editedBook.id);
    await updateDoc(bookRef, {
        id: editedBook.id,
        title: editedBook.title,
        author: editedBook.author,
        genre: editedBook.genre,
        number_of_pages: editedBook.number_of_pages,
        publisher: editedBook.publisher,
        imageUrl: editedBook.imageUrl,
        owner: editedBook.owner,
        publication_date: editedBook.publication_date,
        status: editedBook.status
    });
    dispatch({
        type: UPDATE_BOOK,
        payload: editedBook
    })
}