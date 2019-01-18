export default function getConnectionType () : string {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection && connection.effectiveType) {
    return connection.effectiveType;
  }

  return ''
}
