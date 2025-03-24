document.body.addEventListener("click", doSomething, false);
setTimeout(function() {doSomething();}, 1000);
setTimeout(function() {doSomething();}, 2000);

function doSomething() {
	let url = window.location.href;
	if (url.includes("/calendar")) {
		addToggler();
		exportCalendar();
	}
	
	let links = document.querySelector("[class*='Details-links']");
	if (links) {
		links.addEventListener("mouseover", addFilmaffinity);
	}
}

function addToggler() {
	let title = document.querySelector("[class*='CalendarHeader-titleDesktop']");
	if (title) {
		let weeks = document.querySelectorAll("[class*='CalendarDay-dayOfMonth']");
		for (let i = 0; i < weeks.length; i += 7) {
			let week = weeks[i];
			let week_toggler = week.getElementsByClassName("week_toggler");
			if (week_toggler && week_toggler.length == 0) {
				let week_id = title.innerText + "_" + week.innerText;
				let emoji = "👁️";
				let c = getCookie(week_id + "_" + i);
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
	let seriesGroup = document.querySelectorAll("[class*='CalendarEventGroup-event']:not(.uploaded_php)");

	let anime_ck = getCookie("anime");
	let anime = null;
	if (anime_ck) {
		anime = anime_ck.split("|");
	}

	let arrEvents = getSeriesToUpload(series, anime);
	let arrGroup = getSeriesToUpload(seriesGroup, anime);
	arr_upload = arr_upload.concat(arrEvents);
	arr_upload = arr_upload.concat(arrGroup);

	if (arr_upload.length > 0) {
		fetch('https://calendar.webcindario.com/calendar.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ upload: 'i3bgYzH!hGoDb?WQZeD&N', episodes: arr_upload }),
			mode: 'cors' // Enables cross-domain requests
		})
		.then(data => {
			console.log('Response', data);
			setCookie("Response", data.status + ' ' + data.statusText, 31);
		})
		.catch(err => {
			console.log('e', err);
			setCookie("notUpload", err, 31);
		});
	}
}

function getSeriesToUpload(series, anime) {
	let arr_upload = new Array();

	for (let i = 0; i < series.length; i ++) {
		let serie = series[i];
		serie.classList.add('uploaded_php');

		let title = serie.querySelector("[class*='seriesTitle']").innerText;
		let episodeInfo = serie.querySelector("[class*='episodeInfo']");
		let divEpisodeInfo = episodeInfo.querySelectorAll("div");
		let episodeDiv = episodeInfo;
		if (divEpisodeInfo.length > 0) {
			episodeDiv = divEpisodeInfo[1];
		}
		let episode = episodeDiv.innerText;

		let title_episode = title + ' ' + episode;

		let episode_cookie = title_episode.replaceAll("|", " ");

		let c = getCookie("uploaded_episodes");
		if (c && c.includes(episode_cookie)) {
			//res
		} else {
			if (c) {
				setCookie("uploaded_episodes", c + "|" + episode_cookie, 31);
			} else {
				setCookie("uploaded_episodes", episode_cookie, 31);
			}

			let obj_episode = uploadEpisode(serie, title_episode);
			if (obj_episode) {
				arr_upload.push(obj_episode);
			}
		}

		let isAnime = anime && anime.includes(title);
		if (isAnime) {
			serie.classList.add('anime');
			let newDiv = document.createElement("div");
			newDiv.style.display = "inline";
			newDiv.style.position = "absolute";
			newDiv.style.cursor = "pointer";
			newDiv.style.marginTop = "30px";
			newDiv.style.top = "0";
			newDiv.style.right = "0";
			newDiv.innerHTML = `<a style="text-decoration: none;" href="https://aniwave.lv/filter?keyword=${title.replaceAll(' ', '+')}&type=&term_type%5B%5D=TV&status%5B%5D=currently-airing">🔗</a>`;
			serie.appendChild(newDiv);
		}
	}

	return arr_upload;
}

function uploadEpisode(serie, title_episode) {
	let title = document.querySelector("[class*='CalendarHeader-titleDesktop']");
	let p_serie = serie.parentElement;
	if (title && p_serie) {
		let p_p_serie = p_serie.parentElement;
		if (p_p_serie) {
			let week = p_p_serie.querySelector("[class*='CalendarDay-dayOfMonth']");
			if (week) {
				let air = serie.querySelector("[class*='airTime']");
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
	let isDifferentMonth = week.classList.value.contains("CalendarDay-isDifferentMonth");
	let week_dia = Number(week.innerText.match(/(\d+)/)[0]);
	let mes_str = title.innerText;
	let primer = new Date("1 " + mes_str);

	let d = new Date(week_dia + " " + mes_str);
	if (isDifferentMonth) {
		if (week_dia < 15) {
			primer.setMonth(primer.getMonth() + 1);
		} else {
			primer.setMonth(primer.getMonth() - 1);
		}
		
		d = new Date(primer.getFullYear(), primer.getMonth(), week_dia);
	}

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

	let res = d.getFullYear() + mes.toString() + dia.toString() + "T" + hora.toString() + mins.toString() + "00Z";
	
	return res;
}

function addFilmaffinity() {
	let btns = document.querySelector("[class*='DetailsLinks-links']");
	if (btns) {
		let a = btns.getElementsByTagName('a');
		let pos = 2;
		if (a.length >= pos) {
			let tres = a[pos];
			let title = document.querySelector("[class*='Details-title']");
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
	let weeknum = e.getAttribute("weeknum");
	let toggle = "none";
	let c = getCookie(week_id + "_" + weeknum)
	if (c && c == "none") {
		toggle = "block";
        e.innerText = "👁️";
	}

	toggleDivWeek(weeknum, toggle);
	setCookie(week_id + "_" + weeknum, toggle, 31);
}
