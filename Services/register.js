import { registerauth } from "../Services/firebase.js"

const save_auth = document.getElementById('btn_register')

function validarContraseña(contraseña) {
    const tieneNumero = /\d/.test(contraseña);
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneCaracterEspecial = /[!@#$%^&*]/.test(contraseña);
    const tieneLongitudValida = contraseña.length >= 8;

    return tieneNumero && tieneMayuscula && tieneCaracterEspecial && tieneLongitudValida;
}

async function register() {
    if (window.verificado === true) {
        const emailInput = document.getElementById('emailR').value;
        const contraseñaInput = document.getElementById('contraseñaR').value;
        const cedulaInput = document.getElementById('cedula').value;
        const fechaNacimientoInput = document.getElementById('fechaNacimiento').value;
        const direccionInput = document.getElementById('direccion').value;
        const telefonoInput = document.getElementById('telefono').value;

        if (!validarContraseña(contraseñaInput)) {
            alert("La contraseña debe contener al menos un número, una letra mayúscula, un carácter especial como (!@#$%^&*) y tener al menos 8 caracteres de longitud.");
            return;
        }

        const validar = registerauth(emailInput, contraseñaInput, cedulaInput, fechaNacimientoInput, direccionInput, telefonoInput);
        const verificar = await validar

        .then((verificar) => {
            if (verificar) {
                alert("El usuario se registro exitosamente..");
                const user = verificar.user;
                window.location.href = "../index.html";
            } else {
                console.error("Error: verificar es undefined");
            }
        })
        

            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert("Este correo electrónico ya está en uso. Por favor, utiliza otro.");
                } else if(error.code === 'auth/invalid-email') {
                    alert("Correo invalido, sigue el formato: ejemplo@example.com");
                }else{
                    alert("Hubo un error, intenta de nuevo más tarde.");
                    console.error(error);
                }
            });
    }
}



window.addEventListener('DOMContentLoaded', () => {
    save_auth.addEventListener('click', register);
});
