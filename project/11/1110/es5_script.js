"use strict";

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(
                target,
                Object.getOwnPropertyDescriptors(source)
            );
        } else {
            ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(
                    target,
                    key,
                    Object.getOwnPropertyDescriptor(source, key)
                );
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var FolderPathC = /*#__PURE__*/ (function () {
    function FolderPathC(options) {
        _classCallCheck(this, FolderPathC);

        options = _objectSpread(
            {
                elem: document.querySelector(".folderpath-content"),
                viewType: 0,
                arPath: [],
                template:
                    '<span class="path-item">\n    <span class="path-item-str"></span>\n    <i class="fas fa-angle-right"></i></span>',
            },
            options
        );
        this.init(options);
    }

    _createClass(FolderPathC, [
        {
            key: "init",
            value: function init(options) {
                this.__elem = options.elem;
                this.__viewType = options.viewType;
                this.__arPath = options.arPath;
                this.__template = options.template;
            },
        },
        {
            key: "createPath",
            value: function createPath(str) {
                this.arPath = str;
                this.clearPath();

                for (var i = 0; i < this.arPathLength; i++) {
                    this.addPath(this.__arPath[i]);
                }
            },
        },
        {
            key: "createNewPathItemEl",
            value: function createNewPathItemEl() {
                var div = document.createElement("div");
                div.innerHTML = this.__template;
                return div.firstElementChild;
            },
        },
        {
            key: "updatePathItem",
            value: function updatePathItem(pathEl, str) {
                pathEl.querySelector(".path-item-str").textContent = str; // this.setupStyle(pathEl); // 아이템 레이아웃 설정
            }, // setupStyle(pathEl){
            //     pathEl.style.s
            // }
        },
        {
            key: "setPathClickEventListener",
            value: function setPathClickEventListener(pathEl) {
                var _this = this;

                pathEl.addEventListener("click", function (_) {
                    return _this.selectPath(pathEl);
                });
            },
        },
        {
            key: "selectPath",
            value: function selectPath(pathEl) {
                var viewtype = this.__viewType;
                this.removePathActive();

                switch (viewtype) {
                    case 0:
                        this.addPathActive(pathEl);
                        break;

                    case 1:
                        this.removePath(pathEl);
                        break;
                    //case 2,3...:
                }
            },
        },
        {
            key: "addPathActive",
            value: function addPathActive(pathEl) {
                pathEl && pathEl.setAttribute("active", ""); //새로 active 설정
            },
        },
        {
            key: "removePathActive",
            value: function removePathActive() {
                var activePathEl = this.activePathEl;
                activePathEl && activePathEl.removeAttribute("active");
            },
        },
        {
            key: "removePath",
            value: function removePath(pathEl) {
                while (pathEl.nextElementSibling) {
                    pathEl.parentNode.removeChild(pathEl.nextElementSibling);
                }
            },
        },
        {
            key: "addPath",
            value: function addPath(str) {
                var pathEl = this.createNewPathItemEl();

                this.__elem.appendChild(pathEl);

                this.updatePathItem(pathEl, str);
                this.setPathClickEventListener(pathEl);
            },
        },
        {
            key: "clearPath",
            value: function clearPath() {
                while (this.__elem.hasChildNodes()) {
                    this.__elem.firstChild.remove();
                }
            },
        },
        {
            key: "viewType",
            set: function set(num) {
                this.__viewType = num;
            },
        },
        {
            key: "arPath",
            set: function set(str) {
                if (!str) {
                    alert("잘못된 입력");
                    return;
                }

                this.__arPath = str.split("\\").filter(function (s) {
                    return s;
                });
            },
        },
        {
            key: "arPathLength",
            get: function get() {
                return this.__arPath.length;
            },
        },
        {
            key: "activePathEl",
            get: function get() {
                return this.__elem.querySelector(".path-item[active]");
            },
        },
        {
            key: "pathEls",
            get: function get() {
                /* 개념 확실히 숙지할것  */
                return Array.prototype.slice.call(
                    this.__elem.querySelectorAll(".path-item")
                );
            },
        },
    ]);

    return FolderPathC;
})();
/* 실행 코드 */

var viewType = 0;
var el = document.querySelector(".folderpath-content"),
    folderPath = new FolderPathC({
        elem: el,
    });
document
    .querySelector("button[data-create-path]")
    .addEventListener("click", function () {
        var input = document.querySelector("input[data-path-input]").value;
        folderPath.createPath(input);
    });
document
    .querySelector("input[data-view-type]")
    .addEventListener("click", function () {
        viewType = viewType == 1 ? 0 : ++viewType;
        folderPath.viewType = viewType;
    });
var html = document.documentElement;
document.documentElement.setAttribute("data-theme", localStorage.theme);
document
    .querySelector("button[data-set-theme]")
    .addEventListener("click", function (e) {
        var target = e.target,
            newTheme = target.getAttribute("data-set-theme");

        if (newTheme == "dark") {
            target.setAttribute("data-set-theme", "light");
            target.textContent = "Light Mode";
        } else {
            target.setAttribute("data-set-theme", "dark");
            target.textContent = "Dark Mode";
        }

        if (newTheme) {
            html.setAttribute("data-theme", newTheme);
            localStorage.theme = newTheme;
        }
    });
