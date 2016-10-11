<?php

// I'm trying to use the best security preactices here
// even though this is only a pamphlet site

// CSP
function cspHashes($hashArray) {
	if (count($hashArray) === 0) {
		return "";
	}
	$csp = [];

	foreach ($hashArray as $src => $arr) {
		$csp[] = $src . " " . implode(" ", $arr);
	}

	return implode("; ", $csp);
}

$nonces = [
	"modernizr" => mt_rand(),
	"hotjar" => mt_rand(),
	"google analytics" => mt_rand(),
	"mixpanel" => mt_rand(),
	"js/jquery.1.7.2.min.js" => mt_rand(),
	"js/window/jquery.window.js" => mt_rand(),
	"js/jquery.canvas.js" => mt_rand(),
	"js/jquery.spellout.js" => mt_rand(),
	"js/jquery-outline-1.5.js" => mt_rand(),
	"js/json.js" => mt_rand(),
	"js/jquery.store.js" => mt_rand(),
	"js/minesweeper/jquery.minesweeper.js" => mt_rand(),
	"js/script.js" => mt_rand(),
];

$cspHashArray = [
	"default-src" => ["https:"],
	"style-src" => [
		"https:",
		// allow inline styles set by javascript
		"'unsafe-inline'",
	],
	"script-src" => [
		"https:",
		// 'unsafe-inline' is for backwards compatibility
		"'unsafe-inline'",
		"'strict-dynamic'",
		//
		// modernizr
		"'nonce-{$nonces["modernizr"]}'",
		// hotjar
		"'nonce-{$nonces["hotjar"]}'",
		//"'sha256-+aYsgX7b6iAgCjd9Ox5MJjYLuUdITdUGWmGWXDam/k0='",
		// google analytics
		"'nonce-{$nonces["google analytics"]}'",
		//"'sha256-WxOyqsSGFt+w2tx+sUfyVLkkjqR94wvn8Mlu92xNx68='",
		// mixpanel
		"'nonce-{$nonces["mixpanel"]}'",
		//"'sha256-kYebbjIGLF/wTaeDHPdj+tlcqhNDqiXSGup7UlDgexI='",
		"'nonce-{$nonces["js/jquery.1.7.2.min.js"]}'",
		"'nonce-{$nonces["js/window/jquery.window.js"]}'",
		"'nonce-{$nonces["js/jquery.canvas.js"]}'",
		"'nonce-{$nonces["js/jquery.spellout.js"]}'",
		"'nonce-{$nonces["js/jquery-outline-1.5.js"]}'",
		"'nonce-{$nonces["js/json.js"]}'",
		"'nonce-{$nonces["js/jquery.store.js"]}'",
		"'nonce-{$nonces["js/minesweeper/jquery.minesweeper.js"]}'",
		"'nonce-{$nonces["js/script.js"]}'",
	],
	"connect-src" => [
		"https:",
		// hotjar
		"wss:",
	],
	"img-src" => [
		"https:",
		// allow data: images
		"data:",
	],
	"object-src" => ["'none'"],
];
header("Content-Security-Policy: ".cspHashes($cspHashArray));

// xss protection header
header("X-XSS-Protection: 1; mode=block");

// disallow my site in an iframe
header("X-Frame-Options: DENY");

// secure session cookie
/* I don't use sessions on this site so this would be pointless
 * but I'll leave this here for completeness

// http://stackoverflow.com/a/22221991/806777
// **PREVENTING SESSION HIJACKING**
// Prevents javascript XSS attacks aimed to steal the session ID
ini_set('session.cookie_httponly', 1);

// **PREVENTING SESSION FIXATION**
// Session ID cannot be passed through URLs
ini_set('session.use_only_cookies', 1);

// Uses a secure connection (HTTPS) if possible
ini_set('session.cookie_secure', 1);

*/
?>
<!DOCTYPE html>
<html lang="en-us">
<head>
	<title>Tony Brix</title>
	<meta charset="utf-8"
	<meta name="format-detection" content="telephone=no"/>
	<meta name="viewport" content="width=device-width, user-scalable=0"/>
	<meta name="description" content="Learn about Tony Brix. Maybe you'll find something interesting."/>
	<meta name="author" content="Tony Brix"/>
	<link rel="apple-touch-icon" href="images/tony.png"/>
	<link rel="stylesheet" href="css/defaults.css"/>
	<link rel="stylesheet" href="js/window/window.css"/>
	<link rel="stylesheet" href="css/style.css"/>
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
	<script src="js/modernizr.custom.43220.js" type="text/javascript" nonce="<?= $nonces["modernizr"] ?>"></script>
