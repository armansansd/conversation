(function(){
	var markletFrame;
	var markletDiv;
	var markletStyle;
	if (!document.getElementById("conversation")) {
		start()
	}
	function start(){
		createFrame();
		createTarget();
    createStyle();
	}
	function getURL(msg){
    url = "http://localhost/conversation/plugin/toolkit.html";

    // url = baseUrl + encodeURIComponent(msg.url);
    // url += "?original_source_url=" + encodeURIComponent(msg.url);
    // url += "&original_source_title=" + encodeURIComponent(msg.title);

    return url;
  };

	function createFrame(){
    markletFrame = document.createElement("iframe");
    markletFrame.name = markletFrame.id = "toolkit_frame";
    markletFrame.src = getURL({
      url: window.location.href,
      title: window.document.title
    });
    document.body.appendChild(markletFrame)
  }

  function createTarget(){
    markletDiv = document.createElement("div");
    markletDiv.id = "toolkit_div";
    document.body.appendChild(markletDiv);
  }

  function createStyle(){
    markletStyle = document.createElement("style");
    markletStyle.type = "text/css";
    markletCSS = "#toolkit_frame,#toolkit_div{overflow:hidden;width:300px;height:420px;position:fixed;top:0px;right:0px;border:none}#toolkit_frame.is-expanded{height:670px}#toolkit_frame{z-index:9999999998;background:rgba(255,255,255,0.75);box-shadow: 3px 4px 10px rgba(0, 0, 0, .4);}#toolkit_frame:hover{background:rgba(255,255,255,0.9); box-shadow: 3px 4px 10px rgba(0, 0, 0, .5);}#toolkit_div{z-index:9999999999;display:none;opacity:0}";

    if (markletStyle.styleSheet) {
      markletStyle.styleSheet.cssText = markletCSS;
    } else {
      markletStyle.appendChild(document.createTextNode(markletCSS));
    }
    document.body.appendChild(markletStyle);
  }
})();

