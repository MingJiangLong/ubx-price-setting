/// <reference types="vite/client" />
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const componentOptions: DefineComponent<{}, {}, any>
//   export default componentOptions
// }

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly MODE:'dev'|'prod'|'testing'
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}