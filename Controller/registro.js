import {registerauth, verification} from './firebase.js'

const formulario = document.getElementById('LogUp-Form')
const boton = document.getElementById('rgsbtn')


async function register(){

    const email = formulario['email'].value
    const psw = formulario['password'].value
    const confirmEmail = formulario['confirmEmail'].value
    const confirmPassword = formulario['confirmPassword'].value

    const validar = registerauth(email, psw, confirmEmail, confirmPassword)
    const verificar = await validar

    .then((verificar) => {

        verification()

        alert('Register ' + email + ' succefull')
        const user = verificar.user;
        window.location.href="/Templates/Registrarse.html"

    })
    .catch((error) => {

        alert('Not Succefull '+email)

        const errorCode = error.code;
        const errorMesagge = error.mesagge

    })

}

boton.addEventListener( 'click', (e) =>{
    e.preventDefault()
    register()
})

document.getElementById("exitbtn").addEventListener("click", function() {
    window.location.href = "/Index.html";
});