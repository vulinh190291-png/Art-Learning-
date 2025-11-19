import {
  __commonJS
} from "./chunk-P2LSHJDD.js";

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/helper/isMultiUpload.js
var require_isMultiUpload = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/helper/isMultiUpload.js"(exports, module) {
    module.exports = function isMultiUpload(config) {
      return Array.isArray(config.files) && config.files.length > 0;
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/helper/isUploadFile.js
var require_isUploadFile = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/helper/isUploadFile.js"(exports, module) {
    var isMultiUpload = require_isMultiUpload();
    module.exports = function isUploadFile(config) {
      if (config.method === "post") {
        if (config.filePath && config.name)
          return true;
        if (isMultiUpload(config))
          return true;
      }
      return false;
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    var kindOf = /* @__PURE__ */ function(cache) {
      return function(thing) {
        var str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      };
    }(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type) {
      type = type.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type;
      };
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter) {
      var props;
      var i;
      var prop;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if (!merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position) {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      var lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
    function toArray(thing) {
      if (!thing)
        return null;
      var i = thing.length;
      if (isUndefined(i))
        return null;
      var arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    }
    var isTypedArray = /* @__PURE__ */ function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray,
      isFileList
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/core/AxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
      // eslint-disable-next-line func-names
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module.exports = AxiosError;
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/helper/format.js
var require_format = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/helper/format.js"(exports, module) {
    var settle = require_settle();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var isUploadFile = require_isUploadFile();
    module.exports = function format(config, resolve, reject) {
      const fullPath = buildFullPath(config.baseURL, config.url);
      const requestHeaders = config.headers;
      const uniConfig = {
        ...config,
        url: buildURL(fullPath, config.params, config.paramsSerializer),
        // uniapp 用的是 header
        header: requestHeaders
      };
      if (isUploadFile(config)) {
        delete requestHeaders["Content-Type"];
        if (config.formData) {
          uniConfig.formData = config.formData;
        } else {
          if (typeof config.data === "string") {
            uniConfig.formData = JSON.parse(config.data);
          } else {
            uniConfig.formData = config.data;
          }
        }
      } else if (config.method === "get") {
        uniConfig.data = config.data ? config.data : config.params;
      } else {
        uniConfig.data = config.data;
      }
      if (config.auth) {
        var username = config.auth.username || "";
        var password = unescape(encodeURIComponent(config.auth.password)) || "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      uniConfig.complete = function(response) {
        var result = {
          data: response.data,
          status: response.statusCode,
          statusText: response.errMsg,
          header: response.header,
          config
          // request: request
        };
        settle(resolve, reject, result);
      };
      return uniConfig;
    };
  }
});

// ../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/index.js
var require_axios_adapter_uniapp = __commonJS({
  "../../../../CodeHome/hy/hy-app/node_modules/axios-adapter-uniapp/index.js"(exports, module) {
    var isUploadFile = require_isUploadFile();
    var format = require_format();
    function uniappAdapter(config = {}) {
      return new Promise(function dispatchUniApp(resolve, reject) {
        const uniConfig = format(config, resolve, reject);
        let requestTask = null;
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!requestTask) {
              return;
            }
            requestTask.abort();
            reject(cancel);
            requestTask = null;
          });
        }
        if (isUploadFile(config)) {
          requestTask = uni.uploadFile(uniConfig);
        } else {
          requestTask = uni.request(uniConfig);
        }
      });
    }
    module.exports = uniappAdapter;
    module.exports.default = uniappAdapter;
  }
});
export default require_axios_adapter_uniapp();
//# sourceMappingURL=axios-adapter-uniapp.js.map
