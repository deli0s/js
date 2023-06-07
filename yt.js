var _class_video_checked = "checkinsky";

function edit(){
	if (window.location.href.includes("subscriptions")){
		var video_str="ytd-rich-item-renderer";
		var videos=document.getElementsByTagName(video_str);
		if (videos){
			var size_videos=videos.length;
			for (var i_video=0; i_video<size_videos; i_video++){
				var video=videos[i_video];
				if (video){
					var watched=video.getElementsByClassName("ytd-thumbnail-overlay-resume-playback-renderer")[0];
					if (watched || t_(video,"Late Motiv","Broncano,Berto,Romero,ignatius,Miguel Maldonado") || t_(video,"TERRAT","NADIE SABE NADA") || t_(video,"manga","Titan") || t_(video,"La Vida Moderna"," | ")  || t_(video,"Oh! My LOL"," Moderna") || t_(video,"WIRED","Answer") || t_(video,"Anochece","tonacho")){
						if (deleteByTag(video_str,i_video)) i_video--;
					}else{
						actorsFilter(video);
						if (unwantedShorts(video)) {
							if (deleteByTag(video_str,i_video)) i_video--;
						}
					}
				}
			}
		}
	}
	
	if (window.location.href.includes("/shorts/")){
		window.location = window.location.href.replace("/shorts/", "/watch?v=");
	}
}

function unwantedShorts(video){
	var unwanted = ["alex alex alex","Alpha Betas"];
	var user = video.getElementsByTagName("a")[4];
	if (user && unwanted.includes(user.innerText)) {
		var icon = video.getElementsByTagName("yt-icon")[0];
		return icon;
	}

	return false;
}

function actorsFilter(video){
	if (!video.className.includes(_class_video_checked)){
		var title_ = video.getElementsByTagName("a")[2];
		var h3_ = video.getElementsByTagName("h3")[0];
		if (h3_){
			h3_ = h3_.getElementsByTagName("a")[0];
		}
		var shows="TheEllenShow,Graham Norton,Jimmy Fallon,Jimmy Kimmel,Stephen Colbert,Team Coco,James Corden";
		if (!(findTextArray(title_,shows.split(","),false) && !findTextArray(h3_,actors,true))){
			video.style.opacity="1";
		}
		video.className += " " + _class_video_checked;
	}
}

function t_(video,title_str,h3_array){//title
	var title_=video.getElementsByTagName("a")[2];
	if (!title_) return false;
	var h3_=video.getElementsByTagName("h3")[0];
	var title_found=(title_.innerHTML.toLowerCase().includes(title_str.toLowerCase()));
	if (!title_found) return false;
	return !findTextArray(h3_,h3_array.split(","),false);
}

function findTextArray(txt,arr,bold){
	if (arr.length>1){
		var try_n=0;
		var trobat=false;
		do{
			trobat=(txt.innerHTML.toLowerCase().includes(arr[try_n].toLowerCase()));
			if (trobat && bold){
				txt.innerHTML = txt.innerHTML.replaceAll(arr[try_n],"<span style=\"color: #ff0000;\">" + arr[try_n] + "</span>");
				if (!txt.innerHTML.includes("color: #ff0000")){
					txt.innerHTML = txt.innerHTML.replaceAll(arr[try_n].toLowerCase(),"<span style=\"color: #ff0000;\">" + arr[try_n] + "</span>");
				}
			}
			try_n++;
		}while (!trobat && try_n<arr.length);
		return (trobat);
	}
	txt_str=arr[0];
	var txt_found=(txt.innerHTML.toLowerCase().includes(txt_str.toLowerCase()));
	return (txt_found);
}

