  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const carousel = document.querySelector(".img-active");

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

  const cartEmpty = "<div class='col-lg-2 col-md-2 col-sm-1'>" + "<p> Cart Is Empty </p></div>";



  var storedCount = sessionStorage.getItem("currentCount");



  if (storedCount != null) {

      var count = storedCount;
  } else {
      var count = 0;
  }



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
