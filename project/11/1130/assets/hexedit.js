(window.hexedit = window.hexedit || {}),
    (function (n) {
        var nopt = require("nopt");
        hexedit.hexy = {
            opts: nopt(
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
            ),

            defaults: {
                width: 16,
                numbering: "hex_bytes",
                format: "fours",
                caps: "lower",
                annotate: "ascii",
                prefix: "",
                indent: 0,
            },

            aaa: function () {
                var opts = (hexedit.hexy.opts = hexedit.hexy.defaults);
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
                // var buf = new Buffer(
                //     [header]
                //         .concat(
                //             hexy(fs.readFileSync(file), opts)
                //                 .split("\n")
                //                 .map(function (s) {
                //                     if (!s.trim()) return s.trim();
                //                     return s.slice(0, n + 1) + "#" + s.slice(n);
                //                 })
                //         )
                //         .join("\n")
                // );
            },
        };

        n(function () {
            hexedit.hexy.aaa();
        });
    })(jQuery);
