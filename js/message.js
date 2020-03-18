'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var errorCustomMessage = errorTemplate.cloneNode(true);

  var removeListener = function () {
    if (errorMessage) {
      errorMessage.remove();
    }
    if (successMessage) {
      successMessage.remove();
    }
    if (errorCustomMessage) {
      errorCustomMessage.remove();
    }
    document.removeEventListener('keydown', onMessageClose);
    document.removeEventListener('mousedown', onMessageClose);
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
      default:
        errorCustomMessage.querySelector('.error__message').textContent = status;
        main.appendChild(errorCustomMessage);
        errorCustomMessage.querySelector('.error__button').addEventListener('click', removeListener);
    }
    document.addEventListener('mousedown', onMessageClose);
    document.addEventListener('keydown', onMessageClose);
  };

  var onMessageClose = function (evt) {
    window.util.isEvent.esc(evt, removeListener);
    window.util.isEvent.mainMouseButton(evt, removeListener);
  };

  window.message = {
    open: open
  };
})();
