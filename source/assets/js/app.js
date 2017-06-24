global.$ = global.jQuery = require('jquery'); //load jquery
require('foundation-sites'); //load foundation-sites
var lazysizes = require('lazysizes'); //load lazy load images module
var Handlebars = require('handlebars'); //load handlebars

$(document).foundation(); //initialize foundation



// function for get url parameter by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}//end

// products page - if product id is visible on page
if( $('#products').is(':visible') ){
  var xmlurl = window.location.href; //get url
  xmlurl = getParameterByName('url', xmlurl); //get url from function
  xmlurl = decodeURIComponent(xmlurl); //decode url

  $.ajax({
     url: xmlurl,
     data: {
        format: 'xml'
     },
     error: function() {
        $('#demo').html('<p>An error has occurred</p>');
     },
     dataType: 'xml',
     success: function(xml) {
      var xmlDoc = xml.getElementsByTagName("name")[0].childNodes[0].nodeValue;
      $(xml).find('product').each(function(index){

        var $productID = $(this).find('productID').text();
        var $productName = $(this).find('name').text();
        var $description = $(this).find('description').text();
        var $price = $(this).find('price').text();
        var $currency = $(this).find('currency').text();
        var $category = $(this).find('category').text();
        var $productURL = $(this).find('productURL').text();
        var $imageURL = $(this).find('imageURL').text();

        // handlebar js
        var source   = $("#productsTemplate").html();
        var template = Handlebars.compile(source);

        // This is the default context, which is passed to the template
        var product = {
          productID: $productID,
          productName: $productName,
          description: $description,
          price: $price,
          currency: $currency,
          category: $category,
          productURL: $productURL,
          imageURL: $imageURL
        };

        // Pass our data to the template
        var theCompiledHtml = template(product);

        // Add the compiled html to the page
        $('#products').append(theCompiledHtml);

      });
     },
     type: 'GET'
  });

}
