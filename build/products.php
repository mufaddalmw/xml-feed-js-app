<?php
// define variables and set to empty values
$xmlurl = $imageURL = $productURL = $name = $description = $categories = $category = $price = $currency = $category = "";

// function for removing special character from string
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

// if request is made from index (form) page then execute
if (!$_SERVER["REQUEST_METHOD"] == "POST") {
  header("Location: index.php");
  exit;
}
// otherwise redirect them to index (form) page
else {
  // trim down special character from string
  $xmlurl = test_input($_POST["url"]);
  // fetch xml feed
  $xml=simplexml_load_file($xmlurl) or die("Error: Cannot create object");

//include header
include('includes/header.php');
?> <div class="row column small-12 large-8"><div class="product"><div class="row"> <?php
foreach($xml->children() as $product) {
    $productID = $product->productID;
    $name = $product->name;
    $description = $product->description;
    // $category = $product->categories->category;

    $price = $product->price;
    $currency = $product->price['currency'];
    $category = $product->category;
    $productURL = $product->productURL;
    $imageURL = $product->imageURL;

 ?> <div class="column product__item"><div class="product__col product__col-image"><div class="product__img-bucket"><a href="<?php echo $productURL; ?>"><img data-src="<?php echo $imageURL; ?>" alt="<?php echo $name; ?>" title="<?php echo $name; ?>" class="lazyload"></a></div></div><div class="product__col product__col-info"><a href="<?php echo $productURL; ?>" title="<?php echo $name; ?>" class="product__title"><h1><?php echo $name; ?></h1></a><p><span class="product__id"><?php echo $productID; ?></span></p><div class="product__info-description"><p> <?php
                // if description is bigger than 140 character then show three dots (...)
                if (strlen($description) > 140) {
                  $description = substr($description,0,140) . '...';
                  echo $description;
                }
                // otherwise show full description
                else {
                  echo $description;
                }
              ?></p><ul class="bullet-list"> <?php foreach($product->categories as $categories) {
                  $category = $categories->category;
                ?> <li><strong><?php echo $category; ?></strong></li> <?php } ?> </ul></div></div><div class="product__col product__col-price"><h4 class="product__price"><?php echo $price; ?></h4><span class="product__currency"><?php echo $currency; ?></span><div class=""><a href="<?php echo $productURL; ?>" class="product__details">View full product details</a></div></div></div> <?php
      }

    }
      // end
?> </div></div></div> <?php
  // include footer
  include('includes/footer.php')
  ?>