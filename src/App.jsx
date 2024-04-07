import React, { useEffect, useState } from 'react';
import snarkdown from 'snarkdown';
import {initializeApp} from 'firebase/app';
import {getFirestore,collection,onSnapshot, doc,setDoc} from "firebase/firestore"

import { config } from './firebase';

const firebaseApp = initializeApp(config.firebase);
const firestore = getFirestore(firebaseApp);

// give us a reference to the 'markdowns' collection

const markdowns = collection(firestore,'markdowns')

const docRef = doc(firestore,'markdowns','1')




const App = () => {
  const [text, setText] = useState('');
  const [ispending, setIsPending] = useState(false);

  console.log(text)

  // Function to safely set inner HTML
  const createMarkup = (markdown) => {
    return { __html: snarkdown(markdown) };
  };

  useEffect(()=>{

    setIsPending(true)
  
     
    onSnapshot(docRef,(doc)=>{
      if(doc.exists()){
        setText(doc.data().markdown)
        setIsPending(false)
      }
    })

  },[])

  function handleChange(e){
    setText(e.target.value)
    setDoc(docRef,{markdown:e.target.value,htmlText:snarkdown(e.target.value)})
    


  }

  if(ispending) return <div>Loading...🕳</div>

  return (
    <div id="editor">
      <textarea 
        name="" 
        id="in" 
        cols="30" 
        rows="10" 
        placeholder='markdown'
        onChange={handleChange} 
        value={text}
      ></textarea>

      <div id="out" dangerouslySetInnerHTML={createMarkup(text)}

       
       


      />
      
      <pre id="code">

        <p>{!text ? "Your code goes here...":snarkdown(text)}</p>
      </pre>


    </div>
  );
};

export default App;
