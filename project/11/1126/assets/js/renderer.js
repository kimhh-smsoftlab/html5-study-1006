const { ipcRenderer } = require("electron");
document.querySelector("#close").addEventListener("click", function () {
    ipcRenderer.send("close");
});
