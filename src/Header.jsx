import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {initializeApp} from 'firebase/app';
import {getFirestore,collection,onSnapshot, doc,setDoc} from "firebase/firestore"

import { config } from './firebase';

const firebaseApp = initializeApp(config.firebase);
const firestore = getFirestore(firebaseApp);

const markdowns = collection(firestore,'markdowns')



const Header = () => {
    const [mds,setMds] = useState([])

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
        const newDoc = setDoc(doc(markdowns),{markdown:'',htmlText:''})


    }

    console.log(mds)
  

    
    
  return (
    <div>
        <h1>Markdown Me</h1>
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

export default Header

