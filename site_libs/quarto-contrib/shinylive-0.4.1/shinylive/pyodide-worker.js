// Shinylive 0.4.1
// Copyright 2024 Posit, PBC
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a2, b3) => (typeof require !== "undefined" ? require : a2)[b3]
}) : x2)(function(x2) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module2) {
    "use strict";
    module2.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// src/awaitable-queue.ts
var AwaitableQueue = class {
  constructor() {
    this._buffer = [];
    this._resolve = null;
    this._promise = null;
    this._notifyAll();
  }
  async _wait() {
    await this._promise;
  }
  _notifyAll() {
    if (this._resolve) {
      this._resolve();
    }
    this._promise = new Promise((resolve) => this._resolve = resolve);
  }
  async dequeue() {
    while (this._buffer.length === 0) {
      await this._wait();
    }
    return this._buffer.shift();
  }
  enqueue(x2) {
    this._buffer.push(x2);
    this._notifyAll();
  }
};

// src/utils.ts
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
var Ue = D((C2) => {
  "use strict";
  Object.defineProperty(C2, "__esModule", { value: true });
  C2.getUint64 = C2.getInt64 = C2.setInt64 = C2.setUint64 = C2.UINT32_MAX = void 0;
  C2.UINT32_MAX = 4294967295;
  function un(s, e, t) {
    let r = t / 4294967296, n = t;
    s.setUint32(e, r), s.setUint32(e + 4, n);
  }
  C2.setUint64 = un;
  function pn(s, e, t) {
    let r = Math.floor(t / 4294967296), n = t;
    s.setUint32(e, r), s.setUint32(e + 4, n);
  }
  C2.setInt64 = pn;
  function dn(s, e) {
    let t = s.getInt32(e), r = s.getUint32(e + 4);
    return t * 4294967296 + r;
  }
  C2.getInt64 = dn;
  function hn(s, e) {
    let t = s.getUint32(e), r = s.getUint32(e + 4);
    return t * 4294967296 + r;
  }
  C2.getUint64 = hn;
});
var xt = D((O2) => {
  "use strict";
  var fr, Rr, mr;
  Object.defineProperty(O2, "__esModule", { value: true });
  O2.utf8DecodeTD = O2.TEXT_DECODER_THRESHOLD = O2.utf8DecodeJs = O2.utf8EncodeTE = O2.TEXT_ENCODER_THRESHOLD = O2.utf8EncodeJs = O2.utf8Count = void 0;
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
  O2.utf8Count = yn;
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
  O2.utf8EncodeJs = fn;
  var Ce = wt ? new TextEncoder() : void 0;
  O2.TEXT_ENCODER_THRESHOLD = wt ? typeof process < "u" && ((Rr = process == null ? void 0 : process.env) === null || Rr === void 0 ? void 0 : Rr.TEXT_ENCODING) !== "force" ? 200 : 0 : es.UINT32_MAX;
  function Rn(s, e, t) {
    e.set(Ce.encode(s), t);
  }
  function mn(s, e, t) {
    Ce.encodeInto(s, e.subarray(t));
  }
  O2.utf8EncodeTE = Ce != null && Ce.encodeInto ? mn : Rn;
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
        let p = s[r++] & 63, P2 = s[r++] & 63;
        o.push((c & 31) << 12 | p << 6 | P2);
      } else if ((c & 248) === 240) {
        let p = s[r++] & 63, P2 = s[r++] & 63, M = s[r++] & 63, k2 = (c & 7) << 18 | p << 12 | P2 << 6 | M;
        k2 > 65535 && (k2 -= 65536, o.push(k2 >>> 10 & 1023 | 55296), k2 = 56320 | k2 & 1023), o.push(k2);
      } else
        o.push(c);
      o.length >= gn && (i += String.fromCharCode(...o), o.length = 0);
    }
    return o.length > 0 && (i += String.fromCharCode(...o)), i;
  }
  O2.utf8DecodeJs = bn;
  var wn = wt ? new TextDecoder() : null;
  O2.TEXT_DECODER_THRESHOLD = wt ? typeof process < "u" && ((mr = process == null ? void 0 : process.env) === null || mr === void 0 ? void 0 : mr.TEXT_DECODER) !== "force" ? 200 : 0 : es.UINT32_MAX;
  function xn(s, e, t) {
    let r = s.subarray(e, e + t);
    return wn.decode(r);
  }
  O2.utf8DecodeTD = xn;
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
  var fe2 = class extends Error {
    constructor(e) {
      super(e);
      let t = Object.create(fe2.prototype);
      Object.setPrototypeOf(this, t), Object.defineProperty(this, "name", { configurable: true, enumerable: false, value: fe2.name });
    }
  };
  Et.DecodeError = fe2;
});
var wr = D((S2) => {
  "use strict";
  Object.defineProperty(S2, "__esModule", { value: true });
  S2.timestampExtension = S2.decodeTimestampExtension = S2.decodeTimestampToTimeSpec = S2.encodeTimestampExtension = S2.encodeDateToTimeSpec = S2.encodeTimeSpecToTimestamp = S2.EXT_TIMESTAMP = void 0;
  var vn = Tt(), ts = Ue();
  S2.EXT_TIMESTAMP = -1;
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
  S2.encodeTimeSpecToTimestamp = rs;
  function ss(s) {
    let e = s.getTime(), t = Math.floor(e / 1e3), r = (e - t * 1e3) * 1e6, n = Math.floor(r / 1e9);
    return { sec: t + n, nsec: r - n * 1e9 };
  }
  S2.encodeDateToTimeSpec = ss;
  function ns(s) {
    if (s instanceof Date) {
      let e = ss(s);
      return rs(e);
    } else
      return null;
  }
  S2.encodeTimestampExtension = ns;
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
  S2.decodeTimestampToTimeSpec = os;
  function as(s) {
    let e = os(s);
    return new Date(e.sec * 1e3 + e.nsec / 1e6);
  }
  S2.decodeTimestampExtension = as;
  S2.timestampExtension = { type: S2.EXT_TIMESTAMP, encode: ns, decode: as };
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
var Er = D((B2) => {
  "use strict";
  Object.defineProperty(B2, "__esModule", { value: true });
  B2.Encoder = B2.DEFAULT_INITIAL_BUFFER_SIZE = B2.DEFAULT_MAX_DEPTH = void 0;
  var Ne = xt(), Sn = St(), ls = Ue(), Mn = xr();
  B2.DEFAULT_MAX_DEPTH = 100;
  B2.DEFAULT_INITIAL_BUFFER_SIZE = 2048;
  var vr = class {
    constructor(e = Sn.ExtensionCodec.defaultCodec, t = void 0, r = B2.DEFAULT_MAX_DEPTH, n = B2.DEFAULT_INITIAL_BUFFER_SIZE, o = false, i = false, c = false, p = false) {
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
  B2.Encoder = vr;
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
var Ot = D(($2) => {
  "use strict";
  Object.defineProperty($2, "__esModule", { value: true });
  $2.Decoder = $2.DataViewIndexOutOfBoundsError = void 0;
  var Pr = us(), Cn = St(), oe2 = Ue(), _r = xt(), Sr = xr(), jn = ps(), G2 = Tt(), Nn = (s) => {
    let e = typeof s;
    return e === "string" || e === "number";
  }, Le = -1, kr = new DataView(new ArrayBuffer(0)), Ln = new Uint8Array(kr.buffer);
  $2.DataViewIndexOutOfBoundsError = (() => {
    try {
      kr.getInt8(0);
    } catch (s) {
      return s.constructor;
    }
    throw new Error("never reached");
  })();
  var ds = new $2.DataViewIndexOutOfBoundsError("Insufficient data"), Bn = new jn.CachedKeyDecoder(), Mr = class {
    constructor(e = Cn.ExtensionCodec.defaultCodec, t = void 0, r = oe2.UINT32_MAX, n = oe2.UINT32_MAX, o = oe2.UINT32_MAX, i = oe2.UINT32_MAX, c = oe2.UINT32_MAX, p = Bn) {
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
          if (!(p instanceof $2.DataViewIndexOutOfBoundsError))
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
          if (!(i instanceof $2.DataViewIndexOutOfBoundsError))
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
            throw new G2.DecodeError(`Unrecognized type byte: ${(0, Pr.prettyByte)(e)}`);
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
                throw new G2.DecodeError("The type of key must be string or number but " + typeof t);
              if (t === "__proto__")
                throw new G2.DecodeError("The key __proto__ is not allowed");
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
          throw new G2.DecodeError(`Unrecognized array type byte: ${(0, Pr.prettyByte)(e)}`);
        }
      }
    }
    pushMapState(e) {
      if (e > this.maxMapLength)
        throw new G2.DecodeError(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
      this.stack.push({ type: 1, size: e, key: null, readCount: 0, map: {} });
    }
    pushArrayState(e) {
      if (e > this.maxArrayLength)
        throw new G2.DecodeError(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
      this.stack.push({ type: 0, size: e, array: new Array(e), position: 0 });
    }
    decodeUtf8String(e, t) {
      var r;
      if (e > this.maxStrLength)
        throw new G2.DecodeError(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
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
        throw new G2.DecodeError(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
      if (!this.hasRemaining(e + t))
        throw ds;
      let r = this.pos + t, n = this.bytes.subarray(r, r + e);
      return this.pos += t + e, n;
    }
    decodeExtension(e, t) {
      if (e > this.maxExtLength)
        throw new G2.DecodeError(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
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
      let e = (0, oe2.getUint64)(this.view, this.pos);
      return this.pos += 8, e;
    }
    readI64() {
      let e = (0, oe2.getInt64)(this.view, this.pos);
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
  $2.Decoder = Mr;
});
var Dr = D((F2) => {
  "use strict";
  Object.defineProperty(F2, "__esModule", { value: true });
  F2.decodeMulti = F2.decode = F2.defaultDecodeOptions = void 0;
  var hs = Ot();
  F2.defaultDecodeOptions = {};
  function Fn(s, e = F2.defaultDecodeOptions) {
    return new hs.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decode(s);
  }
  F2.decode = Fn;
  function qn(s, e = F2.defaultDecodeOptions) {
    return new hs.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeMulti(s);
  }
  F2.decodeMulti = qn;
});
var Rs = D((Z2) => {
  "use strict";
  Object.defineProperty(Z2, "__esModule", { value: true });
  Z2.ensureAsyncIterable = Z2.asyncIterableFromStream = Z2.isAsyncIterable = void 0;
  function ys(s) {
    return s[Symbol.asyncIterator] != null;
  }
  Z2.isAsyncIterable = ys;
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
  Z2.asyncIterableFromStream = fs;
  function Hn(s) {
    return ys(s) ? s : fs(s);
  }
  Z2.ensureAsyncIterable = Hn;
});
var gs = D((q2) => {
  "use strict";
  Object.defineProperty(q2, "__esModule", { value: true });
  q2.decodeStream = q2.decodeMultiStream = q2.decodeArrayStream = q2.decodeAsync = void 0;
  var Or = Ot(), Wr = Rs(), Wt = Dr();
  async function Jn(s, e = Wt.defaultDecodeOptions) {
    let t = (0, Wr.ensureAsyncIterable)(s);
    return new Or.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeAsync(t);
  }
  q2.decodeAsync = Jn;
  function zn(s, e = Wt.defaultDecodeOptions) {
    let t = (0, Wr.ensureAsyncIterable)(s);
    return new Or.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeArrayStream(t);
  }
  q2.decodeArrayStream = zn;
  function ms(s, e = Wt.defaultDecodeOptions) {
    let t = (0, Wr.ensureAsyncIterable)(s);
    return new Or.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeStream(t);
  }
  q2.decodeMultiStream = ms;
  function Xn(s, e = Wt.defaultDecodeOptions) {
    return ms(s, e);
  }
  q2.decodeStream = Xn;
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
  var me2 = wr();
  Object.defineProperty(h, "EXT_TIMESTAMP", { enumerable: true, get: function() {
    return me2.EXT_TIMESTAMP;
  } });
  Object.defineProperty(h, "encodeDateToTimeSpec", { enumerable: true, get: function() {
    return me2.encodeDateToTimeSpec;
  } });
  Object.defineProperty(h, "encodeTimeSpecToTimestamp", { enumerable: true, get: function() {
    return me2.encodeTimeSpecToTimestamp;
  } });
  Object.defineProperty(h, "decodeTimestampToTimeSpec", { enumerable: true, get: function() {
    return me2.decodeTimestampToTimeSpec;
  } });
  Object.defineProperty(h, "encodeTimestampExtension", { enumerable: true, get: function() {
    return me2.encodeTimestampExtension;
  } });
  Object.defineProperty(h, "decodeTimestampExtension", { enumerable: true, get: function() {
    return me2.decodeTimestampExtension;
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
    return Object.fromEntries(o.filter((c, p) => o.findIndex((P2) => P2[0] === c[0]) === p));
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
        let p = n, P2 = p.every((k2) => k2.length === p[0].length), M = p.every((k2) => Gs(k2[0]) || Xs(k2[0]));
        if (P2 && M) {
          let k2 = new te({ type: "list", names: r, values: p.map((Ys) => Js(Ys)) });
          x(k2, o);
          let $r = new K([new j("as.data.frame"), k2]);
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
        let P2 = new j(p), M = nt(new y(i));
        try {
          Br(o, P2, M);
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
async function makeRequest(scope, appName, clientPort, pyodide2) {
  const asgiFunc = pyodide2.runPython(
    `_shiny_app_registry["${appName}"].app.call_pyodide`
  );
  await connect(scope, clientPort, asgiFunc);
}
async function connect(scope, clientPort, asgiFunc) {
  const fromClientQueue = new AwaitableQueue();
  clientPort.addEventListener("message", (event) => {
    if (event.data.type === "http.request") {
      fromClientQueue.enqueue({
        type: "http.request",
        body: event.data.body,
        more_body: event.data.more_body
      });
    }
  });
  clientPort.start();
  async function fromClient() {
    return fromClientQueue.dequeue();
  }
  async function toClient(event) {
    event = Object.fromEntries(event.toJs());
    if (event.type === "http.response.start") {
      clientPort.postMessage({
        type: event.type,
        status: event.status,
        headers: asgiHeadersToRecord(event.headers)
      });
    } else if (event.type === "http.response.body") {
      clientPort.postMessage({
        type: event.type,
        body: asgiBodyToArray(event.body),
        more_body: event.more_body
      });
    } else {
      throw new Error(`Unhandled ASGI event: ${event.type}`);
    }
  }
  await asgiFunc(scope, fromClient, toClient);
}
function asgiHeadersToRecord(headers) {
  headers = headers.map(([key, val]) => {
    return [uint8ArrayToString(key), uint8ArrayToString(val)];
  });
  return Object.fromEntries(headers);
}
function asgiBodyToArray(body) {
  return body;
}

// src/messageportwebsocket.ts
var MessagePortWebSocket = class extends EventTarget {
  constructor(port) {
    super();
    this.readyState = 0;
    this.addEventListener("open", (e) => {
      if (this.onopen) {
        this.onopen(e);
      }
    });
    this.addEventListener("message", (e) => {
      if (this.onmessage) {
        this.onmessage(e);
      }
    });
    this.addEventListener("error", (e) => {
      if (this.onerror) {
        this.onerror(e);
      }
    });
    this.addEventListener("close", (e) => {
      if (this.onclose) {
        this.onclose(e);
      }
    });
    this._port = port;
    port.addEventListener("message", this._onMessage.bind(this));
    port.start();
  }
  // Call on the server side of the connection, to tell the client that
  // the connection has been established.
  accept() {
    if (this.readyState !== 0) {
      return;
    }
    this.readyState = 1;
    this._port.postMessage({ type: "open" });
  }
  send(data) {
    if (this.readyState === 0) {
      throw new DOMException(
        "Can't send messages while WebSocket is in CONNECTING state",
        "InvalidStateError"
      );
    }
    if (this.readyState > 1) {
      return;
    }
    this._port.postMessage({ type: "message", value: { data } });
  }
  close(code, reason) {
    if (this.readyState > 1) {
      return;
    }
    this.readyState = 2;
    this._port.postMessage({ type: "close", value: { code, reason } });
    this.readyState = 3;
    this.dispatchEvent(new CloseEvent("close", { code, reason }));
  }
  _onMessage(e) {
    const event = e.data;
    switch (event.type) {
      case "open":
        if (this.readyState === 0) {
          this.readyState = 1;
          this.dispatchEvent(new Event("open"));
          return;
        }
        break;
      case "message":
        if (this.readyState === 1) {
          this.dispatchEvent(new MessageEvent("message", { ...event.value }));
          return;
        }
        break;
      case "close":
        if (this.readyState < 3) {
          this.readyState = 3;
          this.dispatchEvent(new CloseEvent("close", { ...event.value }));
          return;
        }
        break;
    }
    this._reportError(
      `Unexpected event '${event.type}' while in readyState ${this.readyState}`,
      1002
    );
  }
  _reportError(message, code) {
    this.dispatchEvent(new ErrorEvent("error", { message }));
    if (typeof code === "number") {
      this.close(code, message);
    }
  }
};

// src/messageportwebsocket-channel.ts
async function openChannel(path, appName, clientPort, pyodide2) {
  const conn = new MessagePortWebSocket(clientPort);
  const asgiFunc = pyodide2.runPython(
    `_shiny_app_registry["${appName}"].app.call_pyodide`
  );
  await connect2(path, conn, asgiFunc);
}
async function connect2(path, conn, asgiFunc) {
  const scope = {
    type: "websocket",
    asgi: {
      version: "3.0",
      spec_version: "2.1"
    },
    path,
    headers: []
  };
  const fromClientQueue = new AwaitableQueue();
  fromClientQueue.enqueue({ type: "websocket.connect" });
  async function fromClient() {
    return await fromClientQueue.dequeue();
  }
  async function toClient(event) {
    event = Object.fromEntries(event.toJs());
    if (event.type === "websocket.accept") {
      conn.accept();
    } else if (event.type === "websocket.send") {
      conn.send(event.text ?? event.bytes);
    } else if (event.type === "websocket.close") {
      conn.close(event.code, event.reason);
      fromClientQueue.enqueue({ type: "websocket.disconnect" });
    } else {
      conn.close(1002, "ASGI protocol error");
      throw new Error(`Unhandled ASGI event: ${event.type}`);
    }
  }
  conn.addEventListener("message", (e) => {
    const me2 = e;
    const event = { type: "websocket.receive" };
    if (typeof me2.data === "string") {
      event.text = me2.data;
    } else {
      event.bytes = me2.data;
    }
    fromClientQueue.enqueue(event);
  });
  conn.addEventListener("close", (e) => {
    const ce3 = e;
    fromClientQueue.enqueue({ type: "websocket.disconnect", code: ce3.code });
  });
  conn.addEventListener("error", (e) => {
    console.error(e);
  });
  await asgiFunc(scope, fromClient, toClient);
}

// src/postable-error.ts
function errorToPostableErrorObject(e) {
  const errObj = {
    message: "An unknown error occured",
    name: e.name
  };
  if (!(e instanceof Error)) {
    return errObj;
  }
  errObj.message = e.message;
  if (e.stack) {
    errObj.stack = e.stack;
  }
  return errObj;
}

// src/pyodide/pyodide.js
var oe = Object.create;
var k = Object.defineProperty;
var ae2 = Object.getOwnPropertyDescriptor;
var se = Object.getOwnPropertyNames;
var ce2 = Object.getPrototypeOf;
var le2 = Object.prototype.hasOwnProperty;
var f2 = (t, e) => k(t, "name", { value: e, configurable: true });
var E2 = ((t) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(t, { get: (e, c) => (typeof __require < "u" ? __require : e)[c] }) : t)(function(t) {
  if (typeof __require < "u")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + t + '" is not supported');
});
var T2 = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var de2 = (t, e, c, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let a2 of se(e))
      !le2.call(t, a2) && a2 !== c && k(t, a2, { get: () => e[a2], enumerable: !(o = ae2(e, a2)) || o.enumerable });
  return t;
};
var fe = (t, e, c) => (c = t != null ? oe(ce2(t)) : {}, de2(e || !t || !t.__esModule ? k(c, "default", { value: t, enumerable: true }) : c, t));
var $ = T2((R2, U2) => {
  (function(t, e) {
    "use strict";
    typeof define == "function" && define.amd ? define("stackframe", [], e) : typeof R2 == "object" ? U2.exports = e() : t.StackFrame = e();
  })(R2, function() {
    "use strict";
    function t(d2) {
      return !isNaN(parseFloat(d2)) && isFinite(d2);
    }
    f2(t, "_isNumber");
    function e(d2) {
      return d2.charAt(0).toUpperCase() + d2.substring(1);
    }
    f2(e, "_capitalize");
    function c(d2) {
      return function() {
        return this[d2];
      };
    }
    f2(c, "_getter");
    var o = ["isConstructor", "isEval", "isNative", "isToplevel"], a2 = ["columnNumber", "lineNumber"], r = ["fileName", "functionName", "source"], n = ["args"], u2 = ["evalOrigin"], i = o.concat(a2, r, n, u2);
    function s(d2) {
      if (d2)
        for (var y2 = 0; y2 < i.length; y2++)
          d2[i[y2]] !== void 0 && this["set" + e(i[y2])](d2[i[y2]]);
    }
    f2(s, "StackFrame"), s.prototype = { getArgs: function() {
      return this.args;
    }, setArgs: function(d2) {
      if (Object.prototype.toString.call(d2) !== "[object Array]")
        throw new TypeError("Args must be an Array");
      this.args = d2;
    }, getEvalOrigin: function() {
      return this.evalOrigin;
    }, setEvalOrigin: function(d2) {
      if (d2 instanceof s)
        this.evalOrigin = d2;
      else if (d2 instanceof Object)
        this.evalOrigin = new s(d2);
      else
        throw new TypeError("Eval Origin must be an Object or StackFrame");
    }, toString: function() {
      var d2 = this.getFileName() || "", y2 = this.getLineNumber() || "", h = this.getColumnNumber() || "", v2 = this.getFunctionName() || "";
      return this.getIsEval() ? d2 ? "[eval] (" + d2 + ":" + y2 + ":" + h + ")" : "[eval]:" + y2 + ":" + h : v2 ? v2 + " (" + d2 + ":" + y2 + ":" + h + ")" : d2 + ":" + y2 + ":" + h;
    } }, s.fromString = f2(function(y2) {
      var h = y2.indexOf("("), v2 = y2.lastIndexOf(")"), ee2 = y2.substring(0, h), te2 = y2.substring(h + 1, v2).split(","), I2 = y2.substring(v2 + 1);
      if (I2.indexOf("@") === 0)
        var N2 = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(I2, ""), re2 = N2[1], ne2 = N2[2], ie2 = N2[3];
      return new s({ functionName: ee2, args: te2 || void 0, fileName: re2, lineNumber: ne2 || void 0, columnNumber: ie2 || void 0 });
    }, "StackFrame$$fromString");
    for (var l2 = 0; l2 < o.length; l2++)
      s.prototype["get" + e(o[l2])] = c(o[l2]), s.prototype["set" + e(o[l2])] = function(d2) {
        return function(y2) {
          this[d2] = !!y2;
        };
      }(o[l2]);
    for (var m2 = 0; m2 < a2.length; m2++)
      s.prototype["get" + e(a2[m2])] = c(a2[m2]), s.prototype["set" + e(a2[m2])] = function(d2) {
        return function(y2) {
          if (!t(y2))
            throw new TypeError(d2 + " must be a Number");
          this[d2] = Number(y2);
        };
      }(a2[m2]);
    for (var p = 0; p < r.length; p++)
      s.prototype["get" + e(r[p])] = c(r[p]), s.prototype["set" + e(r[p])] = function(d2) {
        return function(y2) {
          this[d2] = String(y2);
        };
      }(r[p]);
    return s;
  });
});
var C = T2((x2, M) => {
  (function(t, e) {
    "use strict";
    typeof define == "function" && define.amd ? define("error-stack-parser", ["stackframe"], e) : typeof x2 == "object" ? M.exports = e($()) : t.ErrorStackParser = e(t.StackFrame);
  })(x2, f2(function(e) {
    "use strict";
    var c = /(^|@)\S+:\d+/, o = /^\s*at .*(\S+:\d+|\(native\))/m, a2 = /^(eval@)?(\[native code])?$/;
    return { parse: f2(function(n) {
      if (typeof n.stacktrace < "u" || typeof n["opera#sourceloc"] < "u")
        return this.parseOpera(n);
      if (n.stack && n.stack.match(o))
        return this.parseV8OrIE(n);
      if (n.stack)
        return this.parseFFOrSafari(n);
      throw new Error("Cannot parse given Error object");
    }, "ErrorStackParser$$parse"), extractLocation: f2(function(n) {
      if (n.indexOf(":") === -1)
        return [n];
      var u2 = /(.+?)(?::(\d+))?(?::(\d+))?$/, i = u2.exec(n.replace(/[()]/g, ""));
      return [i[1], i[2] || void 0, i[3] || void 0];
    }, "ErrorStackParser$$extractLocation"), parseV8OrIE: f2(function(n) {
      var u2 = n.stack.split(`
`).filter(function(i) {
        return !!i.match(o);
      }, this);
      return u2.map(function(i) {
        i.indexOf("(eval ") > -1 && (i = i.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
        var s = i.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, ""), l2 = s.match(/ (\(.+\)$)/);
        s = l2 ? s.replace(l2[0], "") : s;
        var m2 = this.extractLocation(l2 ? l2[1] : s), p = l2 && s || void 0, d2 = ["eval", "<anonymous>"].indexOf(m2[0]) > -1 ? void 0 : m2[0];
        return new e({ functionName: p, fileName: d2, lineNumber: m2[1], columnNumber: m2[2], source: i });
      }, this);
    }, "ErrorStackParser$$parseV8OrIE"), parseFFOrSafari: f2(function(n) {
      var u2 = n.stack.split(`
`).filter(function(i) {
        return !i.match(a2);
      }, this);
      return u2.map(function(i) {
        if (i.indexOf(" > eval") > -1 && (i = i.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), i.indexOf("@") === -1 && i.indexOf(":") === -1)
          return new e({ functionName: i });
        var s = /((.*".+"[^@]*)?[^@]*)(?:@)/, l2 = i.match(s), m2 = l2 && l2[1] ? l2[1] : void 0, p = this.extractLocation(i.replace(s, ""));
        return new e({ functionName: m2, fileName: p[0], lineNumber: p[1], columnNumber: p[2], source: i });
      }, this);
    }, "ErrorStackParser$$parseFFOrSafari"), parseOpera: f2(function(n) {
      return !n.stacktrace || n.message.indexOf(`
`) > -1 && n.message.split(`
`).length > n.stacktrace.split(`
`).length ? this.parseOpera9(n) : n.stack ? this.parseOpera11(n) : this.parseOpera10(n);
    }, "ErrorStackParser$$parseOpera"), parseOpera9: f2(function(n) {
      for (var u2 = /Line (\d+).*script (?:in )?(\S+)/i, i = n.message.split(`
`), s = [], l2 = 2, m2 = i.length; l2 < m2; l2 += 2) {
        var p = u2.exec(i[l2]);
        p && s.push(new e({ fileName: p[2], lineNumber: p[1], source: i[l2] }));
      }
      return s;
    }, "ErrorStackParser$$parseOpera9"), parseOpera10: f2(function(n) {
      for (var u2 = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, i = n.stacktrace.split(`
`), s = [], l2 = 0, m2 = i.length; l2 < m2; l2 += 2) {
        var p = u2.exec(i[l2]);
        p && s.push(new e({ functionName: p[3] || void 0, fileName: p[2], lineNumber: p[1], source: i[l2] }));
      }
      return s;
    }, "ErrorStackParser$$parseOpera10"), parseOpera11: f2(function(n) {
      var u2 = n.stack.split(`
`).filter(function(i) {
        return !!i.match(c) && !i.match(/^Error created at/);
      }, this);
      return u2.map(function(i) {
        var s = i.split("@"), l2 = this.extractLocation(s.pop()), m2 = s.shift() || "", p = m2.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0, d2;
        m2.match(/\(([^)]*)\)/) && (d2 = m2.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
        var y2 = d2 === void 0 || d2 === "[arguments not available]" ? void 0 : d2.split(",");
        return new e({ functionName: p, args: y2, fileName: l2[0], lineNumber: l2[1], columnNumber: l2[2], source: i });
      }, this);
    }, "ErrorStackParser$$parseOpera11") };
  }, "ErrorStackParser"));
});
var z2 = fe(C());
var g2 = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && typeof process.browser > "u";
var F = g2 && typeof module < "u" && typeof module.exports < "u" && typeof E2 < "u" && typeof __dirname < "u";
var j2 = g2 && !F;
var ue2 = typeof Deno < "u";
var B = !g2 && !ue2;
var W2 = B && typeof window < "u" && typeof document < "u" && typeof document.createElement < "u" && typeof sessionStorage < "u";
var H2 = B && typeof importScripts < "u" && typeof self < "u";
var q;
var _2;
var P;
var V2;
var L;
var pe2 = `"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;
async function D2() {
  if (!g2 || (q = (await import("url")).default, L = await import("fs/promises"), globalThis.fetch ? _2 = fetch : (console.warn(pe2), _2 = (await import("node-fetch")).default), V2 = (await import("vm")).default, P = await import("path"), A = P.sep, typeof E2 < "u"))
    return;
  let t = await import("fs"), e = await import("crypto"), c = await Promise.resolve().then(() => __toESM(require_browser())), o = await import("child_process"), a2 = { fs: t, crypto: e, ws: c, child_process: o };
  globalThis.require = function(r) {
    return a2[r];
  };
}
f2(D2, "initNodeModules");
function me(t, e) {
  return P.resolve(e || ".", t);
}
f2(me, "node_resolvePath");
function ye(t, e) {
  return e === void 0 && (e = location), new URL(t, e).toString();
}
f2(ye, "browser_resolvePath");
var S;
g2 ? S = me : S = ye;
var A;
g2 || (A = "/");
function ge(t, e) {
  return t.startsWith("file://") && (t = t.slice(7)), t.includes("://") ? { response: _2(t) } : { binary: L.readFile(t).then((c) => new Uint8Array(c.buffer, c.byteOffset, c.byteLength)) };
}
f2(ge, "node_getBinaryResponse");
function he(t, e) {
  let c = new URL(t, location);
  return { response: fetch(c, e ? { integrity: e } : {}) };
}
f2(he, "browser_getBinaryResponse");
var b2;
g2 ? b2 = ge : b2 = he;
async function G(t, e) {
  let { response: c, binary: o } = b2(t, e);
  if (o)
    return o;
  let a2 = await c;
  if (!a2.ok)
    throw new Error(`Failed to load '${t}': request failed.`);
  return new Uint8Array(await a2.arrayBuffer());
}
f2(G, "loadBinaryFile");
var w;
if (W2)
  w = f2(async (t) => await import(t), "loadScript");
else if (H2)
  w = f2(async (t) => {
    try {
      globalThis.importScripts(t);
    } catch (e) {
      if (e instanceof TypeError)
        await import(t);
      else
        throw e;
    }
  }, "loadScript");
else if (g2)
  w = ve2;
else
  throw new Error("Cannot determine runtime environment");
async function ve2(t) {
  t.startsWith("file://") && (t = t.slice(7)), t.includes("://") ? V2.runInThisContext(await (await _2(t)).text()) : await import(q.pathToFileURL(t).href);
}
f2(ve2, "nodeLoadScript");
async function K2(t) {
  if (g2) {
    await D2();
    let e = await L.readFile(t);
    return JSON.parse(e);
  } else
    return await (await fetch(t)).json();
}
f2(K2, "loadLockFile");
async function X() {
  if (F)
    return __dirname;
  let t;
  try {
    throw new Error();
  } catch (o) {
    t = o;
  }
  let e = z2.default.parse(t)[0].fileName;
  if (j2) {
    let o = await import("path");
    return (await import("url")).fileURLToPath(o.dirname(e));
  }
  let c = e.lastIndexOf(A);
  if (c === -1)
    throw new Error("Could not extract indexURL path from pyodide module location");
  return e.slice(0, c);
}
f2(X, "calculateDirname");
function J2(t) {
  let e = t.FS, c = t.FS.filesystems.MEMFS, o = t.PATH, a2 = { DIR_MODE: 16895, FILE_MODE: 33279, mount: function(r) {
    if (!r.opts.fileSystemHandle)
      throw new Error("opts.fileSystemHandle is required");
    return c.mount.apply(null, arguments);
  }, syncfs: async (r, n, u2) => {
    try {
      let i = a2.getLocalSet(r), s = await a2.getRemoteSet(r), l2 = n ? s : i, m2 = n ? i : s;
      await a2.reconcile(r, l2, m2), u2(null);
    } catch (i) {
      u2(i);
    }
  }, getLocalSet: (r) => {
    let n = /* @__PURE__ */ Object.create(null);
    function u2(l2) {
      return l2 !== "." && l2 !== "..";
    }
    f2(u2, "isRealDir");
    function i(l2) {
      return (m2) => o.join2(l2, m2);
    }
    f2(i, "toAbsolute");
    let s = e.readdir(r.mountpoint).filter(u2).map(i(r.mountpoint));
    for (; s.length; ) {
      let l2 = s.pop(), m2 = e.stat(l2);
      e.isDir(m2.mode) && s.push.apply(s, e.readdir(l2).filter(u2).map(i(l2))), n[l2] = { timestamp: m2.mtime, mode: m2.mode };
    }
    return { type: "local", entries: n };
  }, getRemoteSet: async (r) => {
    let n = /* @__PURE__ */ Object.create(null), u2 = await we2(r.opts.fileSystemHandle);
    for (let [i, s] of u2)
      i !== "." && (n[o.join2(r.mountpoint, i)] = { timestamp: s.kind === "file" ? (await s.getFile()).lastModifiedDate : /* @__PURE__ */ new Date(), mode: s.kind === "file" ? a2.FILE_MODE : a2.DIR_MODE });
    return { type: "remote", entries: n, handles: u2 };
  }, loadLocalEntry: (r) => {
    let u2 = e.lookupPath(r).node, i = e.stat(r);
    if (e.isDir(i.mode))
      return { timestamp: i.mtime, mode: i.mode };
    if (e.isFile(i.mode))
      return u2.contents = c.getFileDataAsTypedArray(u2), { timestamp: i.mtime, mode: i.mode, contents: u2.contents };
    throw new Error("node type not supported");
  }, storeLocalEntry: (r, n) => {
    if (e.isDir(n.mode))
      e.mkdirTree(r, n.mode);
    else if (e.isFile(n.mode))
      e.writeFile(r, n.contents, { canOwn: true });
    else
      throw new Error("node type not supported");
    e.chmod(r, n.mode), e.utime(r, n.timestamp, n.timestamp);
  }, removeLocalEntry: (r) => {
    var n = e.stat(r);
    e.isDir(n.mode) ? e.rmdir(r) : e.isFile(n.mode) && e.unlink(r);
  }, loadRemoteEntry: async (r) => {
    if (r.kind === "file") {
      let n = await r.getFile();
      return { contents: new Uint8Array(await n.arrayBuffer()), mode: a2.FILE_MODE, timestamp: n.lastModifiedDate };
    } else {
      if (r.kind === "directory")
        return { mode: a2.DIR_MODE, timestamp: /* @__PURE__ */ new Date() };
      throw new Error("unknown kind: " + r.kind);
    }
  }, storeRemoteEntry: async (r, n, u2) => {
    let i = r.get(o.dirname(n)), s = e.isFile(u2.mode) ? await i.getFileHandle(o.basename(n), { create: true }) : await i.getDirectoryHandle(o.basename(n), { create: true });
    if (s.kind === "file") {
      let l2 = await s.createWritable();
      await l2.write(u2.contents), await l2.close();
    }
    r.set(n, s);
  }, removeRemoteEntry: async (r, n) => {
    await r.get(o.dirname(n)).removeEntry(o.basename(n)), r.delete(n);
  }, reconcile: async (r, n, u2) => {
    let i = 0, s = [];
    Object.keys(n.entries).forEach(function(p) {
      let d2 = n.entries[p], y2 = u2.entries[p];
      (!y2 || e.isFile(d2.mode) && d2.timestamp.getTime() > y2.timestamp.getTime()) && (s.push(p), i++);
    }), s.sort();
    let l2 = [];
    if (Object.keys(u2.entries).forEach(function(p) {
      n.entries[p] || (l2.push(p), i++);
    }), l2.sort().reverse(), !i)
      return;
    let m2 = n.type === "remote" ? n.handles : u2.handles;
    for (let p of s) {
      let d2 = o.normalize(p.replace(r.mountpoint, "/")).substring(1);
      if (u2.type === "local") {
        let y2 = m2.get(d2), h = await a2.loadRemoteEntry(y2);
        a2.storeLocalEntry(p, h);
      } else {
        let y2 = a2.loadLocalEntry(p);
        await a2.storeRemoteEntry(m2, d2, y2);
      }
    }
    for (let p of l2)
      if (u2.type === "local")
        a2.removeLocalEntry(p);
      else {
        let d2 = o.normalize(p.replace(r.mountpoint, "/")).substring(1);
        await a2.removeRemoteEntry(m2, d2);
      }
  } };
  t.FS.filesystems.NATIVEFS_ASYNC = a2;
}
f2(J2, "initializeNativeFS");
var we2 = f2(async (t) => {
  let e = [];
  async function c(a2) {
    for await (let r of a2.values())
      e.push(r), r.kind === "directory" && await c(r);
  }
  f2(c, "collect"), await c(t);
  let o = /* @__PURE__ */ new Map();
  o.set(".", t);
  for (let a2 of e) {
    let r = (await t.resolve(a2)).join("/");
    o.set(r, a2);
  }
  return o;
}, "getFsHandles");
function Y() {
  let t = {};
  return t.noImageDecoding = true, t.noAudioDecoding = true, t.noWasmDecoding = false, t.preRun = [], t.quit = (e, c) => {
    throw t.exited = { status: e, toThrow: c }, c;
  }, t;
}
f2(Y, "createModule");
function be(t, e) {
  t.preRun.push(function() {
    let c = "/";
    try {
      t.FS.mkdirTree(e);
    } catch (o) {
      console.error(`Error occurred while making a home directory '${e}':`), console.error(o), console.error(`Using '${c}' for a home directory instead`), e = c;
    }
    t.FS.chdir(e);
  });
}
f2(be, "createHomeDirectory");
function Ee2(t, e) {
  t.preRun.push(function() {
    Object.assign(t.ENV, e);
  });
}
f2(Ee2, "setEnvironment");
function _e2(t, e) {
  t.preRun.push(() => {
    for (let c of e)
      t.FS.mkdirTree(c), t.FS.mount(t.FS.filesystems.NODEFS, { root: c }, c);
  });
}
f2(_e2, "mountLocalDirectories");
function Se2(t, e) {
  let c = G(e);
  t.preRun.push(() => {
    let o = t._py_version_major(), a2 = t._py_version_minor();
    t.FS.mkdirTree("/lib"), t.FS.mkdirTree(`/lib/python${o}.${a2}/site-packages`), t.addRunDependency("install-stdlib"), c.then((r) => {
      t.FS.writeFile(`/lib/python${o}${a2}.zip`, r);
    }).catch((r) => {
      console.error("Error occurred while installing the standard library:"), console.error(r);
    }).finally(() => {
      t.removeRunDependency("install-stdlib");
    });
  });
}
f2(Se2, "installStdlib");
function Q(t, e) {
  let c;
  e.stdLibURL != null ? c = e.stdLibURL : c = e.indexURL + "python_stdlib.zip", Se2(t, c), be(t, e.env.HOME), Ee2(t, e.env), _e2(t, e._node_mounts), t.preRun.push(() => J2(t));
}
f2(Q, "initializeFileSystem");
function Z(t, e) {
  let { binary: c, response: o } = b2(e + "pyodide.asm.wasm");
  t.instantiateWasm = function(a2, r) {
    return async function() {
      try {
        let n;
        o ? n = await WebAssembly.instantiateStreaming(o, a2) : n = await WebAssembly.instantiate(await c, a2);
        let { instance: u2, module: i } = n;
        typeof WasmOffsetConverter < "u" && (wasmOffsetConverter = new WasmOffsetConverter(wasmBinary, i)), r(u2, i);
      } catch (n) {
        console.warn("wasm instantiation failed!"), console.warn(n);
      }
    }(), {};
  };
}
f2(Z, "preloadWasm");
var O = "0.25.1";
async function We2(t = {}) {
  await D2();
  let e = t.indexURL || await X();
  e = S(e), e.endsWith("/") || (e += "/"), t.indexURL = e;
  let c = { fullStdLib: false, jsglobals: globalThis, stdin: globalThis.prompt ? globalThis.prompt : void 0, lockFileURL: e + "pyodide-lock.json", args: [], _node_mounts: [], env: {}, packageCacheDir: e, packages: [] }, o = Object.assign(c, t);
  o.env.HOME || (o.env.HOME = "/home/pyodide");
  let a2 = Y();
  a2.print = o.stdout, a2.printErr = o.stderr, a2.arguments = o.args;
  let r = { config: o };
  a2.API = r, r.lockFilePromise = K2(o.lockFileURL), Z(a2, e), Q(a2, o);
  let n = new Promise((s) => a2.postRun = s);
  if (a2.locateFile = (s) => o.indexURL + s, typeof _createPyodideModule != "function") {
    let s = `${o.indexURL}pyodide.asm.js`;
    await w(s);
  }
  if (await _createPyodideModule(a2), await n, a2.exited)
    throw a2.exited.toThrow;
  if (t.pyproxyToStringRepr && r.setPyProxyToStringMethod(true), r.version !== O)
    throw new Error(`Pyodide version does not match: '${O}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);
  a2.locateFile = (s) => {
    throw new Error("Didn't expect to load any more file_packager files!");
  };
  let u2 = r.finalizeBootstrap();
  if (u2.version.includes("dev") || r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${u2.version}/full/`), await r.packageIndexReady, r._pyodide._importhook.register_module_not_found_hook(r._import_name_to_package_name, r.lockfile_unvendored_stdlibs_and_test), r.lockfile_info.version !== O)
    throw new Error("Lock file version doesn't match Pyodide version");
  return r.package_loader.init_loaded_packages(), o.fullStdLib && await u2.loadPackage(r.lockfile_unvendored_stdlibs), r.initializeStreams(o.stdin, o.stdout, o.stderr), u2;
}
f2(We2, "loadPyodide");

// src/pyodide-proxy.ts
async function setupPythonEnv(pyodide2, callJS2) {
  const repr = pyodide2.globals.get("repr");
  pyodide2.globals.set("js_pyodide", pyodide2);
  const pyconsole = await pyodide2.runPythonAsync(`
  import pyodide.console
  import __main__
  pyodide.console.PyodideConsole(__main__.__dict__)
  `);
  const tabComplete = pyconsole.complete.copy();
  pyconsole.destroy();
  if (callJS2) {
    pyodide2.globals.set("callJS", callJS2);
  }
  const shortFormatLastTraceback = await pyodide2.runPythonAsync(`
  def _short_format_last_traceback() -> str:
      import sys
      import traceback
      e = sys.last_value
      found_marker = False
      nframes = 0
      for (frame, _) in traceback.walk_tb(e.__traceback__):
          if frame.f_code.co_filename in ("<console>", "<exec>"):
              found_marker = True
          if found_marker:
              nframes += 1
      return "".join(traceback.format_exception(type(e), e, e.__traceback__, -nframes))

  _short_format_last_traceback
  `);
  await pyodide2.runPythonAsync(`del _short_format_last_traceback`);
  return {
    repr,
    tabComplete,
    shortFormatLastTraceback
  };
}
function processReturnValue(value, returnResult = "none", pyodide2, repr) {
  const possibleReturnValues = {
    get value() {
      if (value instanceof pyodide2.ffi.PyProxy) {
        return value.toJs();
      } else {
        return value;
      }
    },
    get printed_value() {
      return repr(value);
    },
    get to_html() {
      let toHtml;
      try {
        toHtml = pyodide2.globals.get("_to_html");
      } catch (e) {
        console.error("Couldn't find _to_html function: ", e);
        toHtml = (x2) => ({
          type: "text",
          value: "Couldn't finding _to_html function."
        });
      }
      const val = toHtml(value).toJs({
        dict_converter: Object.fromEntries
      });
      return val;
    },
    get none() {
      return void 0;
    }
  };
  return possibleReturnValues[returnResult];
}

// src/pyodide-worker.ts
var pyodideStatus = "none";
var pyodide;
self.stdout_callback = function(s) {
  self.postMessage({ type: "nonreply", subtype: "output", stdout: s });
};
self.stderr_callback = function(s) {
  self.postMessage({ type: "nonreply", subtype: "output", stderr: s });
};
async function callJS(fnName, args) {
  self.postMessage({
    type: "nonreply",
    subtype: "callJS",
    fnName: fnName.toJs(),
    args: args.toJs()
  });
}
var pyUtils;
self.onmessage = async function(e) {
  const msg = e.data;
  if (msg.type === "openChannel") {
    const clientPort = e.ports[0];
    await openChannel(msg.path, msg.appName, clientPort, pyodide);
    return;
  } else if (msg.type === "makeRequest") {
    const clientPort = e.ports[0];
    await makeRequest(msg.scope, msg.appName, clientPort, pyodide);
    return;
  }
  const messagePort = e.ports[0];
  try {
    if (msg.type === "init") {
      if (pyodideStatus === "none") {
        pyodideStatus = "loading";
        pyodide = await We2({
          ...msg.config,
          stdout: self.stdout_callback,
          stderr: self.stderr_callback
        });
        pyUtils = await setupPythonEnv(pyodide, callJS);
        pyodideStatus = "loaded";
      }
      messagePort.postMessage({ type: "reply", subtype: "done" });
    } else if (msg.type === "loadPackagesFromImports") {
      const result = await pyodide.loadPackagesFromImports(msg.code);
      messagePort.postMessage({
        type: "reply",
        subtype: "done",
        value: result
      });
    } else if (msg.type === "runPythonAsync") {
      await pyodide.loadPackagesFromImports(msg.code);
      const result = await pyodide.runPythonAsync(msg.code);
      if (msg.printResult && result !== void 0) {
        self.stdout_callback(pyUtils.repr(result));
      }
      try {
        const processedResult = processReturnValue(
          result,
          msg.returnResult,
          pyodide,
          pyUtils.repr
        );
        messagePort.postMessage({
          type: "reply",
          subtype: "done",
          value: processedResult
        });
      } finally {
        if (result instanceof pyodide.ffi.PyProxy) {
          result.destroy();
        }
      }
    } else if (msg.type === "tabComplete") {
      const completions = pyUtils.tabComplete(msg.code).toJs()[0];
      messagePort.postMessage({
        type: "reply",
        subtype: "tabCompletions",
        completions
      });
    } else if (msg.type === "callPyAsync") {
      const { fnName, args, kwargs } = msg;
      let fn = pyodide.globals.get(fnName[0]);
      for (const el of fnName.slice(1)) {
        fn = fn[el];
      }
      const resultMaybePromise = fn.callKwargs(...args, kwargs);
      const result = await Promise.resolve(resultMaybePromise);
      if (msg.printResult && result !== void 0) {
        self.stdout_callback(pyUtils.repr(result));
      }
      try {
        const processedResult = processReturnValue(
          result,
          msg.returnResult,
          pyodide,
          pyUtils.repr
        );
        messagePort.postMessage({
          type: "reply",
          subtype: "done",
          value: processedResult
        });
      } finally {
        if (result instanceof pyodide.ffi.PyProxy) {
          result.destroy();
        }
      }
    } else {
      messagePort.postMessage({
        type: "reply",
        subtype: "done",
        error: new Error(`Unknown message type: ${msg.toString()}`)
      });
    }
  } catch (e2) {
    if (e2 instanceof pyodide.ffi.PythonError) {
      e2.message = pyUtils.shortFormatLastTraceback();
    }
    messagePort.postMessage({
      type: "reply",
      subtype: "done",
      error: errorToPostableErrorObject(e2)
    });
  }
};
