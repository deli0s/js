var thepiratebay="https://thepiratebay.cr/search/";
function edit(){
	if (window.location.href.indexOf("title") > -1){
		var title_=document.getElementsByTagName("h1")[1];
		if (existeix(title_)){
			var originalTitle=document.getElementsByClassName("originalTitle")[0];
			var title2=title_.innerHTML.substr(0,title_.innerHTML.indexOf("&nbsp"));
			if (existeix(originalTitle)){
				var title=originalTitle.innerHTML.substr(0,originalTitle.innerHTML.indexOf("<span"));
			}else{
				var title=title2;
			}
			var child=document.getElementsByClassName("subtext")[0];
			if (existeix(child)){
				var global=document.getElementById("global");
				if (!existeix(global)){
					addFilmaffinity(title,child);
					addPordede(title,child);
					addWopelis(title2,child);
					addPirate(title,child);
				}
			}
		}
	}
	if (window.location.href.indexOf("releaseinfo") > -1){
		var dates_table=document.getElementById("release_dates");
		if (existeix(dates_table)){
			var dates=dates_table.getElementsByTagName("tr");
			var dates_size=dates.length;
			var dates_i=0;
			var trobats=0;
			while (dates_i<dates_size && trobats<2){
				var dates_tr=dates[dates_i];
				var dates_a=dates_tr.getElementsByTagName("a")[0];
				if (existeix(dates_a)){
					var dates_inner=dates_a.innerHTML;
					if (dates_inner.indexOf("USA")>-1 || dates_inner.indexOf("Spain")>-1){
						dates_a.style.color="#E7BE00";
						trobats++;
					}
				}
				dates_i++;
			}
		}
	}
	var watchlist=document.getElementsByClassName("watchlist")[0];
	if (existeix(watchlist)){
		var watchlist_a=watchlist.getElementsByTagName("a")[0];
		if (existeix(watchlist_a)){
			watchlist_a.style.fontWeight="bold";
			watchlist_a.href="/user/ur76483198/watchlist?sort=release_date%2Casc&view=detail";
		}
	}
}//end edit

function addPordede(nom,child_peli){
	var a_Pordede=document.createElement("a");
	var img_Por=document.createElement("img");
	img_Por.src="http://www.pordede.com/images/favicon.ico";
	img_Por.style.width="19px";
	img_Por.style.textDecoration="none";
	a_Pordede.id="global";
	a_Pordede.style.textDecoration="none";
	a_Pordede.style.padding="0";
	a_Pordede.style.margin="3px";
	a_Pordede.style.marginTop="0px";
	a_Pordede.style.zIndex="1";
	a_Pordede.style.display="inline-block";
	a_Pordede.setAttribute('target','_blank');
	a_Pordede.appendChild(img_Por);
	a_Pordede.setAttribute('href',"http://www.pordede.com/search/"+nom.replace(/ /g,"-"));
	child_peli.appendChild(a_Pordede);
}
function addWopelis(nom,child_peli){
	var a_Wopelis=document.createElement("a");
	var img_W=document.createElement("img");
	img_W.src="http://www.wopelis.com/favicon.ico";
	img_W.style.width="19px";
	img_W.style.textDecoration="none";
	a_Wopelis.style.textDecoration="none";
	a_Wopelis.style.padding="0";
	a_Wopelis.style.margin="3px";
	a_Wopelis.style.marginTop="0px";
	a_Wopelis.style.zIndex="1";
	a_Wopelis.style.display="inline-block";
	a_Wopelis.setAttribute('target','_blank');
	a_Wopelis.appendChild(img_W);
	a_Wopelis.setAttribute('href',"http://www.wopelis.com/buscar.php?texto="+nom.replace(/ /g,"+"));
	child_peli.appendChild(a_Wopelis);
}
function addPirate(nom,child_peli){
	var a_Pirate=document.createElement("a");
	var img_P=document.createElement("img");
	img_P.src="https://rawgit.com/deli0s/js/master/tpb.png";
	img_P.style.width="19px";
	img_P.style.textDecoration="none";
	a_Pirate.style.textDecoration="none";
	a_Pirate.style.padding="0";
	a_Pirate.style.margin="3px";
	a_Pirate.style.marginTop="0px";
	a_Pirate.style.zIndex="1";
	a_Pirate.style.display="inline-block";
	a_Pirate.setAttribute('target','_blank');
	a_Pirate.appendChild(img_P);
	a_Pirate.setAttribute('href',thepiratebay+nom.replace(/ /g,"%20"));
	child_peli.appendChild(a_Pirate);
}
function addFilmaffinity(nom,child_peli){
	var a_FA=document.createElement("a");
	var img_FA=document.createElement("img");
	img_FA.src="http://www.filmaffinity.com/favicon.png";
	img_FA.style.textDecoration="none";
	img_FA.style.width="19px";
	a_FA.style.textDecoration="none";
	a_FA.style.padding="0";
	a_FA.style.margin="3px";
	a_FA.style.marginTop="0px";
	a_FA.style.zIndex="1";
	a_FA.style.display="inline-block";
	a_FA.setAttribute('target','_blank');
	a_FA.appendChild(img_FA);
	a_FA.setAttribute('href',"http://www.filmaffinity.com/es/search.php?stext="+nom.replace(/ /g,"+")+"&stype=title");
	child_peli.appendChild(a_FA);
}
function existeix(nom){
	return (nom!==undefined && nom!==null);
}
edit();
function reload(){
	try {
        edit();
    }catch(err) {
        // error
    }
}
document.body.onclick=reload;
document.body.addEventListener("wheel",reload);
