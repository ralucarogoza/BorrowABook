import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from "../lib/firebase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "../components/ProfilePage.module.css";
import {Link} from "react-router-dom";


const ProfilePage = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [userData, setUserData] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
      const fetchData = async () => {
          try {
            if (isAuthenticated) {
              const docRef = doc(db, "users", auth.currentUser.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserData(userData);
              } else {
                console.log("No such document");
              }
            } else {
              console.log('User not logged in');
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
      };
  
      fetchData();
    }, []);

  const logoutUser = async (e) => {
      e.preventDefault();
      await signOut(auth);
      navigate("/");
  }

  return(
      <div className = {styles.profilePage}>
        <div className={styles.title}>
          <h1 >My account</h1>
        </div>
        <div className = {styles.profile}>
                  
                  <div>
                      <img src = "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account>.png" alt = "user avatar" className = {styles.avatar}></img>
                  </div>
                  <div className={styles.data}>                      
                    <p><b>First name:</b> {userData.firstName}</p>
                    <p><b>Last name: </b> {userData.lastName}</p>
                    <p><b>Email address:</b> {userData.email}</p>
                    <div >
                      <Link to="/mybooks" style={{ color: 'inherit', textDecoration: 'inherit'}}><button>See your books</button></Link>
                      <Link to="/borrowedbooks" style={{ color: 'inherit', textDecoration: 'inherit'}}><button>See your borrowed books</button></Link>
                      <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => logoutUser(e)}>Logout</button>
                    </div>  
                  </div>    
        </div>
      </div>       
  )    
}

export default ProfilePage;