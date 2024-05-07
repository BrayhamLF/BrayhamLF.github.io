import {addregister} from './firebase.js'

const agregar = document.getElementById('addbtn')
const salir = document.getElementById('exitbtn')

async function Agregar(){

    const nombre = document.getElementById('edtnom')
    const fecha = document.getElementById('edtfecha')
    const cedula = document.getElementById('edtcc')
    const telefono = document.getElementById('edttlf')
    const direccion = document.getElementById('edtdirec')
    const email = document.getElementById('edtemail')




    const verificar = addregister(nombre, fecha, cedula, telefono, direccion, email)
    const validar = await verificar

    .then((validar) => {
        
        alert('Usuario ' + nombre + ' con el email '+ email +' fue guardado exitosamente')
        window.location.href="/Templates/Registro_Productos.html"

    })
    .catch((error) => {

        alert('Error al agregar el producto')

        const errorCode = error.code;
        const errorMesagge = error.mesagge

    })

}

window.addEventListener('DOMContentLoaded', async()=>{
    agregar.addEventListener('click', Agregar)
})

salir.addEventListener('click', function() {
    window.location.href = "/index.html";
})