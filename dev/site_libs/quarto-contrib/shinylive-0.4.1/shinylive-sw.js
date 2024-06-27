// Shinylive 0.4.1
// Copyright 2024 Posit, PBC
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
}) : x2)(function(x2) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});

// src/assets/shinylive-inject-socket.txt
var shinylive_inject_socket_default = '// src/messageportwebsocket.ts\nvar MessagePortWebSocket = class extends EventTarget {\n  constructor(port) {\n    super();\n    this.readyState = 0;\n    this.addEventListener("open", (e) => {\n      if (this.onopen) {\n        this.onopen(e);\n      }\n    });\n    this.addEventListener("message", (e) => {\n      if (this.onmessage) {\n        this.onmessage(e);\n      }\n    });\n    this.addEventListener("error", (e) => {\n      if (this.onerror) {\n        this.onerror(e);\n      }\n    });\n    this.addEventListener("close", (e) => {\n      if (this.onclose) {\n        this.onclose(e);\n      }\n    });\n    this._port = port;\n    port.addEventListener("message", this._onMessage.bind(this));\n    port.start();\n  }\n  // Call on the server side of the connection, to tell the client that\n  // the connection has been established.\n  accept() {\n    if (this.readyState !== 0) {\n      return;\n    }\n    this.readyState = 1;\n    this._port.postMessage({ type: "open" });\n  }\n  send(data) {\n    if (this.readyState === 0) {\n      throw new DOMException(\n        "Can\'t send messages while WebSocket is in CONNECTING state",\n        "InvalidStateError"\n      );\n    }\n    if (this.readyState > 1) {\n      return;\n    }\n    this._port.postMessage({ type: "message", value: { data } });\n  }\n  close(code, reason) {\n    if (this.readyState > 1) {\n      return;\n    }\n    this.readyState = 2;\n    this._port.postMessage({ type: "close", value: { code, reason } });\n    this.readyState = 3;\n    this.dispatchEvent(new CloseEvent("close", { code, reason }));\n  }\n  _onMessage(e) {\n    const event = e.data;\n    switch (event.type) {\n      case "open":\n        if (this.readyState === 0) {\n          this.readyState = 1;\n          this.dispatchEvent(new Event("open"));\n          return;\n        }\n        break;\n      case "message":\n        if (this.readyState === 1) {\n          this.dispatchEvent(new MessageEvent("message", { ...event.value }));\n          return;\n        }\n        break;\n      case "close":\n        if (this.readyState < 3) {\n          this.readyState = 3;\n          this.dispatchEvent(new CloseEvent("close", { ...event.value }));\n          return;\n        }\n        break;\n    }\n    this._reportError(\n      `Unexpected event \'${event.type}\' while in readyState ${this.readyState}`,\n      1002\n    );\n  }\n  _reportError(message, code) {\n    this.dispatchEvent(new ErrorEvent("error", { message }));\n    if (typeof code === "number") {\n      this.close(code, message);\n    }\n  }\n};\n\n// src/shinylive-inject-socket.ts\nwindow.Shiny.createSocket = function() {\n  const channel = new MessageChannel();\n  window.parent.postMessage(\n    {\n      type: "openChannel",\n      // Infer app name from path: "/foo/app_abc123/"" => "app_abc123"\n      appName: window.location.pathname.replace(\n        new RegExp(".*/([^/]+)/$"),\n        "$1"\n      ),\n      path: "/websocket/"\n    },\n    "*",\n    [channel.port2]\n  );\n  return new MessagePortWebSocket(channel.port1);\n};\n';

