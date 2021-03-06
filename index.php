<?php

// I'm trying to use the best security preactices here, mainly as a reference for other projects

// test again

// CSP
function cspHashes($hashArray) {
	if (count($hashArray) === 0) {
		return "";
	}
	$csp = [];

	foreach ($hashArray as $src => $arr) {
		$csp[] = $src . " " . implode(" ", array_filter($arr));
	}

	return implode("; ", $csp);
}

$isLocalhost = ($_SERVER["SERVER_NAME"] === "localhost");

$scripts = [
	"modernizr",
	"google analytics",
	"js/jquery.1.7.2.min.js",
	"js/window/jquery.window.js",
	"js/jquery.canvas.js",
	"js/jquery.spellout.js",
	"js/jquery-outline-1.5.js",
	"js/json.js",
	"js/jquery.store.js",
	"js/minesweeper/jquery.minesweeper.js",
	"js/tiny_mce/jquery.tinymce.js",
	"js/script.js",
];

$rands = array_map(function () {
	return mt_rand();
}, $scripts);

$nonces = array_combine($scripts, $rands);

$cspHashArray = [
	"default-src" => ["https:"],
	"style-src" => [
		($isLocalhost ? "http:" : "https:"),
		// allow inline styles set by javascript
		"'unsafe-inline'",
	],
	"script-src" => [
		($isLocalhost ? "http:" : "https:"),
		// 'unsafe-inline' is for backwards compatibility
		"'unsafe-inline'",
		// 'unsafe-eval' is for tinymce
		"'unsafe-eval'",
		// strict-dynamic and nonces are commented out because they do not allow dynamic inline that tinymce requires
		// "'strict-dynamic'",
		//
		// I add nonces at end of $cspHashArray
	],
	"connect-src" => [
		($isLocalhost ? "http:" : "https:"),
		// hotjar
		($isLocalhost ? "ws:" : "wss:"),
	],
	"img-src" => [
		($isLocalhost ? "http:" : "https:"),
		// allow data: images
		"data:",
	],
	"font-src" => ["data:"],
	"object-src" => ["'none'"],
];

// script-src nonces
// foreach ($nonces as $nonce) {
// 	$cspHashArray["script-src"][] = "'nonce-{$nonce}'";
// }

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
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="viewport" content="width=device-width, user-scalable=0" />
	<meta name="description" content="Learn about Tony Brix. Maybe you'll find something interesting." />
	<meta name="author" content="Tony Brix" />
	<link rel="apple-touch-icon" href="/images/tony.png" />
	<link rel="stylesheet" href="/css/defaults.css "/>
	<link rel="stylesheet" href="/js/window/window.css" />
	<link rel="stylesheet" href="/css/style.css?v1" />
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
	<script src="/js/modernizr.custom.43220.js" type="text/javascript" nonce="<?= $nonces["modernizr"] ?>"></script>
	<script nonce="<?= $nonces["google analytics"] ?>">
		window._gaq = [['_setAccount','UA-33500524-1'],['_trackPageview'],['_trackPageLoadTime']];
		Modernizr.load({
			load: '//www.google-analytics.com/ga.js'
		});
	</script>
</head>

