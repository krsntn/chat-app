import React, { useContext } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';

function SignOutButton() {
  const {
    state: { firebase },
    dispatch,
  } = useContext(FirebaseContext);

  return firebase.auth().currentUser ? (
    <button onClick={() => dispatch({ type: 'signOut' })}>Sign Out</button>
  ) : (
    ''
  );
}

export default SignOutButton;
