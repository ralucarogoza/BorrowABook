import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import styles from "./RightNavbar.module.css";
import { ThemeContext } from "../store/ThemeContext";
import image from "../images/paint.png";
import { auth } from "../lib/firebase";


const RightNav = ({ open, setOpen }) => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const user = auth.currentUser;
  const handleCloseMenu = () => {
      setOpen(prevOpen => !prevOpen);
    };
    const navigate = useNavigate();
    const logoutUser = async (e) => {
      e.preventDefault();

      await signOut(auth);
      navigate("/");
  }

  const handleLogOut = async (e) => {
      logoutUser(e);
      handleCloseMenu();
  }
  return (
    <ul className={`${styles.ul} ${open ? styles.ulOpen : styles.ulClosed}`}>
        {open && <h1 className={styles.title}>Menu</h1>}
        {open ? <li className={`${styles.li} ${styles.liOpen}`} onClick={handleCloseMenu}><Link to="/home" className={styles.link}>Home</Link></li> : <li className={`${styles.li} ${styles.liClosed}`}><Link to="/home" className={styles.link}>Home</Link></li> }
        {open ? <li className={`${styles.li} ${styles.liOpen}`} onClick={handleCloseMenu}><Link to="/books" className={styles.link}>Books</Link></li> : <li className={`${styles.li} ${styles.liClosed}`}><Link to="/books" className={styles.link}>Books</Link></li>}
        {open ? <li className={`${styles.li} ${styles.liOpen}`} onClick={handleCloseMenu}><Link to="/mybooks" className={styles.link}>My books</Link></li> : <li className={`${styles.li} ${styles.liClosed}`}><Link to="/mybooks" className={styles.link}>My books</Link></li>}

        {open ? <li className={`${styles.li} ${styles.liOpen}`} onClick={handleCloseMenu}><Link to="/profile" className={styles.link}>Profile</Link></li> : <li className={`${styles.li} ${styles.liClosed}`}><Link to="/profile" className={styles.link}>Profile</Link></li>}
        {!open && <li className={`${styles.li} ${styles.liClosed}`}><img src={image} alt="Theme" style={{width:'40px', height:'40px', color:'red'}} onClick={switchTheme}></img></li>}

        {open ? <li  className={`${styles.li} ${styles.liOpen} ${styles.link}`} onClick = {handleLogOut}> Logout</li> :  <li className={`${styles.li} ${styles.liClosed}`}><Link to="/login" className={styles.link}><AiOutlineLogout style={{width:'40px', height:'40px'}}  onClick = {(e) => logoutUser(e)} /></Link></li>}
        
    </ul>
  )
}

export default RightNav