const { dialog } = require("electron").remote;
let fs = require("fs"),
    nopt = require("nopt");
require("./assets/hexedit");
$("#open-dialog-btn").click(openDialog);

function openDialog() {
    let result = dialog.showOpenDialogSync(),
        buffer,
        path = result[0];

    buffer = fs.readFileSync(path, "utf8");
    console.log(1);

    // let hexcode = hexy.hexy(buffer, hexedit.hexy.opt);
    // console.log(2);

    // $("#hex-content").html(hexcode);
    // console.log(3);

    var opts = nopt(
        {
            width: Number,
            numbering: ["hex_bytes", "none"],
            format: ["fours", "twos", "none"],
            caps: ["lower", "upper"],
            annotate: ["ascii", "none"],
            prefix: String,
            indent: Number,
            help: Boolean,
        },
        { h: "--help" }
    );

    var defaults = {
        width: 32,
        numbering: "hex_bytes",
        format: "fours",
        caps: "lower",
        annotate: "ascii",
        prefix: "",
        indent: 0,
        html: true,
    };

    if (opts.argv.remain.length !== 1 || opts.help) {
        console.error("Usage: hexedit [options] <file>");
        console.error("Options are identical to hexy's:");
        console.error(
            " --width     [(16)]              how many bytes per line"
        );
        console.error(
            " --numbering [(hex_bytes)|none]  prefix current byte count"
        );
        console.error(
            " --format    [(fours)|twos|none] how many nibbles per group"
        );
        console.error(" --caps      [(lower)|upper]     case of hex chars");
        console.error(
            " --annotate  [(ascii)|none]      provide ascii annotation"
        );
        console.error(
            ' --prefix    [("")|<prefix>]     printed in front of each line'
        );
        console.error(
            " --indent    [(0)|<num>]         number of spaces to indent output"
        );
        console.error(" --help|-h                       display this message");
        process.exit(opts.help ? 0 : 1);
    }

    opts.__proto__ = defaults;
    var n = opts.prefix.length + opts.indent;

    var header = "# ";
    if (opts.numbering !== "none") {
        header += new Array(n + 1).join(" ") + "offset: ";
        n += 10;
    }
    var width = opts.width;
    var spaces =
        opts.format === "fours"
            ? Math.ceil(width / 2) - 1
            : opts.format === "twos"
            ? width + 1
            : 0;

    var b = 2 * opts.width + spaces;
    n += b + 1;
    header += "data" + new Array(b - 1).join(" ");

    if (opts.annotate !== "none") {
        header += "# ascii";
    }

    var hexy = require("hexy").hexy;
    var buf = hexy(buffer, opts);
    $("#hex-content").html(header);
}
//.html(buf);
