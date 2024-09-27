// Shinylive 0.7.0
// Copyright 2024 Posit, PBC
import {
  __commonJS
} from "./chunk-6XGWWLNE.js";

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module) {
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});
export default require_browser();
