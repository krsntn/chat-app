import React, { useContext } from 'react';
import css from './App.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseContext } from './contexts/FirebaseContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AppPage from './pages/App';

function App() {
  const {
    state: { firebase },
  } = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <div className={css.app}>
      {loading && 'loading...'}
      {error && `error: ${error}`}
      {!loading && !error && (
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage user={user} />
            </Route>
            <Route path="/app">
              <AppPage user={user} />
            </Route>
          </Switch>
        </Router>
      )}

      {/* {!loading &&
        !error &&
        ((user && user.isAnonymous && user.displayName) ||
          (user && !user.isAnonymous)) && <ChatRoom />}
      {!loading && !error && user?.displayName === null && <Register />}
      {!loading && !error && !user && <SignInButtons />} */}
    </div>
  );
}

export default App;
