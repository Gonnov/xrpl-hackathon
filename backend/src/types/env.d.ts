declare global {
  namespace NodeJS {
    interface ProcessEnv {
      XRPL_CLIENT: string;
      XRPL_SECRET: string;
      XRPL_ADDRESS: string;
    }
  }
}
