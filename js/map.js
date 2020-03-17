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
  var onPinPress = function (template, pin) {
    var active = map.querySelector('.map__pin--active');
    if (active) {
      active.classList.remove('map__pin--active');
    }
    removePinCard();
    template.classList.add('map__pin--active');
    similarListPins.after(window.card.render(pin));
    var pinCard = map.querySelector('.popup__close');
    pinCard.addEventListener('click', removePinCard);
    var oldHandler = document.addEventListener('keydown', function (evt) {
      window.util.isEvent.esc(evt, removePinCard, oldHandler);
    });
  };

  var addClickListenerToPin = function (template, pin) {
    template.addEventListener('click', function () {
      onPinPress(template, pin);
    });
  };

  // отбрасывает px
  var delPX = function (string) {
    var word = string.substr(0, string.length - 2);
    return Number.parseInt(word, 10);
  };

  // отрисовывает фрагмент с элементами
  var renderFragment = function (pins, templateFunction) {
    window.util.delElements(document.querySelectorAll('.map__pin--ads'));
    var fragment = document.createDocumentFragment();
    var takeNumber = pins.length > QUANTITY_ADS ? QUANTITY_ADS : pins.length;
    for (var i = 0; i < takeNumber; i++) {
      var template = templateFunction(pins[i]);
      addClickListenerToPin(template, pins[i]);
      fragment.appendChild(template);
    }
    similarListPins.appendChild(fragment);
  };

  var firstCheck = function () {
    window.form.check.roomCapacity();
    window.form.check.minPrice();
  };

  var onSuccessLoad = function (data) {
    var anyAds = data.slice();
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.toggle.enable(selectForm);
    window.form.toggle.enable(fieldsetForm);
    renderFragment(window.util.doShuffles(anyAds), window.pins.render);
    window.filter.activate(data);
    adForm.addEventListener('submit', sentFormListener);
    mainPin.removeEventListener('mousedown', pinMouseListener);
    mainPin.removeEventListener('keydown', pinKeyListener);
    firstCheck();
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
    window.form.toggle.disable(selectForm);
    window.form.toggle.disable(fieldsetForm);
    window.util.delElements(document.querySelectorAll('.map__pin--ads'));
    removePinCard();
    mainPin.style.left = window.pins.X.START;
    mainPin.style.top = window.pins.Y.START;
    window.form.default();
    window.filter.deactivate();
    mainPin.addEventListener('mousedown', pinMouseListener);
    mainPin.addEventListener('keydown', pinKeyListener);
    adForm.removeEventListener('submit', sentFormListener);
  };

  var sentFormListener = function (evt) {
    window.backend.save(new FormData(adForm), onSuccessSave, onError);
    evt.preventDefault();
  };

  // переходит в активный режим
  var onMainPinPress = function () {
    window.backend.load(onSuccessLoad, onError);
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

  window.form.toggle.disable(selectForm);
  window.form.toggle.disable(fieldsetForm);
  firstCheck();

  onMainPinUnpress();
  mainPin.addEventListener('mousedown', pinMouseListener);
  mainPin.addEventListener('keydown', pinKeyListener);
  mainPin.addEventListener('mousemove', onMainPinUnpress);
  window.dragAndDrop.moveElement(mainPin);

  window.map = {
    renderFragment: renderFragment,
    removePinCard: removePinCard,
    onMainPinUnpress: onMainPinUnpress,
    switchOffPage: switchOffPage
  };
})();
