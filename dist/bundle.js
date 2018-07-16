/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ajax-hook/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ajax-hook/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/ajaxhook */ \"./node_modules/ajax-hook/src/ajaxhook.js\")(module.exports)\n\n\n//# sourceURL=webpack:///./node_modules/ajax-hook/index.js?");

/***/ }),

/***/ "./node_modules/ajax-hook/src/ajaxhook.js":
/*!************************************************!*\
  !*** ./node_modules/ajax-hook/src/ajaxhook.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n * author: wendu\n * email: 824783146@qq.com\n * source code: https://github.com/wendux/Ajax-hook\n **/\nmodule.exports=function (ob) {\n    ob.hookAjax = function (funs) {\n        window._ahrealxhr = window._ahrealxhr || XMLHttpRequest\n        XMLHttpRequest = function () {\n            this.xhr = new window._ahrealxhr;\n            for (var attr in this.xhr) {\n                var type = \"\";\n                try {\n                    type = typeof this.xhr[attr]\n                } catch (e) {}\n                if (type === \"function\") {\n                    this[attr] = hookfun(attr);\n                } else {\n                    Object.defineProperty(this, attr, {\n                        get: getFactory(attr),\n                        set: setFactory(attr)\n                    })\n                }\n            }\n        }\n\n        function getFactory(attr) {\n            return function () {\n                return this.hasOwnProperty(attr + \"_\")?this[attr + \"_\"]:this.xhr[attr];\n            }\n        }\n\n        function setFactory(attr) {\n            return function (f) {\n                var xhr = this.xhr;\n                var that = this;\n                if (attr.indexOf(\"on\") != 0) {\n                    this[attr + \"_\"] = f;\n                    return;\n                }\n                if (funs[attr]) {\n                    xhr[attr] = function () {\n                        funs[attr](that) || f.apply(xhr, arguments);\n                    }\n                } else {\n                    xhr[attr] = f;\n                }\n            }\n        }\n\n        function hookfun(fun) {\n            return function () {\n                var args = [].slice.call(arguments)\n                if (funs[fun] && funs[fun].call(this, args, this.xhr)) {\n                    return;\n                }\n                return this.xhr[fun].apply(this.xhr, args);\n            }\n        }\n        return window._ahrealxhr;\n    }\n    ob.unHookAjax = function () {\n        if (window._ahrealxhr)  XMLHttpRequest = window._ahrealxhr;\n        window._ahrealxhr = undefined;\n    }\n    //for typescript\n    ob.default=ob;\n}\n\n\n//# sourceURL=webpack:///./node_modules/ajax-hook/src/ajaxhook.js?");

/***/ }),

/***/ "./node_modules/lz-string/libs/lz-string.js":
/*!**************************************************!*\
  !*** ./node_modules/lz-string/libs/lz-string.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>\n// This work is free. You can redistribute it and/or modify it\n// under the terms of the WTFPL, Version 2\n// For more information see LICENSE.txt or http://www.wtfpl.net/\n//\n// For more information, the home page:\n// http://pieroxy.net/blog/pages/lz-string/testing.html\n//\n// LZ-based compression algorithm, version 1.4.4\nvar LZString = (function() {\n\n// private property\nvar f = String.fromCharCode;\nvar keyStrBase64 = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\";\nvar keyStrUriSafe = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$\";\nvar baseReverseDic = {};\n\nfunction getBaseValue(alphabet, character) {\n  if (!baseReverseDic[alphabet]) {\n    baseReverseDic[alphabet] = {};\n    for (var i=0 ; i<alphabet.length ; i++) {\n      baseReverseDic[alphabet][alphabet.charAt(i)] = i;\n    }\n  }\n  return baseReverseDic[alphabet][character];\n}\n\nvar LZString = {\n  compressToBase64 : function (input) {\n    if (input == null) return \"\";\n    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});\n    switch (res.length % 4) { // To produce valid Base64\n    default: // When could this happen ?\n    case 0 : return res;\n    case 1 : return res+\"===\";\n    case 2 : return res+\"==\";\n    case 3 : return res+\"=\";\n    }\n  },\n\n  decompressFromBase64 : function (input) {\n    if (input == null) return \"\";\n    if (input == \"\") return null;\n    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });\n  },\n\n  compressToUTF16 : function (input) {\n    if (input == null) return \"\";\n    return LZString._compress(input, 15, function(a){return f(a+32);}) + \" \";\n  },\n\n  decompressFromUTF16: function (compressed) {\n    if (compressed == null) return \"\";\n    if (compressed == \"\") return null;\n    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });\n  },\n\n  //compress into uint8array (UCS-2 big endian format)\n  compressToUint8Array: function (uncompressed) {\n    var compressed = LZString.compress(uncompressed);\n    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character\n\n    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {\n      var current_value = compressed.charCodeAt(i);\n      buf[i*2] = current_value >>> 8;\n      buf[i*2+1] = current_value % 256;\n    }\n    return buf;\n  },\n\n  //decompress from uint8array (UCS-2 big endian format)\n  decompressFromUint8Array:function (compressed) {\n    if (compressed===null || compressed===undefined){\n        return LZString.decompress(compressed);\n    } else {\n        var buf=new Array(compressed.length/2); // 2 bytes per character\n        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {\n          buf[i]=compressed[i*2]*256+compressed[i*2+1];\n        }\n\n        var result = [];\n        buf.forEach(function (c) {\n          result.push(f(c));\n        });\n        return LZString.decompress(result.join(''));\n\n    }\n\n  },\n\n\n  //compress into a string that is already URI encoded\n  compressToEncodedURIComponent: function (input) {\n    if (input == null) return \"\";\n    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});\n  },\n\n  //decompress from an output of compressToEncodedURIComponent\n  decompressFromEncodedURIComponent:function (input) {\n    if (input == null) return \"\";\n    if (input == \"\") return null;\n    input = input.replace(/ /g, \"+\");\n    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });\n  },\n\n  compress: function (uncompressed) {\n    return LZString._compress(uncompressed, 16, function(a){return f(a);});\n  },\n  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {\n    if (uncompressed == null) return \"\";\n    var i, value,\n        context_dictionary= {},\n        context_dictionaryToCreate= {},\n        context_c=\"\",\n        context_wc=\"\",\n        context_w=\"\",\n        context_enlargeIn= 2, // Compensate for the first entry which should not count\n        context_dictSize= 3,\n        context_numBits= 2,\n        context_data=[],\n        context_data_val=0,\n        context_data_position=0,\n        ii;\n\n    for (ii = 0; ii < uncompressed.length; ii += 1) {\n      context_c = uncompressed.charAt(ii);\n      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {\n        context_dictionary[context_c] = context_dictSize++;\n        context_dictionaryToCreate[context_c] = true;\n      }\n\n      context_wc = context_w + context_c;\n      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {\n        context_w = context_wc;\n      } else {\n        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {\n          if (context_w.charCodeAt(0)<256) {\n            for (i=0 ; i<context_numBits ; i++) {\n              context_data_val = (context_data_val << 1);\n              if (context_data_position == bitsPerChar-1) {\n                context_data_position = 0;\n                context_data.push(getCharFromInt(context_data_val));\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n            }\n            value = context_w.charCodeAt(0);\n            for (i=0 ; i<8 ; i++) {\n              context_data_val = (context_data_val << 1) | (value&1);\n              if (context_data_position == bitsPerChar-1) {\n                context_data_position = 0;\n                context_data.push(getCharFromInt(context_data_val));\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = value >> 1;\n            }\n          } else {\n            value = 1;\n            for (i=0 ; i<context_numBits ; i++) {\n              context_data_val = (context_data_val << 1) | value;\n              if (context_data_position ==bitsPerChar-1) {\n                context_data_position = 0;\n                context_data.push(getCharFromInt(context_data_val));\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = 0;\n            }\n            value = context_w.charCodeAt(0);\n            for (i=0 ; i<16 ; i++) {\n              context_data_val = (context_data_val << 1) | (value&1);\n              if (context_data_position == bitsPerChar-1) {\n                context_data_position = 0;\n                context_data.push(getCharFromInt(context_data_val));\n                context_data_val = 0;\n              } else {\n                context_data_position++;\n              }\n              value = value >> 1;\n            }\n          }\n          context_enlargeIn--;\n          if (context_enlargeIn == 0) {\n            context_enlargeIn = Math.pow(2, context_numBits);\n            context_numBits++;\n          }\n          delete context_dictionaryToCreate[context_w];\n        } else {\n          value = context_dictionary[context_w];\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == bitsPerChar-1) {\n              context_data_position = 0;\n              context_data.push(getCharFromInt(context_data_val));\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n\n\n        }\n        context_enlargeIn--;\n        if (context_enlargeIn == 0) {\n          context_enlargeIn = Math.pow(2, context_numBits);\n          context_numBits++;\n        }\n        // Add wc to the dictionary.\n        context_dictionary[context_wc] = context_dictSize++;\n        context_w = String(context_c);\n      }\n    }\n\n    // Output the code for w.\n    if (context_w !== \"\") {\n      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {\n        if (context_w.charCodeAt(0)<256) {\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1);\n            if (context_data_position == bitsPerChar-1) {\n              context_data_position = 0;\n              context_data.push(getCharFromInt(context_data_val));\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n          }\n          value = context_w.charCodeAt(0);\n          for (i=0 ; i<8 ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == bitsPerChar-1) {\n              context_data_position = 0;\n              context_data.push(getCharFromInt(context_data_val));\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n        } else {\n          value = 1;\n          for (i=0 ; i<context_numBits ; i++) {\n            context_data_val = (context_data_val << 1) | value;\n            if (context_data_position == bitsPerChar-1) {\n              context_data_position = 0;\n              context_data.push(getCharFromInt(context_data_val));\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = 0;\n          }\n          value = context_w.charCodeAt(0);\n          for (i=0 ; i<16 ; i++) {\n            context_data_val = (context_data_val << 1) | (value&1);\n            if (context_data_position == bitsPerChar-1) {\n              context_data_position = 0;\n              context_data.push(getCharFromInt(context_data_val));\n              context_data_val = 0;\n            } else {\n              context_data_position++;\n            }\n            value = value >> 1;\n          }\n        }\n        context_enlargeIn--;\n        if (context_enlargeIn == 0) {\n          context_enlargeIn = Math.pow(2, context_numBits);\n          context_numBits++;\n        }\n        delete context_dictionaryToCreate[context_w];\n      } else {\n        value = context_dictionary[context_w];\n        for (i=0 ; i<context_numBits ; i++) {\n          context_data_val = (context_data_val << 1) | (value&1);\n          if (context_data_position == bitsPerChar-1) {\n            context_data_position = 0;\n            context_data.push(getCharFromInt(context_data_val));\n            context_data_val = 0;\n          } else {\n            context_data_position++;\n          }\n          value = value >> 1;\n        }\n\n\n      }\n      context_enlargeIn--;\n      if (context_enlargeIn == 0) {\n        context_enlargeIn = Math.pow(2, context_numBits);\n        context_numBits++;\n      }\n    }\n\n    // Mark the end of the stream\n    value = 2;\n    for (i=0 ; i<context_numBits ; i++) {\n      context_data_val = (context_data_val << 1) | (value&1);\n      if (context_data_position == bitsPerChar-1) {\n        context_data_position = 0;\n        context_data.push(getCharFromInt(context_data_val));\n        context_data_val = 0;\n      } else {\n        context_data_position++;\n      }\n      value = value >> 1;\n    }\n\n    // Flush the last char\n    while (true) {\n      context_data_val = (context_data_val << 1);\n      if (context_data_position == bitsPerChar-1) {\n        context_data.push(getCharFromInt(context_data_val));\n        break;\n      }\n      else context_data_position++;\n    }\n    return context_data.join('');\n  },\n\n  decompress: function (compressed) {\n    if (compressed == null) return \"\";\n    if (compressed == \"\") return null;\n    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });\n  },\n\n  _decompress: function (length, resetValue, getNextValue) {\n    var dictionary = [],\n        next,\n        enlargeIn = 4,\n        dictSize = 4,\n        numBits = 3,\n        entry = \"\",\n        result = [],\n        i,\n        w,\n        bits, resb, maxpower, power,\n        c,\n        data = {val:getNextValue(0), position:resetValue, index:1};\n\n    for (i = 0; i < 3; i += 1) {\n      dictionary[i] = i;\n    }\n\n    bits = 0;\n    maxpower = Math.pow(2,2);\n    power=1;\n    while (power!=maxpower) {\n      resb = data.val & data.position;\n      data.position >>= 1;\n      if (data.position == 0) {\n        data.position = resetValue;\n        data.val = getNextValue(data.index++);\n      }\n      bits |= (resb>0 ? 1 : 0) * power;\n      power <<= 1;\n    }\n\n    switch (next = bits) {\n      case 0:\n          bits = 0;\n          maxpower = Math.pow(2,8);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = resetValue;\n              data.val = getNextValue(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n        c = f(bits);\n        break;\n      case 1:\n          bits = 0;\n          maxpower = Math.pow(2,16);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = resetValue;\n              data.val = getNextValue(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n        c = f(bits);\n        break;\n      case 2:\n        return \"\";\n    }\n    dictionary[3] = c;\n    w = c;\n    result.push(c);\n    while (true) {\n      if (data.index > length) {\n        return \"\";\n      }\n\n      bits = 0;\n      maxpower = Math.pow(2,numBits);\n      power=1;\n      while (power!=maxpower) {\n        resb = data.val & data.position;\n        data.position >>= 1;\n        if (data.position == 0) {\n          data.position = resetValue;\n          data.val = getNextValue(data.index++);\n        }\n        bits |= (resb>0 ? 1 : 0) * power;\n        power <<= 1;\n      }\n\n      switch (c = bits) {\n        case 0:\n          bits = 0;\n          maxpower = Math.pow(2,8);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = resetValue;\n              data.val = getNextValue(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n\n          dictionary[dictSize++] = f(bits);\n          c = dictSize-1;\n          enlargeIn--;\n          break;\n        case 1:\n          bits = 0;\n          maxpower = Math.pow(2,16);\n          power=1;\n          while (power!=maxpower) {\n            resb = data.val & data.position;\n            data.position >>= 1;\n            if (data.position == 0) {\n              data.position = resetValue;\n              data.val = getNextValue(data.index++);\n            }\n            bits |= (resb>0 ? 1 : 0) * power;\n            power <<= 1;\n          }\n          dictionary[dictSize++] = f(bits);\n          c = dictSize-1;\n          enlargeIn--;\n          break;\n        case 2:\n          return result.join('');\n      }\n\n      if (enlargeIn == 0) {\n        enlargeIn = Math.pow(2, numBits);\n        numBits++;\n      }\n\n      if (dictionary[c]) {\n        entry = dictionary[c];\n      } else {\n        if (c === dictSize) {\n          entry = w + w.charAt(0);\n        } else {\n          return null;\n        }\n      }\n      result.push(entry);\n\n      // Add w+entry[0] to the dictionary.\n      dictionary[dictSize++] = w + entry.charAt(0);\n      enlargeIn--;\n\n      w = entry;\n\n      if (enlargeIn == 0) {\n        enlargeIn = Math.pow(2, numBits);\n        numBits++;\n      }\n\n    }\n  }\n};\n  return LZString;\n})();\n\nif (true) {\n  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return LZString; }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n} else {}\n\n\n//# sourceURL=webpack:///./node_modules/lz-string/libs/lz-string.js?");

/***/ }),

