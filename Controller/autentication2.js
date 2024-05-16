import{loginauth} from "../Controller/firebase.js"

const formulario = document.getElementById('LogIn-Form')
const boton = document.getElementById("loginbtn2")

async function validar(){

    const email = formulario['edtemail'].value
    const password = formulario['edtpassword'].value

    const verificar = loginauth(email,password)
    const validation = await verificar

    .then((validation) => {
        
        alert("user authentication succesfull "+email)
        window.location.href="/Templates/Usuarios.html"
    })
    .catch((error) => {

        console.log("Sesion "+email+" not validation")
        alert("Error de usuario verifique usuario y/o contraseña")

        const errorCode = error.code;
        const errorMesagge = error.mesagge

    })
}

boton.addEventListener( 'click', (e)=>{

    e.preventDefault()
    validar()

})