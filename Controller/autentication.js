import{loginauth} from "../Controller/firebase.js"

const formulario = document.getElementById('LogIn-Form')
const boton = document.getElementById("loginbtn")

async function validar(){

    const email = formulario['edtemail'].value
    const password = formulario['edtpassword'].value

    const verificar = loginauth(email,password)
    const validation = await verificar

    .then((validation) => {
        
        if (email === "brayhamlindarte.es@unitropico.edu.co" || email === "brayhamlindarte.es@unitropico.edu.co " ){

            alert("user authentication succesfull "+email)
            window.location.href="/Templates/Home.html"

        }else{      

            alert("user authentication succesfull "+email)
            window.location.href="/Templates/Usuarios.html"
            
        }

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

document.getElementById('show-password').addEventListener('click', function() {
    var passwordField = document.getElementById('edtpassword');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.textContent = 'Ocultar contraseña';
    } else {
        passwordField.type = 'password';
        this.textContent = 'Mostrar contraseña';
    }
});