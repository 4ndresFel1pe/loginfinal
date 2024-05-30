import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js';
import { getFirestore, doc, setDoc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    sendEmailVerification, 
    deleteUser
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyB7ylgSsGv-i0_OR00x5pSyhyuiqMHRCls",
  authDomain: "webb-d62a1.firebaseapp.com",
  projectId: "webb-d62a1",
  storageBucket: "webb-d62a1.appspot.com",
  messagingSenderId: "444778371562",
  appId: "1:444778371562:web:5b8fc83b103fcd19057a93",
  measurementId: "G-ZNPLCMVQ79"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 

export const login_auth = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const logout = () =>
    signOut(auth); 
  
export function userstate() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
        } else {
            window.location.href = '../index.html';
        }
    });
} 

export const registerauth = (email, password, cedula, fechaNacimiento, direccion, telefono,rol = false) => 
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (userCredential) {
                // Signed in 
                const user = userCredential.user;
                // Enviar correo de verificación
                sendEmailVerification(user)
                    .then(() => {
                        console.log('Correo de verificación enviado');
                    })
                    .catch((error) => {
                        console.error('Error al enviar el correo de verificación', error);
                    });
        
                return setDoc(doc(db, "users", user.uid), {
                    cedula: cedula,
                    fechaNacimiento: fechaNacimiento,
                    direccion: direccion,
                    telefono: telefono,
                    rol: rol  // Aquí está el rol, que será 'false' por defecto.
                }).then(() => userCredential); 
            } else {
                console.error("Error: userCredential es undefined");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

// Google
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => 
    signInWithPopup(auth, googleProvider);

// Facebook
export const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = () => 
    signInWithPopup(auth, facebookProvider);

// Recuperar contraseña
export const recoverPassword = (email) => 
    sendPasswordResetEmail(auth, email);

export { db };
export { deleteUser, deleteDoc, updateDoc }; 
export { auth };
