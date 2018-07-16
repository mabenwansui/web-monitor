import logger from '../logger';

export default function event(){
  let _logger = logger();

  document.addEventListener('click', event=> _logger.click(event), true);

  window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, error){

    if(!scriptURI) return;
    if(errorMessage==='Script error.') return;


    _logger.jsError({
      errorMessage, 
      scriptURI, 
      lineNumber, 
      columnNumber,
      error
    });
  };
}

