import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

//* Your web app's Firebase configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, navigate) => {
  try {
    //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    // console.log(userCredential);
  } catch (error) {
    alert(error.REACT_APP_messagingSenderId);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
  try {
    //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (error) {
    alert(error.message);
  }
};

export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const { email, displayName, photoUrl } = user;
      setCurrentUser({ email, displayName, photoUrl });
      // console.log(user);
    } else {
      // User is signed out
      // ...
      setCurrentUser(false);
      console.log("User Logged Out");
    }
  });
};

export const logOut = () => {
  signOut(auth);
};
