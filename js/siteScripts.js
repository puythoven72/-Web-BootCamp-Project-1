/*SITE CONSTANTS*/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const carousel = document.querySelector(".img-active");



/* State DROP DOWN CONSTANTS*/
var s_a = new Array();


s_a[1] = "Alabama *AL|Alaska*AK|Arizona*AZ|Arkansas*AR|California*CA|Colorado*CO|Connecticut*CT|Delaware*DE|District of Columbia*DC|Florida*FL|Georgia*GA|Hawaii*HI|Idaho*ID|Illinois*IL|Indiana*IN|Iowa*IA|Kansas*KS|Kentucky*KY|Louisiana*LA|Maine*ME|Maryland*MD|Massachusetts*MA|Michigan*MI|Minnesota*MN|Mississippi*MS|Missouri*MO|Montana*MT|Nebraska*NE|Nevada*NV|New Hampshire*NH|New Jersey*NJ|New Mexico*NM|New York*NY|North Carolina*NC|North Dakota*ND|Ohio*OH|Oklahoma*OK|Oregon*OR|Pennsylvania*PA|Rhode Island*RI|South Carolina*SC|South Dakota*SD|Tennessee*TN|Texas*TX|Utah*UT|Vermont*VT|Virginia*VA|Washington*WA|West Virginia*WV|Wisconsin*WI|Wyoming*WY";


/*Constants USED FOR GENERATING HTML FOR CART Page*/
const cartRow = "<div class='row cart-item justify-content-md-center justify-content-sm-center  text-center d-flex align-items-center' id= 'basket' > </div>";


const cartImg = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
    "<img id='pysanky-store-1' src='" + "imagePath" + "' class='img-fluid img-thumbnail' alt='image'>" + "</div>";

const cartQuant = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
    "<p> quant </p></div>";

const cartName = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
    "<p> name </p></div>";

const cartPrice = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
    "<p> price </p></div>";

const cartButton = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
    "<button type='button' class='btn btn-default btn-sm add-to-cart' " +
    "onclick='removeFrmCart( removeObj )'>" +
    "<span class='glyphicon glyphicon-shopping-cart'></span>Remove</button></div>";

const cartEmpty = "<div class='col-lg-2 col-md-2 col-sm-1'>" + "<p> Cart Is Empty </p></div> "+
"<div class='row cart-item justify-content-md-center justify-content-sm-center  text-center d-flex align-items-center' id= 'empty-basket-img' > </div>"
;

const cartEmptyContent = "<div class='col empty-cart'><img src='images/pysanky-1.jpg' alt='Pysanky'></div>";

var storedCount = sessionStorage.getItem("currentCount");


if (storedCount != null) {

    var count = storedCount;
} else {
    var count = 0;
}


/*MOBILE MENU*/
hamburger.addEventListener("click", mobileMenu);


function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

}



function addToCart(price, title, imagePath) {
    count = parseFloat(count) + 1;
    var imgName = getImgName(imagePath)
    if (checkItemExist(imgName)) {
        updateQuantity(imgName, "add");

    } else {
        var pysanky = new Pysanky(price, title, imgName, 1);
        sessionStorage.setItem(imgName, JSON.stringify(pysanky))
    }
}






function Pysanky(price, name, imageName, quantity) {
    this.price = price;
    this.name = name;
    this.imageName = imageName;
    this.quantity = quantity;

}




function getImgName(fullPath) {

    var filename = fullPath.replace(/^.*[\\\/]/, '');
    return filename;
}

function checkItemExist(key) {
    var keyCheck = sessionStorage.getItem(key);
    if (keyCheck) {
        return true
    } else {
        return false;
    }
}

function updateQuantity(key, qtyUpdate) {

    var keyCheck = sessionStorage.getItem(key);

    var pysanky = JSON.parse(keyCheck);
    var newQuant = 0;
    var imgName = pysanky.imageName;
    var price = pysanky.price;
    var name = pysanky.name;
    if (qtyUpdate === "add") {
        newQuant = (pysanky.quantity + 1);
    } else {
        if (pysanky.quantity == 1) {
            sessionStorage.removeItem(key);
            return;
        } else {
            newQuant = (pysanky.quantity - 1);
        }
    }

    var pysanky = new Pysanky(price, name, imgName, newQuant);

    sessionStorage.setItem(imgName, JSON.stringify(pysanky));
}

function cartOnLoad() {
    var total = 0;
    var cartCount = 0;
    if (sessionStorage.length == 0) {
        document.getElementById("current-cart").innerHTML += cartRow;
        document.getElementById("basket").innerHTML += cartEmpty;

       
        document.getElementById("empty-basket-img").innerHTML += cartEmptyContent;

    }

    for (const [key, value] of Object.entries(sessionStorage)) {
        cartCount = cartCount + 1;

        var updatedCartRowId = cartRowCreate(cartCount);

        var updatedCartRow = cartRow.replace(" 'basket' ", updatedCartRowId);

        document.getElementById("current-cart").innerHTML += updatedCartRow;

        var pysanky = JSON.parse(value);

        var rowTot = calTotalRow(pysanky.price, pysanky.quantity);

        total += rowTot;

        var imgPath = "'images/store/" + pysanky.imageName + "'";

        var updatedImg = cartImg.replace("'imagePath'", imgPath);

        document.getElementById("basket_" + cartCount).innerHTML += updatedImg;

        var updatedQuant = cartQuant.replace("quant", pysanky.quantity);

        document.getElementById("basket_" + cartCount).innerHTML += updatedQuant;

        var updatedname = cartName.replace("name", pysanky.name);
        document.getElementById("basket_" + cartCount).innerHTML += updatedname;

        var updatedPrice = cartPrice.replace("price", pysanky.price);
        document.getElementById("basket_" + cartCount).innerHTML += updatedPrice;

        var updatedCartButton = cartButton.replace("removeObj", '"' + key + '"');

        document.getElementById("basket_" + cartCount).innerHTML += updatedCartButton;
    }


    document.getElementById("resultField").innerHTML = "Total: $" + total;
}

function calTotalRow(price, qty) {
    return (price * qty);
}


function cartRowCreate(cartCount) {
    return "'basket_" + cartCount + "'";
}

function removeFrmCart(removeObj) {
    if (checkItemExist(removeObj)) {
        updateQuantity(removeObj, "remove");
        location.reload()
    }
}


function checkOutLoad(stateId, stateElementId) {
    populateStates(stateId, stateElementId);


    const getDatePickerTitle = elem => {
        // From the label or the aria-label
        const label = elem.nextElementSibling;
        let titleText = '';
        if (label && label.tagName === 'LABEL') {
            titleText = label.textContent;
        } else {
            titleText = elem.getAttribute('aria-label') || '';
        }
        return titleText;
    }

    const elems = document.querySelectorAll('.datepicker_input');
    for (const elem of elems) {
        const datepicker = new Datepicker(elem, {
            'format': 'dd/mm/yyyy', // UK format
            title: getDatePickerTitle(elem)
        });
    }

}


function populateStates(arrayId, stateElementId) {

    var stateElement = document.getElementById(stateElementId);

    stateElement.length = 0;
    stateElement.options[0] = new Option('Select State', '');
    stateElement.selectedIndex = 0;
    var state_arr = s_a[arrayId].split("|");

    for (var i = 0; i < state_arr.length; i++) {
        var stateValues = state_arr[i].split("*");
        stateElement.options[stateElement.length] = new Option(stateValues[0], stateValues[1]);

    }
}
