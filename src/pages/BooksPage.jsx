import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBookForm from "../components/AddBookForm";
import BookDataBooks from "../components/BookDataBooks";
import styles from "../components/BookDataBooks.module.css";
import { Link } from "react-router-dom";

import Pagination from "../components/Pagination";
import {getBooks} from "../store/actions/book.actions";

import { useContext } from "react";
import {ThemeContext} from "../store/ThemeContext";

const BooksPage = () => {
  console.log("BooksPage");
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const {theme, setTheme} = useContext(ThemeContext);
    
    const books = useSelector((state)=>state.bookReducer)
    useEffect(() => {
      dispatch(getBooks());

    }, [dispatch]);
    console.log( {theme});
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentBooks = books.slice(indexOfFirstRecord, indexOfLastRecord);
    const numberOfPages = Math.ceil(books.length / recordsPerPage)

    const handleEdit = () => {
      setIsEditing(true);
    }
  
    const handleCancelEdit = () => {
      setIsEditing(false);
    }
  
 
    return (

      <div className={styles.back}>{
      
        isEditing ? (<AddBookForm handleCancelEdit={handleCancelEdit}/>) 
        :
        (
          <>
        <h1 className={styles.title}>Books</h1>
        <div className={styles.forbtn}>
        <button className={styles.btn} onClick={handleEdit}>+</button>
        </div>
        <ul className={styles.gridcontainer}>
          {currentBooks.map((book, index) => (
            <Link to={`/books/${book.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <BookDataBooks
              id={book.id}
              key={index}
              title={book.title}
              author={book.author}
              owner={book.owner}
              genre={book.genre}
              number_of_pages={book.number_of_pages}
              publisher={book.publisher}
              publication_date={book.publication_date}
              imageUrl={book.imageUrl}
              status={book.status}
              borrowButton={false}
            />
            </Link>
            
          ))}
        </ul>
        <Pagination
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
        </>)
      }
      </div>
    );
  };
  
export default BooksPage;