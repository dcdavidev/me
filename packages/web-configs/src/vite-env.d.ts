interface ImportMetaEnv {
  readonly PORT: string;
  readonly DEV: boolean;
  readonly HOST: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
