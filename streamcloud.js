if (window.location.href.indexOf("html")>-1){
	if (document.getElementsByClassName("orange msgboxinfo").length>0 || document.getElementsByTagName("title")[0].innerHTML.indexOf("502 Bad Gateway")>-1){
		borra();
		setTimeout(function (){
			location.reload();
		}, 10000);
	}
	function borra(){
		//delete every iframe element (adds reason)
		Array.prototype.slice.call(document.getElementsByTagName('iframe')).forEach(function(item) {
			item.parentNode.removeChild(item);
		});
		Array.prototype.slice.call(document.getElementsByTagName('a')).forEach(function(item) {
			item.parentNode.removeChild(item);
		});
		Array.prototype.slice.call(document.getElementsByTagName('style')).forEach(function(item) {
			item.parentNode.removeChild(item);
		});
		Array.prototype.slice.call(document.getElementsByTagName('script')).forEach(function(item) {
			item.parentNode.removeChild(item);
		});
		//delete element (adds reason)
		var ad1=document.getElementById("divExoLayerWrapper");
		if (ad1!==null){
			ad1.innerHTML = '';
			ad1.style.zIndex = "-999";
		}
		var ad2=document.getElementById("ero-ads");
		if (ad2!==null){
			ad2.innerHTML = '';
			ad2.style.zIndex = "-999";
		}
		var ad3=document.getElementById("EroIMslider");
		if (ad3!==null){
			ad3.innerHTML = '';
			ad3.style.zIndex = "-999";
		}
	}
	if (document.getElementById("file")!==null){
		document.documentElement.innerHTML = '<p>El archivo que usted busca no pudo ser encontrado, perdone los inconvenientes</p>';
		window.onclick=function(){window.open(location, '_self', '');
		window.close();};

		var x = document.getElementsByTagName("script");
		var i;
		var size=x.length;
		for (i = 0; i <size; i++) {
			var child2= x[x.length-1];
			var pare2 = child2.parentNode;
			pare2.removeChild(child2);
		}
	}else{
		if (document.querySelector("form.proform")) {
			borra();
			setTimeout(function() {
				borra();
			}, 1000);
			setTimeout(function() {
				borra();
			}, 2000);
			setTimeout(function() {
				borra();
			}, 5000);
			//enter streaming site after 10 seconds automatically
			setTimeout(function() {
				document.querySelector("form.proform").submit();
			}, 10000);
		}else{
			var scriptElements = document.getElementsByTagName("script");
			for (var i = 0; i < scriptElements.length; i++) {
				//search the right script tag
				if (scriptElements[i].innerHTML.includes("mediaplayer")) {
					var string = scriptElements[i].text;
					//get video url
					var videoUrl = string.substr(string.indexOf("file: \"") + 7, (string.indexOf("/video.mp4") - string.indexOf("file: \"") + 3));
					//change location to the video url
					window.location = videoUrl;
				}
			}
		}
	}
}
