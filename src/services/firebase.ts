import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const { firebaseConfig } = require('./firebaseConfig.js');

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
export const auth = firebase.auth();

export async function setData(data: any): Promise<void> {
  await db.collection('partner').doc().set(data);
}

export const getUser = (): firebase.User | null => {
  const user = firebase.auth().currentUser;
  return user;
};
export const getEmail = (): string | null | undefined => {
  const user = firebase.auth().currentUser;
  return user?.email;
};
export const getUserAuth = (): boolean => {
  const user = firebase.auth().currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
};
export async function signIn(
  email: string | null | undefined,
  password: string | undefined
) {
  if (email && password) {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return res.user ? true : false;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}
export const changePassword = async (
  inputtedPassword: string,
  oldPassword: string
) => {
  const user = firebase.auth().currentUser;
  if (!user?.email) return false;

  try {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    await firebase.auth().currentUser?.reauthenticateWithCredential(credential);
    await user.updatePassword(inputtedPassword);
    return true;
  } catch (error) {
    return false;
  }
};
export const getEmailWithUser = async (user: string) => {
  if (user) {
    const docRef = await db.collection('partner').get();
    const currentUser = docRef.docs.find(
      (doc) => doc.data().general.user === user
    );
    return currentUser ? currentUser?.data().general.email : false;
  }
};

export const getUserType = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const docRef = await db.collection('partner').get();
    const currentUser = docRef.docs.find(
      (doc) => doc.data().general.userId === user.uid
    );
    return currentUser ? currentUser?.data().general.type : false;
  }
};

export const setPostData = async (data: any): Promise<any> => {
  const user = firebase.auth().currentUser;
  try {
    await db
      .collection('config')
      .doc()
      .set({
        ...data,
        userId: user?.uid,
      });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default firebase;
