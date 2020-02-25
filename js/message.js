'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);

  var removeListener = function () {
    if (errorMessage) {
      errorMessage.remove();
    }
    if (successMessage) {
      successMessage.remove();
    }
    document.removeEventListener('keydown', close);
    document.removeEventListener('click', close);
  };

  var open = function (status) {
    switch (status) {
      case 'success':
        main.appendChild(successMessage);
        break;
      case 'error':
        main.appendChild(errorMessage);
        errorMessage.querySelector('.error__button').addEventListener('click', removeListener);
        break;
    }
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
  };

  var close = function (evt) {
    window.util.isEvent.esc(evt, removeListener);
    window.util.isEvent.mainMouseButton(evt, removeListener);
  };

  window.message = {
    open: open
  };
})();
