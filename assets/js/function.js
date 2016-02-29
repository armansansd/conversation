var edit = false;
var highlightMode = false;
//show same data set //
$('#content a').click(function() {
    if (edit !== true) {
        console.log(edit);
        highlightMode = false;
        $("body").css("overflow", "scroll");
        $(".thumbs_container").empty();
        $("#highlight").hide();
        $("#links").show();
        $("#content img").css({
            "opacity": "1",
            "filter": "none",
            "-webkit-filter": "grayscale(0)"
        });
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
                    console.log(elem);
                    elem.addClass("thumbnail");
                    $(".thumbs_container").append(elem);
                }
            });
            /*convert timestamp to date*/
            var date = dateFormat(dataValue);
            highlightMode = true;
            n = 1;
            hideShowName();
            $("#highlight h1").empty();
            $("#highlight h1").append(date);
            $("#highlight").show();
            var scroll = HasScroll(highlight);
            console.log(scroll);
            if (scroll !== false) {
                $("#highlight").addClass('overflow');
            } else {
                $("#highlight").removeClass('overflow');
            }
            $("#links").hide();
            $("#content img").css({
                "opacity": "0.1",
                "filter": "gray",
                /* IE6-9 */
                "filter": "grayscale(1)",
                /* Microsoft Edge and Firefox 35+ */
                "-webkit-filter": "grayscale(1)" /* Google Chrome, Safari 6+ & Opera 15+ */
            });
            $("body").css("overflow", "hidden");
        }
    }
});
//end show data //
/* creat a data set (enter the link mode)*/
var elem_json_arr = [];
$("#links").click(function() {
    if (edit !== true) {
        //check if all json are available
        $.ajax({
            type: 'POST',
            url: 'assets/scandir.php',
            success: function(data) {
                    //once it is done
                    if (data !== false) {
                        status(1);
                        //get a list of the json file selected//
                        var match = false;
                        $('#content a img').click(function() {
                            if (edit !== false) {
                                var elem = $(this).attr(
                                    "src").filename();
                                var elem_json = elem +
                                    '_info.json';
                                for (var m = 0; m <=
                                    elem_json_arr.length; m++
                                ) {
                                    if (elem_json_arr[m] ==
                                        elem_json) {
                                        match = true;
                                        break;
                                    } else if (
                                        elem_json_arr[m] !=
                                        elem_json) {
                                        match = false;
                                    }
                                }
                                //on reclick erase elem //
                                if (match === false) {
                                    elem_json_arr.push(
                                        elem_json);
                                    selected_css(this);
                                } else if (match ===
                                    true) {
                                    elem_json_arr.splice(
                                        $.inArray(
                                            elem_json,
                                            elem_json_arr
                                        ), 1);
                                    unselected_css(this);
                                }
                            }
                        });
                    } //end != false
                } //end data success scandir
        }); // end ajax scandir.php
    } else {
        status(0);
    }
}); // end click function
//on enterkey press send the array to the php file
$('body').keypress(function(e) {
    if (e.keyCode === 13 && elem_json_arr.length !== 0 && edit === true) {
        //convert array to json
        var jsonArray = JSON.stringify(elem_json_arr);
        //post data
        var dataToPost = {
            'jsonArray': jsonArray
        };
        //sendind information the php page
        $.ajax({
            type: 'POST',
            url: 'assets/push_json.php',
            data: dataToPost,
            success: function(data) {
                //response is now an object!
                console.log(data);
            }
        });
        unselected_css('*');
        elem_json_arr = [];
        //refresh the page
        location.reload();
    }
    //erase data and quit mode on esc
    if (e.keyCode === 27 && edit === true) {
        status(0);
        elem_json_arr = [];
        unselected_css('*');
    }
    //quit the view mode
    if (e.keyCode === 27 && edit !== true) {
        highlightMode = false;
        n = 1;
        hideShowName();
        $("body").css("overflow", "initial");
        $(".thumbs_container").empty();
        $("#highlight").hide();
        $("#links").show();
        $("#content img").css({
            "opacity": "1",
            "filter": "none",
            "-webkit-filter": "grayscale(0)"
        });
    }
});
//retrieve file name //
String.prototype.filename = function(extension) {
    var s = this.replace(/\\/g, '/');
    s = s.substring(s.lastIndexOf('/') + 1);
    return extension ? s.replace(/[?#].+$/, '') : s.split('.')[0];
}

function selected_css(e) {
    $(e).css('opacity', '0.4');
}

function unselected_css(e) {
    $(e).css('opacity', '1');
}

function status(c) {
    if (c === 1) {
        edit = true;
        console.log(edit)
        $("body").css('background', 'rgb(175, 193, 201)');
        $(".editActive").slideToggle(500).delay(1000).fadeOut(2000);
    }
    if (c === 0) {
        edit = false;
        console.log(edit)
        $("body").css('background', 'white');
    }
}

function HasScroll(c) {
    var _elm = $(c)[0];
    var _hasScrollBar = false;
    if ((_elm.clientHeight < _elm.scrollHeight) || (_elm.clientWidth < _elm
        .scrollWidth)) {
        _hasScrollBar = true;
    }
    return _hasScrollBar;
}

function dateFormat(c) {
    var monthNames = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"
    ];
    var date = new Date(c * 1000);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return '<span class="date">' + day + ' ' + monthNames[monthIndex] + ' ' +
        year + '</span><br /><span class="time">' + hour + '&nbsp;:&nbsp;' +
        min + '&nbsp;:&nbsp;' + sec;
}
var n = 0;

function hideShowName() {
    if (n === 0 && edit !== true && highlightMode !== true) {
        $('h3').show();
        $('#hideShowName').html("hide names");
        n = 1;
    } else if (n >= 1) {
        $('h3').hide();
        $('#hideShowName').html("display names");
        n = 0;
    } else if (n === 0 && edit !== true && highlightMode !== false) {
        $('#highlight h3').show();
        $('#hideShowName').html("hide names");
        n = 1;
    }
}
