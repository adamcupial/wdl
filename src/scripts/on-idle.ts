export default function onIdle (callback : Function) : void {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(callback);
  } else {
    setTimeout(callback, 0);
  }
}
