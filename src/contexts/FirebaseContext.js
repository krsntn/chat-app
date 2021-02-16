import React, { createContext, useReducer } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const reducer = (state, action) => {
  let provider = null;
  switch (action?.type) {
    case 'signInWithGoogle':
      provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
      return state;
    case 'signInWithFacebook':
      provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider);
      return state;
    case 'signInWithAnonymous':
      firebase.auth().signInAnonymously();
      return state;
    case 'signOut':
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
      }

      return state;
    default:
      return { ...state };
  }
};

const initialState = () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  return { firebase };
};

const FirebaseContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  return (
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

const FirebaseContext = createContext();

export { FirebaseContext, FirebaseContextProvider };
