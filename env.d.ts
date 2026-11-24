declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_USER?: string;
      DATABASE_PASS?: string;
      DATABASE_HOST?: string;
      DATABASE_PORT?: string;
    }
  }
}

export {};