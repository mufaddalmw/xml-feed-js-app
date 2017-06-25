# xml-feed-js-app
<p><em>After submitting xml url, feed will be displayed on page with interactive format.</em></p>

Default url should be:<br>
<pre>https://mufaddalmw.github.io/xml-feed-js-app/build/assets/data/productfeed.xml</pre><br>

## Demo
<a href="https://mufaddalmw.github.io/xml-feed-js-app/build/" target="_blank">Demo application</a><br>
<a href="https://mufaddalmw.github.io/xml-feed-js-app/build/products.html?url=https%3A%2F%2Fmufaddalmw.github.io%2Fxml-feed-js-app%2Fbuild%2Fassets%2Fdata%2Fproductfeed.xml" target="_blank">Demo real-time data</a>


## Cross domain request:
<pre>http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=10</pre>
For security reasons, browsers restrict cross-origin HTTP requests initiated from within scripts. For example, XMLHttpRequest and Fetch follow the same-origin policy. So, a web application using XMLHttpRequest or Fetch could only make HTTP requests to its own domain.

## Features:
- Front-end framework: Foundation
- HTML5 based markup
- Use of CSS preprocessor
- Use of jQuery for AJAX XML request and processing of xml data
- Use of javascript template with handlebar js framework 
- Use of lazyload images module
- Use of 'async' attribute for asynchronous loading of scripts
- Automation of entire workflow with gulpjs

## Clone repository on your local:
<pre>git clone https://github.com/mufaddalmw/xml-feed-js-app.git</pre>
If you are running it on your local machine, either use of local server or gulp workflow is mandatory.

## Install dev dependencies:
<pre>npm i</pre>
After above run 'gulp' command in terminal.

## Browser Compatibility 
Last two versions - Chrome, Firefox, Safari, Opera, Mobile Safari, IE9+, Android Browser

## Author
Mufaddal Motorwala<br>
<a href="https://www.linkedin.com/in/mufaddalmw/" target="_blank">Linkedin</a>
