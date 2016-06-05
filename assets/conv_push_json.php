<?php
require('../config.php');

$file_info_arr = json_decode($_POST['jsonArray']);
$id = time();
for($i = 0; $i < count($file_info_arr); $i ++){
  $info = json_decode(file_get_contents(LOCAL_PATH.'/data/'.$file_info_arr[$i]),true);
  array_push($info['conversation'],$id);
  var_dump($info['conversation']);
  file_put_contents(LOCAL_PATH.'/data/'.$file_info_arr[$i] , json_encode($info));
}
