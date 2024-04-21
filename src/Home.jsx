import {signInAnonymously} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import {firebaseInit} from "./firebase";


const {auth} = firebaseInit();





const Home = () => {
    const navigate = useNavigate();

    const handleSignIn = async ()=>{
        const user = await signInAnonymously(auth);
        navigate("/dashboard")
    
    
        
    
    }

  return (
    <div>

        <h1>This is the Markdown me homepage</h1>
        <button
         onClick={handleSignIn}
        >signInAnonymously</button>


    </div>
  )
}

export default Home