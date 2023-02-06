<?php

switch (@parse_url($_SERVER['REQUEST_URI'])['path']) {
  case '/':
  case '/home':
  case '/home.php':
  case '/index':
  case '/index.php':
      require 'home.php';
      break;
  case '/about':
  case '/about.php':
      require 'about.php';
      break;
  case '/resume':
  case '/resume.php':
      require 'resume.php';
      break;
  case '/privacypolicy':
  case '/privacypolicy.php':
      require 'privacypolicy.php';
      break;
  case '/termsofuse':
  case '/termsofuse.php':
      require 'termsofuse.php';
      break;
  case '/sendemail':
  case '/sendemail.php':
      require 'sendemail.php';
      break;
  case '/randompicture':
  case '/randompicture.php':
      require 'randompicture.php';
      break;
  default:
      http_response_code(404);
      exit('Not Found');
}
