//doar cand sunt in mybookpage vreau sa pot sterge o carte
//sa nu sterg cartea altcuiva

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getDoc, doc, onSnapshot} from "firebase/firestore";
import { db } from "../lib/firebase";
import BookData from "../components/BookData";


import { useDispatch } from "react-redux";
import {deleteBook} from "../store/actions/book.actions";

import EditBookForm from "../components/EditBookForm";


const MyBookPage = () =>{
  const params = useParams();
  const [bookData, setBookData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getBook = async () => {
      const docRef = doc(db, "books", params.id.toString());
      try {
        const unsubscribe = onSnapshot(docRef, (doc) => {

        if(doc.exists()) {
            setBookData(doc.data());
        } else {
            console.log("Document does not exist")
        }
        return () => unsubscribe();
      })} catch(error) {
          console.log(error)
      }
    };
    getBook();
  }, [params.id]);

  if (!bookData) {
    return <div>Document doesn't exist</div>;
  }

  const handleDelete = async () => {
      dispatch(deleteBook(bookData.id));
      navigate("/mybooks");
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
  }

  
  return (
  <div>
      {
          isEditing ? (<EditBookForm bookData={bookData} handleCancelEdit={handleCancelEdit}/>) 
          :
      (
      <>
        <BookData  
          id={bookData.id}
          title={bookData.title}
          author={bookData.author}
          owner={bookData.owner}
          genre={bookData.genre}
          number_of_pages={bookData.number_of_pages}
          publisher={bookData.publisher}
          publication_date={bookData.publication_date}
          imageUrl={bookData.imageUrl}
          status={bookData.status}
          borrowButton={false}
        />
        <div style={{display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px', 
          marginBottom: '30px'}}
        >
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </>
      )
      }
  </div>
  );
}

export default MyBookPage;