import{userstate, logout} from '../Services/firebase.js'

userstate()

const sesion = document.getElementById('boton_salir')

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

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
})