<?php

function sendJsonResponse($res = [], $code = 200) {
	http_response_code($code);
	header("Content-Type: application/json");
	echo json_encode($res, JSON_FORCE_OBJECT);
	exit;
}

if (!isset($_SERVER["HTTP_X_APPENGINE_CRON"])) {
	sendJsonResponse(["success" => false, "error" => "Invalid Parameters"], 400);
}

$ipaddress = $_SERVER["REMOTE_ADDR"];
$userAgent = $_SERVER["HTTP_USER_AGENT"];
$browser = get_browser();
$from = "cron@example.com";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: tbrix13+contact@gmail.com\r\n";
$body = "<p>Email: {$from}</p>";
$body .= "<p>IP Address: {$ipaddress}</p>";
$body .= "<p>UA: {$userAgent}</p>";
$body .= "<p>Message:</p>";
$body .= "hello";
$subject = "Message from tony.brix.ninja: Daily Cron";

if (mail("tony@brix.ninja", $subject, $body, $headers)) {
	sendJsonResponse(["success" => true]);
}

sendJsonResponse([
	"success" => false,
	"error" => "There has been an error sending the email. If you need to contact me you may send an email to Tony@Brix.ninja at any time.",
], 500);
