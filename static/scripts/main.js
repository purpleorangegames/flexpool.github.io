function showNav() {
	$("nav").animate({
		top: 0
	}, 200), window.isNavHidden = !1
}

function hideNav() {
	$("nav").animate({
		top: -100
	}, 200), window.isNavHidden = !0
}

function formatLuck(e, t, o = 0) {
	return t && (e = 1 / e), Math.round(100 * e * Math.pow(10, o)) / Math.pow(10, o)
}

function toggleLuck(e) {
	//$(".luck-value").each((function(t, o) {
	//    o = $(o), decimals = o.attr("luck-decimals"), null == decimals && (decimals = 0), o.html(formatLuck(parseFloat(o.attr("data-luck"), 10), e, decimals))
	//}))
}

function togglePro(e) {
	window.isPro = e,
		proElems = [$("#blocks-selector"),
			$(".blocks-tabs-count"),
			$(".promode-required")
		],
		proElemsHide = [$(".account-help"),
			$(".nopromode-required")
		],
		flexElems = [$(".blocks-tabs-count")],
		e ? localStorage.setItem("isPro", 1) : localStorage.removeItem("isPro");
	for (let t = 0; t < proElems.length; t++) e ? $.inArray(proElems[t], flexElems) ? (proElems[t].show(), prefferendElemDisplay = proElems[t].attr("promode-display"), null == prefferendElemDisplay && (prefferendElemDisplay = "flex"), proElems[t].css("display", prefferendElemDisplay)) : proElems[t].show() : proElems[t].hide();
	for (let t = 0; t < proElemsHide.length; t++) e ? proElemsHide[t].hide() : proElemsHide[t].show();
	e ? $("#blocks-table").removeClass("round-corners") : $("#blocks-table").addClass("round-corners"), toggleLuck(e)
}
async function awaitSwitch() {
	await new Promise((e => setTimeout(e, 500))), $(".footer-switch").find(".switch__label").removeClass("notransition")
}

function applyDarkMode(e) {
	e ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light"), detectAndApplyColorScheme()
}

function getCookie(e) {
	var t = null;
	if (document.cookie && "" !== document.cookie)
		for (var o = document.cookie.split(";"), i = 0; i < o.length; i++) {
			var n = o[i].trim();
			if (n.substring(0, e.length + 1) === e + "=") {
				t = decodeURIComponent(n.substring(e.length + 1));
				break
			}
		}
	return t
}
$("*").hover((function() {
	$(this).data("hover", 1)
}), (function() {
	$(this).data("hover", 0)
})), Array.prototype.remove = function() {
	for (var e, t, o = arguments, i = o.length; i && this.length;)
		for (e = o[--i]; - 1 !== (t = this.indexOf(e));) this.splice(t, 1);
	return this
}, $(document).ready((function() {
	window.prevPageYOffset = window.pageYOffset, window.isNavHidden = !1
})), $(".hamburger").click((function() {
	nav = $("nav"), body = $("body"), navul = $(".navbody ul"), hamburger = $(".hamburger"), nav.height() <= 100 ? (nav.animate({
		height: "100%"
	}, 150), body.css("overflow", "hidden"), hamburger.addClass("is-active"), navul.css("visibility", "visible")) : (nav.css({
		height: "100px"
	}), body.css("overflow", "visible"), hamburger.removeClass("is-active"), navul.css("visibility", "hidden"))
})), $(window).scroll((function() {
	currentScrollYOffset = window.pageYOffset, diff = 100, (currentScrollYOffset - window.prevPageYOffset > diff || window.prevPageYOffset - currentScrollYOffset > diff) && (currentScrollYOffset <= 110 && showNav(), currentScrollYOffset > window.prevPageYOffset ? !window.isNavHidden && currentScrollYOffset > 120 && hideNav() : window.isNavHidden && showNav(), window.prevPageYOffset = currentScrollYOffset)
})), $(".footer-switch").click((function() {
	body = document.body, html = document.documentElement, pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight), scrollBottomOffset = pageHeight - (window.pageYOffset + window.innerHeight), input = $(this).find("input"), input.prop("checked", !input.is(":checked")), id = $(this).attr("id"), checked = $(this).find("input").is(":checked"), "promode-switch" == id ? checked ? togglePro(!0) : togglePro(!1) : "darkmode-switch" == id && (checked ? applyDarkMode(!0) : applyDarkMode(!1)), pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight), document.documentElement.scrollTop = pageHeight - window.innerHeight - scrollBottomOffset
})), isPro = Boolean(localStorage.getItem("isPro")), $(".footer-switch").find(".switch__label").addClass("notransition"), isPro ? $(".is_pro_switch").prop("checked", !0) : $(".is_pro_switch").prop("checked", !1), "dark" == document.documentElement.getAttribute("data-theme") ? $(".dark_mode_switch").prop("checked", !0) : $(".dark_mode_switch").prop("checked", !1), togglePro(isPro), $(document).ready((function() {
	toggleLuck(isPro)
})), awaitSwitch(), $(".clickable").hover((function() {
	$(this).find(".underline-on-hover-clickable").addClass("underline-on-hover-clickable-main")
}), (function() {
	$(this).find(".underline-on-hover-clickable").removeClass("underline-on-hover-clickable-main")
})), $(".language-selection").hover((function() {
	$(".language-selection ul").show()
}), (function() {
	$(".language-selection ul").hide()
})), $(".language-selection-item").click((async function() {
	newLang = $(this).attr("data-lang"), null != newLang && $.post("/setlang/", {
		csrfmiddlewaretoken: getCookie("csrftoken"),
		language: newLang
	}, (function() {
		newPath = location.pathname.replace(LANGUAGE_CODE, newLang), window.location = newPath
	}))
}));
var activeI18NTranslations = {};

