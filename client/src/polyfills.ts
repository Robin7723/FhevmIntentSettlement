import { Buffer } from "buffer";

if (typeof globalThis.global === "undefined") {
  globalThis.global = globalThis;
}

if (typeof globalThis.Buffer === "undefined") {
  globalThis.Buffer = Buffer;
}

if (typeof globalThis.process === "undefined") {
  globalThis.process = { env: {} } as any;
}
