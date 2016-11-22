function edit2(){
    if ($('[id^=up]').length==1){
        var divtest=document.createElement("div");
        divtest.style.top="0px";
        divtest.id="up";
        divtest.style.transform="rotate(180deg)";
        divtest.style.zIndex="999";
        divtest.onclick=function(){if (document.getElementsByClassName("profileSection clearfix commentsSection").length>0){var x_0=document.getElementsByClassName("seen");
    	var trobat=false;
    	var size_0=x_0.length-1;
    	while(size_0>0 && !trobat){
    		trobat=x_0[size_0].parentNode.className.indexOf("action active")>-1;
    		size_0--;
    	}
    	var offst=0;
    	var elem=x_0[size_0];
    	while(elem!==null &&  elem!==undefined && !isNaN( elem.offsetTop ) ){
          offst +=elem.offsetTop;
          elem=elem.offsetParent;
        }
    	if (offst<=0) offst=947;
    	$("html,body").animate({scrollTop: offst},
            "slow");}};
        document.getElementById("up").parentNode.appendChild(divtest);
    }
    //
    if (window.location.href.indexOf("pordede.com/aporte/") > -1){
        window.location.replace(document.getElementsByClassName("episodeText")[0]);
    }
    //
    if (window.location.href.indexOf("pordede.com/star/") > -1){
        document.getElementsByClassName("info listContainer listCovers")[0].style.maxHeight="9999px";
    }
    //
    if ((window.location.href.endsWith("pelis")) || (window.location.href.endsWith("pelis/")) || (window.location.href.endsWith("series/")) || (window.location.href.indexOf("pelis/index") > -1) || (window.location.href.endsWith("series")) || (window.location.href.indexOf("series/index") > -1)){
        borra();
        window.setTimeout(borra,1000);
        window.setTimeout(borra,2500);
        document.getElementById("stickyfooterWrapper").onclick=function(){borra();window.setTimeout(borra,1000);window.setTimeout(borra,2500);};
    }
    //
    if ((window.location.href.endsWith(".com/")) || (window.location.href.endsWith("index"))){
        deleteByClass("configMenu",0);
    	deleteByClass("actionsContainer",0);
        var child_title=document.getElementsByClassName("inline-subtitle");
        if (child_title!==null && child_title!==undefined && child_title.length===3){
            var calendar=document.getElementById("seriesCalendar");
            if (calendar!==undefined && calendar!==null) calendar.style.marginTop="10px";
            var x_box=document.getElementsByClassName("ddItemContainer modelContainer");
            var i_box;
            var size_box=x_box.length;
            for (i_box=0; i_box <size_box; i_box++){
                var child_box=x_box[x_box.length-1];
            	child_box.style.paddingTop="0px";
            }
            var ser=document.getElementsByClassName("listContainer listCovers inline clearfix")[0];
            ser.style.marginTop="-11px";
            ser.style.marginBottom="0px";
            var pare_title1=child_title[0].parentNode;
            pare_title1.removeChild(child_title[0]);
            pare_title1.style.paddingBottom="0px";
            pare_title1.style.paddingTop="0px";
            var pare_title2=child_title[0].parentNode;
            pare_title2.removeChild(child_title[0]);
            pare_title2.style.paddingBottom="0px";
            pare_title2.style.paddingTop="0px";
        }
    }
    document.getElementsByClassName("defaultLink onlyLogin")[1].href="/pelis/pending";
    //
    getLinks();
    deleteLinks();
    window.setTimeout(deleteLinks,100);
    window.setTimeout(deleteLinks,1000);
    window.setTimeout(deleteLinks,3500);
    window.setTimeout(deleteLinks,5000);
}//end edit2
function borra(){//ja estan pendents o vistes
    var all=document.getElementsByClassName("ddItemContainer modelContainer");
    var size=all.length;var i=size-1;
    while (i>=0){
        var child5=all[i].getElementsByClassName("dropdownContainer desplegableAbstract done")[0].getElementsByTagName("span")[0];
        if (!child5.children[0].classList.contains("icon-caret-down")){
            var pare5=all[i].parentNode;
    	    pare5.removeChild(all[i]);
        }
    	i--;
    }
}
function editData(nom,child_peli){
$.get("/links/view/slug/"+nom+"/what/peli", function(data){
//start html link
/*
var result=data.match(/video.{0,200}(Rip|Hd).{0,200}headphones/i);
if (/(youtube|LAT)/.test(result)){
*/
if (data.search(/video.{0,200}(Rip|Hd).{0,200}headphones/i)===-1){
	child_peli.style.opacity="0.5";
}
//end html link
});}
function addFilmaffinity(nom,child_peli){
	var a_FA=document.createElement("a");
	var img_FA=document.createElement("img");
	img_FA.src="http://www.filmaffinity.com/favicon.png";
	img_FA.style.width="19px";
	img_FA.style.textDecoration="none";
	a_FA.style.position="absolute";
	a_FA.style.textDecoration="none";
	a_FA.style.padding="0";
	a_FA.style.zIndex="1";
	a_FA.style.top="65px";
	a_FA.style.display="inline-block";
	a_FA.style.right="140px";
	a_FA.setAttribute('target','_blank');
	a_FA.appendChild(img_FA);
	a_FA.style.cursor="pointer";
	a_FA.setAttribute('href',"http://www.filmaffinity.com/es/search.php?stext="+nom.replace(/-/g,"+")+"&stype=title");
	child_peli.appendChild(a_FA);
}
function addIMDB(enlace,child_peli){
	var a_IMDB=document.createElement("a");
	var img_IMDB=document.createElement("img");
	img_IMDB.src="/images/sprites/imdb.png";
	img_IMDB.style.width="19px";
	img_IMDB.style.textDecoration="none";
	a_IMDB.appendChild(img_IMDB);
	a_IMDB.setAttribute('target','_blank');
	a_IMDB.style.position="absolute";
	a_IMDB.style.textDecoration="none";
	a_IMDB.style.padding="0";
	a_IMDB.style.zIndex="1";
	a_IMDB.style.top="40px";
	a_IMDB.style.display="inline-block";
	a_IMDB.style.cursor="pointer";
	a_IMDB.style.right="140px";
	var nom=enlace.replace("http://www.pordede.com","");
	$.get(nom, function( data ){
		var imdb_link=(data.match(/www.imdb.{22}/));
		if (imdb_link!==undefined && imdb_link!==null){
			a_IMDB.setAttribute('href',"http://www.imdb.com/title/"+imdb_link[0].slice(imdb_link[0].length-9,imdb_link[0].length)+"/fullcredits?ref_=tt_ql_1");
		}
	});
	child_peli.appendChild(a_IMDB);
}
function addLinks(nom,child_peli){
	var a_link=document.createElement("a");
	var linkText=document.createTextNode('<i class="icon-external-link"></i>');
	a_link.appendChild(linkText);
	a_link.setAttribute('href','/links/view/slug/'+nom+'/what/peli');
	a_link.setAttribute('class','linky-winky');
	a_link.setAttribute('target','_blank');
	a_link.style.right="130px";
	a_link.style.borderRadius="7px";
	a_link.style.fontSize="smaller";
	a_link.style.textDecoration="none";
	a_link.style.cursor="pointer";
	a_link.style.border="1px solid #ccc";
	a_link.style.color="#000";
	a_link.style.background="#fff";
	a_link.style.display="inline-block";
	a_link.style.padding="4px 2px 2px 4px";
	a_link.style.width="28px";
	a_link.style.top="18px";
	a_link.style.position="absolute";
	a_link.style.zIndex="1";
	child_peli.appendChild(a_link);
}
function getLinks(){
	if (window.location.href.indexOf("/pelis/pending")>-1){
    	var x_peli=document.getElementsByClassName("ddItemContainer modelContainer");
    	var size_peli=x_peli.length;
    	if (document.getElementsByClassName("linky-winky").length<size_peli){
        	for (var i_peli=0; i_peli<size_peli; i_peli++){
        		var child_peli=x_peli[i_peli];
        		if (child_peli!==undefined && child_peli!==null){
            		var subenlace=child_peli.getElementsByClassName("defaultLink extended")[0];
            		if (subenlace!==undefined && subenlace!==null){
            			var enlace=subenlace.href;
            			if (enlace.indexOf("http://www.pordede.com/peli/")>-1){
                            var nom=enlace.replace("http://www.pordede.com/peli/","");
        					addLinks(nom,child_peli);
        					addIMDB(enlace,child_peli);
        					addFilmaffinity(nom,child_peli);
                			editData(nom,child_peli);
                		}
            		}
        		}
        	}
    	}
    }
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
    	var i_folder=document.createElement("i");
        i_folder.className="icon-folder-close";
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
    	var ls_lk=document.getElementsByClassName("linksList")[0];
    	if (ls_lk!==undefined && ls_lk!==null){
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

function deleteLinks(){
    creaFolder("folder","folder_title","folder_scr"," Screener (0)");
    creaFolder("folder_lat","folder_title_lat","folder_lat"," LAT (0)");
    
    var scr_hide=0,scr_non=0;
    var lat=0;
    
    var num_down=0;
    var text_down=document.getElementsByClassName("boxtabs two-tabs")[0];
	if (text_down!==undefined && text_down!==null){
        var str_down = text_down.innerHTML;
        str_down = str_down.substring(0, str_down.indexOf(')<'));
        str_down = str_down.replace(/^.+online \(/im,"");
        str_down = str_down.replace("<!--","");
        num_down = Number(str_down);
    }
    
	var max_up=-1,max_child_link2=null;
    var x_link2=document.getElementsByClassName("modelContainer linkContainer");
    var size_link2=x_link2.length;
    for (var i_link2=0; i_link2<size_link2; i_link2++){
        var child_link2=x_link2[i_link2];
        if (child_link2!==undefined && child_link2!==null){
        	var quality=child_link2.getElementsByClassName("linkInfo quality")[0].innerHTML.replace('<i class="icon-facetime-video"></i>','').replace(' ','');
        	if (quality.indexOf("Screener")===-1){
        	    scr_non++;
            	var nums=child_link2.getElementsByClassName("nums")[0].getElementsByTagName('span');
            	if (nums[2].innerHTML>=2 || (nums[1].innerHTML-nums[0].innerHTML>=2)){
            		var pare_link2=child_link2.parentNode;
            		pare_link2.innerHTML="<a style=' color: maroon; font-weight: bolder;' title='"+quality+" "+nums[0].innerHTML+" "+nums[1].innerHTML+" "+nums[2].innerHTML+"'> Esborrat </a>";
            		i_link2--;
            	}else{
            	    if (child_link2.innerHTML.search("LAT")>-1){
            	        var pare_lat=child_link2.parentNode;
            	        if ((scr_hide+scr_non)<num_down){
                	        var cln_lat = pare_lat.cloneNode(true);
                            cln_lat.getElementsByClassName("modelContainer linkContainer")[0].className="";
                            document.getElementById("folder_lat").appendChild(cln_lat);
                	        lat++;
            	        }
                		pare_lat.innerHTML="";
                		i_link2--;
            	    }else{
            			if (((scr_hide+scr_non)<num_down) && (Number(nums[0].innerHTML)>Number(max_up))){//find max up (likes)
            				max_child_link2=child_link2;
            				max_up=nums[0].innerHTML;
            			}
            	    }
            	}
        	}else{
        	    /*var size_new=document.getElementsByClassName("modelContainer linkContainer").length;
        	    if (size_new===(size_link2-num_down)){
        	        var txt_down0 = document.createElement("br");
                    document.getElementById("folder_scr").appendChild(txt_down0);
                    var txt_down = document.createTextNode("--- Descargar ---");
                    document.getElementById("folder_scr").appendChild(txt_down);
        	        var txt_down2 = document.createElement("br");
                    document.getElementById("folder_scr").appendChild(txt_down2);
        	    }*/
        	    var pare_link3=child_link2.parentNode;
        	    if ((scr_hide+scr_non)<num_down){
        	        var cln = pare_link3.cloneNode(true);
                    cln.getElementsByClassName("modelContainer linkContainer")[0].className="";
                    document.getElementById("folder_scr").appendChild(cln);
                    scr_hide++;
        	    }
        		pare_link3.innerHTML="";
        		i_link2--;
        	}
        }
    }
    if (scr_hide>0){//num hide
        document.getElementById("folder_title").innerHTML=document.getElementById("folder_title").innerHTML.replace("0",scr_hide);
    }
    if (lat>0){
        document.getElementById("folder_title_lat").innerHTML=document.getElementById("folder_title_lat").innerHTML.replace("0",lat);
    }
	if (max_up>-1){//change color max up (likes)
		max_child_link2.style.border="1px solid #347a37";
	}
}
function deleteById(nom){
	var childAdv=document.getElementById(nom);
	if (childAdv!==null && childAdv!==undefined){
	var pareAdv=childAdv.parentNode;
	pareAdv.removeChild(childAdv);
	}
}
function deleteByClass(nom,num){
	var childClass=document.getElementsByClassName(nom)[num];
    if (childClass!==null && childClass!==undefined){
        var pareClass=childClass.parentNode;
        pareClass.removeChild(childClass);
    }
}
//--enllaç extern--//<i class="icon-external-link" style=" margin-left: 9px;" target="_blank" href="/links/viewepisode/id/236918"></i>
edit2();
function reload(){edit();window.setTimeout(edit,1000);window.setTimeout(edit,2500);edit2();window.setTimeout(edit2,1000);window.setTimeout(edit2,2500);}
document.getElementById("bodyId").onclick=reload;
document.getElementById("bodyId").addEventListener("wheel",reload);
