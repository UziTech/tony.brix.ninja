/**
  Author: Tony Brix
  Website: tonybrix.info
*/
/* eslint block-scoped-var: 0 */
(function ($) {
	$.extend($.jCanvas.defaults, {
		fromCenter: false,
		cropFromCenter: false
	});
	$.jCanvas();
	if (!$.store) {
		$.store = { disabled: true };
	} else if (!$.store.disabled) {
		if (typeof ($.store.get("height")) === "undefined") {
			$.store.set("height", 16);
		}
		if (typeof ($.store.get("width")) === "undefined") {
			$.store.set("width", 16);
		}
		if (typeof ($.store.get("totalMines")) === "undefined") {
			$.store.set("totalMines", 40);
		}
		if (typeof ($.store.get("expert")) === "undefined") {
			$.store.set("expert", { time: 999, name: "Anonymous" });
		}
		if (typeof ($.store.get("intermediate")) === "undefined") {
			$.store.set("intermediate", { time: 999, name: "Anonymous" });
		}
		if (typeof ($.store.get("beginner")) === "undefined") {
			$.store.set("beginner", { time: 999, name: "Anonymous" });
		}
	}
	$(function () {
		$("<div style='display:none;position:absolute;top:-1000px;left:-1000px'>" +
			"<img src='js/minesweeper/images/sprite.png' alt=' ' />" +
			"</div>").appendTo("body");
	});
	var mineSweeper = {
		_defaults: {
			height: ((!$.store.disabled) ? $.store.get("height") : 16),
			width: ((!$.store.disabled) ? $.store.get("width") : 16),
			totalMines: ((!$.store.disabled) ? $.store.get("totalMines") : 40)
		},
		init: function (options) {
			return this.each(function () {
				var $this = $(this);
				if ($this.data("minesweeper") || mineSweeper._id) {
					throw ("Already initialized");
				}
				mineSweeper._id = this.id;
				var data = $.extend(mineSweeper._defaults, options);
				$this.data("minesweeper", data);
				$this.keyup(function (e) {
						e.preventDefault();
						var $this = $(this);
						var data = $this.data("minesweeper");
						switch (e.which) {
							case 113:
								mineSweeper.reset.call($this);
								break;
							default:
								// do nothing
						}
					})
					.mousemove(function (e) {
						e.preventDefault();
						var $this = $(this);
						var data = $this.data("minesweeper");
						if (data.clicked && e.which === 0) {
							data.left = false;
							data.right = false;
							data.clicked = null;
							if (!data.reset) {
								$this.drawImage({
									source: "js/minesweeper/images/sprite.png",
									x: ((data.width * 16) / 2) - 1,
									y: 16,
									sx: 26,
									sy: 55,
									sWidth: 26,
									sHeight: 26
								});
							}
						} else if (!data.bothclicked && data.clicked && data.left) {
							var i = Math.floor((e.offsetY - 56) / 16);
							var j = Math.floor((e.offsetX - 12) / 16);
							if (data.clicked.x === -1 && data.clicked.y === -1) {
								if (e.offsetY >= 16 && e.offsetY <= 41 && e.offsetX >= ((data.width * 16) / 2) - 1 && e.offsetX <= ((data.width * 16) / 2) + 24) {
									$this.drawImage({
										source: "js/minesweeper/images/sprite.png",
										x: ((data.width * 16) / 2) - 1,
										y: 16,
										sx: 0,
										sy: 55,
										sWidth: 26,
										sHeight: 26
									});
								} else if (data.reset) {
									if (data.won) {
										$this.drawImage({
											source: "js/minesweeper/images/sprite.png",
											x: ((data.width * 16) / 2) - 1,
											y: 16,
											sx: 104,
											sy: 55,
											sWidth: 26,
											sHeight: 26
										});
									} else {
										$this.drawImage({
											source: "js/minesweeper/images/sprite.png",
											x: ((data.width * 16) / 2) - 1,
											y: 16,
											sx: 78,
											sy: 55,
											sWidth: 26,
											sHeight: 26
										});
									}
								} else {
									$this.drawImage({
										source: "js/minesweeper/images/sprite.png",
										x: ((data.width * 16) / 2) - 1,
										y: 16,
										sx: 26,
										sy: 55,
										sWidth: 26,
										sHeight: 26
									});
								}
							} else if (!data.reset) {
								if (data.right) {
									for (var k = -1; k <= 1; k++) {
										for (var l = -1; l <= 1; l++) {
											if (data.clicked.y + k >= 0 && data.clicked.x + l >= 0 && data.clicked.y + k < data.height && data.clicked.x + l < data.width && !data.field[data.clicked.y + k][data.clicked.x + l].flagged && !data.field[data.clicked.y + k][data.clicked.x + l].shown) {
												if (data.field[data.clicked.y + k][data.clicked.x + l].question) {
													$this.drawImage({
														source: "js/minesweeper/images/sprite.png",
														x: (data.clicked.x + l) * 16 + 12,
														y: (data.clicked.y + k) * 16 + 56,
														sx: 48,
														sy: 16,
														sWidth: 16,
														sHeight: 16
													});
												} else {
													$this.drawImage({
														source: "js/minesweeper/images/sprite.png",
														x: (data.clicked.x + l) * 16 + 12,
														y: (data.clicked.y + k) * 16 + 56,
														sx: 80,
														sy: 16,
														sWidth: 16,
														sHeight: 16
													});
												}
											}
										}
									}
									if (i >= 0 && j >= 0 && i < data.height && j < data.width) {
										data.clicked.x = j;
										data.clicked.y = i;

										for (var k = -1; k <= 1; k++) {
											for (var l = -1; l <= 1; l++) {
												if (i + k >= 0 && j + l >= 0 && i + k < data.height && j + l < data.width && !data.field[i + k][j + l].flagged && !data.field[i + k][j + l].shown) {
													$this.drawImage({
														source: "js/minesweeper/images/sprite.png",
														x: (j + l) * 16 + 12,
														y: (i + k) * 16 + 56,
														sx: 0,
														sy: 0,
														sWidth: 16,
														sHeight: 16
													});
												}
											}
										}
									}
								} else {
									if (!data.field[data.clicked.y][data.clicked.x].shown) {
										if (data.field[data.clicked.y][data.clicked.x].flagged) {
											$this.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: (data.clicked.x) * 16 + 12,
												y: (data.clicked.y) * 16 + 56,
												sx: 64,
												sy: 16,
												sWidth: 16,
												sHeight: 16
											});
										} else if (data.field[data.clicked.y][data.clicked.x].question) {
											$this.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: (data.clicked.x) * 16 + 12,
												y: (data.clicked.y) * 16 + 56,
												sx: 48,
												sy: 16,
												sWidth: 16,
												sHeight: 16
											});
										} else {
											$this.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: (data.clicked.x) * 16 + 12,
												y: (data.clicked.y) * 16 + 56,
												sx: 80,
												sy: 16,
												sWidth: 16,
												sHeight: 16
											});
										}
									}
									if (i >= 0 && j >= 0 && i < data.height && j < data.width) {
										data.clicked.x = j;
										data.clicked.y = i;

										if (!data.field[i][j].shown) {
											$this.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: (j) * 16 + 12,
												y: (i) * 16 + 56,
												sx: 0,
												sy: 0,
												sWidth: 16,
												sHeight: 16
											});
										}
									}
								}
							}
						}
					})
					.mousedown(function (e) {
						e.preventDefault();
						var $this = $(this);
						var data = $this.focus().data("minesweeper");
						data.ctrlclick = e.ctrlKey;
						switch (e.which) {
							case 1:
								data.left = true;
								if (data.ctrlclick) {
									data.right = true;
								}
								break;
							case 3:
								data.right = true;
								if (data.ctrlclick) {
									data.left = true;
								}
								break;
							default:
								// do nothing
						}
						var i = Math.floor((e.offsetY - 56) / 16);
						var j = Math.floor((e.offsetX - 12) / 16);
						if (data.left && e.offsetY >= 16 && e.offsetY <= 41 && e.offsetX >= ((data.width * 16) / 2) - 1 && e.offsetX <= ((data.width * 16) / 2) + 24) {
							data.clicked = { x: -1, y: -1 };
							$this.drawImage({
								source: "js/minesweeper/images/sprite.png",
								x: ((data.width * 16) / 2) - 1,
								y: 16,
								sx: 0,
								sy: 55,
								sWidth: 26,
								sHeight: 26
							});
						} else if (!data.reset && i >= 0 && i < data.height && j >= 0 && j < data.width) {
							if (data.left && !data.right) {
								data.clicked = { y: i, x: j };
								$this.data("minesweeper", data)
									.drawImage({
										source: "js/minesweeper/images/sprite.png",
										x: ((data.width * 16) / 2) - 1,
										y: 16,
										sx: 52,
										sy: 55,
										sWidth: 26,
										sHeight: 26
									});
								if (!data.field[i][j].shown) {
									$this.drawImage({
										source: "js/minesweeper/images/sprite.png",
										x: (j * 16) + 12,
										y: (i * 16) + 56,
										sx: 0,
										sy: 0,
										sWidth: 16,
										sHeight: 16
									});
								}
							} else if (data.left && data.right) {
								data.clicked = { y: i, x: j };
								$this.data("minesweeper", data)
									.drawImage({
										source: "js/minesweeper/images/sprite.png",
										x: ((data.width * 16) / 2) - 1,
										y: 16,
										sx: 52,
										sy: 55,
										sWidth: 26,
										sHeight: 26
									});
								if (data.field[i][j].flagged) {
									$this.drawImage({
										source: "js/minesweeper/images/sprite.png",
										x: (j) * 16 + 12,
										y: (i) * 16 + 56,
										sx: 64,
										sy: 16,
										sWidth: 16,
										sHeight: 16
									});
								}
								for (var k = -1; k <= 1; k++) {
									for (var l = -1; l <= 1; l++) {
										if (i + k >= 0 && j + l >= 0 && i + k < data.height && j + l < data.width && !data.field[i + k][j + l].flagged && !data.field[i + k][j + l].shown) {
											$this.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: (j + l) * 16 + 12,
												y: (i + k) * 16 + 56,
												sx: 0,
												sy: 0,
												sWidth: 16,
												sHeight: 16
											});
										}
									}
								}
							} else if (!data.left && data.right) {
								setTimeout(function () {
									var $this = $("#" + mineSweeper._id);
									var data = $this.data("minesweeper");
									if (!data.left) {
										if (!data.field[i][j].shown) {
											if (data.field[i][j].flagged) {
												data.flags--;
												data.field[i][j].flagged = false;
												data.field[i][j].question = true;
												$this.drawImage({
													source: "js/minesweeper/images/sprite.png",
													x: (j * 16) + 12,
													y: (i * 16) + 56,
													sx: 48,
													sy: 16,
													sWidth: 16,
													sHeight: 16
												});
												if (data.totalMines - data.flags >= 0) {
													$this.drawImage({
															source: "js/minesweeper/images/sprite.png",
															x: 17,
															y: 17,
															sx: Math.floor((data.totalMines - data.flags) / 100) * 13,
															sy: 32,
															sWidth: 13,
															sHeight: 23
														})
														.drawImage({
															source: "js/minesweeper/images/sprite.png",
															x: 30,
															y: 17,
															sx: Math.floor(((data.totalMines - data.flags) % 100) / 10) * 13,
															sy: 32,
															sWidth: 13,
															sHeight: 23
														})
														.drawImage({
															source: "js/minesweeper/images/sprite.png",
															x: 43,
															y: 17,
															sx: Math.floor(((data.totalMines - data.flags) % 100) % 10) * 13,
															sy: 32,
															sWidth: 13,
															sHeight: 23
														});
												}
											} else if (data.field[i][j].question) {
												data.field[i][j].question = false;
												$this.drawImage({
													source: "js/minesweeper/images/sprite.png",
													x: (j * 16) + 12,
													y: (i * 16) + 56,
													sx: 80,
													sy: 16,
													sWidth: 16,
													sHeight: 16
												});
											} else {
												data.flags++;
												data.field[i][j].flagged = true;
												$this.drawImage({
													source: "js/minesweeper/images/sprite.png",
													x: (j * 16) + 12,
													y: (i * 16) + 56,
													sx: 64,
													sy: 16,
													sWidth: 16,
													sHeight: 16
												});
												if (data.totalMines - data.flags >= 0) {
													$this.drawImage({
															source: "js/minesweeper/images/sprite.png",
															x: 17,
															y: 17,
															sx: Math.floor((data.totalMines - data.flags) / 100) * 13,
															sy: 32,
															sWidth: 13,
															sHeight: 23
														})
														.drawImage({
															source: "js/minesweeper/images/sprite.png",
															x: 30,
															y: 17,
															sx: Math.floor(((data.totalMines - data.flags) % 100) / 10) * 13,
															sy: 32,
															sWidth: 13,
															sHeight: 23
														})
														.drawImage({
															source: "js/minesweeper/images/sprite.png",
															x: 43,
															y: 17,
															sx: Math.floor(((data.totalMines - data.flags) % 100) % 10) * 13,
															sy: 32,
															sWidth: 13,
															sHeight: 23
														});
												}
											}
										}
									}
								}, 100);
							}
						}
					})
					.mouseup(function (e) {
						e.preventDefault();
						var $this = $(this);
						var data = $this.data("minesweeper");
						if (e.which === 1 && data.left && data.clicked && data.clicked.x === -1 && data.clicked.y === -1 && e.offsetY >= 16 && e.offsetY <= 41 && e.offsetX >= ((data.width * 16) / 2) - 1 && e.offsetX <= ((data.width * 16) / 2) + 24) {
							$this.drawImage({
								source: "js/minesweeper/images/sprite.png",
								x: ((data.width * 16) / 2) - 1,
								y: 16,
								sx: 26,
								sy: 55,
								sWidth: 26,
								sHeight: 26
							});
							mineSweeper.reset.call($this);
						}
						var i = Math.floor((e.offsetY - 56) / 16);
						var j = Math.floor((e.offsetX - 12) / 16);
						if (!data.reset && !data.bothclicked && data.clicked && data.left && i >= 0 && j >= 0 && i < data.height && j < data.width) {
							var click = function (i, j) {
								var $this = this;
								data.notshown--;
								data.field[i][j].shown = true;
								data.field[i][j].question = false;
								if (data.field[i][j].flagged) {
									data.field[i][j].flagged = false;
									data.flags--;
									if (data.totalMines - data.flags >= 0) {
										$this.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: 17,
												y: 17,
												sx: Math.floor((data.totalMines - data.flags) / 100) * 13,
												sy: 32,
												sWidth: 13,
												sHeight: 23
											})
											.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: 30,
												y: 17,
												sx: Math.floor(((data.totalMines - data.flags) % 100) / 10) * 13,
												sy: 32,
												sWidth: 13,
												sHeight: 23
											})
											.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: 43,
												y: 17,
												sx: Math.floor(((data.totalMines - data.flags) % 100) % 10) * 13,
												sy: 32,
												sWidth: 13,
												sHeight: 23
											});
									}
								}
								if (data.field[i][j].bomb) {
									// /bomb clicked
									data.reset = true;
									mineSweeper.stopTimer.call($this);
									$this.drawImage({
											source: "js/minesweeper/images/sprite.png",
											x: (j * 16) + 12,
											y: (i * 16) + 56,
											sx: 32,
											sy: 16,
											sWidth: 16,
											sHeight: 16
										})
										.drawImage({
											source: "js/minesweeper/images/sprite.png",
											x: ((data.width * 16) / 2) - 1,
											y: 16,
											sx: 78,
											sy: 55,
											sWidth: 26,
											sHeight: 26
										});
									for (var k = 0; k < data.height; k++) {
										for (var l = 0; l < data.width; l++) {
											if (k !== i || l !== j) {
												if (data.field[k][l].bomb) {
													$this.drawImage({
														source: "js/minesweeper/images/sprite.png",
														x: (l * 16) + 12,
														y: (k * 16) + 56,
														sx: 0,
														sy: 16,
														sWidth: 16,
														sHeight: 16
													});
												} else if (data.field[k][l].flagged) {
													$this.drawImage({
														source: "js/minesweeper/images/sprite.png",
														x: (l * 16) + 12,
														y: (k * 16) + 56,
														sx: 16,
														sy: 16,
														sWidth: 16,
														sHeight: 16
													});
												}
											}
										}
									}
								} else {
									$this.drawImage({
											source: "js/minesweeper/images/sprite.png",
											x: (j * 16) + 12,
											y: (i * 16) + 56,
											sx: data.field[i][j].number * 16,
											sy: 0,
											sWidth: 16,
											sHeight: 16
										})
										.drawImage({
											source: "js/minesweeper/images/sprite.png",
											x: ((data.width * 16) / 2) - 1,
											y: 16,
											sx: 26,
											sy: 55,
											sWidth: 26,
											sHeight: 26
										});
									if (data.notshown === data.totalMines) {
										// /game won
										$this.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: ((data.width * 16) / 2) - 1,
												y: 16,
												sx: 104,
												sy: 55,
												sWidth: 26,
												sHeight: 26
											})
											.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: 17,
												y: 17,
												sx: 0,
												sy: 32,
												sWidth: 13,
												sHeight: 23
											})
											.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: 30,
												y: 17,
												sx: 0,
												sy: 32,
												sWidth: 13,
												sHeight: 23
											})
											.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: 43,
												y: 17,
												sx: 0,
												sy: 32,
												sWidth: 13,
												sHeight: 23
											});
										data.flags = data.totalMines;
										for (var k = 0; k < data.height; k++) {
											for (var l = 0; l < data.width; l++) {
												if (data.field[k][l].bomb) {
													$this.drawImage({
														source: "js/minesweeper/images/sprite.png",
														x: (l * 16) + 12,
														y: (k * 16) + 56,
														sx: 64,
														sy: 16,
														sWidth: 16,
														sHeight: 16
													});
												}
											}
										}
										data.won = true;
										data.reset = true;
										mineSweeper.stopTimer.call($this);
										setTimeout(function () {
											var $this = $("#" + mineSweeper._id);
											var data = $this.data("minesweeper");
											if (!$.store.disabled && data.height === 9 && data.width === 9 && data.totalMines === 10 && data.time < $.store.get("beginner").time) {
												var name = prompt("You have the fastest time for beginner level.\nPlease enter your name.", $.store.get("beginner").name);
												$.store.set("beginner", { time: data.time, name: (name !== null && name !== "") ? name : "Anonymous" });
											} else if (!$.store.disabled && data.height === 16 && data.width === 16 && data.totalMines === 40 && data.time < $.store.get("intermediate").time) {
												var name = prompt("You have the fastest time for intermediate level.\nPlease enter your name.", $.store.get("intermediate").name);
												$.store.set("intermediate", { time: data.time, name: (name !== null && name !== "") ? name : "Anonymous" });
											} else if (!$.store.disabled && data.height === 16 && data.width === 30 && data.totalMines === 99 && data.time < $.store.get("expert").time) {
												var name = prompt("You have the fastest time for expert level.\nPlease enter your name.", $.store.get("expert").name);
												$.store.set("expert", { time: data.time, name: (name !== null && name !== "") ? name : "Anonymous" });
											} else {
												alert("You won!");
											}
										}, 300, data);
									} else if (data.field[i][j].number === 0) {
										for (var k = -1; k <= 1; k++) {
											for (var l = -1; l <= 1; l++) {
												if (i + k >= 0 && j + l >= 0 && i + k < data.height && j + l < data.width && !data.field[i + k][j + l].shown) {
													click.apply($this, [i + k, j + l]);
												}
											}
										}
									}
								}
							};
							if ((e.which === 1 || e.which === 3) && data.right) {
								data.bothclicked = true;
								data.i = i;
								data.j = j;
								setTimeout(function () {
									var $this = $("#" + mineSweeper._id);
									var data = $this.data("minesweeper");
									var i = data.i;
									var j = data.j;
									data.bothclicked = false;
									if (!data.left && !data.right) {
										$this.drawImage({
											source: "js/minesweeper/images/sprite.png",
											x: ((data.width * 16) / 2) - 1,
											y: 16,
											sx: 26,
											sy: 55,
											sWidth: 26,
											sHeight: 26
										});
										if (data.field[i][j].shown) {
											if (data.field[i][j].number !== 0) {
												var count = 0;
												for (var k = -1; k <= 1; k++) {
													for (var l = -1; l <= 1; l++) {
														if (i + k >= 0 && j + l >= 0 && i + k < data.height && j + l < data.width && data.field[i + k][j + l].flagged) {
															count++;
														}
													}
												}
												if (data.field[i][j].number === count) {
													for (var k = -1; k <= 1; k++) {
														for (var l = -1; l <= 1; l++) {
															if (i + k >= 0 && j + l >= 0 && i + k < data.height && j + l < data.width && !data.field[i + k][j + l].flagged && !data.field[i + k][j + l].shown) {
																click.apply($this, [i + k, j + l]);
															}
														}
													}
												} else {
													for (var k = -1; k <= 1; k++) {
														for (var l = -1; l <= 1; l++) {
															if (i + k >= 0 && j + l >= 0 && i + k < data.height && j + l < data.width && !data.field[i + k][j + l].flagged && !data.field[i + k][j + l].shown) {
																if (data.field[i + k][j + l].question) {
																	$this.drawImage({
																		source: "js/minesweeper/images/sprite.png",
																		x: (j + l) * 16 + 12,
																		y: (i + k) * 16 + 56,
																		sx: 48,
																		sy: 16,
																		sWidth: 16,
																		sHeight: 16
																	});
																} else {
																	$this.drawImage({
																		source: "js/minesweeper/images/sprite.png",
																		x: (j + l) * 16 + 12,
																		y: (i + k) * 16 + 56,
																		sx: 80,
																		sy: 16,
																		sWidth: 16,
																		sHeight: 16
																	});
																}
															}
														}
													}
												}
											}
										} else {
											for (var k = -1; k <= 1; k++) {
												for (var l = -1; l <= 1; l++) {
													if (i + k >= 0 && j + l >= 0 && i + k < data.height && j + l < data.width && !data.field[i + k][j + l].flagged && !data.field[i + k][j + l].shown) {
														if (data.field[i + k][j + l].question) {
															$this.drawImage({
																source: "js/minesweeper/images/sprite.png",
																x: (j + l) * 16 + 12,
																y: (i + k) * 16 + 56,
																sx: 48,
																sy: 16,
																sWidth: 16,
																sHeight: 16
															});
														} else {
															$this.drawImage({
																source: "js/minesweeper/images/sprite.png",
																x: (j + l) * 16 + 12,
																y: (i + k) * 16 + 56,
																sx: 80,
																sy: 16,
																sWidth: 16,
																sHeight: 16
															});
														}
													}
												}
											}
										}
									} else {
										for (var k = -1; k <= 1; k++) {
											for (var l = -1; l <= 1; l++) {
												if (i + k >= 0 && j + l >= 0 && i + k < data.height && j + l < data.width && !data.field[i + k][j + l].flagged && !data.field[i + k][j + l].shown) {
													if (data.field[i + k][j + l].question) {
														$this.drawImage({
															source: "js/minesweeper/images/sprite.png",
															x: (j + l) * 16 + 12,
															y: (i + k) * 16 + 56,
															sx: 48,
															sy: 16,
															sWidth: 16,
															sHeight: 16
														});
													} else {
														$this.drawImage({
															source: "js/minesweeper/images/sprite.png",
															x: (j + l) * 16 + 12,
															y: (i + k) * 16 + 56,
															sx: 80,
															sy: 16,
															sWidth: 16,
															sHeight: 16
														});
													}
												}
											}
										}
										if (data.left) {
											data.clicked = { y: i, x: j };
											if (!data.field[i][j].shown) {
												$this.drawImage({
													source: "js/minesweeper/images/sprite.png",
													x: (j * 16) + 12,
													y: (i * 16) + 56,
													sx: 0,
													sy: 0,
													sWidth: 16,
													sHeight: 16
												});
											}
										} else {
											$this.drawImage({
												source: "js/minesweeper/images/sprite.png",
												x: ((data.width * 16) / 2) - 1,
												y: 16,
												sx: 26,
												sy: 55,
												sWidth: 26,
												sHeight: 26
											});
										}
									}
								}, 100);
							} else if (!data.right) {
								$this.drawImage({
									source: "js/minesweeper/images/sprite.png",
									x: ((data.width * 16) / 2) - 1,
									y: 16,
									sx: 26,
									sy: 55,
									sWidth: 26,
									sHeight: 26
								});
								if (data.clicked.y === i && data.clicked.x === j && !data.field[i][j].shown) {
									data.clicked = null;
									if (!data.started) {
										for (var k = 0; k < data.totalMines; k++) {
											var x, y;
											do {
												x = Math.floor(Math.random() * data.width);
												y = Math.floor(Math.random() * data.height);
											} while (data.field[y][x].bomb || (x === j && y === i));
											data.field[y][x].bomb = true;
										}
										for (var m = 0; m < data.height; m++) {
											for (var n = 0; n < data.width; n++) {
												if (!data.field[m][n].bomb) {
													var count = 0;
													for (var k = -1; k <= 1; k++) {
														for (var l = -1; l <= 1; l++) {
															if (m + k >= 0 && n + l >= 0 && m + k < data.height && n + l < data.width && data.field[m + k][n + l].bomb) {
																count++;
															}
														}
													}
													data.field[m][n].number = count;
												}
											}
										}
										data.started = true;
										data.time = 0;
										mineSweeper.startTimer.call($this);
									}
									click.apply($this, [i, j]);
								}
							}
						}
						switch (e.which) {
							case 1:
								data.left = false;
								if (data.ctrlclick) {
									data.right = false;
								}
								break;
							case 3:
								data.right = false;
								if (data.ctrlclick) {
									data.left = false;
								}
								break;
							default:
								// do nothing
						}

					})
					.bind("contextmenu", function (e) {
						return false;
					});
				mineSweeper._changeSize.call($this);
			});
		},
		destroy: function () {
			return this.each(function () {
				$(this).clearCanvas().unbind().removeData("minesweeper");
			});
		},
		reset: function () {
			return this.each(function () {
				var $this = $(this);
				var data = $this.data("minesweeper");
				if (!data) {
					throw ("Not initialized");
				}
				mineSweeper.stopTimer.call($this);
				data.reset = false;
				data.won = false;
				data.started = false;
				data.flags = 0;
				data.notshown = data.width * data.height;
				data.field = new Array(data.height);
				for (var i = 0; i < data.height; i++) {
					data.field[i] = new Array(data.width);
				}
				$this.clearCanvas({
						x: 12,
						y: 56,
						width: data.width * 16,
						height: data.height * 16
					})
					.clearCanvas({
						x: 17,
						y: 17,
						width: 39,
						height: 23
					})
					.clearCanvas({
						x: ((data.width * 16) / 2) - 1,
						y: 16,
						width: 26,
						height: 26
					})
					.clearCanvas({
						x: (data.width * 16) - 32,
						y: 17,
						width: 39,
						height: 23
					})
					// /smiley
					.drawImage({
						source: "js/minesweeper/images/sprite.png",
						x: ((data.width * 16) / 2) - 1,
						y: 16,
						sx: 26,
						sy: 55,
						sWidth: 26,
						sHeight: 26
					})
					// /time
					.drawImage({
						source: "js/minesweeper/images/sprite.png",
						x: (data.width * 16) - 32,
						y: 17,
						sx: 0,
						sy: 32,
						sWidth: 13,
						sHeight: 23
					})
					.drawImage({
						source: "js/minesweeper/images/sprite.png",
						x: (data.width * 16) - 19,
						y: 17,
						sx: 0,
						sy: 32,
						sWidth: 13,
						sHeight: 23
					})
					.drawImage({
						source: "js/minesweeper/images/sprite.png",
						x: (data.width * 16) - 6,
						y: 17,
						sx: 0,
						sy: 32,
						sWidth: 13,
						sHeight: 23
					})
					// /mines left
					.drawImage({
						source: "js/minesweeper/images/sprite.png",
						x: 17,
						y: 17,
						sx: Math.floor(data.totalMines / 100) * 13,
						sy: 32,
						sWidth: 13,
						sHeight: 23
					})
					.drawImage({
						source: "js/minesweeper/images/sprite.png",
						x: 30,
						y: 17,
						sx: Math.floor((data.totalMines % 100) / 10) * 13,
						sy: 32,
						sWidth: 13,
						sHeight: 23
					})
					.drawImage({
						source: "js/minesweeper/images/sprite.png",
						x: 43,
						y: 17,
						sx: Math.floor((data.totalMines % 100) % 10) * 13,
						sy: 32,
						sWidth: 13,
						sHeight: 23
					});
				for (var i = 0; i < data.height; i++) {
					for (var j = 0; j < data.width; j++) {
						data.field[i][j] = {
							flagged: false,
							shown: false,
							question: false,
							bomb: false,
							number: 0
						};
						$this.drawImage({
							source: "js/minesweeper/images/sprite.png",
							x: (j * 16) + 12,
							y: (i * 16) + 56,
							sx: 80,
							sy: 16,
							sWidth: 16,
							sHeight: 16
						});
					}
				}

			});
		},
		startTimer: function () {
			var data = this.data("minesweeper");
			clearInterval(data.timer);
			if (data.started && !data.reset) {
				data.timer = setInterval(function () {
					var $this = $("#" + mineSweeper._id);
					var data = $this.data("minesweeper");
					if (++data.time < 1000) {
						$this.drawImage({
								source: "js/minesweeper/images/sprite.png",
								x: (data.width * 16) - 32,
								y: 17,
								sx: Math.floor(data.time / 100) * 13,
								sy: 32,
								sWidth: 13,
								sHeight: 23
							})
							.drawImage({
								source: "js/minesweeper/images/sprite.png",
								x: (data.width * 16) - 19,
								y: 17,
								sx: Math.floor((data.time % 100) / 10) * 13,
								sy: 32,
								sWidth: 13,
								sHeight: 23
							})
							.drawImage({
								source: "js/minesweeper/images/sprite.png",
								x: (data.width * 16) - 6,
								y: 17,
								sx: Math.floor((data.time % 100) % 10) * 13,
								sy: 32,
								sWidth: 13,
								sHeight: 23
							});
					}
				}, 1000);
			}
			return this;
		},
		stopTimer: function () {
			clearInterval(this.data("minesweeper").timer);
			return this;
		},
		setOptions: function (options) {
			return this.each(function () {
				var $this = $(this);
				var data = $this.data("minesweeper");
				if (!data) {
					throw ("Not initialized");
				}
				data = $.extend(data, options);

				mineSweeper._changeSize.call($this);
			});
		},
		getData: function () {
			return this.data("minesweeper");
		},
		_changeSize: function () {
			return this.each(function () {
				var $this = $(this);
				var data = $this.data("minesweeper");
				if (!data) {
					throw ("Not initialized");
				}
				$this.attr({ width: (data.width * 16) + 20, height: (data.height * 16) + 64 })
					.clearCanvas()
					.drawRect({
						strokeStyle: "#c0c0c0",
						strokeWidth: 6,
						x: 6,
						y: 7,
						width: (data.width * 16) + 12,
						height: (data.height * 16) + 55
					})
					// /middle border
					.drawRect({
						fillStyle: "#c0c0c0",
						x: 9,
						y: 47,
						width: (data.width * 16) + 6,
						height: 6
					})
					// /top section
					// /background
					.drawRect({
						fillStyle: "#c0c0c0",
						x: 11,
						y: 12,
						width: (data.width * 16) + 2,
						height: 33
					})
					// /top side
					.drawRect({
						fillStyle: "#808080",
						x: 9,
						y: 10,
						width: (data.width * 16) + 4,
						height: 2
					})
					// /left side
					.drawRect({
						fillStyle: "#808080",
						x: 9,
						y: 12,
						width: 2,
						height: 33
					})
					// /top right corner
					.drawRect({
						fillStyle: "#808080",
						x: (data.width * 16) + 13,
						y: 10,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: (data.width * 16) + 13,
						y: 11,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: (data.width * 16) + 14,
						y: 10,
						width: 1,
						height: 1
					})
					// /bottom left corner
					.drawRect({
						fillStyle: "#808080",
						x: 9,
						y: 45,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: 10,
						y: 45,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: 9,
						y: 46,
						width: 1,
						height: 1
					})
					// /mines left
					// /top side
					.drawRect({
						fillStyle: "#808080",
						x: 16,
						y: 16,
						width: 40,
						height: 1
					})
					// /left side
					.drawRect({
						fillStyle: "#808080",
						x: 16,
						y: 17,
						width: 1,
						height: 23
					})
					// /bottom side
					.drawRect({
						fillStyle: "#ffffff",
						x: 17,
						y: 40,
						width: 40,
						height: 1
					})
					// /right side
					.drawRect({
						fillStyle: "#ffffff",
						x: 56,
						y: 17,
						width: 1,
						height: 23
					})
					// /time
					// /top side
					.drawRect({
						fillStyle: "#808080",
						x: (data.width * 16) - 33,
						y: 16,
						width: 40,
						height: 1
					})
					// /left side
					.drawRect({
						fillStyle: "#808080",
						x: (data.width * 16) - 33,
						y: 17,
						width: 1,
						height: 23
					})
					// /bottom side
					.drawRect({
						fillStyle: "#ffffff",
						x: (data.width * 16) - 32,
						y: 40,
						width: 40,
						height: 1
					})
					// /right side
					.drawRect({
						fillStyle: "#ffffff",
						x: (data.width * 16) + 7,
						y: 17,
						width: 1,
						height: 23
					})
					// /minefield border
					// /top side
					.drawRect({
						fillStyle: "#808080",
						x: 9,
						y: 53,
						width: (data.width * 16) + 3,
						height: 3
					})
					// /left side
					.drawRect({
						fillStyle: "#808080",
						x: 9,
						y: 56,
						width: 3,
						height: (data.height * 16)
					})
					// /top right corner
					.drawRect({
						fillStyle: "#808080",
						x: (data.width * 16) + 12,
						y: 53,
						width: 1,
						height: 2
					})
					.drawRect({
						fillStyle: "#808080",
						x: (data.width * 16) + 13,
						y: 53,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: (data.width * 16) + 12,
						y: 55,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: (data.width * 16) + 13,
						y: 54,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: (data.width * 16) + 14,
						y: 53,
						width: 1,
						height: 1
					})
					// /bottom left corner
					.drawRect({
						fillStyle: "#808080",
						x: 9,
						y: (data.height * 16) + 56,
						width: 2,
						height: 1
					})
					.drawRect({
						fillStyle: "#808080",
						x: 9,
						y: (data.height * 16) + 57,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: 11,
						y: (data.height * 16) + 56,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: 10,
						y: (data.height * 16) + 57,
						width: 1,
						height: 1
					})
					.drawRect({
						fillStyle: "#c0c0c0",
						x: 9,
						y: (data.height * 16) + 58,
						width: 1,
						height: 1
					});

				mineSweeper.reset.call($this);
			});
		}
	};

	$.fn.minesweeper = function (options) {
		if (this.get(0) === null) {
			return;
		}
		if (this.get(0).tagName.toLowerCase() !== "canvas") {
			throw ("Must be a CANVAS element.");
		}
		if (typeof (options) === "object" || typeof (options) === "undefined") {
			return mineSweeper.init.call(this, options);
		} else if (typeof (options) === "string" && options.substring(0, 1) !== "_" && mineSweeper[options]) {
			return mineSweeper[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		throw ("Invalid arguments");
	};
})(jQuery);
(function ($) {

	var leftdown = false,
		rightdown = false;
	$.event.special.bothmousedown = {
		setup: function () {
			$(this).bind("mousedown", mousedown_handler);
		},
		teardown: function () {
			$(this).unbind("mousedown", mousedown_handler);
		}
	};
	// Special event definition.
	$.event.special.bothmouseup = {
		setup: function () {
			$(this).bind("mouseup", mouseup_handler);
		},
		teardown: function () {
			$(this).unbind("mouseup", mouseup_handler);
		}
	};
	// Special event definition.
	$.event.special.bothmousemove = {
		setup: function () {
			$(this).bind("mousemove", mousemove_handler);
		},
		teardown: function () {
			$(this).unbind("mousemove", mousemove_handler);
		}
	};
	$.fn.bothmousedown = function (func) {
		this.bind("bothmousedown", func);
	};
	$.fn.bothmouseup = function (func) {
		this.bind("bothmouseup", func);
	};
	$.fn.bothmousemove = function (func) {
		this.bind("bothmousemove", func);
	};

	function mousedown_handler(e) {
		switch (e.which) {
			case 1:
				leftdown = true;
				break;
			case 3:
				rightdown = true;
				break;
			default:
				// do nothing
		}

		if (leftdown && rightdown) {
			$(this).trigger("bothmousedown");
		}
	};

	function mouseup_handler(e) {
		switch (e.which) {
			case 1:
				leftdown = false;
				break;
			case 3:
				rightdown = false;
				break;
			default:
				// do nothing
		}

		if (leftdown && rightdown) {
			$(this).trigger("bothmouseup");
		}
	};

	function mousemove_handler(e) {
		if (leftdown && rightdown) {
			$(this).trigger("bothmousemove");
		}
	};

})(jQuery);
