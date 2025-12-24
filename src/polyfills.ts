import { Buffer } from 'buffer';

// global
(window as any).global = window;

// process
(window as any).process = {
  env: { DEBUG: undefined },
};

// Buffer
(window as any).Buffer = Buffer;