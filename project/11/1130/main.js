const { app } = require("electron");
const { BrowserWindow } = require("electron");

let mainWin;

function createWindow() {
    //Browser 생성 옵션 설정
    mainWin = new BrowserWindow({
        width: 660,
        height: 750,
        backgroundColor: "#eeeeee",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });

    //브라우저에 띄울 html 파일 로드
    mainWin.loadURL(`file://${__dirname}/index.html`);

    //브라우저 closed 발생 시 window를 null값으로 설정
    mainWin.on("closed", function () {
        mainWin = null;
    });
}

// electron이 준비 완료되면 createWindow 실행
app.on("ready", createWindow);

//모든 윈도우가 닫히면 종료
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
