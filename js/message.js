'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);


  var open = function (status) {
    switch (status) {
      case 'success':
        main.appendChild(successMessage);
        document.addEventListener('click', close);
        document.addEventListener('keydown', close);
        break;
      case 'error':
        main.appendChild(errorMessage);
        document.addEventListener('click', close);
        document.addEventListener('keydown', close);
        errorMessage.querySelector('.error__button').addEventListener('click', function () {
          errorMessage.remove();
          document.removeEventListener('keydown', close);
          document.removeEventListener('click', close);
        });
        break;
    }
  };

  var close = function (evt) {
    if (evt.button === window.util.MAIN_MOUSE_BUTTON || evt.keyCode === window.util.KEY_CODE.ESC) {
      if (errorMessage) {
        errorMessage.remove();
      }
      if (successMessage) {
        successMessage.remove();
      }
      document.removeEventListener('keydown', close);
      document.removeEventListener('click', close);
    }
  };

  window.message = {
    open: open,
    close: close
  };
})();
