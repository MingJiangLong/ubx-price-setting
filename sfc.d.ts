
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

interface Window {
  ucloud: {
    token: () => string

  }
  uboxClient: {
    getToken: (params: (token: string) => void) => void
  }
}