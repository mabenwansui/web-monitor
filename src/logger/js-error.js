export default function jsError({
  errorMessage,
  scriptURI,
  lineNumber,
  columnNumber,
  error
}){
  let errType = 'Error';
  let all_msg = errorMessage;
  if (errorMessage) {
    errorMessage = errorMessage.split(/\s*:\s*/);
    if (errorMessage.length === 2) {
      errType = errorMessage[0].replace('Uncaught ', '');
      errorMessage = errorMessage[1];
    }
  }
  return {
    type: 'jsError',
    errType: errType,
    msg: errorMessage,
    all_msg,
    jsFile: scriptURI,
    lineNum: lineNumber,
    colNum: columnNumber || 0
  };
}