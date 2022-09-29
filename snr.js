document.body.addEventListener("click", doSomething, false);
setTimeout(function() {doSomething();}, 1000);
setTimeout(function() {doSomething();}, 2000);

function doSomething() {
	let url = window.location.href;
	if (url.includes("/calendar")) {
		addToggler();
		exportCalendar();
	}
	
	let links = document.querySelectorAll("[class*='Details-links']")[0];
	if (links) {
		links.addEventListener("mouseover", addFilmaffinity);
	}
}

function addToggler() {
	let title = document.querySelectorAll("[class*='CalendarHeader-titleDesktop']")[0];
	if (title) {
		let weeks = document.querySelectorAll("[class*='CalendarDay-dayOfMonth']");
		for (let i = 0; i < weeks.length; i += 7) {
			let week = weeks[i];
			let week_toggler = week.getElementsByClassName("week_toggler");
			if (week_toggler && week_toggler.length == 0) {
				let week_id = title.innerText + "_" + week.innerText;
				let emoji = "👁️";
				let c = getCookie(week_id);
				if (c && c == "none") {
					emoji = "🔎";
					toggleDivWeek(i, "none");
				}
				week.innerHTML += ` <a class="week_toggler" onclick="toggleWeek(this, '` + week_id + `')" weekNum="` + i + `"  style="cursor: pointer;">` + emoji + `</a>`;
			}
		}
	}
}

function exportCalendar() {
	let arr_upload = [];
	let series = document.querySelectorAll("[class*='CalendarEvent-event']:not(.uploaded_php)");
	for (let i = 0; i < series.length; i ++) {
		let serie = series[i];
		serie.classList.add('uploaded_php');

		let title = serie.querySelectorAll("[class*='CalendarEvent-seriesTitle']")[0].innerText;
		let episode = serie.querySelectorAll("[class*='CalendarEvent-episodeInfo'] div")[1].innerText;

		let title_episode = title + ' ' + episode;

		let episode_cookie = title_episode.replaceAll("|", " ");

		let c = getCookie("uploaded_episodes");
		if (c && c.includes(episode_cookie)) {
				//res
		} else {
			if (c){
				setCookie("uploaded_episodes", c + "|" + episode_cookie, 31);
			} else {
				setCookie("uploaded_episodes", episode_cookie, 31);
			}

			let obj_episode = uploadEpisode(serie, title_episode);
			if (obj_episode) {
				arr_upload.push(obj_episode);
			}
		}
	}

	if (arr_upload.length > 0) {
		$.ajax({
			url:  'https://alerta.webcindario.com/calendar.php',
			data: { episodes: JSON.stringify(arr_upload) },
			type: "POST",
			//dataType: 'json',
			success: function(data) {
				console.log('Response', data);
				setCookie("errorUpload", data, 31);
			}
		});
	}
}

function uploadEpisode(serie, title_episode) {
	let title = document.querySelectorAll("[class*='CalendarHeader-titleDesktop']")[0];
	let p_serie = serie.parentElement;
	if (title && p_serie) {
		let p_p_serie = p_serie.parentElement;
		if (p_p_serie) {
			let week = p_p_serie.querySelectorAll("[class*='CalendarDay-dayOfMonth']")[0];
			if (week) {
				let air = serie.querySelectorAll("[class*='CalendarEvent-airTime']")[0];
				if (air) {
					let air_splited = air.innerHTML.split(" - ");
					let ini_splited = air_splited[0].split(":");
					let ini_h = ini_splited[0];
					let ini_m = ini_splited[1];
					let fi_splited = air_splited[1].split(":");
					let fi_h = fi_splited[0];
					let fi_m = fi_splited[1];

					let fecha_ini = formatFecha(week, title, ini_h, ini_m);
					let fecha_fi = formatFecha(week, title, fi_h, fi_m);
					
					let res = {
						SUMMARY: title_episode,
						DTSTART: fecha_ini,
						DTEND: fecha_fi
					};

					return res;
				}
			}
		}
	}

	return null;
}

function formatFecha(week, title, h, m) {
	let d = new Date(week.innerText.match(/(\d+)/)[0] + " " + title.innerText);
	d.setHours(h, m);

	let mes = d.getMonth() + 1;
	if (mes < 10) {
		mes = "0" + mes;
	}
	
	let dia = d.getDate();
	if (dia < 10) {
		dia = "0" + dia;
	}
	
	let hora = d.getUTCHours();
	if (hora < 10) {
		hora = "0" + hora;
	}

	let mins = d.getUTCMinutes();
	if (mins < 10) {
		mins = "0" + mins;
	}

	let res = d.getFullYear() + mes + dia + "T" + hora + mins + "00Z";
	
	return res;
}

function addFilmaffinity() {
	let btns = document.querySelectorAll("[class*='DetailsLinks-links']")[0];
	if (btns) {
		let a = btns.getElementsByTagName('a');
		let pos = 2;
		if (a.length >= pos) {
			let tres = a[pos];
			let title = document.querySelectorAll("[class*='Details-title']")[0];
			if (tres && title) {
				let nom = title.innerText;
				tres.getElementsByTagName('span')[0].innerText = "Filmaffinity";
				tres.href = "http://www.filmaffinity.com/es/search.php?stext="+nom.replace(/ /g,"+")+"&stype=title";
			}
		}
	}
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function toggleDivWeek(i, display) {
    let end = Number(i) + 7;
    for (let j = i; j < end; j++) {
        let to_toggle = document.querySelectorAll("[class*='CalendarDay-day-']")[j];
        if (to_toggle) {
            let divs = to_toggle.getElementsByTagName("div");
            if (divs && divs.length >= 2) {
                let div = divs[1];
                div.style.display = display;
            }
        }
    }
}

function toggleWeek(e, week_id) {
    e.innerText = "🔎";
	let toggle = "none";
	let c = getCookie(week_id)
	if (c && c == "none") {
		toggle = "block";
        e.innerText = "👁️";
	}

	toggleDivWeek(e.getAttribute("weeknum"), toggle);
	setCookie(week_id, toggle, 365);
}