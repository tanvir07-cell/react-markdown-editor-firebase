import  { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {initializeApp} from 'firebase/app';
import {getFirestore,collection,onSnapshot, doc,setDoc} from "firebase/firestore"
import { getAuth } from 'firebase/auth';
import { config } from './firebase';

const firebaseApp = initializeApp(config.firebase);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const markdowns = collection(firestore,'markdowns')



const Dashboard = () => {
    const [mds,setMds] = useState([])
    const navigate = useNavigate();



    useEffect(()=>{
        // get a snapshot of the markdowns collection
        let unsubscribe = onSnapshot(markdowns,(snapshot)=>{
          const docsArr =  snapshot.docs.map(doc=>({id:doc.id,...doc.data()}))
        
          setMds(docsArr)
                
                
                

             
            
        })

        return ()=> unsubscribe()
    
    },[])

    const handleNewMarkdown = () => {
        // add a new document to the markdowns collection
        let newDoc = doc(markdowns)
        const setNewDoc = setDoc(newDoc,{markdown:'',htmlText:''})
        navigate(`/editor/${newDoc.id}`)
        



    }

    console.log(mds)
  

    
    
  return (
    <div>
        <h1>There is total {mds?.length} {mds?.length<=1 ? "editor":"editors"}</h1>
        {mds.map(md=>{
            return <div key={md.id}>
                <Link to={`/editor/${md.id}`}>{md.id}</Link>
            </div>
        })}
        
      
       
        <br />

        <button
        onClick={handleNewMarkdown}
          
           
        
        >New</button>

       

      
    </div>
  )
}

export default Dashboard

