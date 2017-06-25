// load empty cart
var cart = [];
$(function () {
  if (localStorage.cart)
  {
      cart = JSON.parse(localStorage.cart);
      showCart();
      cartCount(); // show cart count
  }
});

// add to cart
$('body').on('click', '[data-js="addToCart"]', function(){
  var $this = $(this);
  // take values in to variable
  var $productID = $(this).attr('data-productID');
  var $name = $(this).attr('data-productName');
  var $imageURL = $(this).attr('data-imageURL');
  var $price = $(this).attr('data-price');
  var $currency = $(this).attr('data-currency');
  // create item array
  var item = {
    ProductID: $productID,
    ProductName: $name,
    ImageURL: $imageURL,
    Price: $price,
    Currency: $currency
  };
  cart.push(item); //push into object
  saveCart(); //save cart
  cartCount(); // check cart count

  // show success msg
  $this.next('.product__success-callout').fadeIn('fast');
  setTimeout(function(){
    $('.product__success-callout').fadeOut('fast');
  },2000);
});

// delete item from cart
$('body').on('click', '[data-js="deleteCartItem"]', function(){
  var $this = $(this);
  var id = $this.attr('data-id'); //get index cart id into variable
  cart.splice(id,1); // delete item at index
  $('#cart .product__item').remove();
  saveCart();
  showCart();
  cartCount();
});

// save cart
function saveCart() {
    if ( window.localStorage)
    {
        localStorage.cart = JSON.stringify(cart);
    }
}

// check cart count
function cartCount() {
  var cartLength = cart.length;
  $('#cartNumberOfItem').html(cartLength);
}

// show cart
function showCart() {
  // if cart template is visible
  if($('#cart').length > 0 ) {
    for (var i in cart) {
        var item = cart[i];

        // handlebar js
        var source   = $("#cartTemplate").html();
        var template = Handlebars.compile(source);

        // This is the default context, which is passed to the template
        var item = {
          productID: item.ProductID,
          productName: item.ProductName,
          price: item.Price,
          currency: item.Currency,
          imageURL: item.ImageURL,
          i: i
        };

        // Pass our data to the template
        var theCompiledHtml = template(item);

        // Add the compiled html to the page
        $('#cart').append(theCompiledHtml);
    }
  }

}
