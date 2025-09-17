var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js
var wt = Object.defineProperty;
var ze = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "ze");
var At = /* @__PURE__ */ __name((e, t, s) => t in e ? wt(e, t, { enumerable: true, configurable: true, writable: true, value: s }) : e[t] = s, "At");
var p = /* @__PURE__ */ __name((e, t, s) => At(e, typeof t != "symbol" ? t + "" : t, s), "p");
var Te = /* @__PURE__ */ __name((e, t, s) => t.has(e) || ze("Cannot " + s), "Te");
var o = /* @__PURE__ */ __name((e, t, s) => (Te(e, t, "read from private field"), s ? s.call(e) : t.get(e)), "o");
var x = /* @__PURE__ */ __name((e, t, s) => t.has(e) ? ze("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), "x");
var m = /* @__PURE__ */ __name((e, t, s, r) => (Te(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s), "m");
var h = /* @__PURE__ */ __name((e, t, s) => (Te(e, t, "access private method"), s), "h");
var De = /* @__PURE__ */ __name((e, t, s, r) => ({ set _(i) {
  m(e, t, i, s);
}, get _() {
  return o(e, t, r);
} }), "De");
var Ne = /* @__PURE__ */ __name((e, t, s) => (r, i) => {
  let a = -1;
  return n(0);
  async function n(d) {
    if (d <= a) throw new Error("next() called multiple times");
    a = d;
    let l, c = false, u;
    if (e[d] ? (u = e[d][0][0], r.req.routeIndex = d) : u = d === e.length && i || void 0, u) try {
      l = await u(r, () => n(d + 1));
    } catch (f) {
      if (f instanceof Error && t) r.error = f, l = await t(f, r), c = true;
      else throw f;
    }
    else r.finalized === false && s && (l = await s(r));
    return l && (r.finalized === false || c) && (r.res = l), r;
  }
  __name(n, "n");
}, "Ne");
var _t = Symbol();
var St = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: s = false, dot: r = false } = t, a = (e instanceof it ? e.raw.headers : e.headers).get("Content-Type");
  return a != null && a.startsWith("multipart/form-data") || a != null && a.startsWith("application/x-www-form-urlencoded") ? Rt(e, { all: s, dot: r }) : {};
}, "St");
async function Rt(e, t) {
  const s = await e.formData();
  return s ? kt(s, t) : {};
}
__name(Rt, "Rt");
function kt(e, t) {
  const s = /* @__PURE__ */ Object.create(null);
  return e.forEach((r, i) => {
    t.all || i.endsWith("[]") ? Et(s, i, r) : s[i] = r;
  }), t.dot && Object.entries(s).forEach(([r, i]) => {
    r.includes(".") && (qt(s, r, i), delete s[r]);
  }), s;
}
__name(kt, "kt");
var Et = /* @__PURE__ */ __name((e, t, s) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(s) : e[t] = [e[t], s] : t.endsWith("[]") ? e[t] = [s] : e[t] = s;
}, "Et");
var qt = /* @__PURE__ */ __name((e, t, s) => {
  let r = e;
  const i = t.split(".");
  i.forEach((a, n) => {
    n === i.length - 1 ? r[a] = s : ((!r[a] || typeof r[a] != "object" || Array.isArray(r[a]) || r[a] instanceof File) && (r[a] = /* @__PURE__ */ Object.create(null)), r = r[a]);
  });
}, "qt");
var Ze = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Ze");
var Ct = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: s } = Tt(e), r = Ze(s);
  return Gt(r, t);
}, "Ct");
var Tt = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (s, r) => {
    const i = `@${r}`;
    return t.push([i, s]), i;
  }), { groups: t, path: e };
}, "Tt");
var Gt = /* @__PURE__ */ __name((e, t) => {
  for (let s = t.length - 1; s >= 0; s--) {
    const [r] = t[s];
    for (let i = e.length - 1; i >= 0; i--) if (e[i].includes(r)) {
      e[i] = e[i].replace(r, t[s][1]);
      break;
    }
  }
  return e;
}, "Gt");
var we = {};
var It = /* @__PURE__ */ __name((e, t) => {
  if (e === "*") return "*";
  const s = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (s) {
    const r = `${e}#${t}`;
    return we[r] || (s[2] ? we[r] = t && t[0] !== ":" && t[0] !== "*" ? [r, s[1], new RegExp(`^${s[2]}(?=/${t})`)] : [e, s[1], new RegExp(`^${s[2]}$`)] : we[r] = [e, s[1], true]), we[r];
  }
  return null;
}, "It");
var je = /* @__PURE__ */ __name((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (s) => {
      try {
        return t(s);
      } catch {
        return s;
      }
    });
  }
}, "je");
var Pt = /* @__PURE__ */ __name((e) => je(e, decodeURI), "Pt");
var et = /* @__PURE__ */ __name((e) => {
  const t = e.url, s = t.indexOf("/", t.indexOf(":") + 4);
  let r = s;
  for (; r < t.length; r++) {
    const i = t.charCodeAt(r);
    if (i === 37) {
      const a = t.indexOf("?", r), n = t.slice(s, a === -1 ? void 0 : a);
      return Pt(n.includes("%25") ? n.replace(/%25/g, "%2525") : n);
    } else if (i === 63) break;
  }
  return t.slice(s, r);
}, "et");
var Mt = /* @__PURE__ */ __name((e) => {
  const t = et(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Mt");
var te = /* @__PURE__ */ __name((e, t, ...s) => (s.length && (t = te(t, ...s)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "te");
var tt = /* @__PURE__ */ __name((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":")) return null;
  const t = e.split("/"), s = [];
  let r = "";
  return t.forEach((i) => {
    if (i !== "" && !/\:/.test(i)) r += "/" + i;
    else if (/\:/.test(i)) if (/\?/.test(i)) {
      s.length === 0 && r === "" ? s.push("/") : s.push(r);
      const a = i.replace("?", "");
      r += "/" + a, s.push(r);
    } else r += "/" + i;
  }), s.filter((i, a, n) => n.indexOf(i) === a);
}, "tt");
var Ge = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? je(e, rt) : e) : e, "Ge");
var st = /* @__PURE__ */ __name((e, t, s) => {
  let r;
  if (!s && t && !/[%+]/.test(t)) {
    let n = e.indexOf(`?${t}`, 8);
    for (n === -1 && (n = e.indexOf(`&${t}`, 8)); n !== -1; ) {
      const d = e.charCodeAt(n + t.length + 1);
      if (d === 61) {
        const l = n + t.length + 2, c = e.indexOf("&", l);
        return Ge(e.slice(l, c === -1 ? void 0 : c));
      } else if (d == 38 || isNaN(d)) return "";
      n = e.indexOf(`&${t}`, n + 1);
    }
    if (r = /[%+]/.test(e), !r) return;
  }
  const i = {};
  r ?? (r = /[%+]/.test(e));
  let a = e.indexOf("?", 8);
  for (; a !== -1; ) {
    const n = e.indexOf("&", a + 1);
    let d = e.indexOf("=", a);
    d > n && n !== -1 && (d = -1);
    let l = e.slice(a + 1, d === -1 ? n === -1 ? void 0 : n : d);
    if (r && (l = Ge(l)), a = n, l === "") continue;
    let c;
    d === -1 ? c = "" : (c = e.slice(d + 1, n === -1 ? void 0 : n), r && (c = Ge(c))), s ? (i[l] && Array.isArray(i[l]) || (i[l] = []), i[l].push(c)) : i[l] ?? (i[l] = c);
  }
  return t ? i[t] : i;
}, "st");
var jt = st;
var Ot = /* @__PURE__ */ __name((e, t) => st(e, t, true), "Ot");
var rt = decodeURIComponent;
var Le = /* @__PURE__ */ __name((e) => je(e, rt), "Le");
var ie;
var q;
var D;
var at;
var ot;
var Pe;
var L;
var He;
var it = (He = class {
  static {
    __name(this, "He");
  }
  constructor(e, t = "/", s = [[]]) {
    x(this, D);
    p(this, "raw");
    x(this, ie);
    x(this, q);
    p(this, "routeIndex", 0);
    p(this, "path");
    p(this, "bodyCache", {});
    x(this, L, (e2) => {
      const { bodyCache: t2, raw: s2 } = this, r = t2[e2];
      if (r) return r;
      const i = Object.keys(t2)[0];
      return i ? t2[i].then((a) => (i === "json" && (a = JSON.stringify(a)), new Response(a)[e2]())) : t2[e2] = s2[e2]();
    });
    this.raw = e, this.path = t, m(this, q, s), m(this, ie, {});
  }
  param(e) {
    return e ? h(this, D, at).call(this, e) : h(this, D, ot).call(this);
  }
  query(e) {
    return jt(this.url, e);
  }
  queries(e) {
    return Ot(this.url, e);
  }
  header(e) {
    if (e) return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((s, r) => {
      t[r] = s;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await St(this, e));
  }
  json() {
    return o(this, L).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return o(this, L).call(this, "text");
  }
  arrayBuffer() {
    return o(this, L).call(this, "arrayBuffer");
  }
  blob() {
    return o(this, L).call(this, "blob");
  }
  formData() {
    return o(this, L).call(this, "formData");
  }
  addValidatedData(e, t) {
    o(this, ie)[e] = t;
  }
  valid(e) {
    return o(this, ie)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [_t]() {
    return o(this, q);
  }
  get matchedRoutes() {
    return o(this, q)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return o(this, q)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, ie = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakSet(), at = /* @__PURE__ */ __name(function(e) {
  const t = o(this, q)[0][this.routeIndex][1][e], s = h(this, D, Pe).call(this, t);
  return s ? /\%/.test(s) ? Le(s) : s : void 0;
}, "at"), ot = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(o(this, q)[0][this.routeIndex][1]);
  for (const s of t) {
    const r = h(this, D, Pe).call(this, o(this, q)[0][this.routeIndex][1][s]);
    r && typeof r == "string" && (e[s] = /\%/.test(r) ? Le(r) : r);
  }
  return e;
}, "ot"), Pe = /* @__PURE__ */ __name(function(e) {
  return o(this, q)[1] ? o(this, q)[1][e] : e;
}, "Pe"), L = /* @__PURE__ */ new WeakMap(), He);
var zt = { Stringify: 1 };
var nt = /* @__PURE__ */ __name(async (e, t, s, r, i) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const a = e.callbacks;
  return a != null && a.length ? (i ? i[0] += e : i = [e], Promise.all(a.map((d) => d({ phase: t, buffer: i, context: r }))).then((d) => Promise.all(d.filter(Boolean).map((l) => nt(l, t, false, r, i))).then(() => i[0]))) : Promise.resolve(e);
}, "nt");
var Dt = "text/plain; charset=UTF-8";
var Ie = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "Ie");
var ge;
var xe;
var M;
var ae;
var j;
var k;
var he;
var oe;
var ne;
var V;
var be;
var ve;
var Y;
var se;
var Ke;
var Nt = (Ke = class {
  static {
    __name(this, "Ke");
  }
  constructor(e, t) {
    x(this, Y);
    x(this, ge);
    x(this, xe);
    p(this, "env", {});
    x(this, M);
    p(this, "finalized", false);
    p(this, "error");
    x(this, ae);
    x(this, j);
    x(this, k);
    x(this, he);
    x(this, oe);
    x(this, ne);
    x(this, V);
    x(this, be);
    x(this, ve);
    p(this, "render", (...e2) => (o(this, oe) ?? m(this, oe, (t2) => this.html(t2)), o(this, oe).call(this, ...e2)));
    p(this, "setLayout", (e2) => m(this, he, e2));
    p(this, "getLayout", () => o(this, he));
    p(this, "setRenderer", (e2) => {
      m(this, oe, e2);
    });
    p(this, "header", (e2, t2, s) => {
      this.finalized && m(this, k, new Response(o(this, k).body, o(this, k)));
      const r = o(this, k) ? o(this, k).headers : o(this, V) ?? m(this, V, new Headers());
      t2 === void 0 ? r.delete(e2) : s != null && s.append ? r.append(e2, t2) : r.set(e2, t2);
    });
    p(this, "status", (e2) => {
      m(this, ae, e2);
    });
    p(this, "set", (e2, t2) => {
      o(this, M) ?? m(this, M, /* @__PURE__ */ new Map()), o(this, M).set(e2, t2);
    });
    p(this, "get", (e2) => o(this, M) ? o(this, M).get(e2) : void 0);
    p(this, "newResponse", (...e2) => h(this, Y, se).call(this, ...e2));
    p(this, "body", (e2, t2, s) => h(this, Y, se).call(this, e2, t2, s));
    p(this, "text", (e2, t2, s) => !o(this, V) && !o(this, ae) && !t2 && !s && !this.finalized ? new Response(e2) : h(this, Y, se).call(this, e2, t2, Ie(Dt, s)));
    p(this, "json", (e2, t2, s) => h(this, Y, se).call(this, JSON.stringify(e2), t2, Ie("application/json", s)));
    p(this, "html", (e2, t2, s) => {
      const r = /* @__PURE__ */ __name((i) => h(this, Y, se).call(this, i, t2, Ie("text/html; charset=UTF-8", s)), "r");
      return typeof e2 == "object" ? nt(e2, zt.Stringify, false, {}).then(r) : r(e2);
    });
    p(this, "redirect", (e2, t2) => {
      const s = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(s) ? encodeURI(s) : s), this.newResponse(null, t2 ?? 302);
    });
    p(this, "notFound", () => (o(this, ne) ?? m(this, ne, () => new Response()), o(this, ne).call(this, this)));
    m(this, ge, e), t && (m(this, j, t.executionCtx), this.env = t.env, m(this, ne, t.notFoundHandler), m(this, ve, t.path), m(this, be, t.matchResult));
  }
  get req() {
    return o(this, xe) ?? m(this, xe, new it(o(this, ge), o(this, ve), o(this, be))), o(this, xe);
  }
  get event() {
    if (o(this, j) && "respondWith" in o(this, j)) return o(this, j);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (o(this, j)) return o(this, j);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return o(this, k) || m(this, k, new Response(null, { headers: o(this, V) ?? m(this, V, new Headers()) }));
  }
  set res(e) {
    if (o(this, k) && e) {
      e = new Response(e.body, e);
      for (const [t, s] of o(this, k).headers.entries()) if (t !== "content-type") if (t === "set-cookie") {
        const r = o(this, k).headers.getSetCookie();
        e.headers.delete("set-cookie");
        for (const i of r) e.headers.append("set-cookie", i);
      } else e.headers.set(t, s);
    }
    m(this, k, e), this.finalized = true;
  }
  get var() {
    return o(this, M) ? Object.fromEntries(o(this, M)) : {};
  }
}, ge = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakSet(), se = /* @__PURE__ */ __name(function(e, t, s) {
  const r = o(this, k) ? new Headers(o(this, k).headers) : o(this, V) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const a = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [n, d] of a) n.toLowerCase() === "set-cookie" ? r.append(n, d) : r.set(n, d);
  }
  if (s) for (const [a, n] of Object.entries(s)) if (typeof n == "string") r.set(a, n);
  else {
    r.delete(a);
    for (const d of n) r.append(a, d);
  }
  const i = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? o(this, ae);
  return new Response(e, { status: i, headers: r });
}, "se"), Ke);
var w = "ALL";
var Lt = "all";
var Yt = ["get", "post", "put", "delete", "options", "patch"];
var lt = "Can not add a route since the matcher is already built.";
var dt = class extends Error {
  static {
    __name(this, "dt");
  }
};
var Ft = "__COMPOSED_HANDLER";
var $t = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "$t");
var Ye = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const s = e.getResponse();
    return t.newResponse(s.body, s);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Ye");
