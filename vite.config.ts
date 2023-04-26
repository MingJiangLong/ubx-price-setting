import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [vue(),
    legacy({
      targets: ['defaults', 'ie >= 11', 'chrome 52'],  //需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      // extensions:['.vue','ts']
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      https: false,
      proxy: {
        '/acl': {
          //要访问的跨域的域名
          target: 'http://ubox-acl.dev.uboxol.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/acl/, '')
        },
        '/retail-price': {
          //要访问的跨域的域名
          target: 'http://electronic-fence.dev.uboxol.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/retail-price/, '')
        },
        '/ivm': {
          //要访问的跨域的域名
          target: 'http://ubox-ivm.dev.uboxol.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ivm/, '')
        },
        '/escort': {
          //要访问的跨域的域名
          target: 'https://escort.dev.uboxol.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/escort/, '')
        },
      }
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import "${path.resolve(__dirname, "./src/assets/css/base.less")}"`
            // '--van-field-label-width': '6.3em'
          },
          globalVars: {

          },
        }
      }
    },

  }
})
