var thepiratebay="https://thepiratebay.cr/search/";
function edit(){
	if (window.location.href.indexOf("aporte")>-1){
		var visitar=document.getElementsByClassName("visit-buttons")[0];
		if (existeix(visitar)){
			var visitar_a=visitar.getElementsByTagName("a")[0];
			if (existeix(visitar_a)){
				window.location.replace(visitar_a.href);
			}
		}else{//viewepisode
			addFilters(0);
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
	var hosts=document.getElementsByTagName("h4")[1];
	if (existeix(hosts)){
		if (hosts.innerHTML.indexOf("hosts")>-1){
			addFilters(1);
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
					addDirectLink(p_link,peli,0);
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
		var my_file_small=document.getElementsByClassName("my-file-small")[0];
		if (existeix(my_file_small)){
			my_file_small.style.border="none";
		}
	}
	var logIn_page=document.getElementsByClassName("page-login")[0];
	if (!existeix(logIn_page)){
		if ((window.location.href.endsWith(".com/") || window.location.href.endsWith(".com"))){
			getDirectLink();
			moveCalendar();
		}else{
			buttonDown();
		}
	}
}
function filter(){
	_names=["eng","esp","eng_sub","esp_sub","c","o","m","other"];
	var filters=document.getElementById("filters");
	if (existeix(filters)){
		var i;
		i=0;var eng=document.getElementById(_names[i]).checked;
		i++;var esp=document.getElementById(_names[i]).checked;
		i++;var eng_sub=document.getElementById(_names[i]).checked;
		i++;var esp_sub=document.getElementById(_names[i]).checked;
		i++;var c=document.getElementById(_names[i]).checked;
		i++;var o=document.getElementById(_names[i]).checked;
		i++;var m=document.getElementById(_names[i]).checked;
		i++;var other=document.getElementById(_names[i]).checked;
		var aportes=document.getElementsByClassName("aporte");
		var aportes_l=aportes.length;
		for (var a_i=0;a_i<aportes_l;a_i++){
			var aporte=aportes[a_i];
			var host=aporte.getElementsByTagName("img")[0].src;
			if ((host.indexOf("streamcloud")>-1 && c) || (host.indexOf("openload")>-1 && o) || (host.indexOf("streamango")>-1 && m))
				aporte.style.display="block";
			else{
				if (other){
					if ((host.indexOf("streamcloud")===-1) && (host.indexOf("openload")===-1) && (host.indexOf("streamango")===-1))
						aporte.style.display="block";
					else
						aporte.style.display="none";
				}else
					aporte.style.display="none";
			}
			if (aporte.style.display==="block"){
				var lang=aporte.getElementsByTagName("img")[1].src;
				if ((lang.indexOf("eng")>-1 && eng) || (lang.indexOf("spa")>-1 && esp))
					aporte.style.display="block";
				else
					aporte.style.display="none";
			}
			if (aporte.style.display==="block"){
				var has_sub=aporte.getElementsByClassName("sub")[0];
				if (existeix(has_sub)){
					var sub=aporte.getElementsByTagName("img")[2].src;
					if ((sub.indexOf("eng")>-1 && eng_sub) || (sub.indexOf("spa")>-1 && esp_sub))
						aporte.style.display="block";
					else
						aporte.style.display="none";
				}
			}
		}
	}
}
function addFilters(h4_n){
	var h4=document.getElementsByTagName("h4")[h4_n];
	var filters=document.getElementById("filters");
	if (!existeix(filters) && existeix(h4)){
		var width="310px";
		var div_f=document.createElement("div");
		div_f.id="filters";
		var div_i_f=document.createElement("i");
		div_i_f.className="fa fa-filter";
		div_f.style.fontSize="x-small";
		div_i_f.style.fontSize="medium";
		div_f.style.color="#333";
		div_f.appendChild(div_i_f);
		div_f.innerHTML+=": ";
		var div_img=document.createElement("img");
		div_img.src="https://cdn1.plusdede.com/images/flags/english.png";
		div_img.style.width="25px";
		div_img.style.marginLeft="15px";
		div_f.appendChild(div_img);
		div_f.innerHTML+=" ";
		var div_img2=document.createElement("img");
		div_img2.src="https://cdn1.plusdede.com/images/flags/spanish.png";
		div_img2.style.width="25px";
		div_f.appendChild(div_img2);
		div_f.innerHTML+=" ";
		var div_img3=document.createElement("img");
		div_img3.src="https://cdn1.plusdede.com/images/flags/english.png";
		div_img3.style.width="25px";
		div_img3.style.marginLeft="25px";
		div_f.appendChild(div_img3);
		div_f.innerHTML+=" ";
		var div_img4=document.createElement("img");
		div_img4.src="https://cdn1.plusdede.com/images/flags/spanish.png";
		div_img4.style.width="25px";
		div_f.appendChild(div_img4);
		div_img4.style.marginRight="20px";
		div_f.innerHTML+="Cloud Open Mang Other";
		div_f.style.position="absolute";
		div_f.style.marginTop="-35px";
		div_f.style.marginLeft="250px";
		h4.appendChild(div_f);
		var div_2=document.createElement("div");
		div_2.style.position="absolute";
		div_2.style.marginTop="-15px";
		div_2.style.marginLeft="251px";
		var in_f=document.createElement("input");
		in_f.type="checkbox";
		in_f.style.marginRight="23px";
		in_f.id="filter_checkbox";
		in_f.checked=true;
		in_f.onclick=function(){
			_names=["eng","esp","eng_sub","esp_sub","c","o","m","other"];
			for (var i=0;i<8;i++){
				var in_=document.getElementById(_names[i]);
				in_.checked=(in_f.checked);
			}
			filter();
		};
		div_2.appendChild(in_f);
		_names=["eng","esp","eng_sub","esp_sub","c","o","m","other"];
		for (var i=0;i<8;i++){
			var in_0=document.createElement("input");
			in_0.type="checkbox";
			in_0.style.marginRight=String(15+27*(i===1)+15*(i===3))+"px";
			in_0.id=_names[i];
			in_0.checked=true;
			in_0.onclick=function(){
				filter();
			};
			div_2.appendChild(in_0);
		}
		h4.appendChild(div_2);
	}
}
function getDirectLink(){
	var links=document.getElementsByClassName("directLink");
	var series=document.getElementsByClassName("media-title");
	var s_size=series.length;
	if (links.length<s_size){
		for (var i=0;i<s_size;i++){
			var s_i=series[i];
			var s_text=s_i.innerHTML;
			var _pirates=document.getElementsByClassName("pirate");
			if (_pirates.length<s_size) addPirate(s_text,document.getElementsByClassName("media-container")[i]);
			var _pos=document.getElementsByClassName("media-container")[i];
			var s_parent=s_i.parentNode;
			var href_=s_parent.href;
			linkDirect(s_text,_pos,href_,0);
		}
	}
}
function setDirectLink(link_,_pos,type){
	if (link_!==""){
		var _done=_pos.getElementsByClassName("directLink")[0];
		if (!existeix(_done)) addDirectLink("/aportes/8/"+link_,_pos,type);
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
				for (var i=1;i<ep_ep;i++){
					data=data.replace("data-id","");
				}
				var data_id=data.indexOf("data-id");
				id_=data.substr(data_id+10,6);
				setCookie(_name,id_,2);//2 days
			}
		}
	});
}
function addDirectLink(link_,child,type){
	var done=child.getElementsByClassName("directLink")[0];
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
		a_link.style.padding="2px 0px 0px 2px";
		a_link.style.position="absolute";
		if (type==0){
			a_link.style.top="-3px";
			a_link.style.left="3px";
			a_link.style.width="28px";
		}else{
			a_link.style.right="3px";
			a_link.style.width="14px";
		}
		a_link.style.zIndex="1";
		child.appendChild(a_link);
	}
}
function addPirate(txt,child){
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
	var link_=makePirateLink(txt);
	a_Pirate.setAttribute('href',link_);
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
function toggleCalendar(display){
	var row=document.getElementsByClassName("cal-row-fluid cal-before-eventlist");
	var row_size=row.length;
	var i=0;
	var trobat=false;
	while (i<row_size && !trobat){
		var today=row[i].getElementsByClassName("cal-day-today")[0];
		trobat=existeix(today);
		if (!trobat){
			row[i].style.display=display;
		}
		i++;
	}
}
function hideCalendar(){
	var _toggleCalendar=document.getElementById("_toggleCalendar");
	if (!existeix(_toggleCalendar)){
		toggleCalendar("none");
		var title=document.getElementsByClassName("calendar-title pull-left")[0];
		var in_cal=document.createElement("input");
		in_cal.type="checkbox";
		in_cal.id="_toggleCalendar";
		in_cal.style.marginLeft="15px";
		in_cal.checked=true;
		in_cal.onclick=function(){
			if (in_cal.checked){
				toggleCalendar("none");
			}else{
				toggleCalendar("block");
			}
		};
		title.appendChild(in_cal);
	}
}
function moveCalendar(){
	var childs=document.getElementsByClassName("content")[0];
	if (existeix(childs)){
		var mini_title=childs.getElementsByClassName("mini-title")[0];
		if (existeix(mini_title)){
			hideCalendar();
			newColors();
			linksToday();
			var mini_title_mT=mini_title.style.marginTop;
			if (mini_title_mT!=="-5px"){
				mini_title.style.marginTop="-5px";
				var calendar_title=childs.getElementsByClassName("calendar-title pull-left")[0];
				if (existeix(calendar_title)){
					calendar_title.style.marginTop="-5px";
				}
				var calendar_buttons=childs.getElementsByClassName("calendar-buttons pull-right")[0];
				if (existeix(calendar_buttons)){
					calendar_buttons.style.marginTop="-5px";
				}
				var calendar_view=childs.getElementsByClassName("view-all-link")[0];
				if (existeix(calendar_view)){
					calendar_view.style.marginTop="-5px";
				}
				var l_childs=childs.childNodes.length;
				for (var i_cal=1;i_cal<l_childs;i_cal+=2){
					var _node=childs.childNodes[i_cal];
					if (existeix(_node)){
						var className=_node.className;
						if (existeix(className)){
							var class_mT=_node.style.marginTop;
							if (className.indexOf("calendar")===-1 && (className!=="view-all-link" || (className=="view-all-link" && class_mT!=="-5px")) && (className!=="mini-title" || (className=="mini-title" && class_mT!=="-5px")) && className!=="cal-context" && className!=="pending-list media-container-all"){
								deleteMe(_node);
								i_cal--;
							}
						}
					}
				}
			}
		}
	}
}
function checkName(name){
	var _coloritos = ["fff","#154889","#B42041","#D9C022","#3e753b","#2BA5CF","#1D1F2A","#8A5A83","#701f29","#CCC58F","#e28a07","#992572","#AF8A54","#003399","#ada776","#79644a","#BE4E20","#C63927","#954527","#402225","#b37275","#933D50","#D15B8F","#83639D","#6B6880","#384C70","#2B2C7C","#2A3756","#313C48","#21888F","#0B4151","#07737A","#2F2A5A","#28713E","#4B573E","#35382E","#009999","#4E5451","#91969A","#534e46","#888175","#8F4E35","#6F4A2F","#a9783d","#6F4F28","#4a210b","#49392D","#633A34","#4C2F26","#44322D","#3F3A3A","#A65E2F","#443022","#79553C","#5e4a3b","#755C49","#cc6600","#c4ada1","#763C28","#d8a08d","#821717","#00cc99"];
	var _series = ["Doctor Who (2005)","The Flash (2014)","The Simpsons","Arrow","The Tick (2016)","Black Mirror","Rick and Morty","Marvel's Daredevil","Travelers (2016)","The Ministry of Time","The Gifted","Marvel's Runaways","Marvel's Inhumans","The Guest Book","Big Mouth","Young Sheldon","Jeff &amp; Some Aliens","Riverdale","Marvel's Cloak &amp; Dagger","The Punisher (2017)","The Orville","Star vs. the Forces of Evil","Milo Murphy's Law","Dimension 404","Marvel's Iron Fist","Legion","Santa Clarita Diet","Dirk Gently's Holistic Detective Agency","Timeless (2016)","Marvel's The Defenders","A Series of Unfortunate Events","Stranger Things","Marvel's Luke Cage","Westworld","DC's Legends of Tomorrow","Supergirl","Stitchers","Blindspot","Fear the Walking Dead","Killjoys","Mr. Robot","Dark Matter","Humans","One-Punch Man","Marvel's Jessica Jones","iZombie","The Last Man on Earth","12 Monkeys","Z Nation","Gotham","Silicon Valley","The 100","Brooklyn Nine-Nine","Attack on Titan","Marvel's Agents of S.H.I.E.L.D.","Bob's Burgers","Shameless (US)","Family Guy","The Big Bang Theory","The Walking Dead","South Park","American Dad!"];
	return _coloritos[_series.indexOf(name)+1];
}
function linksToday(){
	var today=document.getElementsByClassName("cal-day-today")[0];
	if (existeix(today)){
		var today_s=today.getElementsByTagName("span")[0];
		if (existeix(today_s)){
			var today_p=today_s.getElementsByTagName("a")[0];
			if (!existeix(today_p)){
				addDayLinks(today);
				var today_n=Number(today_s.innerHTML);
				var tomorrow=document.getElementsByClassName("cal-day-inmonth")[today_n];
				if (existeix(tomorrow)){
					addDayLinks(tomorrow);
				}
			}
		}
	}
}
function linkDirect(s_text,_pos,href_,type){
	var splited=splitEp(s_text);
	var s_name=splited[0];
	var s_season_n=splited[1];
	var s_ep_n=splited[2];
	var s_season=String(s_season_n);
	var s_ep=((s_ep_n<10)?"0":"")+String(s_ep_n);
	var full_name=s_name+s_season+"x"+s_ep;
	var link_=getCookie(full_name);
	if (link_===""){
		getLink(href_,full_name,s_season,s_ep_n);
		setTimeout(function(){ setDirectLink(getCookie(full_name),_pos,type); }, 1500);
	}
	setDirectLink(link_,_pos,type);
}
function addDayLinks(day){
	var today_s=day.getElementsByTagName("span")[0];
	var today_a=day.getElementsByClassName("episode ellipsis");
	for (var i_a=0;i_a<today_a.length;i_a++){
		var _serie=today_a[i_a];
		var _serie_nom=_serie.innerHTML;
		var real_link=today_a[i_a].dataset.real_link;
		if (!existeix(real_link)){
			real_link=today_a[i_a].href;
			today_a[i_a].dataset.real_link=real_link;
		}
		linkDirect(_serie_nom,_serie,real_link,1);
		var link_=makePirateLink(_serie_nom);
		today_a[i_a].setAttribute('target','_blank');
		today_a[i_a].href=link_;
	}
}
function makePirateLink(txt){
	var splited=splitEp(txt);
	var s_name=splited[0];
	var s_season_n=splited[1];
	var s_ep_n=splited[2];
	var s_season=((s_season_n<10)?"0":"")+String(s_season_n);
	var s_ep=((s_ep_n<10)?"0":"")+String(s_ep_n);
	var nom=s_name+"%20s"+s_season+"e"+s_ep;
	var link_s0=nom.replace(/'s/g,"s");
	var link_s=link_s0.replace(/\./g,"%20");
	var link_=thepiratebay+link_s.replace(/-/g,"%20")+"/0/7/208";
	return link_;
}
function splitEp(txt){
	var s_text=txt;
	var s_match_arr=s_text.match(/[0-9]*x[0-9]*/);
	if (!existeix(s_match_arr)) 	return error=["error","error","error"];
	var s_match=s_match_arr[0];
	var s_season=s_match.split("x")[0];//nº season
	var s_season_n=Number(s_season);
	var s_ep_str=s_match.split("x")[1];
	var s_ep_n=Number(s_ep_str);//nº ep
	var s_ep=((s_ep_n<10)?"0":"")+String(s_ep_n);
	var s_name0=s_text.replace(s_season+"x"+s_ep+" ","");
	var s_name=s_name0.replace(" "+s_season+"x"+s_ep,"");//serie name
	var _splited=[s_name,s_season_n,s_ep_n];
	return _splited;
}
function newColors(){
	var _epis=document.getElementsByClassName("episode ellipsis");
	for (var _iep=0;_iep<_epis.length;_iep++){
		var _ep=_epis[_iep];
		var name=_ep.innerHTML.replace(/ [0-9]*x[0-9]*/, '');
		var code=checkName(name);
		_ep.style.backgroundColor=code;
	}
}
function deleteMe(child){
    if (existeix(child)){
        var pareC=child.parentNode;
        pareC.removeChild(child);
    }
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
function cout(txt){
	console.log(txt);
}
edit();
setTimeout(function(){ edit(); }, 250);
function reload(){
	try{
        edit();
    }catch(err){
        console.log(err);
    }
}
document.onload=reload;
document.body.onclick=reload;
document.body.addEventListener("wheel",reload);
