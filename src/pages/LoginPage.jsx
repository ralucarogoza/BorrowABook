import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../components/LoginPage.module.css"

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Dispatching setIsAuthenticated action: ', isAuthenticated);
            navigate("/profile");
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    }

    return(
        <div className = {styles.loginPage}>
            <div className = {styles.loginForm}>
                <form >
                    <h1>Login</h1>
                    { "" !== notice &&
                        <div style={{color:"red"}}>
                            { notice }    
                        </div>
                    }                  
                    <div className = {styles.email}>
                        <label htmlFor = "exampleInputEmail1" className = "form-label">Email address</label>
                        <input type = "email" className = {styles.input} id = "exampleInputEmail1" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                    </div>
                    <div className = {styles.password}>
                        <label htmlFor = "exampleInputPassword1" className = "form-label">Password</label>
                        <input type = "password" className = {styles.input} id = "exampleInputPassword1" placeholder = "Password" value = { password } onChange = { (e) => setPassword(e.target.value) }></input>
                    </div>
                    <div>
                        <button type = "submit" className ={styles.btn} onClick = {(e) => loginWithUsernameAndPassword(e)}>Submit</button>
                    </div>
                    <div>
                        <span>Need to sign up for an account? <Link to = "/register">Click here.</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;