function log(up){
	var _up=up.split(':');
	var u=_up[0];
	var p=_up[1];
	document.getElementsByTagName("input")[0].value=u;
	document.getElementsByTagName("input")[1].value=p;
	document.getElementsByTagName("form")[0].submit();
}
function log_in(){
	if (window.location.href.indexOf("login") > -1){
		var kookie=getCookie("kookie");
		if (notNull(kookie)){
			var u_p=kookie.split(' ');
			var list2_=kookie.replace(u_p[0]+" ","");
			var list2=list2_.replace(u_p[0],"");
			setCookie("kookie",list2,1/(24*64));//1min
			log(u_p[0]);
		}
	}
}
function log2(list){
	setCookie("kookie",list,1/(24*64));//1min
	log_in();
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
function notNull(nom){
	if (!existeix(nom)) return false;
	return (nom!=="" && nom!=="null");
}
function existeix(nom){
	return (nom!==undefined && nom!==null);
}
log_in();
function unlock(){
	if (window.location.href.indexOf("login") > -1){
		var h1=document.getElementsByTagName("h1")[0];
		if (existeix(h1)){
			var key_log=document.getElementById("key_log");
			if (!existeix(key_log)){
				var key_link=document.createElement("a");
				key_link.id="key_log";
				key_link.innerHTML="🔑";
				key_link.style.textDecoration="none";
				key_link.style.cursor="pointer";
				key_link.style.marginLeft="7px";
				key_link.style.color="#000";
				key_link.style.fontSize="smaller";
				key_link.style.display="inline-block";
				key_link.onclick=function(){
					var list=prompt("List:","");
					log2(list);
				};
				h1.appendChild(key_link);
			}
		}
	}
}
unlock();
redeem();
function redeem(){
	if (window.location.href.indexOf("redeem") > -1){
		var h1=document.getElementsByClassName("btn-bar")[0];
		if (existeix(h1)){
			var key_log=document.getElementById("key_log");
			if (!existeix(key_log)){
				var key_link=document.createElement("a");
				key_link.id="key_log";
				key_link.innerHTML="🔑";
				key_link.style.textDecoration="none";
				key_link.style.cursor="pointer";
				key_link.style.marginLeft="7px";
				key_link.style.color="#000";
				key_link.style.fontSize="smaller";
				key_link.style.display="inline-block";
				key_link.onclick=function(){
					var list=prompt("List:","");
					redeem2(list);
				};
				h1.appendChild(key_link);
			}
		}
	}
}
redeem_in();
function redeem_in(){
	if (window.location.href.indexOf("redeem") > -1){
		var kookie=getCookie("redeem");
		if (notNull(kookie)){
			var inputError=document.getElementsByClassName("inputError")[0];
			var isError=false;
			if (existeix(inputError)) isError=(inputError.innerHTML.indexOf("rror")>-1);
			if (isError){
				setTimeout(function(){ location.reload(); }, 2*3600*1000);//2h
			}else{
				var u_p=kookie.split(' ');
				var list2_=kookie.replace(u_p[0]+" ","");
				var list2=list2_.replace(u_p[0],"");
				setCookie("redeem",list2,1);//1d
				document.getElementById("id_code").value=u_p[0];
				document.getElementsByTagName("form")[0].submit();
			}
		}
	}
}
function redeem2(list){
	setCookie("redeem",list,1/(24*64));//1min
	redeem_in();
}
