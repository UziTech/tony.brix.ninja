	var ot = Array();
	ot["mon"] = "12:00 AM-11:59 PM";
	ot["tue"] = "12:00 AM-11:59 PM";
	ot["wed"] = "12:00 AM-11:59 PM";
	ot["thu"] = "12:00 AM-11:59 PM";
	ot["fri"] = "12:00 AM-11:59 PM";
	ot["sat"] = "12:00 AM-11:59 PM";
	ot["sun"] = "12:00 AM-11:59 PM";
	var tz = "-06:00,1";
	var widget_position = "bottom_right";
	var fb = "tbrix13";
	var fb_email = "";
	var emailLink = false;
	var mon = true;
	var tue = true;
	var wed = true;
	var thu = true;
	var fri = true;
	var sat = true;
	var sun = true;

	function calculate_time_zone(ch) {
		if (typeof ch == "undefined") ch = false;
		var rightNow = new Date();
		var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0); /* jan 1st */
		var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0); /* june 1st */
		var temp = jan1.toGMTString();
		var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
		temp = june1.toGMTString();
		var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
		var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
		var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
		var dst;
		if (std_time_offset == daylight_time_offset) {
			dst = "0"; /* daylight savings time is NOT observed */
		} else {
			/* positive is southern, negative is northern hemisphere */
			var hemisphere = std_time_offset - daylight_time_offset;
			if (hemisphere >= 0)
				std_time_offset = daylight_time_offset;
			dst = "1"; /* daylight savings time is observed */
		}
		var i;
		/* check just to avoid error messages */
		var con = convert(std_time_offset) + "," + dst;
		if (ch && document.getElementById("timezone")) {
			for (i = 0; i < document.getElementById("timezone").options.length; i++) {
				if (document.getElementById("timezone").options[i].value == con) {
					document.getElementById("timezone").selectedIndex = i;
					break;
				}
			}
		}
		return con;
	}

	function linkHandler(e) {
		var is_online = validate();
		if (is_online) {
			e.preventDefault();
			var screenwidth = screen.width - 500;
			window.open($(this).attr("href"), "_blank", "width=500,height=800,left=" + screenwidth);
		} else {
			if ($("#chk_showemaillink").is(":checked") && $("#fb_email").length > 0) {
				var fb_email = $("#fb_email").val();

				if (fb_email != "" && isEmail(fb_email) && $("#fb_link").hasClass("email_us")) {
					$(this).attr("href", "mailto:" + fb_email);
					$(this).attr("target", "_self");
				} else {
					e.preventDefault();
					var screenwidth = screen.width - 500;
					window.open($(this).attr("href"), "_blank", "width=500,height=800,left=" + screenwidth);
				}
			} else if (emailLink) {
				console.log(this);
			} else if ($(this).hasClass("disabled")) {
				e.preventDefault();
			}
		}
	}

	function convert(value) {
		var hours = parseInt(value);
		value -= parseInt(value);
		value *= 60;
		var mins = parseInt(value);
		value -= parseInt(value);
		value *= 60;
		var secs = parseInt(value);
		var display_hours = hours;
		/* handle GMT case (00:00) */
		if (hours == 0) {
			display_hours = "00";
		} else if (hours > 0) {
			/* add a plus sign and perhaps an extra 0 */
			display_hours = (hours < 10) ? "+0" + hours : "+" + hours;
		} else {
			/* add an extra 0 if needed */
			display_hours = (hours > -10) ? "-0" + Math.abs(hours) : hours;
		}
		mins = (mins < 10) ? "0" + mins : mins;
		return display_hours + ":" + mins;
	}

	function validate() {
		/* console.clear();*/
		if ($("#fb_url").length > 0) {
			fb = $("#fb_url").val();
		}
		if (fb == "") {
			sweetAlert("Oops...", "Something went wrong!", "error");
			return false;
		}
		if ($("#chk_mon").length > 0) {
			mon = $("#chk_mon").is(":checked");
			tue = $("#chk_tue").is(":checked");
			wed = $("#chk_wed").is(":checked");
			thu = $("#chk_thu").is(":checked");
			fri = $("#chk_fri").is(":checked");
			sat = $("#chk_sat").is(":checked");
			sun = $("#chk_sun").is(":checked");
		}
		var cDate = new Date();

		var days = Array();

		days["mon"] = mon;
		days["tue"] = tue;
		days["wed"] = wed;
		days["thu"] = thu;
		days["fri"] = fri;
		days["sat"] = sat;
		days["sun"] = sun;
		var daysName = [];
		daysName[1] = "mon";
		daysName[2] = "tue";
		daysName[3] = "wed";
		daysName[4] = "thu";
		daysName[5] = "fri";
		daysName[6] = "sat";
		daysName[7] = "sun";
		if ($("#timezone").length > 0) {
			tz = $("#timezone").val();
		}
		if ($("#widget_position").length > 0) {
			widget_position = $("#widget_position").val();
		}
		$(".fbmessenger").removeClass().addClass("fbmessenger wpos" + widget_position);
		$(".tooltiptext").removeClass().addClass("tooltiptext wpos" + widget_position);
		$("#fb_link").attr("href", "http://m.me/" + fb);
		var cDayofWeek = daysName[cDate.getDay()];
		$("#fb_link").removeClass("disabled");
		var calculated_time_zone = calculate_time_zone();
		var baseTzSy = tz.substr(0, 1);
		var baseTzHr = tz.slice(0, tz.indexOf(":"));
		var baseTzMn = tz.substr(tz.indexOf(":") + 1, 2);
		var baseTzDs = tz.slice(-1);
		var clientTzDs = calculated_time_zone.slice(-1);
		if (baseTzSy == "0") baseTzSy = "";
		if (baseTzSy == "+") baseTzHr = baseTzHr.substr(1);
		var conTz = parseInt(baseTzHr) + parseFloat(baseTzMn / 60);
		var baseTime = calcTime(conTz, conTz);
		var baseDayofWeek = baseTime.getDay();


		if (days[daysName[baseDayofWeek]]) {
			/* Online on Base Day. Check for online time under base timezone*/
			if ($(".slider-time:visible").length > 0) {
				/* Desktop Mode*/
				s = $("#ts_container-" + daysName[baseDayofWeek] + " .slider-time").html();
				e = $("#ts_container-" + daysName[baseDayofWeek] + " .slider-time2").html();
				var start_time = convertTimeFormat(s);
				var end_time = convertTimeFormat(e);
			} else if ($("#mob_container_time").length > 0) {
				/* Mobile Mode*/
				s = $("#start_time-" + daysName[baseDayofWeek]).val();
				e = $("#end_time-" + daysName[baseDayofWeek]).val();
				var start_time = convertTimeFormat(s);
				var end_time = convertTimeFormat(e);
			} else {
				/* if validate() was called within widget code*/
				var t = ot[daysName[baseDayofWeek]].split("-");
				var start_time = convertTimeFormat(t[0]);
				var end_time = convertTimeFormat(t[1]);
			}
			/* Convert the time in HH:MM Format*/

			/* console.log("Current Time on local Machine: " + cDate.getTime()/1000);
			console.log("The local time in selected timezone is " + localTime.getTime());*/
			/* Time on Client Machine*/
			cHrs = cDate.getHours();
			cMin = cDate.getMinutes();

			/* Convert the time in HH:MM Format*/

			var osTimeHrs = start_time.slice(0, start_time.indexOf(":"));
			var osTimeMins = start_time.substr(start_time.indexOf(":") + 1, 2);

			var oeTimeHrs = end_time.slice(0, end_time.indexOf(":"));
			var oeTimeMins = end_time.substr(end_time.indexOf(":") + 1, 2);

			console.log("Online time in base timezone(" + daysName[baseDayofWeek] + "): " + osTimeHrs + ":" + osTimeMins + " - " + oeTimeHrs + ":" + oeTimeMins);

			lHrs = baseTime.getHours();
			lMin = baseTime.getMinutes();
			var startTimeTs = new Date(baseTime.getFullYear(), baseTime.getMonth(), baseTime.getDate(), osTimeHrs, osTimeMins, 0, 0);
			startTimeTs = parseInt((startTimeTs.getTime()) / 1000);
			var endTimeTs = new Date(baseTime.getFullYear(), baseTime.getMonth(), baseTime.getDate(), oeTimeHrs, oeTimeMins, 0, 0);
			endTimeTs = parseInt((endTimeTs.getTime()) / 1000);

			sT = new Date(startTimeTs * 1000);
			eT = new Date(endTimeTs * 1000);
			/* console.log("Curr Hrs: " +cHrs+" Local Hrs:"+lHrs+ " Start Time: "+startTimeTs + " : "+sT);
			console.log("Curr Mins: "+cMin+" Local Mins:"+lMin+ " End Time: "+endTimeTs +" : "+eT);*/

			var cTs = parseInt(baseTime.getTime() / 1000);

			if ((cTs >= startTimeTs) && (cTs < endTimeTs)) {
				/* console.log("ONLINE");*/
				$("#fb_link").removeClass("disabled").removeClass("email_us");
				$("#img_email").hide();
				$("#img_msg").show();
				return true;
			} else {
				/* console.log("OFFLINE");*/

				if ($("#chk_showemaillink").length > 0) {
					emailLink = $("#chk_showemaillink").is(":checked");
					fb_email = $("#fb_email").val();
				} else {
					emailLink = emailLink;
				}
				if (emailLink) {
					$("#fb_link").attr("href", "mailto:" + fb_email);
					$("#fb_link").attr("target", "_self");
					if (fb_email != "" && isEmail(fb_email)) {
						$("#fb_link").removeClass("disabled").addClass("email_us");
						$("#img_email").show();
						$("#img_msg").hide();
					} else {
						$("#img_email").hide();
						$("#img_msg").show();
					}
				} else {
					$("#fb_link").addClass("disabled");
				}

			}
		} else {
			/* console.log("OFFLINE");*/
			if ($("#chk_showemaillink").length > 0) {
				emailLink = $("#chk_showemaillink").is(":checked");
				fb_email = $("#fb_email").val();
			} else {
				emailLink = emailLink;
			}
			if (emailLink) {
				$("#fb_link").attr("href", "mailto:" + fb_email);
				$("#fb_link").attr("target", "_self");
				if (fb_email != "" && isEmail(fb_email)) {
					$("#fb_link").removeClass("disabled").addClass("email_us");
					$("#img_email").show();
					$("#img_msg").hide();
				} else {
					$("#img_email").hide();
					$("#img_msg").show();
				}
			} else {
				$("#fb_link").addClass("disabled");
			}

		}
		console.log("Current time in base timezone is: " + (baseTime.toLocaleString()));
		return false;
	}

	function convertTimeFormat(time) {
		/* Convert the time into HH:MM format*/
		var hours = Number(time.match(/^(\d+)/)[1]);
		var minutes = Number(time.match(/:(\d+)/)[1]);
		var AMPM = time.match(/\s(.*)$/)[1];
		if (AMPM == "PM" && hours < 12) hours = hours + 12;
		if (AMPM == "AM" && hours == 12) hours = hours - 12;
		var sHours = hours.toString();
		var sMinutes = minutes.toString();
		if (hours < 10) sHours = "0" + sHours;
		if (minutes < 10) sMinutes = "0" + sMinutes;
		return sHours + ":" + sMinutes;
	}

	function calcTime(city, offset) {
		/* create Date object for current location */
		d = new Date();
		/* convert to msec
		add local time zone offset
		get UTC time in msec */
		utc = d.getTime() + (d.getTimezoneOffset() * 60000);
		/* create new Date object for different city
		using supplied offset */
		nd = new Date(utc + (3600000 * offset));
		return nd; /* return time as a string */
	}

	function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

	$(document).ready(function () {
		calculate_time_zone(true);
		validate();
		setInterval(validate, 30000);
		$("#fb_link").click(linkHandler);
	});
