// load jquery module

global.$ = global.jQuery = require('jquery'); //load jquery
require('foundation-sites'); //load foundation-sites
require('lazysizes'); //load lazy load images module
$(document).foundation(); //initialize foundation


$('#productFeedForm').submit(function(){
  loadXml();
  console.log('yellow');
  return false;
});

function loadXml() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      renderXml(this);
    }
  };
  xhttp.open("GET", "http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=10", true);
  xhttp.send();
}
function renderXml(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i <x.length; i++) {
    table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
}
