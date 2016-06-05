$(document).ready(function(){
	//check in which mode are we
	var url_arr = window.location.href;
	    url_arr = url_arr.split("/");
	if(url_arr[(url_arr.length)-2] !== "admin"){
   	    edit = false;   
   	    console.log("not admin");
	   	}else{
	   		$.ajax({
           	type: 'POST',
           	url: '../assets/conv_scan_data_dir.php',
           	success: function(data) {
           		edit = true;
           		var elem_json_arr = [];
           		console.log("admin");
                infoBox(true); 
           	},
           	 error: function (xhr, ajaxOptions, thrownError) {
		        alert(xhr.status);
		        alert(thrownError);
      		}
    	    });
	   	}
	//the link button functions
	$('#links').click(function(){
	    if(edit === false){
	   	    window.location.href = "admin";
	    }else{
			if (confirm('You are going to exit the edit Mode ...')) {
			    var url_arr = window.location.href;
				url_arr = url_arr.split("/");
				url = url_arr.slice(1,4).join("/");
				window.location.href = "http://"+url;
			} else {
			    // Do nothing!
			}
		}

	});

	// click on content
		$('#content a').click(function() {
			//edit mode off, show the linked content
			if (edit === false){
				highlight = false;
				highlightCss();
				var c_init = this.dataset.conversation;
	        	var c_init_array = c_init.split(",");
	        	var dataValue = "";
	        	//retrieve elem of the same conversation
	        	if (c_init !== '') {
	            	$('#content a').each(function(i) {
	                	var c_each = this.dataset.conversation;
	                	var c_each_array = c_each.split(",");
	                	var match = false;
	                	for (var m = 0; m < c_init_array.length; m++) {
	                    	for (var n = 0; n < c_each_array.length; n++) {
	                        	if (c_init_array[m] === c_each_array[n]) {
	                            	match = true;
	                            	dataValue = c_each_array[n];
	                            	break;
	                        	}
	                    	}
	                	}
		                if (match === true) {
		                    var elem = $(this).clone();
		                    elem.addClass("thumbnail");
		                    $(".thumbs_container").append(elem);
		                }
	            	});
		            /*convert timestamp to date*/
		            var date = dateFormat(dataValue);
		            highlight = true;
		            $("#highlight h1").empty();
		            $("#highlight h1").append(date);
		            $("#highlight").show();
		            highlightCss();
	        	}
	            
			}else if (edit !== false){
				//edit mode on, allow links creation
                //get a list of the json file selected//
                var match = false;
                var elem = $($(this)[0].lastElementChild).attr("src").filename();
                
                var elem_json = elem + '_info.json';
                for (var m = 0; m <= elem_json_arr.length; m++ ){
                    if (elem_json_arr[m] == elem_json){
                        match = true;
                        break;
                    } else if ( elem_json_arr[m] != elem_json) {
                        match = false;
                    }
                }
                //on reclick erase elem //
                if (match === false) {
                    elem_json_arr.push(elem_json);
                    selected_css(this);
                } else if (match === true) {
                    elem_json_arr.splice($.inArray(elem_json, elem_json_arr), 1);
                    unselected_css(this);
                }
			}
		});
	//the keyboard events 
	$('body').keypress(function(e) {
	//on enter -> push the content to json info file
    if (e.keyCode === 13 && elem_json_arr.length !== 0 && edit === true) {
        //convert array to json
        var jsonArray = JSON.stringify(elem_json_arr);
        //post data
        var dataToPost = {
            'jsonArray': jsonArray
        };
        //sendind information the php page
        $.ajax({
            type:'POST',
            url: '../assets/conv_push_json.php',
            data: dataToPost,
            success: function(data) {
                console.log("links created ! \n" + data);
            }
        });
        unselected_css('*');
        elem_json_arr = [];        
    }
    //erase data and quit mode on esc
    if (e.keyCode === 27 && edit === true) {
        //elem_json_arr = [];
        //unselected_css('*');
        //to do : put this into a function
   		// var url_arr = window.location.href;
   		// url_arr = url_arr.split("/");
   		// url = url_arr.slice(1,4).join("/");
   		//console.log(url);
			// url_arr = url_arr.split("/");
			// url = url_arr.slice(1,4).join("/");
			// 
    }
    //quit the highlight mode
    if (e.keyCode === 27 && edit !== true) {
        highlight = false;
        highlightCss();
    }
	});
});

