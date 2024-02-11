import React from "react";
import { useState } from "react";
import styles from "./BookData.module.css";
import { Button } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import {addLoan} from "../store/actions/loans-history.actions";
import { auth } from "../lib/firebase";
import {useDispatch} from "react-redux";


const BookData = ({ id, title, author, owner, genre, number_of_pages, publisher, publication_date, imageUrl, status:initialStatus, borrowButton }) => {
  const [status, setStatus] = useState(initialStatus);
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  const handleBorrow = async (id) => {
    const bookRef = doc(db, "books", id+"");
    await updateDoc(bookRef, {
        status: "borrowed"
    })
    console.log("Borrowed" + id);
    setStatus("borrowed");
    const loan = {
      book_id: id,
      user_id: auth.currentUser.uid,
      owner: owner,
      borrow_date: formattedDate,
      return_date: ""
    }
    try{
      dispatch(addLoan(loan));
    }
    catch(error){
      console.log(error);
    }
  }  
  
  return (
      <div className={styles.card}>
        <div className={styles.image}>
          {imageUrl && <img src={imageUrl} alt={`Cover for ${title}`}  />}
        </div>
        <div className={styles.data}>

        <p ><b>Title: {title}</b></p>
        <p>Id: {id}</p>
        
        <p>Author: {author}</p>
        <p>Owner: {owner}</p>
        <p>Genre: {genre}</p>
        <p>Number of pages: {number_of_pages}</p>
        <p>Publisher: {publisher}</p>
        <p>Publication date: {publication_date}</p>
        <p>Status: {status}</p>
        {status=="available" && user && borrowButton && <Button colorScheme="blue" size="2sm" variant="outline" onClick={() => handleBorrow(id)}>Borrow</Button>}
        </div>
      </div>
    );
  };

export default BookData;