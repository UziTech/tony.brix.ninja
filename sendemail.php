<?php
if (isset($_POST["from"], $_POST["subject"], $_POST["body"])) {
	$return = ["success" => true];
	$ipaddress = $_SERVER["REMOTE_ADDR"];
	$userAgent = $_SERVER["HTTP_USER_AGENT"];
	$browser = get_browser();
	$from = $_POST["from"];

	$headers  = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8\r\n";
	$headers .= "From: tbrix13+contact@gmail.com\r\n";
	$headers .= "Reply-To: {$from}\r\n";
	$body = "<p>Email: {$from}</p>";
	$body .= "<p>IP Address: {$ipaddress}</p>";
	$body .= "<p>UA: {$userAgent}</p>";
	$body .= "<p>Message:</p>";
	$body .= $_POST["body"];
	$body = preg_replace("/((href|src)\s*=\s*[\"'])\//i", "$1https://tony.brix.ninja/", $body);
	$subject = "Message from tony.brix.ninja: {$_POST["subject"]}";

	if (!mail("tony@brix.ninja", $subject, $body, $headers)) {
		$return = [
			"success" => false,
			"error" => "There has been an error sending the email. If you need to contact me you may send an email to Tony@Brix.ninja at any time.",
		];
	}
	echo json_encode($return);
} else {
	json_encode(["success" => false, "error" => "Invalid Parameters"]);
}
