import React from 'react';
import styled from 'styled-components';
import Burger from './HamburgerMenu';
import { Outlet } from 'react-router-dom';
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
    <div className={styles.nav}>
      <div className={styles.logo}>
        BorrowABook
      </div>
      <Burger />
    </div>
    <Outlet />
    </>
  )
}

export default Navbar;