/***/ "./src/ajax/filter.js":
/*!****************************!*\
  !*** ./src/ajax/filter.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return filter; });\nfunction filter(str){\n  if(str.indexOf('liepin')>-1){\n    return false;\n  }else{\n    return true;\n  }\n  return false;\n}\n\n//# sourceURL=webpack:///./src/ajax/filter.js?");

/***/ }),

/***/ "./src/ajax/index.js":
/*!***************************!*\
  !*** ./src/ajax/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ajax; });\n/* harmony import */ var ajax_hook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ajax-hook */ \"./node_modules/ajax-hook/index.js\");\n/* harmony import */ var ajax_hook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajax_hook__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ \"./src/ajax/filter.js\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logger */ \"./src/logger/index.js\");\n\n\n\n\nlet _logger = Object(_logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n\nfunction ajax(){\n  ajax_hook__WEBPACK_IMPORTED_MODULE_0___default.a.hookAjax({\n    //hook callbacks\n    onreadystatechange({xhr}){\n      if(xhr.readyState === 4){      \n        if(xhr.status !== 200){\n          if(!Object(_filter__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(xhr.responseURL)){\n            console.log(xhr);\n            _logger.ajaxError(xhr);\n          }\n        }\n      }\n    },\n    onload(xhr){\n      console.log(\"onload called\");\n    },\n    send(fromData, xhr){\n      //let data = fromData.split('&').reduce((a, b)=> {\n      //  let [key, value] = b.split('=');\n      //  a[key] = value;\n      //  return a;\n      //}, {});\n      //console.log(data);\n      //console.log('====22');\n      //window.maebnData.push({\n      //  formData: fromData.split('&').reduce((a, b)=> {\n      //    let [key, value] = b.split('=');\n      //    a[key] = value;\n      //    return a;\n      //  }, {}),\n      //  url: xhr.responseURL\n      //});\n      ////console.log('send');\n      ////console.log(this);\n      //console.log(arguments);\n      //console.log('send');\n    },\n    //hook function\n    open(arg,xhr){\n      //console.log(arguments);\n      //console.log(\"open called: method:%s,url:%s,async:%s\",arg[0],arg[1],arg[2])\n    }\n  });\n}\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/ajax/index.js?");

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet config = {\n  namespace: 'WEB_LOG_MONITOR',\n  reportRate: 20,        //出现问题，上报的几率\n  ajaxCacheMax: 100,     //最大缓存ajax条数\n  clickCacheMax: 100,    //最大缓存click条数\n  jsWhiteList: [\n    {\n      errorMessage: '',\n      url: ''\n    }\n  ],       //js错误白名单\n  ajaxWhiteList: [],     //ajax错误白名单\n  send(type, json){      //上报规则\n    let rate = parseInt( Math.random()*100 ) + 1;\n    if(this.rate > config.reportRate) return false;\n    switch(type){\n      case 'jsError':\n        break;\n      case 'ajaxError':\n        break;\n    }\n  }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\n\n//# sourceURL=webpack:///./src/config/index.js?");

/***/ }),