// src/utils.ts
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function dirname(path) {
  if (path === "/" || path === "") {
    return "";
  }
  return path.replace(/[/]?[^/]+[/]?$/, "");
}
function uint8ArrayToString(buf) {
  let result = "";
  for (let i = 0; i < buf.length; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}

// node_modules/webr/dist/webr.mjs
var en = Object.create;
var Kr = Object.defineProperty;
var tn = Object.getOwnPropertyDescriptor;
var rn = Object.getOwnPropertyNames;
var sn = Object.getPrototypeOf;
var nn = Object.prototype.hasOwnProperty;
var N = ((s) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(s, { get: (e, t) => (typeof __require < "u" ? __require : e)[t] }) : s)(function(s) {
  if (typeof __require < "u")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + s + '" is not supported');
});
var D = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports);
var on = (s, e, t, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let n of rn(e))
      !nn.call(s, n) && n !== t && Kr(s, n, { get: () => e[n], enumerable: !(r = tn(e, n)) || r.enumerable });
  return s;
};
var ne = (s, e, t) => (t = s != null ? en(sn(s)) : {}, on(e || !s || !s.__esModule ? Kr(t, "default", { value: s, enumerable: true }) : t, s));
var hr = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var a = (s, e, t) => (hr(s, e, "read from private field"), t ? t.call(s) : e.get(s));
var u = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
};
var d = (s, e, t, r) => (hr(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var v = (s, e, t) => (hr(s, e, "access private method"), t);
var Ue = D((C) => {
  "use strict";
  Object.defineProperty(C, "__esModule", { value: true });
  C.getUint64 = C.getInt64 = C.setInt64 = C.setUint64 = C.UINT32_MAX = void 0;
  C.UINT32_MAX = 4294967295;
  function un(s, e, t) {
    let r = t / 4294967296, n = t;
    s.setUint32(e, r), s.setUint32(e + 4, n);
  }
  C.setUint64 = un;
  function pn(s, e, t) {
    let r = Math.floor(t / 4294967296), n = t;
    s.setUint32(e, r), s.setUint32(e + 4, n);
  }
  C.setInt64 = pn;
  function dn(s, e) {
    let t = s.getInt32(e), r = s.getUint32(e + 4);
    return t * 4294967296 + r;
  }
  C.getInt64 = dn;
  function hn(s, e) {
    let t = s.getUint32(e), r = s.getUint32(e + 4);
    return t * 4294967296 + r;
  }
  C.getUint64 = hn;
});
var xt = D((O) => {
  "use strict";
  var fr, Rr, mr;
  Object.defineProperty(O, "__esModule", { value: true });
  O.utf8DecodeTD = O.TEXT_DECODER_THRESHOLD = O.utf8DecodeJs = O.utf8EncodeTE = O.TEXT_ENCODER_THRESHOLD = O.utf8EncodeJs = O.utf8Count = void 0;
  var es = Ue(), wt = (typeof process > "u" || ((fr = process == null ? void 0 : process.env) === null || fr === void 0 ? void 0 : fr.TEXT_ENCODING) !== "never") && typeof TextEncoder < "u" && typeof TextDecoder < "u";
  function yn(s) {
    let e = s.length, t = 0, r = 0;
    for (; r < e; ) {
      let n = s.charCodeAt(r++);
      if (n & 4294967168)
        if (!(n & 4294965248))
          t += 2;
        else {
          if (n >= 55296 && n <= 56319 && r < e) {
            let o = s.charCodeAt(r);
            (o & 64512) === 56320 && (++r, n = ((n & 1023) << 10) + (o & 1023) + 65536);
          }
          n & 4294901760 ? t += 4 : t += 3;
        }
      else {
        t++;
        continue;
      }
    }
    return t;
  }
  O.utf8Count = yn;
  function fn(s, e, t) {
    let r = s.length, n = t, o = 0;
    for (; o < r; ) {
      let i = s.charCodeAt(o++);
      if (i & 4294967168)
        if (!(i & 4294965248))
          e[n++] = i >> 6 & 31 | 192;
        else {
          if (i >= 55296 && i <= 56319 && o < r) {
            let c = s.charCodeAt(o);
            (c & 64512) === 56320 && (++o, i = ((i & 1023) << 10) + (c & 1023) + 65536);
          }
          i & 4294901760 ? (e[n++] = i >> 18 & 7 | 240, e[n++] = i >> 12 & 63 | 128, e[n++] = i >> 6 & 63 | 128) : (e[n++] = i >> 12 & 15 | 224, e[n++] = i >> 6 & 63 | 128);
        }
      else {
        e[n++] = i;
        continue;
      }
      e[n++] = i & 63 | 128;
    }
  }
  O.utf8EncodeJs = fn;
  var Ce = wt ? new TextEncoder() : void 0;
  O.TEXT_ENCODER_THRESHOLD = wt ? typeof process < "u" && ((Rr = process == null ? void 0 : process.env) === null || Rr === void 0 ? void 0 : Rr.TEXT_ENCODING) !== "force" ? 200 : 0 : es.UINT32_MAX;
  function Rn(s, e, t) {
    e.set(Ce.encode(s), t);
  }
  function mn(s, e, t) {
    Ce.encodeInto(s, e.subarray(t));
  }
  O.utf8EncodeTE = Ce != null && Ce.encodeInto ? mn : Rn;
  var gn = 4096;
  function bn(s, e, t) {
    let r = e, n = r + t, o = [], i = "";
    for (; r < n; ) {
      let c = s[r++];
      if (!(c & 128))
        o.push(c);
      else if ((c & 224) === 192) {
        let p = s[r++] & 63;
        o.push((c & 31) << 6 | p);
      } else if ((c & 240) === 224) {
        let p = s[r++] & 63, P = s[r++] & 63;
        o.push((c & 31) << 12 | p << 6 | P);
      } else if ((c & 248) === 240) {
        let p = s[r++] & 63, P = s[r++] & 63, M = s[r++] & 63, k = (c & 7) << 18 | p << 12 | P << 6 | M;
        k > 65535 && (k -= 65536, o.push(k >>> 10 & 1023 | 55296), k = 56320 | k & 1023), o.push(k);
      } else
        o.push(c);
      o.length >= gn && (i += String.fromCharCode(...o), o.length = 0);
    }
    return o.length > 0 && (i += String.fromCharCode(...o)), i;
  }
  O.utf8DecodeJs = bn;
  var wn = wt ? new TextDecoder() : null;
  O.TEXT_DECODER_THRESHOLD = wt ? typeof process < "u" && ((mr = process == null ? void 0 : process.env) === null || mr === void 0 ? void 0 : mr.TEXT_DECODER) !== "force" ? 200 : 0 : es.UINT32_MAX;
  function xn(s, e, t) {
    let r = s.subarray(e, e + t);
    return wn.decode(r);
  }
  O.utf8DecodeTD = xn;
});
var br = D((vt) => {
  "use strict";
  Object.defineProperty(vt, "__esModule", { value: true });
  vt.ExtData = void 0;
  var gr = class {
    constructor(e, t) {
      this.type = e, this.data = t;
    }
  };
  vt.ExtData = gr;
});
var Tt = D((Et) => {
  "use strict";
  Object.defineProperty(Et, "__esModule", { value: true });
  Et.DecodeError = void 0;
  var fe = class extends Error {
    constructor(e) {
      super(e);
      let t = Object.create(fe.prototype);
      Object.setPrototypeOf(this, t), Object.defineProperty(this, "name", { configurable: true, enumerable: false, value: fe.name });
    }
  };
  Et.DecodeError = fe;
});
var wr = D((S) => {
  "use strict";
  Object.defineProperty(S, "__esModule", { value: true });
  S.timestampExtension = S.decodeTimestampExtension = S.decodeTimestampToTimeSpec = S.encodeTimestampExtension = S.encodeDateToTimeSpec = S.encodeTimeSpecToTimestamp = S.EXT_TIMESTAMP = void 0;
  var vn = Tt(), ts = Ue();
  S.EXT_TIMESTAMP = -1;
  var En = 4294967296 - 1, Tn = 17179869184 - 1;
  function rs({ sec: s, nsec: e }) {
    if (s >= 0 && e >= 0 && s <= Tn)
      if (e === 0 && s <= En) {
        let t = new Uint8Array(4);
        return new DataView(t.buffer).setUint32(0, s), t;
      } else {
        let t = s / 4294967296, r = s & 4294967295, n = new Uint8Array(8), o = new DataView(n.buffer);
        return o.setUint32(0, e << 2 | t & 3), o.setUint32(4, r), n;
      }
    else {
      let t = new Uint8Array(12), r = new DataView(t.buffer);
      return r.setUint32(0, e), (0, ts.setInt64)(r, 4, s), t;
    }
  }
  S.encodeTimeSpecToTimestamp = rs;
  function ss(s) {
    let e = s.getTime(), t = Math.floor(e / 1e3), r = (e - t * 1e3) * 1e6, n = Math.floor(r / 1e9);
    return { sec: t + n, nsec: r - n * 1e9 };
  }
  S.encodeDateToTimeSpec = ss;
  function ns(s) {
    if (s instanceof Date) {
      let e = ss(s);
      return rs(e);
    } else
      return null;
  }
  S.encodeTimestampExtension = ns;
  function os(s) {
    let e = new DataView(s.buffer, s.byteOffset, s.byteLength);
    switch (s.byteLength) {
      case 4:
        return { sec: e.getUint32(0), nsec: 0 };
      case 8: {
        let t = e.getUint32(0), r = e.getUint32(4), n = (t & 3) * 4294967296 + r, o = t >>> 2;
        return { sec: n, nsec: o };
      }
      case 12: {
        let t = (0, ts.getInt64)(e, 4), r = e.getUint32(0);
        return { sec: t, nsec: r };
      }
      default:
        throw new vn.DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${s.length}`);
    }
  }
  S.decodeTimestampToTimeSpec = os;
  function as(s) {
    let e = os(s);
    return new Date(e.sec * 1e3 + e.nsec / 1e6);
  }
  S.decodeTimestampExtension = as;
  S.timestampExtension = { type: S.EXT_TIMESTAMP, encode: ns, decode: as };
});
var St = D((_t) => {
  "use strict";
  Object.defineProperty(_t, "__esModule", { value: true });
  _t.ExtensionCodec = void 0;
  var Pt = br(), Pn = wr(), je = class {
    constructor() {
      this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(Pn.timestampExtension);
    }
    register({ type: e, encode: t, decode: r }) {
      if (e >= 0)
        this.encoders[e] = t, this.decoders[e] = r;
      else {
        let n = 1 + e;
        this.builtInEncoders[n] = t, this.builtInDecoders[n] = r;
      }
    }
    tryToEncode(e, t) {
      for (let r = 0; r < this.builtInEncoders.length; r++) {
        let n = this.builtInEncoders[r];
        if (n != null) {
          let o = n(e, t);
          if (o != null) {
            let i = -1 - r;
            return new Pt.ExtData(i, o);
          }
        }
      }
      for (let r = 0; r < this.encoders.length; r++) {
        let n = this.encoders[r];
        if (n != null) {
          let o = n(e, t);
          if (o != null) {
            let i = r;
            return new Pt.ExtData(i, o);
          }
        }
      }
      return e instanceof Pt.ExtData ? e : null;
    }
    decode(e, t, r) {
      let n = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
      return n ? n(e, t, r) : new Pt.ExtData(t, e);
    }
  };
  _t.ExtensionCodec = je;
  je.defaultCodec = new je();
});
var xr = D((Re) => {
  "use strict";
  Object.defineProperty(Re, "__esModule", { value: true });
  Re.createDataView = Re.ensureUint8Array = void 0;
  function is(s) {
    return s instanceof Uint8Array ? s : ArrayBuffer.isView(s) ? new Uint8Array(s.buffer, s.byteOffset, s.byteLength) : s instanceof ArrayBuffer ? new Uint8Array(s) : Uint8Array.from(s);
  }
  Re.ensureUint8Array = is;
  function _n(s) {
    if (s instanceof ArrayBuffer)
      return new DataView(s);
    let e = is(s);
    return new DataView(e.buffer, e.byteOffset, e.byteLength);
  }
  Re.createDataView = _n;
});
var Er = D((B) => {
  "use strict";
  Object.defineProperty(B, "__esModule", { value: true });
  B.Encoder = B.DEFAULT_INITIAL_BUFFER_SIZE = B.DEFAULT_MAX_DEPTH = void 0;
  var Ne = xt(), Sn = St(), ls = Ue(), Mn = xr();
  B.DEFAULT_MAX_DEPTH = 100;
  B.DEFAULT_INITIAL_BUFFER_SIZE = 2048;
  var vr = class {
    constructor(e = Sn.ExtensionCodec.defaultCodec, t = void 0, r = B.DEFAULT_MAX_DEPTH, n = B.DEFAULT_INITIAL_BUFFER_SIZE, o = false, i = false, c = false, p = false) {
      this.extensionCodec = e, this.context = t, this.maxDepth = r, this.initialBufferSize = n, this.sortKeys = o, this.forceFloat32 = i, this.ignoreUndefined = c, this.forceIntegerToFloat = p, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
    }
    reinitializeState() {
      this.pos = 0;
    }
    encodeSharedRef(e) {
      return this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos);
    }
    encode(e) {
      return this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos);
    }
    doEncode(e, t) {
      if (t > this.maxDepth)
        throw new Error(`Too deep objects in depth ${t}`);
      e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.encodeObject(e, t);
    }
    ensureBufferSizeToWrite(e) {
      let t = this.pos + e;
      this.view.byteLength < t && this.resizeBuffer(t * 2);
    }
    resizeBuffer(e) {
      let t = new ArrayBuffer(e), r = new Uint8Array(t), n = new DataView(t);
      r.set(this.bytes), this.view = n, this.bytes = r;
    }
    encodeNil() {
      this.writeU8(192);
    }
    encodeBoolean(e) {
      e === false ? this.writeU8(194) : this.writeU8(195);
    }
    encodeNumber(e) {
      Number.isSafeInteger(e) && !this.forceIntegerToFloat ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : (this.writeU8(211), this.writeI64(e)) : this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e));
    }
    writeStringHeader(e) {
      if (e < 32)
        this.writeU8(160 + e);
      else if (e < 256)
        this.writeU8(217), this.writeU8(e);
      else if (e < 65536)
        this.writeU8(218), this.writeU16(e);
      else if (e < 4294967296)
        this.writeU8(219), this.writeU32(e);
      else
        throw new Error(`Too long string: ${e} bytes in UTF-8`);
    }
    encodeString(e) {
      if (e.length > Ne.TEXT_ENCODER_THRESHOLD) {
        let n = (0, Ne.utf8Count)(e);
        this.ensureBufferSizeToWrite(5 + n), this.writeStringHeader(n), (0, Ne.utf8EncodeTE)(e, this.bytes, this.pos), this.pos += n;
      } else {
        let n = (0, Ne.utf8Count)(e);
        this.ensureBufferSizeToWrite(5 + n), this.writeStringHeader(n), (0, Ne.utf8EncodeJs)(e, this.bytes, this.pos), this.pos += n;
      }
    }
    encodeObject(e, t) {
      let r = this.extensionCodec.tryToEncode(e, this.context);
      if (r != null)
        this.encodeExtension(r);
      else if (Array.isArray(e))
        this.encodeArray(e, t);
      else if (ArrayBuffer.isView(e))
        this.encodeBinary(e);
      else if (typeof e == "object")
        this.encodeMap(e, t);
      else
        throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(e)}`);
    }
    encodeBinary(e) {
      let t = e.byteLength;
      if (t < 256)
        this.writeU8(196), this.writeU8(t);
      else if (t < 65536)
        this.writeU8(197), this.writeU16(t);
      else if (t < 4294967296)
        this.writeU8(198), this.writeU32(t);
      else
        throw new Error(`Too large binary: ${t}`);
      let r = (0, Mn.ensureUint8Array)(e);
      this.writeU8a(r);
    }
    encodeArray(e, t) {
      let r = e.length;
      if (r < 16)
        this.writeU8(144 + r);
      else if (r < 65536)
        this.writeU8(220), this.writeU16(r);
      else if (r < 4294967296)
        this.writeU8(221), this.writeU32(r);
      else
        throw new Error(`Too large array: ${r}`);
      for (let n of e)
        this.doEncode(n, t + 1);
    }
    countWithoutUndefined(e, t) {
      let r = 0;
      for (let n of t)
        e[n] !== void 0 && r++;
      return r;
    }
    encodeMap(e, t) {
      let r = Object.keys(e);
      this.sortKeys && r.sort();
      let n = this.ignoreUndefined ? this.countWithoutUndefined(e, r) : r.length;
      if (n < 16)
        this.writeU8(128 + n);
      else if (n < 65536)
        this.writeU8(222), this.writeU16(n);
      else if (n < 4294967296)
        this.writeU8(223), this.writeU32(n);
      else
        throw new Error(`Too large map object: ${n}`);
      for (let o of r) {
        let i = e[o];
        this.ignoreUndefined && i === void 0 || (this.encodeString(o), this.doEncode(i, t + 1));
      }
    }
    encodeExtension(e) {
      let t = e.data.length;
      if (t === 1)
        this.writeU8(212);
      else if (t === 2)
        this.writeU8(213);
      else if (t === 4)
        this.writeU8(214);
      else if (t === 8)
        this.writeU8(215);
      else if (t === 16)
        this.writeU8(216);
      else if (t < 256)
        this.writeU8(199), this.writeU8(t);
      else if (t < 65536)
        this.writeU8(200), this.writeU16(t);
      else if (t < 4294967296)
        this.writeU8(201), this.writeU32(t);
      else
        throw new Error(`Too large extension object: ${t}`);
      this.writeI8(e.type), this.writeU8a(e.data);
    }
    writeU8(e) {
      this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++;
    }
    writeU8a(e) {
      let t = e.length;
      this.ensureBufferSizeToWrite(t), this.bytes.set(e, this.pos), this.pos += t;
    }
    writeI8(e) {
      this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++;
    }
    writeU16(e) {
      this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2;
    }
    writeI16(e) {
      this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2;
    }
    writeU32(e) {
      this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4;
    }
    writeI32(e) {
      this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4;
    }
    writeF32(e) {
      this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4;
    }
    writeF64(e) {
      this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8;
    }
    writeU64(e) {
      this.ensureBufferSizeToWrite(8), (0, ls.setUint64)(this.view, this.pos, e), this.pos += 8;
    }
    writeI64(e) {
      this.ensureBufferSizeToWrite(8), (0, ls.setInt64)(this.view, this.pos, e), this.pos += 8;
    }
  };
  B.Encoder = vr;
});
var cs = D((Mt) => {
  "use strict";
  Object.defineProperty(Mt, "__esModule", { value: true });
  Mt.encode = void 0;
  var kn = Er(), Dn = {};
  function On(s, e = Dn) {
    return new kn.Encoder(e.extensionCodec, e.context, e.maxDepth, e.initialBufferSize, e.sortKeys, e.forceFloat32, e.ignoreUndefined, e.forceIntegerToFloat).encodeSharedRef(s);
  }
  Mt.encode = On;
});
var us = D((kt) => {
  "use strict";
  Object.defineProperty(kt, "__esModule", { value: true });
  kt.prettyByte = void 0;
  function Wn(s) {
    return `${s < 0 ? "-" : ""}0x${Math.abs(s).toString(16).padStart(2, "0")}`;
  }
  kt.prettyByte = Wn;
});
var ps = D((Dt) => {
  "use strict";
  Object.defineProperty(Dt, "__esModule", { value: true });
  Dt.CachedKeyDecoder = void 0;
  var An = xt(), In = 16, Un = 16, Tr = class {
    constructor(e = In, t = Un) {
      this.maxKeyLength = e, this.maxLengthPerKey = t, this.hit = 0, this.miss = 0, this.caches = [];
      for (let r = 0; r < this.maxKeyLength; r++)
        this.caches.push([]);
    }
    canBeCached(e) {
      return e > 0 && e <= this.maxKeyLength;
    }
    find(e, t, r) {
      let n = this.caches[r - 1];
      e:
        for (let o of n) {
          let i = o.bytes;
          for (let c = 0; c < r; c++)
            if (i[c] !== e[t + c])
              continue e;
          return o.str;
        }
      return null;
    }
    store(e, t) {
      let r = this.caches[e.length - 1], n = { bytes: e, str: t };
      r.length >= this.maxLengthPerKey ? r[Math.random() * r.length | 0] = n : r.push(n);
    }
    decode(e, t, r) {
      let n = this.find(e, t, r);
      if (n != null)
        return this.hit++, n;
      this.miss++;
      let o = (0, An.utf8DecodeJs)(e, t, r), i = Uint8Array.prototype.slice.call(e, t, t + r);
      return this.store(i, o), o;
    }
  };
  Dt.CachedKeyDecoder = Tr;
});
var Ot = D(($) => {
  "use strict";
  Object.defineProperty($, "__esModule", { value: true });
  $.Decoder = $.DataViewIndexOutOfBoundsError = void 0;
  var Pr = us(), Cn = St(), oe = Ue(), _r = xt(), Sr = xr(), jn = ps(), G = Tt(), Nn = (s) => {
    let e = typeof s;
    return e === "string" || e === "number";
  }, Le = -1, kr = new DataView(new ArrayBuffer(0)), Ln = new Uint8Array(kr.buffer);
  $.DataViewIndexOutOfBoundsError = (() => {
    try {
      kr.getInt8(0);
    } catch (s) {
      return s.constructor;
    }
    throw new Error("never reached");
  })();
  var ds = new $.DataViewIndexOutOfBoundsError("Insufficient data"), Bn = new jn.CachedKeyDecoder(), Mr = class {
    constructor(e = Cn.ExtensionCodec.defaultCodec, t = void 0, r = oe.UINT32_MAX, n = oe.UINT32_MAX, o = oe.UINT32_MAX, i = oe.UINT32_MAX, c = oe.UINT32_MAX, p = Bn) {
      this.extensionCodec = e, this.context = t, this.maxStrLength = r, this.maxBinLength = n, this.maxArrayLength = o, this.maxMapLength = i, this.maxExtLength = c, this.keyDecoder = p, this.totalPos = 0, this.pos = 0, this.view = kr, this.bytes = Ln, this.headByte = Le, this.stack = [];
    }
    reinitializeState() {
      this.totalPos = 0, this.headByte = Le, this.stack.length = 0;
    }
    setBuffer(e) {
      this.bytes = (0, Sr.ensureUint8Array)(e), this.view = (0, Sr.createDataView)(this.bytes), this.pos = 0;
    }
    appendBuffer(e) {
      if (this.headByte === Le && !this.hasRemaining(1))
        this.setBuffer(e);
      else {
        let t = this.bytes.subarray(this.pos), r = (0, Sr.ensureUint8Array)(e), n = new Uint8Array(t.length + r.length);
        n.set(t), n.set(r, t.length), this.setBuffer(n);
      }
    }
    hasRemaining(e) {
      return this.view.byteLength - this.pos >= e;
    }
    createExtraByteError(e) {
      let { view: t, pos: r } = this;
      return new RangeError(`Extra ${t.byteLength - r} of ${t.byteLength} byte(s) found at buffer[${e}]`);
    }
    decode(e) {
      this.reinitializeState(), this.setBuffer(e);
      let t = this.doDecodeSync();
      if (this.hasRemaining(1))
        throw this.createExtraByteError(this.pos);
      return t;
    }
    *decodeMulti(e) {
      for (this.reinitializeState(), this.setBuffer(e); this.hasRemaining(1); )
        yield this.doDecodeSync();
    }
    async decodeAsync(e) {
      let t = false, r;
      for await (let c of e) {
        if (t)
          throw this.createExtraByteError(this.totalPos);
        this.appendBuffer(c);
        try {
          r = this.doDecodeSync(), t = true;
        } catch (p) {
          if (!(p instanceof $.DataViewIndexOutOfBoundsError))
            throw p;
        }
        this.totalPos += this.pos;
      }
      if (t) {
        if (this.hasRemaining(1))
          throw this.createExtraByteError(this.totalPos);
        return r;
      }
      let { headByte: n, pos: o, totalPos: i } = this;
      throw new RangeError(`Insufficient data in parsing ${(0, Pr.prettyByte)(n)} at ${i} (${o} in the current buffer)`);
    }
    decodeArrayStream(e) {
      return this.decodeMultiAsync(e, true);
    }
    decodeStream(e) {
      return this.decodeMultiAsync(e, false);
    }
    async *decodeMultiAsync(e, t) {
      let r = t, n = -1;
      for await (let o of e) {
        if (t && n === 0)
          throw this.createExtraByteError(this.totalPos);
        this.appendBuffer(o), r && (n = this.readArraySize(), r = false, this.complete());
        try {
          for (; yield this.doDecodeSync(), --n !== 0; )
            ;
        } catch (i) {
          if (!(i instanceof $.DataViewIndexOutOfBoundsError))
            throw i;
        }
        this.totalPos += this.pos;
      }
    }
    doDecodeSync() {
      e:
        for (; ; ) {
          let e = this.readHeadByte(), t;
          if (e >= 224)
            t = e - 256;
          else if (e < 192)
            if (e < 128)
              t = e;
            else if (e < 144) {
              let n = e - 128;
              if (n !== 0) {
                this.pushMapState(n), this.complete();
                continue e;
              } else
                t = {};
            } else if (e < 160) {
              let n = e - 144;
              if (n !== 0) {
                this.pushArrayState(n), this.complete();
                continue e;
              } else
                t = [];
            } else {
              let n = e - 160;
              t = this.decodeUtf8String(n, 0);
            }
          else if (e === 192)
            t = null;
          else if (e === 194)
            t = false;
          else if (e === 195)
            t = true;
          else if (e === 202)
            t = this.readF32();
          else if (e === 203)
            t = this.readF64();
          else if (e === 204)
            t = this.readU8();
          else if (e === 205)
            t = this.readU16();
          else if (e === 206)
            t = this.readU32();
          else if (e === 207)
            t = this.readU64();
          else if (e === 208)
            t = this.readI8();
          else if (e === 209)
            t = this.readI16();
          else if (e === 210)
            t = this.readI32();
          else if (e === 211)
            t = this.readI64();
          else if (e === 217) {
            let n = this.lookU8();
            t = this.decodeUtf8String(n, 1);
          } else if (e === 218) {
            let n = this.lookU16();
            t = this.decodeUtf8String(n, 2);
          } else if (e === 219) {
            let n = this.lookU32();
            t = this.decodeUtf8String(n, 4);
          } else if (e === 220) {
            let n = this.readU16();
            if (n !== 0) {
              this.pushArrayState(n), this.complete();
              continue e;
            } else
              t = [];
          } else if (e === 221) {
            let n = this.readU32();
            if (n !== 0) {
              this.pushArrayState(n), this.complete();
              continue e;
            } else
              t = [];
          } else if (e === 222) {
            let n = this.readU16();
            if (n !== 0) {
              this.pushMapState(n), this.complete();
              continue e;
            } else
              t = {};
          } else if (e === 223) {
            let n = this.readU32();
            if (n !== 0) {
              this.pushMapState(n), this.complete();
              continue e;
            } else
              t = {};
          } else if (e === 196) {
            let n = this.lookU8();
            t = this.decodeBinary(n, 1);
          } else if (e === 197) {
            let n = this.lookU16();
            t = this.decodeBinary(n, 2);
          } else if (e === 198) {
            let n = this.lookU32();
            t = this.decodeBinary(n, 4);
          } else if (e === 212)
            t = this.decodeExtension(1, 0);
          else if (e === 213)
            t = this.decodeExtension(2, 0);
          else if (e === 214)
            t = this.decodeExtension(4, 0);
          else if (e === 215)
            t = this.decodeExtension(8, 0);
          else if (e === 216)
            t = this.decodeExtension(16, 0);
          else if (e === 199) {
            let n = this.lookU8();
            t = this.decodeExtension(n, 1);
          } else if (e === 200) {
            let n = this.lookU16();
            t = this.decodeExtension(n, 2);
          } else if (e === 201) {
            let n = this.lookU32();
            t = this.decodeExtension(n, 4);
          } else
            throw new G.DecodeError(`Unrecognized type byte: ${(0, Pr.prettyByte)(e)}`);
          this.complete();
          let r = this.stack;
          for (; r.length > 0; ) {
            let n = r[r.length - 1];
            if (n.type === 0)
              if (n.array[n.position] = t, n.position++, n.position === n.size)
                r.pop(), t = n.array;
              else
                continue e;
            else if (n.type === 1) {
              if (!Nn(t))
                throw new G.DecodeError("The type of key must be string or number but " + typeof t);
              if (t === "__proto__")
                throw new G.DecodeError("The key __proto__ is not allowed");
              n.key = t, n.type = 2;
              continue e;
            } else if (n.map[n.key] = t, n.readCount++, n.readCount === n.size)
              r.pop(), t = n.map;
            else {
              n.key = null, n.type = 1;
              continue e;
            }
          }
          return t;
        }
    }
    readHeadByte() {
      return this.headByte === Le && (this.headByte = this.readU8()), this.headByte;
    }
    complete() {
      this.headByte = Le;
    }
    readArraySize() {
      let e = this.readHeadByte();
      switch (e) {
        case 220:
          return this.readU16();
        case 221:
          return this.readU32();
        default: {
          if (e < 160)
            return e - 144;
          throw new G.DecodeError(`Unrecognized array type byte: ${(0, Pr.prettyByte)(e)}`);
        }
      }
    }
    pushMapState(e) {
      if (e > this.maxMapLength)
        throw new G.DecodeError(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
      this.stack.push({ type: 1, size: e, key: null, readCount: 0, map: {} });
    }
    pushArrayState(e) {
      if (e > this.maxArrayLength)
        throw new G.DecodeError(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
      this.stack.push({ type: 0, size: e, array: new Array(e), position: 0 });
    }
    decodeUtf8String(e, t) {
      var r;
      if (e > this.maxStrLength)
        throw new G.DecodeError(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
      if (this.bytes.byteLength < this.pos + t + e)
        throw ds;
      let n = this.pos + t, o;
      return this.stateIsMapKey() && (!((r = this.keyDecoder) === null || r === void 0) && r.canBeCached(e)) ? o = this.keyDecoder.decode(this.bytes, n, e) : e > _r.TEXT_DECODER_THRESHOLD ? o = (0, _r.utf8DecodeTD)(this.bytes, n, e) : o = (0, _r.utf8DecodeJs)(this.bytes, n, e), this.pos += t + e, o;
    }
    stateIsMapKey() {
      return this.stack.length > 0 ? this.stack[this.stack.length - 1].type === 1 : false;
    }
    decodeBinary(e, t) {
      if (e > this.maxBinLength)
        throw new G.DecodeError(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
      if (!this.hasRemaining(e + t))
        throw ds;
      let r = this.pos + t, n = this.bytes.subarray(r, r + e);
      return this.pos += t + e, n;
    }
    decodeExtension(e, t) {
      if (e > this.maxExtLength)
        throw new G.DecodeError(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
      let r = this.view.getInt8(this.pos + t), n = this.decodeBinary(e, t + 1);
      return this.extensionCodec.decode(n, r, this.context);
    }
    lookU8() {
      return this.view.getUint8(this.pos);
    }
    lookU16() {
      return this.view.getUint16(this.pos);
    }
    lookU32() {
      return this.view.getUint32(this.pos);
    }
    readU8() {
      let e = this.view.getUint8(this.pos);
      return this.pos++, e;
    }
    readI8() {
      let e = this.view.getInt8(this.pos);
      return this.pos++, e;
    }
    readU16() {
      let e = this.view.getUint16(this.pos);
      return this.pos += 2, e;
    }
    readI16() {
      let e = this.view.getInt16(this.pos);
      return this.pos += 2, e;
    }
    readU32() {
      let e = this.view.getUint32(this.pos);
      return this.pos += 4, e;
    }
    readI32() {
      let e = this.view.getInt32(this.pos);
      return this.pos += 4, e;
    }
    readU64() {
      let e = (0, oe.getUint64)(this.view, this.pos);
      return this.pos += 8, e;
    }
    readI64() {
      let e = (0, oe.getInt64)(this.view, this.pos);
      return this.pos += 8, e;
    }
    readF32() {
      let e = this.view.getFloat32(this.pos);
      return this.pos += 4, e;
    }
    readF64() {
      let e = this.view.getFloat64(this.pos);
      return this.pos += 8, e;
    }
  };
  $.Decoder = Mr;
});
var Dr = D((F) => {
  "use strict";
  Object.defineProperty(F, "__esModule", { value: true });
  F.decodeMulti = F.decode = F.defaultDecodeOptions = void 0;
  var hs = Ot();
  F.defaultDecodeOptions = {};
  function Fn(s, e = F.defaultDecodeOptions) {
    return new hs.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decode(s);
  }
  F.decode = Fn;
  function qn(s, e = F.defaultDecodeOptions) {
    return new hs.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeMulti(s);
  }
  F.decodeMulti = qn;
});
var Rs = D((Z) => {
  "use strict";
  Object.defineProperty(Z, "__esModule", { value: true });
  Z.ensureAsyncIterable = Z.asyncIterableFromStream = Z.isAsyncIterable = void 0;
  function ys(s) {
    return s[Symbol.asyncIterator] != null;
  }
  Z.isAsyncIterable = ys;
  function Vn(s) {
    if (s == null)
      throw new Error("Assertion Failure: value must not be null nor undefined");
  }
  async function* fs(s) {
    let e = s.getReader();
    try {
      for (; ; ) {
        let { done: t, value: r } = await e.read();
        if (t)
          return;
        Vn(r), yield r;
      }
    } finally {
      e.releaseLock();
    }
  }
  Z.asyncIterableFromStream = fs;
  function Hn(s) {
    return ys(s) ? s : fs(s);
  }
  Z.ensureAsyncIterable = Hn;
});
var gs = D((q) => {
  "use strict";
  Object.defineProperty(q, "__esModule", { value: true });
  q.decodeStream = q.decodeMultiStream = q.decodeArrayStream = q.decodeAsync = void 0;
  var Or = Ot(), Wr = Rs(), Wt = Dr();
  async function Jn(s, e = Wt.defaultDecodeOptions) {
    let t = (0, Wr.ensureAsyncIterable)(s);
    return new Or.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeAsync(t);
  }
  q.decodeAsync = Jn;
  function zn(s, e = Wt.defaultDecodeOptions) {
    let t = (0, Wr.ensureAsyncIterable)(s);
    return new Or.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeArrayStream(t);
  }
  q.decodeArrayStream = zn;
  function ms(s, e = Wt.defaultDecodeOptions) {
    let t = (0, Wr.ensureAsyncIterable)(s);
    return new Or.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeStream(t);
  }
  q.decodeMultiStream = ms;
  function Xn(s, e = Wt.defaultDecodeOptions) {
    return ms(s, e);
  }
  q.decodeStream = Xn;
});
var It = D((h) => {
  "use strict";
  Object.defineProperty(h, "__esModule", { value: true });
  h.decodeTimestampExtension = h.encodeTimestampExtension = h.decodeTimestampToTimeSpec = h.encodeTimeSpecToTimestamp = h.encodeDateToTimeSpec = h.EXT_TIMESTAMP = h.ExtData = h.ExtensionCodec = h.Encoder = h.DataViewIndexOutOfBoundsError = h.DecodeError = h.Decoder = h.decodeStream = h.decodeMultiStream = h.decodeArrayStream = h.decodeAsync = h.decodeMulti = h.decode = h.encode = void 0;
  var Gn = cs();
  Object.defineProperty(h, "encode", { enumerable: true, get: function() {
    return Gn.encode;
  } });
  var bs = Dr();
  Object.defineProperty(h, "decode", { enumerable: true, get: function() {
    return bs.decode;
  } });
  Object.defineProperty(h, "decodeMulti", { enumerable: true, get: function() {
    return bs.decodeMulti;
  } });
  var At = gs();
  Object.defineProperty(h, "decodeAsync", { enumerable: true, get: function() {
    return At.decodeAsync;
  } });
  Object.defineProperty(h, "decodeArrayStream", { enumerable: true, get: function() {
    return At.decodeArrayStream;
  } });
  Object.defineProperty(h, "decodeMultiStream", { enumerable: true, get: function() {
    return At.decodeMultiStream;
  } });
  Object.defineProperty(h, "decodeStream", { enumerable: true, get: function() {
    return At.decodeStream;
  } });
  var ws = Ot();
  Object.defineProperty(h, "Decoder", { enumerable: true, get: function() {
    return ws.Decoder;
  } });
  Object.defineProperty(h, "DataViewIndexOutOfBoundsError", { enumerable: true, get: function() {
    return ws.DataViewIndexOutOfBoundsError;
  } });
  var $n = Tt();
  Object.defineProperty(h, "DecodeError", { enumerable: true, get: function() {
    return $n.DecodeError;
  } });
  var Kn = Er();
  Object.defineProperty(h, "Encoder", { enumerable: true, get: function() {
    return Kn.Encoder;
  } });
  var Qn = St();
  Object.defineProperty(h, "ExtensionCodec", { enumerable: true, get: function() {
    return Qn.ExtensionCodec;
  } });
  var Zn = br();
  Object.defineProperty(h, "ExtData", { enumerable: true, get: function() {
    return Zn.ExtData;
  } });
  var me = wr();
  Object.defineProperty(h, "EXT_TIMESTAMP", { enumerable: true, get: function() {
    return me.EXT_TIMESTAMP;
  } });
  Object.defineProperty(h, "encodeDateToTimeSpec", { enumerable: true, get: function() {
    return me.encodeDateToTimeSpec;
  } });
  Object.defineProperty(h, "encodeTimeSpecToTimestamp", { enumerable: true, get: function() {
    return me.encodeTimeSpecToTimestamp;
  } });
  Object.defineProperty(h, "decodeTimestampToTimeSpec", { enumerable: true, get: function() {
    return me.decodeTimestampToTimeSpec;
  } });
  Object.defineProperty(h, "encodeTimestampExtension", { enumerable: true, get: function() {
    return me.encodeTimestampExtension;
  } });
  Object.defineProperty(h, "decodeTimestampExtension", { enumerable: true, get: function() {
    return me.decodeTimestampExtension;
  } });
});
var U = class extends Error {
  constructor(e) {
    super(e), this.name = this.constructor.name, Object.setPrototypeOf(this, new.target.prototype);
  }
};
var _ = class extends U {
};
var m = typeof process < "u" && process.release && process.release.name === "node";
var yr;
if (globalThis.document)
  yr = (s) => new Promise((e, t) => {
    let r = document.createElement("script");
    r.src = s, r.onload = () => e(), r.onerror = t, document.head.appendChild(r);
  });
else if (globalThis.importScripts)
  yr = async (s) => {
    try {
      globalThis.importScripts(s);
    } catch (e) {
      if (e instanceof TypeError)
        await Promise.resolve().then(() => ne(N(s)));
      else
        throw e;
    }
  };
else if (m)
  yr = async (s) => {
    let e = (await Promise.resolve().then(() => ne(N("path")))).default;
    await Promise.resolve().then(() => ne(N(e.resolve(s))));
  };
else
  throw new U("Cannot determine runtime environment");
var ln = /* @__PURE__ */ new WeakMap();
function Yr(s, e) {
  return ln.set(s, e), s;
}
var vs = ne(It());
var Yn = new TextEncoder();
var V;
var H;
var Be;
var Ar;
V = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakSet(), Ar = function() {
  a(this, V).push(new Promise((e) => {
    a(this, H).push(e);
  }));
};
function Fe(s, e, t) {
  return Ts({ type: "response", data: { uuid: s, resp: e } }, t);
}
function Ts(s, e) {
  return e && Yr(s, e), s;
}
var we;
we = /* @__PURE__ */ new WeakMap();
var Ms = ne(It());
var so = new TextDecoder("utf-8");
var xe;
var ve;
var qe;
var Ve;
var Ee;
xe = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap();
var Ur = new Int32Array(new ArrayBuffer(4));
var l = {};
function Ws(s) {
  Object.keys(s).forEach((e) => l._free(s[e]));
}
m && (globalThis.Worker = N("worker_threads").Worker);
var Te;
var Bt;
var As;
var Je;
Te = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakSet(), As = function(t) {
  m ? t.on("message", (r) => {
    a(this, Je).call(this, t, r);
  }) : t.onmessage = (r) => a(this, Je).call(this, t, r.data);
}, Je = /* @__PURE__ */ new WeakMap();
var ae;
var ze;
var ie;
var Xe;
ae = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakMap();
var Jt = ne(It());
m && (globalThis.Worker = N("worker_threads").Worker);
var Pe;
var le;
var _e;
var qt;
var Is;
var Vt;
var Us;
var Ht;
var Cs;
var Ge;
Pe = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakSet(), Is = async function(t) {
  d(this, le, await navigator.serviceWorker.register(t)), await navigator.serviceWorker.ready, window.addEventListener("beforeunload", () => {
    var n;
    (n = a(this, le)) == null || n.unregister();
  });
  let r = await new Promise((n) => {
    navigator.serviceWorker.addEventListener("message", function o(i) {
      i.data.type === "registration-successful" && (navigator.serviceWorker.removeEventListener("message", o), n(i.data.clientId));
    }), this.activeRegistration().postMessage({ type: "register-client-main" });
  });
  return navigator.serviceWorker.addEventListener("message", (n) => {
    v(this, Vt, Us).call(this, n);
  }), r;
}, Vt = /* @__PURE__ */ new WeakSet(), Us = async function(t) {
  if (t.data.type === "request") {
    let r = t.data.data, n = a(this, Pe).get(r);
    if (!n)
      throw new _("Request not found during service worker XHR request");
    switch (a(this, Pe).delete(r), n.type) {
      case "read": {
        let o = await this.inputQueue.get();
        this.activeRegistration().postMessage({ type: "wasm-webr-fetch-response", uuid: r, response: Fe(r, o) });
        break;
      }
      case "interrupt": {
        let o = a(this, _e);
        this.activeRegistration().postMessage({ type: "wasm-webr-fetch-response", uuid: r, response: Fe(r, o) }), this.inputQueue.reset(), d(this, _e, false);
        break;
      }
      default:
        throw new _(`Unsupported request type '${n.type}'.`);
    }
    return;
  }
}, Ht = /* @__PURE__ */ new WeakSet(), Cs = function(t) {
  m ? t.on("message", (r) => {
    a(this, Ge).call(this, t, r);
  }) : t.onmessage = (r) => a(this, Ge).call(this, t, r.data);
}, Ge = /* @__PURE__ */ new WeakMap();
var Se;
var $e;
var Ke;
var Qe;
var Ze;
var Ye;
Se = /* @__PURE__ */ new WeakMap(), $e = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakMap();
m && (globalThis.Worker = N("worker_threads").Worker);
var Me;
var zt;
var js;
var tt;
Me = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakSet(), js = function(t) {
  m ? t.on("message", (r) => {
    a(this, tt).call(this, t, r);
  }) : t.onmessage = (r) => a(this, tt).call(this, t, r.data);
}, tt = /* @__PURE__ */ new WeakMap();
var ke;
var De;
var rt;
var ce;
var Xt;
ke = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap();
var I = { Automatic: 0, SharedArrayBuffer: 1, ServiceWorker: 2, PostMessage: 3 };
var Ls = m ? __dirname + "/" : "https://webr.r-wasm.org/v0.3.1/";
var Bs = "https://repo.r-wasm.org";
var f = { null: 0, symbol: 1, pairlist: 2, closure: 3, environment: 4, promise: 5, call: 6, special: 7, builtin: 8, string: 9, logical: 10, integer: 13, double: 14, complex: 15, character: 16, dots: 17, any: 18, list: 19, expression: 20, bytecode: 21, pointer: 22, weakref: 23, raw: 24, s4: 25, new: 30, free: 31, function: 99 };
function Lr(s) {
  return !!s && typeof s == "object" && Object.keys(f).includes(s.type);
}
function st(s) {
  return !!s && typeof s == "object" && "re" in s && "im" in s;
}
function nt(s) {
  return l._Rf_protect(J(s)), s;
}
function x(s, e) {
  return l._Rf_protect(J(s)), ++e.n, s;
}
function qs(s) {
  let e = l._malloc(4);
  return l._R_ProtectWithIndex(J(s), e), { loc: l.getValue(e, "i32"), ptr: e };
}
function Vs(s) {
  l._Rf_unprotect(1), l._free(s.ptr);
}
function Hs(s, e) {
  return l._R_Reprotect(J(s), e.loc), s;
}
function E(s) {
  l._Rf_unprotect(s);
}
function Br(s, e, t) {
  l._Rf_defineVar(J(e), J(t), J(s));
}
function Fr(s, e) {
  let t = {}, r = { n: 0 };
  try {
    let n = new at(e);
    x(n, r), t.code = l.allocateUTF8(s);
    let o = l._R_ParseEvalString(t.code, n.ptr);
    return y.wrap(o);
  } finally {
    Ws(t), E(r.n);
  }
}
function ot(s, e) {
  return l.getWasmTableEntry(l.GOT.ffi_safe_eval.value)(J(s), J(e));
}
function J(s) {
  return Qt(s) ? s.ptr : s;
}
function de(s, e) {
  if (l._TYPEOF(s.ptr) !== f[e])
    throw new Error(`Unexpected object type "${s.type()}" when expecting type "${e}"`);
}
function Js(s) {
  if (Lr(s))
    return new (zs(f[s.type]))(s);
  if (s && typeof s == "object" && "type" in s && s.type === "null")
    return new Kt();
  if (s === null)
    return new ee({ type: "logical", names: null, values: [null] });
  if (typeof s == "boolean")
    return new ee(s);
  if (typeof s == "number")
    return new We(s);
  if (typeof s == "string")
    return new z(s);
  if (st(s))
    return new it(s);
  if (ArrayBuffer.isView(s) || s instanceof ArrayBuffer)
    return new lt(s);
  if (Array.isArray(s))
    return ao(s);
  if (typeof s == "object")
    return te.fromObject(s);
  throw new Error("Robj construction for this JS object is not yet supported");
}
function ao(s) {
  let e = { n: 0 };
  if (s.every((r) => r && typeof r == "object" && !Qt(r) && !st(r))) {
    let r = s, n = r.every((i) => Object.keys(i).filter((c) => !Object.keys(r[0]).includes(c)).length === 0 && Object.keys(r[0]).filter((c) => !Object.keys(i).includes(c)).length === 0), o = r.every((i) => Object.values(i).every((c) => Gs(c) || Xs(c)));
    if (n && o)
      return te.fromD3(r);
  }
  if (s.every((r) => typeof r == "boolean" || r === null))
    return new ee(s);
  if (s.every((r) => typeof r == "number" || r === null))
    return new We(s);
  if (s.every((r) => typeof r == "string" || r === null))
    return new z(s);
  try {
    let r = new K([new j("c"), ...s]);
    return x(r, e), r.eval();
  } finally {
    E(e.n);
  }
}
var T = class {
  constructor(e) {
    this.ptr = e;
  }
  type() {
    let e = l._TYPEOF(this.ptr);
    return Object.keys(f).find((r) => f[r] === e);
  }
};
var Ae;
var Gt;
var ue = class extends T {
  constructor(t) {
    if (!(t instanceof T))
      return Js(t);
    super(t.ptr);
    u(this, Ae);
  }
  static wrap(t) {
    let r = l._TYPEOF(t);
    return new (zs(r))(new T(t));
  }
  get [Symbol.toStringTag]() {
    return `RObject:${this.type()}`;
  }
  static getPersistentObject(t) {
    return W[t];
  }
  getPropertyValue(t) {
    return this[t];
  }
  inspect() {
    Fr(".Internal(inspect(x))", { x: this });
  }
  isNull() {
    return l._TYPEOF(this.ptr) === f.null;
  }
  isNa() {
    try {
      let t = Fr("is.na(x)", { x: this });
      return nt(t), t.toBoolean();
    } finally {
      E(1);
    }
  }
  isUnbound() {
    return this.ptr === W.unboundValue.ptr;
  }
  attrs() {
    return pe.wrap(l._ATTRIB(this.ptr));
  }
  setNames(t) {
    let r;
    if (t === null)
      r = W.null;
    else if (Array.isArray(t) && t.every((n) => typeof n == "string" || n === null))
      r = new z(t);
    else
      throw new Error("Argument to setNames must be null or an Array of strings or null");
    return l._Rf_setAttrib(this.ptr, W.namesSymbol.ptr, r.ptr), this;
  }
  names() {
    let t = z.wrap(l._Rf_getAttrib(this.ptr, W.namesSymbol.ptr));
    return t.isNull() ? null : t.toArray();
  }
  includes(t) {
    let r = this.names();
    return r && r.includes(t);
  }
  toJs(t = { depth: 0 }, r = 1) {
    throw new Error("This R object cannot be converted to JS");
  }
  subset(t) {
    return v(this, Ae, Gt).call(this, t, W.bracketSymbol.ptr);
  }
  get(t) {
    return v(this, Ae, Gt).call(this, t, W.bracket2Symbol.ptr);
  }
  getDollar(t) {
    return v(this, Ae, Gt).call(this, t, W.dollarSymbol.ptr);
  }
  pluck(...t) {
    let r = qs(W.null);
    try {
      let n = (i, c) => {
        let p = i.get(c);
        return Hs(p, r);
      }, o = t.reduce(n, this);
      return o.isNull() ? void 0 : o;
    } finally {
      Vs(r);
    }
  }
  set(t, r) {
    let n = { n: 0 };
    try {
      let o = new ue(t);
      x(o, n);
      let i = new ue(r);
      x(i, n);
      let c = new j("[[<-"), p = l._Rf_lang4(c.ptr, this.ptr, o.ptr, i.ptr);
      return x(p, n), ue.wrap(ot(p, W.baseEnv));
    } finally {
      E(n.n);
    }
  }
  static getMethods(t) {
    let r = /* @__PURE__ */ new Set(), n = t;
    do
      Object.getOwnPropertyNames(n).map((o) => r.add(o));
    while (n = Object.getPrototypeOf(n));
    return [...r.keys()].filter((o) => typeof t[o] == "function");
  }
};
var y = ue;
Ae = /* @__PURE__ */ new WeakSet(), Gt = function(t, r) {
  let n = { n: 0 };
  try {
    let o = new ue(t);
    x(o, n);
    let i = l._Rf_lang3(r, this.ptr, o.ptr);
    return x(i, n), ue.wrap(ot(i, W.baseEnv));
  } finally {
    E(n.n);
  }
};
var Kt = class extends y {
  constructor() {
    return super(new T(l.getValue(l._R_NilValue, "*"))), this;
  }
  toJs() {
    return { type: "null" };
  }
};
var j = class extends y {
  constructor(e) {
    if (e instanceof T) {
      de(e, "symbol"), super(e);
      return;
    }
    let t = l.allocateUTF8(e);
    try {
      super(new T(l._Rf_install(t)));
    } finally {
      l._free(t);
    }
  }
  toJs() {
    let e = this.toObject();
    return { type: "symbol", printname: e.printname, symvalue: e.symvalue, internal: e.internal };
  }
  toObject() {
    return { printname: this.printname().isUnbound() ? null : this.printname().toString(), symvalue: this.symvalue().isUnbound() ? null : this.symvalue().ptr, internal: this.internal().isNull() ? null : this.internal().ptr };
  }
  toString() {
    return this.printname().toString();
  }
  printname() {
    return ct.wrap(l._PRINTNAME(this.ptr));
  }
  symvalue() {
    return y.wrap(l._SYMVALUE(this.ptr));
  }
  internal() {
    return y.wrap(l._INTERNAL(this.ptr));
  }
};
var pe = class extends y {
  constructor(e) {
    if (e instanceof T)
      return de(e, "pairlist"), super(e), this;
    let t = { n: 0 };
    try {
      let { names: r, values: n } = Ie(e), o = pe.wrap(l._Rf_allocList(n.length));
      x(o, t);
      for (let [i, c] = [0, o]; !c.isNull(); [i, c] = [i + 1, c.cdr()])
        c.setcar(new y(n[i]));
      o.setNames(r), super(o);
    } finally {
      E(t.n);
    }
  }
  get length() {
    return this.toArray().length;
  }
  toArray(e = { depth: 1 }) {
    return this.toJs(e).values;
  }
  toObject({ allowDuplicateKey: e = true, allowEmptyKey: t = false, depth: r = -1 } = {}) {
    let n = this.entries({ depth: r }), o = n.map(([i]) => i);
    if (!e && new Set(o).size !== o.length)
      throw new Error("Duplicate key when converting pairlist without allowDuplicateKey enabled");
    if (!t && o.some((i) => !i))
      throw new Error("Empty or null key when converting pairlist without allowEmptyKey enabled");
    return Object.fromEntries(n.filter((i, c) => n.findIndex((p) => p[0] === i[0]) === c));
  }
  entries(e = { depth: 1 }) {
    let t = this.toJs(e);
    return t.values.map((r, n) => [t.names ? t.names[n] : null, r]);
  }
  toJs(e = { depth: 0 }, t = 1) {
    let r = [], n = false, o = [];
    for (let c = this; !c.isNull(); c = c.cdr()) {
      let p = c.tag();
      p.isNull() ? r.push("") : (n = true, r.push(p.toString())), e.depth && t >= e.depth ? o.push(c.car()) : o.push(c.car().toJs(e, t + 1));
    }
    return { type: "pairlist", names: n ? r : null, values: o };
  }
  includes(e) {
    return e in this.toObject();
  }
  setcar(e) {
    l._SETCAR(this.ptr, e.ptr);
  }
  car() {
    return y.wrap(l._CAR(this.ptr));
  }
  cdr() {
    return y.wrap(l._CDR(this.ptr));
  }
  tag() {
    return y.wrap(l._TAG(this.ptr));
  }
};
var K = class extends y {
  constructor(e) {
    if (e instanceof T)
      return de(e, "call"), super(e), this;
    let t = { n: 0 };
    try {
      let { values: r } = Ie(e), n = r.map((i) => x(new y(i), t)), o = K.wrap(l._Rf_allocVector(f.call, r.length));
      x(o, t);
      for (let [i, c] = [0, o]; !c.isNull(); [i, c] = [i + 1, c.cdr()])
        c.setcar(n[i]);
      super(o);
    } finally {
      E(t.n);
    }
  }
  setcar(e) {
    l._SETCAR(this.ptr, e.ptr);
  }
  car() {
    return y.wrap(l._CAR(this.ptr));
  }
  cdr() {
    return y.wrap(l._CDR(this.ptr));
  }
  eval() {
    return l.webr.evalR(this, { env: W.baseEnv });
  }
  capture(e = {}) {
    return l.webr.captureR(this, e);
  }
  deparse() {
    let e = { n: 0 };
    try {
      let t = l._Rf_lang2(new j("deparse1").ptr, l._Rf_lang2(new j("quote").ptr, this.ptr));
      x(t, e);
      let r = z.wrap(ot(t, W.baseEnv));
      return x(r, e), r.toString();
    } finally {
      E(e.n);
    }
  }
};
var te = class extends y {
  constructor(t) {
    var e = (...args) => {
      super(...args);
    };
    if (t instanceof T) {
      de(t, "list"), e(t);
      let n = pe.wrap(l._ATTRIB(t.ptr)).get("class");
      return this.isDataFrame = !n.isNull() && n.toArray().includes("data.frame"), this;
    }
    let r = { n: 0 };
    try {
      let { names: n, values: o } = Ie(t), i = l._Rf_allocVector(f.list, o.length);
      x(i, r), o.forEach((c, p) => {
        l._SET_VECTOR_ELT(i, p, new y(c).ptr);
      }), y.wrap(i).setNames(n), e(new T(i));
    } finally {
      E(r.n);
    }
    this.isDataFrame = false;
  }
  get length() {
    return l._LENGTH(this.ptr);
  }
  toArray(t = { depth: 1 }) {
    return this.toJs(t).values;
  }
  toObject({ allowDuplicateKey: t = true, allowEmptyKey: r = false, depth: n = -1 } = {}) {
    let o = this.entries({ depth: n }), i = o.map(([c]) => c);
    if (!t && new Set(i).size !== i.length)
      throw new Error("Duplicate key when converting list without allowDuplicateKey enabled");
    if (!r && i.some((c) => !c))
      throw new Error("Empty or null key when converting list without allowEmptyKey enabled");
    return Object.fromEntries(o.filter((c, p) => o.findIndex((P) => P[0] === c[0]) === p));
  }
  toD3() {
    if (!this.isDataFrame)
      throw new Error("Can't convert R list object to D3 format. Object must be of class 'data.frame'.");
    return this.entries().reduce((r, n) => (n[1].forEach((o, i) => r[i] = Object.assign(r[i] || {}, { [n[0]]: o })), r), []);
  }
  static fromObject(t) {
    let { names: r, values: n } = Ie(t), o = { n: 0 };
    try {
      let i = !!r && r.length > 0 && r.every((p) => p), c = n.length > 0 && n.every((p) => Array.isArray(p) || ArrayBuffer.isView(p) || p instanceof ArrayBuffer);
      if (i && c) {
        let p = n, P = p.every((k) => k.length === p[0].length), M = p.every((k) => Gs(k[0]) || Xs(k[0]));
        if (P && M) {
          let k = new te({ type: "list", names: r, values: p.map((Ys) => Js(Ys)) });
          x(k, o);
          let $r = new K([new j("as.data.frame"), k]);
          return x($r, o), $r.eval();
        }
      }
    } finally {
      E(o.n);
    }
    return new te(t);
  }
  static fromD3(t) {
    return this.fromObject(Object.fromEntries(Object.keys(t[0]).map((r) => [r, t.map((n) => n[r])])));
  }
  entries(t = { depth: -1 }) {
    let r = this.toJs(t);
    return this.isDataFrame && t.depth < 0 && (r.values = r.values.map((n) => n.toArray())), r.values.map((n, o) => [r.names ? r.names[o] : null, n]);
  }
  toJs(t = { depth: 0 }, r = 1) {
    return { type: "list", names: this.names(), values: [...Array(this.length).keys()].map((n) => t.depth && r >= t.depth ? this.get(n + 1) : this.get(n + 1).toJs(t, r + 1)) };
  }
};
var Oe = class extends y {
  exec(...e) {
    let t = { n: 0 };
    try {
      let r = new K([this, ...e]);
      return x(r, t), r.eval();
    } finally {
      E(t.n);
    }
  }
  capture(e = {}, ...t) {
    let r = { n: 0 };
    try {
      let n = new K([this, ...t]);
      return x(n, r), n.capture(e);
    } finally {
      E(r.n);
    }
  }
};
var ct = class extends y {
  constructor(e) {
    if (e instanceof T) {
      de(e, "string"), super(e);
      return;
    }
    let t = l.allocateUTF8(e);
    try {
      super(new T(l._Rf_mkChar(t)));
    } finally {
      l._free(t);
    }
  }
  toString() {
    return l.UTF8ToString(l._R_CHAR(this.ptr));
  }
  toJs() {
    return { type: "string", value: this.toString() };
  }
};
var at = class extends y {
  constructor(e = {}) {
    if (e instanceof T)
      return de(e, "environment"), super(e), this;
    let t = 0;
    try {
      let { names: r, values: n } = Ie(e), o = nt(l._R_NewEnv(W.globalEnv.ptr, 0, 0));
      ++t, n.forEach((i, c) => {
        let p = r ? r[c] : null;
        if (!p)
          throw new Error("Can't create object in new environment with empty symbol name");
        let P = new j(p), M = nt(new y(i));
        try {
          Br(o, P, M);
        } finally {
          E(1);
        }
      }), super(new T(o));
    } finally {
      E(t);
    }
  }
  ls(e = false, t = true) {
    return z.wrap(l._R_lsInternal3(this.ptr, Number(e), Number(t))).toArray();
  }
  bind(e, t) {
    let r = new j(e), n = nt(new y(t));
    try {
      Br(this, r, n);
    } finally {
      E(1);
    }
  }
  names() {
    return this.ls(true, true);
  }
  frame() {
    return y.wrap(l._FRAME(this.ptr));
  }
  subset(e) {
    if (typeof e == "number")
      throw new Error("Object of type environment is not subsettable");
    return this.getDollar(e);
  }
  toObject({ depth: e = -1 } = {}) {
    let t = this.names();
    return Object.fromEntries([...Array(t.length).keys()].map((r) => {
      let n = this.getDollar(t[r]);
      return [t[r], e < 0 ? n : n.toJs({ depth: e })];
    }));
  }
  toJs(e = { depth: 0 }, t = 1) {
    let r = this.names(), n = [...Array(r.length).keys()].map((o) => e.depth && t >= e.depth ? this.getDollar(r[o]) : this.getDollar(r[o]).toJs(e, t + 1));
    return { type: "environment", names: r, values: n };
  }
};
var re = class extends y {
  constructor(e, t, r) {
    if (e instanceof T)
      return de(e, t), super(e), this;
    let n = { n: 0 };
    try {
      let { names: o, values: i } = Ie(e), c = l._Rf_allocVector(f[t], i.length);
      x(c, n), i.forEach(r(c)), y.wrap(c).setNames(o), super(new T(c));
    } finally {
      E(n.n);
    }
  }
  get length() {
    return l._LENGTH(this.ptr);
  }
  get(e) {
    return super.get(e);
  }
  subset(e) {
    return super.subset(e);
  }
  getDollar() {
    throw new Error("$ operator is invalid for atomic vectors");
  }
  detectMissing() {
    let e = { n: 0 };
    try {
      let t = l._Rf_lang2(new j("is.na").ptr, this.ptr);
      x(t, e);
      let r = ee.wrap(ot(t, W.baseEnv));
      x(r, e);
      let n = r.toTypedArray();
      return Array.from(n).map((o) => !!o);
    } finally {
      E(e.n);
    }
  }
  toArray() {
    let e = this.toTypedArray();
    return this.detectMissing().map((t, r) => t ? null : e[r]);
  }
  toObject({ allowDuplicateKey: e = true, allowEmptyKey: t = false } = {}) {
    let r = this.entries(), n = r.map(([o]) => o);
    if (!e && new Set(n).size !== n.length)
      throw new Error("Duplicate key when converting atomic vector without allowDuplicateKey enabled");
    if (!t && n.some((o) => !o))
      throw new Error("Empty or null key when converting atomic vector without allowEmptyKey enabled");
    return Object.fromEntries(r.filter((o, i) => r.findIndex((c) => c[0] === o[0]) === i));
  }
  entries() {
    let e = this.toArray(), t = this.names();
    return e.map((r, n) => [t ? t[n] : null, r]);
  }
  toJs() {
    return { type: this.type(), names: this.names(), values: this.toArray() };
  }
};
var Zt;
var qr = class extends re {
  constructor(e) {
    super(e, "logical", a(qr, Zt));
  }
  getBoolean(e) {
    return this.get(e).toArray()[0];
  }
  toBoolean() {
    if (this.length !== 1)
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getBoolean(1);
    if (e === null)
      throw new Error("Can't convert missing value `NA` to a JS boolean");
    return e;
  }
  toTypedArray() {
    return new Int32Array(l.HEAP32.subarray(l._LOGICAL(this.ptr) / 4, l._LOGICAL(this.ptr) / 4 + this.length));
  }
  toArray() {
    let e = this.toTypedArray();
    return this.detectMissing().map((t, r) => t ? null : !!e[r]);
  }
};
var ee = qr;
Zt = /* @__PURE__ */ new WeakMap(), u(ee, Zt, (e) => {
  let t = l._LOGICAL(e), r = l.getValue(l._R_NaInt, "i32");
  return (n, o) => {
    l.setValue(t + 4 * o, n === null ? r : !!n, "i32");
  };
});
var Yt;
var Vr = class extends re {
  constructor(e) {
    super(e, "integer", a(Vr, Yt));
  }
  getNumber(e) {
    return this.get(e).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1)
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getNumber(1);
    if (e === null)
      throw new Error("Can't convert missing value `NA` to a JS number");
    return e;
  }
  toTypedArray() {
    return new Int32Array(l.HEAP32.subarray(l._INTEGER(this.ptr) / 4, l._INTEGER(this.ptr) / 4 + this.length));
  }
};
var $t = Vr;
Yt = /* @__PURE__ */ new WeakMap(), u($t, Yt, (e) => {
  let t = l._INTEGER(e), r = l.getValue(l._R_NaInt, "i32");
  return (n, o) => {
    l.setValue(t + 4 * o, n === null ? r : Math.round(Number(n)), "i32");
  };
});
var er;
var Hr = class extends re {
  constructor(e) {
    super(e, "double", a(Hr, er));
  }
  getNumber(e) {
    return this.get(e).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1)
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getNumber(1);
    if (e === null)
      throw new Error("Can't convert missing value `NA` to a JS number");
    return e;
  }
  toTypedArray() {
    return new Float64Array(l.HEAPF64.subarray(l._REAL(this.ptr) / 8, l._REAL(this.ptr) / 8 + this.length));
  }
};
var We = Hr;
er = /* @__PURE__ */ new WeakMap(), u(We, er, (e) => {
  let t = l._REAL(e), r = l.getValue(l._R_NaReal, "double");
  return (n, o) => {
    l.setValue(t + 8 * o, n === null ? r : n, "double");
  };
});
var tr;
var Jr = class extends re {
  constructor(e) {
    super(e, "complex", a(Jr, tr));
  }
  getComplex(e) {
    return this.get(e).toArray()[0];
  }
  toComplex() {
    if (this.length !== 1)
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getComplex(1);
    if (e === null)
      throw new Error("Can't convert missing value `NA` to a JS object");
    return e;
  }
  toTypedArray() {
    return new Float64Array(l.HEAPF64.subarray(l._COMPLEX(this.ptr) / 8, l._COMPLEX(this.ptr) / 8 + 2 * this.length));
  }
  toArray() {
    let e = this.toTypedArray();
    return this.detectMissing().map((t, r) => t ? null : { re: e[2 * r], im: e[2 * r + 1] });
  }
};
var it = Jr;
tr = /* @__PURE__ */ new WeakMap(), u(it, tr, (e) => {
  let t = l._COMPLEX(e), r = l.getValue(l._R_NaReal, "double");
  return (n, o) => {
    l.setValue(t + 8 * (2 * o), n === null ? r : n.re, "double"), l.setValue(t + 8 * (2 * o + 1), n === null ? r : n.im, "double");
  };
});
var rr;
var zr = class extends re {
  constructor(e) {
    super(e, "character", a(zr, rr));
  }
  getString(e) {
    return this.get(e).toArray()[0];
  }
  toString() {
    if (this.length !== 1)
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getString(1);
    if (e === null)
      throw new Error("Can't convert missing value `NA` to a JS string");
    return e;
  }
  toTypedArray() {
    return new Uint32Array(l.HEAPU32.subarray(l._STRING_PTR(this.ptr) / 4, l._STRING_PTR(this.ptr) / 4 + this.length));
  }
  toArray() {
    return this.detectMissing().map((e, t) => e ? null : l.UTF8ToString(l._R_CHAR(l._STRING_ELT(this.ptr, t))));
  }
};
var z = zr;
rr = /* @__PURE__ */ new WeakMap(), u(z, rr, (e) => (t, r) => {
  t === null ? l._SET_STRING_ELT(e, r, W.naString.ptr) : l._SET_STRING_ELT(e, r, new ct(t).ptr);
});
var sr;
var Xr = class extends re {
  constructor(e) {
    e instanceof ArrayBuffer && (e = new Uint8Array(e)), super(e, "raw", a(Xr, sr));
  }
  getNumber(e) {
    return this.get(e).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1)
      throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getNumber(1);
    if (e === null)
      throw new Error("Can't convert missing value `NA` to a JS number");
    return e;
  }
  toTypedArray() {
    return new Uint8Array(l.HEAPU8.subarray(l._RAW(this.ptr), l._RAW(this.ptr) + this.length));
  }
};
var lt = Xr;
sr = /* @__PURE__ */ new WeakMap(), u(lt, sr, (e) => {
  let t = l._RAW(e);
  return (r, n) => {
    l.setValue(t + n, Number(r), "i8");
  };
});
function Ie(s) {
  return Lr(s) ? s : Array.isArray(s) || ArrayBuffer.isView(s) ? { names: null, values: s } : s && typeof s == "object" && !st(s) ? { names: Object.keys(s), values: Object.values(s) } : { names: null, values: [s] };
}
function zs(s) {
  let e = { [f.null]: Kt, [f.symbol]: j, [f.pairlist]: pe, [f.closure]: Oe, [f.environment]: at, [f.call]: K, [f.special]: Oe, [f.builtin]: Oe, [f.string]: ct, [f.logical]: ee, [f.integer]: $t, [f.double]: We, [f.complex]: it, [f.character]: z, [f.list]: te, [f.raw]: lt, [f.function]: Oe };
  return s in e ? e[s] : y;
}
function Qt(s) {
  return s instanceof y;
}
function Xs(s) {
  let e = ["logical", "integer", "double", "complex", "character"];
  return Qt(s) && e.includes(s.type()) || Qt(s) && s.isNa();
}
function Gs(s) {
  return s === null || typeof s == "number" || typeof s == "boolean" || typeof s == "string" || st(s);
}
var W;
var ut;
var pt;
var dt;
var ht;
var yt;
var nr;
var or;
var ar;
var ir;
var lr;
var cr;
var Ks;
ut = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), nr = /* @__PURE__ */ new WeakMap(), or = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakSet(), Ks = async function() {
  for (; ; ) {
    let e = await this.webR.read();
    switch (e.type) {
      case "stdout":
        a(this, ut).call(this, e.data);
        break;
      case "stderr":
        a(this, pt).call(this, e.data);
        break;
      case "prompt":
        a(this, dt).call(this, e.data);
        break;
      case "canvas":
        e.data.event === "canvasImage" ? a(this, ht).call(this, e.data.image) : e.data.event === "canvasNewPage" && a(this, yt).call(this);
        break;
      case "closed":
        return;
      default:
        console.warn(`Unhandled output type for webR Console: ${e.type}.`);
    }
  }
};
var po = { FONTCONFIG_PATH: "/etc/fonts", R_HOME: "/usr/lib/R", R_ENABLE_JIT: "0" };
var Qs = { RArgs: [], REnv: po, baseUrl: Ls, serviceWorkerUrl: "", repoUrl: Bs, homedir: "/home/web_user", interactive: true, channelType: I.Automatic, createLazyFilesystem: true };
var g;
var ft;
var dr;
var Zs;
g = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), dr = /* @__PURE__ */ new WeakSet(), Zs = async function() {
  for (; ; ) {
    let e = await a(this, g).readSystem();
    switch (e.type) {
      case "setTimeoutWasm":
        setTimeout((t, r) => {
          this.invokeWasmFunction(t, ...r);
        }, e.data.delay, e.data.ptr, e.data.args);
        break;
      case "console.log":
        console.log(e.data);
        break;
      case "console.warn":
        console.warn(e.data);
        break;
      case "console.error":
        console.error(e.data);
        break;
      default:
        throw new U("Unknown system message type `" + e.type + "`");
    }
  }
};
var b;
var R;
var Rt;
b = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap();

// src/messageporthttp.ts
async function fetchASGI(client, resource, init, filter = (bodyChunk) => bodyChunk) {
  if (typeof resource === "string" || typeof init !== "undefined") {
    resource = new Request(resource, init);
  }
  const channel = new MessageChannel();
  const clientPort = channel.port1;
  client.postMessage(
    {
      type: "makeRequest",
      scope: reqToASGI(resource)
    },
    [channel.port2]
  );
  const blob = await resource.blob();
  if (!blob.size) {
    clientPort.postMessage({
      type: "http.request",
      more_body: false
    });
  } else {
    const reader = blob.stream().getReader();
    try {
      while (true) {
        const { value: theChunk, done } = await reader.read();
        clientPort.postMessage({
          type: "http.request",
          body: theChunk,
          more_body: !done
        });
        if (done) {
          break;
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
  return new Promise((resolve) => {
    let streamController;
    const readableStream = new ReadableStream({
      start(controller) {
        streamController = controller;
      },
      cancel(reason) {
      }
    });
    let response;
    clientPort.addEventListener("message", (event) => {
      const msg = event.data;
      if (msg.type === "http.response.start") {
        response = asgiToRes(msg, readableStream);
        resolve(response);
      } else if (msg.type === "http.response.body") {
        if (msg.body) {
          streamController.enqueue(filter(msg.body, response));
        }
        if (!msg.more_body) {
          streamController.close();
          clientPort.close();
        }
      } else {
        throw new Error("Unexpected event type from clientPort: " + msg.type);
      }
    });
    clientPort.start();
  });
}
function headersToASGI(headers) {
  const result = [];
  for (const [key, value] of headers.entries()) {
    result.push([key, value]);
  }
  return result;
}
function reqToASGI(req) {
  const url = new URL(req.url);
  return {
    type: "http",
    asgi: {
      version: "3.0",
      spec_version: "2.1"
    },
    http_version: "1.1",
    method: req.method,
    scheme: url.protocol.replace(/:$/, ""),
    path: url.pathname,
    query_string: url.search.replace(/^\?/, ""),
    root_path: "",
    headers: headersToASGI(req.headers)
  };
}
function asgiToRes(res, body) {
  return new Response(body, {
    headers: res.headers,
    status: res.status
  });
}

// src/shinylive-sw.ts
var useCaching = false;
var cacheName = "::shinyliveServiceworker";
var version = "v8";
function addCoiHeaders(resp) {
  const headers = new Headers(resp.headers);
  headers.set("Cross-Origin-Embedder-Policy", "credentialless");
  headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers
  });
}
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([self.skipWaiting(), caches.open(version + cacheName)])
  );
});
self.addEventListener("activate", function(event) {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      const keys = await caches.keys();
      return Promise.all(
        keys.filter(function(key) {
          return key.indexOf(version + cacheName) !== 0;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })()
  );
});
self.addEventListener("fetch", function(event) {
  const request = event.request;
  const url = new URL(request.url);
  if (self.location.origin !== url.origin)
    return;
  if (url.pathname == "/esbuild")
    return;
  const base_path = dirname(self.location.pathname);
  if (url.pathname == `${base_path}/shinylive-inject-socket.js`) {
    event.respondWith(
      new Response(shinylive_inject_socket_default, {
        headers: { "Content-Type": "text/javascript" },
        status: 200
      })
    );
    return;
  }
  const coiRequested = url.searchParams.get("coi") === "1" || request.referrer.includes("coi=1");
  const appPathRegex = /.*\/(app_[^/]+\/)/;
  const m_appPath = appPathRegex.exec(url.pathname);
  if (m_appPath) {
    event.respondWith(
      (async () => {
        let pollCount = 5;
        while (!apps[m_appPath[1]]) {
          if (pollCount == 0) {
            return new Response(
              `Couldn't find parent page for ${url}. This may be because the Service Worker has updated. Try reloading the page.`,
              {
                status: 404
              }
            );
          }
          console.log("App URL not registered. Waiting 50ms.");
          await sleep(50);
          pollCount--;
        }
        url.pathname = url.pathname.replace(appPathRegex, "/");
        const isAppRoot = url.pathname === "/";
        const filter = isAppRoot ? injectSocketFilter : identityFilter;
        const blob = await request.blob();
        const resp = await fetchASGI(
          apps[m_appPath[1]],
          new Request(url.toString(), {
            method: request.method,
            headers: request.headers,
            body: request.method === "GET" || request.method === "HEAD" ? void 0 : blob,
            credentials: request.credentials,
            cache: request.cache,
            redirect: request.redirect,
            referrer: request.referrer
          }),
          void 0,
          filter
        );
        if (coiRequested) {
          return addCoiHeaders(resp);
        } else {
          return resp;
        }
      })()
    );
    return;
  }
  if (request.method !== "GET") {
    return;
  }
  if (useCaching) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        try {
          const networkResponse = addCoiHeaders(await fetch(request));
          const baseUrl = self.location.origin + dirname(self.location.pathname);
          if (request.url.startsWith(baseUrl + "/shinylive/") || request.url === baseUrl + "/favicon.ico") {
            const cache = await caches.open(version + cacheName);
            await cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return new Response("Failed to find in cache, or fetch.", {
            status: 404
          });
        }
      })()
    );
    return;
  }
  event.respondWith(
    (async () => {
      const resp = await fetch(request);
      if (coiRequested) {
        return addCoiHeaders(resp);
      } else {
        return resp;
      }
    })()
  );
});
var apps = {};
(async () => {
  const allClients = await self.clients.matchAll();
  for (const client of allClients) {
    client.postMessage({
      type: "serviceworkerStart"
    });
  }
})();
self.addEventListener("message", (event) => {
  const msg = event.data;
  if (msg.type === "configureProxyPath") {
    const path = msg.path;
    const port = event.ports[0];
    apps[path] = port;
  }
});
function identityFilter(bodyChunk, response) {
  return bodyChunk;
}
function injectSocketFilter(bodyChunk, response) {
  const contentType = response.headers.get("content-type");
  if (contentType && /^text\/html(;|$)/.test(contentType)) {
    const bodyChunkStr = uint8ArrayToString(bodyChunk);
    const base_path = dirname(self.location.pathname);
    const newStr = bodyChunkStr.replace(
      /<\/head>/,
      `<script src="${base_path}/shinylive-inject-socket.js" type="module"><\/script>
</head>`
    );
    const newChunk = Uint8Array.from(
      newStr.split("").map((s) => s.charCodeAt(0))
    );
    return newChunk;
  }
  return bodyChunk;
}
