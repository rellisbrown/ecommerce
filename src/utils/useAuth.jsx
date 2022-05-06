import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const auth = getAuth();

  onAuthStateChanged(auth, (tempUser) => {
    if (tempUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // eslint-disable-next-line
      const uid = tempUser.uid;
      console.log(uid);
      setUser(tempUser);
      // ...
    } else {
      // User is signed out
      // ...
      console.log('signed out');
      if (user !== null) {
        setUser(null);
      }
    }
  });

  const contextValue = useMemo(() => ({ user, auth }), [user, auth]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
