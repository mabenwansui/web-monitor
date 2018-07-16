export default function page(){
  let url = location.href;
  let {
    domainLookupEnd, 
    domainLookupStart, 
    connectEnd, 
    connectStart, 
    responseEnd, 
    responseStart, 
    domComplete,
    domInteractive,
    navigationStart,
    domContentLoadedEventEnd,
    loadEventEnd
  } = window.performance.timing;
  return {
    url,
    dns: domainLookupEnd - domainLookupStart,
    tcp: connectEnd - connectStart,
    request: responseEnd - responseStart,
    dom: domComplete - domInteractive,
    whitescreen: responseStart - navigationStart,
    domready: domContentLoadedEventEnd - navigationStart,
    onload: loadEventEnd - navigationStart,
    userid: (window.LT && window.LT.User.user_id) || '',
    userAgent: window.navigator.userAgent
  }
}
