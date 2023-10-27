import { Plugin } from 'vite'
import fs from 'node:fs'
import * as ElectronBuilder from 'electron-builder'
import path from 'node:path'
export const electronBuildPlugin = (electronFunc: Function): Plugin => {
    return {
        name: 'liveroom-oxr',
        // 等待vite打包完成后执行
        closeBundle() {
            electronFunc()
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
            pkg.main = 'index.js'
            fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, 4))
            // 预防垃圾文件下载
            fs.mkdirSync('dist/node_modules')
            ElectronBuilder.build({
                config: {
                    productName: 'liveroom-oxr',
                    files: ['**/*'],
                    directories: {
                        output: path.resolve(process.cwd(), 'release'),
                        app: path.resolve(process.cwd(), 'dist')
                    },
                    // 压缩
                    asar: true,
                    appId: 'com.oxr.liveroom',
                    nsis: {
                        oneClick: false,
                        allowToChangeInstallationDirectory: true
                    }
                }
            })
        }
    }
}
