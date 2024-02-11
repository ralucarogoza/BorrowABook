import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { doc, getDoc, addDoc, setDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { auth, storage } from "../lib/firebase";
import { db } from "../lib/firebase";
import {updateBook} from "../store/actions/book.actions"


import { ChakraProvider, Heading, FormControl, FormLabel, Center, Input, Text, Button } from "@chakra-ui/react";

const EditBookForm = ({bookData, handleCancelEdit}) => {
  const [title, setTitle] = useState(bookData.title);
  const [author, setAuthor] = useState(bookData.author);
  const [number_of_pages, setNumber_of_pages] = useState(bookData.number_of_pages);
  const [genre, setGenre] = useState(bookData.genre);
  const [publisher, setPublisher] = useState(bookData.publisher);
  const [image, setImage] = useState(bookData.imageUrl);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const handleEditBook = async (event) => {
    event.preventDefault();
    try {
      
      let imageUrl = null;
      if (image) {
        const storageRef = ref(storage, `images/${bookData.id}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      const editedBook ={
        id: bookData.id + "",
        title,
        author,
        number_of_pages,
        genre,
        publisher,
        owner: bookData.owner,
        publication_date: bookData.publication_date,
        status: bookData.status
      };

      if(imageUrl){
        editedBook.imageUrl = imageUrl;
        await updateDoc(doc(db, "books", bookData.id+""), {...bookData, imageUrl });
      }

      dispatch(updateBook(editedBook));
      setTitle(bookData.title);
      setAuthor(bookData.author);
      setNumber_of_pages(bookData.number_of_pages);
      setGenre(bookData.genre);
      setPublisher(bookData.publisher);
      setImage(bookData.imageUrl);

      
      
      navigate(`/mybooks/${bookData.id}`);
    } 
    catch (error) {
      console.error("Error editing book: ", error);
    }
    handleCancelEdit();

  }

  return (
    <div>
        <ChakraProvider>
        <Center flexDirection="column" height="80%">
      <Center
        flexDirection="column"
        p="20"
        bg="orange.100"
        boxShadow="2"
        borderRadius="lg"
      >
        <Heading pb="10">Edit book</Heading>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            placeholder="Title"
            bg="white"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Author</FormLabel>
          <Input
            value={author}
            placeholder="Author"
            bg="white"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </FormControl>

        <FormControl mt="5">
          <FormLabel>Number of pages</FormLabel>
          <Input
            value={number_of_pages}
            bg="white"
            type="number"
            onChange={(e) => setNumber_of_pages(e.target.value)}
            placeholder="Number of pages"
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Genre</FormLabel>
          <Input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            bg="white"
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Publisher</FormLabel>
          <Input
            type="text"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            bg="white"
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Image</FormLabel>
          <Input
            type="file" 
            onChange={handleImageChange} 
          />
        </FormControl>

        

        <Button mt="5" onClick={handleEditBook}>
          Edit book
        </Button>
      </Center>
    </Center>
      </ChakraProvider>  
    </div>
  );
};

export default EditBookForm;