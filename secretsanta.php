<?php
if (isset($_GET["email"])) {
	$names = json_decode($_POST["names"]);
	foreach ($names as $key => $value) {
		$from = "Secret Santa <tbrix13@gmail.com>";
		$to = $value[1];
		$body = str_replace("%p", $value[0], $_POST["body"]);
		$body = str_replace("%n", $key, $_POST["body"]);
		$subject = "Secret Santa";

		$headers = "From: {$from}\r\n";

		if (!mail($to, $subject, $body, $headers)) {
			echo json_encode(["success" => false, "error" => $mail->getMessage()]);
			exit;
		}
	}
	echo json_encode(["success" => true]);
} else {
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Secret Santa</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<style type="text/css">
			html, body{
				margin:0;
				padding:0;
				text-align:center;
			}
			input[type="text"], select, textarea, button
			{
				width:100%;
				font-size:30px;
			}
			#message
			{
				height:100px;
			}
			button
			{
				border-radius: 15px;
			}
		</style>
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script type="text/javascript" src="/js/secretsanta.js"></script>
	</head>
	<body>
		<input type="text" id="name" placeholder="Name" /><br />
		<input type="text" id="email" placeholder="Email" autocapitalize="off" /><br />
		<button type="button" id="addName">Add Name</button><br />
		<select id="ruleop1"></select><br />
		<select id="ruleop2">
			<option value="0">cannot have</option>
			<option value="1">must have</option>
		</select><br />
		<select id="ruleop3"></select><br />
		<button type="button" id="addRule">Add Rule</button><br />
		<label for="message">Message: (%n = person they have, %p = their name)</label><br />
		<textarea id="message" autocapitalize="off" placeholder="%p is the secret santa for %n. The limit is around $20.">%p is the secret santa for %n. The limit is around $20.</textarea><br />
		<label for="secret">Secret</label>
		<input type="checkbox" id="secret" /><br />
		<button type="button" id="getList">Submit</button>
		<div id="names"><h1>Names</h1></div>
		<div id="rules"><h1>Rules</h1></div>
	</body>
</html>
<?php
}
