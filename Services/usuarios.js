import { collection, getDocs, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { db } from '/Services/firebase.js';

async function getUserList() {
    const userCollection = collection(db, 'users');
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return userList;
}

function createUserElement(user) {
    const userElement = document.createElement('div');
    userElement.className = 'user-element';
    userElement.id = `user-${user.id}`;

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

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit-button';
    editButton.onclick = () => showEditForm(user, userElement);
    userElement.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = async () => {
        await deleteDoc(doc(db, 'users', user.id));
        userElement.remove();
    };
    userElement.appendChild(deleteButton);

    return userElement;
}

function showEditForm(user, userElement) {
    const editForm = document.createElement('div');
    editForm.className = 'edit-form-container';

    editForm.innerHTML = `
        <form class="edit-form">
            <label>Cédula:</label>
            <input type="text" id="edit-cedula" value="${user.cedula}">
            <label>Fecha de Nacimiento:</label>
            <input type="date" id="edit-fechaNacimiento" value="${user.fechaNacimiento}">
            <label>Dirección:</label>
            <input type="text" id="edit-direccion" value="${user.direccion}">
            <label>Teléfono:</label>
            <input type="text" id="edit-telefono" value="${user.telefono}">
            <button type="submit" class="save-button">Guardar</button>
            <button type="button" id="cancel-edit" class="cancel-button">Cancelar</button>
        </form>
    `;

    userElement.appendChild(editForm);

    document.getElementById('cancel-edit').onclick = () => {
        userElement.removeChild(editForm);
    };

    editForm.querySelector('.edit-form').onsubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {
            cedula: document.getElementById('edit-cedula').value,
            fechaNacimiento: document.getElementById('edit-fechaNacimiento').value,
            direccion: document.getElementById('edit-direccion').value,
            telefono: document.getElementById('edit-telefono').value
        };
        try {
            await updateDoc(doc(db, 'users', user.id), updatedUser);
            console.log(`Usuario con ID ${user.id} actualizado`);

            userElement.querySelector('div:nth-child(1)').textContent = `Cédula: ${updatedUser.cedula}`;
            userElement.querySelector('div:nth-child(2)').textContent = `Fecha de Nacimiento: ${updatedUser.fechaNacimiento}`;
            userElement.querySelector('div:nth-child(3)').textContent = `Dirección: ${updatedUser.direccion}`;
            userElement.querySelector('div:nth-child(4)').textContent = `Teléfono: ${updatedUser.telefono}`;

            userElement.removeChild(editForm);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };
}

window.addEventListener('DOMContentLoaded', async () => {
    const userList = await getUserList();
    const userContainer = document.getElementById('user_list');
    userList.forEach(user => {
        const userElement = createUserElement(user);
        userContainer.appendChild(userElement);
    });
});
