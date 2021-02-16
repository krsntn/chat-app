import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import css from './Register.module.scss';

function Register() {
  const {
    state: { firebase },
    dispatch,
  } = useContext(FirebaseContext);
  const [name, setName] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    await firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name,
      })
      .then(() => {
        dispatch();
      });
  };

  return (
    <form onSubmit={submit} className={css.form}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          className={css.name_input}
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className={css.button_wrapper}>
        <button type="submit">Start</button>
      </div>
    </form>
  );
}

export default Register;
