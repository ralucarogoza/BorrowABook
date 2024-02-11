import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div style={{height:'100vh'}}>
            <h1>Oops! You seem to be lost.</h1>
            <p>Go to: <Link to='/'>Home</Link></p>
            
        </div>
    )
}

export default PageNotFound;