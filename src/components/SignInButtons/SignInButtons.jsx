import React, { useContext } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import css from './SignInButtons.module.scss';

function SignInButtons() {
  const { dispatch } = useContext(FirebaseContext);

  const signInWithGoogle = () => {
    dispatch({ type: 'signInWithGoogle' });
  };

  const signInWithFacebook = () => {
    dispatch({ type: 'signInWithFacebook' });
  };

  const signInWithAnonymous = () => {
    dispatch({ type: 'signInWithAnonymous' });
  };
  return (
    <div className={css.signin_buttons}>
      <button onClick={signInWithGoogle} className={css.google}>
        Sign in with Google
      </button>
      <button onClick={signInWithFacebook} className={css.facebook}>
        Sign in with Facebook
      </button>
      {/* <button onClick={signInWithAnonymous} className={css.anonymous}>
        Sign in Anonymously
      </button> */}
    </div>
  );
}

export default SignInButtons;
