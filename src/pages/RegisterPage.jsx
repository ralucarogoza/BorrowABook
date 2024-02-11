import { Form } from "react-router-dom";
//import FormInput from "../components/FormInput";
import styles from "../components/RegisterPage.module.css"
import {useState} from "react";
import {db} from '../lib/firebase.js';
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (isAuthenticated) {
        navigate("/");
    }

    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
          };

        if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {const uid = userCredential.user.uid;
                setDoc(doc(db, "users", uid), user);});
                navigate("/");
            } catch {
                setError("Sorry, something went wrong. Please try again.");
            }     
        } else {
            setError("Passwords don't match. Please try again.");
        }
    };

    return(
        <div className={styles.registerPage}>
            <div className={styles.registerForm}>
                <form>
                <h1 className={styles.title}>Register</h1>
                { "" !== error &&
                        <div style={{color:"red", display:""}}>
                            { error }    
                        </div>
                }
                <div className={styles.firstname}>
                    <label className={styles.form__label}>First Name </label>
                    <input 
                        className={styles.input} 
                        type="text" value={firstName} 
                        onChange={(event) => {setFirstName(event.target.value);}} 
                        placeholder="First Name"
                    />
                </div>
                <div className={styles.lastname}>
                    <label className={styles.form__label}>Last Name </label>
                    <input 
                        className={styles.input} 
                        type="text"  
                        value={lastName} 
                        onChange={(event) => {setLastName(event.target.value);}} 
                        placeholder="LastName"
                    />
                </div>
                <div className={styles.email}>
                    <label className={styles.form__label}>Email </label>
                    <input 
                        className={styles.input} 
                        type="email" value={email}  
                        onChange={(event) => {setEmail(event.target.value);}} 
                        placeholder="Email"
                    />
                </div>
                <div className={styles.password}>
                    <label className={styles.form__label}>Password </label>
                    <input className={styles.input} 
                        type="password"
                        value={password}  
                        onChange={(event) => {setPassword(event.target.value);}} 
                        placeholder="Password"
                    />
                </div>
                <div className={styles.confirmpassword}>
                    <label className={styles.form__label}>Confirm Password </label>
                    <input 
                        className={styles.input} 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(event) => {setConfirmPassword(event.target.value);}} 
                        placeholder="Confirm Password"
                    />
                </div>
                <button  type="submit" className={styles.btn} onClick = {(e) => signupWithUsernameAndPassword(e)}>Register</button>
                <div className = {styles.message}>
                        <span>Go back to login? <Link to = "/login">Click here.</Link></span>
                </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;