<!DOCTYPE html>
<html>
<head>
  <title>Tony Brix</title>
  <meta charset="utf-8">
	<!--meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1"-->
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width, user-scalable=0">
  <meta name="description" content="Learn about Tony Brix. Maybe you'll find something interesting.">
  <meta name="author" content="Tony Brix">
	<link rel="apple-touch-icon" href="images/tony.png">
  <link rel="stylesheet" href="css/defaults.css">
  <link rel="stylesheet" href="js/window/window.css">
  <link rel="stylesheet" href="css/style.css">
  <!--[if IE 7]> 
  <style type="text/css">
    .wdw-window>tbody>.titlebarmiddle>.center{
      behavior: none !important;
    }
    .shortcut{
      padding-top: 34px !important;
    }
    .middle .center{
      background-color: #706F68 !important;
    }
    #aboutcontent{
      white-space: normal !important;
    }
    .wdw-buttons{
      top: 1px !important;
    }
    .send_icon, .send_label, .send_input, #startbutton, #trayicons, #programs{
      zoom: 1 !important;
      display: inline !important;
    }
    .mceStatusbar{
      padding-right: 12px !important;
    }
    .wdw-program{
      zoom: 1 !important;
    }
    #taskbar{
      border-top-style: outset !important;
    }
    #tray{
      top: -23px !important;
    }
    #time
    {
      top: 0px;
    }
    #startbutton{
      margin-top: 2px !important;
    }
  </style>
  <![endif]-->
  <!--[if IE 8]> 
  <style type="text/css">
    .wdw-window>tbody>.titlebarmiddle>.center{
      behavior: none !important;
    }
    #taskbar{
      border-top-style: outset !important;
    }
  </style>
  <![endif]-->
  <!--[if IE 9]> 
  <style type="text/css">
    .wdw-buttons{
      top: -2px !important;
    }
    #taskbar{
      border-top-style: outset !important;
    }
  </style>
  <![endif]-->
	<script src="js/modernizr.custom.43220.js" type="text/javascript"></script>
</head>

