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

export function group(name : string) : void {
  if (window.console && 'group' in window.console) {
    if ('groupCollapsed' in window.console) {
      window.console.groupCollapsed(name);
    } else {
      window.console.group(name);
    }
  }
}

export function groupEnd() : void {
  if (window.console && 'groupEnd' in window.console) {
    window.console.groupEnd();
  }
}

export function log(...args) : void {
  _log(LOGTYPE.Log, ...args);
}

export function warn(...args) : void {
  _log(LOGTYPE.Warning, ...args);
}

export function info(...args) : void {
  _log(LOGTYPE.Info, ...args);
}

export function error(...args : string[]) : void {
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
