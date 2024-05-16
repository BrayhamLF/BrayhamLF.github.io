import{viewusers} from './firebase.js'

const datos =  document.getElementById('view-data')
const boton = document.getElementById('volverbtn')

async function mostrar(){

    datos.innerHTML=''

    const docref = viewusers()
    const querySnapshot = await docref

    querySnapshot.forEach((doc) => {

        console.log(`${doc.id}`);

        datos.innerHTML+=`

            <tr>
            <th scope="row">${doc.data().nombre}</th>
            <td>${doc.data().apellido}</td>
            <td>${doc.data().fecha}</td>
            <td>${doc.data().cedula}</td>
            <td>${doc.data().estado}</td>
            <td>${doc.data().rh}</td>
            <td>${doc.data().genero}</td>
            <td>${doc.data().telefono}</td>
            <td>${doc.data().direccion}</td>
            <td>${doc.data().email}</td>
            <td>${doc.id}</td>
            </tr>

        `
    });

}

window.addEventListener('DOMContentLoaded', async()=>{
    mostrar()
})

boton.addEventListener('click', function() {
    window.location.href = "/Templates/Home.html";
})