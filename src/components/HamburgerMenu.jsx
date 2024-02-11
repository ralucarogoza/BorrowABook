import React, { useState } from 'react';
import RightNav from './RightNavbar';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

import styles from "./HamburgerMenu.module.css";
const Burger = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <div className={styles.burger} open={open} onClick={() => setOpen(!open)}>
            {open ? <IoCloseOutline size='80wx' /> : <RxHamburgerMenu   size='50px' />}
      </div>
      
      <RightNav open={open} setOpen={setOpen}/>
    </>
  )
}

export default Burger