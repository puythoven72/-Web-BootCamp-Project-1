  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const carousel = document.querySelector(".img-active");

  const cartRow = "<div class='row cart-item justify-content-md-center justify-content-sm-center  text-center d-flex align-items-center' id= 'basket' > </div>";



  const cartImg = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
      "<img id='pysanky-store-1' src='" + "imagePath" + "' class='img-fluid img-thumbnail' alt='image'>" + "</div>";

  const cartQuant = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
      "<p> quant </p></div>";

  const cartTitle = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
      "<p>A Beutiful Egg</p></div>";

  const cartPrice = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
      "<p>35</p></div>";

  const cartButton = "<div class='col-lg-2 col-md-2 col-sm-1'>" +
      "<button type='button' class='btn btn-default btn-sm add-to-cart' " +
      "onclick='addToCart(document.getElementById('price_1').innerText, document.getElementById('title_1').innerText)'>" +
      "<span class='glyphicon glyphicon-shopping-cart'></span>Remove</button></div>";

  // let customList = [];

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
      alert(imgName + " is path " + imagePath);
      if (checkItemExist(imgName)) {
          var keyCheck = sessionStorage.getItem(imgName);
          var pysanky = JSON.parse(keyCheck);
          var newQuant = (pysanky.quantity + 1);
          var pysanky = new Pysanky(price, title, imgName, newQuant);
      } else {
          var pysanky = new Pysanky(price, title, imgName, 1);
      }
      sessionStorage.setItem(imgName, JSON.stringify(pysanky));




      //    customList.push(pysanky);


      /*    sessionStorage.setItem('storeList', JSON.stringify(customList));
        pysanky.add(price, title);
                  alert(customList.length);
         
        
          */






      /*
      
      
       count = parseFloat(count) + 1;
      alert(title + "_" + count);
     
      alert(price + "passed");
      var pysanky = new Pysanky(price, title);
      alert(pysanky.price);
     
      sessionStorage.setItem("currentCount", count);
      sessionStorage.setItem(title + "_" + count, price);
    
        
          */
  }

  /*var Pysanky = {
       name: "",
       description: "",
       price: 0,

   };
*/

  function updateCartItem(key) {
      var retrievedObject = JSON.parse(key);
      alert(retrievedObject);
  }



  function Pysanky(price, name, imageName, quantity) {
      alert(" quant " + quantity)
      this.price = price;
      this.name = name;
      this.imageName = imageName;
      this.quantity = quantity;
  }

  //
  //  pysanky.add = function (price, name) {
  //      pysanky.name = name;
  //      pysanky.price = price;
  //
  //  };


  function getImgName(fullPath) {

      var filename = fullPath.replace(/^.*[\\\/]/, '');
      return filename;
  }

  function checkItemExist(key) {
      var keyCheck = sessionStorage.getItem(key);
      alert(keyCheck);
      if (keyCheck) {
          return true
      } else {
          return false;
      }
  }

  function myFunction() {
      var total = 0;
      var cartCount = 0;
      for (const [key, value] of Object.entries(sessionStorage)) {
          cartCount = cartCount + 1;


          updatedCartRowId = cartRowCreate(cartCount);

          alert(updatedCartRowId + " is cart Count");

          var updatedCartRow = cartRow.replace(" 'basket' ", updatedCartRowId);
          document.getElementById("current-cart").innerHTML += updatedCartRow;

          var pysanky = JSON.parse(value);

          var imgPath = "'images/store/" + pysanky.imageName + "'";

          var updatedImg = cartImg.replace("'imagePath'", imgPath);

          alert(updatedImg);


          var cartId = updatedCartRowId.replaceAll("'", '"');
alert(cartId);
          document.getElementById("basket_1").innerHTML += updatedImg;

          var updatedQuant = cartQuant.replace("quant", pysanky.quantity);

          document.getElementById("basket_1").innerHTML += updatedQuant;
      }
      //  document.getElementById("basket").innerHTML += cartImg;
      //  document.getElementById("basket").innerHTML += cartQuant;
      //  document.getElementById("basket").innerHTML += cartTitle;
      //  document.getElementById("basket").innerHTML += cartPrice;
      //document.getElementById("basket").innerHTML += cartButton;


      //resultField.innerText = "The Answer :$ " + total;

  }


  function cartRowCreate(cartCount) {

      return "'basket_" + cartCount + "'";

  }
