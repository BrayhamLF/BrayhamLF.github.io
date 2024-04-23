import { deleteuser, loginauth, auth } from './firebase.js';

const deleteUserForm = document.getElementById('Delete-Form');

deleteUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {

        await loginauth(email, password);

        await deleteuser(auth.currentUser);
        
        alert('Usuario'+email+' eliminado exitosamente.');
        window.location.href = "/Index.html"; 

    } catch (error) {
        console.error('Error al eliminar usuario: ', error.message);
        alert('Error al eliminar usuario: ' +  email + error.message);
    }
});
