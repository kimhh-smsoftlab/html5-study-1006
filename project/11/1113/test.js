let a = document.querySelector(".overflow_box");
let b = document.querySelector(".text_box");
let c = document.querySelectorAll(".viewport_div > div");
let d = document.querySelector(".viewport_div");
let startNode;
b.textContent = a.scrollTop;

a.addEventListener("scroll", function () {
    startNode = Math.floor(a.scrollTop / 100);
    b.textContent = `scrollTop : ${a.scrollTop},  scrollHeight: ${
        a.scrollHeight
    }, startNode: ${startNode}, finalNode : ${startNode + 10}`;
    checkPosition(startNode);
});

function checkPosition(stNode) {
    //아래로 스크롤
    startNode = Math.max(0, stNode - 5);
    finalNode = startNode + 15;
    // if( item idx가 startNode보다 작으면 삭제 ){}
    if (d.firstElementChild.dataset["idx"] < startNode) {
        d.removeChild(d.firstChild);
    }

    if (d.firstElementChild.dataset["idx"] > startNode) {
        let newdiv = document.createElement("div");
        newdiv.textContent = startNode * 100;
        newdiv.setAttribute("data-idx", startNode);
        newdiv.style.top = startNode * 100;
        d.prepend(newdiv);
    }

    // if( 현재 그려진 갯수가 visibleNodeCount 보다 작으면 ){}
    if (d.lastElementChild.dataset["idx"] < finalNode) {
        let newdiv = document.createElement("div");
        newdiv.textContent = finalNode * 100;
        newdiv.setAttribute("data-idx", finalNode);
        newdiv.style.top = finalNode * 100;
        d.appendChild(newdiv);
    }

    if (d.lastElementChild.dataset["idx"] > finalNode) {
        d.removeChild(d.lastChild);
    }
}

let i,
    l = c.length;
for (i = 0; i < l; i++) {
    c[i].setAttribute("data-idx", i);
    c[i].textContent = i * 100;
    c[i].style.top = i * 100;
}

/* 






*/
/**
 * Creates a virtually-rendered scrollable list.
 * @param {object} config
 * @constructor
 */
function VirtualList(config) {
    var width = (config && config.w + "px") || "100%";
    var height = (config && config.h + "px") || "100%";
    var itemHeight = (this.itemHeight = config.itemHeight);

    this.items = config.items;
    this.columns = config.columns;
    this.generatorFn = config.generatorFn;
    this.totalRows = config.totalRows || (config.items && config.items.length);

    var scroller = VirtualList.createScroller(itemHeight * this.totalRows);
    this.container = VirtualList.createContainer(width, height);
    this.container.appendChild(scroller);

    var screenItemsLen = Math.ceil(config.h / itemHeight);
    // Cache 4 times the number of items that fit in the container viewport
    this.cachedItemsLen = screenItemsLen * 3;
    this._renderChunk(this.container, 0);

    var self = this;
    var lastRepaintY;
    var maxBuffer = screenItemsLen * itemHeight;
    var lastScrolled = 0;

    // As soon as scrolling has stopped, this interval asynchronouslyremoves all
    // the nodes that are not used anymore
    this.rmNodeInterval = setInterval(function () {
        if (Date.now() - lastScrolled > 100) {
            var badNodes = document.querySelectorAll('[data-rm="1"]');
            for (var i = 0, l = badNodes.length; i < l; i++) {
                self.container.removeChild(badNodes[i]);
            }
        }
    }, 300);

    function onScroll(e) {
        e = e || window.event; //ie
        var te = e.target || e.srcElement; //ie
        var scrollTop = te.scrollTop; // Triggers reflow
        if (!lastRepaintY || Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
            var first = parseInt(scrollTop / itemHeight) - screenItemsLen;
            self._renderChunk(self.container, first < 0 ? 0 : first);
            lastRepaintY = scrollTop;
        }

        lastScrolled = Date.now();
        e.preventDefault && e.preventDefault();
    }

    if (this.container.attachEvent)
        this.container.attachEvent("onscroll", onScroll);
    else this.container.addEventListener("scroll", onScroll);
}

VirtualList.prototype.createRow = function (i) {
    var item;
    if (this.generatorFn) item = this.generatorFn(i, this.items);
    else if (this.items) {
        if (typeof this.items[i] === "string") {
            var itemText = document.createTextNode(this.items[i]);
            item = document.createElement("div");
            item.style.height = this.itemHeight + "px";
            item.appendChild(itemText);
        } else {
            //Object
            item = document.createElement("div");
            item.style.height = this.itemHeight + "px";
            item.classList.add("fila");
            var left = 0;
            for (var j = 0; j < this.columns.length; j++) {
                //this.items[i]){
                var column = this.columns[j];
                var celdaText = document.createTextNode(
                    this.items[i][column.field]
                );
                celda = document.createElement("div");
                celda.appendChild(celdaText);
                celda.style.left = left + "px";
                celda.style.right =
                    this.container.clientWidth - left - column.width + "px";
                left += column.width;
                celda.classList.add("celda");
                celda.classList.add("noselect");
                item.appendChild(celda);
            }
        }
    }

    item.classname = "vrow";
    item.style.position = "absolute";
    item.style.top = i * this.itemHeight + "px";
    return item;
};

/**
 * Renders a particular, consecutive chunk of the total rows in the list. To
 * keep acceleration while scrolling, we mark the nodes that are candidate for
 * deletion instead of deleting them right away, which would suddenly stop the
 * acceleration. We delete them once scrolling has finished.
 *
 * @param {Node} node Parent node where we want to append the children chunk.
 * @param {Number} from Starting position, i.e. first children index.
 * @return {void}
 */
VirtualList.prototype._renderChunk = function (node, from) {
    var finalItem = from + this.cachedItemsLen;
    if (finalItem > this.totalRows) finalItem = this.totalRows;

    // Append all the new rows in a document fragment that we will later append to
    // the parent node
    var fragment = document.createDocumentFragment();
    for (var i = from; i < finalItem; i++) {
        fragment.appendChild(this.createRow(i, this.items));
    }

    // Hide and mark obsolete nodes for deletion.
    for (var j = 1, l = node.childNodes.length; j < l; j++) {
        node.childNodes[j].style.display = "none";
        node.childNodes[j].setAttribute("data-rm", "1");
    }
    node.appendChild(fragment);
};

VirtualList.createContainer = function (w, h) {
    var c = document.createElement("div");
    c.style.width = w;
    c.style.height = h;
    c.style.overflow = "auto";
    c.style.position = "relative";
    c.style.padding = 0;
    c.style.border = "1px solid black";
    return c;
};

VirtualList.createScroller = function (h) {
    var scroller = document.createElement("div");
    scroller.style.opacity = 0;
    scroller.style.position = "absolute";
    scroller.style.top = 0;
    scroller.style.left = 0;
    scroller.style.width = "1px";
    scroller.style.height = h + "px";
    return scroller;
};

items = window.mastercode.slice();
var columns = [
    { id: "id1", field: "code", name: "Attr1", width: 100 },
    { id: "id2", field: "csname", name: "Attr3", width: 100 },
    { id: "id3", field: "name", name: "Attr2", width: 100 },
];

/* VirtualList 생성 */
var list = new VirtualList({
    w: 500,
    h: 200,
    itemHeight: 50,
    totalRows: 1000,
    items: items,
    columns: columns,
});

document.getElementById("container").appendChild(list.container);
