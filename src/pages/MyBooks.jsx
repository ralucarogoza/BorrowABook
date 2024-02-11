import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../lib/firebase";
import BookDataBooks from "../components/BookDataBooks";
import styles from "../components/BookDataBooks.module.css";
import { Link } from "react-router-dom";

import Pagination from "../components/Pagination";
import {getBooks} from "../store/actions/book.actions";

const MyBooks = () => { 
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const books = useSelector((state)=>state.bookReducer)

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    const books2 = books.filter(book => book.owner === user.email);
  
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentBooks = books2.slice(indexOfFirstRecord, indexOfLastRecord);
    const numberOfPages = Math.ceil(books2.length / recordsPerPage)
    
    return (
        <div style={{height: 'calc(100%)'}}>
          <h1>My Books</h1>
        <div className={styles.gridcontainer}>
          {
              currentBooks.length === 0 ? <p style={{textAlign:'center'}}>No books</p> :
              currentBooks.map((book, index) => (
                <Link to={`/mybooks/${book.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  <BookDataBooks
                    {...book}
                    borrowButton={false}
                  />
                </Link>
              ))

          }
        </div> 
        <Pagination
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        /> 
        </div>
    );
};

export default MyBooks;