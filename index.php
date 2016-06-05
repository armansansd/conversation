

<?php
  require("header.php");
?>
        <div id="hideShowName" onclick="hideShowName()">display names</div>

        <?php
  echo "<div id='content'>";


  $dir = 	opendir(dirname(realpath(__FILE__))."/data");
  $txt_ext = ["txt","md"];
  $img_ext = ["jpg", "gif", "png","svg"];
  $files_info = "";
  $nb_file = scandir(dirname(realpath(__FILE__))."/data");
  foreach($nb_file as $index=>$value) {
    if($value === '.' || $value === '..') unset($nb_file[$index]);
  }

  while($file = readdir($dir)){
    if($file !== "." && $file !== ".."){
      $f = explode('.' , $file);
      $f_ext = end($f);

      $json_path = LOCAL_PATH.'/data/'.$f[0].'_info.json';


      if(in_array($f_ext, $img_ext)){
        if(file_exists($json_path) != false){
          $f_json = json_decode(file_get_contents($json_path),true);
          $c = $f_json['conversation'];
          //print_r($c);
          $c_string = implode(",", $c);
          echo "<a data-conversation='".$c_string."'>
          <h3>".$file."</h3>
          <img id='grid_thumb' src='".URL."/data/".$file."'>

          </a>";
        }else{
          echo "<a data-conversation=''>
          <h3>".$file."</h3>
          <img id='grid_thumb' src='data/".$file."'>

          </a>";
        }
      } else if(in_array($f_ext, $txt_ext)){
        $content = file_get_contents("data/".$file);
        if(file_exists($json_path) != false){
          $f_json = json_decode(file_get_contents($json_path),true);
          $c = $f_json['conversation'];
          $c_string = implode(",", $c);

          echo "<a data-conversation='".$c_string."'><div id='grid_thumb' class='text'><p>".$content."</p></div></a>";
        }else{
          echo "<a data-conversation=''><div id='grid_thumb' class='text'><p>".$content."</p></div></a>";
        }
      }
    }else if((count($nb_file) <= 2)){
      echo "<div id='alert'>Oops, you don't have enough content,<br /> please upload some in the data folder</div>";

    }
  }

    echo "</div>";  //end div content
    echo "<div id='highlight'>
            <h1>Conversation :</h1>
            <div class='thumbs_container'></div>
          </div>";
    require("footer.php");
