const { ipcRenderer } = require("electron");

(window.ipc = window.ipc || {}),
    (function (n) {
        ipc.messaging = {
            ...ipc.messaging,
            sendCloseMainWindow: function () {
                ipcRenderer.send("close-main-window", "ar-argument");
            },
        };

        n(function () {
            $("#close").click(function () {
                ipc.messaging.sendCloseMainWindow();
            });
        });
    })(jQuery);
