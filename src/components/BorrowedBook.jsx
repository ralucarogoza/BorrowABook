import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

import {getLoans} from "../store/actions/loans-history.actions";


import { Card, Box, CardBody, CardFooter, Heading, Image, Stack, Text, Button, ChakraProvider } from '@chakra-ui/react';

const BorrowedBook = ({loan, book}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [bookUpdated, setBookUpdated] = useState(book);

    const dispatch = useDispatch();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    const handleReturn = async (id, loan) => {
        const bookRef = doc(db, "books", id+"");
        await updateDoc(bookRef, {
            status: "available"
        })
        console.log("Returned" + id);
        setIsVisible(false);
        console.log(loan);


        if (loan && loan.id) {
            const loanRef = doc(db, "loans-history", loan.id+"");
            await updateDoc(loanRef, {
                return_date: formattedDate
            })
            dispatch(getLoans());
            setBookUpdated(prevBook => ({ ...prevBook, status: "available" }));

        } else {
            console.error('Invalid loan:', loan);
        }

    }
    useEffect(() => {
        dispatch(getLoans());
      }, [dispatch]);


    return (
    <ChakraProvider>
    <Box display="flex" flexDirection="row"  justifyContent="center" alignItems="center" >
    <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
    position={{ base: 'relative', sm: 'relative' }}

    marginTop='20px'
    marginBottom="30px"
    height='400px'
    width='700px'
    zIndex="0" 

    >
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={book.imageUrl} 
    alt={`Cover for ${book.title}`}
  />

  <Stack>
    <CardBody paddingLeft='80px'>
      <Heading size='md'>{book.title}</Heading>
      <Text py='2'>
        By: {book.author}
      </Text>
      <Text py='2'>
        Status: {bookUpdated.status}
      </Text>
      <Text py='2'>
        Borrow date: {loan.borrow_date}
      </Text>
      <Text py='2'>
        Return date: {loan.return_date}
      </Text>
    </CardBody>

    <CardFooter paddingLeft='80px'>
        {book.status=="borrowed" && isVisible &&
      <Button variant='solid' colorScheme='orange' onClick={()=>handleReturn(book.id, loan)}>
        Return book
      </Button>
}
    </CardFooter>
  </Stack>
  
</Card>
</Box>
</ChakraProvider>
        
    )
}

export default BorrowedBook;