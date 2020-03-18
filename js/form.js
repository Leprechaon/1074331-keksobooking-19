'use strict';

(function () {
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var BUNGALO_MIN_PRICE = 0;

  var adForm = document.querySelector('.ad-form');
  var title = adForm.querySelector('#title');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var description = adForm.querySelector('#description');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var features = adForm.querySelector('.features');

  var onFormFeatureKeydown = function (evt) {
    window.util.isEvent.enter(evt, toggleFormFeatures, evt.target);
  };

  var toggleFormFeatures = function (feature, evt) {
    evt.preventDefault();
    switch (feature.checked) {
      case true:
        feature.checked = false;
        break;
      default:
        feature.checked = true;
    }
  };

  // Отключает все элементы переданного массива
  var Toggle = {
    disable: function (inputs) {
      inputs.forEach(function (input) {
        input.disabled = true;
      });
      window.preview.deactivate();
      resetButton.removeEventListener('click', onResetButtonPress);
    },

    // Включает все элементы переданного массива
    enable: function (inputs) {
      inputs.forEach(function (input) {
        input.disabled = false;
      });
      window.preview.activate();
      resetButton.addEventListener('click', onResetButtonPress);
    }
  };

  var onResetButtonPress = function (evt) {
    evt.preventDefault();
    window.map.switchOffPage();
  };

  var featuresOff = function (feature) {
    feature.checked = false;
  };

  var resetValue = function () {
    title.value = '';
    window.map.onMainPinUnpress();
    type.value = 'flat';
    timeIn.value = '12:00';
    timeOut.value = '12:00';
    rooms.value = '1';
    capacity.value = '3';
    price.placeholder = '1000';
    price.value = '';
    description.value = '';
    adForm.querySelectorAll('input:checked').forEach(featuresOff);
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
        default:
          price.min = BUNGALO_MIN_PRICE;
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

  features.addEventListener('keydown', onFormFeatureKeydown);

  window.form = {
    toggle: Toggle,
    check: check,
    default: resetValue
  };
})();
