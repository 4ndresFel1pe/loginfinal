import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { db } from '/Services/firebase.js';

async function getUserList() {
    const userCollection = collection(db, 'users');
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
}

function createUserElement(user) {
    const userElement = document.createElement('div');
    userElement.className = 'user-element';

    const cedulaElement = document.createElement('div');
    cedulaElement.textContent = `Cédula: ${user.cedula}`;
    userElement.appendChild(cedulaElement);

    const fechaNacimientoElement = document.createElement('div');
    fechaNacimientoElement.textContent = `Fecha de Nacimiento: ${user.fechaNacimiento}`;
    userElement.appendChild(fechaNacimientoElement);

    const direccionElement = document.createElement('div');
    direccionElement.textContent = `Dirección: ${user.direccion}`;
    userElement.appendChild(direccionElement);

    const telefonoElement = document.createElement('div');
    telefonoElement.textContent = `Teléfono: ${user.telefono}`;
    userElement.appendChild(telefonoElement);

    return userElement;
}




window.addEventListener('DOMContentLoaded', async () => {
    const userList = await getUserList();
    const userContainer = document.getElementById('user_list');
    userList.forEach(user => {
        const userElement = createUserElement(user);
        userContainer.appendChild(userElement);
    });
});
