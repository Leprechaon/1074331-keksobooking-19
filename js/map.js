'use strict';

(function () {
  var QUANTITY_ADS = 5;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var similarListPins = document.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var selectForm = mapFiltersContainer.querySelectorAll('.map__filter');
  var fieldsetForm = document.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');

  // убирает карточку
  var removePinCard = function (oldHandler) {
    var oldPinCard = map.querySelector('.map__card');
    if (oldPinCard) {
      map.removeChild(oldPinCard);
      document.removeEventListener('keydown', oldHandler);
    }
  };

  // добавляет карточку
  var onPinPress = function (pin) {
    removePinCard();
    similarListPins.after(window.card.render(pin));
    var pinCard = map.querySelector('.popup__close');
    pinCard.addEventListener('click', removePinCard);
    var oldHandler = document.addEventListener('keydown', function (evt) {
      window.util.isEvent.esc(evt, removePinCard, oldHandler);
    });
  };

  var addClickListenerToPin = function (template, pin) {
    template.addEventListener('click', function () {
      onPinPress(pin);
    });
  };

  // отбрасывает px
  var delPX = function (string) {
    var word = string.substr(0, string.length - 2);
    return Number.parseInt(word, 10);
  };

  // отрисовывает фрагмент с элементами
  var renderFragment = function (array, templateFunction) {
    window.util.delElements(document.querySelectorAll('.map__pin--ads'));
    var fragment = document.createDocumentFragment();
    var takeNumber = array.length > QUANTITY_ADS ? QUANTITY_ADS : array.length;
    for (var i = 0; i < takeNumber; i++) {
      var template = templateFunction(array[i]);
      addClickListenerToPin(template, array[i]);
      fragment.appendChild(template);
    }
    similarListPins.appendChild(fragment);
  };

  var onSuccessLoad = function (data) {
    var anyAds = data.slice();
    renderFragment(window.util.doShuffles(anyAds), window.pins.render);
    window.filter.pins(data);
  };

  var onSuccessSave = function (status) {
    switchOffPage();
    window.message.open(status);
  };

  var onError = function (status) {
    window.message.open(status);
  };

  var switchOffPage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.trigger.disable(selectForm);
    window.form.trigger.disable(fieldsetForm);
    window.util.delElements(document.querySelectorAll('.map__pin--ads'));
    removePinCard();
    mainPin.style.left = window.pins.X.START;
    mainPin.style.top = window.pins.Y.START;
    adForm.reset();
    mainPin.addEventListener('mousedown', pinMouseListener);
    mainPin.addEventListener('keydown', pinKeyListener);
  };

  // переходит в активный режим
  var onMainPinPress = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.trigger.enable(selectForm);
    window.form.trigger.enable(fieldsetForm);
    window.backend.load(onSuccessLoad, alert);
    adForm.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(adForm), onSuccessSave, onError);
      evt.preventDefault();
    });
    mainPin.removeEventListener('mousedown', pinMouseListener);
    mainPin.removeEventListener('keydown', pinKeyListener);
  };

  var onMainPinUnpress = function () {
    document.querySelector('#address').value = (delPX(mainPin.style.left) + window.pins.OFFSET.MAIN.X) + ', ' + (delPX(mainPin.style.top) + window.pins.OFFSET.MAIN.Y);
  };

  var pinMouseListener = function (evt) {
    window.util.isEvent.mainMouseButton(evt, onMainPinPress);
  };

  var pinKeyListener = function (evt) {
    window.util.isEvent.enter(evt, onMainPinPress);
  };

  window.form.trigger.disable(selectForm);
  window.form.trigger.disable(fieldsetForm);
  window.form.check.roomCapacity();
  window.form.check.minPrice();

  onMainPinUnpress();
  mainPin.addEventListener('mousedown', pinMouseListener);
  mainPin.addEventListener('keydown', pinKeyListener);
  mainPin.addEventListener('mousemove', onMainPinUnpress);
  window.dragAndDrop.mooveElement(mainPin);

  window.map = {
    renderFragment: renderFragment,
    removePinCard: removePinCard
  };
})();
