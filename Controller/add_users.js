import { setregister } from './firebase.js'

const boton = document.getElementById('rgsbtn')
const salir = document.getElementById('exitbtn')

async function Agregar(){

    const nombres = document.getElementById('edtnom').value;
    const apellidos = document.getElementById('edtape').value;
    const fecha = document.getElementById('edtfecha').value;
    const cedula = document.getElementById('edtcc').value;
    const estado = document.getElementById('edtstc').value;
    const rh = document.getElementById('edtrh').value;
    const genero = document.getElementById('edtgnr').value;
    const telefono = document.getElementById('edttlf').value;
    const direccion = document.getElementById('edtdirec').value;
    const rol = document.getElementById("edtrol").value;
    const email = document.getElementById('edtemail').value;

    const verificar = setregister(nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, rol, email)
    const validar = await verificar

    .then((validar) => {
        
        alert('Usuario ' + nombres + ' con el email '+ email +' fue guardado exitosamente')

    })
    .catch((error) => {

        alert('Error al guardar el usuario ' + nombres + ' con el email '+ email)

        const errorCode = error.code;
        const errorMesagge = error.mesagge

    })
    
}

window.addEventListener('DOMContentLoaded', async()=>{
    boton.addEventListener('click', Agregar)
})

salir.addEventListener('click', function() {
    window.location.href = "/index.html";
})