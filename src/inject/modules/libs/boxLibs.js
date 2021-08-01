var isPlainObject = window.playerSDK2da5b1f3a3deccaa435b('25939')

function n(e, t) {
  return e ? {
    key: e,
    value: t
  } : [t]
}

function i(e) {
  for (var t = [], o = "", s = "", i = 0, r = e.length; i < r; i++) {
    var a = e.charAt(i);
    "/" === a ? (t.push(n(o, s)), o = "", s = "") : "@" === a ? (i += 1, a = e.charAt(i), "A" === a ? s += "@" : "S" === a ? s += "/" : "=" === a && (o = s, s = "")) : s += a
  }
  return t
}

function r(e) {
  var t = String(e);
  return t ? ("/" !== t.charAt(t.length - 1) && (t += "/"), i(t)) : []
}

export function qe(e) {
  var t = void 0;
  return r(e).forEach(e => {
      if (Array.isArray(e) && (t = t || [], 1 === e.length ? t.push(e[0]) : t.push(e)), isPlainObject(e)) {
          var o = e.key,
              n = e.value;
          (t = t || {})[o] = n
      }
  }), t
}