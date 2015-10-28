var jumpTimeout, rotateImgInterval;
var mobile = false;
var opened = false;
var iconHeight = 85;
var iconWidth = 88;
var taskbarHeight = 30;
var windowHeight = $(window).height() - taskbarHeight;
var windowWidth = $(window).width();
var iconsWide = Math.floor(windowWidth / iconWidth);
var iconsHigh = Math.floor(windowHeight / iconHeight);

if (!/^https?:\/\/tony\.brix\.ninja\/$/.test(location.href)) {
	if (/*location.protocol === "https:" && */window.history && window.history.replaceState) {
		history.replaceState("", document.title, "//tony.brix.ninja/");
	} else {
		location.replace("//tony.brix.ninja/");
	}
}
$(function () {
	$.mobile = $(window).width() < 800;
	(function () {
		var size = $("#tonysimgs img").css({opacity: 0}).size();
		for (var i = 0; i < 100; i++)
		{
			$($("#tonysimgs img")[Math.floor(Math.random() * size)]).detach().appendTo("#tonysimgs");
		}
		$("#tonysimgs img:first").css("opacity", 1).css(getImgProps("#tonysimgs img:first")).detach().appendTo("#portrait");
		$("#tonysimgs img:first").css(getImgProps("#tonysimgs img:first")).detach().appendTo("#portrait");
	})();
	$("#about .title").append(".exe");
	$("#resume .title").append(".txt");
	$(".shortcut .title").outlineLetters({color: "#7fa2e6"});
	$("#contact-info").outlineLetters({color: "#000000"});
	$(".shortcut").each(function (index) {
		$(this).css({
			background: "url(" + $(this).data("img") + ") no-repeat top center"
		});
	});
	var cursorindex = 0, cursorswitch = true, inputlength = 0, cmdindex = 0, cmdlist = new Array(), cursor;
	var about = " ----------------      -----------       ----      ----   ------      ------\n" +
			"|                |    /           \\     |    \\    |    |  \\     \\    /     /\n" +
			"|                |   /             \\    |     \\   |    |   \\     \\  /     /\n" +
			" -----      -----   |     -----     |   |      \\  |    |    \\     \\/     /\n" +
			"      |    |        |    /     \\    |   |       \\ |    |     \\          /\n" +
			"      |    |        |   |       |   |   |        \\|    |      \\        /\n" +
			"      |    |        |   |       |   |   |              |       \\      /\n" +
			"      |    |        |   |       |   |   |              |        |    |\n" +
			"      |    |        |   |       |   |   |    |\\        |        |    |\n" +
			"      |    |        |    \\     /    |   |    | \\       |        |    |\n" +
			"      |    |        |     -----     |   |    |  \\      |        |    |\n" +
			"      |    |         \\             /    |    |   \\     |        |    |\n" +
			"      |    |          \\           /     |    |    \\    |        |    |\n" +
			"       ----            -----------       ----      ----          ----\n" +
			"\n" +
			" --------------      --------------      --------------   ------      ------\n" +
			"|              \\    |              \\    |              |  \\     \\    /     /\n" +
			"|     -----     \\   |     -----     \\   |              |   \\     \\  /     /\n" +
			"|    |     \\    |   |    |     \\    |    ----      ----     \\     \\/     /\n" +
			"|    |     /    |   |    |     /    |        |    |          \\          /\n" +
			"|     -----     /   |     -----     /        |    |           \\        /\n" +
			"|              /    |              /         |    |            \\      /\n" +
			"|              \\    |           ---          |    |            /      \\\n" +
			"|     -----     \\   |    |\\     \\            |    |           /        \\\n" +
			"|    |     \\    |   |    | \\     \\           |    |          /          \\\n" +
			"|    |     /    |   |    |  \\     \\      ----      ----     /     /\\     \\\n" +
			"|     -----     /   |    |   \\     \\    |              |   /     /  \\     \\\n" +
			"|              /    |    |    \\     \\   |              |  /     /    \\     \\\n" +
			" --------------      ----      ------    --------------   ------      ------\n" +
			"\n" +
			"When I was nine years old I found QBasic on my parent’s computer. It quickly\n" +
			"became my favorite game. Ever since then I have been intrigued by computers\n" +
			"and programming languages.\n" +
			"\n" +
			"There are 35 languages in which I have written at least one program. My\n" +
			"favorite languages are PHP and C# with Java coming in a close third because\n" +
			"of Android. I continue to learn more every day and keep up with today’s\n" +
			"advancing technologies.\n" +
			"\n" +
			"I started my own computer repair business in high school, mostly working for\n" +
			"family members and friends. Also in high school I started freelance\n" +
			"programming thru websites such as GetACoder.com and others. I have worked on\n" +
			"many projects with many different kinds of people and have been able to work\n" +
			"with every one of them successfully.\n" +
			"\n" +
			"I am a very easy going and open person who thinks logically about every\n" +
			"decision. I consider myself a very lucky person to have found what I want to\n" +
			"do for the rest of my life at a very early age. To answer every high school\n" +
			"counselor’s question, if I had $1,000,000 I would write programs for anybody\n" +
			"and everybody.\n";
	var resume = "Anthony Brix\n" +
			"Tony@Brix.ninja\n" +
			"(320) 249-1820\n" +
			"\n" +
			"<span class='resume-header'>Technical Skills</span>\n" +
			"\n" +
			"Languages:  Assembly, ASP, ASP.NET, TI Basic, BF, C, C#, C++, ColdFusion, Dart, DB2, Flash, Go, HTML, Java, JavaScript, JSP, MATLAB, MySQL, Objective C, Octave, Perl, PHP, Python, QBasic, Regular Expressions, Ruby, Rails, SQL Server 2008, SQLite, Swift, TypeScript, VB6, VB.NET, VHDL, WML, XML\n" +
			"\n" +
			"Operating Systems: Windows, Mac OS X, iPhone OS, Android OS, Ubuntu, Knoppix, Fedora\n" +
			"\n" +
			"<span class='resume-header'>Education</span>\n" +
			"\n" +
			"St. Cloud Technical College\n" +
			"AAS Computer Programmer\n" +
			"Fall 2009, Spring 2010, Fall 2010 Dean’s List\n" +
			"\n" +
			"<span class='resume-header'>Experience</span>\n" +
			"\n" +
			"Viking Coca-Cola 06/14 – Present\n" +
			"Title: Web/Database Developer\n" +
			"Standard Duties: Develop and maintain websites and internal applications using PHP, MySQL, SQL Server, Java, C#, Javascript, CSS3, and HTML5\n" +
			"\n" +
			"Jadou 05/13 - Present\n" +
			"Title: Freelance Programmer\n" +
			"Standard Duties: Program web pages in PHP, MySQL, JavaScript, CSS3  and Html5, setup server for clients, setup and configure Drupal, create Drupal themes and modules.\n" +
			"\n" +
			"UziTech 08/03 – Present\n" +
			"Title: Owner\n" +
			"Standard Duties: Service and repair computers, install hardware and software, remove viruses, spyware, adware, recycle computers, order parts, maintain and design website, organize and inventory parts, develop applications for Windows in C# and Android in Java and XML.\n" +
			"\n" +
			"aSimpleDesign 05/11 - 08/13\n" +
			"Title: Freelance Programmer\n" +
			"Standard Duties: Program web pages in PHP, MySQL, JavaScript, CSS3  and Html5, setup servers for clients, setup Joomla, Drupal, Concrete5, and WordPress sites.\n" +
			"\n" +
			"Minnesota Computer Systems 02/10 – 06/14\n" +
			"Title: IT Director\n" +
			"Standard Manage IT department, keep computers and servers up to date and secure, answer calls, set up appointments with customers, service and repair copiers and computers, install hardware and software.\n" +
			"Extra Duties: Design and maintain website, add pictures, content, new pages, and update products.\n" +
			"\n" +
			"Luchiano’s Pizzeria 10/08 – 08/10\n" +
			"Title: Driver\n" +
			"Standard Duties: Deliver pizzas, wash dishes, clean.\n" +
			"Extra Duties: Configure POS system, update menu when needed, maintain and repair computers, update software.\n" +
			"\n" +
			"Tops Plus 01/07 – 10/08\n" +
			"Title: Laborer\n" +
			"Standard Duties: Build and install countertops, sweep shop, clean showroom, fill products and samples.\n" +
			"Extra Duties: Design and maintain website, create macros for Delta CAD, service and repair computers.\n" +
			"\n" +
			"Many Point Scout Camp 2003 – 2007 Summers\n" +
			"Titles: Program Counselor, C.O.P.E Instructor, Tower Assistant, Sailing Director\n" +
			"Standard Duties: Educate scouts in merit badges, provide safe environment to learn and grow, keep moral up in camps and activities.\n" +
			"\n" +
			"North Wind Scout Camp 2005 – 2009 Winters\n" +
			"Titles: Adventure Director, Adventure Assistant, Experience Assistant\n" +
			"Standard Duties: Educate scouts on winter camping survival, provide safe environment to learn and grow, direct games and team building exercises.";
	$("#resumecontent").html($.pre(resume));
	$("#aboutcontent").html($.pre("Type \"About\" to open the program\nor \"Help\" to diplay a list of commands\n\nC:\\Documents and Settings\\Tony Brix\\Desktop>")).window({
		shortcutID: "about",
		title: "cmd: C:\\Documents and Settings\\Tony Brix\\Desktop\\",
		minWidth: 780,
		initWidth: 780,
		initLeft: function () {
			return (($(window).width() - 780) / 2);
		},
		onBeforeClose: function () {
			$("#aboutcontent").unbind("keypress").unbind("keydown");
			cmdindex = 0;
			cmdlist = new Array();
		},
		onAfterClose: function () {
			$("#aboutcontent").html($.pre("Type \"About\" to open the program\nor \"Help\" to diplay a list of commands\n\nC:\\Documents and Settings\\Tony Brix\\Desktop>"));
			opened = false;
			clearInterval(cursor)
		},
		onBeforeOpen: function () {
			clearTimeout(jumpTimeout);
			opened = true;
		},
		onAfterOpen: function () {
			$("#aboutcontent").focus().append("<span id='input'><span id='cmd_cursor' style='color:#000;background-color:#fff;'>&nbsp;</span></span>")
					.keypress(function (e) {
						e.preventDefault();
						if (e.which == 13)
						{
							$("#cmd_cursor").before($("#cmd_cursor").text()).remove()
							var text = $("#input").html();
							if (text.substring(text.length - 1) == " ")
							{
								text = text.substring(0, text.length - 1);
							}
							else
							{
								text = text.substring(0, text.length - 6);
							}
							cmdlist.push(text);
							cmdindex = cmdlist.length;
							var input = $("#input").removeAttr("id");
							var args = getArgs(text);
							var command = args.shift();
							var display = "\n\n";
							switch (command.toLowerCase())
							{
								case "email":
									$("#email").click();
									break;
								case "portfolio":
									$("#portfolio").click();
									break;
								case "blog":
									$("#blog").click();
									break;
								case "facebook":
									$("#facebook").click();
									break;
								case "github":
									$("#github").click();
									break;
								case "gists":
									$("#gists").click();
									break;
								case "freecodecamp":
									$("#freecodecamp").click();
									break;
								case "gplus":
								case "googleplus":
									$("#googleplus").click();
									break;
								case "minesweeper":
									$("#minesweeper").click();
									break;
								case "resume":
								case "resume.txt":
									$("#resume").click();
									break;
								case "twitter":
									$("#twitter").click();
									break;
								case "about":
								case "about.exe":
									display += about;
									break;
								case "help":
									display += "ABOUT				  Show info about Tony Brix\n" +
											"BLOG          Open Blog\n" +
											"CD            Change directory\n" +
											"CLS           Clear the screen\n" +
											"DIR           Displays a list of files and subdirectories in a directory.\n" +
											"EMAIL         Open Send Email\n" +
											"EXIT          Close window\n" +
											"FACEBOOK      Open Facebook\n" +
											"FREECODECAMP  Open FreeCodeCamp\n" +
											"GISTS         Open Gists\n" +
											"GITHUB        Open GitHub\n" +
											"GPLUS         Open Google Plus\n" +
											"HELP          Show help menu\n" +
											"MINESWEEPER   Open Mine Sweeper\n" +
											"PORTFOLIO     Open Portfolio\n" +
											"RESUME        Open Resume.txt\n" +
											"TWITTER       Open Twitter\n" +
											"";
									break;
								case "exit":
									display += "Good Bye.";
									$("#aboutcontent").spellOut({
										time: 50,
										byLine: true,
										autoStart: true,
										onFinished: function () {
											this.spellOut("destroy");
										},
										onStep: function () {
											this.scrollTop(this.prop("scrollHeight"));
										},
										text: $.pre("\n\nGood Bye.")
									});
									setTimeout(function () {
										$("#aboutcontent").window("close");
									}, 500);
									return;
								case "dir":
									display += " Volume in drive C has no label\n" +
											" Volume Serial Number is D01F-C38A\n" +
											"\n" +
											" Directory of C:\\Documents and Settings\\Tony Brix\\Desktop\n" +
											"\n" +
											"05/06/2012  10:13 AM             3,185 About.exe\n" +
											"05/07/2012  11:24 AM             4,096 Resume.txt\n" +
											"              2 File(s)     7,281 bytes\n" +
											"              0 Dir(s)     0 bytes free\n";
									break;
								case "cls":
									$("#aboutcontent").html($.pre("Type \"About\" to open the program\nor \"Help\" to diplay a list of commands\n\nC:\\Documents and Settings\\Tony Brix\\Desktop>") + "<span id='input'><span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + $.pre(" ") + "</span></span>");
									return;
								case "":
									display += "";
									break;
								default:
									if (text.substring(0, 3).toLowerCase() == "cd ")
									{
										if (text.substring(3).toLowerCase() != "\"C:\\Documents and Settings\\Tony Brix\\Desktop\"")
										{
											display += "Access is denied.\n";
										}
										else
										{
											display = "\n";
										}
									}
									else
									{
										display += "'" + command + "' is not recognized as an internal or external command,\noperable program or batch file.\n";
									}
							}
							$("#aboutcontent").spellOut({
								time: 50,
								byLine: true,
								autoStart: true,
								onFinished: function () {
									this.spellOut("destroy");
								},
								onStep: function () {
									this.scrollTop(this.prop("scrollHeight"));
								},
								text: $.pre(display + "\nC:\\Documents and Settings\\Tony Brix\\Desktop>") + "<span id='input'><span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">&nbsp;</span></span>"
							});
						}
						else if (e.which >= 32 && e.which <= 126)
						{
							var keychar = String.fromCharCode(e.which);
							if (keychar == " ")
							{
								keychar = $.pre(" ");
							}
							$("#cmd_cursor").before(keychar);
						}
						$("#aboutcontent").scrollTop($("#aboutcontent").prop("scrollHeight"));
					})
					.keydown(function (e) {
						switch (e.which)
						{
							case 8:///backspace
								e.preventDefault();
								var inputhtml = $("#input").html();
								var delindex = inputhtml.indexOf("<");
								var newinputhtml = "";
								if (inputhtml.substring(delindex - 4, delindex) == "&lt;" || inputhtml.substring(delindex - 4, delindex) == "&gt;" || inputhtml.substring(delindex - 4, delindex) == "&#0;")
								{
									newinputhtml = inputhtml.substring(0, delindex - 4) + inputhtml.substring(delindex);
								}
								else if (inputhtml.substring(delindex - 5, delindex) == "&amp;")
								{
									newinputhtml = inputhtml.substring(0, delindex - 5) + inputhtml.substring(delindex);
								}
								else if (inputhtml.substring(delindex - 6, delindex) == "&nbsp;")
								{
									newinputhtml = inputhtml.substring(0, delindex - 6) + inputhtml.substring(delindex);
								}
								else
								{
									newinputhtml = inputhtml.substring(0, delindex - 1) + inputhtml.substring(delindex);
								}
								$("#input").html(newinputhtml);
								break;
							case 46:///delete
								e.preventDefault();
								var delindex = $("#input").html().indexOf("<");
								$("#cmd_cursor").remove();
								var inputhtml = $("#input").html();
								var newinputhtml = "";
								if (delindex == inputhtml.length)
								{
									newinputhtml = inputhtml + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">&nbsp;</span>";
								}
								else if (inputhtml.substring(delindex, delindex + 4) == "&lt;" || inputhtml.substring(delindex, delindex + 4) == "&gt;")
								{
									newinputhtml = inputhtml.substring(0, delindex) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(delindex, delindex + 4) + "</span>" + inputhtml.substring(delindex + 4);
								}
								else if (inputhtml.substring(delindex, delindex + 5) == "&amp;")
								{
									newinputhtml = inputhtml.substring(0, delindex) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(delindex, delindex + 5) + "</span>" + inputhtml.substring(delindex + 5);
								}
								else if (inputhtml.substring(delindex, delindex + 6) == "&nbsp;")
								{
									newinputhtml = inputhtml.substring(0, delindex) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(delindex, delindex + 6) + "</span>" + inputhtml.substring(delindex + 6);
								}
								else
								{
									newinputhtml = inputhtml.substring(0, delindex) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(delindex, delindex + 1) + "</span>" + inputhtml.substring(delindex + 1);
								}
								$("#input").html(newinputhtml);
								break;
							case 38:///up
								e.preventDefault();
								if (cmdindex > 0)
								{
									$("#input").html(cmdlist[--cmdindex] + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">&nbsp;</span>");
								}
								break;
							case 37:///left
								e.preventDefault();
								var curIndex = $("#input").html().indexOf("<");
								var cursorChar = $("#cmd_cursor").html();
								$("#cmd_cursor").before(cursorChar).remove();
								var inputhtml = $("#input").html();
								var newinputhtml = "";
								if (curIndex == 0)
								{
									newinputhtml = "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(0, cursorChar.length) + "</span>" + inputhtml.substring(cursorChar.length);
								}
								else if (inputhtml.substring(curIndex - 4, curIndex) == "&lt;" || inputhtml.substring(curIndex - 4, curIndex) == "&gt;")
								{
									newinputhtml = inputhtml.substring(0, curIndex - 4) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(curIndex - 4, curIndex) + "</span>" + inputhtml.substring(curIndex);
								}
								else if (inputhtml.substring(curIndex - 5, curIndex) == "&amp;")
								{
									newinputhtml = inputhtml.substring(0, curIndex - 5) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(curIndex - 5, curIndex) + "</span>" + inputhtml.substring(curIndex);
								}
								else if (inputhtml.substring(curIndex - 6, curIndex) == "&nbsp;")
								{
									newinputhtml = inputhtml.substring(0, curIndex - 6) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(curIndex - 6, curIndex) + "</span>" + inputhtml.substring(curIndex);
								}
								else
								{
									newinputhtml = inputhtml.substring(0, curIndex - 1) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(curIndex - 1, curIndex) + "</span>" + inputhtml.substring(curIndex);
								}
								$("#input").html(newinputhtml);
								break;
							case 40:///down
								e.preventDefault();
								if (cmdindex < cmdlist.length - 1)
								{
									$("#input").html(cmdlist[++cmdindex] + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">&nbsp;</span>");
								}
								break;
							case 39:///right
								e.preventDefault();
								var curIndex = $("#input").html().indexOf("<");
								var cursorChar = $("#cmd_cursor").html();
								$("#cmd_cursor").before(cursorChar).remove();
								var inputhtml = $("#input").html();
								var newinputhtml = "";
								if (curIndex == inputhtml.length - 6)
								{
									newinputhtml = inputhtml.substring(0, inputhtml.length - 6) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">&nbsp;</span>";
								}
								else if (inputhtml.substring(curIndex + cursorChar.length, curIndex + cursorChar.length + 4) == "&lt;" || inputhtml.substring(curIndex + cursorChar.length, curIndex + cursorChar.length + 4) == "&gt;")
								{
									newinputhtml = inputhtml.substring(0, curIndex + cursorChar.length) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(curIndex + cursorChar.length, curIndex + cursorChar.length + 4) + "</span>" + inputhtml.substring(curIndex + cursorChar.length + 4);
								}
								else if (inputhtml.substring(curIndex + cursorChar.length, curIndex + cursorChar.length + 5) == "&amp;")
								{
									newinputhtml = inputhtml.substring(0, curIndex + cursorChar.length) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(curIndex + cursorChar.length, curIndex + cursorChar.length + 5) + "</span>" + inputhtml.substring(curIndex + cursorChar.length + 5);
								}
								else if (inputhtml.substring(curIndex + cursorChar.length, curIndex + cursorChar.length + 6) == "&nbsp;")
								{
									newinputhtml = inputhtml.substring(0, curIndex + cursorChar.length) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(curIndex + cursorChar.length, curIndex + cursorChar.length + 6) + "</span>" + inputhtml.substring(curIndex + cursorChar.length + 6);
								}
								else
								{
									newinputhtml = inputhtml.substring(0, curIndex + cursorChar.length) + "<span id='cmd_cursor'" + ((!cursorswitch) ? " style='color:#000;background-color:#fff;'" : "") + ">" + inputhtml.substring(curIndex + cursorChar.length, curIndex + cursorChar.length + 1) + "</span>" + inputhtml.substring(curIndex + cursorChar.length + 1);
								}
								$("#input").html(newinputhtml);
								break;
						}
					});
			cursor = setInterval(function () {
				if (cursorswitch)
				{
					$("#cmd_cursor").css({color: "#000", "background-color": "#fff"});
				}
				else
				{
					$("#cmd_cursor").css({color: "#fff", "background-color": "#000"});
				}
				cursorswitch = !cursorswitch;
			}, 600);
		}
	});
	$("#resumecontent").window({
		shortcutID: "resume",
		title: "Resume.txt: Read-Only",
		titleIcon: "/images/resume.png"
	});
	$("#pwalgcontent").window({
		shortcutID: "pwalg",
		title: "Password Algorithm",
		initWidth: 355,
		initHeight: 292,
		resizeable: false,
		maximizable: false
	});
	$("#pwscontent").window({
		shortcutID: "pws",
		title: "Password Keys",
		initWidth: 342,
		//maxWidth: 342,
		minWidth: 342,
		//maximizable: false,
		menuBar: {
			Help: function () {
				alert("Save your passwords so you only have to remember one.\n\nThis saves all your data to your browser data storage. Nothing is stored to our servers.");
			}
		}
	});
	/*$("#portfoliocontent").window({
	 shortcutID: "portfolio",
	 title: "Portfolio"
	 });*/
	/*$("#emailcontent").window({
	 shortcutID: "email",
	 title: "Send Email: Tony@Brix.ninja",
	 titleIcon: "/images/email.png",
	 minHeight: 200,
	 minWidth: 550,
	 onResizeStep: function(){
	 $("#emailinput .send_input").css({width: ($("#emailcontent").width() - 71) + "px"});
	 $("#emailbody_ifr").css({
	 width: ($("#emailcontent").width() - 1) + "px",
	 height: ($("#emailcontent").height() - 151) + "px"
	 });
	 },
	 onAfterClose: function(){
	 $("#from, #subject").val("");
	 $("textarea.tinymce").html("");
	 },
	 onAfterOpen: function(){
	 $("#emailinput .send_input").css({width: ($("#emailcontent").width() - 71) + "px"});
	 $("#emailbody_ifr").css({
	 width: ($("#emailcontent").width() - 1) + "px",
	 height: ($("#emailcontent").height() - 151) + "px"
	 });
	 }
	 });
	 $('textarea.tinymce').tinymce({
	 // Location of TinyMCE script
	 script_url : '/tiny_mce/tiny_mce.js',
	 // General options
	 theme : "advanced",
	 plugins : "autolink,save,lists,emotions,visualchars,nonbreaking,advlist",// Theme options
	 theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontselect,fontsizeselect,forecolor,backcolor",
	 theme_advanced_buttons2 : "save,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,image,|,hr,removeformat,|,sub,sup,|,charmap,emotions,|,visualchars,nonbreaking",
	 theme_advanced_buttons3 : "",
	 theme_advanced_toolbar_location : "top",
	 theme_advanced_toolbar_align : "left",
	 theme_advanced_statusbar_location : "bottom",
	 nonbreaking_force_tab : true,
	 relative_urls: false,
	 document_base_url: "http://Tony.Brix.ninja/",
	 doctype: "<!DOCTYPE html>",
	 oninit: function(){
	 $("span.mce_save").css({
	 background: "url(/images/send_icon.png) no-repeat center left"
	 });
	 $("a.mce_save").attr("title", "Send (Ctrl+S)");
	 $("a.mce_save #emailbody_save_voice").text("Send (Ctrl+S)");
	 $("#emailbody_toolbargroup span[role='application']").append("<div id='emailinput'><div id='emailfrom'><div class='send_icon'></div><div class='send_label'>From:</div><input type='text' class='send_input' id='from' value='' /></div>"+
	 "<div id='emailto'><div class='send_icon'></div><div class='send_label'>To:</div><input type='text' class='send_input' value='Tony Brix <Tony@Brix.ninja>' readonly='true' /></div>"+
	 "<div id='emailsubject'><div class='send_label' style='margin-left:4px;margin-right:21px;'>Subject:</div><input type='text' class='send_input' id='subject' value='' /></div></div>");
	 $(".mceStatusbar").html("").css({height: "24px"});
	 $("<div id='emailsend'>Send</div>").appendTo(".mceStatusbar")
	 .hover(function(){
	 $(this).css({
	 "background-color": "#B2BBD0",
	 "border-color": "#0A246A",
	 "color": "#182237"
	 });
	 }, function(){
	 $(this).css({
	 "background-color": "#ccc",
	 "border-color": "#999",
	 "color": "#333"
	 });
	 })
	 .click(emailSend);
	 },
	 save_onsavecallback : emailSend
	 });*/
	$("#minesweepercontent").window({
		shortcutID: "minesweeper",
		titleIcon: "js/minesweeper/images/mine_icon_sm.png",
		title: "Minesweeper",
		initWidth: (((!$.store.disabled) ? $.store.get("width") : 16) * 16) + 20,
		initHeight: (((!$.store.disabled) ? $.store.get("height") : 16) * 16) + 64,
		resizeable: false,
		maximizable: false,
		onAfterMinimize: function () {
			$("#minesweepercanvas").minesweeper("stopTimer");
		},
		onBeforeRestore: function () {
			$("#minesweepercanvas").minesweeper("startTimer");
		},
		onBeforeClose: function () {
			$("#customcontent").window("close");
			$("#highscorescontent").window("close");
		},
		onAfterClose: function () {
			$("#minesweepercanvas").minesweeper("reset");
		},
		onBeforeOpen: function () {
			if ($("html").hasClass("no-canvas"))
			{
				if (confirm("Your browser does not support this game.\n\nDo you want to update your browser?"))
				{
					location.href = "http://browsehappy.com/";
				}
			}
		},
		onAfterOpen: function () {
			$("#minesweepercanvas").focus();
		},
		menuBar: {
			Game: {
				New: function () {
					$("#minesweepercanvas").minesweeper("reset");
				},
				"-2": "",
				Expert: function () {
					$("#minesweepercanvas").minesweeper("setOptions", {
						height: 16,
						width: 30,
						totalMines: 99
					});
					$("#minesweepercontent").css({width: (30 * 16) + 20, height: (16 * 16) + 64});
					if (!$.store.disabled)
					{
						$.store.set("height", 16);
						$.store.set("width", 30);
						$.store.set("totalMines", 99);
					}
				},
				Intermediate: function () {
					$("#minesweepercanvas").minesweeper("setOptions", {
						height: 16,
						width: 16,
						totalMines: 40
					});
					$("#minesweepercontent").css({width: (16 * 16) + 20, height: (16 * 16) + 64});
					if (!$.store.disabled)
					{
						$.store.set("height", 16);
						$.store.set("width", 16);
						$.store.set("totalMines", 40);
					}
				},
				Beginner: function () {
					$("#minesweepercanvas").minesweeper("setOptions", {
						height: 9,
						width: 9,
						totalMines: 10
					});
					$("#minesweepercontent").css({width: (9 * 16) + 20, height: (9 * 16) + 64});
					if (!$.store.disabled)
					{
						$.store.set("height", 9);
						$.store.set("width", 9);
						$.store.set("totalMines", 10);
					}
				},
				Custom: function () {
					var data = $("#minesweepercanvas").minesweeper("getData");
					$("#customcontent #height").val(data.height);
					$("#customcontent #width").val(data.width);
					$("#customcontent #mines").val(data.totalMines);
				},
				"-1": "",
				"Best Times...": function () {
					if (!$.store.disabled)
					{
						$("#highscorescontent #beginner").html("Beginner:\t\t" + $.store.get("beginner").time + " seconds\t" + $.store.get("beginner").name);
						$("#highscorescontent #intermediate").html("Intermediate:\t" + $.store.get("intermediate").time + " seconds\t" + $.store.get("intermediate").name);
						$("#highscorescontent #expert").html("Expert:\t\t" + $.store.get("expert").time + " seconds\t" + $.store.get("expert").name);
					}
					else
					{
						alert("Enable local storage to save high scores.");
					}
				}
			},
			Help: {
				"About MineSweeper": function () {
					alert("Design by Microsoft\n\nProgramming by Tony Brix");
				}
			}
		}
	});
	$("#New2").append("<span class='wdw-menuItem' style='float: right;'>F2</span>");
	$("#About_MineSweeper2").css({width: "109px"});
	$("#minesweepercanvas").minesweeper();
	$("<div id='customcontent' style='background-color:#E0DFE3;overflow:hidden !important;font-size:12px;padding:25px 15px 0px 15px;'>" +
			"<div style='float:left;'>" +
			"<label for='height'>Height: </label><input type='text' name='height' id='height' style='width:30px' maxlength='3' /><br />" +
			"<label for='width' style='margin-left: 5px;'>Width: </label><input type='text' name='width' id='width' style='width:30px' maxlength='3' /><br />" +
			"<label for='mines' style='margin-left: 3px;'>Mines: </label><input type='text' name='mines' id='mines' style='width:30px' maxlength='3' /><br />" +
			"</div>" +
			"<div style='float:right'>" +
			"<button id='ok' style='width: 55px;margin-bottom: 20px;'>OK</button><br/><button id='cancel'>Cancel</button>" +
			"</div>" +
			"</div>").window({
		shortcutID: "minesweeper_Custom2",
		titleIcon: "js/minesweeper/images/mine_icon_sm.png",
		title: "Custom Field",
		initWidth: 150,
		initHeight: 86,
		resizeable: false,
		maximizable: false,
		minimizable: false,
		animateWindow: false,
		showMinimize: false,
		showMaximize: false
	});
	$("#customcontent #ok").click(function () {
		var height = parseInt($("#customcontent #height").val());
		var width = parseInt($("#customcontent #width").val());
		var mines = parseInt($("#customcontent #mines").val());
		if (isNaN(height))
		{
			alert("Height must be a number.");
			$("#customcontent #height").focus().select();
		}
		else if (isNaN(width))
		{
			alert("Width must be a number.");
			$("#customcontent #width").focus().select();
		}
		else if (isNaN(mines))
		{
			alert("Mines must be a number.");
			$("#customcontent #mines").focus().select();
		}
		else if (mines < 1)
		{
			alert("Mines must be greater than 0");
			$("#customcontent #mines").focus().select();
		}
		else if (width < 8)
		{
			alert("Width must be greater than 7");
			$("#customcontent #width").focus().select();
		}
		else if (height < 1)
		{
			alert("Height must be greater than 0");
			$("#customcontent #height").focus().select();
		}
		else if (mines >= width * height)
		{
			alert("Too many mines.");
			$("#customcontent #mines").focus().select();
		}
		else
		{
			$("#minesweepercanvas").minesweeper("setOptions", {
				height: height,
				width: width,
				totalMines: mines
			});
			$("#minesweepercontent").css({width: (width * 16) + 20, height: (height * 16) + 64});
			if (!$.store.disabled)
			{
				$.store.set("height", height);
				$.store.set("width", width);
				$.store.set("totalMines", mines);
			}
			$("#customcontent").window("close");
		}
	});
	$("#customcontent input").keydown(function (e) {
		if (e.which == 13)
		{
			$("#customcontent #ok").click();
		}
	});
	$("#customcontent #cancel").click(function () {
		$("#customcontent").window("close");
	});

	if (!$.store.disabled)
	{
		$("<div id='highscorescontent' style='background-color: #E0DFE3; overflow: hidden !important; font-size: 11px; white-space: pre; padding: 23px 0px 15px 15px;'>" +
				"<div id='beginner'>" +
				"Beginner:\t\t999 seconds/tAnonymous" +
				"</div>" +
				"<div id='intermediate'>" +
				"Intermediate:\t999 seconds/tAnonymous" +
				"</div>" +
				"<div id='expert'>" +
				"Expert:\t\t999 seconds/tAnonymous" +
				"</div>" +
				"<button id='reset' style='margin: 15px 38px 0px 23px;'>Reset Scores</button><button id='ok'>OK</button>" +
				"</div>").window({
			shortcutID: "minesweeper_Best_Times___2",
			titleIcon: "js/minesweeper/images/mine_icon_sm.png",
			title: "Fastest Mine Sweepers",
			initWidth: "235px",
			initHeight: "80px",
			resizeable: false,
			maximizable: false,
			minimizable: false,
			animateWindow: false,
			showMinimize: false,
			showMaximize: false
		});
		$("#highscorescontent #reset").click(function () {
			if (confirm("Are you sure you want to reset the high scores?"))
			{
				$.store.set("expert", {time: 999, name: "Anonymous"});
				$.store.set("intermediate", {time: 999, name: "Anonymous"});
				$.store.set("beginner", {time: 999, name: "Anonymous"});
				$("#highscorescontent #beginner").html("Beginner:\t\t999 seconds\tAnonymous");
				$("#highscorescontent #intermediate").html("Intermediate:\t999 seconds\tAnonymous");
				$("#highscorescontent #expert").html("Expert:\t\t999 seconds\tAnonymous");
			}
		});
		$("#highscorescontent #ok").click(function () {
			$("#highscorescontent").window("close");
		});
	}
	$(window).resize(function () {
		$("#portrait img").each(function () {
			$(this).css(getImgProps(this));
		});
		$.mobile = $(window).width() < 800;
		if ($.mobile) {
			$(".wdw-window").not(".wdw-minimized").css("display", "none");
		} else {
			$(".wdw-window").not(".wdw-minimized").css("display", "block");
		}
		(function () {
			windowHeight = $(window).height() - taskbarHeight;
			windowWidth = $(window).width();
			if (windowWidth > iconWidth && windowHeight > iconHeight && (Math.floor(windowWidth / iconWidth) != iconsWide || Math.floor(windowHeight / iconHeight) != iconsHigh)) {
				iconsWide = Math.floor(windowWidth / iconWidth);
				iconsHigh = Math.floor(windowHeight / iconHeight);
				positionIcons();
			}
		})();
	});
	$(document).scroll(function () {
		$(this).scrollTop(1);
	});
	$(this).scrollTop(1);
	$("div[data-href]").click(function () {
		if ($.mobile) {
			location.href = $(this).attr("data-href");
		} else {
			window.open($(this).attr("data-href"));
		}
	});
	positionIcons();
	$("body").css({display: "block"});

	rotateImgInterval = setInterval(rotateImg, 10000);
	jumpTimeout = setTimeout(function () {
		iconJump("#about")
	}, 2000);
});//end document ready
function positionIcons() {
	$(".shortcut").not(".mobile").each(function (index) {
		var xPos = Math.floor((index) / Math.floor(windowHeight / iconHeight));
		var yPos = index - (Math.floor(windowHeight / iconHeight) * xPos);
		$(this).css({left: xPos * iconWidth, top: yPos * iconHeight});
	});
}
/*function emailSend(){
 var from = $("#from").val();
 var subject = $("#subject").val();
 var body = $("#emailbody").html();
 if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(from))
 {
 alert("You must enter a valid from address");
 $("#from").focus().select();
 return;
 }
 if(subject == "" && !confirm("Your subject is blank. Are you sure you want to send an empty subject?"))
 {
 return;
 }
 if(body == "")
 {
 alert("You cannot send an empty body.");
 return;
 }
 $("#emailcontent .overlay").css({width: $("#emailcontent").width() + "px", height: $("#emailcontent").height() + "px", display: "block"});
 $.post("sendemail.php", {from: from, subject: subject, body: body}, function(data){
 $("#emailcontent .overlay").css({display: "none"});
 if(data.success)
 {
 alert("Email sent successfully");
 $("#emailcontent").window("close");
 }
 else
 {
 alert(data.error);
 }
 }, "json");
 }*/
function iconJump(elem)
{
	if (!opened)
	{
		$(elem).animate({
			"margin-top": "-=8px",
			"margin-bottom": "+=8px"
		}, {
			easing: "swing",
			duration: 200,
			complete: function () {
				$(elem).animate({
					"margin-top": "+=8px",
					"margin-bottom": "-=8px"
				}, {
					easing: "swing",
					duration: 200,
					complete: function () {
						$(elem).animate({
							"margin-top": "-=4px",
							"margin-bottom": "+=4px"
						}, {
							easing: "swing",
							duration: 150,
							complete: function () {
								$(elem).animate({
									"margin-top": "+=4px",
									"margin-bottom": "-=4px"
								}, {
									easing: "swing",
									duration: 150,
									complete: function () {
										$(elem).animate({
											"margin-top": "-=2px",
											"margin-bottom": "+=2px"
										}, {
											easing: "swing",
											duration: 100,
											complete: function () {
												$(elem).animate({
													"margin-top": "+=2px",
													"margin-bottom": "-=2px"
												}, {
													easing: "swing",
													duration: 100,
													complete: function () {
														if (!opened && !$.mobile)
														{
															jumpTimeout = setTimeout(function () {
																iconJump(elem)
															}, 2000);
														}
													}
												});
											}
										});
									}}
								);
							}
						});
					}
				});
			}
		});
	}
}
function getArgs(text)
{
	var arr = ($.window.ie <= 8) ? text.split("&nbsp;") : text.split(" ");
	var args = new Array();
	var inQuotes = false;
	for (var i = 0; i < arr.length; i++)
	{
		if (inQuotes)
		{
			if (arr[i].substring(arr[i].length - 1) == "\"")
			{
				inQuotes = false;
				args[args.length - 1] += " " + arr[i].substring(0, arr[i].length - 1);
			}
			else
			{
				args[args.length - 1] += " " + arr[i];
			}
		}
		else if (arr[i].substring(0, 1) == "\"")
		{
			if (arr[i].substring(arr[i].length - 1) == "\"")
			{
				args.push(arr[i].substring(1, arr[i].length - 1));
			}
			else
			{
				inQuotes = true;
				args.push(arr[i].substring(1));
			}
		}
		else
		{
			args.push(arr[i]);
		}
	}
	return args;
}
function rotateImg()
{
	$("#portrait img:first").animate({
		opacity: "0"
	}, {
		duration: 500,
		complete: function () {
			$(this).detach().appendTo("#tonysimgs");
		}
	});
	$("#portrait img:last").css({display: "block"}).animate({
		opacity: "1"
	}, {
		duration: 500,
		complete: function () {
			$("#tonysimgs img:first").css(getImgProps("#tonysimgs img:first")).detach().appendTo("#portrait");
		}
	});
}
function getImgProps(selector) {
	var $window = $(window);
	var props = {},
			wHeight = (($.mobile) ? $window.height() : $window.height() - $("#taskbar").height()),
			wWidth = $window.width(),
			pWidth = $(selector).data("width"),
			pHeight = $(selector).data("height");
	props.width = wWidth / pWidth;
	props.height = wHeight / pHeight;
	if (props.width >= 1 && props.height >= 1) {
		props.width = pWidth;
		props.height = pHeight;
	} else if (props.width < props.height) {
		props.height = pHeight * props.width;
		props.width = pWidth * props.width;
	} else {
		props.width = pWidth * props.height;
		props.height = pHeight * props.height;
	}
	props.left = (wWidth - props.width) / 2;
	props.left = (props.left > 0) ? props.left : 0;
	props.top = (wHeight - props.height) / 2;
	props.top = (props.top > 0) ? props.top : 0;
	return props;
}
(function ($) {
	$.pre = function (text) {
		if ($.window.ie <= 8)
		{
			return text.replace(/^[^\S\n]/, "&nbsp;").replace(/[\n][^\S\n]/g, "\n&nbsp;").replace(/[^\S\n]{2}/g, " &nbsp;").replace(/\n/g, "<br/>\n");
		}
		else
		{
			return text;
		}
	};
	$.fn.pre = function () {
		return $.pre(this.html());
	};
})(jQuery);
