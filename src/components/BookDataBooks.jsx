import React from "react";
import { useState, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import {addLoan} from "../store/actions/loans-history.actions";
import { set } from "firebase/database";
import { auth } from "../lib/firebase";
import {useDispatch} from "react-redux";

import styles from "./BookDataBooks.module.css";
import { ThemeContext } from "../store/ThemeContext";


const BookDataBooks = ({ id, title, author, owner, genre, number_of_pages, publisher, publication_date, imageUrl, status, borrowButton }) => {
  const { theme, switchTheme } = useContext(ThemeContext);
  
  return (<>
      <div className={`${styles.card} ${theme}`}>
        <div className={styles.image}>
          {imageUrl && <img src={imageUrl} alt={`Cover for ${title}`}  width="200em" hight="auto"/>}
        </div>
        <div className={styles.data}>

          <p ><b>{title}</b></p>          
          <p>Author: {author}</p>
          <p>Owner: {owner}</p>
          <p>Publication date: {publication_date}</p>

        </div>
      </div>
      </>
    );
  };

export default BookDataBooks;