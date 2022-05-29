import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { firebase } from '../services/firebase';
import { baseUrl } from '../constants.js';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [firebaseAuthenticated, setFirebaseAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setFirebaseAuthenticated(true);
        user.getIdToken().then((token) => {
          setUserToken(token);
          axios.post(baseUrl+'auth/login/', {},
            { headers: { 'Authorization': token }},
          ).then((response) => {
            if (response.status === 200) {
              setAuthenticated(true);
              setCurrentUser(response.data);
            }
            else {
              setAuthenticated(false);
              setCurrentUser(null);
            }
            setIsLoading(false);
          });
        });
      }
      else {
        setFirebaseAuthenticated(false);
        setAuthenticated(false);
        setCurrentUser(null);
        setIsLoading(false);
      }
    });
  }, [authenticated, firebaseAuthenticated]);

  return (
    <AuthContext.Provider value={{ currentUser, userToken, authenticated, firebaseAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}