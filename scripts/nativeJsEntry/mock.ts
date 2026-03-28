class _UTSJSONObject {
}

class _UniError {
  code: number;
  message: string;
  constructor(message: string = '', code: number = 0) {
    this.code = code;
    this.message = message;
  }
}

declare global {
  var UTSJSONObject: {
    new(): _UTSJSONObject;
  };
  type UTSJSONObject = InstanceType<typeof UTSJSONObject>;
  var UniError: {
    new(message: string, code: number): _UniError;
  };
  type UniError = InstanceType<typeof UniError>;
}

globalThis.UTSJSONObject = _UTSJSONObject;
globalThis.UniError = _UniError;

export { }