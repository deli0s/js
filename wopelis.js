function linkAds(e){
	return (e.indexOf("wabxsybclllz")>-1 || e.indexOf("woombaa")>-1 || e.indexOf("jettags")>-1);
}

function edit(){
	//
	deleteClickAds();
	//CSS
	var sheet = window.document.styleSheets[0];
	sheet.insertRule('button:hover,input[type=submit]:hover,.dropdownContainer.blue:hover{background:#0a5bc2;}', sheet.cssRules.length);
	sheet.insertRule('@media (min-width: 580px) {div.link{ margin:0 5% 0 5%;}div.link{background-color:#e8e8e8;clear:both;width:80%;padding:10px;float:left;border:solid 1px #dcdcdc;max-width:1050px;min-width:365px}', sheet.cssRules.length);
	//
	if (window.location.href.indexOf("venlaces") > -1){
		deleteScreener();
		deleteUrlTester();
		//title
		var title_=document.getElementsByTagName("h1")[0];
		if (existeix(title_)){
			document.title=title_.innerHTML.replace("Viendo enlaces de: ","");
		}
	}
}//end edit

function deleteClickAds(){
	window.onmouseover=function(e) {
		var h=e.target;
		var trobador=false;
		while (existeix(h) && !trobador && h!==document.body){
			trobador=(existeix(h.href) && linkAds(h.href));
			if (!trobador)
				h=h.parentNode;
		}
		if (trobador){
			deleteMe(h);
		}
	};
}

function creaFolder(f,ttl,sub,f_txt){
    if (document.getElementsByClassName(f).length<=0){
    	var folder=document.createElement("div");
        folder.className=f;
    	folder.style.border="1px solid #ccc";
    	folder.style.backgroundColor="#eee";
    	folder.style.marginTop="5px";
    	var folder_title=document.createElement("div");
        folder_title.id=ttl;
    	folder_title.style.padding="10px";
    	folder_title.style.cursor="pointer";
        folder.appendChild(folder_title);
    	var i_folder=document.createElement("img");
		i_folder.src="https://rawgit.com/deli0s/js/master/folder.png";
        folder_title.appendChild(i_folder);
        var txt_Folder = document.createTextNode(f_txt);
        folder_title.appendChild(txt_Folder);
        var subFolder=document.createElement("div");
        subFolder.id=sub;
        subFolder.style.display="none";
    	subFolder.style.borderTop="1px dotted #ccc";
    	subFolder.style.paddingTop="10px";
    	subFolder.style.paddingBottom="10px";
    	subFolder.style.paddingRight="10px";
        folder.appendChild(subFolder);
    	var ls_lk=document.getElementsByTagName("h1")[1];
    	if (existeix(ls_lk)){
    	    ls_lk.appendChild(folder);
        	document.getElementById(ttl).onclick=function(){
        	    if (document.getElementById(sub).style.display==="block"){
                	document.getElementById(sub).style.display="none";
                }else{
                	document.getElementById(sub).style.display="block";
                }
        	};//function hide
    	}
    }
}

function deleteScreener(){
    creaFolder("folder","folder_title","folder_scr"," Screener (0)");
    creaFolder("folder_lat","folder_title_lat","folder_lat"," LAT (0)");
    
	document.getElementsByTagName("h1")[1].style.marginTop="-50px";
	
    var scr_hide=0,scr_non=0;
    var lat=0;
    
    var x_link2=document.getElementsByClassName("enlaces");
    var size_link2=x_link2.length;
    for (var i_link2=0; i_link2<size_link2; i_link2++){
        var child_link2=x_link2[i_link2];
        if (existeix(child_link2)){
        	var quality=child_link2.getElementsByTagName('span')[0].innerHTML;
        	if (quality.indexOf("Screener")===-1){
        	    scr_non++;
				var report_=child_link2.getElementsByTagName('span')[5];
				if (existeix(report_)){
					var report=Number(report_.innerHTML);
					if (report>=2){
						var pare_link2=child_link2;
						pare_link2.innerHTML="<a style=' color: maroon; font-weight: bolder;' title='"+report+"'> Esborrat </a>";
						i_link2--;
					}else{
						if (child_link2.getElementsByTagName("img")[1].src.indexOf("arg")>-1){
							//var pare_lat=child_link2;
							if ((scr_hide+scr_non)<size_link2){
								//var cln_lat = pare_lat.cloneNode(true);
								var cln_lat = child_link2.cloneNode(true);
								cln_lat.className="link";
								document.getElementById("folder_lat").appendChild(cln_lat);
								lat++;
							}
							//pare_lat.innerHTML="";
							deleteMe(child_link2);
							i_link2--;
						}
					}
				}
        	}else{
        	    //var pare_link3=child_link2;
        	    if ((scr_hide+scr_non)<size_link2){
        	        //var cln = pare_link3.cloneNode(true);
        	        var cln = child_link2.cloneNode(true);
                    cln.className="link";
                    document.getElementById("folder_scr").appendChild(cln);
                    scr_hide++;
        	    }
        		//pare_link3.innerHTML="";
				deleteMe(child_link2);
        		i_link2--;
        	}
        }
    }
    if (scr_hide>0){//num hide
        document.getElementById("folder_title").innerHTML=document.getElementById("folder_title").innerHTML.replace("(0)","("+scr_hide+")");
    }
    if (lat>0){
        document.getElementById("folder_title_lat").innerHTML=document.getElementById("folder_title_lat").innerHTML.replace("(0)","("+lat+")");
    }
}
function deleteUrlTester(){
	var urlTester=document.getElementsByTagName("a")[6];
	if (existeix(urlTester)){
		if (urlTester.innerHTML.indexOf("urltester")>-1){
			deleteMe(urlTester.parentNode);
		}
	}
}
function deleteById(nom){
	var childAdv=document.getElementById(nom);
	if (existeix(childAdv)){
		var pareAdv=childAdv.parentNode;
		pareAdv.removeChild(childAdv);
	}
}
function deleteMe(child){
    if (existeix(child)){
        var pareC=child.parentNode;
        pareC.removeChild(child);
    }
}
function deleteByClass(nom,num){
	var childClass=document.getElementsByClassName(nom)[num];
    if (existeix(childClass)){
        var pareClass=childClass.parentNode;
        pareClass.removeChild(childClass);
    }
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