/***/ "./src/event/index.js":
/*!****************************!*\
  !*** ./src/event/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return event; });\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger */ \"./src/logger/index.js\");\n\n\nfunction event(){\n  let _logger = Object(_logger__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n  document.addEventListener('click', event=> _logger.click(event), true);\n\n  window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, error){\n\n    if(!scriptURI) return;\n    if(errorMessage==='Script error.') return;\n\n\n    _logger.jsError({\n      errorMessage, \n      scriptURI, \n      lineNumber, \n      columnNumber,\n      error\n    });\n  };\n}\n\n\n\n//# sourceURL=webpack:///./src/event/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax */ \"./src/ajax/index.js\");\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event */ \"./src/event/index.js\");\n//import DomMonitor from './dom-monitor';\n\n\n\n\nsetTimeout(function(){\n  Object(_event__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  Object(_ajax__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n}, 500);\n\n\n\n//let domMonitor = new DomMonitor();\n//domMonitor.observer();  \n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/logger/ajax-error.js":
/*!**********************************!*\
  !*** ./src/logger/ajax-error.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ajaxError; });\nfunction ajaxError(xhr){\n  let time = Date.now();\n  return {\n    type: 'ajaxError',\n    url: xhr.responseURL,\n    formData: '{}',\n    status: xhr.status,\n    statusText: xhr.statusText,\n    timeout: xhr.timeout,\n    time\n  }\n}\n\n\n//# sourceURL=webpack:///./src/logger/ajax-error.js?");

/***/ }),

