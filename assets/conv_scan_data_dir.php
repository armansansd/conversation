
<?php
  require('../config.php');
  $dir = 	opendir(LOCAL_PATH."/data");
  $files_info = [];
  $files = [];
    while($file = readdir($dir)){
      if($file !== "." && $file !== ".."){
        $ext = explode('.' , $file);
        $ext = end($ext);
        if($ext == 'json'){
          $f_name = explode('_' , $file)[0];
          array_push($files_info, $f_name);
        }else{
          $f_name = explode('.' , $file)[0];
          array_push($files, $f_name);
        }
      }
    }
    //note : what if two files got the same name ??
    $m_info = array_diff($files, $files_info);
    if(count($m_info) != null){
      foreach ($m_info as $file){
        $file_json = LOCAL_PATH."/data/".$file."_info.json";
        $arr_info =  array(
    			'title' => $file,
    			'conversation' => []
    			);
        file_put_contents($file_json,json_encode($arr_info));
      }
      print(true);
    }else{
      print(false);
    }
