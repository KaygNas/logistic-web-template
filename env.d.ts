declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_SHARED_LINK_ORIGIN: string
        AUTH_ADMIN_USERNAME: string
        AUTH_ADMIN_PASSWORD: string
      }
    }
  }
}
