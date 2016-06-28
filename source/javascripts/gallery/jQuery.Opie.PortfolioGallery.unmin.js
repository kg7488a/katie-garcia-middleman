var p = "auto",
	T = '[object Object]',
	X = "filters",
	Y = "data-opie-",
	K = 100,
	g = ".",
	L = null,
	P = true,
	q = false,
	D = "undefined",
	m = "object";

function debug(a) {
	if (arguments.length > 1) {
		console.log(arguments);
	} else {
		console.log(a);
	}
}
var ___isArray = function (a) {
	if (typeof a === m) {
		if (typeof a.length == D) {
			return q;
		}
		return P;
	}
	return q;
}, __applyToAll = function (a, b) {
		Array.prototype[a] = b;
		String.prototype[a] = b;
		Number.prototype[a] = b;
		Date.prototype[a] = b;
		Function.prototype[a] = b;
		RegExp.prototype[a] = b;
		Boolean.prototype[a] = b;
	}, __applyTo = function (a, b, c) {
		if (a.match(/,/i)) {
			ex = a.split(/,/i);
			for (i = 0; i < ex.length; i++) {
				__apply(ex[i], b, c);
			}
		} else {
			__apply(a, b, c);
		}
	}, __apply = function (a, b, c) {
		if (a == "Array") {
			Array.prototype[b] = c;
		} else if (a == "String") {
			String.prototype[b] = c;
		} else if (a == "Number") {
			Number.prototype[b] = c;
		} else if (a == "Date") {
			Date.prototype[b] = c;
		} else if (a == "Function") {
			Function.prototype[b] = c;
		} else if (a == "RegExp") {
			RegExp.prototype[b] = c;
		} else if (a == "Boolean") {
			Boolean.prototype[b] = c;
		}
	};
__apply("Array", "isIn", function (a) {
	if (!___isArray(a)) {
		var b = a.toString().split(/,/g);
	} else {
		var b = a;
	}
	arr = this.valueOf();
	for (var c = 0; c < arr.length; c++) {
		arrValue = arr[c];
		for (var d = 0; d < b.length; d++) {
			exValue = b[d];
			if (exValue == arrValue) {
				return true;
			}
		}
	}
	return false;
});

function __isNumeric(a) {
	if (a === L) {
		return q;
	}
	if (a === undefined) {
		return q;
	}
	if (a == "") {
		return q;
	}
	a = a.toString().replace(/,/g, g);
	if (isNaN(a) == P) {
		return q;
	} else {
		return P;
	}
}

function __toNumber(a) {
	if (typeof a == D) {
		a = this.valueOf();
	}
	if (a == undefined) {
		return q;
	}
	a = a.toString().replace(/,/g, g);
	if (__isNumeric(a)) {
		if (a.match(/\./)) {
			return parseFloat(a);
		} else {
			return parseInt(a);
		}
	}
	return 0;
}
__applyToAll("toNumber", __toNumber);
var __toNegative = function () {
	var a = __toNumber(this.valueOf());
	if (a <= 0) {
		return a;
	}
	return a * -1;
};
__applyToAll("toNegative", __toNegative);
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};
}
if (!Array.prototype.compare) {
	Array.prototype.compare = function (a) {
		if (!a) return false;
		if (this.length != a.length) return false;
		for (var b = 0; b < this.length; b++) {
			if (this[b] instanceof Array && a[b] instanceof Array) {
				if (!this[b].compare(a[b])) return false;
			} else if (this[b] != a[b]) {
				return false;
			}
		}
		return true;
	};
}
var __toPositive = function () {
	var a = __toNumber(this.valueOf());
	if (a <= 0) {
		a = a * (-1);
	}
	return a;
};
__applyToAll("toPositive", __toPositive);

