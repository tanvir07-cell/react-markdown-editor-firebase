import {initializeApp} from 'firebase/app';
import {getAuth, signInAnonymously} from "firebase/auth"
import { config } from './firebase';
import { useNavigate } from 'react-router-dom';


const firebaseApp = initializeApp(config.firebase);

const auth = getAuth(firebaseApp);




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