function Inscription() {
    var nom = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var tel = document.getElementById("tel").value;
    var solde = document.getElementById("solde").value;
    var adresse = document.getElementById("adresse").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(password);

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
        Listcommand: []
    };

    tabOfClient.push(client);
    tabOfClient = localStorage.setItem("tabOfClient", JSON.stringify(tabOfClient));
    alert("Your account created successfuly!");
}


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

    }
    else {
        document.getElementById("outputAge").setAttribute("style", "display: none");

    }
}


function TestTel() { document.getElementById("tel").addEventListener("blur", myTest()); }

function myTest() {
    var regex = /^(2|9|5)[0-9]{7}/gi;
    var tel = document.getElementById("tel").value;
    if (!tel.match(regex)) {

        document.getElementById("outputTel").innerHTML = "Please provide a valid phone number";

    }
    else {
        document.getElementById("outputTel").setAttribute("style", "display: none");

    }

}



function TestEmail() {
    document.getElementById("email").addEventListener("blur", emailTest());
}
function emailTest() {
    var email = document.getElementById("email").value;
    var regexmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexmail)) {
        document.getElementById("outputEmail").innerHTML = "Must be a valid email";

    }
    else {
        document.getElementById("outputEmail").setAttribute("style", "display: none");

    }
}





function ListClient() {
    var tabOfClient = JSON.parse(localStorage.getItem("tabOfClient"));
    var list = '<table class="table1">';
    list += "<tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone Number</th><th>Adresse</th><th>Age</th><th>Solde</th></tr>";

    for (i = 0; i < tabOfClient.length; i++) {

        list += "<tr><td>" + tabOfClient[i].Firstname + "</td>";
        list += "<td>" + tabOfClient[i].Lastname + "</td>";
        list += "<td>" + tabOfClient[i].Email + "</td>";
        list += "<td>" + tabOfClient[i].Tel + "</td>";
        list += "<td>" + tabOfClient[i].Adresse + "</td>";
        list += "<td>" + tabOfClient[i].Age + "</td>";
        list += "<td>" + tabOfClient[i].Solde + "</td></tr>";
    }
    list += "</table>";
    var divlist = document.getElementById("divlist");
    divlist.innerHTML = list;
}





function viewProfil() {
    var tabOfClient = JSON.parse(localStorage.getItem("tabOfClient"));
    var loggeduser = JSON.parse(localStorage.getItem("loggeduser"));

    for (i = 0; i < tabOfClient.length; i++) {
        if (tabOfClient[i].Id == loggeduser[0].id) {

            client = tabOfClient[i];
        }
    }
    var profil = document.getElementById("pro");
    profile = " <strong>First Name:    </strong> " + client.Firstname + "<br><br>";
    profile += "<strong>Last Name:    </strong> " + client.Lastname + "<br><br>";
    profile += "<strong>Email:    </strong>" + client.Email + "<br><br>";
    profile += "<strong>Phone Number:   </strong> " + client.Tel + "<br><br>";
    profile += "<strong>Adresse:   </strong> " + client.Adresse + "<br><br>";
    profile += "<strong>Age:    </strong> " + client.Age + "<br><br>";
    profile += "<strong>Solde:     </strong> " + client.Solde + "<br><br>";
    profile += '<button class="btn btn-primary" onclick="redirect()"> Edit</button>';  
   
    profil.innerHTML = profile;
}

function redirect(){
    window.location.href="editProfile.html";
}



/* pas encore terminée*/
function editProfil() {
    var tabOfClient = JSON.parse(localStorage.getItem("tabOfClient"));
    var loggeduser = JSON.parse(localStorage.getItem("loggeduser"));

    for (i = 0; i < tabOfClient.length; i++) {
        if (tabOfClient[i].Id == loggeduser[0].id) {

            client = tabOfClient[i];
        }
    }
 
    

  profil = '<form><label id="id1" for="customer-email" class="login control-label col-sm-4">ID</label><input disabled  type="email" id="id" class="form-control" value="' + client.Id + '"/><br><br>';
    profil += "<label for='customer-email' class='login control-label col-sm-4'>First name</label><input  type='email' id='firstname' class='form-control' value='" + client.Firstname + "'/><br><br>";
    profil += "<label for='customer-email' class='login control-label col-sm-4'>Last name</label><input type='email' class='form-control' id='lastname' value='" + client.Lastname + "'/><br><br>";
    profil += "<label for='customer-email' class='login control-label col-sm-4'>Email</label><input type='email' class='form-control' id='email' value='" + client.Email + "'/><br><br>";
    profil += "<label for='customer-email' class='login control-label col-sm-4'>Phone Number</label><input class='form-control' type='email' id='tel' value='" + client.Tel + "'/><br><br>";
    profil += "<label for='customer-email' class='login control-label col-sm-4'>Adresse</label><input class='form-control' type='email' id='adresse' value='" + client.Adresse + "'/><br><br>";
    profil += "<label for='customer-email' class='login control-label col-sm-4'>Age</label><input class='form-control' type='email' id='age' value='" + client.Age + "'/><br><br>";
    profil += "<label for='customer-email' class='login control-label col-sm-4'>Solde</label><input class='form-control' type='email' id='solde' value='" + client.Solde + "'/><br><br>";
    profil += "<label for='customer-email' class='login control-label col-sm-4'>Password</label><input class='form-control' type='email' id='password' value='" + client.Password + "'/><br><br>";
    profil += "<button class='btn btn-primary'  onclick='updateProfile()'> Save change</button></form>";

    var divprofil = document.getElementById("editP");
    divprofil.innerHTML = profil;
}







function updateProfile() {
    var id=document.getElementById("id").value;
    var nom = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var tel = document.getElementById("tel").value;
    var solde = document.getElementById("solde").value;
    var adresse = document.getElementById("adresse").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    tabOfClient=JSON.parse(localStorage.getItem("tabOfClient"));

   
    client = {
        Id:id,
        Firstname:nom,
        Lastname:lastname,
        Tel:tel,
        Solde: solde,
        Adresse: adresse,
        Age: age,
        Email: email,
        Password: password,
        Listcommand: []

    };
    for(i=0;i<tabOfClient.length;i++)
    {
        if (tabOfClient[i].Id==id){
           tabOfClient[i]=client;
        }
    }
    localStorage.setItem("tabOfClient",JSON.stringify(tabOfClient));
    console.log(tabOfClient);
    alert("Your data are changed successfully ")
}
