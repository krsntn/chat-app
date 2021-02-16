import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import css from './TextInputForm.module.scss';

function TextInputForm(props) {
  const {
    state: { firebase },
  } = useContext(FirebaseContext);
  const [inputValue, setInputValue] = useState('');
  const { messagesRef, scrollToBottom } = props;

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, displayName } = firebase.auth().currentUser;

    if (inputValue.trim().length > 0) {
      messagesRef
        .add({
          text: inputValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          name: displayName,
        })
        .then(() => {
          setInputValue('');
          scrollToBottom();
        });
    }
  };

  const onTextAreaKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) sendMessage(e);
  };

  const onTextAreaChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={sendMessage} className={css.form}>
      <textarea
        className={css.textarea}
        rows="2"
        wrap="hard"
        value={inputValue}
        onChange={onTextAreaChange}
        onKeyDown={onTextAreaKeyDown}
      ></textarea>
      <button type="submit" className={css.submitButton}>
        🚀
      </button>
    </form>
  );
}

export default TextInputForm;
