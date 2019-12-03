import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBU2Z3bP3Jb2ZYcml8a2x4f3F4d7diMxgc",
  authDomain: "crown-db-skrillfer.firebaseapp.com",
  databaseURL: "https://crown-db-skrillfer.firebaseio.com",
  projectId: "crown-db-skrillfer",
  storageBucket: "crown-db-skrillfer.appspot.com",
  messagingSenderId: "481637417294",
  appId: "1:481637417294:web:cab62aecba4a1e36"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = (history) => 
    auth.signInWithPopup(provider)
    .then(result=>{
        history.push('/reservation');
    })
    .catch(error=>console.log(error));
  
  export default firebase;