<body>
	<div id="portrait"></div>
	<div id="qrcode">
		<p id="contact-info">
			Tony Brix
			<br />
			(320) 249-1820
			<br />
			Tony@Brix.ninja
			<br />
			<br />
			<iframe id="sponsor" src="https://github.com/sponsors/UziTech/button" title="Sponsor Me" height="32" width="116" style="border: 0; border-radius: 6px;" sandbox="allow-top-navigation"></iframe>
		</p>
	</div>
	<div id="icons">
		<div data-img="/images/about.png" id="about" class="desktop shortcut"><span class="title">About</span></div>
		<div id="aboutcontent" tabindex="0"></div>
		<div data-img="/images/resume.png" id="resume" class="desktop shortcut"><span class="title">Resume</span></div>
		<div id="resumecontent"></div>
		<div data-img="/images/email.png" id="email" class="desktop shortcut"><span class="title">Send Email</span></div>
		<div id="emailcontent"><textarea class="tinymce" id="emailbody" style="height:1px;width:1px;"></textarea><div class="overlay"></div></div>
		<div data-href="/about.php" data-img="/images/info.png" id="mobileabout" class="mobile shortcut"><span class="title">About</span></div>
		<div data-href="/resume.php" data-img="/images/resume.png" id="mobileresume" class="mobile shortcut"><span class="title">Resume</span></div>
		<!-- <div data-href="https://uzitech.com/files.php" data-img="/images/portfolio.png" id="portfolio" class="desktop shortcut"><span class="title">Portfolio</span></div>
		<div data-href="https://uzitech.com/files.php" data-img="/images/portfolio.png" id="mobileportfolio" class="mobile shortcut"><span class="title">Portfolio</span></div> -->
		<div data-href="https://blog.uzitech.com" data-img="/images/blog.png" id="blog" class="shortcut"><span class="title">Blog</span></div>
		<div data-href="https://facebook.com/tbrix13" data-img="/images/facebook.png" id="facebook" class="shortcut"><span class="title">Facebook</span></div>
		<div data-href="https://m.me/tbrix13" data-img="/images/fmessenger.png" id="fmessenger" class="shortcut"><span class="title">Facebook Messenger</span></div>
		<div data-href="https://twitter.com/tonybrix" data-img="/images/twitter.png" id="twitter" class="shortcut"><span class="title">Twitter</span></div>
		<!-- <div data-href="https://plus.google.com/+TonyBrix" data-img="/images/googleplus.png" id="googleplus" class="shortcut"><span class="title">Google +</span></div> -->
		<div data-href="https://www.linkedin.com/in/tonybrix/" data-img="/images/linkedin.png" id="linkedin" class="shortcut"><span class="title">LinkedIn</span></div>
		<div data-img="/images/minesweeper.png" id="minesweeper" class="desktop shortcut"><span class="title">Mine Sweeper</span></div>
		<div id="minesweepercontent"><canvas id="minesweepercanvas" tabindex="0">Your browser is not compatible.Please update your browser.</canvas></div>
		<!-- <div id="pwalg" data-img="/images/pwalg.png" class="desktop shortcut"><span class="title">Password Algorithm</span></div> -->
		<!-- <div id="pwalgcontent" style="background-color: #fff;overflow: hidden !important"><iframe style="width: 100%;height: 9999999px;max-height: 100%;" src="https://uzitech.com/pwalg"></iframe></div> -->
		<!-- <div id="mobilepwalg" data-href="https://uzitech.com/pwalg" data-img="/images/pwalg.png" class="shortcut"><span class="title">Password Algorithm</span></div> -->
		<!-- <div data-href="https://uzitech.com/pws" id="pws" data-img="/images/pws.png" class="desktop shortcut"><span class="title">Password Keys</span></div> -->
		<!-- <div id="pwscontent" style="background-color: #fff;overflow: hidden !important"><iframe style="width: 100%;height: 9999999px;max-height: 100%;" src="//uzitech.com/pws"></iframe></div> -->
		<!-- <div id="mobilepws" data-href="https://uzitech.com/pws" data-img="/images/pws.png" class="mobile shortcut"><span class="title">Password Keys</span></div> -->
		<!-- <div id="googleplay" data-href="https://play.google.com/store/apps/developer?id=UziTech" data-img="/images/googleplay.png" class="shortcut"><span class="title">Google Play</span></div> -->
		<div id="github" data-href="https://github.com/uzitech" data-img="/images/github.png" class="shortcut"><span class="title">GitHub</span></div>
		<div id="gists" data-href="https://gist.github.com/uzitech" data-img="/images/gist.png" class="shortcut"><span class="title">Gists</span></div>
		<div id="atompackages" data-href="https://atom.io/users/UziTech/packages" data-img="/images/atom.png" class="shortcut"><span class="title">Atom Packages</span></div>
		<div id="freecodecamp" data-href="https://www.freecodecamp.org/uzitech" data-img="/images/freecodecamp.png" class="shortcut"><span class="title">Free Code Camp</span></div>
		<div id="firstwebsite" data-href="https://uzitech.github.io/tonys-place/tony.html" data-img="/images/tonysplace.png" class="shortcut"><span class="title">My First Website</span></div>
		<!-- <div id="messengerbot" data-href="https://m.me/thetonybrix" data-img="/images/fmessengerbot.png" class="shortcut"><span class="title">Messenger Bot</span></div> -->
		<!-- <div id="twitterbot" data-href="https://twitter.com/tonybrixai" data-img="/images/twitterbot.png" class="shortcut"><span class="title">Twitter Bot</span></div> -->
		<div data-href="tel:3202491820" data-img="/images/phone.png" id="phone" class="mobile shortcut"></div>
		<div data-href="sms:3202491820" data-img="/images/sms.png" id="sms" class="mobile shortcut"></div>
		<div data-href="mailto:Tony@Brix.ninja" data-img="/images/gmail.png" id="gmail" class="mobile shortcut"></div>
	</div>

	<!--[if gte IE 7]><!-->

	<script src="/js/jquery.1.7.2.min.js" nonce="<?= $nonces["js/jquery.1.7.2.min.js"] ?>"></script>
	<script src="/js/tiny_mce/jquery.tinymce.js" nonce="<?= $nonces["js/tiny_mce/jquery.tinymce.js"] ?>"></script>
	<script src="/js/window/jquery.window.js" nonce="<?= $nonces["js/window/jquery.window.js"] ?>"></script>
	<script src="/js/jquery.canvas.js" nonce="<?= $nonces["js/jquery.canvas.js"] ?>"></script>
	<script src="/js/jquery.spellout.js" nonce="<?= $nonces["js/jquery.spellout.js"] ?>"></script>
	<script src="/js/jquery-outline-1.5.js" nonce="<?= $nonces["js/jquery-outline-1.5.js"] ?>"></script>
	<script src="/js/json.js" nonce="<?= $nonces["js/json.js"] ?>"></script>
	<script src="/js/jquery.store.js" nonce="<?= $nonces["js/jquery.store.js"] ?>"></script>
	<script src="/js/minesweeper/jquery.minesweeper.js" nonce="<?= $nonces["js/minesweeper/jquery.minesweeper.js"] ?>"></script>
	<script src="/js/script.js" nonce="<?= $nonces["js/script.js"] ?>"></script>

	<div id="loadingimages">
		<div id="tonysimgs">
			<?php $imagesVersion = "v2"; ?>
			<img src="/images/tony/Tony1.jpg?<?= $imagesVersion ?>" data-width="960" data-height="640" alt="Tony Brix" />
			<img src="/images/tony/Tony2.jpg?<?= $imagesVersion ?>" data-width="960" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony3.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony4.jpg?<?= $imagesVersion ?>" data-width="540" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony5.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony6.jpg?<?= $imagesVersion ?>" data-width="960" data-height="640" alt="Tony Brix" />
			<img src="/images/tony/Tony7.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony8.jpg?<?= $imagesVersion ?>" data-width="819" data-height="505" alt="Tony Brix" />
			<img src="/images/tony/Tony9.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony10.jpg?<?= $imagesVersion ?>" data-width="640" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony11.jpg?<?= $imagesVersion ?>" data-width="960" data-height="720" alt="Tony Brix" />
			<img src="/images/tony/Tony12.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony13.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony14.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony15.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony16.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony17.jpg?<?= $imagesVersion ?>" data-width="960" data-height="720" alt="Tony Brix" />
			<img src="/images/tony/Tony18.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony19.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony20.jpg?<?= $imagesVersion ?>" data-width="528" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony21.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony22.jpg?<?= $imagesVersion ?>" data-width="960" data-height="720" alt="Tony Brix" />
			<img src="/images/tony/Tony23.jpg?<?= $imagesVersion ?>" data-width="540" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony24.jpg?<?= $imagesVersion ?>" data-width="852" data-height="639" alt="Tony Brix" />
			<img src="/images/tony/Tony25.jpg?<?= $imagesVersion ?>" data-width="540" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony26.jpg?<?= $imagesVersion ?>" data-width="640" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony27.jpg?<?= $imagesVersion ?>" data-width="960" data-height="641" alt="Tony Brix" />
			<img src="/images/tony/Tony28.jpg?<?= $imagesVersion ?>" data-width="960" data-height="720" alt="Tony Brix" />
			<img src="/images/tony/Tony29.jpg?<?= $imagesVersion ?>" data-width="720" data-height="960" alt="Tony Brix" />
			<img src="/images/tony/Tony35.jpg?<?= $imagesVersion ?>" data-width="960" data-height="834" alt="Tony Brix" />
			<img src="/images/tony/Tony36.jpg?<?= $imagesVersion ?>" data-width="960" data-height="720" alt="Tony Brix" />
			<img src="/images/tony/Tony37.jpg?<?= $imagesVersion ?>" data-width="960" data-height="640" alt="Tony Brix" />
		</div>
	</div>
</body>
</html>
