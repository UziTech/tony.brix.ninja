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
    <img src="images/qrcode.png" alt="http://tony.brix.ninja/" />
    <p id="contact-info">Tony Brix<br />(320) 249-1820<br />Tony@Brix.ninja</p>
  </div>
  <div id="icons">
    <div data-img="images/about.png" id="about" class="desktop shortcut"><span class="title">About</span></div>
    <div id="aboutcontent" tabindex="1"></div>
    <div data-img="images/resume.png" id="resume" class="desktop shortcut"><span class="title">Resume</span></div>
    <div id="resumecontent"></div>
    <div data-href="mailto:Tony@Brix.ninja" data-img="images/email.png" id="email" class="desktop shortcut"><span class="title">Send Email</span></div>
    <!--div id="emailcontent"><textarea class="tinymce" id="emailbody" style="height:1px;width:1px;"></textarea><div class="overlay"></div></div-->
    <div data-href="/about.php" data-img="images/info.png" id="mobileabout" class="mobile shortcut"><span class="title">About</span></div> 
    <div data-href="/resume.php" data-img="images/resume.png" id="mobileresume" class="mobile shortcut"><span class="title">Resume</span></div> 
    <div data-href="http://uzitech.com/files.php" data-img="images/portfolio.png" id="portfolio" class="desktop shortcut"><span class="title">Portfolio</span></div>
    <div data-href="http://uzitech.com/files.php" data-img="images/portfolio.png" id="mobileportfolio" class="mobile shortcut"><span class="title">Portfolio</span></div>
    <div data-href="http://blog.uzitech.com" data-img="images/blog.png" id="blog" class="shortcut"><span class="title">Blog</span></div>
    <div data-href="http://www.facebook.com/tbrix13" data-img="images/facebook.png" id="facebook" class="shortcut"><span class="title">Facebook</span></div>
    <div data-href="http://gplus.to/tbrix13" data-img="images/googleplus.png" id="googleplus" class="shortcut"><span class="title">Google +</span></div>
    <div data-href="http://www.linkedin.com/pub/tony-brix/37/436/98a/" data-img="images/linkedin.png" id="linkedin" class="shortcut"><span class="title">LinkedIn</span></div>
    <div data-img="images/minesweeper.png" id="minesweeper" class="desktop shortcut"><span class="title">Mine Sweeper</span></div>
    <div id="minesweepercontent"><canvas id="minesweepercanvas" tabindex="1">Your browser is not compatible.Please update your browser.</canvas></div>
    <div id="pwalg" data-img="images/pwalg.png" class="desktop shortcut"><span class="title">Password Algorithm</span></div>
    <div id="pwalgcontent" style="background-color: #fff;overflow: hidden !important"><iframe style="width: 100%;height: 9999999px;max-height: 100%;" src="http://uzitech.com/pwalg"></iframe></div>
    <div id="mobilepwalg" data-href="http://uzitech.com/pwalg" data-img="images/pwalg.png" class="mobile shortcut"><span class="title">Password Algorithm</span></div>
    <div data-href="http://uzitech.com/pws" id="pws" data-img="images/pws.png" class="desktop shortcut"><span class="title">Password Keys</span></div>
    <!--div id="pwscontent" style="background-color: #fff;overflow: hidden !important"><iframe style="width: 100%;height: 9999999px;max-height: 100%;" src="http://uzitech.com/pws"></iframe></div-->
    <div id="mobilepws" data-href="http://uzitech.com/pws" data-img="images/pws.png" class="mobile shortcut"><span class="title">Password Keys</span></div>
    <div id="googleplay" data-href="https://play.google.com/store/apps/developer?id=UziTech" data-img="images/googleplay.png" class="shortcut"><span class="title">Google Play</span></div>
    <div id="github" data-href="https://github.com/uzitech" data-img="images/github.png" class="shortcut"><span class="title">GitHub</span></div>
    <div id="gist" data-href="https://gist.github.com/uzitech" data-img="images/gist.png" class="shortcut"><span class="title">Gists</span></div>
    <div data-href="tel:3202491820" data-img="images/phone.png" id="phone" class="mobile shortcut"></div>
    <div data-href="sms:3202491820" data-img="images/sms.png" id="sms" class="mobile shortcut"></div>
    <div data-href="mailto:Tony@Brix.ninja" data-img="images/gmail.png" id="gmail" class="mobile shortcut"></div>
  </div>
  
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
  <!-- Change UA-XXXXX-X to be your site's ID - ->
  <script>
    window._gaq = [['_setAccount','UA-33500524-1'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: 'http://www.google-analytics.com/ga.js'
    });
  </script-->

  <div id="loadingimages">
    <div id="tonysimgs">
      <img src='images/tony/tractor.jpg' data-width='480' data-height='360' />
      <img src='images/tony/cherryberry.jpg' data-width='344' data-height='324' />
      <img src='images/tony/holloween.jpg' data-width='694' data-height='690' />
      <img src='images/tony/wedding.jpg' data-width='429' data-height='340' />
      <img src='images/tony/zoo.jpg' data-width='573' data-height='540' />
      <img src='images/tony/553081_10100414409267861_2143091519_n.jpg' data-width='549' data-height='549' />
      <img src='images/tony/1021037_10100570919041021_1112411182_o.jpg' data-width='800' data-height='600' />
      <img src='images/tony/24441_327944307319300_797827848_n.jpg' data-width='600' data-height='600' />
      <img src='images/tony/29588_10100670098459671_1091024644_n.jpg' data-width='960' data-height='640' />
      <img src='images/tony/64872_125210684329157_750889273_n.jpg' data-width='960' data-height='632' />
      <img src='images/tony/198363_10100257416617391_1439535719_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/205866_874456680201_1295628_n.jpg' data-width='514' data-height='720' />
      <img src='images/tony/255322_10100280354419851_1432915869_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/293066_10100295497133731_175293267_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/302079_911400559371_223851350_n.jpg' data-width='960' data-height='640' />
      <img src='images/tony/302435_911409970511_431662050_n.jpg' data-width='960' data-height='640' />
      <img src='images/tony/305205_911404157161_1239905019_n.jpg' data-width='960' data-height='640' />
      <img src='images/tony/307660_10200307950120112_1209088522_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/380645_10100285846842991_689066883_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/391508_10100310138946421_1766732978_n.jpg' data-width='960' data-height='640' />
      <img src='images/tony/393679_10150512984038776_698187792_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/398612_10100409666063281_379422769_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/430549_10100352383178641_1266775155_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/485519_10151664078690769_1485142210_n.jpg' data-width='852' data-height='639' />
      <img src='images/tony/532273_10100280342603531_2123524387_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/557088_4090531585994_1871747651_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/579671_10100670098070451_1205447995_n.jpg' data-width='960' data-height='640' />
      <img src='images/tony/599702_10100409659855721_2131006437_n.jpg' data-width='720' data-height='960' />
      <img src='images/tony/912972_10100530036589781_1857428578_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/942327_10100527719233781_2143157115_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/945859_10100527733345501_215275619_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/968021_10100900810959971_799730891_n.jpg' data-width='792' data-height='960' />
      <img src='images/tony/983258_10100570919041021_1112411182_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/1080844_10100618284425411_1390283153_n.jpg' data-width='720' data-height='960' />
      <img src='images/tony/1185671_10100670097556481_1556234586_n.jpg' data-width='960' data-height='640' />
      <img src='images/tony/1233402_10100670103105361_774514018_n.jpg' data-width='960' data-height='640' />
      <img src='images/tony/1239441_10100670098250091_926823134_n.jpg' data-width='640' data-height='960' />
      <img src='images/tony/1290030_10100658459000241_859920189_n.jpg' data-width='720' data-height='960' />
      <img src='images/tony/1391996_10202464451831307_672921890_n.jpg' data-width='960' data-height='540' />
      <img src='images/tony/1502092_10100794733964121_1115007217_n.jpg' data-width='720' data-height='960' />
      <img src='images/tony/1509138_10203492736337777_1556803074_n.jpg' data-width='960' data-height='540' />
      <img src='images/tony/1528062_10100797008126681_1436562687_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/1899154_10100842819570181_1282608400_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/1902773_10203492807579558_1017966438_n.jpg' data-width='960' data-height='540' />
      <img src='images/tony/10168947_10100900818100661_250843300_n.jpg' data-width='670' data-height='960' />
      <img src='images/tony/10169001_10100900812955971_485816978_n.jpg' data-width='720' data-height='960' />
      <img src='images/tony/10178313_10100900843454851_1614577081_n.jpg' data-width='960' data-height='834' />
      <img src='images/tony/10255462_10100900817506851_1382073500_n.jpg' data-width='813' data-height='960' />
      <img src='images/tony/10261806_10100900780605801_1949900553_n.jpg' data-width='960' data-height='720' />
      <img src='images/tony/IMG_0532.jpg' data-width='960' data-height='640' />
      <img src='images/tony/facebook_1422485401377.jpg' data-width='960' data-height='640' />
    </div>
  </div>
</body>
</html>