let $main = $(".main");
$main.attr("position", "absolute");
$main
    .css({ "background-color": "blue" }, 1000)
    .animate({ width: "200px", height: "300px" }, 1000)
    .toggle(1000)
    .toggle(1000);
