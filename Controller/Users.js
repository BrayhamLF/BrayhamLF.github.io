import { userstate, loginout } from '../Controller/firebase.js'

userstate()

const sesion = document.getElementById('btnlogout')
const boton = document.getElementById('btndelete')
const recovery = document.getElementById('passbtn')

async function cerrarsesion(){

    const verificar=loginout()
    const comprobar = await verificar

    .then((comprobar)=>{
        alert('Sesion Cerrada')
        window.location.href="../index.html"
    })
    .catch((error)=>{
        alert('Error al Cerrar Sesion')
    })
}

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
})

boton.addEventListener('click', function() {
    window.location.href = "/Templates/eliminarusuario.html";
})

recovery.addEventListener('click', function() {
    window.location.href = "/Templates/Recuperarcontraseña.html";
})