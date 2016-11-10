/** *************************\
| Author: Tony Brix         |
| URL: http://tonybrix.info |
\***************************/
/*
issues:
todo:
  implement start menu, context menus
*/

(function ($) {
	$(function () {
		$("<div id='taskbar'>" +
			"  <div id='startmenu'></div>" +
			"  <img src='js/window/images/start_button.png' id='startbutton' />" +
			"  <div id='programs'></div>" +
			"  <div id='tray'>" +
			"    <div id='trayicons'>" +
			"      <div id='time'></div>" +
			"    </div>" +
			"  </div>" +
			"</div>" +
			"<div style='position:absolute;top:-9999px;left:-9999px'>" +
			"<img src='js/window/images/cmd_buttons_close.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_close_clicked.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_maximize.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_maximize_clicked.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_maximize_disabled.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_minimize.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_minimize_clicked.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_minimize_disabled.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_restore.png' alt=' ' />" +
			"<img src='js/window/images/cmd_buttons_restore_clicked.png' alt=' ' />" +
			"<img src='js/window/images/cmd_icon.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_stretch_bottom.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_stretch_left.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_stretch_right.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_stretch_se.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_stretch_sw.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_topborder_bottom.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_topborder_bottomleft.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_topborder_bottomright.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_topborder_left.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_topborder_right.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_topborder_top.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_topborder_topleft.png' alt=' ' />" +
			"<img src='js/window/images/cmd_window_topborder_topright.png' alt=' ' />" +
			"<img src='js/window/images/start_button.png' alt=' ' />" +
			"<img src='js/window/images/start_button_clicked.png' alt=' ' />" +
			"</div>").appendTo("body");

		$("#startbutton").mousedown(function (e) {
			$(this).attr("src", "js/window/images/start_button_clicked.png");
		}).click(function (e) {
			$(this).attr("src", "js/window/images/start_button.png");
			throw ("open startmenu not implemented");
		}).mouseleave(function (e) {
			$(this).attr("src", "js/window/images/start_button.png");
		});
		$.window.setTime();
		$("<div id='wdw-resize' />").appendTo("body");
	});
	$.window = {
		data: {},
		/*
		 * IE version detection approach by James Padolsey
		 * http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
		 */
		ie: (function () {
			var undef,
				v = 3,
				div = document.createElement("div"),
				all = div.getElementsByTagName("i");
			while (
				div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->",
				all[0]
			);
			return v > 4 ? v : undef;
		}()),
		moveWindowToTop: function ($window) {
			if (typeof ($window) === "undefined") {
				$(".wdw-topWindow").css({ "z-index": "0" }).removeClass("wdw-topWindow");
				$(".topwindow").removeClass("topwindow");
				var topWindow = null;
				var topZindex = 0;
				$(".wdw-window").each(function () {
					if (!$(this).hasClass("wdw-minimized") && parseInt($(this).css("z-index")) > topZindex) {
						topZindex = parseInt($(this).css("z-index"));
						topWindow = $(this);
					}
				});
				if (topZindex !== 0) {
					$(".wdw-program[data-shortcutid=" + topWindow.attr("data-shortcutid") + "]").addClass("topwindow");
					topWindow.addClass("wdw-topWindow");
				}
			} else {
				if (!$window.hasClass("wdw-topWindow")) {
					if ($(".wdw-topWindow").size() === 0) {
						$(".wdw-program[data-shortcutid=" + $window.attr("data-shortcutid") + "]").addClass("topwindow");
						$window.css({ "z-index": "10" }).addClass("wdw-topWindow");
					} else {
						$(".wdw-program.topwindow").removeClass("topwindow");
						$(".wdw-program[data-shortcutid=" + $window.attr("data-shortcutid") + "]").addClass("topwindow");;
						$window.css({ "z-index": parseInt($(".wdw-topWindow").removeClass("wdw-topWindow").css("z-index")) + 1 }).addClass("wdw-topWindow");
					}
				}
			}
		},

		getRestoreVal: function (value) {
			switch (typeof (value)) {
				case "string":
					return value;
				case "number":
					return value + "px";
				case "function":
					return $.window.getRestoreVal(value());
				default:
					throw ("invalid type");
			}
		},

		setTime: function () {
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var a = "AM";
			if (h >= 12) {
				if (h > 12) {
					h -= 12;
				}
				a = "PM";
			} else if (h === 0) {
				h = 12;
			}
			if (m < 10) {
				m = "0" + m;
			}
			$("#time").text(h + ":" + m + " " + a);
			setTimeout($.window.setTime, 1000);
		}
	};
	var funcs = {
		hideMenu: function () {
			return this.each(function () {
				var $this = $(this);
				var data = $this.data("wdw");
				if (!data) {
					throw ("Not Initialized");
				}
				$(".wdw-menubar>ul ul", data.$window).css({ opacity: 0, display: "none" });
			});
		},
		init: function (options) {
			return this.each(function () {
				var $this = $(this);

				if ($this.data("wdw")) {
					throw ("Already initialized");
				}
				var data = {};

				/*
				  All heights and widths are not including the borders.

				  The window width will always be 11px wider.
				  The window height will always be 33px taller.
				*/

				data.settings = $.extend({
					shortcutID: "",

					// /16px X 16px icon
					titleIcon: "js/window/images/cmd_icon.png",
					title: "cmd",
					initHeight: function () { return ($(window).height() - 89); },
					initWidth: function () { return ($(window).width() - 41); },
					initTop: 15,
					initLeft: 15,

					 // /must be 1 or greater because of a chrome bug
					minHeight: 1,

					 // /0 = window max
					maxHeight: 0,

					 // /must be 1 or greater because of a chrome bug
					minWidth: 1,

					 // /0 = window max
					maxWidth: 0,
					onBeforeClose: $.noop,
					onAfterClose: $.noop,
					onBeforeMaximize: $.noop,
					onAfterMaximize: $.noop,
					onBeforeMinimize: $.noop,
					onAfterMinimize: $.noop,
					onBeforeRestore: $.noop,
					onAfterRestore: $.noop,
					onBeforeOpen: $.noop,
					onAfterOpen: $.noop,
					onResizeStart: $.noop,
					onResizeStop: $.noop,
					onResizeStep: $.noop,
					onDragStart: $.noop,
					onDragStop: $.noop,
					onDragStep: $.noop,
					resizeable: true,
					draggable: true,
					maximizable: true,
					minimizable: true,
					contextMenu: null,
					menuBar: null,
					animateWindow: true,
					showMinimize: true,
					showMaximize: true
				}, options);
				if (data.settings.shortcutID === "") {
					throw ("shortcutID cannot be empty");
				}
				if (data.settings.minHeight <= 0) {
					data.settings.minHeight = 1;
				}
				if (data.settings.minWidth <= 0) {
					data.settings.minWidth = 1;
				}

				var menuBar = null;
				if (data.settings.menuBar) {
					menuBar = (function addMenu(menu, level) {
						var ul = $("<ul data-level='" + level + "' />");
						for (var itema in menu) {
							var li = $("<li/>");
							if (itema.substring(0, 1) === "-") {
								li.append("<hr class='wdw-menuItem' style='margin:0 auto;width:95%;border:0;height:1px;color:#888;background-color:#888;' />");
							} else {
								var div = $("<div class='wdw-menuItem' id='" + data.settings.shortcutID + "_" + (itema.replace(/[\s\.]/g, "_") + level) + "'>" + itema + "</div>");
								li.append(div);
								div.hover(function () { $(this).addClass("hover"); }, function () { $(this).removeClass("hover"); });
								switch (typeof (menu[itema])) {
									case "function":
										div.click({ itema: itema }, function (e) {
											funcs.hideMenu.call($this);
											menu[e.data.itema].call($this);
										});
										break;
									case "object":
										var submenu = addMenu(menu[itema], level + 1);
										div.click(function () {
											var $submenu = $(this).next();
											if ($submenu.css("display") === "none") {
												if (parseInt($submenu.attr("data-level")) === 2) {
													$submenu.parent().siblings().each(function () {
														$("ul", this).css({
															display: "none",
															opacity: 0
														});
													});
												} else if (parseInt($submenu.attr("data-level")) > 2) {
													$submenu.css({
														left: $(this).parent().width(),
														top: -1
													});
												}
												$submenu.css({
													display: "block"
												}).animate({
													opacity: 1
												}, {
													duration: 200
												});
											} else {
												$("ul", $submenu.parent()).css({
													display: "none",
													opacity: 0
												});
											}
										});
										li.append(submenu);
										break;
									default:
										throw ("Invalid menuBar item type");
								}
							}
							ul.append(li);
						}
						return ul;
					})(data.settings.menuBar, 1);
				}

				$this.addClass("wdw-main").attr("data-shortcutid", data.settings.shortcutID);
				data.$shortcut = $("#" + data.settings.shortcutID);
				data.$window = $("<table class='wdw-window wdw-minimized' data-shortcutid='" + data.settings.shortcutID + "' cellspacing='0' cellpadding='0'>" +
					"<tbody>" +
					"<tr class='titlebartop'>" +
					"<td class='left'></td>" +
					"<td class='center'></td>" +
					"<td class='right'></td>" +
					"</tr>" +
					"<tr class='titlebarmiddle'>" +
					"<td class='left'></td>" +
					"<td class='center'>" +
					"<div class='wdw-titlebar'>" +
					"<img src='" + data.settings.titleIcon + "' class='wdw-icon' />" +
					"<div class='wdw-title'>" + data.settings.title + "</div>" +
					"<div class='wdw-buttons'>" +
					((data.settings.showMinimize) ? "<img src='js/window/images/cmd_buttons_minimize.png' class='wdw-minimize' />" : "") +
					((data.settings.showMaximize) ? "<img src='js/window/images/cmd_buttons_maximize.png' class='wdw-maximize' />" : "") +
					"<img src='js/window/images/cmd_buttons_close.png' class='wdw-close' />" +
					"</div>" +
					"</div>" +
					"</td>" +
					"<td class='right'></td>" +
					"</tr>" +
					"<tr class='middle'>" +
					"<td class='left'></td>" +
					"<td class='center'>" +
					"<div class='wdw-menubar'></div>" +
					"</td>" +
					"<td class='right'></td>" +
					"</tr>" +
					"<tr class='titlebarbottom'>" +
					"<td class='left'></td>" +
					"<td class='center'></td>" +
					"<td class='right'></td>" +
					"</tr>" +
					"<tr class='content'>" +
					"<td class='left'></td>" +
					"<td class='center'></td>" +
					"<td class='right'></td>" +
					"</tr>" +
					"<tr class='bottom'>" +
					"<td class='left'></td>" +
					"<td class='center'></td>" +
					"<td class='right'></td>" +
					"</tr>" +
					"</tbody>" +
					"</table>").appendTo("body");
				$this.detach();
				$(".content .center", data.$window).append($this);
				data.$program = $("<div class='wdw-program' data-shortcutid='" + data.settings.shortcutID + "'><img class='wdw-progicon' src='" + data.settings.titleIcon + "' /><div class='wdw-progtitle'>" + data.settings.title + "</div></div>").appendTo("#programs");
				data.$menubar = $(".wdw-menubar", data.$window);
				data.$main = $(".wdw-main", data.$window);
				data.$minimize = $(".wdw-minimize", data.$window);
				data.$maximize = $(".wdw-maximize", data.$window);
				data.$close = $(".wdw-close", data.$window);
				data.$ne = $(".titlebartop>.right", data.$window);
				data.$nw = $(".titlebartop>.left", data.$window);
				data.$se = $(".bottom>.right", data.$window);
				data.$sw = $(".bottom>.left", data.$window);
				data.$titlebar = $(".titlebarmiddle>.center, .titlebarbottom>.center", data.$window);
				data.$n = $(".titlebartop>.center", data.$window);
				data.$s = $(".bottom>.center", data.$window);
				data.$e = $(".titlebarmiddle>.right, .titlebarbottom>.right, .middle>.right, .content>.right", data.$window);
				data.$w = $(".titlebarmiddle>.left, .titlebarbottom>.left, .middle>.left, .content>.left", data.$window);

				if (data.settings.menuBar) {
					data.$menubar.append(menuBar);
				}

				data.coordX = 0;
				data.coordY = 0;
				data.resizeDir = "";
				data.opened = false;
				data.minimized = false;
				data.maximized = false;
				data.restore = {
					top: data.settings.initTop,
					left: data.settings.initLeft,
					height: data.settings.initHeight,
					width: data.settings.initWidth,
					isInWindow: function () {
						var wtop = parseInt(data.restore.top);
						var wleft = parseInt(data.restore.left);
						var mheight = parseInt(data.restore.height);
						var mwidth = parseInt(data.restore.width);
						var wheight = $(window).height();
						var wwidth = $(window).width();
						var otherHeight = data.$menubar.height() + 33;
						var inWindow = true;
						if (mheight + otherHeight + wtop > wheight) {
							if (wheight - (mheight + otherHeight) > 0) {
								data.restore.top = (wheight - (mheight + otherHeight)) + "px";
							} else if (wheight - otherHeight > data.settings.minHeight) {
								data.restore.top = "0px";
								if (data.settings.resizeable) {
									data.restore.height = (wheight - otherHeight) + "px";
								}
							} else {
								data.restore.top = "0px";
								if (data.settings.resizeable) {
									data.restore.height = data.settings.minHeight + "px";
								}
							}
							inWindow = false;
						}

						if (mwidth + 11 + wleft > wwidth) {
							if (wwidth - (mwidth + 11) > 0) {
								data.restore.left = (wwidth - (mwidth + 11)) + "px";
							} else if (wwidth - 11 > data.settings.minWidth) {
								data.restore.left = "0px";
								if (data.settings.resizeable) {
									data.restore.width = (wwidth - 11) + "px";
								}
							} else {
								data.restore.left = "0px";
								if (data.settings.resizeable) {
									data.restore.width = data.settings.minWidth + "px";
								}
							}
							inWindow = false;
						}
						return inWindow;
					}
				};
				data.startResize = function (e, dir) {
					if (!data.minimized && !data.maximized && e.which < 2) {
						if (dir === "drag") {
							data.settings.onDragStart();
						} else {
							data.settings.onResizeStart();
						}
						e.preventDefault();
						data.coordX = e.pageX;
						data.coordY = e.pageY;
						data.resizeDir = dir;
						$("#wdw-resize").css({
							display: "block",
							width: $(window).width() + "px",
							height: $(window).height() + "px",
							cursor: (dir === "drag" ? "move" : dir + "-resize")
						});
					}
				};
				data.drag = function (e) {
					var wtop = parseInt(data.$window.css("top"));
					var wleft = parseInt(data.$window.css("left"));
					var mwidth = data.$main.width();
					var mheight = data.$main.height() + data.$menubar.height();
					var wwidth = $(window).width();
					var wheight = $(window).height();
					if ((data.coordY > e.pageY && wtop - (data.coordY - e.pageY) > 0) || (data.coordY < e.pageY && wtop + mheight + 33 + (e.pageY - data.coordY) < wheight)) {
						data.$window.css({
							top: (wtop + (e.pageY - data.coordY)) + "px"
						});
						data.coordY = e.pageY;
					} else if (data.coordY > e.pageY && wtop - (data.coordY - e.pageY) <= 0) {
						data.$window.css({
							top: "0px"
						});
						data.coordY -= wtop;
					} else if (data.coordY < e.pageY && wtop + mheight + 33 + (e.pageY - data.coordY) >= wheight) {
						data.$window.css({
							top: ((wheight - (mheight + 33) <= 0) ? 0 : (wheight - (mheight + 33))) + "px"
						});
						data.coordY += ((wheight - (mheight + 33) <= 0) ? 0 : (wheight - (mheight + 33))) - wtop;
					}

					if ((data.coordX > e.pageX && wleft - (data.coordX - e.pageX) > 0) || (data.coordX < e.pageX && wleft + mwidth + 11 + (e.pageX - data.coordX) < wwidth)) {
						data.$window.css({
							left: (wleft + (e.pageX - data.coordX)) + "px"
						});
						data.coordX = e.pageX;
					} else if (data.coordX > e.pageX && wleft - (data.coordX - e.pageX) <= 0) {
						data.$window.css({
							left: "0px"
						});
						data.coordX -= wleft;
					} else if (data.coordX < e.pageX && wleft + mwidth + 11 + (e.pageX - data.coordX) >= wwidth) {
						data.$window.css({
							left: (wwidth - (mwidth + 11)) + "px"
						});
						data.coordX += (wwidth - (mwidth + 11)) - wleft;
					}
				};
				data.resize = function (e, dir) {
					switch (dir) {
						case "n":
							var wtop = parseInt(data.$window.css("top"));
							var mheight = data.$main.height();
							var mbheight = data.$menubar.height();
							if ((data.coordY < e.pageY && mheight - (e.pageY - data.coordY) > data.settings.minHeight) || (data.coordY > e.pageY && (wtop + (e.pageY - data.coordY) > 0 && (data.settings.maxHeight === 0 || mheight + mbheight + (data.coordY - e.pageY) < data.settings.maxHeight)))) {
								data.$window.css({ top: (wtop + (e.pageY - data.coordY)) + "px" });
								data.$main.css({ height: (mheight - (e.pageY - data.coordY)) + "px" });
								data.coordY = e.pageY;
							} else if (data.coordY > e.pageY && wtop + (e.pageY - data.coordY) <= 0 && (mheight + mbheight + wtop) <= data.settings.maxHeight) {
								data.$window.css({ top: "0px" });
								data.$main.css({ height: (mheight + wtop) + "px" });
								data.coordY -= wtop;
							} else if (data.coordY > e.pageY && data.settings.maxHeight !== 0 && mheight + mbheight + (data.coordY - e.pageY) >= data.settings.maxHeight) {
								data.$window.css({ top: wtop - (data.settings.maxHeight - mheight) });
								data.$main.css({ height: data.settings.maxHeight + "px" });
								data.coordY -= data.settings.maxHeight - mheight;
							} else if (data.coordY < e.pageY && mheight + mbheight - (e.pageY - data.coordY) <= data.settings.minHeight) {
								data.$window.css({ top: (wtop + (mheight - data.settings.minHeight)) + "px" });
								data.$main.css({ height: data.settings.minHeight + "px" });
								data.coordY += mheight - data.settings.minHeight;
							}
							break;
						case "e":
							var wleft = parseInt(data.$window.css("left"));
							var mwidth = data.$main.width();
							var wwidth = $(window).width();
							if ((data.coordX > e.pageX && mwidth - (data.coordX - e.pageX) > data.settings.minWidth) || (data.coordX < e.pageX && (wleft + mwidth + (e.pageX - data.coordX) < wwidth - 11 && (data.settings.maxWidth === 0 || mwidth + (e.pageX - data.coordX) < data.settings.maxWidth)))) {
								data.$main.css({ width: (mwidth - (data.coordX - e.pageX)) + "px" });
								$(".wdw-title", data.$titlebar).css({ width: (mwidth - (data.coordX - e.pageX) - 80) + "px" });
								data.coordX = e.pageX;
							} else if (data.coordX < e.pageX && wleft + mwidth + (e.pageX - data.coordX) >= wwidth - 11 && (wwidth - wleft - 11) <= data.settings.maxWidth) {
								data.$main.css({ width: (wwidth - wleft - 11) + "px" });
								$(".wdw-title", data.$titlebar).css({ width: (wwidth - wleft - 91) + "px" });
								data.coordX += wwidth - (wleft + mwidth + 11);
							} else if (data.coordX < e.pageX && data.settings.maxWidth !== 0 && mwidth + (e.pageX - data.coordX) >= data.settings.maxWidth) {
								data.$main.css({ width: data.settings.maxWidth + "px" });
								$(".wdw-title", data.$titlebar).css({ width: (data.settings.maxWidth - 80) + "px" });
								data.coordX += data.settings.maxWidth - mwidth;
							} else if (data.coordX > e.pageX && mwidth - (data.coordX - e.pageX) <= data.settings.minWidth) {
								data.$main.css({ width: data.settings.minWidth + "px" });
								$(".wdw-title", data.$titlebar).css({ width: (data.settings.minWidth - 80) + "px" });
								data.coordX -= mwidth - data.settings.minWidth;
							}
							break;
						case "s":
							var wtop = parseInt(data.$window.css("top"));
							var mheight = data.$main.height();
							var mbheight = data.$menubar.height();
							var wheight = $(window).height();
							if ((data.coordY > e.pageY && mheight - (data.coordY - e.pageY) > data.settings.minHeight) || (data.coordY < e.pageY && (wtop + mheight + mbheight + (e.pageY - data.coordY) < wheight - 33 && (data.settings.maxHeight === 0 || mheight + mbheight + (e.pageY - data.coordY) < data.settings.maxHeight)))) {
								data.$main.css({ height: (mheight - (data.coordY - e.pageY)) + "px" });
								data.coordY = e.pageY;
							} else if (data.coordY < e.pageY && wtop + mheight + mbheight + (e.pageY - data.coordY) >= wheight - 33 && (wheight - wtop - 33) <= data.settings.maxHeight) {
								data.$main.css({ height: (wheight - wtop - 33) + "px" });
								data.coordY += mheight - (wheight - wtop - 33);
							} else if (data.coordY < e.pageY && data.settings.maxHeight !== 0 && mheight + mbheight + (e.pageY - data.coordY) >= data.settings.maxHeight) {
								data.$main.css({ height: data.settings.maxHeight + "px" });
								data.coordY += data.settings.maxHeight - mheight;
							} else if (data.coordY > e.pageY && mheight + mbheight - (data.coordY - e.pageY) <= data.settings.minHeight) {
								data.$main.css({ height: data.settings.minHeight + "px" });
								data.coordY -= mheight - data.settings.minHeight;
							}
							break;
						case "w":
							var wleft = parseInt(data.$window.css("left"));
							var mwidth = data.$main.width();
							if ((data.coordX < e.pageX && mwidth - (e.pageX - data.coordX) > data.settings.minWidth) || (data.coordX > e.pageX && (wleft - (data.coordX - e.pageX) > 0 && (data.settings.maxWidth === 0 || mwidth + (data.coordX - e.pageX) < data.settings.maxWidth)))) {
								data.$window.css({ left: (wleft + (e.pageX - data.coordX)) + "px" });
								data.$main.css({ width: (mwidth - (e.pageX - data.coordX)) + "px" });
								$(".wdw-title", data.$titlebar).css({ width: (mwidth - (e.pageX - data.coordX) - 80) + "px" });
								data.coordX = e.pageX;
							} else if (data.coordX > e.pageX && wleft + (e.pageX - data.coordX) <= 0 && (mwidth + wleft) <= data.settings.maxWidth) {
								data.$window.css({ left: "0px" });
								data.$main.css({ width: (mwidth + wleft) + "px" });
								$(".wdw-title", data.$titlebar).css({ width: (mwidth + wleft - 80) + "px" });
								data.coordX -= wleft;
							} else if (data.coordX > e.pageX && data.settings.maxWidth !== 0 && mwidth + (data.coordX - e.pageX) >= data.settings.maxWidth) {
								data.$window.css({ left: (wleft - (data.settings.maxWidth - mwidth)) + "px" });
								data.$main.css({ width: data.settings.maxWidth + "px" });
								$(".wdw-title", data.$titlebar).css({ width: (data.settings.maxWidth - 80) + "px" });
								data.coordX -= data.settings.maxWidth - mwidth;
							} else if (data.coordX < e.pageX && mwidth - (e.pageX - data.coordX) <= data.settings.minWidth) {
								data.$window.css({ left: (wleft + (mwidth - data.settings.minWidth)) + "px" });
								data.$main.css({ width: data.settings.minWidth + "px" });
								$(".wdw-title", data.$titlebar).css({ width: (data.settings.minWidth - 80) + "px" });
								data.coordX += (mwidth - data.settings.minWidth);
							}
							break;
						default:
							// do nothing
					}
				};
				if (data.settings.minimizable) {
					data.$minimize.mousedown(function (e) {
						if (!data.minimized && e.which < 2) {
							data.$minimize.attr("src", "js/window/images/cmd_buttons_minimize_clicked.png");
						}
					}).click(function (e) {
						if (e.which < 2) {
							data.settings.onBeforeMinimize();
							data.$minimize.attr("src", "js/window/images/cmd_buttons_minimize.png");
							data.minimized = true;
							data.$window.addClass("wdw-minimized");
							data.$titlebar.addClass("wdw-minimized");
							data.$n.addClass("wdw-minimized");
							data.$e.addClass("wdw-minimized");
							data.$s.addClass("wdw-minimized");
							data.$w.addClass("wdw-minimized");
							data.$ne.addClass("wdw-minimized");
							data.$nw.addClass("wdw-minimized");
							data.$se.addClass("wdw-minimized");
							data.$sw.addClass("wdw-minimized");
							data.$minimize.addClass("wdw-minimized");

							if (!data.maximized) {
								data.restore.top = data.$window.css("top");
								data.restore.left = data.$window.css("left");
								data.restore.height = data.$main.css("height");
								data.restore.width = data.$main.css("width");
							}
							data.$window.animate({
								top: ($(window).height() - 24) + "px",
								left: data.$program.offset().left + "px",
								opacity: 0
							}, {
								complete: function () {
									data.$window.css({ display: "none" });
									$.window.moveWindowToTop();
								}
							});
							data.$main.animate({
								height: "24px",
								width: "160px"
							}, {
								complete: data.settings.onAfterMinimize
							});
						}
					}).mouseleave(function () {
						if (!data.minimized) {
							data.$minimize.attr("src", "js/window/images/cmd_buttons_minimize.png");
						}
					});
				} else {
					data.$minimize.attr("src", "js/window/images/cmd_buttons_minimize_disabled.png").addClass("wdw-disabled");
				}

				if (data.settings.maximizable) {
					data.$maximize.mousedown(function (e) {
						if (e.which < 2) {
							if ((data.minimized && data.maximized) || !(data.minimized || data.maximized)) {
								data.$maximize.attr("src", "js/window/images/cmd_buttons_maximize_clicked.png");
							} else {
								data.$maximize.attr("src", "js/window/images/cmd_buttons_restore_clicked.png");
							}
						}
					}).click(function (e) {
						if (e.which < 2) {
							if (data.maximized) {
								data.settings.onBeforeRestore();
								data.$window.removeClass("wdw-maximized");
								$(".wdw-maximized", data.$window).removeClass("wdw-maximized");
								data.maximized = false;
								data.$maximize.attr("src", "js/window/images/cmd_buttons_maximize.png");
								data.restore.isInWindow();
								data.$window.animate({
									top: data.restore.top,
									left: data.restore.left
								});
								data.$main.animate({
									height: data.restore.height,
									width: data.restore.width
								}, {
									step: function () {
										data.settings.onDragStep.call($this);
										data.settings.onResizeStep.call($this);
									},
									complete: function () {
										data.settings.onDragStep.call($this);
										data.settings.onResizeStep.call($this);
										data.settings.onAfterRestore();
									}
								});
							} else {
								data.settings.onBeforeMaximize();
								data.maximized = true;
								data.$titlebar.addClass("wdw-maximized");
								data.$n.addClass("wdw-maximized");
								data.$e.addClass("wdw-maximized");
								data.$s.addClass("wdw-maximized");
								data.$w.addClass("wdw-maximized");
								data.$ne.addClass("wdw-maximized");
								data.$nw.addClass("wdw-maximized");
								data.$se.addClass("wdw-maximized");
								data.$sw.addClass("wdw-maximized");
								data.$maximize.attr("src", "js/window/images/cmd_buttons_restore.png");
								data.restore.top = data.$window.css("top");
								data.restore.left = data.$window.css("left");
								data.restore.height = data.$main.css("height");
								data.restore.width = data.$main.css("width");
								data.$window.animate({
									top: "0px",
									left: "0px"
								});
								data.$main.animate({
									height: ($(window).height() - data.$menubar.height() - 61) + "px",
									width: ($(window).width() - 11) + "px"
								}, {
									step: function () {
										data.settings.onDragStep.call($this);
										data.settings.onResizeStep.call($this);
									},
									complete: function () {
										data.$window.addClass("wdw-maximized");
										data.settings.onDragStep.call($this);
										data.settings.onResizeStep.call($this);
										data.settings.onAfterMaximize();
									}
								});
							}
						}
					}).mouseleave(function () {
						if ((data.minimized && data.maximized) || !(data.minimized || data.maximized)) {
							data.$maximize.attr("src", "js/window/images/cmd_buttons_maximize.png");
						} else {
							data.$maximize.attr("src", "js/window/images/cmd_buttons_restore.png");
						}
					});
				} else {
					data.$maximize.attr("src", "js/window/images/cmd_buttons_maximize_disabled.png").addClass("wdw-disabled");
				}

				data.$close.mousedown(function (e) {
					if (e.which < 2) {
						data.$close.attr("src", "js/window/images/cmd_buttons_close_clicked.png");
					}
				}).click(function (e) {
					if (e.which < 2) {
						funcs.close.call($this);
					}
				}).mouseleave(function () {
					data.$close.attr("src", "js/window/images/cmd_buttons_close.png");
				});
				if (data.settings.resizeable) {
					if (data.settings.maxWidth !== data.settings.minWidth && data.settings.maxHeight !== data.settings.minHeight) {
						data.$nw.mousedown(function (e) { data.startResize(e, "nw"); });
						data.$n.mousedown(function (e) { data.startResize(e, "n"); });
						data.$ne.mousedown(function (e) { data.startResize(e, "ne"); });
						data.$w.mousedown(function (e) { data.startResize(e, "w"); });
						data.$e.mousedown(function (e) { data.startResize(e, "e"); });
						data.$sw.mousedown(function (e) { data.startResize(e, "sw"); });
						data.$s.mousedown(function (e) { data.startResize(e, "s"); });
						data.$se.mousedown(function (e) { data.startResize(e, "se"); });
					} else if (data.settings.maxWidth === data.settings.minWidth && data.settings.maxHeight !== data.settings.minHeight) {
						data.$n.mousedown(function (e) { data.startResize(e, "n"); });
						data.$s.mousedown(function (e) { data.startResize(e, "s"); });
						data.$e.addClass("wdw-disabled");
						data.$w.addClass("wdw-disabled");
						data.$ne.addClass("wdw-disabled");
						data.$nw.addClass("wdw-disabled");
						data.$se.addClass("wdw-disabled");
						data.$sw.addClass("wdw-disabled");
					} else if (data.settings.maxWidth !== data.settings.minWidth && data.settings.maxHeight === data.settings.minHeight) {
						data.$w.mousedown(function (e) { data.startResize(e, "w"); });
						data.$e.mousedown(function (e) { data.startResize(e, "e"); });
						data.$n.addClass("wdw-disabled");
						data.$s.addClass("wdw-disabled");
						data.$ne.addClass("wdw-disabled");
						data.$nw.addClass("wdw-disabled");
						data.$se.addClass("wdw-disabled");
						data.$sw.addClass("wdw-disabled");
					} else if (data.settings.maxWidth === data.settings.minWidth && data.settings.maxHeight === data.settings.minHeight) {
						data.$n.addClass("wdw-disabled");
						data.$e.addClass("wdw-disabled");
						data.$s.addClass("wdw-disabled");
						data.$w.addClass("wdw-disabled");
						data.$ne.addClass("wdw-disabled");
						data.$nw.addClass("wdw-disabled");
						data.$se.addClass("wdw-disabled");
						data.$sw.addClass("wdw-disabled");
					}
				} else {
					data.$n.addClass("wdw-disabled");
					data.$e.addClass("wdw-disabled");
					data.$s.addClass("wdw-disabled");
					data.$w.addClass("wdw-disabled");
					data.$ne.addClass("wdw-disabled");
					data.$nw.addClass("wdw-disabled");
					data.$se.addClass("wdw-disabled");
					data.$sw.addClass("wdw-disabled");
				}
				if (data.settings.draggable) {
					data.$titlebar.mousedown(function (e) {
						if (!$(e.target).hasClass("wdw-minimize") && !$(e.target).hasClass("wdw-maximize") && !$(e.target).hasClass("wdw-close")) {
							data.startResize(e, "drag");
						}
					});
				} else {
					data.$titlebar.addClass("wdw-disabled");
				}
				data.$shortcut.click(function () {
					if (!data.opened && data.settings.onBeforeOpen() !== false) {
						$("#wdw-resize").css({
							display: "block",
							width: $(window).width() + "px",
							height: $(window).height() + "px",
							cursor: "default"
						});
						data.opened = true;
						data.$window.removeClass("wdw-minimized");
						$.window.moveWindowToTop(data.$window);
						if (data.maximized) {
							if (data.settings.animateWindow) {
								data.$window.css({
									display: ($.window.ie === 7) ? "block" : "table",
									top: data.$shortcut.offset().top + 10,
									left: data.$shortcut.offset().left + 44
								}).animate({
									opacity: 1,
									top: "0px",
									left: "0px"
								});
								data.$main.animate({
									height: ($(window).height() - 61) + "px",
									width: ($(window).width() - 11) + "px"
								}, {
									complete: function () {
										data.settings.onAfterOpen();
										$("#wdw-resize").css({ display: "none" });
									}
								});
							} else {
								data.$window.css({
									display: ($.window.ie === 7) ? "block" : "table",
									opacity: 1,
									top: "0px",
									left: "0px"
								});
								data.$main.css({
									height: ($(window).height() - 61) + "px",
									width: ($(window).width() - 11) + "px"
								});
								data.settings.onAfterOpen();
								$("#wdw-resize").css({ display: "none" });
							}
							$(".wdw-title", data.$titlebar).css({ width: ($(window).width() - 91) + "px" });
						} else {
							data.restore.top = $.window.getRestoreVal(data.restore.top);
							data.restore.left = $.window.getRestoreVal(data.restore.left);
							data.restore.width = $.window.getRestoreVal(data.restore.width);
							data.restore.height = $.window.getRestoreVal(data.restore.height);
							if (data.settings.minWidth !== 0 && parseInt(data.restore.width) < data.settings.minWidth) {
								data.restore.width = data.settings.minWidth + "px";
							} else if (data.settings.maxWidth !== 0 && parseInt(data.restore.width) > data.settings.maxWidth) {
								data.restore.width = data.settings.maxWidth + "px";
							}
							if (data.settings.minHeight !== 0 && parseInt(data.restore.height) < data.settings.minHeight) {
								data.restore.height = data.settings.minHeight + "px";
							} else if (data.settings.maxHeight !== 0 && parseInt(data.restore.height) > data.settings.maxHeight) {
								data.restore.height = data.settings.maxHeight + "px";
							}
							data.restore.isInWindow();
							if (data.settings.animateWindow) {
								data.$window.css({
									display: ($.window.ie === 7) ? "block" : "table",
									top: data.$shortcut.offset().top,
									left: data.$shortcut.offset().left
								}).animate({
									opacity: 1,
									top: data.restore.top,
									left: data.restore.left
								});
								data.$main.animate({
									height: data.restore.height,
									width: data.restore.width
								}, {
									complete: data.settings.onAfterOpen
								});
							} else {
								data.$window.css({
									display: ($.window.ie === 7) ? "block" : "table",
									opacity: 1,
									top: data.restore.top,
									left: data.restore.left
								});
								data.$main.css({
									height: data.restore.height,
									width: data.restore.width
								});
								data.settings.onAfterOpen();
							}
							$(".wdw-title", data.$titlebar).css({ width: (data.restore.width - 80) + "px" });
						}
						data.$program.detach()
							.appendTo("#programs")
							.css({ display: ($.window.ie === 7) ? "inline" : "inline-block" });
						data.$program.animate({ width: "160px" });
					} else {
						data.$program.click();
					}
				});
				data.$program.click(function () {
					if (data.minimized) {
						data.minimized = false;
						data.$window.removeClass("wdw-minimized").css({ display: "block" });
						$(".wdw-minimized", data.$window).removeClass("wdw-minimized");

						if (data.maximized) {
							data.settings.onBeforeMaximize();
							data.$window.animate({
								top: "0px",
								left: "0px",
								opacity: 1
							});
							data.$main.animate({
								height: ($(window).height() - 61) + "px",
								width: ($(window).width() - 11) + "px"
							}, {
								complete: data.settings.onAfterMaximize
							});
							$(".wdw-title", data.$titlebar).css({ width: ($(window).width() - 91) + "px" });
						} else {
							data.settings.onBeforeRestore();
							data.restore.isInWindow();
							data.$window.animate({
								top: data.restore.top,
								left: data.restore.left,
								opacity: 1
							});
							data.$main.animate({
								height: data.restore.height,
								width: data.restore.width
							}, {
								complete: data.settings.onAfterRestore
							});
							$(".wdw-title", data.$titlebar).css({ width: (data.restore.width - 80) + "px" });
						}
					}
					$.window.moveWindowToTop(data.$window);
				});
				$("#wdw-resize").mousemove(function (e) {
					if (e.which !== 1) {
						data.resizeDir = "";
						$("#wdw-resize").css({ display: "none" });
					} else {
						if (data.resizeDir === "drag") {
							data.drag(e);
							data.settings.onDragStep.call($this);
						} else {
							for (var i = 0; i < data.resizeDir.length; i++) {
								data.resize(e, data.resizeDir.substr(i, 1));
							}
							data.settings.onResizeStep.call($this);
						}
					}
				});
				$(window).mouseup(function (e) {
					if (e.which < 2) {
						$("#wdw-resize").css({ display: "none" });
						if (data.resizeDir !== "") {
							if (data.resizeDir === "drag") {
								data.settings.onDragStop();
							} else {
								data.settings.onResizeStop();
							}
							data.resizeDir = "";
						}
					}
				}).resize(function () {
					if (data.opened && !data.minimized) {
						if (data.maximized) {
							data.$main.css({
								height: ($(window).height() - data.$menubar.height() - 61) + "px",
								width: ($(window).width() - 11) + "px"
							});
							$(".wdw-title", data.$titlebar).css({ width: ($(window).width() - 91) + "px" });
						} else {
							data.restore.top = data.$window.css("top");
							data.restore.left = data.$window.css("left");
							data.restore.height = data.$main.height() + "px";
							data.restore.width = data.$main.width() + "px";
							if (!data.restore.isInWindow()) {
								data.$window.css({
									top: data.restore.top,
									left: data.restore.left
								});
								data.$main.css({
									height: data.restore.height,
									width: data.restore.width
								});
								$(".wdw-title", data.$titlebar).css({ width: (data.restore.width - 80) + "px" });
							}
						}
						data.settings.onDragStep.call($this);
						data.settings.onResizeStep.call($this);
					}
				});
				data.$window.mousedown(function (e) {
					$.window.moveWindowToTop(data.$window);
					if (!$(e.target).hasClass("wdw-menuItem")) {
						funcs.hideMenu.call($this);
					}
				});

				$this.data("wdw", data);
			});
		},
		close: function () {
			return this.each(function () {
				var $this = $(this);
				var data = $this.data("wdw");
				if (!data) {
					throw ("Window not initialized");
				}
				if (data.opened) {
					data.settings.onBeforeClose();
					data.$close.attr("src", "js/window/images/cmd_buttons_close.png");
					if (!data.minimized && !data.maximized) {
						data.restore.top = data.$window.css("top");
						data.restore.left = data.$window.css("left");
						data.restore.height = data.$main.css("height");
						data.restore.width = data.$main.css("width");
					} else if (data.minimized) {
						data.minimized = false;
						$(".wdw-minimized", data.$window).removeClass("wdw-minimized");
						data.$window.removeClass("wdw-minimized");
						data.$minimize.attr("src", "js/window/images/cmd_buttons_minimize.png");

					}
					data.$program.animate({
						width: "0px"
					}, {
						complete: function () {
							data.$program.css({ display: "none" });
						}
					});
					if (data.settings.animateWindow) {
						data.$window.animate({
							opacity: 0,
							top: data.$shortcut.offset().top,
							left: data.$shortcut.offset().left
						}, {
							complete: function () {
								data.opened = false;
								data.$window.css({ display: "none" })
									.addClass("wdw-minimized");
								$.window.moveWindowToTop();
							}
						});
						data.$main.animate({
							width: "1px",
							height: "1px"
						}, {
							complete: data.settings.onAfterClose
						});
					} else {
						data.$window.css({
							opacity: 0,
							top: data.$shortcut.offset().top,
							left: data.$shortcut.offset().left
						});
						data.$main.css({
							width: "1px",
							height: "1px"
						});
						data.opened = false;
						data.$window.css({ display: "none" })
							.addClass("wdw-minimized");
						$.window.moveWindowToTop();
						data.settings.onAfterClose();
					}
				}
			});
		}
	};
	$.fn.window = function (options) {
		if (typeof (options) === "object" || typeof (options) === "undefined") {
			return funcs.init.call(this, options);
		} else if (typeof (options) === "string" && options.substring(0, 1) !== "_" && funcs[options]) {
			return funcs[options].call(this);
		}
		throw ("Invalid arguments");
	};
})(jQuery);