function _(e) {
	return "en" == LANGUAGE_CODE ? e : activeI18NTranslations.hasOwnProperty(e) ? activeI18NTranslations[e] : e
}
"en" != LANGUAGE_CODE && $.getScript("/static/scripts/i18n/" + LANGUAGE_CODE + ".js", (function() {
	activeI18NTranslations = i18nTranslations
}), (function(e) {
	console.error("Unable to get translations", e)
}));
$("#refreshData").click(() => {
	reloadData();
});
$("#autoRefresh").click(() => {
	if ($("#autoRefresh").html().includes("Start")) {
		reloadTimer = setInterval(function() {
			$('#countdown').html('120');
			reloadData();
		}, 120000);
		$('#countdown').html('120');
		$('#startRefresh').css('background-color', 'var(--gray-color)');
		$('#stopRefresh').css('background-color', 'var(--accent-color)');
		startCountdown = setInterval(function() {
			let seconds = parseInt($('#countdown').html());
			seconds--;
			if (seconds >= 0) $('#countdown').html(seconds);
		}, 1000);
		$("#autoRefresh").html("Stop Refresh");
		$("#autoRefresh").css("filter", "brightness(85%)");
	} else {
		window.clearInterval(reloadTimer);
		window.clearInterval(startCountdown);
		reloadTimer = 0;
		startCountdown = 0;
		$('#countdown').html('');
		$('#startRefresh').css('background-color', 'var(--accent-color);');
		$('#stopRefresh').css('background-color', 'var(--gray-color)');
		$("#autoRefresh").html("Start Refresh");
		$("#autoRefresh").css("filter", "");
	}
});
$("#themesTabToggle").click(() => {
	$('#themeWindow').toggle();
	$("#themesTabToggle").css("filter", `${$("#themeWindow").is(":visible") ? "brightness(85%)" : ""}`);
});
$("#donateTabToggle").click(() => {
	$('#donateWindow').toggle();
	$("#donateTabToggle").css("filter", `${$("#donateWindow").is(":visible") ? "brightness(85%)" : ""}`);
});
