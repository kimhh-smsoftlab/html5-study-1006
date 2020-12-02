const { dialog } = require("electron").remote;
let fs = require("fs"),
    nopt = require("nopt"),
    hexy = require("hexy");
require("./assets/hexedit");
$("#open-dialog-btn").click(openDialog);

function openDialog() {
    let result = dialog.showOpenDialogSync(),
        buffer,
        path = result[0];

    buffer = fs.readFileSync(path, "utf8");
    console.log(1);

    let hexcode = hexy.hexy(buffer, hexedit.hexy.opt);
    console.log(2);

    $("#hex-content").html(hexcode);
    console.log(3);
}
