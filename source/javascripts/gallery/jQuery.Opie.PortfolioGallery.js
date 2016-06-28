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

/**
 * Responsive Fully Customizable jQuery Portfolio Gallery
 * @author Gen Taliaru http://www.opiescripts.com/
 * @version 1.0.2
 */
(function($) {
	"use strict";
	$.fn.OpiePortfolioGallery = function(options, args) {
	
		var defaults = 
		{
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
			scrollingAid: true,
			boxPositionEasing: "linear",
			extraInfoOpenEasing: "linear",
			extraInfoCloseEasing: "linear",
			boxOpenEasing: "linear",
			boxCloseEasing: "linear",
			boxOpenDuration: 300,
			boxCloseDuration: 300,
			filterNavSelector: false,
			
			dontResizeThumbs: false,
			useCentering: false,
			
			userCSS3Accelerate: true,
			showMore: 12
		};
		var Opt = new Opts($.extend(defaults, options), $);
		
		var PG;
		this.each(function() {
			PG = new $.OpiePortfolioGallery(Opt, $(this), arguments);
			if (options === "initCSS3") 
			{
				IS.initCSS3.apply(PG, args);
			}
			else 
			{
				PG.init();
			}
		});
		
		return this;
	}
	
	$.OpiePortfolioGallery = function(Opt, $Wrapper, allArgs) {
	
		var me = this;
		var $Boxes = $Wrapper.find(Opt.string("boxSelector"));
		var $Inner = $Wrapper.find(Opt.string("innerWrapperSelector"));
		var maxBoxSize = Opt.number("maxBoxSize");
		var boxSize = 0;
		var maxBottom = 0;
		var currentButtom = 0;
		var activeFilterName = false;
		var leftOverRight = 0;
		var userCSS3Accelerate = Opt.bool("userCSS3Accelerate");
		var boxCloseDuration = Opt.number("boxCloseDuration");
		var boxCloseEasing = Opt.get("boxCloseEasing");
		var boxMovementDuration = Opt.number("boxMovementDuration");
		var boxPositionEasing = Opt.get("boxPositionEasing");
		var delayIncrease = Opt.number("delayIncrease");
		var boxOpenEasing = Opt.get("boxOpenEasing");
		var boxOpenDuration = Opt.get("boxOpenDuration");
		
		this.init = function() {
		
			this.initCSS3();
			
			if (Opt.string("filterNavSelector") !== false) 
			{
				var $NavItems = $(Opt.string("filterNavSelector"));
				var $ActiveFIlterNav = $NavItems.filter(".active");
				if ($ActiveFIlterNav.size() > 0) 
				{
					activeFilterName = $ActiveFIlterNav.getAttr("filter");
				}
				$NavItems.click(function() {
					$NavItems.removeClass("active");
					$Boxes.removeClass("doReduce doEnlarge");
					$(this).addClass("active");
					activeFilterName = $(this).getAttr("filter");
					me.fillTiles(false, true);
				});
			}
			
			$Boxes.each(function() {
				var $th = $(this);
				$th.parseFilters();
				if ($th.find(Opt.string("extraInfoSelector")).size() > 0) 
				{
					var $bigImage = $th.find(Opt.string("bigImageSelector"));
					if ($bigImage.parent().is("a")) 
					{
						$bigImage = $bigImage.parent();
					}
					else 
					{
					
										}
					$bigImage.wrap('<div class="o-big-image-wrapper" />');
					$th.find(".o-big-image-wrapper").append('<a href="#" class="o-enlarge closed"><span>Enlarge</span></a>');
				}
				$th.setData("positionData", false);
				$th.append('<div class="loader" />');
			});
			$Boxes.find(Opt.string("enlargeButtonSelector")).click(function() {
				var $a = $(this);
				var $box = $(this).parents(Opt.string("boxSelector"));
				if ($Wrapper.hasClass("inMotion")) 
				{
					return false;
				}
				if ($box.hasClass("doEnlarge")) 
				{
					$box.replaceClass("doEnlarge", "doReduce");
					$a.replaceClass("opened", "closed");
				}
				else 
				{
					$a.replaceClass("closed", "opened");
					$box.replaceClass("doReduce", "doEnlarge");
				}
				me.fillTiles(false, false);
				return false;
			});
			$Boxes.click(function(e) {
				var $target = $(e.target);
				if ($Wrapper.hasClass("inMotion")) 
				{
					return false;
				}
				var $th = $(this);
				// get width of screen
				//if mobile (or less than 1 col cut off, divide width by 195 or maxboxwidth
				//set target width to that number, rounded down
				//set for portrait
				//set for landscape
				
				//if not mobile carry on with 
				
				if ($th.hasClass("portrait")) 
				{
					window.targetWidth = 2;
					window.targetHeight = 3;

				}
				else 
				{
					window.targetWidth = 4;
					window.targetHeight = 2;
				}
				
				if ($th.hasClass("o-show-more")) 
				{
					me.showMore();
				}
				else 
				{
					$Boxes.removeClass("doReduce doEnlarge");
					
					if ($th.hasClass("active")) 
					{
						$th.removeClass("active").addClass("preDeActive");
					}
					else 
					{
						$th.addClass("preactive");
					}
					me.loader($Boxes.filter(".active").addClass("wasActive"), true);
					me.loader($th, true);
					me.fillTiles(true, false, true);
					if (!$target.parent().is("a")) 
					{
						return false;
					}
				}
			});
			me.initSizes();
			var delay = (function() {
				var timer = 0;
				return function(callback, ms) {
					clearTimeout(timer);
					timer = setTimeout(callback, ms);
				};
			})();
			var x, y;
			var w = $(window).resize(function() {
				var newx = w.width();
				var newy = w.height();
				if (x != newx || y != newy) 
				{
					delay(function() {
						$Boxes.removeClass("active doEnlarge doReduce");
						$Boxes.find(Opt.string("bigImageSelector")).css("width", "").css("height", "");
						me.initSizes();
					}, 300);
				}
				x = newx;
				y = newy;
			});
			
		}
		
		this.initCSS3 = function() {
			if (userCSS3Accelerate && $.support.transition) 
			{
				JsCss.init();
				var transistion = "all " + (boxMovementDuration / 1000) + "s cubic-bezier(" + CSS3Easings[boxPositionEasing] + ")";
				JsCss.addRuleStyle(".opie-portfolio .o-box.moving", 
				{
					"-webkit-transition": transistion,
					"-moz-transition": transistion,
					"-o-transition": transistion,
					"-ms-transition": transistion,
					"transition": transistion
				});
				
				var transistion = "all " + (boxOpenDuration / 1000) + "s cubic-bezier(" + CSS3Easings[boxOpenEasing] + ")";
				JsCss.addRuleStyle(".opie-portfolio .o-box.opening", 
				{
					"-webkit-transition": transistion,
					"-moz-transition": transistion,
					"-o-transition": transistion,
					"-ms-transition": transistion,
					"transition": transistion
				});
			}
		}
		
		this.initSizes = function() {
			$Boxes.setData("positionData", false);
			
			var innerWidth = $Wrapper.outerWidth(true) - ($Wrapper.outerWidth() - $Wrapper.width());
			$Inner.width(innerWidth);
			
			var op = innerWidth / maxBoxSize;
			
			var tmpSp = Utils.roundNumber(op, 2).toString().replace(/,/g, ".").split(".");
			var dontResizeThumbs = Opt.bool("dontResizeThumbs");
			if (dontResizeThumbs === false) 
			{
				if (Is.defined(tmpSp[1]) && tmpSp[1] < 50) 
				{
					var maxPerRow = Math.ceil(op);
				}
				else 
				{
					var maxPerRow = Math.floor(op);
				}
			}
			else 
			{
				var maxPerRow = tmpSp[0].toNumber();
			}
			
			
			var con = true;
			boxSize = Math.floor((((100 / maxPerRow) / 100) * innerWidth));
			if (dontResizeThumbs === false) 
			{
				while (con) 
				{
					if (boxSize > maxBoxSize) 
					{
						maxPerRow++;
						boxSize = (((100 / maxPerRow) / 100) * innerWidth);
					}
					else 
					{
						con = false;
					}
				}
			}
			if (boxSize > maxBoxSize) 
			{
				boxSize = maxBoxSize;
				var rowWidth = (maxBoxSize * maxPerRow);
				if (innerWidth > rowWidth && Opt.bool("useCentering") === true) 
				{
					leftOverRight = innerWidth - rowWidth;
					$Inner.width((innerWidth - leftOverRight));
				}
			}
			me.fillTiles(false, true);
		}
		
		this.loadThumbs = function($tuhmbs) {
			if (!Is.defined($tuhmbs)) 
			{
				$tuhmbs = $Boxes.not(".o-hidden");
			}
			$tuhmbs.each(function() {
				var $th = $(this);
				var $img = $(this).find(Opt.string("thumbImageSelector"));
				var imageLoaction = $img.getAttr("src");
				var isAuto = false;
				if (imageLoaction) 
				{
					if (imageLoaction == "auto") 
					{
						isAuto = true;
						imageLoaction = $th.find(Opt.string("bigImageSelector")).getAttr("src");
						$img.addClass("auto");
					}
					$img.unbind("load").load(function() {
						$img.delAttr("src");
						if (isAuto) 
						{
							if (this.naturalWidth > this.naturalHeight && isAuto) 
							{
								$img.addClass("height");
								$img.css("marginLeft", (this.width / 2) * -1);
							}
							else 
							{
								$img.addClass("width");
								$img.css("marginTop", (this.height / 2) * -1);
							}
						}
						$img.addClass("loaded");
						me.loader($th, false);
					}).attr("src", imageLoaction);
				}
				
				if(!isTouchDevice()) {
					$th.hover(function() {
						$(this).replaceClass("mouseOut", "mouseOn");
					}, function() {
						$(this).replaceClass("mouseOn", "mouseOut");
					})
				}

			});
		}
		
		this.loader = function($box, showHide) {
			if (showHide == true) 
			{
				$box.find("div.loader").each(function() {
					$(this).stop().fadeIn(Opt.number("loaderFadeInDuration"));
				})
			}
			else 
			{
				$box.find("div.loader").each(function() {
					$(this).stop().stop().fadeOut(Opt.number("loaderFadeOutDuration"));
				})
			}
		}
		
		this.rePosImg = function(wrapperWidth, wrapperHeight, imgWidth, imgHeight) {
			var animCss = {}
			if (imgWidth > wrapperWidth) 
			{
				var newSize = Utils.calcNewImageSize(imgWidth, imgHeight, (wrapperWidth - (wrapperHeight - imgHeight) * 2), "auto");
				imgWidth = newSize.w;
				imgHeight = newSize.h;
				animCss.width = imgWidth;
				animCss.height = imgHeight;
			}
			animCss.marginLeft = (wrapperWidth - imgWidth) / 2;
			animCss.marginTop = (wrapperHeight - imgHeight) / 2;
			$(this).css(animCss)
		}
		
		this.fillTiles = function(onlyFiltered, resetPositionData, clicked) {
			if ($Wrapper.hasClass("inMotion")) 
			{
				return false;
			}
			
			$Wrapper.addClass("inMotion");
			maxBottom = 0;
			var lTop = 0;
			var lLeft = 0;
			var i = 0;
			var innerWidth = $Inner.innerWidth();
			var activeLeft = 0;
			var activeRight = 0;
			var activeTop = 0;
			var activeBottom = 0;
			var activeCount = $Boxes.filter(".preactive,.doEnlarge,.doReduce").size();
			var maxDelay = Opt.number("maxDelay");
			if (maxDelay == 0) 
			{
				maxDelay = 999999999;
			}
			var delay = Opt.number("delayStart");
			
			var fillThumbTiles = function($tmpBoxes, d) {
				var filterOutLeft = true;
				$tmpBoxes.addClass("moving");
				for (var i = 0; i < $tmpBoxes.length; i++) 
				{
				
					var $th = $($tmpBoxes[i]);
					if (!$th.hasFilter(activeFilterName)) 
					{
						$th.addClass("filterOut");
					}
					else 
					{
						$th.removeClass("filtered");
					}					
					if ((!$th.hasClass("preactive") && !$th.hasClass("doEnlarge") && !$th.hasClass("doReduce")) || $th.hasClass("filterOut")) 
					{
						var animCss = 
						{
							width: boxSize,
							height: boxSize
						};
						var animConfig = {}
						if ($th.hasClass("filterOut") || $th.hasClass("filtered") || $th.hasClass("o-hidden")) 
						{
							if (!$th.hasClass("filtered")) 
							{
								if (filterOutLeft == true) 
								{
									animCss.left = boxSize.toNegative();
									filterOutLeft = false;
								}
								else 
								{
									animCss.left = innerWidth + boxSize;
									filterOutLeft = true;
								}
								animCss.top = boxSize.toNegative();
								$th.addClass("filtered");
							}
						}
						else 
						{
							animCss.left = lLeft;
							animCss.top = lTop;
							
							var newRight = lLeft + boxSize;
							if (newRight > innerWidth) 
							{
								lTop += boxSize;
								lLeft = 0;
							}
							
							newRight = lLeft + boxSize;
							newBottom = lTop + boxSize;
							if (activeCount > 0) 
							{
								var con = true;
								while (con) 
								{
									if ((Is.between(lLeft, activeLeft, (activeRight - 1)) && Is.between(lTop, activeTop, (activeBottom - 1))) ||
									(Is.between((newRight - 1), activeLeft, (activeRight - 1)) && Is.between((newBottom - 1), activeTop, (activeBottom - 1)))) 
									{
										lLeft = activeRight;
										var newRight = lLeft + boxSize;
										if (newRight > innerWidth) 
										{
											lTop += boxSize;
											lLeft = 0;
											con = true;
										}
										else 
										{
											con = false;
										}
									}
									else 
									{
										con = false;
									}
								}
							}
							var newRight = lLeft + boxSize;
							if (newRight > innerWidth) 
							{
								lTop += boxSize;
								lLeft = 0;
							}
							
							animCss.left = lLeft;
							animCss.top = lTop;
							lLeft += boxSize;
							
							maxBottom = Math.max(maxBottom, (lTop + boxSize));
						}
						
						if ($th.hasClass("preDeActive") || $th.hasClass("active")) 
						{
							animConfig.duration = boxCloseDuration;
							animConfig.easing = boxCloseEasing;
						}
						else 
						{
							animConfig.duration = boxMovementDuration;
							animConfig.easing = boxPositionEasing;
						}
						
						animConfig.complete = function() {
							var $th = $(this);
							if ($th.hasClass("active") || $th.hasClass("o-show-more") || $th.hasClass("preDeActive")) 
							{
								me.loader($th, false);
							}
							$th.removeClass("preDeActive active moving");
							if ($th.hasClass("last")) 
							{
								me.afterLastAnimation();
							}
						}
						
						var LastAnimCss = $th.getData("LastAnimCss");
						if (resetPositionData == true) 
						{
							$th.setData("positionData", 
							{
								left: animCss.left,
								top: animCss.top
							});
						}
						
						if ($th.hasClass("o-hidden")) 
						{
							$th.css(animCss);
							animConfig.complete.eBind($th)();
						}
						else 
						{
							var isChanged = true;
							if (LastAnimCss && LastAnimCss.left == animCss.left && LastAnimCss.top == animCss.top && LastAnimCss.height == animCss.height && LastAnimCss.width == animCss.width) 
							{
								isChanged = false;
							}
							
							if (isChanged == true) 
							{
								if (userCSS3Accelerate && $.support.transition) 
								{
									$th.css.eBind($th, [animCss]).delay(delay);
									animConfig.complete.eBind($th).delay((delay + animConfig.duration));
								}
								else 
								{
									animConfig.queue = false;
									$th.delay(delay).animate(animCss, animConfig);
								}
								if (delay < maxDelay) 
								{
									delay += delayIncrease;
								}
							}
							else 
							{
								animConfig.complete.eBind($th)();
							}
						}
						$th.setData("LastAnimCss", animCss);
					}
					else 
					{
						$th.removeClass("activated moving");
					}
				}
			}
			
			
			$Boxes.removeClass("filterOut");
			var $tmpBoxes = (onlyFiltered) ? $Boxes.not(".filtered,.filterOut") : $Boxes;
			$Boxes.removeClass("last");
			$tmpBoxes.last().addClass("last");
			
			var $Enlarge = $tmpBoxes.filter(".doEnlarge");
			if ($Enlarge.size() > 0) 
			{
				var animCss = {};
				var animConfig = 
				{
					duration: Opt.number("extraInfoOpenDuration")
				}
				$Enlarge.setData("beforeEnlargeHeight", $Enlarge.height());
				var newWidth = $Enlarge.outerWidth(true);
				var newHeight = $Enlarge.outerHeight(true) + $Enlarge.find(Opt.string("extraInfoSelector")).outerHeight(true);
				
				var op = Math.ceil((newHeight / boxSize));
				newHeight += ((op * boxSize) - newHeight);
				animCss.height = newHeight;
				var thPos = $Enlarge.position();
				animCss.left = thPos.left;
				animCss.top = thPos.top;
				activeLeft = animCss.left;
				activeRight = activeLeft + newWidth;
				activeTop = animCss.top;
				activeBottom = activeTop + newHeight;
				
				maxBottom = Math.max(maxBottom, activeBottom);
				
				animConfig.easing = Opt.get("extraInfoCloseEasing");
				$Enlarge.delay(delay).animate(animCss, animConfig);
				if (delay < maxDelay) 
				{
					delay += Opt.number("delayIncrease");
				}
				if (!$Enlarge.hasFilter(activeFilterName)) 
				{
					$Enlarge.addClass("filterOut");
				}
				$Enlarge.setData("LastAnimCss", animCss);
				$Enlarge = false;
			}
			var $Reduce = $tmpBoxes.filter(".doReduce");
			if ($Reduce.size() > 0) 
			{
				var animCss = {};
				var animConfig = 
				{
					duration: Opt.number("extraInfoCloseDuration")
				}
				var newWidth = $Reduce.outerWidth(true);
				var newHeight = $Reduce.getData("beforeEnlargeHeight");
				
				animCss.height = newHeight;
				var thPos = $Reduce.position();
				animCss.left = thPos.left;
				animCss.top = thPos.top;
				activeLeft = animCss.left;
				activeRight = activeLeft + newWidth;
				activeTop = animCss.top;
				activeBottom = activeTop + newHeight;
				
				maxBottom = Math.max(maxBottom, activeBottom);
				
				animConfig.easing = Opt.get("extraInfoOpenEasing");
				$Reduce.animate(animCss, animConfig);
				if (!$Reduce.hasFilter(activeFilterName)) 
				{
					$Reduce.addClass("filterOut");
				}
				$Reduce.setData("LastAnimCss", animCss);
				$Reduce = false;
			}
			
			var $Preactive = $tmpBoxes.filter(".preactive");
			if ($Preactive.size() > 0) 
			{
				$Preactive.addClass("opening");
				var animCss = {};
				var animConfig = 
				{
					duration: boxOpenDuration
				}

				//added
				var newWidth = boxSize * targetWidth;
				var newHeight = boxSize * targetHeight;
				//end added

				
				if (newWidth > innerWidth) 
				{
					newWidth = innerWidth;
				}
				
				
				animCss.width = newWidth;
				animCss.height = newHeight;
				
				
				var PosData = $Preactive.getData("positionData");
				if (PosData !== false && $Preactive.hasClass("last") && $Preactive.prevAll(Opt.string("boxSelector") + ".wasActive").size() > 0 || $Preactive.nextAll(Opt.string("boxSelector") + ".wasActive").size() > 0) 
				{
					animCss.left = PosData.left;
					animCss.top = PosData.top;
				}
				else 
				{
					var thPos = $Preactive.position();
					animCss.left = thPos.left;
					animCss.top = thPos.top;
				}
				$Boxes.removeClass("wasActive");
				
				var newRight = animCss.left + newWidth;
				var newBottom = animCss.top + newHeight;
				if (newRight > innerWidth) 
				{
					var c = innerWidth - newWidth;
					animCss.left = c;
					if (animCss.left < 0) 
					{
						animCss.left = 0;
					}
				}
				
				activeLeft = animCss.left;
				activeRight = activeLeft + newWidth;
				activeTop = animCss.top;
				activeBottom = activeTop + newHeight;
				
				
				maxBottom = Math.max(maxBottom, activeBottom);
				
				if (Opt.bool("scrollingAid")) 
				{
					var scrollTop = $(window).scrollTop();
					var innerOffset = $Inner.offset();
					
					var viewPortBottom = $(window).height() + scrollTop;
					var actualBottom = innerOffset.top + activeBottom;
					if (actualBottom > viewPortBottom) 
					{
						$('html, body').animate(
						{
							scrollTop: "+=" + ((actualBottom - viewPortBottom) + (newHeight / 2))
						}, 300);
					}
					var actualTop = innerOffset.top + activeTop;
					if (actualTop < scrollTop) 
					{
						$('html, body').animate(
						{
							scrollTop: actualTop - (newHeight / 2)
						}, 300);
					}
				}
				
				animConfig.complete = function() {
					var $box = $(this);
					var $img = $box.find(Opt.string("bigImageSelector"));
					if ($img.getAttr("src")) 
					{
						var imageLoaction = $img.getAttr("src");
						$img.unbind("load").load(function() {
							$img.setData("width", this.naturalWidth);
							$img.setData("height", this.naturalHeight);
							me.rePosImg.call($img, newWidth, newHeight, this.naturalWidth, this.naturalHeight);
							$box.replaceClass("preactive", "active");
							$img.delAttr("src");
							me.loader($box, false);
						}).attr("src", imageLoaction);
					}
					else 
					{
						me.rePosImg.call($img, newWidth, newHeight, $img.getData("width"), $img.getData("height"));
						$box.replaceClass("preactive", "active");
						me.loader($box, false);
					}
					$box.removeClass("opening").find(Opt.string("enlargeButtonSelector")).removeClass("opened");
					if ($box.hasClass("last")) 
					{
						me.afterLastAnimation();
					}
				}
				
				animConfig.easing = boxOpenEasing;
				
				if (userCSS3Accelerate && $.support.transition) 
				{
					$Preactive.css.eBind($Preactive, [animCss]).delay(delay);
					animConfig.complete.eBind($Preactive).delay((delay + animConfig.duration));
				}
				else 
				{
					animConfig.queue = false;
					$Preactive.delay(delay).animate(animCss, animConfig);
				}
				
				if (!$Preactive.hasFilter(activeFilterName)) 
				{
					$Preactive.addClass("filterOut");
				}
				if (delay < maxDelay) 
				{
					delay += Opt.number("delayIncrease");
				}
				fillThumbTiles($Preactive.prevAll().reverse());
				delay = 0;
				fillThumbTiles($Preactive.nextAll(), true);
				$Preactive.setData("LastAnimCss", animCss);
				$Preactive = false;
			}
			else 
			{
				fillThumbTiles($tmpBoxes);
			}
			
			me.fixPortSize(false);
		}
		
		
		this.showMore = function() {
			var showMoreNr = Opt.number("showMore");
			if (!showMoreNr) 
			{
				showMoreNr = 1;
			}
			var showMoreThumbs = $Boxes.filter(".o-hidden").slice(0, showMoreNr).removeClass("o-hidden");
			me.fillTiles(false, true);
		}
		
		this.afterLastAnimation = function() {
			$Wrapper.removeClass("inMotion");
			window.setTimeout(me.loadThumbs, 100);
			me.fixPortSize(true);
			if ($Boxes.filter(".o-hidden").size() <= 0) 
			{
				$Boxes.filter(".o-show-more").hide();
			}
		}
		
		this.fixPortSize = function(calledInAnimationComplete) {
			var innerBottom = $Inner.position().top + $Inner.innerHeight();
			if (maxBottom > innerBottom) 
			{
				var animHeight = "+=" + (maxBottom - innerBottom);
			}
			else 
			{
				var animHeight = "-=" + (innerBottom - maxBottom);
				
			}
			if (calledInAnimationComplete == false && currentButtom > maxBottom) 
			{
				return false;
			}
			$Inner.stop().animate(
			{
				"height": animHeight
			}, "fast");
			currentButtom = maxBottom;
		}
		
	}
})(jQuery);
