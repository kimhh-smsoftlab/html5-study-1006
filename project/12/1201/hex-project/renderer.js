const { dialog } = require("electron").remote;
let fs = require("fs");
let hexedit = require("./assets/hexedit.js").hexedit;

$("#open-dialog-btn").click(openDialog);

function openDialog() {
    let result = dialog.showOpenDialogSync(),
        buffer,
        path = result[0];

    buffer = fs.readFileSync(path, "utf8");

    $("#hex-content").append(hexedit.create(buffer));
}
