import{userstate, logout, registerauth} from '../Services/firebase.js'

userstate()

const sesion = document.getElementById('boton_salir')

async function cerrarsesion(){
    const verificacion=logout()
    const comprobar = await verificacion

    .then((comprobar)=>{
        alert('Sesion cerrada')
        window.location.href='index.html'
    })
    .catch((error)=>{
        alert('Sesion no cerrada')
    })
}

const form = document.getElementById('crear_usuario_form');

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

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
    form.addEventListener('submit', crearUsuario)
})
