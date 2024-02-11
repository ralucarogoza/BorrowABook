import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../lib/firebase";
import Pagination from "../components/Pagination";
import BorrowedBook from "../components/BorrowedBook";
import {getLoans} from "../store/actions/loans-history.actions";
import {getBooks} from "../store/actions/book.actions";
import { ChakraProvider, Heading } from "@chakra-ui/react";

const BorrowedBooks = () => { 
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const loans = useSelector((state)=>state.loanReducer)

    useEffect(() => {
        dispatch(getBooks());
        dispatch(getLoans());
        
        console.log("in my borrowed books");
    }, [dispatch]);
    const loans2 = loans.filter(loan => loan.user_id === user.uid);

    const books = useSelector((state)=>state.bookReducer)
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentLoans = loans2.slice(indexOfFirstRecord, indexOfLastRecord);
    const numberOfPages = Math.ceil(loans2.length / recordsPerPage)

    return (
        <div style={{height: '100%'}}>
            <ChakraProvider>
                <Heading textAlign='center' paddingTop='20px'>Borrowed Books</Heading>
            </ChakraProvider>
            <ul className="grid-container">
                {currentLoans.length === 0 ? (
                    <h1>No loans</h1>
                ) : (
                    currentLoans.map((loan, index) => {
                        const bookData = books.find((book) => book.id+'' == loan.book_id+'');
                        if(bookData){
                        return (
                            <BorrowedBook 
                                loan={loan}
                                book={bookData}
                            />
                        );
                        }
                    })
                )}
            </ul>

            <Pagination
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default BorrowedBooks;