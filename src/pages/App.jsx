import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatRoom from '../components/ChatRoom/ChatRoom';

function AppPage(props) {
  const { user } = props;
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [history, user]);

  return user && <ChatRoom />;
}

export default AppPage;
