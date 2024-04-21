import  { useEffect, useState } from 'react'
import snarkdown from 'snarkdown';
import {initializeApp} from 'firebase/app';
import {getFirestore,collection,onSnapshot, doc,setDoc} from "firebase/firestore"
import {  useParams } from 'react-router-dom';

import { config } from './config';

const firebaseApp = initializeApp(config.firebase);
const firestore = getFirestore(firebaseApp);

// give us a reference to the 'markdowns' collection

const markdowns = collection(firestore,'markdowns')



const Editer = () => {
  const [text, setText] = useState('');
  const [ispending, setIsPending] = useState(false);
  const {id} = useParams()

  // give us a reference of the document of the markdowns collection with id of the url

  const docRef = doc(markdowns,id)


  console.log(text)

  // Function to safely set inner HTML
  const createMarkup = (markdown) => {
    return { __html: snarkdown(markdown) };
  };

  useEffect(()=>{

    setIsPending(true)
  
    //  get a snapshot of the document with the id of the url
    onSnapshot(docRef,(doc)=>{
      if(doc.exists()){
        setText(doc.data().markdown)
        setIsPending(false)
      }
    })

  },[])

  function handleChange(e){
    setText(e.target.value)

    // update the document with the new markdown
    // this setDoc triggers the onSnapshot function on the useEffect
    setDoc(docRef,{markdown:e.target.value,htmlText:snarkdown(e.target.value)})
    


  }

  if(ispending) return <div>Loading...🕳</div>
  return (
      <div id="editor">
        {id}
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

  )
}

export default Editer
