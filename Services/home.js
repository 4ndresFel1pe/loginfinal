import{userstate, logout, deleteUser, auth, db} from '../Services/firebase.js'
import { deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
userstate()

const sesion = document.getElementById('boton_salir')
const recuperar = document.getElementById('recuperar')
const eliminar = document.getElementById('eliminar');

async function cerrarsesion(){
    const verificacion=logout()
    const comprobar = await verificacion

    .then((comprobar)=>{
        alert('Sesion cerrada')
        window.location.href='../index.html'
    })
    .catch((error)=>{
        alert('Sesion no cerrada')
    })
}

async function eliminarUsuario(){
    try {
        const user = auth.currentUser;
        // Eliminar el documento del usuario de Firestore
        const userDoc = doc(db, 'users', user.uid);
        await deleteDoc(userDoc);
        // Eliminar el usuario autenticado
        await deleteUser(user);
        alert('Usuario eliminado');
        window.location.href='../index.html';
    } catch (error) {
        console.error('Error al eliminar el usuario, puede que lleves mucho tiempo logueado', error);
        alert('No se pudo eliminar el usuario, puede que llevese mucho tiempo logueado');
    }
}

// Función para manejar el clic en el botón de recuperación
function handleRecuperarClick() {
    window.location.href = '/Templates/forgot_password.html';
}

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
    recuperar.addEventListener('click', handleRecuperarClick)
    eliminar.addEventListener('click', eliminarUsuario)
})
