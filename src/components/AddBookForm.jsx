import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { auth, storage } from "../lib/firebase";
import { useEffect } from "react";

import { ChakraProvider, Heading, FormControl, FormLabel, Center, Input, Text, Button } from "@chakra-ui/react";

import {postBook} from "../store/actions/book.actions"

import { incrementCount } from "../store/actions/counter.action";


const AddBookForm = ({handleCancelEdit}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [number_of_pages, setNumber_of_pages] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  const counter = useSelector(state => state.counterReducer.count);
  const dispatch = useDispatch();
  console.log(counter);


  useEffect(() => {
    dispatch(incrementCount());
  }, [dispatch]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const handleAddBook = async (event) => {
    event.preventDefault();
    if(error === ""){
    try {
      dispatch(incrementCount());
      const newBookId =  counter;
      console.log("COUNTER:" + newBookId);
      let book = {
        id: newBookId,
        title,
        author,
        owner: auth.currentUser.email,
        number_of_pages,
        genre,
        publisher,
        publication_date: formattedDate,
        status: "available"
      }

      let imageUrl = null;
      if (image) {
        const storageRef = ref(storage, `images/${newBookId}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      dispatch(postBook({id: newBookId, title, author, imageUrl, genre, number_of_pages, publisher, publication_date: formattedDate, owner: auth.currentUser.email, status: "available", imageUrl: imageUrl}));
      setTitle("");
      setAuthor("");
      setNumber_of_pages("");
      setGenre("");
      setPublisher("");
      setImage("");
      console.log("Adding book...");
    } catch (error) {
      console.error("Error adding book: ", error);
      setError(error.message);
    }
    handleCancelEdit();
  }
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
        color={"black"}
      >
        <Heading pb="10">Add a new book</Heading>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            placeholder="Title"
            bg="white"
            type="text"
            onChange={(e) => {setTitle(e.target.value);
            setError("");
            }}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Author</FormLabel>
          <Input
            value={author}
            placeholder="Author"
            bg="white"
            type="text"
            onChange={(e) => {setAuthor(e.target.value);
              setError("");
            }}
            required
          />
        </FormControl>

        <FormControl mt="5">
          <FormLabel>Number of pages</FormLabel>
          <Input
            value={number_of_pages}
            bg="white"
            type="number"
            onChange={(e) => {setNumber_of_pages(e.target.value)
              setError("");}}
            placeholder="Number of pages"
            required
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Genre</FormLabel>
          <Input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => {setGenre(e.target.value);
              setError("");
            }}
            bg="white"
            required
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Publisher</FormLabel>
          <Input
            type="text"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => {setPublisher(e.target.value)
            setError("");
           }}
            bg="white"
            required
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Image</FormLabel>
          <Input
            type="file" 
            onChange={handleImageChange} 
            required
          />
        </FormControl>

        {error && <Text color="red">{error}</Text>}

        <Button mt="5" onClick={handleAddBook}>
          Add book
        </Button>
      </Center>
    </Center>
      </ChakraProvider>
      
    </div>
  );
};

export default AddBookForm;