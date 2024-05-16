import { userstate, loginout } from '../Controller/firebase.js'

userstate()

const sesion = document.getElementById('btnlogout')
const boton = document.getElementById('btndelete')
const view = document.getElementById('btnview')
const registrar = document.getElementById('rgsbtn')

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

registrar.addEventListener('click', function() {
    window.location.href = "/Templates/Registrarse.html";
})

boton.addEventListener('click', function() {
    window.location.href = "/Templates/eliminarusuario.html";
})

view.addEventListener('click', function() {
    window.location.href = "/Templates/VerUsuarios.html";
})