/***/ "./src/logger/gc.js":
/*!**************************!*\
  !*** ./src/logger/gc.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return gc; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ \"./src/config/index.js\");\n\n\nfunction gc(type, arr){\n  switch(type){\n    case 'click':\n      arr.length > _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].clickCacheMax * 2 && arr.splice(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].clickCacheMax);\n      break;\n    case 'ajax':\n      arr.length > _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ajaxCacheMax * 2 && arr.splice(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ajaxCacheMax);\n      break;\n  }\n}\n\n//# sourceURL=webpack:///./src/logger/gc.js?");

/***/ }),

/***/ "./src/logger/index.js":
/*!*****************************!*\
  !*** ./src/logger/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return logger; });\n/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page */ \"./src/logger/page.js\");\n/* harmony import */ var _ajax_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ajax-error */ \"./src/logger/ajax-error.js\");\n/* harmony import */ var _gc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gc */ \"./src/logger/gc.js\");\n/* harmony import */ var _js_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js-error */ \"./src/logger/js-error.js\");\n/* harmony import */ var _xpath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../xpath */ \"./src/xpath/index.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ \"./src/config/index.js\");\n/* harmony import */ var lz_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lz-string */ \"./node_modules/lz-string/libs/lz-string.js\");\n/* harmony import */ var lz_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lz_string__WEBPACK_IMPORTED_MODULE_6__);\n//import db from '../db';\n\n\n\n\n\n\n\n\nclass Logger{\n  constructor(){\n    this.ajaxData = [];\n    this.clickData = [];\n  }\n  ajaxError(xhr){\n    this.send('ajaxError', {...Object(_page__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(), click: this.clickData, ...Object(_ajax_error__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(xhr)});\n  }\n  jsError(...arg){\n    this.send('jsError', {...Object(_page__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(), click: this.clickData, ...Object(_js_error__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(...arg)});\n  }\n  ajax({url, method}){\n    _config__WEBPACK_IMPORTED_MODULE_5__[\"default\"].jsWhiteList.some(v=> {\n      if(typeof v === 'function'){\n        \n      }\n    });\n    this.ajaxData.push({url, method, time: Date.now()});\n    Object(_gc__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('ajax', this.ajaxData);\n  }  \n  click(event){\n    this.clickData.push({xpath: Object(_xpath__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(event.target), time: Date.now()});\n    Object(_gc__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('click', this.clickData);\n  }\n  custom(json={}){        //\n    this.send(json);\n  }\n  send(type, json){\n    json.time = Date.now();\n    let _sendCallback = _config__WEBPACK_IMPORTED_MODULE_5__[\"default\"].send(type, json);\n    if(_sendCallback===false){\n      return;\n    }else if(_sendCallback){\n      json = _sendCallback\n    }\n    console.log(JSON.stringify(json).length);\n    //console.log(LZString.compress(JSON.stringify(json)).length);\n  }\n  save(){\n    //..\n  }\n}\n\nfunction logger(){\n  let {namespace} = _config__WEBPACK_IMPORTED_MODULE_5__[\"default\"];\n  let _logger;\n  window[namespace] = window[namespace] || {};\n\n  if(!window[namespace].logger){\n    _logger = new Logger();\n    window[namespace].logger = _logger;\n  }else{\n    _logger = window[namespace].logger;\n  }\n  return _logger;\n}\n\n\n\n//# sourceURL=webpack:///./src/logger/index.js?");

