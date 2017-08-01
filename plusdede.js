var thepiratebay="https://thepiratebay.cr/search/";
function edit(){
	if (window.location.href.indexOf("aporte") > -1){
		var visitar=document.getElementsByClassName("visit-buttons")[0];
		if (existeix(visitar)){
			var visitar_a=visitar.getElementsByTagName("a")[0];
			if (existeix(visitar_a)){
				window.location.replace(visitar_a.href);
			}
		}else{//viewepisode
			var prev=document.getElementsByClassName("modal-from-modal")[0];
			if (existeix(prev)){
				prev.setAttribute('href',prev.getAttribute('data-href'));
			}
			var next=document.getElementsByClassName("modal-from-modal")[1];
			if (existeix(next)){
				next.setAttribute('href',next.getAttribute('data-href'));
			}
		}
	}
	if (window.location.href.indexOf("pelis/pending") > -1){
		var links=document.getElementsByClassName("directLink");
		var pelis=document.getElementsByClassName("media-container");
		var p_size=pelis.length;
		if (links.length<p_size){
			for (var i=0;i<p_size;i++){
				var peli=pelis[i];
				var p_=peli.getElementsByClassName("media-dropdown mini dropdown model")[0];
				if (existeix(p_)){
					var p_link="/aportes/4/"+p_.getAttribute("data-id");
					addDirectLink(p_link,peli);
				}
			}
		}
	}
	var ul_title=document.getElementsByClassName("navbar-nav")[0];
	if (existeix(ul_title)){
		var li_title=ul_title.getElementsByTagName("li")[3];
		if (existeix(li_title)){
			var a_title=li_title.getElementsByTagName("a")[0];
			if (existeix(a_title)){
				a_title.href="/pelis/pending";
			}
		}
	}
	getDirectLink();
	buttonDown();
}
function getDirectLink(){
	var logIn_page=document.getElementsByClassName("page-login")[0];
	if (!existeix(logIn_page) && (window.location.href.endsWith(".com/") || window.location.href.endsWith(".com"))){
		var links=document.getElementsByClassName("directLink");
		var series=document.getElementsByClassName("media-title");
		var s_size=series.length;
		if (links.length<s_size){
			for (var i=0;i<s_size;i++){
				var s_i=series[i];
				var s_text=s_i.innerHTML;
				var s_season=s_text.substring(0,s_text.indexOf("x"));//nº season
				var s_ep_str=s_text.replace(s_season+"x","");
				var s_space=s_ep_str.indexOf(" ");
				var s_ep=Number(s_ep_str.substr(0,s_space));//nº ep
				var s_ep2=String(s_ep);
				if (s_ep<10) s_ep2="0"+String(s_ep);
				var s_season2=String(s_season);
				if (s_season<10) s_season2=String("0"+s_season);
				var s_name=s_text.replace(s_season+"x"+s_ep2+" ","");//serie name
				var _pirates=document.getElementsByClassName("pirate");
				if (_pirates.length<s_size) addPirate(s_name+"%20s"+s_season2+"e"+s_ep2,document.getElementsByClassName("media-container")[i]);
				var full_name=s_name+s_season2+"x"+s_ep2;
				var link_=getCookie(full_name);
				if (link_===""){
					var s_parent=s_i.parentNode;
					var href_=s_parent.href;
					getLink(href_,full_name,s_season,s_ep);
				}
				if (link_!==""){
					var _pos=document.getElementsByClassName("media-container")[i];
					var _done=_pos.getElementsByClassName("directLink")[0];
					if (!existeix(_done)) addDirectLink("/aportes/8/"+link_,_pos);
				}
			}
		}
	}
}
function getLink(src_lk,full_name,s_season,s_ep){
	var id_="";
	$.ajax({
		url: src_lk,
		_name: full_name,
		ep_season: s_season,
		ep_ep: s_ep,
		success: function(data){
			chg_ep(data , this._name, this.ep_season, this.ep_ep);
			function chg_ep(data,_name,ep_season,ep_ep){
				var s_head=data.indexOf("season-header");
				data=data.substr(s_head,data.length-s_head);
				var s_start=data.indexOf("Temporada "+ep_season);
				data=data.substr(s_start,data.length-s_start);
				var ep_start=data.indexOf("num\\\">"+ep_ep);
				data=data.substr(0,ep_start);
				for (var i=1;i<Number(ep_ep);i++){
					data=data.replace("data-id","");
				}
				var data_id=data.indexOf("data-id");
				id_=data.substr(data_id+10,6);
				setCookie(_name,id_,2);//2 days
			}
		}
	});
}
function addDirectLink(link_,child){
	var done=child.getElementsByClassName("directLink");
	if (!existeix(done)){
		var a_link=document.createElement("a");
		var a_i_link=document.createElement("i");
		a_i_link.className="fa fa-external-link";
		a_link.appendChild(a_i_link);
		a_link.setAttribute('href',link_);
		a_link.setAttribute('class','directLink');
		a_link.setAttribute('target','_blank');
		a_link.style.borderRadius="7px";
		a_link.style.fontSize="smaller";
		a_link.style.border="1px solid #ccc";
		a_link.style.color="#000";
		a_link.style.background="#fff";
		a_link.style.width="28px";
		a_link.style.padding="2px 0px 0px 2px";
		a_link.style.position="absolute";
		a_link.style.top="-3px";
		a_link.style.left="3px";
		a_link.style.zIndex="1";
		child.appendChild(a_link);
	}
}
function addPirate(nom,child){
	var a_Pirate=document.createElement("a");
	var img_P=document.createElement("img");
	img_P.src="https://rawgit.com/deli0s/js/master/tpb.png";
	a_Pirate.setAttribute('class','pirate');
	a_Pirate.style.position="absolute";
	a_Pirate.style.top="-3px";
	a_Pirate.style.left="35px";
	a_Pirate.style.zIndex="1";
	a_Pirate.appendChild(img_P);
	a_Pirate.setAttribute('target','_blank');
	a_Pirate.setAttribute('href',thepiratebay+nom.replace(/-/g,"%20"));
	child.insertBefore(a_Pirate,child.lastChild);
}
function buttonDown(){
	if (!existeix(document.getElementById("down"))){
        var go_down=document.createElement("a");
        go_down.id="down";
        go_down.style.right="5px";
        go_down.style.top="5px";
        go_down.style.width="30px";
        go_down.style.height="30px";
        go_down.style.cursor="pointer";
        go_down.style.transform="rotate(180deg)";
        go_down.style.border="1px solid #ddd";
        go_down.style.borderRadius="2px";
        go_down.style.position="fixed";
        go_down.style.background="#fff url('https://raw.githubusercontent.com/deli0s/js/master/arrow.png') -1px -1px";
        go_down.style.zIndex="999";
        go_down.onclick=function(){
			var x_0=document.getElementsByClassName("fa fa-eye-slash seen");
			var trobat=false;
			var size_0=x_0.length-1;
			while(size_0>0 && !trobat){
				trobat=(x_0[size_0].currentStyle ? x_0[size_0].currentStyle.display : getComputedStyle(x_0[size_0], null).display)==="inline-block";
				size_0--;
			}
			var offst=0;
			var elem=x_0[size_0];
			while(existeix(elem) && !isNaN( elem.offsetTop ) ){
			  offst +=elem.offsetTop;
			  elem=elem.offsetParent;
			}
			if (offst<=0) offst=947;
			$("html,body").animate({scrollTop: offst},
				"slow");
		};
		var topbar=document.getElementById("topbar");
		if (existeix(topbar)){
			topbar.appendChild(go_down);
		}
    }
}
function existeix(nom){
	return (nom!==undefined && nom!==null);
}
function deleteById(nom){
	var childAdv=document.getElementById(nom);
	if (existeix(childAdv)){
		var pareAdv=childAdv.parentNode;
		pareAdv.removeChild(childAdv);
	}
}
function deleteByClass(nom,num){
	var childClass=document.getElementsByClassName(nom)[num];
    if (existeix(childClass)){
        var pareClass=childClass.parentNode;
        pareClass.removeChild(childClass);
    }
}
function setCookie(cname, cvalue, exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i=0; i<ca.length; i++){
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
}
edit();
function reload(){
	try {
        edit();
    }catch(err) {
        console.log(err);
    }
}
document.body.onclick=reload;
document.body.addEventListener("wheel",reload);