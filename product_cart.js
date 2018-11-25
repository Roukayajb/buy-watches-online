

function addproduct(index) {
    var tabproducts = JSON.parse(localStorage.getItem("tabofProducts"));
    var boughtproducts = JSON.parse(localStorage.getItem('producttobuy') || '[]');
    var cart = JSON.parse(localStorage.getItem('cart') || '[]');
    var logged = JSON.parse(localStorage.getItem('loggeduser'));
    var nom, prix;
    var qte = 1;
    if (logged == null) {
        alert('you should have an account');
    } else {
        for (var l = 0; l < tabproducts.length; l++) {
            if ((tabproducts[l].id) == index) {
                nom = tabproducts[l].product;
                prix = tabproducts[l].price;
            }
        }
        //construire notre objet produit
        var myproduct = {
            name: nom,
            product_price: prix,
            quantity: qte,
            totalprod: prix * qte
        }
        console.log(myproduct);
        if (cart == []) {
            cart.push(myproduct);
            console.log(cart);
            alert("Product added to cart");
        } else {
            for (var k = 0; k < cart.length; k++) {
                if ((cart[k].name) === (myproduct.name)) {
                    cart[k].quantity += 1;
                    cart[k].totalprod = (cart[k].quantity * cart[k].product_price);
                    alert("this product is already in your cart ");
                    break;
                }

            }
            if (k == cart.length) {
                cart.push(myproduct);
                alert("Product added to cart");
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        boughtproducts = cart;
        localStorage.setItem('producttobuy', JSON.stringify(boughtproducts));
    }
}
//list of command for client
function listcommand() {
    localcart = JSON.parse(localStorage.getItem('producttobuy'));
    console.log(localcart);
    if (localcart == null) { alert("your cart is empty"); } else {
        var totsum = 0;
        var carthtml = " <div id='page'><table id='cart' id='tableofProduct' border-collapse: collapse; border-spacing: 0;> ";
        carthtml += "<thead><tr><th class='first'>Products name</th><th class='second'>Price</th><th class='third'>Quantity</th><th class='fourth'>Total per product</th><th class='fifth'>Action</th></tr></thead>";
        for (var i = 0; i < localcart.length; i++) {
            carthtml += "<tbody><tr class='productitm'><td id='nom" + i + "'>" + localcart[i].name + "</td>";
            carthtml += "<td id='dollar" + i + "'>" + localcart[i].product_price + "</td>";
            carthtml += "<td><input oninput='change();' id='count" + i + "' type='number' value='" + localcart[i].quantity + "' min='0' max='99' class='qtyinput'></td>";
            carthtml += "<td id='allsum" + i + "'> " + localcart[i].totalprod + "</td>";
            carthtml += "<td id='act'><span onclick='delete_product();' class='delete-btn' id='delete'><i class='fas fa-trash-alt'></i></span></td></tr>";
        }
        for (var j = 0; j < localcart.length; j++) {
            totsum += localcart[j].totalprod;

        }
        console.log(totsum);
        carthtml += "<tr class='totalprice'><td colspan='3' class='light'>Total SUM</td><td id='total'colspan='2' class='thick'>" + totsum + "$" + "</td></tr></tbody>";
        carthtml += "</table></div>";
        document.getElementById("price_tab").innerHTML = carthtml;
        var client = JSON.parse(localStorage.getItem('loggeduser'));
        var clients = JSON.parse(localStorage.getItem('tabOfClient'));
        var usercommand;
        var c = client[0].id;
        for (d = 0; d < clients.length; d++) {
            if ((clients[d].Id) == c) {
                usercommand = localcart;
                clients[d].Listcommand = usercommand;
                console.log(usercommand);
            }
        }
        localStorage.setItem('tabOfClient', JSON.stringify(clients));

    }
}

function change() {
    var localcart = JSON.parse(localStorage.getItem('producttobuy'));
    var cartab = document.getElementById("cart");
    var qte, money, newsum, x, res, tot, ind, p;
    var long = cartab.rows.length;
    var s = document.getElementById('total').innerHTML;
    var x = s.indexOf('$');
    var res = s.slice(0, x);
    tot = parseInt(res);
    for (i = 1; i < long - 1; i++) {
        cartab.rows[i].cells[2].oninput = function () {
            rIndex = this.parentElement.rowIndex;
            ind = rIndex - 1;
            console.log(ind);
            qte = document.getElementById('count' + ind).value;
            console.log(qte);
            if (qte <= 0) {
                alert("Invalid quantity");
            } else {
                money = localcart[ind].product_price;
                console.log(money);
                newsum = qte * money;
                console.log(newsum);
                p = document.getElementById('allsum' + ind).innerHTML;
                tot -= parseInt(p);
                tot += newsum;
                console.log(tot);
                document.getElementById('allsum' + ind).innerHTML = newsum;
                document.getElementById('total').innerHTML = tot + "$";
                localcart[ind].quantity = qte;
                localcart[ind].totalprod = newsum;
                localStorage.setItem('producttobuy', JSON.stringify(localcart));
                localStorage.setItem('cart', JSON.stringify(localcart));
                var client = JSON.parse(localStorage.getItem('loggeduser'));
                var clients = JSON.parse(localStorage.getItem('tabOfClient'));
                var usercommand;
                var c = client[0].id;
                for (d = 0; d < clients.length; d++) {
                    if ((clients[d].Id) == c) {
                        usercommand = localcart;
                        clients[d].Listcommand = usercommand;
                        console.log(usercommand);
                    }
                }
                localStorage.setItem('tabOfClient', JSON.stringify(clients));
            }
        };
    }
}


//delete command
function delete_product() {
    var localcart, cartable, cartclient;
    var rIndex;
    var productname, productsum, total, newtotal;
    localcart = JSON.parse(localStorage.getItem('producttobuy'));
    cartclient = JSON.parse(localStorage.getItem('cart'));
    cartable = document.getElementById("cart");
    var client = JSON.parse(localStorage.getItem('loggeduser'));
    var clients = JSON.parse(localStorage.getItem('tabOfClient'));
    newtotal = 0;
    for (var i = 1; i < (cartable.rows.length) - 1; i++) {
        cartable.rows[i].cells[4].onclick = function () {
            rIndex = this.parentElement.rowIndex;
            productname = cartable.rows[rIndex].cells[0].innerHTML;
            productsum = cartable.rows[rIndex].cells[3].innerHTML;
            total = document.getElementById('total').innerHTML;
            cartable.deleteRow(rIndex);
            var x = total.indexOf('$');
            var res = total.slice(0, x);
            newtotal = res - productsum;
            document.getElementById('total').innerHTML = newtotal + "$";
            var c = client[0].id;
            for (var l = 0; l < clients.length; l++) {
                if ((clients[l].Id) == c) {
                    indice = l;
                    console.log(l);
                    break;
                }

            }
            var listcmd = clients[l].Listcommand;
            for (var h = 0; h < listcmd.length; h++) {
                if ((listcmd[h].name) == productname) {
                    listcmd.splice(h, 1);
                    localStorage.setItem('producttobuy', JSON.stringify(listcmd));
                    localStorage.setItem('cart', JSON.stringify(listcmd));
                }
            }
            localStorage.setItem('tabOfClient', JSON.stringify(clients));
        }

    }

}
//confirm command
function confirm() {
    var sum_tot = document.getElementById('total').innerHTML;
    console.log(sum_tot);
    var client = JSON.parse(localStorage.getItem('loggeduser'));
    var clients = JSON.parse(localStorage.getItem('tabOfClient'));
    var x = sum_tot.indexOf('$');
    var res = sum_tot.slice(0, x);
    console.log(res);
    var c = client[0].id;
    var solde_clt;
    for (var l = 0; l < clients.length; l++) {
        if ((clients[l].Id) === c) {
            solde_clt = clients[l].Solde;
            console.log(solde_clt);
            if (solde_clt > res) {
                solde_clt = solde_clt - res;
                clients[l].Solde = solde_clt;
                alert("your solde after operation : " + "" + solde_clt);
                localStorage.setItem('tabOfClient', JSON.stringify(clients));
                genpdf();

            } else {
                alert("sold not enough! " + " " + solde_clt);
            }
            break;
        }
    }
}

//generate pdf
function genpdf() {
    var doc = new jsPDF();
    var x = 10, y = 20;
    var nomp, pricep, quant, priceperproduct, cmd;
    doc.text(10, 10, 'YOUR SHOPPING CART');
    var client = JSON.parse(localStorage.getItem('loggeduser'));
    var clients = JSON.parse(localStorage.getItem('tabOfClient'));
    var c = client[0].id;
    for (var l = 0; l < clients.length; l++) {
        if ((clients[l].Id) === c) {
            cmd = clients[l].Listcommand;
            break;
        }
    }
    for (var j = 0; j < cmd.length; j++) {
        nomp = cmd[j].name;
        pricep = cmd[j].product_price;
        quant = cmd[j].quantity;
        priceperproduct = cmd[j].totalprod;
        doc.text(x, y, " " + nomp + " " + pricep + "  " + quant + "  " + priceperproduct);
        y += 10;
    }
    var totsum = document.getElementById('total').innerHTML;
    doc.text(x, y, "TOTAL" + " " + totsum);
    doc.save('FACTURE.pdf');

}
//cancel function
function cancel() {
    localStorage.removeItem('cart');
    localStorage.removeItem('producttobuy');
    var client = JSON.parse(localStorage.getItem('loggeduser'));
    var clients = JSON.parse(localStorage.getItem('tabOfClient'));
    var c = client[0].id;
    for (var j = 0; j < clients.length; j++) {
        if ((clients[j].Id) == c) {
            clients[j].Listcommand = [];
            localStorage.setItem('tabOfClient', JSON.stringify(clients));
            break;
        }
    }
    location.reload();
    alert("your cart is Empty !");
}
function admin_list_command() {
    var clientcmd = JSON.parse(localStorage.getItem('tabOfClient'));
    console.log(clientcmd);
    var tabofcmd = [];
    var long = clientcmd.length;
    for (var j = 0; j < long; j++) {
        loncmd = clientcmd[j].Listcommand.length;
        var element = {
            id: clientcmd[j].Id,
            cmd: []
      };
        if (clientcmd[j].Listcommand.length != 0) {
            for (var l = 0; l < loncmd; l++) {
                element.cmd.push(clientcmd[j].Listcommand[l]);
            }
            tabofcmd.push(element);
        }  
    }
    console.log(tabofcmd);
    if (tabofcmd == []) {
        alert("y a pas de commandes encore !");
    } else {
        var list = "<table border='1px'>";
        list += "<tr><th>ID user</th><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total per Product</th></tr>";
        for (i = 0; i < tabofcmd.length; i++) {
            for(var j=0;j<tabofcmd[i].cmd.length;j++){
            list += "<tr><td>" + tabofcmd[i].id + "</td>";
            list += "<td>" + tabofcmd[i].cmd[j].name + "</td>";
            list += "<td>" + tabofcmd[i].cmd[j].quantity + "</td>";
            list += "<td>" + tabofcmd[i].cmd[j].product_price + "$" + "</td>";
            list += "<td>" + tabofcmd[i].cmd[j].totalprod + "$" + "</td></tr>";
        }
        }
        list += "</table>";
        document.getElementById("listcmd").innerHTML = list;
    }

}

