function log() {
    var usermail = document.getElementById("customer_email");
    var userpwd = document.getElementById("customer_password");
    var users, loggedusers = [];
    users = JSON.parse(localStorage.getItem('tabOfClient') || '[]');
    for (var i = 0; i < users.length; i++) {
        if ((usermail.value == users[i].Email) && (userpwd.value == users[i].pwd)) {
            alert("welcome" + users[i].name);
            window.location.href = "watches.html";
            var logged = {
                id: i,
                mail: usermail.value,
                password: userpwd.value
            }
            loggedusers.push(logged);
            console.log(loggeduser);
            localStorage.setItem('loggeduser', JSON.stringify(loggedusers));
            break;
        } else if (((usermail.value == users[i].email) && (userpwd.value == users[i].pwd)) && userpwd.value == "admin") {
            alert("welcome" + users[i].nom);
            window.location = "admin.html";
            var logged = {
                mail: usermail.value,
                password: userpwd.value
            }
            loggedusers.push(logged);
            console.log(loggeduser);
            localStorage.setItem('loggeduser', JSON.stringify(loggedusers));
            break;
        }
        else {
            i++;
        }
    }
    if (i == users.length) {
        alert("please create an account!");
    }
}