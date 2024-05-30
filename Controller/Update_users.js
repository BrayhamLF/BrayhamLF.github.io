import { updatedata } from './firebase.js';

const boton = document.getElementById('updbtn')

async function Actualizar(){

    const nombres = document.getElementById('edtnom').value;
    const apellidos = document.getElementById('edtape').value;
    const fecha = document.getElementById('edtfecha').value;
    const cedula = document.getElementById('edtcc').value;
    const estado = document.getElementById('edtstc').value;
    const rh = document.getElementById('edtrh').value;
    const genero = document.getElementById('edtgnr').value;
    const telefono = document.getElementById('edttlf').value;
    const direccion = document.getElementById('edtdirec').value;

    const verificar = updatedata(nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion)
    const validar = await verificar

    .then((validar) => {
        
        alert('Usuario ' + nombres + ' con el email '+ email +' fue actualizado exitosamente')

    })
    .catch((error) => {

        alert('Error al actualizar el usuario ' + nombres + ' con el email '+ email)

        const errorCode = error.code;
        const errorMesagge = error.mesagge

    })
    
}

window.addEventListener('DOMContentLoaded', async()=>{
    boton.addEventListener('click', Actualizar)
})