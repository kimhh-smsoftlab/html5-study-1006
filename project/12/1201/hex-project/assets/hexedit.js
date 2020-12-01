let hexedit = (function () {
    opts = {
        width: 16,
        numbering: "hex_bytes",
        format: "twos",
        caps: "lower",
        annotate: "ascii",
        prefix: "",
        indent: 0,
    };

    function item() {
        let template = `<div class="hex-edit-row" style="display:flex">
        <div class="first" style="flex:1"></div>
        <div class="second"style="display:flex; flex:3;">
            <div style="flex:1"></div><div style="flex:1"></div>
            <div style="flex:1"></div><div style="flex:1"></div>
            <div style="flex:1"></div><div style="flex:1"></div>
            <div style="flex:1"></div><div style="flex:1"></div>
            <div style="flex:1"></div><div style="flex:1"></div>
            <div style="flex:1"></div><div style="flex:1"></div>
            <div style="flex:1"></div><div style="flex:1"></div>
            <div style="flex:1"></div><div style="flex:1"></div>
        </div>
        <div class="third"style="flex:1"></div>
    </div>`;
        let box = document.createElement("div");
        box.innerHTML = template;
        return box.firstElementChild;
    }

    return {
        create: function (buffer) {
            let hexy = require("hexy").hexy,
                div = document.createElement("div"),
                buf = hexy(buffer, opts),
                arbuf = buf.split("\n");

            arbuf.forEach(function (s) {
                let box = item(),
                    arS = s.split(" "),
                    offset = arS[0],
                    ascii = arS[arS.length - 1],
                    code = arS.slice(1, -2);

                $(box).find(".first").text(offset);
                Array.from($(box).find(".second > div")).forEach(function (
                    d,
                    index
                ) {
                    d.textContent = code[index];
                });
                $(box).find(".third").text(ascii);
                $(div).append(box);
            });

            return div;
        },
    };
})();

exports.hexedit = hexedit;
