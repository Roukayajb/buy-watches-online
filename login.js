function log() {
    var usermail = document.getElementById("customer-email").value;
    var userpwd = document.getElementById("customer-password").value;
    var loggedusers = [];
    console.log(usermail);
    console.log(userpwd);
    var users = JSON.parse(localStorage.getItem('tabOfClient'));
    for (var i = 0; i < users.length; i++) {
        if ((usermail == users[i].Email) && (userpwd == users[i].Password)) {
            alert("welcome" + " "+users[i].Firstname);
            var logged = {
                id: users[i].Id,
                mail: usermail,
                password: userpwd
            }
            loggedusers.push(logged);
            localStorage.setItem('loggeduser', JSON.stringify(loggedusers));
            window.location.href = "HomeClient.html";
            break;
        } else if (((usermail == users[i].email) && (userpwd == users[i].Password)) && userpwd  == "admin") {
            alert("welcome" + users[i].Firstname);
            var logged = {
                mail: usermail,
                password: userpwd
            }
            loggedusers.push(logged);
            console.log(loggedusers);
            localStorage.setItem('loggeduser', JSON.stringify(loggedusers));
            window.location = "admin.html";
        }
    }
    if (i == users.length) {
        alert("please create an account!");
    }
    
}


function logout() {
   
    loggedusers = JSON.parse(localStorage.getItem('loggeduser'));        
        localStorage.removeItem("loggeduser");
        document.location.href = "watches.html";
 
}
