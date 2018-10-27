function Inscription() {
    var nom = document.getElementById("firstname").value;
    var lastname=document.getElementById("lastname").value;
    var tel = document.getElementById("tel").value;
    var solde = document.getElementById("solde").value;
    var adresse = document.getElementById("adresse").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    var tabOfClient = JSON.parse(localStorage.getItem("tabOfClient"));
    if (tabOfClient == null) {
        tabOfClient = [];
    }


    var client = {
        Id: generateUid(),
        Firstname: nom,
        Lastname: lastname,
        Tel: tel,
        Solde: solde,
        Adresse: adresse,
        Age: age,
        Email: email,
        Password: password,
        ListFavorite: []
    };

    tabOfClient.push(client);
    tabOfClient = localStorage.setItem("tabOfClient", JSON.stringify(tabOfClient));
    alert("Your account created successfuly!");}
   

function generateUid() {
    var uniqueId = Math.round(Math.floor(Math.random() * Math.floor(1000)));

    return uniqueId;
}



function TestAge() {

    document.getElementById("age").addEventListener("blur", myFunction());


}

function myFunction() {
    var age = document.getElementById("age").value;
    if (age < 18) {
        document.getElementById("outputAge").innerHTML = "age must be >18!!!";
        return false;
    }
    else{
        document.getElementById("outputAge").setAttribute("style","display: none");
        return true;
    }
}


function TestTel() { document.getElementById("tel").addEventListener("blur", myTest()); }

function myTest() {
    var regex = /^(2|9|5)[0-9]{7}/gi;
    var tel = document.getElementById("tel").value;
    if (!tel.match(regex)) {

        document.getElementById("outputTel").innerHTML = "Please provide a valid phone number";
        return false;
    }
    else{
        document.getElementById("outputTel").setAttribute("style","display: none");
        return true;
    }

}



function TestEmail() { 
    document.getElementById("email").addEventListener("blur",emailTest());
 }
function emailTest() {
    var email=document.getElementById("email").value;
    var regexmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexmail)) {
        document.getElementById("outputEmail").innerHTML = "Must be a valid email";
        return false;
    }
    else{
        document.getElementById("outputEmail").setAttribute("style","display: none");
        return true;
    }
}

function ListClient()
{
var tabOfClient=JSON.parse(localStorage.getItem("tabOfClient"));
var tab=document.getElementById("divlist");
var list="<table id='table'>";
for(var i=0; i<tabOfClient.length; i++){
    list+="<tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone Number</th><th>Adresse</th><th>Age</th><th>Solde</th></tr>";
    list+="<tr><td>"+ tabOfClient[i].Firstname+"</td>";
    list+="<td>"+tabOfClient[i].Lastname+"</td>";
    list+="<td>"+tabOfClient[i].Email+"</td>";
    list+="<td>"+tabOfClient[i].Tel+"</td>";
    list+="<td>"+tabOfClient[i].Adresse+"</td>";
    list+="<td>"+tabOfClient[i].Age+"</td>";
    list+="<td>"+tabOfClient[i].Solde+"</td></tr>";
}
list+= "</table>";
tab.innerHTML=list;
}