function __toArray(a) {
	if (___isArray(a)) {
		return a;
	}
	return this.valueOf().toString().trim().split(/,/g);
}
__applyToAll("toArray", __toArray);
var __toJSON = function (a) {
	var b = typeof (a);
	if (b != m || a === L) {
		if (b == "string") a = '"' + a + '"';
		return String(a);
	} else {
		var c, d, e = [],
			f = (a && a.constructor == Array);
		for (c in a) {
			d = a[c];
			b = typeof (d);
			if (b == "string") d = '"' + d + '"';
			else if (b == m && d !== L) d = __toJSON(d);
			e.push((f ? "" : '"' + c + '":') + String(d));
		}
		return (f ? "[" : "{") + String(e) + (f ? "]" : "}");
	}
};
String.prototype.toJSON = __toJSON;
var __toBool = function () {
	var a = this.valueOf();
	if (a === "1" || a === 1 || a === "true" || a == P) {
		return P;
	}
	return q;
};
__applyToAll("toBool", __toBool);
var __mathString = function (a) {
	if (!this.valueOf().toNumber) {
		console.trace();
	}
	var b = this.valueOf().toNumber();
	a = a.replace(" ", "");
	$op = a.substring(0, 1);
	mathValue = __toNumber(a.substring(1));
	newValue = mathValue;
	if ($op == "+") {
		newValue = b + mathValue;
	} else if ($op == "*") {
		newValue = b * mathValue;
	} else if ($op == "-") {
		newValue = b - mathValue;
	} else if ($op == "%") {
		newValue = (b * mathValue) / K;
	} else if ($op == "/" || $op == ":") {
		newValue = b / mathValue;
	}
	return newValue;
};
__applyTo("String,Number", "math", __mathString);
Function.prototype.eBind = function (c, d, e) {
	var f = this;
	return function () {
		var a = d || arguments;
		if (e === P) {
			a = Array.prototype.slice.call(arguments, 0);
			a = a.concat(d);
		} else if (typeof e === 'number' && isFinite(e)) {
			a = Array.prototype.slice.call(arguments, 0);
			var b = [e, 0].concat(d);
			Array.prototype.splice.apply(a, b);
		}
		return f.apply(c || window, a);
	};
};
Function.prototype.delay = function (a, b, c) {
	var d = this,
		c = c || [],
		e = d.eBind(b, c);
	window.setTimeout(e, a);
	return d;
};
String.prototype.toCamelCase = function () {
	return this.replace(/-([a-z])/g, function (a, b) {
		return b.toUpperCase();
	}).replace('-', '');
};
Array.prototype.remove = function (a, b) {
	var c = this.slice((b || a) + 1 || this.length);
	this.length = a < 0 ? this.length + a : a;
	return this.push.apply(this, c);
};
__toFloat = function () {
	return parseFloat(this.valueOf());
};
__applyToAll("toFloat", __toFloat);
__toInt = function () {
	return parseInt(this.valueOf());
};
__applyToAll("toInt", __toInt);
$.support.transition = (function () {
	var a = document.body || document.documentElement,
		b = a.style,
		c = b.transition !== undefined || b.WebkitTransition !== undefined || b.MozTransition !== undefined || b.MsTransition !== undefined || b.OTransition !== undefined;
	return c;
})();
jQuery.fn.setData = function (a, b) {
	if (String(a) === '[object Object]' && typeof b == "undefined") {
		for (var c in a) {
			jQuery(this).data("opie-" + c, a[c]);
		}
		return this;
	} else {
		return jQuery(this).data("opie-" + a, b);
	}
};
jQuery.fn.getData = function (a) {
	return jQuery(this).data("opie-" + a);
};
jQuery.fn.setAttr = function (a, b) {
	return jQuery(this).attr(Y + a, b);
};
jQuery.fn.getAttr = function (a) {
	return jQuery(this).attr(Y + a);
};
jQuery.fn.delAttr = function (a) {
	return jQuery(this).removeAttr(Y + a);
};
jQuery.fn.hasFilter = function (a) {
	if (a === q || typeof a == D) {
		return P;
	}
	var b = jQuery(this).getData(X);
	if (typeof b[a] != D) {
		return P;
	}
	return q;
};
jQuery.fn.parseFilters = function (c) {
	var d = jQuery(this),
		e = (c) ? [] : {};
	if (d.getAttr("filter")) {
		var f = d.getAttr("filter").toString().split(",");
		if (f.length > 0) {
			jQuery.each(f, function (a, b) {
				if (c) {
					e.push(b);
				} else {
					e[b] = true;
				}
			});
		}
	}
	jQuery(this).setData("filters", e);
	return d;
};
jQuery.fn.replaceClass = function (a, b) {
	if (typeof b == D) {
		if (a.toString().indexOf("|") >= 0) {
			ex = a.split("|");
			a = ex[0];
			b = ex[1];
		} else {
			b = a;
		}
	}
	return this.removeClass(a).addClass(b);
};
jQuery.fn.ok = function () {
	return (this.size() > 0) ? P : q;
};
jQuery.fn.getID = function () {
	return this.attr("id");
};
jQuery.fn.ID = function (a) {
	if (typeof a != D) {
		return this.attr("id", a);
	}
	return this.attr("id");
};
jQuery.fn.reverse = [].reverse;
var Is = new function () {
		this.object = function (a) {
			return String(a) === T;
		};
		this.defined = function (a) {
			return typeof a !== D;
		};
		this.array = function (a) {
			if (typeof a === "object") {
				if (typeof a.length == "undefined") {
					return false;
				}
				return true;
			}
			return false;
		};
		this.number = function (a) {
			return typeof a === 'number' && isFinite(a);
		};
		this.string = function (a) {
			return typeof a === 'string';
		};
		this.func = function (a) {
			return typeof a == 'function';
		};
		this.cssSelector = function (a) {
			if (Is.string(a)) {
				if (a == "#") {
					return q;
				}
				if (a.substr(0, 1) == "#" || a.substr(0, 1) == g) {
					return P;
				}
			}
			return q;
		};
		this.between = function (d, e, f, k) {
			var s = function (a, b, c) {
				if (a >= b && a <= c) {
					return P;
				}
				return q;
			};
			if ($.isArray(d)) {
				var x = q;
				if (k == "and") {
					$.each(d, function (a, b) {
						if (!s(b, e, f)) {
							x = q;
							return q;
						}
					});
				} else {
					$.each(d, function (a, b) {
						if (s(b, e, f)) {
							x = P;
							return q;
						}
					});
				}
				return x;
			} else {
				return s(d, e, f);
			}
			return q;
		};
	}, Utils = new function () {
		this.clone = function (a) {
			if (a == L || !Is.object(a)) {
				return a;
			}
			var b = {};
			for (var c in a) {
				if (a.hasOwnProperty(c)) {
					b[c] = Utils.clone(a[c]);
				}
			}
			return b;
		};
		this.defaultValue = function (a, b) {
			b = (!Is.defined(b)) ? q : b;
			if (!Is.defined(a)) {
				return b;
			}
			return a;
		};
		this.roundNumber = function (a, b) {
			var c = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
			return c;
		};
		this.calcNewImageSize = function (a, b, c, d, e) {
			finalHeight = d;
			finalWidth = c;
			if (!Is.defined(e)) {
				var e = q;
				if (a > b) {
					e = "W";
				} else if (a < b) {
					e = "H";
				} else {
					e = "H";
				} if (c == p) {
					e = "H";
				}
				if (d == p) {
					e = "W";
				}
			}
			if (e == 'H') {
				c = Utils.roundNumber(d * (a / b), 0);
				d = finalHeight;
			} else if (e == 'W') {
				d = Utils.roundNumber(c * (b / a), 0);
				c = finalWidth;
			}
			return {
				ratio: e,
				h: d,
				w: c
			};
		};
	}, Opts = function (a, b) {
		this.opts = a;
		this.jq = b;
	};
