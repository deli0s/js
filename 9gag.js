function edit(){
	var h2=document.getElementsByTagName("h2")[0];
	if (existeix(h2) && (window.location.href.endsWith(".com") || window.location.href.endsWith(".com/") || window.location.href.endsWith("hot"))){
		var link_=getCookie("TrashMe");
		if (link_===""){
			addTrash(h2);
		}
		if (link_!==""){
			deleteByTag("article",0);
		}
	}
}
function addTrash(child){
	var a_Trash=document.createElement("a");
	a_Trash.setAttribute('class','Trash');
	a_Trash.innerHTML="🗑️";
	a_Trash.style.cursor="pointer";
	a_Trash.style.fontSize="18px";
	a_Trash.onmouseover=function(){
		a_Trash.style.fontSize="20px";
	};
	a_Trash.onmouseout=function(){
		a_Trash.style.fontSize="18px";
	};
	a_Trash.onclick=function(){
		var id_="1";
		var article=document.getElementsByTagName("article")[0];
		if (existeix(article)){
			id_=article.getAttribute('data-entry-id');
		}
		setCookie("TrashMe",id_,0.5);//half day
		deleteByTag("article",0);
	};
	child.appendChild(a_Trash);
}
function existeix(nom){
	return (nom!==undefined && nom!==null);
}
function deleteByTag(nom,num){
	var childTag=document.getElementsByTagName(nom)[num];
    if (existeix(childTag)){
        var pareTag=childTag.parentNode;
        pareTag.removeChild(childTag);
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
