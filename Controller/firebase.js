import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { 

  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  sendEmailVerification 

} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'


const firebaseConfig = {
  apiKey: "AIzaSyAoecY9UEZzrZx-k3E2TcstI3xbMVFgYkg",
  authDomain: "apiweblogin24g2.firebaseapp.com",
  projectId: "apiweblogin24g2",
  storageBucket: "apiweblogin24g2.appspot.com",
  messagingSenderId: "591892579123",
  appId: "1:591892579123:web:056a214bfced8cf951f446",
  measurementId: "G-J9MNYKHY9J"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Métdo de Registro de Usario
export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

//Verifacion por correo
export const verification = () =>
  sendEmailVerification(auth.currentUser)

// Metodo de autenticación de usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// Método Inicion Sesion Google
export const googleauth = (provider) =>
  signInWithPopup(auth, provider)

// Estado del Usuario logeado
export function userstate(){
  onAuthStateChanged(auth, (user) => {
    if (user) {

      const uid = user.uid;
      console.log(uid)

    } else {
      window.location.href='../Index.html'
    }
  });
}

// Cerrar sesion del usuario
export const loginout = () =>
  signOut(auth)

