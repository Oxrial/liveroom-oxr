import type { Plugin, ViteDevServer } from 'vite'
import type { AddressInfo } from 'net'
import fs from 'node:fs'

export const electronDevPlugin = (electronFunc: Function, processFunc: Function): Plugin => {
    return {
        name: 'liveroom-oxr-dev',
        configureServer(server: ViteDevServer) {
            electronFunc()
            server.httpServer.on('listening', () => {
                const address = server.httpServer.address() as AddressInfo
                console.log(`server listening on ${address.port}`)
                const IP = `http://localhost:${address.port}`
                // electron进程
                processFunc(IP)
                let electronProcess = processFunc(IP)
                // 热更新
                fs.watchFile('./src/index.js', () => {
                    electronProcess.kill()
                    electronFunc()
                    electronProcess = processFunc(IP)
                })
                electronProcess.stdout?.on('data', data => console.log(`日志: ${data}`))
            })
        }
    }
}
