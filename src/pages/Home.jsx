import React, { useEffect } from 'react';
import SignInButtons from '../components/SignInButtons/SignInButtons';
import { useHistory } from 'react-router-dom';

function HomePage(props) {
  const { user } = props;
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/app');
    }
  }, [history, user]);

  return <div>{!user && <SignInButtons />}</div>;
}

export default HomePage;
