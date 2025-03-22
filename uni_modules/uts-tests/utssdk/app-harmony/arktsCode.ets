interface INativeCode {
  getNativeStr(): string;
}

export const NativeCode = {
  getNativeStr: () => {
    return "harmonyos-code";
  }
} as INativeCode;