import React, { useContext, useRef, useState, useEffect } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../ChatMessage/ChatMessage';
import SignOutButton from '../SignOutButton/SignOutButton';
import TextInputForm from '../TextInputForm/TextInputForm';
import css from './ChatRoom.module.scss';

function ChatRoom() {
  const {
    state: { firebase },
  } = useContext(FirebaseContext);
  const refScrollToBottom = useRef();
  const [initialLoad, setInitialLoad] = useState(true);

  const scrollToBottom = () => {
    refScrollToBottom.current.scrollIntoView({ behavior: 'smooth' });
  };

  const messagesRef = firebase.firestore().collection('messages');
  const query = messagesRef
    .where('createdAt', '!=', null)
    .orderBy('createdAt', 'desc')
    .limit(50);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const displayMsg = messages
    ?.filter((x) => x.createdAt !== null)
    .sort((a, b) => a.createdAt - b.createdAt);

  useEffect(() => {
    if (initialLoad && messages) {
      scrollToBottom();
      setInitialLoad(false);
    }
  }, [initialLoad, messages]);

  return (
    <div>
      <div className={css.header}>
        <span>{firebase.auth().currentUser.displayName}</span>
        <SignOutButton />
      </div>
      <div className={css.chatroom}>
        <div className={css.messages}>
          {displayMsg?.map((msg) => {
            return <ChatMessage key={msg.id} message={msg} />;
          })}
          <div ref={refScrollToBottom} />
        </div>
        <div className={css.divider}></div>
        <div className={css.inputForm}>
          <TextInputForm
            messagesRef={messagesRef}
            scrollToBottom={scrollToBottom}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
