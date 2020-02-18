'use strict';

(function () {
  var map = document.querySelector('.map');
  var Y = {
    MIN: 130,
    MAX: 630
  };
  var X = {
    MIN: 0,
    MAX: map.offsetWidth
  };

  var OFFSET = {
    X: 25,
    Y: 70,
    MAIN: {
      X: 33,
      Y: 70
    }
  };

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPins = function (offer) {
    var offerPin = similarPinTemplate.cloneNode(true);
    offerPin.style.left = (offer.location.x - OFFSET.X) + 'px';
    offerPin.style.top = (offer.location.y - OFFSET.Y) + 'px';
    offerPin.querySelector('img').src = offer.author.avatar;
    offerPin.querySelector('img').alt = offer.offer.title;
    offerPin.classList.add('map__pin--ads');
    offerPin.tabindex = 0;
    return offerPin;
  };

  window.pins = {
    renderPins: renderPins,
    OFFSET: OFFSET,
    X: X,
    Y: Y
  };
})();
