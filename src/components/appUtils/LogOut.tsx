import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import firebase from '../../services/firebase';
import Cookies from 'js-cookie';

const LogOut = (): JSX.Element => {
  const handleClick = () => {
    Cookies.remove('userType');
    firebase.auth().signOut();
  };
  const { user } = useContext(AuthContext);
  return (
    <div>{user ? <button onClick={handleClick}>Logout</button> : null}</div>
  );
};

export default LogOut;
