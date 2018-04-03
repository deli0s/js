document.onload=directTorrent();

function directTorrent(){
	var w_h=window.location.href;
	if (w_h.indexOf("magnetik")>-1){
		if (w_h.indexOf("search.php")>-1){
			var table=document.getElementsByTagName("table")[1];
			if (existeix(table)){
				var trobat=false;
				var i_td=1;
				var td=table.getElementsByTagName("td");
				while (!trobat && i_td<td.length){
					var td_in=td[i_td].innerHTML;
					var n_ep=w_h.substr(w_h.length-6-9,6);
					var td2_in=td[i_td+1].innerHTML;
					var time=Number(td2_in.match(/[0-9]+/)[0]);
					var hour=-1;
					if (td2_in.indexOf("hour")>-1) hour=time;
					else if (td2_in.indexOf("minute")>-1) hour=time/60;
					trobat=(hour>-1 && hour<24 && td_in.indexOf("720p")>-1 && td_in.indexOf(n_ep)>-1);
					if (!trobat) i_td+=8;
				}
				if (trobat){
					td[i_td].getElementsByTagName("a")[0].click();
				}
			}
		}
	}else if (w_h.indexOf("/torrent/")>-1){
		document.getElementsByClassName("torrent_data")[0].getElementsByTagName("a")[3].click();
		window.close();
	}
}
function existeix(nom){
	return (nom!==undefined && nom!==null);
}
function cout(txt){
	console.log(txt);
}
