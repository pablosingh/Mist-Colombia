import React, { useEffect, useState } from 'react';
import firebase, { db } from '../../services/firebase';

type ContextProps = {
  user: firebase.User | null;
  userType: string;
  setUser: any;
  loadingAuthState: boolean;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as firebase.User | null);
  const [userType, setuserType] = useState('');

  const getUserType = async (userId: string) => {
    if (userId) {
      const docRef = await db.collection('partner').get();
      const currentUser = docRef.docs.find(
        (doc) => doc.data().general.userId === userId
      );
      return currentUser ? currentUser?.data().general.type : false;
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        (async (userId) => {
          setuserType(await getUserType(userId));
        })(user.uid);
      } else {
        setuserType('guest');
      }
      setUser(user);
    });
  }, []);

  if (!userType) {
    return <> Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
