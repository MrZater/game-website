// 导入必要的模块
import {
  defineConfig, // 导入 defineConfig 方法
  loadEnv,
} from 'vite'
import {
  resolve, // 导入 resolve 方法
} from 'path'
import vue from '@vitejs/plugin-vue' // 导入 vue 插件
import eslintPlugin from 'vite-plugin-eslint' // 导入 eslint 插件
import babel from '@rollup/plugin-babel' // 导入 babel 插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// terser 打包压缩
import {
  terser,
} from 'rollup-plugin-terser'
const config = loadEnv(process.env.NODE_ENV, process.cwd(), '') // 加载环境变量
// 配置文件
export default defineConfig({
  cacheDir: '.vite-cache', // 缓存目录
  plugins: [
    vue(), // 使用 vue 插件
    // 添加 ESLint 插件配置
    eslintPlugin({ include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'], // 配置 ESLint 插件
    }),
    terser(), // 使用 terser 插件
    createSvgIconsPlugin({ iconDirs: [resolve(__dirname, 'src/assets/icons')]}),

  ],
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "@/varibles.scss";`, // 配置 scss 预处理器
      },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src'), // 配置别名
    },
  },
  server: {
    open: true, // 自动打开浏览器
    cors: true, // 允许跨域
    proxy: { // 配置代理
      '/api': { // 代理/api
        target: config.VITE_APP_BASE_API, // 代理目标
        changeOrigin: true, // 改变原始主机头为目标URL
        ws: true, // 启用websockets
        rewrite: path => path.replace(/^\/api/, ''), // 重写路径，删除/api
      },
    },
  },
  build: {
    minify: 'terser',
    sourcemap: false, // 关闭 sourcemap
    chunkSizeWarningLimit: 2000, // chunk 大小警告限制
    rollupOptions: {
      plugins: [
        babel({
          // 配置 Babel 解析器的选项
          babelHelpers: 'bundled',
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'entry',
              corejs: 3,
              // targets: {
              //   'chrome': '53'
              // }
            }],
          ],
          plugins: [
            ['@babel/plugin-transform-runtime', {
              corejs: 3,
              helpers: false,
            }],
          ],
        }),
      ],
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js', // chunk文件名
        entryFileNames: 'static/js/[name]-[hash].js', // 入口文件名
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]', // 资源文件名
        manualChunks: { vendor: ['vue', 'vue-router', 'vuex'], // 手动分离 vendor
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: { comments: false, // 不保留注释
      },
    },
  },
})
