<?php

// require_once 'vendor/autoload.php';
//
// $client = new Google_Client();
// $client->useApplicationDefaultCredentials();
// $client->setScopes(['https://www.googleapis.com/auth/drive']);
// $service = new Google_Service_Drive($client);
//
// $pageToken = null;
// do {
// 	$response = $service->files->listFiles(array(
// 		'q' => "mimeType='image/jpeg'",
// 		'spaces' => 'drive',
// 		'pageToken' => $pageToken,
// 		'fields' => 'nextPageToken, files(id, name)',
// 	));
// 	foreach ($response->files as $file) {
// 		printf("Found file: %s (%s)\n", $file->name, $file->id);
// 	}
// } while ($pageToken != null);
//

if (isset($_GET["fbpics"])) {
	$yqlUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22https%3A%2F%2Fdrive.google.com%2Ffolderview%3Fid%3D0Bz2tqUkmmzREYjk1RjNCVHZpMjg%26usp%3Dsharing%22%20and%20xpath%3D%27%2F%2Fdiv%5B%40class%3D%22flip-entry-thumb%22%5D%2Fimg%2F%40src%27&format=json";
	$results = json_decode(file_get_contents($yqlUrl));
	$imgs = [];
	foreach ($results->query->results->img as $img) {
		$imgs[] = preg_replace("/=s190$/", "", $img->src);//w1886-h513
	}
	$randomImg = array_rand($imgs);

	header("Content-Type: application/json");
	echo json_encode($imgs[$randomImg]);
	// header("Location: {$imgs[$randomImg]}");
} else {
	header("HTTP/1.0 404 Not Found");
	echo "HTTP/1.0 404 Not Found";
}
