<?php
// header("Content-type: text/xml");
$url = '';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $url = test_input($_GET["url"]);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
// echo $url;
header('Location: products.html')
?>