function edit(){
	if (window.location.href.indexOf("subscriptions") > -1){
		var video_str="ytd-grid-video-renderer";
		var videos=document.getElementsByTagName(video_str);
		if (existeix(videos)){
			var size_videos=videos.length;
			for (var i_video=0; i_video<size_videos; i_video++){
				var video=videos[i_video];
				if (existeix(video)){
					var watched=video.getElementsByClassName("ytd-thumbnail-overlay-resume-playback-renderer")[0];
					if (existeix(watched) || t_(video,"Late Motiv","Broncano,Berto,Romero,ignatius") || t_(video,"TERRAT","NADIE SABE NADA") || t_(video,"manga","Titan") || t_(video,"Oh! My LOL"," Moderna") || t_(video,"Jimmy Fallon","Hashtags,meme,nvent") || t_(video,"WIRED","Answer") || t_(video,"Sarinha","SPACE ASTRONOMY") || t_(video,"Pazos64","Cuidao Ahí") || t_(video,"Anochece","tonacho")){
						if (deleteByTag(video_str,i_video)) i_video--;
					}
				//console.log(i_video);
				}
			}
		}
	}
}

function t_(video,title_str,h3_array){//title
	var title_=video.getElementsByTagName("a")[2];
	var h3_=video.getElementsByTagName("h3")[0];
	var title_2=(title_.innerHTML.toLowerCase().indexOf(title_str.toLowerCase())>-1);
	if (!title_2) return false;
	var h3_spl=h3_array.split(",");
	if (h3_spl.length>1){
		var try_n=0;
		var trobat=false;
		do{
			trobat=(h3_.innerHTML.toLowerCase().indexOf(h3_spl[try_n].toLowerCase())>-1);
			try_n++;
		}while (!trobat && try_n<h3_spl.length)
		return (!trobat);
	}
	h3_str=h3_spl[0];
	var h3_2=(h3_.innerHTML.toLowerCase().indexOf(h3_str.toLowerCase())>-1);
	return (!h3_2);
}

function existeix(nom){
	return (nom!==undefined && nom!==null);
}

function deleteByTag(nom,num){
	var childClass=document.getElementsByTagName(nom)[num];
    if (existeix(childClass)){
        var pareClass=childClass.parentNode;
        pareClass.removeChild(childClass);
		return true;
    }
	return false;
}

edit();
function reload(){
	try {
        edit();
    }catch(err) {
        console.log("error");
    }
}
document.body.onclick=reload;
document.body.addEventListener("wheel",reload);