var actors=["Experiment","Science","Challenge","Jack Whitehall","Penn","Teller","Magic","Revenge","Scare","Secret","Fail","Prank","Tweet","Red Chair","Hashtags","Chris Pratt","John Krasinski","Keanu Reeves","Steve Carell","Bradley Cooper","Vin Diesel","Jonah Hill","Ben Affleck","Channing Tatum","Eddie Redmayne","Matt Damon","Will Ferrell","Paul Rudd","Dave Franco","Zac Efron","Mark Wahlberg","Leonardo DiCaprio","Seth Rogen","James Franco","Ben Stiller","Simon Pegg","Robert Downey Jr.","Tom Holland","Chris Evans","Chris Hemsworth","Tom Hiddleston","Ezra Miller","Henry Cavill","Jason Momoa","Samuel L. Jackson","Will Smith","Ryan Reynolds","Justin Timberlake","Jake Gyllenhaal","Sacha Baron Cohen","Asa Butterfield","Johnny Depp","Willem Dafoe","Terry Crews","Adam Sandler","Jason Statham","Andy Samberg","Tom Cavanagh","Stephen Amell","Robbie Amell","Grant Gustin","Joe Dinicol","Brandon Routh","David Tennant","Arthur Darvill","Matt Lucas","Wentworth Miller","Nick Zano","Dominic Purcell","Luke Mitchell","Iain De Caestecker","Brett Dalton","Mario Casas","Hugo Silva","Luis Fernández","Quim Gutiérrez","Arturo Valls","Leo Harlem","Jordi Sánchez","Pablo Chiapella","Eduardo Gómez","Julián López","Gorka Otxoa","Idris Elba","Fernando Tejero","Ernesto Sevilla","José Luis Gil","Nacho Guerreros","Joaquín Reyes","Miki Esparbé","Santiago Segura","Carlos Areces","Eduardo Gómez","Berto Romero","Dani Rovira","Paco León","Dwayne Johnson","Jack Black","Orlando Bloom","Jim Carrey","Christopher Mintz-Plasse","Patrick Stewart","T.J. Miller","Chris Pine","Jon Bernthal","Morgan Freeman","Tom Cruise","Brad Pitt","James McAvoy","Hugh Jackman","Christian Bale","Kit Harington","Peter Dinklage","Jeffrey Dean Morgan","Andrew Lincoln","Norman Reedus","Aaron Paul","Bryan Cranston","Patton Oswalt","Robert Buckley","Ed O'Neill","Ty Burrell","Rahul Kohli","David Anders","Neil Patrick Harris","Zach Galifianakis","Benedict Cumberbatch","Pepe Viyuela","Jeremy Allen White","Cameron Monaghan","Zachary Quinto","Adam DeVine","Jesse Eisenberg","Shia LaBeouf","Woody Harrelson","Bill Murray","Liam Hemsworth","Daniel Radcliffe","Michael Caine","Rupert Grint","Nick Offerman","Ryan Gosling","Jason Sudeikis","Zach Woods","Ed Helms","Owen Wilson","Theo James","Nicolas Cage","Tom Hardy","Ian McKellen","Elijah Wood","Luke Macfarlane","Marc Bendavid","Anthony Lemke","Bruce Willis","Rami Malek","Michael Cera","John Barrowman","Ashton Kutcher","Ricky Whittle","Thomas McDonell","Devon Bostick","Richard Harmon","Henry Ian Cusick","Bob Morley","Frank Dillane","Colman Domingo","Seann William Scott","Colin Farrell","Craig Robinson","Adam Scott","Clark Duke","Aaron Taylor-Johnson","Kyle Harris","Damon Dayoub","Ben McKenzie","David Mazouz","Sean Pertwee","Robin Lord Taylor","Cory Michael Smith","BD Wong","Joseph Gilgun","Robert De Niro","Iwan Rheon","Chloë Grace Moretz","Chloe Bennet","Aubrey Plaza","Jennifer Lawrence","Emma Stone","Jennifer Aniston","Mila Kunis","Melissa McCarthy","Kate McKinnon","Christina Applegate","Emilia Clarke","Brie Larson","Gal Gadot","Cobie Smulders","Margot Robbie","Anna Kendrick","Anna Faris","Helena Bonham Carter","Melissa Benoist","Chyler Leigh","Danielle Panabaker","Emily Bett Rickards","Caity Lotz","Audrey Marie Anderson","Katrina Law","Madison McLaughlin","Alex Kingston","Jenna Coleman","Karen Gillan","Billie Piper","Freema Agyeman","Michelle Gomez","Jaimie Alexander","Ashley Johnson","Adrianne Palicki","Elizabeth Henstridge","Katie Cassidy","Ana de Armas","Marta Torné","Ana Fernández","Inma Cuesta","Cara Delevingne","Aura Garrido","Macarena García","Michelle Jenner","Miren Ibarguren","Zoe Saldana","Daisy Ridley","Úrsula Corberó","Angy Fernández","Alexandra Jiménez","Sílvia Abril","Clara Lago","Vanessa Romero","Alexandra Daddario","Keira Knightley","Amy Adams","Scarlett Johansson","Rose McIver","Sophie Turner","Maisie Williams","Natalie Dormer","Lauren Cohan","Emily Kinney","Sarah Wayne Callies","Katelyn Nacon","Hailee Steinfeld","Sarah Hyland","Julie Bowen","Ariel Winter","Aly Michalka","Leanne Lapp","Kristen Schaal","Alyson Hannigan","Isla Fisher","Kristen Wiig","Ana Morgade","Megan Fox","Kristen Stewart","Abigail Breslin","Emma Watson","Zoë Kravitz","Charlize Theron","Hannah John-Kamen","Jodelle Ferland","Zoie Palmer","Melanie Liburd","Melissa O'Neil","Evangeline Lilly","Tatiana Maslany","Angelina Jolie","Halston Sage","Ellen Page","Eliza Taylor","Marie Avgeropoulos","Lindsey Morgan","Chelsey Reist","Tasya Teles","Erica Cerra","Alycia Debnam-Carey","Katie Stuart","Eve Harlow","Rosario Dawson","Uma Thurman","Kim Dickens","Jessica Alba","Kaya Scodelario","Lyndsy Fonseca","Emma Ishta","Allison Scagliotti","Brit Marling","Camren Bicondova","Erin Richards","Morena Baccarin","Jessica Lucas","Jada Pinkett Smith","Maggie Geha","Chelsea Spack","Alicia Vikander","Elizabeth Olsen","Martha Higareda","Emily Hampshire","Peyton List","Kristen Bell"];

function deleteByTag(nom,num){
	var childClass=document.getElementsByTagName(nom)[num];
	if (childClass){
		var pareClass=childClass.parentNode;
		pareClass.removeChild(childClass);
		return true;
	}
	return false;
}

function cout(txt){//per fer proves
	console.log(txt);
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

reload();
function reload(){
	try{
		edit();
		addCss();
	}catch(err){
		console.log(err);
	}
}
function addCss(){
	var css = document.createElement("style");
	css.type = "text/css";
	if (window.location.href.includes("subscriptions")){
		css.innerHTML = "." + _class_video_checked + " { opacity: 0.4; } " + "." + _class_video_checked + ":hover { opacity: 1; }";
	}else{
		css.innerHTML = ".style-scope .ytd-grid-renderer { opacity: 1; }";
	}
	document.body.appendChild(css);
}
document.body.onclick=reload;
document.body.addEventListener("wheel",edit);
