/*! jquery-pjax */
!function (t) { function e(e, a, r) { return r = g(a, r), this.on("click.pjax", e, function (e) { var a = r; a.container || ((a = t.extend({}, r)).container = t(this).attr("data-pjax")), n(e, a) }) } function n(e, n, a) { a = g(n, a); var i = e.currentTarget, o = t(i); if ("A" !== i.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element"; if (!(e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || location.protocol !== i.protocol || location.hostname !== i.hostname || i.href.indexOf("#") > -1 && x(i) == x(location) || e.isDefaultPrevented())) { var s = { url: i.href, container: o.attr("data-pjax"), target: i }, c = t.extend({}, s, a), u = t.Event("pjax:click"); o.trigger(u, [c]), u.isDefaultPrevented() || (r(c), e.preventDefault(), o.trigger("pjax:clicked", [c])) } } function a(e, n, a) { a = g(n, a); var i = e.currentTarget, o = t(i); if ("FORM" !== i.tagName.toUpperCase()) throw "$.pjax.submit requires a form element"; var s = { type: (o.attr("method") || "GET").toUpperCase(), url: o.attr("action"), container: o.attr("data-pjax"), target: i }; if ("GET" !== s.type && void 0 !== window.FormData) s.data = new FormData(i), s.processData = !1, s.contentType = !1; else { if (o.find(":file").length) return; s.data = o.serializeArray() } r(t.extend({}, s, a)), e.preventDefault() } function r(e) { e = t.extend(!0, {}, t.ajaxSettings, r.defaults, e), t.isFunction(e.url) && (e.url = e.url()); var n = v(e.url).hash, a = t.type(e.container); if ("string" !== a) throw "expected string value for 'container' option; got " + a; var i, s = e.context = t(e.container); if (!s.length) throw "the container selector '" + e.container + "' did not match anything"; function c(n, a, r) { r || (r = {}), r.relatedTarget = e.target; var i = t.Event(n, r); return s.trigger(i, a), !i.isDefaultPrevented() } e.data || (e.data = {}), t.isArray(e.data) ? e.data.push({ name: "_pjax", value: e.container }) : e.data._pjax = e.container, e.beforeSend = function (t, a) { if ("GET" !== a.type && (a.timeout = 0), t.setRequestHeader("X-PJAX", "true"), t.setRequestHeader("X-PJAX-Container", e.container), !c("pjax:beforeSend", [t, a])) return !1; a.timeout > 0 && (i = setTimeout(function () { c("pjax:timeout", [t, e]) && t.abort("timeout") }, a.timeout), a.timeout = 0); var r = v(a.url); n && (r.hash = n), e.requestUrl = m(r) }, e.complete = function (t, n) { i && clearTimeout(i), c("pjax:complete", [t, n, e]), c("pjax:end", [t, e]) }, e.error = function (t, n, a) { var r = w("", t, e), i = c("pjax:error", [t, n, a, e]); "GET" == e.type && "abort" !== n && i && o(r.url) }, e.success = function (a, i, u) { var l = r.state, p = "function" == typeof t.pjax.defaults.version ? t.pjax.defaults.version() : t.pjax.defaults.version, d = u.getResponseHeader("X-PJAX-Version"), h = w(a, u, e), m = v(h.url); if (n && (m.hash = n, h.url = m.href), p && d && p !== d) o(h.url); else if (h.contents) { if (r.state = { id: e.id || f(), url: h.url, title: h.title, container: e.container, fragment: e.fragment, timeout: e.timeout }, (e.push || e.replace) && window.history.replaceState(r.state, h.title, h.url), t.contains(s, document.activeElement)) try { document.activeElement.blur() } catch (t) { } h.title && (document.title = h.title), c("pjax:beforeReplace", [h.contents, e], { state: r.state, previousState: l }), s.html(h.contents); var x = s.find("input[autofocus], textarea[autofocus]").last()[0]; x && document.activeElement !== x && x.focus(), function (e) { if (!e) return; var n = t("script[src]"); e.each(function () { var e = this.src, a = n.filter(function () { return this.src === e }); if (!a.length) { var r = document.createElement("script"), i = t(this).attr("type"); i && (r.type = i), r.src = t(this).attr("src"), document.head.appendChild(r) } }) }(h.scripts); var g = e.scrollTo; if (n) { var y = decodeURIComponent(n.slice(1)), j = document.getElementById(y) || document.getElementsByName(y)[0]; j && (g = t(j).offset().top) } "number" == typeof g && t(window).scrollTop(g), c("pjax:success", [a, i, u, e]) } else o(h.url) }, r.state || (r.state = { id: f(), url: window.location.href, title: document.title, container: e.container, fragment: e.fragment, timeout: e.timeout }, window.history.replaceState(r.state, document.title)), d(r.xhr), r.options = e; var u, l, p = r.xhr = t.ajax(e); return p.readyState > 0 && (e.push && !e.replace && (u = r.state.id, l = [e.container, h(s)], b[u] = l, E.push(u), S(T, 0), S(E, r.defaults.maxCacheLength), window.history.pushState(null, "", e.requestUrl)), c("pjax:start", [p, e]), c("pjax:send", [p, e])), r.xhr } function i(e, n) { var a = { url: window.location.href, push: !1, replace: !0, scrollTo: !1 }; return r(t.extend(a, g(e, n))) } function o(t) { window.history.replaceState(null, "", r.state.url), window.location.replace(t) } var s = !0, c = window.location.href, u = window.history.state; function l(e) { s || d(r.xhr); var n, a = r.state, i = e.state; if (i && i.container) { if (s && c == i.url) return; if (a) { if (a.id === i.id) return; n = a.id < i.id ? "forward" : "back" } var u = b[i.id] || [], l = u[0] || i.container, p = t(l), f = u[1]; if (p.length) { a && function (t, e, n) { var a, i; b[e] = n, "forward" === t ? (a = E, i = T) : (a = T, i = E); a.push(e), (e = i.pop()) && delete b[e]; S(a, r.defaults.maxCacheLength) }(n, a.id, [l, h(p)]); var m = t.Event("pjax:popstate", { state: i, direction: n }); p.trigger(m); var v = { id: i.id, url: i.url, container: l, push: !1, fragment: i.fragment, timeout: i.timeout, scrollTo: !1 }; if (f) { p.trigger("pjax:start", [null, v]), r.state = i, i.title && (document.title = i.title); var x = t.Event("pjax:beforeReplace", { state: i, previousState: a }); p.trigger(x, [f, v]), p.html(f), p.trigger("pjax:end", [null, v]) } else r(v); p[0].offsetHeight } else o(location.href) } s = !1 } function p(e) { var n = t.isFunction(e.url) ? e.url() : e.url, a = e.type ? e.type.toUpperCase() : "GET", r = t("<form>", { method: "GET" === a ? "GET" : "POST", action: n, style: "display:none" }); "GET" !== a && "POST" !== a && r.append(t("<input>", { type: "hidden", name: "_method", value: a.toLowerCase() })); var i = e.data; if ("string" == typeof i) t.each(i.split("&"), function (e, n) { var a = n.split("="); r.append(t("<input>", { type: "hidden", name: a[0], value: a[1] })) }); else if (t.isArray(i)) t.each(i, function (e, n) { r.append(t("<input>", { type: "hidden", name: n.name, value: n.value })) }); else if ("object" == typeof i) { var o; for (o in i) r.append(t("<input>", { type: "hidden", name: o, value: i[o] })) } t(document.body).append(r), r.submit() } function d(e) { e && e.readyState < 4 && (e.onreadystatechange = t.noop, e.abort()) } function f() { return (new Date).getTime() } function h(e) { var n = e.clone(); return n.find("script").each(function () { this.src || t._data(this, "globalEval", !1) }), n.contents() } function m(t) { return t.search = t.search.replace(/([?&])(_pjax|_)=[^&]*/g, "").replace(/^&/, ""), t.href.replace(/\?($|#)/, "$1") } function v(t) { var e = document.createElement("a"); return e.href = t, e } function x(t) { return t.href.replace(/#.*/, "") } function g(e, n) { return e && n ? ((n = t.extend({}, n)).container = e, n) : t.isPlainObject(e) ? e : { container: e } } function y(t, e) { return t.filter(e).add(t.find(e)) } function j(e) { return t.parseHTML(e, document, !0) } function w(e, n, a) { var r, i, o = {}, s = /<html/i.test(e), c = n.getResponseHeader("X-PJAX-URL"); if (o.url = c ? m(v(c)) : a.requestUrl, s) { i = t(j(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0])); var u = e.match(/<head[^>]*>([\s\S.]*)<\/head>/i); r = null != u ? t(j(u[0])) : i } else r = i = t(j(e)); if (0 === i.length) return o; if (o.title = y(r, "title").last().text(), a.fragment) { var l = i; "body" !== a.fragment && (l = y(l, a.fragment).first()), l.length && (o.contents = "body" === a.fragment ? l : l.contents(), o.title || (o.title = l.attr("title") || l.data("title"))) } else s || (o.contents = i); return o.contents && (o.contents = o.contents.not(function () { return t(this).is("title") }), o.contents.find("title").remove(), o.scripts = y(o.contents, "script[src]").remove(), o.contents = o.contents.not(o.scripts)), o.title && (o.title = t.trim(o.title)), o } u && u.container && (r.state = u), "state" in window.history && (s = !1); var b = {}, T = [], E = []; function S(t, e) { for (; t.length > e;)delete b[t.shift()] } function P() { return t("meta").filter(function () { var e = t(this).attr("http-equiv"); return e && "X-PJAX-VERSION" === e.toUpperCase() }).attr("content") } function C() { t.fn.pjax = e, t.pjax = r, t.pjax.enable = t.noop, t.pjax.disable = A, t.pjax.click = n, t.pjax.submit = a, t.pjax.reload = i, t.pjax.defaults = { timeout: 650, push: !0, replace: !1, type: "GET", dataType: "html", scrollTo: 0, maxCacheLength: 20, version: P }, t(window).on("popstate.pjax", l) } function A() { t.fn.pjax = function () { return this }, t.pjax = p, t.pjax.enable = C, t.pjax.disable = t.noop, t.pjax.click = t.noop, t.pjax.submit = t.noop, t.pjax.reload = function () { window.location.reload() }, t(window).off("popstate.pjax", l) } t.event.props && t.inArray("state", t.event.props) < 0 ? t.event.props.push("state") : "state" in t.Event.prototype || t.event.addProp("state"), t.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/), t.support.pjax ? C() : A() }(jQuery);