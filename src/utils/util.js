export async function sleep(timeout) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout))
}


export async function waitForDom(t, e = 200) {
  while (true) {
    var s = document.querySelector(t)
    if (s)
      return s
    await sleep(e)
  }
}

export async function waitSocketStream(e = 444) {
  var c = 0
  while (true) {
    c++
    if (c > 50)
      return false
    if (window.socketProxy && window.socketProxy.socketStream) {
      return true
    }
    await sleep(e)
  }
}

function getReactInstance(t) {
  for (var e of Object.keys(t))
    if (e.startsWith("__reactInternalInstance"))
      return t[e].return
}

export function decodeUnicode(str) {
  str = str.replace(/\\/g, "%")
  return unescape(str)
}

export function compileStr(code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return escape(c)
}

export function uncompileStr(code) {
  code = unescape(code)
  var c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}


export function loadXMLString(txt) {
  try {
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM")
    xmlDoc.async = "false"
    xmlDoc.loadXML(txt)
    return (xmlDoc)
  } catch (e) {
    try {
      var parser = new DOMParser()
      xmlDoc = parser.parseFromString(txt, "text/html")
      return (xmlDoc)
    } catch (e) { }
  }
  return (null)
}

export async function waitSocket(e = 444) {
  var c = 0
  while (true) {
    c++
    if (c > 50)
      return false
    if (window.socketProxy && window.socketProxy.socketStream) {
      return true
    }
    await sleep(e)
  }
}

export function getCookie(name) {
  let strcookie = document.cookie
  let arrcookie = strcookie.split("; ")
  for (let i = 0; i < arrcookie.length; i++) {
    let arr = arrcookie[i].split("=")
    if (arr[0] == name) {
      return arr[1]
    }
  }
  return ""
}

export function loadjscssfile(filename, filetype) {
  let fileref = "undefined"
  if (filetype == "js") {
    fileref = document.createElement('script')
    fileref.setAttribute("type", "text/javascript")
    fileref.setAttribute("src", filename)
  } else if (filetype == "css") {
    fileref = document.createElement('link')
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref != "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref)
  }
}

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