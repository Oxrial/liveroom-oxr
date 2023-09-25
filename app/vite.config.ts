import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8551',
                changeOrigin: true,
                rewrite: path => path.replace('/api', '/v1')
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
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
        })
    ]
})
