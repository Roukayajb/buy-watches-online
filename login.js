function log() {
    var usermail = document.getElementById("customer-email").value;
    var userpwd = document.getElementById("customer-password").value;
    var users, loggedusers = [];
    console.log(usermail);
    console.log(userpwd);
    users = JSON.parse(localStorage.getItem('tabOfClient'));
    for (var i = 0; i < users.length; i++) {
        if ((usermail == users[i].Email) && (userpwd == users[i].Password)) {
            alert("welcome" + " "+users[i].Firstname);
            var logged = {
                id: i,
                mail: usermail,
                password: userpwd
            }
            loggedusers.push(logged);
            console.log(loggedusers);
            localStorage.setItem('loggeduser', JSON.stringify(loggedusers));
            window.location.href = "watches.html";
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