'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var BUNGALO_MIN_PRICE = 0;

  // Отключает все элементы переданного массива
  var trigger = {
    disable: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].disabled = true;
      }
    },

    // Включает все элементы переданного массива
    enable: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].disabled = false;
      }
    }
  };

  // Валидация
  var check = {
    minPrice: function () {
      switch (type.value) {
        case 'flat':
          price.min = FLAT_MIN_PRICE;
          price.placeholder = FLAT_MIN_PRICE;
          break;
        case 'house':
          price.min = HOUSE_MIN_PRICE;
          price.placeholder = HOUSE_MIN_PRICE;
          break;
        case 'palace':
          price.min = PALACE_MIN_PRICE;
          price.placeholder = PALACE_MIN_PRICE;
          break;
        default: BUNGALO_MIN_PRICE = 0;
          price.placeholder = BUNGALO_MIN_PRICE;
      }
    },

    roomCapacity: function () {
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
    },

    syncInOut: function (time) {
      timeIn.value = time;
      timeOut.value = time;
    }
  };

  type.addEventListener('change', function () {
    check.minPrice();
  });

  rooms.addEventListener('change', function () {
    check.roomCapacity();
  });

  capacity.addEventListener('change', function () {
    check.roomCapacity();
  });

  timeIn.addEventListener('change', function () {
    check.syncInOut(timeIn.value);
  });

  timeOut.addEventListener('change', function () {
    check.syncInOut(timeOut.value);
  });

  window.form = {
    trigger: trigger,
    check: check,
  };
})();
