import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDocs,
  getDoc,
  DocumentData,
  doc,
  where,
} from 'firebase/firestore';
import { db, auth, app } from './firebaseClient';

const useUser = (uid) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (uid) {
      const docRef = doc(db, 'users', uid);

      const getUserData = async () => {
        const userDataSnapshot = await getDoc(docRef);

        setUserData(userDataSnapshot.data());
      };
      getUserData();
    }
  }, [uid]);

  return userData;
};

export default useUser;
