import React, { useEffect, useState } from 'react';
import {initializeApp} from 'firebase/app';
import {getFirestore,collection,onSnapshot, doc,setDoc} from "firebase/firestore"
import { Routes,Route } from 'react-router-dom';

import { config } from './firebase';
import Editer from './Editer';
import Header from './Header';

const firebaseApp = initializeApp(config.firebase);
const firestore = getFirestore(firebaseApp);

// give us a reference to the 'markdowns' collection

const markdowns = collection(firestore,'markdowns')

const docRef = doc(firestore,'markdowns','1')




const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header/>} />
        <Route path = "/editor/:id" element={<Editer/>} />
      </Routes>
    
    </>
  )


  
};

export default App;
