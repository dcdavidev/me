interface ImportMetaEnv {
  readonly PORT: string;
  readonly DEV: boolean;
  readonly HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
