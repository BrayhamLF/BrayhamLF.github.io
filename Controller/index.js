document.addEventListener('DOMContentLoaded', function() {
    var loginbtn = document.getElementById('loginbtn');

    loginbtn.addEventListener('click', function() {
        var email = document.getElementById('edtemail').value;
        var password = document.getElementById('edtpassword').value;
        
        if (email === '' || password === '') {
            alert('Por favor, complete todos los campos.');
        }
    });
});

document.getElementById("signbtn").addEventListener("click", function() {
    window.location.href = "/Templates/Registrarse.html";
});