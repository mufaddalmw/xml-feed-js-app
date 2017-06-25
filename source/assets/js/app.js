global.$ = global.jQuery = require('jquery'); //load jquery
require('foundation-sites'); //load foundation-sites
var lazysizes = require('lazysizes'); //load lazy load images module
var Handlebars = require('handlebars'); //load handlebars

$(document).foundation(); //initialize foundation

// products page - if products id is visible on page
if( $('#products').is(':visible') ){
  var xmlurl, currentURL = window.location.href; //get current url in variable
  xmlurl = getParameterByName('url', xmlurl); //get url from function
  xmlurl = decodeURIComponent(xmlurl); //decode url - convert string in url format
  var currentURLPath = getPathFromUrl(currentURL); //remove querystring from url with function
  // make ajax request for entered xml url
  $.ajax({
     url: xmlurl,
     data: {
        format: 'xml'
     },
     error: function() {
       //  in case of error
        $('#products').html("<div class='alert callout'>XMLHttpRequest cannot load <strong>" + xmlurl +"</strong>. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin <strong>" + currentURLPath + "</strong> is therefore not allowed access.</div>");
     },
     dataType: 'xml',
     success: function(xml) {
      $(xml).find('product').each(function(index){
        // get xml tag values in to variable
        var $productID = $(this).find('productID').text();
        var $productName = $(this).find('name').text();
        var $description = $(this).find('description').text();
        var $price = $(this).find('price').text();
        var $currency = $(this).find('currency').text();
        var $category = $(this).find('category').text();
        var $productURL = $(this).find('productURL').text();
        var $imageURL = $(this).find('imageURL').text();

        // trim longer description to 155 character
        var $descriptionLength = $description.length;
  			if ($descriptionLength > 155){
  				var $description = $description.slice(0, 155);
          $description = $description +'...';
  			}
        // end

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
  // end of xml ajax request

}
// end of if condition


// function for get url parameter by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//end

// get full path from url
function getPathFromUrl(url) {
  return url.split(/[?#]/)[0];
}
//end