Opts.prototype = {
	get: function (a) {
		return this.parse(this.opts[a]);
	},
	string: function (a) {
		return this.parse(this.opts[a], P);
	},
	number: function (a) {
		return parseFloat(this.get(a));
	},
	bool: function (a) {
		var b = this.get(a);
		if (b == "1" || b === P) {
			return P;
		}
		return q;
	},
	selector: function (a) {
		return this.jq(this.get(a));
	},
	func: function (a) {
		return this.parse(this.opts[a], P, P);
	},
	parse: function (a, b, c) {
		if (typeof a == D) {
			return "";
		}
		var d = a.valueOf();
		if (typeof d == "function") {
			if (c == P) {
				return d;
			}
			return d();
		} else if (Is.cssSelector(d) && b !== P) {
			var e = this.jq(d);
			if (e.size() <= 0) {
				debug("Opts.parse " + d + " not found");
				return falese;
			}
			var f = (e.get(0).tagName == "INPUT" && e.attr("type").toString().toLowerCase() == "checkbox");
			if (f) {
				return e.is(":checked");
			}
			return e.val();
		} else {
			return d;
		}
	}
};
(function (n) {
	"use strict";
	n.fn.OpiePortfolioGallery = function (a, b) {
		var c = "linear",
			d = {
				boxSelector: ".o-box",
				innerWrapperSelector: ".o-inner-wrapper",
				bigImageSelector: "img.o-big-image",
				thumbImageSelector: "img.o-thumb-image",
				extraInfoSelector: ".o-extra-info",
				enlargeButtonSelector: ".o-enlarge",
				maxBoxSize: 195,
				loaderFadeInDuration: 150,
				loaderFadeOutDuration: 450,
				boxMovementDuration: 300,
				delayIncrease: 0,
				delayStart: 0,
				maxDelay: 0,
				scrollingAid: P,
				boxPositionEasing: c,
				extraInfoOpenEasing: c,
				extraInfoCloseEasing: c,
				boxOpenEasing: c,
				boxCloseEasing: c,
				boxOpenDuration: 300,
				boxCloseDuration: 300,
				filterNavSelector: q,
				dontResizeThumbs: q,
				useCentering: q,
				userCSS3Accelerate: P,
				showMore: 12
			}, e = new Opts(n.extend(d, a), n),
			f;
		this.each(function () {
			f = new n.OpiePortfolioGallery(e, n(this), arguments);
			if (a === "initCSS3") {
				IS.initCSS3.apply(f, b);
			} else {
				f.init();
			}
		});
		return this;
	};
	n.OpiePortfolioGallery = function (j, G, L0) {
		var B0 = "inMotion",
			E0 = "o-hidden",
			F0 = "bigImageSelector",
			o0 = "src",
			f0 = ".o-hidden",
			C0 = "delayIncrease",
			D0 = "boxSelector",
			r = this,
			t = G.find(j.string(D0)),
			R = G.find(j.string("innerWrapperSelector")),
			b0 = j.number("maxBoxSize"),
			o = 0,
			z = 0,
			p0 = 0,
			V = q,
			q0 = 0,
			g0 = j.bool("userCSS3Accelerate"),
			I0 = j.number("boxCloseDuration"),
			H0 = j.get("boxCloseEasing"),
			u0 = j.number("boxMovementDuration"),
			t0 = j.get("boxPositionEasing"),
			G0 = j.number(C0),
			r0 = j.get("boxOpenEasing"),
			s0 = j.get("boxOpenDuration");
		this.init = function () {
			this.initCSS3();
			if (j.string("filterNavSelector") !== false) {
				var d = n(j.string("filterNavSelector")),
					e = d.filter(".active");
				if (e.size() > 0) {
					V = e.getAttr("filter");
				}
				d.click(function () {
					d.removeClass("active");
					t.removeClass("doReduce doEnlarge");
					n(this).addClass("active");
					V = n(this).getAttr("filter");
					r.fillTiles(false, true);
				});
			}
			t.each(function () {
				var a = n(this);
				a.parseFilters();
				if (a.find(j.string("extraInfoSelector")).size() > 0) {
					var b = a.find(j.string("bigImageSelector"));
					if (b.parent().is("a")) {
						b = b.parent();
					} else {}
					b.wrap('<div class="o-big-image-wrapper" />');
					a.find(".o-big-image-wrapper").append('<a href="#" class="o-enlarge closed"><span>Enlarge</span></a>');
				}
				a.setData("positionData", false);
				a.append('<div class="loader" />');
			});
			t.find(j.string("enlargeButtonSelector")).click(function () {
				var a = n(this),
					b = n(this).parents(j.string("boxSelector"));
				if (G.hasClass("inMotion")) {
					return false;
				}
				if (b.hasClass("doEnlarge")) {
					b.replaceClass("doEnlarge", "doReduce");
					a.replaceClass("opened", "closed");
				} else {
					a.replaceClass("closed", "opened");
					b.replaceClass("doReduce", "doEnlarge");
				}
				r.fillTiles(false, false);
				return false;
			});
			t.click(function (a) {
				var b = n(a.target);
				if (G.hasClass("inMotion")) {
					return false;
				}
				var c = n(this);
				if (c.hasClass("o-show-more")) {
					r.showMore();
				} else {
					t.removeClass("doReduce doEnlarge");
					if (c.hasClass("active")) {
						c.removeClass("active").addClass("preDeActive");
					} else {
						c.addClass("preactive");
					}
					r.loader(t.filter(".active").addClass("wasActive"), true);
					r.loader(c, true);
					r.fillTiles(true, false, true);
					if (!b.parent().is("a")) {
						return false;
					}
				}
			});
			r.initSizes();
			var f = (function () {
				var c = 0;
				return function (a, b) {
					clearTimeout(c);
					c = setTimeout(a, b);
				};
			})(),
				k, s, x = n(window).resize(function () {
					var a = x.width();
					var b = x.height();
					if (k != a || s != b) {
						f(function () {
							t.removeClass("active doEnlarge doReduce");
							t.find(j.string("bigImageSelector")).css("width", "").css("height", "");
							r.initSizes();
						}, 300);
					}
					k = a;
					s = b;
				});
		};
		this.initCSS3 = function () {
			var a = "s cubic-bezier(";
			if (g0 && n.support.transition) {
				JsCss.init();
				var b = "all " + (u0 / 1000) + a + CSS3Easings[t0] + ")";
				JsCss.addRuleStyle(".opie-portfolio .o-box.moving", {
					"-webkit-transition": b,
					"-moz-transition": b,
					"-o-transition": b,
					"-ms-transition": b,
					"transition": b
				});
				var b = "all " + (s0 / 1000) + a + CSS3Easings[r0] + ")";
				JsCss.addRuleStyle(".opie-portfolio .o-box.opening", {
					"-webkit-transition": b,
					"-moz-transition": b,
					"-o-transition": b,
					"-ms-transition": b,
					"transition": b
				});
			}
		};
		this.initSizes = function () {
			t.setData("positionData", false);
			var a = G.outerWidth(true) - (G.outerWidth() - G.width());
			R.width(a);
			var b = a / b0,
				c = Utils.roundNumber(b, 2).toString().replace(/,/g, ".").split("."),
				d = j.bool("dontResizeThumbs");
			if (d === false) {
				if (Is.defined(c[1]) && c[1] < 50) {
					var e = Math.ceil(b);
				} else {
					var e = Math.floor(b);
				}
			} else {
				var e = c[0].toNumber();
			}
			var f = true;
			o = Math.floor((((100 / e) / 100) * a));
			if (d === false) {
				while (f) {
					if (o > b0) {
						e++;
						o = (((100 / e) / 100) * a);
					} else {
						f = false;
					}
				}
			}
			if (o > b0) {
				o = b0;
				var k = (b0 * e);
				if (a > k && j.bool("useCentering") === true) {
					q0 = a - k;
					R.width((a - q0));
				}
			}
			r.fillTiles(false, true);
		};
		this.loadThumbs = function (k) {
			if (!Is.defined(k)) {
				k = t.not(f0);
			}
			k.each(function () {
				var a = "mouseOn",
					b = "mouseOut",
					c = n(this),
					d = n(this).find(j.string("thumbImageSelector")),
					e = d.getAttr(o0),
					f = q;
				if (e) {
					if (e == p) {
						f = P;
						e = c.find(j.string(F0)).getAttr(o0);
						d.addClass(p);
					}
					d.unbind("load").load(function () {
						d.delAttr("src");
						if (f) {
							if (this.naturalWidth > this.naturalHeight && f) {
								d.addClass("height");
								d.css("marginLeft", (this.width / 2) * -1);
							} else {
								d.addClass("width");
								d.css("marginTop", (this.height / 2) * -1);
							}
						}
						d.addClass("loaded");
						r.loader(c, false);
					}).attr("src", e);
				}
				c.hover(function () {
					n(this).replaceClass(b, a);
				}, function () {
					n(this).replaceClass(a, b);
				});
			});
		};
		this.loader = function (a, b) {
			var c = "div.loader";
			if (b == P) {
				a.find(c).each(function () {
					n(this).stop().fadeIn(j.number("loaderFadeInDuration"));
				});
			} else {
				a.find(c).each(function () {
					n(this).stop().stop().fadeOut(j.number("loaderFadeOutDuration"));
				});
			}
		};
		this.rePosImg = function (a, b, c, d) {
			var e = {};
			if (c > a) {
				var f = Utils.calcNewImageSize(c, d, (a - (b - d) * 2), p);
				c = f.w;
				d = f.h;
				e.width = c;
				e.height = d;
			}
			e.marginLeft = (a - c) / 2;
			e.marginTop = (b - d) / 2;
			n(this).css(e);
		};
		this.fillTiles = function (w0, v0, J0) {
			if (G.hasClass("inMotion")) {
				return false;
			}
			G.addClass("inMotion");
			z = 0;
			var M = 0,
				A = 0,
				K0 = 0,
				N = R.innerWidth(),
				O = 0,
				U = 0,
				H = 0,
				I = 0,
				x0 = t.filter(".preactive,.doEnlarge,.doReduce").size(),
				a0 = j.number("maxDelay");
			if (a0 == 0) {
				a0 = 999999999;
			}
			var y = j.number("delayStart"),
				d0 = function (b, c) {
					var d = true;
					b.addClass("moving");
					for (var e = 0; e < b.length; e++) {
						var f = n(b[e]);
						if (!f.hasFilter(V)) {
							f.addClass("filterOut");
						} else {
							f.removeClass("filtered");
						} if ((!f.hasClass("preactive") && !f.hasClass("doEnlarge") && !f.hasClass("doReduce")) || f.hasClass("filterOut")) {
							var k = {
								width: o,
								height: o
							}, s = {};
							if (f.hasClass("filterOut") || f.hasClass("filtered") || f.hasClass("o-hidden")) {
								if (!f.hasClass("filtered")) {
									if (d == true) {
										k.left = o.toNegative();
										d = false;
									} else {
										k.left = N + o;
										d = true;
									}
									k.top = o.toNegative();
									f.addClass("filtered");
								}
							} else {
								k.left = A;
								k.top = M;
								var x = A + o;
								if (x > N) {
									M += o;
									A = 0;
								}
								x = A + o;
								j0 = M + o;
								if (x0 > 0) {
									var c0 = true;
									while (c0) {
										if ((Is.between(A, O, (U - 1)) && Is.between(M, H, (I - 1))) || (Is.between((x - 1), O, (U - 1)) && Is.between((j0 - 1), H, (I - 1)))) {
											A = U;
											var x = A + o;
											if (x > N) {
												M += o;
												A = 0;
												c0 = true;
											} else {
												c0 = false;
											}
										} else {
											c0 = false;
										}
									}
								}
								var x = A + o;
								if (x > N) {
									M += o;
									A = 0;
								}
								k.left = A;
								k.top = M;
								A += o;
								z = Math.max(z, (M + o));
							} if (f.hasClass("preDeActive") || f.hasClass("active")) {
								s.duration = I0;
								s.easing = H0;
							} else {
								s.duration = u0;
								s.easing = t0;
							}
							s.complete = function () {
								var a = n(this);
								if (a.hasClass("active") || a.hasClass("o-show-more") || a.hasClass("preDeActive")) {
									r.loader(a, false);
								}
								a.removeClass("preDeActive active moving");
								if (a.hasClass("last")) {
									r.afterLastAnimation();
								}
							};
							var W = f.getData("LastAnimCss");
							if (v0 == true) {
								f.setData("positionData", {
									left: k.left,
									top: k.top
								});
							}
							if (f.hasClass("o-hidden")) {
								f.css(k);
								s.complete.eBind(f)();
							} else {
								var h0 = true;
								if (W && W.left == k.left && W.top == k.top && W.height == k.height && W.width == k.width) {
									h0 = false;
								}
								if (h0 == true) {
									if (g0 && n.support.transition) {
										f.css.eBind(f, [k]).delay(y);
										s.complete.eBind(f).delay((y + s.duration));
									} else {
										s.queue = false;
										f.delay(y).animate(k, s);
									} if (y < a0) {
										y += G0;
									}
								} else {
									s.complete.eBind(f)();
								}
							}
							f.setData("LastAnimCss", k);
						} else {
							f.removeClass("activated moving");
						}
					}
				};
			t.removeClass("filterOut");
			var Z = (w0) ? t.not(".filtered,.filterOut") : t;
			t.removeClass("last");
			Z.last().addClass("last");
			var B = Z.filter(".doEnlarge");
			if (B.size() > 0) {
				var l = {}, E = {
						duration: j.number("extraInfoOpenDuration")
					};
				B.setData("beforeEnlargeHeight", B.height());
				var C = B.outerWidth(true),
					v = B.outerHeight(true) + B.find(j.string("extraInfoSelector")).outerHeight(true),
					y0 = Math.ceil((v / o));
				v += ((y0 * o) - v);
				l.height = v;
				var Q = B.position();
				l.left = Q.left;
				l.top = Q.top;
				O = l.left;
				U = O + C;
				H = l.top;
				I = H + v;
				z = Math.max(z, I);
				E.easing = j.get("extraInfoCloseEasing");
				B.delay(y).animate(l, E);
				if (y < a0) {
					y += j.number("delayIncrease");
				}
				if (!B.hasFilter(V)) {
					B.addClass("filterOut");
				}
				B.setData("LastAnimCss", l);
				B = false;
			}
			var J = Z.filter(".doReduce");
			if (J.size() > 0) {
				var l = {}, E = {
						duration: j.number("extraInfoCloseDuration")
					}, C = J.outerWidth(true),
					v = J.getData("beforeEnlargeHeight");
				l.height = v;
				var Q = J.position();
				l.left = Q.left;
				l.top = Q.top;
				O = l.left;
				U = O + C;
				H = l.top;
				I = H + v;
				z = Math.max(z, I);
				E.easing = j.get("extraInfoOpenEasing");
				J.animate(l, E);
				if (!J.hasFilter(V)) {
					J.addClass("filterOut");
				}
				J.setData("LastAnimCss", l);
				J = false;
			}
			var u = Z.filter(".preactive");
			if (u.size() > 0) {
				u.addClass("opening");
				var l = {}, E = {
						duration: s0
					}, C = o * 4,
					v = o * 2;
				if (C > N) {
					C = N;
				}
				l.width = C;
				l.height = v;
				var e0 = u.getData("positionData");
				if (e0 !== false && u.hasClass("last") && u.prevAll(j.string("boxSelector") + ".wasActive").size() > 0 || u.nextAll(j.string("boxSelector") + ".wasActive").size() > 0) {
					l.left = e0.left;
					l.top = e0.top;
				} else {
					var Q = u.position();
					l.left = Q.left;
					l.top = Q.top;
				}
				t.removeClass("wasActive");
				var A0 = l.left + C,
					j0 = l.top + v;
				if (A0 > N) {
					var z0 = N - C;
					l.left = z0;
					if (l.left < 0) {
						l.left = 0;
					}
				}
				O = l.left;
				U = O + C;
				H = l.top;
				I = H + v;
				z = Math.max(z, I);
				if (j.bool("scrollingAid")) {
					var i0 = n(window).scrollTop(),
						n0 = R.offset(),
						m0 = n(window).height() + i0,
						l0 = n0.top + I;
					if (l0 > m0) {
						n('html, body').animate({
							scrollTop: "+=" + ((l0 - m0) + (v / 2))
						}, 300);
					}
					var k0 = n0.top + H;
					if (k0 < i0) {
						n('html, body').animate({
							scrollTop: k0 - (v / 2)
						}, 300);
					}
				}
				E.complete = function () {
					var a = n(this),
						b = a.find(j.string("bigImageSelector"));
					if (b.getAttr("src")) {
						var c = b.getAttr("src");
						b.unbind("load").load(function () {
							b.setData("width", this.naturalWidth);
							b.setData("height", this.naturalHeight);
							r.rePosImg.call(b, C, v, this.naturalWidth, this.naturalHeight);
							a.replaceClass("preactive", "active");
							b.delAttr("src");
							r.loader(a, false);
						}).attr("src", c);
					} else {
						r.rePosImg.call(b, C, v, b.getData("width"), b.getData("height"));
						a.replaceClass("preactive", "active");
						r.loader(a, false);
					}
					a.removeClass("opening").find(j.string("enlargeButtonSelector")).removeClass("opened");
					if (a.hasClass("last")) {
						r.afterLastAnimation();
					}
				};
				E.easing = r0;
				if (g0 && n.support.transition) {
					u.css.eBind(u, [l]).delay(y);
					E.complete.eBind(u).delay((y + E.duration));
				} else {
					E.queue = false;
					u.delay(y).animate(l, E);
				} if (!u.hasFilter(V)) {
					u.addClass("filterOut");
				}
				if (y < a0) {
					y += j.number("delayIncrease");
				}
				d0(u.prevAll().reverse());
				y = 0;
				d0(u.nextAll(), true);
				u.setData("LastAnimCss", l);
				u = false;
			} else {
				d0(Z);
			}
			r.fixPortSize(false);
		};
		this.showMore = function () {
			var a = j.number("showMore");
			if (!a) {
				a = 1;
			}
			var b = t.filter(f0).slice(0, a).removeClass(E0);
			r.fillTiles(q, P);
		};
		this.afterLastAnimation = function () {
			G.removeClass(B0);
			window.setTimeout(r.loadThumbs, K);
			r.fixPortSize(P);
			if (t.filter(f0).size() <= 0) {
				t.filter(".o-show-more").hide();
			}
		};
		this.fixPortSize = function (a) {
			var b = R.position().top + R.innerHeight();
			if (z > b) {
				var c = "+=" + (z - b);
			} else {
				var c = "-=" + (b - z);
			} if (a == q && p0 > z) {
				return q;
			}
			R.stop().animate({
				"height": c
			}, "fast");
			p0 = z;
		};
	};
})(jQuery);