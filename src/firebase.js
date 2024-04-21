import {initializeApp} from "firebase/app"
import {getFirestore,connectFirestoreEmulator} from "firebase/firestore"
import { getAuth,connectAuthEmulator } from "firebase/auth"
import {config} from "./config"


export function firebaseInit(){
    const firebaseApp = initializeApp(config.firebase)
    const firestore = getFirestore(firebaseApp)
    const auth = getAuth(firebaseApp)

    if(window.location.hostname === "localhost"){
        connectFirestoreEmulator(firestore,"localhost",8080)
        connectAuthEmulator(auth,"http://localhost:9099",{disableWarnings:true})
    }

    return {firebaseApp,firestore,auth}
}


