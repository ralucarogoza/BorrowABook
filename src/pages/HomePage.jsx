import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/HomePage.module.css';
import backgroundImage from '../images/books.jpg';

const HomePage = () =>{
    return(
        <>
          <div style={{height:'100vh', backgroundImage: `url(${backgroundImage})`}}>
              <h1 className={styles.title}>BorrowABook</h1>
              <div className={styles.description}>
                <p>This is a web application for book lovers!
                  If you are a book lover, you are in the right place.
                  You can add your books from your own library and share them with others. 
                  Or you can borrow books from other users.
                  It's free and easy to use.
                  All you have to do is to create an account and start looking for new books.              
                </p>
                <p>Enjoy reading!</p>
              </div>
              <div className={styles.buttons}>
                <Link to='/register'  style={{textDecoration: 'none', color:'black'}}><button className={styles.btn}>Get started</button></Link>
                <Link to='/login'  style={{textDecoration: 'none', color:'black'}}><button className={styles.btn}>Login</button></Link>
              </div>
              

              <div className={styles.contact}>
                <h2>Contact us</h2>
                <p>Email: <a href="mailto:" style={{textDecoration: 'none', color:'black'}}> raluca@yahoo.com</a></p>
                <p>Phone: 0712345678</p>
              </div>
          </div>
        </>
    )
}

export default HomePage;