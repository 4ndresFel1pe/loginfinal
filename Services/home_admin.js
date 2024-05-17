import{userstate, logout, registerauth, deleteUser,  auth, db} from '../Services/firebase.js'
import { deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

userstate()

const sesion = document.getElementById('boton_salir')
const form = document.getElementById('crear_usuario_form');
const crearUsuarioBoton = document.getElementById('crear_usuario_boton'); 
const listaa = document.getElementById('mostrar_usuarios'); 
const eliminar = document.getElementById('eliminar_cuenta');

function lista() {
    window.location.href = '/Templates/usuarios.html';
}

async function cerrarsesion(){
    const verificacion=logout()
    const comprobar = await verificacion

    .then((comprobar)=>{
        alert('Sesion cerrada')
        window.location.href= "../index.html"
    })
    .catch((error)=>{
        alert('Sesion no cerrada')
    })
}

async function crearUsuario(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cedula = document.getElementById('cedula').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;

    try {
        await registerauth(email, password, cedula, fechaNacimiento, direccion, telefono);
        alert('Usuario creado exitosamente'); 
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('cedula').value = '';
        document.getElementById('fechaNacimiento').value = '';
        document.getElementById('direccion').value = '';
     document.getElementById('telefono').value = '';
    } catch (error) {
        console.error('Error al crear el usuario', error);
        alert('No se pudo crear el usuario');
    }
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

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
    form.addEventListener('submit', crearUsuario) 
    listaa.addEventListener('click', lista)
    eliminar.addEventListener('click', eliminarUsuario)
    crearUsuarioBoton.addEventListener('click', function() {
        form.dispatchEvent(new Event('submit'));
    });
})
