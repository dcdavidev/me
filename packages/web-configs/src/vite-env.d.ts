interface ImportMetaEnv {
  readonly PORT: string;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
