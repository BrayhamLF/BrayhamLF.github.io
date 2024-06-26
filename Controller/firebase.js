import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  deleteUser as authDeleteUser,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import { 
  getFirestore,
  collection, 
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
const db = getFirestore(app);

export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const verification = () =>
  sendEmailVerification(auth.currentUser);

export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const googleauth = (provider) =>
  signInWithPopup(auth, provider);

export const facebookauth = (provider) =>
  signInWithPopup(auth, provider);

export function userstate(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location.href='../index.html';
    }
  });
}

export const recoverypass = (email) =>
  sendPasswordResetEmail(auth, email);

export const loginout = () =>
  signOut(auth);

export async function EliminarUsuario() {
  console.log('Función EliminarUsuario llamada');
  const user = auth.currentUser;
  try {
    await authDeleteUser(user);
    console.log('Usuario eliminado de la autenticación');
  } catch (error) {
    console.error('Error al eliminar el usuario de la autenticación', error);
    throw error;
  }
  
  try {
    const userSnapshot = await query(collection(db, "Usuarios"), where("email", "==", user.email)).get();
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      await deleteDoc(doc(db, 'Usuarios', userDoc.id));
      console.log('Usuario eliminado de Firestore');
    }
  } catch (error) {
    console.error('Error al eliminar el usuario de Firestore', error);
    throw error;
  }
}

export const setregister = (nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, email, tipoCuenta) => 
  setDoc(doc(db, "Usuarios", cedula), {  
    nombres, 
    apellidos, 
    fecha, 
    cedula, 
    estado, 
    rh, 
    genero, 
    telefono, 
    direccion, 
    email, 
    tipoCuenta
  });

export const Getregister = (cedula) => 
  getDoc(doc(db, "Usuarios", cedula));

export const addregister = (nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, email, tipoCuenta) =>
  addDoc(collection(db, "Usuarios"), {
    nombre: nombres,
    apellido: apellidos,
    fecha: fecha,
    cedula: cedula,
    estado: estado,
    rh: rh,
    genero: genero,
    telefono: telefono,
    direccion: direccion,
    email: email,
    tipoCuenta: tipoCuenta
  });

export const viewproducts = () =>
  getDocs(collection(db, "Usuarios"));

export async function eliminarUsuarios(docId) {
  if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
    try {
      await deleteDoc(doc(db, 'Usuarios', docId));
      console.log('Usuario eliminado de Firestore');
    } catch (error) {
      console.error('Error al eliminar el usuario de Firestore:', error);
      throw error;
    }
  }
}

export const logout = () =>
  signOut(auth);

export const deleteuser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      await authDeleteUser(user);
      const userRef = doc(db, "Usuarios", user.uid);
      await deleteDoc(userRef);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function actualizarUsuario(cedula, data) {
  try {
      const userRef = doc(db, "Usuarios", cedula); 
      await updateDoc(userRef, data);
      console.log('Usuario actualizado correctamente');
  } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
  }
}

export async function registrarVape(codigo, nombre, sabor, precio, nicotina, imagen) {
  try {
    const docRef = await addDoc(collection(db, 'Vape'), {
      codigo,
      nombre,
      sabor,
      precio,
      nicotina,
      imagen
    });
    console.log('Producto registrado con ID: ', docRef.id);
    alert('Vape registrado exitosamente.');
  } catch (e) {
    console.error('Error al agregar el documento: ', e);
    alert('Error al registrar el Vape.');
  }
}

export const Getregister2 = (codigo) => 
  getDoc(doc(db, "Vape", codigo));

export const setregister2 = (codigo, nombre, sabor, precio, nicotina, imagen) => 
  setDoc(doc(db, "Vape", codigo), {  
    codigo,
    nombre,
    sabor,
    precio,
    nicotina,
    imagen
  });

export const viewShoes = () =>
  getDocs(collection(db, "Vape"));

export async function eliminarProducto(docId) {
  if (window.confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.')) {
    try {
      await deleteDoc(doc(db, 'Vape', docId));
      console.log('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  }
}

export async function actualizarProducto(codigo, data) {
  try {
      const productRef = doc(db, "Vape", codigo); 
      await updateDoc(productRef, data);
      console.log('Producto actualizado correctamente');
  } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw error;
  }
}
