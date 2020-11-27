const { ipcMain, dialog, app } = require("electron");

//OpebDialog
ipcMain.on("show-open-dialog", (event, arg) => {
    const options = {};
    const result = dialog.showOpenDialogSync(options);

    event.sender.send("open-dialog-paths-selected", result);
});

//SaveDialog
ipcMain.on("show-save-dialog", (event, agr) => {
    const options = {
        title: "Save current page as a pdf",
        defaultPath: app.getPath("documents") + "/electron-tutorial-app.pdf",
    };
    const result = dialog.showSaveDialogSync(options);
    console.log(result);
});

//ErrorBox
ipcMain.on("show-error-box", (event, agr) => {
    const title = "Error Box",
        content = "Help us improve your experience by sending an error report";
    dialog.showErrorBox(title, content);
});

//
ipcMain.on("show-message-box", (event, agr) => {
    const options = {
        type: "question",
        buttons: ["Cancel", "Yes, please", "No, thanks"],
        defaultId: 2,
        title: "Question",
        message: "Do you want to do this?",
        detail: "It does not really matter",
        checkboxLabel: "Remember my answer",
        checkboxChecked: true,
    };

    //클릭된 버튼의 인덱스를 반환
    const response = dialog.showMessageBoxSync(options);
    console.log(response);
});