/***/ }),

/***/ "./src/logger/js-error.js":
/*!********************************!*\
  !*** ./src/logger/js-error.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return jsError; });\nfunction jsError({\n  errorMessage,\n  scriptURI,\n  lineNumber,\n  columnNumber,\n  error\n}){\n  let errType = 'Error';\n  let all_msg = errorMessage;\n  if (errorMessage) {\n    errorMessage = errorMessage.split(/\\s*:\\s*/);\n    if (errorMessage.length === 2) {\n      errType = errorMessage[0].replace('Uncaught ', '');\n      errorMessage = errorMessage[1];\n    }\n  }\n  return {\n    type: 'jsError',\n    errType: errType,\n    msg: errorMessage,\n    all_msg,\n    jsFile: scriptURI,\n    lineNum: lineNumber,\n    colNum: columnNumber || 0\n  };\n}\n\n//# sourceURL=webpack:///./src/logger/js-error.js?");

/***/ }),

/***/ "./src/logger/page.js":
/*!****************************!*\
  !*** ./src/logger/page.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return page; });\nfunction page(){\n  let url = location.href;\n  let {\n    domainLookupEnd, \n    domainLookupStart, \n    connectEnd, \n    connectStart, \n    responseEnd, \n    responseStart, \n    domComplete,\n    domInteractive,\n    navigationStart,\n    domContentLoadedEventEnd,\n    loadEventEnd\n  } = window.performance.timing;\n  return {\n    url,\n    dns: domainLookupEnd - domainLookupStart,\n    tcp: connectEnd - connectStart,\n    request: responseEnd - responseStart,\n    dom: domComplete - domInteractive,\n    whitescreen: responseStart - navigationStart,\n    domready: domContentLoadedEventEnd - navigationStart,\n    onload: loadEventEnd - navigationStart,\n    userid: (window.LT && window.LT.User.user_id) || '',\n    userAgent: window.navigator.userAgent\n  }\n}\n\n\n//# sourceURL=webpack:///./src/logger/page.js?");

/***/ }),

