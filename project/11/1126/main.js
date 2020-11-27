const electron = require("electron");

let path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

// 메인윈도우는 전역으로
let mainWindow;

function createWindow() {
    //Browser 생성 옵션 설정
    mainWindow = new BrowserWindow({
        width: 1281,
        height: 800,
        frame: false,
        backgroundColor: "#312450",
        show: false,
        icon: path.join(__dirname, "assets/icons/png/64x64.png"),
        // minWidth: 1281,
        // minHeight: 800,
        //앱 내부의 require, process, __dirname 등에 접근하기 위해 필요하다.
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });

    //브라우저에 띄울 html 파일 로드
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    //브라우저 closed 발생 시 window를 null값으로 설정
    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    require("./menu/mainmenu");

    //window show: true로 설정
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
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

// 애플리케이션이 활성화될 때
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
//ipc통신 close 이벤트 발생 시 윈도우 종료
ipcMain.on("close", (event, arg) => {
    mainWindow.close();
});
