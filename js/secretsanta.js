
var nameid = 0;
var names = [];
var emails = [];
var ruleid = 0;
var rules = [];
$(function () {
	$("#name").keypress(function (e) {
		if (e.which === 13) {
			$("#addName").click();
		}
	});
	$("#email").keypress(function (e) {
		if (e.which === 13) {
			$("#addName").click();
		}
	});
	$("#rule").keypress(function (e) {
		if (e.which === 13) {
			$("#addRule").click();
		}
	});
	$("#addName").click(function () {
		var name = $("#name").val();
		var email = $("#email").val();
		if (name !== "") {
			names.push(name);
			emails.push(email);
			$(`<div id='name${nameid}'>${name} ${email} <span id='x${nameid}' data-id='${nameid}'>[X]</span></div>`).appendTo("#names");
			$(`#x${nameid}`).click(function () {
				var id = $(this).data("id");
				$(`#name${id}`).remove();
				$(`#ruleop1 option[value='${id}']`).remove();
				$(`#ruleop3 option[value='${id}']`).remove();
				names[id] = "";
				emails[id] = "";
			});
			$("#ruleop1").append(`<option value='${nameid}'>${name}</option>`);
			$("#ruleop3").append(`<option value='${nameid}'>${name}</option>`);
			nameid++;
			$("#email").val("");
			$("#name").val("").focus();
		} else {
			alert("Enter a name.");
			$("#name").focus();
		}
	});
	$("#addRule").click(function () {
		var rule = `${$("#ruleop1 option:selected").text()} ${$("#ruleop2 option:selected").text()} ${$("#ruleop3 option:selected").text()}`;
		rules.push(`${$("#ruleop1").val()},${$("#ruleop2").val()},${$("#ruleop3").val()}`);
		$(`<div id='rule${ruleid}'>${rule} <span id='xr${ruleid}' data-id='${ruleid}'>[X]</span></div>`).appendTo("#rules");
		$(`#xr${ruleid}`).click(function () {
			var id = $(this).data("id");
			$(`#rule${id}`).remove();
			rules[id] = "";
		});
		ruleid++;
	});
	$("#getList").click(function () {
		var nameList = [];
		for (var i in names) {
			if (names[i] !== "") {
				nameList.push(i);
			}
		}
		if (nameList.length < 2) {
			alert("Enter at least 2 names.");
			return;
		}
		var time = new Date().getTime();
		do {
			if ((new Date().getTime()) - time > 1000) {
				alert("Error You might have conflicting rules");
				return;
			}
			for (var j = nameList.length - 1; j > 0; j--) {
				var k = Math.floor(Math.random() * (j + 1));
				var temp = nameList[k];
				nameList[k] = nameList[j];
				nameList[j] = temp;
			}
		} while (!rulesObeyed(nameList));

		if ($("#secret").prop("checked")) {
		// //send emails
			var obj = {};
			obj[names[nameList[0]]] = [nameList[nameList.length - 1], emails[nameList[nameList.length - 1]]];
			for (var l = 1; l < nameList.length; l++) {
				obj[names[nameList[l]]] = [nameList[l - 1], emails[nameList[l - 1]]];
			}
			$("<div id='loading' style='position:fixed; top:0; left:0; width:100%; height:100%; text-align:center; color:#ffffff; font-size:20px; background-color:rgba(0,0,0,.5);'>Loading...</div>").appendTo("body");
			$.post("?email", {body: $("#message").val(), names: JSON.stringify(obj)}, function (data) {
				$("#loading").remove();
				if (data.success) {
					alert("Emails sent.");
				} else {
					alert(data.error);
				}
			}, "json");
		} else {
			var list = "";
			for (var m = 0; m < nameList.length - 1; m++) {
				list += `${names[nameList[m]]} has ${names[nameList[m + 1]]}\n`;
			}
			list += `${names[nameList[nameList.length - 1]]} has ${names[nameList[0]]}`;
			alert(list);
		}
	});
});
function rulesObeyed(arr) {
	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i].split(",");
		for (var j = 0; j < arr.length; j++) {
			if (arr[j] === rule[0]) {
				if (rule[1] === 1) {
					if (j + 1 === arr.length) {
						if (arr[0] !== rule[2]) {
							return false;
						}
					} else {
						if (arr[j + 1] !== rule[2]) {
							return false;
						}
					}
				} else {
					if (j + 1 === arr.length) {
						if (arr[0] === rule[2]) {
							return false;
						}
					} else {
						if (arr[j + 1] === rule[2]) {
							return false;
						}
					}
				}
				break;
			}
		}
	}
	return true;
}
