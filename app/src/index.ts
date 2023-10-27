// main process
import { app, BrowserWindow } from 'electron'
app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            // 可以在渲染进程中使用node api，默认false
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: true
        }
    })
    // 打开开发者工具
    win.webContents.openDevTools()
    // 若参数（IP）在进程中可以读到，则为开发环境
    if (process.argv[2]) win.loadURL(process.argv[2])
    else win.loadFile('./index.html')
})
