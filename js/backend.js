'use strict';

(function () {
  var URL = {
    load: 'https://js.dump.academy/keksobooking/data',
    save: 'https://js.dump.academy/keksobooking'
  };
  var STATUS = {
    CODE_OK: 200
  };
  var TIMEOUT = 10000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL.load);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS.CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Проверьте интернет соединение');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS.CODE_OK) {
        onLoad('success');
      } else {
        onError('error');
      }
    });

    xhr.addEventListener('error', function () {
      onError('error');
    });

    xhr.open('POST', URL.save);

    xhr.addEventListener('timeout', function () {
      onError('error');
    });

    xhr.timeout = TIMEOUT;
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
