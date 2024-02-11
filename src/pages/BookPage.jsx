import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getDoc, doc} from "firebase/firestore";
import { db } from "../lib/firebase";
import BookData from "../components/BookData";

const BookPage = () => {
  const params = useParams();
  const [bookData, setBookData] = useState("");
  useEffect(() => {
    const getBook = async () => {
      const docRef = doc(db, "books", params.id.toString());
      try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setBookData(docSnap.data());
        } else {
            console.log("Document does not exist")
        }
    
      } catch(error) {
          console.log(error)
      }
    };
    getBook();
  }, [params.id]);

  if (!bookData) {
    return <div>Document doesn't exist</div>;
  }
  return (<div>
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
      borrowButton={true}
    />
  </div>);
};

export default BookPage;
