enum LOGTYPE {
  Log = "log",
  Error = "error",
  Info = "info",
  Warning = "warn",
}

function _log(type : LOGTYPE, ...args) : void {
  if (window.console && type in window.console) {
    window.console[type](...args);
  }
}

export function log(...args) {
  _log(LOGTYPE.Log, ...args);
}

export function warn(...args) {
  _log(LOGTYPE.Warning, ...args);
}

export function info(...args) {
  _log(LOGTYPE.Info, ...args);
}

export function error(...args : string[]) {
  _log(LOGTYPE.Error, new Error(...args.join(' ')));
}

export function mark(name : string) {
  return {
    start: () => {
      performance.mark(`${name}__start`);
    },
    end: () => {
      performance.mark(`${name}__end`);
      performance.measure(name, `${name}__start`, `${name}__end`);
      performance.clearMarks(`${name}__start`);
      performance.clearMarks(`${name}__end`);
    }
  }
}
