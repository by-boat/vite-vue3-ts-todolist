/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module 'Dpp2' // 声明文件 import Dpp2 from 'Dpp2'不会报红，否则编译阶段会报红，但任然可以运行，报红就无法打包

declare module '*.js'
