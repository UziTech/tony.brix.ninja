<?php
if (isset($_POST["from"], $_POST["subject"], $_POST["body"])) {
	$return = ["success" => true];
	$ipaddress = $_SERVER["REMOTE_ADDR"];

	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= 'From: '.$_POST["from"];
	$body = $_POST["body"];
	$body = str_replace("href=\"/", "href=\"http://tonybrix.info/", $body);
	$body = str_replace("src=\"/", "src=\"http://tonybrix.info/", $body);
	if (!mail("tony@brix.ninja", "Tony.Brix.ninja: ".$_POST["subject"], $body, $headers)) {
		$return = [
			"success" => false,
			"error" => "There has been an error sending the email. If you need to contact me you may send an email to Tony@Brix.ninja at any time.",
		];
	}
	echo json_encode($return);
} else {
	json_encode(["success" => false, "error" => "Invalid Parameters"]);
}
