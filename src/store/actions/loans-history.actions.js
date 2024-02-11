import {db} from "../../lib/firebase";
import {doc, addDoc, setDoc, getDocs, collection, query} from "firebase/firestore";


export const ADD_LOAN = "ADD_LOAN";
export const GET_LOANS = "GET_LOANS";

export const addLoan = (newLoan) => async (dispatch) => {
    const loanRef = collection(db, "loans-history");
    const docRef = await addDoc(loanRef, {
        user_id: newLoan.user_id,
        owner: newLoan.owner,
        book_id: newLoan.book_id,
        borrow_date: newLoan.borrow_date,
        return_date: newLoan.return_date
    })
    newLoan.id = docRef.id;
    await setDoc(docRef, { id: docRef.id }, { merge: true });
    dispatch({
        type: ADD_LOAN,
        payload: newLoan
    })
}

export const getLoans = () => async (dispatch) => {
    const q = query (collection(db, "loans-history"));
    const loans = await getDocs(q);
    if(loans.docs.length > 0){
        const loansArray = [];
        loans.docs.forEach((doc) => {
            loansArray.push(doc.data());
        })
        dispatch({
            type: GET_LOANS,
            payload: loansArray
        })
    }
}
