export default function ajaxError(xhr){
  let time = Date.now();
  return {
    type: 'ajaxError',
    url: xhr.responseURL,
    formData: '{}',
    status: xhr.status,
    statusText: xhr.statusText,
    timeout: xhr.timeout,
    time
  }
}
