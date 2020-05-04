<?php
include_once("config.php");
if ($_POST["title"]) {
    $sql1 = 'SELECT * FROM `presentations` WHERE `title` = "'.$_POST["title"].'"';
    $ifexistres = mysqli_query($link, $sql1);
    if(mysqli_num_rows($ifexistres) > 0) {
        $sql = 'UPDATE `presentations` SET `thumb_url` = "'.$_POST["thumb_url"].'" WHERE `title` = "'.$_POST["title"].'"';
    } else {
        $sql = 'INSERT INTO `presentations` (`title`, `thumb_url`) 
        VALUES ("'.$_POST["title"].'","'.$_POST["thumb_url"].'")';
    }
    $result = mysqli_query($link, $sql);
    
}
if($_POST["errortitle"]) {
    mail('mmavliev9875@gmail.com', 'Bug', $_POST["error"]);
}
?>