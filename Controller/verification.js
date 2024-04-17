import{verification} from './firebase.js'

const enviar = document.getElementById('verificationbtn')

async function verificacion(){

    const verificar = verification()

    verificar.then(()=>{

        alert('Email verification sent!')
        window.location.href="/Templates/Registrarse.html"

    })

}
window.addEventListener('DOMContentLoaded', async()=>{
    enviar.addEventListener('click', verificacion)
})