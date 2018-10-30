function buy() {
    document.getElementById('add_btn').onclick = function () {
        alert("Product added to cart");
    }
}

function addproduct(id) {
    var cart, localcart = [];
    var product;
    var nom = document.getElementById(id).name.value;
    var prix = document.getElementById(id).price.value;
    var qte = 1;
    product = {
        name: nom,
        product_price: prix,
        quantity: qte ,
        totalprod= (product_price * quantity)
    }
    if (cart == null) { cart.push(product); }
    for (var k = 0; k < cart.lenght; k++) {
        if ((cart[i].name) === (product.name)) {
            cart[i].quantity += product.quantity;
            cart[i].totalprod =(cart[i].quantity * product.product_price);
            break;
        }
    }
    if (k == cart.lenght) {
        cart.push(product);
    }
    localStorage.setItem('producttobuy', JSON.stringify(cart));
    localcart = JSON.parse(localStorage.getItem('producttobuy'));
    var carthtml = document.getElementById('price_tab').innerHTML;
    for (var i = 0; i < localcart.lenght; i++) {
        carthtml += "<tr><th>Products name</th><th>Price</th><th>Quantity</th><th>Total per product</th><th>actions</th></tr>";
        carthtml += "<tr><td id='nom'>" + localcart[i].name + "</td>";
        carthtml += "<td id='dollar'>" + localcart[i].product_price + "</td>";
        carthtml += "<td><input  id='count' type='number'>" + localcart[i].quantity + "</td>";
        carthtml += "<td id='allsum'> " + localcart[i].totalprod  + "</td>";
        carthtml += "<td id='act'><input id='delete' type='submit' value='remove' onclick='delete_product()'></td></tr>";
    }
    var totsum;
    for (var j = 0; j < carthtml.length; j++) {
        var dollars = document.getElementById('allsum');
        totsum += dollars;
    }
    carthtml += "<tr><td>Total SUM</td><td id='total'>" + (totsum) + "$"+"</td></tr>";
    var client = JSON.parse(localStorage.getItem('loggeduser'));
    var clients = JSON.parse(localStorage.getItem('tabOfClients'));
    var c = client[0].id;
    clients[c].Listcommand = clients[c].Listcommand.push(product);
    localstorage.setItem('tabOfClients', JSON.stringify(clients));
}
function delete_product() {
    var localcart, cartable = [];
    var rIndex;
    var productname;
    localcart = JSON.parse(localStorage.getItem('producttobuy'))
    cartable = document.getElementById('price_tab');
    for (var i = 1; i < cartable.rows.length; i++) {
        cartable.rows[i].cells[4].onclick = function () {
            rIndex = this.parentElement.rowIndex;
            productname = cartable.rows[rIndex].cells[0].innerHTML;
            cartable.deleteRow(rIndex);
            for (r = 0; r < localcart.lenght; r++) {
                if ((localcart[i].name) == productname) {
                    localcart.splice(i, 1);
                }
                break;
            }
            localStorage.setItem('producttobuy', JSON.stringify(localcart));
            console.log(localcart);
        }

    }
    var client = JSON.parse(localStorage.getItem('loggeduser'));
    var clients = JSON.parse(localStorage.getItem('tabOfClients'));
    var c = client[0].id;
    var listcmd = clients[c].Listcommand;
    for (var h = 0; h < listcmd.lenght; h++) {
        if ((listcmd[h].name) == productname) {
            listcmd.splice(h, 1);
        }
    }
    localStorage.setItem('tabOfClients', JSON.stringify(clients));

}
function confirm() {
    var sum_tot = document.getElementById('total');
    var client = JSON.parse(localStorage.getItem('loggeduser'));
    var clients = JSON.parse(localStorage.getItem('tabOfClients'));
    var c = client[0].id;
    var solde_clt = clients[c].Solde;
    if (solde_clt > sum_tot) {
        solde_clt = solde_clt - sum_tot;
        localStorage.setItem('tabOfClients', JSON.stringify(clients));
        alert("your solde now : " +""+ solde_clt);
    }else{
        alert("sold not enough! " +""+ solde_clt);
    }
}
function genpdf(){
    html2canvas(document.getElementById('main'),{
        onrendered:function (canvas){
            var img=canvas.toDataURL("image/png");
            var doc= new jsPDF();
            doc.addImage(img,'JPEG',20,20);
            doc.save('facture.pdf');

        }
    });
}
function cancel() {
    var cart = [];
    clear(localStorage('producttobuy'));
    location.reload();
    alert("your cart is already Empty !");

}
function list_prouct(){

    var tabofcmd = JSON.parse(localStorage.getItem('producttobuy'));
    var list = "<table border='1px'>";
    list += "<tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total per Product</th></tr>";
    for (i = 0; i < tabofcmd.length; i++) {
        list += "<tr><td>" + tabofcmd [i].name + "</td>";
        list += "<td>" + tabofcmd[i].quantity + "</td>";
        list += "<td>" + tabofcmd[i].product_price + "</td>";
        list += "<td>" + tabofcmd[i].totalprod+ "</td></tr>";
    }
    list += "</table>";
}

