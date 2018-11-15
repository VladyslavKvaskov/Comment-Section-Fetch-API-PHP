<?php
header('Content-Type: text/plain; charset=utf-8');
$servername = '50.62.209.152:3306';
$username = 'COMMENTS';
$password = '19952406Vladvkvk!';
$dbname = 'comments';
$outp = '';

//get the sql command sent from fetch API
$sql = $_POST['sql'];

//Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

//Set the charset to utf-8 so that the data from the database will be displayed correctly if it contains unicode characters
$conn->set_charset('utf8');

//prepare an sql command for execution
$stmt = $conn->prepare($sql);

//execute the sql command
$stmt->execute();

//check if sql contains SELECT
if(strpos('s' . $sql, 'SELECT') !== false) {
	//get result of execution
	$result = $stmt->get_result();
	//store all the rows of the result 
	$outp = $result->fetch_all(MYSQLI_ASSOC);
}
//check if sql contains INSERT
else if(strpos('s' . $sql, 'INSERT') !== false){
	
	//When the user inserts data you want to send back the data that was inserted
	//Sort the table in descending order and limit by one
	$stmt = $conn->prepare('SELECT * FROM comments ORDER BY comment_id DESC LIMIT 1;');
	//Execute the command
	$stmt->execute();
	$result = $stmt->get_result();
	$outp = $result->fetch_all(MYSQLI_ASSOC);
}

//display the result of operation in JSON format
echo json_encode($outp);
$conn->close();
?>