/***/ "./src/xpath/index.js":
/*!****************************!*\
  !*** ./src/xpath/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return xpath; });\nclass Xpath{\n  constructor(element){\n    this.element = element;\n  }\n  getParents(){\n    let parents = [this.element];\n    let func = function(element){\n      let pn = element.parentNode;\n      if(pn && pn!==document){\n        parents.push(pn);\n        func(pn);\n      }\n      return parents;\n    }\n    return func(this.element);\n  }\n  attributesToStringify(obj){\n    return typeof obj === 'object' ? `${obj.name}=${obj.value}` : '';\n  }\n  stringify(){\n    let filterReg = /^(class|id|data-selector)$/;\n    return this.getParents().map(v=> {\n      let attributes = v.attributes;\n      attributes = Object.keys(attributes)\n                      .filter(v=> filterReg.test(attributes[v].name))\n                      .map(v=> this.attributesToStringify(attributes[v]));\n      return v.tagName.toLowerCase() + (attributes.length>0 ? `[${attributes.join()}]`: '');\n    }).reverse().join('>');\n  }\n  render(){\n    return this.stringify().replace(/^html>body>/, '');\n  }\n}\nfunction xpath(...arg){\n  return new Xpath(...arg).render();\n}\n\n\n//# sourceURL=webpack:///./src/xpath/index.js?");

/***/ })

/******/ });