var C;
var A;
var ut;
var T;
var B;
var Ae;
var _e;
var Be;
var ct = (Be = class {
  static {
    __name(this, "Be");
  }
  constructor(t = {}) {
    x(this, A);
    p(this, "get");
    p(this, "post");
    p(this, "put");
    p(this, "delete");
    p(this, "options");
    p(this, "patch");
    p(this, "all");
    p(this, "on");
    p(this, "use");
    p(this, "router");
    p(this, "getPath");
    p(this, "_basePath", "/");
    x(this, C, "/");
    p(this, "routes", []);
    x(this, T, $t);
    p(this, "errorHandler", Ye);
    p(this, "onError", (t2) => (this.errorHandler = t2, this));
    p(this, "notFound", (t2) => (m(this, T, t2), this));
    p(this, "fetch", (t2, ...s) => h(this, A, _e).call(this, t2, s[1], s[0], t2.method));
    p(this, "request", (t2, s, r2, i2) => t2 instanceof Request ? this.fetch(s ? new Request(t2, s) : t2, r2, i2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${te("/", t2)}`, s), r2, i2)));
    p(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(h(this, A, _e).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Yt, Lt].forEach((a) => {
      this[a] = (n, ...d) => (typeof n == "string" ? m(this, C, n) : h(this, A, B).call(this, a, o(this, C), n), d.forEach((l) => {
        h(this, A, B).call(this, a, o(this, C), l);
      }), this);
    }), this.on = (a, n, ...d) => {
      for (const l of [n].flat()) {
        m(this, C, l);
        for (const c of [a].flat()) d.map((u) => {
          h(this, A, B).call(this, c.toUpperCase(), o(this, C), u);
        });
      }
      return this;
    }, this.use = (a, ...n) => (typeof a == "string" ? m(this, C, a) : (m(this, C, "*"), n.unshift(a)), n.forEach((d) => {
      h(this, A, B).call(this, w, o(this, C), d);
    }), this);
    const { strict: r, ...i } = t;
    Object.assign(this, i), this.getPath = r ?? true ? t.getPath ?? et : Mt;
  }
  route(t, s) {
    const r = this.basePath(t);
    return s.routes.map((i) => {
      var n;
      let a;
      s.errorHandler === Ye ? a = i.handler : (a = /* @__PURE__ */ __name(async (d, l) => (await Ne([], s.errorHandler)(d, () => i.handler(d, l))).res, "a"), a[Ft] = i.handler), h(n = r, A, B).call(n, i.method, i.path, a);
    }), this;
  }
  basePath(t) {
    const s = h(this, A, ut).call(this);
    return s._basePath = te(this._basePath, t), s;
  }
  mount(t, s, r) {
    let i, a;
    r && (typeof r == "function" ? a = r : (a = r.optionHandler, r.replaceRequest === false ? i = /* @__PURE__ */ __name((l) => l, "i") : i = r.replaceRequest));
    const n = a ? (l) => {
      const c = a(l);
      return Array.isArray(c) ? c : [c];
    } : (l) => {
      let c;
      try {
        c = l.executionCtx;
      } catch {
      }
      return [l.env, c];
    };
    i || (i = (() => {
      const l = te(this._basePath, t), c = l === "/" ? 0 : l.length;
      return (u) => {
        const f = new URL(u.url);
        return f.pathname = f.pathname.slice(c) || "/", new Request(f, u);
      };
    })());
    const d = /* @__PURE__ */ __name(async (l, c) => {
      const u = await s(i(l.req.raw), ...n(l));
      if (u) return u;
      await c();
    }, "d");
    return h(this, A, B).call(this, w, te(t, "*"), d), this;
  }
}, C = /* @__PURE__ */ new WeakMap(), A = /* @__PURE__ */ new WeakSet(), ut = /* @__PURE__ */ __name(function() {
  const t = new ct({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, m(t, T, o(this, T)), t.routes = this.routes, t;
}, "ut"), T = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ __name(function(t, s, r) {
  t = t.toUpperCase(), s = te(this._basePath, s);
  const i = { basePath: this._basePath, path: s, method: t, handler: r };
  this.router.add(t, s, [r, i]), this.routes.push(i);
}, "B"), Ae = /* @__PURE__ */ __name(function(t, s) {
  if (t instanceof Error) return this.errorHandler(t, s);
  throw t;
}, "Ae"), _e = /* @__PURE__ */ __name(function(t, s, r, i) {
  if (i === "HEAD") return (async () => new Response(null, await h(this, A, _e).call(this, t, s, r, "GET")))();
  const a = this.getPath(t, { env: r }), n = this.router.match(i, a), d = new Nt(t, { path: a, matchResult: n, env: r, executionCtx: s, notFoundHandler: o(this, T) });
  if (n[0].length === 1) {
    let c;
    try {
      c = n[0][0][0][0](d, async () => {
        d.res = await o(this, T).call(this, d);
      });
    } catch (u) {
      return h(this, A, Ae).call(this, u, d);
    }
    return c instanceof Promise ? c.then((u) => u || (d.finalized ? d.res : o(this, T).call(this, d))).catch((u) => h(this, A, Ae).call(this, u, d)) : c ?? o(this, T).call(this, d);
  }
  const l = Ne(n[0], this.errorHandler, o(this, T));
  return (async () => {
    try {
      const c = await l(d);
      if (!c.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return h(this, A, Ae).call(this, c, d);
    }
  })();
}, "_e"), Be);
var Re = "[^/]+";
var me = ".*";
var pe = "(?:|/.*)";
var re = Symbol();
var Ht = new Set(".\\+*[^]$()");
function Kt(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === me || e === pe ? 1 : t === me || t === pe ? -1 : e === Re ? 1 : t === Re ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(Kt, "Kt");
var U;
var W;
var G;
var Qe;
var Me = (Qe = class {
  static {
    __name(this, "Qe");
  }
  constructor() {
    x(this, U);
    x(this, W);
    x(this, G, /* @__PURE__ */ Object.create(null));
  }
  insert(t, s, r, i, a) {
    if (t.length === 0) {
      if (o(this, U) !== void 0) throw re;
      if (a) return;
      m(this, U, s);
      return;
    }
    const [n, ...d] = t, l = n === "*" ? d.length === 0 ? ["", "", me] : ["", "", Re] : n === "/*" ? ["", "", pe] : n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (l) {
      const u = l[1];
      let f = l[2] || Re;
      if (u && l[2] && (f === ".*" || (f = f.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(f)))) throw re;
      if (c = o(this, G)[f], !c) {
        if (Object.keys(o(this, G)).some((g) => g !== me && g !== pe)) throw re;
        if (a) return;
        c = o(this, G)[f] = new Me(), u !== "" && m(c, W, i.varIndex++);
      }
      !a && u !== "" && r.push([u, o(c, W)]);
    } else if (c = o(this, G)[n], !c) {
      if (Object.keys(o(this, G)).some((u) => u.length > 1 && u !== me && u !== pe)) throw re;
      if (a) return;
      c = o(this, G)[n] = new Me();
    }
    c.insert(d, s, r, i, a);
  }
  buildRegExpStr() {
    const s = Object.keys(o(this, G)).sort(Kt).map((r) => {
      const i = o(this, G)[r];
      return (typeof o(i, W) == "number" ? `(${r})@${o(i, W)}` : Ht.has(r) ? `\\${r}` : r) + i.buildRegExpStr();
    });
    return typeof o(this, U) == "number" && s.unshift(`#${o(this, U)}`), s.length === 0 ? "" : s.length === 1 ? s[0] : "(?:" + s.join("|") + ")";
  }
}, U = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), Qe);
var ke;
var ye;
var Ve;
var Bt = (Ve = class {
  static {
    __name(this, "Ve");
  }
  constructor() {
    x(this, ke, { varIndex: 0 });
    x(this, ye, new Me());
  }
  insert(e, t, s) {
    const r = [], i = [];
    for (let n = 0; ; ) {
      let d = false;
      if (e = e.replace(/\{[^}]+\}/g, (l) => {
        const c = `@\\${n}`;
        return i[n] = [c, l], n++, d = true, c;
      }), !d) break;
    }
    const a = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let n = i.length - 1; n >= 0; n--) {
      const [d] = i[n];
      for (let l = a.length - 1; l >= 0; l--) if (a[l].indexOf(d) !== -1) {
        a[l] = a[l].replace(d, i[n][1]);
        break;
      }
    }
    return o(this, ye).insert(a, t, r, o(this, ke), s), r;
  }
  buildRegExp() {
    let e = o(this, ye).buildRegExpStr();
    if (e === "") return [/^$/, [], []];
    let t = 0;
    const s = [], r = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (i, a, n) => a !== void 0 ? (s[++t] = Number(a), "$()") : (n !== void 0 && (r[Number(n)] = ++t), "")), [new RegExp(`^${e}`), s, r];
  }
}, ke = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), Ve);
var ft = [];
var Qt = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Se = /* @__PURE__ */ Object.create(null);
function mt(e) {
  return Se[e] ?? (Se[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, s) => s ? `\\${s}` : "(?:|/.*)")}$`));
}
__name(mt, "mt");
function Vt() {
  Se = /* @__PURE__ */ Object.create(null);
}
__name(Vt, "Vt");
function Ut(e) {
  var c;
  const t = new Bt(), s = [];
  if (e.length === 0) return Qt;
  const r = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, f], [g, y]) => u ? 1 : g ? -1 : f.length - y.length), i = /* @__PURE__ */ Object.create(null);
  for (let u = 0, f = -1, g = r.length; u < g; u++) {
    const [y, E, b] = r[u];
    y ? i[E] = [b.map(([R]) => [R, /* @__PURE__ */ Object.create(null)]), ft] : f++;
    let v;
    try {
      v = t.insert(E, f, y);
    } catch (R) {
      throw R === re ? new dt(E) : R;
    }
    y || (s[f] = b.map(([R, Z]) => {
      const ce = /* @__PURE__ */ Object.create(null);
      for (Z -= 1; Z >= 0; Z--) {
        const [I, qe] = v[Z];
        ce[I] = qe;
      }
      return [R, ce];
    }));
  }
  const [a, n, d] = t.buildRegExp();
  for (let u = 0, f = s.length; u < f; u++) for (let g = 0, y = s[u].length; g < y; g++) {
    const E = (c = s[u][g]) == null ? void 0 : c[1];
    if (!E) continue;
    const b = Object.keys(E);
    for (let v = 0, R = b.length; v < R; v++) E[b[v]] = d[E[b[v]]];
  }
  const l = [];
  for (const u in n) l[u] = s[n[u]];
  return [a, l, i];
}
__name(Ut, "Ut");
function ee(e, t) {
  if (e) {
    for (const s of Object.keys(e).sort((r, i) => i.length - r.length)) if (mt(s).test(t)) return [...e[s]];
  }
}
__name(ee, "ee");
var F;
var $;
var de;
var pt;
var gt;
var Ue;
var Wt = (Ue = class {
  static {
    __name(this, "Ue");
  }
  constructor() {
    x(this, de);
    p(this, "name", "RegExpRouter");
    x(this, F);
    x(this, $);
    m(this, F, { [w]: /* @__PURE__ */ Object.create(null) }), m(this, $, { [w]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, s) {
    var d;
    const r = o(this, F), i = o(this, $);
    if (!r || !i) throw new Error(lt);
    r[e] || [r, i].forEach((l) => {
      l[e] = /* @__PURE__ */ Object.create(null), Object.keys(l[w]).forEach((c) => {
        l[e][c] = [...l[w][c]];
      });
    }), t === "/*" && (t = "*");
    const a = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const l = mt(t);
      e === w ? Object.keys(r).forEach((c) => {
        var u;
        (u = r[c])[t] || (u[t] = ee(r[c], t) || ee(r[w], t) || []);
      }) : (d = r[e])[t] || (d[t] = ee(r[e], t) || ee(r[w], t) || []), Object.keys(r).forEach((c) => {
        (e === w || e === c) && Object.keys(r[c]).forEach((u) => {
          l.test(u) && r[c][u].push([s, a]);
        });
      }), Object.keys(i).forEach((c) => {
        (e === w || e === c) && Object.keys(i[c]).forEach((u) => l.test(u) && i[c][u].push([s, a]));
      });
      return;
    }
    const n = tt(t) || [t];
    for (let l = 0, c = n.length; l < c; l++) {
      const u = n[l];
      Object.keys(i).forEach((f) => {
        var g;
        (e === w || e === f) && ((g = i[f])[u] || (g[u] = [...ee(r[f], u) || ee(r[w], u) || []]), i[f][u].push([s, a - c + l + 1]));
      });
    }
  }
  match(e, t) {
    Vt();
    const s = h(this, de, pt).call(this);
    return this.match = (r, i) => {
      const a = s[r] || s[w], n = a[2][i];
      if (n) return n;
      const d = i.match(a[0]);
      if (!d) return [[], ft];
      const l = d.indexOf("", 1);
      return [a[1][l], d];
    }, this.match(e, t);
  }
}, F = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakSet(), pt = /* @__PURE__ */ __name(function() {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.keys(o(this, $)).concat(Object.keys(o(this, F))).forEach((t) => {
    e[t] || (e[t] = h(this, de, gt).call(this, t));
  }), m(this, F, m(this, $, void 0)), e;
}, "pt"), gt = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let s = e === w;
  return [o(this, F), o(this, $)].forEach((r) => {
    const i = r[e] ? Object.keys(r[e]).map((a) => [a, r[e][a]]) : [];
    i.length !== 0 ? (s || (s = true), t.push(...i)) : e !== w && t.push(...Object.keys(r[w]).map((a) => [a, r[w][a]]));
  }), s ? Ut(t) : null;
}, "gt"), Ue);
var H;
var O;
var We;
var Xt = (We = class {
  static {
    __name(this, "We");
  }
  constructor(e) {
    p(this, "name", "SmartRouter");
    x(this, H, []);
    x(this, O, []);
    m(this, H, e.routers);
  }
  add(e, t, s) {
    if (!o(this, O)) throw new Error(lt);
    o(this, O).push([e, t, s]);
  }
  match(e, t) {
    if (!o(this, O)) throw new Error("Fatal error");
    const s = o(this, H), r = o(this, O), i = s.length;
    let a = 0, n;
    for (; a < i; a++) {
      const d = s[a];
      try {
        for (let l = 0, c = r.length; l < c; l++) d.add(...r[l]);
        n = d.match(e, t);
      } catch (l) {
        if (l instanceof dt) continue;
        throw l;
      }
      this.match = d.match.bind(d), m(this, H, [d]), m(this, O, void 0);
      break;
    }
    if (a === i) throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, n;
  }
  get activeRouter() {
    if (o(this, O) || o(this, H).length !== 1) throw new Error("No active router has been determined yet.");
    return o(this, H)[0];
  }
}, H = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), We);
var fe = /* @__PURE__ */ Object.create(null);
var K;
var S;
var X;
var le;
var _;
var z;
var Q;
var Xe;
var xt = (Xe = class {
  static {
    __name(this, "Xe");
  }
  constructor(e, t, s) {
    x(this, z);
    x(this, K);
    x(this, S);
    x(this, X);
    x(this, le, 0);
    x(this, _, fe);
    if (m(this, S, s || /* @__PURE__ */ Object.create(null)), m(this, K, []), e && t) {
      const r = /* @__PURE__ */ Object.create(null);
      r[e] = { handler: t, possibleKeys: [], score: 0 }, m(this, K, [r]);
    }
    m(this, X, []);
  }
  insert(e, t, s) {
    m(this, le, ++De(this, le)._);
    let r = this;
    const i = Ct(t), a = [];
    for (let n = 0, d = i.length; n < d; n++) {
      const l = i[n], c = i[n + 1], u = It(l, c), f = Array.isArray(u) ? u[0] : l;
      if (f in o(r, S)) {
        r = o(r, S)[f], u && a.push(u[1]);
        continue;
      }
      o(r, S)[f] = new xt(), u && (o(r, X).push(u), a.push(u[1])), r = o(r, S)[f];
    }
    return o(r, K).push({ [e]: { handler: s, possibleKeys: a.filter((n, d, l) => l.indexOf(n) === d), score: o(this, le) } }), r;
  }
  search(e, t) {
    var d;
    const s = [];
    m(this, _, fe);
    let i = [this];
    const a = Ze(t), n = [];
    for (let l = 0, c = a.length; l < c; l++) {
      const u = a[l], f = l === c - 1, g = [];
      for (let y = 0, E = i.length; y < E; y++) {
        const b = i[y], v = o(b, S)[u];
        v && (m(v, _, o(b, _)), f ? (o(v, S)["*"] && s.push(...h(this, z, Q).call(this, o(v, S)["*"], e, o(b, _))), s.push(...h(this, z, Q).call(this, v, e, o(b, _)))) : g.push(v));
        for (let R = 0, Z = o(b, X).length; R < Z; R++) {
          const ce = o(b, X)[R], I = o(b, _) === fe ? {} : { ...o(b, _) };
          if (ce === "*") {
            const N = o(b, S)["*"];
            N && (s.push(...h(this, z, Q).call(this, N, e, o(b, _))), m(N, _, I), g.push(N));
            continue;
          }
          const [qe, Oe, ue] = ce;
          if (!u && !(ue instanceof RegExp)) continue;
          const P = o(b, S)[qe], yt = a.slice(l).join("/");
          if (ue instanceof RegExp) {
            const N = ue.exec(yt);
            if (N) {
              if (I[Oe] = N[0], s.push(...h(this, z, Q).call(this, P, e, o(b, _), I)), Object.keys(o(P, S)).length) {
                m(P, _, I);
                const Ce = ((d = N[0].match(/\//)) == null ? void 0 : d.length) ?? 0;
                (n[Ce] || (n[Ce] = [])).push(P);
              }
              continue;
            }
          }
          (ue === true || ue.test(u)) && (I[Oe] = u, f ? (s.push(...h(this, z, Q).call(this, P, e, I, o(b, _))), o(P, S)["*"] && s.push(...h(this, z, Q).call(this, o(P, S)["*"], e, I, o(b, _)))) : (m(P, _, I), g.push(P)));
        }
      }
      i = g.concat(n.shift() ?? []);
    }
    return s.length > 1 && s.sort((l, c) => l.score - c.score), [s.map(({ handler: l, params: c }) => [l, c])];
  }
}, K = /* @__PURE__ */ new WeakMap(), S = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), Q = /* @__PURE__ */ __name(function(e, t, s, r) {
  const i = [];
  for (let a = 0, n = o(e, K).length; a < n; a++) {
    const d = o(e, K)[a], l = d[t] || d[w], c = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), i.push(l), s !== fe || r && r !== fe)) for (let u = 0, f = l.possibleKeys.length; u < f; u++) {
      const g = l.possibleKeys[u], y = c[l.score];
      l.params[g] = r != null && r[g] && !y ? r[g] : s[g] ?? (r == null ? void 0 : r[g]), c[l.score] = true;
    }
  }
  return i;
}, "Q"), Xe);
var J;
var Je;
var Jt = (Je = class {
  static {
    __name(this, "Je");
  }
  constructor() {
    p(this, "name", "TrieRouter");
    x(this, J);
    m(this, J, new xt());
  }
  add(e, t, s) {
    const r = tt(t);
    if (r) {
      for (let i = 0, a = r.length; i < a; i++) o(this, J).insert(e, r[i], s);
      return;
    }
    o(this, J).insert(e, t, s);
  }
  match(e, t) {
    return o(this, J).search(e, t);
  }
}, J = /* @__PURE__ */ new WeakMap(), Je);
var ht = class extends ct {
  static {
    __name(this, "ht");
  }
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Xt({ routers: [new Wt(), new Jt()] });
  }
};
var Zt = /* @__PURE__ */ __name((e) => {
  const s = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, r = /* @__PURE__ */ ((a) => typeof a == "string" ? a === "*" ? () => a : (n) => a === n ? n : null : typeof a == "function" ? a : (n) => a.includes(n) ? n : null)(s.origin), i = ((a) => typeof a == "function" ? a : Array.isArray(a) ? () => a : () => [])(s.allowMethods);
  return async function(n, d) {
    var u;
    function l(f, g) {
      n.res.headers.set(f, g);
    }
    __name(l, "l");
    const c = await r(n.req.header("origin") || "", n);
    if (c && l("Access-Control-Allow-Origin", c), s.origin !== "*") {
      const f = n.req.header("Vary");
      f ? l("Vary", f) : l("Vary", "Origin");
    }
    if (s.credentials && l("Access-Control-Allow-Credentials", "true"), (u = s.exposeHeaders) != null && u.length && l("Access-Control-Expose-Headers", s.exposeHeaders.join(",")), n.req.method === "OPTIONS") {
      s.maxAge != null && l("Access-Control-Max-Age", s.maxAge.toString());
      const f = await i(n.req.header("origin") || "", n);
      f.length && l("Access-Control-Allow-Methods", f.join(","));
      let g = s.allowHeaders;
      if (!(g != null && g.length)) {
        const y = n.req.header("Access-Control-Request-Headers");
        y && (g = y.split(/\s*,\s*/));
      }
      return g != null && g.length && (l("Access-Control-Allow-Headers", g.join(",")), n.res.headers.append("Vary", "Access-Control-Request-Headers")), n.res.headers.delete("Content-Length"), n.res.headers.delete("Content-Type"), new Response(null, { headers: n.res.headers, status: 204, statusText: "No Content" });
    }
    await d();
  };
}, "Zt");
var es = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var Fe = /* @__PURE__ */ __name((e, t = ss) => {
  const s = /\.([a-zA-Z0-9]+?)$/, r = e.match(s);
  if (!r) return;
  let i = t[r[1]];
  return i && i.startsWith("text") && (i += "; charset=utf-8"), i;
}, "Fe");
var ts = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var ss = ts;
var rs = /* @__PURE__ */ __name((...e) => {
  let t = e.filter((i) => i !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const s = t.split("/"), r = [];
  for (const i of s) i === ".." && r.length > 0 && r.at(-1) !== ".." ? r.pop() : i !== "." && r.push(i);
  return r.join("/") || ".";
}, "rs");
var bt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var is = Object.keys(bt);
var as = "index.html";
var os = /* @__PURE__ */ __name((e) => {
  const t = e.root ?? "./", s = e.path, r = e.join ?? rs;
  return async (i, a) => {
    var u, f, g, y;
    if (i.finalized) return a();
    let n;
    if (e.path) n = e.path;
    else try {
      if (n = decodeURIComponent(i.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n)) throw new Error();
    } catch {
      return await ((u = e.onNotFound) == null ? void 0 : u.call(e, i.req.path, i)), a();
    }
    let d = r(t, !s && e.rewriteRequestPath ? e.rewriteRequestPath(n) : n);
    e.isDir && await e.isDir(d) && (d = r(d, as));
    const l = e.getContent;
    let c = await l(d, i);
    if (c instanceof Response) return i.newResponse(c.body, c);
    if (c) {
      const E = e.mimes && Fe(d, e.mimes) || Fe(d);
      if (i.header("Content-Type", E || "application/octet-stream"), e.precompressed && (!E || es.test(E))) {
        const b = new Set((f = i.req.header("Accept-Encoding")) == null ? void 0 : f.split(",").map((v) => v.trim()));
        for (const v of is) {
          if (!b.has(v)) continue;
          const R = await l(d + bt[v], i);
          if (R) {
            c = R, i.header("Content-Encoding", v), i.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((g = e.onFound) == null ? void 0 : g.call(e, d, i)), i.body(c);
    }
    await ((y = e.onNotFound) == null ? void 0 : y.call(e, d, i)), await a();
  };
}, "os");
var ns = /* @__PURE__ */ __name(async (e, t) => {
  let s;
  t && t.manifest ? typeof t.manifest == "string" ? s = JSON.parse(t.manifest) : s = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? s = JSON.parse(__STATIC_CONTENT_MANIFEST) : s = __STATIC_CONTENT_MANIFEST;
  let r;
  t && t.namespace ? r = t.namespace : r = __STATIC_CONTENT;
  const i = s[e] || e;
  if (!i) return null;
  const a = await r.get(i, { type: "stream" });
  return a || null;
}, "ns");
var ls = /* @__PURE__ */ __name((e) => async function(s, r) {
  return os({ ...e, getContent: /* @__PURE__ */ __name(async (a) => ns(a, { manifest: e.manifest, namespace: e.namespace ? e.namespace : s.env ? s.env.__STATIC_CONTENT : void 0 }), "getContent") })(s, r);
}, "ls");
var ds = /* @__PURE__ */ __name((e) => ls(e), "ds");
var Ee = new ht();
Ee.use("/api/*", Zt());
Ee.use("/static/*", ds({ root: "./public" }));
Ee.get("/", (e) => e.html(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- SEO Meta Tags -->
        <title>RAG (Retrieval Augmented Generation) - \u041E\u043D\u043B\u0430\u0439\u043D \u0441\u0435\u043C\u0438\u043D\u0430\u0440 | \u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u0443\u0440\u0441 \u0441 Yandex Foundation Models</title>
        <meta name="description" content="\u0418\u0437\u0443\u0447\u0438\u0442\u0435 RAG: \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0443, \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0435 \u0431\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B\u0445, \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A. \u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0441 Python, FAISS, HNSW, Yandex Foundation Models. \u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0443\u043F\u0440\u0430\u0436\u043D\u0435\u043D\u0438\u044F \u0438 \u043A\u043E\u0434.">
        <meta name="keywords" content="RAG, Retrieval Augmented Generation, \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A, \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438, FAISS, HNSW, \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A, \u043C\u0430\u0448\u0438\u043D\u043D\u043E\u0435 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435, Python, Yandex Foundation Models">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="RAG - Retrieval Augmented Generation | \u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0441\u0435\u043C\u0438\u043D\u0430\u0440">
        <meta property="og:description" content="\u041F\u043E\u043B\u043D\u044B\u0439 \u043A\u0443\u0440\u0441 \u043F\u043E RAG: \u043E\u0442 \u0442\u0435\u043E\u0440\u0438\u0438 \u0434\u043E \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438. \u0418\u0437\u0443\u0447\u0438\u0442\u0435 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0443, \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0435 \u0411\u0414, \u043C\u0435\u0442\u0440\u0438\u043A\u0438 \u043E\u0446\u0435\u043D\u043A\u0438. \u041E\u043D\u043B\u0430\u0439\u043D \u043F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0430 Python \u0441 Yandex Models.">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="RAG \u0421\u0435\u043C\u0438\u043D\u0430\u0440 - Retrieval Augmented Generation">
        <meta property="twitter:description" content="\u0418\u0437\u0443\u0447\u0438\u0442\u0435 RAG \u0441 \u043D\u0443\u043B\u044F: \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A, \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0441 Yandex Foundation Models">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "RAG (Retrieval Augmented Generation) - \u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u0435\u043C\u0438\u043D\u0430\u0440",
            "description": "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u043E\u0435 \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 RAG: \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0435 \u0431\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B\u0445, \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A, \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0441 Yandex Foundation Models",
            "provider": {
                "@type": "Organization",
                "name": "AI Education Hub"
            },
            "courseMode": "online",
            "duration": "PT1H",
            "educationalLevel": "Intermediate",
            "teaches": ["RAG Architecture", "Vector Databases", "Semantic Search", "FAISS", "HNSW", "Recall@k", "Yandex Foundation Models"]
        }
        <\/script>
        
        <!-- External Libraries -->
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://d3js.org/d3.v7.min.js"><\/script>
        <script src="https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.js"><\/script>
        
        <!-- Custom Styles -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <style>
            .gradient-bg {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .section-padding {
                padding: 4rem 1rem;
            }
            .card-shadow {
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .code-editor {
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.5;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 16px;
                background: #f8fafc;
            }
            .output-section {
                background: #1a202c;
                color: #e2e8f0;
                border-radius: 8px;
                padding: 16px;
                margin-top: 12px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.4;
                white-space: pre-wrap;
                overflow-x: auto;
            }
            .tab {
                transition: all 0.2s ease;
                cursor: pointer;
                border-bottom: 3px solid transparent;
            }
            .tab.active {
                border-bottom-color: #667eea;
                background-color: #f7fafc;
            }
            .tab-content {
                display: none;
            }
            .tab-content.active {
                display: block;
            }
            .quiz-option {
                transition: all 0.2s ease;
                cursor: pointer;
                border: 2px solid #e2e8f0;
            }
            .quiz-option:hover {
                border-color: #667eea;
                background-color: #f7fafc;
            }
            .quiz-option.selected {
                border-color: #667eea;
                background-color: #edf2f7;
            }
            .quiz-option.correct {
                border-color: #48bb78;
                background-color: #f0fff4;
            }
            .quiz-option.incorrect {
                border-color: #f56565;
                background-color: #fed7d7;
            }
            .visualization-container {
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
                background: white;
            }
            
            /* Mobile Responsiveness */
            @media (max-width: 768px) {
                .section-padding {
                    padding: 2rem 1rem;
                }
                .code-editor {
                    font-size: 12px;
                    height: 250px !important;
                }
                .grid {
                    grid-template-columns: 1fr !important;
                }
            }
            
            /* Progress Bar */
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2);
                transition: width 0.3s ease;
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <i class="fas fa-brain text-purple-600 text-2xl mr-3"></i>
                        <span class="text-xl font-bold text-gray-800">RAG \u0421\u0435\u043C\u0438\u043D\u0430\u0440</span>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="#overview" class="text-gray-700 hover:text-purple-600 transition-colors">\u041E\u0431\u0437\u043E\u0440</a>
                        <a href="#theory" class="text-gray-700 hover:text-purple-600 transition-colors">\u0422\u0435\u043E\u0440\u0438\u044F</a>
                        <a href="#practice" class="text-gray-700 hover:text-purple-600 transition-colors">\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430</a>
                        <a href="#quiz" class="text-gray-700 hover:text-purple-600 transition-colors">\u041A\u0432\u0438\u0437</a>
                        <a href="#yandex" class="text-gray-700 hover:text-purple-600 transition-colors">Yandex Models</a>
                    </div>
                    <button class="md:hidden">
                        <i class="fas fa-bars text-gray-700"></i>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white section-padding">
            <div class="max-w-6xl mx-auto text-center">
                <div class="mb-8">
                    <i class="fas fa-rocket text-6xl mb-6 opacity-90"></i>
                </div>
                <h1 class="text-5xl md:text-6xl font-bold mb-6">
                    RAG: Retrieval Augmented Generation
                </h1>
                <p class="text-xl md:text-2xl mb-8 opacity-90">
                    \u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043E\u043D\u043B\u0430\u0439\u043D-\u0441\u0435\u043C\u0438\u043D\u0430\u0440 \u043F\u043E \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0435 RAG
                </p>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-4xl mx-auto">
                    <div class="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <i class="fas fa-clock text-3xl mb-2"></i>
                            <div class="text-lg font-semibold">60 \u043C\u0438\u043D\u0443\u0442</div>
                            <div class="opacity-80">\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C</div>
                        </div>
                        <div>
                            <i class="fas fa-code text-3xl mb-2"></i>
                            <div class="text-lg font-semibold">\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B</div>
                            <div class="opacity-80">Python + Yandex Models</div>
                        </div>
                        <div>
                            <i class="fas fa-play-circle text-3xl mb-2"></i>
                            <div class="text-lg font-semibold">\u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</div>
                            <div class="opacity-80">\u041F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0430 + \u0412\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438</div>
                        </div>
                    </div>
                </div>
                <a href="#overview" class="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                    \u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435 <i class="fas fa-arrow-down ml-2"></i>
                </a>
            </div>
        </section>

        <!-- Progress Indicator -->
        <div class="bg-white py-4 shadow-sm">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0441\u0435\u043C\u0438\u043D\u0430\u0440\u0430</span>
                    <span id="progress-text">0%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                </div>
            </div>
        </div>

        <!-- Overview Section -->
        <section id="overview" class="section-padding">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-map mr-3 text-purple-600"></i>
                    \u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0441\u0435\u043C\u0438\u043D\u0430\u0440\u0430
                </h2>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <a href="#theory" onclick="scrollToSection('theory')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-purple-50">
                        <div class="text-purple-600 text-4xl mb-4">
                            <i class="fas fa-sitemap"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">1. \u0412\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0432 RAG</h3>
                        <p class="text-gray-600 mb-4">\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044F, \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B RAG \u0441\u0438\u0441\u0442\u0435\u043C\u044B</p>
                        <div class="text-sm text-gray-500">\u23F1\uFE0F 10 \u043C\u0438\u043D\u0443\u0442</div>
                        <div class="mt-3 text-purple-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0437\u0434\u0435\u043B\u0443
                        </div>
                    </a>

                    <a href="#theory" onclick="scrollToSection('theory')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-blue-50">
                        <div class="text-blue-600 text-4xl mb-4">
                            <i class="fas fa-vector-square"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">2. \u0412\u0435\u043A\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F</h3>
                        <p class="text-gray-600 mb-4">\u041C\u0435\u0442\u043E\u0434\u044B \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432, Sentence Transformers, \u043C\u043E\u0434\u0435\u043B\u0438</p>
                        <div class="text-sm text-gray-500">\u23F1\uFE0F 10 \u043C\u0438\u043D\u0443\u0442</div>
                        <div class="mt-3 text-blue-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0437\u0434\u0435\u043B\u0443
                        </div>
                    </a>

                    <a href="#theory" onclick="scrollToSection('theory')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-green-50">
                        <div class="text-green-600 text-4xl mb-4">
                            <i class="fas fa-search"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">3. \u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A</h3>
                        <p class="text-gray-600 mb-4">FAISS, HNSW, Annoy - \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432</p>
                        <div class="text-sm text-gray-500">\u23F1\uFE0F 15 \u043C\u0438\u043D\u0443\u0442</div>
                        <div class="mt-3 text-green-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0437\u0434\u0435\u043B\u0443
                        </div>
                    </a>

                    <a href="#theory" onclick="scrollToSection('theory')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-orange-50">
                        <div class="text-orange-600 text-4xl mb-4">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">4. \u041C\u0435\u0442\u0440\u0438\u043A\u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430</h3>
                        <p class="text-gray-600 mb-4">Recall@k, Precision@k, \u043E\u0446\u0435\u043D\u043A\u0430 RAG \u0441\u0438\u0441\u0442\u0435\u043C</p>
                        <div class="text-sm text-gray-500">\u23F1\uFE0F 5 \u043C\u0438\u043D\u0443\u0442</div>
                        <div class="mt-3 text-orange-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0437\u0434\u0435\u043B\u0443
                        </div>
                    </a>

                    <a href="#practice" onclick="scrollToSection('practice')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-red-50">
                        <div class="text-red-600 text-4xl mb-4">
                            <i class="fas fa-code"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">5. \u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430</h3>
                        <p class="text-gray-600 mb-4">\u0411\u0430\u0437\u043E\u0432\u044B\u0439 RAG-\u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440, \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u043A\u043E\u0434\u0430</p>
                        <div class="text-sm text-gray-500">\u23F1\uFE0F 15 \u043C\u0438\u043D\u0443\u0442</div>
                        <div class="mt-3 text-red-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0437\u0434\u0435\u043B\u0443
                        </div>
                    </a>

                    <a href="#yandex" onclick="scrollToSection('yandex')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-indigo-50">
                        <div class="text-indigo-600 text-4xl mb-4">
                            <i class="fas fa-brain"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">6. Yandex Foundation Models</h3>
                        <p class="text-gray-600 mb-4">\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 YandexGPT, \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438, API</p>
                        <div class="text-sm text-gray-500">\u23F1\uFE0F 5 \u043C\u0438\u043D\u0443\u0442</div>
                        <div class="mt-3 text-indigo-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0437\u0434\u0435\u043B\u0443
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Theory Section -->
        <section id="theory" class="bg-white section-padding">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-book mr-3 text-purple-600"></i>
                    \u0422\u0435\u043E\u0440\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043E\u0441\u043D\u043E\u0432\u044B
                </h2>

                <!-- Tabs Navigation -->
                <div class="flex flex-wrap border-b border-gray-200 mb-8" id="theory-tabs">
                    <button class="tab px-6 py-3 text-lg font-medium active" data-tab="rag-intro">
                        RAG \u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430
                    </button>
                    <button class="tab px-6 py-3 text-lg font-medium" data-tab="embeddings">
                        \u042D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438
                    </button>
                    <button class="tab px-6 py-3 text-lg font-medium" data-tab="vector-search">
                        \u0412\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A
                    </button>
                    <button class="tab px-6 py-3 text-lg font-medium" data-tab="metrics">
                        \u041C\u0435\u0442\u0440\u0438\u043A\u0438
                    </button>
                </div>

                <!-- Tab Contents -->
                <div class="tab-content active" id="rag-intro">
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-2xl font-bold mb-4">\u0427\u0442\u043E \u0442\u0430\u043A\u043E\u0435 RAG?</h3>
                            <div class="space-y-4 text-gray-700">
                                <p><strong>RAG (Retrieval-Augmented Generation)</strong> \u2014 \u0433\u0438\u0431\u0440\u0438\u0434\u043D\u0430\u044F \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430, \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u044F\u044E\u0449\u0430\u044F \u043C\u0435\u0445\u0430\u043D\u0438\u0437\u043C\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u0441 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u043C\u0438 \u044F\u0437\u044B\u043A\u043E\u0432\u044B\u043C\u0438 \u043C\u043E\u0434\u0435\u043B\u044F\u043C\u0438.</p>
                                
                                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <p class="font-semibold">\u041F\u0440\u043E\u0431\u043B\u0435\u043C\u0430:</p>
                                    <p>LLM \u0441\u043A\u043B\u043E\u043D\u043D\u044B \u043A \u0433\u0430\u043B\u043B\u044E\u0446\u0438\u043D\u0430\u0446\u0438\u044F\u043C \u0438 \u043D\u0435 \u0438\u043C\u0435\u044E\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438</p>
                                </div>
                                
                                <div class="bg-green-50 border-l-4 border-green-400 p-4">
                                    <p class="font-semibold">\u0420\u0435\u0448\u0435\u043D\u0438\u0435:</p>
                                    <p>\u0412\u043D\u0435\u0448\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u0437\u043D\u0430\u043D\u0438\u0439 + \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u0438\u0432\u043D\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C = \u0442\u043E\u0447\u043D\u044B\u0435 \u0438 \u043E\u0431\u043E\u0441\u043D\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">\u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430 RAG</h4>
                            <div class="bg-gray-100 rounded-lg p-6 font-mono text-sm">
                                <div class="text-center">
                                    <div class="mb-4">\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</div>
                                    <div class="mb-2">\u2502   Retriever     \u2502</div>
                                    <div class="mb-4">\u2502 (\u043F\u043E\u0438\u0441\u043A \u0434\u0430\u043D\u043D\u044B\u0445)  \u2502</div>
                                    <div class="mb-4">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</div>
                                    <div class="mb-4">         \u2193</div>
                                    <div class="mb-4">\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</div>
                                    <div class="mb-2">\u2502  Vector Store   \u2502</div>
                                    <div class="mb-4">\u2502 (\u0431\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439)   \u2502</div>
                                    <div class="mb-4">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</div>
                                    <div class="mb-4">         \u2193</div>
                                    <div class="mb-4">\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</div>
                                    <div class="mb-2">\u2502   Generator     \u2502</div>
                                    <div class="mb-4">\u2502 (\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F LLM) \u2502</div>
                                    <div class="mb-4">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 bg-blue-50 rounded-lg p-6">
                        <h4 class="text-lg font-semibold mb-4">\u0424\u0430\u0437\u044B \u0440\u0430\u0431\u043E\u0442\u044B RAG:</h4>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h5 class="font-semibold text-blue-800 mb-2">1. \u0418\u043D\u0434\u0435\u043A\u0441\u0430\u0446\u0438\u044F (Offline)</h5>
                                <p class="text-sm text-gray-700">\u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u2192 \u0447\u0430\u043D\u043A\u0438 \u2192 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438 \u2192 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0411\u0414</p>
                            </div>
                            <div>
                                <h5 class="font-semibold text-blue-800 mb-2">2. \u041F\u043E\u0438\u0441\u043A \u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F (Online)</h5>
                                <p class="text-sm text-gray-700">\u0437\u0430\u043F\u0440\u043E\u0441 \u2192 \u043F\u043E\u0438\u0441\u043A \u2192 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u2192 LLM \u2192 \u043E\u0442\u0432\u0435\u0442</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="embeddings">
                    <h3 class="text-2xl font-bold mb-6">\u041C\u0435\u0442\u043E\u0434\u044B \u0432\u0435\u043A\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0438 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438</h3>
                    
                    <div class="grid md:grid-cols-3 gap-6 mb-8">
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h4 class="font-semibold mb-3 text-gray-800">\u041A\u043B\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0438\u0435</h4>
                            <ul class="space-y-2 text-sm text-gray-600">
                                <li>\u2022 One-hot encoding</li>
                                <li>\u2022 Bag of words</li>
                                <li>\u2022 TF-IDF</li>
                            </ul>
                        </div>
                        <div class="bg-blue-50 rounded-lg p-6">
                            <h4 class="font-semibold mb-3 text-blue-800">\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435</h4>
                            <ul class="space-y-2 text-sm text-blue-700">
                                <li>\u2022 Word2Vec</li>
                                <li>\u2022 BERT</li>
                                <li>\u2022 Sentence Transformers</li>
                            </ul>
                        </div>
                        <div class="bg-green-50 rounded-lg p-6">
                            <h4 class="font-semibold mb-3 text-green-800">SOTA \u043C\u043E\u0434\u0435\u043B\u0438</h4>
                            <ul class="space-y-2 text-sm text-green-700">
                                <li>\u2022 all-MiniLM-L6-v2</li>
                                <li>\u2022 bge-base-en-v1.5</li>
                                <li>\u2022 YandexGPT Embeddings</li>
                            </ul>
                        </div>
                    </div>

                    <div class="bg-white border rounded-lg p-6">
                        <h4 class="font-semibold mb-4">Sentence Transformers</h4>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <ul class="space-y-2 text-sm">
                                    <li>\u2705 <strong>10,000+</strong> \u043F\u0440\u0435\u0434\u043E\u0431\u0443\u0447\u0435\u043D\u043D\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043D\u0430 Hugging Face</li>
                                    <li>\u2705 \u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 embedding, reranker, sparse encoder \u043C\u043E\u0434\u0435\u043B\u0435\u0439</li>
                                    <li>\u2705 \u041F\u0440\u043E\u0441\u0442\u043E\u0439 API \u0434\u043B\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u043E\u0438\u0441\u043A\u0430</li>
                                    <li>\u2705 \u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0430\u0446\u0438\u044F \u0434\u043B\u044F \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447</li>
                                </ul>
                            </div>
                            <div class="bg-gray-100 rounded p-4 font-mono text-xs">
                                <div class="text-green-600"># \u041F\u0440\u0438\u043C\u0435\u0440 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F</div>
                                <div>from sentence_transformers import SentenceTransformer</div>
                                <div><br></div>
                                <div>model = SentenceTransformer("all-MiniLM-L6-v2")</div>
                                <div>sentences = ["\u041F\u0440\u0438\u043C\u0435\u0440 \u0442\u0435\u043A\u0441\u0442\u0430", "\u0414\u0440\u0443\u0433\u043E\u0439 \u0442\u0435\u043A\u0441\u0442"]</div>
                                <div>embeddings = model.encode(sentences)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="vector-search">
                    <h3 class="text-2xl font-bold mb-6">\u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A: FAISS vs HNSW vs Annoy</h3>
                    
                    <div class="overflow-x-auto mb-8">
                        <table class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="border p-4 text-left">\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C</th>
                                    <th class="border p-4 text-center">\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C</th>
                                    <th class="border p-4 text-center">\u041F\u0430\u043C\u044F\u0442\u044C</th>
                                    <th class="border p-4 text-center">\u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C</th>
                                    <th class="border p-4 text-center">\u0421\u0436\u0430\u0442\u0438\u0435</th>
                                    <th class="border p-4 text-center">GPU</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="hover:bg-gray-50">
                                    <td class="border p-4 font-semibold">HNSW</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50\u2B50\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50\u2B50\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u274C</td>
                                    <td class="border p-4 text-center">\u274C</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="border p-4 font-semibold">FAISS</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50\u2B50\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u2705</td>
                                    <td class="border p-4 text-center">\u2705</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="border p-4 font-semibold">Annoy</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u2B50\u2B50\u2B50</td>
                                    <td class="border p-4 text-center">\u274C</td>
                                    <td class="border p-4 text-center">\u274C</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                            <h4 class="font-bold text-blue-800 mb-2">HNSW</h4>
                            <p class="text-sm text-blue-700 mb-3">Hierarchical Navigable Small World</p>
                            <div class="text-xs">
                                <div class="mb-2"><strong>\u041F\u0440\u0438\u043D\u0446\u0438\u043F:</strong> \u041C\u043D\u043E\u0433\u043E\u0441\u043B\u043E\u0439\u043D\u044B\u0439 \u0433\u0440\u0430\u0444 \u0441 \u0431\u044B\u0441\u0442\u0440\u043E\u0439 \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0435\u0439</div>
                                <div class="mb-2">\u2705 State-of-the-art \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B</div>
                                <div>\u274C \u0411\u043E\u043B\u044C\u0448\u0435 \u043F\u0430\u043C\u044F\u0442\u0438 \u043D\u0430 \u0440\u0451\u0431\u0440\u0430 \u0433\u0440\u0430\u0444\u0430</div>
                            </div>
                        </div>

                        <div class="bg-green-50 border-l-4 border-green-400 p-6 rounded">
                            <h4 class="font-bold text-green-800 mb-2">FAISS</h4>
                            <p class="text-sm text-green-700 mb-3">Facebook AI Similarity Search</p>
                            <div class="text-xs">
                                <div class="mb-2"><strong>\u041F\u0440\u0438\u043D\u0446\u0438\u043F:</strong> \u041A\u043B\u0430\u0441\u0442\u0435\u0440\u0438\u0437\u0430\u0446\u0438\u044F + Product Quantization</div>
                                <div class="mb-2">\u2705 \u0421\u0436\u0430\u0442\u0438\u0435 \u0432\u0435\u043A\u0442\u043E\u0440\u043E\u0432, GPU \u0443\u0441\u043A\u043E\u0440\u0435\u043D\u0438\u0435</div>
                                <div>\u274C \u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>
                            </div>
                        </div>

                        <div class="bg-orange-50 border-l-4 border-orange-400 p-6 rounded">
                            <h4 class="font-bold text-orange-800 mb-2">Annoy</h4>
                            <p class="text-sm text-orange-700 mb-3">Approximate Nearest neighbors Oh Yeah</p>
                            <div class="text-xs">
                                <div class="mb-2"><strong>\u041F\u0440\u0438\u043D\u0446\u0438\u043F:</strong> \u0411\u0438\u043D\u0430\u0440\u043D\u044B\u0435 \u0434\u0435\u0440\u0435\u0432\u044C\u044F \u0441 \u0440\u0430\u043D\u0434\u043E\u043C\u043D\u044B\u043C\u0438 \u043F\u0440\u043E\u0435\u043A\u0446\u0438\u044F\u043C\u0438</div>
                                <div class="mb-2">\u2705 \u041F\u0440\u043E\u0441\u0442\u043E\u0442\u0430 \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438</div>
                                <div>\u274C \u0412\u044B\u0441\u043E\u043A\u043E\u0435 \u043F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u043C\u044F\u0442\u0438</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="metrics">
                    <h3 class="text-2xl font-bold mb-6">\u041E\u0446\u0435\u043D\u043A\u0430 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430 \u043F\u043E\u0438\u0441\u043A\u0430: Recall@k</h3>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 class="text-lg font-semibold mb-4 text-blue-800">\u041C\u0435\u0442\u0440\u0438\u043A\u0438 \u043F\u043E\u0438\u0441\u043A\u0430 (Retrieval)</h4>
                            <div class="space-y-4">
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Recall@k</h5>
                                    <p class="text-sm text-gray-600">\u0414\u043E\u043B\u044F \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0441\u0440\u0435\u0434\u0438 \u0442\u043E\u043F-k \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432</p>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Precision@k</h5>
                                    <p class="text-sm text-gray-600">\u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0441\u0440\u0435\u0434\u0438 \u0442\u043E\u043F-k \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432</p>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">MRR</h5>
                                    <p class="text-sm text-gray-600">Mean Reciprocal Rank - \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u0440\u0430\u043D\u0433 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u043E\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4 text-green-800">\u041C\u0435\u0442\u0440\u0438\u043A\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438</h4>
                            <div class="space-y-4">
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Answer Relevancy</h5>
                                    <p class="text-sm text-gray-600">\u0420\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u043E\u0441\u0442\u044C \u043E\u0442\u0432\u0435\u0442\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0443</p>
                                </div>
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Faithfulness</h5>
                                    <p class="text-sm text-gray-600">\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u0433\u0430\u043B\u043B\u044E\u0446\u0438\u043D\u0430\u0446\u0438\u0439 \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430</p>
                                </div>
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Context Relevancy</h5>
                                    <p class="text-sm text-gray-600">\u0420\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u043E\u0441\u0442\u044C \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border-2 border-purple-200 rounded-lg p-6">
                        <h4 class="text-lg font-semibold mb-4">\u0424\u043E\u0440\u043C\u0443\u043B\u0430 Recall@k</h4>
                        <div class="bg-purple-50 rounded-lg p-6 text-center">
                            <div class="text-xl font-mono">
                                Recall@k = <span class="text-purple-600 font-bold">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0432 \u0442\u043E\u043F-k</span>
                                / <span class="text-blue-600 font-bold">\u041E\u0431\u0449\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432</span>
                            </div>
                            <div class="mt-4 text-sm text-gray-600">
                                \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0435\u0441\u043B\u0438 \u0438\u0437 5 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0430\u0439\u0434\u0435\u043D\u043E 3 \u0432 \u0442\u043E\u043F-10, \u0442\u043E Recall@10 = 3/5 = 0.6
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Practice Section -->
        <section id="practice" class="section-padding section-bg-pattern">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-code mr-3 text-green-600"></i>
                    \u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B
                </h2>

                <!-- Python Sandbox -->
                <div class="bg-white rounded-xl card-shadow p-8 mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold">\u{1F40D} Python RAG \u041F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0430</h3>
                        <div class="sandbox-status text-blue-600">
                            <i class="fas fa-spinner fa-spin"></i> \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 Pyodide...
                        </div>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <p class="text-sm"><strong>\u{1F4A1} \u0421\u043E\u0432\u0435\u0442:</strong> \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u043A\u043E\u0434 \u043D\u0438\u0436\u0435 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C" \u0434\u043B\u044F \u044D\u043A\u0441\u043F\u0435\u0440\u0438\u043C\u0435\u043D\u0442\u043E\u0432!</p>
                    </div>
                    
                    <div class="grid lg:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-3">\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u043F\u0440\u0438\u043C\u0435\u0440 RAG</h4>
                            <textarea class="code-editor w-full h-80 resize-none" id="basic-rag-code">
# \u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u043F\u0440\u0438\u043C\u0435\u0440 RAG \u0441\u0438\u0441\u0442\u0435\u043C\u044B
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class SimpleRAG:
    def __init__(self):
        self.documents = []
        self.embeddings = []
    
    def add_documents(self, docs):
        """\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 (\u0441 \u043C\u043E\u043A-\u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0430\u043C\u0438)"""
        for doc in docs:
            # \u041F\u0440\u043E\u0441\u0442\u0430\u044F \u0438\u043C\u0438\u0442\u0430\u0446\u0438\u044F \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0430
            embedding = np.random.rand(5)  # 5-\u043C\u0435\u0440\u043D\u044B\u0439 \u0432\u0435\u043A\u0442\u043E\u0440
            self.documents.append(doc)
            self.embeddings.append(embedding)
        print(f"\u2705 \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E {len(docs)} \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432")
    
    def search(self, query, top_k=2):
        """\u041F\u043E\u0438\u0441\u043A \u043D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432"""
        if not self.documents:
            return []
        
        # \u041C\u043E\u043A-\u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433 \u0437\u0430\u043F\u0440\u043E\u0441\u0430
        query_emb = np.random.rand(5)
        
        # \u0412\u044B\u0447\u0438\u0441\u043B\u044F\u0435\u043C \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u043E
        similarities = []
        for i, doc_emb in enumerate(self.embeddings):
            sim = cosine_similarity([query_emb], [doc_emb])[0][0]
            similarities.append((i, sim))
        
        # \u0421\u043E\u0440\u0442\u0438\u0440\u0443\u0435\u043C \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u0430
        similarities.sort(key=lambda x: x[1], reverse=True)
        
        # \u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C \u0442\u043E\u043F-k \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
        results = []
        for i in range(min(top_k, len(similarities))):
            doc_idx, score = similarities[i]
            results.append({
                'document': self.documents[doc_idx],
                'score': score
            })
        
        return results
    
    def ask(self, query):
        """RAG \u0437\u0430\u043F\u0440\u043E\u0441: \u043F\u043E\u0438\u0441\u043A + \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430"""
        print(f"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: '{query}'")
        
        # \u041F\u043E\u0438\u0441\u043A \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
        results = self.search(query)
        
        if not results:
            return "\u041D\u0435\u0442 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432"
        
        # \u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430
        context = "\\n".join([r['document'] for r in results])
        
        # \u041F\u0440\u043E\u0441\u0442\u0430\u044F \u0438\u043C\u0438\u0442\u0430\u0446\u0438\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438
        print(f"\u{1F4C4} \u041D\u0430\u0439\u0434\u0435\u043D\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432: {len(results)}")
        for i, result in enumerate(results, 1):
            print(f"   {i}. ({result['score']:.3f}) {result['document'][:50]}...")
        
        return f"\u041D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430: {context[:100]}..."

# \u0414\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F
rag = SimpleRAG()

# \u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u043C \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B
documents = [
    "RAG (Retrieval-Augmented Generation) \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u044F\u0435\u0442 \u043F\u043E\u0438\u0441\u043A \u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044E \u0434\u043B\u044F \u0442\u043E\u0447\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432",
    "FAISS - \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 Facebook \u0434\u043B\u044F \u0431\u044B\u0441\u0442\u0440\u043E\u0433\u043E \u043F\u043E\u0438\u0441\u043A\u0430 \u043F\u043E \u0432\u0435\u043A\u0442\u043E\u0440\u0430\u043C",
    "HNSW \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u043B\u0443\u0447\u0448\u0443\u044E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0434\u043B\u044F \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u043E\u0438\u0441\u043A\u0430",
    "\u042D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438 \u043F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u0443\u044E\u0442 \u0442\u0435\u043A\u0441\u0442 \u0432 \u0447\u0438\u0441\u043B\u043E\u0432\u044B\u0435 \u0432\u0435\u043A\u0442\u043E\u0440\u044B \u0434\u043B\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u043E\u0438\u0441\u043A\u0430",
    "Recall@k \u0438\u0437\u043C\u0435\u0440\u044F\u0435\u0442 \u0434\u043E\u043B\u044E \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0445 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0432 \u0442\u043E\u043F-k \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430\u0445"
]

rag.add_documents(documents)

# \u0422\u0435\u0441\u0442\u0438\u0440\u0443\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u044B
queries = [
    "\u0427\u0442\u043E \u0442\u0430\u043A\u043E\u0435 RAG?",
    "\u041A\u0430\u043A\u043E\u0439 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C \u043F\u043E\u0438\u0441\u043A\u0430 \u0441\u0430\u043C\u044B\u0439 \u0431\u044B\u0441\u0442\u0440\u044B\u0439?",
    "\u041A\u0430\u043A \u0438\u0437\u043C\u0435\u0440\u0438\u0442\u044C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u043E\u0438\u0441\u043A\u0430?"
]

for query in queries:
    print("\\n" + "="*60)
    answer = rag.ask(query)
    print(f"\u{1F916} \u041E\u0442\u0432\u0435\u0442: {answer}")
                            </textarea>
                            <div class="flex gap-3 mt-4">
                                <button onclick="RAGSeminar.runPythonCode(document.getElementById('basic-rag-code').value, 'basic-rag-output')" 
                                        class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    <i class="fas fa-play mr-2"></i>\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043A\u043E\u0434
                                </button>
                                <button onclick="RAGSeminar.copyToClipboard(document.getElementById('basic-rag-code').value)" 
                                        class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                    <i class="fas fa-copy mr-2"></i>\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-3">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F</h4>
                            <div class="output-section min-h-80" id="basic-rag-output">
                                \u041D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043A\u043E\u0434" \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043C\u0435\u0440\u0430...
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Embedding Visualization -->
                <div class="bg-white rounded-xl card-shadow p-8 mb-8">
                    <h3 class="text-2xl font-bold mb-6">
                        <i class="fas fa-project-diagram mr-3 text-blue-600"></i>
                        \u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0432\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432
                    </h3>
                    
                    <div class="grid lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-2">
                            <div id="embedding-visualization" class="visualization-container"></div>
                            
                            <!-- Query Input Section -->
                            <div class="mt-4 p-4 bg-gray-50 rounded-lg border">
                                <h5 class="font-semibold mb-3 text-gray-700">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441:</h5>
                                
                                <!-- Quick Select Queries -->
                                <div class="mb-3">
                                    <label class="block text-sm font-medium text-gray-600 mb-2">\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0432\u044B\u0431\u043E\u0440:</label>
                                    <div class="flex flex-wrap gap-2">
                                        <button onclick="selectPresetQuery('\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B \u043C\u0430\u0448\u0438\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F')" 
                                                class="preset-query-btn bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            \u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B ML
                                        </button>
                                        <button onclick="selectPresetQuery('\u041F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043E\u0440\u0449\u0430')" 
                                                class="preset-query-btn bg-orange-100 hover:bg-orange-200 text-orange-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            \u041F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043E\u0440\u0449\u0430
                                        </button>
                                        <button onclick="selectPresetQuery('\u0421\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u044B\u0435 \u0441\u043E\u0440\u0435\u0432\u043D\u043E\u0432\u0430\u043D\u0438\u044F')" 
                                                class="preset-query-btn bg-green-100 hover:bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            \u0421\u043F\u043E\u0440\u0442
                                        </button>
                                        <button onclick="selectPresetQuery('\u0412\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A')" 
                                                class="preset-query-btn bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            \u0412\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A
                                        </button>
                                        <button onclick="selectPresetQuery('\u041D\u0435\u0439\u0440\u043E\u043D\u043D\u044B\u0435 \u0441\u0435\u0442\u0438')" 
                                                class="preset-query-btn bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            \u041D\u0435\u0439\u0440\u043E\u0441\u0435\u0442\u0438
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Custom Query Input -->
                                <div class="mb-3">
                                    <label for="custom-query-input" class="block text-sm font-medium text-gray-600 mb-2">\u0418\u043B\u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 \u0437\u0430\u043F\u0440\u043E\u0441:</label>
                                    <div class="flex gap-2">
                                        <input type="text" 
                                               id="custom-query-input" 
                                               placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441..." 
                                               class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                               onkeypress="if(event.key==='Enter') addCustomQueryToVisualization()">
                                        <button onclick="addCustomQueryToVisualization()" 
                                                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
                                            \u2795 \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Control Buttons -->
                                <div class="flex gap-3 flex-wrap">
                                    <button onclick="findSimilarInVisualization()" 
                                            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            id="find-similar-btn" disabled>
                                        \u{1F50D} \u041D\u0430\u0439\u0442\u0438 \u043F\u043E\u0445\u043E\u0436\u0438\u0435
                                    </button>
                                    <button onclick="resetVisualization()" 
                                            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                        \u{1F504} \u0421\u0431\u0440\u043E\u0441
                                    </button>
                                    <button onclick="showVisualizationHelp()" 
                                            class="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                                        \u2753 \u0421\u043F\u0440\u0430\u0432\u043A\u0430
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-3">\u041A\u0430\u043A \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A:</h4>
                            <div class="space-y-3 text-sm text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-circle text-blue-500 mt-2 mr-3 text-xs"></i>
                                    <span><strong>\u0421\u0438\u043D\u0438\u0435 \u0442\u043E\u0447\u043A\u0438</strong> - \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u043E\u043C \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0435</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-circle text-red-500 mt-2 mr-3 text-xs"></i>
                                    <span><strong>\u041A\u0440\u0430\u0441\u043D\u044B\u0435 \u0442\u043E\u0447\u043A\u0438</strong> - \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-minus text-green-500 mt-2 mr-3"></i>
                                    <span><strong>\u0417\u0435\u043B\u0435\u043D\u0430\u044F \u043B\u0438\u043D\u0438\u044F</strong> - \u043D\u0430\u0438\u043B\u0443\u0447\u0448\u0435\u0435 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-minus text-blue-500 mt-2 mr-3"></i>
                                    <span><strong>\u0421\u0438\u043D\u0438\u0435 \u043B\u0438\u043D\u0438\u0438</strong> - \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-minus text-yellow-500 mt-2 mr-3"></i>
                                    <span><strong>\u0416\u0435\u043B\u0442\u044B\u0435 \u043B\u0438\u043D\u0438\u0438</strong> - \u043D\u0438\u0437\u043A\u043E\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u043E (\u0440\u0430\u0437\u043D\u044B\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438)</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-percent mt-2 mr-3 text-purple-600"></i>
                                    <span><strong>\u041F\u0440\u043E\u0446\u0435\u043D\u0442\u044B</strong> - \u0442\u043E\u0447\u043D\u0430\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u043E\u0445\u043E\u0436\u0435\u0441\u0442\u044C</span>
                                </div>
                            </div>
                            
                            <div class="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-200">
                                <h5 class="font-semibold text-orange-800 mb-2">\u{1F9E0} \u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442:</h5>
                                <ul class="text-sm text-orange-700 space-y-1">
                                    <li>\u2022 <strong>\u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438:</strong> \u0418\u0418/ML, \u041A\u0443\u043B\u0438\u043D\u0430\u0440\u0438\u044F, \u0421\u043F\u043E\u0440\u0442</li>
                                    <li>\u2022 <strong>\u0422\u043E\u0447\u043D\u043E\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0435 \u0441\u043B\u043E\u0432:</strong> \u043F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u2248 \u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C</li>
                                    <li>\u2022 <strong>\u041C\u0435\u0436\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439\u043D\u044B\u0435 \u0441\u0432\u044F\u0437\u0438:</strong> \u0431\u043E\u0440\u0449 \u2260 \u043C\u0430\u0448\u0438\u043D\u043D\u043E\u0435 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435</li>
                                    <li>\u2022 <strong>\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435:</strong> \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0430\u043D\u0430\u043B\u0438\u0437 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439</li>
                                </ul>
                            </div>
                            
                            <div class="mt-4 bg-blue-50 rounded-lg p-4">
                                <h5 class="font-semibold text-blue-800 mb-2">\u{1F4A1} \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435:</h5>
                                <ul class="text-sm text-blue-700 space-y-1">
                                    <li>\u2022 \u0417\u0430\u043F\u0440\u043E\u0441 "\u041F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043E\u0440\u0449\u0430" \u2192 \u0432\u044B\u0441\u043E\u043A\u043E\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u043E \u0441 \u043A\u0443\u043B\u0438\u043D\u0430\u0440\u0438\u0435\u0439</li>
                                    <li>\u2022 \u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u0440\u043E \u0418\u0418 \u2192 \u043D\u0430\u0439\u0434\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E ML-\u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B</li>
                                    <li>\u2022 \u0421\u043C\u0435\u0448\u0430\u043D\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u2192 \u043F\u043E\u043A\u0430\u0436\u0435\u0442 \u043C\u0435\u0436\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439\u043D\u044B\u0435 \u0440\u0430\u0437\u043B\u0438\u0447\u0438\u044F</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quiz Section -->
        <section id="quiz" class="bg-white section-padding">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-brain mr-3 text-purple-600"></i>
                    \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0432\u043E\u0438 \u0437\u043D\u0430\u043D\u0438\u044F
                </h2>
                
                <div class="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 mb-8">
                    <div class="text-center">
                        <i class="fas fa-trophy text-4xl text-yellow-500 mb-4"></i>
                        <h3 class="text-2xl font-bold mb-4">\u041A\u0432\u0438\u0437 \u043F\u043E RAG \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F\u043C</h3>
                        <p class="text-gray-600 mb-6">\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435, \u043D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0445\u043E\u0440\u043E\u0448\u043E \u0432\u044B \u0443\u0441\u0432\u043E\u0438\u043B\u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0441\u0435\u043C\u0438\u043D\u0430\u0440\u0430. 5 \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u043E \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044F\u0445 RAG.</p>
                        
                        <div class="grid md:grid-cols-3 gap-6 text-center">
                            <div class="bg-white rounded-lg p-4">
                                <i class="fas fa-question-circle text-2xl text-blue-600 mb-2"></i>
                                <div class="font-semibold">5 \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432</div>
                                <div class="text-sm text-gray-600">\u041E \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044F\u0445</div>
                            </div>
                            <div class="bg-white rounded-lg p-4">
                                <i class="fas fa-clock text-2xl text-green-600 mb-2"></i>
                                <div class="font-semibold">\u0411\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F</div>
                                <div class="text-sm text-gray-600">\u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043D\u0430 \u043E\u0431\u0434\u0443\u043C\u044B\u0432\u0430\u043D\u0438\u0435</div>
                            </div>
                            <div class="bg-white rounded-lg p-4">
                                <i class="fas fa-medal text-2xl text-yellow-600 mb-2"></i>
                                <div class="font-semibold">\u041C\u0433\u043D\u043E\u0432\u0435\u043D\u043D\u044B\u0439</div>
                                <div class="text-sm text-gray-600">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0441 \u043E\u0431\u044A\u044F\u0441\u043D\u0435\u043D\u0438\u044F\u043C\u0438</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quiz Container -->
                <div id="rag-quiz"></div>
            </div>
        </section>

        <!-- Yandex Models Section -->
        <section id="yandex" class="section-padding bg-gradient-to-br from-orange-50 to-red-50">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-rocket mr-3 text-orange-600"></i>
                    Yandex Foundation Models \u0434\u043B\u044F RAG
                </h2>

                <!-- Model Comparison -->
                <div class="grid lg:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-star text-2xl text-yellow-500 mr-3"></i>
                            <h3 class="text-xl font-bold">YandexGPT Pro</h3>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span>\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442:</span>
                                <span class="font-semibold">32,000 \u0442\u043E\u043A\u0435\u043D\u043E\u0432</span>
                            </div>
                            <div class="flex justify-between">
                                <span>\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <span>\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                </div>
                            </div>
                            <div class="pt-3 border-t">
                                <p class="text-gray-600">\u041B\u0443\u0447\u0448\u0438\u0439 \u0432\u044B\u0431\u043E\u0440 \u0434\u043B\u044F \u0441\u043B\u043E\u0436\u043D\u044B\u0445 RAG \u0437\u0430\u0434\u0430\u0447 \u0441 \u0434\u043B\u0438\u043D\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043E\u043C</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-balance-scale text-2xl text-blue-500 mr-3"></i>
                            <h3 class="text-xl font-bold">YandexGPT</h3>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span>\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442:</span>
                                <span class="font-semibold">8,000 \u0442\u043E\u043A\u0435\u043D\u043E\u0432</span>
                            </div>
                            <div class="flex justify-between">
                                <span>\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <span>\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                </div>
                            </div>
                            <div class="pt-3 border-t">
                                <p class="text-gray-600">\u0421\u0431\u0430\u043B\u0430\u043D\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0431\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u0430 RAG \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u0439</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-bolt text-2xl text-green-500 mr-3"></i>
                            <h3 class="text-xl font-bold">YandexGPT Lite</h3>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span>\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442:</span>
                                <span class="font-semibold">4,000 \u0442\u043E\u043A\u0435\u043D\u043E\u0432</span>
                            </div>
                            <div class="flex justify-between">
                                <span>\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <span>\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                </div>
                            </div>
                            <div class="pt-3 border-t">
                                <p class="text-gray-600">\u0411\u044B\u0441\u0442\u0440\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u0442\u044B\u0445 RAG \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Code Configuration Tool -->
                <div class="bg-white rounded-xl card-shadow p-8">
                    <h3 class="text-2xl font-bold mb-6">
                        <i class="fas fa-cog mr-3 text-orange-600"></i>
                        \u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0442\u043E\u0440 RAG \u0441 Yandex Models
                    </h3>

                    <!-- Configuration Tabs -->
                    <div class="flex border-b border-gray-200 mb-6" id="yandex-config-tabs">
                        <button class="tab px-6 py-3 text-lg font-medium active" data-tab="yandex-config">
                            <i class="fas fa-sliders-h mr-2"></i>\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F
                        </button>
                        <button class="tab px-6 py-3 text-lg font-medium" data-tab="yandex-code">
                            <i class="fas fa-code mr-2"></i>\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u0434
                        </button>
                        <button class="tab px-6 py-3 text-lg font-medium" data-tab="yandex-sandbox">
                            <i class="fas fa-play-circle mr-2"></i>\u041F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0430
                        </button>
                    </div>

                    <!-- Configuration Tab -->
                    <div class="tab-content active" id="yandex-config">
                        <div class="grid lg:grid-cols-2 gap-8">
                            <div>
                                <h4 class="font-semibold mb-4 text-gray-800">\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B RAG \u0441\u0438\u0441\u0442\u0435\u043C\u044B:</h4>
                                
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            <i class="fas fa-brain mr-1 text-orange-500"></i>\u041C\u043E\u0434\u0435\u043B\u044C \u0434\u043B\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438:
                                        </label>
                                        <select id="yandex-model-select" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                                            <option value="yandexgpt-pro">YandexGPT Pro (32K \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u043B\u0443\u0447\u0448\u0435\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E)</option>
                                            <option value="yandexgpt" selected>YandexGPT (8K \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u0441\u0431\u0430\u043B\u0430\u043D\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439)</option>
                                            <option value="yandexgpt-lite">YandexGPT Lite (4K \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u0431\u044B\u0441\u0442\u0440\u044B\u0439)</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            <i class="fas fa-plug mr-1 text-blue-500"></i>API \u043F\u043E\u0434\u0445\u043E\u0434:
                                        </label>
                                        <select id="api-approach-select" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                                            <option value="sdk">Yandex Cloud SDK (\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F)</option>
                                            <option value="openai" selected>OpenAI Compatible API</option>
                                        </select>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                <i class="fas fa-list-ol mr-1 text-green-500"></i>Top-K \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432:
                                            </label>
                                            <input type="number" id="topk-input" value="3" min="1" max="10" 
                                                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                            <p class="text-xs text-gray-500 mt-1">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430</p>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                <i class="fas fa-cut mr-1 text-purple-500"></i>\u0420\u0430\u0437\u043C\u0435\u0440 \u0447\u0430\u043D\u043A\u0430:
                                            </label>
                                            <input type="number" id="chunk-size-input" value="1000" min="100" max="4000" step="100"
                                                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                            <p class="text-xs text-gray-500 mt-1">\u0422\u043E\u043A\u0435\u043D\u043E\u0432 \u043D\u0430 \u0447\u0430\u043D\u043A</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            <i class="fas fa-folder mr-1 text-indigo-500"></i>Folder ID (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E):
                                        </label>
                                        <input type="text" id="folder-id-input" placeholder="b1g2b3c4d5e6f7g8h9i0" 
                                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                        <p class="text-xs text-gray-500 mt-1">\u0412\u0430\u0448 Folder ID \u0438\u0437 Yandex Cloud</p>
                                    </div>
                                    
                                    <button onclick="generateYandexRAGCode()" 
                                            class="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105">
                                        <i class="fas fa-magic mr-2"></i>\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u0434 RAG
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <h4 class="font-semibold mb-4 text-gray-800">\u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440:</h4>
                                <div class="bg-gray-50 rounded-lg p-6 h-96 overflow-y-auto border-2 border-dashed border-gray-300">
                                    <div class="text-center text-gray-500 mt-20">
                                        <i class="fas fa-code text-4xl mb-4"></i>
                                        <p class="text-lg mb-2">\u041A\u043E\u0434 \u0431\u0443\u0434\u0435\u0442 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D \u0437\u0434\u0435\u0441\u044C</p>
                                        <p class="text-sm">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0441\u043B\u0435\u0432\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u0434"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Generated Code Tab -->
                    <div class="tab-content" id="yandex-code">
                        <div class="mb-4 flex items-center justify-between">
                            <h4 class="font-semibold text-gray-800">
                                <i class="fas fa-file-code mr-2 text-blue-600"></i>\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 Python \u043A\u043E\u0434
                            </h4>
                            <div class="flex gap-2">
                                <button onclick="copyGeneratedCode()" 
                                        class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                    <i class="fas fa-copy mr-2"></i>\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C
                                </button>
                                <button onclick="downloadGeneratedCode()" 
                                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <i class="fas fa-download mr-2"></i>\u0421\u043A\u0430\u0447\u0430\u0442\u044C
                                </button>
                                <button onclick="sendCodeToSandbox()" 
                                        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    <i class="fas fa-play mr-2"></i>\u0412 \u043F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0443
                                </button>
                            </div>
                        </div>
                        
                        <!-- Enhanced Code Editor -->
                        <div class="relative">
                            <div class="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
                                Python
                            </div>
                            <textarea id="yandex-generated-code-editor" 
                                      class="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none overflow-auto"
                                      placeholder="\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 '\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F' \u0438 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043E\u0434..."
                                      spellcheck="false"></textarea>
                        </div>

                        <div class="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                            <h5 class="font-semibold text-blue-800 mb-2">
                                <i class="fas fa-lightbulb mr-2"></i>\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430:
                            </h5>
                            <ul class="text-sm text-blue-700 space-y-1">
                                <li>\u2022 \u270F\uFE0F \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043E\u0434 \u043F\u0440\u044F\u043C\u043E \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435</li>
                                <li>\u2022 \u{1F680} \u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u0434 \u0432 \u043F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0443 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F</li>
                                <li>\u2022 \u{1F4CB} \u041A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0438\u043B\u0438 \u0441\u043A\u0430\u0447\u0430\u0439\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0444\u0430\u0439\u043B</li>
                                <li>\u2022 \u{1F527} \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Interactive Sandbox Tab -->
                    <div class="tab-content" id="yandex-sandbox">
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">
                                <i class="fas fa-flask mr-2 text-green-600"></i>\u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u043F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0430 Yandex RAG
                            </h4>
                            <p class="text-gray-600 text-sm">\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u0434 \u0441 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 (\u0431\u0435\u0437 \u043C\u043E\u043A\u043E\u0432)</p>
                        </div>

                        <!-- Yandex Cloud Credentials Input -->
                        <div class="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 class="font-semibold text-blue-800 mb-3">
                                <i class="fas fa-key mr-2"></i>Yandex Cloud \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F (\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F)
                            </h5>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <i class="fas fa-folder mr-1 text-blue-500"></i>Folder ID:
                                    </label>
                                    <input type="text" 
                                           id="sandbox-folder-id" 
                                           placeholder="b1g2b3c4d5e6f7g8h9i0" 
                                           class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono">
                                    <p class="text-xs text-gray-500 mt-1">\u0412\u0430\u0448 Folder ID \u0438\u0437 Yandex Cloud</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <i class="fas fa-key mr-1 text-orange-500"></i>API Key:
                                    </label>
                                    <input type="password" 
                                           id="sandbox-api-key" 
                                           placeholder="AQVN..." 
                                           class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono">
                                    <p class="text-xs text-gray-500 mt-1">API \u043A\u043B\u044E\u0447 \u0438\u043B\u0438 IAM \u0442\u043E\u043A\u0435\u043D</p>
                                </div>
                            </div>
                            <div class="mt-3 flex items-center gap-3">
                                <button onclick="injectCredentialsIntoCode()" 
                                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    <i class="fas fa-inject mr-2"></i>\u0412\u043D\u0435\u0434\u0440\u0438\u0442\u044C \u0432 \u043A\u043E\u0434
                                </button>
                                <button onclick="validateCredentials()" 
                                        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                    <i class="fas fa-check mr-2"></i>\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C
                                </button>
                                <div id="credentials-status" class="text-sm text-gray-600">
                                    <i class="fas fa-info-circle mr-1"></i>\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438
                                </div>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-6">
                            <div>
                                <div class="flex items-center justify-between mb-3">
                                    <h5 class="font-medium text-gray-700">\u0418\u0441\u043F\u043E\u043B\u043D\u044F\u0435\u043C\u044B\u0439 \u043A\u043E\u0434:</h5>
                                    <div class="flex gap-2">
                                        <button onclick="loadCodeFromEditor()" 
                                                class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                                            <i class="fas fa-sync mr-1"></i>\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430
                                        </button>
                                        <div class="sandbox-status text-blue-600 text-sm">
                                            <i class="fas fa-spinner fa-spin"></i> Pyodide \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F...
                                        </div>
                                    </div>
                                </div>
                                
                                <textarea id="yandex-sandbox-code" 
                                          class="w-full h-64 p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                          placeholder="\u041A\u043E\u0434 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0441\u044F \u0441\u044E\u0434\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438..."></textarea>
                                
                                <div class="flex gap-3 mt-3">
                                    <button onclick="runYandexSandboxCode()" 
                                            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1">
                                        <i class="fas fa-play mr-2"></i>\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043A\u043E\u0434
                                    </button>
                                    <button onclick="clearSandboxOutput()" 
                                            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                        <i class="fas fa-trash mr-2"></i>\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C
                                    </button>
                                </div>

                                <div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <h6 class="font-semibold text-yellow-800 mb-2">
                                        <i class="fas fa-exclamation-triangle mr-2"></i>\u0412\u0430\u0436\u043D\u043E:
                                    </h6>
                                    <ul class="text-sm text-yellow-700 space-y-1">
                                        <li>\u2022 \u041A\u043E\u0434 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435</li>
                                        <li>\u2022 API \u043A\u043B\u044E\u0447\u0438 Yandex \u043D\u0443\u0436\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E</li>
                                        <li>\u2022 \u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F numpy, pandas, requests</li>
                                        <li>\u2022 \u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0435 HTTP \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div>
                                <h5 class="font-medium text-gray-700 mb-3">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F:</h5>
                                <div class="output-section min-h-64 max-h-80 overflow-y-auto" id="yandex-sandbox-output">
                                    \u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043A\u043E\u0434 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432...
                                </div>

                                <div class="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                                    <h6 class="font-semibold text-green-800 mb-2">
                                        <i class="fas fa-rocket mr-2"></i>\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438:
                                    </h6>
                                    <ul class="text-sm text-green-700 space-y-1">
                                        <li>\u2022 \u{1F504} \u0420\u0435\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 Python \u043A\u043E\u0434\u0430</li>
                                        <li>\u2022 \u{1F4E6} \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043F\u0430\u043A\u0435\u0442\u043E\u0432</li>
                                        <li>\u2022 \u{1F310} HTTP \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u043A \u0432\u043D\u0435\u0448\u043D\u0438\u043C API</li>
                                        <li>\u2022 \u{1F4CA} \u0412\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445 \u0441 matplotlib</li>
                                        <li>\u2022 \u{1F9EA} \u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 RAG \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Getting Started Guide -->
                    <div class="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-lg p-6">
                        <div class="flex items-start">
                            <i class="fas fa-rocket text-orange-600 text-2xl mt-1 mr-4"></i>
                            <div>
                                <p class="font-semibold text-orange-800 mb-3 text-lg">\u{1F680} \u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0441\u0442\u0430\u0440\u0442 \u0441 Yandex Foundation Models</p>
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h6 class="font-semibold text-orange-800 mb-2">\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430:</h6>
                                        <ol class="text-sm text-orange-700 space-y-1">
                                            <li>1. \u{1F4DD} \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C \u0432 <a href="https://cloud.yandex.ru" target="_blank" class="underline hover:text-orange-900">Yandex Cloud</a></li>
                                            <li>2. \u{1F511} \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u043D\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442</li>
                                            <li>3. \u{1F6E0}\uFE0F \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 API \u043A\u043B\u044E\u0447 \u0438\u043B\u0438 IAM \u0442\u043E\u043A\u0435\u043D</li>
                                            <li>4. \u{1F4E6} \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 SDK: <code class="bg-orange-100 px-1 rounded font-mono">pip install yandexcloud</code></li>
                                        </ol>
                                    </div>
                                    <div>
                                        <h6 class="font-semibold text-orange-800 mb-2">\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435:</h6>
                                        <ol class="text-sm text-orange-700 space-y-1">
                                            <li>5. \u2699\uFE0F \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 "\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F"</li>
                                            <li>6. \u{1F504} \u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043E\u0434 RAG</li>
                                            <li>7. \u270F\uFE0F \u041E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043E\u0434 \u043F\u043E\u0434 \u0441\u0432\u043E\u0438 \u043D\u0443\u0436\u0434\u044B</li>
                                            <li>8. \u{1F9EA} \u041F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0432 \u043F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0435</li>
                                        </ol>
                                    </div>
                                </div>
                                
                                <div class="mt-4 p-3 bg-orange-100 rounded-lg">
                                    <p class="text-sm text-orange-800">
                                        <i class="fas fa-info-circle mr-2"></i>
                                        <strong>\u0421\u043E\u0432\u0435\u0442:</strong> \u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0441 OpenAI Compatible API - \u044D\u0442\u043E \u0441\u0430\u043C\u044B\u0439 \u043F\u0440\u043E\u0441\u0442\u043E\u0439 \u0441\u043F\u043E\u0441\u043E\u0431 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0441 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Conclusion Section -->
        <section class="gradient-bg text-white section-padding">
            <div class="max-w-4xl mx-auto text-center">
                <i class="fas fa-graduation-cap text-6xl mb-6 opacity-90"></i>
                <h2 class="text-4xl font-bold mb-6">\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C!</h2>
                <p class="text-xl mb-8 opacity-90">
                    \u0412\u044B \u0438\u0437\u0443\u0447\u0438\u043B\u0438 \u043E\u0441\u043D\u043E\u0432\u044B RAG \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0438 \u0433\u043E\u0442\u043E\u0432\u044B \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u043D\u0430\u043D\u0438\u044F \u043D\u0430 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0435
                </p>
                
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
                    <h3 class="text-2xl font-bold mb-6">\u0427\u0442\u043E \u0432\u044B \u0438\u0437\u0443\u0447\u0438\u043B\u0438:</h3>
                    <div class="grid md:grid-cols-2 gap-6 text-left">
                        <div>
                            <ul class="space-y-3">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>\u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0443 RAG \u0441\u0438\u0441\u0442\u0435\u043C</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>\u041C\u0435\u0442\u043E\u0434\u044B \u0432\u0435\u043A\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0438 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u043E\u0438\u0441\u043A\u0430</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul class="space-y-3">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>\u041C\u0435\u0442\u0440\u0438\u043A\u0438 \u043E\u0446\u0435\u043D\u043A\u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044E RAG</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044E \u0441 Yandex Foundation Models</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#overview" class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-redo mr-2"></i>\u041F\u0440\u043E\u0439\u0442\u0438 \u0435\u0449\u0435 \u0440\u0430\u0437
                    </a>
                    <button onclick="RAGSeminar.downloadCode(getFullSeminarNotes(), 'rag-seminar-notes.txt')" 
                            class="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
                        <i class="fas fa-download mr-2"></i>\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043A\u043E\u043D\u0441\u043F\u0435\u043A\u0442
                    </button>
                </div>
                
                <div class="mt-8 text-sm opacity-75">
                    <p>\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u0441\u0435\u043C\u0438\u043D\u0430\u0440\u0435! \u0423\u0434\u0430\u0447\u0438 \u0432 \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0438 RAG \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 \u{1F680}</p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-12">
            <div class="max-w-6xl mx-auto px-4">
                <div class="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">
                            <i class="fas fa-brain mr-2"></i>RAG \u0421\u0435\u043C\u0438\u043D\u0430\u0440
                        </h3>
                        <p class="text-gray-300 mb-4">
                            \u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 Retrieval-Augmented Generation
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-300 hover:text-white transition-colors" title="GitHub">
                                <i class="fab fa-github text-xl"></i>
                            </a>
                            <a href="https://t.me/llm_notes" target="_blank" class="text-gray-300 hover:text-white transition-colors" title="Telegram \u043A\u0430\u043D\u0430\u043B LLM Notes">
                                <i class="fab fa-telegram text-xl"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">\u0420\u0430\u0437\u0434\u0435\u043B\u044B</h4>
                        <ul class="space-y-2 text-gray-300">
                            <li><a href="#overview" class="hover:text-white transition-colors">\u041E\u0431\u0437\u043E\u0440</a></li>
                            <li><a href="#theory" class="hover:text-white transition-colors">\u0422\u0435\u043E\u0440\u0438\u044F</a></li>
                            <li><a href="#practice" class="hover:text-white transition-colors">\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430</a></li>
                            <li><a href="#quiz" class="hover:text-white transition-colors">\u041A\u0432\u0438\u0437</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438</h4>
                        <ul class="space-y-2 text-gray-300">
                            <li>Python & Pyodide</li>
                            <li>D3.js \u0412\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438</li>
                            <li>Yandex Foundation Models</li>
                            <li>Cloudflare Pages</li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 RAG \u0421\u0435\u043C\u0438\u043D\u0430\u0440. \u0421\u0434\u0435\u043B\u0430\u043D\u043E \u0441 \u2764\uFE0F \u0434\u043B\u044F \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u044F AI \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439</p>
                    <p class="mt-2 text-sm">
                        \u041F\u043E\u0434\u043F\u0438\u0441\u044B\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u043D\u0430 \u043D\u0430\u0448 
                        <a href="https://t.me/llm_notes" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors">
                            <i class="fab fa-telegram mr-1"></i>Telegram \u043A\u0430\u043D\u0430\u043B
                        </a> 
                        \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043D\u043E\u0432\u044B\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u043F\u043E AI
                    </p>
                </div>
            </div>
        </footer>

        <!-- Load scripts -->
        <script src="/static/app.js"><\/script>
        
        <script>
            // Visualization and interaction functions
            let visualizationSvg = null;
            let queries = [];
            let currentQuery = null;
            
            // Document data for visualization
            const documents = [
                {id: "doc1", x: 100, y: 150, text: "\u041C\u0430\u0448\u0438\u043D\u043D\u043E\u0435 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435", type: "document"},
                {id: "doc2", x: 120, y: 170, text: "\u041D\u0435\u0439\u0440\u043E\u043D\u043D\u044B\u0435 \u0441\u0435\u0442\u0438", type: "document"},
                {id: "doc3", x: 300, y: 100, text: "\u041F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0441\u0442\u044B", type: "document"},
                {id: "doc4", x: 320, y: 120, text: "\u0418\u0442\u0430\u043B\u044C\u044F\u043D\u0441\u043A\u0430\u044F \u043A\u0443\u0445\u043D\u044F", type: "document"},
                {id: "doc5", x: 200, y: 300, text: "\u0424\u0443\u0442\u0431\u043E\u043B\u044C\u043D\u044B\u0439 \u043C\u0430\u0442\u0447", type: "document"},
                {id: "doc6", x: 180, y: 280, text: "\u0421\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u044B\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438", type: "document"}
            ];
            
            function initializeVisualization() {
                const container = document.getElementById('embedding-visualization');
                if (!container || visualizationSvg) return;
                
                const width = 600, height = 400;
                
                visualizationSvg = d3.select(container)
                    .append('svg')
                    .attr('width', '100%')
                    .attr('height', height)
                    .attr('viewBox', \`0 0 \${width} \${height}\`)
                    .style('background', 'white');
                
                // Add documents
                const dots = visualizationSvg.selectAll('.document')
                    .data(documents)
                    .enter()
                    .append('circle')
                    .attr('class', 'document')
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y)
                    .attr('r', 8)
                    .attr('fill', '#4285f4')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 2)
                    .style('cursor', 'pointer');
                
                // Add labels
                visualizationSvg.selectAll('.label')
                    .data(documents)
                    .enter()
                    .append('text')
                    .attr('class', 'label')
                    .attr('x', d => d.x)
                    .attr('y', d => d.y - 15)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '12px')
                    .attr('fill', '#333')
                    .text(d => d.text);
                
                // Tooltips
                dots.on('mouseover', function(event, d) {
                    d3.select('body').append('div')
                        .attr('class', 'tooltip')
                        .style('position', 'absolute')
                        .style('background', 'rgba(0,0,0,0.8)')
                        .style('color', 'white')
                        .style('padding', '8px')
                        .style('border-radius', '4px')
                        .style('pointer-events', 'none')
                        .style('opacity', 0)
                        .html(\`<strong>\${d.text}</strong><br>ID: \${d.id}\`)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 10) + 'px')
                        .transition()
                        .duration(200)
                        .style('opacity', 1);
                })
                .on('mouseout', function() {
                    d3.selectAll('.tooltip').remove();
                });
            }
            
            // Preset queries with strategic positioning for better demonstration
            const presetQueries = {
                '\u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B \u043C\u0430\u0448\u0438\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F': { x: 110, y: 160, category: 'AI' },
                '\u041D\u0435\u0439\u0440\u043E\u043D\u043D\u044B\u0435 \u0441\u0435\u0442\u0438': { x: 130, y: 180, category: 'AI' },
                '\u0412\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A': { x: 140, y: 140, category: 'AI' },
                '\u0420\u0435\u0446\u0435\u043F\u0442\u044B \u0438\u0442\u0430\u043B\u044C\u044F\u043D\u0441\u043A\u043E\u0439 \u043A\u0443\u0445\u043D\u0438': { x: 310, y: 110, category: 'Food' },
                '\u041F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0441\u0442\u044B': { x: 290, y: 130, category: 'Food' },
                '\u041F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043E\u0440\u0449\u0430': { x: 320, y: 90, category: 'Food' },
                '\u0412\u0430\u0440\u043A\u0430 \u0441\u0443\u043F\u0430': { x: 280, y: 140, category: 'Food' },
                '\u0421\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u044B\u0435 \u0441\u043E\u0440\u0435\u0432\u043D\u043E\u0432\u0430\u043D\u0438\u044F': { x: 190, y: 290, category: 'Sports' },
                '\u0424\u0443\u0442\u0431\u043E\u043B\u044C\u043D\u044B\u0435 \u043C\u0430\u0442\u0447\u0438': { x: 210, y: 310, category: 'Sports' }
            };
            
            function selectPresetQuery(queryText) {
                document.getElementById('custom-query-input').value = queryText;
                RAGSeminar.showNotification(\`\u0412\u044B\u0431\u0440\u0430\u043D \u0437\u0430\u043F\u0440\u043E\u0441: "\${queryText}"\`, 'info');
            }
            
            function addCustomQueryToVisualization() {
                const input = document.getElementById('custom-query-input');
                const queryText = input.value.trim();
                
                if (!queryText) {
                    RAGSeminar.showNotification('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0430!', 'warning');
                    return;
                }
                
                addQueryToVisualization(queryText);
                input.value = '';
            }
            
            function addQueryToVisualization(queryText = null) {
                if (!visualizationSvg) return;
                
                const finalQueryText = queryText || \`\u0417\u0430\u043F\u0440\u043E\u0441 \${queries.length + 1}\`;
                let x, y;
                
                // Use strategic positioning for preset queries
                if (queryText && presetQueries[queryText]) {
                    const preset = presetQueries[queryText];
                    x = preset.x + (Math.random() - 0.5) * 20; // Small random offset
                    y = preset.y + (Math.random() - 0.5) * 20;
                } else {
                    x = Math.random() * 500 + 50;
                    y = Math.random() * 300 + 50;
                }
                
                const queryId = \`query_\${queries.length + 1}\`;
                
                const query = {
                    id: queryId,
                    x: x,
                    y: y,
                    text: finalQueryText,
                    type: "query"
                };
                
                queries.push(query);
                currentQuery = query;
                
                // Clear previous connections when adding new query
                visualizationSvg.selectAll('.connection').remove();
                visualizationSvg.selectAll('.similarity-text').remove();
                
                visualizationSvg.append('circle')
                    .attr('class', 'query')
                    .attr('id', queryId)
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('r', 10)
                    .attr('fill', '#ea4335')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 2)
                    .style('cursor', 'pointer')
                    .on('click', function() {
                        currentQuery = query;
                        // Highlight selected query
                        visualizationSvg.selectAll('.query').attr('stroke-width', 2);
                        d3.select(this).attr('stroke-width', 4);
                        updateFindButton();
                    });
                
                const label = visualizationSvg.append('text')
                    .attr('class', 'query-label')
                    .attr('id', \`\${queryId}-label\`)
                    .attr('x', x)
                    .attr('y', y - 18)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '11px')
                    .attr('font-weight', 'bold')
                    .attr('fill', '#ea4335')
                    .style('cursor', 'pointer')
                    .on('click', function() {
                        currentQuery = query;
                        updateFindButton();
                    });
                
                // Wrap long text
                const words = finalQueryText.split(' ');
                if (words.length > 2) {
                    label.text('');
                    label.append('tspan')
                        .attr('x', x)
                        .attr('dy', 0)
                        .text(words.slice(0, 2).join(' '));
                    if (words.length > 2) {
                        label.append('tspan')
                            .attr('x', x)
                            .attr('dy', '1.2em')
                            .text(words.slice(2).join(' '));
                    }
                } else {
                    label.text(finalQueryText);
                }
                
                updateFindButton();
                RAGSeminar.showNotification(\`\u0417\u0430\u043F\u0440\u043E\u0441 "\${finalQueryText}" \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D!\`, 'success');
            }
            
            function updateFindButton() {
                const findBtn = document.getElementById('find-similar-btn');
                if (currentQuery) {
                    findBtn.disabled = false;
                    findBtn.classList.remove('disabled:bg-gray-400', 'disabled:cursor-not-allowed');
                } else {
                    findBtn.disabled = true;
                    findBtn.classList.add('disabled:bg-gray-400', 'disabled:cursor-not-allowed');
                }
            }
            
            function findSimilarInVisualization() {
                if (!currentQuery || !visualizationSvg) {
                    RAGSeminar.showNotification('\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441!', 'warning');
                    return;
                }
                
                // Advanced semantic similarity calculation
                const similarities = documents.map(doc => {
                    const queryLower = currentQuery.text.toLowerCase();
                    const docLower = doc.text.toLowerCase();
                    
                    // \u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0441 \u0431\u043E\u043B\u0435\u0435 \u0442\u043E\u0447\u043D\u044B\u043C\u0438 \u0442\u0435\u0440\u043C\u0438\u043D\u0430\u043C\u0438
                    const semanticCategories = {
                        ai: {
                            terms: ['\u043C\u0430\u0448\u0438\u043D\u043D\u043E\u0435', '\u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435', '\u043D\u0435\u0439\u0440\u043E\u043D\u043D', '\u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C', '\u0432\u0435\u043A\u0442\u043E\u0440\u043D', '\u043F\u043E\u0438\u0441\u043A', '\u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0435\u043D\u043D', '\u043C\u043E\u0434\u0435\u043B', '\u0434\u0430\u043D\u043D', 'ai', 'ml'],
                            boost: 0.9
                        },
                        food: {
                            terms: ['\u043A\u0443\u0445\u043D', '\u043F\u0430\u0441\u0442', '\u043F\u0440\u0438\u0433\u043E\u0442\u043E\u0432', '\u0440\u0435\u0446\u0435\u043F\u0442', '\u0438\u0442\u0430\u043B\u044C', '\u0435\u0434\u0430', '\u0431\u043B\u044E\u0434', '\u0433\u043E\u0442\u043E\u0432', '\u0431\u043E\u0440\u0449', '\u0441\u0443\u043F', '\u0432\u0430\u0440\u0438\u0442\u044C', '\u0436\u0430\u0440\u0438\u0442\u044C'],
                            boost: 0.85
                        },
                        sports: {
                            terms: ['\u0441\u043F\u043E\u0440\u0442', '\u0444\u0443\u0442\u0431\u043E\u043B', '\u043C\u0430\u0442\u0447', '\u0441\u043E\u0440\u0435\u0432\u043D\u043E\u0432', '\u0438\u0433\u0440\u0430', '\u043A\u043E\u043C\u0430\u043D\u0434\u0430', '\u0442\u0440\u0435\u043D\u0438\u0440', '\u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A'],
                            boost: 0.8
                        }
                    };
                    
                    // \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0438 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430
                    let queryCategory = null;
                    let docCategory = null;
                    let maxQueryScore = 0;
                    let maxDocScore = 0;
                    
                    for (const [category, data] of Object.entries(semanticCategories)) {
                        // \u041F\u043E\u0434\u0441\u0447\u0435\u0442 \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430
                        const queryMatches = data.terms.filter(term => queryLower.includes(term)).length;
                        const queryScore = queryMatches / data.terms.length;
                        
                        if (queryScore > maxQueryScore) {
                            maxQueryScore = queryScore;
                            queryCategory = category;
                        }
                        
                        // \u041F\u043E\u0434\u0441\u0447\u0435\u0442 \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430
                        const docMatches = data.terms.filter(term => docLower.includes(term)).length;
                        const docScore = docMatches / data.terms.length;
                        
                        if (docScore > maxDocScore) {
                            maxDocScore = docScore;
                            docCategory = category;
                        }
                    }
                    
                    // \u0420\u0430\u0441\u0447\u0435\u0442 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043F\u043E\u0445\u043E\u0436\u0435\u0441\u0442\u0438
                    let semanticSimilarity = 0;
                    let isSemanticMatch = false;
                    
                    if (queryCategory && docCategory) {
                        if (queryCategory === docCategory) {
                            // \u041E\u0434\u043D\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F - \u0432\u044B\u0441\u043E\u043A\u043E\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u043E
                            semanticSimilarity = Math.min(maxQueryScore, maxDocScore) * semanticCategories[queryCategory].boost;
                            isSemanticMatch = true;
                        } else {
                            // \u0420\u0430\u0437\u043D\u044B\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 - \u043E\u0447\u0435\u043D\u044C \u043D\u0438\u0437\u043A\u043E\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u043E
                            semanticSimilarity = 0.1;
                        }
                    } else {
                        // \u0415\u0441\u043B\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0430 - \u0441\u0440\u0435\u0434\u043D\u0435-\u043D\u0438\u0437\u043A\u043E\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u043E
                        semanticSimilarity = 0.2;
                    }
                    
                    // \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043D\u0430 \u043F\u0440\u044F\u043C\u043E\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0435 \u0441\u043B\u043E\u0432
                    const queryWords = queryLower.split(/\\s+/);
                    const docWords = docLower.split(/\\s+/);
                    let directWordMatches = 0;
                    
                    queryWords.forEach(qword => {
                        docWords.forEach(dword => {
                            if (qword.length > 3 && dword.includes(qword.substring(0, 4))) {
                                directWordMatches++;
                            }
                        });
                    });
                    
                    const directMatchBonus = Math.min(directWordMatches * 0.2, 0.4);
                    
                    // \u0424\u0438\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0445\u043E\u0436\u0435\u0441\u0442\u044C (0-1)
                    const finalSimilarity = Math.min(1, semanticSimilarity + directMatchBonus);
                    
                    // \u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0434\u043B\u044F \u0432\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 (\u043C\u0435\u043D\u0435\u0435 \u0432\u0430\u0436\u043D\u043E)
                    const euclideanDist = Math.sqrt(
                        Math.pow(doc.x - currentQuery.x, 2) + 
                        Math.pow(doc.y - currentQuery.y, 2)
                    );
                    
                    return { 
                        doc, 
                        distance: euclideanDist, 
                        similarity: finalSimilarity,
                        semanticMatch: isSemanticMatch,
                        queryCategory,
                        docCategory,
                        directMatches: directWordMatches
                    };
                });
                
                // Sort by similarity (higher is better)
                similarities.sort((a, b) => b.similarity - a.similarity);
                const topK = similarities.slice(0, 3);
                
                // Clear previous connections
                visualizationSvg.selectAll('.connection').remove();
                visualizationSvg.selectAll('.similarity-text').remove();
                
                // Draw connections with enhanced visualization
                topK.forEach((item, index) => {
                    const doc = item.doc;
                    const similarity = item.similarity;
                    const isSemanticMatch = item.semanticMatch;
                    
                    // Color coding: green for best match, blue for semantic matches, yellow for distance-based
                    let strokeColor;
                    if (index === 0) {
                        strokeColor = '#34a853'; // Green for best match
                    } else if (isSemanticMatch) {
                        strokeColor = '#4285f4'; // Blue for semantic matches
                    } else {
                        strokeColor = '#fbbc04'; // Yellow for distance-based
                    }
                    
                    visualizationSvg.append('line')
                        .attr('class', 'connection')
                        .attr('x1', currentQuery.x)
                        .attr('y1', currentQuery.y)
                        .attr('x2', doc.x)
                        .attr('y2', doc.y)
                        .attr('stroke', strokeColor)
                        .attr('stroke-width', 4 - index * 0.8)
                        .attr('stroke-dasharray', index === 0 ? '0' : '8,4')
                        .attr('opacity', 0.8);
                    
                    const midX = (currentQuery.x + doc.x) / 2;
                    const midY = (currentQuery.y + doc.y) / 2;
                    
                    // Similarity score with background for better readability
                    const scoreGroup = visualizationSvg.append('g')
                        .attr('class', 'similarity-text');
                    
                    scoreGroup.append('rect')
                        .attr('x', midX - 15)
                        .attr('y', midY - 8)
                        .attr('width', 30)
                        .attr('height', 16)
                        .attr('fill', 'white')
                        .attr('stroke', strokeColor)
                        .attr('stroke-width', 1)
                        .attr('rx', 8)
                        .attr('opacity', 0.9);
                    
                    scoreGroup.append('text')
                        .attr('x', midX)
                        .attr('y', midY + 4)
                        .attr('text-anchor', 'middle')
                        .attr('font-size', '10px')
                        .attr('font-weight', 'bold')
                        .attr('fill', strokeColor)
                        .text(similarity.toFixed(2));
                });
                
                // Show detailed results summary
                const bestMatch = topK[0];
                const semanticMatches = topK.filter(item => item.semanticMatch).length;
                
                let message = \`\u{1F50D} \u0410\u043D\u0430\u043B\u0438\u0437 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 "\${currentQuery.text}":\\n\`;
                
                // Analyze query category
                if (bestMatch.queryCategory) {
                    const categoryNames = { ai: '\u0418\u0418/ML', food: '\u041A\u0443\u043B\u0438\u043D\u0430\u0440\u0438\u044F', sports: '\u0421\u043F\u043E\u0440\u0442' };
                    message += \`\u{1F4C2} \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430: \${categoryNames[bestMatch.queryCategory]}\\n\`;
                }
                
                // Show top matches with detailed explanation
                topK.forEach((item, i) => {
                    const categoryNames = { ai: '\u0418\u0418/ML', food: '\u041A\u0443\u043B\u0438\u043D\u0430\u0440\u0438\u044F', sports: '\u0421\u043F\u043E\u0440\u0442' };
                    const matchReason = item.semanticMatch ? 
                        \`\u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u043E (\${categoryNames[item.docCategory]})\` : 
                        '\u043D\u0438\u0437\u043A\u043E\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u043E (\u0440\u0430\u0437\u043D\u044B\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438)';
                    
                    message += \`\\n\${i + 1}. "\${item.doc.text}" - \${(item.similarity * 100).toFixed(0)}% (\${matchReason})\`;
                });
                
                if (semanticMatches === 0) {
                    message += '\\n\\n\u26A0\uFE0F \u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u043E\u0445\u043E\u0436\u0438\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E!';
                } else {
                    message += \`\\n\\n\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E \${semanticMatches} \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432\`;
                }
                
                // Show alert with detailed explanation
                alert(message);
                
                // Also show a shorter notification
                const shortMessage = semanticMatches > 0 ? 
                    \`\u041D\u0430\u0439\u0434\u0435\u043D\u043E \${semanticMatches} \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432\` :
                    '\u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u043E\u0445\u043E\u0436\u0438\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E';
                    
                RAGSeminar.showNotification(shortMessage, semanticMatches > 0 ? 'success' : 'warning', 4000);
                
                // Update progress
                RAGSeminar.updateProgress(65);
            }
            
            function showVisualizationHelp() {
                const helpText = \`
\u{1F4CA} \u041A\u0430\u043A \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0432\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432:

\u{1F535} \u0421\u0438\u043D\u0438\u0435 \u0442\u043E\u0447\u043A\u0438 - \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0432 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u043E\u043C \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0435
\u{1F534} \u041A\u0440\u0430\u0441\u043D\u044B\u0435 \u0442\u043E\u0447\u043A\u0438 - \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B
\u{1F7E2} \u0417\u0435\u043B\u0435\u043D\u044B\u0435 \u043B\u0438\u043D\u0438\u0438 - \u043D\u0430\u0438\u043B\u0443\u0447\u0448\u0435\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435
\u{1F535} \u0421\u0438\u043D\u0438\u0435 \u043B\u0438\u043D\u0438\u0438 - \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F
\u{1F7E1} \u0416\u0435\u043B\u0442\u044B\u0435 \u043B\u0438\u043D\u0438\u0438 - \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F \u043F\u043E \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u044E
\u{1F4CA} \u0427\u0438\u0441\u043B\u0430 - \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u0430 (0-1)

\u{1F4A1} \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435:
\u2022 \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u0438\u0437 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439
\u2022 \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u0440\u044F\u0434\u043E\u043C \u0441 \u0433\u0440\u0443\u043F\u043F\u043E\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
\u2022 \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435, \u043A\u0430\u043A \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C \u043D\u0430\u0445\u043E\u0434\u0438\u0442 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u043E\u0445\u043E\u0436\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B
\u2022 \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u043D\u0430 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0435 \u0442\u0438\u043F\u044B \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0439

\u{1F3AF} \u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442:
\u2022 \u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0432 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0435
\u2022 \u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u0431\u043B\u0438\u0437\u043E\u0441\u0442\u044C \u043F\u043E \u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430\u043C
\u2022 \u0412\u0435\u0441\u043E\u0432\u044B\u0435 \u043A\u043E\u044D\u0444\u0444\u0438\u0446\u0438\u0435\u043D\u0442\u044B \u0434\u043B\u044F \u0440\u0430\u0437\u043D\u044B\u0445 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439
                \`;
                
                alert(helpText);
            }
            
            function resetVisualization() {
                if (!visualizationSvg) return;
                
                visualizationSvg.selectAll('.query, .query-label, .connection, .similarity-text').remove();
                queries = [];
                currentQuery = null;
                
                // Reset input and button states
                document.getElementById('custom-query-input').value = '';
                updateFindButton();
                
                // Reset document styling
                visualizationSvg.selectAll('.document')
                    .attr('fill', '#4285f4')
                    .attr('r', 8);
                
                RAGSeminar.showNotification('\u0412\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0441\u0431\u0440\u043E\u0448\u0435\u043D\u0430', 'info');
            }
            
            // Enhanced Yandex code generator with improved formatting and real implementations
            function generateYandexRAGCode() {
                const model = document.getElementById('yandex-model-select').value;
                const apiApproach = document.getElementById('api-approach-select').value;
                const topK = document.getElementById('topk-input').value;
                const chunkSize = document.getElementById('chunk-size-input').value;
                const folderId = document.getElementById('folder-id-input').value || 'your-folder-id';
                
                let code = '';
                
                if (apiApproach === 'openai') {
                    code = generateOpenAICode(model, topK, chunkSize, folderId);
                } else if (apiApproach === 'sdk') {
                    code = generateSDKCode(model, topK, chunkSize, folderId);
                }
                
                // Update both display areas
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                if (codeEditor) {
                    codeEditor.value = code;
                }
                
                // Switch to code tab
                switchYandexTab('yandex-code');
                
                RAGSeminar.showNotification('\u041A\u043E\u0434 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D \u0438 \u0433\u043E\u0442\u043E\u0432 \u043A \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E!', 'success');
            }

            function generateOpenAICode(model, topK, chunkSize, folderId) {
                return \`"""
RAG \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0441 Yandex Foundation Models \u0447\u0435\u0440\u0435\u0437 OpenAI Compatible API
\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u0434 \u0434\u043B\u044F \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438
"""

import openai
import numpy as np
import os
import requests
from typing import List, Dict
import json

class YandexRAG:
    """
    RAG \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C Yandex Foundation Models
    \u0447\u0435\u0440\u0435\u0437 OpenAI Compatible API
    """
    
    def __init__(self):
        """\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F RAG \u0441\u0438\u0441\u0442\u0435\u043C\u044B"""
        self.api_key = os.getenv("YANDEX_CLOUD_API_KEY")
        self.folder_id = "\${folderId}"
        self.base_url = "https://llm.api.cloud.yandex.net/foundationModels/v1/"
        
        if not self.api_key:
            raise ValueError("\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0443\u044E \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F YANDEX_CLOUD_API_KEY")
        
        # \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 OpenAI \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0434\u043B\u044F Yandex
        self.client = openai.OpenAI(
            api_key=self.api_key,
            base_url=self.base_url
        )
        
        self.embedding_model = f"emb://\${folderId}/text-search-doc/latest"
        self.generation_model = f"gpt://\${folderId}/\${model}/latest"
        self.documents = []
        
        print(f"\u2705 YandexRAG \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D \u0441 \u043C\u043E\u0434\u0435\u043B\u044C\u044E: \${model}")
    
    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432 \u0447\u0435\u0440\u0435\u0437 Yandex API
        
        Args:
            texts: \u0421\u043F\u0438\u0441\u043E\u043A \u0442\u0435\u043A\u0441\u0442\u043E\u0432 \u0434\u043B\u044F \u0432\u0435\u043A\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438
            
        Returns:
            \u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0435\u043A\u0442\u043E\u0440\u043E\u0432 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432
        """
        embeddings = []
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        for text in texts:
            payload = {
                "modelUri": self.embedding_model,
                "text": text
            }
            
            try:
                response = requests.post(
                    f"{self.base_url}textEmbedding",
                    headers=headers,
                    json=payload,
                    timeout=30
                )
                response.raise_for_status()
                
                embedding = response.json()["embedding"]
                embeddings.append(embedding)
                
            except requests.exceptions.RequestException as e:
                print(f"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0430: {e}")
                # \u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u0432\u0435\u043A\u0442\u043E\u0440 \u043A\u0430\u043A fallback
                embeddings.append(np.random.rand(256).tolist())
        
        return embeddings
    
    def split_documents(self, docs: List[str], chunk_size: int = \${chunkSize}) -> List[str]:
        """
        \u0420\u0430\u0437\u0431\u0438\u0435\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0430 \u0447\u0430\u043D\u043A\u0438
        
        Args:
            docs: \u0421\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
            chunk_size: \u0420\u0430\u0437\u043C\u0435\u0440 \u0447\u0430\u043D\u043A\u0430 \u0432 \u0441\u043B\u043E\u0432\u0430\u0445
            
        Returns:
            \u0421\u043F\u0438\u0441\u043E\u043A \u0447\u0430\u043D\u043A\u043E\u0432
        """
        chunks = []
        for doc in docs:
            words = doc.split()
            for i in range(0, len(words), chunk_size):
                chunk = " ".join(words[i:i + chunk_size])
                if chunk.strip():  # \u0418\u0437\u0431\u0435\u0433\u0430\u0435\u043C \u043F\u0443\u0441\u0442\u044B\u0445 \u0447\u0430\u043D\u043A\u043E\u0432
                    chunks.append(chunk)
        
        print(f"\u{1F4C4} \u0421\u043E\u0437\u0434\u0430\u043D\u043E {len(chunks)} \u0447\u0430\u043D\u043A\u043E\u0432 \u0438\u0437 {len(docs)} \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432")
        return chunks
    
    def add_documents(self, docs: List[str]) -> None:
        """
        \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0432 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u0443\u044E \u0431\u0430\u0437\u0443
        
        Args:
            docs: \u0421\u043F\u0438\u0441\u043E\u043A \u0442\u0435\u043A\u0441\u0442\u043E\u0432 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
        """
        print(f"\u{1F504} \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 {len(docs)} \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432...")
        
        # \u0420\u0430\u0437\u0431\u0438\u0435\u043D\u0438\u0435 \u043D\u0430 \u0447\u0430\u043D\u043A\u0438
        chunks = self.split_documents(docs)
        
        # \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432
        embeddings = self.get_embeddings(chunks)
        
        # \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0432 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u0443\u044E \u0411\u0414
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            self.documents.append({
                "id": i,
                "text": chunk,
                "embedding": np.array(embedding)
            })
        
        print(f"\u2705 \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E {len(chunks)} \u0447\u0430\u043D\u043A\u043E\u0432 \u0432 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u0443\u044E \u0431\u0430\u0437\u0443")
    
    def search(self, query: str, top_k: int = \${topK}) -> List[Dict]:
        """
        \u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443
        
        Args:
            query: \u041F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441
            top_k: \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432
            
        Returns:
            \u0421\u043F\u0438\u0441\u043E\u043A \u043D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
        """
        if not self.documents:
            print("\u26A0\uFE0F \u0412\u0435\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0431\u0430\u0437\u0430 \u043F\u0443\u0441\u0442\u0430\u044F!")
            return []
        
        print(f"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: '{query}'")
        
        # \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430
        query_embeddings = self.get_embeddings([query])
        query_vector = np.array(query_embeddings[0])
        
        # \u0412\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u0430
        similarities = []
        for doc in self.documents:
            similarity = np.dot(query_vector, doc["embedding"]) / (
                np.linalg.norm(query_vector) * np.linalg.norm(doc["embedding"])
            )
            similarities.append({
                "document": doc,
                "similarity": float(similarity)
            })
        
        # \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u0430
        similarities.sort(key=lambda x: x["similarity"], reverse=True)
        
        results = similarities[:top_k]
        print(f"\u{1F4CA} \u041D\u0430\u0439\u0434\u0435\u043D\u043E {len(results)} \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432")
        
        return results
    
    def generate_answer(self, query: str, context_docs: List[Dict]) -> str:
        """
        \u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430
        
        Args:
            query: \u0412\u043E\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F
            context_docs: \u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B
            
        Returns:
            \u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442
        """
        # \u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430
        context_texts = []
        for i, doc_info in enumerate(context_docs, 1):
            doc = doc_info["document"]
            similarity = doc_info["similarity"]
            context_texts.append(f"\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 {i} (\u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u043E\u0441\u0442\u044C: {similarity:.3f}):\\n{doc['text']}")
        
        context = "\\n\\n".join(context_texts)
        
        # \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u043C\u043F\u0442\u0430
        messages = [
            {
                "role": "system",
                "content": "\u0422\u044B - \u043F\u043E\u043C\u043E\u0449\u043D\u0438\u043A \u043F\u043E \u043F\u043E\u0438\u0441\u043A\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438. \u041E\u0442\u0432\u0435\u0447\u0430\u0439 \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442. \u0415\u0441\u043B\u0438 \u0432 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0435 \u043D\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0430, \u0447\u0435\u0441\u0442\u043D\u043E \u0441\u043A\u0430\u0436\u0438 \u043E\u0431 \u044D\u0442\u043E\u043C."
            },
            {
                "role": "user",
                "content": f"""\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442:
{context}

\u0412\u043E\u043F\u0440\u043E\u0441: {query}

\u041E\u0442\u0432\u0435\u0442\u044C \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441, \u043E\u0441\u043D\u043E\u0432\u044B\u0432\u0430\u044F\u0441\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u043C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0435:"""
            }
        ]
        
        try:
            print("\u{1F916} \u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430...")
            response = self.client.chat.completions.create(
                model=self.generation_model,
                messages=messages,
                max_tokens=1500,
                temperature=0.2
            )
            
            answer = response.choices[0].message.content
            return answer
            
        except Exception as e:
            error_msg = f"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u043E\u0442\u0432\u0435\u0442\u0430: {e}"
            print(error_msg)
            return error_msg
    
    def ask(self, query: str) -> Dict:
        """
        \u041F\u043E\u043B\u043D\u044B\u0439 RAG \u0437\u0430\u043F\u0440\u043E\u0441: \u043F\u043E\u0438\u0441\u043A + \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F
        
        Args:
            query: \u0412\u043E\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F
            
        Returns:
            \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0441 \u043E\u0442\u0432\u0435\u0442\u043E\u043C \u0438 \u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u043C\u0438
        """
        # \u041F\u043E\u0438\u0441\u043A \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
        search_results = self.search(query)
        
        if not search_results:
            return {
                "answer": "\u0418\u0437\u0432\u0438\u043D\u0438\u0442\u0435, \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B.",
                "sources": [],
                "query": query
            }
        
        # \u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430
        answer = self.generate_answer(query, search_results)
        
        # \u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432
        sources = []
        for result in search_results:
            doc = result["document"]
            sources.append({
                "text": doc["text"][:200] + "..." if len(doc["text"]) > 200 else doc["text"],
                "similarity": result["similarity"],
                "id": doc["id"]
            })
        
        return {
            "answer": answer,
            "sources": sources,
            "query": query,
            "model": "\${model}"
        }

# \u041F\u0440\u0438\u043C\u0435\u0440 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F
def demo_yandex_rag():
    """\u0414\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B YandexRAG"""
    
    # \u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F
    rag = YandexRAG()
    
    # \u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B
    documents = [
        "Yandex Foundation Models - \u044D\u0442\u043E \u0441\u0435\u043C\u0435\u0439\u0441\u0442\u0432\u043E \u0431\u043E\u043B\u044C\u0448\u0438\u0445 \u044F\u0437\u044B\u043A\u043E\u0432\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043E\u0442 \u042F\u043D\u0434\u0435\u043A\u0441\u0430 \u0434\u043B\u044F \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0445 \u0437\u0430\u0434\u0430\u0447 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430.",
        "YandexGPT Pro \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0434\u043E 32000 \u0442\u043E\u043A\u0435\u043D\u043E\u0432 \u0438 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u0435\u0442 \u0432\u044B\u0441\u043E\u043A\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u0438 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0430\u0445.",
        "RAG (Retrieval-Augmented Generation) \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u044F\u0437\u044B\u043A\u043E\u0432\u044B\u043C \u043C\u043E\u0434\u0435\u043B\u044F\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u043D\u0435\u0448\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u0437\u043D\u0430\u043D\u0438\u0439 \u0434\u043B\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0431\u043E\u043B\u0435\u0435 \u0442\u043E\u0447\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432.",
        "\u0412\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0435 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438 \u043F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u0443\u044E\u0442 \u0442\u0435\u043A\u0441\u0442 \u0432 \u0447\u0438\u0441\u043B\u043E\u0432\u044B\u0435 \u0432\u0435\u043A\u0442\u043E\u0440\u044B, \u0447\u0442\u043E \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0442\u044C \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u043C.",
        "\u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A \u043D\u0430\u0445\u043E\u0434\u0438\u0442 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043D\u0435 \u043F\u043E \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u043C \u0441\u043B\u043E\u0432\u0430\u043C, \u0430 \u043F\u043E \u0441\u043C\u044B\u0441\u043B\u0443 \u0438 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0430."
    ]
    
    # \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
    rag.add_documents(documents)
    
    # \u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B
    queries = [
        "\u0427\u0442\u043E \u0442\u0430\u043A\u043E\u0435 YandexGPT Pro?",
        "\u041A\u0430\u043A \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 RAG?",
        "\u0427\u0442\u043E \u0442\u0430\u043A\u043E\u0435 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A?"
    ]
    
    print("\\n" + "="*80)
    print("\u{1F3AF} \u0414\u0415\u041C\u041E\u041D\u0421\u0422\u0420\u0410\u0426\u0418\u042F YANDEX RAG \u0421\u0418\u0421\u0422\u0415\u041C\u042B")
    print("="*80)
    
    for query in queries:
        print(f"\\n\u2753 \u0417\u0430\u043F\u0440\u043E\u0441: {query}")
        print("-" * 60)
        
        result = rag.ask(query)
        
        print(f"\u{1F916} \u041E\u0442\u0432\u0435\u0442: {result['answer']}")
        print(f"\\n\u{1F4DA} \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 ({len(result['sources'])}):")
        
        for i, source in enumerate(result['sources'], 1):
            print(f"   {i}. \u0421\u0445\u043E\u0434\u0441\u0442\u0432\u043E: {source['similarity']:.3f}")
            print(f"      {source['text']}")
        
        print("\\n" + "-" * 60)

if __name__ == "__main__":
    # \u0417\u0430\u043F\u0443\u0441\u043A \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u0438
    demo_yandex_rag()
\`;
            }

            function generateSDKCode(model, topK, chunkSize, folderId) {
                return \`"""
RAG \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0441 Yandex Foundation Models \u0447\u0435\u0440\u0435\u0437 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 SDK
\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u0434 \u0434\u043B\u044F \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438
"""

import os
import numpy as np
from typing import List, Dict
from yandexcloud import SDK
from yandex.cloud.ai.foundation_models.v1 import embedding_service_pb2_grpc
from yandex.cloud.ai.foundation_models.v1 import embedding_service_pb2
from yandex.cloud.ai.foundation_models.v1 import text_generation_service_pb2_grpc
from yandex.cloud.ai.foundation_models.v1 import text_generation_service_pb2

class YandexRAGSDK:
    """
    RAG \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C Yandex Foundation Models SDK
    """
    
    def __init__(self):
        """\u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F RAG \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0447\u0435\u0440\u0435\u0437 SDK"""
        
        # \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0442\u043E\u043A\u0435\u043D\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438
        iam_token = os.getenv("YANDEX_CLOUD_IAM_TOKEN")
        api_key = os.getenv("YANDEX_CLOUD_API_KEY")
        
        if not (iam_token or api_key):
            raise ValueError("\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 YANDEX_CLOUD_IAM_TOKEN \u0438\u043B\u0438 YANDEX_CLOUD_API_KEY")
        
        # \u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F SDK
        if iam_token:
            self.sdk = SDK(token=iam_token)
        else:
            # \u0414\u043B\u044F API \u043A\u043B\u044E\u0447\u0430 \u043D\u0443\u0436\u0435\u043D \u0441\u0435\u0440\u0432\u0438\u0441\u043D\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442
            self.sdk = SDK(service_account_key=api_key)
        
        self.folder_id = "\${folderId}"
        self.embedding_model = f"emb://\${folderId}/text-search-doc/latest"
        self.generation_model = f"gpt://\${folderId}/\${model}/latest"
        self.documents = []
        
        print(f"\u2705 YandexRAG SDK \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D \u0441 \u043C\u043E\u0434\u0435\u043B\u044C\u044E: \${model}")
    
    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432 \u0447\u0435\u0440\u0435\u0437 Yandex Foundation Models SDK
        
        Args:
            texts: \u0421\u043F\u0438\u0441\u043E\u043A \u0442\u0435\u043A\u0441\u0442\u043E\u0432 \u0434\u043B\u044F \u0432\u0435\u043A\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438
            
        Returns:
            \u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0435\u043A\u0442\u043E\u0440\u043E\u0432 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432
        """
        service = self.sdk.client(embedding_service_pb2_grpc.EmbeddingsServiceStub)
        embeddings = []
        
        for text in texts:
            try:
                request = embedding_service_pb2.TextEmbeddingRequest(
                    model_uri=self.embedding_model,
                    text=text
                )
                
                response = service.TextEmbedding(request)
                embeddings.append(list(response.embedding))
                
            except Exception as e:
                print(f"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0430: {e}")
                # Fallback \u043D\u0430 \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u0432\u0435\u043A\u0442\u043E\u0440
                embeddings.append(np.random.rand(256).tolist())
        
        return embeddings
    
    def split_documents(self, docs: List[str], chunk_size: int = \${chunkSize}) -> List[str]:
        """
        \u0420\u0430\u0437\u0431\u0438\u0435\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0430 \u0447\u0430\u043D\u043A\u0438
        
        Args:
            docs: \u0421\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
            chunk_size: \u0420\u0430\u0437\u043C\u0435\u0440 \u0447\u0430\u043D\u043A\u0430 \u0432 \u0441\u043B\u043E\u0432\u0430\u0445
            
        Returns:
            \u0421\u043F\u0438\u0441\u043E\u043A \u0447\u0430\u043D\u043A\u043E\u0432
        """
        chunks = []
        for doc in docs:
            words = doc.split()
            for i in range(0, len(words), chunk_size):
                chunk = " ".join(words[i:i + chunk_size])
                if chunk.strip():
                    chunks.append(chunk)
        
        print(f"\u{1F4C4} \u0421\u043E\u0437\u0434\u0430\u043D\u043E {len(chunks)} \u0447\u0430\u043D\u043A\u043E\u0432 \u0438\u0437 {len(docs)} \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432")
        return chunks
    
    def add_documents(self, docs: List[str]) -> None:
        """
        \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0432 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u0443\u044E \u0431\u0430\u0437\u0443
        
        Args:
            docs: \u0421\u043F\u0438\u0441\u043E\u043A \u0442\u0435\u043A\u0441\u0442\u043E\u0432 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
        """
        print(f"\u{1F504} \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 {len(docs)} \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432...")
        
        # \u0420\u0430\u0437\u0431\u0438\u0435\u043D\u0438\u0435 \u043D\u0430 \u0447\u0430\u043D\u043A\u0438
        chunks = self.split_documents(docs)
        
        # \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432
        embeddings = self.get_embeddings(chunks)
        
        # \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0432 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u0443\u044E \u0411\u0414
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            self.documents.append({
                "id": i,
                "text": chunk,
                "embedding": np.array(embedding)
            })
        
        print(f"\u2705 \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E {len(chunks)} \u0447\u0430\u043D\u043A\u043E\u0432 \u0432 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u0443\u044E \u0431\u0430\u0437\u0443")
    
    def search(self, query: str, top_k: int = \${topK}) -> List[Dict]:
        """
        \u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443
        
        Args:
            query: \u041F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441
            top_k: \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432
            
        Returns:
            \u0421\u043F\u0438\u0441\u043E\u043A \u043D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
        """
        if not self.documents:
            print("\u26A0\uFE0F \u0412\u0435\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0431\u0430\u0437\u0430 \u043F\u0443\u0441\u0442\u0430\u044F!")
            return []
        
        print(f"\u{1F50D} \u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: '{query}'")
        
        # \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430
        query_embeddings = self.get_embeddings([query])
        query_vector = np.array(query_embeddings[0])
        
        # \u0412\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u0430
        similarities = []
        for doc in self.documents:
            similarity = np.dot(query_vector, doc["embedding"]) / (
                np.linalg.norm(query_vector) * np.linalg.norm(doc["embedding"])
            )
            similarities.append({
                "document": doc,
                "similarity": float(similarity)
            })
        
        # \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E \u0441\u0445\u043E\u0434\u0441\u0442\u0432\u0430
        similarities.sort(key=lambda x: x["similarity"], reverse=True)
        
        results = similarities[:top_k]
        print(f"\u{1F4CA} \u041D\u0430\u0439\u0434\u0435\u043D\u043E {len(results)} \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432")
        
        return results
    
    def generate_answer(self, query: str, context_docs: List[Dict]) -> str:
        """
        \u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u0447\u0435\u0440\u0435\u0437 YandexGPT SDK
        
        Args:
            query: \u0412\u043E\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F
            context_docs: \u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B
            
        Returns:
            \u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442
        """
        # \u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430
        context_texts = []
        for i, doc_info in enumerate(context_docs, 1):
            doc = doc_info["document"]
            similarity = doc_info["similarity"]
            context_texts.append(f"\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 {i} (\u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u043E\u0441\u0442\u044C: {similarity:.3f}):\\n{doc['text']}")
        
        context = "\\n\\n".join(context_texts)
        
        # \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u043C\u043F\u0442\u0430
        prompt = f"""\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u043E\u0442\u0432\u0435\u0442\u044C \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F:

\u041A\u041E\u041D\u0422\u0415\u041A\u0421\u0422:
{context}

\u0412\u041E\u041F\u0420\u041E\u0421: {query}

\u041E\u0422\u0412\u0415\u0422:"""
        
        try:
            print("\u{1F916} \u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u0447\u0435\u0440\u0435\u0437 SDK...")
            
            service = self.sdk.client(text_generation_service_pb2_grpc.TextGenerationServiceStub)
            
            request = text_generation_service_pb2.CompletionRequest(
                model_uri=self.generation_model,
                completion_options=text_generation_service_pb2.CompletionOptions(
                    stream=False,
                    temperature=0.2,
                    max_tokens=1500
                ),
                messages=[
                    text_generation_service_pb2.Message(
                        role="user",
                        text=prompt
                    )
                ]
            )
            
            response = service.Completion(request)
            answer = response.result.alternatives[0].message.text
            
            return answer
            
        except Exception as e:
            error_msg = f"\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0447\u0435\u0440\u0435\u0437 SDK: {e}"
            print(error_msg)
            return error_msg
    
    def ask(self, query: str) -> Dict:
        """
        \u041F\u043E\u043B\u043D\u044B\u0439 RAG \u0437\u0430\u043F\u0440\u043E\u0441 \u0447\u0435\u0440\u0435\u0437 SDK
        
        Args:
            query: \u0412\u043E\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F
            
        Returns:
            \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0441 \u043E\u0442\u0432\u0435\u0442\u043E\u043C \u0438 \u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u043C\u0438
        """
        # \u041F\u043E\u0438\u0441\u043A \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
        search_results = self.search(query)
        
        if not search_results:
            return {
                "answer": "\u0418\u0437\u0432\u0438\u043D\u0438\u0442\u0435, \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B.",
                "sources": [],
                "query": query
            }
        
        # \u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430
        answer = self.generate_answer(query, search_results)
        
        # \u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432
        sources = []
        for result in search_results:
            doc = result["document"]
            sources.append({
                "text": doc["text"][:200] + "..." if len(doc["text"]) > 200 else doc["text"],
                "similarity": result["similarity"],
                "id": doc["id"]
            })
        
        return {
            "answer": answer,
            "sources": sources,
            "query": query,
            "model": "\${model}",
            "api": "Yandex Cloud SDK"
        }

# \u041F\u0440\u0438\u043C\u0435\u0440 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F
def demo_yandex_rag_sdk():
    """\u0414\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B YandexRAG \u0447\u0435\u0440\u0435\u0437 SDK"""
    
    # \u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F
    rag = YandexRAGSDK()
    
    # \u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B
    documents = [
        "Yandex Foundation Models \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u0435\u0442 \u0432\u044B\u0441\u043E\u043A\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u044F \u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0442\u0435\u043A\u0441\u0442\u0430 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435.",
        "SDK \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 Yandex Cloud AI \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B \u0441 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0439 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C\u044E.",
        "\u0412\u0435\u043A\u0442\u043E\u0440\u043D\u044B\u0435 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438 \u0440\u0430\u0437\u043C\u0435\u0440\u043D\u043E\u0441\u0442\u044C\u044E 256 \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0434\u043B\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u043E\u0438\u0441\u043A\u0430 \u043F\u043E \u0440\u0443\u0441\u0441\u043A\u0438\u043C \u0442\u0435\u043A\u0441\u0442\u0430\u043C.",
        "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0447\u0435\u0440\u0435\u0437 SDK \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u0435\u0442 \u043B\u0443\u0447\u0448\u0443\u044E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438 \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044E \u0441 REST API."
    ]
    
    # \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
    rag.add_documents(documents)
    
    # \u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B
    queries = [
        "\u041A\u0430\u043A\u0438\u0435 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u0443 SDK?",
        "\u041A\u0430\u043A\u043E\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432?",
        "\u0414\u043B\u044F \u043A\u0430\u043A\u0438\u0445 \u044F\u0437\u044B\u043A\u043E\u0432 \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u043C\u043E\u0434\u0435\u043B\u0438?"
    ]
    
    print("\\n" + "="*80)
    print("\u{1F3AF} \u0414\u0415\u041C\u041E\u041D\u0421\u0422\u0420\u0410\u0426\u0418\u042F YANDEX RAG SDK")
    print("="*80)
    
    for query in queries:
        print(f"\\n\u2753 \u0417\u0430\u043F\u0440\u043E\u0441: {query}")
        print("-" * 60)
        
        result = rag.ask(query)
        
        print(f"\u{1F916} \u041E\u0442\u0432\u0435\u0442: {result['answer']}")
        print(f"\\n\u{1F4DA} \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 ({len(result['sources'])}):")
        
        for i, source in enumerate(result['sources'], 1):
            print(f"   {i}. \u0421\u0445\u043E\u0434\u0441\u0442\u0432\u043E: {source['similarity']:.3f}")
            print(f"      {source['text']}")

if __name__ == "__main__":
    # \u0417\u0430\u043F\u0443\u0441\u043A \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u0438
    demo_yandex_rag_sdk()
\`;
            }

            // New functions for enhanced configurator
            function switchYandexTab(tabName) {
                // Remove active from all tabs and contents
                document.querySelectorAll('#yandex-config-tabs .tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('#yandex-config, #yandex-code, #yandex-sandbox').forEach(content => content.classList.remove('active'));
                
                // Add active to selected tab and content
                document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('active');
                document.getElementById(tabName).classList.add('active');
            }

            function copyGeneratedCode() {
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                if (codeEditor && codeEditor.value) {
                    RAGSeminar.copyToClipboard(codeEditor.value);
                } else {
                    RAGSeminar.showNotification('\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043E\u0434!', 'warning');
                }
            }

            function downloadGeneratedCode() {
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                if (codeEditor && codeEditor.value) {
                    const model = document.getElementById('yandex-model-select').value;
                    const apiType = document.getElementById('api-approach-select').value;
                    const filename = \`yandex_rag_\${apiType}_\${model.replace('-', '_')}.py\`;
                    RAGSeminar.downloadCode(codeEditor.value, filename);
                } else {
                    RAGSeminar.showNotification('\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043E\u0434!', 'warning');
                }
            }

            function sendCodeToSandbox() {
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                const sandboxEditor = document.getElementById('yandex-sandbox-code');
                
                if (codeEditor && codeEditor.value && sandboxEditor) {
                    sandboxEditor.value = codeEditor.value;
                    switchYandexTab('yandex-sandbox');
                    RAGSeminar.showNotification('\u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 \u043F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u0443!', 'success');
                } else {
                    RAGSeminar.showNotification('\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043E\u0434!', 'warning');
                }
            }

            function loadCodeFromEditor() {
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                const sandboxEditor = document.getElementById('yandex-sandbox-code');
                
                if (codeEditor && codeEditor.value && sandboxEditor) {
                    sandboxEditor.value = codeEditor.value;
                    RAGSeminar.showNotification('\u041A\u043E\u0434 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D \u0438\u0437 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430!', 'info');
                } else {
                    RAGSeminar.showNotification('\u041A\u043E\u0434 \u0432 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442!', 'warning');
                }
            }

            async function runYandexSandboxCode() {
                const sandboxCode = document.getElementById('yandex-sandbox-code').value;
                const outputElement = document.getElementById('yandex-sandbox-output');
                
                if (!sandboxCode.trim()) {
                    RAGSeminar.showNotification('\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u0434 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F!', 'warning');
                    return;
                }

                await RAGSeminar.runPythonCode(sandboxCode, 'yandex-sandbox-output');
                RAGSeminar.updateProgress(95);
            }

            function clearSandboxOutput() {
                const outputElement = document.getElementById('yandex-sandbox-output');
                if (outputElement) {
                    outputElement.innerHTML = '\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043A\u043E\u0434 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432...';
                }
                RAGSeminar.showNotification('\u0412\u044B\u0432\u043E\u0434 \u043F\u0435\u0441\u043E\u0447\u043D\u0438\u0446\u044B \u043E\u0447\u0438\u0449\u0435\u043D', 'info');
            }

            // Initialize Yandex configurator tabs
            function initYandexConfigTabs() {
                document.querySelectorAll('#yandex-config-tabs .tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        const targetTab = tab.getAttribute('data-tab');
                        switchYandexTab(targetTab);
                    });
                });
            }
            
            // Get full seminar notes
            function getFullSeminarNotes() {
                return \`RAG (Retrieval-Augmented Generation) - \u041A\u043E\u043D\u0441\u043F\u0435\u043A\u0442 \u0441\u0435\u043C\u0438\u043D\u0430\u0440\u0430

=== \u041E\u0421\u041D\u041E\u0412\u041D\u042B\u0415 \u041A\u041E\u041D\u0426\u0415\u041F\u0426\u0418\u0418 ===
- RAG \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u044F\u0435\u0442 \u043F\u043E\u0438\u0441\u043A \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0441 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0435\u0439 \u0442\u0435\u043A\u0441\u0442\u0430
- \u0420\u0435\u0448\u0430\u0435\u0442 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0433\u0430\u043B\u043B\u044E\u0446\u0438\u043D\u0430\u0446\u0438\u0439 LLM
- \u0421\u043E\u0441\u0442\u043E\u0438\u0442 \u0438\u0437 Retriever + Generator \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432

=== \u0410\u0420\u0425\u0418\u0422\u0415\u041A\u0422\u0423\u0420\u0410 ===
1. \u0418\u043D\u0434\u0435\u043A\u0441\u0430\u0446\u0438\u044F: \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u2192 \u0447\u0430\u043D\u043A\u0438 \u2192 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u0438 \u2192 \u0432\u0435\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0411\u0414
2. \u041F\u043E\u0438\u0441\u043A \u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F: \u0437\u0430\u043F\u0440\u043E\u0441 \u2192 \u043F\u043E\u0438\u0441\u043A \u2192 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u2192 LLM \u2192 \u043E\u0442\u0432\u0435\u0442

=== \u0410\u041B\u0413\u041E\u0420\u0418\u0422\u041C\u042B \u041F\u041E\u0418\u0421\u041A\u0410 ===
- HNSW: \u043B\u0443\u0447\u0448\u0430\u044F \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043D\u0430 CPU
- FAISS: \u0441\u0436\u0430\u0442\u0438\u0435 \u0432\u0435\u043A\u0442\u043E\u0440\u043E\u0432, GPU \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430  
- Annoy: \u043F\u0440\u043E\u0441\u0442\u043E\u0442\u0430 \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438

=== \u041C\u0415\u0422\u0420\u0418\u041A\u0418 ===
- Recall@k: \u0434\u043E\u043B\u044F \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0445 \u0440\u0435\u043B\u0435\u0432\u0430\u043D\u0442\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432
- Precision@k: \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0441\u0440\u0435\u0434\u0438 \u0442\u043E\u043F-k
- Faithfulness: \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u0433\u0430\u043B\u043B\u044E\u0446\u0438\u043D\u0430\u0446\u0438\u0439

=== YANDEX FOUNDATION MODELS ===
- YandexGPT Pro: 32K \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u0432\u044B\u0441\u043E\u043A\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E
- YandexGPT: 8K \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u0441\u0431\u0430\u043B\u0430\u043D\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0441\u0442\u044C
- YandexGPT Lite: 4K \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u0432\u044B\u0441\u043E\u043A\u0430\u044F \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C

=== \u041F\u0420\u0410\u041A\u0422\u0418\u0427\u0415\u0421\u041A\u0418\u0415 \u0421\u041E\u0412\u0415\u0422\u042B ===
- \u0412\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440 \u0447\u0430\u043D\u043A\u043E\u0432 \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0437\u0430\u0434\u0430\u0447\u0438
- \u041D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0439\u0442\u0435 top-k \u0434\u043B\u044F \u043E\u043F\u0442\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430
- \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438 \u0434\u043B\u044F \u043E\u0446\u0435\u043D\u043A\u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430
- \u042D\u043A\u0441\u043F\u0435\u0440\u0438\u043C\u0435\u043D\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0441 \u0440\u0430\u0437\u043D\u044B\u043C\u0438 \u043C\u043E\u0434\u0435\u043B\u044F\u043C\u0438 \u044D\u043C\u0431\u0435\u0434\u0434\u0438\u043D\u0433\u043E\u0432\`;
            }
            
            // Initialize everything when DOM is loaded
            document.addEventListener('DOMContentLoaded', function() {
                console.log('\u{1F3AF} \u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432...');
                
                // Initialize tabs
                RAGSeminar.initTabs('theory-tabs');
                
                // Initialize quiz
                RAGSeminar.initQuiz('rag-quiz');
                
                // Initialize visualization
                setTimeout(initializeVisualization, 500);
                
                console.log('\u2705 \u0412\u0441\u0435 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u044B');
            });
        <\/script>
    </body>
    </html>
  `));
var $e = new ht();
var cs = Object.assign({ "/src/index.tsx": Ee });
var vt = false;
for (const [, e] of Object.entries(cs)) e && ($e.all("*", (t) => {
  let s;
  try {
    s = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, s);
}), $e.notFound((t) => {
  let s;
  try {
    s = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, s);
}), vt = true);
if (!vt) throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-tKHSz4/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = $e;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-tKHSz4/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=bundledWorker-0.20473437360477686.mjs.map
