var edit = false;
var highlight = false;
var infos = false;
var elem_json_arr = [];

/*enter edit mode*/


/*display infos of the files*/
function hideShowName() {
    if(highlight !== true){
        if(infos !== true){
            $('h3').show();
            $('#hideShowName').html("hide names");
            infos = !infos;
        }else{
            $('h3').hide();
            $('#hideShowName').html("display names");
            infos = !infos;
        }
    }else{
        if(infos !== true){
            $('#highlight h3').show();
            $('#hideShowName').html("hide names");
            infos = !infos;
        }else{
            $('#highlight h3').hide();
            $('#hideShowName').html("display names");
            infos = !infos;
        }
    }
};

/*css for the highlight box*/
function highlightCss(){
    if(highlight !== true){
        $("body").css("overflow", "scroll");
        $(".thumbs_container").empty();
        $("#highlight").hide();
        $("#links").show();
        $("#content img").css({
            "opacity"       : "1",
            "filter"        : "none",
            "-webkit-filter": "grayscale(0)"
        });
    }else{
        if (infos === true){
            hideShowName();
        }
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
            "filter": "grayscale(1)",
            "-webkit-filter": "grayscale(1)"
        });
        $("body").css("overflow", "hidden");
    };
};

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

//display the info box
function infoBox(c) {
    if (c === true) {
        $("body").css('background', 'rgb(175, 193, 201)');
        $(".editActive").slideToggle(500).delay(1000).fadeOut(2000);
    }
    if (c !== true) {
        $("body").css('background', 'white');
    }
}

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