<!-- Hotjar Tracking Code for tony.brix.ninja -->
<script nonce="<?= $nonces["hotjar"] ?>">
		(function(h,o,t,j,a,r){
				h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments);};
				h._hjSettings={hjid:56766,hjsv:5};
				a=o.getElementsByTagName('head')[0];
				r=o.createElement('script');r.async=1;
				r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
				a.appendChild(r);
		})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
<!--<![endif]-->
<script nonce="<?= $nonces["google analytics"] ?>">
	window._gaq = [['_setAccount','UA-33500524-1'],['_trackPageview'],['_trackPageLoadTime']];
	Modernizr.load({
		load: '//www.google-analytics.com/ga.js'
	});
</script>

<!-- start Mixpanel -->
<script nonce="<?= $nonces["mixpanel"] ?>">(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
mixpanel.init("ec2a03d0a0d066d969951d2d2ecffde3");</script>
<!-- end Mixpanel -->
</head>

<body>
	<div id="portrait"></div>
	<div id="qrcode">
		<p id="contact-info">Tony Brix<br />(320) 249-1820<br />Tony@Brix.ninja</p>
	</div>
	<div id="icons">
		<div data-img="images/about.png" id="about" class="desktop shortcut"><span class="title">About</span></div>
		<div id="aboutcontent" tabindex="0"></div>
		<div data-img="images/resume.png" id="resume" class="desktop shortcut"><span class="title">Resume</span></div>
		<div id="resumecontent"></div>
		<div data-href="mailto:Tony@Brix.ninja" data-img="images/email.png" id="email" class="desktop shortcut"><span class="title">Send Email</span></div>
		<!--div id="emailcontent"><textarea class="tinymce" id="emailbody" style="height:1px;width:1px;"></textarea><div class="overlay"></div></div-->
		<div data-href="/about.php" data-img="images/info.png" id="mobileabout" class="mobile shortcut"><span class="title">About</span></div>
		<div data-href="/resume.php" data-img="images/resume.png" id="mobileresume" class="mobile shortcut"><span class="title">Resume</span></div>
		<div data-href="https://uzitech.com/files.php" data-img="images/portfolio.png" id="portfolio" class="desktop shortcut"><span class="title">Portfolio</span></div>
		<div data-href="https://uzitech.com/files.php" data-img="images/portfolio.png" id="mobileportfolio" class="mobile shortcut"><span class="title">Portfolio</span></div>
		<div data-href="https://blog.uzitech.com" data-img="images/blog.png" id="blog" class="shortcut"><span class="title">Blog</span></div>
		<div data-href="https://facebook.com/tbrix13" data-img="images/facebook.png" id="facebook" class="shortcut"><span class="title">Facebook</span></div>
		<div data-href="https://m.me/tbrix13" data-img="images/fmessenger.png" id="fmessenger" class="shortcut"><span class="title">Facebook Messenger</span></div>
		<div data-href="https://twitter.com/tonybrix" data-img="images/twitter.png" id="twitter" class="shortcut"><span class="title">Twitter</span></div>
		<div data-href="https://gplus.to/tbrix13" data-img="images/googleplus.png" id="googleplus" class="shortcut"><span class="title">Google +</span></div>
		<div data-href="https://www.linkedin.com/pub/tony-brix/37/436/98a/" data-img="images/linkedin.png" id="linkedin" class="shortcut"><span class="title">LinkedIn</span></div>
		<div data-img="images/minesweeper.png" id="minesweeper" class="desktop shortcut"><span class="title">Mine Sweeper</span></div>
		<div id="minesweepercontent"><canvas id="minesweepercanvas" tabindex="0">Your browser is not compatible.Please update your browser.</canvas></div>
		<!--div id="pwalg" data-img="images/pwalg.png" class="desktop shortcut"><span class="title">Password Algorithm</span></div>
		<div id="pwalgcontent" style="background-color: #fff;overflow: hidden !important"><iframe style="width: 100%;height: 9999999px;max-height: 100%;" src="https://uzitech.com/pwalg"></iframe></div-->
		<div id="mobilepwalg" data-href="https://uzitech.com/pwalg" data-img="images/pwalg.png" class="shortcut"><span class="title">Password Algorithm</span></div>
		<div data-href="https://uzitech.com/pws" id="pws" data-img="images/pws.png" class="desktop shortcut"><span class="title">Password Keys</span></div>
		<!--div id="pwscontent" style="background-color: #fff;overflow: hidden !important"><iframe style="width: 100%;height: 9999999px;max-height: 100%;" src="//uzitech.com/pws"></iframe></div-->
		<div id="mobilepws" data-href="https://uzitech.com/pws" data-img="images/pws.png" class="mobile shortcut"><span class="title">Password Keys</span></div>
		<div id="googleplay" data-href="https://play.google.com/store/apps/developer?id=UziTech" data-img="images/googleplay.png" class="shortcut"><span class="title">Google Play</span></div>
		<div id="github" data-href="https://github.com/uzitech" data-img="images/github.png" class="shortcut"><span class="title">GitHub</span></div>
		<div id="gists" data-href="https://gist.github.com/uzitech" data-img="images/gist.png" class="shortcut"><span class="title">Gists</span></div>
		<div id="freecodecamp" data-href="https://freecodecamp.com/uzitech" data-img="images/freecodecamp.png" class="shortcut"><span class="title">Free Code Camp</span></div>
		<div data-href="tel:3202491820" data-img="images/phone.png" id="phone" class="mobile shortcut"></div>
		<div data-href="sms:3202491820" data-img="images/sms.png" id="sms" class="mobile shortcut"></div>
		<div data-href="mailto:Tony@Brix.ninja" data-img="images/gmail.png" id="gmail" class="mobile shortcut"></div>
	</div>

	<!--[if gte IE 7]><!-->

	<script src="js/jquery.1.7.2.min.js" nonce="<?= $nonces["js/jquery.1.7.2.min.js"] ?>"></script>
	<script src="js/window/jquery.window.js" nonce="<?= $nonces["js/window/jquery.window.js"] ?>"></script>
	<script src="js/jquery.canvas.js" nonce="<?= $nonces["js/jquery.canvas.js"] ?>"></script>
	<script src="js/jquery.spellout.js" nonce="<?= $nonces["js/jquery.spellout.js"] ?>"></script>
	<script src="js/jquery-outline-1.5.js" nonce="<?= $nonces["js/jquery-outline-1.5.js"] ?>"></script>
	<script src="js/json.js" nonce="<?= $nonces["js/json.js"] ?>"></script>
	<script src="js/jquery.store.js" nonce="<?= $nonces["js/jquery.store.js"] ?>"></script>
	<script src="js/minesweeper/jquery.minesweeper.js" nonce="<?= $nonces["js/minesweeper/jquery.minesweeper.js"] ?>"></script>
	<script src="js/script.js" nonce="<?= $nonces["js/script.js"] ?>"></script>

	<div id="loadingimages">
		<div id="tonysimgs">
			<img src='images/tony/tractor.jpg' data-width='480' data-height='360' alt="Tony Brix" />
			<img src='images/tony/cherryberry.jpg' data-width='344' data-height='324' alt="Tony Brix" />
			<img src='images/tony/holloween.jpg' data-width='694' data-height='690' alt="Tony Brix" />
			<img src='images/tony/wedding.jpg' data-width='429' data-height='340' alt="Tony Brix" />
			<img src='images/tony/zoo.jpg' data-width='573' data-height='540' alt="Tony Brix" />
			<img src='images/tony/553081_10100414409267861_2143091519_n.jpg' data-width='549' data-height='549' alt="Tony Brix" />
			<img src='images/tony/1021037_10100570919041021_1112411182_o.jpg' data-width='800' data-height='600' alt="Tony Brix" />
			<img src='images/tony/24441_327944307319300_797827848_n.jpg' data-width='600' data-height='600' alt="Tony Brix" />
			<img src='images/tony/29588_10100670098459671_1091024644_n.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/64872_125210684329157_750889273_n.jpg' data-width='960' data-height='632' alt="Tony Brix" />
			<img src='images/tony/198363_10100257416617391_1439535719_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/205866_874456680201_1295628_n.jpg' data-width='514' data-height='720' alt="Tony Brix" />
			<img src='images/tony/255322_10100280354419851_1432915869_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/293066_10100295497133731_175293267_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/302079_911400559371_223851350_n.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/302435_911409970511_431662050_n.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/305205_911404157161_1239905019_n.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/307660_10200307950120112_1209088522_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/380645_10100285846842991_689066883_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/391508_10100310138946421_1766732978_n.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/393679_10150512984038776_698187792_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/398612_10100409666063281_379422769_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/430549_10100352383178641_1266775155_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/485519_10151664078690769_1485142210_n.jpg' data-width='852' data-height='639' alt="Tony Brix" />
			<img src='images/tony/532273_10100280342603531_2123524387_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/557088_4090531585994_1871747651_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/579671_10100670098070451_1205447995_n.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/599702_10100409659855721_2131006437_n.jpg' data-width='720' data-height='960' alt="Tony Brix" />
			<img src='images/tony/912972_10100530036589781_1857428578_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/942327_10100527719233781_2143157115_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/945859_10100527733345501_215275619_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/968021_10100900810959971_799730891_n.jpg' data-width='792' data-height='960' alt="Tony Brix" />
			<img src='images/tony/983258_10100570919041021_1112411182_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/1080844_10100618284425411_1390283153_n.jpg' data-width='720' data-height='960' alt="Tony Brix" />
			<img src='images/tony/1185671_10100670097556481_1556234586_n.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/1233402_10100670103105361_774514018_n.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/1239441_10100670098250091_926823134_n.jpg' data-width='640' data-height='960' alt="Tony Brix" />
			<img src='images/tony/1290030_10100658459000241_859920189_n.jpg' data-width='720' data-height='960' alt="Tony Brix" />
			<img src='images/tony/1391996_10202464451831307_672921890_n.jpg' data-width='960' data-height='540' alt="Tony Brix" />
			<img src='images/tony/1502092_10100794733964121_1115007217_n.jpg' data-width='720' data-height='960' alt="Tony Brix" />
			<img src='images/tony/1509138_10203492736337777_1556803074_n.jpg' data-width='960' data-height='540' alt="Tony Brix" />
			<img src='images/tony/1528062_10100797008126681_1436562687_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/1899154_10100842819570181_1282608400_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/1902773_10203492807579558_1017966438_n.jpg' data-width='960' data-height='540' alt="Tony Brix" />
			<img src='images/tony/10168947_10100900818100661_250843300_n.jpg' data-width='670' data-height='960' alt="Tony Brix" />
			<img src='images/tony/10169001_10100900812955971_485816978_n.jpg' data-width='720' data-height='960' alt="Tony Brix" />
			<img src='images/tony/10178313_10100900843454851_1614577081_n.jpg' data-width='960' data-height='834' alt="Tony Brix" />
			<img src='images/tony/10255462_10100900817506851_1382073500_n.jpg' data-width='813' data-height='960' alt="Tony Brix" />
			<img src='images/tony/10261806_10100900780605801_1949900553_n.jpg' data-width='960' data-height='720' alt="Tony Brix" />
			<img src='images/tony/IMG_0532.jpg' data-width='960' data-height='640' alt="Tony Brix" />
			<img src='images/tony/facebook_1422485401377.jpg' data-width='960' data-height='640' alt="Tony Brix" />
		</div>
	</div>
</body>
</html>
