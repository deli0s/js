function edit(){
	if (window.location.href.includes("title")){
		let Button = document.querySelector('.ipc-page-section button');
		if (Button){
			let TitleText = document.getElementsByTagName("h1")[0];
			
			if (TitleText){
				let title = TitleText.innerText;
				addFilmaffinity(title, Button);
				addSonarr(title, Button);
				addJustwatch(title, Button);
			}
			
			let url = window.location.href;
			if (url){
				let l = url.replace("https://www.imdb.com/title/", "");
				if (l){
					let imdb_id = l.split("/")[0];
					if (imdb_id){
						addRadarr(imdb_id, Button);
					}
				}
			}
			
			let btn_pro_div = Button.parentElement;
			if (btn_pro_div) {
				let btn_pro = btn_pro_div.getElementsByTagName('div')[0];
				if (btn_pro) {
					btn_pro.style.display = "none";
				}
			}
		}
	}
	if (window.location.href.includes("releaseinfo")){
		var dates_table=document.getElementById("release_dates");
		if (existeix(dates_table)){
			var dates=dates_table.getElementsByTagName("tr");
			var dates_size=dates.length;
			var dates_i=0;
			var trobats=0;
			while (dates_i<dates_size && trobats<6){
				var dates_tr=dates[dates_i];
				var dates_a=dates_tr.getElementsByTagName("a")[0];
				if (existeix(dates_a)){
					var dates_inner=dates_a.innerHTML;
					if (dates_inner.includes("USA") || dates_inner.includes("Spain")){
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

function addBtn(href,child_peli,id,src){
	let el = document.getElementById(id);
	if (!el){
		var a=document.createElement("a");
		var img=document.createElement("img");
		img.src=src;
		img.style.textDecoration="none";
		img.style.width="19px";
		a.style.textDecoration="none";
		a.style.padding="0";
		a.style.margin="3px";
		a.style.marginTop="0px";
		a.style.zIndex="1";
		a.style.display="inline-block";
		a.setAttribute("id", id);
		a.setAttribute('target','_blank');
		a.appendChild(img);
		a.setAttribute('href',href);
		let peli_parent = child_peli.parentNode;
		peli_parent.insertBefore(a, child_peli);
	}
}
function addFilmaffinity(nom,child_peli){
	let id = "filmaffinity";
	let src = "http://www.filmaffinity.com/favicon.png";
	let href = "http://www.filmaffinity.com/es/search.php?stext=" + nom.replace(/ /g,"+") + "&stype=title";
	addBtn(href,child_peli,id,src);
}
function addRadarr(imdb_id,child_peli){
	let id = "radarr";
	let src = "https://radarr.video/img/favicon.ico";
	let href = "http://localhost:7878/add/new?term=imdb%3A" + imdb_id;
	addBtn(href,child_peli,id,src);
}
function addSonarr(nom,child_peli){
	let id = "sonarr";
	let src = "https://sonarr.tv/img/favicon.ico";
	let href = "http://localhost:8989/add/new?term=" + nom;
	addBtn(href,child_peli,id,src);
}
function addJustwatch(nom,child_peli){
	let id = "justwatch";
	let src = "https://www.justwatch.com/appassets/favicon.ico";
	let href = "https://www.justwatch.com/es/buscar?q=" + nom;
	addBtn(href,child_peli,id,src);
}
function existeix(nom){
	return (nom!==undefined && nom!==null);
}
function actors(){
	if (window.location.href.includes("ls021034864")){
		var filmosearch=document.getElementsByClassName("footer filmosearch")[0];
		if (existeix(filmosearch)){
			if (filmosearch.style.position!=="fixed"){
				if (!window.location.href.includes("mode=grid")){
					document.getElementsByClassName("global-sprite lister-mode grid")[0].click();
				}
				document.getElementById("main").style.width="96%";
				filmosearch.style.position="fixed";
				filmosearch.style.top="230px";
				filmosearch.style.backgroundColor="#f9f9f8";
				filmosearch.style.height="20px";
			}
			setTimeout(function(){
				if (window.pageYOffset == 0){
					filmosearch.style.top="230px";
				}else{
					if (window.pageYOffset >= 240){
						filmosearch.style.top="0px";
					}else{
						filmosearch.style.top=String(240-window.pageYOffset)+"px";
					}
				}
			}, 100);
		}
	}
}
edit();
function reload(){
	try {
        edit();
        actors();
    }catch(err) {
        // error
    }
}
document.body.onclick=reload;
document.body.addEventListener("wheel",reload);
