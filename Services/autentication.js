import {login_auth, signInWithGoogle, signInWithFacebook, recoverPassword} from "../Services/firebase.js"
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { db } from '../Services/firebase.js';

const evento = document.getElementById("login_btn")
const googleEvento = document.getElementById("google_login_btn")
const facebookEvento = document.getElementById("facebook_login_btn")
const recoverEvento = document.getElementById("recuperar_btn")

//------------------------------------------------------------------
async function validar(){
    const email = document.getElementById('usuario').value
    const password = document.getElementById('password').value

    if (!email || !password) {
        document.getElementById('error-message').textContent = 'Se deben llenar todos los campos';
        return;
    }

    try {
        const userCredential = await login_auth(email, password)
        const user = userCredential.user;

        alert("Usuario autenticado: " + email)

        // Obtener el documento del usuario de Firestore
        const userDoc = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDoc);

        // Verificar si el usuario es administrador
        if (userSnap.exists() && userSnap.data().rol === true) {
            window.location.href = "../Templates/home_admin.html"
        } else {
            window.location.href = "../Templates/home.html"
        }
    } catch (error) {
        console.log("Sesion "+ email + " not validation")
        alert("Error de usuario verifique usuario y/o contraseña")
    }
}

//-----------------------------------------------------------------------------------

async function validarGoogle(){
    const verificar = signInWithGoogle()
    const validation = await verificar 

    if(verificar != null){
        alert("Usuario autenticado con Google")
        window.location.href = "../Templates/home.html"
    }else{
        console.log("Sesion Google not validation")
        alert("Error de usuario verifique usuario y/o contraseña")
    }
}

async function validarFacebook(){
    const verificar = signInWithFacebook()
    const validation = await verificar 

    if(verificar != null){
        alert("Usuario autenticado con Facebook")
        window.location.href = "../Templates/home.html"
    }else{
        console.log("Sesion Facebook not validation")
        alert("Error de usuario verifique usuario y/o contraseña")
    }
}
async function recuperar(){
    const email = document.getElementById('emailR').value
    if (!email) {
        document.getElementById('error-message').textContent = 'Se deben llenar todos los campos';
        return;
    }
    try {
        await recoverPassword(email)
        alert("Se ha enviado un correo electrónico para restablecer tu contraseña a " + email)
    } catch (error) {
        console.log(error)
        alert("Error al enviar el correo electrónico de recuperación de contraseña")
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    evento.addEventListener('click', validar)
    googleEvento.addEventListener('click', validarGoogle)
    facebookEvento.addEventListener('click', validarFacebook)
    if (recoverEvento !== null) {
        recoverEvento.addEventListener('click', recuperar)
    }
})
document.addEventListener('DOMContentLoaded', (event) => {
     recoverEvento.addEventListener('click', recuperar)

})
