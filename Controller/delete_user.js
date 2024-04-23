import{userstate, deleteuser} from "../Controller/firebase.js"

userstate()

const eliminar = document.getElementById('btndelete')

async function eliminarusuario(){

    const verificar=deleteuser()
    const comprobar = await verificar

    .then((comprobar)=>{
        alert('Usuario eliminado correctamente.')
        window.location.href="../Index.html"
    })
    .catch((error)=>{
        
        alert('No se ha podido eliminar el usuario.')
    })
}

window.addEventListener('DOMContentLoaded', async()=>{
    eliminar.addEventListener('click', eliminarusuario)
})