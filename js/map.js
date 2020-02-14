'use strict';

(function () {
  var NUMBERS_OF_OFFERS = 8;
  var MAIN_MOUSE_BUTTON = 0;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var similarListPins = document.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var selectForm = mapFiltersContainer.querySelectorAll('.map__filter');
  var fieldsetForm = document.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');

  var offers = window.data.doOffers(NUMBERS_OF_OFFERS);

  var removePinCard = function (oldHandler) {
    var oldPinCard = map.querySelector('.map__card');
    if (oldPinCard) {
      map.removeChild(oldPinCard);
      document.removeEventListener('keydown', oldHandler);
    }
  };

  var onPinPress = function (pin) {
    removePinCard();
    similarListPins.after(window.card.render(pin));
    var pinCard = map.querySelector('.popup__close');
    pinCard.addEventListener('click', removePinCard);
    var oldHandler = document.addEventListener('keydown', function (evt) {
      window.util.isEscapeEvent(evt, removePinCard, oldHandler);
    });
  };

  var addClickListenerToPin = function (template, pin) {
    template.addEventListener('click', function () {
      onPinPress(pin);
    });
  };

  var delPX = function (string) {
    var word = string.substr(0, string.length - 2);
    return Number.parseInt(word, 10);
  };

  // отрисовывает фрагмент с элементами
  var renderFragment = function (array, templateFunction) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var template = templateFunction(array[i]);
      addClickListenerToPin(template, array[i]);
      fragment.appendChild(template);
    }
    return fragment;
  };

  var pinFragment = renderFragment(offers, window.pins.renderPins);

  var onMainPinPress = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.enable(selectForm);
    window.form.enable(fieldsetForm);
    similarListPins.appendChild(pinFragment);
  };

  var onMainPinUnpress = function () {
    document.querySelector('#address').value = (delPX(mainPin.style.left) + window.pins.offsetX) + ', ' + (delPX(mainPin.style.top) + window.pins.offsetY);
  };

  window.form.disable(selectForm);
  window.form.disable(fieldsetForm);
  window.form.checkRoomCapacity();
  window.form.checkMinPrice();

  document.querySelector('#address').value = (delPX(mainPin.style.left) + window.pins.offsetX) + ', ' + (delPX(mainPin.style.top) + window.pins.offsetY);

  mainPin.addEventListener('mousedown', function (MouseEvent) {
    if (MouseEvent.button === MAIN_MOUSE_BUTTON) {
      onMainPinPress();
      mainPin.addEventListener('mousemove', onMainPinUnpress);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onMainPinPress);
  });
})();
