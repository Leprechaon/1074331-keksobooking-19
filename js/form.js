'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  // Отключает все элементы переданного массива
  var disableForm = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  // Включает все элементы переданного массива
  var enableForm = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };

  // Валидация
  var checkMinPrice = function () {
    switch (type.value) {
      case 'flat': price.min = 1000;
        price.placeholder = '1000';
        break;
      case 'house': price.min = 5000;
        price.placeholder = '5000';
        break;
      case 'palace': price.min = 10000;
        price.placeholder = '10000';
        break;
      default: price.min = 0;
        price.placeholder = '0';
    }
  };

  var checkRoomCapacity = function () {
    var roomNumber = Number.parseInt(rooms.value, 10);
    var capacityNumber = Number.parseInt(capacity.value, 10);
    if (roomNumber < capacityNumber) {
      capacity.setCustomValidity('Количество гостей не должно превышать количество комнат!');
      rooms.setCustomValidity('');
    } else if ((roomNumber > 10) & (capacityNumber !== 0)) {
      rooms.setCustomValidity('');
      capacity.setCustomValidity('Это не для гостей');
    } else if ((capacityNumber === 0) & (roomNumber !== 100)) {
      rooms.setCustomValidity('Вам требуется больше комнат!');
      capacity.setCustomValidity('');
    } else {
      rooms.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  };

  var syncCheckInOut = function (time) {
    timeIn.value = time;
    timeOut.value = time;
  };

  type.addEventListener('change', function () {
    checkMinPrice();
  });

  rooms.addEventListener('change', function () {
    checkRoomCapacity();
  });

  capacity.addEventListener('change', function () {
    checkRoomCapacity();
  });

  timeIn.addEventListener('change', function () {
    syncCheckInOut(timeIn.value);
  });

  timeOut.addEventListener('change', function () {
    syncCheckInOut(timeOut.value);
  });

  window.form = {
    disable: disableForm,
    enable: enableForm,
    checkRoomCapacity: checkRoomCapacity,
    syncCheckInOut: syncCheckInOut,
    checkMinPrice: checkMinPrice
  };
})();
