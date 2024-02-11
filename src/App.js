import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
//import Navbar from './components/Navbar';
import BooksPage from './pages/BooksPage';
import MyBooks from './pages/MyBooks';
import BookPage from './pages/BookPage';
import MyBookPage from './pages/MyBookPage';

import BorrowedBooks from './pages/BorrowedBooks';

import {Routes, Route, BrowserRouter, useRoutes, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { logout, setIsAuthenticated, setLoading } from "./store/auth.reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

import { ThemeContext } from "./store/ThemeContext";

import Navbar from "./components/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Navbar />}>
        
        <Route path = "/" element = { <HomePage></HomePage> }></Route>
        <Route path = "/home" element = { <HomePage></HomePage> }></Route>

        <Route path = "/books" element = { <BooksPage></BooksPage> }></Route>

        <Route path = "*" element={<PageNotFound></PageNotFound>} ></Route>
        <Route path = "/login" index element = { <LoginPage></LoginPage> }></Route>
        <Route path = "/register" element = { <RegisterPage></RegisterPage> } ></Route>

        <Route path = "/books/:id" element = { <BookPage></BookPage> }></Route>
      </Route>
        
        <Route element={<ProtectedRoute redirectTo="/login"/> }>
          <Route element={<Navbar />}>
            <Route path = "/profile" element = { <ProfilePage></ProfilePage> }></Route>
            <Route path = "/mybooks" element = { <MyBooks></MyBooks> }></Route>
            <Route path = "/mybooks/:id" element = { <MyBookPage></MyBookPage> }></Route>
            <Route path = "/borrowedbooks" element = { <BorrowedBooks></BorrowedBooks> }></Route>
          </Route>
        </Route>
    </>
  )
);






function App() {
  // return (
  //   <>
  //     <BrowserRouter>
  //       <Smth/>
  //     </BrowserRouter>
  //   </>
  // );

  const dispatch = useDispatch();
  const { theme, switchTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      console.log(user);
      if (user) {
        console.log('Dispatching setIsAuthenticated action');
        dispatch(setIsAuthenticated());
        //console.log('Dispatching setIsAuthenticated action');
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  console.log( {theme});
  return <div className={theme}><RouterProvider router={router} /></div>;
}

export default App;