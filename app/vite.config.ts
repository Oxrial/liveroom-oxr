import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import { electronDevPlugin } from './plugins/vite.electron.dev'
import { electronBuildPlugin } from './plugins/vite.electron.build'
import { spawn } from 'child_process'
import fs from 'node:fs'
export const buildElectron = () => {
    require('esbuild').buildSync({
        entryPoints: ['./src/index.ts'],
        outfile: './dist/index.js',
        // 打入所有依赖
        bundle: true,
        platform: 'node',
        target: 'node16',
        minify: true,
        external: ['electron']
    })
}
const buildProcess = (IP: string) =>
    spawn(
        require('electron'),
        // 给进程传递的参数列表
        ['dist/index.js', IP],
        // 如何生成进程，进程详细配置
        {
            // 子进程独立
            detached: true,
            // 父进程与子进程不存在交互联系
            stdio: 'ignore'
        }
    ) // => 0进程 1dist/index.js 2IP
// https://vitejs.dev/config/
export default defineConfig({
    // 使用相对路径，绝对路径会白屏
    base: './',
    server: {
        port: 3000,
        // host: '0.0.0.0',
        proxy: {
            '/': {
                target: 'http://127.0.0.1:3001/api/v1',
                changeOrigin: true,
                rewrite: path => path.replace('/', '')
            }
        }
    },
    resolve: {
        alias: {
            '@': (function () {
                console.log(__dirname)
                return resolve(__dirname, './src')
            })()
        }
    },
    plugins: [
        vue(),
        AutoImport({
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
            imports: ['vue', 'vue-router'],
            // eslintrc: {
            //     enabled: false,
            //     filepath: 'types/.eslintrc-auto-import.json',
            //     globalsPropValue: true
            // },
            dts: 'types/auto-imports.d.ts',
            resolvers: [AntDesignVueResolver()]
        }),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false,
                    resolveIcons: true
                })
            ]
        }),
        // electronDevPlugin(buildElectron, buildProcess),
        electronBuildPlugin(buildElectron)
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/style/bem.scss";`
            }
        }
    }
})
