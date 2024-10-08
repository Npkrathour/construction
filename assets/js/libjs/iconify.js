/**
 * (c) Iconify
 *
 * For the full copyright and license information, please view the license.txt or license.gpl.txt
 * files at https://github.com/iconify/iconify
 *
 * Licensed under Apache 2.0 or GPL 2.0 at your option.
 * If derivative product is not compatible with one of licenses, you can pick one of licenses.
 *
 * @license Apache 2.0
 * @license GPL 2.0
 */
var Iconify = (function () {
  "use strict";
  function e(e, n, t) {
    return (
      e(
        (t = {
          path: n,
          exports: {},
          require: function (e, n) {
            return (function () {
              throw new Error(
                "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
              );
            })(null == n && t.path);
          },
        }),
        t.exports
      ),
      t.exports
    );
  }
  var n = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.merge = void 0),
        (n.merge = function (e, n, t) {
          for (var r = Object.create(null), o = [e, n, t], i = 0; i < 3; i++) {
            var a = o[i];
            if ("object" == typeof a && a) for (var c in a) r[c] = a[c];
          }
          return r;
        });
    }),
    t = e(function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.fullIcon = t.iconDefaults = void 0),
        (t.iconDefaults = Object.freeze({
          body: "",
          left: 0,
          top: 0,
          width: 16,
          height: 16,
          rotate: 0,
          vFlip: !1,
          hFlip: !1,
        })),
        (t.fullIcon = function (e) {
          return n.merge(t.iconDefaults, e);
        });
    }),
    r = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.mergeIcons = void 0);
      var r = Object.keys(t.iconDefaults);
      n.mergeIcons = function (e, n) {
        var t = Object.create(null);
        return (
          r.forEach(function (r) {
            if (void 0 !== e[r])
              if (void 0 !== n[r])
                switch (r) {
                  case "rotate":
                    return void (t[r] = (e[r] + n[r]) % 4);
                  case "hFlip":
                  case "vFlip":
                    return void (t[r] = e[r] !== n[r]);
                  default:
                    t[r] = n[r];
                }
              else t[r] = e[r];
            else void 0 !== n[r] && (t[r] = n[r]);
          }),
          t
        );
      };
    }),
    o = e(function (e, o) {
      Object.defineProperty(o, "__esModule", { value: !0 }),
        (o.parseIconSet = void 0);
      var i = Object.keys(t.iconDefaults);
      function a(e, n, t, o) {
        void 0 === o && (o = 0);
        var i = e.parent;
        if (void 0 !== n[i]) return r.mergeIcons(n[i], e);
        if (void 0 !== t[i]) {
          if (o > 2) return null;
          var c = a(t[i], n, t, o + 1);
          if (c) return r.mergeIcons(c, e);
        }
        return null;
      }
      o.parseIconSet = function (e, r, o) {
        void 0 === o && (o = "none");
        var c = [];
        if ("object" != typeof e) return "none" !== o && c;
        if (
          (e.not_found instanceof Array &&
            e.not_found.forEach(function (e) {
              r(e, null), "all" === o && c.push(e);
            }),
          "object" != typeof e.icons)
        )
          return "none" !== o && c;
        var u = Object.create(null);
        i.forEach(function (n) {
          void 0 !== e[n] && "object" != typeof e[n] && (u[n] = e[n]);
        });
        var f = e.icons;
        if (
          (Object.keys(f).forEach(function (e) {
            var o = f[e];
            "string" == typeof o.body &&
              (r(e, Object.freeze(n.merge(t.iconDefaults, u, o))), c.push(e));
          }),
          "object" == typeof e.aliases)
        ) {
          var l = e.aliases;
          Object.keys(l).forEach(function (e) {
            var o = a(l[e], f, l, 1);
            o &&
              (r(e, Object.freeze(n.merge(t.iconDefaults, u, o))), c.push(e));
          });
        }
        return "none" === o ? c.length > 0 : c;
      };
    }),
    i = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.validateIcon = n.stringToIcon = void 0);
      var t = /^[a-z0-9]+(-[a-z0-9]+)*$/;
      n.stringToIcon = function (e, t, r) {
        var o = "",
          i = e.split(":");
        if ("@" === e.slice(0, 1)) {
          if (i.length < 2 || i.length > 3) return null;
          o = i.shift().slice(1);
        }
        if (i.length > 3 || !i.length) return null;
        if (i.length > 1) {
          var a = i.pop(),
            c = i.pop(),
            u = { provider: i.length > 0 ? i[0] : o, prefix: c, name: a };
          return t && !n.validateIcon(u) ? null : u;
        }
        var f = i[0],
          l = f.split("-");
        if (l.length > 1) {
          var s = { provider: o, prefix: l.shift(), name: l.join("-") };
          return t && !n.validateIcon(s) ? null : s;
        }
        if (r && "" === o) {
          var d = { provider: o, prefix: "", name: f };
          return t && !n.validateIcon(d, r) ? null : d;
        }
        return null;
      };
      n.validateIcon = function (e, n) {
        return (
          !!e &&
          !(
            ("" !== e.provider && !e.provider.match(t)) ||
            !((n && "" === e.prefix) || e.prefix.match(t)) ||
            !e.name.match(t)
          )
        );
      };
    }),
    a = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.listIcons =
          n.getIcon =
          n.iconExists =
          n.addIcon =
          n.addIconSet =
          n.getStorage =
          n.newStorage =
            void 0);
      var r = Object.create(null);
      function i(e, n) {
        return {
          provider: e,
          prefix: n,
          icons: Object.create(null),
          missing: Object.create(null),
        };
      }
      function a(e, n) {
        void 0 === r[e] && (r[e] = Object.create(null));
        var t = r[e];
        return void 0 === t[n] && (t[n] = i(e, n)), t[n];
      }
      (n.newStorage = i),
        (n.getStorage = a),
        (n.addIconSet = function (e, n, t) {
          void 0 === t && (t = "none");
          var r = Date.now();
          return o.parseIconSet(
            n,
            function (n, t) {
              null === t ? (e.missing[n] = r) : (e.icons[n] = t);
            },
            t
          );
        }),
        (n.addIcon = function (e, n, r) {
          try {
            if ("string" == typeof r.body)
              return (e.icons[n] = Object.freeze(t.fullIcon(r))), !0;
          } catch (e) {}
          return !1;
        }),
        (n.iconExists = function (e, n) {
          return void 0 !== e.icons[n];
        }),
        (n.getIcon = function (e, n) {
          var t = e.icons[n];
          return void 0 === t ? null : t;
        }),
        (n.listIcons = function (e, n) {
          var t = [];
          return (
            ("string" == typeof e ? [e] : Object.keys(r)).forEach(function (e) {
              ("string" == typeof e && "string" == typeof n
                ? [n]
                : void 0 === r[e]
                ? []
                : Object.keys(r[e])
              ).forEach(function (n) {
                var r = a(e, n),
                  o = Object.keys(r.icons).map(function (t) {
                    return ("" !== e ? "@" + e + ":" : "") + n + ":" + t;
                  });
                t = t.concat(o);
              });
            }),
            t
          );
        });
    }),
    c = e(function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.storageFunctions =
          t.addCollection =
          t.addIcon =
          t.getIconData =
          t.allowSimpleNames =
            void 0);
      var r = !1;
      function c(e) {
        var n = "string" == typeof e ? i.stringToIcon(e, !0, r) : e;
        return n ? a.getIcon(a.getStorage(n.provider, n.prefix), n.name) : null;
      }
      function u(e, n) {
        var t = i.stringToIcon(e, !0, r);
        if (!t) return !1;
        var o = a.getStorage(t.provider, t.prefix);
        return a.addIcon(o, t.name, n);
      }
      function f(e, n) {
        if ("object" != typeof e) return !1;
        if (
          ("string" != typeof n &&
            (n = "string" == typeof e.provider ? e.provider : ""),
          r && "" === n && ("string" != typeof e.prefix || "" === e.prefix))
        ) {
          var t = !1;
          return (
            o.parseIconSet(e, function (e, n) {
              null !== n && u(e, n) && (t = !0);
            }),
            t
          );
        }
        if (
          "string" != typeof e.prefix ||
          !i.validateIcon({ provider: n, prefix: e.prefix, name: "a" })
        )
          return !1;
        var c = a.getStorage(n, e.prefix);
        return !!a.addIconSet(c, e);
      }
      (t.allowSimpleNames = function (e) {
        return "boolean" == typeof e && (r = e), r;
      }),
        (t.getIconData = c),
        (t.addIcon = u),
        (t.addCollection = f),
        (t.storageFunctions = {
          iconExists: function (e) {
            return null !== c(e);
          },
          getIcon: function (e) {
            var t = c(e);
            return t ? n.merge(t) : null;
          },
          listIcons: a.listIcons,
          addIcon: u,
          addCollection: f,
        });
    }),
    u = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.replaceIDs = void 0);
      var t = /\sid="(\S+)"/g,
        r =
          "IconifyId-" +
          Date.now().toString(16) +
          "-" +
          ((16777216 * Math.random()) | 0).toString(16) +
          "-",
        o = 0;
      function i(e, n, t) {
        for (var r = 0; -1 !== (r = t.indexOf(e, r)); )
          (t = t.slice(0, r) + n + t.slice(r + e.length)), (r += n.length);
        return t;
      }
      n.replaceIDs = function (e, n) {
        void 0 === n && (n = r);
        for (var a, c = []; (a = t.exec(e)); ) c.push(a[1]);
        return c.length
          ? (c.forEach(function (t) {
              var r = "function" == typeof n ? n() : n + o++;
              (e = i('="' + t + '"', '="' + r + '"', e)),
                (e = i('="#' + t + '"', '="#' + r + '"', e)),
                (e = i("(#" + t + ")", "(#" + r + ")", e));
            }),
            e)
          : e;
      };
    }),
    f = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.calculateSize = void 0);
      var t = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
        r = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
      n.calculateSize = function (e, n, o) {
        if (1 === n) return e;
        if (((o = void 0 === o ? 100 : o), "number" == typeof e))
          return Math.ceil(e * n * o) / o;
        if ("string" != typeof e) return e;
        var i = e.split(t);
        if (null === i || !i.length) return e;
        for (var a = [], c = i.shift(), u = r.test(c); ; ) {
          if (u) {
            var f = parseFloat(c);
            isNaN(f) ? a.push(c) : a.push(Math.ceil(f * n * o) / o);
          } else a.push(c);
          if (void 0 === (c = i.shift())) return a.join("");
          u = !u;
        }
      };
    }),
    l = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.builderFunctions = void 0),
        (n.builderFunctions = {
          replaceIDs: u.replaceIDs,
          calculateSize: f.calculateSize,
        });
    }),
    s = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.coreModules = void 0),
        (n.coreModules = {});
    }),
    d = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.storeCache =
          n.loadCache =
          n.mock =
          n.emptyList =
          n.count =
          n.config =
            void 0);
      var t = "iconify2",
        r = "iconify",
        o = "iconify-count",
        i = "iconify-version",
        c = 36e5;
      n.config = { local: !0, session: !0 };
      var u = !1;
      (n.count = { local: 0, session: 0 }),
        (n.emptyList = { local: [], session: [] });
      var f = "undefined" == typeof window ? {} : window;
      function l(e) {
        var t = e + "Storage";
        try {
          if (f && f[t] && "number" == typeof f[t].length) return f[t];
        } catch (e) {}
        return (n.config[e] = !1), null;
      }
      function s(e, t, r) {
        try {
          return e.setItem(o, r + ""), (n.count[t] = r), !0;
        } catch (e) {
          return !1;
        }
      }
      function d(e) {
        var n = e.getItem(o);
        if (n) {
          var t = parseInt(n);
          return t || 0;
        }
        return 0;
      }
      n.mock = function (e) {
        (u = !1), (f = e);
      };
      n.loadCache = function () {
        if (!u) {
          u = !0;
          var e = Math.floor(Date.now() / c) - 168;
          for (var o in n.config) f(o);
        }
        function f(o) {
          var c = l(o);
          if (c) {
            var u = function (n) {
              var t = r + n,
                o = c.getItem(t);
              if ("string" != typeof o) return !1;
              var i = !0;
              try {
                var u = JSON.parse(o);
                if (
                  "object" != typeof u ||
                  "number" != typeof u.cached ||
                  u.cached < e ||
                  "string" != typeof u.provider ||
                  "object" != typeof u.data ||
                  "string" != typeof u.data.prefix
                )
                  i = !1;
                else {
                  var f = u.provider,
                    l = u.data.prefix,
                    s = a.getStorage(f, l);
                  i = a.addIconSet(s, u.data);
                }
              } catch (e) {
                i = !1;
              }
              return i || c.removeItem(t), i;
            };
            try {
              var f = c.getItem(i);
              if (f !== t)
                return (
                  f &&
                    (function (e) {
                      try {
                        for (var n = d(e), t = 0; t < n; t++)
                          e.removeItem(r + t);
                      } catch (e) {}
                    })(c),
                  void (function (e, n) {
                    try {
                      e.setItem(i, t);
                    } catch (e) {}
                    s(e, n, 0);
                  })(c, o)
                );
              for (var v = d(c), p = v - 1; p >= 0; p--)
                u(p) || (p === v - 1 ? v-- : n.emptyList[o].push(p));
              s(c, o, v);
            } catch (e) {}
          }
        }
      };
      n.storeCache = function (e, t) {
        function o(o) {
          if (!n.config[o]) return !1;
          var i = l(o);
          if (!i) return !1;
          var a = n.emptyList[o].shift();
          if (void 0 === a && !s(i, o, (a = n.count[o]) + 1)) return !1;
          try {
            var u = {
              cached: Math.floor(Date.now() / c),
              provider: e,
              data: t,
            };
            i.setItem(r + a, JSON.stringify(u));
          } catch (e) {
            return !1;
          }
          return !0;
        }
        u || n.loadCache(), o("local") || o("session");
      };
    }),
    v = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.toggleBrowserCache = void 0),
        (n.toggleBrowserCache = function (e, n) {
          switch (e) {
            case "local":
            case "session":
              d.config[e] = n;
              break;
            case "all":
              for (var t in d.config) d.config[t] = n;
          }
        });
    }),
    p = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.defaultConfig = void 0),
        (n.defaultConfig = {
          resources: [],
          index: 0,
          timeout: 2e3,
          rotate: 750,
          random: !1,
          dataAfterTimeout: !1,
        });
    }),
    h = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.sendQuery = void 0),
        (n.sendQuery = function (e, n, t, r, o) {
          var i,
            a = e.resources.length,
            c = e.random ? Math.floor(Math.random() * a) : e.index;
          if (e.random) {
            var u = e.resources.slice(0);
            for (i = []; u.length > 1; ) {
              var f = Math.floor(Math.random() * u.length);
              i.push(u[f]), (u = u.slice(0, f).concat(u.slice(f + 1)));
            }
            i = i.concat(u);
          } else i = e.resources.slice(c).concat(e.resources.slice(0, c));
          var l = Date.now(),
            s = "pending",
            d = 0,
            v = void 0,
            p = null,
            h = [],
            g = [];
          function b() {
            p && (clearTimeout(p), (p = null));
          }
          function m() {
            "pending" === s && (s = "aborted"),
              b(),
              h.forEach(function (e) {
                e.abort && e.abort(),
                  "pending" === e.status && (e.status = "aborted");
              }),
              (h = []);
          }
          function y(e, n) {
            n && (g = []), "function" == typeof e && g.push(e);
          }
          function I() {
            return {
              startTime: l,
              payload: n,
              status: s,
              queriesSent: d,
              queriesPending: h.length,
              subscribe: y,
              abort: m,
            };
          }
          function j() {
            (s = "failed"),
              g.forEach(function (e) {
                e(void 0, v);
              });
          }
          function x() {
            h = h.filter(function (e) {
              return (
                "pending" === e.status && (e.status = "aborted"),
                e.abort && e.abort(),
                !1
              );
            });
          }
          function O() {
            if ("pending" === s) {
              b();
              var r = i.shift();
              if (void 0 !== r) {
                var a = {
                  getQueryStatus: I,
                  status: "pending",
                  resource: r,
                  done: function (n, t) {
                    !(function (n, t, r) {
                      var a = void 0 === t;
                      switch (
                        ((h = h.filter(function (e) {
                          return e !== n;
                        })),
                        s)
                      ) {
                        case "pending":
                          break;
                        case "failed":
                          if (a || !e.dataAfterTimeout) return;
                          break;
                        default:
                          return;
                      }
                      if (a)
                        return (
                          void 0 !== r && (v = r),
                          void (h.length || (i.length ? O() : j()))
                        );
                      if ((b(), x(), o && !e.random)) {
                        var c = e.resources.indexOf(n.resource);
                        -1 !== c && c !== e.index && o(c);
                      }
                      (s = "completed"),
                        g.forEach(function (e) {
                          e(t);
                        });
                    })(a, n, t);
                  },
                };
                h.push(a), d++;
                var c =
                  "function" == typeof e.rotate ? e.rotate(d, l) : e.rotate;
                (p = setTimeout(O, c)), t(r, n, a);
              } else {
                if (h.length) {
                  var u =
                    "function" == typeof e.timeout ? e.timeout(l) : e.timeout;
                  if (u)
                    return void (p = setTimeout(function () {
                      b(), "pending" === s && (x(), j());
                    }, u));
                }
                j();
              }
            }
          }
          return "function" == typeof r && g.push(r), setTimeout(O), I;
        });
    }),
    g = e(function (e, n) {
      function t(e) {
        if (
          !(
            "object" == typeof e &&
            "object" == typeof e.resources &&
            e.resources instanceof Array &&
            e.resources.length
          )
        )
          throw new Error("Invalid Reduncancy configuration");
        var n,
          t = Object.create(null);
        for (n in p.defaultConfig)
          void 0 !== e[n] ? (t[n] = e[n]) : (t[n] = p.defaultConfig[n]);
        return t;
      }
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.initRedundancy = void 0),
        (n.initRedundancy = function (e) {
          var n = t(e),
            r = [];
          function o() {
            r = r.filter(function (e) {
              return "pending" === e().status;
            });
          }
          return {
            query: function (e, t, i) {
              var a = h.sendQuery(
                n,
                e,
                t,
                function (e, n) {
                  o(), i && i(e, n);
                },
                function (e) {
                  n.index = e;
                }
              );
              return r.push(a), a;
            },
            find: function (e) {
              var n = r.find(function (n) {
                return e(n);
              });
              return void 0 !== n ? n : null;
            },
            setIndex: function (e) {
              n.index = e;
            },
            getIndex: function () {
              return n.index;
            },
            cleanup: o,
          };
        });
    }),
    b = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.sortIcons = void 0),
        (n.sortIcons = function (e) {
          var n = { loaded: [], missing: [], pending: [] },
            t = Object.create(null);
          e.sort(function (e, n) {
            return e.provider !== n.provider
              ? e.provider.localeCompare(n.provider)
              : e.prefix !== n.prefix
              ? e.prefix.localeCompare(n.prefix)
              : e.name.localeCompare(n.name);
          });
          var r = { provider: "", prefix: "", name: "" };
          return (
            e.forEach(function (e) {
              if (
                r.name !== e.name ||
                r.prefix !== e.prefix ||
                r.provider !== e.provider
              ) {
                r = e;
                var o = e.provider,
                  i = e.prefix,
                  c = e.name;
                void 0 === t[o] && (t[o] = Object.create(null));
                var u = t[o];
                void 0 === u[i] && (u[i] = a.getStorage(o, i));
                var f = u[i],
                  l = { provider: o, prefix: i, name: c };
                (void 0 !== f.icons[c]
                  ? n.loaded
                  : "" === i || void 0 !== f.missing[c]
                  ? n.missing
                  : n.pending
                ).push(l);
              }
            }),
            n
          );
        });
    }),
    m = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.storeCallback = n.updateCallbacks = n.callbacks = void 0),
        (n.callbacks = Object.create(null));
      var t = Object.create(null);
      function r(e, t) {
        e.forEach(function (e) {
          var r = e.provider;
          if (void 0 !== n.callbacks[r]) {
            var o = n.callbacks[r],
              i = e.prefix,
              a = o[i];
            a &&
              (o[i] = a.filter(function (e) {
                return e.id !== t;
              }));
          }
        });
      }
      n.updateCallbacks = function (e, o) {
        void 0 === t[e] && (t[e] = Object.create(null));
        var i = t[e];
        i[o] ||
          ((i[o] = !0),
          setTimeout(function () {
            if (
              ((i[o] = !1),
              void 0 !== n.callbacks[e] && void 0 !== n.callbacks[e][o])
            ) {
              var t = n.callbacks[e][o].slice(0);
              if (t.length) {
                var c = a.getStorage(e, o),
                  u = !1;
                t.forEach(function (n) {
                  var t = n.icons,
                    i = t.pending.length;
                  (t.pending = t.pending.filter(function (n) {
                    if (n.prefix !== o) return !0;
                    var r = n.name;
                    if (void 0 !== c.icons[r])
                      t.loaded.push({ provider: e, prefix: o, name: r });
                    else {
                      if (void 0 === c.missing[r]) return (u = !0), !0;
                      t.missing.push({ provider: e, prefix: o, name: r });
                    }
                    return !1;
                  })),
                    t.pending.length !== i &&
                      (u || r([{ provider: e, prefix: o }], n.id),
                      n.callback(
                        t.loaded.slice(0),
                        t.missing.slice(0),
                        t.pending.slice(0),
                        n.abort
                      ));
                });
              }
            }
          }));
      };
      var o = 0;
      n.storeCallback = function (e, t, i) {
        var a = o++,
          c = r.bind(null, i, a);
        if (!t.pending.length) return c;
        var u = { id: a, icons: t, callback: e, abort: c };
        return (
          i.forEach(function (e) {
            var t = e.provider,
              r = e.prefix;
            void 0 === n.callbacks[t] && (n.callbacks[t] = Object.create(null));
            var o = n.callbacks[t];
            void 0 === o[r] && (o[r] = []), o[r].push(u);
          }),
          c
        );
      };
    }),
    y = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.getAPIModule = n.setAPIModule = void 0);
      var t = Object.create(null);
      (n.setAPIModule = function (e, n) {
        t[e] = n;
      }),
        (n.getAPIModule = function (e) {
          return void 0 === t[e] ? t[""] : t[e];
        });
    }),
    I = e(function (e, n) {
      function t(e) {
        var n;
        if ("string" == typeof e.resources) n = [e.resources];
        else if (!((n = e.resources) instanceof Array && n.length)) return null;
        return {
          resources: n,
          path: void 0 === e.path ? "/" : e.path,
          maxURL: e.maxURL ? e.maxURL : 500,
          rotate: e.rotate ? e.rotate : 750,
          timeout: e.timeout ? e.timeout : 5e3,
          random: !0 === e.random,
          index: e.index ? e.index : 0,
          dataAfterTimeout: !1 !== e.dataAfterTimeout,
        };
      }
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.getAPIConfig = n.setAPIConfig = void 0);
      for (
        var r = Object.create(null),
          o = ["https://api.simplesvg.com", "https://api.unisvg.com"],
          i = [];
        o.length > 0;

      )
        1 === o.length || Math.random() > 0.5
          ? i.push(o.shift())
          : i.push(o.pop());
      (r[""] = t({ resources: ["https://api.iconify.design"].concat(i) })),
        (n.setAPIConfig = function (e, n) {
          var o = t(n);
          return null !== o && ((r[e] = o), !0);
        });
      n.getAPIConfig = function (e) {
        return r[e];
      };
    }),
    j = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.getProviders = n.listToIcons = void 0),
        (n.listToIcons = function (e, n, t) {
          void 0 === n && (n = !0), void 0 === t && (t = !1);
          var r = [];
          return (
            e.forEach(function (e) {
              var o = "string" == typeof e ? i.stringToIcon(e, !1, t) : e;
              (n && !i.validateIcon(o, t)) ||
                r.push({
                  provider: o.provider,
                  prefix: o.prefix,
                  name: o.name,
                });
            }),
            r
          );
        }),
        (n.getProviders = function (e) {
          var n = Object.create(null);
          return (
            e.forEach(function (e) {
              n[e.provider] = !0;
            }),
            Object.keys(n)
          );
        });
    }),
    x = e(function (e, n) {
      function t() {}
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.API = n.getRedundancyCache = void 0);
      var r = Object.create(null),
        o = Object.create(null),
        i = Object.create(null),
        u = Object.create(null),
        f = Object.create(null);
      function l(e) {
        if (void 0 === f[e]) {
          var n = I.getAPIConfig(e);
          if (!n) return;
          var t = { config: n, redundancy: g.initRedundancy(n) };
          f[e] = t;
        }
        return f[e];
      }
      n.getRedundancyCache = l;
      var d = Object.create(null);
      function v(e, n, t) {
        function c() {
          var t = ("" === e ? "" : "@" + e + ":") + n,
            r = Math.floor(Date.now() / 6e4);
          d[t] < r &&
            ((d[t] = r),
            console.error(
              'Unable to retrieve icons for "' +
                t +
                '" because API is not configured properly.'
            ));
        }
        void 0 === o[e] && (o[e] = Object.create(null));
        var f = o[e];
        void 0 === u[e] && (u[e] = Object.create(null));
        var v = u[e];
        void 0 === r[e] && (r[e] = Object.create(null));
        var p,
          h = r[e];
        void 0 === f[n] ? (f[n] = t) : (f[n] = f[n].concat(t).sort()),
          v[n] ||
            ((v[n] = !0),
            setTimeout(function () {
              v[n] = !1;
              var t = f[n];
              delete f[n];
              var r = y.getAPIModule(e);
              if (r) {
                if (void 0 === p) {
                  var o = l(e);
                  if (void 0 === o) return void c();
                  p = o;
                }
                r.prepare(e, n, t).forEach(function (t) {
                  p.redundancy.query(t, r.send, function (r, o) {
                    var c = a.getStorage(e, n);
                    if ("object" != typeof r) {
                      if (404 !== o) return;
                      var u = Date.now();
                      t.icons.forEach(function (e) {
                        c.missing[e] = u;
                      });
                    } else
                      try {
                        var f = a.addIconSet(c, r, "all");
                        if ("boolean" == typeof f) return;
                        var l = h[n];
                        f.forEach(function (e) {
                          delete l[e];
                        }),
                          s.coreModules.cache && s.coreModules.cache(e, r);
                      } catch (e) {
                        console.error(e);
                      }
                    !(function (e, n) {
                      void 0 === i[e] && (i[e] = Object.create(null));
                      var t = i[e];
                      t[n] ||
                        ((t[n] = !0),
                        setTimeout(function () {
                          (t[n] = !1), m.updateCallbacks(e, n);
                        }));
                    })(e, n);
                  });
                });
              } else c();
            }));
      }
      n.API = {
        isPending: function (e) {
          return (
            void 0 !== r[e.provider] &&
            void 0 !== r[e.provider][e.prefix] &&
            void 0 !== r[e.provider][e.prefix][e.name]
          );
        },
        loadIcons: function (e, n) {
          var o = j.listToIcons(e, !0, c.allowSimpleNames()),
            i = b.sortIcons(o);
          if (!i.pending.length) {
            var a = !0;
            return (
              n &&
                setTimeout(function () {
                  a && n(i.loaded, i.missing, i.pending, t);
                }),
              function () {
                a = !1;
              }
            );
          }
          var u,
            f,
            l = Object.create(null),
            s = [];
          i.pending.forEach(function (e) {
            var n = e.provider,
              t = e.prefix;
            if (t !== f || n !== u) {
              (u = n),
                (f = t),
                s.push({ provider: n, prefix: t }),
                void 0 === r[n] && (r[n] = Object.create(null));
              var o = r[n];
              void 0 === o[t] && (o[t] = Object.create(null)),
                void 0 === l[n] && (l[n] = Object.create(null));
              var i = l[n];
              void 0 === i[t] && (i[t] = []);
            }
          });
          var d = Date.now();
          return (
            i.pending.forEach(function (e) {
              var n = e.provider,
                t = e.prefix,
                o = e.name,
                i = r[n][t];
              void 0 === i[o] && ((i[o] = d), l[n][t].push(o));
            }),
            s.forEach(function (e) {
              var n = e.provider,
                t = e.prefix;
              l[n][t].length && v(n, t, l[n][t]);
            }),
            n ? m.storeCallback(n, i, s) : t
          );
        },
      };
    }),
    O = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.APIInternalFunctions = n.APIFunctions = void 0),
        (n.APIFunctions = {
          loadIcons: x.API.loadIcons,
          addAPIProvider: I.setAPIConfig,
        }),
        (n.APIInternalFunctions = {
          getAPI: x.getRedundancyCache,
          getAPIConfig: I.getAPIConfig,
          setAPIModule: y.setAPIModule,
        });
    }),
    P = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.getAPIModule = void 0);
      var t = null,
        r = "{prefix}.js?icons={icons}&callback={callback}",
        o = Object.create(null),
        i = Object.create(null);
      function a() {
        if (null === t) {
          var e = self,
            n = "Iconify",
            o = ".cb";
          if (void 0 === e[n])
            (o = ""),
              void 0 === e[(n = "IconifyJSONP")] &&
                (e[n] = Object.create(null)),
              (t = e[n]);
          else {
            var i = e[n];
            void 0 === i.cb && (i.cb = Object.create(null)), (t = i.cb);
          }
          r = r.replace("{callback}", n + o + ".{cb}");
        }
        return t;
      }
      n.getAPIModule = function (e) {
        return {
          prepare: function (n, t, c) {
            var u = [],
              f = o[n + ":" + t];
            void 0 === f &&
              (f = (function (n, t) {
                var c,
                  u = e(n);
                if (!u) return 0;
                if (u.maxURL) {
                  var f = 0;
                  u.resources.forEach(function (e) {
                    var n = e;
                    f = Math.max(f, n.length);
                  }),
                    a(),
                    (c =
                      u.maxURL -
                      f -
                      u.path.length -
                      r
                        .replace("{provider}", n)
                        .replace("{prefix}", t)
                        .replace("{icons}", "").length -
                      3);
                } else c = 0;
                var l = n + ":" + t;
                return (i[l] = u.path), (o[l] = c), c;
              })(n, t));
            var l = { provider: n, prefix: t, icons: [] },
              s = 0;
            return (
              c.forEach(function (e, r) {
                (s += e.length + 1) >= f &&
                  r > 0 &&
                  (u.push(l),
                  (l = { provider: n, prefix: t, icons: [] }),
                  (s = e.length)),
                  l.icons.push(e);
              }),
              u.push(l),
              u
            );
          },
          send: function (e, n, t) {
            for (
              var o = n.provider,
                c = n.prefix,
                u = n.icons.join(","),
                f = o + ":" + c,
                l = c.split("-").shift().slice(0, 3),
                s = a(),
                d = (function (e) {
                  var n,
                    t = 0;
                  for (n = e.length - 1; n >= 0; n--) t += e.charCodeAt(n);
                  return t % 999;
                })(o + ":" + e + ":" + c + ":" + u);
              void 0 !== s[l + d];

            )
              d++;
            var v = l + d,
              p =
                i[f] +
                r
                  .replace("{provider}", o)
                  .replace("{prefix}", c)
                  .replace("{icons}", u)
                  .replace("{cb}", v);
            s[v] = function (e) {
              delete s[v], t.done(e);
            };
            var h = e + p,
              g = document.createElement("script");
            (g.type = "text/javascript"),
              (g.async = !0),
              (g.src = h),
              document.head.appendChild(g);
          },
        };
      };
    }),
    M = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.getAPIModule = n.setFetch = void 0);
      var t = "{prefix}.json?icons={icons}",
        r = Object.create(null),
        o = Object.create(null),
        i = null;
      try {
        i = fetch;
      } catch (e) {}
      n.setFetch = function (e) {
        i = e;
      };
      n.getAPIModule = function (e) {
        return {
          prepare: function (n, i, a) {
            var c = [],
              u = r[i];
            void 0 === u &&
              (u = (function (n, i) {
                var a,
                  c = e(n);
                if (!c) return 0;
                if (c.maxURL) {
                  var u = 0;
                  c.resources.forEach(function (e) {
                    var n = e;
                    u = Math.max(u, n.length);
                  }),
                    (a =
                      c.maxURL -
                      u -
                      c.path.length -
                      t
                        .replace("{provider}", n)
                        .replace("{prefix}", i)
                        .replace("{icons}", "").length);
                } else a = 0;
                var f = n + ":" + i;
                return (o[f] = c.path), (r[f] = a), a;
              })(n, i));
            var f = { provider: n, prefix: i, icons: [] },
              l = 0;
            return (
              a.forEach(function (e, t) {
                (l += e.length + 1) >= u &&
                  t > 0 &&
                  (c.push(f),
                  (f = { provider: n, prefix: i, icons: [] }),
                  (l = e.length)),
                  f.icons.push(e);
              }),
              c.push(f),
              c
            );
          },
          send: function (e, n, r) {
            var a = n.provider,
              c = n.prefix,
              u = n.icons.join(","),
              f =
                o[a + ":" + c] +
                t
                  .replace("{provider}", a)
                  .replace("{prefix}", c)
                  .replace("{icons}", u);
            i
              ? i(e + f)
                  .then(function (e) {
                    if (200 === e.status) return e.json();
                    r.done(void 0, e.status);
                  })
                  .then(function (e) {
                    "object" == typeof e && null !== e && r.done(e);
                  })
                  .catch(function (e) {
                    r.done(void 0, e.errno);
                  })
              : r.done(void 0, 424);
          },
        };
      };
    }),
    w = e(function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.fullCustomisations = t.defaults = void 0),
        (t.defaults = Object.freeze({
          inline: !1,
          width: null,
          height: null,
          hAlign: "center",
          vAlign: "middle",
          slice: !1,
          hFlip: !1,
          vFlip: !1,
          rotate: 0,
        })),
        (t.fullCustomisations = function (e) {
          return n.merge(t.defaults, e);
        });
    }),
    A = e(function (e, n) {
      function t(e) {
        var n = "";
        switch (e.hAlign) {
          case "left":
            n += "xMin";
            break;
          case "right":
            n += "xMax";
            break;
          default:
            n += "xMid";
        }
        switch (e.vAlign) {
          case "top":
            n += "YMin";
            break;
          case "bottom":
            n += "YMax";
            break;
          default:
            n += "YMid";
        }
        return (n += e.slice ? " slice" : " meet");
      }
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.iconToSVG = void 0),
        (n.iconToSVG = function (e, n) {
          var r,
            o,
            i,
            a = { left: e.left, top: e.top, width: e.width, height: e.height },
            c = [],
            u = n.hFlip !== e.hFlip,
            l = n.vFlip !== e.vFlip,
            s = n.rotate + e.rotate;
          switch (
            (u
              ? l
                ? (s += 2)
                : (c.push(
                    "translate(" + (a.width + a.left) + " " + (0 - a.top) + ")"
                  ),
                  c.push("scale(-1 1)"),
                  (a.top = a.left = 0))
              : l &&
                (c.push(
                  "translate(" + (0 - a.left) + " " + (a.height + a.top) + ")"
                ),
                c.push("scale(1 -1)"),
                (a.top = a.left = 0)),
            (s %= 4))
          ) {
            case 1:
              (r = a.height / 2 + a.top),
                c.unshift("rotate(90 " + r + " " + r + ")");
              break;
            case 2:
              c.unshift(
                "rotate(180 " +
                  (a.width / 2 + a.left) +
                  " " +
                  (a.height / 2 + a.top) +
                  ")"
              );
              break;
            case 3:
              (r = a.width / 2 + a.left),
                c.unshift("rotate(-90 " + r + " " + r + ")");
          }
          s % 2 == 1 &&
            ((0 === a.left && 0 === a.top) ||
              ((r = a.left), (a.left = a.top), (a.top = r)),
            a.width !== a.height &&
              ((r = a.width), (a.width = a.height), (a.height = r))),
            null === n.width && null === n.height
              ? ((i = "1em"), (o = f.calculateSize(i, a.width / a.height)))
              : null !== n.width && null !== n.height
              ? ((o = n.width), (i = n.height))
              : null !== n.height
              ? ((i = n.height), (o = f.calculateSize(i, a.width / a.height)))
              : ((o = n.width), (i = f.calculateSize(o, a.height / a.width))),
            "auto" === o && (o = a.width),
            "auto" === i && (i = a.height),
            (o = "string" == typeof o ? o : o + ""),
            (i = "string" == typeof i ? i : i + "");
          var d = e.body;
          c.length && (d = '<g transform="' + c.join(" ") + '">' + d + "</g>");
          var v = {
            attributes: {
              width: o,
              height: i,
              preserveAspectRatio: t(n),
              viewBox: a.left + " " + a.top + " " + a.width + " " + a.height,
            },
            body: d,
          };
          return n.inline && (v.inline = !0), v;
        });
    }),
    S = "iconifyFinder" + Date.now(),
    _ = "iconifyData" + Date.now();
  function E(e, n, t, r) {
    var o;
    try {
      o = document.createElement("span");
    } catch (e) {
      return r ? "" : null;
    }
    var i = A.iconToSVG(t, w.fullCustomisations(n)),
      a = e.element,
      c = e.finder,
      f = e.name,
      l = a ? a.getAttribute("class") : "",
      s = c ? c.classFilter(l ? l.split(/\s+/) : []) : [],
      d =
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="' +
        ("iconify iconify--" +
          f.prefix +
          ("" === f.provider ? "" : " iconify--" + f.provider) +
          (s.length ? " " + s.join(" ") : "")) +
        '">' +
        u.replaceIDs(i.body) +
        "</svg>";
    o.innerHTML = d;
    var v = o.childNodes[0],
      p = v.style,
      h = i.attributes;
    if (
      (Object.keys(h).forEach(function (e) {
        v.setAttribute(e, h[e]);
      }),
      i.inline && (p.verticalAlign = "-0.125em"),
      a)
    ) {
      for (var g = a.attributes, b = 0; b < g.length; b++) {
        var m = g.item(b);
        if (m) {
          var y = m.name;
          if ("class" !== y && "style" !== y && void 0 === h[y])
            try {
              v.setAttribute(y, m.value);
            } catch (e) {}
        }
      }
      for (var I = a.style, j = 0; j < I.length; j++) {
        var x = I[j];
        p[x] = I[x];
      }
    }
    if (c) {
      var O = { name: f, status: "loaded", customisations: n };
      (v[_] = O), (v[S] = c);
    }
    var P = r ? o.innerHTML : v;
    return (
      a && a.parentNode ? a.parentNode.replaceChild(v, a) : o.removeChild(v), P
    );
  }
  var C = [];
  function k(e) {
    for (var n = 0; n < C.length; n++) {
      var t = C[n];
      if (("function" == typeof t.node ? t.node() : t.node) === e) return t;
    }
  }
  function F(e, n) {
    void 0 === n && (n = !1);
    var t = k(e);
    return t
      ? (t.temporary && (t.temporary = n), t)
      : ((t = { node: e, temporary: n }), C.push(t), t);
  }
  function T() {
    return C;
  }
  var D = null,
    L = { childList: !0, subtree: !0, attributes: !0 };
  function N(e) {
    if (e.observer) {
      var n = e.observer;
      n.pendingScan ||
        (n.pendingScan = setTimeout(function () {
          delete n.pendingScan, D && D(e);
        }));
    }
  }
  function z(e, n) {
    if (e.observer) {
      var t = e.observer;
      if (!t.pendingScan)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          if (
            (o.addedNodes && o.addedNodes.length > 0) ||
            ("attributes" === o.type && void 0 !== o.target[S])
          )
            return void (t.paused || N(e));
        }
    }
  }
  function R(e, n) {
    e.observer.instance.observe(n, L);
  }
  function q(e) {
    var n = e.observer;
    if (!n || !n.instance) {
      var t = "function" == typeof e.node ? e.node() : e.node;
      t &&
        (n || ((n = { paused: 0 }), (e.observer = n)),
        (n.instance = new MutationObserver(z.bind(null, e))),
        R(e, t),
        n.paused || N(e));
    }
  }
  function U() {
    T().forEach(q);
  }
  function V(e) {
    if (e.observer) {
      var n = e.observer;
      n.pendingScan && (clearTimeout(n.pendingScan), delete n.pendingScan),
        n.instance && (n.instance.disconnect(), delete n.instance);
    }
  }
  function B(e) {
    var n = null !== D;
    D !== e && ((D = e), n && T().forEach(V)),
      n
        ? U()
        : (function (e) {
            var n = document;
            "complete" === n.readyState ||
            ("loading" !== n.readyState && !n.documentElement.doScroll)
              ? e()
              : (n.addEventListener("DOMContentLoaded", e),
                window.addEventListener("load", e));
          })(U);
  }
  function G(e) {
    (e ? [e] : T()).forEach(function (e) {
      if (e.observer) {
        var n = e.observer;
        if ((n.paused++, !(n.paused > 1) && n.instance))
          n.instance.disconnect();
      } else e.observer = { paused: 1 };
    });
  }
  function Q(e) {
    (e ? [e] : T()).forEach(function (e) {
      if (e.observer) {
        var n = e.observer;
        if (n.paused && (n.paused--, !n.paused)) {
          var t = "function" == typeof e.node ? e.node() : e.node;
          if (!t) return;
          n.instance ? R(e, t) : q(e);
        }
      } else q(e);
    });
  }
  function H(e, n) {
    void 0 === n && (n = !1);
    var t = F(e, n);
    return q(t), t;
  }
  function J(e) {
    var n = k(e);
    n &&
      (V(n),
      (function (e) {
        C = C.filter(function (n) {
          var t = "function" == typeof n.node ? n.node() : n.node;
          return e !== t;
        });
      })(e));
  }
  var Y = [];
  function $(e) {
    return (
      "string" == typeof e && (e = i.stringToIcon(e)),
      null !== e && i.validateIcon(e) ? e : null
    );
  }
  function K(e) {
    var n = [];
    Y.forEach(function (t) {
      var r = t.find(e);
      Array.prototype.forEach.call(r, function (e) {
        var r = e;
        if (void 0 === r[S] || r[S] === t) {
          var o = $(t.name(r));
          if (null !== o) {
            r[S] = t;
            var i = { element: r, finder: t, name: o };
            n.push(i);
          }
        }
      });
    });
    var t = e.querySelectorAll("svg.iconify");
    return (
      Array.prototype.forEach.call(t, function (e) {
        var t = e,
          r = t[S],
          o = t[_];
        if (r && o) {
          var i = $(r.name(t));
          if (null !== i) {
            var a,
              c = !1;
            if (
              (i.prefix !== o.name.prefix || i.name !== o.name.name
                ? (c = !0)
                : ((a = r.customisations(t)),
                  (function (e, n) {
                    var t = Object.keys(e),
                      r = Object.keys(n);
                    if (t.length !== r.length) return !1;
                    for (var o = 0; o < t.length; o++) {
                      var i = t[o];
                      if (n[i] !== e[i]) return !1;
                    }
                    return !0;
                  })(o.customisations, a) || (c = !0)),
              c)
            ) {
              var u = { element: t, finder: r, name: i, customisations: a };
              n.push(u);
            }
          }
        }
      }),
      n
    );
  }
  var W = !1;
  function X() {
    W ||
      ((W = !0),
      setTimeout(function () {
        W && ((W = !1), Z());
      }));
  }
  function Z(e, n) {
    void 0 === n && (n = !1), (W = !1);
    var t = Object.create(null);
    if (
      ((e ? [e] : T()).forEach(function (e) {
        var r = "function" == typeof e.node ? e.node() : e.node;
        if (r && r.querySelectorAll) {
          var o = !1,
            i = !1;
          K(r).forEach(function (n) {
            var r,
              c,
              u = n.element,
              f = n.name,
              l = f.provider,
              d = f.prefix,
              v = f.name,
              p = u[_];
            if (
              void 0 !== p &&
              ((r = p.name),
              (c = f),
              null !== r &&
                null !== c &&
                r.name === c.name &&
                r.prefix === c.prefix)
            )
              switch (p.status) {
                case "missing":
                  return;
                case "loading":
                  if (
                    s.coreModules.api &&
                    s.coreModules.api.isPending({
                      provider: l,
                      prefix: d,
                      name: v,
                    })
                  )
                    return void (o = !0);
              }
            var h = a.getStorage(l, d);
            if (void 0 === h.icons[v]) {
              if (h.missing[v])
                return (
                  (p = { name: f, status: "missing", customisations: {} }),
                  void (u[_] = p)
                );
              if (
                s.coreModules.api &&
                !s.coreModules.api.isPending({
                  provider: l,
                  prefix: d,
                  name: v,
                })
              ) {
                void 0 === t[l] && (t[l] = Object.create(null));
                var g = t[l];
                void 0 === g[d] && (g[d] = Object.create(null)), (g[d][v] = !0);
              }
              (p = { name: f, status: "loading", customisations: {} }),
                (u[_] = p),
                (o = !0);
            } else {
              !i && e.observer && (G(e), (i = !0));
              var b =
                void 0 !== n.customisations
                  ? n.customisations
                  : n.finder.customisations(u);
              E(n, b, a.getIcon(h, v));
            }
          }),
            e.temporary && !o
              ? J(r)
              : n && o
              ? H(r, !0)
              : i && e.observer && Q(e);
        }
      }),
      s.coreModules.api)
    ) {
      var r = s.coreModules.api;
      Object.keys(t).forEach(function (e) {
        var n = t[e];
        Object.keys(n).forEach(function (t) {
          r.loadIcons(
            Object.keys(n[t]).map(function (n) {
              return { provider: e, prefix: t, name: n };
            }),
            X
          );
        });
      });
    }
  }
  var ee = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.rotateFromString = void 0),
        (n.rotateFromString = function (e) {
          var n = e.replace(/^-?[0-9.]*/, "");
          function t(e) {
            for (; e < 0; ) e += 4;
            return e % 4;
          }
          if ("" === n) {
            var r = parseInt(e);
            return isNaN(r) ? 0 : t(r);
          }
          if (n !== e) {
            var o = 0;
            switch (n) {
              case "%":
                o = 25;
                break;
              case "deg":
                o = 90;
            }
            if (o) {
              var i = parseFloat(e.slice(0, e.length - n.length));
              return isNaN(i) ? 0 : (i /= o) % 1 == 0 ? t(i) : 0;
            }
          }
          return 0;
        });
    }),
    ne = e(function (e, n) {
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.alignmentFromString = n.flipFromString = void 0);
      var t = /[\s,]+/;
      (n.flipFromString = function (e, n) {
        n.split(t).forEach(function (n) {
          switch (n.trim()) {
            case "horizontal":
              e.hFlip = !0;
              break;
            case "vertical":
              e.vFlip = !0;
          }
        });
      }),
        (n.alignmentFromString = function (e, n) {
          n.split(t).forEach(function (n) {
            var t = n.trim();
            switch (t) {
              case "left":
              case "center":
              case "right":
                e.hAlign = t;
                break;
              case "top":
              case "middle":
              case "bottom":
                e.vAlign = t;
                break;
              case "slice":
              case "crop":
                e.slice = !0;
                break;
              case "meet":
                e.slice = !1;
            }
          });
        });
    });
  function te(e, n) {
    return e.hasAttribute(n);
  }
  function re(e, n) {
    return e.getAttribute(n);
  }
  var oe = ["inline", "hFlip", "vFlip"],
    ie = ["width", "height"],
    ae = "iconify-inline",
    ce = {
      find: function (e) {
        return e.querySelectorAll(
          "i.iconify, span.iconify, i.iconify-inline, span.iconify-inline"
        );
      },
      name: function (e) {
        return te(e, "data-icon") ? re(e, "data-icon") : null;
      },
      customisations: function (e, n) {
        void 0 === n && (n = { inline: !1 });
        var t = n,
          r = e.getAttribute("class");
        if (
          (-1 !== (r ? r.split(/\s+/) : []).indexOf(ae) && (t.inline = !0),
          te(e, "data-rotate"))
        ) {
          var o = ee.rotateFromString(re(e, "data-rotate"));
          o && (t.rotate = o);
        }
        return (
          te(e, "data-flip") && ne.flipFromString(t, re(e, "data-flip")),
          te(e, "data-align") && ne.alignmentFromString(t, re(e, "data-align")),
          oe.forEach(function (n) {
            if (te(e, "data-" + n)) {
              var r = (function (e, n) {
                var t = e.getAttribute(n);
                return (
                  t === n || "true" === t || ("" !== t && "false" !== t && null)
                );
              })(e, "data-" + n);
              "boolean" == typeof r && (t[n] = r);
            }
          }),
          ie.forEach(function (n) {
            if (te(e, "data-" + n)) {
              var r = re(e, "data-" + n);
              "" !== r && (t[n] = r);
            }
          }),
          t
        );
      },
      classFilter: function (e) {
        var n = [];
        return (
          e.forEach(function (e) {
            "iconify" !== e &&
              "" !== e &&
              "iconify--" !== e.slice(0, 9) &&
              n.push(e);
          }),
          n
        );
      },
    };
  function ue(e, n, t) {
    var r = c.getIconData(e);
    return r
      ? E({ name: i.stringToIcon(e) }, w.fullCustomisations(n), r, t)
      : null;
  }
  var fe = {
    getVersion: function () {
      return "2.0.0";
    },
    renderSVG: function (e, n) {
      return ue(e, n, !1);
    },
    renderHTML: function (e, n) {
      return ue(e, n, !0);
    },
    renderIcon: function (e, n) {
      var t = c.getIconData(e);
      if (!t) return null;
      var r = w.fullCustomisations(n);
      return A.iconToSVG(t, r);
    },
    scan: function (e) {
      e
        ? (function (e) {
            var n = k(e);
            n ? Z(n) : Z({ node: e, temporary: !0 }, !0);
          })(e)
        : Z();
    },
    observe: function (e) {
      H(e);
    },
    stopObserving: function (e) {
      J(e);
    },
    pauseObserver: function (e) {
      if (e) {
        var n = k(e);
        n && G(n);
      } else G();
    },
    resumeObserver: function (e) {
      if (e) {
        var n = k(e);
        n && Q(n);
      } else Q();
    },
  };
  if ("undefined" != typeof document && "undefined" != typeof window) {
    !(function () {
      if (document.body) return F(document.body);
      C.push({
        node: function () {
          return document.body;
        },
      });
    })(),
      (function (e) {
        -1 === Y.indexOf(e) && Y.push(e);
      })(ce);
    var le = window;
    if (void 0 !== le.IconifyPreload) {
      var se = le.IconifyPreload,
        de = "Invalid IconifyPreload syntax.";
      "object" == typeof se &&
        null !== se &&
        (se instanceof Array ? se : [se]).forEach(function (e) {
          try {
            ("object" != typeof e ||
              null === e ||
              e instanceof Array ||
              "object" != typeof e.icons ||
              "string" != typeof e.prefix ||
              !c.storageFunctions.addCollection(e)) &&
              console.error(de);
          } catch (e) {
            console.error(de);
          }
        });
    }
    setTimeout(function () {
      B(Z), Z();
    });
  }
  var ve = {
      enableCache: function (e, n) {
        return v.toggleBrowserCache(e, !1 !== n);
      },
      disableCache: function (e) {
        return v.toggleBrowserCache(e, !0);
      },
    },
    pe = { _api: O.APIInternalFunctions };
  [c.storageFunctions, l.builderFunctions, fe, ve, O.APIFunctions].forEach(
    function (e) {
      for (var n in e) pe[n] = e[n];
    }
  ),
    (s.coreModules.api = x.API);
  var he = M.getAPIModule;
  try {
    "undefined" != typeof document &&
      "undefined" != typeof window &&
      (he =
        "function" == typeof fetch && "function" == typeof Promise
          ? M.getAPIModule
          : P.getAPIModule);
  } catch (de) {}
  if (
    (y.setAPIModule("", he(I.getAPIConfig)),
    (pe._api.setFetch = function (e) {
      M.setFetch(e),
        he !== M.getAPIModule &&
          ((he = M.getAPIModule), y.setAPIModule("", he(I.getAPIConfig)));
    }),
    "undefined" != typeof document && "undefined" != typeof window)
  ) {
    (s.coreModules.cache = d.storeCache), d.loadCache();
    var ge = window;
    if (void 0 !== ge.IconifyProviders) {
      var be = ge.IconifyProviders;
      if ("object" == typeof be && null !== be)
        for (var me in be) {
          var ye = "IconifyProviders[" + me + "] is invalid.";
          try {
            var Ie = be[me];
            if ("object" != typeof Ie || !Ie || void 0 === Ie.resources)
              continue;
            I.setAPIConfig(me, Ie) || console.error(ye);
          } catch (e) {
            console.error(ye);
          }
        }
    }
  }
  return pe;
})();
try {
  void 0 === self.Iconify && (self.Iconify = Iconify);
} catch (e) {}
if ("object" == typeof exports)
  try {
    (exports.__esModule = !0), (exports.default = Iconify);
  } catch (e) {}
