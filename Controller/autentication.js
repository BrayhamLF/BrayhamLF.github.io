import{loginauth} from "../Controller/firebase.js"

const formulario = document.getElementById('LogIn-Form')
const boton = document.getElementById("loginbtn")

async function validar(){

    const email = formulario['edtemail'].value
    const password = formulario['edtpassword'].value

    const verificar = loginauth(email,password)
    const validation = await verificar

    if (validation != null){

        alert("user authentication succesfull "+email)
        window.location.href="/Templates/Home.html"

    } 
    else{

        console.log("Sesion "+email+" not validation")
        alert("Error de usuario verifique usuario y/o contraseña")

    }
}

boton.addEventListener( 'click', (e)=>{

    e.preventDefault()
    validar()

})