<body>
  <div id="portrait"></div>
  <div id="qrcode">
    <img src="/images/qrcode.png" alt="http://tonybrix.info/" />
    <p id="contact-info">Tony Brix<br />(320) 249-1820<br />me@TonyBrix.info</p>
  </div>
  <div id="icons">
    <div data-img="/images/about.png" id="about" class="desktop shortcut"><span class="title">About</span></div>
    <div id="aboutcontent" tabindex="1"></div>
    <div data-img="/images/resume.png" id="resume" class="desktop shortcut"><span class="title">Resume</span></div>
    <div id="resumecontent"></div>
    <div data-href="mailto:me@TonyBrix.info" data-img="/images/email.png" id="email" class="desktop shortcut"><span class="title">Send Email</span></div>
    <!--div id="emailcontent"><textarea class="tinymce" id="emailbody" style="height:1px;width:1px;"></textarea><div class="overlay"></div></div-->
    <div data-href="/about.php" data-img="/images/info.png" id="mobileabout" class="mobile shortcut"><span class="title">About</span></div> 
    <div data-href="/resume.php" data-img="/images/resume.png" id="mobileresume" class="mobile shortcut"><span class="title">Resume</span></div> 
    <div data-href="http://uzitech.com/files.php" data-img="/images/portfolio.png" id="portfolio" class="desktop shortcut"><span class="title">Portfolio</span></div>
    <div data-href="http://uzitech.com/files.php" data-img="/images/portfolio.png" id="mobileportfolio" class="mobile shortcut"><span class="title">Portfolio</span></div>
    <div data-href="http://blog.uzitech.com" data-img="/images/blog.png" id="blog" class="shortcut"><span class="title">Blog</span></div>
    <div data-href="http://www.facebook.com/tbrix13" data-img="/images/facebook.png" id="facebook" class="shortcut"><span class="title">Facebook</span></div>
    <div data-href="http://gplus.to/tbrix13" data-img="/images/googleplus.png" id="googleplus" class="shortcut"><span class="title">Google +</span></div>
    <div data-href="http://www.linkedin.com/pub/tony-brix/37/436/98a/" data-img="/images/linkedin.png" id="linkedin" class="shortcut"><span class="title">LinkedIn</span></div>
    <div data-img="/images/minesweeper.png" id="minesweeper" class="desktop shortcut"><span class="title">Mine Sweeper</span></div>
    <div id="minesweepercontent"><canvas id="minesweepercanvas" tabindex="1">Your browser is not compatible.Please update your browser.</canvas></div>
    <div id="pwalg" data-img="/images/pwalg.png" class="desktop shortcut"><span class="title">Password Algorithm</span></div>
    <div id="pwalgcontent" style="background-color: #fff;overflow: hidden !important"><iframe style="width: 100%;height: 9999999px;max-height: 100%;" src="http://uzitech.com/pwalg"></iframe></div>
    <div id="mobilepwalg" data-href="http://uzitech.com/pwalg" data-img="/images/pwalg.png" class="mobile shortcut"><span class="title">Password Algorithm</span></div>
    <div id="pws" data-img="/images/pws.png" class="desktop shortcut"><span class="title">Password Keys</span></div>
    <div id="pwscontent" style="background-color: #fff;overflow: hidden !important"><iframe style="width: 100%;height: 9999999px;max-height: 100%;" src="http://uzitech.com/pws"></iframe></div>
    <div id="mobilepws" data-href="http://uzitech.com/pws" data-img="/images/pws.png" class="mobile shortcut"><span class="title">Password Keys</span></div>
    <div id="googleplay" data-href="https://play.google.com/store/apps/developer?id=UziTech" data-img="/images/googleplay.png" class="shortcut"><span class="title">Google Play</span></div>
    <div id="github" data-href="https://github.com/uzitech" data-img="/images/github.png" class="shortcut"><span class="title">GitHub</span></div>
    <div id="gist" data-href="https://gist.github.com/uzitech" data-img="/images/gist.png" class="shortcut"><span class="title">Gists</span></div>
    <div data-href="tel:3202491820" data-img="/images/phone.png" id="phone" class="mobile shortcut"></div>
    <div data-href="sms:3202491820" data-img="/images/sms.png" id="sms" class="mobile shortcut"></div>
    <div data-href="mailto:me@TonyBrix.info" data-img="/images/gmail.png" id="gmail" class="mobile shortcut"></div>
  </div>
  
  <!-- JavaScript at the bottom for fast page loading -->
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you want to support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lte IE 6]>
    <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
  <![endif]-->
  
  <!--[if gte IE 7]><!-->

	<script src="js/jquery.1.7.2.min.js" type="text/javascript"></script>
	<script src="js/window/jquery.window.js" type="text/javascript"></script>
	<script src="js/jquery.canvas.js" type="text/javascript"></script>
	<script src="js/jquery.spellout.js" type="text/javascript"></script>
	<script src="js/jquery-outline-1.5.js" type="text/javascript"></script>
	<script src="js/json.js" type="text/javascript"></script>
	<script src="js/jquery.store.js" type="text/javascript"></script>
	<script src="js/minesweeper/jquery.minesweeper.js" type="text/javascript"></script>
	<script src="js/script.js" type="text/javascript"></script>
  <!--<![endif]-->
  <!-- Change UA-XXXXX-X to be your site's ID -->
  <script>
    window._gaq = [['_setAccount','UA-33500524-1'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: 'http://www.google-analytics.com/ga.js'
    });
  </script>

  <div id="loadingimages">
    <div id="tonysimgs">
<?
if($folder = opendir('images/tony')) {
  $maxheight = 0;
  $maxwidth = 0;
  while (false !== ($entry = readdir($folder))) {
    if ($entry != "." && $entry != "..") {
      list($width, $height, $type, $attr) = getimagesize("images/tony/{$entry}");
      echo "      <img src='/images/tony/{$entry}' data-width='{$width}' data-height='{$height}' />\n";
      if($height > $maxheight)
      {
        $maxheight = $height;
      }
      if($width > $maxwidth)
      {
        $maxwidth = $width;
      }
    }
  }
  closedir($folder);
  //echo "<script type='text/javascript'>$('#portrait').css({width: '".$maxwidth."px', height: '".$maxheight."px'});</script>";
}
?>
    </div>
  </div>
</body>
</html>