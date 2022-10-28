import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'; // 允许vue组件中写jsx语法
import viteCompression from 'vite-plugin-compression';// 压缩插件，打包后会有.gz文件，再在nginx中配置启动gzip模块，大幅提高性能
import Components from 'unplugin-vue-components/vite';
import { walk } from './script/helper/utils';
import AutoImport from 'unplugin-auto-import/vite' // elementplus按需引入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // elementplus按需引入

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const componentsAliasMap = await walk('components');
  console.log('看看', componentsAliasMap)
  return {
    // 不加下面这一段，打包的时候会报警（不影响打包）
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    build: {
      // chunkSizeWarningLimit:1000
      rollupOptions: {
        output: {
          // chunkFileNames: 'static/js/[name]-[hash].js',
          // entryFileNames: 'static/js/[name]-[hash].js',
          // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
          //   }
          // }
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          // drop_debugger: true
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src',
        "Form": '/src/Demop/Form/index.vue',
        "Dpp": '/src/comp/Dpp/index.vue',
        "Dpp2": '/src/comp/Dpp2/index.tsx',
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    plugins: [
      vue(),
      vueJsx(),
      viteCompression({
        filter: /\.(js|css)$/i, // 压缩文件类型
        deleteOriginFile: true, // 压缩后删除源文件
      }),
      Components({//src目录下components中的文件不需要引入即可直接使用
        resolvers: [ElementPlusResolver()],
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
})
