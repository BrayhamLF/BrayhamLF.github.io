import {registerauth} from './firebase.js'

const save_auth = document.getElementById('rgsbtn')

async function register(){

    const email = document.getElementById('email').value
    const psw = document.getElementById('password').value

    const validar = registerauth(email, psw)
    const verificar = await validar

    .then((verificar) => {

        alert('Register ' + email + ' succefull')
        const user = verificar.user;

    })
    .catch((error) => {

        alert('Not Succefull')

        const errorCode = error.code;
        const errorMesagge = error.mesagge

    })


}

window.addEventListener('DOMContentLoaded', async()=>{
    save_auth.addEventListener('click', register)
})

document.getElementById("exitbtn").addEventListener("click", function() {
    window.location.href = "/Index.html";
});