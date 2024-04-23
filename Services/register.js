import { registerauth } from "../Services/firebase.js"

const save_auth = document.getElementById('btn_register')

function validarContraseña(contraseña) {
    // Debe contener al menos un número
    const tieneNumero = /\d/.test(contraseña);
    // Debe contener al menos una letra mayúscula
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    // Debe contener al menos un carácter especial
    const tieneCaracterEspecial = /[!@#$%^&*]/.test(contraseña);
    // Debe tener al menos 8 caracteres de longitud
    const tieneLongitudValida = contraseña.length >= 8;

    return tieneNumero && tieneMayuscula && tieneCaracterEspecial && tieneLongitudValida;
}

async function register() {
    if (window.verificado === true) {
        const emailInput = document.getElementById('emailR').value;
        const contraseñaInput = document.getElementById('contraseñaR').value;

        if (!validarContraseña(contraseñaInput)) {
            alert("La contraseña debe contener al menos un número, una letra mayúscula, un carácter especial como (!@#$%^&*) y tener al menos 8 caracteres de longitud.");
            return;
        }

        const validar = registerauth(emailInput, contraseñaInput);
        const verificar = await validar

            .then((verificar) => {
                alert("El usuario se registro exitosamente..");
                const user = verificar.user;
                window.location.href = "../index.html";
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
